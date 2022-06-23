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

#define OPCODE_COMPUTE_RADIUS 0
#define OPCODE_SELECT_CIRCLES 1
#define OPCODE_RENDER 2
#define OPCODE_RESIZE 3

uniform sampler2D u_radius_texture;
uniform sampler2D u_img_texture;
uniform sampler2D u_random_texture;
uniform int u_opcode;
uniform ivec2 u_in_dimensions;
uniform ivec2 u_dimensions;

out vec4 color_out;

void main() {
  // make sel thresh a fn of radius?
  float selection_thresh = 0.25;
  int max_radius = 10;

  vec2 coords = gl_FragCoord.xy;
  switch (u_opcode) {
  case OPCODE_RESIZE: {
    coords *= vec2(u_in_dimensions) / vec2(u_dimensions);
    coords.x = float(u_in_dimensions.x) - coords.x;
    color_out = texelFetch(u_img_texture, ivec2(coords), 0);
    break;
  }
  case OPCODE_COMPUTE_RADIUS: {
    vec4 color = texelFetch(u_img_texture, ivec2(coords), 0);
    float gray_value = 0.3 * color.r + 0.59 * color.g + 0.11 * color.b;
    float radius = ceil(exp(gray_value * 5.0) / exp(5.0) * 8.0);
    color_out.r = radius + 1.0;
    color_out.a = 1.0;
    break;
  }
  case OPCODE_SELECT_CIRCLES: {
    ivec2 icoords = ivec2(coords);

    ivec2 coords_local = icoords;

    color_out.rg = vec2(coords_local.xy);

    vec4 random_state_local = texelFetch(u_random_texture, icoords, 0);
    vec4 radius_local_px = texelFetch(u_radius_texture, icoords, 0);
    float radius_local = radius_local_px.r;

    bool circle_is_active = random_state_local.a > selection_thresh;
    if (circle_is_active) {
      // find if there are higher priority circles we belong to
      for (int ix = -1 * 2 * max_radius; ix <= 2 * max_radius; ix++) {
        for (int iy = -1 * 2 * max_radius; iy <= 2 * max_radius; iy++) {
          ivec2 pcoords = icoords + ivec2(ix, iy);
          vec4 random_state_remote = texelFetch(u_random_texture, pcoords, 0);
          if (ix == 0 && iy == 0) {
            continue;
          }
          if (random_state_remote.a > selection_thresh) {
            vec4 radius_px = texelFetch(u_radius_texture, pcoords, 0);
            float radius = radius_px.r;
            float dist = length(vec2(ix, iy));
            if (dist < (radius + radius_local)) {
              if (random_state_remote.a > random_state_local.a) {
                circle_is_active = false;
                color_out.b = float(ix * 1000 + iy * 10 + 1);
                break;
              }
            }
          }
        }
        if (!circle_is_active) {
          break;
        }
      }
    }

    color_out.r = radius_local;
    color_out.g = circle_is_active ? 1.0 : 0.0;
    color_out.a = 1.0;
    break;
  }
  case OPCODE_RENDER: {
    ivec2 icoords = ivec2(coords.x, float(u_dimensions.y) - coords.y);

    bool found = false;
    for (int ix = -1 * max_radius; ix <= max_radius; ix++) {
      for (int iy = -1 * max_radius; iy <= max_radius; iy++) {
        ivec2 pcoords = icoords + ivec2(ix, iy);
        vec4 selection_state = texelFetch(u_radius_texture, pcoords, 0);
        float dist = length(vec2(ix, iy));
        if (selection_state.g > 0.0 && dist <= (selection_state.r + 0.5)) {
          if (abs(dist - selection_state.r) <= 1.5) {
            vec4 color = texelFetch(u_img_texture, icoords, 0);
            color_out.rgb = color.rgb - vec3(0.05, 0.05, 0.05);
            found = true;
          }
          break;
        }
      }
      if (found) {
        break;
      }
    }

    if (!found) {
      color_out.r = 1.;
      color_out.g = 1.;
      color_out.b = 1.;
    }
    color_out.a = 1.0;
    break;
  }
  default: {
    break;
  }
  }
}
