let _images = 0;

class Pixelator {
    block_size = 10;
    colors = [];
    final_colors = [];
    palettelen = 100;

    cancel_draw = false;
    draw_promise = null;

    animate = true;
    cancel_gen = false;
    gen_promise = null;

    ctx = null;

    picsumurl() {
        return `https://picsum.photos/1000?i=${_images++}`
    }

    constructor(target) {
        this.block_size_2 = this.block_size * this.block_size;
        this.width = 1000;
        this.height = 1000;
        this.url = this.picsumurl();

        const canvas = document.createElement('canvas');
        canvas.width = this.width;
        canvas.height = this.height;
        canvas.style.width = "50%";
        this.ctx = canvas.getContext("2d");
        target.appendChild(canvas);

        this.img_container = document.createElement('div');
        this.img_container.style.width = "50%";
        this.img_container.style.display = "inline-block";
        target.appendChild(this.img_container);

        target.appendChild(document.createElement('br'));

        const block_size_label = document.createElement("label");
        block_size_label.innerText = "Block size:";
        const block_size_input = document.createElement("input");
        block_size_input.type = "number";
        block_size_input.max = 1000;
        block_size_input.min = 5;
        block_size_input.step = 5;
        block_size_input.value = this.block_size;
        block_size_input.addEventListener('change', () => {
            this.change_block_size(Math.floor(block_size_input.value));
        });
        target.appendChild(block_size_label);
        target.appendChild(block_size_input);

        target.appendChild(document.createElement('br'));
        const palettelen_label = document.createElement("label");
        palettelen_label.innerText = "Number of colors:";
        const palettelen_input = document.createElement("input");
        palettelen_input.type = "number";
        palettelen_input.max = 200;
        palettelen_input.min = 1;
        palettelen_input.step = 1;
        palettelen_input.value = this.palettelen;
        palettelen_input.addEventListener('change', () => {
            this.change_palettelen(Math.floor(palettelen_input.value));
        });
        target.appendChild(palettelen_label);
        target.appendChild(palettelen_input);

        target.appendChild(document.createElement('br'));
        const url_label = document.createElement("label");
        url_label.innerText = "URL: ";
        const url_input = document.createElement("input");
        url_input.max = 200;
        url_input.min = 1;
        url_input.step = 1;
        url_input.value = this.url;
        url_input.addEventListener('change', () => {
            this.change_url(url_input.value);
        });
        target.appendChild(url_label);
        target.appendChild(url_input);

        const random_btn = document.createElement('button');
        random_btn.innerText = "Random Image";
        random_btn.addEventListener('click', () => {
            this.random_url();
        });
        target.appendChild(random_btn);

        target.appendChild(document.createElement('br'));
        const animate_label = document.createElement("label");
        animate_label.innerText = "Animate: ";
        const animate_input = document.createElement("input");
        animate_input.type = 'checkbox';
        animate_input.checked = this.animate;
        animate_input.addEventListener('change', () => {
            this.animate = animate_input.checked;
        });
        target.appendChild(animate_label);
        target.appendChild(animate_input);

    }

    async getImage() {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.src = this.url;
        img.style.display = 'none';
        img.style.width = '100%';
        this.img_container.appendChild(img);
        await (new Promise(r => img.onload = r));

        const canvas = document.createElement('canvas');
        canvas.width = this.width;
        canvas.height = this.height;
        canvas.style.width = "100%";
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, this.width, this.height);

        img.style.display = "";
        console.log("DOWNLOADED");
        return ctx;
    }

    getRandomColor() {
        const r = Math.floor(Math.random() * 255);
        const g = Math.floor(Math.random() * 255);
        const b = Math.floor(Math.random() * 255);
        return [r, g, b];
    }

    async generatePallete() {
        this.colors = [];
        for (let i = 0; i < this.palettelen; i++) {
            this.colors.push(this.getRandomColor());
            if (this.cancel_gen)
                break;
            if (this.animate)
                await new Promise(r => setTimeout(r, 100));
        }
    }

    async generateFinal() {
        this.img_container.querySelectorAll("img").forEach(x => x.remove());
        const final_image = await this.getImage();

        this.final_data = final_image.getImageData(0, 0, this.width, this.height);
        this.generateFinalColors();
    }

    generateFinalColors() {
        this.final_colors = [];
        let y_max = Math.floor(this.height / this.block_size);
        let x_max = Math.floor(this.width / this.block_size);
        for (let y = 0; y < y_max; y++) {
            for (let x = 0; x < x_max; x++) {
                const start_y = y * this.block_size;
                const start_x = x * this.block_size;
                const avg_color = [0, 0, 0];
                for (let i_y = 0; i_y < this.block_size; i_y++) {
                    for (let i_x = 0; i_x < this.block_size; i_x++) {
                        const idx = 4 * ((start_y + i_y) * this.width + (start_x + i_x));
                        avg_color[0] += this.final_data.data[idx] / this.block_size_2;
                        avg_color[1] += this.final_data.data[idx + 1] / this.block_size_2;
                        avg_color[2] += this.final_data.data[idx + 2] / this.block_size_2;
                    }
                }

                this.final_colors.push(avg_color);
            }
        }
    }

    draw(resolver) {
        if (this.colors.length) {
            let y_max = Math.floor(this.height / this.block_size);
            let x_max = Math.floor(this.width / this.block_size);
            for (let idx_y = 0; idx_y < y_max; idx_y++) {
                for (let idx_x = 0; idx_x < x_max; idx_x++) {
                    const idx = idx_y * x_max + idx_x;

                    const target_color = this.final_colors[idx];
                    if (!target_color) {
                        console.log('!', idx, idx_y, idx_x, this.final_colors.length);
                    }
                    let best = Infinity;
                    let best_color = null;
                    for (let i = 0; i < this.colors.length; i++) {
                        const dist = target_color.map(
                            (x, c) => Math.abs(x - this.colors[i][c])).reduce((x, y) => x + y);
                        if (best > dist) {
                            best = dist;
                            best_color = this.colors[i];
                        }
                    }

                    this.ctx.fillStyle = `rgb(${best_color[0]}, ${best_color[1]}, ${best_color[2]})`;
                    this.ctx.beginPath();
                    this.ctx.rect(
                        idx_x * this.block_size, idx_y * this.block_size,
                        this.block_size, this.block_size,
                    );
                    this.ctx.fill();
                }
            }

        }

        if (this.cancel_draw || this.colors.length == this.palettelen)
            resolver();
        else
            setTimeout(() => { requestAnimationFrame(() => this.draw(resolver)) }, 100);
    }

    async cancel_drawing() {
        if (!this.draw_promise)
            return;
        this.cancel_draw = true;
        await this.draw_promise;
        this.draw_promise = null;
        this.cancel_draw = false;
    }

    async cancel_generating() {
        if (!this.gen_promise)
            return;
        this.cancel_gen = true;
        await this.gen_promise;
        this.gen_promise = null;
        this.cancel_gen = false;
    }

    async generate_and_draw() {
        await this.cancel_drawing();
        console.log("done cancelling draw");
        await this.cancel_generating();
        console.log("done cancelling gen");

        await this.generateFinal();
        console.log("done regenerating");

        this.gen_promise = this.generatePallete();
        this.draw_promise = new Promise(r => { this.draw(r); });
    }

    async change_block_size(block_size) {
        await this.cancel_drawing();
        this.block_size = block_size;
        this.block_size_2 = block_size * block_size;

        this.generateFinalColors();

        this.draw_promise = new Promise(r => { this.draw(r); });
    }

    async change_palettelen(new_len) {
        this.palettelen = new_len;
        return this.generate_and_draw();
    }

    async change_url(url) {
        console.log("Url is now", url);
        this.url = url;
        return this.generate_and_draw();
    }

    async random_url() {
        return this.change_url(this.picsumurl());
    }
}

async function main(target) {
    window.pixelator = new Pixelator(target);
    pixelator.generate_and_draw();
}
