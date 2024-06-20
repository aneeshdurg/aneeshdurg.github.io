---
layout: post
title: Reinitializing PySpark
permalink: /posts/2024/06/20-reinitializing-pyspark/
---

Sometimes I look at the code I've written and I know I'm going to hell.

---

At `$WORK` I encountered a weird bug - some tests that relied on `pyspark` for
executing `SQL` were failing. The failure mode was the following message:

```
java.lang.IllegalArgumentException: Cannot initialize FileIO implementation org.apache.iceberg.aws.s3.S3FileIO: Cannot find constructor for interface org.apache.iceberg.io.FileIO
```

This was odd, because the code we used to create the `SparkSession` instance
looked like this:
```python
SparkSession.builder.appName("foo")
.config(
    "spark.jars.packages",
    "org.apache.iceberg:iceberg-spark-runtime-3.4_2.12:1.5.2,"
    "software.amazon.awssdk:bundle:2.19.13,"
    "software.amazon.awssdk:url-connection-client:2.19.13,",
)
...
.getOrCreate()
```

We're definitely including the right set of jars to provide `S3FileIO` so what
gives? After poking around I realized that the culprit wasn't the setup for this
particular test, but the test before it, which did:
```python
SparkSession.builder.appName("bar")
.config(
    "spark.jars.packages",
    "org.apache.iceberg:iceberg-spark-runtime-3.4_2.12:1.5.2"
)
...
.getOrCreate()
```

This lead me to the extremely fun realization that `getOrCreate` will do exactly
what it says - it will always try to `get` an existing instance, even if the
configuration differs. Looking around online, I found other reports matching the
same behavior, and a general sense of defeat - having differing configurations
in `pyspark` is simply a no-go. Even if you `stop` an existing session, the
underlying `JVM` process will live on until the python process ends, and future
`SparkSession.Builder`s will not be able to change the set of jars. While for
our particular usecase, it was okay to just use the super set of jars
everywhere, I couldn't help but feel like there must be a way to reset the state
and create a totally new instance. After a bit of poking, I found one:

```python
from pyspark import SparkContext

if SparkContext._gateway:
    SparkContext._gateway.proc.kill()
    SparkContext._gateway = None
    SparkContext._jvm = None
```

...so cursed. This will invalidate all existing references to sessions, and will
do weird things if you have an sessions that aren't stopped, so use at your own
risk.
