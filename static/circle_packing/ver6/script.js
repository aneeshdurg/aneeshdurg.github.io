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

ver6_main = async (container, img_path, shader_path) => {

  const canvas = document.createElement("canvas");
  container.appendChild(canvas);

  const img = await getImage(img_path);
  canvas.width = img.canvas.width;
  canvas.height = img.canvas.height;

  const gl = canvas.getContext(
      "webgl2", {premultipliedAlpha: false, 'preserveDrawingBuffer': true});
  enableGlExts(gl);

  const  img_buffer = createTexture(gl, [500, 500], img.canvas);

  // TODO get fragShader
  const fragShader = await getFile(shader_path);
  const programInfo = twgl.createProgramInfo(gl, [vs, fragShader]);
  const bufferInfo = twgl.createBufferInfoFromArrays(gl, bufferArrays);
  setupProgram(gl, programInfo, bufferInfo);

  console.time("total");
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

  const canvas_h = img.canvas.height;
  const canvas_w = img.canvas.width;
  const imgdata = img.getImageData(0, 0, img.canvas.width, img.canvas.height);

  let global_start = performance.now();
  const global_timeout = 30;

  console.time("precompute");
  const getRadius = (x, y) => {
    const idx = 4 * (y * canvas_w + x);
    const r = imgdata.data[idx];
    const g = imgdata.data[idx + 1];
    const b = imgdata.data[idx + 2];
    const gray_value = 0.3 * r + 0.59 * g + 0.11 * b;
    let radius = Math.ceil(Math.exp(gray_value / 255 * 5)/Math.exp(5) * 8);
    return radius + 1;
  }

  const bigR = new Uint32Array(canvas_w * canvas_h);
  let bigRLength = 0;
  const smallR = new Uint32Array(canvas_w * canvas_h);
  let smallRLength = 0;
  for (let y = 0; y < canvas_h; y++) {
    for (let x = 0; x < canvas_w; x++) {
      const r = getRadius(x, y);
      const idx = y * canvas_w + x;
      if (r > 2) {
        bigR[bigRLength++] = idx;
      } else {
        smallR[smallRLength++] = idx;
      }
    }
  }
  console.timeEnd("precompute");
  console.log("brl", bigRLength, "srl", smallRLength);

  let global_batch_count = 0;


  const circles_x = new Uint32Array(test_batch_size);
  const circles_y = new Uint32Array(test_batch_size);
  const circles_r = new Uint32Array(test_batch_size);

  console.time("draw");
  let draw_count = 0;
    const draw = () => {
      for (let batch_i = 0; batch_i < draw_batch_size; batch_i+=test_batch_size) {
        global_batch_count++;
        draw_count -= errors;
        const exceeded_timeout = false;//(performance.now() - global_start) > global_timeout;
        if (exceeded_timeout ||  draw_count > draw_limit || total_errors > total_error_limit) {
          console.timeEnd("draw");
          document.getElementById("stats").innerHTML =
            `FINAL STATS: ${draw_count} ${draw_limit} ${total_errors} ${total_error_limit}` +
            `<br>` +
            `timers ${total_cgen_time} ${total_ctest_time}`;
          console.timeEnd("total");
          return;
        }

        const cgen_start = performance.now();
        let circle_cnt = 0;
        for (let circle_i = 0; circle_i < test_batch_size; circle_i++) {
          // Randomly pick a point from either bigR or smallR. The probability
          // that we pick a point from bigR decreases as global_batch_count
          // increases
          const pick_big = Math.random() > 0.75;
          const idx = pick_big ?
            bigR[Math.floor(Math.random() * bigRLength)] :
            smallR[Math.floor(Math.random() * smallRLength)];
          const x = idx % canvas_w;
          const y = idx / canvas_w | 0; // | 0 casts to int for int division

          let radius = getRadius(x, y);
          if (radius == 1) {
            continue;
          }

          let failed = 0;
          const ctest_start = performance.now();
          for (let circle_j = 0; circle_j < circle_cnt; circle_j++) {
            const prev_x = circles_x[circle_j];
            const prev_y = circles_y[circle_j];
            const prev_r = circles_r[circle_j];

            const dx = prev_x - x;
            const dy = prev_y - y;
            const dist = dx * dx + dy * dy;

            const max_r = Math.pow(prev_r + radius, 2);
            if (dist <= max_r) {
              failed = true;
              break;
            }
          }
          const ctest_end = performance.now();
          total_ctest_time += ctest_end - ctest_start;
          if (failed) {
            continue;
          }
          circles_x[circle_cnt] = x;
          circles_y[circle_cnt] = y;
          circles_r[circle_cnt] = radius;
          circle_cnt++;
        }

        const cgen_end = performance.now();
        total_cgen_time += cgen_end - cgen_start;
        for (let i = 0; i < circle_cnt; i++) {
          const x = circles_x[i];
          const y = circles_y[i];
          const r = circles_r[i];
          test_buffer[i * 4 + 0] = x;
          test_buffer[i * 4 + 1] = y;
          test_buffer[i * 4 + 2] = r;
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
