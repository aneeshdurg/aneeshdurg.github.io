document.addEventListener("DOMContentLoaded", () => {
  const startbtn = document.getElementById("start");
  startbtn.onclick = () => {
    startbtn.style.display = "none";
    document.getElementById("synthcontainer").style.display = "";
    window.synth = load_synth(document.getElementById("synth"));
    synth.resize([500, 500]);
    const webcam = synth.channels[0].stageModules["Webcam-0"];
    const circlepacking = synth.channels[0].stageModules["CirclePacking-0"];

    const resizeToWebcam = () => {
      let dims = webcam.fn_params.params.webcam_dimensions;
      if (dims[0] > 0 && dims[1] > 0) {
        while ((dims[0] * dims[1]) > (500 * 500)) {
          dims = dims.map(x => x * 3 / 4);
        }
        dims = dims.map(x => Math.floor(x));
        synth.resize(dims);
      } else {
        setTimeout(resizeToWebcam, 100);
      }
    };
    resizeToWebcam();

    const randomize = document.getElementById("randomize");
    randomize.onchange = () => {
      circlepacking.fn_params.params.cp_randomize = randomize.checked;
    };
  };
});
