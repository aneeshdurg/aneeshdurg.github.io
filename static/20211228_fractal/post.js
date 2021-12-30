document.addEventListener("DOMContentLoaded", async function() {
  { // "images" for header
    const f1 = new Fractal(document.getElementById("canvas1"), 4);
    const f2 = new Fractal(document.getElementById("canvas2"), 6);
    const f3 = new Fractal(document.getElementById("canvas3"), 8);
    f1.factor = 1 / 2;
    f2.factor = 1 / 3;
    f3.factor = (1 / 3 + 1 / 4) / 2;

    f1.fill = true;
    f2.fill = false;
    f3.fill = true;

    f1.draw_all_levels([500, 500], 6, 250);
    f2.draw_all_levels([500, 500], 6, 250);
    f3.draw_all_levels([500, 500], 6, 250);
  }

  { // square animation example
    const btn = document.getElementById("start1");
    btn.onclick = async () => {
      btn.disabled = true;
      const f = new Fractal(document.getElementById("canvas4"), 4);
      f.factor = 1 / 2;
      for (let i = 0; i < 5; i++) { await f.animate_level([500, 500], i, 250, 100); }
      btn.disabled = false;
    };
  }

  { // interactive tool

    const canvas = document.getElementById("canvas5");
    const enableanim = document.getElementById("enable-animation");
    const finput = document.getElementById("f-input");
    const ninput = document.getElementById("n-input");
    const lvlinput = document.getElementById("level-input");

    let resolver = null;
    let inprogress = null;
    let no_animation = false;
    const onchange = async () => {
      inprogress = new Promise(r => { resolver = r; });
      const f = new Fractal(canvas, ninput.value);
      f.factor = finput.value;
      const lvl = lvlinput.value;
      if (no_animation || !enableanim.checked) {
        f.draw_all_levels([500, 500], lvl, 250);
      } else {
        for (let i = 0; i < lvl; i++) {
          if (!no_animation && enableanim.checked) {
            await f.animate_level([500, 500], i, 250, 100);
          } else {
            f.draw_level([500, 500], i, 250);
          }
        }
      }
      resolver();
      inprogress = null;
    };

    let needs_change = false;
    function requestonchange() {
      needs_change = true;
    }

    // Prevent weird jitter if someone scrolls through the value inputs
    async function change_daemon() {
      let flag = false;
      while (needs_change) {
        flag = true;
        needs_change = false;
        // sleep for 100ms
        await new Promise(r => setTimeout(r, 100));
      }

      if (flag) {
        while (inprogress) {
          no_animation = true;
          await inprogress;
          no_animation = false;
        }

        onchange();
      }

      setTimeout(change_daemon, 100);
    }
    setTimeout(change_daemon, 100);

    enableanim.addEventListener("change", requestonchange);
    finput.addEventListener("change", requestonchange);
    ninput.addEventListener("change", requestonchange);
    lvlinput.addEventListener("change", requestonchange);

    no_animation = true;
    await onchange();
    no_animation = false;
  }

  { // aesthetic fractal
    const f = new Fractal(document.getElementById("canvas6"), 6);
    f.factor = 5 / 12;
    f.draw_all_levels([500, 500], 4, 250);
  }
});
