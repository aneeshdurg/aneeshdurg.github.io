async function getImage(url) {
  const img = new Image();
  img.crossOrigin = 'anonymous';
  img.src = url;
  img.style.display = 'none';
  img.style.width = '100%';
  document.body.appendChild(img);
  await (new Promise(r => img.onload = r));

  const canvas = document.createElement('canvas');
  canvas.width = 1000;
  canvas.height = 1000;
  canvas.style.width = "100%";
  const ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height);
  return ctx;
}

ver1_main = async (container, img_path) => {
  const canvas = document.createElement("canvas");
  const hitcanvas = document.createElement("canvas");
  container.appendChild(canvas);

  const ctx = canvas.getContext("2d");
  const hitctx = hitcanvas.getContext("2d");

  const img = await getImage(img_path);
  canvas.width = img.canvas.width;
  canvas.height = img.canvas.height;
  const imgdata = img.getImageData(0, 0, img.canvas.width, img.canvas.height);

  hitcanvas.width = canvas.width;
  hitcanvas.height = canvas.height;
  hitctx.fillStyle = "rgb(0, 0, 255)";

  const draw_limit = 100000;
  const draw_batch_size = 1000;
  const draw_timeout = 0;
  const attempt_limit = 10;

  let errors = 0;

  console.time("draw");
  let draw_count = 0;
  const draw = () => {
    for (let batch_i = 0; batch_i < draw_batch_size; batch_i ++) {
      draw_count++;
      if (draw_count > draw_limit) {
        console.timeEnd("draw");
        console.log(draw_count, draw_limit, draw_count - errors);
        return;
      }

      let num_attempts = 0;
      while (true) {
        const x = Math.floor(Math.random() * img.canvas.width);
        const y = Math.floor(Math.random() * img.canvas.height);

        const idx = 4 * (y * img.canvas.width + x);
        const r = imgdata.data[idx];
        const g = imgdata.data[idx + 1];
        const b = imgdata.data[idx + 2];
        const gray_value = 0.3 * r + 0.59 * g + 0.11 * b;
        const radius = gray_value / 255 * 5;
        if (radius == 0) {
          continue;
        }

        let failed = false;

        const ra = Math.ceil(radius);
        const d = 2 * ra;
        const hitdata = hitctx.getImageData(x - ra, y - ra, d, d);
        for (let px = 0; px < hitdata.data.length; px += 4) {
          const h_b = hitdata.data[px + 2];
          if (h_b > 0) {
            failed = true;
            break;
          }
        }

        if (failed) {
          num_attempts++;
          if (num_attempts > attempt_limit) {
            errors++;
            break;
          }
          continue;
        }

        const current = [x, y, radius];

        ctx.beginPath();
        ctx.strokeStyle = `rgb(${r}, ${g}, ${b})`;
        ctx.arc(...current, 0, Math.PI * 2);
        ctx.stroke();

        hitctx.beginPath();
        hitctx.arc(...current, 0, 2 * Math.PI, false);
        hitctx.fill();

        break;
      }
    }

    console.log(draw_count, draw_limit, errors);

    if (draw_timeout) {
      setTimeout(()=> { requestAnimationFrame(draw); }, draw_timeout);
    } else {
      requestAnimationFrame(draw);
    }
  };
  draw();
};
