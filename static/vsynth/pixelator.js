document.addEventListener("DOMContentLoaded", async function() {
    await loadTwgl();
    const hide_start = () => {
        document.getElementById('start').style.display = "none";
    };

    const run = (webcam_mode) => {
        const container = document.getElementById("container");

        const canvas = document.createElement("canvas");
        canvas.style.width = "100%";
        let reduce_colors_obj = null;
        const callback = (synth_ui) => {
            console.log("!!!", synth_ui);
            reduce_colors_obj = synth_ui.children[4].args.reduce_colors_data;

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
        };

        const savedata = webcam_mode ? "../data/pixelator.savedata" : "../data/pixelator-picture.savedata";
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
