function randomColor() {
    const COLORS = ["cyan", "red", "orange", "pink", "purple"];
    return COLORS[Math.floor(Math.random() * COLORS.length)];
};

function polygonrain_start(canvas) {
    canvas.width = 1000;
    canvas.height = 1000;
    const ctx = canvas.getContext("2d");

    // draw a square and raindrops falling onto that square
    // when a raindrop hits the square it blossoms into a polygon and then fades
    // away
    const impacts = [];
    const raindrops = [];
    const NUM_RAINDROPS=10000;
    const RAIN_SPEED=5;

    const f = () => {
        ctx.beginPath();
        ctx.fillStyle = "black";
        ctx.rect(0, 0, 1000, 1000);
        ctx.fill();

        if (raindrops.length < NUM_RAINDROPS) {
            if (Math.random() > 0.5) {
                raindrops.push([Math.random() * 1000, 0]);
            }
        }

        let to_remove = [];
        ctx.fillStyle = "white";
        for (let i = 0; i < raindrops.length; i++) {
            const r = raindrops[i];
            ctx.beginPath();
            ctx.rect(r[0], r[1], 1, 10);
            ctx.fill();
            r[1] += RAIN_SPEED;


            const in_sq_bounds = (x) => x >= 450 && x <= 550;
            const in_sq = (in_sq_bounds(r[0]) && in_sq_bounds(r[1] + 10));
            if (r[1] > 1000 || in_sq) {
                to_remove.push(i);

                const n = Math.random() * 5 + 5;
                impacts.push([
                    r[0],
                    r[1] + 15,
                    n,
                    10 + Math.random() * 20,
                    Math.random() * 2 * Math.PI,
                    randomColor()
                ]);
            }
        }

        for (let i = 0; i < to_remove.length; i++) {
            const idx = to_remove[i] - i;
            raindrops.splice(idx, 1);
        }

        to_remove = [];
        for (let i = 0; i < impacts.length; i++) {
            const impact = impacts[i];

            const movetoangle = (angle) => {
                const pos = [Math.cos(angle), Math.sin(angle)].map(e => impact[3] * e);
                pos[0] += impact[0];
                pos[1] += impact[1];
                return pos;
            }

            const get_angle = (x) => x * 2 * Math.PI / impact[2] + impact[4];
            ctx.strokeStyle = impact[5];
            ctx.beginPath();
            ctx.moveTo(...movetoangle(get_angle(0)));
            for (let j = 1; j < impact[2]; j++) {
                ctx.lineTo(...movetoangle(get_angle(j)));
            }
            ctx.lineTo(...movetoangle(get_angle(0)));
            ctx.stroke();
            impact[3] -= 1;
            if (impact[3] < 0) {
                to_remove.push(i);
            }
        }

        for (let i = 0; i < to_remove.length; i++) {
            const idx = to_remove[i] - i;
            impacts.splice(idx, 1);
        }

        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.rect(450, 450, 100, 100);
        ctx.fill();

        ctx.fillStyle = "black";
        ctx.beginPath();
        ctx.rect(451, 451, 98, 98);
        ctx.fill();


        requestAnimationFrame(f);

        // TODO chromatic abberation?
    };
    requestAnimationFrame(f);
}
