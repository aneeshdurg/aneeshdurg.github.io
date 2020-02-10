varying highp vec2 vTextureCoord;
varying highp vec3 vLighting;
uniform sampler2D uSampler;
uniform highp float uPixSize;

// sign(sign(a - b) + 1) -> 1 if a >= b 0 if a < b
highp float isGEq(float a, float b) {
    return sign(sign(a - b) + 1.0);
}

void main(void) {
    highp float n = max(uPixSize, 0.01) / 10.0;
    highp float halfn = n / 2.0;

    highp float sqrt3 = 1.732;

    highp float W = sqrt3 * n;
    highp float halfW = W/2.0;

    highp float H = 3.0 * halfn;

    highp float xidx = floor(vTextureCoord.x / W);
    highp float yidx = floor(vTextureCoord.y / H);

    // Get top left corner of bounding square
    highp vec2 o = vec2(W * xidx, H * yidx);

    // transform coordinates to make square begin at origin
    highp vec2 t = vTextureCoord - o;

    // Hexagon targets in transformed space
    highp vec2 vertA = vec2(0.0, 0.0);
    highp vec2 vertB = vec2(W, 0.0);
    highp vec2 vertC = vec2(halfW, H);

    highp vec2 vertInvalid = vec2(-1.0, 0.0);

    highp float xLeHalfW = isGEq(halfW, t.x);
    highp float yLehalfN = isGEq(halfn, t.y);
    highp float yGeN = isGEq(t.y, n);

    highp float yt = t.y - halfn;
    highp float xt = (t.x - halfW) / sqrt3;
    highp float xnt = (halfW - t.x) / sqrt3;

    highp float xntGeYt = isGEq(xnt, yt);
    highp float xtGeYt = isGEq(xt, yt);

    // output to sampler
    highp vec2 hex =
        yLehalfN * (
             xLeHalfW * vertA +
             (1.0 - xLeHalfW) * vertB) +
        yGeN * vertC +
        (1.0 - yLehalfN) * (1.0 - yGeN) * (
             xLeHalfW * (
                xntGeYt * vertA +
                (1.0 - xntGeYt) * vertC) +
             (1.0 - xLeHalfW) * (
                xtGeYt * vertB +
                (1.0 - xtGeYt) * vertC));

   if (hex == vertA)
        gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
    else if (hex == vertB)
        gl_FragColor = vec4(0.0, 0.0, 1.0, 1.0);
    else if (hex == vertC)
        gl_FragColor = vec4(0.0, 1.0, 0.0, 1.0);
    else
        gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
}
