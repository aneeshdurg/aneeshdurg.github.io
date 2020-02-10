varying highp vec2 vTextureCoord;
varying highp vec3 vLighting;
uniform sampler2D uSampler;
uniform highp float uPixSize;

void main(void) {
    highp float n = max(uPixSize, 0.01) / 10.0;
    gl_FragColor = texture2D(
        uSampler, n * floor(vTextureCoord / n));
}

