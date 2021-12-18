class Circles {
    constructor(ctx, circles_per_row, num_rows, ms_per_transition) {
        this.ctx = ctx;
        this.num_rows = num_rows;
        this.circles_per_row = circles_per_row;
        this.ms_per_transition = ms_per_transition;
        // TODO colors
    }

    draw(time) {
        const t = (time / 2000) % this.ms_per_transition;
        // first 20% of time nothing moves:
        // if (t < this.ms_per_transition * 0.2) {
            for (let i = 0; i < this.num_rows; i++) {
                // Radius of each small sub circle
                const r = 10 * i;
                // radius of big circle
                const big_r = 4 * r;

                const skew = t * ((i % 2) ? 1 : -1) + i * Math.PI / 7;//2 * Math.PI / 7 * i;
                for (let j = 0; j < this.circles_per_row; j++) {
                    const theta = skew + 2 * Math.PI * j / this.circles_per_row;
                    // draw a circle of radius r at (big_r, theta)
                    this.ctx.fillStyle = "#ff00005f";
                    this.ctx.beginPath();
                    this.ctx.arc((big_r - 10) * Math.cos(theta), (big_r - 10) * Math.sin(theta), r, 0, 2 * Math.PI);
                    this.ctx.fill();

                    this.ctx.fillStyle = "#00ff005f";
                    this.ctx.beginPath();
                    this.ctx.arc(big_r * Math.cos(theta - 0.1), big_r * Math.sin(theta - 0.1), r, 0, 2 * Math.PI);
                    this.ctx.fill();

                    this.ctx.fillStyle = "#0000ff5f";
                    this.ctx.beginPath();
                    this.ctx.arc((big_r - 10) * Math.cos(theta - 0.1), (big_r - 10) * Math.sin(theta - 0.1), r, 0, 2 * Math.PI);
                    this.ctx.fill();

                    // this.ctx.fillStyle = "white";
                    // this.ctx.beginPath();
                    // this.ctx.arc(big_r * Math.cos(theta), big_r * Math.sin(theta), r, 0, 2 * Math.PI);
                    // this.ctx.fill();
                }
            }

            for (let i = 0; i < this.num_rows; i++) {
                const r = 10 * i;
                const big_r = 4 * r;
                this.ctx.lineWidth = 5;
                this.ctx.beginPath();
                this.ctx.arc(0, 0, big_r, 0, 2 * Math.PI);
                this.ctx.stroke();
            }
            return;
        // }

        // t -= this.ms_per_transition * 0.2;
        // t /= this.ms_per_transision * 0.8;
    }
}

function perpetual_start(canvas) {
    canvas.width = 1000;
    canvas.height = 1000;
    const ctx = canvas.getContext("2d");
    ctx.translate(500, 500);
    const c = new Circles(ctx, 20, 10, 2000);

    let cancel = false;
    const p = new Promise(r => {
        const f = (t) => {
            ctx.beginPath();
            ctx.fillStyle = "black";
            ctx.rect(-500, -500, 1000, 1000);
            ctx.fill();

            c.draw(t);
            if (cancel) {
                r();
                return;
            }
            requestAnimationFrame(f);
        };
        f(0);
    });
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
        const fps = 60;
        const mspf = 1000 / fps;
        let time = 0;

        const context = await get_context();
        for (let i = 0; i < record_frames; i++) {
            console.log(i, time);

            ctx.beginPath();
            ctx.fillStyle = "black";
            ctx.rect(-500, -500, 1000, 1000);
            ctx.fill();
            console.log(" fill");

            c.draw(time);
            console.log(" draw");
            time += mspf;
            add_to_context(context, c, i);
            console.log(" update");
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
            (encoder, c, _i) => {
                encoder.addFrameRgba(c.ctx.getImageData(0, 0, 1000, 1000).data);
            },
            async (encoder) => {
                encoder.finalize();
                const data = encoder.FS.readFile(encoder.outputFilename);
                const blob = new Blob([data], { type: 'octet/stream' });
                return window.URL.createObjectURL(blob);
            },
        );
    }
}
