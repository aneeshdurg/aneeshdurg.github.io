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

#define FN_RENDER    0

uniform vec2 u_dimensions;
uniform vec2 u_tex_dimensions;
uniform sampler2D u_texture;
uniform float u_transform_scale;
uniform vec2 u_transform_center;
uniform float u_transform_rotation;
uniform int u_function;
uniform int u_stage;

uniform float u_feedback;
uniform bool u_constrain_to_transform;

out vec4 color_out;

vec3 hsv_to_rgb(vec3 hsv) {
    float h = hsv.r;
    while (h > 360.)
        h -= 360.;

    float s = hsv.g;
    float v = hsv.b;

    float c = v * s;
    float x = c * float(1 - abs(int(h / 60.) % 2 - 1));
    float m = v - c;

    vec3 rgb = vec3(0.);
    if (h < 60.)
        rgb = vec3(c, x, 0.);
    else if (h < 120.)
        rgb = vec3(x, c, 0.);
    else if (h < 180.)
        rgb = vec3(0., c, x);
    else if (h < 240.)
        rgb = vec3(0., x, c);
    else if (h < 300.)
        rgb = vec3(x, 0., c);
    else
        rgb = vec3(c, 0., x);

    rgb += m;
    return rgb;
}

vec3 rgb_to_hsv(vec3 rgb) {
    float c_max = max(max(rgb.r, rgb.g), rgb.b);
    float c_min = min(min(rgb.r, rgb.g), rgb.b);
    float delta = c_max - c_min;
    float h = 0.;
    if (delta == 0.)
        h = 0.;
    else if (c_max == rgb.r)
        h = 60. * float(int((rgb.g - rgb.b) / delta) % 6);
    else if (c_max == rgb.g)
        h = 60. * (((rgb.b - rgb.r) / delta) + 2.);
    else if (c_max == rgb.b)
        h = 60. * (((rgb.r - rgb.g) / delta) + 4.);

    float s = 0.;
    if (c_max != 0.)
        s = delta / c_max;
    float v = c_max;

    return vec3(h, s, v);
}

vec2 t_coords;

/// modulefn: blur
/// moduletag: space

uniform int u_blur_stride_x; /// { "start": 1, "end": 100, "default": 1 }
uniform int u_blur_stride_y; /// { "start": 1, "end": 100, "default": 1 }

void blur() {
    ivec2 c = ivec2(t_coords.xy);
    vec3 color = vec3(0);
    float size = float(u_blur_stride_y * u_blur_stride_x * 4);
    for (int y = -u_blur_stride_y + 1; y < u_blur_stride_y; y++) {
        for (int x = -u_blur_stride_x + 1; x < u_blur_stride_x; x++) {
            color += texelFetch(u_texture, c + ivec2(x, y), 0).xyz / size ;
        }
    }
    color_out = vec4(u_feedback * color, 1.);
}


/// modulefn: enhance
/// moduletag: color

uniform vec3 u_enhance; /// { "start": [0, 0, 0], "end": [10, 10, 10], "default": [1, 1, 1], "names": ["r", "g", "b"] }

void enhance() {
    color_out.rgb *= u_enhance;
}


/// modulefn: gamma_correct
/// moduletag: color

uniform float u_gamma_correction; /// { "start": 2, "end": 4, "default": 2 }

void gamma_correct() {
    float r = pow(color_out.r, 1. / u_gamma_correction);
    float g = pow(color_out.g, 1. / u_gamma_correction);
    float b = pow(color_out.b, 1. / u_gamma_correction);
    color_out.xyz = vec3(r, g, b);
}


/// modulefn: hue_shift
/// moduletag: color

uniform float u_hue_shift; /// { "start": 0, "end": 360, "default": 180 }
uniform float u_saturate_shift; /// { "start": 0, "end": 1, "default": 0 }

void hue_shift() {
    color_out.rgb = hsv_to_rgb(
        rgb_to_hsv(color_out.rgb) + vec3(u_hue_shift, u_saturate_shift, 0.));
}


/// modulefn: invert_color
/// moduletag: color

void invert_color() {
    color_out.rgb = 1. - color_out.rgb;
}


/// modulefn: noise
/// moduletag: generator

uniform float u_noise_r; /// { "start": 0, "end": 10000, "default": 0 }
uniform float u_noise_g; /// { "start": 0, "end": 10000, "default": 0 }
uniform float u_noise_b; /// { "start": 0, "end": 10000, "default": 0 }

// 2D Random
float random (in vec2 st, float noise_param) {
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))
                 * noise_param);
}

// 2D Noise based on Morgan McGuire @morgan3d
// https://www.shadertoy.com/view/4dS3Wd
float noise_1d (float noise_param) {
    vec2 st = t_coords.xy / u_dimensions;
    st *= 5.;

    vec2 i = floor(st);
    vec2 f = fract(st);

    // Four corners in 2D of a tile
    float a = random(i, noise_param);
    float b = random(i + vec2(1.0, 0.0), noise_param);
    float c = random(i + vec2(0.0, 1.0), noise_param);
    float d = random(i + vec2(1.0, 1.0), noise_param);

    // Smooth Interpolation

    // Cubic Hermine Curve.  Same as SmoothStep()
    vec2 u = f*f*(3.0-2.0*f);
    // u = smoothstep(0.,1.,f);

    // Mix 4 coorners percentages
    return mix(a, b, u.x) +
            (c - a)* u.y * (1.0 - u.x) +
            (d - b) * u.x * u.y;
}

void noise() {
    float r = noise_1d(u_noise_r);
    float g = noise_1d(u_noise_g);
    float b = noise_1d(u_noise_b);
    color_out.xyz += vec3(r, g, b);
}


/// modulefn: offset
/// moduletag: color

uniform vec3 u_offsets_x; /// { "start": [-1, -1, -1], "end": [1, 1, 1], "default": [0, 0, 0], "names": ["r", "g", "b"] }
uniform vec3 u_offsets_y; /// { "start": [-1, -1, -1], "end": [1, 1, 1], "default": [0, 0, 0], "names": ["r", "g", "b"] }

vec2 offset_fix_range(vec2 c) {
    vec2 res = c;
    if (res.x > 1.)
        res.x = res.x - 1.;
    if (res.x < 0.)
        res.x = 1. + res.x;

    if (res.y > 1.)
        res.y = res.y - 1.;
    if (res.y < 0.)
        res.y = 1. + res.y;

    return res;
}

void offset() {
    vec2 coords = t_coords.xy;
    vec2 c = coords / u_dimensions;

    vec2 c_r = c + vec2(u_offsets_x.r, u_offsets_y.r);
    c_r = offset_fix_range(c_r);
    vec2 c_g = c + vec2(u_offsets_x.g, u_offsets_y.g);
    c_g = offset_fix_range(c_g);
    vec2 c_b = c + vec2(u_offsets_x.b, u_offsets_y.b);
    c_b = offset_fix_range(c_b);

    color_out.r = texelFetch(u_texture, ivec2(c_r * u_tex_dimensions), 0).r;
    color_out.g = texelFetch(u_texture, ivec2(c_g * u_tex_dimensions), 0).g;
    color_out.b = texelFetch(u_texture, ivec2(c_b * u_tex_dimensions), 0).b;
    color_out *= u_feedback;
    color_out.a = 1.;
}


/// modulefn: oscillator
/// moduletag: generator

// sin(dot(f, x) + c) * color
uniform vec2 u_osc_f; /// { "start": [0, 0], "end": [1, 1], "default": [0.25, 0], "names": ["x", "y"] }
uniform float u_osc_c; /// { "start": 0, "end": "2 * math.pi", "default": 0 }
uniform vec3 u_osc_color; /// { "start": [0, 0, 0], "end": [1, 1, 1], "default": [1, 0, 0], "names": ["r", "g", "b"] }

void oscillator() {
    vec2 coords = t_coords.xy;
    color_out.xyz += sin(dot(u_osc_f, coords) + u_osc_c) * u_osc_color;
    color_out.a = 1.;
}


/// modulefn: picture
/// moduletag: generator

uniform sampler2D u_picture_texture; /// custom
uniform vec2 u_picture_dimensions; /// custom

void picture() {
    vec2 coords = t_coords.xy;
    vec2 c = coords / u_dimensions;
    c.y = 1. - c.y;
    c *= u_picture_dimensions;

    color_out.xyz += texelFetch(u_picture_texture, ivec2(c), 0).xyz;
}


/// modulefn: pixelate
/// moduletag: space

uniform int u_pixelate_factor; /// { "start": 0, "end": 500, "default": 10 }

void pixelate() {
    vec2 coords = t_coords.xy;
    float f = float(u_pixelate_factor);
    coords = floor(coords / f) * f;
    vec3 color = vec3(0);
    for (int i = 0; i < u_pixelate_factor; i++) {
        for (int j = 0; j < u_pixelate_factor; j++) {
            color += texelFetch(
                u_texture,
                ivec2(coords) + ivec2(i, j),
                0
            ).xyz / f;
        }
    }
    color_out = vec4(u_feedback * texelFetch(u_texture, ivec2(coords), 0).xyz, 1.);
}


/// modulefn: recolor
/// moduletag: color

uniform vec3 u_recolor_new_r; /// { "start": [0, 0, 0], "end": [1, 1, 1], "default": [1, 0, 0], "names": ["r", "g", "b"] }
uniform vec3 u_recolor_new_g; /// { "start": [0, 0, 0], "end": [1, 1, 1], "default": [0, 1, 0], "names": ["r", "g", "b"] }
uniform vec3 u_recolor_new_b; /// { "start": [0, 0, 0], "end": [1, 1, 1], "default": [0, 0, 1], "names": ["r", "g", "b"] }

void recolor() {
    color_out.xyz =
        color_out.r * u_recolor_new_r +
        color_out.g * u_recolor_new_g +
        color_out.b * u_recolor_new_b;
}


/// modulefn: reduce_colors
/// moduletag: color

uniform sampler2D u_reduce_colors_data; /// custom
uniform int u_reduce_colors_count; /// custom

void reduce_colors() {
    vec3 closest_color = vec3(0.);
    float dist = -1.;
    for (int i = 0; i < u_reduce_colors_count; i++) {
        vec3 candidate = texelFetch(u_reduce_colors_data, ivec2(i, 0), 0).rgb;
        vec3 dists = abs(candidate - color_out.rgb);
        float curr_dist = dists.r + dists.g + dists.b;
        if (dist < 0. || curr_dist < dist) {
            dist = curr_dist;
            closest_color = candidate;
        }
    }

    color_out.xyz = closest_color;
}


/// modulefn: reflector
/// moduletag: space

uniform float u_reflect_theta; /// { "start": 0, "end": "2 * math.pi", "default": "math.pi / 2" }
uniform float u_reflect_y; /// { "start": -1, "end": 1, "default": 0 }
uniform float u_reflect_x; /// { "start": -1, "end": 1, "default": 0 }

void reflector() {
    vec2 coords = t_coords.xy;
    vec2 c = coords / u_dimensions;
    c = 2. * c - 1.;
    c.y -= u_reflect_y;
    c.x -= u_reflect_x;

    float r = length(c);
    float theta = atan(c.y, c.x);
    float pos_theta = theta;
    if (pos_theta < 0.)
        pos_theta = 2. * PI + pos_theta;

    vec3 color = vec3(0.);

    if (pos_theta > (u_reflect_theta - PI) &&
            (pos_theta < u_reflect_theta ||
             pos_theta > (u_reflect_theta + PI))) {
        color = texelFetch(u_texture, ivec2(coords), 0).xyz;
    } else {
        theta = -(theta - u_reflect_theta) + u_reflect_theta;

        c = r * vec2(cos(theta), sin(theta));

        c.y += u_reflect_y;
        c.x += u_reflect_x;
        c = (c + 1.) / 2.;
        c *= u_dimensions;
        color = texelFetch(u_texture, ivec2(c), 0).xyz;
    }

    color_out = vec4(u_feedback * color, 1.);
}


/// modulefn: rotate
/// moduletag: space

uniform float u_rotation; /// { "start": 0, "end": "2 * math.pi", "default": 0 }

void rotate() {
    vec2 coords = t_coords.xy;
    vec2 c = coords / u_dimensions;
    c = 2. * c - 1.;

    float r = length(c);
    float theta = atan(c.y, c.x);
    theta += u_rotation;
    c = r * vec2(cos(theta), sin(theta));

    c  = (c + 1.) / 2.;
    c *= u_tex_dimensions;

    color_out = vec4(u_feedback * texelFetch(u_texture, ivec2(c), 0).xyz, 1.);
}


/// modulefn: superformula
/// moduletag: generator

uniform vec3 u_sf_color; /// { "start": [0, 0, 0], "end": [1, 1, 1], "default": [1, 0, 0], "names": ["r", "g", "b"] }
uniform float u_sf_m; /// { "start": 1, "end": 10, "default": 1 }
uniform vec3 u_sf_n; /// { "start": [0, 0, 0], "end": [20, 20, 20], "default": [20,20,20], "names": ["n1", "n2", "n3"] }
uniform float u_sf_thickness; /// { "start": 0, "end": 1, "default": 0.5 }
uniform bool u_sf_smooth_edges; /// { "default": true }

void superformula() {
    vec2 coords = t_coords.xy;
    vec2 c = coords / u_dimensions;
    c = 2. * c - 1.;

    float a = 1.;
    float b = 1.;

    float zoom = u_sf_m / 2.;

    c *= zoom;

    float r = length(c);
    float theta = atan(c.y, c.x);

    float super_r = pow(
        pow(abs(cos(u_sf_m * theta / 4.)/a), u_sf_n.y) +
        pow(abs(sin(u_sf_m * theta / 4.)/b), u_sf_n.z),
        -1./u_sf_n.x);

    if (abs(r - super_r) < u_sf_thickness) {
        float factor = 1.;
        if (u_sf_smooth_edges) {
            factor = 1. - abs(r - super_r) / u_sf_thickness;
        }

        color_out.rgb += factor * u_sf_color;
    }
}


/// modulefn: swirl
/// moduletag: space

uniform float u_factor; /// { "start": 0, "end": "2 * math.pi", "default": 0 }

void swirl() {
    vec2 coords = t_coords.xy;
    vec2 c = coords / u_dimensions;
    c = 2. * c - 1.;

    float r = length(c);
    float theta = atan(c.y, c.x);
    theta += r * u_factor;
    c = r * vec2(cos(theta), sin(theta));

    c  = (c + 1.) / 2.;
    c *= u_tex_dimensions;

    color_out = vec4(u_feedback * texelFetch(u_texture, ivec2(c), 0).xyz, 1.);
}


/// modulefn: threshold
/// moduletag: color

uniform bool u_threshold_high_r; /// { "default": true }
uniform bool u_threshold_high_g; /// { "default": true }
uniform bool u_threshold_high_b; /// { "default": true }
uniform vec3 u_thresholds; /// { "start": [0, 0, 0], "end": [1, 1, 1], "default": [0, 0, 0], "names": ["r", "g", "b"] }

void threshold() {
    color_out.rgb = sign(sign(color_out.rgb - u_thresholds) + 1.);
    if (u_threshold_high_r)
        color_out.r = 1. - color_out.r;
    if (u_threshold_high_g)
        color_out.g = 1. - color_out.g;
    if (u_threshold_high_b)
        color_out.b = 1. - color_out.b;
}


/// modulefn: tile
/// moduletag: space

uniform int u_tile_x; /// { "start": 1, "end": 100, "default": 1 }
uniform int u_tile_y; /// { "start": 1, "end": 100, "default": 1 }

void tile() {
    vec2 coords = t_coords.xy;
    float tile_x_size = u_dimensions.x / float(u_tile_x);
    float tile_y_size = u_dimensions.y / float(u_tile_y);

    coords.x = mod(coords.x, tile_x_size) * float(u_tile_x);
    coords.y = mod(coords.y, tile_y_size) * float(u_tile_y);
    // vec2 c = coords / u_dimensions;

    vec3 color = texelFetch(u_texture, ivec2(coords), 0).xyz;
    color_out = vec4(u_feedback * color, 1.);
}


/// modulefn: webcam
/// moduletag: generator

uniform sampler2D u_webcam_texture; /// custom
uniform vec2 u_webcam_dimensions; /// custom
uniform bool u_webcam_invert_x; ///  { "default": true }
uniform bool u_webcam_invert_y; ///  { "default": true }

void webcam() {
    vec2 coords = t_coords.xy;
    vec2 c = coords / u_dimensions;
    if (u_webcam_invert_y)
        c.y = 1. - c.y;
    if (u_webcam_invert_x)
        c.x = 1. - c.x;
    c *= u_webcam_dimensions;

    color_out.xyz += texelFetch(u_webcam_texture, ivec2(c), 0).xyz;
}


/// modulefn: zoom
/// moduletag: space

uniform float u_zoom; /// { "start": 0, "end": 10, "default": 1 }
uniform vec2 u_zoom_center;  /// { "start": [0, 0], "end": [1, 1], "default": [0.5, 0.5], "names": ["x", "y"] }

void zoom() {
    vec2 coords = t_coords.xy / u_dimensions;

    coords = coords - u_zoom_center;
    if (u_zoom > 0.)
        coords /= u_zoom;
    coords += u_zoom_center;

    vec2 c = coords * u_tex_dimensions;
    color_out = vec4(u_feedback * texelFetch(u_texture, ivec2(c), 0).xyz, 1.);
}



void main() {
    vec2 coords = gl_FragCoord.xy;
    vec2 c = coords * u_tex_dimensions / u_dimensions;
    color_out = vec4(u_feedback * texelFetch(u_texture, ivec2(c), 0).xyz, 1.);

    t_coords = gl_FragCoord.xy / u_dimensions - vec2(0.5) + u_transform_center;
    t_coords -= vec2(0.5);

    t_coords /= u_transform_scale;
    mat2 rot_mat = mat2(
            cos(u_transform_rotation), sin(u_transform_rotation),
            -sin(u_transform_rotation), cos(u_transform_rotation));
    t_coords = rot_mat * t_coords;

    t_coords += vec2(0.5);
    t_coords *= u_dimensions;

    if (u_constrain_to_transform) {
        if (t_coords.x < 0. || t_coords.x > u_dimensions.x ||
                t_coords.y < 0. || t_coords.y > u_dimensions.y) {
            return;
        }
    }

    switch(u_function) {
    case FN_RENDER:
        break;
case 1:
    blur();
    break;
case 2:
    enhance();
    break;
case 3:
    gamma_correct();
    break;
case 4:
    hue_shift();
    break;
case 5:
    invert_color();
    break;
case 6:
    noise();
    break;
case 7:
    offset();
    break;
case 8:
    oscillator();
    break;
case 9:
    picture();
    break;
case 10:
    pixelate();
    break;
case 11:
    recolor();
    break;
case 12:
    reduce_colors();
    break;
case 13:
    reflector();
    break;
case 14:
    rotate();
    break;
case 15:
    superformula();
    break;
case 16:
    swirl();
    break;
case 17:
    threshold();
    break;
case 18:
    tile();
    break;
case 19:
    webcam();
    break;
case 20:
    zoom();
    break;

    default:
        // shouldn't happen
        color_out = vec4(1., 0., 1., 1.);
        break;
    }

   color_out = clamp(color_out, -1., 1.);
}