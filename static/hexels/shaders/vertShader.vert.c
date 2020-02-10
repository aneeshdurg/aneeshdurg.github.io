attribute mediump vec3 aVertexNormal;
attribute mediump vec3 aVertexPosition;
attribute mediump vec2 aTextureCoord;

uniform mediump mat4 uNormalMatrix;
uniform mediump mat4 uMVMatrix;
uniform mediump mat4 uPMatrix;

varying mediump vec2 vTextureCoord;
varying mediump vec3 vLighting;

void main(void) {
    gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
    vTextureCoord = vec2(1.0 - aTextureCoord.x, aTextureCoord.y);

    // Apply lighting effect

    mediump vec3 ambientLight = vec3(0.6, 0.6, 0.6);
    mediump vec3 directionalLightColor = vec3(0.5, 0.5, 0.75);
    mediump vec3 directionalVector = vec3(0.85, 0.8, 0.75);

    mediump vec4 transformedNormal = uNormalMatrix * vec4(aVertexNormal, 1.0);

    mediump float directional =
        max(dot(transformedNormal.xyz, directionalVector), 0.0);
    vLighting = ambientLight + (directionalLightColor * directional);
}
