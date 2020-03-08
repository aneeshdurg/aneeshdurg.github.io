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

document.addEventListener('DOMContentLoaded', async (event) => {
    const canvas = document.getElementById("glcanvas");
    game = new Game(canvas, vertUrl, renderUrl, computeUrl);
    game.setFps("60.0");
    pauseplay();
    await game.main();
    game.randomize(0.25);
});
