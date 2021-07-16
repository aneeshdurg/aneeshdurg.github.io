// length of the collatz sequence rooted @ n
const cache = new Map();
function collatz(n) {
    if (n == 1)
        return 0;

    if (cache.has(n)) {
        return cache.get(n);
    }

    let value = 0;
    if (n % 2 == 0)
        value = 1 + collatz(n / 2);
    else
        value = 1 + collatz(n * 3 + 1);
    cache.set(n, value);
    return value;
}

async function generate(ctx, n) {
    let pt = [Math.cos(n), Math.sin(n)].map(x => x * n);
    pt = pt.map(x => 1000 * (x + 100) / 200);
    const len = collatz(n);


    const a = len / 25;
    ctx.fillStyle = `rgba(255, 255, 255, ${a})`;
    ctx.beginPath();
    ctx.arc(...pt, 5 * a, 0, 2 * Math.PI);
    ctx.fill();
}

function main(canvas) {
    canvas.height = 1000;
    canvas.width = 1000;
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.fill();

    let darken = () => {
        ctx.fillStyle = "rgba(0, 0, 0, 0.125)";
        ctx.beginPath();
        ctx.rect(0, 0, canvas.width, canvas.height);
        ctx.fill();
    };

    let n = 1;
    const f = async () => {
        await generate(ctx, n);
        n++;
        if (n == 500)
            return;
        // darken();
        await new Promise(r => setTimeout(r, 100));
        requestAnimationFrame(f);
    }
    f();
}
