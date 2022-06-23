ver8_main = async (container, img_path, shader_path) => {
  const video = document.createElement("video");
  video.width = 500;
  video.height = 500;
  console.log(video);
  container.innerHTML = `<label for="webcamSelector">Choose a webcam: </label>`
  const selector = document.createElement("select");
  selector.id = "webcamSelector";
  container.appendChild(selector);

  let devices = undefined;
  try {
      devices = await navigator.mediaDevices.enumerateDevices();
  } catch (err) {
      alert("Error initializing webcam!");
      throw err;
  }

  devices = devices.filter(d => d.kind === "videoinput");

  devices.forEach(device => {
      const entry = document.createElement("option");
      entry.value = device.deviceId;
      entry.innerHTML = device.label || device.deviceId.substr(0, 10);
      selector.appendChild(entry)
  });

  const selectVideo = async () => {
      const deviceId = selector.value;

      const constraints = {
          video: { deviceId: deviceId }
      }

      try {
          if (video.srcObject) {
              const stream = video.srcObject;
              stream.getTracks().forEach(function(track) {
                  track.stop();
              });
              video.srcObject = null;
          }

          const stream = await navigator.mediaDevices.getUserMedia(constraints);
          video.srcObject = stream;
          video.play();
      } catch (err) {
          alert("Error initializing webcam! " + err);
          console.log(err);
      }
  }
  selector.onchange = selectVideo;
  selectVideo();

  const canvas = document.createElement("canvas");
  container.appendChild(canvas);

  canvas.width = 500;
  canvas.height = 500;

  const gl = canvas.getContext(
      "webgl2", {premultipliedAlpha: false, 'preserveDrawingBuffer': false});
  enableGlExts(gl);

  // TODO get fragShader
  const fragShader = await getFile(shader_path);
  const programInfo = twgl.createProgramInfo(gl, [vs, fragShader]);
  const bufferInfo = twgl.createBufferInfoFromArrays(gl, bufferArrays);
  setupProgram(gl, programInfo, bufferInfo);

  // allocate buffers

  // do we really need all 4 channels here?
  const random_buffer = new FrameBufferManager(gl, [500, 500]);
  const random_buffer_src = new Float32Array(4 * 500 * 500);

  const radius_buffer = new FrameBufferManager(gl, [500, 500]);

  twgl.setUniforms(programInfo, {u_dimensions: [500, 500]});

  let video_dimensions = null;
  const draw = () => {
    if (video.readyState != 4) {
      video_dimensions = null;
      return;
    }

    if (!video_dimensions) {
      video_dimensions = [video.videoWidth, video.videoHeight];
    }
    // Copy canvas into webgl buffer
    const resize_buffer_in = createTexture(gl, video_dimensions, video);
    twgl.setUniforms(programInfo, {
        u_img_texture: resize_buffer_in,
        u_in_dimensions: video_dimensions,
        u_opcode: 3,
      });
    radius_buffer.bind_dst();
    render(gl);
    radius_buffer.flipflop();

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

  const loop = () => {
    draw();
    requestAnimationFrame(loop);
  };
  requestAnimationFrame(loop);
};
