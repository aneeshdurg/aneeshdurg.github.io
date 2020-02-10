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
     mediump vec2 o = vec2(
          W * xidx, H * yidx);

     // transform coordinates to make square begin at origin
     mediump vec2 t = vTextureCoord - o;

     // Hexagon targets in transformed space
     mediump vec2 vertA = vec2(0.0, 0.0);
     mediump vec2 vertB = vec2(W, 0.0);
     mediump vec2 vertC = vec2(halfW, H);

     // Additional "target" for debuggging
     mediump vec2 vertInvalid = vec2(-1.0, 0.0);

     mediump float xLeHalfW = isGEq(halfW, t.x);
     mediump float yLehalfN = isGEq(halfn, t.y);
     mediump float yGeN = isGEq(t.y, n);

     // output to sampler
     mediump vec2 hex =
          yLehalfN * (
              xLeHalfW * vertA +
              (1.0 - xLeHalfW) * vertB) +
          yGeN * vertC +
          (1.0 - yLehalfN) * (1.0 - yGeN) * vertInvalid;

    if (hex == vertA)
        gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
    else if (hex == vertB)
        gl_FragColor = vec4(0.0, 0.0, 1.0, 1.0);
    else if (hex == vertC)
        gl_FragColor = vec4(0.0, 1.0, 0.0, 1.0);
    else
        gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
}
