// ---------- webgl-common/common.js ----------
async function loadTwgl() {
    const p = new Promise((resolve) => {
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.src = "https://twgljs.org/dist/4.x/twgl-full.min.js";
        script.onreadystatechange = resolve;
        script.onload = resolve;
        document.head.appendChild(script);
    });
    return p;
}

_fileCache = {}
async function getFile(url) {
    if (url in _fileCache)
        return _fileCache[url];

    const resp = await fetch(url);
    if (resp.status !== 200)
        throw("Could not find shader " + url);

    let fileContents = "";
    const reader = resp.body.getReader();
    let done = false;
    while (!done) {
        let fileBody = await reader.read();
        if (!fileBody.value) {
            done = true;
        } else {
            for (let v of fileBody.value)
                fileContents += String.fromCharCode(v);
        }
    }
    _fileCache[url] = fileContents;
    return fileContents;
}

/**
 * @param gl webgl2 instance
 * @param dimensions [width, height] tuple for texture dimensions
 * @param data - can be null, if not will be used as the source for the texture
 */
function createTexture(gl, dimensions, data) {
    const tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texImage2D(
        gl.TEXTURE_2D,
        0, // level
        gl.RGBA32F, // internal format
        dimensions[0], // width
        dimensions[1], // height
        0, // border
        gl.RGBA, // format
        gl.FLOAT, // type
        data, /* source */);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    return tex;
}

function updateTexture(gl, dimensions, texture, data) {
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(
        gl.TEXTURE_2D,
        0, // level
        gl.RGBA32F, // internal format
        dimensions[0], // width
        dimensions[1], // height
        0, // border
        gl.RGBA, // format
        gl.FLOAT, // type
        data, /* source */)
}

function render(gl) {
    // draw the quad (2 triangles)
    const offset = 0;
    const numVertices = 6;
    gl.drawArrays(gl.TRIANGLES, offset, numVertices);
}

function setupProgram(gl, programInfo, bufferInfo) {
    gl.useProgram(programInfo.program);

    twgl.setBuffersAndAttributes(gl, programInfo, bufferInfo);

}

function enableGlExts(gl) {
    gl.getExtension('OES_texture_float');        // just in case
    gl.getExtension('OES_texture_float_linear');
    ext = gl.getExtension('EXT_color_buffer_float');
    if (!ext) {
        alert("no ext color...");
        throw new Error("!");
    }
}

const vs = `
    #version 300 es
    in vec4 position;
    void main() {
      gl_Position = position;
    }`;

const bufferArrays = {
    position: {
        data: [
          -1, -1,
           1, -1,
          -1,  1,
          -1,  1,
           1, -1,
           1,  1,
        ],
        numComponents: 2,
    },
};

class FrameBufferManager {
    constructor(gl, dimensions) {
        this.computeDsts = [
            createTexture(gl, dimensions, null),
            createTexture(gl, dimensions, null)
        ];
        this.fb = gl.createFramebuffer();

        this.counter = 0;
        this.gl = gl;
    }

    src() {
        return this.computeDsts[this.counter];
    }

    dst() {
        return this.computeDsts[(this.counter + 1) % 2];
    }

    flipflop() {
        this.counter = this.counter + 1;
        this.counter %= 2;
    }

    bind_dst() {
        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.fb);
        this.gl.framebufferTexture2D(
            this.gl.FRAMEBUFFER,
            this.gl.COLOR_ATTACHMENT0,
            this.gl.TEXTURE_2D,
            this.dst(),
            0 /* level */
        );
    }
}
// ---------- END webgl-common/common.js ------

// ---------- ui.js ----------
class Function {
    id = 0;
    feedback = 0;
    params = {};
    enable = true;

    constructor(feedback) {
        this.feedback = feedback;
    }
}

function createModal(resolver) {
    const modal = document.createElement('div');
    modal.addEventListener('click', (e) => {
        if (e.target != modal)
            return;
        resolver(undefined);
        modal.remove();
    });

    modal.style.background = "#2b2b2b50";
    modal.style.position = "absolute";
    modal.style.left = "0";
    modal.style.top = "0";
    modal.style.width = "100%";
    modal.style.height = "100%";

    document.body.appendChild(modal);
    return modal;
}

class Type extends HTMLElement {
    name = ""
    range = []
    defaultValue = 0
    shadow = null;
    value = 0

    constructor(range, defaultValue) {
        super();
        this.range = range;
        this.defaultValue = defaultValue;
        this.shadow = this.attachShadow({mode: 'open'});
    }

    save() {
        return undefined;
    }

    load() {
    }
}

class BoolEntry extends Type {
    constructor(defaultValue) {
        super([0, 0], defaultValue);

        this.input = document.createElement('input');
        this.input.id = "generate";
        this.input.type = 'checkbox';
        this.input.checked = defaultValue;
        this.input.addEventListener('change', () => {
            this.value = this.input.checked;
            this.dispatchEvent(new Event('change'));
        });

        this.shadow.appendChild(this.input);
    }

    save() {
        return this.value;
    }

    load(data) {
        // console.log("loading bool", data);
        this.value = data;
        this.input.checked = data;
        this.dispatchEvent(new Event('change'));
    }
}
customElements.define('bool-entry', BoolEntry);

class Slider extends Type {
    constructor(range, defaultValue) {
        super(range, defaultValue);

        const container = document.createElement('div');
        container.style = "padding-bottom: 0.5em;"
        const bar = document.createElement('div');
        bar.style = "background: black; width: 10em; height: 1em;";
        this.slider = document.createElement('div');
        this.slider.style = "background: white; height: 1em; width: 1%; position: relative; left: 0em";

        const handler = (e) => {
            if (e.target != bar)
                return;
            const rect = e.target.getBoundingClientRect();
            const clientX = e.clientX || e.touches[0].clientX;
            const clientY = e.clientY || e.touches[0].clientY;

            const x = (clientX - rect.left) / rect.width;
            this.value = x * (this.range[1] - this.range[0]) + this.range[0];
            this.dispatchEvent(new Event('change'));
        };
        bar.addEventListener('mousemove', (e) => { if (e.buttons & 1) handler(e); });
        bar.addEventListener('touchmove', handler);

        bar.appendChild(this.slider);
        container.appendChild(bar);
        this.shadow.appendChild(container);
    }

    set_value(value) {
        const x = (value - this.range[0]) / (this.range[1] - this.range[0]);
        this.slider.style.left = `${x * 10}em`;
    }
}
customElements.define('slider-elem', Slider);

class FloatBar extends Type {
    validate(entry) {
        return !isNaN(entry) && entry >= this.range[0] && entry <= this.range[1];
    }

    _set_value(value) {
        this.value = value;
        this.input.value = this.value;
        this.slider.set_value(value);
    }

    set_value(value) {
        this._set_value(value);
        this.dispatchEvent(new Event('change'));
    }

    constructor(range, defaultValue, supressFunctionGen) {
        super(range, defaultValue);

        const container = document.createElement('div');

        this.slider = new Slider(range, defaultValue);
        this.input = document.createElement('input');
        this.input.style.boxShadow = "none";
        this.input.type = "number";
        this.input.min = this.range[0];
        this.input.max = this.range[1];
        this.input.step = (this.range[1] - this.range[0]) / 1000;

        this._set_value(this.defaultValue);

        this.input.addEventListener('change', () => {
            const value = parseFloat(this.input.value);
            if (!this.validate(value)) {
                this.input.style = "color: red";
            } else {
                this.input.style = "";
                this.set_value(value);
            }
        });
        this.slider.addEventListener('change', () => { this.set_value(this.slider.value); });

        const gen_label = document.createElement('label');
        gen_label.for = "generate";
        gen_label.innerText = "function: ";
        this.func_gen = document.createElement('input');
        this.func_gen.id = "generate";
        this.func_gen.type = 'checkbox';
        this.func_select = document.createElement('select');
        const func_modal = document.createElement('button');
        func_modal.innerText = "Edit function";
        Object.keys(generators).forEach((k, i) => {
            const opt = document.createElement('option');
            opt.value = k;
            opt.innerText = k;
            this.func_select.appendChild(opt);
        });

        this.generate = false;
        this.func = generators[this.func_select.value].func;
        this.params = generators[this.func_select.value].params;

        this.func_select.addEventListener('change', () => {
            this.func = generators[this.func_select.value].func;
            this.params = generators[this.func_select.value].params;
        });
        this.func_gen.addEventListener('change', () => {
            this.generate = this.func_gen.checked;
            if (this.generate)
                this.start_generation(0);
        });

        func_modal.addEventListener('click', async () => {
            let resolver = null;
            const p = new Promise(r => { resolver = r; });
            const modal = createModal(resolver);
            const generator = new FunctionGenerator(modal, this.func_select.value, resolver);
            const params = await p;
            generator.remove();
            modal.remove();
            if (!params)
                return;

            this.params = params;
            let needs_restart = false;
            if (!this.generate)
                needs_restart = true;
            this.generate = true;
            this.func_gen.checked = true;
            if (needs_restart)
                this.start_generation(0);
        });

        container.appendChild(this.slider);
        container.appendChild(this.input);
        container.appendChild(document.createElement('br'));
        if (!supressFunctionGen) {
            container.appendChild(gen_label);
            container.appendChild(this.func_gen);
            container.appendChild(this.func_select);
            container.appendChild(func_modal);
        }
        this.shadow.appendChild(container);
    }

    start_generation(time) {
        if (this.generate) {
            this.set_value(this.func(time, this.range, this.params));
            requestAnimationFrame(this.start_generation.bind(this));
        }
    }

    save() {
        const savedata = {
            value: this.value,
        }

        if (this.generate) {
            savedata.generate = this.generate;
            savedata.func = this.func_select.value;
            savedata.params = this.params.save();
        } else {
            savedata.generate = false;
        }
        return savedata;
    }

    load(data) {
        if (data === undefined)
            return;
        // console.log("loading float", data);
        this.set_value(data.value);

        if (data.generate) {
            this.params = new GenParams();
            this.params.load(data.params);

            this.func_select.value = data.func;
            this.func = generators[this.func_select.value].func;
            this.func_gen.checked = true;

            this.generate = true;
            this.start_generation(0);
        }
    }
}
customElements.define('float-bar', FloatBar);

class IntEntry extends FloatBar {
    _set_value(value) {
        value = Math.round(value);
        super._set_value(value);
    }

    constructor(range, defaultValue, supressFunctionGen) {
        super(range, defaultValue, supressFunctionGen);
        this.input.step = 1;
    }
}
customElements.define('int-entry', IntEntry);

class VecEntry extends Type {
    floats = []

    constructor(nelem, names, range, defaultValue) {
        super(range, defaultValue);
        this.nelem = nelem;
        this.names = names;

        for (let i = 0; i < this.nelem; i++) {
            const entry = new FloatBar(this.range[i], this.defaultValue[i])
            entry.addEventListener('change', () => {
                for (let i = 0; i < this.nelem; i++) {
                    this.value[i] = this.floats[i].value;
                }
                this.dispatchEvent(new Event('change'));
            });
            this.floats.push(entry);

            const container = document.createElement('div');
            const label = document.createElement('label');
            label.for = names[i];
            label.innerText = `${names[i]}: `;
            entry.id = names[i];

            container.appendChild(label);
            container.appendChild(entry);
            this.shadow.appendChild(container);
        }

        this.value = this.defaultValue;
    }

    save() {
        const values = {}
        for (let i = 0; i < this.nelem; i++) {
            values[this.names[i]] = this.floats[i].save();
        }
        return values;
    }

    load(data) {
        if (data === undefined)
            return;
        // console.log("loading vec", data);
        for (let name of Object.keys(data)) {
            const i = this.names.indexOf(name);
            // TODO validate i
            this.floats[i].load(data[name]);
        }
    }
}
customElements.define('vec-entry', VecEntry);
// ---------- END ui.js ------

// ---------- customui.js ----------
class Picture_picture_texture extends Type {
    validate() {
        return true;
    }

    customonchange(element) {
        this.synth.stageModules[element.name].params['picture_texture'] = this.tex;
        this.synth.stageModules[element.name].params['picture_dimensions'] = this.dimensions;

        element.args.picture_dimensions.set_value(this.dimensions);
    }

    imgload() {
        this.dimensions = [this.img.width, this.img.height];
        this.tex = createTexture(this.synth.gl, this.dimensions, this.img)
        this.dispatchEvent(new Event('change'));
    }

    constructor(synth) {
        const img = new Image();
        const tex = createTexture(synth.gl, synth.dimensions);
        super(undefined, tex);

        this.tex = tex;
        this.synth = synth;
        this.dimensions = [...synth.dimensions];
        this.img = img;
        this.img.addEventListener('load', () => { this.imgload(); });

        this.el = document.createElement("div");

        this.fileSelect = document.createElement("input");
        this.fileSelect.type = "file";
        this.fileSelect.accept = "image/*";
        this.fileSelect.addEventListener("change", this.uploadImage.bind(this));
        this.el.appendChild(this.fileSelect);

        this.shadow.appendChild(this.el);
    }

    uploadImage() {
        let file = this.fileSelect.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(file)
        reader.onloadend = () => {
            this.img.src = reader.result;
        };
    }

    save() {
        return this.img.src;
    }

    load(data) {
        this.img.src = data;
    }
}
customElements.define('picture-picture-texture', Picture_picture_texture);

class Picture_picture_dimensions extends Type {
    validate() {
        return true;
    }

    constructor(synth) {
        super(undefined, [0, 0]);
        this.data = document.createElement('code');
        this.data.style = 'border: solid 1px; padding: 2px';
        this.data.innerText = synth.dimensions;
        this.shadow.appendChild(this.data);
    }

    set_value(value) {
        this.data.innerText = value;
    }

    save() {
        return undefined;
    }
}
customElements.define('picture-picture-dimensions', Picture_picture_dimensions);

class Webcam_webcam_texture extends Type {
    customonchange(element) {
        this.synth.stageModules[element.name].params['webcam_texture'] = this.tex;
        this.synth.stageModules[element.name].params['webcam_dimensions'] = this.dimensions;

        element.args.webcam_dimensions.set_value(this.dimensions);
    }

    constructor(synth) {
        const tex = createTexture(synth.gl, synth.dimensions);
        super(undefined, tex);

        this.tex = tex;
        this.synth = synth;
        this.dimensions = synth.dimensions;
        this.setup();
    }

    async setup() {
        this.video = document.createElement("video");

        let devices = undefined;
        try {
            devices = await navigator.mediaDevices.enumerateDevices();
        } catch (err) {
            alert("Error initializing webcam!");
            throw err;
        }

        devices = devices.filter(d => d.kind === "videoinput");

        this.container = document.createElement("div");

        this.container.innerHTML = `<label for="webcamSelector">Choose a webcam: </label>`
        const selector = document.createElement("select");
        selector.id = "webcamSelector";
        this.container.appendChild(selector);

        devices.forEach(device => {
            const entry = document.createElement("option");
            entry.value = device.deviceId;
            entry.innerHTML = device.label || device.deviceId.substr(0, 10);
            selector.appendChild(entry)
        });

        this.needsUpdate = false;
        const selectVideo = async () => {
            const deviceId = selector.value;

            const constraints = {
                video: { deviceId: deviceId }
            }

            try {
                if (this.video.srcObject) {
                    const stream = this.video.srcObject;
                    stream.getTracks().forEach(function(track) {
                        track.stop();
                    });
                    this.video.srcObject = null;
                }

                const stream = await navigator.mediaDevices.getUserMedia(constraints);
                this.video.srcObject = stream;
                this.video.play();
                this.needsUpdate = true;
            } catch (err) {
                alert("Error initializing webcam! " + err);
                console.log(err);
            }
        }
        selector.onchange = selectVideo;
        selectVideo();

        this.generate = true;
        let f = () => {
            if (!this.video.paused && !this.video.ended) {
                const dimensions = [this.video.videoWidth, this.video.videoHeight];
                if (dimensions[0] && dimensions[1]) {
                    if (this.needsUpdate) {
                        this.dimensions = [this.video.videoWidth, this.video.videoHeight];
                        console.log("UPDATE", this.dimensions, this.video);
                        this.tex = createTexture(this.synth.gl, this.dimensions);
                    }
                    updateTexture(this.synth.gl, this.dimensions, this.tex, this.video);
                    if (this.needsUpdate) {
                        this.needsUpdate = false;
                        this.dispatchEvent(new Event('change'));
                    }
                }
            }

            if (this.generate)
                requestAnimationFrame(f);
        };
        f();

        this.shadow.appendChild(this.container);
    }

    save() {
        return undefined;
    }
}
customElements.define('webcam-webcam-texture', Webcam_webcam_texture);

class Webcam_webcam_dimensions extends Picture_picture_dimensions { }
customElements.define('webcam-webcam-dimensions', Webcam_webcam_dimensions);

class ReduceColors_reduce_colors_data extends Type {
    customonchange(element) {
        try {
            this.synth.stageModules[element.name].params['reduce_colors_data'] = this.tex;
            this.synth.stageModules[element.name].params['reduce_colors_count'] = this.count;
        } catch (e) {
            console.log("!!!", ...this.synth.stages);
            // TODO custom elements break with meta modules
        }

        element.args.reduce_colors_count.set_value(this.dimensions);
    }

    constructor(synth) {
        const limit = 256;
        const img = new Image();
        const tex = createTexture(synth.gl, [256, 1]);
        super(undefined, tex);

        this.tex = tex;
        this.synth = synth;

        // we waste 1 float for the alpha channel - TODO
        this.data = new Float32Array(4 * 256);
        // this.count = 100;
        this.count = 100;
        this.generate_colors();

        updateTexture(synth.gl, [256, 1], this.tex, this.data);

        this.el = document.createElement("div");
        const btn = document.createElement("button");
        btn.addEventListener('click', () => {
            this.generate_colors();
            this.dispatchEvent(new Event('change'));
        });
        btn.innerText = "Re-pick colors";
        this.el.appendChild(btn);

        this.el.appendChild(document.createElement('br'));
        const label = document.createElement("label");
        label.innerText = "Number of colors: ";
        label.for = "num_colors";
        const input = new IntEntry([1, 256], 100);
        input.id = "num_colors";
        input.addEventListener('change', () => { this.set_count(input.value); });
        this.el.appendChild(label);
        this.el.appendChild(input);

        this.shadow.appendChild(this.el);
    }

    set_count(value) {
        this.count = value;
        this.generate_colors();
        // console.log("New count", input.value);
        this.dispatchEvent(new Event('change'));

    }

    generate_colors() {
        // console.log("Regenerating", this.count);
        for (let i = 0; i < 4 * this.count; i++)
            this.data[i] = Math.random();
        updateTexture(this.synth.gl, [256, 1], this.tex, this.data);
    }

    save() {
        const data = [];
        for (let i = 0; i < this.count; i++)
            data.push(this.data[i])
        return [...data];
    }

    load(data) {
        for (let i = 0; i < data.length; i++)
            this.data[i] = data[i];
        this.count = data.length / 4;
        updateTexture(this.synth.gl, [256, 1], this.tex, this.data);
        this.dispatchEvent(new Event('change'));
    }
}
customElements.define('reducecolors-reduce-colors-data', ReduceColors_reduce_colors_data);

class ReduceColors_reduce_colors_count extends Type {
    constructor(synth) {
        super(undefined, 100);
        this.data = document.createElement('code');
        this.data.style = 'border: solid 1px; padding: 2px';
        this.data.innerText = 100;
        this.shadow.appendChild(this.data);
    }

    set_value(value) {
        this.data.innerText = value;
    }

    save() {
        return undefined;
    }
}
customElements.define('reducecolors-reduce-colors-count', ReduceColors_reduce_colors_count);
// ---------- END customui.js ------

// ---------- function_generator.js ----------
class GenParams {
    params = {}
    get() {
        return this.params;
    }

    save() {
        return this.params;
    }

    load(params) {
        this.params = params;
    }
}

class DefaultSinParams extends GenParams {
    params = {freq: 1, c: 0};
}


class DefaultStepParams extends GenParams {
    params = {freq: 1};
}

const sin_generator = (t, range, genparams) => {
    const params = genparams.get();
    let value = Math.sin(params.freq * 2 * Math.PI * t / 1000 + params.c);
    value = (value + 1) / 2;
    value = value * (range[1] - range[0]) + range[0];
    return value;
};

const step_generator = (t, range, genparams) => {
    const params = genparams.get();
    return ((t / 1000 * params.freq) % (range[1] - range[0])) + range[0];
};

const generators = {
    sin: { func: sin_generator, params: new DefaultSinParams() },
    step: { func: step_generator, params: new DefaultStepParams() }
}

class FunctionGenerator{
    cancel = false;

    constructor (parentEl, current, resolver) {
        const container = document.createElement('div');
        container.className = "functiongen";

        const header = document.createElement("h1");
        header.innerText = "Function Generator";
        container.appendChild(header);
        container.appendChild(document.createElement('hr'));

        this.graph = document.createElement('canvas');
        this.graph.className = "functioncanvas";
        this.graph.width = 1000;
        this.graph.height = 1000;
        container.appendChild(this.graph);

        this.ctx = this.graph.getContext("2d");

        this.freq = 1;
        this.c = 0;

        this.draw_axes();

        container.appendChild(document.createElement('br'));
        container.appendChild(document.createElement('br'));

        const function_ui = document.createElement('div');
        function_ui.className = 'function-ui';

        function_ui.appendChild(document.createElement('br'));
        const freq_label = document.createElement('label');
        freq_label.for = "freq_input";
        freq_label.innerText = "Frequency: ";
        const freq_input = new FloatBar([0, 100], 1, true);
        freq_input.id = "freq_input";
        function_ui.appendChild(freq_label);
        function_ui.appendChild(freq_input);

        function_ui.appendChild(document.createElement('br'));
        const c_label = document.createElement('label');
        c_label.for = "c_input";
        c_label.innerText = "Phase shift: ";
        const c_input = new FloatBar([0, 2 * Math.PI], 0, true);
        c_input.id = "c_input";
        function_ui.appendChild(c_label);
        function_ui.appendChild(c_input);

        if (current === "sin") {
            this.func = sin_generator;
            this.params = new DefaultSinParams();
            c_label.style.display = "";
            c_input.style.display = "";
            c_input.value = 0;
            freq_input.value = 1;
        } else {
            this.func = step_generator;
            this.params = new DefaultStepParams();
            c_label.style.display = "none";
            c_input.style.display = "none";
            freq_input.value = 1;
        }

        freq_input.addEventListener('change', () => {
            this.params.params.freq = parseFloat(freq_input.value);
        });
        c_input.addEventListener('change', () => {
            this.params.params.c = parseFloat(c_input.value);
        });

        const f = () => {
            this.draw_axes();
            this.draw_function();
            this.draw_labels();
            if (!this.cancel)
                requestAnimationFrame(f);
        };
        f();

        function_ui.appendChild(document.createElement('br'));
        function_ui.appendChild(document.createElement('br'));
        const done_button = document.createElement('button');
        done_button.innerText = 'done';
        function_ui.appendChild(done_button);
        done_button.addEventListener('click', () => {
            resolver(this.params);
        });

        container.appendChild(function_ui);
        parentEl.appendChild(container);

    }

    draw_axes() {
        this.ctx.fillStyle = "black";
        this.ctx.beginPath();
        this.ctx.rect(0, 0, 1000, 1000);
        this.ctx.fill();

        this.ctx.fillStyle = "#ffffff50";
        const count = 20;
        for (let i = 1; i < count; i++) {
            const start = i * (this.graph.width / count);
            this.ctx.beginPath();
            this.ctx.rect(start, 0, 5, 1000);
            this.ctx.fill();

            this.ctx.beginPath();
            this.ctx.rect(0, start, 1000, 5);
            this.ctx.fill();
        }
    }

    draw_function() {
        this.ctx.strokeStyle = "red";
        this.ctx.lineWidth = 4;
        this.ctx.beginPath();
        const maxy = this.graph.height / 2;
        this.ctx.moveTo(0, maxy);
        for (let i = 0; i < this.graph.width; i++) {
            this.ctx.lineTo(i, maxy - maxy * this.func(i, [-1, 1], this.params));
        }
        this.ctx.stroke();
    }

    draw_labels() {
        this.ctx.beginPath();
        this.ctx.rect(0, 0, 1000, 1000);
        this.ctx.fill();
    }

    remove() {
        this.cancel = true;
    }
}
// ---------- END function_generator.js ------

// ---------- synth_element_base.js ----------
const globalCounters = {};

class SynthStageBase extends HTMLElement {
    get_title() {
        return "";
    }

    constructor(synth, pre_setup) {
        super();
        if (pre_setup)
            pre_setup(this);

        this.synth = synth;

        const shadow = this.attachShadow({mode: 'open'});
        this.shadow = shadow;

        const box = document.createElement('div');
        box.style = "border: solid 1px; padding: 0.5em";
        const title = document.createElement('h2')
        title.innerText = this.get_title();
        box.appendChild(title);

        const enable_label = document.createElement('label');
        enable_label.for = "enable";
        enable_label.innerText = "Enable: ";
        this.enable_el = document.createElement('input');
        this.enable_el.id = "enable";
        this.enable_el.type = 'checkbox';
        this.enable_el.checked = true;

        box.appendChild(enable_label);
        box.appendChild(this.enable_el);

        const container = document.createElement('div');
        container.style.display = "none";
        this.container = container;
        box.appendChild(container);

        this.container_visible = false;
        title.onclick = () => {
            if (this.container_visible) {
                container.style.display = "none";
            } else {
                container.style.display = "";
            }

            this.container_visible = !this.container_visible;
        }

        const moveup = document.createElement('button');
        moveup.innerText = 'Move up';
        container.appendChild(moveup);

        const movedn = document.createElement('button');
        movedn.innerText = 'Move down';
        container.appendChild(movedn);

        this.remove_btn = document.createElement('button');
        this.remove_btn.innerText = 'Remove';
        container.appendChild(this.remove_btn);

        container.appendChild(document.createElement('br'));


        shadow.appendChild(box);

        moveup.addEventListener('click', () => {
            const idx = this.synth.stages.indexOf(this.name);
            if (idx != 0) {
                const other = this.synth.stages[idx - 1];
                this.synth.stages[idx] = other;
                this.synth.stages[idx - 1] = this.name;
                const parentEl =this.parentElement;
                this.remove();
                parentEl.insertBefore(this, parentEl.childNodes[idx - 1]);
            }
        });

        movedn.addEventListener('click', () => {
            const idx = this.synth.stages.indexOf(this.name);
            if (idx != (this.synth.stages.length - 1)) {
                const other = this.synth.stages[idx + 1];
                this.synth.stages[idx] = other;
                this.synth.stages[idx + 1] = this.name;

                const parentEl =this.parentElement;
                this.remove();
                parentEl.insertBefore(this, parentEl.childNodes[idx + 1]);
            }
        });

        this.remove_btn.addEventListener('click', () => {
            this.synth.remove_stage(this.name);
            this.remove();

            for (let arg of Object.keys(args))
                args[arg].generate = false;
            this.feedback_el.generate = false;
        });

        this.enable_el.addEventListener('change', () => {
            this.synth.toggle_stage(this.name, this.enable_el.checked);
            this.synth.toggle_stage(this.name, this.enable_el.checked);
        });
    }

    reparent_to_module(module) {
        this.remove_btn.style.display = "none";
        this.synth = module;
        // this.parentElement = module;
    }
}

class SynthElementBase extends SynthStageBase {
    get_args() {
        //returns a map of str -> Type
        return {};
    }

    get_type() {
        return Type;
    }

    get_feedback() {
        return 0;
    }

    constructor(synth) {
        super(synth);
        const args = this.get_args();
        this.args = args;

        const params = [];
        const createElement = (arg, type) => {
            const label = document.createElement('label');
            this.container.appendChild(label);
            label.for = arg;
            label.innerText = `${arg}: `;

            const el = document.createElement('div');
            this.container.appendChild(el);
            el.id = arg;
            el.style = "padding-left: 2em;";

            el.appendChild(type);
            type.addEventListener('change', () => {
                if (type.customonchange) {
                    type.customonchange(this);
                } else {
                    this.onchange(arg, type.value);
                }
            });

            this.container.appendChild(document.createElement('br'));
        };

        this.constrain_el = new BoolEntry(false);
        createElement('constrain to transform', this.constrain_el);
        for (let arg of Object.keys(args)) {
            params.push(args[arg].defaultValue);
            createElement(arg, args[arg]);
        }
        this.feedback_el = new FloatBar([0, 10], 1);
        createElement('feedback', this.feedback_el);

        const counter = globalCounters[this.get_title()] || 0;
        globalCounters[this.get_title()] = counter + 1;
        this.name = `${this.get_title()}-${counter}`;

        synth.add_stage(this.name, this.build_stage(params));

    }

    build_stage(params) {
        const constructor = this.get_type();
        return new constructor(...params, 1);
    }

    onchange(arg, val) {
        if (arg === "feedback")
            this.synth.stageModules[this.name].feedback = val;
        else if (arg === "constrain to transform")
            this.synth.stageModules[this.name].constrain = val;
        else
            this.synth.stageModules[this.name].params[arg] = val;
    }

    save() {
        const saved_args = {};
        for (let arg of Object.keys(this.args)) {
            saved_args[arg] = this.args[arg].save();
        }
        saved_args.feedback = this.feedback_el.save();
        saved_args.constrain = this.constrain_el.save();

        return {
            title: this.get_title(),
            enabled: this.enable_el.checked,
            args: saved_args
        }
    }

    load(data) {
        this.enable_el.checked = data.enabled;
        for (let arg of Object.keys(this.args)) {
            // console.log("Loading", arg, data.args[arg]);
            this.args[arg].load(data.args[arg]);
        }

        // console.log("Loading feedback", data.args.feedback);
        if (data.args.feedback)
            this.feedback_el.load(data.args.feedback);
        if (data.args.constrain)
            this.constrain_el.load(data.args.constrain);
    }
}

class TransformElement extends SynthElementBase {
    enable = true;

    get_title() {
        return "Transform";
    }

    build_stage() {
        return this;
    }

    get_args() {
        // TODO clear transform should hide other inputs
        // This can be done if we override onchange here and store the results of
        // createElement in SynthElementBase
        return {
            scale: new FloatBar([0,10], 1),
            center: new VecEntry(2, ["x", "y"], [[-0.5,1.5], [-0.5,1.5]], [0.5, 0.5]),
            rotation: new FloatBar([0, 2 * Math.PI], 0),
        }
    }

    constructor(synth) {
        super(synth);
        this.feedback_el.style.display = "none";
        this.constrain_el.style.display = "none";
        this.params = {
            scale: 1,
            center: [0.5, 0.5],
            rotation: 0,
        };
    }
}
customElements.define('transform-element', TransformElement);
// ---------- END synth_element_base.js ------

// ---------- build/module_lib.js ----------
        class Blur extends Function {
            id = 1
            params = {}

            constructor(blur_stride_x, blur_stride_y, feedback) {
                super(feedback || 0);
                this.params.blur_stride_x = blur_stride_x;
this.params.blur_stride_y = blur_stride_y;

            }
        }

        class BlurElement extends SynthElementBase {
            get_title() {
                return "Blur";
            }

            get_type() {
                return Blur;
            }

            get_args() {
                return {
                    blur_stride_x: new IntEntry([1,100], 1),blur_stride_y: new IntEntry([1,100], 1)
                }
            }
        }
        customElements.define('synth-blur', BlurElement);
class Enhance extends Function {
    id = 2
    params = {}

    constructor(enhance, feedback) {
        super(feedback || 0);
        this.params.enhance = enhance;

    }
}

class EnhanceElement extends SynthElementBase {
    get_title() {
        return "Enhance";
    }

    get_type() {
        return Enhance;
    }

    get_args() {
        return {
            enhance: new VecEntry(3, ["r","g","b"], [[0, 10],[0, 10],[0, 10],], [1,1,1])
        }
    }
}
customElements.define('synth-enhance', EnhanceElement);
class GammaCorrect extends Function {
    id = 3
    params = {}

    constructor(gamma_correction, feedback) {
        super(feedback || 0);
        this.params.gamma_correction = gamma_correction;

    }
}

class GammaCorrectElement extends SynthElementBase {
    get_title() {
        return "GammaCorrect";
    }

    get_type() {
        return GammaCorrect;
    }

    get_args() {
        return {
            gamma_correction: new FloatBar([2,4], 2)
        }
    }
}
customElements.define('synth-gammacorrect', GammaCorrectElement);
        class HueShift extends Function {
            id = 4
            params = {}

            constructor(hue_shift, saturate_shift, feedback) {
                super(feedback || 0);
                this.params.hue_shift = hue_shift;
this.params.saturate_shift = saturate_shift;

            }
        }

        class HueShiftElement extends SynthElementBase {
            get_title() {
                return "HueShift";
            }

            get_type() {
                return HueShift;
            }

            get_args() {
                return {
                    hue_shift: new FloatBar([0,360], 180),saturate_shift: new FloatBar([0,1], 0)
                }
            }
        }
        customElements.define('synth-hueshift', HueShiftElement);
class InvertColor extends Function {
    id = 5
    params = {}

    constructor(feedback) {
        super(feedback || 0);

    }
}

class InvertColorElement extends SynthElementBase {
    get_title() {
        return "InvertColor";
    }

    get_type() {
        return InvertColor;
    }

    get_args() {
        return {

        }
    }
}
customElements.define('synth-invertcolor', InvertColorElement);
        class Noise extends Function {
            id = 6
            params = {}

            constructor(noise_r, noise_g, noise_b, feedback) {
                super(feedback || 0);
                this.params.noise_r = noise_r;
this.params.noise_g = noise_g;
this.params.noise_b = noise_b;

            }
        }

        class NoiseElement extends SynthElementBase {
            get_title() {
                return "Noise";
            }

            get_type() {
                return Noise;
            }

            get_args() {
                return {
                    noise_r: new FloatBar([0,10000], 0),noise_g: new FloatBar([0,10000], 0),noise_b: new FloatBar([0,10000], 0)
                }
            }
        }
        customElements.define('synth-noise', NoiseElement);
        class Offset extends Function {
            id = 7
            params = {}

            constructor(offsets_x, offsets_y, feedback) {
                super(feedback || 0);
                this.params.offsets_x = offsets_x;
this.params.offsets_y = offsets_y;

            }
        }

        class OffsetElement extends SynthElementBase {
            get_title() {
                return "Offset";
            }

            get_type() {
                return Offset;
            }

            get_args() {
                return {
                    offsets_x: new VecEntry(3, ["r","g","b"], [[-1, 1],[-1, 1],[-1, 1],], [0,0,0]),offsets_y: new VecEntry(3, ["r","g","b"], [[-1, 1],[-1, 1],[-1, 1],], [0,0,0])
                }
            }
        }
        customElements.define('synth-offset', OffsetElement);
        class Oscillator extends Function {
            id = 8
            params = {}

            constructor(osc_f, osc_c, osc_color, feedback) {
                super(feedback || 0);
                this.params.osc_f = osc_f;
this.params.osc_c = osc_c;
this.params.osc_color = osc_color;

            }
        }

        class OscillatorElement extends SynthElementBase {
            get_title() {
                return "Oscillator";
            }

            get_type() {
                return Oscillator;
            }

            get_args() {
                return {
                    osc_f: new VecEntry(2, ["x","y"], [[0, 1],[0, 1],], [0.25,0]),osc_c: new FloatBar([0,6.283185307179586], 0),osc_color: new VecEntry(3, ["r","g","b"], [[0, 1],[0, 1],[0, 1],], [1,0,0])
                }
            }
        }
        customElements.define('synth-oscillator', OscillatorElement);
        class Picture extends Function {
            id = 9
            params = {}

            constructor(picture_texture, picture_dimensions, feedback) {
                super(feedback || 0);
                this.params.picture_texture = picture_texture;
this.params.picture_dimensions = picture_dimensions;

            }
        }

        class PictureElement extends SynthElementBase {
            get_title() {
                return "Picture";
            }

            get_type() {
                return Picture;
            }

            get_args() {
                return {
                    picture_texture: new Picture_picture_texture(this.synth),picture_dimensions: new Picture_picture_dimensions(this.synth)
                }
            }
        }
        customElements.define('synth-picture', PictureElement);
class Pixelate extends Function {
    id = 10
    params = {}

    constructor(pixelate_factor, feedback) {
        super(feedback || 0);
        this.params.pixelate_factor = pixelate_factor;

    }
}

class PixelateElement extends SynthElementBase {
    get_title() {
        return "Pixelate";
    }

    get_type() {
        return Pixelate;
    }

    get_args() {
        return {
            pixelate_factor: new IntEntry([0,500], 10)
        }
    }
}
customElements.define('synth-pixelate', PixelateElement);
        class Recolor extends Function {
            id = 11
            params = {}

            constructor(recolor_new_r, recolor_new_g, recolor_new_b, feedback) {
                super(feedback || 0);
                this.params.recolor_new_r = recolor_new_r;
this.params.recolor_new_g = recolor_new_g;
this.params.recolor_new_b = recolor_new_b;

            }
        }

        class RecolorElement extends SynthElementBase {
            get_title() {
                return "Recolor";
            }

            get_type() {
                return Recolor;
            }

            get_args() {
                return {
                    recolor_new_r: new VecEntry(3, ["r","g","b"], [[0, 1],[0, 1],[0, 1],], [1,0,0]),recolor_new_g: new VecEntry(3, ["r","g","b"], [[0, 1],[0, 1],[0, 1],], [0,1,0]),recolor_new_b: new VecEntry(3, ["r","g","b"], [[0, 1],[0, 1],[0, 1],], [0,0,1])
                }
            }
        }
        customElements.define('synth-recolor', RecolorElement);
        class ReduceColors extends Function {
            id = 12
            params = {}

            constructor(reduce_colors_data, reduce_colors_count, feedback) {
                super(feedback || 0);
                this.params.reduce_colors_data = reduce_colors_data;
this.params.reduce_colors_count = reduce_colors_count;

            }
        }

        class ReduceColorsElement extends SynthElementBase {
            get_title() {
                return "ReduceColors";
            }

            get_type() {
                return ReduceColors;
            }

            get_args() {
                return {
                    reduce_colors_data: new ReduceColors_reduce_colors_data(this.synth),reduce_colors_count: new ReduceColors_reduce_colors_count(this.synth)
                }
            }
        }
        customElements.define('synth-reducecolors', ReduceColorsElement);
        class Reflector extends Function {
            id = 13
            params = {}

            constructor(reflect_theta, reflect_y, reflect_x, feedback) {
                super(feedback || 0);
                this.params.reflect_theta = reflect_theta;
this.params.reflect_y = reflect_y;
this.params.reflect_x = reflect_x;

            }
        }

        class ReflectorElement extends SynthElementBase {
            get_title() {
                return "Reflector";
            }

            get_type() {
                return Reflector;
            }

            get_args() {
                return {
                    reflect_theta: new FloatBar([0,6.283185307179586], 1.5707963267948966),reflect_y: new FloatBar([-1,1], 0),reflect_x: new FloatBar([-1,1], 0)
                }
            }
        }
        customElements.define('synth-reflector', ReflectorElement);
class Rotate extends Function {
    id = 14
    params = {}

    constructor(rotation, feedback) {
        super(feedback || 0);
        this.params.rotation = rotation;

    }
}

class RotateElement extends SynthElementBase {
    get_title() {
        return "Rotate";
    }

    get_type() {
        return Rotate;
    }

    get_args() {
        return {
            rotation: new FloatBar([0,6.283185307179586], 0)
        }
    }
}
customElements.define('synth-rotate', RotateElement);
        class Superformula extends Function {
            id = 15
            params = {}

            constructor(sf_color, sf_m, sf_n, sf_thickness, sf_smooth_edges, feedback) {
                super(feedback || 0);
                this.params.sf_color = sf_color;
this.params.sf_m = sf_m;
this.params.sf_n = sf_n;
this.params.sf_thickness = sf_thickness;
this.params.sf_smooth_edges = sf_smooth_edges;

            }
        }

        class SuperformulaElement extends SynthElementBase {
            get_title() {
                return "Superformula";
            }

            get_type() {
                return Superformula;
            }

            get_args() {
                return {
                    sf_color: new VecEntry(3, ["r","g","b"], [[0, 1],[0, 1],[0, 1],], [1,0,0]),sf_m: new FloatBar([1,10], 1),sf_n: new VecEntry(3, ["n1","n2","n3"], [[0, 20],[0, 20],[0, 20],], [20,20,20]),sf_thickness: new FloatBar([0,1], 0.5),sf_smooth_edges: new BoolEntry(true)
                }
            }
        }
        customElements.define('synth-superformula', SuperformulaElement);
class Swirl extends Function {
    id = 16
    params = {}

    constructor(factor, feedback) {
        super(feedback || 0);
        this.params.factor = factor;

    }
}

class SwirlElement extends SynthElementBase {
    get_title() {
        return "Swirl";
    }

    get_type() {
        return Swirl;
    }

    get_args() {
        return {
            factor: new FloatBar([0,6.283185307179586], 0)
        }
    }
}
customElements.define('synth-swirl', SwirlElement);
        class Threshold extends Function {
            id = 17
            params = {}

            constructor(threshold_high_r, threshold_high_g, threshold_high_b, thresholds, feedback) {
                super(feedback || 0);
                this.params.threshold_high_r = threshold_high_r;
this.params.threshold_high_g = threshold_high_g;
this.params.threshold_high_b = threshold_high_b;
this.params.thresholds = thresholds;

            }
        }

        class ThresholdElement extends SynthElementBase {
            get_title() {
                return "Threshold";
            }

            get_type() {
                return Threshold;
            }

            get_args() {
                return {
                    threshold_high_r: new BoolEntry(true),threshold_high_g: new BoolEntry(true),threshold_high_b: new BoolEntry(true),thresholds: new VecEntry(3, ["r","g","b"], [[0, 1],[0, 1],[0, 1],], [0,0,0])
                }
            }
        }
        customElements.define('synth-threshold', ThresholdElement);
        class Tile extends Function {
            id = 18
            params = {}

            constructor(tile_x, tile_y, feedback) {
                super(feedback || 0);
                this.params.tile_x = tile_x;
this.params.tile_y = tile_y;

            }
        }

        class TileElement extends SynthElementBase {
            get_title() {
                return "Tile";
            }

            get_type() {
                return Tile;
            }

            get_args() {
                return {
                    tile_x: new IntEntry([1,100], 1),tile_y: new IntEntry([1,100], 1)
                }
            }
        }
        customElements.define('synth-tile', TileElement);
        class Webcam extends Function {
            id = 19
            params = {}

            constructor(webcam_texture, webcam_dimensions, webcam_invert_x, webcam_invert_y, feedback) {
                super(feedback || 0);
                this.params.webcam_texture = webcam_texture;
this.params.webcam_dimensions = webcam_dimensions;
this.params.webcam_invert_x = webcam_invert_x;
this.params.webcam_invert_y = webcam_invert_y;

            }
        }

        class WebcamElement extends SynthElementBase {
            get_title() {
                return "Webcam";
            }

            get_type() {
                return Webcam;
            }

            get_args() {
                return {
                    webcam_texture: new Webcam_webcam_texture(this.synth),webcam_dimensions: new Webcam_webcam_dimensions(this.synth),webcam_invert_x: new BoolEntry(true),webcam_invert_y: new BoolEntry(true)
                }
            }
        }
        customElements.define('synth-webcam', WebcamElement);
        class Zoom extends Function {
            id = 20
            params = {}

            constructor(zoom, zoom_center, feedback) {
                super(feedback || 0);
                this.params.zoom = zoom;
this.params.zoom_center = zoom_center;

            }
        }

        class ZoomElement extends SynthElementBase {
            get_title() {
                return "Zoom";
            }

            get_type() {
                return Zoom;
            }

            get_args() {
                return {
                    zoom: new FloatBar([0,10], 1),zoom_center: new VecEntry(2, ["x","y"], [[0, 1],[0, 1],], [0.5,0.5])
                }
            }
        }
        customElements.define('synth-zoom', ZoomElement);
const MODULE_IDS = {"blur": {class: "BlurElement", tag: "space"},"enhance": {class: "EnhanceElement", tag: "color"},"gamma correct": {class: "GammaCorrectElement", tag: "color"},"hue shift": {class: "HueShiftElement", tag: "color"},"invert color": {class: "InvertColorElement", tag: "color"},"noise": {class: "NoiseElement", tag: "generator"},"offset": {class: "OffsetElement", tag: "color"},"oscillator": {class: "OscillatorElement", tag: "generator"},"picture": {class: "PictureElement", tag: "generator"},"pixelate": {class: "PixelateElement", tag: "space"},"recolor": {class: "RecolorElement", tag: "color"},"reduce colors": {class: "ReduceColorsElement", tag: "color"},"reflector": {class: "ReflectorElement", tag: "space"},"rotate": {class: "RotateElement", tag: "space"},"superformula": {class: "SuperformulaElement", tag: "generator"},"swirl": {class: "SwirlElement", tag: "space"},"threshold": {class: "ThresholdElement", tag: "color"},"tile": {class: "TileElement", tag: "space"},"webcam": {class: "WebcamElement", tag: "generator"},"zoom": {class: "ZoomElement", tag: "space"},}
// ---------- END build/module_lib.js ------

// ---------- meta_module.js ----------
class ModuleElement extends SynthStageBase {
    stages = [];
    stageModules = {};

    enable = true;

    get_title() {
        return `Meta-${this.module.name}`;
    }

    setup_synth_state(synth, module) {
        for (let idx of module.selection) {
            const name = synth.stages[idx];
            this.stages.push(name);
            this.stageModules[name] = synth.stageModules[name];
        }

        const counter = globalCounters[this.get_title()] || 0;
        globalCounters[this.get_title()] = counter + 1;
        this.name = `${this.get_title()}-${counter}`;

        let old_name = synth.stages[module.selection[0]];
        synth.stages[module.selection[0]] = this.name;
        delete synth.stageModules[old_name];
        synth.stageModules[this.name] = this;

        console.log("removed stage", old_name, module.selection);

        for (let _i = 1; _i < module.selection.length; _i++) {
            console.log("removing stage", synth.stages[module.selection[1]]);
            synth.remove_stage(synth.stages[module.selection[1]]);
        }
    }

    constructor(synth, module) {
        super(synth, (self_) => {
            self_.module = module;
        });
        this.setup_synth_state(synth, module);
        this.synth_container = document.createElement('div');
        this.container.appendChild(this.synth_container);
    }

    appendChild(child) {
        this.synth_container.appendChild(child);
    }

    toggle_stage(name, state) {
        this.stageModules[name].enable = state;
    }

    save() {
        const saved = [];
        for (let i = 0; i < this.synth_container.children.length; i++)
            saved.push(this.synth_container.children[i].save());
        return {
            title: this.get_title(),
            module: this.module,
            enabled: this.enable_el.checked,
            args: saved,
        }
    }
}
customElements.define('module-element', ModuleElement);

const meta_modules = { };

class ModuleCreator {
    selection = new Set();

    constructor(modal, synth, resolver) {
        this.container = document.createElement('div');
        this.container.className = "functiongen";
        this.container.style['text-align'] = "left";

        const header = document.createElement('h1');
        header.innerText = "Module Creator";
        const subheading = document.createElement('h3');
        subheading.innerText = "Select consecutive stages to create a meta module";
        this.container.appendChild(header);
        this.container.appendChild(subheading);
        this.container.appendChild(document.createElement('hr'));
        this.container.appendChild(document.createElement('br'));

        this.error = document.createElement('p');
        this.error.className = 'errors';

        const name_label = document.createElement("label");
        name_label.for = "module-name";
        name_label.innerText = "Name of module: ";
        const name = document.createElement("input");
        name.id = "module-name";
        this.container.appendChild(name_label);
        this.container.appendChild(name);
        this.container.appendChild(document.createElement("br"));

        if (synth.stages.length == 0) {
            this.error.innerText = "No stages in synth! Please add some stages before creating a new module.";
        } else {
            const selection_container = document.createElement('div');
            selection_container.className = 'create-module-selection';
            for (let i = 0; i < synth.stages.length; i++) {
                const stage = synth.stages[i];
                const label = document.createElement('label');
                label.for = stage;
                label.innerText = stage;
                const option = document.createElement('input');
                option.type = 'checkbox';
                option.id = stage;
                option.addEventListener('change', () => {
                    this.selected(stage, i, option.checked);
                });

                selection_container.appendChild(label);
                selection_container.appendChild(option);
                selection_container.appendChild(document.createElement('br'));
            }

            this.container.appendChild(selection_container);
        }

        this.save = document.createElement('button');
        this.save.innerText = "Save";
        this.save.style.display = "";
        this.save.addEventListener("click", () => {
            if (name.value === "") {
                this.error.innerText = "Please enter a valid name!";
            } else if (meta_modules[name.value] === "") {
                this.error.innerText = "That name is already taken!";
            } else {
                const selection = Array.from(this.selection);
                selection.sort((x, y) => x - y);
                resolver({
                    name: name.value,
                    selection: selection
                });
            }
        });

        const cancel = document.createElement('button');
        cancel.innerText = "Cancel";
        cancel.addEventListener("click", () => {
            resolver();
        });
        this.container.appendChild(document.createElement('br'));
        this.container.appendChild(this.error);
        this.container.appendChild(cancel);
        this.container.appendChild(this.save);
        modal.appendChild(this.container);
    }

    remove() {
        this.container.remove();
    }

    selected(name, id, state) {
        if (state)
            this.selection.add(id);
        else
            this.selection.delete(id);
        console.log(name, id, state);

        this.validate();
    }

    validate() {
        let seen_true = false;
        let expect_absent = false;
        let invalid = false;
        for (let i = 0; i < synth.stages.length; i++) {
            if (this.selection.has(i)) {
                if (expect_absent) {
                    invalid = true;
                    break;
                }
                seen_true = true;
            } else if (seen_true) {
                expect_absent = true;
            }
        }

        if (invalid) {
            this.save.style.display = "none";
            this.error.innerText = "Invalid selection! Must choose consecutive stages"
        } else if (this.selection.size) {
            this.save.style.display = "";
            this.error.innerText = ""
        } else {
            this.save.style.display = "none";
        }
    }
}

function append_meta_module(name, initializer, length, ui, synth) {
    loaddata(initializer, ui, synth);
    const meta_module = {
        name: name,
        selection: [...Array(length).keys()].map(x => synth.stages.length - length + x)
    };
    add_meta_module(meta_module, ui, synth);
}

function register_module(name, meta_module_desc) {
    if (meta_modules[name])
        return;
    meta_modules[name] = meta_module_desc;
    document.getElementById('add-meta-module').style.display = "";
    const new_option = document.createElement('option');
    new_option.innerText = name;
    new_option.value = name;
    document.getElementById('add-meta-select').appendChild(new_option);

}

function add_meta_module(module, ui, synth) {
    console.log(...synth.stages);
    const synth_module = new ModuleElement(synth, module);
    for (let idx of module.selection)
        ui.children[idx].reparent_to_module(synth_module);

    ui.insertBefore(synth_module, ui.children[module.selection[0]]);
    for (let i = 0; i < module.selection.length; i++) {
        const child = ui.children[module.selection[0] + 1];
        child.remove();
        synth_module.appendChild(child);
    }
    console.log(...synth.stages);
}

function setup_meta_module(ui, synth) {
    const createbtn = document.getElementById("create-module");
    createbtn.addEventListener('click', async () => {
        let resolver = null;
        const p = new Promise(r => { resolver = r; });
        const modal = createModal(resolver);
        const creator = new ModuleCreator(modal, synth, resolver);

        const meta_module_defn = await p;
        creator.remove();
        modal.remove();
        if (!meta_module_defn)
            return;

        const module_initializer = [];
        for (let idx of meta_module_defn.selection) {
            module_initializer.push(ui.children[idx].save());
        }

        register_module(
            meta_module_defn.name,
            {
                init: module_initializer,
                count: meta_module_defn.selection.length
            }
        );

        add_meta_module(meta_module_defn, ui, synth);
    });

    document.getElementById("add-meta").addEventListener("click", () => {
        console.log("onclick");
        const name = document.getElementById('add-meta-select').value;
        const data = meta_modules[name];
        append_meta_module(name, data.init, data.count, ui, synth);
    });

    // TODO "delete" module ui
}
// ---------- END meta_module.js ------

// ---------- saveload.js ----------
function loaddata(savedata, ui, synth) {
    // TODO validation
    for (let elem of savedata) {
        if (elem.module) {
            // if (!meta_modules[elem.module.name])
            //     throw new Error("Unexpected module"); // TODO ui for this error
            const count = elem.module.selection.length;
            console.group(`ADD ${elem.module.name}`);
            // TODO take in MetaModuleManager obj or smth
            append_meta_module(elem.module.name, elem.args, count, ui, synth);
            console.groupEnd(`ADD ${elem.module.name}`);
        } else {
            const moduleElem = eval(elem.title + 'Element');
            const new_elem = new moduleElem(synth);
            ui.appendChild(new_elem);
            new_elem.load(elem);
            console.log('ADD', new_elem.get_title());
        }
    }
}

function load_meta_modules(moduledata_descs) {
    for (let module_name of Object.keys(moduledata_descs)) {
        if (meta_modules[module_name])
            throw new Error("Conflicting module name"); // TODO ui for this error
    }

    for (let module_name of Object.keys(moduledata_descs))
        register_module(module_name, moduledata_descs[module_name]);
}

function setup_save_load(ui, synth) {
    document.getElementById("save").addEventListener('click', () => {
        const saved = [];
        for (let i = 0; i < ui.children.length; i++) {
            saved.push(ui.children[i].save());
        }

        const saveobj = {
            stages: saved,
            modules: meta_modules,
        };

        const savedata = encodeURI(JSON.stringify(saveobj));
        const downloader = document.createElement('a');
        downloader.setAttribute('href', 'data:text/plain;charset=utf-8,' + savedata);
        downloader.setAttribute('download', 'videoSynth.savedata');
        downloader.style.display = "none";
        document.body.appendChild(downloader);

        downloader.click();

        document.body.removeChild(downloader);
    });

    const loadUpload = document.getElementById("load");
    loadUpload.addEventListener("change", () => {
        let file = loadUpload.files[0];
        let reader = new FileReader();
        console.log(file, reader);
        reader.readAsText(file)
        reader.onloadend = () => {
            const savedata = JSON.parse(reader.result);
            if (savedata.stages) {
                load_meta_modules(savedata.modules, ui, synth);
                loaddata(savedata.stages, ui, synth);
            } else { // older version for compat
                loaddata(savedata, ui, synth);
            }
        };
    });
}
// ---------- END saveload.js ------

// ---------- synth.js ----------
class Synth {
    recording = [];
    record_frames = 0;

    dimensions = [1000, 1000];

    stages = [];
    stageModules = {};

    transform = {
        center: [ 0.5, 0.5 ],
        scale: 1,
        rotation: 0,
    }

    reset_transform() {
        this.transform = {
            center: [ 0.5, 0.5 ],
            scale: 1,
            rotation: 0,
        }
    }

    enable = true;

    constructor(canvas, fragShader) {
        this.dimensions = [1000, 1000];

        canvas.width = this.dimensions[0];
        canvas.height = this.dimensions[1];
        this.gl = canvas.getContext("webgl2", {'preserveDrawingBuffer': true});
        if (!this.gl)
            throw new Error("Could not initialize webgl2 context! Does your browser support webgl2?");
        enableGlExts(this.gl);

        this.programInfo = twgl.createProgramInfo(this.gl, [vs, fragShader]);
        const bufferInfo = twgl.createBufferInfoFromArrays(this.gl, bufferArrays);
        setupProgram(this.gl, this.programInfo, bufferInfo);

        this.fbs = new FrameBufferManager(this.gl, this.dimensions);
        this.canvas = canvas;
    }

    async render(time) {
        const process_stages = (fn_params, stage) => {
            if (!fn_params.enable) {
                return;
            }

            if (stage == 0)
                this.reset_transform();

            if (fn_params instanceof Synth || fn_params instanceof ModuleElement) {
                fn_params.stages.forEach((name, stage_) => {
                    const fn_params_ = fn_params.stageModules[name];
                    process_stages(fn_params_, stage + 1 + stage_);
                });
                return;
            } else if (fn_params instanceof TransformElement) {
                // if (fn_params.params["clear transform"]) {
                //     this.reset_transform();
                // } else {
                    this.transform.scale = fn_params.params.scale;
                    this.transform.center = [...fn_params.params.center];
                    this.transform.rotation = fn_params.params.rotation;
                // }
                return;
            }

            this.fbs.bind_dst();
            const params = {
                u_dimensions: this.dimensions,
                u_tex_dimensions: this.dimensions,
                u_texture: this.fbs.src(),
                u_transform_center: this.transform.center,
                u_transform_scale: this.transform.scale,
                u_transform_rotation: this.transform.rotation,
                u_function: fn_params.id,
                u_stage: stage,
                u_feedback: fn_params.feedback,
                u_constrain_to_transform: fn_params.constrain,
            };
            for (let key of Object.keys(fn_params.params)) {
                params['u_' + key] = fn_params.params[key];
            }

            twgl.setUniforms(this.programInfo, params);
            render(this.gl);
            this.fbs.flipflop();
        };

        process_stages(this, -1);

        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);
        twgl.setUniforms(this.programInfo, {
            u_tex_dimensions: this.dimensions,
            u_texture: this.fbs.src(),
            u_function: 0,
            u_stage: this.stages.length + 1,
            u_feedback: 1,
        });
        render(this.gl);

        await new Promise(r => setTimeout(r, 10));
    }

    add_stage(name, module) {
        if (this.stages.indexOf(name) != -1)
            throw new Error("name collision");
        this.stageModules[name] = module;
        this.stages.push(name);
    }

    remove_stage(name) {
        const idx = this.stages.indexOf(name);
        if (idx == -1)
            throw new Error("no such stage");
        delete this.stageModules[name];
        this.stages.splice(idx, 1);
    }

    toggle_stage(name, state) {
        this.stageModules[name].enable = state;
    }

    run() {
        const runner = async (time) => {
            await this.render(time);
            if (this.record_frames) {
                this.recording.push(this.canvas.toDataURL());
                this.record_frames--;
            }
            requestAnimationFrame(runner);
        }
        requestAnimationFrame(runner);
    }
}

function setup_controler() {
    let current_controls = 0;
    const num_controls = 3;
    document.getElementById("controls-next").addEventListener("click", () => {
        document.getElementById(`controls-${current_controls}`).style.display = "none";
        current_controls += 1;
        current_controls %= num_controls;
        document.getElementById(`controls-${current_controls}`).style.display = "";
    });
    document.getElementById("controls-prev").addEventListener("click", () => {
        document.getElementById(`controls-${current_controls}`).style.display = "none";
        current_controls -= 1;
        if (current_controls < 0)
            current_controls += num_controls;
        document.getElementById(`controls-${current_controls}`).style.display = "";
    });
}

const add_new_tags = ["generator", "space", "color"];
let current_add_new_tag = 0;
function setup_add_new_stage(ui, synth) {
    const update_add_new = (new_tag) => {
        new_tag = (new_tag + add_new_tags.length) % add_new_tags.length;

        const old_obj = document.getElementById(`add_new_${add_new_tags[current_add_new_tag]}_container`);
        old_obj.style.display = "none";
        const new_obj = document.getElementById(`add_new_${add_new_tags[new_tag]}_container`);
        new_obj.style.display = "";

        current_add_new_tag = new_tag;
    };

    document.getElementById("add_new-prev").addEventListener('click', () => {
        update_add_new(current_add_new_tag - 1);
    });
    document.getElementById("add_new-next").addEventListener('click', () => {
        update_add_new(current_add_new_tag + 1);
    });

    const buttons = {};
    const selectors = {};
    for (let tag of add_new_tags) {
        buttons[tag] = document.getElementById(`add_new_${tag}`);
        selectors[tag] = document.getElementById(`add_new_${tag}_select`);
        buttons[tag].addEventListener('click', () => {
            const stageElem = eval(selectors[tag].value);
            ui.appendChild(new stageElem(synth));
        });
    }

    for (let module of Object.keys(MODULE_IDS)) {
        const module_info = MODULE_IDS[module];

        const opt = document.createElement('option');
        opt.innerText = module;
        opt.value = module_info.class;

        selectors[module_info.tag].appendChild(opt);
    }

    const opt = document.createElement('option');
    opt.innerText = 'transform';
    opt.value = 'TransformElement';
    selectors['space'].appendChild(opt);
}

async function synth_main(canvas, root) {
    root = root || ".";

    const fragShader = await getFile(root + "/synth.frag.c");
    const synth = new Synth(canvas, fragShader);
    window.synth = synth;
    synth.run();

    const ui = document.getElementById("ui-container");

    setup_controler();
    setup_add_new_stage(ui, synth);
    setup_meta_module(ui, synth);
    setup_save_load(ui, synth);
}

async function loadStaticSynth(canvas, root, datapath, cb) {
    root = root || ".";
    const fragShader = await getFile(root + "/synth.frag.c");

    const data = JSON.parse(await getFile(root + datapath));
    const synth = new Synth(canvas, fragShader)
    synth.run();

    // note that meta-modules don't need to be loaded
    const ui = document.createElement('div');
    loaddata(data.stages, ui, synth);
    if (cb) {
        cb(ui);
    }
}
// ---------- END synth.js ------

