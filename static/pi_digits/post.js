async function get_pi_digit() {
    const container = document.getElementById("container");
    container.innerHTML = "";

    const results = document.createElement("code");
    container.appendChild(results);
    const canvas = document.createElement("canvas");
    container.appendChild(canvas);

    const n = parseInt(document.getElementById("pi_input").value);
    if (!n) {
        alert("Please supply a valid number!");
        return;
    }

    let nth = await main(canvas, n, root);
    results.innerText = "The " + n + "th hex digit of pi is " + nth + "\n";
}

