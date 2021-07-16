async function generate(ctx) {
    const x = Math.random() * ctx.canvas.width;
    const y = Math.random() * ctx.canvas.height;

    const n_sides = Math.floor(3 + Math.random() * 7); // random polygon with 3 <= n < 10
    const contours = Math.floor(3 + Math.random() * 7);

    const max_r = Math.random() * 100;
    const min_r = (max_r / 2) + (Math.random() - 0.5) * (max_r / 4);
    const r_step = (max_r - min_r) / contours;

    let r = max_r;
    let color = "black";
    for (let i_r = 0; i_r < contours; i_r++) {
        ctx.fillStyle = color;

        const theta = 2 * Math.PI / n_sides;

        ctx.beginPath();
        ctx.moveTo(r * Math.cos(0) + x, r * Math.sin(0) + y);
        for (let i = 1; i < n_sides; i++) {
            const angle = i * theta;
            ctx.lineTo(r * Math.cos(angle) + x, r * Math.sin(angle) + y);
        }
        ctx.lineTo(r * Math.cos(0) + x, r * Math.sin(0) + y);
        ctx.fill();

        color = i_r % 2 ? "white" : "black";
        r -= r_step;
        await new Promise(r => setTimeout(r, 10));
    }
}

function main(canvas) {
    canvas.height = 1000;
    canvas.width = 1000;
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.fill();

    const f = async () => {
        await generate(ctx);
        await new Promise(r => setTimeout(r, 50));
        requestAnimationFrame(f);
    }
    f();
}
