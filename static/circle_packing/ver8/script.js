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

ver8_main = async (container, img_path, shader_path) => {
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

  // allocate buffers
  const junk = new FrameBufferManager(gl, [1, 1]);

  // do we really need all 4 channels here?
  const random_buffer = new FrameBufferManager(gl, [500, 500]);
  const random_buffer_src = new Float32Array(4 * 500 * 500);

  const radius_buffer = new FrameBufferManager(gl, [500, 500]);

  twgl.setUniforms(programInfo, {u_dimensions: [500, 500]});

  const draw = () => {
    const imgdata = img.getImageData(0, 0, img.canvas.width, img.canvas.height);

    // Copy canvas into webgl buffer
    updateTexture(gl, [500, 500], radius_buffer.src(), img.canvas);

    twgl.setUniforms(programInfo, {
          u_img_texture: radius_buffer.src(),
          u_opcode: 0,
        });
        radius_buffer.bind_dst();
    render(gl);

    // create randomized texture
    for (let i = 0; i < random_buffer_src.length; i++) {
      random_buffer_src[i] = Math.random();
    }
    updateTexture(gl, [500, 500], random_buffer.src(), random_buffer_src);
    twgl.setUniforms(programInfo, {
          u_radius_texture: radius_buffer.dst(),
          u_random_texture: random_buffer.src(),
          u_opcode: 1,
        });
    random_buffer.bind_dst();
    render(gl);

    twgl.setUniforms(programInfo, {
          u_radius_texture: random_buffer.dst(),
          u_img_texture: radius_buffer.src(),
          u_opcode: 2,
        });
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    render(gl);
  };

  return draw;
};
