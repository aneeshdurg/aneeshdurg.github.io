varying mediump vec2 vTextureCoord;
varying mediump vec3 vLighting;
uniform sampler2D uSampler;
uniform mediump float uPixSize;

void main(void) {
    mediump float n = max(uPixSize, 0.01) / 10.0;
    gl_FragColor = texture2D(
        uSampler, n * floor(vTextureCoord / n));
}

