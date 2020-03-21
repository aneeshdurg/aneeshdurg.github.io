function pauseplay() {
    game.pause();
    if (game.paused) {
        document.getElementById("pause").innerText = "play";
        document.getElementById("step").style = "";
    } else {
        document.getElementById("pause").innerText = "pause";
        document.getElementById("step").style = "display: none;";
    }
}

var currFps = 60.0;
function setFps(value) {
    document.getElementById('fps').value = value;
    game.setFps(value);
    currFps = parseFloat(value);
}

document.addEventListener('DOMContentLoaded', async (event) => {
    const canvas = document.getElementById("glcanvas");
    game = new Game(canvas, vertUrl, renderUrl, computeUrl);

    if (window.ResizeObserver) {
        new ResizeObserver((e) => {
            console.assert(e.length == 1, "Should only observe canvas!");
            const size = e[0].contentRect;
            console.log(size.width, size.height);
            canvas.width = size.width;
            canvas.height = size.height;
            game.resizeHandler();
        }).observe(canvas);
    } else {
        const resizer = () => {
            if (canvas.width != canvas.clientWidth ||
                    canvas.height != canvas.clientHeight) {
                canvas.width = canvas.clientWidth;
                canvas.height = canvas.clientHeight;
                game.resizeHandler();
            }
        };
        setInterval(resizer, 100);
    }

    canvas.addEventListener("click", () => {
        console.log("giving focus");
        canvas.setAttribute('tabindex','0');
        canvas.focus();
    });

    canvas.addEventListener("dblclick", () => {
        if(canvas.webkitRequestFullScreen) {
            canvas.webkitRequestFullScreen();
        } else {
            canvas.mozRequestFullScreen();
        }
    });

    canvas.addEventListener("keydown", (e) => {
        if (e.key == " ")
            pauseplay();
        else if (e.key == "c")
            game.randomize(0.0);
        else if (e.key == "r")
            game.randomize(0.25);
        else if (e.key == "s")
            game.step();
        else if (e.key == "+")
            setFps(Math.min(currFps + 5, 120));
        else if (e.key == "-")
            setFps(Math.max(0, currFps - 5));
    });

    setFps("60.0");
    pauseplay();
    await game.main();
    game.randomize(0.25);
});

window.onerror = (m, u, l) => { alert(m + u + l); };
