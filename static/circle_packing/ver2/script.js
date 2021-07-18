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

const tau = 2 * Math.PI;

ver2_main = async (container, img_path, shader_path) => {

  const canvas = document.createElement("canvas");
  const hitcanvas = document.createElement("canvas");
  container.appendChild(canvas);
  // document.body.appendChild(hitcanvas);

  const ctx = canvas.getContext("2d");
  const img = await getImage(img_path);
  canvas.width = img.canvas.width;
  canvas.height = img.canvas.height;
  const imgdata = img.getImageData(0, 0, img.canvas.width, img.canvas.height);

  hitcanvas.width = canvas.width;
  hitcanvas.height = canvas.height;

  const hitgl = hitcanvas.getContext("webgl2", {premultipliedAlpha: false});
  enableGlExts(hitgl);
  // TODO get fragShader
  const fragShader = await getFile(shader_path);
  const programInfo = twgl.createProgramInfo(hitgl, [vs, fragShader]);
  const bufferInfo = twgl.createBufferInfoFromArrays(hitgl, bufferArrays);
  setupProgram(hitgl, programInfo, bufferInfo);

  const test_batch_size = 200;
  const fb_test = new FrameBufferManager(hitgl, [test_batch_size, 1]);
  const test_buffer = new Float32Array(test_batch_size * 4);
  const fb_hits = new FrameBufferManager(hitgl, [1000, 1000]);

  const draw_limit = 100000;
  const draw_batch_size = 2000;
  const draw_timeout = 0;
  const attempt_limit = 10;

  let avg_fail_count = 0;
  let errors = 0;
  let total_errors = 0;
  const total_error_limit = attempt_limit * draw_limit / 2;

  console.time("draw");
  let draw_count = 0;
    const draw = () => {
      for (let batch_i = 0; batch_i < draw_batch_size; batch_i+=test_batch_size) {
      draw_count -= errors;
      if (draw_count > draw_limit || total_errors > total_error_limit) {
        console.timeEnd("draw");
        console.log("FINAL STATS:", draw_count, draw_limit, total_errors, total_error_limit);
        return;
      }

      const circles = [];
      for (let circle_i = 0; circle_i < test_batch_size; circle_i++) {
        const x = Math.floor(Math.random() * img.canvas.width);
        const y = Math.floor(Math.random() * img.canvas.height);

        const idx = 4 * (y * img.canvas.width + x);
        const r = imgdata.data[idx];
        const g = imgdata.data[idx + 1];
        const b = imgdata.data[idx + 2];
        const gray_value = 0.3 * r + 0.59 * g + 0.11 * b;
        let radius = Math.ceil(gray_value / 255 * 5);
        if (radius == 0) {
          continue;
        }

        let failed = false;
        for (let prev of circles) {
          const dx = prev.desc[0] - x;
          const dy = prev.desc[1] - y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist <= (prev.desc[2] + radius)) {
            failed = true;
            break;
          }
        }
        if (failed) {
          continue;
        }

        circles.push({desc: [x, y, radius], color: [r, g, b]});
      }

      for (let i = 0; i < circles.length; i++) {
        const circle = circles[i];
        let idx = circle.desc[0] * circle.desc[1];
        test_buffer[i * 4 + 0] = circle.desc[0];
        test_buffer[i * 4 + 1] = circle.desc[1];
        test_buffer[i * 4 + 2] = circle.desc[2];
        test_buffer[i * 4 + 3] = 1;
      }

      updateTexture(hitgl, [test_batch_size, 1], fb_test.src(), test_buffer, hitgl.RGBA32F);
      twgl.setUniforms(programInfo, {
        u_coord_texture: fb_test.src(),
        u_pixel_texture: fb_hits.src(),
        u_opcode: 1,
        u_coord_count: test_batch_size,
        u_dimensions: [1000, 1000],
      });
      fb_test.bind_dst();
      hitgl.finish();

      render(hitgl);
      hitgl.finish();

      const test_data = new Float32Array(test_batch_size * 4);
      hitgl.readPixels(0, 0, test_batch_size, 1, hitgl.RGBA, hitgl.FLOAT, test_data);

      twgl.setUniforms(programInfo, {
        u_coord_texture: fb_test.dst(),
        u_pixel_texture: fb_hits.src(),
        u_opcode: 2,
        u_coord_count: test_batch_size,
        u_dimensions: [1000, 1000],
      });
      fb_hits.bind_dst();
      hitgl.finish();

      render(hitgl);
      hitgl.finish();

      fb_hits.flipflop();

      // DEBUG render
      /*
      twgl.setUniforms(programInfo, {u_opcode: 3});
      hitgl.bindFramebuffer(hitgl.FRAMEBUFFER, null);
      render(hitgl);
      hitgl.finish();
      */

      for (let i = 0; i < circles.length; i++) {
        if (test_data[i * 4 + 3] == 0) {
          errors++;
          continue;
        }

        const circle = circles[i];
        const r = circle.color[0];
        const g = circle.color[1];
        const b = circle.color[2];
        ctx.beginPath();
        ctx.strokeStyle = `rgb(${r}, ${g}, ${b})`;
        ctx.arc(...circle.desc, 0, tau);
        ctx.stroke();
      }

      draw_count += test_batch_size - errors;
      total_errors += errors;
      errors = 0;
    }
    console.log(draw_count, draw_limit, total_errors, total_error_limit);

    if (draw_timeout) {
      setTimeout(()=> { requestAnimationFrame(draw); }, draw_timeout);
    } else {
      requestAnimationFrame(draw);
    }
  };
  draw();
};
