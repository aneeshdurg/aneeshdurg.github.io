#version 300 es
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
precision highp int;
#else
precision mediump float;
precision mediump int;
#endif

#define PI 3.1415926538
#define GOLDEN_RATIO 1.6180339887

#define OPCODE_TEST_HIT 1
#define OPCODE_DRAW 2
#define OPCODE_RENDER 3

uniform sampler2D u_coord_texture;
uniform sampler2D u_pixel_texture;
uniform int u_opcode;
uniform int u_coord_count;
uniform ivec2 u_dimensions;

out vec4 color_out;

void main() {
  vec2 coords = gl_FragCoord.xy;
  if (u_opcode == OPCODE_TEST_HIT) {
    color_out = texelFetch(u_coord_texture, ivec2(coords), 0);
    int r = int(color_out.z);
    bool failed = false;
    for (int i = -1 * r; i < r; i++) {
      for (int j = -1 * r; j < r; j++) {
        vec4 test =
          texelFetch(u_pixel_texture, ivec2(color_out.xy) + ivec2(i, j), 0);
        if (test.b > 0.) {
          failed = true;
          break;
        }
      }
      if (failed) {
        break;
      }
    }
    color_out.a = failed ? 0. : 1.;
  } else if (u_opcode == OPCODE_DRAW) {
    vec4 color = vec4(0.);
    for (int i = 0; i < u_coord_count; i++) {
      vec4 circle = texelFetch(u_coord_texture, ivec2(i, 0), 0);
      if (circle.a == 0.) {
        continue;
      }
      float r = circle.z;
      float d = length(circle.xy - coords);
      if (d <= r) {
        color.b += 1.;
      }
    }
    color_out = color + texelFetch(u_pixel_texture, ivec2(coords), 0);
  } else {
    color_out = texelFetch(u_pixel_texture, ivec2(coords), 0);
    color_out.a = 1.0;
  }
}
