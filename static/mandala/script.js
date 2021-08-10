function getRandomColor(x) {
    const colors = ["red", "blue", "green", "cyan", "turquoise", "purple", "black"];
    return colors[Math.floor(Math.random() * colors.length)];
}

class Layer {
    constructor(r, step_bound) {
        this.x_offset = Math.floor(Math.random() * step_bound);
        this.y_offset = Math.floor(Math.random() * step_bound) - r;
        if (r == 0) {
            this.x_offset = 0;
            this.y_offset = 0;
        }

        this.draw_r = Math.floor(Math.random() * step_bound)
        this.replication_factor = 1 + Math.floor(Math.random() * 99);
        if (r == 0) {
            this.replication_factor = 1;
        }

        this.skew = Math.random() * 2 * Math.PI;
        if (r == 0) {
            this.skew = 0;
        }

        this.startangle = Math.random() * 2 * Math.PI;
        this.endangle = Math.random() * 2 * Math.PI;
        if (r == 0) {
            this.startangle = 0;
            this.endangle = 2 * Math.PI;
        }
        this.clockwise = Math.random() > 0.5;

        this.color = getRandomColor(Math.random());

        const chance = (p) => {
            if (r == 0)
                return 0;
            return Math.random() < p;
        }
        this.move_orbit      = chance(0.5) ? (0.5 * Math.random()) : 0;
        this.move_orbit_dir  = chance(0.5);
        this.move_rotate     = chance(0.5) ? (10 * Math.random()) : 0;
        this.move_rotate_dir = chance(0.5);
        this.move_pulse_amp  = chance(0.25) ? 20 * Math.random() : 0;
        this.move_pulse_freq = 10 * Math.random();
    }

    draw(ctx, t) {
        ctx.save();
        const orbit = (this.move_orbit_dir ? 1 : -1) * this.move_orbit * t;
        const rotate = (this.move_rotate_dir ? 1 : -1) * this.move_rotate * t;
        ctx.rotate(this.skew + orbit);
        ctx.strokeStyle = this.color;
        for (let i = 0; i < this.replication_factor; i++) {
            ctx.rotate(2 * Math.PI / this.replication_factor);
            ctx.beginPath();
            // TODO support drawing other shapes
            ctx.arc(
                this.x_offset,
                this.y_offset + this.move_pulse_amp * Math.sin(t * this.move_pulse_freq),
                this.draw_r,
                this.startangle + rotate,
                this.endangle + rotate,
                this.clockwise
            );
            ctx.stroke();
        }
        ctx.restore();
    }
}


class Mandala {
    constructor(canvas) {
        this.canvas = canvas;
        this.canvas.width = 1000;
        this.canvas.height = 1000;
        this.ctx = canvas.getContext("2d");
        this.ctx.translate(500, 500);

        this.step_bound = 10;

        this.layers = [];
    }

    step(r) {
        this.layers.push(new Layer(r, this.step_bound));
    }

    draw(t) {
        this.ctx.beginPath();
        this.ctx.fillStyle = "black";
        this.ctx.rect(-500, -500, 1000, 1000);
        this.ctx.fill();
        for (let layer of this.layers) {
            layer.draw(this.ctx, t / 1000);
        }
    }
}
