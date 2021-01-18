document.addEventListener("DOMContentLoaded", async function() {
    await loadTwgl();
    const hide_start = () => {
        document.getElementById('start').style.display = "none";
    };

    const run = (webcam_mode) => {
        const container = document.getElementById("container");

        const canvas = document.createElement("canvas");
        canvas.style.width = "100%";
        const callback = (synth_ui) => {
            console.log("!!!", synth_ui);
            const reduce_colors_obj = synth_ui.children[4].args.reduce_colors_data;
            const pixelate_obj = synth_ui.children[2].args.pixelate_factor;

            const label = document.createElement('label');
            label.innerText = 'Number of colors: ';
            const count_input = new IntEntry([1, 256], reduce_colors_obj.count, true);
            count_input.addEventListener('change', () => {
                reduce_colors_obj.set_count(count_input.value);
            });
            container.appendChild(label);
            container.appendChild(count_input);

            container.appendChild(document.createElement('br'));
            const btn = document.createElement('button');
            btn.innerText = "Re-pick colors";
            btn.addEventListener('click', () => {
                reduce_colors_obj.generate_colors();
            });
            container.appendChild(btn);

            container.appendChild(document.createElement('br'));
            const plabel = document.createElement('label');
            plabel.innerText = 'Pixelation factor: ';
            const pixel_input = new IntEntry([1, 20], pixelate_obj.value, true);
            pixel_input.addEventListener('change', () => {
                pixelate_obj.set_value(pixel_input.value);
            });
            container.appendChild(plabel);
            container.appendChild(pixel_input);

            if (!webcam_mode) {
                const pic_obj = synth_ui.children[0].args.picture_texture;
                const ilabel = document.createElement('label');
                ilabel.innerText = 'Upload an image: ';
                const fileSelect = document.createElement("input");
                fileSelect.type = "file";
                fileSelect.accept = "image/*";
                const uploadImage = () => {
                    let file = fileSelect.files[0];
                    let reader = new FileReader();
                    reader.readAsDataURL(file)
                    reader.onloadend = () => {
                        pic_obj.img.src = reader.result;
                    };
                }
                fileSelect.addEventListener("change", uploadImage);
                container.appendChild(document.createElement('br'));
                container.appendChild(ilabel);
                container.appendChild(fileSelect);
            }
        };

        const savedata = webcam_mode ? "/pixelator.savedata" : "/pixelator-picture.savedata";
        loadStaticSynth(canvas, root, savedata, callback);
        container.appendChild(canvas);

    };

    const webcam_start_btn = document.getElementById('start-webcam');
    const picture_start_btn = document.getElementById('start-picture');
    webcam_start_btn.addEventListener("click", function() {
        hide_start();
        run(true);
    });
    picture_start_btn.addEventListener("click", function() {
        hide_start();
        run(false);
    });
});
