ver8_main = async (container, img_path, shader_path) => {
  const video = document.createElement("video");
  console.log(video);
  container.innerHTML = `<label for="webcamSelector">Choose a webcam: </label>`
  const selector = document.createElement("select");
  selector.id = "webcamSelector";
  container.appendChild(selector);
  container.appendChild(document.createElement("br"));

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

  const dimensions = [500, 500];

  canvas.width = dimensions[0];
  canvas.height = dimensions[1];

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
  const random_buffer = new FrameBufferManager(gl, dimensions);
  const random_buffer_src = new Float32Array(4 * dimensions[0] * dimensions[1]);

  const radius_buffer = new FrameBufferManager(gl, dimensions);

  twgl.setUniforms(programInfo, {u_dimensions: dimensions, u_radius_factor: 5, u_max_radius: 8});

  let video_dimensions = null;
  let resize_buffer_in = null;
  const draw = () => {
    if (video.readyState != 4) {
      video_dimensions = null;
      return;
    }

    if (!video_dimensions) {
      video_dimensions = [video.videoWidth, video.videoHeight];
      resize_buffer_in = createTexture(gl, video_dimensions, video);
    } else {
      updateTexture(gl, video_dimensions, resize_buffer_in, video);
    }


    // create randomized texture
    for (let i = 0; i < random_buffer_src.length; i++) {
      random_buffer_src[i] = Math.random();
    }
    updateTexture(gl, dimensions, random_buffer.src(), random_buffer_src);
    twgl.setUniforms(programInfo, {
          u_img_texture: resize_buffer_in,
          u_in_dimensions: video_dimensions,
          u_random_texture: random_buffer.src(),
          u_opcode: 1,
        });
    random_buffer.bind_dst();
    render(gl);

    twgl.setUniforms(programInfo, {
          u_img_texture: random_buffer.dst(),
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
