async function getImage(url) {
  const img = new Image();
  img.crossOrigin = 'anonymous';
  img.src = url;
  img.style.display = 'none';
  img.style.width = '100%';
  document.body.appendChild(img);
  await (new Promise(r => img.onload = r));

  const canvas = document.createElement('canvas');
  canvas.width = 500;
  canvas.height = 500;
  canvas.style.width = "100%";
  const ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height);
  return ctx;
}

const tau = 2 * Math.PI;

ver3_main = async (container, img_path, shader_path) => {

  const canvas = document.createElement("canvas");
  container.appendChild(canvas);

  const img = await getImage(img_path);
  canvas.width = img.canvas.width;
  canvas.height = img.canvas.height;
  const imgdata = img.getImageData(0, 0, img.canvas.width, img.canvas.height);


    const gl = canvas.getContext(
        "webgl2", {premultipliedAlpha: false, 'preserveDrawingBuffer': true});
  enableGlExts(gl);

  const  img_buffer = createTexture(gl, [500, 500], img.canvas);

  // TODO get fragShader
  const fragShader = await getFile(shader_path);
  const programInfo = twgl.createProgramInfo(gl, [vs, fragShader]);
  const bufferInfo = twgl.createBufferInfoFromArrays(gl, bufferArrays);
  setupProgram(gl, programInfo, bufferInfo);

  const test_batch_size = 250;
  const fb_test = new FrameBufferManager(gl, [test_batch_size, 1]);
  const test_buffer = new Float32Array(test_batch_size * 4);
  const fb_hits = new FrameBufferManager(gl, [500, 500]);
  const fb_result = new FrameBufferManager(gl, [500, 500]);

  const draw_limit = 12500;
  const draw_batch_size = 12500;
  const draw_timeout = 0;
  const attempt_limit = 10;

  let avg_fail_count = 0;
  let errors = 0;
  let total_errors = 0;
  const total_error_limit = attempt_limit * draw_limit / 4;

  let total_cgen_time = 0;
  let total_ctest_time = 0;

  console.time("draw");
  let draw_count = 0;
    const draw = () => {
      for (let batch_i = 0; batch_i < draw_batch_size; batch_i+=test_batch_size) {
      draw_count -= errors;
      if (draw_count > draw_limit || total_errors > total_error_limit) {
        console.timeEnd("draw");
        document.getElementById("stats").innerHTML =
          `FINAL STATS: ${draw_count} ${draw_limit} ${total_errors} ${total_error_limit}` +
          `<br>` +
          `timers ${total_cgen_time} ${total_ctest_time}`;
        return;
      }

        const cgen_start = (new Date()).getTime();
      const circles = [];
      for (let circle_i = 0; circle_i < test_batch_size; circle_i++) {
        const x = Math.floor(Math.random() * img.canvas.width);
        const y = Math.floor(Math.random() * img.canvas.height);

        const idx = 4 * (y * img.canvas.width + x);
        const r = imgdata.data[idx];
        const g = imgdata.data[idx + 1];
        const b = imgdata.data[idx + 2];
        const gray_value = 0.3 * r + 0.59 * g + 0.11 * b;
        let radius = Math.ceil(Math.exp(gray_value / 255 * 5)/Math.exp(5) * 8);
        if (radius == 0) {
          continue;
        }
        radius += 1;

        let failed = false;
        const ctest_start = (new Date()).getTime();
        for (let prev of circles) {
          const dx = Math.abs(prev.desc[0] - x);
          const dy = Math.abs(prev.desc[1] - y);

          const max_r = prev.desc[2] + radius;
          if (dx > max_r || dy > max_r) {
            continue;
          }

          const dist = dx * dx + dy * dy;
          if (dist <= Math.pow(max_r, 2)) {
            failed = true;
            break;
          }
        }
        const ctest_end = (new Date()).getTime();
        total_ctest_time += ctest_end - ctest_start;
        if (failed) {
          continue;
        }

        circles.push({desc: [x, y, radius], color: [r, g, b]});
      }

        const cgen_end = (new Date()).getTime();
        total_cgen_time += cgen_end - cgen_start;
      for (let i = 0; i < circles.length; i++) {
        const circle = circles[i];
        let idx = circle.desc[0] * circle.desc[1];
        test_buffer[i * 4 + 0] = circle.desc[0];
        test_buffer[i * 4 + 1] = circle.desc[1];
        test_buffer[i * 4 + 2] = circle.desc[2];
        test_buffer[i * 4 + 3] = 1;
      }

      updateTexture(gl, [test_batch_size, 1], fb_test.src(), test_buffer, gl.RGBA32F);
      twgl.setUniforms(programInfo, {
        u_coord_texture: fb_test.src(),
        u_pixel_texture: fb_hits.src(),
        u_opcode: 1,
        u_coord_count: test_batch_size,
        u_dimensions: [500, 500],
      });
      fb_test.bind_dst();
      render(gl);

      twgl.setUniforms(programInfo, {
        u_coord_texture: fb_test.dst(),
        u_pixel_texture: fb_hits.src(),
        u_img_texture: img_buffer,
        u_opcode: 2,
        u_coord_count: test_batch_size,
        u_dimensions: [500, 500],
      });
      fb_hits.bind_dst();
      render(gl);
      fb_hits.flipflop();

      twgl.setUniforms(programInfo, {
        u_coord_texture: fb_test.dst(),
        u_pixel_texture: fb_hits.src(),
        u_img_texture: img_buffer,
        u_opcode: 2,
        u_coord_count: test_batch_size,
        u_dimensions: [500, 500],
      });
      fb_hits.bind_dst();
      render(gl);
      fb_hits.flipflop();

      twgl.setUniforms(programInfo, {
        u_coord_texture: fb_test.dst(),
        u_pixel_texture: fb_result.src(),
        u_img_texture: img_buffer,
        u_opcode: 3,
        u_coord_count: test_batch_size,
        u_dimensions: [500, 500],
      });
      fb_result.bind_dst();
      render(gl);
      fb_result.flipflop();

      twgl.setUniforms(programInfo, {
        u_coord_texture: fb_test.dst(),
        u_pixel_texture: fb_result.src(),
        u_img_texture: img_buffer,
        u_opcode: 4,
        u_coord_count: test_batch_size,
        u_dimensions: [500, 500],
      });
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      render(gl);

      draw_count += test_batch_size - errors;
      total_errors += errors;
      errors = 0;
    }

    if (draw_timeout) {
      setTimeout(()=> { requestAnimationFrame(draw); }, draw_timeout);
    } else {
      requestAnimationFrame(draw);
    }
  };
  draw();
};
