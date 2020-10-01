let fragShader = null;

function main_setup() {
    const canvas = document.getElementById("glcanvas");

    const fractal = new DragonFractal(canvas, fragShader);
    fractal.stop = true;

    let started = false;

    const stopbtn = document.getElementById("stop-main");

    const angleinput = document.getElementById("customangle");
    const angleinputbtn = document.getElementById("usecustom");
    angleinputbtn.addEventListener("click", () => {
        fractal.angle = parseFloat(angleinput.value) * Math.PI / 180;
    });
    const updateinput = document.getElementById("customupdate");

    stopbtn.addEventListener("click", () => {
        fractal.stop = !fractal.stop;
        if (fractal.stop == false) {
            if (!started) {
                started = true;
                fractal.start();
                angleinput.style = "display: none;"
                angleinputbtn.style = "display: none;"
            } else
                fractal.run();
        }
    });


}


function piby3_setup() {
    const canvas = document.getElementById("glcanvas-piby3");
    const fractal = new DragonFractal(canvas, fragShader, [1000, 1000]);
    fractal.iterations = 10;
    fractal.angle = Math.PI / 3;
    fractal.angle_update = (angle) => {
        let new_angle = angle + Math.PI / 3;
        if (new_angle > 2 * Math.PI)
            new_angle -= 2 * Math.PI;
        return new_angle;
    };

    const stopbtn = document.getElementById("stop-piby3");
    stopbtn.addEventListener("click", () => {
        fractal.start();
        stopbtn.style = "display: none;";
    });
}

function piby4_setup() {
    const canvas = document.getElementById("glcanvas-piby4");
    const fractal = new DragonFractal(canvas, fragShader, [1000, 1000]);
    fractal.iterations = 13;
    fractal.angle = Math.PI / 4;
    fractal.angle_update = (angle) => {
        let new_angle = angle + Math.PI / 4;
        if (new_angle > 2 * Math.PI)
            new_angle -= 2 * Math.PI;
        return new_angle;
    };

    const stopbtn = document.getElementById("stop-piby4");
    stopbtn.addEventListener("click", () => {
        fractal.start();
        stopbtn.style = "display: none;";
    });
}

document.addEventListener('DOMContentLoaded', async () => {
    await loadTwgl();
    fragShader = await getFile(root + "/compute.frag.c");

    main_setup();
    piby3_setup();
    piby4_setup();
});
