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

const vs = `
    #version 300 es
    in vec4 position;
    void main() {
      gl_Position = position;
    }`;

const fs = `
    #version 300 es
    #ifdef GL_FRAGMENT_PRECISION_HIGH
    precision highp float;
    precision highp int;
    #else
    precision mediump float;
    precision mediump int;
    #endif

    #define PI 3.1415926538

    uniform int u_ratio_a;
    uniform int u_ratio_b;
    uniform vec3 u_color_a;
    uniform vec3 u_color_b;

    out vec4 color_out;

    void main() {
        int total = u_ratio_a + u_ratio_b;
        int x = int(gl_FragCoord.x + gl_FragCoord.y) % total;
        if (x < u_ratio_a)
            color_out = vec4(u_color_a, 1.0);
        else
            color_out = vec4(u_color_b, 1.0);
    }
`

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

var gl = null;
async function main() {
    await loadTwgl();

    const canvas = document.getElementById("glcanvas");
    const dimensions = [1000, 1000];

    canvas.width = dimensions[0];
    canvas.height = dimensions[1];
    gl = canvas.getContext("webgl2"/*, {premultipliedAlpha: false}*/);
    if (!gl)
        throw new Error("Could not initialize webgl2 context! Does your browser support webgl2?");

    const programInfo = twgl.createProgramInfo(gl, [vs, fs]);

    const bufferInfo = twgl.createBufferInfoFromArrays(gl, bufferArrays);
    setupProgram(gl, programInfo, bufferInfo);

    function colorToFArray(id, farray) {
        const color = document.getElementById(id).value;
        const red = parseInt(color.substr(1, 2), 16);
        const green = parseInt(color.substr(3, 2), 16);
        const blue = parseInt(color.substr(5, 2), 16);

        farray[0] = red / 255;
        farray[1] = green / 255;
        farray[2] = blue / 255;
        return farray;
    }

    const color_a = new Float32Array([1.0, 0.0, 0.0]);
    const color_b = new Float32Array([0.0, 0.0, 1.0]);
    function run() {
        const uniforms = {
            u_ratio_a: document.getElementById("ratio_a").value,
            u_ratio_b: document.getElementById("ratio_b").value,
            u_color_a: colorToFArray("color_a", color_a),
            u_color_b: colorToFArray("color_b", color_b),
        };
        twgl.setUniforms(programInfo, uniforms);
        render(gl);
    }
    run();

    document.getElementById("inputs").addEventListener('change', run);
}

document.addEventListener('DOMContentLoaded', main);
