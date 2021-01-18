document.addEventListener("DOMContentLoaded", async () => {
    const init = async (fn) => {
        const el = document.createElement("canvas");
        el.style.width = "100%";
        const synth = await fn(el);
        console.log(synth);
        await new Promise(r => setTimeout(r, 500));
        synth.stop();
        el.addEventListener("mouseenter", () => { synth.run(); });
        el.addEventListener("touchstart", () => { synth.run(); });
        el.addEventListener("mouseout", () => { synth.stop(); });
        el.addEventListener("touchend", () => { synth.stop(); });
        document.getElementById('target').appendChild(el);
    };

    await init(alchemy);
    await init(galaxysquares);
    await init(fractalcolor);
    await init(fractalswirl);
    await init(colorswirl);
});
