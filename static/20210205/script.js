document.addEventListener("DOMContentLoaded", async () => {
    const init = async (fnname, withsynth) => {
        const fn = eval(fnname);
        const label = document.createElement('h2');
        label.innerText = fnname;
        const el = document.createElement("canvas");
        el.style.width = "100%";
        const synth = await fn(el);
        if (withsynth)
            withsynth(synth);
        console.log(synth);
        await new Promise(r => setTimeout(r, 500));
        synth.stop();
        el.addEventListener("mouseenter", () => { synth.run(); });
        el.addEventListener("touchstart", () => { synth.run(); });
        el.addEventListener("mouseout", () => { synth.stop(); });
        el.addEventListener("touchend", () => { synth.stop(); });

        const container = document.createElement('div');
        container.appendChild(label);
        container.appendChild(el);
        container.style.width = "45%";
        container.style.marginLeft = "0.5em";
        container.style.marginRight = "0.5em";
        container.style.display = "inline-block";

        document.getElementById('target').appendChild(container);
    };

    await init("seashells");
    await init("spilledmilk", (s) => {
        s.render_channel = 1;
    });
    await init("cryptopirate", (s) => {
        s.channels[0].stageModules["Noise-0"].fn_params.enable = false;
    });
    await init("makingwaves");
});
