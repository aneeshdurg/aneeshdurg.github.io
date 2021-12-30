class Fractal {
  constructor(canvas, n) {
    this.canvas = canvas;
    this.n = n;

    this.canvas.width  = 1000;
    this.canvas.height = 1000;
    this.ctx = canvas.getContext("2d");

    // 1 / Math.sqrt(n)
    // 2 * Math.sin(Math.PI / this.n)
    // n = 8, factor = (1/3 + 1/4) / 2 ???
    // n = 6, factor = (1/3 + 1/2) / 2
    // n = 8, factor = (1/3 + 1/2) / 2
    this.factor = 1 / (2 * Math.sin(Math.PI / this.n));
    this.draw_bounding_circle = false;
    this.fill = false;
  }

  /// Get the angle of the nth point on the circle
  get_angle(n) {
    return n * 2 * Math.PI / this.n;
  }

  get_vertex(center, r, rotation, n) {
    const angle = this.get_angle(n) + rotation;
    const pos = [Math.cos(angle), Math.sin(angle)].map(e => r * e);
    pos[0] += center[0];
    pos[1] += center[1];
    return pos;
  }

  draw_shape(ctx, center, r, rotation) {
    rotation = rotation || 0;
    const movetoangle = (angle_n) => {
      return this.get_vertex(center, r, rotation, angle_n);
    }

    ctx.strokeStyle = "black";
    ctx.fillStyle = "black";
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.moveTo(...movetoangle(0));
    for (let i = 0; i < this.n; i++) {
        ctx.lineTo(...movetoangle(i));
    }
    ctx.lineTo(...movetoangle(0));
    if (this.fill) {
      ctx.fill();
    } else {
      ctx.stroke();
    }

    if (this.draw_bounding_circle) {
      ctx.strokeStyle = "red";
      ctx.beginPath();
      ctx.arc(...center, r, 0, 2 * Math.PI);
      ctx.stroke();
    }
  }

  draw_level_offscreen(level, radius, mod, draw_all_levels) {
    mod = mod || 1;
    draw_all_levels = draw_all_levels || false;

    // TODO only compute upper bound on dimensions for this level
    // value of sum(n in [0, infinity), r*f^n) - we can ignore mod
    let bound = 2 * radius * 1 / (1 - this.factor)
    // just in case
    bound = Math.ceil(bound * 1.5);

    const c = document.createElement("canvas");
    c.width  = bound;
    c.height = bound;
    const ctx = c.getContext("2d");

    const center = [bound / 2, bound / 2]

    if (radius < 0.5) {
      // Any shapes we draw wouldn't be visible anyway
      return ctx;
    }

    if (level == 0 || draw_all_levels) {
      this.draw_shape(ctx, center, radius * mod);
    }

    if (level == 0) {
      return ctx;
    }

    const lctx = this.draw_level_offscreen(level - 1, radius * this.factor, mod, draw_all_levels);
    for (let i = 0; i < this.n; i++) {
      const vertex = this.get_vertex(center, radius, 0, i);
      vertex[0] -= lctx.canvas.width / 2;
      vertex[1] -= lctx.canvas.height / 2;
      ctx.drawImage(lctx.canvas, ...vertex);
    }

    return ctx;
  }

  draw_level(center, level, radius, mod, draw_all_levels) {
    const ctx = this.draw_level_offscreen(level, radius, mod, draw_all_levels);
    const pos = [center[0] - ctx.canvas.width / 2, center[1] - ctx.canvas.height / 2];
    this.ctx.drawImage(ctx.canvas, ...pos);
  }

  draw_all_levels(center, level, radius, mod) {
    this.draw_level(center, level, radius, mod, true);
  }

  async animate_level(center, level, radius, duration) {
    const sleep = (time) => new Promise(r => { setTimeout(r, time); });

    // for animation
    const offscreenbuffer = document.createElement("canvas");
    offscreenbuffer.width = this.canvas.width;
    offscreenbuffer.height = this.canvas.height;
    const offscreenctx = offscreenbuffer.getContext("2d");


    // Save current state
    offscreenctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    offscreenctx.drawImage(this.canvas, 0, 0);

    const steps = 100;
    for (let i = 1; i <= steps; i++) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.drawImage(offscreenbuffer, 0, 0);
      this.draw_level(center, level, radius, (i / steps));
      await sleep(duration / steps);
    }
  }
}
