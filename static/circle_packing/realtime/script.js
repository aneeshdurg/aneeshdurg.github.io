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

ver7_main = async (container, img_path, shader_path) => {

  const canvas = document.createElement("canvas");
  container.appendChild(canvas);

  const img = await getImage(img_path);
  canvas.width = img.canvas.width;
  canvas.height = img.canvas.height;

  const gl = canvas.getContext(
      "webgl2", {premultipliedAlpha: false, 'preserveDrawingBuffer': false});
  enableGlExts(gl);

  // TODO get fragShader
  const fragShader = await getFile(shader_path);
  const programInfo = twgl.createProgramInfo(gl, [vs, fragShader]);
  const bufferInfo = twgl.createBufferInfoFromArrays(gl, bufferArrays);
  setupProgram(gl, programInfo, bufferInfo);

  //// console.time("total");
  const test_batch_size = 250;

  const fb_test = new FrameBufferManager(gl, [test_batch_size, 1]);
  const fb_test_clear = new Float32Array(test_batch_size * 4);
  const test_buffer = new Float32Array(test_batch_size * 4);

  const fb_hits = new FrameBufferManager(gl, [500, 500]);
  const fb_result = new FrameBufferManager(gl, [500, 500]);
  const fb_clear = new Float32Array(500 * 500 * 4);

  const clear_fbs = () => {
    updateTexture(gl, [test_batch_size, 1], fb_test.src(), fb_test_clear, gl.RGBA32F);
    updateTexture(gl, [test_batch_size, 1], fb_test.dst(), fb_test_clear, gl.RGBA32F);

    updateTexture(gl, [500, 500], fb_hits.src(), fb_clear, gl.RGBA32F);
    updateTexture(gl, [500, 500], fb_hits.dst(), fb_clear, gl.RGBA32F);

    updateTexture(gl, [500, 500], fb_result.src(), fb_clear, gl.RGBA32F);
    updateTexture(gl, [500, 500], fb_result.dst(), fb_clear, gl.RGBA32F);
  };

  const draw_limit = 12500;
  const batch_cnt = 1;

  const canvas_h = img.canvas.height;
  const canvas_w = img.canvas.width;

  // Copy canvas into webgl buffer
  const img_buffer = createTexture(gl, [500, 500], img.canvas);

  const imgdata = img.getImageData(0, 0, img.canvas.width, img.canvas.height);
  const getRadius = (x, y) => {
    const idx = 4 * (y * canvas_w + x);
    const r = imgdata.data[idx];
    const g = imgdata.data[idx + 1];
    const b = imgdata.data[idx + 2];
    const gray_value = 0.3 * r + 0.59 * g + 0.11 * b;
    let radius = Math.ceil(Math.exp(gray_value / 255 * 5)/Math.exp(5) * 8);
    return radius + 1;
  }

  const statsDOM = document.getElementById("stats");

  let draw_count = 0;

  let global_start = performance.now();

  let circles_x = new Uint32Array(test_batch_size);
  let circles_y = new Uint32Array(test_batch_size);
  let circles_r = new Uint32Array(test_batch_size);

  const resetState = () => {
    draw_count = 0;

    global_start = performance.now();

    circles_x = new Uint32Array(test_batch_size);
    circles_y = new Uint32Array(test_batch_size);
    circles_r = new Uint32Array(test_batch_size);
  };

  const renderToScreen = () => {
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
  };

  const draw = async () => {
    while (draw_count < draw_limit) {
    // for (let batch_i = 0; batch_i < batch_cnt; batch_i++) {
      let circle_cnt = 0;
      for (let circle_i = 0; circle_i < test_batch_size; circle_i++) {
        const x = Math.random() * canvas_w | 0;
        const y = Math.random() * canvas_h | 0;

        let radius = getRadius(x, y);
        if (radius == 1) {
          continue;
        }

        let failed = 0;
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
        if (failed) {
          continue;
        }
        circles_x[circle_cnt] = x;
        circles_y[circle_cnt] = y;
        circles_r[circle_cnt] = radius;
        circle_cnt++;
      }

      for (let i = 0; i < circle_cnt; i++) {
        const x = circles_x[i];
        const y = circles_y[i];
        const r = circles_r[i];
        test_buffer[i * 4 + 0] = x;
        test_buffer[i * 4 + 1] = y;
        test_buffer[i * 4 + 2] = r;
        test_buffer[i * 4 + 3] = 1;
      }
      draw_count += test_batch_size;//circle_cnt;

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

      renderToScreen();
      await new Promise((r) => setTimeout(r, 0));
    }

    // renderToScreen();
    const total_time = performance.now() - global_start;
    // clear_fbs();
    // resetState();
    // requestAnimationFrame(draw);
  };

  requestAnimationFrame(draw);
};
