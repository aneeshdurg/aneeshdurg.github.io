#version 300 es
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
precision highp int;
#else
precision mediump float;
precision mediump int;
#endif

#define OPCODE_SELECT_CIRCLES 1
#define OPCODE_RENDER 2

uniform float u_radius_factor;
uniform int u_max_radius;

uniform sampler2D u_img_texture;
uniform sampler2D u_random_texture;
uniform int u_opcode;
uniform ivec2 u_in_dimensions;
uniform ivec2 u_dimensions;

out vec4 color_out;

vec4 getImgPx(vec2 coords_) {
  vec2 coords = vec2(coords_);
  coords *= vec2(u_in_dimensions) / vec2(u_dimensions);
  coords.x = float(u_in_dimensions.x) - coords.x;
  return texelFetch(u_img_texture, ivec2(coords), 0);
}

float getRadius(vec4 color) {
  float gray_value = 0.3 * color.r + 0.59 * color.g + 0.11 * color.b;
  float radius = ceil(exp(gray_value * u_radius_factor) / exp(u_radius_factor) *
                      float(u_max_radius));
  return radius + 1.0;
}

float getRadius(vec2 coords_) {
  vec4 color = getImgPx(coords_);
  return getRadius(color);
}

void main() {
  // make sel thresh a fn of radius?
  float selection_thresh = 0.25;

  vec2 coords = gl_FragCoord.xy;
  switch (u_opcode) {
  case OPCODE_SELECT_CIRCLES: {
    ivec2 icoords = ivec2(coords);

    ivec2 coords_local = icoords;

    color_out.rg = vec2(coords_local.xy);

    vec4 random_state_local = texelFetch(u_random_texture, icoords, 0);
    float radius_local = getRadius(coords);

    bool circle_is_active = random_state_local.a > selection_thresh;
    if (circle_is_active) {
      // find if there are higher priority circles we belong to
      for (int ix = -1 * 2 * u_max_radius; ix <= 2 * u_max_radius; ix++) {
        for (int iy = -1 * 2 * u_max_radius; iy <= 2 * u_max_radius; iy++) {
          ivec2 pcoords = icoords + ivec2(ix, iy);
          vec4 random_state_remote = texelFetch(u_random_texture, pcoords, 0);
          if (ix == 0 && iy == 0) {
            continue;
          }
          if (random_state_remote.a > selection_thresh) {
            float radius = getRadius(vec2(pcoords));
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

    color_out.rgb = getImgPx(coords).rgb;
    color_out.a = circle_is_active ? 1.0 : 0.0;
    break;
  }
  case OPCODE_RENDER: {
    ivec2 icoords = ivec2(coords.x, float(u_dimensions.y) - coords.y);

    bool found = false;
    for (int ix = -1 * u_max_radius; ix <= u_max_radius; ix++) {
      for (int iy = -1 * u_max_radius; iy <= u_max_radius; iy++) {
        ivec2 pcoords = icoords + ivec2(ix, iy);
        vec4 selection_state = texelFetch(u_img_texture, pcoords, 0);
        float dist = length(vec2(ix, iy));
        float radius = getRadius(selection_state);
        if (selection_state.a > 0.0 && dist <= (radius + 0.5)) {
          if (abs(dist - radius) <= 1.5) {
            color_out.rgb = selection_state.rgb - vec3(0.05, 0.05, 0.05);
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
