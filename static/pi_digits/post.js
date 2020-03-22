function fadeOutEl(el) {
    if (!el.style.opacity)
        el.style.opacity = "1";

    const opacity = Number(el.style.opacity);
    console.log(el, opacity);
    if (opacity < 0.1) {
        el.remove();
        return;
    }

    el.style.opacity = opacity - 0.05;
    setTimeout(fadeOutEl.bind(this, el), 10);
}

function addErrorMessage(parentEl, msg) {
    const el = document.createElement("div");
    el.className = "isa_error";
    el.onclick = () => { fadeOutEl(el); };
    el.innerHTML =
        msg + "<br><br>" + "Click this message to dismiss.";
    parentEl.appendChild(el);
}

async function get_pi_digit() {
    const container = document.getElementById("container");
    container.innerHTML = "";

    const n = parseInt(document.getElementById("pi_input").value);
    if (!n) {
        alert("Please supply a valid number!");
        return;
    } else if (n > 1200000 && !window.piCalcAllowLargeCalculations) {
        addErrorMessage(
            document.getElementById("errors"), n + " is possibly too big for this calculator!")
        return;
    }

    const results = document.createElement("code");
    container.appendChild(results);
    const canvas = document.createElement("canvas");
    container.appendChild(canvas);

    let nth = await main(canvas, n, root);
    results.innerText = "The " + n + "th hex digit of pi is " + nth + "\n";
}
