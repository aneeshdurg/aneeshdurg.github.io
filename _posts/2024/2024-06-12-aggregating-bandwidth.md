---
layout: post
title: Aggregating Bandwidth Across Virtual Network Interfaces
permalink: /posts/2024/06/12-aggregating-bandwidth/
---

Is it possible to increase bandwidth between two containers by taking advantage
of multiple routes between them?

---

Recently, I've been exploring the relationship between network topology and
performance for distributed graph databases. As part of this, I've made
infrastructure that lets me specify the topology and database I'd like to
benchmark and outputs a cluster of database containers that have virtual links
forming the requested topology. I can then use `tc` to add latency to each link,
and then run my benchmarks. While this works, it sets up static routing on every
container, resulting in changes in topology only affecting the latency between
each container, but doesn't allow for increases in bandwidth by taking advantage
of multiple routes.

While it's definitely possible to create multiple routes between two hosts,
linux does not support splitting the traffic of a single TCP connection across
multiple routes. This is probably a good thing in general, since doing so would
increase out-of-order delivery, and potentially do more harm than good. However,
at this stage, I'm more interested in seeing if it is possible rather than
worrying about whether or not it's a good idea. Additionally, there is always
the possibility of designing future systems that don't rely on TCP and can more
readily take advantage of multi-path routing.

While searching for answers, I came across [this
script](https://github.com/mad-ady/linux-ecmp-lb-netns) which demonstrated how
`teql` can be used to achieve something similar. `teql` is a network interface
controlled by the `sch_teql` kernel module and allows aggregating two network
interfaces into one logical network interface. It's a bit awkward to use, as
devices can only be constructed during module init time, and only destroy when
the module is unloaded (I've got some patches in progress that expose an
interface to create/destroy interfaces, maybe I'll get it upstreamed some day!),
and as far as I could tell, it doesn't seem possible to configure `teql` to work
if the other end of the connection isn't directly connected to the interface.

Further digging led me to discover [MPTCP](https://www.mptcp.dev/), an extension
to the TCP protocol that adds support for having multiple connections across
different interfaces at once. While the primary usecase is reliability (being
able to failover to a backup "subflow"), the documentation also claims that it
could also be used to increase bandwidth. Conveniently, there exists a utility
called `mptcpize` which hooks `libc` socket creation calls to "upgrade" them
from TCP to MPTCP. To test this protocol, I created a network namespaced based
test environment as below:

```bash
set -ex

ip link add veth0 type veth peer name veth1
veth0addr=10.0.0.1
veth1addr=10.0.0.2
ip link add veth2 type veth peer name veth3
veth2addr=10.2.0.1
veth3addr=10.2.0.2
ip link add veth4 type veth peer name veth5
veth4addr=10.3.0.1
veth5addr=10.3.0.2
ip link add veth6 type veth peer name veth7
veth6addr=10.4.0.1
veth7addr=10.4.0.2

add_dev() {
  netns=$1
  name=$2
  address=${name}addr
  address=${!address}

  ip link set $name netns $netns
  ip -n $netns addr add $address/30 dev $name
  ip -n $netns link set $name up
  ip netns exec $netns iptables -t nat -A POSTROUTING --out-interface $name -j MASQUERADE
  ip netns exec $netns iptables -A FORWARD -o $name -j ACCEPT
}

ip netns add devicea
add_dev devicea veth0
add_dev devicea veth2
ip -n devicea link set lo up

# Setup deviceb
ip netns add deviceb
add_dev deviceb veth4
add_dev deviceb veth6
ip -n deviceb link set lo up

ip netns add devicec
add_dev devicec veth1
add_dev devicec veth5
ip -n devicec link set lo up

ip netns add deviced
add_dev deviced veth3
add_dev deviced veth7
ip -n deviced link set lo up

# src/dst dummies
ip link add dummy0 type dummy
dummy0addr=10.10.10.10
ip link add dummy1 type dummy
dummy1addr=10.100.100.100

add_dev devicea dummy0
add_dev deviceb dummy1

# Limit bandwidth per link
ip netns exec devicea ip link add ifb0 type ifb
ip netns exec devicea ip link set dev ifb0 up
ip netns exec devicea wondershaper -a veth0 -u 5120 -d 5120
ip netns exec devicea wondershaper -a veth2 -u 5120 -d 5120

ip netns exec deviceb ip link add ifb0 type ifb
ip netns exec deviceb ip link set dev ifb0 up
ip netns exec deviceb wondershaper -a veth4 -u 5120 -d 5120
ip netns exec deviceb wondershaper -a veth6 -u 5120 -d 5120

# Setup routing
ip netns exec devicec ip route add ${dummy0addr} via ${veth0addr} dev veth1
ip netns exec devicec ip route add ${dummy1addr} via ${veth4addr} dev veth5
ip netns exec devicec ip route add ${veth6addr} via ${veth4addr} dev veth5
ip netns exec devicec ip route add ${veth2addr} via ${veth0addr} dev veth1

ip netns exec deviced ip route add ${dummy0addr} via ${veth2addr} dev veth3
ip netns exec deviced ip route add ${dummy1addr} via ${veth6addr} dev veth7
ip netns exec deviced ip route add ${veth4addr} via ${veth6addr} dev veth7
ip netns exec deviced ip route add ${veth0addr} via ${veth2addr} dev veth3


ip netns exec devicea ip route add ${dummy1addr}/32 proto static scope global \
    nexthop dev veth0 via ${veth1addr} weight 1 \
    nexthop dev veth2 via ${veth3addr} weight 1

ip netns exec devicea ip route add ${veth4addr}/32 proto static scope global \
    nexthop dev veth0 via ${veth1addr}

ip netns exec devicea ip route add ${veth6addr}/32 proto static scope global \
    nexthop dev veth2 via ${veth3addr}

ip netns exec deviceb ip route add ${dummy0addr}/32 proto static scope global \
    nexthop dev veth4 via ${veth5addr} weight 1 \
    nexthop dev veth6 via ${veth7addr} weight 1

ip netns exec deviceb ip route add ${veth0addr}/32 proto static scope global \
    nexthop dev veth4 via ${veth5addr}

ip netns exec deviceb ip route add ${veth2addr}/32 proto static scope global \
    nexthop dev veth6 via ${veth7addr}

# Configure mptcp endpoints
ip netns exec devicea ip mptcp endpoint add ${veth0addr} dev veth0 signal
ip netns exec devicea ip mptcp endpoint add ${veth2addr} dev veth2 signal

ip netns exec deviceb ip mptcp endpoint add ${veth4addr} dev veth4 signal
ip netns exec deviceb ip mptcp endpoint add ${veth6addr} dev veth6 signal

# Configure mptcp limits (allow multiple subflows)
ip netns exec devicea ip mptcp limits set subflow 2 add_addr_accepted 2
ip netns exec deviceb ip mptcp limits set subflow 2 add_addr_accepted 2
```

This is slightly more involved than the configuration of the `teql` test in
the link above, but the goal is to create the following topology:

```
  +--(a)--+
  |       |
 (c)     (d)
  |       |
  +--(b)--+
```

and see if we can get traffic going across both `a-c-b` and `a-d-b`
simultaneously. In my test, I've set the bandwidth of all the links to be
`5MB/s` via `wondershaper`. My initial test involved just running `iperf` as a
server on `b` and as a client on `a`, which gave me the following results:

```
[ ID] Interval           Transfer     Bitrate         Retr
[  5]   0.00-10.00  sec  7.50 MBytes  6.29 Mbits/sec    0             sender
[  5]   0.00-10.08  sec  5.38 MBytes  4.47 Mbits/sec                  receiver
```

Rerunning this with `mptcpize run`, I got:

```
[ ID] Interval           Transfer     Bitrate         Retr
[  5]   0.00-10.00  sec  16.8 MBytes  14.0 Mbits/sec  463             sender
[  5]   0.00-10.61  sec  5.50 MBytes  4.35 Mbits/sec                  receiver
```

Which looks like we roughly doubled the bandwidth. Mission accomplished!

Another very useful command that helped debug the setup was `ip mptcp monitor`
which shows information about the state of MPTCP connections. This was vital as
I initially misconfigured things by setting the flags on my endpoints to be
`fullmesh` instead of `signal`. I'm not super clear on what `fullmesh` actually
does, as it seems that `signal` does what I assumed `fullmesh` did. Maybe I need
to change the path manager to use `fullmesh`?

Overall, MPTCP makes aggregating bandwidth across virtual network interfaces is
very much possible. However, it might not always be practical, and even in this
case, it requires that both ends of a connection have MPTCP configured. For my
needs, this will provide the infrastructure needed to test properties of the
network, though I think it is probably not an ideal setup in practice, and it is
probably better for the application to be aware of multiple interfaces natively
(for example, my understanding is that MPI can be aware of multiple interfaces
and can schedule traffic across them accordingly).
