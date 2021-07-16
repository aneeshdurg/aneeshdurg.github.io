function fadeOutEl(el) {
    if (!el.style.opacity)
        el.style.opacity = "1";

    const opacity = Number(el.style.opacity);
    if (opacity < 0.1) {
        el.remove();
        return;
    }

    el.style.opacity = opacity - 0.05;
    setTimeout(fadeOutEl.bind(this, el), 10);
}
