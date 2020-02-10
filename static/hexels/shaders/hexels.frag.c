varying mediump vec2 vTextureCoord;
varying mediump vec3 vLighting;
uniform sampler2D uSampler;
uniform mediump float uPixSize;

// sign(sign(a - b) + 1) -> 1 if a >= b 0 if a < b
mediump float isGEq(float a, float b) {
    return sign(sign(a - b) + 1.0);
}

void main(void) {
    mediump float n = max(uPixSize, 0.01) / 10.0;
    mediump float halfn = n / 2.0;

    mediump float sqrt3 = 1.732;

    mediump float W = sqrt3 * n;
    mediump float halfW = W/2.0;

    mediump float H = 3.0 * halfn;

    mediump float xidx = floor(vTextureCoord.x / W);
    mediump float yidx = floor(vTextureCoord.y / H);

    // Get top left corner of bounding square
    mediump vec2 o = vec2(W * xidx, H * yidx);

    // transform coordinates to make square begin at origin
    mediump vec2 t = vTextureCoord - o;

    // Hexagon targets in transformed space
    mediump vec2 vertA = vec2(0.0, 0.0);
    mediump vec2 vertB = vec2(W, 0.0);
    mediump vec2 vertC = vec2(halfW, H);

    mediump vec2 vertInvalid = vec2(-1.0, 0.0);

    // pattern alternates every other row
    if (mod(yidx, 2.0) != 0.0) {
        t.y = H - t.y;
    }

    mediump float xLeHalfW = isGEq(halfW, t.x);
    mediump float yLehalfN = isGEq(halfn, t.y);
    mediump float yGeN = isGEq(t.y, n);

    mediump float yt = t.y - halfn;
    mediump float xt = (t.x - halfW) / sqrt3;
    mediump float xnt = (halfW - t.x) / sqrt3;

    mediump float xntGeYt = isGEq(xnt, yt);
    mediump float xtGeYt = isGEq(xt, yt);

    // output to sampler
    mediump vec2 hex =
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

    if (mod(yidx, 2.0) != 0.0) {
        hex.y = H - hex.y;
    }

   hex += o;
   gl_FragColor = texture2D(uSampler, hex);
}
