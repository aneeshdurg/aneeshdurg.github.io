function randomColor() {
    const COLORS = ["cyan", "red", "coral", "lawngreen", "purple"];
    return COLORS[Math.floor(Math.random() * COLORS.length)];
};

class Raindrop {
    pos = [0, 0];
    length = 10;
    speed = 5;

    constructor(position) {
        this.pos = position;
    }

    draw(ctx) {
        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.rect(this.pos[0] + 2*(Math.random() * 2 - 1), this.pos[1], 1, this.length);
        ctx.fill();

        ctx.fillStyle = "blue";
        ctx.beginPath();
        ctx.rect(this.pos[0], this.pos[1] +2*(Math.random() * 2 - 1), 1, this.length);
        ctx.fill();

        ctx.fillStyle = "green";
        ctx.beginPath();
        ctx.rect(this.pos[0] + 2*(Math.random() * 2 - 1), this.pos[1] +2*(Math.random() * 2 - 1), 1, this.length);
        ctx.fill();

        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.rect(this.pos[0], this.pos[1], 1, this.length);
        ctx.fill();

        this.pos[1] += this.speed;
    }
}

const WIDTH = 1000;
const HEIGHT = 1000;
function polygonrain_start(canvas) {
    canvas.width = WIDTH;
    canvas.height = HEIGHT;
    const ctx = canvas.getContext("2d");

    const in_sq_bounds = (x) => x >= 450 && x <= 550;

    // draw a square and raindrops falling onto that square
    // when a raindrop hits the square it blossoms into a polygon and then fades
    // away
    const impacts = [];
    const raindrops = [];
    const NUM_RAINDROPS=10000;

    const render = () => {
        ctx.beginPath();
        ctx.fillStyle = "black";
        ctx.rect(0, 0, WIDTH, HEIGHT);
        ctx.fill();

        if (raindrops.length < NUM_RAINDROPS) {
            if (Math.random() > 0.5) {
                raindrops.push(new Raindrop([Math.random() * WIDTH, 0]));
            }
        }

        let to_remove = [];
        for (let i = 0; i < raindrops.length; i++) {
            const r = raindrops[i];

            r.draw(ctx);

            const in_sq = (in_sq_bounds(r.pos[0]) && in_sq_bounds(r.pos[1] + r.length));
            if (r.pos[1] >= (HEIGHT - r.length) || in_sq) {
                to_remove.push(i);

                const n = Math.random() * 5 + 5;
                impacts.push([
                    r.pos[0],
                    r.pos[1] + 15,
                    n,
                    15 + Math.random() * 20,
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

            ctx.lineWidth = 2 + Math.random() * 3;
            const get_angle = (x) => x * 2 * Math.PI / impact[2] + impact[4];
            ctx.strokeStyle = impact[5];
            ctx.beginPath();
            ctx.moveTo(...movetoangle(get_angle(0)));
            for (let j = 1; j < impact[2]; j++) {
                ctx.lineTo(...movetoangle(get_angle(j)));
            }
            ctx.lineTo(...movetoangle(get_angle(0)));
            ctx.stroke();

            impact[4] += 0.1;

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
    };

    let p = null;
    let cancel = false;
    let resolver = null;
    const f = () => {
        if (!p) {
            p = new Promise(r => { resolver = r; });
        }

        if (cancel) {
            resolver();
        } else {
            render();
            requestAnimationFrame(f);
        }
    };
    requestAnimationFrame(f);

    function _download(data, filename) {
        const downloader = document.createElement('a');
        downloader.setAttribute('href', data);
        downloader.setAttribute('download', filename);
        downloader.style.display = "none";
        document.body.appendChild(downloader);

        downloader.click();

        document.body.removeChild(downloader);
    }



    const do_record = async (ext, get_context, add_to_context, export_context) => {
        const recording = [];
        let record_frames = 600;
        const context = await get_context();
        for (let i = 0; i < record_frames; i++) {
            render();
            add_to_context(context, ctx, i);
            console.log(" update", i);
            await new Promise(r => setTimeout(r, 1));
        }

        const exported = await export_context(context);
        _download(exported, `output.mp4`);
    };

    window.record = async () => {
        cancel = true;
        await p;

        await do_record(
            "mp4",
            async () => {
                const encoder = await HME.createH264MP4Encoder()
                // TODO enforce even width/height
                encoder.width = canvas.width;
                encoder.height = canvas.height;
                encoder.initialize();
                return encoder;
            },
            (encoder, ctx, _i) => {
                encoder.addFrameRgba(ctx.getImageData(0, 0, WIDTH, HEIGHT).data);
            },
            async (encoder) => {
                encoder.finalize();
                const data = encoder.FS.readFile(encoder.outputFilename);
                const blob = new Blob([data], { type: 'octet/stream' });

                requestAnimationFrame(f);
                return window.URL.createObjectURL(blob);
            },
        );
    }
}
