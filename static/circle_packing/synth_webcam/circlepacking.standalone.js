const load_synth = (canvas, cb) => {// ---------- twgl-full.min.js ----------
/*!
 * @license twgl.js 4.18.0 Copyright (c) 2015, Gregg Tavares All Rights Reserved.
 * Available via the MIT license.
 * see: http://github.com/greggman/twgl.js for details
 */
!function(e,r){"object"==typeof exports&&"object"==typeof module?module.exports=r():"function"==typeof define&&define.amd?define([],r):"object"==typeof exports?exports.twgl=r():e.twgl=r()}("undefined"!=typeof self?self:this,(function(){return function(e){var r={};function t(n){if(r[n])return r[n].exports;var o=r[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,t),o.l=!0,o.exports}return t.m=e,t.c=r,t.d=function(e,r,n){t.o(e,r)||Object.defineProperty(e,r,{enumerable:!0,get:n})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,r){if(1&r&&(e=t(e)),8&r)return e;if(4&r&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(t.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&r&&"string"!=typeof e)for(var o in e)t.d(n,o,function(r){return e[r]}.bind(null,o));return n},t.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(r,"a",r),r},t.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},t.p="",t(t.s=8)}([function(e,r,t){"use strict";r.__esModule=!0,r.copyExistingProperties=function(e,r){Object.keys(r).forEach((function(t){r.hasOwnProperty(t)&&e.hasOwnProperty(t)&&(r[t]=e[t])}))},r.copyNamedProperties=function(e,r,t){e.forEach((function(e){var n=r[e];void 0!==n&&(t[e]=n)}))},r.error=function(){var e;(e=console).error.apply(e,arguments)},r.warn=function(){var e;(e=console).warn.apply(e,arguments)},r.isBuffer=function(e,r){return"undefined"!=typeof WebGLBuffer&&r instanceof WebGLBuffer},r.isRenderbuffer=function(e,r){return"undefined"!=typeof WebGLRenderbuffer&&r instanceof WebGLRenderbuffer},r.isShader=function(e,r){return"undefined"!=typeof WebGLShader&&r instanceof WebGLShader},r.isTexture=function(e,r){return"undefined"!=typeof WebGLTexture&&r instanceof WebGLTexture},r.isSampler=function(e,r){return"undefined"!=typeof WebGLSampler&&r instanceof WebGLSampler}},function(e,r,t){"use strict";r.__esModule=!0,r.getGLTypeForTypedArray=function(e){if(e instanceof Int8Array)return n;if(e instanceof Uint8Array)return o;if(e instanceof Uint8ClampedArray)return o;if(e instanceof Int16Array)return u;if(e instanceof Uint16Array)return i;if(e instanceof Int32Array)return a;if(e instanceof Uint32Array)return f;if(e instanceof Float32Array)return c;throw new Error("unsupported typed array type")},r.getGLTypeForTypedArrayType=function(e){if(e===Int8Array)return n;if(e===Uint8Array)return o;if(e===Uint8ClampedArray)return o;if(e===Int16Array)return u;if(e===Uint16Array)return i;if(e===Int32Array)return a;if(e===Uint32Array)return f;if(e===Float32Array)return c;throw new Error("unsupported typed array type")},r.getTypedArrayTypeForGLType=function(e){var r=l[e];if(!r)throw new Error("unknown gl type");return r},r.isArrayBuffer=void 0;var n=5120,o=5121,u=5122,i=5123,a=5124,f=5125,c=5126,l={},s=l;s[n]=Int8Array,s[5121]=Uint8Array,s[5122]=Int16Array,s[5123]=Uint16Array,s[a]=Int32Array,s[5125]=Uint32Array,s[5126]=Float32Array,s[32819]=Uint16Array,s[32820]=Uint16Array,s[33635]=Uint16Array,s[5131]=Uint16Array,s[33640]=Uint32Array,s[35899]=Uint32Array,s[35902]=Uint32Array,s[36269]=Uint32Array,s[34042]=Uint32Array;var y="undefined"!=typeof SharedArrayBuffer?function(e){return e&&e.buffer&&(e.buffer instanceof ArrayBuffer||e.buffer instanceof SharedArrayBuffer)}:function(e){return e&&e.buffer&&e.buffer instanceof ArrayBuffer};r.isArrayBuffer=y},function(e,r,t){"use strict";r.__esModule=!0,r.add=function(e,r,t){return(t=t||new n(3))[0]=e[0]+r[0],t[1]=e[1]+r[1],t[2]=e[2]+r[2],t},r.copy=function(e,r){return(r=r||new n(3))[0]=e[0],r[1]=e[1],r[2]=e[2],r},r.create=function(e,r,t){var o=new n(3);e&&(o[0]=e);r&&(o[1]=r);t&&(o[2]=t);return o},r.cross=function(e,r,t){t=t||new n(3);var o=e[2]*r[0]-e[0]*r[2],u=e[0]*r[1]-e[1]*r[0];return t[0]=e[1]*r[2]-e[2]*r[1],t[1]=o,t[2]=u,t},r.distance=function(e,r){var t=e[0]-r[0],n=e[1]-r[1],o=e[2]-r[2];return Math.sqrt(t*t+n*n+o*o)},r.distanceSq=function(e,r){var t=e[0]-r[0],n=e[1]-r[1],o=e[2]-r[2];return t*t+n*n+o*o},r.divide=function(e,r,t){return(t=t||new n(3))[0]=e[0]/r[0],t[1]=e[1]/r[1],t[2]=e[2]/r[2],t},r.divScalar=function(e,r,t){return(t=t||new n(3))[0]=e[0]/r,t[1]=e[1]/r,t[2]=e[2]/r,t},r.dot=function(e,r){return e[0]*r[0]+e[1]*r[1]+e[2]*r[2]},r.lerp=function(e,r,t,o){return(o=o||new n(3))[0]=e[0]+t*(r[0]-e[0]),o[1]=e[1]+t*(r[1]-e[1]),o[2]=e[2]+t*(r[2]-e[2]),o},r.lerpV=function(e,r,t,o){return(o=o||new n(3))[0]=e[0]+t[0]*(r[0]-e[0]),o[1]=e[1]+t[1]*(r[1]-e[1]),o[2]=e[2]+t[2]*(r[2]-e[2]),o},r.length=function(e){return Math.sqrt(e[0]*e[0]+e[1]*e[1]+e[2]*e[2])},r.lengthSq=function(e){return e[0]*e[0]+e[1]*e[1]+e[2]*e[2]},r.max=function(e,r,t){return(t=t||new n(3))[0]=Math.max(e[0],r[0]),t[1]=Math.max(e[1],r[1]),t[2]=Math.max(e[2],r[2]),t},r.min=function(e,r,t){return(t=t||new n(3))[0]=Math.min(e[0],r[0]),t[1]=Math.min(e[1],r[1]),t[2]=Math.min(e[2],r[2]),t},r.mulScalar=function(e,r,t){return(t=t||new n(3))[0]=e[0]*r,t[1]=e[1]*r,t[2]=e[2]*r,t},r.multiply=function(e,r,t){return(t=t||new n(3))[0]=e[0]*r[0],t[1]=e[1]*r[1],t[2]=e[2]*r[2],t},r.negate=function(e,r){return(r=r||new n(3))[0]=-e[0],r[1]=-e[1],r[2]=-e[2],r},r.normalize=function(e,r){r=r||new n(3);var t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],o=Math.sqrt(t);o>1e-5?(r[0]=e[0]/o,r[1]=e[1]/o,r[2]=e[2]/o):(r[0]=0,r[1]=0,r[2]=0);return r},r.setDefaultType=function(e){var r=n;return n=e,r},r.subtract=function(e,r,t){return(t=t||new n(3))[0]=e[0]-r[0],t[1]=e[1]-r[1],t[2]=e[2]-r[2],t};var n=Float32Array},function(e,r,t){"use strict";r.__esModule=!0,r.isWebGL1=function(e){return!e.texStorage2D},r.isWebGL2=function(e){return!!e.texStorage2D},r.glEnumToString=void 0;var n,o,u=(n={},o={},function(e,r){return function(e){var r=e.constructor.name;if(!n[r]){for(var t in e)if("number"==typeof e[t]){var u=o[e[t]];o[e[t]]=u?"".concat(u," | ").concat(t):t}n[r]=!0}}(e),o[r]||"0x"+r.toString(16)});r.glEnumToString=u},function(e,r,t){"use strict";function n(e){return(n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}r.__esModule=!0,r.createAttributeSetters=oe,r.createProgram=H,r.createProgramFromScripts=function(e,r,t,n,o){for(var u=G(t,n,o),i=[],a=0;a<r.length;++a){var f=q(e,r[a],e[X[a]],u.errorCallback);if(!f)return null;i.push(f)}return H(e,i,u)},r.createProgramFromSources=V,r.createProgramInfo=function(e,r,t,n,o){var u=G(t,n,o),i=!0;if(r=r.map((function(e){if(e.indexOf("\n")<0){var r=y(e);r?e=r.text:(u.errorCallback("no element with id: "+e),i=!1)}return e})),!i)return null;var a=V(e,r,u);if(!a)return null;return ie(e,a)},r.createProgramInfoFromProgram=ie,r.createUniformSetters=$,r.createUniformBlockSpecFromProgram=J,r.createUniformBlockInfoFromProgram=ee,r.createUniformBlockInfo=function(e,r,t){return ee(e,r.program,r.uniformBlockSpec,t)},r.createTransformFeedback=function(e,r,t){var n=e.createTransformFeedback();return e.bindTransformFeedback(36386,n),e.useProgram(r.program),Z(e,r,t),e.bindTransformFeedback(36386,null),n},r.createTransformFeedbackInfo=K,r.bindTransformFeedbackInfo=Z,r.setAttributes=ue,r.setBuffersAndAttributes=function(e,r,t){t.vertexArrayObject?e.bindVertexArray(t.vertexArrayObject):(ue(r.attribSetters||r,t.attribs),t.indices&&e.bindBuffer(34963,t.indices))},r.setUniforms=te,r.setUniformBlock=function(e,r,t){re(e,r,t)&&e.bufferData(m,t.array,35048)},r.setBlockUniforms=function(e,r){var t=e.setters;for(var n in r){var o=t[n];if(o){var u=r[n];o(u)}}},r.bindUniformBlock=re,r.setUniformsAndBindTextures=void 0;var o=a(t(3)),u=a(t(0));function i(){if("function"!=typeof WeakMap)return null;var e=new WeakMap;return i=function(){return e},e}function a(e){if(e&&e.__esModule)return e;if(null===e||"object"!==n(e)&&"function"!=typeof e)return{default:e};var r=i();if(r&&r.has(e))return r.get(e);var t={},o=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var u in e)if(Object.prototype.hasOwnProperty.call(e,u)){var a=o?Object.getOwnPropertyDescriptor(e,u):null;a&&(a.get||a.set)?Object.defineProperty(t,u,a):t[u]=e[u]}return t.default=e,r&&r.set(e,t),t}function f(e){return function(e){if(Array.isArray(e))return c(e)}(e)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||function(e,r){if(!e)return;if("string"==typeof e)return c(e,r);var t=Object.prototype.toString.call(e).slice(8,-1);"Object"===t&&e.constructor&&(t=e.constructor.name);if("Map"===t||"Set"===t)return Array.from(e);if("Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return c(e,r)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function c(e,r){(null==r||r>e.length)&&(r=e.length);for(var t=0,n=new Array(r);t<r;t++)n[t]=e[t];return n}var l=u.error,s=u.warn;function y(e){return"undefined"!=typeof document&&document.getElementById?document.getElementById(e):null}var v=33984,b=34962,m=35345,p=5126,d=5124,x=5125,w=3553,h=34067,F=32879,E=35866,A={};function j(e,r){return A[r].bindPoint}function O(e,r){return function(t){e.uniform1i(r,t)}}function _(e,r){return function(t){e.uniform1iv(r,t)}}function S(e,r){return function(t){e.uniform2iv(r,t)}}function M(e,r){return function(t){e.uniform3iv(r,t)}}function R(e,r){return function(t){e.uniform4iv(r,t)}}function P(e,r,t,n){var i=j(0,r);return o.isWebGL2(e)?function(r){var o,a;u.isTexture(e,r)?(o=r,a=null):(o=r.texture,a=r.sampler),e.uniform1i(n,t),e.activeTexture(v+t),e.bindTexture(i,o),e.bindSampler(t,a)}:function(r){e.uniform1i(n,t),e.activeTexture(v+t),e.bindTexture(i,r)}}function T(e,r,t,n,i){for(var a=j(0,r),f=new Int32Array(i),c=0;c<i;++c)f[c]=t+c;return o.isWebGL2(e)?function(r){e.uniform1iv(n,f),r.forEach((function(r,n){var o,i;e.activeTexture(v+f[n]),u.isTexture(e,r)?(o=r,i=null):(o=r.texture,i=r.sampler),e.bindSampler(t,i),e.bindTexture(a,o)}))}:function(r){e.uniform1iv(n,f),r.forEach((function(r,t){e.activeTexture(v+f[t]),e.bindTexture(a,r)}))}}function g(e,r){return function(t){if(t.value)switch(e.disableVertexAttribArray(r),t.value.length){case 4:e.vertexAttrib4fv(r,t.value);break;case 3:e.vertexAttrib3fv(r,t.value);break;case 2:e.vertexAttrib2fv(r,t.value);break;case 1:e.vertexAttrib1fv(r,t.value);break;default:throw new Error("the length of a float constant value must be between 1 and 4!")}else e.bindBuffer(b,t.buffer),e.enableVertexAttribArray(r),e.vertexAttribPointer(r,t.numComponents||t.size,t.type||p,t.normalize||!1,t.stride||0,t.offset||0),void 0!==t.divisor&&e.vertexAttribDivisor(r,t.divisor)}}function z(e,r){return function(t){if(t.value){if(e.disableVertexAttribArray(r),4!==t.value.length)throw new Error("The length of an integer constant value must be 4!");e.vertexAttrib4iv(r,t.value)}else e.bindBuffer(b,t.buffer),e.enableVertexAttribArray(r),e.vertexAttribIPointer(r,t.numComponents||t.size,t.type||d,t.stride||0,t.offset||0),void 0!==t.divisor&&e.vertexAttribDivisor(r,t.divisor)}}function U(e,r){return function(t){if(t.value){if(e.disableVertexAttribArray(r),4!==t.value.length)throw new Error("The length of an unsigned integer constant value must be 4!");e.vertexAttrib4uiv(r,t.value)}else e.bindBuffer(b,t.buffer),e.enableVertexAttribArray(r),e.vertexAttribIPointer(r,t.numComponents||t.size,t.type||x,t.stride||0,t.offset||0),void 0!==t.divisor&&e.vertexAttribDivisor(r,t.divisor)}}function C(e,r,t){var n=t.size,o=t.count;return function(t){e.bindBuffer(b,t.buffer);for(var u=t.size||t.numComponents||n,i=u/o,a=t.type||p,f=A[a].size*u,c=t.normalize||!1,l=t.offset||0,s=f/o,y=0;y<o;++y)e.enableVertexAttribArray(r+y),e.vertexAttribPointer(r+y,i,a,c,f,l+s*y),void 0!==t.divisor&&e.vertexAttribDivisor(r+y,t.divisor)}}A[5126]={Type:Float32Array,size:4,setter:function(e,r){return function(t){e.uniform1f(r,t)}},arraySetter:function(e,r){return function(t){e.uniform1fv(r,t)}}},A[35664]={Type:Float32Array,size:8,setter:function(e,r){return function(t){e.uniform2fv(r,t)}}},A[35665]={Type:Float32Array,size:12,setter:function(e,r){return function(t){e.uniform3fv(r,t)}}},A[35666]={Type:Float32Array,size:16,setter:function(e,r){return function(t){e.uniform4fv(r,t)}}},A[d]={Type:Int32Array,size:4,setter:O,arraySetter:_},A[35667]={Type:Int32Array,size:8,setter:S},A[35668]={Type:Int32Array,size:12,setter:M},A[35669]={Type:Int32Array,size:16,setter:R},A[5125]={Type:Uint32Array,size:4,setter:function(e,r){return function(t){e.uniform1ui(r,t)}},arraySetter:function(e,r){return function(t){e.uniform1uiv(r,t)}}},A[36294]={Type:Uint32Array,size:8,setter:function(e,r){return function(t){e.uniform2uiv(r,t)}}},A[36295]={Type:Uint32Array,size:12,setter:function(e,r){return function(t){e.uniform3uiv(r,t)}}},A[36296]={Type:Uint32Array,size:16,setter:function(e,r){return function(t){e.uniform4uiv(r,t)}}},A[35670]={Type:Uint32Array,size:4,setter:O,arraySetter:_},A[35671]={Type:Uint32Array,size:8,setter:S},A[35672]={Type:Uint32Array,size:12,setter:M},A[35673]={Type:Uint32Array,size:16,setter:R},A[35674]={Type:Float32Array,size:16,setter:function(e,r){return function(t){e.uniformMatrix2fv(r,!1,t)}}},A[35675]={Type:Float32Array,size:36,setter:function(e,r){return function(t){e.uniformMatrix3fv(r,!1,t)}}},A[35676]={Type:Float32Array,size:64,setter:function(e,r){return function(t){e.uniformMatrix4fv(r,!1,t)}}},A[35685]={Type:Float32Array,size:24,setter:function(e,r){return function(t){e.uniformMatrix2x3fv(r,!1,t)}}},A[35686]={Type:Float32Array,size:32,setter:function(e,r){return function(t){e.uniformMatrix2x4fv(r,!1,t)}}},A[35687]={Type:Float32Array,size:24,setter:function(e,r){return function(t){e.uniformMatrix3x2fv(r,!1,t)}}},A[35688]={Type:Float32Array,size:48,setter:function(e,r){return function(t){e.uniformMatrix3x4fv(r,!1,t)}}},A[35689]={Type:Float32Array,size:32,setter:function(e,r){return function(t){e.uniformMatrix4x2fv(r,!1,t)}}},A[35690]={Type:Float32Array,size:48,setter:function(e,r){return function(t){e.uniformMatrix4x3fv(r,!1,t)}}},A[35678]={Type:null,size:0,setter:P,arraySetter:T,bindPoint:w},A[35680]={Type:null,size:0,setter:P,arraySetter:T,bindPoint:h},A[35679]={Type:null,size:0,setter:P,arraySetter:T,bindPoint:F},A[35682]={Type:null,size:0,setter:P,arraySetter:T,bindPoint:w},A[36289]={Type:null,size:0,setter:P,arraySetter:T,bindPoint:E},A[36292]={Type:null,size:0,setter:P,arraySetter:T,bindPoint:E},A[36293]={Type:null,size:0,setter:P,arraySetter:T,bindPoint:h},A[36298]={Type:null,size:0,setter:P,arraySetter:T,bindPoint:w},A[36299]={Type:null,size:0,setter:P,arraySetter:T,bindPoint:F},A[36300]={Type:null,size:0,setter:P,arraySetter:T,bindPoint:h},A[36303]={Type:null,size:0,setter:P,arraySetter:T,bindPoint:E},A[36306]={Type:null,size:0,setter:P,arraySetter:T,bindPoint:w},A[36307]={Type:null,size:0,setter:P,arraySetter:T,bindPoint:F},A[36308]={Type:null,size:0,setter:P,arraySetter:T,bindPoint:h},A[36311]={Type:null,size:0,setter:P,arraySetter:T,bindPoint:E};var k={};k[5126]={size:4,setter:g},k[35664]={size:8,setter:g},k[35665]={size:12,setter:g},k[35666]={size:16,setter:g},k[d]={size:4,setter:z},k[35667]={size:8,setter:z},k[35668]={size:12,setter:z},k[35669]={size:16,setter:z},k[5125]={size:4,setter:U},k[36294]={size:8,setter:U},k[36295]={size:12,setter:U},k[36296]={size:16,setter:U},k[35670]={size:4,setter:z},k[35671]={size:8,setter:z},k[35672]={size:12,setter:z},k[35673]={size:16,setter:z},k[35674]={size:4,setter:C,count:2},k[35675]={size:9,setter:C,count:3},k[35676]={size:16,setter:C,count:4};var W=/ERROR:\s*\d+:(\d+)/gi;function I(e){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,n=f(r.matchAll(W)),o=new Map(n.map((function(e,t){var o=parseInt(e[1]),u=n[t+1],i=u?u.index:r.length;return[o-1,r.substring(e.index,i)]})));return e.split("\n").map((function(e,r){var n=o.get(r);return"".concat(r+1+t,": ").concat(e).concat(n?"\n\n^^^ ".concat(n):"")})).join("\n")}var B=/^[ \t]*\n/;function L(e,r,t,n){var u=n||l,i=e.createShader(t),a=0;if(B.test(r)&&(a=1,r=r.replace(B,"")),e.shaderSource(i,r),e.compileShader(i),!e.getShaderParameter(i,35713)){var f=e.getShaderInfoLog(i);return u("".concat(I(r,f,a),"\nError compiling ").concat(o.glEnumToString(e,t),": ").concat(f)),e.deleteShader(i),null}return i}function G(e,r,t){var n,o;if("function"==typeof r&&(t=r,r=void 0),"function"==typeof e)t=e,e=void 0;else if(e&&!Array.isArray(e)){if(e.errorCallback)return e;var u=e;t=u.errorCallback,e=u.attribLocations,n=u.transformFeedbackVaryings,o=u.transformFeedbackMode}var i={errorCallback:t||l,transformFeedbackVaryings:n,transformFeedbackMode:o};if(e){var a={};Array.isArray(e)?e.forEach((function(e,t){a[e]=r?r[t]:t})):a=e,i.attribLocations=a}return i}var X=["VERTEX_SHADER","FRAGMENT_SHADER"];function D(e,r){return r.indexOf("frag")>=0?35632:r.indexOf("vert")>=0?35633:void 0}function N(e,r){r.forEach((function(r){e.deleteShader(r)}))}function H(e,r,t,n,i){for(var a=G(t,n,i),f=[],c=[],l=0;l<r.length;++l){var s=r[l];if("string"==typeof s){var v=y(s),b=v?v.text:s,m=e[X[l]];v&&v.type&&(m=D(0,v.type)||m),s=L(e,b,m,a.errorCallback),c.push(s)}u.isShader(e,s)&&f.push(s)}if(f.length!==r.length)return a.errorCallback("not enough shaders for program"),N(e,c),null;var p=e.createProgram();f.forEach((function(r){e.attachShader(p,r)})),a.attribLocations&&Object.keys(a.attribLocations).forEach((function(r){e.bindAttribLocation(p,a.attribLocations[r],r)}));var d=a.transformFeedbackVaryings;if(d&&(d.attribs&&(d=d.attribs),Array.isArray(d)||(d=Object.keys(d)),e.transformFeedbackVaryings(p,d,a.transformFeedbackMode||35981)),e.linkProgram(p),!e.getProgramParameter(p,35714)){var x=e.getProgramInfoLog(p);return a.errorCallback("".concat(f.map((function(r){var t=I(e.getShaderSource(r),"",0),n=e.getShaderParameter(r,e.SHADER_TYPE);return"".concat(o.glEnumToString(e,n),"\n").concat(t,"}")})).join("\n"),"\nError in program linking: ").concat(x)),e.deleteProgram(p),N(e,c),null}return p}function q(e,r,t,n){var o,u=y(r);if(!u)throw new Error("unknown script element: ".concat(r));o=u.text;var i=t||D(0,u.type);if(!i)throw new Error("unknown shader type");return L(e,o,i,n)}function V(e,r,t,n,o){for(var u=G(t,n,o),i=[],a=0;a<r.length;++a){var f=L(e,r[a],e[X[a]],u.errorCallback);if(!f)return null;i.push(f)}return H(e,i,u)}function Y(e){var r=e.name;return r.startsWith("gl_")||r.startsWith("webgl_")}function $(e,r){var t=0;function n(r,n,o){var u,i=n.name.endsWith("[0]"),a=n.type,f=A[a];if(!f)throw new Error("unknown type: 0x".concat(a.toString(16)));if(f.bindPoint){var c=t;t+=n.size,u=i?f.arraySetter(e,a,c,o,n.size):f.setter(e,a,c,o,n.size)}else u=f.arraySetter&&i?f.arraySetter(e,o):f.setter(e,o);return u.location=o,u}for(var o={},u=e.getProgramParameter(r,35718),i=0;i<u;++i){var a=e.getActiveUniform(r,i);if(!Y(a)){var f=a.name;f.endsWith("[0]")&&(f=f.substr(0,f.length-3));var c=e.getUniformLocation(r,a.name);c&&(o[f]=n(0,a,c))}}return o}function K(e,r){for(var t={},n=e.getProgramParameter(r,35971),o=0;o<n;++o){var u=e.getTransformFeedbackVarying(r,o);t[u.name]={index:o,type:u.type,size:u.size}}return t}function Z(e,r,t){for(var n in r.transformFeedbackInfo&&(r=r.transformFeedbackInfo),t.attribs&&(t=t.attribs),t){var o=r[n];if(o){var u=t[n];u.offset?e.bindBufferRange(35982,o.index,u.buffer,u.offset,u.size):e.bindBufferBase(35982,o.index,u.buffer)}}}function J(e,r){for(var t=e.getProgramParameter(r,35718),n=[],o=[],u=0;u<t;++u){o.push(u),n.push({});var i=e.getActiveUniform(r,u);if(Y(i))break;n[u].name=i.name}[["UNIFORM_TYPE","type"],["UNIFORM_SIZE","size"],["UNIFORM_BLOCK_INDEX","blockNdx"],["UNIFORM_OFFSET","offset"]].forEach((function(t){var u=t[0],i=t[1];e.getActiveUniforms(r,o,e[u]).forEach((function(e,r){n[r][i]=e}))}));for(var a={},f=e.getProgramParameter(r,35382),c=0;c<f;++c){var l=e.getActiveUniformBlockName(r,c),s={index:e.getUniformBlockIndex(r,l),usedByVertexShader:e.getActiveUniformBlockParameter(r,c,35396),usedByFragmentShader:e.getActiveUniformBlockParameter(r,c,35398),size:e.getActiveUniformBlockParameter(r,c,35392),uniformIndices:e.getActiveUniformBlockParameter(r,c,35395)};s.used=s.usedByVertexShader||s.usedByFragmentShader,a[l]=s}return{blockSpecs:a,uniformData:n}}var Q=/\[\d+\]\.$/;function ee(e,r,t,n){var o=t.blockSpecs,u=t.uniformData,i=o[n];if(!i)return s("no uniform block object named:",n),{name:n,uniforms:{}};var a=new ArrayBuffer(i.size),f=e.createBuffer(),c=i.index;e.bindBuffer(m,f),e.uniformBlockBinding(r,i.index,c);var l=n+".";Q.test(l)&&(l=l.replace(Q,"."));var y={},v={};return i.uniformIndices.forEach((function(e){var r,t=u[e],n=A[t.type],o=n.Type,i=((n.size+((r=16)-1))/r|0)*r,f=n.size+(t.size-1)*i,c=t.name;c.startsWith(l)&&(c=c.substr(l.length));var s=c.endsWith("[0]");s&&(c=c.substr(0,c.length-3));var b=new o(a,t.offset,f/o.BYTES_PER_ELEMENT);y[c]=b,v[c]=function(e,r,t,n,o){if(o){var u=t/r.BYTES_PER_ELEMENT,i=n/r.BYTES_PER_ELEMENT;return function(r){for(var t=0,n=0;n<r.length;n+=u){for(var o=0;o<u;++o)e[t+o]=r[n+o];t+=i}}}return function(r){r.length?e.set(r):e[0]=r}}(b,o,n.size,i,s)})),{name:n,array:a,asFloat:new Float32Array(a),buffer:f,uniforms:y,setters:v}}function re(e,r,t){var n=(r.uniformBlockSpec||r).blockSpecs[t.name];if(n){var o=n.index;return e.bindBufferRange(m,o,t.buffer,t.offset||0,t.array.byteLength),!0}return!1}function te(e,r){for(var t=e.uniformSetters||e,n=arguments.length,o=1;o<n;++o){var u=arguments[o];if(Array.isArray(u))for(var i=u.length,a=0;a<i;++a)te(t,u[a]);else for(var f in u){var c=t[f];c&&c(u[f])}}}var ne=te;function oe(e,r){for(var t={},n=e.getProgramParameter(r,35721),o=0;o<n;++o){var u=e.getActiveAttrib(r,o);if(!Y(u)){var i=e.getAttribLocation(r,u.name),a=k[u.type],f=a.setter(e,i,a);f.location=i,t[u.name]=f}}return t}function ue(e,r){for(var t in r){var n=e[t];n&&n(r[t])}}function ie(e,r){var t={program:r,uniformSetters:$(e,r),attribSetters:oe(e,r)};return o.isWebGL2(e)&&(t.uniformBlockSpec=J(e,r),t.transformFeedbackInfo=K(e,r)),t}r.setUniformsAndBindTextures=ne},function(e,r,t){"use strict";function n(e){return(n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}r.__esModule=!0,r.axisRotate=function(e,r,t,n){n=n||new c(16);var o=r[0],u=r[1],i=r[2],a=Math.sqrt(o*o+u*u+i*i),f=(o/=a)*o,l=(u/=a)*u,s=(i/=a)*i,y=Math.cos(t),v=Math.sin(t),b=1-y,m=f+(1-f)*y,p=o*u*b+i*v,d=o*i*b-u*v,x=o*u*b-i*v,w=l+(1-l)*y,h=u*i*b+o*v,F=o*i*b+u*v,E=u*i*b-o*v,A=s+(1-s)*y,j=e[0],O=e[1],_=e[2],S=e[3],M=e[4],R=e[5],P=e[6],T=e[7],g=e[8],z=e[9],U=e[10],C=e[11];n[0]=m*j+p*M+d*g,n[1]=m*O+p*R+d*z,n[2]=m*_+p*P+d*U,n[3]=m*S+p*T+d*C,n[4]=x*j+w*M+h*g,n[5]=x*O+w*R+h*z,n[6]=x*_+w*P+h*U,n[7]=x*S+w*T+h*C,n[8]=F*j+E*M+A*g,n[9]=F*O+E*R+A*z,n[10]=F*_+E*P+A*U,n[11]=F*S+E*T+A*C,e!==n&&(n[12]=e[12],n[13]=e[13],n[14]=e[14],n[15]=e[15]);return n},r.axisRotation=function(e,r,t){t=t||new c(16);var n=e[0],o=e[1],u=e[2],i=Math.sqrt(n*n+o*o+u*u),a=(n/=i)*n,f=(o/=i)*o,l=(u/=i)*u,s=Math.cos(r),y=Math.sin(r),v=1-s;return t[0]=a+(1-a)*s,t[1]=n*o*v+u*y,t[2]=n*u*v-o*y,t[3]=0,t[4]=n*o*v-u*y,t[5]=f+(1-f)*s,t[6]=o*u*v+n*y,t[7]=0,t[8]=n*u*v+o*y,t[9]=o*u*v-n*y,t[10]=l+(1-l)*s,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,t},r.copy=l,r.frustum=function(e,r,t,n,o,u,i){i=i||new c(16);var a=r-e,f=n-t,l=o-u;return i[0]=2*o/a,i[1]=0,i[2]=0,i[3]=0,i[4]=0,i[5]=2*o/f,i[6]=0,i[7]=0,i[8]=(e+r)/a,i[9]=(n+t)/f,i[10]=u/l,i[11]=-1,i[12]=0,i[13]=0,i[14]=o*u/l,i[15]=0,i},r.getAxis=function(e,r,t){t=t||o.create();var n=4*r;return t[0]=e[n+0],t[1]=e[n+1],t[2]=e[n+2],t},r.getTranslation=function(e,r){return(r=r||o.create())[0]=e[12],r[1]=e[13],r[2]=e[14],r},r.identity=s,r.inverse=y,r.lookAt=function(e,r,t,n){return n=n||new c(16),i=i||o.create(),a=a||o.create(),f=f||o.create(),o.normalize(o.subtract(e,r,f),f),o.normalize(o.cross(t,f,i),i),o.normalize(o.cross(f,i,a),a),n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=0,n[4]=a[0],n[5]=a[1],n[6]=a[2],n[7]=0,n[8]=f[0],n[9]=f[1],n[10]=f[2],n[11]=0,n[12]=e[0],n[13]=e[1],n[14]=e[2],n[15]=1,n},r.multiply=function(e,r,t){t=t||new c(16);var n=e[0],o=e[1],u=e[2],i=e[3],a=e[4],f=e[5],l=e[6],s=e[7],y=e[8],v=e[9],b=e[10],m=e[11],p=e[12],d=e[13],x=e[14],w=e[15],h=r[0],F=r[1],E=r[2],A=r[3],j=r[4],O=r[5],_=r[6],S=r[7],M=r[8],R=r[9],P=r[10],T=r[11],g=r[12],z=r[13],U=r[14],C=r[15];return t[0]=n*h+a*F+y*E+p*A,t[1]=o*h+f*F+v*E+d*A,t[2]=u*h+l*F+b*E+x*A,t[3]=i*h+s*F+m*E+w*A,t[4]=n*j+a*O+y*_+p*S,t[5]=o*j+f*O+v*_+d*S,t[6]=u*j+l*O+b*_+x*S,t[7]=i*j+s*O+m*_+w*S,t[8]=n*M+a*R+y*P+p*T,t[9]=o*M+f*R+v*P+d*T,t[10]=u*M+l*R+b*P+x*T,t[11]=i*M+s*R+m*P+w*T,t[12]=n*g+a*z+y*U+p*C,t[13]=o*g+f*z+v*U+d*C,t[14]=u*g+l*z+b*U+x*C,t[15]=i*g+s*z+m*U+w*C,t},r.negate=function(e,r){return(r=r||new c(16))[0]=-e[0],r[1]=-e[1],r[2]=-e[2],r[3]=-e[3],r[4]=-e[4],r[5]=-e[5],r[6]=-e[6],r[7]=-e[7],r[8]=-e[8],r[9]=-e[9],r[10]=-e[10],r[11]=-e[11],r[12]=-e[12],r[13]=-e[13],r[14]=-e[14],r[15]=-e[15],r},r.ortho=function(e,r,t,n,o,u,i){return(i=i||new c(16))[0]=2/(r-e),i[1]=0,i[2]=0,i[3]=0,i[4]=0,i[5]=2/(n-t),i[6]=0,i[7]=0,i[8]=0,i[9]=0,i[10]=2/(o-u),i[11]=0,i[12]=(r+e)/(e-r),i[13]=(n+t)/(t-n),i[14]=(u+o)/(o-u),i[15]=1,i},r.perspective=function(e,r,t,n,o){o=o||new c(16);var u=Math.tan(.5*Math.PI-.5*e),i=1/(t-n);return o[0]=u/r,o[1]=0,o[2]=0,o[3]=0,o[4]=0,o[5]=u,o[6]=0,o[7]=0,o[8]=0,o[9]=0,o[10]=(t+n)*i,o[11]=-1,o[12]=0,o[13]=0,o[14]=t*n*i*2,o[15]=0,o},r.rotateX=function(e,r,t){t=t||new c(16);var n=e[4],o=e[5],u=e[6],i=e[7],a=e[8],f=e[9],l=e[10],s=e[11],y=Math.cos(r),v=Math.sin(r);t[4]=y*n+v*a,t[5]=y*o+v*f,t[6]=y*u+v*l,t[7]=y*i+v*s,t[8]=y*a-v*n,t[9]=y*f-v*o,t[10]=y*l-v*u,t[11]=y*s-v*i,e!==t&&(t[0]=e[0],t[1]=e[1],t[2]=e[2],t[3]=e[3],t[12]=e[12],t[13]=e[13],t[14]=e[14],t[15]=e[15]);return t},r.rotateY=function(e,r,t){t=t||new c(16);var n=e[0],o=e[1],u=e[2],i=e[3],a=e[8],f=e[9],l=e[10],s=e[11],y=Math.cos(r),v=Math.sin(r);t[0]=y*n-v*a,t[1]=y*o-v*f,t[2]=y*u-v*l,t[3]=y*i-v*s,t[8]=y*a+v*n,t[9]=y*f+v*o,t[10]=y*l+v*u,t[11]=y*s+v*i,e!==t&&(t[4]=e[4],t[5]=e[5],t[6]=e[6],t[7]=e[7],t[12]=e[12],t[13]=e[13],t[14]=e[14],t[15]=e[15]);return t},r.rotateZ=function(e,r,t){t=t||new c(16);var n=e[0],o=e[1],u=e[2],i=e[3],a=e[4],f=e[5],l=e[6],s=e[7],y=Math.cos(r),v=Math.sin(r);t[0]=y*n+v*a,t[1]=y*o+v*f,t[2]=y*u+v*l,t[3]=y*i+v*s,t[4]=y*a-v*n,t[5]=y*f-v*o,t[6]=y*l-v*u,t[7]=y*s-v*i,e!==t&&(t[8]=e[8],t[9]=e[9],t[10]=e[10],t[11]=e[11],t[12]=e[12],t[13]=e[13],t[14]=e[14],t[15]=e[15]);return t},r.rotationX=function(e,r){r=r||new c(16);var t=Math.cos(e),n=Math.sin(e);return r[0]=1,r[1]=0,r[2]=0,r[3]=0,r[4]=0,r[5]=t,r[6]=n,r[7]=0,r[8]=0,r[9]=-n,r[10]=t,r[11]=0,r[12]=0,r[13]=0,r[14]=0,r[15]=1,r},r.rotationY=function(e,r){r=r||new c(16);var t=Math.cos(e),n=Math.sin(e);return r[0]=t,r[1]=0,r[2]=-n,r[3]=0,r[4]=0,r[5]=1,r[6]=0,r[7]=0,r[8]=n,r[9]=0,r[10]=t,r[11]=0,r[12]=0,r[13]=0,r[14]=0,r[15]=1,r},r.rotationZ=function(e,r){r=r||new c(16);var t=Math.cos(e),n=Math.sin(e);return r[0]=t,r[1]=n,r[2]=0,r[3]=0,r[4]=-n,r[5]=t,r[6]=0,r[7]=0,r[8]=0,r[9]=0,r[10]=1,r[11]=0,r[12]=0,r[13]=0,r[14]=0,r[15]=1,r},r.scale=function(e,r,t){t=t||new c(16);var n=r[0],o=r[1],u=r[2];t[0]=n*e[0],t[1]=n*e[1],t[2]=n*e[2],t[3]=n*e[3],t[4]=o*e[4],t[5]=o*e[5],t[6]=o*e[6],t[7]=o*e[7],t[8]=u*e[8],t[9]=u*e[9],t[10]=u*e[10],t[11]=u*e[11],e!==t&&(t[12]=e[12],t[13]=e[13],t[14]=e[14],t[15]=e[15]);return t},r.scaling=function(e,r){return(r=r||new c(16))[0]=e[0],r[1]=0,r[2]=0,r[3]=0,r[4]=0,r[5]=e[1],r[6]=0,r[7]=0,r[8]=0,r[9]=0,r[10]=e[2],r[11]=0,r[12]=0,r[13]=0,r[14]=0,r[15]=1,r},r.setAxis=function(e,r,t,n){n!==e&&(n=l(e,n));var o=4*t;return n[o+0]=r[0],n[o+1]=r[1],n[o+2]=r[2],n},r.setDefaultType=function(e){var r=c;return c=e,r},r.setTranslation=function(e,r,t){t=t||s(),e!==t&&(t[0]=e[0],t[1]=e[1],t[2]=e[2],t[3]=e[3],t[4]=e[4],t[5]=e[5],t[6]=e[6],t[7]=e[7],t[8]=e[8],t[9]=e[9],t[10]=e[10],t[11]=e[11]);return t[12]=r[0],t[13]=r[1],t[14]=r[2],t[15]=1,t},r.transformDirection=function(e,r,t){t=t||o.create();var n=r[0],u=r[1],i=r[2];return t[0]=n*e[0]+u*e[4]+i*e[8],t[1]=n*e[1]+u*e[5]+i*e[9],t[2]=n*e[2]+u*e[6]+i*e[10],t},r.transformNormal=function(e,r,t){t=t||o.create();var n=y(e),u=r[0],i=r[1],a=r[2];return t[0]=u*n[0]+i*n[1]+a*n[2],t[1]=u*n[4]+i*n[5]+a*n[6],t[2]=u*n[8]+i*n[9]+a*n[10],t},r.transformPoint=function(e,r,t){t=t||o.create();var n=r[0],u=r[1],i=r[2],a=n*e[3]+u*e[7]+i*e[11]+e[15];return t[0]=(n*e[0]+u*e[4]+i*e[8]+e[12])/a,t[1]=(n*e[1]+u*e[5]+i*e[9]+e[13])/a,t[2]=(n*e[2]+u*e[6]+i*e[10]+e[14])/a,t},r.translate=function(e,r,t){t=t||new c(16);var n=r[0],o=r[1],u=r[2],i=e[0],a=e[1],f=e[2],l=e[3],s=e[4],y=e[5],v=e[6],b=e[7],m=e[8],p=e[9],d=e[10],x=e[11],w=e[12],h=e[13],F=e[14],E=e[15];e!==t&&(t[0]=i,t[1]=a,t[2]=f,t[3]=l,t[4]=s,t[5]=y,t[6]=v,t[7]=b,t[8]=m,t[9]=p,t[10]=d,t[11]=x);return t[12]=i*n+s*o+m*u+w,t[13]=a*n+y*o+p*u+h,t[14]=f*n+v*o+d*u+F,t[15]=l*n+b*o+x*u+E,t},r.translation=function(e,r){return(r=r||new c(16))[0]=1,r[1]=0,r[2]=0,r[3]=0,r[4]=0,r[5]=1,r[6]=0,r[7]=0,r[8]=0,r[9]=0,r[10]=1,r[11]=0,r[12]=e[0],r[13]=e[1],r[14]=e[2],r[15]=1,r},r.transpose=function(e,r){if((r=r||new c(16))===e){var t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,r}var n=e[0],o=e[1],u=e[2],i=e[3],a=e[4],f=e[5],l=e[6],s=e[7],y=e[8],v=e[9],b=e[10],m=e[11],p=e[12],d=e[13],x=e[14],w=e[15];return r[0]=n,r[1]=a,r[2]=y,r[3]=p,r[4]=o,r[5]=f,r[6]=v,r[7]=d,r[8]=u,r[9]=l,r[10]=b,r[11]=x,r[12]=i,r[13]=s,r[14]=m,r[15]=w,r};var o=function(e){if(e&&e.__esModule)return e;if(null===e||"object"!==n(e)&&"function"!=typeof e)return{default:e};var r=u();if(r&&r.has(e))return r.get(e);var t={},o=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var i in e)if(Object.prototype.hasOwnProperty.call(e,i)){var a=o?Object.getOwnPropertyDescriptor(e,i):null;a&&(a.get||a.set)?Object.defineProperty(t,i,a):t[i]=e[i]}t.default=e,r&&r.set(e,t);return t}(t(2));function u(){if("function"!=typeof WeakMap)return null;var e=new WeakMap;return u=function(){return e},e}var i,a,f,c=Float32Array;function l(e,r){return(r=r||new c(16))[0]=e[0],r[1]=e[1],r[2]=e[2],r[3]=e[3],r[4]=e[4],r[5]=e[5],r[6]=e[6],r[7]=e[7],r[8]=e[8],r[9]=e[9],r[10]=e[10],r[11]=e[11],r[12]=e[12],r[13]=e[13],r[14]=e[14],r[15]=e[15],r}function s(e){return(e=e||new c(16))[0]=1,e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[5]=1,e[6]=0,e[7]=0,e[8]=0,e[9]=0,e[10]=1,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,e}function y(e,r){r=r||new c(16);var t=e[0],n=e[1],o=e[2],u=e[3],i=e[4],a=e[5],f=e[6],l=e[7],s=e[8],y=e[9],v=e[10],b=e[11],m=e[12],p=e[13],d=e[14],x=e[15],w=v*x,h=d*b,F=f*x,E=d*l,A=f*b,j=v*l,O=o*x,_=d*u,S=o*b,M=v*u,R=o*l,P=f*u,T=s*p,g=m*y,z=i*p,U=m*a,C=i*y,k=s*a,W=t*p,I=m*n,B=t*y,L=s*n,G=t*a,X=i*n,D=w*a+E*y+A*p-(h*a+F*y+j*p),N=h*n+O*y+M*p-(w*n+_*y+S*p),H=F*n+_*a+R*p-(E*n+O*a+P*p),q=j*n+S*a+P*y-(A*n+M*a+R*y),V=1/(t*D+i*N+s*H+m*q);return r[0]=V*D,r[1]=V*N,r[2]=V*H,r[3]=V*q,r[4]=V*(h*i+F*s+j*m-(w*i+E*s+A*m)),r[5]=V*(w*t+_*s+S*m-(h*t+O*s+M*m)),r[6]=V*(E*t+O*i+P*m-(F*t+_*i+R*m)),r[7]=V*(A*t+M*i+R*s-(j*t+S*i+P*s)),r[8]=V*(T*l+U*b+C*x-(g*l+z*b+k*x)),r[9]=V*(g*u+W*b+L*x-(T*u+I*b+B*x)),r[10]=V*(z*u+I*l+G*x-(U*u+W*l+X*x)),r[11]=V*(k*u+B*l+X*b-(C*u+L*l+G*b)),r[12]=V*(z*v+k*d+g*f-(C*d+T*f+U*v)),r[13]=V*(B*d+T*o+I*v-(W*v+L*d+g*o)),r[14]=V*(W*f+X*d+U*o-(G*d+z*o+I*f)),r[15]=V*(G*v+C*o+L*f-(B*f+X*v+k*o)),r}},function(e,r,t){"use strict";function n(e){return(n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}r.__esModule=!0,r.createAttribsFromArrays=w,r.createBuffersFromArrays=function(e,r){var t={};Object.keys(r).forEach((function(n){t[n]=F(e,r[n],n)})),r.indices?(t.numElements=r.indices.length,t.elementType=o.getGLTypeForTypedArray(x(r.indices),"indices")):t.numElements=function(e){var r,t;for(t=0;t<h.length&&!((r=h[t])in e);++t);t===h.length&&(r=Object.keys(e)[0]);var n=e[r],o=v(n).length,u=d(n,r),i=o/u;if(o%u>0)throw new Error("numComponents ".concat(u," not correct for length ").concat(o));return i}(r);return t},r.createBufferFromArray=F,r.createBufferFromTypedArray=s,r.createBufferInfoFromArrays=function(e,r,t){var n=w(e,r),u=Object.assign({},t||{});u.attribs=Object.assign({},t?t.attribs:{},n);var i=r.indices;if(i){var a=x(i,"indices");u.indices=s(e,a,34963),u.numElements=a.length,u.elementType=o.getGLTypeForTypedArray(a)}else u.numElements||(u.numElements=function(e,r){var t,n;for(n=0;n<h.length&&!((t=h[n])in r)&&!((t=c.attribPrefix+t)in r);++n);n===h.length&&(t=Object.keys(r)[0]);var o=r[t];e.bindBuffer(f,o.buffer);var u=e.getBufferParameter(f,34660);e.bindBuffer(f,null);var i=(y=o.type,5120===y||5121===y?1:5122===y||5123===y?2:5124===y||5125===y||5126===y?4:0),a=u/i,l=o.numComponents||o.size,s=a/l;var y;if(s%1!=0)throw new Error("numComponents ".concat(l," not correct for length ").concat(length));return s}(e,u.attribs));return u},r.setAttribInfoBufferFromArray=function(e,r,t,n){t=x(t),void 0!==n?(e.bindBuffer(f,r.buffer),e.bufferSubData(f,n,t)):l(e,f,r.buffer,t,r.drawType)},r.setAttributePrefix=function(e){c.attribPrefix=e},r.setAttributeDefaults_=function(e){u.copyExistingProperties(e,c)},r.getNumComponents_=d,r.getArray_=v;var o=a(t(1)),u=a(t(0));function i(){if("function"!=typeof WeakMap)return null;var e=new WeakMap;return i=function(){return e},e}function a(e){if(e&&e.__esModule)return e;if(null===e||"object"!==n(e)&&"function"!=typeof e)return{default:e};var r=i();if(r&&r.has(e))return r.get(e);var t={},o=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var u in e)if(Object.prototype.hasOwnProperty.call(e,u)){var a=o?Object.getOwnPropertyDescriptor(e,u):null;a&&(a.get||a.set)?Object.defineProperty(t,u,a):t[u]=e[u]}return t.default=e,r&&r.set(e,t),t}var f=34962,c={attribPrefix:""};function l(e,r,t,n,o){e.bindBuffer(r,t),e.bufferData(r,n,o||35044)}function s(e,r,t,n){if(u.isBuffer(e,r))return r;t=t||f;var o=e.createBuffer();return l(e,t,o,r,n),o}function y(e){return"indices"===e}function v(e){return e.length?e:e.data}var b=/coord|texture/i,m=/color|colour/i;function p(e,r){var t;if(r%(t=b.test(e)?2:m.test(e)?4:3)>0)throw new Error("Can not guess numComponents for attribute '".concat(e,"'. Tried ").concat(t," but ").concat(r," values is not evenly divisible by ").concat(t,". You should specify it."));return t}function d(e,r){return e.numComponents||e.size||p(r,v(e).length)}function x(e,r){if(o.isArrayBuffer(e))return e;if(o.isArrayBuffer(e.data))return e.data;Array.isArray(e)&&(e={data:e});var t=e.type;return t||(t=y(r)?Uint16Array:Float32Array),new t(e.data)}function w(e,r){var t={};return Object.keys(r).forEach((function(n){if(!y(n)){var u=r[n],i=u.attrib||u.name||u.attribName||c.attribPrefix+n;if(u.value){if(!Array.isArray(u.value)&&!o.isArrayBuffer(u.value))throw new Error("array.value is not array or typedarray");t[i]={value:u.value}}else{var a,l,v,b;if(u.buffer&&u.buffer instanceof WebGLBuffer)a=u.buffer,b=u.numComponents||u.size,l=u.type,v=u.normalize;else if("number"==typeof u||"number"==typeof u.data){var m=u.data||u,w=u.type||Float32Array,h=m*w.BYTES_PER_ELEMENT;l=o.getGLTypeForTypedArrayType(w),v=void 0!==u.normalize?u.normalize:(E=w)===Int8Array||E===Uint8Array,b=u.numComponents||u.size||p(n,m),a=e.createBuffer(),e.bindBuffer(f,a),e.bufferData(f,h,u.drawType||35044)}else{var F=x(u,n);a=s(e,F,void 0,u.drawType),l=o.getGLTypeForTypedArray(F),v=void 0!==u.normalize?u.normalize:function(e){return e instanceof Int8Array||e instanceof Uint8Array}(F),b=d(u,n)}t[i]={buffer:a,numComponents:b,type:l,normalize:v,stride:u.stride||0,offset:u.offset||0,divisor:void 0===u.divisor?void 0:u.divisor,drawType:u.drawType}}}var E})),e.bindBuffer(f,null),t}var h=["position","positions","a_position"];function F(e,r,t){var n="indices"===t?34963:f;return s(e,x(r,t),n)}},function(e,r,t){"use strict";function n(e){return(n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}r.__esModule=!0,r.setTextureDefaults_=function(e){i.copyExistingProperties(e,s),e.textureColor&&ye(e.textureColor)},r.createSampler=Fe,r.createSamplers=function(e,r){var t={};return Object.keys(r).forEach((function(n){t[n]=Fe(e,r[n])})),t},r.setSamplerParameters=he,r.createTexture=We,r.setEmptyTexture=ke,r.setTextureFromArray=Ce,r.loadTextureFromUrl=ge,r.setTextureFromElement=_e,r.setTextureFilteringForSize=Ee,r.setTextureParameters=we,r.setDefaultTextureColor=ye,r.createTextures=function(e,r,t){t=t||Se;var n=0,o=[],u={},i={};function a(){0===n&&setTimeout((function(){t(o.length?o:void 0,u,i)}),0)}return Object.keys(r).forEach((function(t){var f,c,l=r[t];("string"==typeof(c=l.src)||Array.isArray(c)&&"string"==typeof c[0])&&(f=function(e,r,u){i[t]=u,--n,e&&o.push(e),a()},++n),u[t]=We(e,l,f)})),a(),u},r.resizeTexture=function(e,r,t,n,o,u){n=n||t.width,o=o||t.height,u=u||t.depth;var i=t.target||E;e.bindTexture(i,r);var a,f=t.level||0,c=t.internalFormat||t.format||p,l=ie(c),s=t.format||l.format,v=t.src;a=v&&(y(v)||Array.isArray(v)&&"number"==typeof v[0])?t.type||le(e,v,l.type):t.type||l.type;if(i===A)for(var b=0;b<6;++b)e.texImage2D(_+b,f,c,n,o,0,s,a,null);else i===j||i===O?e.texImage3D(i,f,c,n,o,u,0,s,a,null):e.texImage2D(i,f,c,n,o,0,s,a,null)},r.canGenerateMipmap=fe,r.canFilter=ce,r.getNumComponentsForFormat=function(e){var r=te[e];if(!r)throw"unknown format: "+e;return r.u},r.getBytesPerElementForInternalFormat=ue,r.getFormatAndTypeForInternalFormat=ie;var o=f(t(3)),u=f(t(1)),i=f(t(0));function a(){if("function"!=typeof WeakMap)return null;var e=new WeakMap;return a=function(){return e},e}function f(e){if(e&&e.__esModule)return e;if(null===e||"object"!==n(e)&&"function"!=typeof e)return{default:e};var r=a();if(r&&r.has(e))return r.get(e);var t={},o=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var u in e)if(Object.prototype.hasOwnProperty.call(e,u)){var i=o?Object.getOwnPropertyDescriptor(e,u):null;i&&(i.get||i.set)?Object.defineProperty(t,u,i):t[u]=e[u]}return t.default=e,r&&r.set(e,t),t}var c,l,s={textureColor:new Uint8Array([128,192,255,255]),textureOptions:{},crossOrigin:void 0},y=u.isArrayBuffer,v=function(){return c=c||("undefined"!=typeof document&&document.createElement?document.createElement("canvas").getContext("2d"):null)},b=6406,m=6407,p=6408,d=6409,x=6410,w=6402,h=34041,F=33071,E=3553,A=34067,j=32879,O=35866,_=34069,S=10241,M=10240,R=10242,P=10243,T=3317,g=3314,z=32878,U=3316,C=3315,k=32877,W=37443,I=37441,B=37440,L=5120,G=5121,X=5122,D=5123,N=5124,H=5125,q=5126,V=5131,Y=36193,$=33640,K=33319,Z=33320,J=6403,Q=36244,ee=36248,re=36249,te={},ne=te;function oe(e){if(!l){var r={};r[6406]={v:b,h:!0,F:!0,A:[1,2,2,4],type:[G,V,Y,q]},r[6409]={v:d,h:!0,F:!0,A:[1,2,2,4],type:[G,V,Y,q]},r[6410]={v:x,h:!0,F:!0,A:[2,4,4,8],type:[G,V,Y,q]},r[m]={v:m,h:!0,F:!0,A:[3,6,6,12,2],type:[G,V,Y,q,33635]},r[p]={v:p,h:!0,F:!0,A:[4,8,8,16,2,2],type:[G,V,Y,q,32819,32820]},r[6402]={v:w,h:!0,F:!1,A:[2,4],type:[H,D]},r[33321]={v:J,h:!0,F:!0,A:[1],type:[G]},r[36756]={v:J,h:!1,F:!0,A:[1],type:[L]},r[33325]={v:J,h:!1,F:!0,A:[4,2],type:[q,V]},r[33326]={v:J,h:!1,F:!1,A:[4],type:[q]},r[33330]={v:Q,h:!0,F:!1,A:[1],type:[G]},r[33329]={v:Q,h:!0,F:!1,A:[1],type:[L]},r[33332]={v:Q,h:!0,F:!1,A:[2],type:[D]},r[33331]={v:Q,h:!0,F:!1,A:[2],type:[X]},r[33334]={v:Q,h:!0,F:!1,A:[4],type:[H]},r[33333]={v:Q,h:!0,F:!1,A:[4],type:[N]},r[33323]={v:K,h:!0,F:!0,A:[2],type:[G]},r[36757]={v:K,h:!1,F:!0,A:[2],type:[L]},r[33327]={v:K,h:!1,F:!0,A:[8,4],type:[q,V]},r[33328]={v:K,h:!1,F:!1,A:[8],type:[q]},r[33336]={v:Z,h:!0,F:!1,A:[2],type:[G]},r[33335]={v:Z,h:!0,F:!1,A:[2],type:[L]},r[33338]={v:Z,h:!0,F:!1,A:[4],type:[D]},r[33337]={v:Z,h:!0,F:!1,A:[4],type:[X]},r[33340]={v:Z,h:!0,F:!1,A:[8],type:[H]},r[33339]={v:Z,h:!0,F:!1,A:[8],type:[N]},r[32849]={v:m,h:!0,F:!0,A:[3],type:[G]},r[35905]={v:m,h:!1,F:!0,A:[3],type:[G]},r[36194]={v:m,h:!0,F:!0,A:[3,2],type:[G,33635]},r[36758]={v:m,h:!1,F:!0,A:[3],type:[L]},r[35898]={v:m,h:!1,F:!0,A:[12,6,4],type:[q,V,35899]},r[35901]={v:m,h:!1,F:!0,A:[12,6,4],type:[q,V,35902]},r[34843]={v:m,h:!1,F:!0,A:[12,6],type:[q,V]},r[34837]={v:m,h:!1,F:!1,A:[12],type:[q]},r[36221]={v:ee,h:!1,F:!1,A:[3],type:[G]},r[36239]={v:ee,h:!1,F:!1,A:[3],type:[L]},r[36215]={v:ee,h:!1,F:!1,A:[6],type:[D]},r[36233]={v:ee,h:!1,F:!1,A:[6],type:[X]},r[36209]={v:ee,h:!1,F:!1,A:[12],type:[H]},r[36227]={v:ee,h:!1,F:!1,A:[12],type:[N]},r[32856]={v:p,h:!0,F:!0,A:[4],type:[G]},r[35907]={v:p,h:!0,F:!0,A:[4],type:[G]},r[36759]={v:p,h:!1,F:!0,A:[4],type:[L]},r[32855]={v:p,h:!0,F:!0,A:[4,2,4],type:[G,32820,$]},r[32854]={v:p,h:!0,F:!0,A:[4,2],type:[G,32819]},r[32857]={v:p,h:!0,F:!0,A:[4],type:[$]},r[34842]={v:p,h:!1,F:!0,A:[16,8],type:[q,V]},r[34836]={v:p,h:!1,F:!1,A:[16],type:[q]},r[36220]={v:re,h:!0,F:!1,A:[4],type:[G]},r[36238]={v:re,h:!0,F:!1,A:[4],type:[L]},r[36975]={v:re,h:!0,F:!1,A:[4],type:[$]},r[36214]={v:re,h:!0,F:!1,A:[8],type:[D]},r[36232]={v:re,h:!0,F:!1,A:[8],type:[X]},r[36226]={v:re,h:!0,F:!1,A:[16],type:[N]},r[36208]={v:re,h:!0,F:!1,A:[16],type:[H]},r[33189]={v:w,h:!0,F:!1,A:[2,4],type:[D,H]},r[33190]={v:w,h:!0,F:!1,A:[4],type:[H]},r[36012]={v:w,h:!0,F:!1,A:[4],type:[q]},r[35056]={v:h,h:!0,F:!1,A:[4],type:[34042]},r[36013]={v:h,h:!0,F:!1,A:[4],type:[36269]},Object.keys(r).forEach((function(e){var t=r[e];t.bytesPerElementMap={},t.A.forEach((function(e,r){var n=t.type[r];t.bytesPerElementMap[n]=e}))})),l=r}return l[e]}function ue(e,r){var t=oe(e);if(!t)throw"unknown internal format";var n=t.bytesPerElementMap[r];if(void 0===n)throw"unknown internal format";return n}function ie(e){var r=oe(e);if(!r)throw"unknown internal format";return{format:r.v,type:r.type[0]}}function ae(e){return 0==(e&e-1)}function fe(e,r,t,n){if(!o.isWebGL2(e))return ae(r)&&ae(t);var u=oe(n);if(!u)throw"unknown internal format";return u.h&&u.F}function ce(e){var r=oe(e);if(!r)throw"unknown internal format";return r.F}function le(e,r,t){return y(r)?u.getGLTypeForTypedArray(r):t||G}function se(e,r,t,n,o){if(o%1!=0)throw"can't guess dimensions";if(t||n){if(n){if(!t&&(t=o/n)%1)throw"can't guess dimensions"}else if((n=o/t)%1)throw"can't guess dimensions"}else{var u=Math.sqrt(o/(r===A?6:1));u%1==0?(t=u,n=u):(t=o,n=1)}return{width:t,height:n}}function ye(e){s.textureColor=new Uint8Array([255*e[0],255*e[1],255*e[2],255*e[3]])}ne[6406]={u:1},ne[6409]={u:1},ne[6410]={u:2},ne[m]={u:3},ne[p]={u:4},ne[J]={u:1},ne[36244]={u:1},ne[K]={u:2},ne[33320]={u:2},ne[m]={u:3},ne[36248]={u:3},ne[p]={u:4},ne[36249]={u:4},ne[6402]={u:1},ne[34041]={u:2};var ve={};function be(e,r){void 0!==r.colorspaceConversion&&(ve.colorspaceConversion=e.getParameter(W),e.pixelStorei(W,r.colorspaceConversion)),void 0!==r.premultiplyAlpha&&(ve.premultiplyAlpha=e.getParameter(I),e.pixelStorei(I,r.premultiplyAlpha)),void 0!==r.flipY&&(ve.flipY=e.getParameter(B),e.pixelStorei(B,r.flipY))}function me(e,r){void 0!==r.colorspaceConversion&&e.pixelStorei(W,ve.colorspaceConversion),void 0!==r.premultiplyAlpha&&e.pixelStorei(I,ve.premultiplyAlpha),void 0!==r.flipY&&e.pixelStorei(B,ve.flipY)}function pe(e){ve.unpackAlignment=e.getParameter(T),o.isWebGL2(e)&&(ve.unpackRowLength=e.getParameter(g),ve.unpackImageHeight=e.getParameter(z),ve.unpackSkipPixels=e.getParameter(U),ve.unpackSkipRows=e.getParameter(C),ve.unpackSkipImages=e.getParameter(k))}function de(e){e.pixelStorei(T,ve.unpackAlignment),o.isWebGL2(e)&&(e.pixelStorei(g,ve.unpackRowLength),e.pixelStorei(z,ve.unpackImageHeight),e.pixelStorei(U,ve.unpackSkipPixels),e.pixelStorei(C,ve.unpackSkipRows),e.pixelStorei(k,ve.unpackSkipImages))}function xe(e,r,t,n){n.minMag&&(t.call(e,r,S,n.minMag),t.call(e,r,M,n.minMag)),n.min&&t.call(e,r,S,n.min),n.mag&&t.call(e,r,M,n.mag),n.wrap&&(t.call(e,r,R,n.wrap),t.call(e,r,P,n.wrap),(r===j||i.isSampler(e,r))&&t.call(e,r,32882,n.wrap)),n.wrapR&&t.call(e,r,32882,n.wrapR),n.wrapS&&t.call(e,r,R,n.wrapS),n.wrapT&&t.call(e,r,P,n.wrapT),n.minLod&&t.call(e,r,33082,n.minLod),n.maxLod&&t.call(e,r,33083,n.maxLod),n.baseLevel&&t.call(e,r,33084,n.baseLevel),n.maxLevel&&t.call(e,r,33085,n.maxLevel)}function we(e,r,t){var n=t.target||E;e.bindTexture(n,r),xe(e,n,e.texParameteri,t)}function he(e,r,t){xe(e,r,e.samplerParameteri,t)}function Fe(e,r){var t=e.createSampler();return he(e,t,r),t}function Ee(e,r,t,n,o,u){t=t||s.textureOptions,u=u||p;var i=t.target||E;if(n=n||t.width,o=o||t.height,e.bindTexture(i,r),fe(e,n,o,u))e.generateMipmap(i);else{var a=ce(u)?9729:9728;e.texParameteri(i,S,a),e.texParameteri(i,M,a),e.texParameteri(i,R,F),e.texParameteri(i,P,F)}}function Ae(e){return!0===e.auto||void 0===e.auto&&void 0===e.level}function je(e,r){return(r=r||{}).cubeFaceOrder||[_,34070,34071,34072,34073,34074]}function Oe(e,r){var t=je(0,r).map((function(e,r){return{face:e,ndx:r}}));return t.sort((function(e,r){return e.face-r.face})),t}function _e(e,r,t,n){var o=(n=n||s.textureOptions).target||E,u=n.level||0,i=t.width,a=t.height,f=n.internalFormat||n.format||p,c=ie(f),l=n.format||c.format,y=n.type||c.type;if(be(e,n),e.bindTexture(o,r),o===A){var b,m,d=t.width,x=t.height;if(d/6===x)b=x,m=[0,0,1,0,2,0,3,0,4,0,5,0];else if(x/6===d)b=d,m=[0,0,0,1,0,2,0,3,0,4,0,5];else if(d/3==x/2)b=d/3,m=[0,0,1,0,2,0,0,1,1,1,2,1];else{if(d/2!=x/3)throw"can't figure out cube map from element: "+(t.src?t.src:t.nodeName);b=d/2,m=[0,0,1,0,0,1,1,1,0,2,1,2]}var w=v();w?(w.canvas.width=b,w.canvas.height=b,i=b,a=b,Oe(0,n).forEach((function(r){var n=m[2*r.ndx+0]*b,o=m[2*r.ndx+1]*b;w.drawImage(t,n,o,b,b,0,0,b,b),e.texImage2D(r.face,u,f,l,y,w.canvas)})),w.canvas.width=1,w.canvas.height=1):"undefined"!=typeof createImageBitmap&&(i=b,a=b,Oe(0,n).forEach((function(c){var s=m[2*c.ndx+0]*b,v=m[2*c.ndx+1]*b;e.texImage2D(c.face,u,f,b,b,0,l,y,null),createImageBitmap(t,s,v,b,b,{premultiplyAlpha:"none",colorSpaceConversion:"none"}).then((function(t){be(e,n),e.bindTexture(o,r),e.texImage2D(c.face,u,f,l,y,t),me(e,n),Ae(n)&&Ee(e,r,n,i,a,f)}))})))}else if(o===j||o===O){var h=Math.min(t.width,t.height),F=Math.max(t.width,t.height),_=F/h;if(_%1!=0)throw"can not compute 3D dimensions of element";var S=t.width===F?1:0,M=t.height===F?1:0;pe(e),e.pixelStorei(T,1),e.pixelStorei(g,t.width),e.pixelStorei(z,0),e.pixelStorei(k,0),e.texImage3D(o,u,f,h,h,h,0,l,y,null);for(var R=0;R<_;++R){var P=R*h*S,W=R*h*M;e.pixelStorei(U,P),e.pixelStorei(C,W),e.texSubImage3D(o,u,0,0,R,h,h,1,l,y,t)}de(e)}else e.texImage2D(o,u,f,l,y,t);me(e,n),Ae(n)&&Ee(e,r,n,i,a,f),we(e,r,n)}function Se(){}function Me(e,r){return void 0!==r||function(e){if("undefined"!=typeof document){var r=document.createElement("a");return r.href=e,r.hostname===location.hostname&&r.port===location.port&&r.protocol===location.protocol}var t=new URL(location.href).origin;return new URL(e,location.href).origin===t}(e)?r:"anonymous"}function Re(e){return"undefined"!=typeof ImageBitmap&&e instanceof ImageBitmap||"undefined"!=typeof ImageData&&e instanceof ImageData||"undefined"!=typeof HTMLElement&&e instanceof HTMLElement}function Pe(e,r,t){return Re(e)?(setTimeout((function(){t(null,e)})),e):function(e,r,t){var n;if(t=t||Se,r=void 0!==r?r:s.crossOrigin,r=Me(e,r),"undefined"!=typeof Image){n=new Image,void 0!==r&&(n.crossOrigin=r);var o=function(){n.removeEventListener("error",u),n.removeEventListener("load",a),n=null},u=function(){var r="couldn't load image: "+e;i.error(r),t(r,n),o()},a=function(){t(null,n),o()};return n.addEventListener("error",u),n.addEventListener("load",a),n.src=e,n}if("undefined"!=typeof ImageBitmap){var f,c,l=function(){t(f,c)},y={};r&&(y.mode="cors"),fetch(e,y).then((function(e){if(!e.ok)throw e;return e.blob()})).then((function(e){return createImageBitmap(e,{premultiplyAlpha:"none",colorSpaceConversion:"none"})})).then((function(e){c=e,setTimeout(l)})).catch((function(e){f=e,setTimeout(l)})),n=null}return n}(e,r,t)}function Te(e,r,t){var n=(t=t||s.textureOptions).target||E;if(e.bindTexture(n,r),!1!==t.color){var o=function(e){return e=e||s.textureColor,y(e)?e:new Uint8Array([255*e[0],255*e[1],255*e[2],255*e[3]])}(t.color);if(n===A)for(var u=0;u<6;++u)e.texImage2D(_+u,0,p,1,1,0,p,G,o);else n===j||n===O?e.texImage3D(n,0,p,1,1,1,0,p,G,o):e.texImage2D(n,0,p,1,1,0,p,G,o)}}function ge(e,r,t,n){return n=n||Se,t=t||s.textureOptions,Te(e,r,t),Pe((t=Object.assign({},t)).src,t.crossOrigin,(function(o,u){o?n(o,r,u):(_e(e,r,u,t),n(null,r,u))}))}function ze(e,r,t,n){n=n||Se;var o=t.src;if(6!==o.length)throw"there must be 6 urls for a cubemap";var u=t.level||0,i=t.internalFormat||t.format||p,a=ie(i),f=t.format||a.format,c=t.type||G,l=t.target||E;if(l!==A)throw"target must be TEXTURE_CUBE_MAP";Te(e,r,t),t=Object.assign({},t);var s,y=6,v=[],b=je(0,t);s=o.map((function(o,a){return Pe(o,t.crossOrigin,(m=b[a],function(o,a){--y,o?v.push(o):a.width!==a.height?v.push("cubemap face img is not a square: "+a.src):(be(e,t),e.bindTexture(l,r),5===y?je().forEach((function(r){e.texImage2D(r,u,i,f,c,a)})):e.texImage2D(m,u,i,f,c,a),me(e,t),Ae(t)&&e.generateMipmap(l)),0===y&&n(v.length?v:void 0,r,s)}));var m}))}function Ue(e,r,t,n){n=n||Se;var o=t.src,u=t.internalFormat||t.format||p,i=ie(u),a=t.format||i.format,f=t.type||G,c=t.target||O;if(c!==j&&c!==O)throw"target must be TEXTURE_3D or TEXTURE_2D_ARRAY";Te(e,r,t),t=Object.assign({},t);var l,s=o.length,y=[],b=t.level||0,m=t.width,d=t.height,x=o.length,w=!0;l=o.map((function(o,i){return Pe(o,t.crossOrigin,(p=i,function(o,i){if(--s,o)y.push(o);else{if(be(e,t),e.bindTexture(c,r),w){w=!1,m=t.width||i.width,d=t.height||i.height,e.texImage3D(c,b,u,m,d,x,0,a,f,null);for(var h=0;h<x;++h)e.texSubImage3D(c,b,0,0,h,m,d,1,a,f,i)}else{var F,E=i;i.width===m&&i.height===d||(E=(F=v()).canvas,F.canvas.width=m,F.canvas.height=d,F.drawImage(i,0,0,m,d)),e.texSubImage3D(c,b,0,0,p,m,d,1,a,f,E),F&&E===F.canvas&&(F.canvas.width=0,F.canvas.height=0)}me(e,t),Ae(t)&&e.generateMipmap(c)}0===s&&n(y.length?y:void 0,r,l)}));var p}))}function Ce(e,r,t,n){var i=(n=n||s.textureOptions).target||E;e.bindTexture(i,r);var a=n.width,f=n.height,c=n.depth,l=n.level||0,v=n.internalFormat||n.format||p,b=ie(v),m=n.format||b.format,d=n.type||le(0,t,b.type);if(y(t))t instanceof Uint8ClampedArray&&(t=new Uint8Array(t.buffer));else{var x=u.getTypedArrayTypeForGLType(d);t=new x(t)}var w,h=ue(v,d),F=t.byteLength/h;if(F%1)throw"length wrong size for format: "+o.glEnumToString(e,m);if(i===j||i===O)if(a||f||c)!a||f&&c?!f||a&&c?(w=se(0,i,a,f,F/c),a=w.width,f=w.height):(w=se(0,i,a,c,F/f),a=w.width,c=w.height):(w=se(0,i,f,c,F/a),f=w.width,c=w.height);else{var _=Math.cbrt(F);if(_%1!=0)throw"can't guess cube size of array of numElements: "+F;a=_,f=_,c=_}else w=se(0,i,a,f,F),a=w.width,f=w.height;if(pe(e),e.pixelStorei(T,n.unpackAlignment||1),be(e,n),i===A){var S=F/6*(h/t.BYTES_PER_ELEMENT);Oe(0,n).forEach((function(r){var n=S*r.ndx,o=t.subarray(n,n+S);e.texImage2D(r.face,l,v,a,f,0,m,d,o)}))}else i===j||i===O?e.texImage3D(i,l,v,a,f,c,0,m,d,t):e.texImage2D(i,l,v,a,f,0,m,d,t);return me(e,n),de(e),{width:a,height:f,depth:c,type:d}}function ke(e,r,t){var n=t.target||E;e.bindTexture(n,r);var o=t.level||0,u=t.internalFormat||t.format||p,i=ie(u),a=t.format||i.format,f=t.type||i.type;if(be(e,t),n===A)for(var c=0;c<6;++c)e.texImage2D(_+c,o,u,t.width,t.height,0,a,f,null);else n===j||n===O?e.texImage3D(n,o,u,t.width,t.height,t.depth,0,a,f,null):e.texImage2D(n,o,u,t.width,t.height,0,a,f,null);me(e,t)}function We(e,r,t){t=t||Se,r=r||s.textureOptions;var n=e.createTexture(),o=r.target||E,u=r.width||1,i=r.height||1,a=r.internalFormat||p;e.bindTexture(o,n),o===A&&(e.texParameteri(o,R,F),e.texParameteri(o,P,F));var f=r.src;if(f)if("function"==typeof f&&(f=f(e,r)),"string"==typeof f)ge(e,n,r,t);else if(y(f)||Array.isArray(f)&&("number"==typeof f[0]||Array.isArray(f[0])||y(f[0]))){var c=Ce(e,n,f,r);u=c.width,i=c.height}else Array.isArray(f)&&("string"==typeof f[0]||Re(f[0]))?o===A?ze(e,n,r,t):Ue(e,n,r,t):(_e(e,n,f,r),u=f.width,i=f.height);else ke(e,n,r);return Ae(r)&&Ee(e,n,r,u,i,a),we(e,n,r),n}},function(e,r,t){"use strict";function n(e){return(n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}r.__esModule=!0;var o={m4:!0,v3:!0,primitives:!0};r.primitives=r.v3=r.m4=void 0;var u=l(t(5));r.m4=u;var i=l(t(2));r.v3=i;var a=l(t(9));r.primitives=a;var f=t(10);function c(){if("function"!=typeof WeakMap)return null;var e=new WeakMap;return c=function(){return e},e}function l(e){if(e&&e.__esModule)return e;if(null===e||"object"!==n(e)&&"function"!=typeof e)return{default:e};var r=c();if(r&&r.has(e))return r.get(e);var t={},o=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var u in e)if(Object.prototype.hasOwnProperty.call(e,u)){var i=o?Object.getOwnPropertyDescriptor(e,u):null;i&&(i.get||i.set)?Object.defineProperty(t,u,i):t[u]=e[u]}return t.default=e,r&&r.set(e,t),t}Object.keys(f).forEach((function(e){"default"!==e&&"__esModule"!==e&&(Object.prototype.hasOwnProperty.call(o,e)||(r[e]=f[e]))}))},function(e,r,t){"use strict";function n(e){return(n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}r.__esModule=!0,r.create3DFVertices=R,r.createAugmentedTypedArray=b,r.createCubeVertices=_,r.createPlaneVertices=A,r.createSphereVertices=j,r.createTruncatedConeVertices=S,r.createXYQuadVertices=E,r.createCrescentVertices=P,r.createCylinderVertices=T,r.createTorusVertices=g,r.createDiscVertices=z,r.deindexVertices=function(e){var r=e.indices,t={},n=r.length;return Object.keys(e).filter(m).forEach((function(o){for(var u=e[o],i=u.numComponents,a=b(i,n,u.constructor),f=0;f<n;++f)for(var c=r[f]*i,l=0;l<i;++l)a.push(u[c+l]);t[o]=a})),t},r.flattenNormals=function(e){if(e.indices)throw new Error("can not flatten normals of indexed vertices. deindex them first");for(var r=e.normal,t=r.length,n=0;n<t;n+=9){var o=r[n+0],u=r[n+1],i=r[n+2],a=r[n+3],f=r[n+4],c=r[n+5],l=r[n+6],s=r[n+7],y=r[n+8],v=o+a+l,b=u+f+s,m=i+c+y,p=Math.sqrt(v*v+b*b+m*m);v/=p,b/=p,m/=p,r[n+0]=v,r[n+1]=b,r[n+2]=m,r[n+3]=v,r[n+4]=b,r[n+5]=m,r[n+6]=v,r[n+7]=b,r[n+8]=m}return e},r.makeRandomVertexColors=function(e,r){r=r||{};var t=e.position.numElements,n=b(4,t,Uint8Array),o=r.rand||function(e,r){return r<3?(t=256,Math.random()*t|0):255;var t};if(e.color=n,e.indices)for(var u=0;u<t;++u)n.push(o(u,0),o(u,1),o(u,2),o(u,3));else for(var i=r.vertsPerColor||3,a=t/i,f=0;f<a;++f)for(var c=[o(f,0),o(f,1),o(f,2),o(f,3)],l=0;l<i;++l)n.push(c);return e},r.reorientDirections=x,r.reorientNormals=w,r.reorientPositions=h,r.reorientVertices=F,r.concatVertices=function(e){for(var r,t={},n=function(n){var o=e[n];Object.keys(o).forEach((function(e){t[e]||(t[e]=[]),r||"indices"===e||(r=e);var n=o[e],u=y(n,e),i=s(n).length/u;t[e].push(i)}))},o=0;o<e.length;++o)n(o);var u=t[r],i={};return Object.keys(t).forEach((function(r){var t=function(r){for(var t,n=0,o=0;o<e.length;++o){var u=e[o][r];n+=s(u).length,t&&!u.data||(t=u)}return{length:n,spec:t}}(r),n=I(t.spec,t.length);!function(r,t,n){for(var o=0,u=0,i=0;i<e.length;++i){var a=e[i][r],f=s(a);"indices"===r?(W(f,n,u,o),o+=t[i]):W(f,n,u),u+=f.length}}(r,u,s(n)),i[r]=n})),i},r.duplicateVertices=function(e){var r={};return Object.keys(e).forEach((function(t){var n=e[t],o=s(n),u=I(n,o.length);W(o,s(u),0),r[t]=u})),r},r.createDiscBuffers=r.createDiscBufferInfo=r.createTorusBuffers=r.createTorusBufferInfo=r.createCylinderBuffers=r.createCylinderBufferInfo=r.createCrescentBuffers=r.createCrescentBufferInfo=r.createCresentVertices=r.createCresentBuffers=r.createCresentBufferInfo=r.createXYQuadBuffers=r.createXYQuadBufferInfo=r.createTruncatedConeBuffers=r.createTruncatedConeBufferInfo=r.createSphereBuffers=r.createSphereBufferInfo=r.createPlaneBuffers=r.createPlaneBufferInfo=r.createCubeBuffers=r.createCubeBufferInfo=r.create3DFBuffers=r.create3DFBufferInfo=void 0;var o=l(t(6)),u=l(t(0)),i=l(t(1)),a=l(t(5)),f=l(t(2));function c(){if("function"!=typeof WeakMap)return null;var e=new WeakMap;return c=function(){return e},e}function l(e){if(e&&e.__esModule)return e;if(null===e||"object"!==n(e)&&"function"!=typeof e)return{default:e};var r=c();if(r&&r.has(e))return r.get(e);var t={},o=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var u in e)if(Object.prototype.hasOwnProperty.call(e,u)){var i=o?Object.getOwnPropertyDescriptor(e,u):null;i&&(i.get||i.set)?Object.defineProperty(t,u,i):t[u]=e[u]}return t.default=e,r&&r.set(e,t),t}var s=o.getArray_,y=o.getNumComponents_;function v(e,r){var t=0;return e.push=function(){for(var r=0;r<arguments.length;++r){var n=arguments[r];if(n instanceof Array||i.isArrayBuffer(n))for(var o=0;o<n.length;++o)e[t++]=n[o];else e[t++]=n}},e.reset=function(e){t=e||0},e.numComponents=r,Object.defineProperty(e,"numElements",{get:function(){return this.length/this.numComponents|0}}),e}function b(e,r,t){return v(new(t||Float32Array)(e*r),e)}function m(e){return"indices"!==e}function p(e,r,t){for(var n=e.length,o=new Float32Array(3),u=0;u<n;u+=3)t(r,[e[u],e[u+1],e[u+2]],o),e[u]=o[0],e[u+1]=o[1],e[u+2]=o[2]}function d(e,r,t){t=t||f.create();var n=r[0],o=r[1],u=r[2];return t[0]=n*e[0]+o*e[1]+u*e[2],t[1]=n*e[4]+o*e[5]+u*e[6],t[2]=n*e[8]+o*e[9]+u*e[10],t}function x(e,r){return p(e,r,a.transformDirection),e}function w(e,r){return p(e,a.inverse(r),d),e}function h(e,r){return p(e,r,a.transformPoint),e}function F(e,r){return Object.keys(e).forEach((function(t){var n=e[t];t.indexOf("pos")>=0?h(n,r):t.indexOf("tan")>=0||t.indexOf("binorm")>=0?x(n,r):t.indexOf("norm")>=0&&w(n,r)})),e}function E(e,r,t){return e=e||2,{position:{numComponents:2,data:[(r=r||0)+-1*(e*=.5),(t=t||0)+-1*e,r+1*e,t+-1*e,r+-1*e,t+1*e,r+1*e,t+1*e]},normal:[0,0,1,0,0,1,0,0,1,0,0,1],texcoord:[0,0,1,0,0,1,1,1],indices:[0,1,2,2,1,3]}}function A(e,r,t,n,o){e=e||1,r=r||1,t=t||1,n=n||1,o=o||a.identity();for(var u=(t+1)*(n+1),i=b(3,u),f=b(3,u),c=b(2,u),l=0;l<=n;l++)for(var s=0;s<=t;s++){var y=s/t,v=l/n;i.push(e*y-.5*e,0,r*v-.5*r),f.push(0,1,0),c.push(y,v)}for(var m=t+1,p=b(3,t*n*2,Uint16Array),d=0;d<n;d++)for(var x=0;x<t;x++)p.push((d+0)*m+x,(d+1)*m+x,(d+0)*m+x+1),p.push((d+1)*m+x,(d+1)*m+x+1,(d+0)*m+x+1);return F({position:i,normal:f,texcoord:c,indices:p},o)}function j(e,r,t,n,o,u,i){if(r<=0||t<=0)throw new Error("subdivisionAxis and subdivisionHeight must be > 0");n=n||0,u=u||0;for(var a=(o=o||Math.PI)-n,f=(i=i||2*Math.PI)-u,c=(r+1)*(t+1),l=b(3,c),s=b(3,c),y=b(2,c),v=0;v<=t;v++)for(var m=0;m<=r;m++){var p=m/r,d=v/t,x=f*p+u,w=a*d+n,h=Math.sin(x),F=Math.cos(x),E=Math.sin(w),A=F*E,j=Math.cos(w),O=h*E;l.push(e*A,e*j,e*O),s.push(A,j,O),y.push(1-p,d)}for(var _=r+1,S=b(3,r*t*2,Uint16Array),M=0;M<r;M++)for(var R=0;R<t;R++)S.push((R+0)*_+M,(R+0)*_+M+1,(R+1)*_+M),S.push((R+1)*_+M,(R+0)*_+M+1,(R+1)*_+M+1);return{position:l,normal:s,texcoord:y,indices:S}}var O=[[3,7,5,1],[6,2,0,4],[6,7,3,2],[0,1,5,4],[7,6,4,5],[2,3,1,0]];function _(e){for(var r=(e=e||1)/2,t=[[-r,-r,-r],[+r,-r,-r],[-r,+r,-r],[+r,+r,-r],[-r,-r,+r],[+r,-r,+r],[-r,+r,+r],[+r,+r,+r]],n=[[1,0,0],[-1,0,0],[0,1,0],[0,-1,0],[0,0,1],[0,0,-1]],o=[[1,0],[0,0],[0,1],[1,1]],u=b(3,24),i=b(3,24),a=b(2,24),f=b(3,12,Uint16Array),c=0;c<6;++c){for(var l=O[c],s=0;s<4;++s){var y=t[l[s]],v=n[c],m=o[s];u.push(y),i.push(v),a.push(m)}var p=4*c;f.push(p+0,p+1,p+2),f.push(p+0,p+2,p+3)}return{position:u,normal:i,texcoord:a,indices:f}}function S(e,r,t,n,o,u,i){if(n<3)throw new Error("radialSubdivisions must be 3 or greater");if(o<1)throw new Error("verticalSubdivisions must be 1 or greater");for(var a=void 0===u||u,f=void 0===i||i,c=(a?2:0)+(f?2:0),l=(n+1)*(o+1+c),s=b(3,l),y=b(3,l),v=b(2,l),m=b(3,n*(o+c/2)*2,Uint16Array),p=n+1,d=Math.atan2(e-r,t),x=Math.cos(d),w=Math.sin(d),h=o+(f?2:0),F=a?-2:0;F<=h;++F){var E=F/o,A=t*E,j=void 0;F<0?(A=0,E=1,j=e):F>o?(A=t,E=1,j=r):j=e+F/o*(r-e),-2!==F&&F!==o+2||(j=0,E=0),A-=t/2;for(var O=0;O<p;++O){var _=Math.sin(O*Math.PI*2/n),S=Math.cos(O*Math.PI*2/n);s.push(_*j,A,S*j),F<0?y.push(0,-1,0):F>o?y.push(0,1,0):0===j?y.push(0,0,0):y.push(_*x,w,S*x),v.push(O/n,1-E)}}for(var M=0;M<o+c;++M)if(!(1===M&&a||M===o+c-2&&f))for(var R=0;R<n;++R)m.push(p*(M+0)+0+R,p*(M+0)+1+R,p*(M+1)+1+R),m.push(p*(M+0)+0+R,p*(M+1)+1+R,p*(M+1)+0+R);return{position:s,normal:y,texcoord:v,indices:m}}function M(e,r){r=r||[];for(var t=[],n=0;n<e.length;n+=4){var o=e[n],u=e.slice(n+1,n+4);u.push.apply(u,r);for(var i=0;i<o;++i)t.push.apply(t,u)}return t}function R(){var e=[0,0,0,0,150,0,30,0,0,0,150,0,30,150,0,30,0,0,30,0,0,30,30,0,100,0,0,30,30,0,100,30,0,100,0,0,30,60,0,30,90,0,67,60,0,30,90,0,67,90,0,67,60,0,0,0,30,30,0,30,0,150,30,0,150,30,30,0,30,30,150,30,30,0,30,100,0,30,30,30,30,30,30,30,100,0,30,100,30,30,30,60,30,67,60,30,30,90,30,30,90,30,67,60,30,67,90,30,0,0,0,100,0,0,100,0,30,0,0,0,100,0,30,0,0,30,100,0,0,100,30,0,100,30,30,100,0,0,100,30,30,100,0,30,30,30,0,30,30,30,100,30,30,30,30,0,100,30,30,100,30,0,30,30,0,30,60,30,30,30,30,30,30,0,30,60,0,30,60,30,30,60,0,67,60,30,30,60,30,30,60,0,67,60,0,67,60,30,67,60,0,67,90,30,67,60,30,67,60,0,67,90,0,67,90,30,30,90,0,30,90,30,67,90,30,30,90,0,67,90,30,67,90,0,30,90,0,30,150,30,30,90,30,30,90,0,30,150,0,30,150,30,0,150,0,0,150,30,30,150,30,0,150,0,30,150,30,30,150,0,0,0,0,0,0,30,0,150,30,0,0,0,0,150,30,0,150,0],r=M([18,0,0,1,18,0,0,-1,6,0,1,0,6,1,0,0,6,0,-1,0,6,1,0,0,6,0,1,0,6,1,0,0,6,0,-1,0,6,1,0,0,6,0,-1,0,6,-1,0,0]),t=M([18,200,70,120,18,80,70,200,6,70,200,210,6,200,200,70,6,210,100,70,6,210,160,70,6,70,180,210,6,100,70,210,6,76,210,100,6,140,210,80,6,90,130,110,6,160,160,220],[255]),n=e.length/3,o={position:b(3,n),texcoord:b(2,n),normal:b(3,n),color:b(4,n,Uint8Array),indices:b(3,n/3,Uint16Array)};o.position.push(e),o.texcoord.push([.22,.19,.22,.79,.34,.19,.22,.79,.34,.79,.34,.19,.34,.19,.34,.31,.62,.19,.34,.31,.62,.31,.62,.19,.34,.43,.34,.55,.49,.43,.34,.55,.49,.55,.49,.43,0,0,1,0,0,1,0,1,1,0,1,1,0,0,1,0,0,1,0,1,1,0,1,1,0,0,1,0,0,1,0,1,1,0,1,1,0,0,1,0,1,1,0,0,1,1,0,1,0,0,1,0,1,1,0,0,1,1,0,1,0,0,0,1,1,1,0,0,1,1,1,0,0,0,1,1,0,1,0,0,1,0,1,1,0,0,1,1,0,1,0,0,1,0,1,1,0,0,1,1,0,1,0,0,1,0,1,1,0,0,0,1,1,1,0,0,1,1,1,0,0,0,1,1,0,1,0,0,1,0,1,1,0,0,0,1,1,1,0,0,1,1,1,0,0,0,0,1,1,1,0,0,1,1,1,0]),o.normal.push(r),o.color.push(t);for(var u=0;u<n;++u)o.indices.push(u);return o}function P(e,r,t,n,o,u,i){if(o<=0)throw new Error("subdivisionDown must be > 0");var a=(i=i||1)-(u=u||0),c=2*(o+1)*4,l=b(3,c),s=b(3,c),y=b(2,c);function v(e,r,t){return e+(r-e)*t}function m(r,t,i,c,b,m){for(var p=0;p<=o;p++){var d=t/1,x=p/o,w=2*(d-.5),h=(u+x*a)*Math.PI,F=Math.sin(h),E=Math.cos(h),A=v(e,r,F),j=w*n,O=E*e,_=F*A;l.push(j,O,_);var S=f.add(f.multiply([0,F,E],i),c);s.push(S),y.push(d*b+m,x)}}for(var p=0;p<2;p++){var d=2*(p/1-.5);m(r,p,[1,1,1],[0,0,0],1,0),m(r,p,[0,0,0],[d,0,0],0,0),m(t,p,[1,1,1],[0,0,0],1,0),m(t,p,[0,0,0],[d,0,0],0,1)}var x=b(3,2*o*4,Uint16Array);function w(e,r){for(var t=0;t<o;++t)x.push(e+t+0,e+t+1,r+t+0),x.push(e+t+1,r+t+1,r+t+0)}var h=o+1;return w(0*h,4*h),w(5*h,7*h),w(6*h,2*h),w(3*h,1*h),{position:l,normal:s,texcoord:y,indices:x}}function T(e,r,t,n,o,u){return S(e,e,r,t,n,o,u)}function g(e,r,t,n,o,u){if(t<3)throw new Error("radialSubdivisions must be 3 or greater");if(n<3)throw new Error("verticalSubdivisions must be 3 or greater");o=o||0;for(var i=(u=u||2*Math.PI)-o,a=t+1,f=n+1,c=a*f,l=b(3,c),s=b(3,c),y=b(2,c),v=b(3,t*n*2,Uint16Array),m=0;m<f;++m)for(var p=m/n,d=p*Math.PI*2,x=Math.sin(d),w=e+x*r,h=Math.cos(d),F=h*r,E=0;E<a;++E){var A=E/t,j=o+A*i,O=Math.sin(j),_=Math.cos(j),S=O*w,M=_*w,R=O*x,P=_*x;l.push(S,F,M),s.push(R,h,P),y.push(A,1-p)}for(var T=0;T<n;++T)for(var g=0;g<t;++g){var z=1+g,U=1+T;v.push(a*T+g,a*U+g,a*T+z),v.push(a*U+g,a*U+z,a*T+z)}return{position:l,normal:s,texcoord:y,indices:v}}function z(e,r,t,n,o){if(r<3)throw new Error("divisions must be at least 3");o=o||1,n=n||0;for(var u=(r+1)*((t=t||1)+1),i=b(3,u),a=b(3,u),f=b(2,u),c=b(3,t*r*2,Uint16Array),l=0,s=e-n,y=r+1,v=0;v<=t;++v){for(var m=n+s*Math.pow(v/t,o),p=0;p<=r;++p){var d=2*Math.PI*p/r,x=m*Math.cos(d),w=m*Math.sin(d);if(i.push(x,0,w),a.push(0,1,0),f.push(1-p/r,v/t),v>0&&p!==r){var h=l+(p+1),F=l+p,E=l+p-y,A=l+(p+1)-y;c.push(h,F,E),c.push(h,E,A)}}l+=r+1}return{position:i,normal:a,texcoord:f,indices:c}}function U(e){return function(r){var t=e.apply(this,Array.prototype.slice.call(arguments,1));return o.createBuffersFromArrays(r,t)}}function C(e){return function(r){var t=e.apply(null,Array.prototype.slice.call(arguments,1));return o.createBufferInfoFromArrays(r,t)}}var k=["numComponents","size","type","normalize","stride","offset","attrib","name","attribName"];function W(e,r,t,n){n=n||0;for(var o=e.length,u=0;u<o;++u)r[t+u]=e[u]+n}function I(e,r){var t=s(e),n=new t.constructor(r),o=n;return t.numComponents&&t.numElements&&v(n,t.numComponents),e.data&&(o={data:n},u.copyNamedProperties(k,e,o)),o}var B=C(R);r.create3DFBufferInfo=B;var L=U(R);r.create3DFBuffers=L;var G=C(_);r.createCubeBufferInfo=G;var X=U(_);r.createCubeBuffers=X;var D=C(A);r.createPlaneBufferInfo=D;var N=U(A);r.createPlaneBuffers=N;var H=C(j);r.createSphereBufferInfo=H;var q=U(j);r.createSphereBuffers=q;var V=C(S);r.createTruncatedConeBufferInfo=V;var Y=U(S);r.createTruncatedConeBuffers=Y;var $=C(E);r.createXYQuadBufferInfo=$;var K=U(E);r.createXYQuadBuffers=K;var Z=C(P);r.createCrescentBufferInfo=Z;var J=U(P);r.createCrescentBuffers=J;var Q=C(T);r.createCylinderBufferInfo=Q;var ee=U(T);r.createCylinderBuffers=ee;var re=C(g);r.createTorusBufferInfo=re;var te=U(g);r.createTorusBuffers=te;var ne=C(z);r.createDiscBufferInfo=ne;var oe=U(z);r.createDiscBuffers=oe;var ue=Z;r.createCresentBufferInfo=ue;var ie=J;r.createCresentBuffers=ie;var ae=P;r.createCresentVertices=ae},function(e,r,t){"use strict";function n(e){return(n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}r.__esModule=!0;var o={addExtensionsToContext:!0,getContext:!0,getWebGLContext:!0,resizeCanvasToDisplaySize:!0,setDefaults:!0,attributes:!0,textures:!0,utils:!0,draw:!0,framebuffers:!0,programs:!0,typedarrays:!0,vertexArrays:!0};r.addExtensionsToContext=h,r.getContext=function(e,r){return function(e,r){for(var t=["webgl2","webgl","experimental-webgl"],n=null,o=0;o<t.length;++o)if(n=e.getContext(t[o],r)){p.addExtensionsToContext&&h(n);break}return n}(e,r)},r.getWebGLContext=function(e,r){return function(e,r){for(var t=["webgl","experimental-webgl"],n=null,o=0;o<t.length;++o)if(n=e.getContext(t[o],r)){p.addExtensionsToContext&&h(n);break}return n}(e,r)},r.resizeCanvasToDisplaySize=function(e,r){r=r||1,r=Math.max(0,r);var t=e.clientWidth*r|0,n=e.clientHeight*r|0;if(e.width!==t||e.height!==n)return e.width=t,e.height=n,!0;return!1},r.setDefaults=function(e){a.copyExistingProperties(e,p),u.setAttributeDefaults_(e),i.setTextureDefaults_(e)},r.vertexArrays=r.typedarrays=r.programs=r.framebuffers=r.draw=r.utils=r.textures=r.attributes=void 0;var u=m(t(6));r.attributes=u,Object.keys(u).forEach((function(e){"default"!==e&&"__esModule"!==e&&(Object.prototype.hasOwnProperty.call(o,e)||(r[e]=u[e]))}));var i=m(t(7));r.textures=i,Object.keys(i).forEach((function(e){"default"!==e&&"__esModule"!==e&&(Object.prototype.hasOwnProperty.call(o,e)||(r[e]=i[e]))}));var a=m(t(0)),f=m(t(3));r.utils=f,Object.keys(f).forEach((function(e){"default"!==e&&"__esModule"!==e&&(Object.prototype.hasOwnProperty.call(o,e)||(r[e]=f[e]))}));var c=m(t(11));r.draw=c,Object.keys(c).forEach((function(e){"default"!==e&&"__esModule"!==e&&(Object.prototype.hasOwnProperty.call(o,e)||(r[e]=c[e]))}));var l=m(t(12));r.framebuffers=l,Object.keys(l).forEach((function(e){"default"!==e&&"__esModule"!==e&&(Object.prototype.hasOwnProperty.call(o,e)||(r[e]=l[e]))}));var s=m(t(4));r.programs=s,Object.keys(s).forEach((function(e){"default"!==e&&"__esModule"!==e&&(Object.prototype.hasOwnProperty.call(o,e)||(r[e]=s[e]))}));var y=m(t(1));r.typedarrays=y,Object.keys(y).forEach((function(e){"default"!==e&&"__esModule"!==e&&(Object.prototype.hasOwnProperty.call(o,e)||(r[e]=y[e]))}));var v=m(t(13));function b(){if("function"!=typeof WeakMap)return null;var e=new WeakMap;return b=function(){return e},e}function m(e){if(e&&e.__esModule)return e;if(null===e||"object"!==n(e)&&"function"!=typeof e)return{default:e};var r=b();if(r&&r.has(e))return r.get(e);var t={},o=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var u in e)if(Object.prototype.hasOwnProperty.call(e,u)){var i=o?Object.getOwnPropertyDescriptor(e,u):null;i&&(i.get||i.set)?Object.defineProperty(t,u,i):t[u]=e[u]}return t.default=e,r&&r.set(e,t),t}r.vertexArrays=v,Object.keys(v).forEach((function(e){"default"!==e&&"__esModule"!==e&&(Object.prototype.hasOwnProperty.call(o,e)||(r[e]=v[e]))}));var p={addExtensionsToContext:!0};var d=/^(.*?)_/;function x(e,r){f.glEnumToString(e,0);var t=e.getExtension(r);if(t){var n={},o=d.exec(r)[1],u="_"+o;for(var i in t){var c=t[i],l="function"==typeof c,s=l?o:u,y=i;i.endsWith(s)&&(y=i.substring(0,i.length-s.length)),void 0!==e[y]?l||e[y]===c||a.warn(y,e[y],c,i):l?e[y]=function(e){return function(){return e.apply(t,arguments)}}(c):(e[y]=c,n[y]=c)}n.constructor={name:t.constructor.name},f.glEnumToString(n,0)}return t}var w=["ANGLE_instanced_arrays","EXT_blend_minmax","EXT_color_buffer_float","EXT_color_buffer_half_float","EXT_disjoint_timer_query","EXT_disjoint_timer_query_webgl2","EXT_frag_depth","EXT_sRGB","EXT_shader_texture_lod","EXT_texture_filter_anisotropic","OES_element_index_uint","OES_standard_derivatives","OES_texture_float","OES_texture_float_linear","OES_texture_half_float","OES_texture_half_float_linear","OES_vertex_array_object","WEBGL_color_buffer_float","WEBGL_compressed_texture_atc","WEBGL_compressed_texture_etc1","WEBGL_compressed_texture_pvrtc","WEBGL_compressed_texture_s3tc","WEBGL_compressed_texture_s3tc_srgb","WEBGL_depth_texture","WEBGL_draw_buffers"];function h(e){for(var r=0;r<w.length;++r)x(e,w[r])}},function(e,r,t){"use strict";function n(e){return(n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}r.__esModule=!0,r.drawBufferInfo=i,r.drawObjectList=function(e,r){var t=null,n=null;r.forEach((function(r){if(!1!==r.active){var u=r.programInfo,a=r.vertexArrayInfo||r.bufferInfo,f=!1,c=void 0===r.type?4:r.type;u!==t&&(t=u,e.useProgram(u.program),f=!0),(f||a!==n)&&(n&&n.vertexArrayObject&&!a.vertexArrayObject&&e.bindVertexArray(null),n=a,o.setBuffersAndAttributes(e,u,a)),o.setUniforms(u,r.uniforms),i(e,a,c,r.count,r.offset,r.instanceCount)}})),n&&n.vertexArrayObject&&e.bindVertexArray(null)};var o=function(e){if(e&&e.__esModule)return e;if(null===e||"object"!==n(e)&&"function"!=typeof e)return{default:e};var r=u();if(r&&r.has(e))return r.get(e);var t={},o=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var i in e)if(Object.prototype.hasOwnProperty.call(e,i)){var a=o?Object.getOwnPropertyDescriptor(e,i):null;a&&(a.get||a.set)?Object.defineProperty(t,i,a):t[i]=e[i]}t.default=e,r&&r.set(e,t);return t}(t(4));function u(){if("function"!=typeof WeakMap)return null;var e=new WeakMap;return u=function(){return e},e}function i(e,r,t,n,o,u){t=void 0===t?4:t;var i=r.indices,a=r.elementType,f=void 0===n?r.numElements:n;o=void 0===o?0:o,a||i?void 0!==u?e.drawElementsInstanced(t,f,void 0===a?5123:r.elementType,o,u):e.drawElements(t,f,void 0===a?5123:r.elementType,o):void 0!==u?e.drawArraysInstanced(t,o,f,u):e.drawArrays(t,o,f)}},function(e,r,t){"use strict";function n(e){return(n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}r.__esModule=!0,r.bindFramebufferInfo=function(e,r,t){t=t||36160,r?(e.bindFramebuffer(t,r.framebuffer),e.viewport(0,0,r.width,r.height)):(e.bindFramebuffer(t,null),e.viewport(0,0,e.drawingBufferWidth,e.drawingBufferHeight))},r.createFramebufferInfo=function(e,r,t,n){var i=36160,a=e.createFramebuffer();e.bindFramebuffer(i,a),t=t||e.drawingBufferWidth,n=n||e.drawingBufferHeight;var c=0,m={framebuffer:a,attachments:[],width:t,height:n};return(r=r||y).forEach((function(r){var a=r.attachment,y=r.format,p=function(e){return v[e]}(y);if(p||(p=36064+c++),!a)if(function(e){return b[e]}(y))a=e.createRenderbuffer(),e.bindRenderbuffer(f,a),e.renderbufferStorage(f,y,t,n);else{var d=Object.assign({},r);d.width=t,d.height=n,void 0===d.auto&&(d.auto=!1,d.min=d.min||d.minMag||s,d.mag=d.mag||d.minMag||s,d.wrapS=d.wrapS||d.wrap||l,d.wrapT=d.wrapT||d.wrap||l),a=o.createTexture(e,d)}if(u.isRenderbuffer(e,a))e.framebufferRenderbuffer(i,p,f,a);else{if(!u.isTexture(e,a))throw new Error("unknown attachment type");void 0!==r.layer?e.framebufferTextureLayer(i,p,a,r.level||0,r.layer):e.framebufferTexture2D(i,p,r.target||3553,a,r.level||0)}m.attachments.push(a)})),m},r.resizeFramebufferInfo=function(e,r,t,n,i){n=n||e.drawingBufferWidth,i=i||e.drawingBufferHeight,r.width=n,r.height=i,(t=t||y).forEach((function(t,a){var c=r.attachments[a],l=t.format;if(u.isRenderbuffer(e,c))e.bindRenderbuffer(f,c),e.renderbufferStorage(f,l,n,i);else{if(!u.isTexture(e,c))throw new Error("unknown attachment type");o.resizeTexture(e,c,t,n,i)}}))};var o=a(t(7)),u=a(t(0));function i(){if("function"!=typeof WeakMap)return null;var e=new WeakMap;return i=function(){return e},e}function a(e){if(e&&e.__esModule)return e;if(null===e||"object"!==n(e)&&"function"!=typeof e)return{default:e};var r=i();if(r&&r.has(e))return r.get(e);var t={},o=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var u in e)if(Object.prototype.hasOwnProperty.call(e,u)){var a=o?Object.getOwnPropertyDescriptor(e,u):null;a&&(a.get||a.set)?Object.defineProperty(t,u,a):t[u]=e[u]}return t.default=e,r&&r.set(e,t),t}var f=36161,c=34041,l=33071,s=9729,y=[{format:6408,type:5121,min:s,wrap:l},{format:c}],v={};v[34041]=33306,v[6401]=36128,v[36168]=36128,v[6402]=36096,v[33189]=36096;var b={};b[32854]=!0,b[32855]=!0,b[36194]=!0,b[34041]=!0,b[33189]=!0,b[6401]=!0,b[36168]=!0},function(e,r,t){"use strict";function n(e){return(n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}r.__esModule=!0,r.createVertexArrayInfo=function(e,r,t){var n=e.createVertexArray();e.bindVertexArray(n),r.length||(r=[r]);return r.forEach((function(r){o.setBuffersAndAttributes(e,r,t)})),e.bindVertexArray(null),{numElements:t.numElements,elementType:t.elementType,vertexArrayObject:n}},r.createVAOAndSetAttributes=i,r.createVAOFromBufferInfo=function(e,r,t){return i(e,r.attribSetters||r,t.attribs,t.indices)};var o=function(e){if(e&&e.__esModule)return e;if(null===e||"object"!==n(e)&&"function"!=typeof e)return{default:e};var r=u();if(r&&r.has(e))return r.get(e);var t={},o=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var i in e)if(Object.prototype.hasOwnProperty.call(e,i)){var a=o?Object.getOwnPropertyDescriptor(e,i):null;a&&(a.get||a.set)?Object.defineProperty(t,i,a):t[i]=e[i]}t.default=e,r&&r.set(e,t);return t}(t(4));function u(){if("function"!=typeof WeakMap)return null;var e=new WeakMap;return u=function(){return e},e}function i(e,r,t,n){var u=e.createVertexArray();return e.bindVertexArray(u),o.setAttributes(r,t),n&&e.bindBuffer(34963,n),e.bindVertexArray(null),u}}])}));// ---------- END twgl-full.min.js ------

// ---------- lz-string/libs/lz-string.min.js ----------
var LZString=function(){function o(o,r){if(!t[o]){t[o]={};for(var n=0;n<o.length;n++)t[o][o.charAt(n)]=n}return t[o][r]}var r=String.fromCharCode,n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$",t={},i={compressToBase64:function(o){if(null==o)return"";var r=i._compress(o,6,function(o){return n.charAt(o)});switch(r.length%4){default:case 0:return r;case 1:return r+"===";case 2:return r+"==";case 3:return r+"="}},decompressFromBase64:function(r){return null==r?"":""==r?null:i._decompress(r.length,32,function(e){return o(n,r.charAt(e))})},compressToUTF16:function(o){return null==o?"":i._compress(o,15,function(o){return r(o+32)})+" "},decompressFromUTF16:function(o){return null==o?"":""==o?null:i._decompress(o.length,16384,function(r){return o.charCodeAt(r)-32})},compressToUint8Array:function(o){for(var r=i.compress(o),n=new Uint8Array(2*r.length),e=0,t=r.length;t>e;e++){var s=r.charCodeAt(e);n[2*e]=s>>>8,n[2*e+1]=s%256}return n},decompressFromUint8Array:function(o){if(null===o||void 0===o)return i.decompress(o);for(var n=new Array(o.length/2),e=0,t=n.length;t>e;e++)n[e]=256*o[2*e]+o[2*e+1];var s=[];return n.forEach(function(o){s.push(r(o))}),i.decompress(s.join(""))},compressToEncodedURIComponent:function(o){return null==o?"":i._compress(o,6,function(o){return e.charAt(o)})},decompressFromEncodedURIComponent:function(r){return null==r?"":""==r?null:(r=r.replace(/ /g,"+"),i._decompress(r.length,32,function(n){return o(e,r.charAt(n))}))},compress:function(o){return i._compress(o,16,function(o){return r(o)})},_compress:function(o,r,n){if(null==o)return"";var e,t,i,s={},p={},u="",c="",a="",l=2,f=3,h=2,d=[],m=0,v=0;for(i=0;i<o.length;i+=1)if(u=o.charAt(i),Object.prototype.hasOwnProperty.call(s,u)||(s[u]=f++,p[u]=!0),c=a+u,Object.prototype.hasOwnProperty.call(s,c))a=c;else{if(Object.prototype.hasOwnProperty.call(p,a)){if(a.charCodeAt(0)<256){for(e=0;h>e;e++)m<<=1,v==r-1?(v=0,d.push(n(m)),m=0):v++;for(t=a.charCodeAt(0),e=0;8>e;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1}else{for(t=1,e=0;h>e;e++)m=m<<1|t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t=0;for(t=a.charCodeAt(0),e=0;16>e;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1}l--,0==l&&(l=Math.pow(2,h),h++),delete p[a]}else for(t=s[a],e=0;h>e;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1;l--,0==l&&(l=Math.pow(2,h),h++),s[c]=f++,a=String(u)}if(""!==a){if(Object.prototype.hasOwnProperty.call(p,a)){if(a.charCodeAt(0)<256){for(e=0;h>e;e++)m<<=1,v==r-1?(v=0,d.push(n(m)),m=0):v++;for(t=a.charCodeAt(0),e=0;8>e;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1}else{for(t=1,e=0;h>e;e++)m=m<<1|t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t=0;for(t=a.charCodeAt(0),e=0;16>e;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1}l--,0==l&&(l=Math.pow(2,h),h++),delete p[a]}else for(t=s[a],e=0;h>e;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1;l--,0==l&&(l=Math.pow(2,h),h++)}for(t=2,e=0;h>e;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1;for(;;){if(m<<=1,v==r-1){d.push(n(m));break}v++}return d.join("")},decompress:function(o){return null==o?"":""==o?null:i._decompress(o.length,32768,function(r){return o.charCodeAt(r)})},_decompress:function(o,n,e){var t,i,s,p,u,c,a,l,f=[],h=4,d=4,m=3,v="",w=[],A={val:e(0),position:n,index:1};for(i=0;3>i;i+=1)f[i]=i;for(p=0,c=Math.pow(2,2),a=1;a!=c;)u=A.val&A.position,A.position>>=1,0==A.position&&(A.position=n,A.val=e(A.index++)),p|=(u>0?1:0)*a,a<<=1;switch(t=p){case 0:for(p=0,c=Math.pow(2,8),a=1;a!=c;)u=A.val&A.position,A.position>>=1,0==A.position&&(A.position=n,A.val=e(A.index++)),p|=(u>0?1:0)*a,a<<=1;l=r(p);break;case 1:for(p=0,c=Math.pow(2,16),a=1;a!=c;)u=A.val&A.position,A.position>>=1,0==A.position&&(A.position=n,A.val=e(A.index++)),p|=(u>0?1:0)*a,a<<=1;l=r(p);break;case 2:return""}for(f[3]=l,s=l,w.push(l);;){if(A.index>o)return"";for(p=0,c=Math.pow(2,m),a=1;a!=c;)u=A.val&A.position,A.position>>=1,0==A.position&&(A.position=n,A.val=e(A.index++)),p|=(u>0?1:0)*a,a<<=1;switch(l=p){case 0:for(p=0,c=Math.pow(2,8),a=1;a!=c;)u=A.val&A.position,A.position>>=1,0==A.position&&(A.position=n,A.val=e(A.index++)),p|=(u>0?1:0)*a,a<<=1;f[d++]=r(p),l=d-1,h--;break;case 1:for(p=0,c=Math.pow(2,16),a=1;a!=c;)u=A.val&A.position,A.position>>=1,0==A.position&&(A.position=n,A.val=e(A.index++)),p|=(u>0?1:0)*a,a<<=1;f[d++]=r(p),l=d-1,h--;break;case 2:return w.join("")}if(0==h&&(h=Math.pow(2,m),m++),f[l])v=f[l];else{if(l!==d)return null;v=s+s.charAt(0)}w.push(v),f[d++]=s+v.charAt(0),h--,s=v,0==h&&(h=Math.pow(2,m),m++)}}};return i}();"function"==typeof define&&define.amd?define(function(){return LZString}):"undefined"!=typeof module&&null!=module&&(module.exports=LZString);
// ---------- END lz-string/libs/lz-string.min.js ------

// ---------- build/h264-mp4-encoder.web.js ----------
var HME=function(A){var B={};function Q(g){if(B[g])return B[g].exports;var I=B[g]={i:g,l:!1,exports:{}};return A[g].call(I.exports,I,I.exports,Q),I.l=!0,I.exports}return Q.m=A,Q.c=B,Q.d=function(A,B,g){Q.o(A,B)||Object.defineProperty(A,B,{enumerable:!0,get:g})},Q.r=function(A){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(A,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(A,"__esModule",{value:!0})},Q.t=function(A,B){if(1&B&&(A=Q(A)),8&B)return A;if(4&B&&"object"==typeof A&&A&&A.__esModule)return A;var g=Object.create(null);if(Q.r(g),Object.defineProperty(g,"default",{enumerable:!0,value:A}),2&B&&"string"!=typeof A)for(var I in A)Q.d(g,I,function(B){return A[B]}.bind(null,I));return g},Q.n=function(A){var B=A&&A.__esModule?function(){return A.default}:function(){return A};return Q.d(B,"a",B),B},Q.o=function(A,B){return Object.prototype.hasOwnProperty.call(A,B)},Q.p="",Q(Q.s=101)}([function(A,B){"function"==typeof Object.create?A.exports=function(A,B){B&&(A.super_=B,A.prototype=Object.create(B.prototype,{constructor:{value:A,enumerable:!1,writable:!0,configurable:!0}}))}:A.exports=function(A,B){if(B){A.super_=B;var Q=function(){};Q.prototype=B.prototype,A.prototype=new Q,A.prototype.constructor=A}}},function(A,B,Q){var g=Q(2),I=g.Buffer;function E(A,B){for(var Q in A)B[Q]=A[Q]}function i(A,B,Q){return I(A,B,Q)}I.from&&I.alloc&&I.allocUnsafe&&I.allocUnsafeSlow?A.exports=g:(E(g,B),B.Buffer=i),E(I,i),i.from=function(A,B,Q){if("number"==typeof A)throw new TypeError("Argument must not be a number");return I(A,B,Q)},i.alloc=function(A,B,Q){if("number"!=typeof A)throw new TypeError("Argument must be a number");var g=I(A);return void 0!==B?"string"==typeof Q?g.fill(B,Q):g.fill(B):g.fill(0),g},i.allocUnsafe=function(A){if("number"!=typeof A)throw new TypeError("Argument must be a number");return I(A)},i.allocUnsafeSlow=function(A){if("number"!=typeof A)throw new TypeError("Argument must be a number");return g.SlowBuffer(A)}},function(A,B,Q){"use strict";(function(A){
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <http://feross.org>
 * @license  MIT
 */
/*! safe-buffer. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */
var g=Q(2),I=g.Buffer;function E(A,B){for(var Q in A)B[Q]=A[Q]}function i(A,B,Q){return I(A,B,Q)}I.from&&I.alloc&&I.allocUnsafe&&I.allocUnsafeSlow?A.exports=g:(E(g,B),B.Buffer=i),i.prototype=Object.create(I.prototype),E(I,i),i.from=function(A,B,Q){if("number"==typeof A)throw new TypeError("Argument must not be a number");return I(A,B,Q)},i.alloc=function(A,B,Q){if("number"!=typeof A)throw new TypeError("Argument must be a number");var g=I(A);return void 0!==B?"string"==typeof Q?g.fill(B,Q):g.fill(B):g.fill(0),g},i.allocUnsafe=function(A){if("number"!=typeof A)throw new TypeError("Argument must be a number");return I(A)},i.allocUnsafeSlow=function(A){if("number"!=typeof A)throw new TypeError("Argument must be a number");return g.SlowBuffer(A)}},function(A,B,Q){(B=A.exports=Q(51)).Stream=B,B.Readable=B,B.Writable=Q(55),B.Duplex=Q(16),B.Transform=Q(56),B.PassThrough=Q(113),B.finished=Q(33),B.pipeline=Q(114)},function(A,B){},function(A,B,Q){"use strict";function g(A,B){var Q=Object.keys(A);if(Object.getOwnPropertySymbols){var g=Object.getOwnPropertySymbols(A);B&&(g=g.filter((function(B){return Object.getOwnPropertyDescriptor(A,B).enumerable}))),Q.push.apply(Q,g)}return Q}function I(A,B,Q){return B in A?Object.defineProperty(A,B,{value:Q,enumerable:!0,configurable:!0,writable:!0}):A[B]=Q,A}function E(A,B){for(var Q=0;Q<B.length;Q++){var g=B[Q];g.enumerable=g.enumerable||!1,g.configurable=!0,"value"in g&&(g.writable=!0),Object.defineProperty(A,g.key,g)}}var i=Q(2).Buffer,C=Q(110).inspect,t=C&&C.custom||"inspect";A.exports=function(){function A(){!function(A,B){if(!(A instanceof B))throw new TypeError("Cannot call a class as a function")}(this,A),this.head=null,this.tail=null,this.length=0}var B,Q,e;return B=A,(Q=[{key:"push",value:function(A){var B={data:A,next:null};this.length>0?this.tail.next=B:this.head=B,this.tail=B,++this.length}},{key:"unshift",value:function(A){var B={data:A,next:this.head};0===this.length&&(this.tail=B),this.head=B,++this.length}},{key:"shift",value:function(){if(0!==this.length){var A=this.head.data;return 1===this.length?this.head=this.tail=null:this.head=this.head.next,--this.length,A}}},{key:"clear",value:function(){this.head=this.tail=null,this.length=0}},{key:"join",value:function(A){if(0===this.length)return"";for(var B=this.head,Q=""+B.data;B=B.next;)Q+=A+B.data;return Q}},{key:"concat",value:function(A){if(0===this.length)return i.alloc(0);for(var B,Q,g,I=i.allocUnsafe(A>>>0),E=this.head,C=0;E;)B=E.data,Q=I,g=C,i.prototype.copy.call(B,Q,g),C+=E.data.length,E=E.next;return I}},{key:"consume",value:function(A,B){var Q;return A<this.head.data.length?(Q=this.head.data.slice(0,A),this.head.data=this.head.data.slice(A)):Q=A===this.head.data.length?this.shift():B?this._getString(A):this._getBuffer(A),Q}},{key:"first",value:function(){return this.head.data}},{key:"_getString",value:function(A){var B=this.head,Q=1,g=B.data;for(A-=g.length;B=B.next;){var I=B.data,E=A>I.length?I.length:A;if(E===I.length?g+=I:g+=I.slice(0,A),0==(A-=E)){E===I.length?(++Q,B.next?this.head=B.next:this.head=this.tail=null):(this.head=B,B.data=I.slice(E));break}++Q}return this.length-=Q,g}},{key:"_getBuffer",value:function(A){var B=i.allocUnsafe(A),Q=this.head,g=1;for(Q.data.copy(B),A-=Q.data.length;Q=Q.next;){var I=Q.data,E=A>I.length?I.length:A;if(I.copy(B,B.length-A,0,E),0==(A-=E)){E===I.length?(++g,Q.next?this.head=Q.next:this.head=this.tail=null):(this.head=Q,Q.data=I.slice(E));break}++g}return this.length-=g,B}},{key:t,value:function(A,B){return C(this,function(A){for(var B=1;B<arguments.length;B++){var Q=null!=arguments[B]?arguments[B]:{};B%2?g(Object(Q),!0).forEach((function(B){I(A,B,Q[B])})):Object.getOwnPropertyDescriptors?Object.defineProperties(A,Object.getOwnPropertyDescriptors(Q)):g(Object(Q)).forEach((function(B){Object.defineProperty(A,B,Object.getOwnPropertyDescriptor(Q,B))}))}return A}({},B,{depth:0,customInspect:!1}))}}])&&E(B.prototype,Q),e&&E(B,e),A}()},function(A,B){},function(A,B,Q){"use strict";(function(B){var g;function I(A,B,Q){return B in A?Object.defineProperty(A,B,{value:Q,enumerable:!0,configurable:!0,writable:!0}):A[B]=Q,A}var E=Q(33),i=Symbol("lastResolve"),C=Symbol("lastReject"),t=Symbol("error"),e=Symbol("ended"),o=Symbol("lastPromise"),s=Symbol("handlePromise"),r=Symbol("stream");function h(A,B){return{value:A,done:B}}function n(A){var B=A[i];if(null!==B){var Q=A[r].read();null!==Q&&(A[o]=null,A[i]=null,A[C]=null,B(h(Q,!1)))}}function a(A){B.nextTick(n,A)}var c=Object.getPrototypeOf((function(){})),y=Object.setPrototypeOf((I(g={get stream(){return this[r]},next:function(){var A=this,Q=this[t];if(null!==Q)return Promise.reject(Q);if(this[e])return Promise.resolve(h(void 0,!0));if(this[r].destroyed)return new Promise((function(Q,g){B.nextTick((function(){A[t]?g(A[t]):Q(h(void 0,!0))}))}));var g,I=this[o];if(I)g=new Promise(function(A,B){return function(Q,g){A.then((function(){B[e]?Q(h(void 0,!0)):B[s](Q,g)}),g)}}(I,this));else{var E=this[r].read();if(null!==E)return Promise.resolve(h(E,!1));g=new Promise(this[s])}return this[o]=g,g}},Symbol.asyncIterator,(function(){return this})),I(g,"return",(function(){var A=this;return new Promise((function(B,Q){A[r].destroy(null,(function(A){A?Q(A):B(h(void 0,!0))}))}))})),g),c);A.exports=function(A){var B,Q=Object.create(y,(I(B={},r,{value:A,writable:!0}),I(B,i,{value:null,writable:!0}),I(B,C,{value:null,writable:!0}),I(B,t,{value:null,writable:!0}),I(B,e,{value:A._readableState.endEmitted,writable:!0}),I(B,s,{value:function(A,B){var g=Q[r].read();g?(Q[o]=null,Q[i]=null,Q[C]=null,A(h(g,!1))):(Q[i]=A,Q[C]=B)},writable:!0}),B));return Q[o]=null,E(A,(function(A){if(A&&"ERR_STREAM_PREMATURE_CLOSE"!==A.code){var B=Q[C];return null!==B&&(Q[o]=null,Q[i]=null,Q[C]=null,B(A)),void(Q[t]=A)}var g=Q[i];null!==g&&(Q[o]=null,Q[i]=null,Q[C]=null,g(h(void 0,!0))),Q[e]=!0})),A.on("readable",a.bind(null,Q)),Q}}).call(this,Q(3))},function(A,B){A.exports=function(){throw new Error("Readable.from is not available in the browser")}},function(A,B,Q){"use strict";A.exports=I;var g=Q(56);function I(A){if(!(this instanceof I))return new I(A);g.call(this,A)}Q(0)(I,g),I.prototype._transform=function(A,B,Q){Q(null,A)}},function(A,B,Q){"use strict";var g;var I=Q(15).codes,E=I.ERR_MISSING_ARGS,i=I.ERR_STREAM_DESTROYED;function C(A){if(A)throw A}function t(A,B,I,E){E=function(A){var B=!1;return function(){B||(B=!0,A.apply(void 0,arguments))}}(E);var C=!1;A.on("close",(function(){C=!0})),void 0===g&&(g=Q(33)),g(A,{readable:B,writable:I},(function(A){if(A)return E(A);C=!0,E()}));var t=!1;return function(B){if(!C&&!t)return t=!0,function(A){return A.setHeader&&"function"==typeof A.abort}(A)?A.abort():"function"==typeof A.destroy?A.destroy():void E(B||new i("pipe"))}}function e(A){A()}function o(A,B){return A.pipe(B)}function s(A){return A.length?"function"!=typeof A[A.length-1]?C:A.pop():C}A.exports=function(){for(var A=arguments.length,B=new Array(A),Q=0;Q<A;Q++)B[Q]=arguments[Q];var g,I=s(B);if(Array.isArray(B[0])&&(B=B[0]),B.length<2)throw new E("streams");var i=B.map((function(A,Q){var E=Q<B.length-1;return t(A,E,Q>0,(function(A){g||(g=A),A&&i.forEach(e),E||(i.forEach(e),I(g))}))}));return B.reduce(o)}},function(A,B,Q){var g=Q(0),I=Q(17),E=Q(1).Buffer,i=[1518500249,1859775393,-1894007588,-899497514],C=new Array(80);function t(){this.init(),this._w=C,I.call(this,64,56)}function e(A){return A<<30|A>>>2}function o(A,B,Q,g){return 0===A?B&Q|~B&g:2===A?B&Q|B&g|Q&g:B^Q^g}g(t,I),t.prototype.init=function(){return this._a=1732584193,this._b=4023233417,this._c=2562383102,this._d=271733878,this._e=3285377520,this},t.prototype._update=function(A){for(var B,Q=this._w,g=0|this._a,I=0|this._b,E=0|this._c,C=0|this._d,t=0|this._e,s=0;s<16;++s)Q[s]=A.readInt32BE(4*s);for(;s<80;++s)Q[s]=Q[s-3]^Q[s-8]^Q[s-14]^Q[s-16];for(var r=0;r<80;++r){var h=~~(r/20),n=0|((B=g)<<5|B>>>27)+o(h,I,E,C)+t+Q[r]+i[h];t=C,C=E,E=e(I),I=g,g=n}this._a=g+this._a|0,this._b=I+this._b|0,this._c=E+this._c|0,this._d=C+this._d|0,this._e=t+this._e|0},t.prototype._hash=function(){var A=E.allocUnsafe(20);return A.writeInt32BE(0|this._a,0),A.writeInt32BE(0|this._b,4),A.writeInt32BE(0|this._c,8),A.writeInt32BE(0|this._d,12),A.writeInt32BE(0|this._e,16),A},A.exports=t},function(A,B,Q){var g=Q(0),I=Q(17),E=Q(1).Buffer,i=[1518500249,1859775393,-1894007588,-899497514],C=new Array(80);function t(){this.init(),this._w=C,I.call(this,64,56)}function e(A){return A<<5|A>>>27}function o(A){return A<<30|A>>>2}function s(A,B,Q,g){return 0===A?B&Q|~B&g:2===A?B&Q|B&g|Q&g:B^Q^g}g(t,I),t.prototype.init=function(){return this._a=1732584193,this._b=4023233417,this._c=2562383102,this._d=271733878,this._e=3285377520,this},t.prototype._update=function(A){for(var B,Q=this._w,g=0|this._a,I=0|this._b,E=0|this._c,C=0|this._d,t=0|this._e,r=0;r<16;++r)Q[r]=A.readInt32BE(4*r);for(;r<80;++r)Q[r]=(B=Q[r-3]^Q[r-8]^Q[r-14]^Q[r-16])<<1|B>>>31;for(var h=0;h<80;++h){var n=~~(h/20),a=e(g)+s(n,I,E,C)+t+Q[h]+i[n]|0;t=C,C=E,E=o(I),I=g,g=a}this._a=g+this._a|0,this._b=I+this._b|0,this._c=E+this._c|0,this._d=C+this._d|0,this._e=t+this._e|0},t.prototype._hash=function(){var A=E.allocUnsafe(20);return A.writeInt32BE(0|this._a,0),A.writeInt32BE(0|this._b,4),A.writeInt32BE(0|this._c,8),A.writeInt32BE(0|this._d,12),A.writeInt32BE(0|this._e,16),A},A.exports=t},function(A,B,Q){var g=Q(0),I=Q(57),E=Q(17),i=Q(1).Buffer,C=new Array(64);function t(){this.init(),this._w=C,E.call(this,64,56)}g(t,I),t.prototype.init=function(){return this._a=3238371032,this._b=914150663,this._c=812702999,this._d=4144912697,this._e=4290775857,this._f=1750603025,this._g=1694076839,this._h=3204075428,this},t.prototype._hash=function(){var A=i.allocUnsafe(28);return A.writeInt32BE(this._a,0),A.writeInt32BE(this._b,4),A.writeInt32BE(this._c,8),A.writeInt32BE(this._d,12),A.writeInt32BE(this._e,16),A.writeInt32BE(this._f,20),A.writeInt32BE(this._g,24),A},A.exports=t},function(A,B,Q){var g=Q(0),I=Q(58),E=Q(17),i=Q(1).Buffer,C=new Array(160);function t(){this.init(),this._w=C,E.call(this,128,112)}g(t,I),t.prototype.init=function(){return this._ah=3418070365,this._bh=1654270250,this._ch=2438529370,this._dh=355462360,this._eh=1731405415,this._fh=2394180231,this._gh=3675008525,this._hh=1203062813,this._al=3238371032,this._bl=914150663,this._cl=812702999,this._dl=4144912697,this._el=4290775857,this._fl=1750603025,this._gl=1694076839,this._hl=3204075428,this},t.prototype._hash=function(){var A=i.allocUnsafe(48);function B(B,Q,g){A.writeInt32BE(B,g),A.writeInt32BE(Q,g+4)}return B(this._ah,this._al,0),B(this._bh,this._bl,8),B(this._ch,this._cl,16),B(this._dh,this._dl,24),B(this._eh,this._el,32),B(this._fh,this._fl,40),A},A.exports=t},function(A,B,Q){A.exports=I;var g=Q(11).EventEmitter;function I(){g.call(this)}Q(0)(I,g),I.Readable=Q(36),I.Writable=Q(126),I.Duplex=Q(127),I.Transform=Q(128),I.PassThrough=Q(129),I.Stream=I,I.prototype.pipe=function(A,B){var Q=this;function I(B){A.writable&&!1===A.write(B)&&Q.pause&&Q.pause()}function E(){Q.readable&&Q.resume&&Q.resume()}Q.on("data",I),A.on("drain",E),A._isStdio||B&&!1===B.end||(Q.on("end",C),Q.on("close",t));var i=!1;function C(){i||(i=!0,A.end())}function t(){i||(i=!0,"function"==typeof A.destroy&&A.destroy())}function e(A){if(o(),0===g.listenerCount(this,"error"))throw A}function o(){Q.removeListener("data",I),A.removeListener("drain",E),Q.removeListener("end",C),Q.removeListener("close",t),Q.removeListener("error",e),A.removeListener("error",e),Q.removeListener("end",o),Q.removeListener("close",o),A.removeListener("close",o)}return Q.on("error",e),A.on("error",e),Q.on("end",o),Q.on("close",o),A.on("close",o),A.emit("pipe",Q),A}},function(A,B){},function(A,B,Q){"use strict";var g=Q(1).Buffer,I=Q(122);A.exports=function(){function A(){!function(A,B){if(!(A instanceof B))throw new TypeError("Cannot call a class as a function")}(this,A),this.head=null,this.tail=null,this.length=0}return A.prototype.push=function(A){var B={data:A,next:null};this.length>0?this.tail.next=B:this.head=B,this.tail=B,++this.length},A.prototype.unshift=function(A){var B={data:A,next:this.head};0===this.length&&(this.tail=B),this.head=B,++this.length},A.prototype.shift=function(){if(0!==this.length){var A=this.head.data;return 1===this.length?this.head=this.tail=null:this.head=this.head.next,--this.length,A}},A.prototype.clear=function(){this.head=this.tail=null,this.length=0},A.prototype.join=function(A){if(0===this.length)return"";for(var B=this.head,Q=""+B.data;B=B.next;)Q+=A+B.data;return Q},A.prototype.concat=function(A){if(0===this.length)return g.alloc(0);if(1===this.length)return this.head.data;for(var B,Q,I,E=g.allocUnsafe(A>>>0),i=this.head,C=0;i;)B=i.data,Q=E,I=C,B.copy(Q,I),C+=i.data.length,i=i.next;return E},A}(),I&&I.inspect&&I.inspect.custom&&(A.exports.prototype[I.inspect.custom]=function(){var A=I.inspect({length:this.length});return this.constructor.name+" "+A})},function(A,B){},function(A,B,Q){(function(A){var g=void 0!==A&&A||"undefined"!=typeof self&&self||window,I=Function.prototype.apply;function E(A,B){this._id=A,this._clearFn=B}B.setTimeout=function(){return new E(I.call(setTimeout,g,arguments),clearTimeout)},B.setInterval=function(){return new E(I.call(setInterval,g,arguments),clearInterval)},B.clearTimeout=B.clearInterval=function(A){A&&A.close()},E.prototype.unref=E.prototype.ref=function(){},E.prototype.close=function(){this._clearFn.call(g,this._id)},B.enroll=function(A,B){clearTimeout(A._idleTimeoutId),A._idleTimeout=B},B.unenroll=function(A){clearTimeout(A._idleTimeoutId),A._idleTimeout=-1},B._unrefActive=B.active=function(A){clearTimeout(A._idleTimeoutId);var B=A._idleTimeout;B>=0&&(A._idleTimeoutId=setTimeout((function(){A._onTimeout&&A._onTimeout()}),B))},Q(124),B.setImmediate="undefined"!=typeof self&&self.setImmediate||void 0!==A&&A.setImmediate||this&&this.setImmediate,B.clearImmediate="undefined"!=typeof self&&self.clearImmediate||void 0!==A&&A.clearImmediate||this&&this.clearImmediate}).call(this,Q(4))},function(A,B,Q){(function(A,B){!function(A,Q){"use strict";if(!A.setImmediate){var g,I,E,i,C,t=1,e={},o=!1,s=A.document,r=Object.getPrototypeOf&&Object.getPrototypeOf(A);r=r&&r.setTimeout?r:A,"[object process]"==={}.toString.call(A.process)?g=function(A){B.nextTick((function(){n(A)}))}:!function(){if(A.postMessage&&!A.importScripts){var B=!0,Q=A.onmessage;return A.onmessage=function(){B=!1},A.postMessage("","*"),A.onmessage=Q,B}}()?A.MessageChannel?((E=new MessageChannel).port1.onmessage=function(A){n(A.data)},g=function(A){E.port2.postMessage(A)}):s&&"onreadystatechange"in s.createElement("script")?(I=s.documentElement,g=function(A){var B=s.createElement("script");B.onreadystatechange=function(){n(A),B.onreadystatechange=null,I.removeChild(B),B=null},I.appendChild(B)}):g=function(A){setTimeout(n,0,A)}:(i="setImmediate$"+Math.random()+"$",C=function(B){B.source===A&&"string"==typeof B.data&&0===B.data.indexOf(i)&&n(+B.data.slice(i.length))},A.addEventListener?A.addEventListener("message",C,!1):A.attachEvent("onmessage",C),g=function(B){A.postMessage(i+B,"*")}),r.setImmediate=function(A){"function"!=typeof A&&(A=new Function(""+A));for(var B=new Array(arguments.length-1),Q=0;Q<B.length;Q++)B[Q]=arguments[Q+1];var I={callback:A,args:B};return e[t]=I,g(t),t++},r.clearImmediate=h}function h(A){delete e[A]}function n(A){if(o)setTimeout(n,0,A);else{var B=e[A];if(B){o=!0;try{!function(A){var B=A.callback,Q=A.args;switch(Q.length){case 0:B();break;case 1:B(Q[0]);break;case 2:B(Q[0],Q[1]);break;case 3:B(Q[0],Q[1],Q[2]);break;default:B.apply(void 0,Q)}}(B)}finally{h(A),o=!1}}}}}("undefined"==typeof self?void 0===A?this:A:self)}).call(this,Q(4),Q(3))},function(A,B,Q){"use strict";A.exports=E;var g=Q(62),I=Object.create(Q(21));function E(A){if(!(this instanceof E))return new E(A);g.call(this,A)}I.inherits=Q(0),I.inherits(E,g),E.prototype._transform=function(A,B,Q){Q(null,A)}},function(A,B,Q){A.exports=Q(37)},function(A,B,Q){A.exports=Q(13)},function(A,B,Q){A.exports=Q(36).Transform},function(A,B,Q){A.exports=Q(36).PassThrough},function(A,B,Q){"use strict";var g=Q(0),I=Q(1).Buffer,E=Q(9),i=I.alloc(128);function C(A,B){E.call(this,"digest"),"string"==typeof B&&(B=I.from(B)),this._alg=A,this._key=B,B.length>64?B=A(B):B.length<64&&(B=I.concat([B,i],64));for(var Q=this._ipad=I.allocUnsafe(64),g=this._opad=I.allocUnsafe(64),C=0;C<64;C++)Q[C]=54^B[C],g[C]=92^B[C];this._hash=[Q]}g(C,E),C.prototype._update=function(A){this._hash.push(A)},C.prototype._final=function(){var A=this._alg(I.concat(this._hash));return this._alg(I.concat([this._opad,A]))},A.exports=C},function(A,B,Q){A.exports=Q(65)},function(A,B,Q){(function(B,g){var I,E=Q(67),i=Q(68),C=Q(69),t=Q(1).Buffer,e=B.crypto&&B.crypto.subtle,o={sha:"SHA-1","sha-1":"SHA-1",sha1:"SHA-1",sha256:"SHA-256","sha-256":"SHA-256",sha384:"SHA-384","sha-384":"SHA-384","sha-512":"SHA-512",sha512:"SHA-512"},s=[];function r(A,B,Q,g,I){return e.importKey("raw",A,{name:"PBKDF2"},!1,["deriveBits"]).then((function(A){return e.deriveBits({name:"PBKDF2",salt:B,iterations:Q,hash:{name:I}},A,g<<3)})).then((function(A){return t.from(A)}))}A.exports=function(A,Q,h,n,a,c){"function"==typeof a&&(c=a,a=void 0);var y=o[(a=a||"sha1").toLowerCase()];if(!y||"function"!=typeof B.Promise)return g.nextTick((function(){var B;try{B=C(A,Q,h,n,a)}catch(A){return c(A)}c(null,B)}));if(E(A,Q,h,n),"function"!=typeof c)throw new Error("No callback provided to pbkdf2");t.isBuffer(A)||(A=t.from(A,i)),t.isBuffer(Q)||(Q=t.from(Q,i)),function(A,B){A.then((function(A){g.nextTick((function(){B(null,A)}))}),(function(A){g.nextTick((function(){B(A)}))}))}(function(A){if(B.process&&!B.process.browser)return Promise.resolve(!1);if(!e||!e.importKey||!e.deriveBits)return Promise.resolve(!1);if(void 0!==s[A])return s[A];var Q=r(I=I||t.alloc(8),I,10,128,A).then((function(){return!0})).catch((function(){return!1}));return s[A]=Q,Q}(y).then((function(B){return B?r(A,Q,h,n,y):C(A,Q,h,n,a)})),c)}}).call(this,Q(4),Q(3))},function(A,B,Q){var g=Q(134),I=Q(39),E=Q(40),i=Q(147),C=Q(28);function t(A,B,Q){if(A=A.toLowerCase(),E[A])return I.createCipheriv(A,B,Q);if(i[A])return new g({key:B,iv:Q,mode:A});throw new TypeError("invalid suite type")}function e(A,B,Q){if(A=A.toLowerCase(),E[A])return I.createDecipheriv(A,B,Q);if(i[A])return new g({key:B,iv:Q,mode:A,decrypt:!0});throw new TypeError("invalid suite type")}B.createCipher=B.Cipher=function(A,B){var Q,g;if(A=A.toLowerCase(),E[A])Q=E[A].key,g=E[A].iv;else{if(!i[A])throw new TypeError("invalid suite type");Q=8*i[A].key,g=i[A].iv}var I=C(B,!1,Q,g);return t(A,I.key,I.iv)},B.createCipheriv=B.Cipheriv=t,B.createDecipher=B.Decipher=function(A,B){var Q,g;if(A=A.toLowerCase(),E[A])Q=E[A].key,g=E[A].iv;else{if(!i[A])throw new TypeError("invalid suite type");Q=8*i[A].key,g=i[A].iv}var I=C(B,!1,Q,g);return e(A,I.key,I.iv)},B.createDecipheriv=B.Decipheriv=e,B.listCiphers=B.getCiphers=function(){return Object.keys(i).concat(I.getCiphers())}},function(A,B,Q){var g=Q(9),I=Q(135),E=Q(0),i=Q(1).Buffer,C={"des-ede3-cbc":I.CBC.instantiate(I.EDE),"des-ede3":I.EDE,"des-ede-cbc":I.CBC.instantiate(I.EDE),"des-ede":I.EDE,"des-cbc":I.CBC.instantiate(I.DES),"des-ecb":I.DES};function t(A){g.call(this);var B,Q=A.mode.toLowerCase(),I=C[Q];B=A.decrypt?"decrypt":"encrypt";var E=A.key;i.isBuffer(E)||(E=i.from(E)),"des-ede"!==Q&&"des-ede-cbc"!==Q||(E=i.concat([E,E.slice(0,8)]));var t=A.iv;i.isBuffer(t)||(t=i.from(t)),this._des=I.create({key:E,iv:t,type:B})}C.des=C["des-cbc"],C.des3=C["des-ede3-cbc"],A.exports=t,E(t,g),t.prototype._update=function(A){return i.from(this._des.update(A))},t.prototype._final=function(){return i.from(this._des.final())}},function(A,B,Q){"use strict";B.utils=Q(70),B.Cipher=Q(38),B.DES=Q(71),B.CBC=Q(136),B.EDE=Q(137)},function(A,B,Q){"use strict";var g=Q(5),I=Q(0),E={};function i(A){g.equal(A.length,8,"Invalid IV length"),this.iv=new Array(8);for(var B=0;B<this.iv.length;B++)this.iv[B]=A[B]}B.instantiate=function(A){function B(B){A.call(this,B),this._cbcInit()}I(B,A);for(var Q=Object.keys(E),g=0;g<Q.length;g++){var i=Q[g];B.prototype[i]=E[i]}return B.create=function(A){return new B(A)},B},E._cbcInit=function(){var A=new i(this.options.iv);this._cbcState=A},E._update=function(A,B,Q,g){var I=this._cbcState,E=this.constructor.super_.prototype,i=I.iv;if("encrypt"===this.type){for(var C=0;C<this.blockSize;C++)i[C]^=A[B+C];E._update.call(this,i,0,Q,g);for(C=0;C<this.blockSize;C++)i[C]=Q[g+C]}else{E._update.call(this,A,B,Q,g);for(C=0;C<this.blockSize;C++)Q[g+C]^=i[C];for(C=0;C<this.blockSize;C++)i[C]=A[B+C]}}},function(A,B,Q){"use strict";var g=Q(5),I=Q(0),E=Q(38),i=Q(71);function C(A,B){g.equal(B.length,24,"Invalid key length");var Q=B.slice(0,8),I=B.slice(8,16),E=B.slice(16,24);this.ciphers="encrypt"===A?[i.create({type:"encrypt",key:Q}),i.create({type:"decrypt",key:I}),i.create({type:"encrypt",key:E})]:[i.create({type:"decrypt",key:E}),i.create({type:"encrypt",key:I}),i.create({type:"decrypt",key:Q})]}function t(A){E.call(this,A);var B=new C(this.type,this.options.key);this._edeState=B}I(t,E),A.exports=t,t.create=function(A){return new t(A)},t.prototype._update=function(A,B,Q,g){var I=this._edeState;I.ciphers[0]._update(A,B,Q,g),I.ciphers[1]._update(Q,g,Q,g),I.ciphers[2]._update(Q,g,Q,g)},t.prototype._pad=i.prototype._pad,t.prototype._unpad=i.prototype._unpad},function(A,B,Q){var g=Q(40),I=Q(75),E=Q(1).Buffer,i=Q(76),C=Q(9),t=Q(27),e=Q(28);function o(A,B,Q){C.call(this),this._cache=new r,this._cipher=new t.AES(B),this._prev=E.from(Q),this._mode=A,this._autopadding=!0}Q(0)(o,C),o.prototype._update=function(A){var B,Q;this._cache.add(A);for(var g=[];B=this._cache.get();)Q=this._mode.encrypt(this,B),g.push(Q);return E.concat(g)};var s=E.alloc(16,16);function r(){this.cache=E.allocUnsafe(0)}function h(A,B,Q){var C=g[A.toLowerCase()];if(!C)throw new TypeError("invalid suite type");if("string"==typeof B&&(B=E.from(B)),B.length!==C.key/8)throw new TypeError("invalid key length "+B.length);if("string"==typeof Q&&(Q=E.from(Q)),"GCM"!==C.mode&&Q.length!==C.iv)throw new TypeError("invalid iv length "+Q.length);return"stream"===C.type?new i(C.module,B,Q):"auth"===C.type?new I(C.module,B,Q):new o(C.module,B,Q)}o.prototype._final=function(){var A=this._cache.flush();if(this._autopadding)return A=this._mode.encrypt(this,A),this._cipher.scrub(),A;if(!A.equals(s))throw this._cipher.scrub(),new Error("data not multiple of block length")},o.prototype.setAutoPadding=function(A){return this._autopadding=!!A,this},r.prototype.add=function(A){this.cache=E.concat([this.cache,A])},r.prototype.get=function(){if(this.cache.length>15){var A=this.cache.slice(0,16);return this.cache=this.cache.slice(16),A}return null},r.prototype.flush=function(){for(var A=16-this.cache.length,B=E.allocUnsafe(A),Q=-1;++Q<A;)B.writeUInt8(A,Q);return E.concat([this.cache,B])},B.createCipheriv=h,B.createCipher=function(A,B){var Q=g[A.toLowerCase()];if(!Q)throw new TypeError("invalid suite type");var I=e(B,!1,Q.key,Q.iv);return h(A,I.key,I.iv)}},function(A,B){B.encrypt=function(A,B){return A._cipher.encryptBlock(B)},B.decrypt=function(A,B){return A._cipher.decryptBlock(B)}},function(A,B,Q){var g=Q(22);B.encrypt=function(A,B){var Q=g(B,A._prev);return A._prev=A._cipher.encryptBlock(Q),A._prev},B.decrypt=function(A,B){var Q=A._prev;A._prev=B;var I=A._cipher.decryptBlock(B);return g(I,Q)}},function(A,B,Q){var g=Q(1).Buffer,I=Q(22);function E(A,B,Q){var E=B.length,i=I(B,A._cache);return A._cache=A._cache.slice(E),A._prev=g.concat([A._prev,Q?B:i]),i}B.encrypt=function(A,B,Q){for(var I,i=g.allocUnsafe(0);B.length;){if(0===A._cache.length&&(A._cache=A._cipher.encryptBlock(A._prev),A._prev=g.allocUnsafe(0)),!(A._cache.length<=B.length)){i=g.concat([i,E(A,B,Q)]);break}I=A._cache.length,i=g.concat([i,E(A,B.slice(0,I),Q)]),B=B.slice(I)}return i}},function(A,B,Q){var g=Q(1).Buffer;function I(A,B,Q){var I=A._cipher.encryptBlock(A._prev)[0]^B;return A._prev=g.concat([A._prev.slice(1),g.from([Q?B:I])]),I}B.encrypt=function(A,B,Q){for(var E=B.length,i=g.allocUnsafe(E),C=-1;++C<E;)i[C]=I(A,B[C],Q);return i}},function(A,B,Q){var g=Q(1).Buffer;function I(A,B,Q){for(var g,I,i=-1,C=0;++i<8;)g=B&1<<7-i?128:0,C+=(128&(I=A._cipher.encryptBlock(A._prev)[0]^g))>>i%8,A._prev=E(A._prev,Q?g:I);return C}function E(A,B){var Q=A.length,I=-1,E=g.allocUnsafe(A.length);for(A=g.concat([A,g.from([B])]);++I<Q;)E[I]=A[I]<<1|A[I+1]>>7;return E}B.encrypt=function(A,B,Q){for(var E=B.length,i=g.allocUnsafe(E),C=-1;++C<E;)i[C]=I(A,B[C],Q);return i}},function(A,B,Q){(function(A){var g=Q(22);function I(A){return A._prev=A._cipher.encryptBlock(A._prev),A._prev}B.encrypt=function(B,Q){for(;B._cache.length<Q.length;)B._cache=A.concat([B._cache,I(B)]);var E=B._cache.slice(0,Q.length);return B._cache=B._cache.slice(Q.length),g(Q,E)}}).call(this,Q(2).Buffer)},function(A,B,Q){var g=Q(1).Buffer,I=g.alloc(16,0);function E(A){var B=g.allocUnsafe(16);return B.writeUInt32BE(A[0]>>>0,0),B.writeUInt32BE(A[1]>>>0,4),B.writeUInt32BE(A[2]>>>0,8),B.writeUInt32BE(A[3]>>>0,12),B}function i(A){this.h=A,this.state=g.alloc(16,0),this.cache=g.allocUnsafe(0)}i.prototype.ghash=function(A){for(var B=-1;++B<A.length;)this.state[B]^=A[B];this._multiply()},i.prototype._multiply=function(){for(var A,B,Q,g=[(A=this.h).readUInt32BE(0),A.readUInt32BE(4),A.readUInt32BE(8),A.readUInt32BE(12)],I=[0,0,0,0],i=-1;++i<128;){for(0!=(this.state[~~(i/8)]&1<<7-i%8)&&(I[0]^=g[0],I[1]^=g[1],I[2]^=g[2],I[3]^=g[3]),Q=0!=(1&g[3]),B=3;B>0;B--)g[B]=g[B]>>>1|(1&g[B-1])<<31;g[0]=g[0]>>>1,Q&&(g[0]=g[0]^225<<24)}this.state=E(I)},i.prototype.update=function(A){var B;for(this.cache=g.concat([this.cache,A]);this.cache.length>=16;)B=this.cache.slice(0,16),this.cache=this.cache.slice(16),this.ghash(B)},i.prototype.final=function(A,B){return this.cache.length&&this.ghash(g.concat([this.cache,I],16)),this.ghash(E([0,A,0,B])),this.state},A.exports=i},function(A,B,Q){var g=Q(75),I=Q(1).Buffer,E=Q(40),i=Q(76),C=Q(9),t=Q(27),e=Q(28);function o(A,B,Q){C.call(this),this._cache=new s,this._last=void 0,this._cipher=new t.AES(B),this._prev=I.from(Q),this._mode=A,this._autopadding=!0}function s(){this.cache=I.allocUnsafe(0)}function r(A,B,Q){var C=E[A.toLowerCase()];if(!C)throw new TypeError("invalid suite type");if("string"==typeof Q&&(Q=I.from(Q)),"GCM"!==C.mode&&Q.length!==C.iv)throw new TypeError("invalid iv length "+Q.length);if("string"==typeof B&&(B=I.from(B)),B.length!==C.key/8)throw new TypeError("invalid key length "+B.length);return"stream"===C.type?new i(C.module,B,Q,!0):"auth"===C.type?new g(C.module,B,Q,!0):new o(C.module,B,Q)}Q(0)(o,C),o.prototype._update=function(A){var B,Q;this._cache.add(A);for(var g=[];B=this._cache.get(this._autopadding);)Q=this._mode.decrypt(this,B),g.push(Q);return I.concat(g)},o.prototype._final=function(){var A=this._cache.flush();if(this._autopadding)return function(A){var B=A[15];if(B<1||B>16)throw new Error("unable to decrypt data");var Q=-1;for(;++Q<B;)if(A[Q+(16-B)]!==B)throw new Error("unable to decrypt data");if(16===B)return;return A.slice(0,16-B)}(this._mode.decrypt(this,A));if(A)throw new Error("data not multiple of block length")},o.prototype.setAutoPadding=function(A){return this._autopadding=!!A,this},s.prototype.add=function(A){this.cache=I.concat([this.cache,A])},s.prototype.get=function(A){var B;if(A){if(this.cache.length>16)return B=this.cache.slice(0,16),this.cache=this.cache.slice(16),B}else if(this.cache.length>=16)return B=this.cache.slice(0,16),this.cache=this.cache.slice(16),B;return null},s.prototype.flush=function(){if(this.cache.length)return this.cache},B.createDecipher=function(A,B){var Q=E[A.toLowerCase()];if(!Q)throw new TypeError("invalid suite type");var g=e(B,!1,Q.key,Q.iv);return r(A,g.key,g.iv)},B.createDecipheriv=r},function(A,B){B["des-ecb"]={key:8,iv:0},B["des-cbc"]=B.des={key:8,iv:8},B["des-ede3-cbc"]=B.des3={key:24,iv:8},B["des-ede3"]={key:24,iv:0},B["des-ede-cbc"]={key:16,iv:8},B["des-ede"]={key:16,iv:0}},function(A,B,Q){(function(A){var g=Q(77),I=Q(153),E=Q(154);var i={binary:!0,hex:!0,base64:!0};B.DiffieHellmanGroup=B.createDiffieHellmanGroup=B.getDiffieHellman=function(B){var Q=new A(I[B].prime,"hex"),g=new A(I[B].gen,"hex");return new E(Q,g)},B.createDiffieHellman=B.DiffieHellman=function B(Q,I,C,t){return A.isBuffer(I)||void 0===i[I]?B(Q,"binary",I,C):(I=I||"binary",t=t||"binary",C=C||new A([2]),A.isBuffer(C)||(C=new A(C,t)),"number"==typeof Q?new E(g(Q,C),C,!0):(A.isBuffer(Q)||(Q=new A(Q,I)),new E(Q,C,!0)))}}).call(this,Q(2).Buffer)},function(A,B){},function(A,B,Q){(function(A){!function(A,B){"use strict";function g(A,B){if(!A)throw new Error(B||"Assertion failed")}function I(A,B){A.super_=B;var Q=function(){};Q.prototype=B.prototype,A.prototype=new Q,A.prototype.constructor=A}function E(A,B,Q){if(E.isBN(A))return A;this.negative=0,this.words=null,this.length=0,this.red=null,null!==A&&("le"!==B&&"be"!==B||(Q=B,B=10),this._init(A||0,B||10,Q||"be"))}var i;"object"==typeof A?A.exports=E:B.BN=E,E.BN=E,E.wordSize=26;try{i=Q(151).Buffer}catch(A){}function C(A,B,Q){for(var g=0,I=Math.min(A.length,Q),E=B;E<I;E++){var i=A.charCodeAt(E)-48;g<<=4,g|=i>=49&&i<=54?i-49+10:i>=17&&i<=22?i-17+10:15&i}return g}function t(A,B,Q,g){for(var I=0,E=Math.min(A.length,Q),i=B;i<E;i++){var C=A.charCodeAt(i)-48;I*=g,I+=C>=49?C-49+10:C>=17?C-17+10:C}return I}E.isBN=function(A){return A instanceof E||null!==A&&"object"==typeof A&&A.constructor.wordSize===E.wordSize&&Array.isArray(A.words)},E.max=function(A,B){return A.cmp(B)>0?A:B},E.min=function(A,B){return A.cmp(B)<0?A:B},E.prototype._init=function(A,B,Q){if("number"==typeof A)return this._initNumber(A,B,Q);if("object"==typeof A)return this._initArray(A,B,Q);"hex"===B&&(B=16),g(B===(0|B)&&B>=2&&B<=36);var I=0;"-"===(A=A.toString().replace(/\s+/g,""))[0]&&I++,16===B?this._parseHex(A,I):this._parseBase(A,B,I),"-"===A[0]&&(this.negative=1),this.strip(),"le"===Q&&this._initArray(this.toArray(),B,Q)},E.prototype._initNumber=function(A,B,Q){A<0&&(this.negative=1,A=-A),A<67108864?(this.words=[67108863&A],this.length=1):A<4503599627370496?(this.words=[67108863&A,A/67108864&67108863],this.length=2):(g(A<9007199254740992),this.words=[67108863&A,A/67108864&67108863,1],this.length=3),"le"===Q&&this._initArray(this.toArray(),B,Q)},E.prototype._initArray=function(A,B,Q){if(g("number"==typeof A.length),A.length<=0)return this.words=[0],this.length=1,this;this.length=Math.ceil(A.length/3),this.words=new Array(this.length);for(var I=0;I<this.length;I++)this.words[I]=0;var E,i,C=0;if("be"===Q)for(I=A.length-1,E=0;I>=0;I-=3)i=A[I]|A[I-1]<<8|A[I-2]<<16,this.words[E]|=i<<C&67108863,this.words[E+1]=i>>>26-C&67108863,(C+=24)>=26&&(C-=26,E++);else if("le"===Q)for(I=0,E=0;I<A.length;I+=3)i=A[I]|A[I+1]<<8|A[I+2]<<16,this.words[E]|=i<<C&67108863,this.words[E+1]=i>>>26-C&67108863,(C+=24)>=26&&(C-=26,E++);return this.strip()},E.prototype._parseHex=function(A,B){this.length=Math.ceil((A.length-B)/6),this.words=new Array(this.length);for(var Q=0;Q<this.length;Q++)this.words[Q]=0;var g,I,E=0;for(Q=A.length-6,g=0;Q>=B;Q-=6)I=C(A,Q,Q+6),this.words[g]|=I<<E&67108863,this.words[g+1]|=I>>>26-E&4194303,(E+=24)>=26&&(E-=26,g++);Q+6!==B&&(I=C(A,B,Q+6),this.words[g]|=I<<E&67108863,this.words[g+1]|=I>>>26-E&4194303),this.strip()},E.prototype._parseBase=function(A,B,Q){this.words=[0],this.length=1;for(var g=0,I=1;I<=67108863;I*=B)g++;g--,I=I/B|0;for(var E=A.length-Q,i=E%g,C=Math.min(E,E-i)+Q,e=0,o=Q;o<C;o+=g)e=t(A,o,o+g,B),this.imuln(I),this.words[0]+e<67108864?this.words[0]+=e:this._iaddn(e);if(0!==i){var s=1;for(e=t(A,o,A.length,B),o=0;o<i;o++)s*=B;this.imuln(s),this.words[0]+e<67108864?this.words[0]+=e:this._iaddn(e)}},E.prototype.copy=function(A){A.words=new Array(this.length);for(var B=0;B<this.length;B++)A.words[B]=this.words[B];A.length=this.length,A.negative=this.negative,A.red=this.red},E.prototype.clone=function(){var A=new E(null);return this.copy(A),A},E.prototype._expand=function(A){for(;this.length<A;)this.words[this.length++]=0;return this},E.prototype.strip=function(){for(;this.length>1&&0===this.words[this.length-1];)this.length--;return this._normSign()},E.prototype._normSign=function(){return 1===this.length&&0===this.words[0]&&(this.negative=0),this},E.prototype.inspect=function(){return(this.red?"<BN-R: ":"<BN: ")+this.toString(16)+">"};var e=["","0","00","000","0000","00000","000000","0000000","00000000","000000000","0000000000","00000000000","000000000000","0000000000000","00000000000000","000000000000000","0000000000000000","00000000000000000","000000000000000000","0000000000000000000","00000000000000000000","000000000000000000000","0000000000000000000000","00000000000000000000000","000000000000000000000000","0000000000000000000000000"],o=[0,0,25,16,12,11,10,9,8,8,7,7,7,7,6,6,6,6,6,6,6,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],s=[0,0,33554432,43046721,16777216,48828125,60466176,40353607,16777216,43046721,1e7,19487171,35831808,62748517,7529536,11390625,16777216,24137569,34012224,47045881,64e6,4084101,5153632,6436343,7962624,9765625,11881376,14348907,17210368,20511149,243e5,28629151,33554432,39135393,45435424,52521875,60466176];function r(A,B,Q){Q.negative=B.negative^A.negative;var g=A.length+B.length|0;Q.length=g,g=g-1|0;var I=0|A.words[0],E=0|B.words[0],i=I*E,C=67108863&i,t=i/67108864|0;Q.words[0]=C;for(var e=1;e<g;e++){for(var o=t>>>26,s=67108863&t,r=Math.min(e,B.length-1),h=Math.max(0,e-A.length+1);h<=r;h++){var n=e-h|0;o+=(i=(I=0|A.words[n])*(E=0|B.words[h])+s)/67108864|0,s=67108863&i}Q.words[e]=0|s,t=0|o}return 0!==t?Q.words[e]=0|t:Q.length--,Q.strip()}E.prototype.toString=function(A,B){var Q;if(B=0|B||1,16===(A=A||10)||"hex"===A){Q="";for(var I=0,E=0,i=0;i<this.length;i++){var C=this.words[i],t=(16777215&(C<<I|E)).toString(16);Q=0!==(E=C>>>24-I&16777215)||i!==this.length-1?e[6-t.length]+t+Q:t+Q,(I+=2)>=26&&(I-=26,i--)}for(0!==E&&(Q=E.toString(16)+Q);Q.length%B!=0;)Q="0"+Q;return 0!==this.negative&&(Q="-"+Q),Q}if(A===(0|A)&&A>=2&&A<=36){var r=o[A],h=s[A];Q="";var n=this.clone();for(n.negative=0;!n.isZero();){var a=n.modn(h).toString(A);Q=(n=n.idivn(h)).isZero()?a+Q:e[r-a.length]+a+Q}for(this.isZero()&&(Q="0"+Q);Q.length%B!=0;)Q="0"+Q;return 0!==this.negative&&(Q="-"+Q),Q}g(!1,"Base should be between 2 and 36")},E.prototype.toNumber=function(){var A=this.words[0];return 2===this.length?A+=67108864*this.words[1]:3===this.length&&1===this.words[2]?A+=4503599627370496+67108864*this.words[1]:this.length>2&&g(!1,"Number can only safely store up to 53 bits"),0!==this.negative?-A:A},E.prototype.toJSON=function(){return this.toString(16)},E.prototype.toBuffer=function(A,B){return g(void 0!==i),this.toArrayLike(i,A,B)},E.prototype.toArray=function(A,B){return this.toArrayLike(Array,A,B)},E.prototype.toArrayLike=function(A,B,Q){var I=this.byteLength(),E=Q||Math.max(1,I);g(I<=E,"byte array longer than desired length"),g(E>0,"Requested array length <= 0"),this.strip();var i,C,t="le"===B,e=new A(E),o=this.clone();if(t){for(C=0;!o.isZero();C++)i=o.andln(255),o.iushrn(8),e[C]=i;for(;C<E;C++)e[C]=0}else{for(C=0;C<E-I;C++)e[C]=0;for(C=0;!o.isZero();C++)i=o.andln(255),o.iushrn(8),e[E-C-1]=i}return e},Math.clz32?E.prototype._countBits=function(A){return 32-Math.clz32(A)}:E.prototype._countBits=function(A){var B=A,Q=0;return B>=4096&&(Q+=13,B>>>=13),B>=64&&(Q+=7,B>>>=7),B>=8&&(Q+=4,B>>>=4),B>=2&&(Q+=2,B>>>=2),Q+B},E.prototype._zeroBits=function(A){if(0===A)return 26;var B=A,Q=0;return 0==(8191&B)&&(Q+=13,B>>>=13),0==(127&B)&&(Q+=7,B>>>=7),0==(15&B)&&(Q+=4,B>>>=4),0==(3&B)&&(Q+=2,B>>>=2),0==(1&B)&&Q++,Q},E.prototype.bitLength=function(){var A=this.words[this.length-1],B=this._countBits(A);return 26*(this.length-1)+B},E.prototype.zeroBits=function(){if(this.isZero())return 0;for(var A=0,B=0;B<this.length;B++){var Q=this._zeroBits(this.words[B]);if(A+=Q,26!==Q)break}return A},E.prototype.byteLength=function(){return Math.ceil(this.bitLength()/8)},E.prototype.toTwos=function(A){return 0!==this.negative?this.abs().inotn(A).iaddn(1):this.clone()},E.prototype.fromTwos=function(A){return this.testn(A-1)?this.notn(A).iaddn(1).ineg():this.clone()},E.prototype.isNeg=function(){return 0!==this.negative},E.prototype.neg=function(){return this.clone().ineg()},E.prototype.ineg=function(){return this.isZero()||(this.negative^=1),this},E.prototype.iuor=function(A){for(;this.length<A.length;)this.words[this.length++]=0;for(var B=0;B<A.length;B++)this.words[B]=this.words[B]|A.words[B];return this.strip()},E.prototype.ior=function(A){return g(0==(this.negative|A.negative)),this.iuor(A)},E.prototype.or=function(A){return this.length>A.length?this.clone().ior(A):A.clone().ior(this)},E.prototype.uor=function(A){return this.length>A.length?this.clone().iuor(A):A.clone().iuor(this)},E.prototype.iuand=function(A){var B;B=this.length>A.length?A:this;for(var Q=0;Q<B.length;Q++)this.words[Q]=this.words[Q]&A.words[Q];return this.length=B.length,this.strip()},E.prototype.iand=function(A){return g(0==(this.negative|A.negative)),this.iuand(A)},E.prototype.and=function(A){return this.length>A.length?this.clone().iand(A):A.clone().iand(this)},E.prototype.uand=function(A){return this.length>A.length?this.clone().iuand(A):A.clone().iuand(this)},E.prototype.iuxor=function(A){var B,Q;this.length>A.length?(B=this,Q=A):(B=A,Q=this);for(var g=0;g<Q.length;g++)this.words[g]=B.words[g]^Q.words[g];if(this!==B)for(;g<B.length;g++)this.words[g]=B.words[g];return this.length=B.length,this.strip()},E.prototype.ixor=function(A){return g(0==(this.negative|A.negative)),this.iuxor(A)},E.prototype.xor=function(A){return this.length>A.length?this.clone().ixor(A):A.clone().ixor(this)},E.prototype.uxor=function(A){return this.length>A.length?this.clone().iuxor(A):A.clone().iuxor(this)},E.prototype.inotn=function(A){g("number"==typeof A&&A>=0);var B=0|Math.ceil(A/26),Q=A%26;this._expand(B),Q>0&&B--;for(var I=0;I<B;I++)this.words[I]=67108863&~this.words[I];return Q>0&&(this.words[I]=~this.words[I]&67108863>>26-Q),this.strip()},E.prototype.notn=function(A){return this.clone().inotn(A)},E.prototype.setn=function(A,B){g("number"==typeof A&&A>=0);var Q=A/26|0,I=A%26;return this._expand(Q+1),this.words[Q]=B?this.words[Q]|1<<I:this.words[Q]&~(1<<I),this.strip()},E.prototype.iadd=function(A){var B,Q,g;if(0!==this.negative&&0===A.negative)return this.negative=0,B=this.isub(A),this.negative^=1,this._normSign();if(0===this.negative&&0!==A.negative)return A.negative=0,B=this.isub(A),A.negative=1,B._normSign();this.length>A.length?(Q=this,g=A):(Q=A,g=this);for(var I=0,E=0;E<g.length;E++)B=(0|Q.words[E])+(0|g.words[E])+I,this.words[E]=67108863&B,I=B>>>26;for(;0!==I&&E<Q.length;E++)B=(0|Q.words[E])+I,this.words[E]=67108863&B,I=B>>>26;if(this.length=Q.length,0!==I)this.words[this.length]=I,this.length++;else if(Q!==this)for(;E<Q.length;E++)this.words[E]=Q.words[E];return this},E.prototype.add=function(A){var B;return 0!==A.negative&&0===this.negative?(A.negative=0,B=this.sub(A),A.negative^=1,B):0===A.negative&&0!==this.negative?(this.negative=0,B=A.sub(this),this.negative=1,B):this.length>A.length?this.clone().iadd(A):A.clone().iadd(this)},E.prototype.isub=function(A){if(0!==A.negative){A.negative=0;var B=this.iadd(A);return A.negative=1,B._normSign()}if(0!==this.negative)return this.negative=0,this.iadd(A),this.negative=1,this._normSign();var Q,g,I=this.cmp(A);if(0===I)return this.negative=0,this.length=1,this.words[0]=0,this;I>0?(Q=this,g=A):(Q=A,g=this);for(var E=0,i=0;i<g.length;i++)E=(B=(0|Q.words[i])-(0|g.words[i])+E)>>26,this.words[i]=67108863&B;for(;0!==E&&i<Q.length;i++)E=(B=(0|Q.words[i])+E)>>26,this.words[i]=67108863&B;if(0===E&&i<Q.length&&Q!==this)for(;i<Q.length;i++)this.words[i]=Q.words[i];return this.length=Math.max(this.length,i),Q!==this&&(this.negative=1),this.strip()},E.prototype.sub=function(A){return this.clone().isub(A)};var h=function(A,B,Q){var g,I,E,i=A.words,C=B.words,t=Q.words,e=0,o=0|i[0],s=8191&o,r=o>>>13,h=0|i[1],n=8191&h,a=h>>>13,c=0|i[2],y=8191&c,D=c>>>13,u=0|i[3],f=8191&u,w=u>>>13,F=0|i[4],d=8191&F,l=F>>>13,U=0|i[5],N=8191&U,H=U>>>13,G=0|i[6],Y=8191&G,L=G>>>13,R=0|i[7],p=8191&R,M=R>>>13,m=0|i[8],k=8191&m,S=m>>>13,b=0|i[9],v=8191&b,J=b>>>13,V=0|C[0],K=8191&V,x=V>>>13,Z=0|C[1],q=8191&Z,O=Z>>>13,j=0|C[2],W=8191&j,X=j>>>13,T=0|C[3],z=8191&T,_=T>>>13,P=0|C[4],$=8191&P,AA=P>>>13,BA=0|C[5],QA=8191&BA,gA=BA>>>13,IA=0|C[6],EA=8191&IA,iA=IA>>>13,CA=0|C[7],tA=8191&CA,eA=CA>>>13,oA=0|C[8],sA=8191&oA,rA=oA>>>13,hA=0|C[9],nA=8191&hA,aA=hA>>>13;Q.negative=A.negative^B.negative,Q.length=19;var cA=(e+(g=Math.imul(s,K))|0)+((8191&(I=(I=Math.imul(s,x))+Math.imul(r,K)|0))<<13)|0;e=((E=Math.imul(r,x))+(I>>>13)|0)+(cA>>>26)|0,cA&=67108863,g=Math.imul(n,K),I=(I=Math.imul(n,x))+Math.imul(a,K)|0,E=Math.imul(a,x);var yA=(e+(g=g+Math.imul(s,q)|0)|0)+((8191&(I=(I=I+Math.imul(s,O)|0)+Math.imul(r,q)|0))<<13)|0;e=((E=E+Math.imul(r,O)|0)+(I>>>13)|0)+(yA>>>26)|0,yA&=67108863,g=Math.imul(y,K),I=(I=Math.imul(y,x))+Math.imul(D,K)|0,E=Math.imul(D,x),g=g+Math.imul(n,q)|0,I=(I=I+Math.imul(n,O)|0)+Math.imul(a,q)|0,E=E+Math.imul(a,O)|0;var DA=(e+(g=g+Math.imul(s,W)|0)|0)+((8191&(I=(I=I+Math.imul(s,X)|0)+Math.imul(r,W)|0))<<13)|0;e=((E=E+Math.imul(r,X)|0)+(I>>>13)|0)+(DA>>>26)|0,DA&=67108863,g=Math.imul(f,K),I=(I=Math.imul(f,x))+Math.imul(w,K)|0,E=Math.imul(w,x),g=g+Math.imul(y,q)|0,I=(I=I+Math.imul(y,O)|0)+Math.imul(D,q)|0,E=E+Math.imul(D,O)|0,g=g+Math.imul(n,W)|0,I=(I=I+Math.imul(n,X)|0)+Math.imul(a,W)|0,E=E+Math.imul(a,X)|0;var uA=(e+(g=g+Math.imul(s,z)|0)|0)+((8191&(I=(I=I+Math.imul(s,_)|0)+Math.imul(r,z)|0))<<13)|0;e=((E=E+Math.imul(r,_)|0)+(I>>>13)|0)+(uA>>>26)|0,uA&=67108863,g=Math.imul(d,K),I=(I=Math.imul(d,x))+Math.imul(l,K)|0,E=Math.imul(l,x),g=g+Math.imul(f,q)|0,I=(I=I+Math.imul(f,O)|0)+Math.imul(w,q)|0,E=E+Math.imul(w,O)|0,g=g+Math.imul(y,W)|0,I=(I=I+Math.imul(y,X)|0)+Math.imul(D,W)|0,E=E+Math.imul(D,X)|0,g=g+Math.imul(n,z)|0,I=(I=I+Math.imul(n,_)|0)+Math.imul(a,z)|0,E=E+Math.imul(a,_)|0;var fA=(e+(g=g+Math.imul(s,$)|0)|0)+((8191&(I=(I=I+Math.imul(s,AA)|0)+Math.imul(r,$)|0))<<13)|0;e=((E=E+Math.imul(r,AA)|0)+(I>>>13)|0)+(fA>>>26)|0,fA&=67108863,g=Math.imul(N,K),I=(I=Math.imul(N,x))+Math.imul(H,K)|0,E=Math.imul(H,x),g=g+Math.imul(d,q)|0,I=(I=I+Math.imul(d,O)|0)+Math.imul(l,q)|0,E=E+Math.imul(l,O)|0,g=g+Math.imul(f,W)|0,I=(I=I+Math.imul(f,X)|0)+Math.imul(w,W)|0,E=E+Math.imul(w,X)|0,g=g+Math.imul(y,z)|0,I=(I=I+Math.imul(y,_)|0)+Math.imul(D,z)|0,E=E+Math.imul(D,_)|0,g=g+Math.imul(n,$)|0,I=(I=I+Math.imul(n,AA)|0)+Math.imul(a,$)|0,E=E+Math.imul(a,AA)|0;var wA=(e+(g=g+Math.imul(s,QA)|0)|0)+((8191&(I=(I=I+Math.imul(s,gA)|0)+Math.imul(r,QA)|0))<<13)|0;e=((E=E+Math.imul(r,gA)|0)+(I>>>13)|0)+(wA>>>26)|0,wA&=67108863,g=Math.imul(Y,K),I=(I=Math.imul(Y,x))+Math.imul(L,K)|0,E=Math.imul(L,x),g=g+Math.imul(N,q)|0,I=(I=I+Math.imul(N,O)|0)+Math.imul(H,q)|0,E=E+Math.imul(H,O)|0,g=g+Math.imul(d,W)|0,I=(I=I+Math.imul(d,X)|0)+Math.imul(l,W)|0,E=E+Math.imul(l,X)|0,g=g+Math.imul(f,z)|0,I=(I=I+Math.imul(f,_)|0)+Math.imul(w,z)|0,E=E+Math.imul(w,_)|0,g=g+Math.imul(y,$)|0,I=(I=I+Math.imul(y,AA)|0)+Math.imul(D,$)|0,E=E+Math.imul(D,AA)|0,g=g+Math.imul(n,QA)|0,I=(I=I+Math.imul(n,gA)|0)+Math.imul(a,QA)|0,E=E+Math.imul(a,gA)|0;var FA=(e+(g=g+Math.imul(s,EA)|0)|0)+((8191&(I=(I=I+Math.imul(s,iA)|0)+Math.imul(r,EA)|0))<<13)|0;e=((E=E+Math.imul(r,iA)|0)+(I>>>13)|0)+(FA>>>26)|0,FA&=67108863,g=Math.imul(p,K),I=(I=Math.imul(p,x))+Math.imul(M,K)|0,E=Math.imul(M,x),g=g+Math.imul(Y,q)|0,I=(I=I+Math.imul(Y,O)|0)+Math.imul(L,q)|0,E=E+Math.imul(L,O)|0,g=g+Math.imul(N,W)|0,I=(I=I+Math.imul(N,X)|0)+Math.imul(H,W)|0,E=E+Math.imul(H,X)|0,g=g+Math.imul(d,z)|0,I=(I=I+Math.imul(d,_)|0)+Math.imul(l,z)|0,E=E+Math.imul(l,_)|0,g=g+Math.imul(f,$)|0,I=(I=I+Math.imul(f,AA)|0)+Math.imul(w,$)|0,E=E+Math.imul(w,AA)|0,g=g+Math.imul(y,QA)|0,I=(I=I+Math.imul(y,gA)|0)+Math.imul(D,QA)|0,E=E+Math.imul(D,gA)|0,g=g+Math.imul(n,EA)|0,I=(I=I+Math.imul(n,iA)|0)+Math.imul(a,EA)|0,E=E+Math.imul(a,iA)|0;var dA=(e+(g=g+Math.imul(s,tA)|0)|0)+((8191&(I=(I=I+Math.imul(s,eA)|0)+Math.imul(r,tA)|0))<<13)|0;e=((E=E+Math.imul(r,eA)|0)+(I>>>13)|0)+(dA>>>26)|0,dA&=67108863,g=Math.imul(k,K),I=(I=Math.imul(k,x))+Math.imul(S,K)|0,E=Math.imul(S,x),g=g+Math.imul(p,q)|0,I=(I=I+Math.imul(p,O)|0)+Math.imul(M,q)|0,E=E+Math.imul(M,O)|0,g=g+Math.imul(Y,W)|0,I=(I=I+Math.imul(Y,X)|0)+Math.imul(L,W)|0,E=E+Math.imul(L,X)|0,g=g+Math.imul(N,z)|0,I=(I=I+Math.imul(N,_)|0)+Math.imul(H,z)|0,E=E+Math.imul(H,_)|0,g=g+Math.imul(d,$)|0,I=(I=I+Math.imul(d,AA)|0)+Math.imul(l,$)|0,E=E+Math.imul(l,AA)|0,g=g+Math.imul(f,QA)|0,I=(I=I+Math.imul(f,gA)|0)+Math.imul(w,QA)|0,E=E+Math.imul(w,gA)|0,g=g+Math.imul(y,EA)|0,I=(I=I+Math.imul(y,iA)|0)+Math.imul(D,EA)|0,E=E+Math.imul(D,iA)|0,g=g+Math.imul(n,tA)|0,I=(I=I+Math.imul(n,eA)|0)+Math.imul(a,tA)|0,E=E+Math.imul(a,eA)|0;var lA=(e+(g=g+Math.imul(s,sA)|0)|0)+((8191&(I=(I=I+Math.imul(s,rA)|0)+Math.imul(r,sA)|0))<<13)|0;e=((E=E+Math.imul(r,rA)|0)+(I>>>13)|0)+(lA>>>26)|0,lA&=67108863,g=Math.imul(v,K),I=(I=Math.imul(v,x))+Math.imul(J,K)|0,E=Math.imul(J,x),g=g+Math.imul(k,q)|0,I=(I=I+Math.imul(k,O)|0)+Math.imul(S,q)|0,E=E+Math.imul(S,O)|0,g=g+Math.imul(p,W)|0,I=(I=I+Math.imul(p,X)|0)+Math.imul(M,W)|0,E=E+Math.imul(M,X)|0,g=g+Math.imul(Y,z)|0,I=(I=I+Math.imul(Y,_)|0)+Math.imul(L,z)|0,E=E+Math.imul(L,_)|0,g=g+Math.imul(N,$)|0,I=(I=I+Math.imul(N,AA)|0)+Math.imul(H,$)|0,E=E+Math.imul(H,AA)|0,g=g+Math.imul(d,QA)|0,I=(I=I+Math.imul(d,gA)|0)+Math.imul(l,QA)|0,E=E+Math.imul(l,gA)|0,g=g+Math.imul(f,EA)|0,I=(I=I+Math.imul(f,iA)|0)+Math.imul(w,EA)|0,E=E+Math.imul(w,iA)|0,g=g+Math.imul(y,tA)|0,I=(I=I+Math.imul(y,eA)|0)+Math.imul(D,tA)|0,E=E+Math.imul(D,eA)|0,g=g+Math.imul(n,sA)|0,I=(I=I+Math.imul(n,rA)|0)+Math.imul(a,sA)|0,E=E+Math.imul(a,rA)|0;var UA=(e+(g=g+Math.imul(s,nA)|0)|0)+((8191&(I=(I=I+Math.imul(s,aA)|0)+Math.imul(r,nA)|0))<<13)|0;e=((E=E+Math.imul(r,aA)|0)+(I>>>13)|0)+(UA>>>26)|0,UA&=67108863,g=Math.imul(v,q),I=(I=Math.imul(v,O))+Math.imul(J,q)|0,E=Math.imul(J,O),g=g+Math.imul(k,W)|0,I=(I=I+Math.imul(k,X)|0)+Math.imul(S,W)|0,E=E+Math.imul(S,X)|0,g=g+Math.imul(p,z)|0,I=(I=I+Math.imul(p,_)|0)+Math.imul(M,z)|0,E=E+Math.imul(M,_)|0,g=g+Math.imul(Y,$)|0,I=(I=I+Math.imul(Y,AA)|0)+Math.imul(L,$)|0,E=E+Math.imul(L,AA)|0,g=g+Math.imul(N,QA)|0,I=(I=I+Math.imul(N,gA)|0)+Math.imul(H,QA)|0,E=E+Math.imul(H,gA)|0,g=g+Math.imul(d,EA)|0,I=(I=I+Math.imul(d,iA)|0)+Math.imul(l,EA)|0,E=E+Math.imul(l,iA)|0,g=g+Math.imul(f,tA)|0,I=(I=I+Math.imul(f,eA)|0)+Math.imul(w,tA)|0,E=E+Math.imul(w,eA)|0,g=g+Math.imul(y,sA)|0,I=(I=I+Math.imul(y,rA)|0)+Math.imul(D,sA)|0,E=E+Math.imul(D,rA)|0;var NA=(e+(g=g+Math.imul(n,nA)|0)|0)+((8191&(I=(I=I+Math.imul(n,aA)|0)+Math.imul(a,nA)|0))<<13)|0;e=((E=E+Math.imul(a,aA)|0)+(I>>>13)|0)+(NA>>>26)|0,NA&=67108863,g=Math.imul(v,W),I=(I=Math.imul(v,X))+Math.imul(J,W)|0,E=Math.imul(J,X),g=g+Math.imul(k,z)|0,I=(I=I+Math.imul(k,_)|0)+Math.imul(S,z)|0,E=E+Math.imul(S,_)|0,g=g+Math.imul(p,$)|0,I=(I=I+Math.imul(p,AA)|0)+Math.imul(M,$)|0,E=E+Math.imul(M,AA)|0,g=g+Math.imul(Y,QA)|0,I=(I=I+Math.imul(Y,gA)|0)+Math.imul(L,QA)|0,E=E+Math.imul(L,gA)|0,g=g+Math.imul(N,EA)|0,I=(I=I+Math.imul(N,iA)|0)+Math.imul(H,EA)|0,E=E+Math.imul(H,iA)|0,g=g+Math.imul(d,tA)|0,I=(I=I+Math.imul(d,eA)|0)+Math.imul(l,tA)|0,E=E+Math.imul(l,eA)|0,g=g+Math.imul(f,sA)|0,I=(I=I+Math.imul(f,rA)|0)+Math.imul(w,sA)|0,E=E+Math.imul(w,rA)|0;var HA=(e+(g=g+Math.imul(y,nA)|0)|0)+((8191&(I=(I=I+Math.imul(y,aA)|0)+Math.imul(D,nA)|0))<<13)|0;e=((E=E+Math.imul(D,aA)|0)+(I>>>13)|0)+(HA>>>26)|0,HA&=67108863,g=Math.imul(v,z),I=(I=Math.imul(v,_))+Math.imul(J,z)|0,E=Math.imul(J,_),g=g+Math.imul(k,$)|0,I=(I=I+Math.imul(k,AA)|0)+Math.imul(S,$)|0,E=E+Math.imul(S,AA)|0,g=g+Math.imul(p,QA)|0,I=(I=I+Math.imul(p,gA)|0)+Math.imul(M,QA)|0,E=E+Math.imul(M,gA)|0,g=g+Math.imul(Y,EA)|0,I=(I=I+Math.imul(Y,iA)|0)+Math.imul(L,EA)|0,E=E+Math.imul(L,iA)|0,g=g+Math.imul(N,tA)|0,I=(I=I+Math.imul(N,eA)|0)+Math.imul(H,tA)|0,E=E+Math.imul(H,eA)|0,g=g+Math.imul(d,sA)|0,I=(I=I+Math.imul(d,rA)|0)+Math.imul(l,sA)|0,E=E+Math.imul(l,rA)|0;var GA=(e+(g=g+Math.imul(f,nA)|0)|0)+((8191&(I=(I=I+Math.imul(f,aA)|0)+Math.imul(w,nA)|0))<<13)|0;e=((E=E+Math.imul(w,aA)|0)+(I>>>13)|0)+(GA>>>26)|0,GA&=67108863,g=Math.imul(v,$),I=(I=Math.imul(v,AA))+Math.imul(J,$)|0,E=Math.imul(J,AA),g=g+Math.imul(k,QA)|0,I=(I=I+Math.imul(k,gA)|0)+Math.imul(S,QA)|0,E=E+Math.imul(S,gA)|0,g=g+Math.imul(p,EA)|0,I=(I=I+Math.imul(p,iA)|0)+Math.imul(M,EA)|0,E=E+Math.imul(M,iA)|0,g=g+Math.imul(Y,tA)|0,I=(I=I+Math.imul(Y,eA)|0)+Math.imul(L,tA)|0,E=E+Math.imul(L,eA)|0,g=g+Math.imul(N,sA)|0,I=(I=I+Math.imul(N,rA)|0)+Math.imul(H,sA)|0,E=E+Math.imul(H,rA)|0;var YA=(e+(g=g+Math.imul(d,nA)|0)|0)+((8191&(I=(I=I+Math.imul(d,aA)|0)+Math.imul(l,nA)|0))<<13)|0;e=((E=E+Math.imul(l,aA)|0)+(I>>>13)|0)+(YA>>>26)|0,YA&=67108863,g=Math.imul(v,QA),I=(I=Math.imul(v,gA))+Math.imul(J,QA)|0,E=Math.imul(J,gA),g=g+Math.imul(k,EA)|0,I=(I=I+Math.imul(k,iA)|0)+Math.imul(S,EA)|0,E=E+Math.imul(S,iA)|0,g=g+Math.imul(p,tA)|0,I=(I=I+Math.imul(p,eA)|0)+Math.imul(M,tA)|0,E=E+Math.imul(M,eA)|0,g=g+Math.imul(Y,sA)|0,I=(I=I+Math.imul(Y,rA)|0)+Math.imul(L,sA)|0,E=E+Math.imul(L,rA)|0;var LA=(e+(g=g+Math.imul(N,nA)|0)|0)+((8191&(I=(I=I+Math.imul(N,aA)|0)+Math.imul(H,nA)|0))<<13)|0;e=((E=E+Math.imul(H,aA)|0)+(I>>>13)|0)+(LA>>>26)|0,LA&=67108863,g=Math.imul(v,EA),I=(I=Math.imul(v,iA))+Math.imul(J,EA)|0,E=Math.imul(J,iA),g=g+Math.imul(k,tA)|0,I=(I=I+Math.imul(k,eA)|0)+Math.imul(S,tA)|0,E=E+Math.imul(S,eA)|0,g=g+Math.imul(p,sA)|0,I=(I=I+Math.imul(p,rA)|0)+Math.imul(M,sA)|0,E=E+Math.imul(M,rA)|0;var RA=(e+(g=g+Math.imul(Y,nA)|0)|0)+((8191&(I=(I=I+Math.imul(Y,aA)|0)+Math.imul(L,nA)|0))<<13)|0;e=((E=E+Math.imul(L,aA)|0)+(I>>>13)|0)+(RA>>>26)|0,RA&=67108863,g=Math.imul(v,tA),I=(I=Math.imul(v,eA))+Math.imul(J,tA)|0,E=Math.imul(J,eA),g=g+Math.imul(k,sA)|0,I=(I=I+Math.imul(k,rA)|0)+Math.imul(S,sA)|0,E=E+Math.imul(S,rA)|0;var pA=(e+(g=g+Math.imul(p,nA)|0)|0)+((8191&(I=(I=I+Math.imul(p,aA)|0)+Math.imul(M,nA)|0))<<13)|0;e=((E=E+Math.imul(M,aA)|0)+(I>>>13)|0)+(pA>>>26)|0,pA&=67108863,g=Math.imul(v,sA),I=(I=Math.imul(v,rA))+Math.imul(J,sA)|0,E=Math.imul(J,rA);var MA=(e+(g=g+Math.imul(k,nA)|0)|0)+((8191&(I=(I=I+Math.imul(k,aA)|0)+Math.imul(S,nA)|0))<<13)|0;e=((E=E+Math.imul(S,aA)|0)+(I>>>13)|0)+(MA>>>26)|0,MA&=67108863;var mA=(e+(g=Math.imul(v,nA))|0)+((8191&(I=(I=Math.imul(v,aA))+Math.imul(J,nA)|0))<<13)|0;return e=((E=Math.imul(J,aA))+(I>>>13)|0)+(mA>>>26)|0,mA&=67108863,t[0]=cA,t[1]=yA,t[2]=DA,t[3]=uA,t[4]=fA,t[5]=wA,t[6]=FA,t[7]=dA,t[8]=lA,t[9]=UA,t[10]=NA,t[11]=HA,t[12]=GA,t[13]=YA,t[14]=LA,t[15]=RA,t[16]=pA,t[17]=MA,t[18]=mA,0!==e&&(t[19]=e,Q.length++),Q};function n(A,B,Q){return(new a).mulp(A,B,Q)}function a(A,B){this.x=A,this.y=B}Math.imul||(h=r),E.prototype.mulTo=function(A,B){var Q=this.length+A.length;return 10===this.length&&10===A.length?h(this,A,B):Q<63?r(this,A,B):Q<1024?function(A,B,Q){Q.negative=B.negative^A.negative,Q.length=A.length+B.length;for(var g=0,I=0,E=0;E<Q.length-1;E++){var i=I;I=0;for(var C=67108863&g,t=Math.min(E,B.length-1),e=Math.max(0,E-A.length+1);e<=t;e++){var o=E-e,s=(0|A.words[o])*(0|B.words[e]),r=67108863&s;C=67108863&(r=r+C|0),I+=(i=(i=i+(s/67108864|0)|0)+(r>>>26)|0)>>>26,i&=67108863}Q.words[E]=C,g=i,i=I}return 0!==g?Q.words[E]=g:Q.length--,Q.strip()}(this,A,B):n(this,A,B)},a.prototype.makeRBT=function(A){for(var B=new Array(A),Q=E.prototype._countBits(A)-1,g=0;g<A;g++)B[g]=this.revBin(g,Q,A);return B},a.prototype.revBin=function(A,B,Q){if(0===A||A===Q-1)return A;for(var g=0,I=0;I<B;I++)g|=(1&A)<<B-I-1,A>>=1;return g},a.prototype.permute=function(A,B,Q,g,I,E){for(var i=0;i<E;i++)g[i]=B[A[i]],I[i]=Q[A[i]]},a.prototype.transform=function(A,B,Q,g,I,E){this.permute(E,A,B,Q,g,I);for(var i=1;i<I;i<<=1)for(var C=i<<1,t=Math.cos(2*Math.PI/C),e=Math.sin(2*Math.PI/C),o=0;o<I;o+=C)for(var s=t,r=e,h=0;h<i;h++){var n=Q[o+h],a=g[o+h],c=Q[o+h+i],y=g[o+h+i],D=s*c-r*y;y=s*y+r*c,c=D,Q[o+h]=n+c,g[o+h]=a+y,Q[o+h+i]=n-c,g[o+h+i]=a-y,h!==C&&(D=t*s-e*r,r=t*r+e*s,s=D)}},a.prototype.guessLen13b=function(A,B){var Q=1|Math.max(B,A),g=1&Q,I=0;for(Q=Q/2|0;Q;Q>>>=1)I++;return 1<<I+1+g},a.prototype.conjugate=function(A,B,Q){if(!(Q<=1))for(var g=0;g<Q/2;g++){var I=A[g];A[g]=A[Q-g-1],A[Q-g-1]=I,I=B[g],B[g]=-B[Q-g-1],B[Q-g-1]=-I}},a.prototype.normalize13b=function(A,B){for(var Q=0,g=0;g<B/2;g++){var I=8192*Math.round(A[2*g+1]/B)+Math.round(A[2*g]/B)+Q;A[g]=67108863&I,Q=I<67108864?0:I/67108864|0}return A},a.prototype.convert13b=function(A,B,Q,I){for(var E=0,i=0;i<B;i++)E+=0|A[i],Q[2*i]=8191&E,E>>>=13,Q[2*i+1]=8191&E,E>>>=13;for(i=2*B;i<I;++i)Q[i]=0;g(0===E),g(0==(-8192&E))},a.prototype.stub=function(A){for(var B=new Array(A),Q=0;Q<A;Q++)B[Q]=0;return B},a.prototype.mulp=function(A,B,Q){var g=2*this.guessLen13b(A.length,B.length),I=this.makeRBT(g),E=this.stub(g),i=new Array(g),C=new Array(g),t=new Array(g),e=new Array(g),o=new Array(g),s=new Array(g),r=Q.words;r.length=g,this.convert13b(A.words,A.length,i,g),this.convert13b(B.words,B.length,e,g),this.transform(i,E,C,t,g,I),this.transform(e,E,o,s,g,I);for(var h=0;h<g;h++){var n=C[h]*o[h]-t[h]*s[h];t[h]=C[h]*s[h]+t[h]*o[h],C[h]=n}return this.conjugate(C,t,g),this.transform(C,t,r,E,g,I),this.conjugate(r,E,g),this.normalize13b(r,g),Q.negative=A.negative^B.negative,Q.length=A.length+B.length,Q.strip()},E.prototype.mul=function(A){var B=new E(null);return B.words=new Array(this.length+A.length),this.mulTo(A,B)},E.prototype.mulf=function(A){var B=new E(null);return B.words=new Array(this.length+A.length),n(this,A,B)},E.prototype.imul=function(A){return this.clone().mulTo(A,this)},E.prototype.imuln=function(A){g("number"==typeof A),g(A<67108864);for(var B=0,Q=0;Q<this.length;Q++){var I=(0|this.words[Q])*A,E=(67108863&I)+(67108863&B);B>>=26,B+=I/67108864|0,B+=E>>>26,this.words[Q]=67108863&E}return 0!==B&&(this.words[Q]=B,this.length++),this},E.prototype.muln=function(A){return this.clone().imuln(A)},E.prototype.sqr=function(){return this.mul(this)},E.prototype.isqr=function(){return this.imul(this.clone())},E.prototype.pow=function(A){var B=function(A){for(var B=new Array(A.bitLength()),Q=0;Q<B.length;Q++){var g=Q/26|0,I=Q%26;B[Q]=(A.words[g]&1<<I)>>>I}return B}(A);if(0===B.length)return new E(1);for(var Q=this,g=0;g<B.length&&0===B[g];g++,Q=Q.sqr());if(++g<B.length)for(var I=Q.sqr();g<B.length;g++,I=I.sqr())0!==B[g]&&(Q=Q.mul(I));return Q},E.prototype.iushln=function(A){g("number"==typeof A&&A>=0);var B,Q=A%26,I=(A-Q)/26,E=67108863>>>26-Q<<26-Q;if(0!==Q){var i=0;for(B=0;B<this.length;B++){var C=this.words[B]&E,t=(0|this.words[B])-C<<Q;this.words[B]=t|i,i=C>>>26-Q}i&&(this.words[B]=i,this.length++)}if(0!==I){for(B=this.length-1;B>=0;B--)this.words[B+I]=this.words[B];for(B=0;B<I;B++)this.words[B]=0;this.length+=I}return this.strip()},E.prototype.ishln=function(A){return g(0===this.negative),this.iushln(A)},E.prototype.iushrn=function(A,B,Q){var I;g("number"==typeof A&&A>=0),I=B?(B-B%26)/26:0;var E=A%26,i=Math.min((A-E)/26,this.length),C=67108863^67108863>>>E<<E,t=Q;if(I-=i,I=Math.max(0,I),t){for(var e=0;e<i;e++)t.words[e]=this.words[e];t.length=i}if(0===i);else if(this.length>i)for(this.length-=i,e=0;e<this.length;e++)this.words[e]=this.words[e+i];else this.words[0]=0,this.length=1;var o=0;for(e=this.length-1;e>=0&&(0!==o||e>=I);e--){var s=0|this.words[e];this.words[e]=o<<26-E|s>>>E,o=s&C}return t&&0!==o&&(t.words[t.length++]=o),0===this.length&&(this.words[0]=0,this.length=1),this.strip()},E.prototype.ishrn=function(A,B,Q){return g(0===this.negative),this.iushrn(A,B,Q)},E.prototype.shln=function(A){return this.clone().ishln(A)},E.prototype.ushln=function(A){return this.clone().iushln(A)},E.prototype.shrn=function(A){return this.clone().ishrn(A)},E.prototype.ushrn=function(A){return this.clone().iushrn(A)},E.prototype.testn=function(A){g("number"==typeof A&&A>=0);var B=A%26,Q=(A-B)/26,I=1<<B;return!(this.length<=Q)&&!!(this.words[Q]&I)},E.prototype.imaskn=function(A){g("number"==typeof A&&A>=0);var B=A%26,Q=(A-B)/26;if(g(0===this.negative,"imaskn works only with positive numbers"),this.length<=Q)return this;if(0!==B&&Q++,this.length=Math.min(Q,this.length),0!==B){var I=67108863^67108863>>>B<<B;this.words[this.length-1]&=I}return this.strip()},E.prototype.maskn=function(A){return this.clone().imaskn(A)},E.prototype.iaddn=function(A){return g("number"==typeof A),g(A<67108864),A<0?this.isubn(-A):0!==this.negative?1===this.length&&(0|this.words[0])<A?(this.words[0]=A-(0|this.words[0]),this.negative=0,this):(this.negative=0,this.isubn(A),this.negative=1,this):this._iaddn(A)},E.prototype._iaddn=function(A){this.words[0]+=A;for(var B=0;B<this.length&&this.words[B]>=67108864;B++)this.words[B]-=67108864,B===this.length-1?this.words[B+1]=1:this.words[B+1]++;return this.length=Math.max(this.length,B+1),this},E.prototype.isubn=function(A){if(g("number"==typeof A),g(A<67108864),A<0)return this.iaddn(-A);if(0!==this.negative)return this.negative=0,this.iaddn(A),this.negative=1,this;if(this.words[0]-=A,1===this.length&&this.words[0]<0)this.words[0]=-this.words[0],this.negative=1;else for(var B=0;B<this.length&&this.words[B]<0;B++)this.words[B]+=67108864,this.words[B+1]-=1;return this.strip()},E.prototype.addn=function(A){return this.clone().iaddn(A)},E.prototype.subn=function(A){return this.clone().isubn(A)},E.prototype.iabs=function(){return this.negative=0,this},E.prototype.abs=function(){return this.clone().iabs()},E.prototype._ishlnsubmul=function(A,B,Q){var I,E,i=A.length+Q;this._expand(i);var C=0;for(I=0;I<A.length;I++){E=(0|this.words[I+Q])+C;var t=(0|A.words[I])*B;C=((E-=67108863&t)>>26)-(t/67108864|0),this.words[I+Q]=67108863&E}for(;I<this.length-Q;I++)C=(E=(0|this.words[I+Q])+C)>>26,this.words[I+Q]=67108863&E;if(0===C)return this.strip();for(g(-1===C),C=0,I=0;I<this.length;I++)C=(E=-(0|this.words[I])+C)>>26,this.words[I]=67108863&E;return this.negative=1,this.strip()},E.prototype._wordDiv=function(A,B){var Q=(this.length,A.length),g=this.clone(),I=A,i=0|I.words[I.length-1];0!==(Q=26-this._countBits(i))&&(I=I.ushln(Q),g.iushln(Q),i=0|I.words[I.length-1]);var C,t=g.length-I.length;if("mod"!==B){(C=new E(null)).length=t+1,C.words=new Array(C.length);for(var e=0;e<C.length;e++)C.words[e]=0}var o=g.clone()._ishlnsubmul(I,1,t);0===o.negative&&(g=o,C&&(C.words[t]=1));for(var s=t-1;s>=0;s--){var r=67108864*(0|g.words[I.length+s])+(0|g.words[I.length+s-1]);for(r=Math.min(r/i|0,67108863),g._ishlnsubmul(I,r,s);0!==g.negative;)r--,g.negative=0,g._ishlnsubmul(I,1,s),g.isZero()||(g.negative^=1);C&&(C.words[s]=r)}return C&&C.strip(),g.strip(),"div"!==B&&0!==Q&&g.iushrn(Q),{div:C||null,mod:g}},E.prototype.divmod=function(A,B,Q){return g(!A.isZero()),this.isZero()?{div:new E(0),mod:new E(0)}:0!==this.negative&&0===A.negative?(C=this.neg().divmod(A,B),"mod"!==B&&(I=C.div.neg()),"div"!==B&&(i=C.mod.neg(),Q&&0!==i.negative&&i.iadd(A)),{div:I,mod:i}):0===this.negative&&0!==A.negative?(C=this.divmod(A.neg(),B),"mod"!==B&&(I=C.div.neg()),{div:I,mod:C.mod}):0!=(this.negative&A.negative)?(C=this.neg().divmod(A.neg(),B),"div"!==B&&(i=C.mod.neg(),Q&&0!==i.negative&&i.isub(A)),{div:C.div,mod:i}):A.length>this.length||this.cmp(A)<0?{div:new E(0),mod:this}:1===A.length?"div"===B?{div:this.divn(A.words[0]),mod:null}:"mod"===B?{div:null,mod:new E(this.modn(A.words[0]))}:{div:this.divn(A.words[0]),mod:new E(this.modn(A.words[0]))}:this._wordDiv(A,B);var I,i,C},E.prototype.div=function(A){return this.divmod(A,"div",!1).div},E.prototype.mod=function(A){return this.divmod(A,"mod",!1).mod},E.prototype.umod=function(A){return this.divmod(A,"mod",!0).mod},E.prototype.divRound=function(A){var B=this.divmod(A);if(B.mod.isZero())return B.div;var Q=0!==B.div.negative?B.mod.isub(A):B.mod,g=A.ushrn(1),I=A.andln(1),E=Q.cmp(g);return E<0||1===I&&0===E?B.div:0!==B.div.negative?B.div.isubn(1):B.div.iaddn(1)},E.prototype.modn=function(A){g(A<=67108863);for(var B=(1<<26)%A,Q=0,I=this.length-1;I>=0;I--)Q=(B*Q+(0|this.words[I]))%A;return Q},E.prototype.idivn=function(A){g(A<=67108863);for(var B=0,Q=this.length-1;Q>=0;Q--){var I=(0|this.words[Q])+67108864*B;this.words[Q]=I/A|0,B=I%A}return this.strip()},E.prototype.divn=function(A){return this.clone().idivn(A)},E.prototype.egcd=function(A){g(0===A.negative),g(!A.isZero());var B=this,Q=A.clone();B=0!==B.negative?B.umod(A):B.clone();for(var I=new E(1),i=new E(0),C=new E(0),t=new E(1),e=0;B.isEven()&&Q.isEven();)B.iushrn(1),Q.iushrn(1),++e;for(var o=Q.clone(),s=B.clone();!B.isZero();){for(var r=0,h=1;0==(B.words[0]&h)&&r<26;++r,h<<=1);if(r>0)for(B.iushrn(r);r-- >0;)(I.isOdd()||i.isOdd())&&(I.iadd(o),i.isub(s)),I.iushrn(1),i.iushrn(1);for(var n=0,a=1;0==(Q.words[0]&a)&&n<26;++n,a<<=1);if(n>0)for(Q.iushrn(n);n-- >0;)(C.isOdd()||t.isOdd())&&(C.iadd(o),t.isub(s)),C.iushrn(1),t.iushrn(1);B.cmp(Q)>=0?(B.isub(Q),I.isub(C),i.isub(t)):(Q.isub(B),C.isub(I),t.isub(i))}return{a:C,b:t,gcd:Q.iushln(e)}},E.prototype._invmp=function(A){g(0===A.negative),g(!A.isZero());var B=this,Q=A.clone();B=0!==B.negative?B.umod(A):B.clone();for(var I,i=new E(1),C=new E(0),t=Q.clone();B.cmpn(1)>0&&Q.cmpn(1)>0;){for(var e=0,o=1;0==(B.words[0]&o)&&e<26;++e,o<<=1);if(e>0)for(B.iushrn(e);e-- >0;)i.isOdd()&&i.iadd(t),i.iushrn(1);for(var s=0,r=1;0==(Q.words[0]&r)&&s<26;++s,r<<=1);if(s>0)for(Q.iushrn(s);s-- >0;)C.isOdd()&&C.iadd(t),C.iushrn(1);B.cmp(Q)>=0?(B.isub(Q),i.isub(C)):(Q.isub(B),C.isub(i))}return(I=0===B.cmpn(1)?i:C).cmpn(0)<0&&I.iadd(A),I},E.prototype.gcd=function(A){if(this.isZero())return A.abs();if(A.isZero())return this.abs();var B=this.clone(),Q=A.clone();B.negative=0,Q.negative=0;for(var g=0;B.isEven()&&Q.isEven();g++)B.iushrn(1),Q.iushrn(1);for(;;){for(;B.isEven();)B.iushrn(1);for(;Q.isEven();)Q.iushrn(1);var I=B.cmp(Q);if(I<0){var E=B;B=Q,Q=E}else if(0===I||0===Q.cmpn(1))break;B.isub(Q)}return Q.iushln(g)},E.prototype.invm=function(A){return this.egcd(A).a.umod(A)},E.prototype.isEven=function(){return 0==(1&this.words[0])},E.prototype.isOdd=function(){return 1==(1&this.words[0])},E.prototype.andln=function(A){return this.words[0]&A},E.prototype.bincn=function(A){g("number"==typeof A);var B=A%26,Q=(A-B)/26,I=1<<B;if(this.length<=Q)return this._expand(Q+1),this.words[Q]|=I,this;for(var E=I,i=Q;0!==E&&i<this.length;i++){var C=0|this.words[i];E=(C+=E)>>>26,C&=67108863,this.words[i]=C}return 0!==E&&(this.words[i]=E,this.length++),this},E.prototype.isZero=function(){return 1===this.length&&0===this.words[0]},E.prototype.cmpn=function(A){var B,Q=A<0;if(0!==this.negative&&!Q)return-1;if(0===this.negative&&Q)return 1;if(this.strip(),this.length>1)B=1;else{Q&&(A=-A),g(A<=67108863,"Number is too big");var I=0|this.words[0];B=I===A?0:I<A?-1:1}return 0!==this.negative?0|-B:B},E.prototype.cmp=function(A){if(0!==this.negative&&0===A.negative)return-1;if(0===this.negative&&0!==A.negative)return 1;var B=this.ucmp(A);return 0!==this.negative?0|-B:B},E.prototype.ucmp=function(A){if(this.length>A.length)return 1;if(this.length<A.length)return-1;for(var B=0,Q=this.length-1;Q>=0;Q--){var g=0|this.words[Q],I=0|A.words[Q];if(g!==I){g<I?B=-1:g>I&&(B=1);break}}return B},E.prototype.gtn=function(A){return 1===this.cmpn(A)},E.prototype.gt=function(A){return 1===this.cmp(A)},E.prototype.gten=function(A){return this.cmpn(A)>=0},E.prototype.gte=function(A){return this.cmp(A)>=0},E.prototype.ltn=function(A){return-1===this.cmpn(A)},E.prototype.lt=function(A){return-1===this.cmp(A)},E.prototype.lten=function(A){return this.cmpn(A)<=0},E.prototype.lte=function(A){return this.cmp(A)<=0},E.prototype.eqn=function(A){return 0===this.cmpn(A)},E.prototype.eq=function(A){return 0===this.cmp(A)},E.red=function(A){return new F(A)},E.prototype.toRed=function(A){return g(!this.red,"Already a number in reduction context"),g(0===this.negative,"red works only with positives"),A.convertTo(this)._forceRed(A)},E.prototype.fromRed=function(){return g(this.red,"fromRed works only with numbers in reduction context"),this.red.convertFrom(this)},E.prototype._forceRed=function(A){return this.red=A,this},E.prototype.forceRed=function(A){return g(!this.red,"Already a number in reduction context"),this._forceRed(A)},E.prototype.redAdd=function(A){return g(this.red,"redAdd works only with red numbers"),this.red.add(this,A)},E.prototype.redIAdd=function(A){return g(this.red,"redIAdd works only with red numbers"),this.red.iadd(this,A)},E.prototype.redSub=function(A){return g(this.red,"redSub works only with red numbers"),this.red.sub(this,A)},E.prototype.redISub=function(A){return g(this.red,"redISub works only with red numbers"),this.red.isub(this,A)},E.prototype.redShl=function(A){return g(this.red,"redShl works only with red numbers"),this.red.shl(this,A)},E.prototype.redMul=function(A){return g(this.red,"redMul works only with red numbers"),this.red._verify2(this,A),this.red.mul(this,A)},E.prototype.redIMul=function(A){return g(this.red,"redMul works only with red numbers"),this.red._verify2(this,A),this.red.imul(this,A)},E.prototype.redSqr=function(){return g(this.red,"redSqr works only with red numbers"),this.red._verify1(this),this.red.sqr(this)},E.prototype.redISqr=function(){return g(this.red,"redISqr works only with red numbers"),this.red._verify1(this),this.red.isqr(this)},E.prototype.redSqrt=function(){return g(this.red,"redSqrt works only with red numbers"),this.red._verify1(this),this.red.sqrt(this)},E.prototype.redInvm=function(){return g(this.red,"redInvm works only with red numbers"),this.red._verify1(this),this.red.invm(this)},E.prototype.redNeg=function(){return g(this.red,"redNeg works only with red numbers"),this.red._verify1(this),this.red.neg(this)},E.prototype.redPow=function(A){return g(this.red&&!A.red,"redPow(normalNum)"),this.red._verify1(this),this.red.pow(this,A)};var c={k256:null,p224:null,p192:null,p25519:null};function y(A,B){this.name=A,this.p=new E(B,16),this.n=this.p.bitLength(),this.k=new E(1).iushln(this.n).isub(this.p),this.tmp=this._tmp()}function D(){y.call(this,"k256","ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f")}function u(){y.call(this,"p224","ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001")}function f(){y.call(this,"p192","ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff")}function w(){y.call(this,"25519","7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed")}function F(A){if("string"==typeof A){var B=E._prime(A);this.m=B.p,this.prime=B}else g(A.gtn(1),"modulus must be greater than 1"),this.m=A,this.prime=null}function d(A){F.call(this,A),this.shift=this.m.bitLength(),this.shift%26!=0&&(this.shift+=26-this.shift%26),this.r=new E(1).iushln(this.shift),this.r2=this.imod(this.r.sqr()),this.rinv=this.r._invmp(this.m),this.minv=this.rinv.mul(this.r).isubn(1).div(this.m),this.minv=this.minv.umod(this.r),this.minv=this.r.sub(this.minv)}y.prototype._tmp=function(){var A=new E(null);return A.words=new Array(Math.ceil(this.n/13)),A},y.prototype.ireduce=function(A){var B,Q=A;do{this.split(Q,this.tmp),B=(Q=(Q=this.imulK(Q)).iadd(this.tmp)).bitLength()}while(B>this.n);var g=B<this.n?-1:Q.ucmp(this.p);return 0===g?(Q.words[0]=0,Q.length=1):g>0?Q.isub(this.p):Q.strip(),Q},y.prototype.split=function(A,B){A.iushrn(this.n,0,B)},y.prototype.imulK=function(A){return A.imul(this.k)},I(D,y),D.prototype.split=function(A,B){for(var Q=Math.min(A.length,9),g=0;g<Q;g++)B.words[g]=A.words[g];if(B.length=Q,A.length<=9)return A.words[0]=0,void(A.length=1);var I=A.words[9];for(B.words[B.length++]=4194303&I,g=10;g<A.length;g++){var E=0|A.words[g];A.words[g-10]=(4194303&E)<<4|I>>>22,I=E}I>>>=22,A.words[g-10]=I,0===I&&A.length>10?A.length-=10:A.length-=9},D.prototype.imulK=function(A){A.words[A.length]=0,A.words[A.length+1]=0,A.length+=2;for(var B=0,Q=0;Q<A.length;Q++){var g=0|A.words[Q];B+=977*g,A.words[Q]=67108863&B,B=64*g+(B/67108864|0)}return 0===A.words[A.length-1]&&(A.length--,0===A.words[A.length-1]&&A.length--),A},I(u,y),I(f,y),I(w,y),w.prototype.imulK=function(A){for(var B=0,Q=0;Q<A.length;Q++){var g=19*(0|A.words[Q])+B,I=67108863&g;g>>>=26,A.words[Q]=I,B=g}return 0!==B&&(A.words[A.length++]=B),A},E._prime=function(A){if(c[A])return c[A];var B;if("k256"===A)B=new D;else if("p224"===A)B=new u;else if("p192"===A)B=new f;else{if("p25519"!==A)throw new Error("Unknown prime "+A);B=new w}return c[A]=B,B},F.prototype._verify1=function(A){g(0===A.negative,"red works only with positives"),g(A.red,"red works only with red numbers")},F.prototype._verify2=function(A,B){g(0==(A.negative|B.negative),"red works only with positives"),g(A.red&&A.red===B.red,"red works only with red numbers")},F.prototype.imod=function(A){return this.prime?this.prime.ireduce(A)._forceRed(this):A.umod(this.m)._forceRed(this)},F.prototype.neg=function(A){return A.isZero()?A.clone():this.m.sub(A)._forceRed(this)},F.prototype.add=function(A,B){this._verify2(A,B);var Q=A.add(B);return Q.cmp(this.m)>=0&&Q.isub(this.m),Q._forceRed(this)},F.prototype.iadd=function(A,B){this._verify2(A,B);var Q=A.iadd(B);return Q.cmp(this.m)>=0&&Q.isub(this.m),Q},F.prototype.sub=function(A,B){this._verify2(A,B);var Q=A.sub(B);return Q.cmpn(0)<0&&Q.iadd(this.m),Q._forceRed(this)},F.prototype.isub=function(A,B){this._verify2(A,B);var Q=A.isub(B);return Q.cmpn(0)<0&&Q.iadd(this.m),Q},F.prototype.shl=function(A,B){return this._verify1(A),this.imod(A.ushln(B))},F.prototype.imul=function(A,B){return this._verify2(A,B),this.imod(A.imul(B))},F.prototype.mul=function(A,B){return this._verify2(A,B),this.imod(A.mul(B))},F.prototype.isqr=function(A){return this.imul(A,A.clone())},F.prototype.sqr=function(A){return this.mul(A,A)},F.prototype.sqrt=function(A){if(A.isZero())return A.clone();var B=this.m.andln(3);if(g(B%2==1),3===B){var Q=this.m.add(new E(1)).iushrn(2);return this.pow(A,Q)}for(var I=this.m.subn(1),i=0;!I.isZero()&&0===I.andln(1);)i++,I.iushrn(1);g(!I.isZero());var C=new E(1).toRed(this),t=C.redNeg(),e=this.m.subn(1).iushrn(1),o=this.m.bitLength();for(o=new E(2*o*o).toRed(this);0!==this.pow(o,e).cmp(t);)o.redIAdd(t);for(var s=this.pow(o,I),r=this.pow(A,I.addn(1).iushrn(1)),h=this.pow(A,I),n=i;0!==h.cmp(C);){for(var a=h,c=0;0!==a.cmp(C);c++)a=a.redSqr();g(c<n);var y=this.pow(s,new E(1).iushln(n-c-1));r=r.redMul(y),s=y.redSqr(),h=h.redMul(s),n=c}return r},F.prototype.invm=function(A){var B=A._invmp(this.m);return 0!==B.negative?(B.negative=0,this.imod(B).redNeg()):this.imod(B)},F.prototype.pow=function(A,B){if(B.isZero())return new E(1).toRed(this);if(0===B.cmpn(1))return A.clone();var Q=new Array(16);Q[0]=new E(1).toRed(this),Q[1]=A;for(var g=2;g<Q.length;g++)Q[g]=this.mul(Q[g-1],A);var I=Q[0],i=0,C=0,t=B.bitLength()%26;for(0===t&&(t=26),g=B.length-1;g>=0;g--){for(var e=B.words[g],o=t-1;o>=0;o--){var s=e>>o&1;I!==Q[0]&&(I=this.sqr(I)),0!==s||0!==i?(i<<=1,i|=s,(4===++C||0===g&&0===o)&&(I=this.mul(I,Q[i]),C=0,i=0)):C=0}t=26}return I},F.prototype.convertTo=function(A){var B=A.umod(this.m);return B===A?B.clone():B},F.prototype.convertFrom=function(A){var B=A.clone();return B.red=null,B},E.mont=function(A){return new d(A)},I(d,F),d.prototype.convertTo=function(A){return this.imod(A.ushln(this.shift))},d.prototype.convertFrom=function(A){var B=this.imod(A.mul(this.rinv));return B.red=null,B},d.prototype.imul=function(A,B){if(A.isZero()||B.isZero())return A.words[0]=0,A.length=1,A;var Q=A.imul(B),g=Q.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m),I=Q.isub(g).iushrn(this.shift),E=I;return I.cmp(this.m)>=0?E=I.isub(this.m):I.cmpn(0)<0&&(E=I.iadd(this.m)),E._forceRed(this)},d.prototype.mul=function(A,B){if(A.isZero()||B.isZero())return new E(0)._forceRed(this);var Q=A.mul(B),g=Q.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m),I=Q.isub(g).iushrn(this.shift),i=I;return I.cmp(this.m)>=0?i=I.isub(this.m):I.cmpn(0)<0&&(i=I.iadd(this.m)),i._forceRed(this)},d.prototype.invm=function(A){return this.imod(A._invmp(this.m).mul(this.r2))._forceRed(this)}}(A,this)}).call(this,Q(10)(A))},function(A,B){},function(A,B){},function(A){A.exports=JSON.parse('{"modp1":{"gen":"02","prime":"ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a63a3620ffffffffffffffff"},"modp2":{"gen":"02","prime":"ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece65381ffffffffffffffff"},"modp5":{"gen":"02","prime":"ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece45b3dc2007cb8a163bf0598da48361c55d39a69163fa8fd24cf5f83655d23dca3ad961c62f356208552bb9ed529077096966d670c354e4abc9804f1746c08ca237327ffffffffffffffff"},"modp14":{"gen":"02","prime":"ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece45b3dc2007cb8a163bf0598da48361c55d39a69163fa8fd24cf5f83655d23dca3ad961c62f356208552bb9ed529077096966d670c354e4abc9804f1746c08ca18217c32905e462e36ce3be39e772c180e86039b2783a2ec07a28fb5c55df06f4c52c9de2bcbf6955817183995497cea956ae515d2261898fa051015728e5a8aacaa68ffffffffffffffff"},"modp15":{"gen":"02","prime":"ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece45b3dc2007cb8a163bf0598da48361c55d39a69163fa8fd24cf5f83655d23dca3ad961c62f356208552bb9ed529077096966d670c354e4abc9804f1746c08ca18217c32905e462e36ce3be39e772c180e86039b2783a2ec07a28fb5c55df06f4c52c9de2bcbf6955817183995497cea956ae515d2261898fa051015728e5a8aaac42dad33170d04507a33a85521abdf1cba64ecfb850458dbef0a8aea71575d060c7db3970f85a6e1e4c7abf5ae8cdb0933d71e8c94e04a25619dcee3d2261ad2ee6bf12ffa06d98a0864d87602733ec86a64521f2b18177b200cbbe117577a615d6c770988c0bad946e208e24fa074e5ab3143db5bfce0fd108e4b82d120a93ad2caffffffffffffffff"},"modp16":{"gen":"02","prime":"ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece45b3dc2007cb8a163bf0598da48361c55d39a69163fa8fd24cf5f83655d23dca3ad961c62f356208552bb9ed529077096966d670c354e4abc9804f1746c08ca18217c32905e462e36ce3be39e772c180e86039b2783a2ec07a28fb5c55df06f4c52c9de2bcbf6955817183995497cea956ae515d2261898fa051015728e5a8aaac42dad33170d04507a33a85521abdf1cba64ecfb850458dbef0a8aea71575d060c7db3970f85a6e1e4c7abf5ae8cdb0933d71e8c94e04a25619dcee3d2261ad2ee6bf12ffa06d98a0864d87602733ec86a64521f2b18177b200cbbe117577a615d6c770988c0bad946e208e24fa074e5ab3143db5bfce0fd108e4b82d120a92108011a723c12a787e6d788719a10bdba5b2699c327186af4e23c1a946834b6150bda2583e9ca2ad44ce8dbbbc2db04de8ef92e8efc141fbecaa6287c59474e6bc05d99b2964fa090c3a2233ba186515be7ed1f612970cee2d7afb81bdd762170481cd0069127d5b05aa993b4ea988d8fddc186ffb7dc90a6c08f4df435c934063199ffffffffffffffff"},"modp17":{"gen":"02","prime":"ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece45b3dc2007cb8a163bf0598da48361c55d39a69163fa8fd24cf5f83655d23dca3ad961c62f356208552bb9ed529077096966d670c354e4abc9804f1746c08ca18217c32905e462e36ce3be39e772c180e86039b2783a2ec07a28fb5c55df06f4c52c9de2bcbf6955817183995497cea956ae515d2261898fa051015728e5a8aaac42dad33170d04507a33a85521abdf1cba64ecfb850458dbef0a8aea71575d060c7db3970f85a6e1e4c7abf5ae8cdb0933d71e8c94e04a25619dcee3d2261ad2ee6bf12ffa06d98a0864d87602733ec86a64521f2b18177b200cbbe117577a615d6c770988c0bad946e208e24fa074e5ab3143db5bfce0fd108e4b82d120a92108011a723c12a787e6d788719a10bdba5b2699c327186af4e23c1a946834b6150bda2583e9ca2ad44ce8dbbbc2db04de8ef92e8efc141fbecaa6287c59474e6bc05d99b2964fa090c3a2233ba186515be7ed1f612970cee2d7afb81bdd762170481cd0069127d5b05aa993b4ea988d8fddc186ffb7dc90a6c08f4df435c93402849236c3fab4d27c7026c1d4dcb2602646dec9751e763dba37bdf8ff9406ad9e530ee5db382f413001aeb06a53ed9027d831179727b0865a8918da3edbebcf9b14ed44ce6cbaced4bb1bdb7f1447e6cc254b332051512bd7af426fb8f401378cd2bf5983ca01c64b92ecf032ea15d1721d03f482d7ce6e74fef6d55e702f46980c82b5a84031900b1c9e59e7c97fbec7e8f323a97a7e36cc88be0f1d45b7ff585ac54bd407b22b4154aacc8f6d7ebf48e1d814cc5ed20f8037e0a79715eef29be32806a1d58bb7c5da76f550aa3d8a1fbff0eb19ccb1a313d55cda56c9ec2ef29632387fe8d76e3c0468043e8f663f4860ee12bf2d5b0b7474d6e694f91e6dcc4024ffffffffffffffff"},"modp18":{"gen":"02","prime":"ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece45b3dc2007cb8a163bf0598da48361c55d39a69163fa8fd24cf5f83655d23dca3ad961c62f356208552bb9ed529077096966d670c354e4abc9804f1746c08ca18217c32905e462e36ce3be39e772c180e86039b2783a2ec07a28fb5c55df06f4c52c9de2bcbf6955817183995497cea956ae515d2261898fa051015728e5a8aaac42dad33170d04507a33a85521abdf1cba64ecfb850458dbef0a8aea71575d060c7db3970f85a6e1e4c7abf5ae8cdb0933d71e8c94e04a25619dcee3d2261ad2ee6bf12ffa06d98a0864d87602733ec86a64521f2b18177b200cbbe117577a615d6c770988c0bad946e208e24fa074e5ab3143db5bfce0fd108e4b82d120a92108011a723c12a787e6d788719a10bdba5b2699c327186af4e23c1a946834b6150bda2583e9ca2ad44ce8dbbbc2db04de8ef92e8efc141fbecaa6287c59474e6bc05d99b2964fa090c3a2233ba186515be7ed1f612970cee2d7afb81bdd762170481cd0069127d5b05aa993b4ea988d8fddc186ffb7dc90a6c08f4df435c93402849236c3fab4d27c7026c1d4dcb2602646dec9751e763dba37bdf8ff9406ad9e530ee5db382f413001aeb06a53ed9027d831179727b0865a8918da3edbebcf9b14ed44ce6cbaced4bb1bdb7f1447e6cc254b332051512bd7af426fb8f401378cd2bf5983ca01c64b92ecf032ea15d1721d03f482d7ce6e74fef6d55e702f46980c82b5a84031900b1c9e59e7c97fbec7e8f323a97a7e36cc88be0f1d45b7ff585ac54bd407b22b4154aacc8f6d7ebf48e1d814cc5ed20f8037e0a79715eef29be32806a1d58bb7c5da76f550aa3d8a1fbff0eb19ccb1a313d55cda56c9ec2ef29632387fe8d76e3c0468043e8f663f4860ee12bf2d5b0b7474d6e694f91e6dbe115974a3926f12fee5e438777cb6a932df8cd8bec4d073b931ba3bc832b68d9dd300741fa7bf8afc47ed2576f6936ba424663aab639c5ae4f5683423b4742bf1c978238f16cbe39d652de3fdb8befc848ad922222e04a4037c0713eb57a81a23f0c73473fc646cea306b4bcbc8862f8385ddfa9d4b7fa2c087e879683303ed5bdd3a062b3cf5b3a278a66d2a13f83f44f82ddf310ee074ab6a364597e899a0255dc164f31cc50846851df9ab48195ded7ea1b1d510bd7ee74d73faf36bc31ecfa268359046f4eb879f924009438b481c6cd7889a002ed5ee382bc9190da6fc026e479558e4475677e9aa9e3050e2765694dfc81f56e880b96e7160c980dd98edd3dfffffffffffffffff"}}')},function(A,B,Q){(function(B){var g=Q(78),I=new(Q(79)),E=new g(24),i=new g(11),C=new g(10),t=new g(3),e=new g(7),o=Q(77),s=Q(14);function r(A,Q){return Q=Q||"utf8",B.isBuffer(A)||(A=new B(A,Q)),this._pub=new g(A),this}function h(A,Q){return Q=Q||"utf8",B.isBuffer(A)||(A=new B(A,Q)),this._priv=new g(A),this}A.exports=a;var n={};function a(A,B,Q){this.setGenerator(B),this.__prime=new g(A),this._prime=g.mont(this.__prime),this._primeLen=A.length,this._pub=void 0,this._priv=void 0,this._primeCode=void 0,Q?(this.setPublicKey=r,this.setPrivateKey=h):this._primeCode=8}function c(A,Q){var g=new B(A.toArray());return Q?g.toString(Q):g}Object.defineProperty(a.prototype,"verifyError",{enumerable:!0,get:function(){return"number"!=typeof this._primeCode&&(this._primeCode=function(A,B){var Q=B.toString("hex"),g=[Q,A.toString(16)].join("_");if(g in n)return n[g];var s,r=0;if(A.isEven()||!o.simpleSieve||!o.fermatTest(A)||!I.test(A))return r+=1,r+="02"===Q||"05"===Q?8:4,n[g]=r,r;switch(I.test(A.shrn(1))||(r+=2),Q){case"02":A.mod(E).cmp(i)&&(r+=8);break;case"05":(s=A.mod(C)).cmp(t)&&s.cmp(e)&&(r+=8);break;default:r+=4}return n[g]=r,r}(this.__prime,this.__gen)),this._primeCode}}),a.prototype.generateKeys=function(){return this._priv||(this._priv=new g(s(this._primeLen))),this._pub=this._gen.toRed(this._prime).redPow(this._priv).fromRed(),this.getPublicKey()},a.prototype.computeSecret=function(A){var Q=(A=(A=new g(A)).toRed(this._prime)).redPow(this._priv).fromRed(),I=new B(Q.toArray()),E=this.getPrime();if(I.length<E.length){var i=new B(E.length-I.length);i.fill(0),I=B.concat([i,I])}return I},a.prototype.getPublicKey=function(A){return c(this._pub,A)},a.prototype.getPrivateKey=function(A){return c(this._priv,A)},a.prototype.getPrime=function(A){return c(this.__prime,A)},a.prototype.getGenerator=function(A){return c(this._gen,A)},a.prototype.setGenerator=function(A,Q){return Q=Q||"utf8",B.isBuffer(A)||(A=new B(A,Q)),this.__gen=A,this._gen=new g(A),this}}).call(this,Q(2).Buffer)},function(A,B,Q){var g=Q(2).Buffer,I=Q(20),E=Q(156),i=Q(0),C=Q(164),t=Q(202),e=Q(65);function o(A){E.Writable.call(this);var B=e[A];if(!B)throw new Error("Unknown message digest");this._hashType=B.hash,this._hash=I(B.hash),this._tag=B.id,this._signType=B.sign}function s(A){E.Writable.call(this);var B=e[A];if(!B)throw new Error("Unknown message digest");this._hash=I(B.hash),this._tag=B.id,this._signType=B.sign}function r(A){return new o(A)}function h(A){return new s(A)}Object.keys(e).forEach((function(A){e[A].id=g.from(e[A].id,"hex"),e[A.toLowerCase()]=e[A]})),i(o,E.Writable),o.prototype._write=function(A,B,Q){this._hash.update(A),Q()},o.prototype.update=function(A,B){return"string"==typeof A&&(A=g.from(A,B)),this._hash.update(A),this},o.prototype.sign=function(A,B){this.end();var Q=this._hash.digest(),g=C(Q,A,this._hashType,this._signType,this._tag);return B?g.toString(B):g},i(s,E.Writable),s.prototype._write=function(A,B,Q){this._hash.update(A),Q()},s.prototype.update=function(A,B){return"string"==typeof A&&(A=g.from(A,B)),this._hash.update(A),this},s.prototype.verify=function(A,B,Q){"string"==typeof B&&(B=g.from(B,Q)),this.end();var I=this._hash.digest();return t(B,I,A,this._signType,this._tag)},A.exports={Sign:r,Verify:h,createSign:r,createVerify:h}},function(A,B,Q){(B=A.exports=Q(80)).Stream=B,B.Readable=B,B.Writable=Q(84),B.Duplex=Q(19),B.Transform=Q(85),B.PassThrough=Q(162),B.finished=Q(42),B.pipeline=Q(163)},function(A,B){},function(A,B,Q){"use strict";function g(A,B){var Q=Object.keys(A);if(Object.getOwnPropertySymbols){var g=Object.getOwnPropertySymbols(A);B&&(g=g.filter((function(B){return Object.getOwnPropertyDescriptor(A,B).enumerable}))),Q.push.apply(Q,g)}return Q}function I(A,B,Q){return B in A?Object.defineProperty(A,B,{value:Q,enumerable:!0,configurable:!0,writable:!0}):A[B]=Q,A}function E(A,B){for(var Q=0;Q<B.length;Q++){var g=B[Q];g.enumerable=g.enumerable||!1,g.configurable=!0,"value"in g&&(g.writable=!0),Object.defineProperty(A,g.key,g)}}var i=Q(2).Buffer,C=Q(159).inspect,t=C&&C.custom||"inspect";A.exports=function(){function A(){!function(A,B){if(!(A instanceof B))throw new TypeError("Cannot call a class as a function")}(this,A),this.head=null,this.tail=null,this.length=0}var B,Q,e;return B=A,(Q=[{key:"push",value:function(A){var B={data:A,next:null};this.length>0?this.tail.next=B:this.head=B,this.tail=B,++this.length}},{key:"unshift",value:function(A){var B={data:A,next:this.head};0===this.length&&(this.tail=B),this.head=B,++this.length}},{key:"shift",value:function(){if(0!==this.length){var A=this.head.data;return 1===this.length?this.head=this.tail=null:this.head=this.head.next,--this.length,A}}},{key:"clear",value:function(){this.head=this.tail=null,this.length=0}},{key:"join",value:function(A){if(0===this.length)return"";for(var B=this.head,Q=""+B.data;B=B.next;)Q+=A+B.data;return Q}},{key:"concat",value:function(A){if(0===this.length)return i.alloc(0);for(var B,Q,g,I=i.allocUnsafe(A>>>0),E=this.head,C=0;E;)B=E.data,Q=I,g=C,i.prototype.copy.call(B,Q,g),C+=E.data.length,E=E.next;return I}},{key:"consume",value:function(A,B){var Q;return A<this.head.data.length?(Q=this.head.data.slice(0,A),this.head.data=this.head.data.slice(A)):Q=A===this.head.data.length?this.shift():B?this._getString(A):this._getBuffer(A),Q}},{key:"first",value:function(){return this.head.data}},{key:"_getString",value:function(A){var B=this.head,Q=1,g=B.data;for(A-=g.length;B=B.next;){var I=B.data,E=A>I.length?I.length:A;if(E===I.length?g+=I:g+=I.slice(0,A),0==(A-=E)){E===I.length?(++Q,B.next?this.head=B.next:this.head=this.tail=null):(this.head=B,B.data=I.slice(E));break}++Q}return this.length-=Q,g}},{key:"_getBuffer",value:function(A){var B=i.allocUnsafe(A),Q=this.head,g=1;for(Q.data.copy(B),A-=Q.data.length;Q=Q.next;){var I=Q.data,E=A>I.length?I.length:A;if(I.copy(B,B.length-A,0,E),0==(A-=E)){E===I.length?(++g,Q.next?this.head=Q.next:this.head=this.tail=null):(this.head=Q,Q.data=I.slice(E));break}++g}return this.length-=g,B}},{key:t,value:function(A,B){return C(this,function(A){for(var B=1;B<arguments.length;B++){var Q=null!=arguments[B]?arguments[B]:{};B%2?g(Object(Q),!0).forEach((function(B){I(A,B,Q[B])})):Object.getOwnPropertyDescriptors?Object.defineProperties(A,Object.getOwnPropertyDescriptors(Q)):g(Object(Q)).forEach((function(B){Object.defineProperty(A,B,Object.getOwnPropertyDescriptor(Q,B))}))}return A}({},B,{depth:0,customInspect:!1}))}}])&&E(B.prototype,Q),e&&E(B,e),A}()},function(A,B){},function(A,B,Q){"use strict";(function(B){var g;function I(A,B,Q){return B in A?Object.defineProperty(A,B,{value:Q,enumerable:!0,configurable:!0,writable:!0}):A[B]=Q,A}var E=Q(42),i=Symbol("lastResolve"),C=Symbol("lastReject"),t=Symbol("error"),e=Symbol("ended"),o=Symbol("lastPromise"),s=Symbol("handlePromise"),r=Symbol("stream");function h(A,B){return{value:A,done:B}}function n(A){var B=A[i];if(null!==B){var Q=A[r].read();null!==Q&&(A[o]=null,A[i]=null,A[C]=null,B(h(Q,!1)))}}function a(A){B.nextTick(n,A)}var c=Object.getPrototypeOf((function(){})),y=Object.setPrototypeOf((I(g={get stream(){return this[r]},next:function(){var A=this,Q=this[t];if(null!==Q)return Promise.reject(Q);if(this[e])return Promise.resolve(h(void 0,!0));if(this[r].destroyed)return new Promise((function(Q,g){B.nextTick((function(){A[t]?g(A[t]):Q(h(void 0,!0))}))}));var g,I=this[o];if(I)g=new Promise(function(A,B){return function(Q,g){A.then((function(){B[e]?Q(h(void 0,!0)):B[s](Q,g)}),g)}}(I,this));else{var E=this[r].read();if(null!==E)return Promise.resolve(h(E,!1));g=new Promise(this[s])}return this[o]=g,g}},Symbol.asyncIterator,(function(){return this})),I(g,"return",(function(){var A=this;return new Promise((function(B,Q){A[r].destroy(null,(function(A){A?Q(A):B(h(void 0,!0))}))}))})),g),c);A.exports=function(A){var B,Q=Object.create(y,(I(B={},r,{value:A,writable:!0}),I(B,i,{value:null,writable:!0}),I(B,C,{value:null,writable:!0}),I(B,t,{value:null,writable:!0}),I(B,e,{value:A._readableState.endEmitted,writable:!0}),I(B,s,{value:function(A,B){var g=Q[r].read();g?(Q[o]=null,Q[i]=null,Q[C]=null,A(h(g,!1))):(Q[i]=A,Q[C]=B)},writable:!0}),B));return Q[o]=null,E(A,(function(A){if(A&&"ERR_STREAM_PREMATURE_CLOSE"!==A.code){var B=Q[C];return null!==B&&(Q[o]=null,Q[i]=null,Q[C]=null,B(A)),void(Q[t]=A)}var g=Q[i];null!==g&&(Q[o]=null,Q[i]=null,Q[C]=null,g(h(void 0,!0))),Q[e]=!0})),A.on("readable",a.bind(null,Q)),Q}}).call(this,Q(3))},function(A,B){A.exports=function(){throw new Error("Readable.from is not available in the browser")}},function(A,B,Q){"use strict";A.exports=I;var g=Q(85);function I(A){if(!(this instanceof I))return new I(A);g.call(this,A)}Q(0)(I,g),I.prototype._transform=function(A,B,Q){Q(null,A)}},function(A,B,Q){"use strict";var g;var I=Q(18).codes,E=I.ERR_MISSING_ARGS,i=I.ERR_STREAM_DESTROYED;function C(A){if(A)throw A}function t(A,B,I,E){E=function(A){var B=!1;return function(){B||(B=!0,A.apply(void 0,arguments))}}(E);var C=!1;A.on("close",(function(){C=!0})),void 0===g&&(g=Q(42)),g(A,{readable:B,writable:I},(function(A){if(A)return E(A);C=!0,E()}));var t=!1;return function(B){if(!C&&!t)return t=!0,function(A){return A.setHeader&&"function"==typeof A.abort}(A)?A.abort():"function"==typeof A.destroy?A.destroy():void E(B||new i("pipe"))}}function e(A){A()}function o(A,B){return A.pipe(B)}function s(A){return A.length?"function"!=typeof A[A.length-1]?C:A.pop():C}A.exports=function(){for(var A=arguments.length,B=new Array(A),Q=0;Q<A;Q++)B[Q]=arguments[Q];var g,I=s(B);if(Array.isArray(B[0])&&(B=B[0]),B.length<2)throw new E("streams");var i=B.map((function(A,Q){var E=Q<B.length-1;return t(A,E,Q>0,(function(A){g||(g=A),A&&i.forEach(e),E||(i.forEach(e),I(g))}))}));return B.reduce(o)}},function(A,B,Q){var g=Q(2).Buffer,I=Q(63),E=Q(43),i=Q(44).ec,C=Q(91),t=Q(30),e=Q(96);function o(A,B,Q,E){if((A=g.from(A.toArray())).length<B.byteLength()){var i=g.alloc(B.byteLength()-A.length);A=g.concat([i,A])}var C=Q.length,t=function(A,B){A=(A=s(A,B)).mod(B);var Q=g.from(A.toArray());if(Q.length<B.byteLength()){var I=g.alloc(B.byteLength()-Q.length);Q=g.concat([I,Q])}return Q}(Q,B),e=g.alloc(C);e.fill(1);var o=g.alloc(C);return o=I(E,o).update(e).update(g.from([0])).update(A).update(t).digest(),e=I(E,o).update(e).digest(),{k:o=I(E,o).update(e).update(g.from([1])).update(A).update(t).digest(),v:e=I(E,o).update(e).digest()}}function s(A,B){var Q=new C(A),g=(A.length<<3)-B.bitLength();return g>0&&Q.ishrn(g),Q}function r(A,B,Q){var E,i;do{for(E=g.alloc(0);8*E.length<A.bitLength();)B.v=I(Q,B.k).update(B.v).digest(),E=g.concat([E,B.v]);i=s(E,A),B.k=I(Q,B.k).update(B.v).update(g.from([0])).digest(),B.v=I(Q,B.k).update(B.v).digest()}while(-1!==i.cmp(A));return i}function h(A,B,Q,g){return A.toRed(C.mont(Q)).redPow(B).fromRed().mod(g)}A.exports=function(A,B,Q,I,n){var a=t(B);if(a.curve){if("ecdsa"!==I&&"ecdsa/rsa"!==I)throw new Error("wrong private key type");return function(A,B){var Q=e[B.curve.join(".")];if(!Q)throw new Error("unknown curve "+B.curve.join("."));var I=new i(Q).keyFromPrivate(B.privateKey).sign(A);return g.from(I.toDER())}(A,a)}if("dsa"===a.type){if("dsa"!==I)throw new Error("wrong private key type");return function(A,B,Q){var I,E=B.params.priv_key,i=B.params.p,t=B.params.q,e=B.params.g,n=new C(0),a=s(A,t).mod(t),c=!1,y=o(E,t,A,Q);for(;!1===c;)I=r(t,y,Q),n=h(e,I,i,t),0===(c=I.invm(t).imul(a.add(E.mul(n))).mod(t)).cmpn(0)&&(c=!1,n=new C(0));return function(A,B){A=A.toArray(),B=B.toArray(),128&A[0]&&(A=[0].concat(A));128&B[0]&&(B=[0].concat(B));var Q=[48,A.length+B.length+4,2,A.length];return Q=Q.concat(A,[2,B.length],B),g.from(Q)}(n,c)}(A,a,Q)}if("rsa"!==I&&"ecdsa/rsa"!==I)throw new Error("wrong private key type");A=g.concat([n,A]);for(var c=a.modulus.byteLength(),y=[0,1];A.length+y.length+1<c;)y.push(255);y.push(0);for(var D=-1;++D<A.length;)y.push(A[D]);return E(y,a)},A.exports.getKey=o,A.exports.makeKey=r},function(A,B,Q){(function(A){!function(A,B){"use strict";function g(A,B){if(!A)throw new Error(B||"Assertion failed")}function I(A,B){A.super_=B;var Q=function(){};Q.prototype=B.prototype,A.prototype=new Q,A.prototype.constructor=A}function E(A,B,Q){if(E.isBN(A))return A;this.negative=0,this.words=null,this.length=0,this.red=null,null!==A&&("le"!==B&&"be"!==B||(Q=B,B=10),this._init(A||0,B||10,Q||"be"))}var i;"object"==typeof A?A.exports=E:B.BN=E,E.BN=E,E.wordSize=26;try{i=Q(166).Buffer}catch(A){}function C(A,B,Q){for(var g=0,I=Math.min(A.length,Q),E=B;E<I;E++){var i=A.charCodeAt(E)-48;g<<=4,g|=i>=49&&i<=54?i-49+10:i>=17&&i<=22?i-17+10:15&i}return g}function t(A,B,Q,g){for(var I=0,E=Math.min(A.length,Q),i=B;i<E;i++){var C=A.charCodeAt(i)-48;I*=g,I+=C>=49?C-49+10:C>=17?C-17+10:C}return I}E.isBN=function(A){return A instanceof E||null!==A&&"object"==typeof A&&A.constructor.wordSize===E.wordSize&&Array.isArray(A.words)},E.max=function(A,B){return A.cmp(B)>0?A:B},E.min=function(A,B){return A.cmp(B)<0?A:B},E.prototype._init=function(A,B,Q){if("number"==typeof A)return this._initNumber(A,B,Q);if("object"==typeof A)return this._initArray(A,B,Q);"hex"===B&&(B=16),g(B===(0|B)&&B>=2&&B<=36);var I=0;"-"===(A=A.toString().replace(/\s+/g,""))[0]&&I++,16===B?this._parseHex(A,I):this._parseBase(A,B,I),"-"===A[0]&&(this.negative=1),this.strip(),"le"===Q&&this._initArray(this.toArray(),B,Q)},E.prototype._initNumber=function(A,B,Q){A<0&&(this.negative=1,A=-A),A<67108864?(this.words=[67108863&A],this.length=1):A<4503599627370496?(this.words=[67108863&A,A/67108864&67108863],this.length=2):(g(A<9007199254740992),this.words=[67108863&A,A/67108864&67108863,1],this.length=3),"le"===Q&&this._initArray(this.toArray(),B,Q)},E.prototype._initArray=function(A,B,Q){if(g("number"==typeof A.length),A.length<=0)return this.words=[0],this.length=1,this;this.length=Math.ceil(A.length/3),this.words=new Array(this.length);for(var I=0;I<this.length;I++)this.words[I]=0;var E,i,C=0;if("be"===Q)for(I=A.length-1,E=0;I>=0;I-=3)i=A[I]|A[I-1]<<8|A[I-2]<<16,this.words[E]|=i<<C&67108863,this.words[E+1]=i>>>26-C&67108863,(C+=24)>=26&&(C-=26,E++);else if("le"===Q)for(I=0,E=0;I<A.length;I+=3)i=A[I]|A[I+1]<<8|A[I+2]<<16,this.words[E]|=i<<C&67108863,this.words[E+1]=i>>>26-C&67108863,(C+=24)>=26&&(C-=26,E++);return this.strip()},E.prototype._parseHex=function(A,B){this.length=Math.ceil((A.length-B)/6),this.words=new Array(this.length);for(var Q=0;Q<this.length;Q++)this.words[Q]=0;var g,I,E=0;for(Q=A.length-6,g=0;Q>=B;Q-=6)I=C(A,Q,Q+6),this.words[g]|=I<<E&67108863,this.words[g+1]|=I>>>26-E&4194303,(E+=24)>=26&&(E-=26,g++);Q+6!==B&&(I=C(A,B,Q+6),this.words[g]|=I<<E&67108863,this.words[g+1]|=I>>>26-E&4194303),this.strip()},E.prototype._parseBase=function(A,B,Q){this.words=[0],this.length=1;for(var g=0,I=1;I<=67108863;I*=B)g++;g--,I=I/B|0;for(var E=A.length-Q,i=E%g,C=Math.min(E,E-i)+Q,e=0,o=Q;o<C;o+=g)e=t(A,o,o+g,B),this.imuln(I),this.words[0]+e<67108864?this.words[0]+=e:this._iaddn(e);if(0!==i){var s=1;for(e=t(A,o,A.length,B),o=0;o<i;o++)s*=B;this.imuln(s),this.words[0]+e<67108864?this.words[0]+=e:this._iaddn(e)}},E.prototype.copy=function(A){A.words=new Array(this.length);for(var B=0;B<this.length;B++)A.words[B]=this.words[B];A.length=this.length,A.negative=this.negative,A.red=this.red},E.prototype.clone=function(){var A=new E(null);return this.copy(A),A},E.prototype._expand=function(A){for(;this.length<A;)this.words[this.length++]=0;return this},E.prototype.strip=function(){for(;this.length>1&&0===this.words[this.length-1];)this.length--;return this._normSign()},E.prototype._normSign=function(){return 1===this.length&&0===this.words[0]&&(this.negative=0),this},E.prototype.inspect=function(){return(this.red?"<BN-R: ":"<BN: ")+this.toString(16)+">"};var e=["","0","00","000","0000","00000","000000","0000000","00000000","000000000","0000000000","00000000000","000000000000","0000000000000","00000000000000","000000000000000","0000000000000000","00000000000000000","000000000000000000","0000000000000000000","00000000000000000000","000000000000000000000","0000000000000000000000","00000000000000000000000","000000000000000000000000","0000000000000000000000000"],o=[0,0,25,16,12,11,10,9,8,8,7,7,7,7,6,6,6,6,6,6,6,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],s=[0,0,33554432,43046721,16777216,48828125,60466176,40353607,16777216,43046721,1e7,19487171,35831808,62748517,7529536,11390625,16777216,24137569,34012224,47045881,64e6,4084101,5153632,6436343,7962624,9765625,11881376,14348907,17210368,20511149,243e5,28629151,33554432,39135393,45435424,52521875,60466176];function r(A,B,Q){Q.negative=B.negative^A.negative;var g=A.length+B.length|0;Q.length=g,g=g-1|0;var I=0|A.words[0],E=0|B.words[0],i=I*E,C=67108863&i,t=i/67108864|0;Q.words[0]=C;for(var e=1;e<g;e++){for(var o=t>>>26,s=67108863&t,r=Math.min(e,B.length-1),h=Math.max(0,e-A.length+1);h<=r;h++){var n=e-h|0;o+=(i=(I=0|A.words[n])*(E=0|B.words[h])+s)/67108864|0,s=67108863&i}Q.words[e]=0|s,t=0|o}return 0!==t?Q.words[e]=0|t:Q.length--,Q.strip()}E.prototype.toString=function(A,B){var Q;if(B=0|B||1,16===(A=A||10)||"hex"===A){Q="";for(var I=0,E=0,i=0;i<this.length;i++){var C=this.words[i],t=(16777215&(C<<I|E)).toString(16);Q=0!==(E=C>>>24-I&16777215)||i!==this.length-1?e[6-t.length]+t+Q:t+Q,(I+=2)>=26&&(I-=26,i--)}for(0!==E&&(Q=E.toString(16)+Q);Q.length%B!=0;)Q="0"+Q;return 0!==this.negative&&(Q="-"+Q),Q}if(A===(0|A)&&A>=2&&A<=36){var r=o[A],h=s[A];Q="";var n=this.clone();for(n.negative=0;!n.isZero();){var a=n.modn(h).toString(A);Q=(n=n.idivn(h)).isZero()?a+Q:e[r-a.length]+a+Q}for(this.isZero()&&(Q="0"+Q);Q.length%B!=0;)Q="0"+Q;return 0!==this.negative&&(Q="-"+Q),Q}g(!1,"Base should be between 2 and 36")},E.prototype.toNumber=function(){var A=this.words[0];return 2===this.length?A+=67108864*this.words[1]:3===this.length&&1===this.words[2]?A+=4503599627370496+67108864*this.words[1]:this.length>2&&g(!1,"Number can only safely store up to 53 bits"),0!==this.negative?-A:A},E.prototype.toJSON=function(){return this.toString(16)},E.prototype.toBuffer=function(A,B){return g(void 0!==i),this.toArrayLike(i,A,B)},E.prototype.toArray=function(A,B){return this.toArrayLike(Array,A,B)},E.prototype.toArrayLike=function(A,B,Q){var I=this.byteLength(),E=Q||Math.max(1,I);g(I<=E,"byte array longer than desired length"),g(E>0,"Requested array length <= 0"),this.strip();var i,C,t="le"===B,e=new A(E),o=this.clone();if(t){for(C=0;!o.isZero();C++)i=o.andln(255),o.iushrn(8),e[C]=i;for(;C<E;C++)e[C]=0}else{for(C=0;C<E-I;C++)e[C]=0;for(C=0;!o.isZero();C++)i=o.andln(255),o.iushrn(8),e[E-C-1]=i}return e},Math.clz32?E.prototype._countBits=function(A){return 32-Math.clz32(A)}:E.prototype._countBits=function(A){var B=A,Q=0;return B>=4096&&(Q+=13,B>>>=13),B>=64&&(Q+=7,B>>>=7),B>=8&&(Q+=4,B>>>=4),B>=2&&(Q+=2,B>>>=2),Q+B},E.prototype._zeroBits=function(A){if(0===A)return 26;var B=A,Q=0;return 0==(8191&B)&&(Q+=13,B>>>=13),0==(127&B)&&(Q+=7,B>>>=7),0==(15&B)&&(Q+=4,B>>>=4),0==(3&B)&&(Q+=2,B>>>=2),0==(1&B)&&Q++,Q},E.prototype.bitLength=function(){var A=this.words[this.length-1],B=this._countBits(A);return 26*(this.length-1)+B},E.prototype.zeroBits=function(){if(this.isZero())return 0;for(var A=0,B=0;B<this.length;B++){var Q=this._zeroBits(this.words[B]);if(A+=Q,26!==Q)break}return A},E.prototype.byteLength=function(){return Math.ceil(this.bitLength()/8)},E.prototype.toTwos=function(A){return 0!==this.negative?this.abs().inotn(A).iaddn(1):this.clone()},E.prototype.fromTwos=function(A){return this.testn(A-1)?this.notn(A).iaddn(1).ineg():this.clone()},E.prototype.isNeg=function(){return 0!==this.negative},E.prototype.neg=function(){return this.clone().ineg()},E.prototype.ineg=function(){return this.isZero()||(this.negative^=1),this},E.prototype.iuor=function(A){for(;this.length<A.length;)this.words[this.length++]=0;for(var B=0;B<A.length;B++)this.words[B]=this.words[B]|A.words[B];return this.strip()},E.prototype.ior=function(A){return g(0==(this.negative|A.negative)),this.iuor(A)},E.prototype.or=function(A){return this.length>A.length?this.clone().ior(A):A.clone().ior(this)},E.prototype.uor=function(A){return this.length>A.length?this.clone().iuor(A):A.clone().iuor(this)},E.prototype.iuand=function(A){var B;B=this.length>A.length?A:this;for(var Q=0;Q<B.length;Q++)this.words[Q]=this.words[Q]&A.words[Q];return this.length=B.length,this.strip()},E.prototype.iand=function(A){return g(0==(this.negative|A.negative)),this.iuand(A)},E.prototype.and=function(A){return this.length>A.length?this.clone().iand(A):A.clone().iand(this)},E.prototype.uand=function(A){return this.length>A.length?this.clone().iuand(A):A.clone().iuand(this)},E.prototype.iuxor=function(A){var B,Q;this.length>A.length?(B=this,Q=A):(B=A,Q=this);for(var g=0;g<Q.length;g++)this.words[g]=B.words[g]^Q.words[g];if(this!==B)for(;g<B.length;g++)this.words[g]=B.words[g];return this.length=B.length,this.strip()},E.prototype.ixor=function(A){return g(0==(this.negative|A.negative)),this.iuxor(A)},E.prototype.xor=function(A){return this.length>A.length?this.clone().ixor(A):A.clone().ixor(this)},E.prototype.uxor=function(A){return this.length>A.length?this.clone().iuxor(A):A.clone().iuxor(this)},E.prototype.inotn=function(A){g("number"==typeof A&&A>=0);var B=0|Math.ceil(A/26),Q=A%26;this._expand(B),Q>0&&B--;for(var I=0;I<B;I++)this.words[I]=67108863&~this.words[I];return Q>0&&(this.words[I]=~this.words[I]&67108863>>26-Q),this.strip()},E.prototype.notn=function(A){return this.clone().inotn(A)},E.prototype.setn=function(A,B){g("number"==typeof A&&A>=0);var Q=A/26|0,I=A%26;return this._expand(Q+1),this.words[Q]=B?this.words[Q]|1<<I:this.words[Q]&~(1<<I),this.strip()},E.prototype.iadd=function(A){var B,Q,g;if(0!==this.negative&&0===A.negative)return this.negative=0,B=this.isub(A),this.negative^=1,this._normSign();if(0===this.negative&&0!==A.negative)return A.negative=0,B=this.isub(A),A.negative=1,B._normSign();this.length>A.length?(Q=this,g=A):(Q=A,g=this);for(var I=0,E=0;E<g.length;E++)B=(0|Q.words[E])+(0|g.words[E])+I,this.words[E]=67108863&B,I=B>>>26;for(;0!==I&&E<Q.length;E++)B=(0|Q.words[E])+I,this.words[E]=67108863&B,I=B>>>26;if(this.length=Q.length,0!==I)this.words[this.length]=I,this.length++;else if(Q!==this)for(;E<Q.length;E++)this.words[E]=Q.words[E];return this},E.prototype.add=function(A){var B;return 0!==A.negative&&0===this.negative?(A.negative=0,B=this.sub(A),A.negative^=1,B):0===A.negative&&0!==this.negative?(this.negative=0,B=A.sub(this),this.negative=1,B):this.length>A.length?this.clone().iadd(A):A.clone().iadd(this)},E.prototype.isub=function(A){if(0!==A.negative){A.negative=0;var B=this.iadd(A);return A.negative=1,B._normSign()}if(0!==this.negative)return this.negative=0,this.iadd(A),this.negative=1,this._normSign();var Q,g,I=this.cmp(A);if(0===I)return this.negative=0,this.length=1,this.words[0]=0,this;I>0?(Q=this,g=A):(Q=A,g=this);for(var E=0,i=0;i<g.length;i++)E=(B=(0|Q.words[i])-(0|g.words[i])+E)>>26,this.words[i]=67108863&B;for(;0!==E&&i<Q.length;i++)E=(B=(0|Q.words[i])+E)>>26,this.words[i]=67108863&B;if(0===E&&i<Q.length&&Q!==this)for(;i<Q.length;i++)this.words[i]=Q.words[i];return this.length=Math.max(this.length,i),Q!==this&&(this.negative=1),this.strip()},E.prototype.sub=function(A){return this.clone().isub(A)};var h=function(A,B,Q){var g,I,E,i=A.words,C=B.words,t=Q.words,e=0,o=0|i[0],s=8191&o,r=o>>>13,h=0|i[1],n=8191&h,a=h>>>13,c=0|i[2],y=8191&c,D=c>>>13,u=0|i[3],f=8191&u,w=u>>>13,F=0|i[4],d=8191&F,l=F>>>13,U=0|i[5],N=8191&U,H=U>>>13,G=0|i[6],Y=8191&G,L=G>>>13,R=0|i[7],p=8191&R,M=R>>>13,m=0|i[8],k=8191&m,S=m>>>13,b=0|i[9],v=8191&b,J=b>>>13,V=0|C[0],K=8191&V,x=V>>>13,Z=0|C[1],q=8191&Z,O=Z>>>13,j=0|C[2],W=8191&j,X=j>>>13,T=0|C[3],z=8191&T,_=T>>>13,P=0|C[4],$=8191&P,AA=P>>>13,BA=0|C[5],QA=8191&BA,gA=BA>>>13,IA=0|C[6],EA=8191&IA,iA=IA>>>13,CA=0|C[7],tA=8191&CA,eA=CA>>>13,oA=0|C[8],sA=8191&oA,rA=oA>>>13,hA=0|C[9],nA=8191&hA,aA=hA>>>13;Q.negative=A.negative^B.negative,Q.length=19;var cA=(e+(g=Math.imul(s,K))|0)+((8191&(I=(I=Math.imul(s,x))+Math.imul(r,K)|0))<<13)|0;e=((E=Math.imul(r,x))+(I>>>13)|0)+(cA>>>26)|0,cA&=67108863,g=Math.imul(n,K),I=(I=Math.imul(n,x))+Math.imul(a,K)|0,E=Math.imul(a,x);var yA=(e+(g=g+Math.imul(s,q)|0)|0)+((8191&(I=(I=I+Math.imul(s,O)|0)+Math.imul(r,q)|0))<<13)|0;e=((E=E+Math.imul(r,O)|0)+(I>>>13)|0)+(yA>>>26)|0,yA&=67108863,g=Math.imul(y,K),I=(I=Math.imul(y,x))+Math.imul(D,K)|0,E=Math.imul(D,x),g=g+Math.imul(n,q)|0,I=(I=I+Math.imul(n,O)|0)+Math.imul(a,q)|0,E=E+Math.imul(a,O)|0;var DA=(e+(g=g+Math.imul(s,W)|0)|0)+((8191&(I=(I=I+Math.imul(s,X)|0)+Math.imul(r,W)|0))<<13)|0;e=((E=E+Math.imul(r,X)|0)+(I>>>13)|0)+(DA>>>26)|0,DA&=67108863,g=Math.imul(f,K),I=(I=Math.imul(f,x))+Math.imul(w,K)|0,E=Math.imul(w,x),g=g+Math.imul(y,q)|0,I=(I=I+Math.imul(y,O)|0)+Math.imul(D,q)|0,E=E+Math.imul(D,O)|0,g=g+Math.imul(n,W)|0,I=(I=I+Math.imul(n,X)|0)+Math.imul(a,W)|0,E=E+Math.imul(a,X)|0;var uA=(e+(g=g+Math.imul(s,z)|0)|0)+((8191&(I=(I=I+Math.imul(s,_)|0)+Math.imul(r,z)|0))<<13)|0;e=((E=E+Math.imul(r,_)|0)+(I>>>13)|0)+(uA>>>26)|0,uA&=67108863,g=Math.imul(d,K),I=(I=Math.imul(d,x))+Math.imul(l,K)|0,E=Math.imul(l,x),g=g+Math.imul(f,q)|0,I=(I=I+Math.imul(f,O)|0)+Math.imul(w,q)|0,E=E+Math.imul(w,O)|0,g=g+Math.imul(y,W)|0,I=(I=I+Math.imul(y,X)|0)+Math.imul(D,W)|0,E=E+Math.imul(D,X)|0,g=g+Math.imul(n,z)|0,I=(I=I+Math.imul(n,_)|0)+Math.imul(a,z)|0,E=E+Math.imul(a,_)|0;var fA=(e+(g=g+Math.imul(s,$)|0)|0)+((8191&(I=(I=I+Math.imul(s,AA)|0)+Math.imul(r,$)|0))<<13)|0;e=((E=E+Math.imul(r,AA)|0)+(I>>>13)|0)+(fA>>>26)|0,fA&=67108863,g=Math.imul(N,K),I=(I=Math.imul(N,x))+Math.imul(H,K)|0,E=Math.imul(H,x),g=g+Math.imul(d,q)|0,I=(I=I+Math.imul(d,O)|0)+Math.imul(l,q)|0,E=E+Math.imul(l,O)|0,g=g+Math.imul(f,W)|0,I=(I=I+Math.imul(f,X)|0)+Math.imul(w,W)|0,E=E+Math.imul(w,X)|0,g=g+Math.imul(y,z)|0,I=(I=I+Math.imul(y,_)|0)+Math.imul(D,z)|0,E=E+Math.imul(D,_)|0,g=g+Math.imul(n,$)|0,I=(I=I+Math.imul(n,AA)|0)+Math.imul(a,$)|0,E=E+Math.imul(a,AA)|0;var wA=(e+(g=g+Math.imul(s,QA)|0)|0)+((8191&(I=(I=I+Math.imul(s,gA)|0)+Math.imul(r,QA)|0))<<13)|0;e=((E=E+Math.imul(r,gA)|0)+(I>>>13)|0)+(wA>>>26)|0,wA&=67108863,g=Math.imul(Y,K),I=(I=Math.imul(Y,x))+Math.imul(L,K)|0,E=Math.imul(L,x),g=g+Math.imul(N,q)|0,I=(I=I+Math.imul(N,O)|0)+Math.imul(H,q)|0,E=E+Math.imul(H,O)|0,g=g+Math.imul(d,W)|0,I=(I=I+Math.imul(d,X)|0)+Math.imul(l,W)|0,E=E+Math.imul(l,X)|0,g=g+Math.imul(f,z)|0,I=(I=I+Math.imul(f,_)|0)+Math.imul(w,z)|0,E=E+Math.imul(w,_)|0,g=g+Math.imul(y,$)|0,I=(I=I+Math.imul(y,AA)|0)+Math.imul(D,$)|0,E=E+Math.imul(D,AA)|0,g=g+Math.imul(n,QA)|0,I=(I=I+Math.imul(n,gA)|0)+Math.imul(a,QA)|0,E=E+Math.imul(a,gA)|0;var FA=(e+(g=g+Math.imul(s,EA)|0)|0)+((8191&(I=(I=I+Math.imul(s,iA)|0)+Math.imul(r,EA)|0))<<13)|0;e=((E=E+Math.imul(r,iA)|0)+(I>>>13)|0)+(FA>>>26)|0,FA&=67108863,g=Math.imul(p,K),I=(I=Math.imul(p,x))+Math.imul(M,K)|0,E=Math.imul(M,x),g=g+Math.imul(Y,q)|0,I=(I=I+Math.imul(Y,O)|0)+Math.imul(L,q)|0,E=E+Math.imul(L,O)|0,g=g+Math.imul(N,W)|0,I=(I=I+Math.imul(N,X)|0)+Math.imul(H,W)|0,E=E+Math.imul(H,X)|0,g=g+Math.imul(d,z)|0,I=(I=I+Math.imul(d,_)|0)+Math.imul(l,z)|0,E=E+Math.imul(l,_)|0,g=g+Math.imul(f,$)|0,I=(I=I+Math.imul(f,AA)|0)+Math.imul(w,$)|0,E=E+Math.imul(w,AA)|0,g=g+Math.imul(y,QA)|0,I=(I=I+Math.imul(y,gA)|0)+Math.imul(D,QA)|0,E=E+Math.imul(D,gA)|0,g=g+Math.imul(n,EA)|0,I=(I=I+Math.imul(n,iA)|0)+Math.imul(a,EA)|0,E=E+Math.imul(a,iA)|0;var dA=(e+(g=g+Math.imul(s,tA)|0)|0)+((8191&(I=(I=I+Math.imul(s,eA)|0)+Math.imul(r,tA)|0))<<13)|0;e=((E=E+Math.imul(r,eA)|0)+(I>>>13)|0)+(dA>>>26)|0,dA&=67108863,g=Math.imul(k,K),I=(I=Math.imul(k,x))+Math.imul(S,K)|0,E=Math.imul(S,x),g=g+Math.imul(p,q)|0,I=(I=I+Math.imul(p,O)|0)+Math.imul(M,q)|0,E=E+Math.imul(M,O)|0,g=g+Math.imul(Y,W)|0,I=(I=I+Math.imul(Y,X)|0)+Math.imul(L,W)|0,E=E+Math.imul(L,X)|0,g=g+Math.imul(N,z)|0,I=(I=I+Math.imul(N,_)|0)+Math.imul(H,z)|0,E=E+Math.imul(H,_)|0,g=g+Math.imul(d,$)|0,I=(I=I+Math.imul(d,AA)|0)+Math.imul(l,$)|0,E=E+Math.imul(l,AA)|0,g=g+Math.imul(f,QA)|0,I=(I=I+Math.imul(f,gA)|0)+Math.imul(w,QA)|0,E=E+Math.imul(w,gA)|0,g=g+Math.imul(y,EA)|0,I=(I=I+Math.imul(y,iA)|0)+Math.imul(D,EA)|0,E=E+Math.imul(D,iA)|0,g=g+Math.imul(n,tA)|0,I=(I=I+Math.imul(n,eA)|0)+Math.imul(a,tA)|0,E=E+Math.imul(a,eA)|0;var lA=(e+(g=g+Math.imul(s,sA)|0)|0)+((8191&(I=(I=I+Math.imul(s,rA)|0)+Math.imul(r,sA)|0))<<13)|0;e=((E=E+Math.imul(r,rA)|0)+(I>>>13)|0)+(lA>>>26)|0,lA&=67108863,g=Math.imul(v,K),I=(I=Math.imul(v,x))+Math.imul(J,K)|0,E=Math.imul(J,x),g=g+Math.imul(k,q)|0,I=(I=I+Math.imul(k,O)|0)+Math.imul(S,q)|0,E=E+Math.imul(S,O)|0,g=g+Math.imul(p,W)|0,I=(I=I+Math.imul(p,X)|0)+Math.imul(M,W)|0,E=E+Math.imul(M,X)|0,g=g+Math.imul(Y,z)|0,I=(I=I+Math.imul(Y,_)|0)+Math.imul(L,z)|0,E=E+Math.imul(L,_)|0,g=g+Math.imul(N,$)|0,I=(I=I+Math.imul(N,AA)|0)+Math.imul(H,$)|0,E=E+Math.imul(H,AA)|0,g=g+Math.imul(d,QA)|0,I=(I=I+Math.imul(d,gA)|0)+Math.imul(l,QA)|0,E=E+Math.imul(l,gA)|0,g=g+Math.imul(f,EA)|0,I=(I=I+Math.imul(f,iA)|0)+Math.imul(w,EA)|0,E=E+Math.imul(w,iA)|0,g=g+Math.imul(y,tA)|0,I=(I=I+Math.imul(y,eA)|0)+Math.imul(D,tA)|0,E=E+Math.imul(D,eA)|0,g=g+Math.imul(n,sA)|0,I=(I=I+Math.imul(n,rA)|0)+Math.imul(a,sA)|0,E=E+Math.imul(a,rA)|0;var UA=(e+(g=g+Math.imul(s,nA)|0)|0)+((8191&(I=(I=I+Math.imul(s,aA)|0)+Math.imul(r,nA)|0))<<13)|0;e=((E=E+Math.imul(r,aA)|0)+(I>>>13)|0)+(UA>>>26)|0,UA&=67108863,g=Math.imul(v,q),I=(I=Math.imul(v,O))+Math.imul(J,q)|0,E=Math.imul(J,O),g=g+Math.imul(k,W)|0,I=(I=I+Math.imul(k,X)|0)+Math.imul(S,W)|0,E=E+Math.imul(S,X)|0,g=g+Math.imul(p,z)|0,I=(I=I+Math.imul(p,_)|0)+Math.imul(M,z)|0,E=E+Math.imul(M,_)|0,g=g+Math.imul(Y,$)|0,I=(I=I+Math.imul(Y,AA)|0)+Math.imul(L,$)|0,E=E+Math.imul(L,AA)|0,g=g+Math.imul(N,QA)|0,I=(I=I+Math.imul(N,gA)|0)+Math.imul(H,QA)|0,E=E+Math.imul(H,gA)|0,g=g+Math.imul(d,EA)|0,I=(I=I+Math.imul(d,iA)|0)+Math.imul(l,EA)|0,E=E+Math.imul(l,iA)|0,g=g+Math.imul(f,tA)|0,I=(I=I+Math.imul(f,eA)|0)+Math.imul(w,tA)|0,E=E+Math.imul(w,eA)|0,g=g+Math.imul(y,sA)|0,I=(I=I+Math.imul(y,rA)|0)+Math.imul(D,sA)|0,E=E+Math.imul(D,rA)|0;var NA=(e+(g=g+Math.imul(n,nA)|0)|0)+((8191&(I=(I=I+Math.imul(n,aA)|0)+Math.imul(a,nA)|0))<<13)|0;e=((E=E+Math.imul(a,aA)|0)+(I>>>13)|0)+(NA>>>26)|0,NA&=67108863,g=Math.imul(v,W),I=(I=Math.imul(v,X))+Math.imul(J,W)|0,E=Math.imul(J,X),g=g+Math.imul(k,z)|0,I=(I=I+Math.imul(k,_)|0)+Math.imul(S,z)|0,E=E+Math.imul(S,_)|0,g=g+Math.imul(p,$)|0,I=(I=I+Math.imul(p,AA)|0)+Math.imul(M,$)|0,E=E+Math.imul(M,AA)|0,g=g+Math.imul(Y,QA)|0,I=(I=I+Math.imul(Y,gA)|0)+Math.imul(L,QA)|0,E=E+Math.imul(L,gA)|0,g=g+Math.imul(N,EA)|0,I=(I=I+Math.imul(N,iA)|0)+Math.imul(H,EA)|0,E=E+Math.imul(H,iA)|0,g=g+Math.imul(d,tA)|0,I=(I=I+Math.imul(d,eA)|0)+Math.imul(l,tA)|0,E=E+Math.imul(l,eA)|0,g=g+Math.imul(f,sA)|0,I=(I=I+Math.imul(f,rA)|0)+Math.imul(w,sA)|0,E=E+Math.imul(w,rA)|0;var HA=(e+(g=g+Math.imul(y,nA)|0)|0)+((8191&(I=(I=I+Math.imul(y,aA)|0)+Math.imul(D,nA)|0))<<13)|0;e=((E=E+Math.imul(D,aA)|0)+(I>>>13)|0)+(HA>>>26)|0,HA&=67108863,g=Math.imul(v,z),I=(I=Math.imul(v,_))+Math.imul(J,z)|0,E=Math.imul(J,_),g=g+Math.imul(k,$)|0,I=(I=I+Math.imul(k,AA)|0)+Math.imul(S,$)|0,E=E+Math.imul(S,AA)|0,g=g+Math.imul(p,QA)|0,I=(I=I+Math.imul(p,gA)|0)+Math.imul(M,QA)|0,E=E+Math.imul(M,gA)|0,g=g+Math.imul(Y,EA)|0,I=(I=I+Math.imul(Y,iA)|0)+Math.imul(L,EA)|0,E=E+Math.imul(L,iA)|0,g=g+Math.imul(N,tA)|0,I=(I=I+Math.imul(N,eA)|0)+Math.imul(H,tA)|0,E=E+Math.imul(H,eA)|0,g=g+Math.imul(d,sA)|0,I=(I=I+Math.imul(d,rA)|0)+Math.imul(l,sA)|0,E=E+Math.imul(l,rA)|0;var GA=(e+(g=g+Math.imul(f,nA)|0)|0)+((8191&(I=(I=I+Math.imul(f,aA)|0)+Math.imul(w,nA)|0))<<13)|0;e=((E=E+Math.imul(w,aA)|0)+(I>>>13)|0)+(GA>>>26)|0,GA&=67108863,g=Math.imul(v,$),I=(I=Math.imul(v,AA))+Math.imul(J,$)|0,E=Math.imul(J,AA),g=g+Math.imul(k,QA)|0,I=(I=I+Math.imul(k,gA)|0)+Math.imul(S,QA)|0,E=E+Math.imul(S,gA)|0,g=g+Math.imul(p,EA)|0,I=(I=I+Math.imul(p,iA)|0)+Math.imul(M,EA)|0,E=E+Math.imul(M,iA)|0,g=g+Math.imul(Y,tA)|0,I=(I=I+Math.imul(Y,eA)|0)+Math.imul(L,tA)|0,E=E+Math.imul(L,eA)|0,g=g+Math.imul(N,sA)|0,I=(I=I+Math.imul(N,rA)|0)+Math.imul(H,sA)|0,E=E+Math.imul(H,rA)|0;var YA=(e+(g=g+Math.imul(d,nA)|0)|0)+((8191&(I=(I=I+Math.imul(d,aA)|0)+Math.imul(l,nA)|0))<<13)|0;e=((E=E+Math.imul(l,aA)|0)+(I>>>13)|0)+(YA>>>26)|0,YA&=67108863,g=Math.imul(v,QA),I=(I=Math.imul(v,gA))+Math.imul(J,QA)|0,E=Math.imul(J,gA),g=g+Math.imul(k,EA)|0,I=(I=I+Math.imul(k,iA)|0)+Math.imul(S,EA)|0,E=E+Math.imul(S,iA)|0,g=g+Math.imul(p,tA)|0,I=(I=I+Math.imul(p,eA)|0)+Math.imul(M,tA)|0,E=E+Math.imul(M,eA)|0,g=g+Math.imul(Y,sA)|0,I=(I=I+Math.imul(Y,rA)|0)+Math.imul(L,sA)|0,E=E+Math.imul(L,rA)|0;var LA=(e+(g=g+Math.imul(N,nA)|0)|0)+((8191&(I=(I=I+Math.imul(N,aA)|0)+Math.imul(H,nA)|0))<<13)|0;e=((E=E+Math.imul(H,aA)|0)+(I>>>13)|0)+(LA>>>26)|0,LA&=67108863,g=Math.imul(v,EA),I=(I=Math.imul(v,iA))+Math.imul(J,EA)|0,E=Math.imul(J,iA),g=g+Math.imul(k,tA)|0,I=(I=I+Math.imul(k,eA)|0)+Math.imul(S,tA)|0,E=E+Math.imul(S,eA)|0,g=g+Math.imul(p,sA)|0,I=(I=I+Math.imul(p,rA)|0)+Math.imul(M,sA)|0,E=E+Math.imul(M,rA)|0;var RA=(e+(g=g+Math.imul(Y,nA)|0)|0)+((8191&(I=(I=I+Math.imul(Y,aA)|0)+Math.imul(L,nA)|0))<<13)|0;e=((E=E+Math.imul(L,aA)|0)+(I>>>13)|0)+(RA>>>26)|0,RA&=67108863,g=Math.imul(v,tA),I=(I=Math.imul(v,eA))+Math.imul(J,tA)|0,E=Math.imul(J,eA),g=g+Math.imul(k,sA)|0,I=(I=I+Math.imul(k,rA)|0)+Math.imul(S,sA)|0,E=E+Math.imul(S,rA)|0;var pA=(e+(g=g+Math.imul(p,nA)|0)|0)+((8191&(I=(I=I+Math.imul(p,aA)|0)+Math.imul(M,nA)|0))<<13)|0;e=((E=E+Math.imul(M,aA)|0)+(I>>>13)|0)+(pA>>>26)|0,pA&=67108863,g=Math.imul(v,sA),I=(I=Math.imul(v,rA))+Math.imul(J,sA)|0,E=Math.imul(J,rA);var MA=(e+(g=g+Math.imul(k,nA)|0)|0)+((8191&(I=(I=I+Math.imul(k,aA)|0)+Math.imul(S,nA)|0))<<13)|0;e=((E=E+Math.imul(S,aA)|0)+(I>>>13)|0)+(MA>>>26)|0,MA&=67108863;var mA=(e+(g=Math.imul(v,nA))|0)+((8191&(I=(I=Math.imul(v,aA))+Math.imul(J,nA)|0))<<13)|0;return e=((E=Math.imul(J,aA))+(I>>>13)|0)+(mA>>>26)|0,mA&=67108863,t[0]=cA,t[1]=yA,t[2]=DA,t[3]=uA,t[4]=fA,t[5]=wA,t[6]=FA,t[7]=dA,t[8]=lA,t[9]=UA,t[10]=NA,t[11]=HA,t[12]=GA,t[13]=YA,t[14]=LA,t[15]=RA,t[16]=pA,t[17]=MA,t[18]=mA,0!==e&&(t[19]=e,Q.length++),Q};function n(A,B,Q){return(new a).mulp(A,B,Q)}function a(A,B){this.x=A,this.y=B}Math.imul||(h=r),E.prototype.mulTo=function(A,B){var Q=this.length+A.length;return 10===this.length&&10===A.length?h(this,A,B):Q<63?r(this,A,B):Q<1024?function(A,B,Q){Q.negative=B.negative^A.negative,Q.length=A.length+B.length;for(var g=0,I=0,E=0;E<Q.length-1;E++){var i=I;I=0;for(var C=67108863&g,t=Math.min(E,B.length-1),e=Math.max(0,E-A.length+1);e<=t;e++){var o=E-e,s=(0|A.words[o])*(0|B.words[e]),r=67108863&s;C=67108863&(r=r+C|0),I+=(i=(i=i+(s/67108864|0)|0)+(r>>>26)|0)>>>26,i&=67108863}Q.words[E]=C,g=i,i=I}return 0!==g?Q.words[E]=g:Q.length--,Q.strip()}(this,A,B):n(this,A,B)},a.prototype.makeRBT=function(A){for(var B=new Array(A),Q=E.prototype._countBits(A)-1,g=0;g<A;g++)B[g]=this.revBin(g,Q,A);return B},a.prototype.revBin=function(A,B,Q){if(0===A||A===Q-1)return A;for(var g=0,I=0;I<B;I++)g|=(1&A)<<B-I-1,A>>=1;return g},a.prototype.permute=function(A,B,Q,g,I,E){for(var i=0;i<E;i++)g[i]=B[A[i]],I[i]=Q[A[i]]},a.prototype.transform=function(A,B,Q,g,I,E){this.permute(E,A,B,Q,g,I);for(var i=1;i<I;i<<=1)for(var C=i<<1,t=Math.cos(2*Math.PI/C),e=Math.sin(2*Math.PI/C),o=0;o<I;o+=C)for(var s=t,r=e,h=0;h<i;h++){var n=Q[o+h],a=g[o+h],c=Q[o+h+i],y=g[o+h+i],D=s*c-r*y;y=s*y+r*c,c=D,Q[o+h]=n+c,g[o+h]=a+y,Q[o+h+i]=n-c,g[o+h+i]=a-y,h!==C&&(D=t*s-e*r,r=t*r+e*s,s=D)}},a.prototype.guessLen13b=function(A,B){var Q=1|Math.max(B,A),g=1&Q,I=0;for(Q=Q/2|0;Q;Q>>>=1)I++;return 1<<I+1+g},a.prototype.conjugate=function(A,B,Q){if(!(Q<=1))for(var g=0;g<Q/2;g++){var I=A[g];A[g]=A[Q-g-1],A[Q-g-1]=I,I=B[g],B[g]=-B[Q-g-1],B[Q-g-1]=-I}},a.prototype.normalize13b=function(A,B){for(var Q=0,g=0;g<B/2;g++){var I=8192*Math.round(A[2*g+1]/B)+Math.round(A[2*g]/B)+Q;A[g]=67108863&I,Q=I<67108864?0:I/67108864|0}return A},a.prototype.convert13b=function(A,B,Q,I){for(var E=0,i=0;i<B;i++)E+=0|A[i],Q[2*i]=8191&E,E>>>=13,Q[2*i+1]=8191&E,E>>>=13;for(i=2*B;i<I;++i)Q[i]=0;g(0===E),g(0==(-8192&E))},a.prototype.stub=function(A){for(var B=new Array(A),Q=0;Q<A;Q++)B[Q]=0;return B},a.prototype.mulp=function(A,B,Q){var g=2*this.guessLen13b(A.length,B.length),I=this.makeRBT(g),E=this.stub(g),i=new Array(g),C=new Array(g),t=new Array(g),e=new Array(g),o=new Array(g),s=new Array(g),r=Q.words;r.length=g,this.convert13b(A.words,A.length,i,g),this.convert13b(B.words,B.length,e,g),this.transform(i,E,C,t,g,I),this.transform(e,E,o,s,g,I);for(var h=0;h<g;h++){var n=C[h]*o[h]-t[h]*s[h];t[h]=C[h]*s[h]+t[h]*o[h],C[h]=n}return this.conjugate(C,t,g),this.transform(C,t,r,E,g,I),this.conjugate(r,E,g),this.normalize13b(r,g),Q.negative=A.negative^B.negative,Q.length=A.length+B.length,Q.strip()},E.prototype.mul=function(A){var B=new E(null);return B.words=new Array(this.length+A.length),this.mulTo(A,B)},E.prototype.mulf=function(A){var B=new E(null);return B.words=new Array(this.length+A.length),n(this,A,B)},E.prototype.imul=function(A){return this.clone().mulTo(A,this)},E.prototype.imuln=function(A){g("number"==typeof A),g(A<67108864);for(var B=0,Q=0;Q<this.length;Q++){var I=(0|this.words[Q])*A,E=(67108863&I)+(67108863&B);B>>=26,B+=I/67108864|0,B+=E>>>26,this.words[Q]=67108863&E}return 0!==B&&(this.words[Q]=B,this.length++),this},E.prototype.muln=function(A){return this.clone().imuln(A)},E.prototype.sqr=function(){return this.mul(this)},E.prototype.isqr=function(){return this.imul(this.clone())},E.prototype.pow=function(A){var B=function(A){for(var B=new Array(A.bitLength()),Q=0;Q<B.length;Q++){var g=Q/26|0,I=Q%26;B[Q]=(A.words[g]&1<<I)>>>I}return B}(A);if(0===B.length)return new E(1);for(var Q=this,g=0;g<B.length&&0===B[g];g++,Q=Q.sqr());if(++g<B.length)for(var I=Q.sqr();g<B.length;g++,I=I.sqr())0!==B[g]&&(Q=Q.mul(I));return Q},E.prototype.iushln=function(A){g("number"==typeof A&&A>=0);var B,Q=A%26,I=(A-Q)/26,E=67108863>>>26-Q<<26-Q;if(0!==Q){var i=0;for(B=0;B<this.length;B++){var C=this.words[B]&E,t=(0|this.words[B])-C<<Q;this.words[B]=t|i,i=C>>>26-Q}i&&(this.words[B]=i,this.length++)}if(0!==I){for(B=this.length-1;B>=0;B--)this.words[B+I]=this.words[B];for(B=0;B<I;B++)this.words[B]=0;this.length+=I}return this.strip()},E.prototype.ishln=function(A){return g(0===this.negative),this.iushln(A)},E.prototype.iushrn=function(A,B,Q){var I;g("number"==typeof A&&A>=0),I=B?(B-B%26)/26:0;var E=A%26,i=Math.min((A-E)/26,this.length),C=67108863^67108863>>>E<<E,t=Q;if(I-=i,I=Math.max(0,I),t){for(var e=0;e<i;e++)t.words[e]=this.words[e];t.length=i}if(0===i);else if(this.length>i)for(this.length-=i,e=0;e<this.length;e++)this.words[e]=this.words[e+i];else this.words[0]=0,this.length=1;var o=0;for(e=this.length-1;e>=0&&(0!==o||e>=I);e--){var s=0|this.words[e];this.words[e]=o<<26-E|s>>>E,o=s&C}return t&&0!==o&&(t.words[t.length++]=o),0===this.length&&(this.words[0]=0,this.length=1),this.strip()},E.prototype.ishrn=function(A,B,Q){return g(0===this.negative),this.iushrn(A,B,Q)},E.prototype.shln=function(A){return this.clone().ishln(A)},E.prototype.ushln=function(A){return this.clone().iushln(A)},E.prototype.shrn=function(A){return this.clone().ishrn(A)},E.prototype.ushrn=function(A){return this.clone().iushrn(A)},E.prototype.testn=function(A){g("number"==typeof A&&A>=0);var B=A%26,Q=(A-B)/26,I=1<<B;return!(this.length<=Q)&&!!(this.words[Q]&I)},E.prototype.imaskn=function(A){g("number"==typeof A&&A>=0);var B=A%26,Q=(A-B)/26;if(g(0===this.negative,"imaskn works only with positive numbers"),this.length<=Q)return this;if(0!==B&&Q++,this.length=Math.min(Q,this.length),0!==B){var I=67108863^67108863>>>B<<B;this.words[this.length-1]&=I}return this.strip()},E.prototype.maskn=function(A){return this.clone().imaskn(A)},E.prototype.iaddn=function(A){return g("number"==typeof A),g(A<67108864),A<0?this.isubn(-A):0!==this.negative?1===this.length&&(0|this.words[0])<A?(this.words[0]=A-(0|this.words[0]),this.negative=0,this):(this.negative=0,this.isubn(A),this.negative=1,this):this._iaddn(A)},E.prototype._iaddn=function(A){this.words[0]+=A;for(var B=0;B<this.length&&this.words[B]>=67108864;B++)this.words[B]-=67108864,B===this.length-1?this.words[B+1]=1:this.words[B+1]++;return this.length=Math.max(this.length,B+1),this},E.prototype.isubn=function(A){if(g("number"==typeof A),g(A<67108864),A<0)return this.iaddn(-A);if(0!==this.negative)return this.negative=0,this.iaddn(A),this.negative=1,this;if(this.words[0]-=A,1===this.length&&this.words[0]<0)this.words[0]=-this.words[0],this.negative=1;else for(var B=0;B<this.length&&this.words[B]<0;B++)this.words[B]+=67108864,this.words[B+1]-=1;return this.strip()},E.prototype.addn=function(A){return this.clone().iaddn(A)},E.prototype.subn=function(A){return this.clone().isubn(A)},E.prototype.iabs=function(){return this.negative=0,this},E.prototype.abs=function(){return this.clone().iabs()},E.prototype._ishlnsubmul=function(A,B,Q){var I,E,i=A.length+Q;this._expand(i);var C=0;for(I=0;I<A.length;I++){E=(0|this.words[I+Q])+C;var t=(0|A.words[I])*B;C=((E-=67108863&t)>>26)-(t/67108864|0),this.words[I+Q]=67108863&E}for(;I<this.length-Q;I++)C=(E=(0|this.words[I+Q])+C)>>26,this.words[I+Q]=67108863&E;if(0===C)return this.strip();for(g(-1===C),C=0,I=0;I<this.length;I++)C=(E=-(0|this.words[I])+C)>>26,this.words[I]=67108863&E;return this.negative=1,this.strip()},E.prototype._wordDiv=function(A,B){var Q=(this.length,A.length),g=this.clone(),I=A,i=0|I.words[I.length-1];0!==(Q=26-this._countBits(i))&&(I=I.ushln(Q),g.iushln(Q),i=0|I.words[I.length-1]);var C,t=g.length-I.length;if("mod"!==B){(C=new E(null)).length=t+1,C.words=new Array(C.length);for(var e=0;e<C.length;e++)C.words[e]=0}var o=g.clone()._ishlnsubmul(I,1,t);0===o.negative&&(g=o,C&&(C.words[t]=1));for(var s=t-1;s>=0;s--){var r=67108864*(0|g.words[I.length+s])+(0|g.words[I.length+s-1]);for(r=Math.min(r/i|0,67108863),g._ishlnsubmul(I,r,s);0!==g.negative;)r--,g.negative=0,g._ishlnsubmul(I,1,s),g.isZero()||(g.negative^=1);C&&(C.words[s]=r)}return C&&C.strip(),g.strip(),"div"!==B&&0!==Q&&g.iushrn(Q),{div:C||null,mod:g}},E.prototype.divmod=function(A,B,Q){return g(!A.isZero()),this.isZero()?{div:new E(0),mod:new E(0)}:0!==this.negative&&0===A.negative?(C=this.neg().divmod(A,B),"mod"!==B&&(I=C.div.neg()),"div"!==B&&(i=C.mod.neg(),Q&&0!==i.negative&&i.iadd(A)),{div:I,mod:i}):0===this.negative&&0!==A.negative?(C=this.divmod(A.neg(),B),"mod"!==B&&(I=C.div.neg()),{div:I,mod:C.mod}):0!=(this.negative&A.negative)?(C=this.neg().divmod(A.neg(),B),"div"!==B&&(i=C.mod.neg(),Q&&0!==i.negative&&i.isub(A)),{div:C.div,mod:i}):A.length>this.length||this.cmp(A)<0?{div:new E(0),mod:this}:1===A.length?"div"===B?{div:this.divn(A.words[0]),mod:null}:"mod"===B?{div:null,mod:new E(this.modn(A.words[0]))}:{div:this.divn(A.words[0]),mod:new E(this.modn(A.words[0]))}:this._wordDiv(A,B);var I,i,C},E.prototype.div=function(A){return this.divmod(A,"div",!1).div},E.prototype.mod=function(A){return this.divmod(A,"mod",!1).mod},E.prototype.umod=function(A){return this.divmod(A,"mod",!0).mod},E.prototype.divRound=function(A){var B=this.divmod(A);if(B.mod.isZero())return B.div;var Q=0!==B.div.negative?B.mod.isub(A):B.mod,g=A.ushrn(1),I=A.andln(1),E=Q.cmp(g);return E<0||1===I&&0===E?B.div:0!==B.div.negative?B.div.isubn(1):B.div.iaddn(1)},E.prototype.modn=function(A){g(A<=67108863);for(var B=(1<<26)%A,Q=0,I=this.length-1;I>=0;I--)Q=(B*Q+(0|this.words[I]))%A;return Q},E.prototype.idivn=function(A){g(A<=67108863);for(var B=0,Q=this.length-1;Q>=0;Q--){var I=(0|this.words[Q])+67108864*B;this.words[Q]=I/A|0,B=I%A}return this.strip()},E.prototype.divn=function(A){return this.clone().idivn(A)},E.prototype.egcd=function(A){g(0===A.negative),g(!A.isZero());var B=this,Q=A.clone();B=0!==B.negative?B.umod(A):B.clone();for(var I=new E(1),i=new E(0),C=new E(0),t=new E(1),e=0;B.isEven()&&Q.isEven();)B.iushrn(1),Q.iushrn(1),++e;for(var o=Q.clone(),s=B.clone();!B.isZero();){for(var r=0,h=1;0==(B.words[0]&h)&&r<26;++r,h<<=1);if(r>0)for(B.iushrn(r);r-- >0;)(I.isOdd()||i.isOdd())&&(I.iadd(o),i.isub(s)),I.iushrn(1),i.iushrn(1);for(var n=0,a=1;0==(Q.words[0]&a)&&n<26;++n,a<<=1);if(n>0)for(Q.iushrn(n);n-- >0;)(C.isOdd()||t.isOdd())&&(C.iadd(o),t.isub(s)),C.iushrn(1),t.iushrn(1);B.cmp(Q)>=0?(B.isub(Q),I.isub(C),i.isub(t)):(Q.isub(B),C.isub(I),t.isub(i))}return{a:C,b:t,gcd:Q.iushln(e)}},E.prototype._invmp=function(A){g(0===A.negative),g(!A.isZero());var B=this,Q=A.clone();B=0!==B.negative?B.umod(A):B.clone();for(var I,i=new E(1),C=new E(0),t=Q.clone();B.cmpn(1)>0&&Q.cmpn(1)>0;){for(var e=0,o=1;0==(B.words[0]&o)&&e<26;++e,o<<=1);if(e>0)for(B.iushrn(e);e-- >0;)i.isOdd()&&i.iadd(t),i.iushrn(1);for(var s=0,r=1;0==(Q.words[0]&r)&&s<26;++s,r<<=1);if(s>0)for(Q.iushrn(s);s-- >0;)C.isOdd()&&C.iadd(t),C.iushrn(1);B.cmp(Q)>=0?(B.isub(Q),i.isub(C)):(Q.isub(B),C.isub(i))}return(I=0===B.cmpn(1)?i:C).cmpn(0)<0&&I.iadd(A),I},E.prototype.gcd=function(A){if(this.isZero())return A.abs();if(A.isZero())return this.abs();var B=this.clone(),Q=A.clone();B.negative=0,Q.negative=0;for(var g=0;B.isEven()&&Q.isEven();g++)B.iushrn(1),Q.iushrn(1);for(;;){for(;B.isEven();)B.iushrn(1);for(;Q.isEven();)Q.iushrn(1);var I=B.cmp(Q);if(I<0){var E=B;B=Q,Q=E}else if(0===I||0===Q.cmpn(1))break;B.isub(Q)}return Q.iushln(g)},E.prototype.invm=function(A){return this.egcd(A).a.umod(A)},E.prototype.isEven=function(){return 0==(1&this.words[0])},E.prototype.isOdd=function(){return 1==(1&this.words[0])},E.prototype.andln=function(A){return this.words[0]&A},E.prototype.bincn=function(A){g("number"==typeof A);var B=A%26,Q=(A-B)/26,I=1<<B;if(this.length<=Q)return this._expand(Q+1),this.words[Q]|=I,this;for(var E=I,i=Q;0!==E&&i<this.length;i++){var C=0|this.words[i];E=(C+=E)>>>26,C&=67108863,this.words[i]=C}return 0!==E&&(this.words[i]=E,this.length++),this},E.prototype.isZero=function(){return 1===this.length&&0===this.words[0]},E.prototype.cmpn=function(A){var B,Q=A<0;if(0!==this.negative&&!Q)return-1;if(0===this.negative&&Q)return 1;if(this.strip(),this.length>1)B=1;else{Q&&(A=-A),g(A<=67108863,"Number is too big");var I=0|this.words[0];B=I===A?0:I<A?-1:1}return 0!==this.negative?0|-B:B},E.prototype.cmp=function(A){if(0!==this.negative&&0===A.negative)return-1;if(0===this.negative&&0!==A.negative)return 1;var B=this.ucmp(A);return 0!==this.negative?0|-B:B},E.prototype.ucmp=function(A){if(this.length>A.length)return 1;if(this.length<A.length)return-1;for(var B=0,Q=this.length-1;Q>=0;Q--){var g=0|this.words[Q],I=0|A.words[Q];if(g!==I){g<I?B=-1:g>I&&(B=1);break}}return B},E.prototype.gtn=function(A){return 1===this.cmpn(A)},E.prototype.gt=function(A){return 1===this.cmp(A)},E.prototype.gten=function(A){return this.cmpn(A)>=0},E.prototype.gte=function(A){return this.cmp(A)>=0},E.prototype.ltn=function(A){return-1===this.cmpn(A)},E.prototype.lt=function(A){return-1===this.cmp(A)},E.prototype.lten=function(A){return this.cmpn(A)<=0},E.prototype.lte=function(A){return this.cmp(A)<=0},E.prototype.eqn=function(A){return 0===this.cmpn(A)},E.prototype.eq=function(A){return 0===this.cmp(A)},E.red=function(A){return new F(A)},E.prototype.toRed=function(A){return g(!this.red,"Already a number in reduction context"),g(0===this.negative,"red works only with positives"),A.convertTo(this)._forceRed(A)},E.prototype.fromRed=function(){return g(this.red,"fromRed works only with numbers in reduction context"),this.red.convertFrom(this)},E.prototype._forceRed=function(A){return this.red=A,this},E.prototype.forceRed=function(A){return g(!this.red,"Already a number in reduction context"),this._forceRed(A)},E.prototype.redAdd=function(A){return g(this.red,"redAdd works only with red numbers"),this.red.add(this,A)},E.prototype.redIAdd=function(A){return g(this.red,"redIAdd works only with red numbers"),this.red.iadd(this,A)},E.prototype.redSub=function(A){return g(this.red,"redSub works only with red numbers"),this.red.sub(this,A)},E.prototype.redISub=function(A){return g(this.red,"redISub works only with red numbers"),this.red.isub(this,A)},E.prototype.redShl=function(A){return g(this.red,"redShl works only with red numbers"),this.red.shl(this,A)},E.prototype.redMul=function(A){return g(this.red,"redMul works only with red numbers"),this.red._verify2(this,A),this.red.mul(this,A)},E.prototype.redIMul=function(A){return g(this.red,"redMul works only with red numbers"),this.red._verify2(this,A),this.red.imul(this,A)},E.prototype.redSqr=function(){return g(this.red,"redSqr works only with red numbers"),this.red._verify1(this),this.red.sqr(this)},E.prototype.redISqr=function(){return g(this.red,"redISqr works only with red numbers"),this.red._verify1(this),this.red.isqr(this)},E.prototype.redSqrt=function(){return g(this.red,"redSqrt works only with red numbers"),this.red._verify1(this),this.red.sqrt(this)},E.prototype.redInvm=function(){return g(this.red,"redInvm works only with red numbers"),this.red._verify1(this),this.red.invm(this)},E.prototype.redNeg=function(){return g(this.red,"redNeg works only with red numbers"),this.red._verify1(this),this.red.neg(this)},E.prototype.redPow=function(A){return g(this.red&&!A.red,"redPow(normalNum)"),this.red._verify1(this),this.red.pow(this,A)};var c={k256:null,p224:null,p192:null,p25519:null};function y(A,B){this.name=A,this.p=new E(B,16),this.n=this.p.bitLength(),this.k=new E(1).iushln(this.n).isub(this.p),this.tmp=this._tmp()}function D(){y.call(this,"k256","ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f")}function u(){y.call(this,"p224","ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001")}function f(){y.call(this,"p192","ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff")}function w(){y.call(this,"25519","7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed")}function F(A){if("string"==typeof A){var B=E._prime(A);this.m=B.p,this.prime=B}else g(A.gtn(1),"modulus must be greater than 1"),this.m=A,this.prime=null}function d(A){F.call(this,A),this.shift=this.m.bitLength(),this.shift%26!=0&&(this.shift+=26-this.shift%26),this.r=new E(1).iushln(this.shift),this.r2=this.imod(this.r.sqr()),this.rinv=this.r._invmp(this.m),this.minv=this.rinv.mul(this.r).isubn(1).div(this.m),this.minv=this.minv.umod(this.r),this.minv=this.r.sub(this.minv)}y.prototype._tmp=function(){var A=new E(null);return A.words=new Array(Math.ceil(this.n/13)),A},y.prototype.ireduce=function(A){var B,Q=A;do{this.split(Q,this.tmp),B=(Q=(Q=this.imulK(Q)).iadd(this.tmp)).bitLength()}while(B>this.n);var g=B<this.n?-1:Q.ucmp(this.p);return 0===g?(Q.words[0]=0,Q.length=1):g>0?Q.isub(this.p):Q.strip(),Q},y.prototype.split=function(A,B){A.iushrn(this.n,0,B)},y.prototype.imulK=function(A){return A.imul(this.k)},I(D,y),D.prototype.split=function(A,B){for(var Q=Math.min(A.length,9),g=0;g<Q;g++)B.words[g]=A.words[g];if(B.length=Q,A.length<=9)return A.words[0]=0,void(A.length=1);var I=A.words[9];for(B.words[B.length++]=4194303&I,g=10;g<A.length;g++){var E=0|A.words[g];A.words[g-10]=(4194303&E)<<4|I>>>22,I=E}I>>>=22,A.words[g-10]=I,0===I&&A.length>10?A.length-=10:A.length-=9},D.prototype.imulK=function(A){A.words[A.length]=0,A.words[A.length+1]=0,A.length+=2;for(var B=0,Q=0;Q<A.length;Q++){var g=0|A.words[Q];B+=977*g,A.words[Q]=67108863&B,B=64*g+(B/67108864|0)}return 0===A.words[A.length-1]&&(A.length--,0===A.words[A.length-1]&&A.length--),A},I(u,y),I(f,y),I(w,y),w.prototype.imulK=function(A){for(var B=0,Q=0;Q<A.length;Q++){var g=19*(0|A.words[Q])+B,I=67108863&g;g>>>=26,A.words[Q]=I,B=g}return 0!==B&&(A.words[A.length++]=B),A},E._prime=function(A){if(c[A])return c[A];var B;if("k256"===A)B=new D;else if("p224"===A)B=new u;else if("p192"===A)B=new f;else{if("p25519"!==A)throw new Error("Unknown prime "+A);B=new w}return c[A]=B,B},F.prototype._verify1=function(A){g(0===A.negative,"red works only with positives"),g(A.red,"red works only with red numbers")},F.prototype._verify2=function(A,B){g(0==(A.negative|B.negative),"red works only with positives"),g(A.red&&A.red===B.red,"red works only with red numbers")},F.prototype.imod=function(A){return this.prime?this.prime.ireduce(A)._forceRed(this):A.umod(this.m)._forceRed(this)},F.prototype.neg=function(A){return A.isZero()?A.clone():this.m.sub(A)._forceRed(this)},F.prototype.add=function(A,B){this._verify2(A,B);var Q=A.add(B);return Q.cmp(this.m)>=0&&Q.isub(this.m),Q._forceRed(this)},F.prototype.iadd=function(A,B){this._verify2(A,B);var Q=A.iadd(B);return Q.cmp(this.m)>=0&&Q.isub(this.m),Q},F.prototype.sub=function(A,B){this._verify2(A,B);var Q=A.sub(B);return Q.cmpn(0)<0&&Q.iadd(this.m),Q._forceRed(this)},F.prototype.isub=function(A,B){this._verify2(A,B);var Q=A.isub(B);return Q.cmpn(0)<0&&Q.iadd(this.m),Q},F.prototype.shl=function(A,B){return this._verify1(A),this.imod(A.ushln(B))},F.prototype.imul=function(A,B){return this._verify2(A,B),this.imod(A.imul(B))},F.prototype.mul=function(A,B){return this._verify2(A,B),this.imod(A.mul(B))},F.prototype.isqr=function(A){return this.imul(A,A.clone())},F.prototype.sqr=function(A){return this.mul(A,A)},F.prototype.sqrt=function(A){if(A.isZero())return A.clone();var B=this.m.andln(3);if(g(B%2==1),3===B){var Q=this.m.add(new E(1)).iushrn(2);return this.pow(A,Q)}for(var I=this.m.subn(1),i=0;!I.isZero()&&0===I.andln(1);)i++,I.iushrn(1);g(!I.isZero());var C=new E(1).toRed(this),t=C.redNeg(),e=this.m.subn(1).iushrn(1),o=this.m.bitLength();for(o=new E(2*o*o).toRed(this);0!==this.pow(o,e).cmp(t);)o.redIAdd(t);for(var s=this.pow(o,I),r=this.pow(A,I.addn(1).iushrn(1)),h=this.pow(A,I),n=i;0!==h.cmp(C);){for(var a=h,c=0;0!==a.cmp(C);c++)a=a.redSqr();g(c<n);var y=this.pow(s,new E(1).iushln(n-c-1));r=r.redMul(y),s=y.redSqr(),h=h.redMul(s),n=c}return r},F.prototype.invm=function(A){var B=A._invmp(this.m);return 0!==B.negative?(B.negative=0,this.imod(B).redNeg()):this.imod(B)},F.prototype.pow=function(A,B){if(B.isZero())return new E(1).toRed(this);if(0===B.cmpn(1))return A.clone();var Q=new Array(16);Q[0]=new E(1).toRed(this),Q[1]=A;for(var g=2;g<Q.length;g++)Q[g]=this.mul(Q[g-1],A);var I=Q[0],i=0,C=0,t=B.bitLength()%26;for(0===t&&(t=26),g=B.length-1;g>=0;g--){for(var e=B.words[g],o=t-1;o>=0;o--){var s=e>>o&1;I!==Q[0]&&(I=this.sqr(I)),0!==s||0!==i?(i<<=1,i|=s,(4===++C||0===g&&0===o)&&(I=this.mul(I,Q[i]),C=0,i=0)):C=0}t=26}return I},F.prototype.convertTo=function(A){var B=A.umod(this.m);return B===A?B.clone():B},F.prototype.convertFrom=function(A){var B=A.clone();return B.red=null,B},E.mont=function(A){return new d(A)},I(d,F),d.prototype.convertTo=function(A){return this.imod(A.ushln(this.shift))},d.prototype.convertFrom=function(A){var B=this.imod(A.mul(this.rinv));return B.red=null,B},d.prototype.imul=function(A,B){if(A.isZero()||B.isZero())return A.words[0]=0,A.length=1,A;var Q=A.imul(B),g=Q.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m),I=Q.isub(g).iushrn(this.shift),E=I;return I.cmp(this.m)>=0?E=I.isub(this.m):I.cmpn(0)<0&&(E=I.iadd(this.m)),E._forceRed(this)},d.prototype.mul=function(A,B){if(A.isZero()||B.isZero())return new E(0)._forceRed(this);var Q=A.mul(B),g=Q.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m),I=Q.isub(g).iushrn(this.shift),i=I;return I.cmp(this.m)>=0?i=I.isub(this.m):I.cmpn(0)<0&&(i=I.iadd(this.m)),i._forceRed(this)},d.prototype.invm=function(A){return this.imod(A._invmp(this.m).mul(this.r2))._forceRed(this)}}(A,this)}).call(this,Q(10)(A))},function(A,B){},function(A){A.exports=JSON.parse('{"_args":[["elliptic@6.5.3","/home/user"]],"_development":true,"_from":"elliptic@6.5.3","_id":"elliptic@6.5.3","_inBundle":false,"_integrity":"sha512-IMqzv5wNQf+E6aHeIqATs0tOLeOTwj1QKbRcS3jBbYkl5oLAserA8yJTT7/VyHUYG91PRmPyeQDObKLPpeS4dw==","_location":"/elliptic","_phantomChildren":{},"_requested":{"type":"version","registry":true,"raw":"elliptic@6.5.3","name":"elliptic","escapedName":"elliptic","rawSpec":"6.5.3","saveSpec":null,"fetchSpec":"6.5.3"},"_requiredBy":["/browserify-sign","/create-ecdh"],"_resolved":"https://registry.npmjs.org/elliptic/-/elliptic-6.5.3.tgz","_spec":"6.5.3","_where":"/home/user","author":{"name":"Fedor Indutny","email":"fedor@indutny.com"},"bugs":{"url":"https://github.com/indutny/elliptic/issues"},"dependencies":{"bn.js":"^4.4.0","brorand":"^1.0.1","hash.js":"^1.0.0","hmac-drbg":"^1.0.0","inherits":"^2.0.1","minimalistic-assert":"^1.0.0","minimalistic-crypto-utils":"^1.0.0"},"description":"EC cryptography","devDependencies":{"brfs":"^1.4.3","coveralls":"^3.0.8","grunt":"^1.0.4","grunt-browserify":"^5.0.0","grunt-cli":"^1.2.0","grunt-contrib-connect":"^1.0.0","grunt-contrib-copy":"^1.0.0","grunt-contrib-uglify":"^1.0.1","grunt-mocha-istanbul":"^3.0.1","grunt-saucelabs":"^9.0.1","istanbul":"^0.4.2","jscs":"^3.0.7","jshint":"^2.10.3","mocha":"^6.2.2"},"files":["lib"],"homepage":"https://github.com/indutny/elliptic","keywords":["EC","Elliptic","curve","Cryptography"],"license":"MIT","main":"lib/elliptic.js","name":"elliptic","repository":{"type":"git","url":"git+ssh://git@github.com/indutny/elliptic.git"},"scripts":{"jscs":"jscs benchmarks/*.js lib/*.js lib/**/*.js lib/**/**/*.js test/index.js","jshint":"jscs benchmarks/*.js lib/*.js lib/**/*.js lib/**/**/*.js test/index.js","lint":"npm run jscs && npm run jshint","test":"npm run lint && npm run unit","unit":"istanbul test _mocha --reporter=spec test/index.js","version":"grunt dist && git add dist/"},"version":"6.5.3"}')},function(A,B){},function(A,B,Q){"use strict";var g=Q(6),I=Q(8),E=Q(0),i=Q(29),C=g.assert;function t(A){i.call(this,"short",A),this.a=new I(A.a,16).toRed(this.red),this.b=new I(A.b,16).toRed(this.red),this.tinv=this.two.redInvm(),this.zeroA=0===this.a.fromRed().cmpn(0),this.threeA=0===this.a.fromRed().sub(this.p).cmpn(-3),this.endo=this._getEndomorphism(A),this._endoWnafT1=new Array(4),this._endoWnafT2=new Array(4)}function e(A,B,Q,g){i.BasePoint.call(this,A,"affine"),null===B&&null===Q?(this.x=null,this.y=null,this.inf=!0):(this.x=new I(B,16),this.y=new I(Q,16),g&&(this.x.forceRed(this.curve.red),this.y.forceRed(this.curve.red)),this.x.red||(this.x=this.x.toRed(this.curve.red)),this.y.red||(this.y=this.y.toRed(this.curve.red)),this.inf=!1)}function o(A,B,Q,g){i.BasePoint.call(this,A,"jacobian"),null===B&&null===Q&&null===g?(this.x=this.curve.one,this.y=this.curve.one,this.z=new I(0)):(this.x=new I(B,16),this.y=new I(Q,16),this.z=new I(g,16)),this.x.red||(this.x=this.x.toRed(this.curve.red)),this.y.red||(this.y=this.y.toRed(this.curve.red)),this.z.red||(this.z=this.z.toRed(this.curve.red)),this.zOne=this.z===this.curve.one}E(t,i),A.exports=t,t.prototype._getEndomorphism=function(A){if(this.zeroA&&this.g&&this.n&&1===this.p.modn(3)){var B,Q;if(A.beta)B=new I(A.beta,16).toRed(this.red);else{var g=this._getEndoRoots(this.p);B=(B=g[0].cmp(g[1])<0?g[0]:g[1]).toRed(this.red)}if(A.lambda)Q=new I(A.lambda,16);else{var E=this._getEndoRoots(this.n);0===this.g.mul(E[0]).x.cmp(this.g.x.redMul(B))?Q=E[0]:(Q=E[1],C(0===this.g.mul(Q).x.cmp(this.g.x.redMul(B))))}return{beta:B,lambda:Q,basis:A.basis?A.basis.map((function(A){return{a:new I(A.a,16),b:new I(A.b,16)}})):this._getEndoBasis(Q)}}},t.prototype._getEndoRoots=function(A){var B=A===this.p?this.red:I.mont(A),Q=new I(2).toRed(B).redInvm(),g=Q.redNeg(),E=new I(3).toRed(B).redNeg().redSqrt().redMul(Q);return[g.redAdd(E).fromRed(),g.redSub(E).fromRed()]},t.prototype._getEndoBasis=function(A){for(var B,Q,g,E,i,C,t,e,o,s=this.n.ushrn(Math.floor(this.n.bitLength()/2)),r=A,h=this.n.clone(),n=new I(1),a=new I(0),c=new I(0),y=new I(1),D=0;0!==r.cmpn(0);){var u=h.div(r);e=h.sub(u.mul(r)),o=c.sub(u.mul(n));var f=y.sub(u.mul(a));if(!g&&e.cmp(s)<0)B=t.neg(),Q=n,g=e.neg(),E=o;else if(g&&2==++D)break;t=e,h=r,r=e,c=n,n=o,y=a,a=f}i=e.neg(),C=o;var w=g.sqr().add(E.sqr());return i.sqr().add(C.sqr()).cmp(w)>=0&&(i=B,C=Q),g.negative&&(g=g.neg(),E=E.neg()),i.negative&&(i=i.neg(),C=C.neg()),[{a:g,b:E},{a:i,b:C}]},t.prototype._endoSplit=function(A){var B=this.endo.basis,Q=B[0],g=B[1],I=g.b.mul(A).divRound(this.n),E=Q.b.neg().mul(A).divRound(this.n),i=I.mul(Q.a),C=E.mul(g.a),t=I.mul(Q.b),e=E.mul(g.b);return{k1:A.sub(i).sub(C),k2:t.add(e).neg()}},t.prototype.pointFromX=function(A,B){(A=new I(A,16)).red||(A=A.toRed(this.red));var Q=A.redSqr().redMul(A).redIAdd(A.redMul(this.a)).redIAdd(this.b),g=Q.redSqrt();if(0!==g.redSqr().redSub(Q).cmp(this.zero))throw new Error("invalid point");var E=g.fromRed().isOdd();return(B&&!E||!B&&E)&&(g=g.redNeg()),this.point(A,g)},t.prototype.validate=function(A){if(A.inf)return!0;var B=A.x,Q=A.y,g=this.a.redMul(B),I=B.redSqr().redMul(B).redIAdd(g).redIAdd(this.b);return 0===Q.redSqr().redISub(I).cmpn(0)},t.prototype._endoWnafMulAdd=function(A,B,Q){for(var g=this._endoWnafT1,I=this._endoWnafT2,E=0;E<A.length;E++){var i=this._endoSplit(B[E]),C=A[E],t=C._getBeta();i.k1.negative&&(i.k1.ineg(),C=C.neg(!0)),i.k2.negative&&(i.k2.ineg(),t=t.neg(!0)),g[2*E]=C,g[2*E+1]=t,I[2*E]=i.k1,I[2*E+1]=i.k2}for(var e=this._wnafMulAdd(1,g,I,2*E,Q),o=0;o<2*E;o++)g[o]=null,I[o]=null;return e},E(e,i.BasePoint),t.prototype.point=function(A,B,Q){return new e(this,A,B,Q)},t.prototype.pointFromJSON=function(A,B){return e.fromJSON(this,A,B)},e.prototype._getBeta=function(){if(this.curve.endo){var A=this.precomputed;if(A&&A.beta)return A.beta;var B=this.curve.point(this.x.redMul(this.curve.endo.beta),this.y);if(A){var Q=this.curve,g=function(A){return Q.point(A.x.redMul(Q.endo.beta),A.y)};A.beta=B,B.precomputed={beta:null,naf:A.naf&&{wnd:A.naf.wnd,points:A.naf.points.map(g)},doubles:A.doubles&&{step:A.doubles.step,points:A.doubles.points.map(g)}}}return B}},e.prototype.toJSON=function(){return this.precomputed?[this.x,this.y,this.precomputed&&{doubles:this.precomputed.doubles&&{step:this.precomputed.doubles.step,points:this.precomputed.doubles.points.slice(1)},naf:this.precomputed.naf&&{wnd:this.precomputed.naf.wnd,points:this.precomputed.naf.points.slice(1)}}]:[this.x,this.y]},e.fromJSON=function(A,B,Q){"string"==typeof B&&(B=JSON.parse(B));var g=A.point(B[0],B[1],Q);if(!B[2])return g;function I(B){return A.point(B[0],B[1],Q)}var E=B[2];return g.precomputed={beta:null,doubles:E.doubles&&{step:E.doubles.step,points:[g].concat(E.doubles.points.map(I))},naf:E.naf&&{wnd:E.naf.wnd,points:[g].concat(E.naf.points.map(I))}},g},e.prototype.inspect=function(){return this.isInfinity()?"<EC Point Infinity>":"<EC Point x: "+this.x.fromRed().toString(16,2)+" y: "+this.y.fromRed().toString(16,2)+">"},e.prototype.isInfinity=function(){return this.inf},e.prototype.add=function(A){if(this.inf)return A;if(A.inf)return this;if(this.eq(A))return this.dbl();if(this.neg().eq(A))return this.curve.point(null,null);if(0===this.x.cmp(A.x))return this.curve.point(null,null);var B=this.y.redSub(A.y);0!==B.cmpn(0)&&(B=B.redMul(this.x.redSub(A.x).redInvm()));var Q=B.redSqr().redISub(this.x).redISub(A.x),g=B.redMul(this.x.redSub(Q)).redISub(this.y);return this.curve.point(Q,g)},e.prototype.dbl=function(){if(this.inf)return this;var A=this.y.redAdd(this.y);if(0===A.cmpn(0))return this.curve.point(null,null);var B=this.curve.a,Q=this.x.redSqr(),g=A.redInvm(),I=Q.redAdd(Q).redIAdd(Q).redIAdd(B).redMul(g),E=I.redSqr().redISub(this.x.redAdd(this.x)),i=I.redMul(this.x.redSub(E)).redISub(this.y);return this.curve.point(E,i)},e.prototype.getX=function(){return this.x.fromRed()},e.prototype.getY=function(){return this.y.fromRed()},e.prototype.mul=function(A){return A=new I(A,16),this.isInfinity()?this:this._hasDoubles(A)?this.curve._fixedNafMul(this,A):this.curve.endo?this.curve._endoWnafMulAdd([this],[A]):this.curve._wnafMul(this,A)},e.prototype.mulAdd=function(A,B,Q){var g=[this,B],I=[A,Q];return this.curve.endo?this.curve._endoWnafMulAdd(g,I):this.curve._wnafMulAdd(1,g,I,2)},e.prototype.jmulAdd=function(A,B,Q){var g=[this,B],I=[A,Q];return this.curve.endo?this.curve._endoWnafMulAdd(g,I,!0):this.curve._wnafMulAdd(1,g,I,2,!0)},e.prototype.eq=function(A){return this===A||this.inf===A.inf&&(this.inf||0===this.x.cmp(A.x)&&0===this.y.cmp(A.y))},e.prototype.neg=function(A){if(this.inf)return this;var B=this.curve.point(this.x,this.y.redNeg());if(A&&this.precomputed){var Q=this.precomputed,g=function(A){return A.neg()};B.precomputed={naf:Q.naf&&{wnd:Q.naf.wnd,points:Q.naf.points.map(g)},doubles:Q.doubles&&{step:Q.doubles.step,points:Q.doubles.points.map(g)}}}return B},e.prototype.toJ=function(){return this.inf?this.curve.jpoint(null,null,null):this.curve.jpoint(this.x,this.y,this.curve.one)},E(o,i.BasePoint),t.prototype.jpoint=function(A,B,Q){return new o(this,A,B,Q)},o.prototype.toP=function(){if(this.isInfinity())return this.curve.point(null,null);var A=this.z.redInvm(),B=A.redSqr(),Q=this.x.redMul(B),g=this.y.redMul(B).redMul(A);return this.curve.point(Q,g)},o.prototype.neg=function(){return this.curve.jpoint(this.x,this.y.redNeg(),this.z)},o.prototype.add=function(A){if(this.isInfinity())return A;if(A.isInfinity())return this;var B=A.z.redSqr(),Q=this.z.redSqr(),g=this.x.redMul(B),I=A.x.redMul(Q),E=this.y.redMul(B.redMul(A.z)),i=A.y.redMul(Q.redMul(this.z)),C=g.redSub(I),t=E.redSub(i);if(0===C.cmpn(0))return 0!==t.cmpn(0)?this.curve.jpoint(null,null,null):this.dbl();var e=C.redSqr(),o=e.redMul(C),s=g.redMul(e),r=t.redSqr().redIAdd(o).redISub(s).redISub(s),h=t.redMul(s.redISub(r)).redISub(E.redMul(o)),n=this.z.redMul(A.z).redMul(C);return this.curve.jpoint(r,h,n)},o.prototype.mixedAdd=function(A){if(this.isInfinity())return A.toJ();if(A.isInfinity())return this;var B=this.z.redSqr(),Q=this.x,g=A.x.redMul(B),I=this.y,E=A.y.redMul(B).redMul(this.z),i=Q.redSub(g),C=I.redSub(E);if(0===i.cmpn(0))return 0!==C.cmpn(0)?this.curve.jpoint(null,null,null):this.dbl();var t=i.redSqr(),e=t.redMul(i),o=Q.redMul(t),s=C.redSqr().redIAdd(e).redISub(o).redISub(o),r=C.redMul(o.redISub(s)).redISub(I.redMul(e)),h=this.z.redMul(i);return this.curve.jpoint(s,r,h)},o.prototype.dblp=function(A){if(0===A)return this;if(this.isInfinity())return this;if(!A)return this.dbl();if(this.curve.zeroA||this.curve.threeA){for(var B=this,Q=0;Q<A;Q++)B=B.dbl();return B}var g=this.curve.a,I=this.curve.tinv,E=this.x,i=this.y,C=this.z,t=C.redSqr().redSqr(),e=i.redAdd(i);for(Q=0;Q<A;Q++){var o=E.redSqr(),s=e.redSqr(),r=s.redSqr(),h=o.redAdd(o).redIAdd(o).redIAdd(g.redMul(t)),n=E.redMul(s),a=h.redSqr().redISub(n.redAdd(n)),c=n.redISub(a),y=h.redMul(c);y=y.redIAdd(y).redISub(r);var D=e.redMul(C);Q+1<A&&(t=t.redMul(r)),E=a,C=D,e=y}return this.curve.jpoint(E,e.redMul(I),C)},o.prototype.dbl=function(){return this.isInfinity()?this:this.curve.zeroA?this._zeroDbl():this.curve.threeA?this._threeDbl():this._dbl()},o.prototype._zeroDbl=function(){var A,B,Q;if(this.zOne){var g=this.x.redSqr(),I=this.y.redSqr(),E=I.redSqr(),i=this.x.redAdd(I).redSqr().redISub(g).redISub(E);i=i.redIAdd(i);var C=g.redAdd(g).redIAdd(g),t=C.redSqr().redISub(i).redISub(i),e=E.redIAdd(E);e=(e=e.redIAdd(e)).redIAdd(e),A=t,B=C.redMul(i.redISub(t)).redISub(e),Q=this.y.redAdd(this.y)}else{var o=this.x.redSqr(),s=this.y.redSqr(),r=s.redSqr(),h=this.x.redAdd(s).redSqr().redISub(o).redISub(r);h=h.redIAdd(h);var n=o.redAdd(o).redIAdd(o),a=n.redSqr(),c=r.redIAdd(r);c=(c=c.redIAdd(c)).redIAdd(c),A=a.redISub(h).redISub(h),B=n.redMul(h.redISub(A)).redISub(c),Q=(Q=this.y.redMul(this.z)).redIAdd(Q)}return this.curve.jpoint(A,B,Q)},o.prototype._threeDbl=function(){var A,B,Q;if(this.zOne){var g=this.x.redSqr(),I=this.y.redSqr(),E=I.redSqr(),i=this.x.redAdd(I).redSqr().redISub(g).redISub(E);i=i.redIAdd(i);var C=g.redAdd(g).redIAdd(g).redIAdd(this.curve.a),t=C.redSqr().redISub(i).redISub(i);A=t;var e=E.redIAdd(E);e=(e=e.redIAdd(e)).redIAdd(e),B=C.redMul(i.redISub(t)).redISub(e),Q=this.y.redAdd(this.y)}else{var o=this.z.redSqr(),s=this.y.redSqr(),r=this.x.redMul(s),h=this.x.redSub(o).redMul(this.x.redAdd(o));h=h.redAdd(h).redIAdd(h);var n=r.redIAdd(r),a=(n=n.redIAdd(n)).redAdd(n);A=h.redSqr().redISub(a),Q=this.y.redAdd(this.z).redSqr().redISub(s).redISub(o);var c=s.redSqr();c=(c=(c=c.redIAdd(c)).redIAdd(c)).redIAdd(c),B=h.redMul(n.redISub(A)).redISub(c)}return this.curve.jpoint(A,B,Q)},o.prototype._dbl=function(){var A=this.curve.a,B=this.x,Q=this.y,g=this.z,I=g.redSqr().redSqr(),E=B.redSqr(),i=Q.redSqr(),C=E.redAdd(E).redIAdd(E).redIAdd(A.redMul(I)),t=B.redAdd(B),e=(t=t.redIAdd(t)).redMul(i),o=C.redSqr().redISub(e.redAdd(e)),s=e.redISub(o),r=i.redSqr();r=(r=(r=r.redIAdd(r)).redIAdd(r)).redIAdd(r);var h=C.redMul(s).redISub(r),n=Q.redAdd(Q).redMul(g);return this.curve.jpoint(o,h,n)},o.prototype.trpl=function(){if(!this.curve.zeroA)return this.dbl().add(this);var A=this.x.redSqr(),B=this.y.redSqr(),Q=this.z.redSqr(),g=B.redSqr(),I=A.redAdd(A).redIAdd(A),E=I.redSqr(),i=this.x.redAdd(B).redSqr().redISub(A).redISub(g),C=(i=(i=(i=i.redIAdd(i)).redAdd(i).redIAdd(i)).redISub(E)).redSqr(),t=g.redIAdd(g);t=(t=(t=t.redIAdd(t)).redIAdd(t)).redIAdd(t);var e=I.redIAdd(i).redSqr().redISub(E).redISub(C).redISub(t),o=B.redMul(e);o=(o=o.redIAdd(o)).redIAdd(o);var s=this.x.redMul(C).redISub(o);s=(s=s.redIAdd(s)).redIAdd(s);var r=this.y.redMul(e.redMul(t.redISub(e)).redISub(i.redMul(C)));r=(r=(r=r.redIAdd(r)).redIAdd(r)).redIAdd(r);var h=this.z.redAdd(i).redSqr().redISub(Q).redISub(C);return this.curve.jpoint(s,r,h)},o.prototype.mul=function(A,B){return A=new I(A,B),this.curve._wnafMul(this,A)},o.prototype.eq=function(A){if("affine"===A.type)return this.eq(A.toJ());if(this===A)return!0;var B=this.z.redSqr(),Q=A.z.redSqr();if(0!==this.x.redMul(Q).redISub(A.x.redMul(B)).cmpn(0))return!1;var g=B.redMul(this.z),I=Q.redMul(A.z);return 0===this.y.redMul(I).redISub(A.y.redMul(g)).cmpn(0)},o.prototype.eqXToP=function(A){var B=this.z.redSqr(),Q=A.toRed(this.curve.red).redMul(B);if(0===this.x.cmp(Q))return!0;for(var g=A.clone(),I=this.curve.redN.redMul(B);;){if(g.iadd(this.curve.n),g.cmp(this.curve.p)>=0)return!1;if(Q.redIAdd(I),0===this.x.cmp(Q))return!0}},o.prototype.inspect=function(){return this.isInfinity()?"<EC JPoint Infinity>":"<EC JPoint x: "+this.x.toString(16,2)+" y: "+this.y.toString(16,2)+" z: "+this.z.toString(16,2)+">"},o.prototype.isInfinity=function(){return 0===this.z.cmpn(0)}},function(A,B,Q){"use strict";var g=Q(8),I=Q(0),E=Q(29),i=Q(6);function C(A){E.call(this,"mont",A),this.a=new g(A.a,16).toRed(this.red),this.b=new g(A.b,16).toRed(this.red),this.i4=new g(4).toRed(this.red).redInvm(),this.two=new g(2).toRed(this.red),this.a24=this.i4.redMul(this.a.redAdd(this.two))}function t(A,B,Q){E.BasePoint.call(this,A,"projective"),null===B&&null===Q?(this.x=this.curve.one,this.z=this.curve.zero):(this.x=new g(B,16),this.z=new g(Q,16),this.x.red||(this.x=this.x.toRed(this.curve.red)),this.z.red||(this.z=this.z.toRed(this.curve.red)))}I(C,E),A.exports=C,C.prototype.validate=function(A){var B=A.normalize().x,Q=B.redSqr(),g=Q.redMul(B).redAdd(Q.redMul(this.a)).redAdd(B);return 0===g.redSqrt().redSqr().cmp(g)},I(t,E.BasePoint),C.prototype.decodePoint=function(A,B){return this.point(i.toArray(A,B),1)},C.prototype.point=function(A,B){return new t(this,A,B)},C.prototype.pointFromJSON=function(A){return t.fromJSON(this,A)},t.prototype.precompute=function(){},t.prototype._encode=function(){return this.getX().toArray("be",this.curve.p.byteLength())},t.fromJSON=function(A,B){return new t(A,B[0],B[1]||A.one)},t.prototype.inspect=function(){return this.isInfinity()?"<EC Point Infinity>":"<EC Point x: "+this.x.fromRed().toString(16,2)+" z: "+this.z.fromRed().toString(16,2)+">"},t.prototype.isInfinity=function(){return 0===this.z.cmpn(0)},t.prototype.dbl=function(){var A=this.x.redAdd(this.z).redSqr(),B=this.x.redSub(this.z).redSqr(),Q=A.redSub(B),g=A.redMul(B),I=Q.redMul(B.redAdd(this.curve.a24.redMul(Q)));return this.curve.point(g,I)},t.prototype.add=function(){throw new Error("Not supported on Montgomery curve")},t.prototype.diffAdd=function(A,B){var Q=this.x.redAdd(this.z),g=this.x.redSub(this.z),I=A.x.redAdd(A.z),E=A.x.redSub(A.z).redMul(Q),i=I.redMul(g),C=B.z.redMul(E.redAdd(i).redSqr()),t=B.x.redMul(E.redISub(i).redSqr());return this.curve.point(C,t)},t.prototype.mul=function(A){for(var B=A.clone(),Q=this,g=this.curve.point(null,null),I=[];0!==B.cmpn(0);B.iushrn(1))I.push(B.andln(1));for(var E=I.length-1;E>=0;E--)0===I[E]?(Q=Q.diffAdd(g,this),g=g.dbl()):(g=Q.diffAdd(g,this),Q=Q.dbl());return g},t.prototype.mulAdd=function(){throw new Error("Not supported on Montgomery curve")},t.prototype.jumlAdd=function(){throw new Error("Not supported on Montgomery curve")},t.prototype.eq=function(A){return 0===this.getX().cmp(A.getX())},t.prototype.normalize=function(){return this.x=this.x.redMul(this.z.redInvm()),this.z=this.curve.one,this},t.prototype.getX=function(){return this.normalize(),this.x.fromRed()}},function(A,B,Q){"use strict";var g=Q(6),I=Q(8),E=Q(0),i=Q(29),C=g.assert;function t(A){this.twisted=1!=(0|A.a),this.mOneA=this.twisted&&-1==(0|A.a),this.extended=this.mOneA,i.call(this,"edwards",A),this.a=new I(A.a,16).umod(this.red.m),this.a=this.a.toRed(this.red),this.c=new I(A.c,16).toRed(this.red),this.c2=this.c.redSqr(),this.d=new I(A.d,16).toRed(this.red),this.dd=this.d.redAdd(this.d),C(!this.twisted||0===this.c.fromRed().cmpn(1)),this.oneC=1==(0|A.c)}function e(A,B,Q,g,E){i.BasePoint.call(this,A,"projective"),null===B&&null===Q&&null===g?(this.x=this.curve.zero,this.y=this.curve.one,this.z=this.curve.one,this.t=this.curve.zero,this.zOne=!0):(this.x=new I(B,16),this.y=new I(Q,16),this.z=g?new I(g,16):this.curve.one,this.t=E&&new I(E,16),this.x.red||(this.x=this.x.toRed(this.curve.red)),this.y.red||(this.y=this.y.toRed(this.curve.red)),this.z.red||(this.z=this.z.toRed(this.curve.red)),this.t&&!this.t.red&&(this.t=this.t.toRed(this.curve.red)),this.zOne=this.z===this.curve.one,this.curve.extended&&!this.t&&(this.t=this.x.redMul(this.y),this.zOne||(this.t=this.t.redMul(this.z.redInvm()))))}E(t,i),A.exports=t,t.prototype._mulA=function(A){return this.mOneA?A.redNeg():this.a.redMul(A)},t.prototype._mulC=function(A){return this.oneC?A:this.c.redMul(A)},t.prototype.jpoint=function(A,B,Q,g){return this.point(A,B,Q,g)},t.prototype.pointFromX=function(A,B){(A=new I(A,16)).red||(A=A.toRed(this.red));var Q=A.redSqr(),g=this.c2.redSub(this.a.redMul(Q)),E=this.one.redSub(this.c2.redMul(this.d).redMul(Q)),i=g.redMul(E.redInvm()),C=i.redSqrt();if(0!==C.redSqr().redSub(i).cmp(this.zero))throw new Error("invalid point");var t=C.fromRed().isOdd();return(B&&!t||!B&&t)&&(C=C.redNeg()),this.point(A,C)},t.prototype.pointFromY=function(A,B){(A=new I(A,16)).red||(A=A.toRed(this.red));var Q=A.redSqr(),g=Q.redSub(this.c2),E=Q.redMul(this.d).redMul(this.c2).redSub(this.a),i=g.redMul(E.redInvm());if(0===i.cmp(this.zero)){if(B)throw new Error("invalid point");return this.point(this.zero,A)}var C=i.redSqrt();if(0!==C.redSqr().redSub(i).cmp(this.zero))throw new Error("invalid point");return C.fromRed().isOdd()!==B&&(C=C.redNeg()),this.point(C,A)},t.prototype.validate=function(A){if(A.isInfinity())return!0;A.normalize();var B=A.x.redSqr(),Q=A.y.redSqr(),g=B.redMul(this.a).redAdd(Q),I=this.c2.redMul(this.one.redAdd(this.d.redMul(B).redMul(Q)));return 0===g.cmp(I)},E(e,i.BasePoint),t.prototype.pointFromJSON=function(A){return e.fromJSON(this,A)},t.prototype.point=function(A,B,Q,g){return new e(this,A,B,Q,g)},e.fromJSON=function(A,B){return new e(A,B[0],B[1],B[2])},e.prototype.inspect=function(){return this.isInfinity()?"<EC Point Infinity>":"<EC Point x: "+this.x.fromRed().toString(16,2)+" y: "+this.y.fromRed().toString(16,2)+" z: "+this.z.fromRed().toString(16,2)+">"},e.prototype.isInfinity=function(){return 0===this.x.cmpn(0)&&(0===this.y.cmp(this.z)||this.zOne&&0===this.y.cmp(this.curve.c))},e.prototype._extDbl=function(){var A=this.x.redSqr(),B=this.y.redSqr(),Q=this.z.redSqr();Q=Q.redIAdd(Q);var g=this.curve._mulA(A),I=this.x.redAdd(this.y).redSqr().redISub(A).redISub(B),E=g.redAdd(B),i=E.redSub(Q),C=g.redSub(B),t=I.redMul(i),e=E.redMul(C),o=I.redMul(C),s=i.redMul(E);return this.curve.point(t,e,s,o)},e.prototype._projDbl=function(){var A,B,Q,g=this.x.redAdd(this.y).redSqr(),I=this.x.redSqr(),E=this.y.redSqr();if(this.curve.twisted){var i=(e=this.curve._mulA(I)).redAdd(E);if(this.zOne)A=g.redSub(I).redSub(E).redMul(i.redSub(this.curve.two)),B=i.redMul(e.redSub(E)),Q=i.redSqr().redSub(i).redSub(i);else{var C=this.z.redSqr(),t=i.redSub(C).redISub(C);A=g.redSub(I).redISub(E).redMul(t),B=i.redMul(e.redSub(E)),Q=i.redMul(t)}}else{var e=I.redAdd(E);C=this.curve._mulC(this.z).redSqr(),t=e.redSub(C).redSub(C);A=this.curve._mulC(g.redISub(e)).redMul(t),B=this.curve._mulC(e).redMul(I.redISub(E)),Q=e.redMul(t)}return this.curve.point(A,B,Q)},e.prototype.dbl=function(){return this.isInfinity()?this:this.curve.extended?this._extDbl():this._projDbl()},e.prototype._extAdd=function(A){var B=this.y.redSub(this.x).redMul(A.y.redSub(A.x)),Q=this.y.redAdd(this.x).redMul(A.y.redAdd(A.x)),g=this.t.redMul(this.curve.dd).redMul(A.t),I=this.z.redMul(A.z.redAdd(A.z)),E=Q.redSub(B),i=I.redSub(g),C=I.redAdd(g),t=Q.redAdd(B),e=E.redMul(i),o=C.redMul(t),s=E.redMul(t),r=i.redMul(C);return this.curve.point(e,o,r,s)},e.prototype._projAdd=function(A){var B,Q,g=this.z.redMul(A.z),I=g.redSqr(),E=this.x.redMul(A.x),i=this.y.redMul(A.y),C=this.curve.d.redMul(E).redMul(i),t=I.redSub(C),e=I.redAdd(C),o=this.x.redAdd(this.y).redMul(A.x.redAdd(A.y)).redISub(E).redISub(i),s=g.redMul(t).redMul(o);return this.curve.twisted?(B=g.redMul(e).redMul(i.redSub(this.curve._mulA(E))),Q=t.redMul(e)):(B=g.redMul(e).redMul(i.redSub(E)),Q=this.curve._mulC(t).redMul(e)),this.curve.point(s,B,Q)},e.prototype.add=function(A){return this.isInfinity()?A:A.isInfinity()?this:this.curve.extended?this._extAdd(A):this._projAdd(A)},e.prototype.mul=function(A){return this._hasDoubles(A)?this.curve._fixedNafMul(this,A):this.curve._wnafMul(this,A)},e.prototype.mulAdd=function(A,B,Q){return this.curve._wnafMulAdd(1,[this,B],[A,Q],2,!1)},e.prototype.jmulAdd=function(A,B,Q){return this.curve._wnafMulAdd(1,[this,B],[A,Q],2,!0)},e.prototype.normalize=function(){if(this.zOne)return this;var A=this.z.redInvm();return this.x=this.x.redMul(A),this.y=this.y.redMul(A),this.t&&(this.t=this.t.redMul(A)),this.z=this.curve.one,this.zOne=!0,this},e.prototype.neg=function(){return this.curve.point(this.x.redNeg(),this.y,this.z,this.t&&this.t.redNeg())},e.prototype.getX=function(){return this.normalize(),this.x.fromRed()},e.prototype.getY=function(){return this.normalize(),this.y.fromRed()},e.prototype.eq=function(A){return this===A||0===this.getX().cmp(A.getX())&&0===this.getY().cmp(A.getY())},e.prototype.eqXToP=function(A){var B=A.toRed(this.curve.red).redMul(this.z);if(0===this.x.cmp(B))return!0;for(var Q=A.clone(),g=this.curve.redN.redMul(this.z);;){if(Q.iadd(this.curve.n),Q.cmp(this.curve.p)>=0)return!1;if(B.redIAdd(g),0===this.x.cmp(B))return!0}},e.prototype.toP=e.prototype.normalize,e.prototype.mixedAdd=e.prototype.add},function(A,B,Q){"use strict";B.sha1=Q(173),B.sha224=Q(174),B.sha256=Q(89),B.sha384=Q(175),B.sha512=Q(90)},function(A,B,Q){"use strict";var g=Q(7),I=Q(23),E=Q(88),i=g.rotl32,C=g.sum32,t=g.sum32_5,e=E.ft_1,o=I.BlockHash,s=[1518500249,1859775393,2400959708,3395469782];function r(){if(!(this instanceof r))return new r;o.call(this),this.h=[1732584193,4023233417,2562383102,271733878,3285377520],this.W=new Array(80)}g.inherits(r,o),A.exports=r,r.blockSize=512,r.outSize=160,r.hmacStrength=80,r.padLength=64,r.prototype._update=function(A,B){for(var Q=this.W,g=0;g<16;g++)Q[g]=A[B+g];for(;g<Q.length;g++)Q[g]=i(Q[g-3]^Q[g-8]^Q[g-14]^Q[g-16],1);var I=this.h[0],E=this.h[1],o=this.h[2],r=this.h[3],h=this.h[4];for(g=0;g<Q.length;g++){var n=~~(g/20),a=t(i(I,5),e(n,E,o,r),h,Q[g],s[n]);h=r,r=o,o=i(E,30),E=I,I=a}this.h[0]=C(this.h[0],I),this.h[1]=C(this.h[1],E),this.h[2]=C(this.h[2],o),this.h[3]=C(this.h[3],r),this.h[4]=C(this.h[4],h)},r.prototype._digest=function(A){return"hex"===A?g.toHex32(this.h,"big"):g.split32(this.h,"big")}},function(A,B,Q){"use strict";var g=Q(7),I=Q(89);function E(){if(!(this instanceof E))return new E;I.call(this),this.h=[3238371032,914150663,812702999,4144912697,4290775857,1750603025,1694076839,3204075428]}g.inherits(E,I),A.exports=E,E.blockSize=512,E.outSize=224,E.hmacStrength=192,E.padLength=64,E.prototype._digest=function(A){return"hex"===A?g.toHex32(this.h.slice(0,7),"big"):g.split32(this.h.slice(0,7),"big")}},function(A,B,Q){"use strict";var g=Q(7),I=Q(90);function E(){if(!(this instanceof E))return new E;I.call(this),this.h=[3418070365,3238371032,1654270250,914150663,2438529370,812702999,355462360,4144912697,1731405415,4290775857,2394180231,1750603025,3675008525,1694076839,1203062813,3204075428]}g.inherits(E,I),A.exports=E,E.blockSize=1024,E.outSize=384,E.hmacStrength=192,E.padLength=128,E.prototype._digest=function(A){return"hex"===A?g.toHex32(this.h.slice(0,12),"big"):g.split32(this.h.slice(0,12),"big")}},function(A,B,Q){"use strict";var g=Q(7),I=Q(23),E=g.rotl32,i=g.sum32,C=g.sum32_3,t=g.sum32_4,e=I.BlockHash;function o(){if(!(this instanceof o))return new o;e.call(this),this.h=[1732584193,4023233417,2562383102,271733878,3285377520],this.endian="little"}function s(A,B,Q,g){return A<=15?B^Q^g:A<=31?B&Q|~B&g:A<=47?(B|~Q)^g:A<=63?B&g|Q&~g:B^(Q|~g)}function r(A){return A<=15?0:A<=31?1518500249:A<=47?1859775393:A<=63?2400959708:2840853838}function h(A){return A<=15?1352829926:A<=31?1548603684:A<=47?1836072691:A<=63?2053994217:0}g.inherits(o,e),B.ripemd160=o,o.blockSize=512,o.outSize=160,o.hmacStrength=192,o.padLength=64,o.prototype._update=function(A,B){for(var Q=this.h[0],g=this.h[1],I=this.h[2],e=this.h[3],o=this.h[4],D=Q,u=g,f=I,w=e,F=o,d=0;d<80;d++){var l=i(E(t(Q,s(d,g,I,e),A[n[d]+B],r(d)),c[d]),o);Q=o,o=e,e=E(I,10),I=g,g=l,l=i(E(t(D,s(79-d,u,f,w),A[a[d]+B],h(d)),y[d]),F),D=F,F=w,w=E(f,10),f=u,u=l}l=C(this.h[1],I,w),this.h[1]=C(this.h[2],e,F),this.h[2]=C(this.h[3],o,D),this.h[3]=C(this.h[4],Q,u),this.h[4]=C(this.h[0],g,f),this.h[0]=l},o.prototype._digest=function(A){return"hex"===A?g.toHex32(this.h,"little"):g.split32(this.h,"little")};var n=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,7,4,13,1,10,6,15,3,12,0,9,5,2,14,11,8,3,10,14,4,9,15,8,1,2,7,0,6,13,11,5,12,1,9,11,10,0,8,12,4,13,3,7,15,14,5,6,2,4,0,5,9,7,12,2,10,14,1,3,8,11,6,15,13],a=[5,14,7,0,9,2,11,4,13,6,15,8,1,10,3,12,6,11,3,7,0,13,5,10,14,15,8,12,4,9,1,2,15,5,1,3,7,14,6,9,11,8,12,2,10,0,4,13,8,6,4,1,3,11,15,0,5,12,2,13,9,7,10,14,12,15,10,4,1,5,8,7,6,2,13,14,0,3,9,11],c=[11,14,15,12,5,8,7,9,11,13,14,15,6,7,9,8,7,6,8,13,11,9,7,15,7,12,15,9,11,7,13,12,11,13,6,7,14,9,13,15,14,8,13,6,5,12,7,5,11,12,14,15,14,15,9,8,9,14,5,6,8,6,5,12,9,15,5,11,6,8,13,12,5,12,13,14,11,8,5,6],y=[8,9,9,11,13,15,15,5,7,7,8,11,14,14,12,6,9,13,15,7,12,8,9,11,7,7,12,7,6,15,13,11,9,7,15,11,8,6,6,14,12,13,5,14,13,13,7,5,15,5,8,11,14,14,6,14,6,9,12,9,12,5,15,8,8,5,12,9,12,5,14,6,8,13,6,5,15,13,11,11]},function(A,B,Q){"use strict";var g=Q(7),I=Q(5);function E(A,B,Q){if(!(this instanceof E))return new E(A,B,Q);this.Hash=A,this.blockSize=A.blockSize/8,this.outSize=A.outSize/8,this.inner=null,this.outer=null,this._init(g.toArray(B,Q))}A.exports=E,E.prototype._init=function(A){A.length>this.blockSize&&(A=(new this.Hash).update(A).digest()),I(A.length<=this.blockSize);for(var B=A.length;B<this.blockSize;B++)A.push(0);for(B=0;B<A.length;B++)A[B]^=54;for(this.inner=(new this.Hash).update(A),B=0;B<A.length;B++)A[B]^=106;this.outer=(new this.Hash).update(A)},E.prototype.update=function(A,B){return this.inner.update(A,B),this},E.prototype.digest=function(A){return this.outer.update(this.inner.digest()),this.outer.digest(A)}},function(A,B){A.exports={doubles:{step:4,points:[["e60fce93b59e9ec53011aabc21c23e97b2a31369b87a5ae9c44ee89e2a6dec0a","f7e3507399e595929db99f34f57937101296891e44d23f0be1f32cce69616821"],["8282263212c609d9ea2a6e3e172de238d8c39cabd5ac1ca10646e23fd5f51508","11f8a8098557dfe45e8256e830b60ace62d613ac2f7b17bed31b6eaff6e26caf"],["175e159f728b865a72f99cc6c6fc846de0b93833fd2222ed73fce5b551e5b739","d3506e0d9e3c79eba4ef97a51ff71f5eacb5955add24345c6efa6ffee9fed695"],["363d90d447b00c9c99ceac05b6262ee053441c7e55552ffe526bad8f83ff4640","4e273adfc732221953b445397f3363145b9a89008199ecb62003c7f3bee9de9"],["8b4b5f165df3c2be8c6244b5b745638843e4a781a15bcd1b69f79a55dffdf80c","4aad0a6f68d308b4b3fbd7813ab0da04f9e336546162ee56b3eff0c65fd4fd36"],["723cbaa6e5db996d6bf771c00bd548c7b700dbffa6c0e77bcb6115925232fcda","96e867b5595cc498a921137488824d6e2660a0653779494801dc069d9eb39f5f"],["eebfa4d493bebf98ba5feec812c2d3b50947961237a919839a533eca0e7dd7fa","5d9a8ca3970ef0f269ee7edaf178089d9ae4cdc3a711f712ddfd4fdae1de8999"],["100f44da696e71672791d0a09b7bde459f1215a29b3c03bfefd7835b39a48db0","cdd9e13192a00b772ec8f3300c090666b7ff4a18ff5195ac0fbd5cd62bc65a09"],["e1031be262c7ed1b1dc9227a4a04c017a77f8d4464f3b3852c8acde6e534fd2d","9d7061928940405e6bb6a4176597535af292dd419e1ced79a44f18f29456a00d"],["feea6cae46d55b530ac2839f143bd7ec5cf8b266a41d6af52d5e688d9094696d","e57c6b6c97dce1bab06e4e12bf3ecd5c981c8957cc41442d3155debf18090088"],["da67a91d91049cdcb367be4be6ffca3cfeed657d808583de33fa978bc1ec6cb1","9bacaa35481642bc41f463f7ec9780e5dec7adc508f740a17e9ea8e27a68be1d"],["53904faa0b334cdda6e000935ef22151ec08d0f7bb11069f57545ccc1a37b7c0","5bc087d0bc80106d88c9eccac20d3c1c13999981e14434699dcb096b022771c8"],["8e7bcd0bd35983a7719cca7764ca906779b53a043a9b8bcaeff959f43ad86047","10b7770b2a3da4b3940310420ca9514579e88e2e47fd68b3ea10047e8460372a"],["385eed34c1cdff21e6d0818689b81bde71a7f4f18397e6690a841e1599c43862","283bebc3e8ea23f56701de19e9ebf4576b304eec2086dc8cc0458fe5542e5453"],["6f9d9b803ecf191637c73a4413dfa180fddf84a5947fbc9c606ed86c3fac3a7","7c80c68e603059ba69b8e2a30e45c4d47ea4dd2f5c281002d86890603a842160"],["3322d401243c4e2582a2147c104d6ecbf774d163db0f5e5313b7e0e742d0e6bd","56e70797e9664ef5bfb019bc4ddaf9b72805f63ea2873af624f3a2e96c28b2a0"],["85672c7d2de0b7da2bd1770d89665868741b3f9af7643397721d74d28134ab83","7c481b9b5b43b2eb6374049bfa62c2e5e77f17fcc5298f44c8e3094f790313a6"],["948bf809b1988a46b06c9f1919413b10f9226c60f668832ffd959af60c82a0a","53a562856dcb6646dc6b74c5d1c3418c6d4dff08c97cd2bed4cb7f88d8c8e589"],["6260ce7f461801c34f067ce0f02873a8f1b0e44dfc69752accecd819f38fd8e8","bc2da82b6fa5b571a7f09049776a1ef7ecd292238051c198c1a84e95b2b4ae17"],["e5037de0afc1d8d43d8348414bbf4103043ec8f575bfdc432953cc8d2037fa2d","4571534baa94d3b5f9f98d09fb990bddbd5f5b03ec481f10e0e5dc841d755bda"],["e06372b0f4a207adf5ea905e8f1771b4e7e8dbd1c6a6c5b725866a0ae4fce725","7a908974bce18cfe12a27bb2ad5a488cd7484a7787104870b27034f94eee31dd"],["213c7a715cd5d45358d0bbf9dc0ce02204b10bdde2a3f58540ad6908d0559754","4b6dad0b5ae462507013ad06245ba190bb4850f5f36a7eeddff2c27534b458f2"],["4e7c272a7af4b34e8dbb9352a5419a87e2838c70adc62cddf0cc3a3b08fbd53c","17749c766c9d0b18e16fd09f6def681b530b9614bff7dd33e0b3941817dcaae6"],["fea74e3dbe778b1b10f238ad61686aa5c76e3db2be43057632427e2840fb27b6","6e0568db9b0b13297cf674deccb6af93126b596b973f7b77701d3db7f23cb96f"],["76e64113f677cf0e10a2570d599968d31544e179b760432952c02a4417bdde39","c90ddf8dee4e95cf577066d70681f0d35e2a33d2b56d2032b4b1752d1901ac01"],["c738c56b03b2abe1e8281baa743f8f9a8f7cc643df26cbee3ab150242bcbb891","893fb578951ad2537f718f2eacbfbbbb82314eef7880cfe917e735d9699a84c3"],["d895626548b65b81e264c7637c972877d1d72e5f3a925014372e9f6588f6c14b","febfaa38f2bc7eae728ec60818c340eb03428d632bb067e179363ed75d7d991f"],["b8da94032a957518eb0f6433571e8761ceffc73693e84edd49150a564f676e03","2804dfa44805a1e4d7c99cc9762808b092cc584d95ff3b511488e4e74efdf6e7"],["e80fea14441fb33a7d8adab9475d7fab2019effb5156a792f1a11778e3c0df5d","eed1de7f638e00771e89768ca3ca94472d155e80af322ea9fcb4291b6ac9ec78"],["a301697bdfcd704313ba48e51d567543f2a182031efd6915ddc07bbcc4e16070","7370f91cfb67e4f5081809fa25d40f9b1735dbf7c0a11a130c0d1a041e177ea1"],["90ad85b389d6b936463f9d0512678de208cc330b11307fffab7ac63e3fb04ed4","e507a3620a38261affdcbd9427222b839aefabe1582894d991d4d48cb6ef150"],["8f68b9d2f63b5f339239c1ad981f162ee88c5678723ea3351b7b444c9ec4c0da","662a9f2dba063986de1d90c2b6be215dbbea2cfe95510bfdf23cbf79501fff82"],["e4f3fb0176af85d65ff99ff9198c36091f48e86503681e3e6686fd5053231e11","1e63633ad0ef4f1c1661a6d0ea02b7286cc7e74ec951d1c9822c38576feb73bc"],["8c00fa9b18ebf331eb961537a45a4266c7034f2f0d4e1d0716fb6eae20eae29e","efa47267fea521a1a9dc343a3736c974c2fadafa81e36c54e7d2a4c66702414b"],["e7a26ce69dd4829f3e10cec0a9e98ed3143d084f308b92c0997fddfc60cb3e41","2a758e300fa7984b471b006a1aafbb18d0a6b2c0420e83e20e8a9421cf2cfd51"],["b6459e0ee3662ec8d23540c223bcbdc571cbcb967d79424f3cf29eb3de6b80ef","67c876d06f3e06de1dadf16e5661db3c4b3ae6d48e35b2ff30bf0b61a71ba45"],["d68a80c8280bb840793234aa118f06231d6f1fc67e73c5a5deda0f5b496943e8","db8ba9fff4b586d00c4b1f9177b0e28b5b0e7b8f7845295a294c84266b133120"],["324aed7df65c804252dc0270907a30b09612aeb973449cea4095980fc28d3d5d","648a365774b61f2ff130c0c35aec1f4f19213b0c7e332843967224af96ab7c84"],["4df9c14919cde61f6d51dfdbe5fee5dceec4143ba8d1ca888e8bd373fd054c96","35ec51092d8728050974c23a1d85d4b5d506cdc288490192ebac06cad10d5d"],["9c3919a84a474870faed8a9c1cc66021523489054d7f0308cbfc99c8ac1f98cd","ddb84f0f4a4ddd57584f044bf260e641905326f76c64c8e6be7e5e03d4fc599d"],["6057170b1dd12fdf8de05f281d8e06bb91e1493a8b91d4cc5a21382120a959e5","9a1af0b26a6a4807add9a2daf71df262465152bc3ee24c65e899be932385a2a8"],["a576df8e23a08411421439a4518da31880cef0fba7d4df12b1a6973eecb94266","40a6bf20e76640b2c92b97afe58cd82c432e10a7f514d9f3ee8be11ae1b28ec8"],["7778a78c28dec3e30a05fe9629de8c38bb30d1f5cf9a3a208f763889be58ad71","34626d9ab5a5b22ff7098e12f2ff580087b38411ff24ac563b513fc1fd9f43ac"],["928955ee637a84463729fd30e7afd2ed5f96274e5ad7e5cb09eda9c06d903ac","c25621003d3f42a827b78a13093a95eeac3d26efa8a8d83fc5180e935bcd091f"],["85d0fef3ec6db109399064f3a0e3b2855645b4a907ad354527aae75163d82751","1f03648413a38c0be29d496e582cf5663e8751e96877331582c237a24eb1f962"],["ff2b0dce97eece97c1c9b6041798b85dfdfb6d8882da20308f5404824526087e","493d13fef524ba188af4c4dc54d07936c7b7ed6fb90e2ceb2c951e01f0c29907"],["827fbbe4b1e880ea9ed2b2e6301b212b57f1ee148cd6dd28780e5e2cf856e241","c60f9c923c727b0b71bef2c67d1d12687ff7a63186903166d605b68baec293ec"],["eaa649f21f51bdbae7be4ae34ce6e5217a58fdce7f47f9aa7f3b58fa2120e2b3","be3279ed5bbbb03ac69a80f89879aa5a01a6b965f13f7e59d47a5305ba5ad93d"],["e4a42d43c5cf169d9391df6decf42ee541b6d8f0c9a137401e23632dda34d24f","4d9f92e716d1c73526fc99ccfb8ad34ce886eedfa8d8e4f13a7f7131deba9414"],["1ec80fef360cbdd954160fadab352b6b92b53576a88fea4947173b9d4300bf19","aeefe93756b5340d2f3a4958a7abbf5e0146e77f6295a07b671cdc1cc107cefd"],["146a778c04670c2f91b00af4680dfa8bce3490717d58ba889ddb5928366642be","b318e0ec3354028add669827f9d4b2870aaa971d2f7e5ed1d0b297483d83efd0"],["fa50c0f61d22e5f07e3acebb1aa07b128d0012209a28b9776d76a8793180eef9","6b84c6922397eba9b72cd2872281a68a5e683293a57a213b38cd8d7d3f4f2811"],["da1d61d0ca721a11b1a5bf6b7d88e8421a288ab5d5bba5220e53d32b5f067ec2","8157f55a7c99306c79c0766161c91e2966a73899d279b48a655fba0f1ad836f1"],["a8e282ff0c9706907215ff98e8fd416615311de0446f1e062a73b0610d064e13","7f97355b8db81c09abfb7f3c5b2515888b679a3e50dd6bd6cef7c73111f4cc0c"],["174a53b9c9a285872d39e56e6913cab15d59b1fa512508c022f382de8319497c","ccc9dc37abfc9c1657b4155f2c47f9e6646b3a1d8cb9854383da13ac079afa73"],["959396981943785c3d3e57edf5018cdbe039e730e4918b3d884fdff09475b7ba","2e7e552888c331dd8ba0386a4b9cd6849c653f64c8709385e9b8abf87524f2fd"],["d2a63a50ae401e56d645a1153b109a8fcca0a43d561fba2dbb51340c9d82b151","e82d86fb6443fcb7565aee58b2948220a70f750af484ca52d4142174dcf89405"],["64587e2335471eb890ee7896d7cfdc866bacbdbd3839317b3436f9b45617e073","d99fcdd5bf6902e2ae96dd6447c299a185b90a39133aeab358299e5e9faf6589"],["8481bde0e4e4d885b3a546d3e549de042f0aa6cea250e7fd358d6c86dd45e458","38ee7b8cba5404dd84a25bf39cecb2ca900a79c42b262e556d64b1b59779057e"],["13464a57a78102aa62b6979ae817f4637ffcfed3c4b1ce30bcd6303f6caf666b","69be159004614580ef7e433453ccb0ca48f300a81d0942e13f495a907f6ecc27"],["bc4a9df5b713fe2e9aef430bcc1dc97a0cd9ccede2f28588cada3a0d2d83f366","d3a81ca6e785c06383937adf4b798caa6e8a9fbfa547b16d758d666581f33c1"],["8c28a97bf8298bc0d23d8c749452a32e694b65e30a9472a3954ab30fe5324caa","40a30463a3305193378fedf31f7cc0eb7ae784f0451cb9459e71dc73cbef9482"],["8ea9666139527a8c1dd94ce4f071fd23c8b350c5a4bb33748c4ba111faccae0","620efabbc8ee2782e24e7c0cfb95c5d735b783be9cf0f8e955af34a30e62b945"],["dd3625faef5ba06074669716bbd3788d89bdde815959968092f76cc4eb9a9787","7a188fa3520e30d461da2501045731ca941461982883395937f68d00c644a573"],["f710d79d9eb962297e4f6232b40e8f7feb2bc63814614d692c12de752408221e","ea98e67232d3b3295d3b535532115ccac8612c721851617526ae47a9c77bfc82"]]},naf:{wnd:7,points:[["f9308a019258c31049344f85f89d5229b531c845836f99b08601f113bce036f9","388f7b0f632de8140fe337e62a37f3566500a99934c2231b6cb9fd7584b8e672"],["2f8bde4d1a07209355b4a7250a5c5128e88b84bddc619ab7cba8d569b240efe4","d8ac222636e5e3d6d4dba9dda6c9c426f788271bab0d6840dca87d3aa6ac62d6"],["5cbdf0646e5db4eaa398f365f2ea7a0e3d419b7e0330e39ce92bddedcac4f9bc","6aebca40ba255960a3178d6d861a54dba813d0b813fde7b5a5082628087264da"],["acd484e2f0c7f65309ad178a9f559abde09796974c57e714c35f110dfc27ccbe","cc338921b0a7d9fd64380971763b61e9add888a4375f8e0f05cc262ac64f9c37"],["774ae7f858a9411e5ef4246b70c65aac5649980be5c17891bbec17895da008cb","d984a032eb6b5e190243dd56d7b7b365372db1e2dff9d6a8301d74c9c953c61b"],["f28773c2d975288bc7d1d205c3748651b075fbc6610e58cddeeddf8f19405aa8","ab0902e8d880a89758212eb65cdaf473a1a06da521fa91f29b5cb52db03ed81"],["d7924d4f7d43ea965a465ae3095ff41131e5946f3c85f79e44adbcf8e27e080e","581e2872a86c72a683842ec228cc6defea40af2bd896d3a5c504dc9ff6a26b58"],["defdea4cdb677750a420fee807eacf21eb9898ae79b9768766e4faa04a2d4a34","4211ab0694635168e997b0ead2a93daeced1f4a04a95c0f6cfb199f69e56eb77"],["2b4ea0a797a443d293ef5cff444f4979f06acfebd7e86d277475656138385b6c","85e89bc037945d93b343083b5a1c86131a01f60c50269763b570c854e5c09b7a"],["352bbf4a4cdd12564f93fa332ce333301d9ad40271f8107181340aef25be59d5","321eb4075348f534d59c18259dda3e1f4a1b3b2e71b1039c67bd3d8bcf81998c"],["2fa2104d6b38d11b0230010559879124e42ab8dfeff5ff29dc9cdadd4ecacc3f","2de1068295dd865b64569335bd5dd80181d70ecfc882648423ba76b532b7d67"],["9248279b09b4d68dab21a9b066edda83263c3d84e09572e269ca0cd7f5453714","73016f7bf234aade5d1aa71bdea2b1ff3fc0de2a887912ffe54a32ce97cb3402"],["daed4f2be3a8bf278e70132fb0beb7522f570e144bf615c07e996d443dee8729","a69dce4a7d6c98e8d4a1aca87ef8d7003f83c230f3afa726ab40e52290be1c55"],["c44d12c7065d812e8acf28d7cbb19f9011ecd9e9fdf281b0e6a3b5e87d22e7db","2119a460ce326cdc76c45926c982fdac0e106e861edf61c5a039063f0e0e6482"],["6a245bf6dc698504c89a20cfded60853152b695336c28063b61c65cbd269e6b4","e022cf42c2bd4a708b3f5126f16a24ad8b33ba48d0423b6efd5e6348100d8a82"],["1697ffa6fd9de627c077e3d2fe541084ce13300b0bec1146f95ae57f0d0bd6a5","b9c398f186806f5d27561506e4557433a2cf15009e498ae7adee9d63d01b2396"],["605bdb019981718b986d0f07e834cb0d9deb8360ffb7f61df982345ef27a7479","2972d2de4f8d20681a78d93ec96fe23c26bfae84fb14db43b01e1e9056b8c49"],["62d14dab4150bf497402fdc45a215e10dcb01c354959b10cfe31c7e9d87ff33d","80fc06bd8cc5b01098088a1950eed0db01aa132967ab472235f5642483b25eaf"],["80c60ad0040f27dade5b4b06c408e56b2c50e9f56b9b8b425e555c2f86308b6f","1c38303f1cc5c30f26e66bad7fe72f70a65eed4cbe7024eb1aa01f56430bd57a"],["7a9375ad6167ad54aa74c6348cc54d344cc5dc9487d847049d5eabb0fa03c8fb","d0e3fa9eca8726909559e0d79269046bdc59ea10c70ce2b02d499ec224dc7f7"],["d528ecd9b696b54c907a9ed045447a79bb408ec39b68df504bb51f459bc3ffc9","eecf41253136e5f99966f21881fd656ebc4345405c520dbc063465b521409933"],["49370a4b5f43412ea25f514e8ecdad05266115e4a7ecb1387231808f8b45963","758f3f41afd6ed428b3081b0512fd62a54c3f3afbb5b6764b653052a12949c9a"],["77f230936ee88cbbd73df930d64702ef881d811e0e1498e2f1c13eb1fc345d74","958ef42a7886b6400a08266e9ba1b37896c95330d97077cbbe8eb3c7671c60d6"],["f2dac991cc4ce4b9ea44887e5c7c0bce58c80074ab9d4dbaeb28531b7739f530","e0dedc9b3b2f8dad4da1f32dec2531df9eb5fbeb0598e4fd1a117dba703a3c37"],["463b3d9f662621fb1b4be8fbbe2520125a216cdfc9dae3debcba4850c690d45b","5ed430d78c296c3543114306dd8622d7c622e27c970a1de31cb377b01af7307e"],["f16f804244e46e2a09232d4aff3b59976b98fac14328a2d1a32496b49998f247","cedabd9b82203f7e13d206fcdf4e33d92a6c53c26e5cce26d6579962c4e31df6"],["caf754272dc84563b0352b7a14311af55d245315ace27c65369e15f7151d41d1","cb474660ef35f5f2a41b643fa5e460575f4fa9b7962232a5c32f908318a04476"],["2600ca4b282cb986f85d0f1709979d8b44a09c07cb86d7c124497bc86f082120","4119b88753c15bd6a693b03fcddbb45d5ac6be74ab5f0ef44b0be9475a7e4b40"],["7635ca72d7e8432c338ec53cd12220bc01c48685e24f7dc8c602a7746998e435","91b649609489d613d1d5e590f78e6d74ecfc061d57048bad9e76f302c5b9c61"],["754e3239f325570cdbbf4a87deee8a66b7f2b33479d468fbc1a50743bf56cc18","673fb86e5bda30fb3cd0ed304ea49a023ee33d0197a695d0c5d98093c536683"],["e3e6bd1071a1e96aff57859c82d570f0330800661d1c952f9fe2694691d9b9e8","59c9e0bba394e76f40c0aa58379a3cb6a5a2283993e90c4167002af4920e37f5"],["186b483d056a033826ae73d88f732985c4ccb1f32ba35f4b4cc47fdcf04aa6eb","3b952d32c67cf77e2e17446e204180ab21fb8090895138b4a4a797f86e80888b"],["df9d70a6b9876ce544c98561f4be4f725442e6d2b737d9c91a8321724ce0963f","55eb2dafd84d6ccd5f862b785dc39d4ab157222720ef9da217b8c45cf2ba2417"],["5edd5cc23c51e87a497ca815d5dce0f8ab52554f849ed8995de64c5f34ce7143","efae9c8dbc14130661e8cec030c89ad0c13c66c0d17a2905cdc706ab7399a868"],["290798c2b6476830da12fe02287e9e777aa3fba1c355b17a722d362f84614fba","e38da76dcd440621988d00bcf79af25d5b29c094db2a23146d003afd41943e7a"],["af3c423a95d9f5b3054754efa150ac39cd29552fe360257362dfdecef4053b45","f98a3fd831eb2b749a93b0e6f35cfb40c8cd5aa667a15581bc2feded498fd9c6"],["766dbb24d134e745cccaa28c99bf274906bb66b26dcf98df8d2fed50d884249a","744b1152eacbe5e38dcc887980da38b897584a65fa06cedd2c924f97cbac5996"],["59dbf46f8c94759ba21277c33784f41645f7b44f6c596a58ce92e666191abe3e","c534ad44175fbc300f4ea6ce648309a042ce739a7919798cd85e216c4a307f6e"],["f13ada95103c4537305e691e74e9a4a8dd647e711a95e73cb62dc6018cfd87b8","e13817b44ee14de663bf4bc808341f326949e21a6a75c2570778419bdaf5733d"],["7754b4fa0e8aced06d4167a2c59cca4cda1869c06ebadfb6488550015a88522c","30e93e864e669d82224b967c3020b8fa8d1e4e350b6cbcc537a48b57841163a2"],["948dcadf5990e048aa3874d46abef9d701858f95de8041d2a6828c99e2262519","e491a42537f6e597d5d28a3224b1bc25df9154efbd2ef1d2cbba2cae5347d57e"],["7962414450c76c1689c7b48f8202ec37fb224cf5ac0bfa1570328a8a3d7c77ab","100b610ec4ffb4760d5c1fc133ef6f6b12507a051f04ac5760afa5b29db83437"],["3514087834964b54b15b160644d915485a16977225b8847bb0dd085137ec47ca","ef0afbb2056205448e1652c48e8127fc6039e77c15c2378b7e7d15a0de293311"],["d3cc30ad6b483e4bc79ce2c9dd8bc54993e947eb8df787b442943d3f7b527eaf","8b378a22d827278d89c5e9be8f9508ae3c2ad46290358630afb34db04eede0a4"],["1624d84780732860ce1c78fcbfefe08b2b29823db913f6493975ba0ff4847610","68651cf9b6da903e0914448c6cd9d4ca896878f5282be4c8cc06e2a404078575"],["733ce80da955a8a26902c95633e62a985192474b5af207da6df7b4fd5fc61cd4","f5435a2bd2badf7d485a4d8b8db9fcce3e1ef8e0201e4578c54673bc1dc5ea1d"],["15d9441254945064cf1a1c33bbd3b49f8966c5092171e699ef258dfab81c045c","d56eb30b69463e7234f5137b73b84177434800bacebfc685fc37bbe9efe4070d"],["a1d0fcf2ec9de675b612136e5ce70d271c21417c9d2b8aaaac138599d0717940","edd77f50bcb5a3cab2e90737309667f2641462a54070f3d519212d39c197a629"],["e22fbe15c0af8ccc5780c0735f84dbe9a790badee8245c06c7ca37331cb36980","a855babad5cd60c88b430a69f53a1a7a38289154964799be43d06d77d31da06"],["311091dd9860e8e20ee13473c1155f5f69635e394704eaa74009452246cfa9b3","66db656f87d1f04fffd1f04788c06830871ec5a64feee685bd80f0b1286d8374"],["34c1fd04d301be89b31c0442d3e6ac24883928b45a9340781867d4232ec2dbdf","9414685e97b1b5954bd46f730174136d57f1ceeb487443dc5321857ba73abee"],["f219ea5d6b54701c1c14de5b557eb42a8d13f3abbcd08affcc2a5e6b049b8d63","4cb95957e83d40b0f73af4544cccf6b1f4b08d3c07b27fb8d8c2962a400766d1"],["d7b8740f74a8fbaab1f683db8f45de26543a5490bca627087236912469a0b448","fa77968128d9c92ee1010f337ad4717eff15db5ed3c049b3411e0315eaa4593b"],["32d31c222f8f6f0ef86f7c98d3a3335ead5bcd32abdd94289fe4d3091aa824bf","5f3032f5892156e39ccd3d7915b9e1da2e6dac9e6f26e961118d14b8462e1661"],["7461f371914ab32671045a155d9831ea8793d77cd59592c4340f86cbc18347b5","8ec0ba238b96bec0cbdddcae0aa442542eee1ff50c986ea6b39847b3cc092ff6"],["ee079adb1df1860074356a25aa38206a6d716b2c3e67453d287698bad7b2b2d6","8dc2412aafe3be5c4c5f37e0ecc5f9f6a446989af04c4e25ebaac479ec1c8c1e"],["16ec93e447ec83f0467b18302ee620f7e65de331874c9dc72bfd8616ba9da6b5","5e4631150e62fb40d0e8c2a7ca5804a39d58186a50e497139626778e25b0674d"],["eaa5f980c245f6f038978290afa70b6bd8855897f98b6aa485b96065d537bd99","f65f5d3e292c2e0819a528391c994624d784869d7e6ea67fb18041024edc07dc"],["78c9407544ac132692ee1910a02439958ae04877151342ea96c4b6b35a49f51","f3e0319169eb9b85d5404795539a5e68fa1fbd583c064d2462b675f194a3ddb4"],["494f4be219a1a77016dcd838431aea0001cdc8ae7a6fc688726578d9702857a5","42242a969283a5f339ba7f075e36ba2af925ce30d767ed6e55f4b031880d562c"],["a598a8030da6d86c6bc7f2f5144ea549d28211ea58faa70ebf4c1e665c1fe9b5","204b5d6f84822c307e4b4a7140737aec23fc63b65b35f86a10026dbd2d864e6b"],["c41916365abb2b5d09192f5f2dbeafec208f020f12570a184dbadc3e58595997","4f14351d0087efa49d245b328984989d5caf9450f34bfc0ed16e96b58fa9913"],["841d6063a586fa475a724604da03bc5b92a2e0d2e0a36acfe4c73a5514742881","73867f59c0659e81904f9a1c7543698e62562d6744c169ce7a36de01a8d6154"],["5e95bb399a6971d376026947f89bde2f282b33810928be4ded112ac4d70e20d5","39f23f366809085beebfc71181313775a99c9aed7d8ba38b161384c746012865"],["36e4641a53948fd476c39f8a99fd974e5ec07564b5315d8bf99471bca0ef2f66","d2424b1b1abe4eb8164227b085c9aa9456ea13493fd563e06fd51cf5694c78fc"],["336581ea7bfbbb290c191a2f507a41cf5643842170e914faeab27c2c579f726","ead12168595fe1be99252129b6e56b3391f7ab1410cd1e0ef3dcdcabd2fda224"],["8ab89816dadfd6b6a1f2634fcf00ec8403781025ed6890c4849742706bd43ede","6fdcef09f2f6d0a044e654aef624136f503d459c3e89845858a47a9129cdd24e"],["1e33f1a746c9c5778133344d9299fcaa20b0938e8acff2544bb40284b8c5fb94","60660257dd11b3aa9c8ed618d24edff2306d320f1d03010e33a7d2057f3b3b6"],["85b7c1dcb3cec1b7ee7f30ded79dd20a0ed1f4cc18cbcfcfa410361fd8f08f31","3d98a9cdd026dd43f39048f25a8847f4fcafad1895d7a633c6fed3c35e999511"],["29df9fbd8d9e46509275f4b125d6d45d7fbe9a3b878a7af872a2800661ac5f51","b4c4fe99c775a606e2d8862179139ffda61dc861c019e55cd2876eb2a27d84b"],["a0b1cae06b0a847a3fea6e671aaf8adfdfe58ca2f768105c8082b2e449fce252","ae434102edde0958ec4b19d917a6a28e6b72da1834aff0e650f049503a296cf2"],["4e8ceafb9b3e9a136dc7ff67e840295b499dfb3b2133e4ba113f2e4c0e121e5","cf2174118c8b6d7a4b48f6d534ce5c79422c086a63460502b827ce62a326683c"],["d24a44e047e19b6f5afb81c7ca2f69080a5076689a010919f42725c2b789a33b","6fb8d5591b466f8fc63db50f1c0f1c69013f996887b8244d2cdec417afea8fa3"],["ea01606a7a6c9cdd249fdfcfacb99584001edd28abbab77b5104e98e8e3b35d4","322af4908c7312b0cfbfe369f7a7b3cdb7d4494bc2823700cfd652188a3ea98d"],["af8addbf2b661c8a6c6328655eb96651252007d8c5ea31be4ad196de8ce2131f","6749e67c029b85f52a034eafd096836b2520818680e26ac8f3dfbcdb71749700"],["e3ae1974566ca06cc516d47e0fb165a674a3dabcfca15e722f0e3450f45889","2aeabe7e4531510116217f07bf4d07300de97e4874f81f533420a72eeb0bd6a4"],["591ee355313d99721cf6993ffed1e3e301993ff3ed258802075ea8ced397e246","b0ea558a113c30bea60fc4775460c7901ff0b053d25ca2bdeee98f1a4be5d196"],["11396d55fda54c49f19aa97318d8da61fa8584e47b084945077cf03255b52984","998c74a8cd45ac01289d5833a7beb4744ff536b01b257be4c5767bea93ea57a4"],["3c5d2a1ba39c5a1790000738c9e0c40b8dcdfd5468754b6405540157e017aa7a","b2284279995a34e2f9d4de7396fc18b80f9b8b9fdd270f6661f79ca4c81bd257"],["cc8704b8a60a0defa3a99a7299f2e9c3fbc395afb04ac078425ef8a1793cc030","bdd46039feed17881d1e0862db347f8cf395b74fc4bcdc4e940b74e3ac1f1b13"],["c533e4f7ea8555aacd9777ac5cad29b97dd4defccc53ee7ea204119b2889b197","6f0a256bc5efdf429a2fb6242f1a43a2d9b925bb4a4b3a26bb8e0f45eb596096"],["c14f8f2ccb27d6f109f6d08d03cc96a69ba8c34eec07bbcf566d48e33da6593","c359d6923bb398f7fd4473e16fe1c28475b740dd098075e6c0e8649113dc3a38"],["a6cbc3046bc6a450bac24789fa17115a4c9739ed75f8f21ce441f72e0b90e6ef","21ae7f4680e889bb130619e2c0f95a360ceb573c70603139862afd617fa9b9f"],["347d6d9a02c48927ebfb86c1359b1caf130a3c0267d11ce6344b39f99d43cc38","60ea7f61a353524d1c987f6ecec92f086d565ab687870cb12689ff1e31c74448"],["da6545d2181db8d983f7dcb375ef5866d47c67b1bf31c8cf855ef7437b72656a","49b96715ab6878a79e78f07ce5680c5d6673051b4935bd897fea824b77dc208a"],["c40747cc9d012cb1a13b8148309c6de7ec25d6945d657146b9d5994b8feb1111","5ca560753be2a12fc6de6caf2cb489565db936156b9514e1bb5e83037e0fa2d4"],["4e42c8ec82c99798ccf3a610be870e78338c7f713348bd34c8203ef4037f3502","7571d74ee5e0fb92a7a8b33a07783341a5492144cc54bcc40a94473693606437"],["3775ab7089bc6af823aba2e1af70b236d251cadb0c86743287522a1b3b0dedea","be52d107bcfa09d8bcb9736a828cfa7fac8db17bf7a76a2c42ad961409018cf7"],["cee31cbf7e34ec379d94fb814d3d775ad954595d1314ba8846959e3e82f74e26","8fd64a14c06b589c26b947ae2bcf6bfa0149ef0be14ed4d80f448a01c43b1c6d"],["b4f9eaea09b6917619f6ea6a4eb5464efddb58fd45b1ebefcdc1a01d08b47986","39e5c9925b5a54b07433a4f18c61726f8bb131c012ca542eb24a8ac07200682a"],["d4263dfc3d2df923a0179a48966d30ce84e2515afc3dccc1b77907792ebcc60e","62dfaf07a0f78feb30e30d6295853ce189e127760ad6cf7fae164e122a208d54"],["48457524820fa65a4f8d35eb6930857c0032acc0a4a2de422233eeda897612c4","25a748ab367979d98733c38a1fa1c2e7dc6cc07db2d60a9ae7a76aaa49bd0f77"],["dfeeef1881101f2cb11644f3a2afdfc2045e19919152923f367a1767c11cceda","ecfb7056cf1de042f9420bab396793c0c390bde74b4bbdff16a83ae09a9a7517"],["6d7ef6b17543f8373c573f44e1f389835d89bcbc6062ced36c82df83b8fae859","cd450ec335438986dfefa10c57fea9bcc521a0959b2d80bbf74b190dca712d10"],["e75605d59102a5a2684500d3b991f2e3f3c88b93225547035af25af66e04541f","f5c54754a8f71ee540b9b48728473e314f729ac5308b06938360990e2bfad125"],["eb98660f4c4dfaa06a2be453d5020bc99a0c2e60abe388457dd43fefb1ed620c","6cb9a8876d9cb8520609af3add26cd20a0a7cd8a9411131ce85f44100099223e"],["13e87b027d8514d35939f2e6892b19922154596941888336dc3563e3b8dba942","fef5a3c68059a6dec5d624114bf1e91aac2b9da568d6abeb2570d55646b8adf1"],["ee163026e9fd6fe017c38f06a5be6fc125424b371ce2708e7bf4491691e5764a","1acb250f255dd61c43d94ccc670d0f58f49ae3fa15b96623e5430da0ad6c62b2"],["b268f5ef9ad51e4d78de3a750c2dc89b1e626d43505867999932e5db33af3d80","5f310d4b3c99b9ebb19f77d41c1dee018cf0d34fd4191614003e945a1216e423"],["ff07f3118a9df035e9fad85eb6c7bfe42b02f01ca99ceea3bf7ffdba93c4750d","438136d603e858a3a5c440c38eccbaddc1d2942114e2eddd4740d098ced1f0d8"],["8d8b9855c7c052a34146fd20ffb658bea4b9f69e0d825ebec16e8c3ce2b526a1","cdb559eedc2d79f926baf44fb84ea4d44bcf50fee51d7ceb30e2e7f463036758"],["52db0b5384dfbf05bfa9d472d7ae26dfe4b851ceca91b1eba54263180da32b63","c3b997d050ee5d423ebaf66a6db9f57b3180c902875679de924b69d84a7b375"],["e62f9490d3d51da6395efd24e80919cc7d0f29c3f3fa48c6fff543becbd43352","6d89ad7ba4876b0b22c2ca280c682862f342c8591f1daf5170e07bfd9ccafa7d"],["7f30ea2476b399b4957509c88f77d0191afa2ff5cb7b14fd6d8e7d65aaab1193","ca5ef7d4b231c94c3b15389a5f6311e9daff7bb67b103e9880ef4bff637acaec"],["5098ff1e1d9f14fb46a210fada6c903fef0fb7b4a1dd1d9ac60a0361800b7a00","9731141d81fc8f8084d37c6e7542006b3ee1b40d60dfe5362a5b132fd17ddc0"],["32b78c7de9ee512a72895be6b9cbefa6e2f3c4ccce445c96b9f2c81e2778ad58","ee1849f513df71e32efc3896ee28260c73bb80547ae2275ba497237794c8753c"],["e2cb74fddc8e9fbcd076eef2a7c72b0ce37d50f08269dfc074b581550547a4f7","d3aa2ed71c9dd2247a62df062736eb0baddea9e36122d2be8641abcb005cc4a4"],["8438447566d4d7bedadc299496ab357426009a35f235cb141be0d99cd10ae3a8","c4e1020916980a4da5d01ac5e6ad330734ef0d7906631c4f2390426b2edd791f"],["4162d488b89402039b584c6fc6c308870587d9c46f660b878ab65c82c711d67e","67163e903236289f776f22c25fb8a3afc1732f2b84b4e95dbda47ae5a0852649"],["3fad3fa84caf0f34f0f89bfd2dcf54fc175d767aec3e50684f3ba4a4bf5f683d","cd1bc7cb6cc407bb2f0ca647c718a730cf71872e7d0d2a53fa20efcdfe61826"],["674f2600a3007a00568c1a7ce05d0816c1fb84bf1370798f1c69532faeb1a86b","299d21f9413f33b3edf43b257004580b70db57da0b182259e09eecc69e0d38a5"],["d32f4da54ade74abb81b815ad1fb3b263d82d6c692714bcff87d29bd5ee9f08f","f9429e738b8e53b968e99016c059707782e14f4535359d582fc416910b3eea87"],["30e4e670435385556e593657135845d36fbb6931f72b08cb1ed954f1e3ce3ff6","462f9bce619898638499350113bbc9b10a878d35da70740dc695a559eb88db7b"],["be2062003c51cc3004682904330e4dee7f3dcd10b01e580bf1971b04d4cad297","62188bc49d61e5428573d48a74e1c655b1c61090905682a0d5558ed72dccb9bc"],["93144423ace3451ed29e0fb9ac2af211cb6e84a601df5993c419859fff5df04a","7c10dfb164c3425f5c71a3f9d7992038f1065224f72bb9d1d902a6d13037b47c"],["b015f8044f5fcbdcf21ca26d6c34fb8197829205c7b7d2a7cb66418c157b112c","ab8c1e086d04e813744a655b2df8d5f83b3cdc6faa3088c1d3aea1454e3a1d5f"],["d5e9e1da649d97d89e4868117a465a3a4f8a18de57a140d36b3f2af341a21b52","4cb04437f391ed73111a13cc1d4dd0db1693465c2240480d8955e8592f27447a"],["d3ae41047dd7ca065dbf8ed77b992439983005cd72e16d6f996a5316d36966bb","bd1aeb21ad22ebb22a10f0303417c6d964f8cdd7df0aca614b10dc14d125ac46"],["463e2763d885f958fc66cdd22800f0a487197d0a82e377b49f80af87c897b065","bfefacdb0e5d0fd7df3a311a94de062b26b80c61fbc97508b79992671ef7ca7f"],["7985fdfd127c0567c6f53ec1bb63ec3158e597c40bfe747c83cddfc910641917","603c12daf3d9862ef2b25fe1de289aed24ed291e0ec6708703a5bd567f32ed03"],["74a1ad6b5f76e39db2dd249410eac7f99e74c59cb83d2d0ed5ff1543da7703e9","cc6157ef18c9c63cd6193d83631bbea0093e0968942e8c33d5737fd790e0db08"],["30682a50703375f602d416664ba19b7fc9bab42c72747463a71d0896b22f6da3","553e04f6b018b4fa6c8f39e7f311d3176290d0e0f19ca73f17714d9977a22ff8"],["9e2158f0d7c0d5f26c3791efefa79597654e7a2b2464f52b1ee6c1347769ef57","712fcdd1b9053f09003a3481fa7762e9ffd7c8ef35a38509e2fbf2629008373"],["176e26989a43c9cfeba4029c202538c28172e566e3c4fce7322857f3be327d66","ed8cc9d04b29eb877d270b4878dc43c19aefd31f4eee09ee7b47834c1fa4b1c3"],["75d46efea3771e6e68abb89a13ad747ecf1892393dfc4f1b7004788c50374da8","9852390a99507679fd0b86fd2b39a868d7efc22151346e1a3ca4726586a6bed8"],["809a20c67d64900ffb698c4c825f6d5f2310fb0451c869345b7319f645605721","9e994980d9917e22b76b061927fa04143d096ccc54963e6a5ebfa5f3f8e286c1"],["1b38903a43f7f114ed4500b4eac7083fdefece1cf29c63528d563446f972c180","4036edc931a60ae889353f77fd53de4a2708b26b6f5da72ad3394119daf408f9"]]}}},function(A,B,Q){"use strict";var g=Q(8),I=Q(180),E=Q(6),i=Q(45),C=Q(41),t=E.assert,e=Q(181),o=Q(182);function s(A){if(!(this instanceof s))return new s(A);"string"==typeof A&&(t(i.hasOwnProperty(A),"Unknown curve "+A),A=i[A]),A instanceof i.PresetCurve&&(A={curve:A}),this.curve=A.curve.curve,this.n=this.curve.n,this.nh=this.n.ushrn(1),this.g=this.curve.g,this.g=A.curve.g,this.g.precompute(A.curve.n.bitLength()+1),this.hash=A.hash||A.curve.hash}A.exports=s,s.prototype.keyPair=function(A){return new e(this,A)},s.prototype.keyFromPrivate=function(A,B){return e.fromPrivate(this,A,B)},s.prototype.keyFromPublic=function(A,B){return e.fromPublic(this,A,B)},s.prototype.genKeyPair=function(A){A||(A={});for(var B=new I({hash:this.hash,pers:A.pers,persEnc:A.persEnc||"utf8",entropy:A.entropy||C(this.hash.hmacStrength),entropyEnc:A.entropy&&A.entropyEnc||"utf8",nonce:this.n.toArray()}),Q=this.n.byteLength(),E=this.n.sub(new g(2));;){var i=new g(B.generate(Q));if(!(i.cmp(E)>0))return i.iaddn(1),this.keyFromPrivate(i)}},s.prototype._truncateToN=function(A,B){var Q=8*A.byteLength()-this.n.bitLength();return Q>0&&(A=A.ushrn(Q)),!B&&A.cmp(this.n)>=0?A.sub(this.n):A},s.prototype.sign=function(A,B,Q,E){"object"==typeof Q&&(E=Q,Q=null),E||(E={}),B=this.keyFromPrivate(B,Q),A=this._truncateToN(new g(A,16));for(var i=this.n.byteLength(),C=B.getPrivate().toArray("be",i),t=A.toArray("be",i),e=new I({hash:this.hash,entropy:C,nonce:t,pers:E.pers,persEnc:E.persEnc||"utf8"}),s=this.n.sub(new g(1)),r=0;;r++){var h=E.k?E.k(r):new g(e.generate(this.n.byteLength()));if(!((h=this._truncateToN(h,!0)).cmpn(1)<=0||h.cmp(s)>=0)){var n=this.g.mul(h);if(!n.isInfinity()){var a=n.getX(),c=a.umod(this.n);if(0!==c.cmpn(0)){var y=h.invm(this.n).mul(c.mul(B.getPrivate()).iadd(A));if(0!==(y=y.umod(this.n)).cmpn(0)){var D=(n.getY().isOdd()?1:0)|(0!==a.cmp(c)?2:0);return E.canonical&&y.cmp(this.nh)>0&&(y=this.n.sub(y),D^=1),new o({r:c,s:y,recoveryParam:D})}}}}}},s.prototype.verify=function(A,B,Q,I){A=this._truncateToN(new g(A,16)),Q=this.keyFromPublic(Q,I);var E=(B=new o(B,"hex")).r,i=B.s;if(E.cmpn(1)<0||E.cmp(this.n)>=0)return!1;if(i.cmpn(1)<0||i.cmp(this.n)>=0)return!1;var C,t=i.invm(this.n),e=t.mul(A).umod(this.n),s=t.mul(E).umod(this.n);return this.curve._maxwellTrick?!(C=this.g.jmulAdd(e,Q.getPublic(),s)).isInfinity()&&C.eqXToP(E):!(C=this.g.mulAdd(e,Q.getPublic(),s)).isInfinity()&&0===C.getX().umod(this.n).cmp(E)},s.prototype.recoverPubKey=function(A,B,Q,I){t((3&Q)===Q,"The recovery param is more than two bits"),B=new o(B,I);var E=this.n,i=new g(A),C=B.r,e=B.s,s=1&Q,r=Q>>1;if(C.cmp(this.curve.p.umod(this.curve.n))>=0&&r)throw new Error("Unable to find sencond key candinate");C=r?this.curve.pointFromX(C.add(this.curve.n),s):this.curve.pointFromX(C,s);var h=B.r.invm(E),n=E.sub(i).mul(h).umod(E),a=e.mul(h).umod(E);return this.g.mulAdd(n,C,a)},s.prototype.getKeyRecoveryParam=function(A,B,Q,g){if(null!==(B=new o(B,g)).recoveryParam)return B.recoveryParam;for(var I=0;I<4;I++){var E;try{E=this.recoverPubKey(A,B,I)}catch(A){continue}if(E.eq(Q))return I}throw new Error("Unable to find valid recovery factor")}},function(A,B,Q){"use strict";var g=Q(46),I=Q(86),E=Q(5);function i(A){if(!(this instanceof i))return new i(A);this.hash=A.hash,this.predResist=!!A.predResist,this.outLen=this.hash.outSize,this.minEntropy=A.minEntropy||this.hash.hmacStrength,this._reseed=null,this.reseedInterval=null,this.K=null,this.V=null;var B=I.toArray(A.entropy,A.entropyEnc||"hex"),Q=I.toArray(A.nonce,A.nonceEnc||"hex"),g=I.toArray(A.pers,A.persEnc||"hex");E(B.length>=this.minEntropy/8,"Not enough entropy. Minimum is: "+this.minEntropy+" bits"),this._init(B,Q,g)}A.exports=i,i.prototype._init=function(A,B,Q){var g=A.concat(B).concat(Q);this.K=new Array(this.outLen/8),this.V=new Array(this.outLen/8);for(var I=0;I<this.V.length;I++)this.K[I]=0,this.V[I]=1;this._update(g),this._reseed=1,this.reseedInterval=281474976710656},i.prototype._hmac=function(){return new g.hmac(this.hash,this.K)},i.prototype._update=function(A){var B=this._hmac().update(this.V).update([0]);A&&(B=B.update(A)),this.K=B.digest(),this.V=this._hmac().update(this.V).digest(),A&&(this.K=this._hmac().update(this.V).update([1]).update(A).digest(),this.V=this._hmac().update(this.V).digest())},i.prototype.reseed=function(A,B,Q,g){"string"!=typeof B&&(g=Q,Q=B,B=null),A=I.toArray(A,B),Q=I.toArray(Q,g),E(A.length>=this.minEntropy/8,"Not enough entropy. Minimum is: "+this.minEntropy+" bits"),this._update(A.concat(Q||[])),this._reseed=1},i.prototype.generate=function(A,B,Q,g){if(this._reseed>this.reseedInterval)throw new Error("Reseed is required");"string"!=typeof B&&(g=Q,Q=B,B=null),Q&&(Q=I.toArray(Q,g||"hex"),this._update(Q));for(var E=[];E.length<A;)this.V=this._hmac().update(this.V).digest(),E=E.concat(this.V);var i=E.slice(0,A);return this._update(Q),this._reseed++,I.encode(i,B)}},function(A,B,Q){"use strict";var g=Q(8),I=Q(6).assert;function E(A,B){this.ec=A,this.priv=null,this.pub=null,B.priv&&this._importPrivate(B.priv,B.privEnc),B.pub&&this._importPublic(B.pub,B.pubEnc)}A.exports=E,E.fromPublic=function(A,B,Q){return B instanceof E?B:new E(A,{pub:B,pubEnc:Q})},E.fromPrivate=function(A,B,Q){return B instanceof E?B:new E(A,{priv:B,privEnc:Q})},E.prototype.validate=function(){var A=this.getPublic();return A.isInfinity()?{result:!1,reason:"Invalid public key"}:A.validate()?A.mul(this.ec.curve.n).isInfinity()?{result:!0,reason:null}:{result:!1,reason:"Public key * N != O"}:{result:!1,reason:"Public key is not a point"}},E.prototype.getPublic=function(A,B){return"string"==typeof A&&(B=A,A=null),this.pub||(this.pub=this.ec.g.mul(this.priv)),B?this.pub.encode(B,A):this.pub},E.prototype.getPrivate=function(A){return"hex"===A?this.priv.toString(16,2):this.priv},E.prototype._importPrivate=function(A,B){this.priv=new g(A,B||16),this.priv=this.priv.umod(this.ec.curve.n)},E.prototype._importPublic=function(A,B){if(A.x||A.y)return"mont"===this.ec.curve.type?I(A.x,"Need x coordinate"):"short"!==this.ec.curve.type&&"edwards"!==this.ec.curve.type||I(A.x&&A.y,"Need both x and y coordinate"),void(this.pub=this.ec.curve.point(A.x,A.y));this.pub=this.ec.curve.decodePoint(A,B)},E.prototype.derive=function(A){return A.mul(this.priv).getX()},E.prototype.sign=function(A,B,Q){return this.ec.sign(A,this,B,Q)},E.prototype.verify=function(A,B){return this.ec.verify(A,B,this)},E.prototype.inspect=function(){return"<Key priv: "+(this.priv&&this.priv.toString(16,2))+" pub: "+(this.pub&&this.pub.inspect())+" >"}},function(A,B,Q){"use strict";var g=Q(8),I=Q(6),E=I.assert;function i(A,B){if(A instanceof i)return A;this._importDER(A,B)||(E(A.r&&A.s,"Signature without r or s"),this.r=new g(A.r,16),this.s=new g(A.s,16),void 0===A.recoveryParam?this.recoveryParam=null:this.recoveryParam=A.recoveryParam)}function C(){this.place=0}function t(A,B){var Q=A[B.place++];if(!(128&Q))return Q;var g=15&Q;if(0===g||g>4)return!1;for(var I=0,E=0,i=B.place;E<g;E++,i++)I<<=8,I|=A[i],I>>>=0;return!(I<=127)&&(B.place=i,I)}function e(A){for(var B=0,Q=A.length-1;!A[B]&&!(128&A[B+1])&&B<Q;)B++;return 0===B?A:A.slice(B)}function o(A,B){if(B<128)A.push(B);else{var Q=1+(Math.log(B)/Math.LN2>>>3);for(A.push(128|Q);--Q;)A.push(B>>>(Q<<3)&255);A.push(B)}}A.exports=i,i.prototype._importDER=function(A,B){A=I.toArray(A,B);var Q=new C;if(48!==A[Q.place++])return!1;var E=t(A,Q);if(!1===E)return!1;if(E+Q.place!==A.length)return!1;if(2!==A[Q.place++])return!1;var i=t(A,Q);if(!1===i)return!1;var e=A.slice(Q.place,i+Q.place);if(Q.place+=i,2!==A[Q.place++])return!1;var o=t(A,Q);if(!1===o)return!1;if(A.length!==o+Q.place)return!1;var s=A.slice(Q.place,o+Q.place);if(0===e[0]){if(!(128&e[1]))return!1;e=e.slice(1)}if(0===s[0]){if(!(128&s[1]))return!1;s=s.slice(1)}return this.r=new g(e),this.s=new g(s),this.recoveryParam=null,!0},i.prototype.toDER=function(A){var B=this.r.toArray(),Q=this.s.toArray();for(128&B[0]&&(B=[0].concat(B)),128&Q[0]&&(Q=[0].concat(Q)),B=e(B),Q=e(Q);!(Q[0]||128&Q[1]);)Q=Q.slice(1);var g=[2];o(g,B.length),(g=g.concat(B)).push(2),o(g,Q.length);var E=g.concat(Q),i=[48];return o(i,E.length),i=i.concat(E),I.encode(i,A)}},function(A,B,Q){"use strict";var g=Q(46),I=Q(45),E=Q(6),i=E.assert,C=E.parseBytes,t=Q(184),e=Q(185);function o(A){if(i("ed25519"===A,"only tested with ed25519 so far"),!(this instanceof o))return new o(A);A=I[A].curve;this.curve=A,this.g=A.g,this.g.precompute(A.n.bitLength()+1),this.pointClass=A.point().constructor,this.encodingLength=Math.ceil(A.n.bitLength()/8),this.hash=g.sha512}A.exports=o,o.prototype.sign=function(A,B){A=C(A);var Q=this.keyFromSecret(B),g=this.hashInt(Q.messagePrefix(),A),I=this.g.mul(g),E=this.encodePoint(I),i=this.hashInt(E,Q.pubBytes(),A).mul(Q.priv()),t=g.add(i).umod(this.curve.n);return this.makeSignature({R:I,S:t,Rencoded:E})},o.prototype.verify=function(A,B,Q){A=C(A),B=this.makeSignature(B);var g=this.keyFromPublic(Q),I=this.hashInt(B.Rencoded(),g.pubBytes(),A),E=this.g.mul(B.S());return B.R().add(g.pub().mul(I)).eq(E)},o.prototype.hashInt=function(){for(var A=this.hash(),B=0;B<arguments.length;B++)A.update(arguments[B]);return E.intFromLE(A.digest()).umod(this.curve.n)},o.prototype.keyFromPublic=function(A){return t.fromPublic(this,A)},o.prototype.keyFromSecret=function(A){return t.fromSecret(this,A)},o.prototype.makeSignature=function(A){return A instanceof e?A:new e(this,A)},o.prototype.encodePoint=function(A){var B=A.getY().toArray("le",this.encodingLength);return B[this.encodingLength-1]|=A.getX().isOdd()?128:0,B},o.prototype.decodePoint=function(A){var B=(A=E.parseBytes(A)).length-1,Q=A.slice(0,B).concat(-129&A[B]),g=0!=(128&A[B]),I=E.intFromLE(Q);return this.curve.pointFromY(I,g)},o.prototype.encodeInt=function(A){return A.toArray("le",this.encodingLength)},o.prototype.decodeInt=function(A){return E.intFromLE(A)},o.prototype.isPoint=function(A){return A instanceof this.pointClass}},function(A,B,Q){"use strict";var g=Q(6),I=g.assert,E=g.parseBytes,i=g.cachedProperty;function C(A,B){this.eddsa=A,this._secret=E(B.secret),A.isPoint(B.pub)?this._pub=B.pub:this._pubBytes=E(B.pub)}C.fromPublic=function(A,B){return B instanceof C?B:new C(A,{pub:B})},C.fromSecret=function(A,B){return B instanceof C?B:new C(A,{secret:B})},C.prototype.secret=function(){return this._secret},i(C,"pubBytes",(function(){return this.eddsa.encodePoint(this.pub())})),i(C,"pub",(function(){return this._pubBytes?this.eddsa.decodePoint(this._pubBytes):this.eddsa.g.mul(this.priv())})),i(C,"privBytes",(function(){var A=this.eddsa,B=this.hash(),Q=A.encodingLength-1,g=B.slice(0,A.encodingLength);return g[0]&=248,g[Q]&=127,g[Q]|=64,g})),i(C,"priv",(function(){return this.eddsa.decodeInt(this.privBytes())})),i(C,"hash",(function(){return this.eddsa.hash().update(this.secret()).digest()})),i(C,"messagePrefix",(function(){return this.hash().slice(this.eddsa.encodingLength)})),C.prototype.sign=function(A){return I(this._secret,"KeyPair can only verify"),this.eddsa.sign(A,this)},C.prototype.verify=function(A,B){return this.eddsa.verify(A,B,this)},C.prototype.getSecret=function(A){return I(this._secret,"KeyPair is public only"),g.encode(this.secret(),A)},C.prototype.getPublic=function(A){return g.encode(this.pubBytes(),A)},A.exports=C},function(A,B,Q){"use strict";var g=Q(8),I=Q(6),E=I.assert,i=I.cachedProperty,C=I.parseBytes;function t(A,B){this.eddsa=A,"object"!=typeof B&&(B=C(B)),Array.isArray(B)&&(B={R:B.slice(0,A.encodingLength),S:B.slice(A.encodingLength)}),E(B.R&&B.S,"Signature without R or S"),A.isPoint(B.R)&&(this._R=B.R),B.S instanceof g&&(this._S=B.S),this._Rencoded=Array.isArray(B.R)?B.R:B.Rencoded,this._Sencoded=Array.isArray(B.S)?B.S:B.Sencoded}i(t,"S",(function(){return this.eddsa.decodeInt(this.Sencoded())})),i(t,"R",(function(){return this.eddsa.decodePoint(this.Rencoded())})),i(t,"Rencoded",(function(){return this.eddsa.encodePoint(this.R())})),i(t,"Sencoded",(function(){return this.eddsa.encodeInt(this.S())})),t.prototype.toBytes=function(){return this.Rencoded().concat(this.Sencoded())},t.prototype.toHex=function(){return I.encode(this.toBytes(),"hex").toUpperCase()},A.exports=t},function(A,B){},function(A,B,Q){"use strict";var g=Q(24);B.certificate=Q(199);var I=g.define("RSAPrivateKey",(function(){this.seq().obj(this.key("version").int(),this.key("modulus").int(),this.key("publicExponent").int(),this.key("privateExponent").int(),this.key("prime1").int(),this.key("prime2").int(),this.key("exponent1").int(),this.key("exponent2").int(),this.key("coefficient").int())}));B.RSAPrivateKey=I;var E=g.define("RSAPublicKey",(function(){this.seq().obj(this.key("modulus").int(),this.key("publicExponent").int())}));B.RSAPublicKey=E;var i=g.define("SubjectPublicKeyInfo",(function(){this.seq().obj(this.key("algorithm").use(C),this.key("subjectPublicKey").bitstr())}));B.PublicKey=i;var C=g.define("AlgorithmIdentifier",(function(){this.seq().obj(this.key("algorithm").objid(),this.key("none").null_().optional(),this.key("curve").objid().optional(),this.key("params").seq().obj(this.key("p").int(),this.key("q").int(),this.key("g").int()).optional())})),t=g.define("PrivateKeyInfo",(function(){this.seq().obj(this.key("version").int(),this.key("algorithm").use(C),this.key("subjectPrivateKey").octstr())}));B.PrivateKey=t;var e=g.define("EncryptedPrivateKeyInfo",(function(){this.seq().obj(this.key("algorithm").seq().obj(this.key("id").objid(),this.key("decrypt").seq().obj(this.key("kde").seq().obj(this.key("id").objid(),this.key("kdeparams").seq().obj(this.key("salt").octstr(),this.key("iters").int())),this.key("cipher").seq().obj(this.key("algo").objid(),this.key("iv").octstr()))),this.key("subjectPrivateKey").octstr())}));B.EncryptedPrivateKey=e;var o=g.define("DSAPrivateKey",(function(){this.seq().obj(this.key("version").int(),this.key("p").int(),this.key("q").int(),this.key("g").int(),this.key("pub_key").int(),this.key("priv_key").int())}));B.DSAPrivateKey=o,B.DSAparam=g.define("DSAparam",(function(){this.int()}));var s=g.define("ECPrivateKey",(function(){this.seq().obj(this.key("version").int(),this.key("privateKey").octstr(),this.key("parameters").optional().explicit(0).use(r),this.key("publicKey").optional().explicit(1).bitstr())}));B.ECPrivateKey=s;var r=g.define("ECParameters",(function(){this.choice({namedCurve:this.objid()})}));B.signature=g.define("signature",(function(){this.seq().obj(this.key("r").int(),this.key("s").int())}))},function(A,B,Q){(function(A){!function(A,B){"use strict";function g(A,B){if(!A)throw new Error(B||"Assertion failed")}function I(A,B){A.super_=B;var Q=function(){};Q.prototype=B.prototype,A.prototype=new Q,A.prototype.constructor=A}function E(A,B,Q){if(E.isBN(A))return A;this.negative=0,this.words=null,this.length=0,this.red=null,null!==A&&("le"!==B&&"be"!==B||(Q=B,B=10),this._init(A||0,B||10,Q||"be"))}var i;"object"==typeof A?A.exports=E:B.BN=E,E.BN=E,E.wordSize=26;try{i=Q(189).Buffer}catch(A){}function C(A,B,Q){for(var g=0,I=Math.min(A.length,Q),E=B;E<I;E++){var i=A.charCodeAt(E)-48;g<<=4,g|=i>=49&&i<=54?i-49+10:i>=17&&i<=22?i-17+10:15&i}return g}function t(A,B,Q,g){for(var I=0,E=Math.min(A.length,Q),i=B;i<E;i++){var C=A.charCodeAt(i)-48;I*=g,I+=C>=49?C-49+10:C>=17?C-17+10:C}return I}E.isBN=function(A){return A instanceof E||null!==A&&"object"==typeof A&&A.constructor.wordSize===E.wordSize&&Array.isArray(A.words)},E.max=function(A,B){return A.cmp(B)>0?A:B},E.min=function(A,B){return A.cmp(B)<0?A:B},E.prototype._init=function(A,B,Q){if("number"==typeof A)return this._initNumber(A,B,Q);if("object"==typeof A)return this._initArray(A,B,Q);"hex"===B&&(B=16),g(B===(0|B)&&B>=2&&B<=36);var I=0;"-"===(A=A.toString().replace(/\s+/g,""))[0]&&I++,16===B?this._parseHex(A,I):this._parseBase(A,B,I),"-"===A[0]&&(this.negative=1),this.strip(),"le"===Q&&this._initArray(this.toArray(),B,Q)},E.prototype._initNumber=function(A,B,Q){A<0&&(this.negative=1,A=-A),A<67108864?(this.words=[67108863&A],this.length=1):A<4503599627370496?(this.words=[67108863&A,A/67108864&67108863],this.length=2):(g(A<9007199254740992),this.words=[67108863&A,A/67108864&67108863,1],this.length=3),"le"===Q&&this._initArray(this.toArray(),B,Q)},E.prototype._initArray=function(A,B,Q){if(g("number"==typeof A.length),A.length<=0)return this.words=[0],this.length=1,this;this.length=Math.ceil(A.length/3),this.words=new Array(this.length);for(var I=0;I<this.length;I++)this.words[I]=0;var E,i,C=0;if("be"===Q)for(I=A.length-1,E=0;I>=0;I-=3)i=A[I]|A[I-1]<<8|A[I-2]<<16,this.words[E]|=i<<C&67108863,this.words[E+1]=i>>>26-C&67108863,(C+=24)>=26&&(C-=26,E++);else if("le"===Q)for(I=0,E=0;I<A.length;I+=3)i=A[I]|A[I+1]<<8|A[I+2]<<16,this.words[E]|=i<<C&67108863,this.words[E+1]=i>>>26-C&67108863,(C+=24)>=26&&(C-=26,E++);return this.strip()},E.prototype._parseHex=function(A,B){this.length=Math.ceil((A.length-B)/6),this.words=new Array(this.length);for(var Q=0;Q<this.length;Q++)this.words[Q]=0;var g,I,E=0;for(Q=A.length-6,g=0;Q>=B;Q-=6)I=C(A,Q,Q+6),this.words[g]|=I<<E&67108863,this.words[g+1]|=I>>>26-E&4194303,(E+=24)>=26&&(E-=26,g++);Q+6!==B&&(I=C(A,B,Q+6),this.words[g]|=I<<E&67108863,this.words[g+1]|=I>>>26-E&4194303),this.strip()},E.prototype._parseBase=function(A,B,Q){this.words=[0],this.length=1;for(var g=0,I=1;I<=67108863;I*=B)g++;g--,I=I/B|0;for(var E=A.length-Q,i=E%g,C=Math.min(E,E-i)+Q,e=0,o=Q;o<C;o+=g)e=t(A,o,o+g,B),this.imuln(I),this.words[0]+e<67108864?this.words[0]+=e:this._iaddn(e);if(0!==i){var s=1;for(e=t(A,o,A.length,B),o=0;o<i;o++)s*=B;this.imuln(s),this.words[0]+e<67108864?this.words[0]+=e:this._iaddn(e)}},E.prototype.copy=function(A){A.words=new Array(this.length);for(var B=0;B<this.length;B++)A.words[B]=this.words[B];A.length=this.length,A.negative=this.negative,A.red=this.red},E.prototype.clone=function(){var A=new E(null);return this.copy(A),A},E.prototype._expand=function(A){for(;this.length<A;)this.words[this.length++]=0;return this},E.prototype.strip=function(){for(;this.length>1&&0===this.words[this.length-1];)this.length--;return this._normSign()},E.prototype._normSign=function(){return 1===this.length&&0===this.words[0]&&(this.negative=0),this},E.prototype.inspect=function(){return(this.red?"<BN-R: ":"<BN: ")+this.toString(16)+">"};var e=["","0","00","000","0000","00000","000000","0000000","00000000","000000000","0000000000","00000000000","000000000000","0000000000000","00000000000000","000000000000000","0000000000000000","00000000000000000","000000000000000000","0000000000000000000","00000000000000000000","000000000000000000000","0000000000000000000000","00000000000000000000000","000000000000000000000000","0000000000000000000000000"],o=[0,0,25,16,12,11,10,9,8,8,7,7,7,7,6,6,6,6,6,6,6,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],s=[0,0,33554432,43046721,16777216,48828125,60466176,40353607,16777216,43046721,1e7,19487171,35831808,62748517,7529536,11390625,16777216,24137569,34012224,47045881,64e6,4084101,5153632,6436343,7962624,9765625,11881376,14348907,17210368,20511149,243e5,28629151,33554432,39135393,45435424,52521875,60466176];function r(A,B,Q){Q.negative=B.negative^A.negative;var g=A.length+B.length|0;Q.length=g,g=g-1|0;var I=0|A.words[0],E=0|B.words[0],i=I*E,C=67108863&i,t=i/67108864|0;Q.words[0]=C;for(var e=1;e<g;e++){for(var o=t>>>26,s=67108863&t,r=Math.min(e,B.length-1),h=Math.max(0,e-A.length+1);h<=r;h++){var n=e-h|0;o+=(i=(I=0|A.words[n])*(E=0|B.words[h])+s)/67108864|0,s=67108863&i}Q.words[e]=0|s,t=0|o}return 0!==t?Q.words[e]=0|t:Q.length--,Q.strip()}E.prototype.toString=function(A,B){var Q;if(B=0|B||1,16===(A=A||10)||"hex"===A){Q="";for(var I=0,E=0,i=0;i<this.length;i++){var C=this.words[i],t=(16777215&(C<<I|E)).toString(16);Q=0!==(E=C>>>24-I&16777215)||i!==this.length-1?e[6-t.length]+t+Q:t+Q,(I+=2)>=26&&(I-=26,i--)}for(0!==E&&(Q=E.toString(16)+Q);Q.length%B!=0;)Q="0"+Q;return 0!==this.negative&&(Q="-"+Q),Q}if(A===(0|A)&&A>=2&&A<=36){var r=o[A],h=s[A];Q="";var n=this.clone();for(n.negative=0;!n.isZero();){var a=n.modn(h).toString(A);Q=(n=n.idivn(h)).isZero()?a+Q:e[r-a.length]+a+Q}for(this.isZero()&&(Q="0"+Q);Q.length%B!=0;)Q="0"+Q;return 0!==this.negative&&(Q="-"+Q),Q}g(!1,"Base should be between 2 and 36")},E.prototype.toNumber=function(){var A=this.words[0];return 2===this.length?A+=67108864*this.words[1]:3===this.length&&1===this.words[2]?A+=4503599627370496+67108864*this.words[1]:this.length>2&&g(!1,"Number can only safely store up to 53 bits"),0!==this.negative?-A:A},E.prototype.toJSON=function(){return this.toString(16)},E.prototype.toBuffer=function(A,B){return g(void 0!==i),this.toArrayLike(i,A,B)},E.prototype.toArray=function(A,B){return this.toArrayLike(Array,A,B)},E.prototype.toArrayLike=function(A,B,Q){var I=this.byteLength(),E=Q||Math.max(1,I);g(I<=E,"byte array longer than desired length"),g(E>0,"Requested array length <= 0"),this.strip();var i,C,t="le"===B,e=new A(E),o=this.clone();if(t){for(C=0;!o.isZero();C++)i=o.andln(255),o.iushrn(8),e[C]=i;for(;C<E;C++)e[C]=0}else{for(C=0;C<E-I;C++)e[C]=0;for(C=0;!o.isZero();C++)i=o.andln(255),o.iushrn(8),e[E-C-1]=i}return e},Math.clz32?E.prototype._countBits=function(A){return 32-Math.clz32(A)}:E.prototype._countBits=function(A){var B=A,Q=0;return B>=4096&&(Q+=13,B>>>=13),B>=64&&(Q+=7,B>>>=7),B>=8&&(Q+=4,B>>>=4),B>=2&&(Q+=2,B>>>=2),Q+B},E.prototype._zeroBits=function(A){if(0===A)return 26;var B=A,Q=0;return 0==(8191&B)&&(Q+=13,B>>>=13),0==(127&B)&&(Q+=7,B>>>=7),0==(15&B)&&(Q+=4,B>>>=4),0==(3&B)&&(Q+=2,B>>>=2),0==(1&B)&&Q++,Q},E.prototype.bitLength=function(){var A=this.words[this.length-1],B=this._countBits(A);return 26*(this.length-1)+B},E.prototype.zeroBits=function(){if(this.isZero())return 0;for(var A=0,B=0;B<this.length;B++){var Q=this._zeroBits(this.words[B]);if(A+=Q,26!==Q)break}return A},E.prototype.byteLength=function(){return Math.ceil(this.bitLength()/8)},E.prototype.toTwos=function(A){return 0!==this.negative?this.abs().inotn(A).iaddn(1):this.clone()},E.prototype.fromTwos=function(A){return this.testn(A-1)?this.notn(A).iaddn(1).ineg():this.clone()},E.prototype.isNeg=function(){return 0!==this.negative},E.prototype.neg=function(){return this.clone().ineg()},E.prototype.ineg=function(){return this.isZero()||(this.negative^=1),this},E.prototype.iuor=function(A){for(;this.length<A.length;)this.words[this.length++]=0;for(var B=0;B<A.length;B++)this.words[B]=this.words[B]|A.words[B];return this.strip()},E.prototype.ior=function(A){return g(0==(this.negative|A.negative)),this.iuor(A)},E.prototype.or=function(A){return this.length>A.length?this.clone().ior(A):A.clone().ior(this)},E.prototype.uor=function(A){return this.length>A.length?this.clone().iuor(A):A.clone().iuor(this)},E.prototype.iuand=function(A){var B;B=this.length>A.length?A:this;for(var Q=0;Q<B.length;Q++)this.words[Q]=this.words[Q]&A.words[Q];return this.length=B.length,this.strip()},E.prototype.iand=function(A){return g(0==(this.negative|A.negative)),this.iuand(A)},E.prototype.and=function(A){return this.length>A.length?this.clone().iand(A):A.clone().iand(this)},E.prototype.uand=function(A){return this.length>A.length?this.clone().iuand(A):A.clone().iuand(this)},E.prototype.iuxor=function(A){var B,Q;this.length>A.length?(B=this,Q=A):(B=A,Q=this);for(var g=0;g<Q.length;g++)this.words[g]=B.words[g]^Q.words[g];if(this!==B)for(;g<B.length;g++)this.words[g]=B.words[g];return this.length=B.length,this.strip()},E.prototype.ixor=function(A){return g(0==(this.negative|A.negative)),this.iuxor(A)},E.prototype.xor=function(A){return this.length>A.length?this.clone().ixor(A):A.clone().ixor(this)},E.prototype.uxor=function(A){return this.length>A.length?this.clone().iuxor(A):A.clone().iuxor(this)},E.prototype.inotn=function(A){g("number"==typeof A&&A>=0);var B=0|Math.ceil(A/26),Q=A%26;this._expand(B),Q>0&&B--;for(var I=0;I<B;I++)this.words[I]=67108863&~this.words[I];return Q>0&&(this.words[I]=~this.words[I]&67108863>>26-Q),this.strip()},E.prototype.notn=function(A){return this.clone().inotn(A)},E.prototype.setn=function(A,B){g("number"==typeof A&&A>=0);var Q=A/26|0,I=A%26;return this._expand(Q+1),this.words[Q]=B?this.words[Q]|1<<I:this.words[Q]&~(1<<I),this.strip()},E.prototype.iadd=function(A){var B,Q,g;if(0!==this.negative&&0===A.negative)return this.negative=0,B=this.isub(A),this.negative^=1,this._normSign();if(0===this.negative&&0!==A.negative)return A.negative=0,B=this.isub(A),A.negative=1,B._normSign();this.length>A.length?(Q=this,g=A):(Q=A,g=this);for(var I=0,E=0;E<g.length;E++)B=(0|Q.words[E])+(0|g.words[E])+I,this.words[E]=67108863&B,I=B>>>26;for(;0!==I&&E<Q.length;E++)B=(0|Q.words[E])+I,this.words[E]=67108863&B,I=B>>>26;if(this.length=Q.length,0!==I)this.words[this.length]=I,this.length++;else if(Q!==this)for(;E<Q.length;E++)this.words[E]=Q.words[E];return this},E.prototype.add=function(A){var B;return 0!==A.negative&&0===this.negative?(A.negative=0,B=this.sub(A),A.negative^=1,B):0===A.negative&&0!==this.negative?(this.negative=0,B=A.sub(this),this.negative=1,B):this.length>A.length?this.clone().iadd(A):A.clone().iadd(this)},E.prototype.isub=function(A){if(0!==A.negative){A.negative=0;var B=this.iadd(A);return A.negative=1,B._normSign()}if(0!==this.negative)return this.negative=0,this.iadd(A),this.negative=1,this._normSign();var Q,g,I=this.cmp(A);if(0===I)return this.negative=0,this.length=1,this.words[0]=0,this;I>0?(Q=this,g=A):(Q=A,g=this);for(var E=0,i=0;i<g.length;i++)E=(B=(0|Q.words[i])-(0|g.words[i])+E)>>26,this.words[i]=67108863&B;for(;0!==E&&i<Q.length;i++)E=(B=(0|Q.words[i])+E)>>26,this.words[i]=67108863&B;if(0===E&&i<Q.length&&Q!==this)for(;i<Q.length;i++)this.words[i]=Q.words[i];return this.length=Math.max(this.length,i),Q!==this&&(this.negative=1),this.strip()},E.prototype.sub=function(A){return this.clone().isub(A)};var h=function(A,B,Q){var g,I,E,i=A.words,C=B.words,t=Q.words,e=0,o=0|i[0],s=8191&o,r=o>>>13,h=0|i[1],n=8191&h,a=h>>>13,c=0|i[2],y=8191&c,D=c>>>13,u=0|i[3],f=8191&u,w=u>>>13,F=0|i[4],d=8191&F,l=F>>>13,U=0|i[5],N=8191&U,H=U>>>13,G=0|i[6],Y=8191&G,L=G>>>13,R=0|i[7],p=8191&R,M=R>>>13,m=0|i[8],k=8191&m,S=m>>>13,b=0|i[9],v=8191&b,J=b>>>13,V=0|C[0],K=8191&V,x=V>>>13,Z=0|C[1],q=8191&Z,O=Z>>>13,j=0|C[2],W=8191&j,X=j>>>13,T=0|C[3],z=8191&T,_=T>>>13,P=0|C[4],$=8191&P,AA=P>>>13,BA=0|C[5],QA=8191&BA,gA=BA>>>13,IA=0|C[6],EA=8191&IA,iA=IA>>>13,CA=0|C[7],tA=8191&CA,eA=CA>>>13,oA=0|C[8],sA=8191&oA,rA=oA>>>13,hA=0|C[9],nA=8191&hA,aA=hA>>>13;Q.negative=A.negative^B.negative,Q.length=19;var cA=(e+(g=Math.imul(s,K))|0)+((8191&(I=(I=Math.imul(s,x))+Math.imul(r,K)|0))<<13)|0;e=((E=Math.imul(r,x))+(I>>>13)|0)+(cA>>>26)|0,cA&=67108863,g=Math.imul(n,K),I=(I=Math.imul(n,x))+Math.imul(a,K)|0,E=Math.imul(a,x);var yA=(e+(g=g+Math.imul(s,q)|0)|0)+((8191&(I=(I=I+Math.imul(s,O)|0)+Math.imul(r,q)|0))<<13)|0;e=((E=E+Math.imul(r,O)|0)+(I>>>13)|0)+(yA>>>26)|0,yA&=67108863,g=Math.imul(y,K),I=(I=Math.imul(y,x))+Math.imul(D,K)|0,E=Math.imul(D,x),g=g+Math.imul(n,q)|0,I=(I=I+Math.imul(n,O)|0)+Math.imul(a,q)|0,E=E+Math.imul(a,O)|0;var DA=(e+(g=g+Math.imul(s,W)|0)|0)+((8191&(I=(I=I+Math.imul(s,X)|0)+Math.imul(r,W)|0))<<13)|0;e=((E=E+Math.imul(r,X)|0)+(I>>>13)|0)+(DA>>>26)|0,DA&=67108863,g=Math.imul(f,K),I=(I=Math.imul(f,x))+Math.imul(w,K)|0,E=Math.imul(w,x),g=g+Math.imul(y,q)|0,I=(I=I+Math.imul(y,O)|0)+Math.imul(D,q)|0,E=E+Math.imul(D,O)|0,g=g+Math.imul(n,W)|0,I=(I=I+Math.imul(n,X)|0)+Math.imul(a,W)|0,E=E+Math.imul(a,X)|0;var uA=(e+(g=g+Math.imul(s,z)|0)|0)+((8191&(I=(I=I+Math.imul(s,_)|0)+Math.imul(r,z)|0))<<13)|0;e=((E=E+Math.imul(r,_)|0)+(I>>>13)|0)+(uA>>>26)|0,uA&=67108863,g=Math.imul(d,K),I=(I=Math.imul(d,x))+Math.imul(l,K)|0,E=Math.imul(l,x),g=g+Math.imul(f,q)|0,I=(I=I+Math.imul(f,O)|0)+Math.imul(w,q)|0,E=E+Math.imul(w,O)|0,g=g+Math.imul(y,W)|0,I=(I=I+Math.imul(y,X)|0)+Math.imul(D,W)|0,E=E+Math.imul(D,X)|0,g=g+Math.imul(n,z)|0,I=(I=I+Math.imul(n,_)|0)+Math.imul(a,z)|0,E=E+Math.imul(a,_)|0;var fA=(e+(g=g+Math.imul(s,$)|0)|0)+((8191&(I=(I=I+Math.imul(s,AA)|0)+Math.imul(r,$)|0))<<13)|0;e=((E=E+Math.imul(r,AA)|0)+(I>>>13)|0)+(fA>>>26)|0,fA&=67108863,g=Math.imul(N,K),I=(I=Math.imul(N,x))+Math.imul(H,K)|0,E=Math.imul(H,x),g=g+Math.imul(d,q)|0,I=(I=I+Math.imul(d,O)|0)+Math.imul(l,q)|0,E=E+Math.imul(l,O)|0,g=g+Math.imul(f,W)|0,I=(I=I+Math.imul(f,X)|0)+Math.imul(w,W)|0,E=E+Math.imul(w,X)|0,g=g+Math.imul(y,z)|0,I=(I=I+Math.imul(y,_)|0)+Math.imul(D,z)|0,E=E+Math.imul(D,_)|0,g=g+Math.imul(n,$)|0,I=(I=I+Math.imul(n,AA)|0)+Math.imul(a,$)|0,E=E+Math.imul(a,AA)|0;var wA=(e+(g=g+Math.imul(s,QA)|0)|0)+((8191&(I=(I=I+Math.imul(s,gA)|0)+Math.imul(r,QA)|0))<<13)|0;e=((E=E+Math.imul(r,gA)|0)+(I>>>13)|0)+(wA>>>26)|0,wA&=67108863,g=Math.imul(Y,K),I=(I=Math.imul(Y,x))+Math.imul(L,K)|0,E=Math.imul(L,x),g=g+Math.imul(N,q)|0,I=(I=I+Math.imul(N,O)|0)+Math.imul(H,q)|0,E=E+Math.imul(H,O)|0,g=g+Math.imul(d,W)|0,I=(I=I+Math.imul(d,X)|0)+Math.imul(l,W)|0,E=E+Math.imul(l,X)|0,g=g+Math.imul(f,z)|0,I=(I=I+Math.imul(f,_)|0)+Math.imul(w,z)|0,E=E+Math.imul(w,_)|0,g=g+Math.imul(y,$)|0,I=(I=I+Math.imul(y,AA)|0)+Math.imul(D,$)|0,E=E+Math.imul(D,AA)|0,g=g+Math.imul(n,QA)|0,I=(I=I+Math.imul(n,gA)|0)+Math.imul(a,QA)|0,E=E+Math.imul(a,gA)|0;var FA=(e+(g=g+Math.imul(s,EA)|0)|0)+((8191&(I=(I=I+Math.imul(s,iA)|0)+Math.imul(r,EA)|0))<<13)|0;e=((E=E+Math.imul(r,iA)|0)+(I>>>13)|0)+(FA>>>26)|0,FA&=67108863,g=Math.imul(p,K),I=(I=Math.imul(p,x))+Math.imul(M,K)|0,E=Math.imul(M,x),g=g+Math.imul(Y,q)|0,I=(I=I+Math.imul(Y,O)|0)+Math.imul(L,q)|0,E=E+Math.imul(L,O)|0,g=g+Math.imul(N,W)|0,I=(I=I+Math.imul(N,X)|0)+Math.imul(H,W)|0,E=E+Math.imul(H,X)|0,g=g+Math.imul(d,z)|0,I=(I=I+Math.imul(d,_)|0)+Math.imul(l,z)|0,E=E+Math.imul(l,_)|0,g=g+Math.imul(f,$)|0,I=(I=I+Math.imul(f,AA)|0)+Math.imul(w,$)|0,E=E+Math.imul(w,AA)|0,g=g+Math.imul(y,QA)|0,I=(I=I+Math.imul(y,gA)|0)+Math.imul(D,QA)|0,E=E+Math.imul(D,gA)|0,g=g+Math.imul(n,EA)|0,I=(I=I+Math.imul(n,iA)|0)+Math.imul(a,EA)|0,E=E+Math.imul(a,iA)|0;var dA=(e+(g=g+Math.imul(s,tA)|0)|0)+((8191&(I=(I=I+Math.imul(s,eA)|0)+Math.imul(r,tA)|0))<<13)|0;e=((E=E+Math.imul(r,eA)|0)+(I>>>13)|0)+(dA>>>26)|0,dA&=67108863,g=Math.imul(k,K),I=(I=Math.imul(k,x))+Math.imul(S,K)|0,E=Math.imul(S,x),g=g+Math.imul(p,q)|0,I=(I=I+Math.imul(p,O)|0)+Math.imul(M,q)|0,E=E+Math.imul(M,O)|0,g=g+Math.imul(Y,W)|0,I=(I=I+Math.imul(Y,X)|0)+Math.imul(L,W)|0,E=E+Math.imul(L,X)|0,g=g+Math.imul(N,z)|0,I=(I=I+Math.imul(N,_)|0)+Math.imul(H,z)|0,E=E+Math.imul(H,_)|0,g=g+Math.imul(d,$)|0,I=(I=I+Math.imul(d,AA)|0)+Math.imul(l,$)|0,E=E+Math.imul(l,AA)|0,g=g+Math.imul(f,QA)|0,I=(I=I+Math.imul(f,gA)|0)+Math.imul(w,QA)|0,E=E+Math.imul(w,gA)|0,g=g+Math.imul(y,EA)|0,I=(I=I+Math.imul(y,iA)|0)+Math.imul(D,EA)|0,E=E+Math.imul(D,iA)|0,g=g+Math.imul(n,tA)|0,I=(I=I+Math.imul(n,eA)|0)+Math.imul(a,tA)|0,E=E+Math.imul(a,eA)|0;var lA=(e+(g=g+Math.imul(s,sA)|0)|0)+((8191&(I=(I=I+Math.imul(s,rA)|0)+Math.imul(r,sA)|0))<<13)|0;e=((E=E+Math.imul(r,rA)|0)+(I>>>13)|0)+(lA>>>26)|0,lA&=67108863,g=Math.imul(v,K),I=(I=Math.imul(v,x))+Math.imul(J,K)|0,E=Math.imul(J,x),g=g+Math.imul(k,q)|0,I=(I=I+Math.imul(k,O)|0)+Math.imul(S,q)|0,E=E+Math.imul(S,O)|0,g=g+Math.imul(p,W)|0,I=(I=I+Math.imul(p,X)|0)+Math.imul(M,W)|0,E=E+Math.imul(M,X)|0,g=g+Math.imul(Y,z)|0,I=(I=I+Math.imul(Y,_)|0)+Math.imul(L,z)|0,E=E+Math.imul(L,_)|0,g=g+Math.imul(N,$)|0,I=(I=I+Math.imul(N,AA)|0)+Math.imul(H,$)|0,E=E+Math.imul(H,AA)|0,g=g+Math.imul(d,QA)|0,I=(I=I+Math.imul(d,gA)|0)+Math.imul(l,QA)|0,E=E+Math.imul(l,gA)|0,g=g+Math.imul(f,EA)|0,I=(I=I+Math.imul(f,iA)|0)+Math.imul(w,EA)|0,E=E+Math.imul(w,iA)|0,g=g+Math.imul(y,tA)|0,I=(I=I+Math.imul(y,eA)|0)+Math.imul(D,tA)|0,E=E+Math.imul(D,eA)|0,g=g+Math.imul(n,sA)|0,I=(I=I+Math.imul(n,rA)|0)+Math.imul(a,sA)|0,E=E+Math.imul(a,rA)|0;var UA=(e+(g=g+Math.imul(s,nA)|0)|0)+((8191&(I=(I=I+Math.imul(s,aA)|0)+Math.imul(r,nA)|0))<<13)|0;e=((E=E+Math.imul(r,aA)|0)+(I>>>13)|0)+(UA>>>26)|0,UA&=67108863,g=Math.imul(v,q),I=(I=Math.imul(v,O))+Math.imul(J,q)|0,E=Math.imul(J,O),g=g+Math.imul(k,W)|0,I=(I=I+Math.imul(k,X)|0)+Math.imul(S,W)|0,E=E+Math.imul(S,X)|0,g=g+Math.imul(p,z)|0,I=(I=I+Math.imul(p,_)|0)+Math.imul(M,z)|0,E=E+Math.imul(M,_)|0,g=g+Math.imul(Y,$)|0,I=(I=I+Math.imul(Y,AA)|0)+Math.imul(L,$)|0,E=E+Math.imul(L,AA)|0,g=g+Math.imul(N,QA)|0,I=(I=I+Math.imul(N,gA)|0)+Math.imul(H,QA)|0,E=E+Math.imul(H,gA)|0,g=g+Math.imul(d,EA)|0,I=(I=I+Math.imul(d,iA)|0)+Math.imul(l,EA)|0,E=E+Math.imul(l,iA)|0,g=g+Math.imul(f,tA)|0,I=(I=I+Math.imul(f,eA)|0)+Math.imul(w,tA)|0,E=E+Math.imul(w,eA)|0,g=g+Math.imul(y,sA)|0,I=(I=I+Math.imul(y,rA)|0)+Math.imul(D,sA)|0,E=E+Math.imul(D,rA)|0;var NA=(e+(g=g+Math.imul(n,nA)|0)|0)+((8191&(I=(I=I+Math.imul(n,aA)|0)+Math.imul(a,nA)|0))<<13)|0;e=((E=E+Math.imul(a,aA)|0)+(I>>>13)|0)+(NA>>>26)|0,NA&=67108863,g=Math.imul(v,W),I=(I=Math.imul(v,X))+Math.imul(J,W)|0,E=Math.imul(J,X),g=g+Math.imul(k,z)|0,I=(I=I+Math.imul(k,_)|0)+Math.imul(S,z)|0,E=E+Math.imul(S,_)|0,g=g+Math.imul(p,$)|0,I=(I=I+Math.imul(p,AA)|0)+Math.imul(M,$)|0,E=E+Math.imul(M,AA)|0,g=g+Math.imul(Y,QA)|0,I=(I=I+Math.imul(Y,gA)|0)+Math.imul(L,QA)|0,E=E+Math.imul(L,gA)|0,g=g+Math.imul(N,EA)|0,I=(I=I+Math.imul(N,iA)|0)+Math.imul(H,EA)|0,E=E+Math.imul(H,iA)|0,g=g+Math.imul(d,tA)|0,I=(I=I+Math.imul(d,eA)|0)+Math.imul(l,tA)|0,E=E+Math.imul(l,eA)|0,g=g+Math.imul(f,sA)|0,I=(I=I+Math.imul(f,rA)|0)+Math.imul(w,sA)|0,E=E+Math.imul(w,rA)|0;var HA=(e+(g=g+Math.imul(y,nA)|0)|0)+((8191&(I=(I=I+Math.imul(y,aA)|0)+Math.imul(D,nA)|0))<<13)|0;e=((E=E+Math.imul(D,aA)|0)+(I>>>13)|0)+(HA>>>26)|0,HA&=67108863,g=Math.imul(v,z),I=(I=Math.imul(v,_))+Math.imul(J,z)|0,E=Math.imul(J,_),g=g+Math.imul(k,$)|0,I=(I=I+Math.imul(k,AA)|0)+Math.imul(S,$)|0,E=E+Math.imul(S,AA)|0,g=g+Math.imul(p,QA)|0,I=(I=I+Math.imul(p,gA)|0)+Math.imul(M,QA)|0,E=E+Math.imul(M,gA)|0,g=g+Math.imul(Y,EA)|0,I=(I=I+Math.imul(Y,iA)|0)+Math.imul(L,EA)|0,E=E+Math.imul(L,iA)|0,g=g+Math.imul(N,tA)|0,I=(I=I+Math.imul(N,eA)|0)+Math.imul(H,tA)|0,E=E+Math.imul(H,eA)|0,g=g+Math.imul(d,sA)|0,I=(I=I+Math.imul(d,rA)|0)+Math.imul(l,sA)|0,E=E+Math.imul(l,rA)|0;var GA=(e+(g=g+Math.imul(f,nA)|0)|0)+((8191&(I=(I=I+Math.imul(f,aA)|0)+Math.imul(w,nA)|0))<<13)|0;e=((E=E+Math.imul(w,aA)|0)+(I>>>13)|0)+(GA>>>26)|0,GA&=67108863,g=Math.imul(v,$),I=(I=Math.imul(v,AA))+Math.imul(J,$)|0,E=Math.imul(J,AA),g=g+Math.imul(k,QA)|0,I=(I=I+Math.imul(k,gA)|0)+Math.imul(S,QA)|0,E=E+Math.imul(S,gA)|0,g=g+Math.imul(p,EA)|0,I=(I=I+Math.imul(p,iA)|0)+Math.imul(M,EA)|0,E=E+Math.imul(M,iA)|0,g=g+Math.imul(Y,tA)|0,I=(I=I+Math.imul(Y,eA)|0)+Math.imul(L,tA)|0,E=E+Math.imul(L,eA)|0,g=g+Math.imul(N,sA)|0,I=(I=I+Math.imul(N,rA)|0)+Math.imul(H,sA)|0,E=E+Math.imul(H,rA)|0;var YA=(e+(g=g+Math.imul(d,nA)|0)|0)+((8191&(I=(I=I+Math.imul(d,aA)|0)+Math.imul(l,nA)|0))<<13)|0;e=((E=E+Math.imul(l,aA)|0)+(I>>>13)|0)+(YA>>>26)|0,YA&=67108863,g=Math.imul(v,QA),I=(I=Math.imul(v,gA))+Math.imul(J,QA)|0,E=Math.imul(J,gA),g=g+Math.imul(k,EA)|0,I=(I=I+Math.imul(k,iA)|0)+Math.imul(S,EA)|0,E=E+Math.imul(S,iA)|0,g=g+Math.imul(p,tA)|0,I=(I=I+Math.imul(p,eA)|0)+Math.imul(M,tA)|0,E=E+Math.imul(M,eA)|0,g=g+Math.imul(Y,sA)|0,I=(I=I+Math.imul(Y,rA)|0)+Math.imul(L,sA)|0,E=E+Math.imul(L,rA)|0;var LA=(e+(g=g+Math.imul(N,nA)|0)|0)+((8191&(I=(I=I+Math.imul(N,aA)|0)+Math.imul(H,nA)|0))<<13)|0;e=((E=E+Math.imul(H,aA)|0)+(I>>>13)|0)+(LA>>>26)|0,LA&=67108863,g=Math.imul(v,EA),I=(I=Math.imul(v,iA))+Math.imul(J,EA)|0,E=Math.imul(J,iA),g=g+Math.imul(k,tA)|0,I=(I=I+Math.imul(k,eA)|0)+Math.imul(S,tA)|0,E=E+Math.imul(S,eA)|0,g=g+Math.imul(p,sA)|0,I=(I=I+Math.imul(p,rA)|0)+Math.imul(M,sA)|0,E=E+Math.imul(M,rA)|0;var RA=(e+(g=g+Math.imul(Y,nA)|0)|0)+((8191&(I=(I=I+Math.imul(Y,aA)|0)+Math.imul(L,nA)|0))<<13)|0;e=((E=E+Math.imul(L,aA)|0)+(I>>>13)|0)+(RA>>>26)|0,RA&=67108863,g=Math.imul(v,tA),I=(I=Math.imul(v,eA))+Math.imul(J,tA)|0,E=Math.imul(J,eA),g=g+Math.imul(k,sA)|0,I=(I=I+Math.imul(k,rA)|0)+Math.imul(S,sA)|0,E=E+Math.imul(S,rA)|0;var pA=(e+(g=g+Math.imul(p,nA)|0)|0)+((8191&(I=(I=I+Math.imul(p,aA)|0)+Math.imul(M,nA)|0))<<13)|0;e=((E=E+Math.imul(M,aA)|0)+(I>>>13)|0)+(pA>>>26)|0,pA&=67108863,g=Math.imul(v,sA),I=(I=Math.imul(v,rA))+Math.imul(J,sA)|0,E=Math.imul(J,rA);var MA=(e+(g=g+Math.imul(k,nA)|0)|0)+((8191&(I=(I=I+Math.imul(k,aA)|0)+Math.imul(S,nA)|0))<<13)|0;e=((E=E+Math.imul(S,aA)|0)+(I>>>13)|0)+(MA>>>26)|0,MA&=67108863;var mA=(e+(g=Math.imul(v,nA))|0)+((8191&(I=(I=Math.imul(v,aA))+Math.imul(J,nA)|0))<<13)|0;return e=((E=Math.imul(J,aA))+(I>>>13)|0)+(mA>>>26)|0,mA&=67108863,t[0]=cA,t[1]=yA,t[2]=DA,t[3]=uA,t[4]=fA,t[5]=wA,t[6]=FA,t[7]=dA,t[8]=lA,t[9]=UA,t[10]=NA,t[11]=HA,t[12]=GA,t[13]=YA,t[14]=LA,t[15]=RA,t[16]=pA,t[17]=MA,t[18]=mA,0!==e&&(t[19]=e,Q.length++),Q};function n(A,B,Q){return(new a).mulp(A,B,Q)}function a(A,B){this.x=A,this.y=B}Math.imul||(h=r),E.prototype.mulTo=function(A,B){var Q=this.length+A.length;return 10===this.length&&10===A.length?h(this,A,B):Q<63?r(this,A,B):Q<1024?function(A,B,Q){Q.negative=B.negative^A.negative,Q.length=A.length+B.length;for(var g=0,I=0,E=0;E<Q.length-1;E++){var i=I;I=0;for(var C=67108863&g,t=Math.min(E,B.length-1),e=Math.max(0,E-A.length+1);e<=t;e++){var o=E-e,s=(0|A.words[o])*(0|B.words[e]),r=67108863&s;C=67108863&(r=r+C|0),I+=(i=(i=i+(s/67108864|0)|0)+(r>>>26)|0)>>>26,i&=67108863}Q.words[E]=C,g=i,i=I}return 0!==g?Q.words[E]=g:Q.length--,Q.strip()}(this,A,B):n(this,A,B)},a.prototype.makeRBT=function(A){for(var B=new Array(A),Q=E.prototype._countBits(A)-1,g=0;g<A;g++)B[g]=this.revBin(g,Q,A);return B},a.prototype.revBin=function(A,B,Q){if(0===A||A===Q-1)return A;for(var g=0,I=0;I<B;I++)g|=(1&A)<<B-I-1,A>>=1;return g},a.prototype.permute=function(A,B,Q,g,I,E){for(var i=0;i<E;i++)g[i]=B[A[i]],I[i]=Q[A[i]]},a.prototype.transform=function(A,B,Q,g,I,E){this.permute(E,A,B,Q,g,I);for(var i=1;i<I;i<<=1)for(var C=i<<1,t=Math.cos(2*Math.PI/C),e=Math.sin(2*Math.PI/C),o=0;o<I;o+=C)for(var s=t,r=e,h=0;h<i;h++){var n=Q[o+h],a=g[o+h],c=Q[o+h+i],y=g[o+h+i],D=s*c-r*y;y=s*y+r*c,c=D,Q[o+h]=n+c,g[o+h]=a+y,Q[o+h+i]=n-c,g[o+h+i]=a-y,h!==C&&(D=t*s-e*r,r=t*r+e*s,s=D)}},a.prototype.guessLen13b=function(A,B){var Q=1|Math.max(B,A),g=1&Q,I=0;for(Q=Q/2|0;Q;Q>>>=1)I++;return 1<<I+1+g},a.prototype.conjugate=function(A,B,Q){if(!(Q<=1))for(var g=0;g<Q/2;g++){var I=A[g];A[g]=A[Q-g-1],A[Q-g-1]=I,I=B[g],B[g]=-B[Q-g-1],B[Q-g-1]=-I}},a.prototype.normalize13b=function(A,B){for(var Q=0,g=0;g<B/2;g++){var I=8192*Math.round(A[2*g+1]/B)+Math.round(A[2*g]/B)+Q;A[g]=67108863&I,Q=I<67108864?0:I/67108864|0}return A},a.prototype.convert13b=function(A,B,Q,I){for(var E=0,i=0;i<B;i++)E+=0|A[i],Q[2*i]=8191&E,E>>>=13,Q[2*i+1]=8191&E,E>>>=13;for(i=2*B;i<I;++i)Q[i]=0;g(0===E),g(0==(-8192&E))},a.prototype.stub=function(A){for(var B=new Array(A),Q=0;Q<A;Q++)B[Q]=0;return B},a.prototype.mulp=function(A,B,Q){var g=2*this.guessLen13b(A.length,B.length),I=this.makeRBT(g),E=this.stub(g),i=new Array(g),C=new Array(g),t=new Array(g),e=new Array(g),o=new Array(g),s=new Array(g),r=Q.words;r.length=g,this.convert13b(A.words,A.length,i,g),this.convert13b(B.words,B.length,e,g),this.transform(i,E,C,t,g,I),this.transform(e,E,o,s,g,I);for(var h=0;h<g;h++){var n=C[h]*o[h]-t[h]*s[h];t[h]=C[h]*s[h]+t[h]*o[h],C[h]=n}return this.conjugate(C,t,g),this.transform(C,t,r,E,g,I),this.conjugate(r,E,g),this.normalize13b(r,g),Q.negative=A.negative^B.negative,Q.length=A.length+B.length,Q.strip()},E.prototype.mul=function(A){var B=new E(null);return B.words=new Array(this.length+A.length),this.mulTo(A,B)},E.prototype.mulf=function(A){var B=new E(null);return B.words=new Array(this.length+A.length),n(this,A,B)},E.prototype.imul=function(A){return this.clone().mulTo(A,this)},E.prototype.imuln=function(A){g("number"==typeof A),g(A<67108864);for(var B=0,Q=0;Q<this.length;Q++){var I=(0|this.words[Q])*A,E=(67108863&I)+(67108863&B);B>>=26,B+=I/67108864|0,B+=E>>>26,this.words[Q]=67108863&E}return 0!==B&&(this.words[Q]=B,this.length++),this},E.prototype.muln=function(A){return this.clone().imuln(A)},E.prototype.sqr=function(){return this.mul(this)},E.prototype.isqr=function(){return this.imul(this.clone())},E.prototype.pow=function(A){var B=function(A){for(var B=new Array(A.bitLength()),Q=0;Q<B.length;Q++){var g=Q/26|0,I=Q%26;B[Q]=(A.words[g]&1<<I)>>>I}return B}(A);if(0===B.length)return new E(1);for(var Q=this,g=0;g<B.length&&0===B[g];g++,Q=Q.sqr());if(++g<B.length)for(var I=Q.sqr();g<B.length;g++,I=I.sqr())0!==B[g]&&(Q=Q.mul(I));return Q},E.prototype.iushln=function(A){g("number"==typeof A&&A>=0);var B,Q=A%26,I=(A-Q)/26,E=67108863>>>26-Q<<26-Q;if(0!==Q){var i=0;for(B=0;B<this.length;B++){var C=this.words[B]&E,t=(0|this.words[B])-C<<Q;this.words[B]=t|i,i=C>>>26-Q}i&&(this.words[B]=i,this.length++)}if(0!==I){for(B=this.length-1;B>=0;B--)this.words[B+I]=this.words[B];for(B=0;B<I;B++)this.words[B]=0;this.length+=I}return this.strip()},E.prototype.ishln=function(A){return g(0===this.negative),this.iushln(A)},E.prototype.iushrn=function(A,B,Q){var I;g("number"==typeof A&&A>=0),I=B?(B-B%26)/26:0;var E=A%26,i=Math.min((A-E)/26,this.length),C=67108863^67108863>>>E<<E,t=Q;if(I-=i,I=Math.max(0,I),t){for(var e=0;e<i;e++)t.words[e]=this.words[e];t.length=i}if(0===i);else if(this.length>i)for(this.length-=i,e=0;e<this.length;e++)this.words[e]=this.words[e+i];else this.words[0]=0,this.length=1;var o=0;for(e=this.length-1;e>=0&&(0!==o||e>=I);e--){var s=0|this.words[e];this.words[e]=o<<26-E|s>>>E,o=s&C}return t&&0!==o&&(t.words[t.length++]=o),0===this.length&&(this.words[0]=0,this.length=1),this.strip()},E.prototype.ishrn=function(A,B,Q){return g(0===this.negative),this.iushrn(A,B,Q)},E.prototype.shln=function(A){return this.clone().ishln(A)},E.prototype.ushln=function(A){return this.clone().iushln(A)},E.prototype.shrn=function(A){return this.clone().ishrn(A)},E.prototype.ushrn=function(A){return this.clone().iushrn(A)},E.prototype.testn=function(A){g("number"==typeof A&&A>=0);var B=A%26,Q=(A-B)/26,I=1<<B;return!(this.length<=Q)&&!!(this.words[Q]&I)},E.prototype.imaskn=function(A){g("number"==typeof A&&A>=0);var B=A%26,Q=(A-B)/26;if(g(0===this.negative,"imaskn works only with positive numbers"),this.length<=Q)return this;if(0!==B&&Q++,this.length=Math.min(Q,this.length),0!==B){var I=67108863^67108863>>>B<<B;this.words[this.length-1]&=I}return this.strip()},E.prototype.maskn=function(A){return this.clone().imaskn(A)},E.prototype.iaddn=function(A){return g("number"==typeof A),g(A<67108864),A<0?this.isubn(-A):0!==this.negative?1===this.length&&(0|this.words[0])<A?(this.words[0]=A-(0|this.words[0]),this.negative=0,this):(this.negative=0,this.isubn(A),this.negative=1,this):this._iaddn(A)},E.prototype._iaddn=function(A){this.words[0]+=A;for(var B=0;B<this.length&&this.words[B]>=67108864;B++)this.words[B]-=67108864,B===this.length-1?this.words[B+1]=1:this.words[B+1]++;return this.length=Math.max(this.length,B+1),this},E.prototype.isubn=function(A){if(g("number"==typeof A),g(A<67108864),A<0)return this.iaddn(-A);if(0!==this.negative)return this.negative=0,this.iaddn(A),this.negative=1,this;if(this.words[0]-=A,1===this.length&&this.words[0]<0)this.words[0]=-this.words[0],this.negative=1;else for(var B=0;B<this.length&&this.words[B]<0;B++)this.words[B]+=67108864,this.words[B+1]-=1;return this.strip()},E.prototype.addn=function(A){return this.clone().iaddn(A)},E.prototype.subn=function(A){return this.clone().isubn(A)},E.prototype.iabs=function(){return this.negative=0,this},E.prototype.abs=function(){return this.clone().iabs()},E.prototype._ishlnsubmul=function(A,B,Q){var I,E,i=A.length+Q;this._expand(i);var C=0;for(I=0;I<A.length;I++){E=(0|this.words[I+Q])+C;var t=(0|A.words[I])*B;C=((E-=67108863&t)>>26)-(t/67108864|0),this.words[I+Q]=67108863&E}for(;I<this.length-Q;I++)C=(E=(0|this.words[I+Q])+C)>>26,this.words[I+Q]=67108863&E;if(0===C)return this.strip();for(g(-1===C),C=0,I=0;I<this.length;I++)C=(E=-(0|this.words[I])+C)>>26,this.words[I]=67108863&E;return this.negative=1,this.strip()},E.prototype._wordDiv=function(A,B){var Q=(this.length,A.length),g=this.clone(),I=A,i=0|I.words[I.length-1];0!==(Q=26-this._countBits(i))&&(I=I.ushln(Q),g.iushln(Q),i=0|I.words[I.length-1]);var C,t=g.length-I.length;if("mod"!==B){(C=new E(null)).length=t+1,C.words=new Array(C.length);for(var e=0;e<C.length;e++)C.words[e]=0}var o=g.clone()._ishlnsubmul(I,1,t);0===o.negative&&(g=o,C&&(C.words[t]=1));for(var s=t-1;s>=0;s--){var r=67108864*(0|g.words[I.length+s])+(0|g.words[I.length+s-1]);for(r=Math.min(r/i|0,67108863),g._ishlnsubmul(I,r,s);0!==g.negative;)r--,g.negative=0,g._ishlnsubmul(I,1,s),g.isZero()||(g.negative^=1);C&&(C.words[s]=r)}return C&&C.strip(),g.strip(),"div"!==B&&0!==Q&&g.iushrn(Q),{div:C||null,mod:g}},E.prototype.divmod=function(A,B,Q){return g(!A.isZero()),this.isZero()?{div:new E(0),mod:new E(0)}:0!==this.negative&&0===A.negative?(C=this.neg().divmod(A,B),"mod"!==B&&(I=C.div.neg()),"div"!==B&&(i=C.mod.neg(),Q&&0!==i.negative&&i.iadd(A)),{div:I,mod:i}):0===this.negative&&0!==A.negative?(C=this.divmod(A.neg(),B),"mod"!==B&&(I=C.div.neg()),{div:I,mod:C.mod}):0!=(this.negative&A.negative)?(C=this.neg().divmod(A.neg(),B),"div"!==B&&(i=C.mod.neg(),Q&&0!==i.negative&&i.isub(A)),{div:C.div,mod:i}):A.length>this.length||this.cmp(A)<0?{div:new E(0),mod:this}:1===A.length?"div"===B?{div:this.divn(A.words[0]),mod:null}:"mod"===B?{div:null,mod:new E(this.modn(A.words[0]))}:{div:this.divn(A.words[0]),mod:new E(this.modn(A.words[0]))}:this._wordDiv(A,B);var I,i,C},E.prototype.div=function(A){return this.divmod(A,"div",!1).div},E.prototype.mod=function(A){return this.divmod(A,"mod",!1).mod},E.prototype.umod=function(A){return this.divmod(A,"mod",!0).mod},E.prototype.divRound=function(A){var B=this.divmod(A);if(B.mod.isZero())return B.div;var Q=0!==B.div.negative?B.mod.isub(A):B.mod,g=A.ushrn(1),I=A.andln(1),E=Q.cmp(g);return E<0||1===I&&0===E?B.div:0!==B.div.negative?B.div.isubn(1):B.div.iaddn(1)},E.prototype.modn=function(A){g(A<=67108863);for(var B=(1<<26)%A,Q=0,I=this.length-1;I>=0;I--)Q=(B*Q+(0|this.words[I]))%A;return Q},E.prototype.idivn=function(A){g(A<=67108863);for(var B=0,Q=this.length-1;Q>=0;Q--){var I=(0|this.words[Q])+67108864*B;this.words[Q]=I/A|0,B=I%A}return this.strip()},E.prototype.divn=function(A){return this.clone().idivn(A)},E.prototype.egcd=function(A){g(0===A.negative),g(!A.isZero());var B=this,Q=A.clone();B=0!==B.negative?B.umod(A):B.clone();for(var I=new E(1),i=new E(0),C=new E(0),t=new E(1),e=0;B.isEven()&&Q.isEven();)B.iushrn(1),Q.iushrn(1),++e;for(var o=Q.clone(),s=B.clone();!B.isZero();){for(var r=0,h=1;0==(B.words[0]&h)&&r<26;++r,h<<=1);if(r>0)for(B.iushrn(r);r-- >0;)(I.isOdd()||i.isOdd())&&(I.iadd(o),i.isub(s)),I.iushrn(1),i.iushrn(1);for(var n=0,a=1;0==(Q.words[0]&a)&&n<26;++n,a<<=1);if(n>0)for(Q.iushrn(n);n-- >0;)(C.isOdd()||t.isOdd())&&(C.iadd(o),t.isub(s)),C.iushrn(1),t.iushrn(1);B.cmp(Q)>=0?(B.isub(Q),I.isub(C),i.isub(t)):(Q.isub(B),C.isub(I),t.isub(i))}return{a:C,b:t,gcd:Q.iushln(e)}},E.prototype._invmp=function(A){g(0===A.negative),g(!A.isZero());var B=this,Q=A.clone();B=0!==B.negative?B.umod(A):B.clone();for(var I,i=new E(1),C=new E(0),t=Q.clone();B.cmpn(1)>0&&Q.cmpn(1)>0;){for(var e=0,o=1;0==(B.words[0]&o)&&e<26;++e,o<<=1);if(e>0)for(B.iushrn(e);e-- >0;)i.isOdd()&&i.iadd(t),i.iushrn(1);for(var s=0,r=1;0==(Q.words[0]&r)&&s<26;++s,r<<=1);if(s>0)for(Q.iushrn(s);s-- >0;)C.isOdd()&&C.iadd(t),C.iushrn(1);B.cmp(Q)>=0?(B.isub(Q),i.isub(C)):(Q.isub(B),C.isub(i))}return(I=0===B.cmpn(1)?i:C).cmpn(0)<0&&I.iadd(A),I},E.prototype.gcd=function(A){if(this.isZero())return A.abs();if(A.isZero())return this.abs();var B=this.clone(),Q=A.clone();B.negative=0,Q.negative=0;for(var g=0;B.isEven()&&Q.isEven();g++)B.iushrn(1),Q.iushrn(1);for(;;){for(;B.isEven();)B.iushrn(1);for(;Q.isEven();)Q.iushrn(1);var I=B.cmp(Q);if(I<0){var E=B;B=Q,Q=E}else if(0===I||0===Q.cmpn(1))break;B.isub(Q)}return Q.iushln(g)},E.prototype.invm=function(A){return this.egcd(A).a.umod(A)},E.prototype.isEven=function(){return 0==(1&this.words[0])},E.prototype.isOdd=function(){return 1==(1&this.words[0])},E.prototype.andln=function(A){return this.words[0]&A},E.prototype.bincn=function(A){g("number"==typeof A);var B=A%26,Q=(A-B)/26,I=1<<B;if(this.length<=Q)return this._expand(Q+1),this.words[Q]|=I,this;for(var E=I,i=Q;0!==E&&i<this.length;i++){var C=0|this.words[i];E=(C+=E)>>>26,C&=67108863,this.words[i]=C}return 0!==E&&(this.words[i]=E,this.length++),this},E.prototype.isZero=function(){return 1===this.length&&0===this.words[0]},E.prototype.cmpn=function(A){var B,Q=A<0;if(0!==this.negative&&!Q)return-1;if(0===this.negative&&Q)return 1;if(this.strip(),this.length>1)B=1;else{Q&&(A=-A),g(A<=67108863,"Number is too big");var I=0|this.words[0];B=I===A?0:I<A?-1:1}return 0!==this.negative?0|-B:B},E.prototype.cmp=function(A){if(0!==this.negative&&0===A.negative)return-1;if(0===this.negative&&0!==A.negative)return 1;var B=this.ucmp(A);return 0!==this.negative?0|-B:B},E.prototype.ucmp=function(A){if(this.length>A.length)return 1;if(this.length<A.length)return-1;for(var B=0,Q=this.length-1;Q>=0;Q--){var g=0|this.words[Q],I=0|A.words[Q];if(g!==I){g<I?B=-1:g>I&&(B=1);break}}return B},E.prototype.gtn=function(A){return 1===this.cmpn(A)},E.prototype.gt=function(A){return 1===this.cmp(A)},E.prototype.gten=function(A){return this.cmpn(A)>=0},E.prototype.gte=function(A){return this.cmp(A)>=0},E.prototype.ltn=function(A){return-1===this.cmpn(A)},E.prototype.lt=function(A){return-1===this.cmp(A)},E.prototype.lten=function(A){return this.cmpn(A)<=0},E.prototype.lte=function(A){return this.cmp(A)<=0},E.prototype.eqn=function(A){return 0===this.cmpn(A)},E.prototype.eq=function(A){return 0===this.cmp(A)},E.red=function(A){return new F(A)},E.prototype.toRed=function(A){return g(!this.red,"Already a number in reduction context"),g(0===this.negative,"red works only with positives"),A.convertTo(this)._forceRed(A)},E.prototype.fromRed=function(){return g(this.red,"fromRed works only with numbers in reduction context"),this.red.convertFrom(this)},E.prototype._forceRed=function(A){return this.red=A,this},E.prototype.forceRed=function(A){return g(!this.red,"Already a number in reduction context"),this._forceRed(A)},E.prototype.redAdd=function(A){return g(this.red,"redAdd works only with red numbers"),this.red.add(this,A)},E.prototype.redIAdd=function(A){return g(this.red,"redIAdd works only with red numbers"),this.red.iadd(this,A)},E.prototype.redSub=function(A){return g(this.red,"redSub works only with red numbers"),this.red.sub(this,A)},E.prototype.redISub=function(A){return g(this.red,"redISub works only with red numbers"),this.red.isub(this,A)},E.prototype.redShl=function(A){return g(this.red,"redShl works only with red numbers"),this.red.shl(this,A)},E.prototype.redMul=function(A){return g(this.red,"redMul works only with red numbers"),this.red._verify2(this,A),this.red.mul(this,A)},E.prototype.redIMul=function(A){return g(this.red,"redMul works only with red numbers"),this.red._verify2(this,A),this.red.imul(this,A)},E.prototype.redSqr=function(){return g(this.red,"redSqr works only with red numbers"),this.red._verify1(this),this.red.sqr(this)},E.prototype.redISqr=function(){return g(this.red,"redISqr works only with red numbers"),this.red._verify1(this),this.red.isqr(this)},E.prototype.redSqrt=function(){return g(this.red,"redSqrt works only with red numbers"),this.red._verify1(this),this.red.sqrt(this)},E.prototype.redInvm=function(){return g(this.red,"redInvm works only with red numbers"),this.red._verify1(this),this.red.invm(this)},E.prototype.redNeg=function(){return g(this.red,"redNeg works only with red numbers"),this.red._verify1(this),this.red.neg(this)},E.prototype.redPow=function(A){return g(this.red&&!A.red,"redPow(normalNum)"),this.red._verify1(this),this.red.pow(this,A)};var c={k256:null,p224:null,p192:null,p25519:null};function y(A,B){this.name=A,this.p=new E(B,16),this.n=this.p.bitLength(),this.k=new E(1).iushln(this.n).isub(this.p),this.tmp=this._tmp()}function D(){y.call(this,"k256","ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f")}function u(){y.call(this,"p224","ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001")}function f(){y.call(this,"p192","ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff")}function w(){y.call(this,"25519","7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed")}function F(A){if("string"==typeof A){var B=E._prime(A);this.m=B.p,this.prime=B}else g(A.gtn(1),"modulus must be greater than 1"),this.m=A,this.prime=null}function d(A){F.call(this,A),this.shift=this.m.bitLength(),this.shift%26!=0&&(this.shift+=26-this.shift%26),this.r=new E(1).iushln(this.shift),this.r2=this.imod(this.r.sqr()),this.rinv=this.r._invmp(this.m),this.minv=this.rinv.mul(this.r).isubn(1).div(this.m),this.minv=this.minv.umod(this.r),this.minv=this.r.sub(this.minv)}y.prototype._tmp=function(){var A=new E(null);return A.words=new Array(Math.ceil(this.n/13)),A},y.prototype.ireduce=function(A){var B,Q=A;do{this.split(Q,this.tmp),B=(Q=(Q=this.imulK(Q)).iadd(this.tmp)).bitLength()}while(B>this.n);var g=B<this.n?-1:Q.ucmp(this.p);return 0===g?(Q.words[0]=0,Q.length=1):g>0?Q.isub(this.p):Q.strip(),Q},y.prototype.split=function(A,B){A.iushrn(this.n,0,B)},y.prototype.imulK=function(A){return A.imul(this.k)},I(D,y),D.prototype.split=function(A,B){for(var Q=Math.min(A.length,9),g=0;g<Q;g++)B.words[g]=A.words[g];if(B.length=Q,A.length<=9)return A.words[0]=0,void(A.length=1);var I=A.words[9];for(B.words[B.length++]=4194303&I,g=10;g<A.length;g++){var E=0|A.words[g];A.words[g-10]=(4194303&E)<<4|I>>>22,I=E}I>>>=22,A.words[g-10]=I,0===I&&A.length>10?A.length-=10:A.length-=9},D.prototype.imulK=function(A){A.words[A.length]=0,A.words[A.length+1]=0,A.length+=2;for(var B=0,Q=0;Q<A.length;Q++){var g=0|A.words[Q];B+=977*g,A.words[Q]=67108863&B,B=64*g+(B/67108864|0)}return 0===A.words[A.length-1]&&(A.length--,0===A.words[A.length-1]&&A.length--),A},I(u,y),I(f,y),I(w,y),w.prototype.imulK=function(A){for(var B=0,Q=0;Q<A.length;Q++){var g=19*(0|A.words[Q])+B,I=67108863&g;g>>>=26,A.words[Q]=I,B=g}return 0!==B&&(A.words[A.length++]=B),A},E._prime=function(A){if(c[A])return c[A];var B;if("k256"===A)B=new D;else if("p224"===A)B=new u;else if("p192"===A)B=new f;else{if("p25519"!==A)throw new Error("Unknown prime "+A);B=new w}return c[A]=B,B},F.prototype._verify1=function(A){g(0===A.negative,"red works only with positives"),g(A.red,"red works only with red numbers")},F.prototype._verify2=function(A,B){g(0==(A.negative|B.negative),"red works only with positives"),g(A.red&&A.red===B.red,"red works only with red numbers")},F.prototype.imod=function(A){return this.prime?this.prime.ireduce(A)._forceRed(this):A.umod(this.m)._forceRed(this)},F.prototype.neg=function(A){return A.isZero()?A.clone():this.m.sub(A)._forceRed(this)},F.prototype.add=function(A,B){this._verify2(A,B);var Q=A.add(B);return Q.cmp(this.m)>=0&&Q.isub(this.m),Q._forceRed(this)},F.prototype.iadd=function(A,B){this._verify2(A,B);var Q=A.iadd(B);return Q.cmp(this.m)>=0&&Q.isub(this.m),Q},F.prototype.sub=function(A,B){this._verify2(A,B);var Q=A.sub(B);return Q.cmpn(0)<0&&Q.iadd(this.m),Q._forceRed(this)},F.prototype.isub=function(A,B){this._verify2(A,B);var Q=A.isub(B);return Q.cmpn(0)<0&&Q.iadd(this.m),Q},F.prototype.shl=function(A,B){return this._verify1(A),this.imod(A.ushln(B))},F.prototype.imul=function(A,B){return this._verify2(A,B),this.imod(A.imul(B))},F.prototype.mul=function(A,B){return this._verify2(A,B),this.imod(A.mul(B))},F.prototype.isqr=function(A){return this.imul(A,A.clone())},F.prototype.sqr=function(A){return this.mul(A,A)},F.prototype.sqrt=function(A){if(A.isZero())return A.clone();var B=this.m.andln(3);if(g(B%2==1),3===B){var Q=this.m.add(new E(1)).iushrn(2);return this.pow(A,Q)}for(var I=this.m.subn(1),i=0;!I.isZero()&&0===I.andln(1);)i++,I.iushrn(1);g(!I.isZero());var C=new E(1).toRed(this),t=C.redNeg(),e=this.m.subn(1).iushrn(1),o=this.m.bitLength();for(o=new E(2*o*o).toRed(this);0!==this.pow(o,e).cmp(t);)o.redIAdd(t);for(var s=this.pow(o,I),r=this.pow(A,I.addn(1).iushrn(1)),h=this.pow(A,I),n=i;0!==h.cmp(C);){for(var a=h,c=0;0!==a.cmp(C);c++)a=a.redSqr();g(c<n);var y=this.pow(s,new E(1).iushln(n-c-1));r=r.redMul(y),s=y.redSqr(),h=h.redMul(s),n=c}return r},F.prototype.invm=function(A){var B=A._invmp(this.m);return 0!==B.negative?(B.negative=0,this.imod(B).redNeg()):this.imod(B)},F.prototype.pow=function(A,B){if(B.isZero())return new E(1).toRed(this);if(0===B.cmpn(1))return A.clone();var Q=new Array(16);Q[0]=new E(1).toRed(this),Q[1]=A;for(var g=2;g<Q.length;g++)Q[g]=this.mul(Q[g-1],A);var I=Q[0],i=0,C=0,t=B.bitLength()%26;for(0===t&&(t=26),g=B.length-1;g>=0;g--){for(var e=B.words[g],o=t-1;o>=0;o--){var s=e>>o&1;I!==Q[0]&&(I=this.sqr(I)),0!==s||0!==i?(i<<=1,i|=s,(4===++C||0===g&&0===o)&&(I=this.mul(I,Q[i]),C=0,i=0)):C=0}t=26}return I},F.prototype.convertTo=function(A){var B=A.umod(this.m);return B===A?B.clone():B},F.prototype.convertFrom=function(A){var B=A.clone();return B.red=null,B},E.mont=function(A){return new d(A)},I(d,F),d.prototype.convertTo=function(A){return this.imod(A.ushln(this.shift))},d.prototype.convertFrom=function(A){var B=this.imod(A.mul(this.rinv));return B.red=null,B},d.prototype.imul=function(A,B){if(A.isZero()||B.isZero())return A.words[0]=0,A.length=1,A;var Q=A.imul(B),g=Q.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m),I=Q.isub(g).iushrn(this.shift),E=I;return I.cmp(this.m)>=0?E=I.isub(this.m):I.cmpn(0)<0&&(E=I.iadd(this.m)),E._forceRed(this)},d.prototype.mul=function(A,B){if(A.isZero()||B.isZero())return new E(0)._forceRed(this);var Q=A.mul(B),g=Q.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m),I=Q.isub(g).iushrn(this.shift),i=I;return I.cmp(this.m)>=0?i=I.isub(this.m):I.cmpn(0)<0&&(i=I.iadd(this.m)),i._forceRed(this)},d.prototype.invm=function(A){return this.imod(A._invmp(this.m).mul(this.r2))._forceRed(this)}}(A,this)}).call(this,Q(10)(A))},function(A,B){},function(A,B,Q){var g=Q(24),I=Q(0);function E(A,B){this.name=A,this.body=B,this.decoders={},this.encoders={}}B.define=function(A,B){return new E(A,B)},E.prototype._createNamed=function(A){var B;try{B=Q(191).runInThisContext("(function "+this.name+"(entity) {\n  this._initNamed(entity);\n})")}catch(A){B=function(A){this._initNamed(A)}}return I(B,A),B.prototype._initNamed=function(B){A.call(this,B)},new B(this)},E.prototype._getDecoder=function(A){return A=A||"der",this.decoders.hasOwnProperty(A)||(this.decoders[A]=this._createNamed(g.decoders[A])),this.decoders[A]},E.prototype.decode=function(A,B,Q){return this._getDecoder(B).decode(A,Q)},E.prototype._getEncoder=function(A){return A=A||"der",this.encoders.hasOwnProperty(A)||(this.encoders[A]=this._createNamed(g.encoders[A])),this.encoders[A]},E.prototype.encode=function(A,B,Q){return this._getEncoder(B).encode(A,Q)}},function(module,exports){var indexOf=function(A,B){if(A.indexOf)return A.indexOf(B);for(var Q=0;Q<A.length;Q++)if(A[Q]===B)return Q;return-1},Object_keys=function(A){if(Object.keys)return Object.keys(A);var B=[];for(var Q in A)B.push(Q);return B},forEach=function(A,B){if(A.forEach)return A.forEach(B);for(var Q=0;Q<A.length;Q++)B(A[Q],Q,A)},defineProp=function(){try{return Object.defineProperty({},"_",{}),function(A,B,Q){Object.defineProperty(A,B,{writable:!0,enumerable:!1,configurable:!0,value:Q})}}catch(A){return function(A,B,Q){A[B]=Q}}}(),globals=["Array","Boolean","Date","Error","EvalError","Function","Infinity","JSON","Math","NaN","Number","Object","RangeError","ReferenceError","RegExp","String","SyntaxError","TypeError","URIError","decodeURI","decodeURIComponent","encodeURI","encodeURIComponent","escape","eval","isFinite","isNaN","parseFloat","parseInt","undefined","unescape"];function Context(){}Context.prototype={};var Script=exports.Script=function(A){if(!(this instanceof Script))return new Script(A);this.code=A};Script.prototype.runInContext=function(A){if(!(A instanceof Context))throw new TypeError("needs a 'context' argument.");var B=document.createElement("iframe");B.style||(B.style={}),B.style.display="none",document.body.appendChild(B);var Q=B.contentWindow,g=Q.eval,I=Q.execScript;!g&&I&&(I.call(Q,"null"),g=Q.eval),forEach(Object_keys(A),(function(B){Q[B]=A[B]})),forEach(globals,(function(B){A[B]&&(Q[B]=A[B])}));var E=Object_keys(Q),i=g.call(Q,this.code);return forEach(Object_keys(Q),(function(B){(B in A||-1===indexOf(E,B))&&(A[B]=Q[B])})),forEach(globals,(function(B){B in A||defineProp(A,B,Q[B])})),document.body.removeChild(B),i},Script.prototype.runInThisContext=function(){return eval(this.code)},Script.prototype.runInNewContext=function(A){var B=Script.createContext(A),Q=this.runInContext(B);return A&&forEach(Object_keys(B),(function(Q){A[Q]=B[Q]})),Q},forEach(Object_keys(Script.prototype),(function(A){exports[A]=Script[A]=function(B){var Q=Script(B);return Q[A].apply(Q,[].slice.call(arguments,1))}})),exports.isContext=function(A){return A instanceof Context},exports.createScript=function(A){return exports.Script(A)},exports.createContext=Script.createContext=function(A){var B=new Context;return"object"==typeof A&&forEach(Object_keys(A),(function(Q){B[Q]=A[Q]})),B}},function(A,B,Q){var g=Q(0);function I(A){this._reporterState={obj:null,path:[],options:A||{},errors:[]}}function E(A,B){this.path=A,this.rethrow(B)}B.Reporter=I,I.prototype.isError=function(A){return A instanceof E},I.prototype.save=function(){var A=this._reporterState;return{obj:A.obj,pathLen:A.path.length}},I.prototype.restore=function(A){var B=this._reporterState;B.obj=A.obj,B.path=B.path.slice(0,A.pathLen)},I.prototype.enterKey=function(A){return this._reporterState.path.push(A)},I.prototype.exitKey=function(A){var B=this._reporterState;B.path=B.path.slice(0,A-1)},I.prototype.leaveKey=function(A,B,Q){var g=this._reporterState;this.exitKey(A),null!==g.obj&&(g.obj[B]=Q)},I.prototype.path=function(){return this._reporterState.path.join("/")},I.prototype.enterObject=function(){var A=this._reporterState,B=A.obj;return A.obj={},B},I.prototype.leaveObject=function(A){var B=this._reporterState,Q=B.obj;return B.obj=A,Q},I.prototype.error=function(A){var B,Q=this._reporterState,g=A instanceof E;if(B=g?A:new E(Q.path.map((function(A){return"["+JSON.stringify(A)+"]"})).join(""),A.message||A,A.stack),!Q.options.partial)throw B;return g||Q.errors.push(B),B},I.prototype.wrapResult=function(A){var B=this._reporterState;return B.options.partial?{result:this.isError(A)?null:A,errors:B.errors}:A},g(E,Error),E.prototype.rethrow=function(A){if(this.message=A+" at: "+(this.path||"(shallow)"),Error.captureStackTrace&&Error.captureStackTrace(this,E),!this.stack)try{throw new Error(this.message)}catch(A){this.stack=A.stack}return this}},function(A,B,Q){var g=Q(25).Reporter,I=Q(25).EncoderBuffer,E=Q(25).DecoderBuffer,i=Q(5),C=["seq","seqof","set","setof","objid","bool","gentime","utctime","null_","enum","int","objDesc","bitstr","bmpstr","charstr","genstr","graphstr","ia5str","iso646str","numstr","octstr","printstr","t61str","unistr","utf8str","videostr"],t=["key","obj","use","optional","explicit","implicit","def","choice","any","contains"].concat(C);function e(A,B){var Q={};this._baseState=Q,Q.enc=A,Q.parent=B||null,Q.children=null,Q.tag=null,Q.args=null,Q.reverseArgs=null,Q.choice=null,Q.optional=!1,Q.any=!1,Q.obj=!1,Q.use=null,Q.useDecoder=null,Q.key=null,Q.default=null,Q.explicit=null,Q.implicit=null,Q.contains=null,Q.parent||(Q.children=[],this._wrap())}A.exports=e;var o=["enc","parent","children","tag","args","reverseArgs","choice","optional","any","obj","use","alteredUse","key","default","explicit","implicit","contains"];e.prototype.clone=function(){var A=this._baseState,B={};o.forEach((function(Q){B[Q]=A[Q]}));var Q=new this.constructor(B.parent);return Q._baseState=B,Q},e.prototype._wrap=function(){var A=this._baseState;t.forEach((function(B){this[B]=function(){var Q=new this.constructor(this);return A.children.push(Q),Q[B].apply(Q,arguments)}}),this)},e.prototype._init=function(A){var B=this._baseState;i(null===B.parent),A.call(this),B.children=B.children.filter((function(A){return A._baseState.parent===this}),this),i.equal(B.children.length,1,"Root node can have only one child")},e.prototype._useArgs=function(A){var B=this._baseState,Q=A.filter((function(A){return A instanceof this.constructor}),this);A=A.filter((function(A){return!(A instanceof this.constructor)}),this),0!==Q.length&&(i(null===B.children),B.children=Q,Q.forEach((function(A){A._baseState.parent=this}),this)),0!==A.length&&(i(null===B.args),B.args=A,B.reverseArgs=A.map((function(A){if("object"!=typeof A||A.constructor!==Object)return A;var B={};return Object.keys(A).forEach((function(Q){Q==(0|Q)&&(Q|=0);var g=A[Q];B[g]=Q})),B})))},["_peekTag","_decodeTag","_use","_decodeStr","_decodeObjid","_decodeTime","_decodeNull","_decodeInt","_decodeBool","_decodeList","_encodeComposite","_encodeStr","_encodeObjid","_encodeTime","_encodeNull","_encodeInt","_encodeBool"].forEach((function(A){e.prototype[A]=function(){var B=this._baseState;throw new Error(A+" not implemented for encoding: "+B.enc)}})),C.forEach((function(A){e.prototype[A]=function(){var B=this._baseState,Q=Array.prototype.slice.call(arguments);return i(null===B.tag),B.tag=A,this._useArgs(Q),this}})),e.prototype.use=function(A){i(A);var B=this._baseState;return i(null===B.use),B.use=A,this},e.prototype.optional=function(){return this._baseState.optional=!0,this},e.prototype.def=function(A){var B=this._baseState;return i(null===B.default),B.default=A,B.optional=!0,this},e.prototype.explicit=function(A){var B=this._baseState;return i(null===B.explicit&&null===B.implicit),B.explicit=A,this},e.prototype.implicit=function(A){var B=this._baseState;return i(null===B.explicit&&null===B.implicit),B.implicit=A,this},e.prototype.obj=function(){var A=this._baseState,B=Array.prototype.slice.call(arguments);return A.obj=!0,0!==B.length&&this._useArgs(B),this},e.prototype.key=function(A){var B=this._baseState;return i(null===B.key),B.key=A,this},e.prototype.any=function(){return this._baseState.any=!0,this},e.prototype.choice=function(A){var B=this._baseState;return i(null===B.choice),B.choice=A,this._useArgs(Object.keys(A).map((function(B){return A[B]}))),this},e.prototype.contains=function(A){var B=this._baseState;return i(null===B.use),B.contains=A,this},e.prototype._decode=function(A,B){var Q=this._baseState;if(null===Q.parent)return A.wrapResult(Q.children[0]._decode(A,B));var g,I=Q.default,i=!0,C=null;if(null!==Q.key&&(C=A.enterKey(Q.key)),Q.optional){var t=null;if(null!==Q.explicit?t=Q.explicit:null!==Q.implicit?t=Q.implicit:null!==Q.tag&&(t=Q.tag),null!==t||Q.any){if(i=this._peekTag(A,t,Q.any),A.isError(i))return i}else{var e=A.save();try{null===Q.choice?this._decodeGeneric(Q.tag,A,B):this._decodeChoice(A,B),i=!0}catch(A){i=!1}A.restore(e)}}if(Q.obj&&i&&(g=A.enterObject()),i){if(null!==Q.explicit){var o=this._decodeTag(A,Q.explicit);if(A.isError(o))return o;A=o}var s=A.offset;if(null===Q.use&&null===Q.choice){if(Q.any)e=A.save();var r=this._decodeTag(A,null!==Q.implicit?Q.implicit:Q.tag,Q.any);if(A.isError(r))return r;Q.any?I=A.raw(e):A=r}if(B&&B.track&&null!==Q.tag&&B.track(A.path(),s,A.length,"tagged"),B&&B.track&&null!==Q.tag&&B.track(A.path(),A.offset,A.length,"content"),I=Q.any?I:null===Q.choice?this._decodeGeneric(Q.tag,A,B):this._decodeChoice(A,B),A.isError(I))return I;if(Q.any||null!==Q.choice||null===Q.children||Q.children.forEach((function(Q){Q._decode(A,B)})),Q.contains&&("octstr"===Q.tag||"bitstr"===Q.tag)){var h=new E(I);I=this._getUse(Q.contains,A._reporterState.obj)._decode(h,B)}}return Q.obj&&i&&(I=A.leaveObject(g)),null===Q.key||null===I&&!0!==i?null!==C&&A.exitKey(C):A.leaveKey(C,Q.key,I),I},e.prototype._decodeGeneric=function(A,B,Q){var g=this._baseState;return"seq"===A||"set"===A?null:"seqof"===A||"setof"===A?this._decodeList(B,A,g.args[0],Q):/str$/.test(A)?this._decodeStr(B,A,Q):"objid"===A&&g.args?this._decodeObjid(B,g.args[0],g.args[1],Q):"objid"===A?this._decodeObjid(B,null,null,Q):"gentime"===A||"utctime"===A?this._decodeTime(B,A,Q):"null_"===A?this._decodeNull(B,Q):"bool"===A?this._decodeBool(B,Q):"objDesc"===A?this._decodeStr(B,A,Q):"int"===A||"enum"===A?this._decodeInt(B,g.args&&g.args[0],Q):null!==g.use?this._getUse(g.use,B._reporterState.obj)._decode(B,Q):B.error("unknown tag: "+A)},e.prototype._getUse=function(A,B){var Q=this._baseState;return Q.useDecoder=this._use(A,B),i(null===Q.useDecoder._baseState.parent),Q.useDecoder=Q.useDecoder._baseState.children[0],Q.implicit!==Q.useDecoder._baseState.implicit&&(Q.useDecoder=Q.useDecoder.clone(),Q.useDecoder._baseState.implicit=Q.implicit),Q.useDecoder},e.prototype._decodeChoice=function(A,B){var Q=this._baseState,g=null,I=!1;return Object.keys(Q.choice).some((function(E){var i=A.save(),C=Q.choice[E];try{var t=C._decode(A,B);if(A.isError(t))return!1;g={type:E,value:t},I=!0}catch(B){return A.restore(i),!1}return!0}),this),I?g:A.error("Choice not matched")},e.prototype._createEncoderBuffer=function(A){return new I(A,this.reporter)},e.prototype._encode=function(A,B,Q){var g=this._baseState;if(null===g.default||g.default!==A){var I=this._encodeValue(A,B,Q);if(void 0!==I&&!this._skipDefault(I,B,Q))return I}},e.prototype._encodeValue=function(A,B,Q){var I=this._baseState;if(null===I.parent)return I.children[0]._encode(A,B||new g);var E=null;if(this.reporter=B,I.optional&&void 0===A){if(null===I.default)return;A=I.default}var i=null,C=!1;if(I.any)E=this._createEncoderBuffer(A);else if(I.choice)E=this._encodeChoice(A,B);else if(I.contains)i=this._getUse(I.contains,Q)._encode(A,B),C=!0;else if(I.children)i=I.children.map((function(Q){if("null_"===Q._baseState.tag)return Q._encode(null,B,A);if(null===Q._baseState.key)return B.error("Child should have a key");var g=B.enterKey(Q._baseState.key);if("object"!=typeof A)return B.error("Child expected, but input is not object");var I=Q._encode(A[Q._baseState.key],B,A);return B.leaveKey(g),I}),this).filter((function(A){return A})),i=this._createEncoderBuffer(i);else if("seqof"===I.tag||"setof"===I.tag){if(!I.args||1!==I.args.length)return B.error("Too many args for : "+I.tag);if(!Array.isArray(A))return B.error("seqof/setof, but data is not Array");var t=this.clone();t._baseState.implicit=null,i=this._createEncoderBuffer(A.map((function(Q){var g=this._baseState;return this._getUse(g.args[0],A)._encode(Q,B)}),t))}else null!==I.use?E=this._getUse(I.use,Q)._encode(A,B):(i=this._encodePrimitive(I.tag,A),C=!0);if(!I.any&&null===I.choice){var e=null!==I.implicit?I.implicit:I.tag,o=null===I.implicit?"universal":"context";null===e?null===I.use&&B.error("Tag could be omitted only for .use()"):null===I.use&&(E=this._encodeComposite(e,C,o,i))}return null!==I.explicit&&(E=this._encodeComposite(I.explicit,!1,"context",E)),E},e.prototype._encodeChoice=function(A,B){var Q=this._baseState,g=Q.choice[A.type];return g||i(!1,A.type+" not found in "+JSON.stringify(Object.keys(Q.choice))),g._encode(A.value,B)},e.prototype._encodePrimitive=function(A,B){var Q=this._baseState;if(/str$/.test(A))return this._encodeStr(B,A);if("objid"===A&&Q.args)return this._encodeObjid(B,Q.reverseArgs[0],Q.args[1]);if("objid"===A)return this._encodeObjid(B,null,null);if("gentime"===A||"utctime"===A)return this._encodeTime(B,A);if("null_"===A)return this._encodeNull();if("int"===A||"enum"===A)return this._encodeInt(B,Q.args&&Q.reverseArgs[0]);if("bool"===A)return this._encodeBool(B);if("objDesc"===A)return this._encodeStr(B,A);throw new Error("Unsupported tag: "+A)},e.prototype._isNumstr=function(A){return/^[0-9 ]*$/.test(A)},e.prototype._isPrintstr=function(A){return/^[A-Za-z0-9 '\(\)\+,\-\.\/:=\?]*$/.test(A)}},function(A,B,Q){var g=Q(93);B.tagClass={0:"universal",1:"application",2:"context",3:"private"},B.tagClassByName=g._reverse(B.tagClass),B.tag={0:"end",1:"bool",2:"int",3:"bitstr",4:"octstr",5:"null_",6:"objid",7:"objDesc",8:"external",9:"real",10:"enum",11:"embed",12:"utf8str",13:"relativeOid",16:"seq",17:"set",18:"numstr",19:"printstr",20:"t61str",21:"videostr",22:"ia5str",23:"utctime",24:"gentime",25:"graphstr",26:"iso646str",27:"genstr",28:"unistr",29:"charstr",30:"bmpstr"},B.tagByName=g._reverse(B.tag)},function(A,B,Q){var g=B;g.der=Q(94),g.pem=Q(196)},function(A,B,Q){var g=Q(0),I=Q(2).Buffer,E=Q(94);function i(A){E.call(this,A),this.enc="pem"}g(i,E),A.exports=i,i.prototype.decode=function(A,B){for(var Q=A.toString().split(/[\r\n]+/g),g=B.label.toUpperCase(),i=/^-----(BEGIN|END) ([^-]+)-----$/,C=-1,t=-1,e=0;e<Q.length;e++){var o=Q[e].match(i);if(null!==o&&o[2]===g){if(-1!==C){if("END"!==o[1])break;t=e;break}if("BEGIN"!==o[1])break;C=e}}if(-1===C||-1===t)throw new Error("PEM section not found for: "+g);var s=Q.slice(C+1,t).join("");s.replace(/[^a-z0-9\+\/=]+/gi,"");var r=new I(s,"base64");return E.prototype.decode.call(this,r,B)}},function(A,B,Q){var g=B;g.der=Q(95),g.pem=Q(198)},function(A,B,Q){var g=Q(0),I=Q(95);function E(A){I.call(this,A),this.enc="pem"}g(E,I),A.exports=E,E.prototype.encode=function(A,B){for(var Q=I.prototype.encode.call(this,A).toString("base64"),g=["-----BEGIN "+B.label+"-----"],E=0;E<Q.length;E+=64)g.push(Q.slice(E,E+64));return g.push("-----END "+B.label+"-----"),g.join("\n")}},function(A,B,Q){"use strict";var g=Q(24),I=g.define("Time",(function(){this.choice({utcTime:this.utctime(),generalTime:this.gentime()})})),E=g.define("AttributeTypeValue",(function(){this.seq().obj(this.key("type").objid(),this.key("value").any())})),i=g.define("AlgorithmIdentifier",(function(){this.seq().obj(this.key("algorithm").objid(),this.key("parameters").optional(),this.key("curve").objid().optional())})),C=g.define("SubjectPublicKeyInfo",(function(){this.seq().obj(this.key("algorithm").use(i),this.key("subjectPublicKey").bitstr())})),t=g.define("RelativeDistinguishedName",(function(){this.setof(E)})),e=g.define("RDNSequence",(function(){this.seqof(t)})),o=g.define("Name",(function(){this.choice({rdnSequence:this.use(e)})})),s=g.define("Validity",(function(){this.seq().obj(this.key("notBefore").use(I),this.key("notAfter").use(I))})),r=g.define("Extension",(function(){this.seq().obj(this.key("extnID").objid(),this.key("critical").bool().def(!1),this.key("extnValue").octstr())})),h=g.define("TBSCertificate",(function(){this.seq().obj(this.key("version").explicit(0).int().optional(),this.key("serialNumber").int(),this.key("signature").use(i),this.key("issuer").use(o),this.key("validity").use(s),this.key("subject").use(o),this.key("subjectPublicKeyInfo").use(C),this.key("issuerUniqueID").implicit(1).bitstr().optional(),this.key("subjectUniqueID").implicit(2).bitstr().optional(),this.key("extensions").explicit(3).seqof(r).optional())})),n=g.define("X509Certificate",(function(){this.seq().obj(this.key("tbsCertificate").use(h),this.key("signatureAlgorithm").use(i),this.key("signatureValue").bitstr())}));A.exports=n},function(A){A.exports=JSON.parse('{"2.16.840.1.101.3.4.1.1":"aes-128-ecb","2.16.840.1.101.3.4.1.2":"aes-128-cbc","2.16.840.1.101.3.4.1.3":"aes-128-ofb","2.16.840.1.101.3.4.1.4":"aes-128-cfb","2.16.840.1.101.3.4.1.21":"aes-192-ecb","2.16.840.1.101.3.4.1.22":"aes-192-cbc","2.16.840.1.101.3.4.1.23":"aes-192-ofb","2.16.840.1.101.3.4.1.24":"aes-192-cfb","2.16.840.1.101.3.4.1.41":"aes-256-ecb","2.16.840.1.101.3.4.1.42":"aes-256-cbc","2.16.840.1.101.3.4.1.43":"aes-256-ofb","2.16.840.1.101.3.4.1.44":"aes-256-cfb"}')},function(A,B,Q){var g=/Proc-Type: 4,ENCRYPTED[\n\r]+DEK-Info: AES-((?:128)|(?:192)|(?:256))-CBC,([0-9A-H]+)[\n\r]+([0-9A-z\n\r\+\/\=]+)[\n\r]+/m,I=/^-----BEGIN ((?:.*? KEY)|CERTIFICATE)-----/m,E=/^-----BEGIN ((?:.*? KEY)|CERTIFICATE)-----([0-9A-z\n\r\+\/\=]+)-----END \1-----$/m,i=Q(28),C=Q(39),t=Q(1).Buffer;A.exports=function(A,B){var Q,e=A.toString(),o=e.match(g);if(o){var s="aes"+o[1],r=t.from(o[2],"hex"),h=t.from(o[3].replace(/[\r\n]/g,""),"base64"),n=i(B,r.slice(0,8),parseInt(o[1],10)).key,a=[],c=C.createDecipheriv(s,n,r);a.push(c.update(h)),a.push(c.final()),Q=t.concat(a)}else{var y=e.match(E);Q=new t(y[2].replace(/[\r\n]/g,""),"base64")}return{tag:e.match(I)[1],data:Q}}},function(A,B,Q){var g=Q(2).Buffer,I=Q(91),E=Q(44).ec,i=Q(30),C=Q(96);function t(A,B){if(A.cmpn(0)<=0)throw new Error("invalid sig");if(A.cmp(B)>=B)throw new Error("invalid sig")}A.exports=function(A,B,Q,e,o){var s=i(Q);if("ec"===s.type){if("ecdsa"!==e&&"ecdsa/rsa"!==e)throw new Error("wrong public key type");return function(A,B,Q){var g=C[Q.data.algorithm.curve.join(".")];if(!g)throw new Error("unknown curve "+Q.data.algorithm.curve.join("."));var I=new E(g),i=Q.data.subjectPrivateKey.data;return I.verify(B,A,i)}(A,B,s)}if("dsa"===s.type){if("dsa"!==e)throw new Error("wrong public key type");return function(A,B,Q){var g=Q.data.p,E=Q.data.q,C=Q.data.g,e=Q.data.pub_key,o=i.signature.decode(A,"der"),s=o.s,r=o.r;t(s,E),t(r,E);var h=I.mont(g),n=s.invm(E);return 0===C.toRed(h).redPow(new I(B).mul(n).mod(E)).fromRed().mul(e.toRed(h).redPow(r.mul(n).mod(E)).fromRed()).mod(g).mod(E).cmp(r)}(A,B,s)}if("rsa"!==e&&"ecdsa/rsa"!==e)throw new Error("wrong public key type");B=g.concat([o,B]);for(var r=s.modulus.byteLength(),h=[1],n=0;B.length+h.length+2<r;)h.push(255),n++;h.push(0);for(var a=-1;++a<B.length;)h.push(B[a]);h=g.from(h);var c=I.mont(s.modulus);A=(A=new I(A).toRed(c)).redPow(new I(s.publicExponent)),A=g.from(A.fromRed().toArray());var y=n<8?1:0;for(r=Math.min(A.length,h.length),A.length!==h.length&&(y=1),a=-1;++a<r;)y|=A[a]^h[a];return 0===y}},function(A,B,Q){(function(B){var g=Q(44),I=Q(204);A.exports=function(A){return new i(A)};var E={secp256k1:{name:"secp256k1",byteLength:32},secp224r1:{name:"p224",byteLength:28},prime256v1:{name:"p256",byteLength:32},prime192v1:{name:"p192",byteLength:24},ed25519:{name:"ed25519",byteLength:32},secp384r1:{name:"p384",byteLength:48},secp521r1:{name:"p521",byteLength:66}};function i(A){this.curveType=E[A],this.curveType||(this.curveType={name:A}),this.curve=new g.ec(this.curveType.name),this.keys=void 0}function C(A,Q,g){Array.isArray(A)||(A=A.toArray());var I=new B(A);if(g&&I.length<g){var E=new B(g-I.length);E.fill(0),I=B.concat([E,I])}return Q?I.toString(Q):I}E.p224=E.secp224r1,E.p256=E.secp256r1=E.prime256v1,E.p192=E.secp192r1=E.prime192v1,E.p384=E.secp384r1,E.p521=E.secp521r1,i.prototype.generateKeys=function(A,B){return this.keys=this.curve.genKeyPair(),this.getPublicKey(A,B)},i.prototype.computeSecret=function(A,Q,g){return Q=Q||"utf8",B.isBuffer(A)||(A=new B(A,Q)),C(this.curve.keyFromPublic(A).getPublic().mul(this.keys.getPrivate()).getX(),g,this.curveType.byteLength)},i.prototype.getPublicKey=function(A,B){var Q=this.keys.getPublic("compressed"===B,!0);return"hybrid"===B&&(Q[Q.length-1]%2?Q[0]=7:Q[0]=6),C(Q,A)},i.prototype.getPrivateKey=function(A){return C(this.keys.getPrivate(),A)},i.prototype.setPublicKey=function(A,Q){return Q=Q||"utf8",B.isBuffer(A)||(A=new B(A,Q)),this.keys._importPublic(A),this},i.prototype.setPrivateKey=function(A,Q){Q=Q||"utf8",B.isBuffer(A)||(A=new B(A,Q));var g=new I(A);return g=g.toString(16),this.keys=this.curve.genKeyPair(),this.keys._importPrivate(g),this}}).call(this,Q(2).Buffer)},function(A,B,Q){(function(A){!function(A,B){"use strict";function g(A,B){if(!A)throw new Error(B||"Assertion failed")}function I(A,B){A.super_=B;var Q=function(){};Q.prototype=B.prototype,A.prototype=new Q,A.prototype.constructor=A}function E(A,B,Q){if(E.isBN(A))return A;this.negative=0,this.words=null,this.length=0,this.red=null,null!==A&&("le"!==B&&"be"!==B||(Q=B,B=10),this._init(A||0,B||10,Q||"be"))}var i;"object"==typeof A?A.exports=E:B.BN=E,E.BN=E,E.wordSize=26;try{i=Q(205).Buffer}catch(A){}function C(A,B,Q){for(var g=0,I=Math.min(A.length,Q),E=B;E<I;E++){var i=A.charCodeAt(E)-48;g<<=4,g|=i>=49&&i<=54?i-49+10:i>=17&&i<=22?i-17+10:15&i}return g}function t(A,B,Q,g){for(var I=0,E=Math.min(A.length,Q),i=B;i<E;i++){var C=A.charCodeAt(i)-48;I*=g,I+=C>=49?C-49+10:C>=17?C-17+10:C}return I}E.isBN=function(A){return A instanceof E||null!==A&&"object"==typeof A&&A.constructor.wordSize===E.wordSize&&Array.isArray(A.words)},E.max=function(A,B){return A.cmp(B)>0?A:B},E.min=function(A,B){return A.cmp(B)<0?A:B},E.prototype._init=function(A,B,Q){if("number"==typeof A)return this._initNumber(A,B,Q);if("object"==typeof A)return this._initArray(A,B,Q);"hex"===B&&(B=16),g(B===(0|B)&&B>=2&&B<=36);var I=0;"-"===(A=A.toString().replace(/\s+/g,""))[0]&&I++,16===B?this._parseHex(A,I):this._parseBase(A,B,I),"-"===A[0]&&(this.negative=1),this.strip(),"le"===Q&&this._initArray(this.toArray(),B,Q)},E.prototype._initNumber=function(A,B,Q){A<0&&(this.negative=1,A=-A),A<67108864?(this.words=[67108863&A],this.length=1):A<4503599627370496?(this.words=[67108863&A,A/67108864&67108863],this.length=2):(g(A<9007199254740992),this.words=[67108863&A,A/67108864&67108863,1],this.length=3),"le"===Q&&this._initArray(this.toArray(),B,Q)},E.prototype._initArray=function(A,B,Q){if(g("number"==typeof A.length),A.length<=0)return this.words=[0],this.length=1,this;this.length=Math.ceil(A.length/3),this.words=new Array(this.length);for(var I=0;I<this.length;I++)this.words[I]=0;var E,i,C=0;if("be"===Q)for(I=A.length-1,E=0;I>=0;I-=3)i=A[I]|A[I-1]<<8|A[I-2]<<16,this.words[E]|=i<<C&67108863,this.words[E+1]=i>>>26-C&67108863,(C+=24)>=26&&(C-=26,E++);else if("le"===Q)for(I=0,E=0;I<A.length;I+=3)i=A[I]|A[I+1]<<8|A[I+2]<<16,this.words[E]|=i<<C&67108863,this.words[E+1]=i>>>26-C&67108863,(C+=24)>=26&&(C-=26,E++);return this.strip()},E.prototype._parseHex=function(A,B){this.length=Math.ceil((A.length-B)/6),this.words=new Array(this.length);for(var Q=0;Q<this.length;Q++)this.words[Q]=0;var g,I,E=0;for(Q=A.length-6,g=0;Q>=B;Q-=6)I=C(A,Q,Q+6),this.words[g]|=I<<E&67108863,this.words[g+1]|=I>>>26-E&4194303,(E+=24)>=26&&(E-=26,g++);Q+6!==B&&(I=C(A,B,Q+6),this.words[g]|=I<<E&67108863,this.words[g+1]|=I>>>26-E&4194303),this.strip()},E.prototype._parseBase=function(A,B,Q){this.words=[0],this.length=1;for(var g=0,I=1;I<=67108863;I*=B)g++;g--,I=I/B|0;for(var E=A.length-Q,i=E%g,C=Math.min(E,E-i)+Q,e=0,o=Q;o<C;o+=g)e=t(A,o,o+g,B),this.imuln(I),this.words[0]+e<67108864?this.words[0]+=e:this._iaddn(e);if(0!==i){var s=1;for(e=t(A,o,A.length,B),o=0;o<i;o++)s*=B;this.imuln(s),this.words[0]+e<67108864?this.words[0]+=e:this._iaddn(e)}},E.prototype.copy=function(A){A.words=new Array(this.length);for(var B=0;B<this.length;B++)A.words[B]=this.words[B];A.length=this.length,A.negative=this.negative,A.red=this.red},E.prototype.clone=function(){var A=new E(null);return this.copy(A),A},E.prototype._expand=function(A){for(;this.length<A;)this.words[this.length++]=0;return this},E.prototype.strip=function(){for(;this.length>1&&0===this.words[this.length-1];)this.length--;return this._normSign()},E.prototype._normSign=function(){return 1===this.length&&0===this.words[0]&&(this.negative=0),this},E.prototype.inspect=function(){return(this.red?"<BN-R: ":"<BN: ")+this.toString(16)+">"};var e=["","0","00","000","0000","00000","000000","0000000","00000000","000000000","0000000000","00000000000","000000000000","0000000000000","00000000000000","000000000000000","0000000000000000","00000000000000000","000000000000000000","0000000000000000000","00000000000000000000","000000000000000000000","0000000000000000000000","00000000000000000000000","000000000000000000000000","0000000000000000000000000"],o=[0,0,25,16,12,11,10,9,8,8,7,7,7,7,6,6,6,6,6,6,6,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],s=[0,0,33554432,43046721,16777216,48828125,60466176,40353607,16777216,43046721,1e7,19487171,35831808,62748517,7529536,11390625,16777216,24137569,34012224,47045881,64e6,4084101,5153632,6436343,7962624,9765625,11881376,14348907,17210368,20511149,243e5,28629151,33554432,39135393,45435424,52521875,60466176];function r(A,B,Q){Q.negative=B.negative^A.negative;var g=A.length+B.length|0;Q.length=g,g=g-1|0;var I=0|A.words[0],E=0|B.words[0],i=I*E,C=67108863&i,t=i/67108864|0;Q.words[0]=C;for(var e=1;e<g;e++){for(var o=t>>>26,s=67108863&t,r=Math.min(e,B.length-1),h=Math.max(0,e-A.length+1);h<=r;h++){var n=e-h|0;o+=(i=(I=0|A.words[n])*(E=0|B.words[h])+s)/67108864|0,s=67108863&i}Q.words[e]=0|s,t=0|o}return 0!==t?Q.words[e]=0|t:Q.length--,Q.strip()}E.prototype.toString=function(A,B){var Q;if(B=0|B||1,16===(A=A||10)||"hex"===A){Q="";for(var I=0,E=0,i=0;i<this.length;i++){var C=this.words[i],t=(16777215&(C<<I|E)).toString(16);Q=0!==(E=C>>>24-I&16777215)||i!==this.length-1?e[6-t.length]+t+Q:t+Q,(I+=2)>=26&&(I-=26,i--)}for(0!==E&&(Q=E.toString(16)+Q);Q.length%B!=0;)Q="0"+Q;return 0!==this.negative&&(Q="-"+Q),Q}if(A===(0|A)&&A>=2&&A<=36){var r=o[A],h=s[A];Q="";var n=this.clone();for(n.negative=0;!n.isZero();){var a=n.modn(h).toString(A);Q=(n=n.idivn(h)).isZero()?a+Q:e[r-a.length]+a+Q}for(this.isZero()&&(Q="0"+Q);Q.length%B!=0;)Q="0"+Q;return 0!==this.negative&&(Q="-"+Q),Q}g(!1,"Base should be between 2 and 36")},E.prototype.toNumber=function(){var A=this.words[0];return 2===this.length?A+=67108864*this.words[1]:3===this.length&&1===this.words[2]?A+=4503599627370496+67108864*this.words[1]:this.length>2&&g(!1,"Number can only safely store up to 53 bits"),0!==this.negative?-A:A},E.prototype.toJSON=function(){return this.toString(16)},E.prototype.toBuffer=function(A,B){return g(void 0!==i),this.toArrayLike(i,A,B)},E.prototype.toArray=function(A,B){return this.toArrayLike(Array,A,B)},E.prototype.toArrayLike=function(A,B,Q){var I=this.byteLength(),E=Q||Math.max(1,I);g(I<=E,"byte array longer than desired length"),g(E>0,"Requested array length <= 0"),this.strip();var i,C,t="le"===B,e=new A(E),o=this.clone();if(t){for(C=0;!o.isZero();C++)i=o.andln(255),o.iushrn(8),e[C]=i;for(;C<E;C++)e[C]=0}else{for(C=0;C<E-I;C++)e[C]=0;for(C=0;!o.isZero();C++)i=o.andln(255),o.iushrn(8),e[E-C-1]=i}return e},Math.clz32?E.prototype._countBits=function(A){return 32-Math.clz32(A)}:E.prototype._countBits=function(A){var B=A,Q=0;return B>=4096&&(Q+=13,B>>>=13),B>=64&&(Q+=7,B>>>=7),B>=8&&(Q+=4,B>>>=4),B>=2&&(Q+=2,B>>>=2),Q+B},E.prototype._zeroBits=function(A){if(0===A)return 26;var B=A,Q=0;return 0==(8191&B)&&(Q+=13,B>>>=13),0==(127&B)&&(Q+=7,B>>>=7),0==(15&B)&&(Q+=4,B>>>=4),0==(3&B)&&(Q+=2,B>>>=2),0==(1&B)&&Q++,Q},E.prototype.bitLength=function(){var A=this.words[this.length-1],B=this._countBits(A);return 26*(this.length-1)+B},E.prototype.zeroBits=function(){if(this.isZero())return 0;for(var A=0,B=0;B<this.length;B++){var Q=this._zeroBits(this.words[B]);if(A+=Q,26!==Q)break}return A},E.prototype.byteLength=function(){return Math.ceil(this.bitLength()/8)},E.prototype.toTwos=function(A){return 0!==this.negative?this.abs().inotn(A).iaddn(1):this.clone()},E.prototype.fromTwos=function(A){return this.testn(A-1)?this.notn(A).iaddn(1).ineg():this.clone()},E.prototype.isNeg=function(){return 0!==this.negative},E.prototype.neg=function(){return this.clone().ineg()},E.prototype.ineg=function(){return this.isZero()||(this.negative^=1),this},E.prototype.iuor=function(A){for(;this.length<A.length;)this.words[this.length++]=0;for(var B=0;B<A.length;B++)this.words[B]=this.words[B]|A.words[B];return this.strip()},E.prototype.ior=function(A){return g(0==(this.negative|A.negative)),this.iuor(A)},E.prototype.or=function(A){return this.length>A.length?this.clone().ior(A):A.clone().ior(this)},E.prototype.uor=function(A){return this.length>A.length?this.clone().iuor(A):A.clone().iuor(this)},E.prototype.iuand=function(A){var B;B=this.length>A.length?A:this;for(var Q=0;Q<B.length;Q++)this.words[Q]=this.words[Q]&A.words[Q];return this.length=B.length,this.strip()},E.prototype.iand=function(A){return g(0==(this.negative|A.negative)),this.iuand(A)},E.prototype.and=function(A){return this.length>A.length?this.clone().iand(A):A.clone().iand(this)},E.prototype.uand=function(A){return this.length>A.length?this.clone().iuand(A):A.clone().iuand(this)},E.prototype.iuxor=function(A){var B,Q;this.length>A.length?(B=this,Q=A):(B=A,Q=this);for(var g=0;g<Q.length;g++)this.words[g]=B.words[g]^Q.words[g];if(this!==B)for(;g<B.length;g++)this.words[g]=B.words[g];return this.length=B.length,this.strip()},E.prototype.ixor=function(A){return g(0==(this.negative|A.negative)),this.iuxor(A)},E.prototype.xor=function(A){return this.length>A.length?this.clone().ixor(A):A.clone().ixor(this)},E.prototype.uxor=function(A){return this.length>A.length?this.clone().iuxor(A):A.clone().iuxor(this)},E.prototype.inotn=function(A){g("number"==typeof A&&A>=0);var B=0|Math.ceil(A/26),Q=A%26;this._expand(B),Q>0&&B--;for(var I=0;I<B;I++)this.words[I]=67108863&~this.words[I];return Q>0&&(this.words[I]=~this.words[I]&67108863>>26-Q),this.strip()},E.prototype.notn=function(A){return this.clone().inotn(A)},E.prototype.setn=function(A,B){g("number"==typeof A&&A>=0);var Q=A/26|0,I=A%26;return this._expand(Q+1),this.words[Q]=B?this.words[Q]|1<<I:this.words[Q]&~(1<<I),this.strip()},E.prototype.iadd=function(A){var B,Q,g;if(0!==this.negative&&0===A.negative)return this.negative=0,B=this.isub(A),this.negative^=1,this._normSign();if(0===this.negative&&0!==A.negative)return A.negative=0,B=this.isub(A),A.negative=1,B._normSign();this.length>A.length?(Q=this,g=A):(Q=A,g=this);for(var I=0,E=0;E<g.length;E++)B=(0|Q.words[E])+(0|g.words[E])+I,this.words[E]=67108863&B,I=B>>>26;for(;0!==I&&E<Q.length;E++)B=(0|Q.words[E])+I,this.words[E]=67108863&B,I=B>>>26;if(this.length=Q.length,0!==I)this.words[this.length]=I,this.length++;else if(Q!==this)for(;E<Q.length;E++)this.words[E]=Q.words[E];return this},E.prototype.add=function(A){var B;return 0!==A.negative&&0===this.negative?(A.negative=0,B=this.sub(A),A.negative^=1,B):0===A.negative&&0!==this.negative?(this.negative=0,B=A.sub(this),this.negative=1,B):this.length>A.length?this.clone().iadd(A):A.clone().iadd(this)},E.prototype.isub=function(A){if(0!==A.negative){A.negative=0;var B=this.iadd(A);return A.negative=1,B._normSign()}if(0!==this.negative)return this.negative=0,this.iadd(A),this.negative=1,this._normSign();var Q,g,I=this.cmp(A);if(0===I)return this.negative=0,this.length=1,this.words[0]=0,this;I>0?(Q=this,g=A):(Q=A,g=this);for(var E=0,i=0;i<g.length;i++)E=(B=(0|Q.words[i])-(0|g.words[i])+E)>>26,this.words[i]=67108863&B;for(;0!==E&&i<Q.length;i++)E=(B=(0|Q.words[i])+E)>>26,this.words[i]=67108863&B;if(0===E&&i<Q.length&&Q!==this)for(;i<Q.length;i++)this.words[i]=Q.words[i];return this.length=Math.max(this.length,i),Q!==this&&(this.negative=1),this.strip()},E.prototype.sub=function(A){return this.clone().isub(A)};var h=function(A,B,Q){var g,I,E,i=A.words,C=B.words,t=Q.words,e=0,o=0|i[0],s=8191&o,r=o>>>13,h=0|i[1],n=8191&h,a=h>>>13,c=0|i[2],y=8191&c,D=c>>>13,u=0|i[3],f=8191&u,w=u>>>13,F=0|i[4],d=8191&F,l=F>>>13,U=0|i[5],N=8191&U,H=U>>>13,G=0|i[6],Y=8191&G,L=G>>>13,R=0|i[7],p=8191&R,M=R>>>13,m=0|i[8],k=8191&m,S=m>>>13,b=0|i[9],v=8191&b,J=b>>>13,V=0|C[0],K=8191&V,x=V>>>13,Z=0|C[1],q=8191&Z,O=Z>>>13,j=0|C[2],W=8191&j,X=j>>>13,T=0|C[3],z=8191&T,_=T>>>13,P=0|C[4],$=8191&P,AA=P>>>13,BA=0|C[5],QA=8191&BA,gA=BA>>>13,IA=0|C[6],EA=8191&IA,iA=IA>>>13,CA=0|C[7],tA=8191&CA,eA=CA>>>13,oA=0|C[8],sA=8191&oA,rA=oA>>>13,hA=0|C[9],nA=8191&hA,aA=hA>>>13;Q.negative=A.negative^B.negative,Q.length=19;var cA=(e+(g=Math.imul(s,K))|0)+((8191&(I=(I=Math.imul(s,x))+Math.imul(r,K)|0))<<13)|0;e=((E=Math.imul(r,x))+(I>>>13)|0)+(cA>>>26)|0,cA&=67108863,g=Math.imul(n,K),I=(I=Math.imul(n,x))+Math.imul(a,K)|0,E=Math.imul(a,x);var yA=(e+(g=g+Math.imul(s,q)|0)|0)+((8191&(I=(I=I+Math.imul(s,O)|0)+Math.imul(r,q)|0))<<13)|0;e=((E=E+Math.imul(r,O)|0)+(I>>>13)|0)+(yA>>>26)|0,yA&=67108863,g=Math.imul(y,K),I=(I=Math.imul(y,x))+Math.imul(D,K)|0,E=Math.imul(D,x),g=g+Math.imul(n,q)|0,I=(I=I+Math.imul(n,O)|0)+Math.imul(a,q)|0,E=E+Math.imul(a,O)|0;var DA=(e+(g=g+Math.imul(s,W)|0)|0)+((8191&(I=(I=I+Math.imul(s,X)|0)+Math.imul(r,W)|0))<<13)|0;e=((E=E+Math.imul(r,X)|0)+(I>>>13)|0)+(DA>>>26)|0,DA&=67108863,g=Math.imul(f,K),I=(I=Math.imul(f,x))+Math.imul(w,K)|0,E=Math.imul(w,x),g=g+Math.imul(y,q)|0,I=(I=I+Math.imul(y,O)|0)+Math.imul(D,q)|0,E=E+Math.imul(D,O)|0,g=g+Math.imul(n,W)|0,I=(I=I+Math.imul(n,X)|0)+Math.imul(a,W)|0,E=E+Math.imul(a,X)|0;var uA=(e+(g=g+Math.imul(s,z)|0)|0)+((8191&(I=(I=I+Math.imul(s,_)|0)+Math.imul(r,z)|0))<<13)|0;e=((E=E+Math.imul(r,_)|0)+(I>>>13)|0)+(uA>>>26)|0,uA&=67108863,g=Math.imul(d,K),I=(I=Math.imul(d,x))+Math.imul(l,K)|0,E=Math.imul(l,x),g=g+Math.imul(f,q)|0,I=(I=I+Math.imul(f,O)|0)+Math.imul(w,q)|0,E=E+Math.imul(w,O)|0,g=g+Math.imul(y,W)|0,I=(I=I+Math.imul(y,X)|0)+Math.imul(D,W)|0,E=E+Math.imul(D,X)|0,g=g+Math.imul(n,z)|0,I=(I=I+Math.imul(n,_)|0)+Math.imul(a,z)|0,E=E+Math.imul(a,_)|0;var fA=(e+(g=g+Math.imul(s,$)|0)|0)+((8191&(I=(I=I+Math.imul(s,AA)|0)+Math.imul(r,$)|0))<<13)|0;e=((E=E+Math.imul(r,AA)|0)+(I>>>13)|0)+(fA>>>26)|0,fA&=67108863,g=Math.imul(N,K),I=(I=Math.imul(N,x))+Math.imul(H,K)|0,E=Math.imul(H,x),g=g+Math.imul(d,q)|0,I=(I=I+Math.imul(d,O)|0)+Math.imul(l,q)|0,E=E+Math.imul(l,O)|0,g=g+Math.imul(f,W)|0,I=(I=I+Math.imul(f,X)|0)+Math.imul(w,W)|0,E=E+Math.imul(w,X)|0,g=g+Math.imul(y,z)|0,I=(I=I+Math.imul(y,_)|0)+Math.imul(D,z)|0,E=E+Math.imul(D,_)|0,g=g+Math.imul(n,$)|0,I=(I=I+Math.imul(n,AA)|0)+Math.imul(a,$)|0,E=E+Math.imul(a,AA)|0;var wA=(e+(g=g+Math.imul(s,QA)|0)|0)+((8191&(I=(I=I+Math.imul(s,gA)|0)+Math.imul(r,QA)|0))<<13)|0;e=((E=E+Math.imul(r,gA)|0)+(I>>>13)|0)+(wA>>>26)|0,wA&=67108863,g=Math.imul(Y,K),I=(I=Math.imul(Y,x))+Math.imul(L,K)|0,E=Math.imul(L,x),g=g+Math.imul(N,q)|0,I=(I=I+Math.imul(N,O)|0)+Math.imul(H,q)|0,E=E+Math.imul(H,O)|0,g=g+Math.imul(d,W)|0,I=(I=I+Math.imul(d,X)|0)+Math.imul(l,W)|0,E=E+Math.imul(l,X)|0,g=g+Math.imul(f,z)|0,I=(I=I+Math.imul(f,_)|0)+Math.imul(w,z)|0,E=E+Math.imul(w,_)|0,g=g+Math.imul(y,$)|0,I=(I=I+Math.imul(y,AA)|0)+Math.imul(D,$)|0,E=E+Math.imul(D,AA)|0,g=g+Math.imul(n,QA)|0,I=(I=I+Math.imul(n,gA)|0)+Math.imul(a,QA)|0,E=E+Math.imul(a,gA)|0;var FA=(e+(g=g+Math.imul(s,EA)|0)|0)+((8191&(I=(I=I+Math.imul(s,iA)|0)+Math.imul(r,EA)|0))<<13)|0;e=((E=E+Math.imul(r,iA)|0)+(I>>>13)|0)+(FA>>>26)|0,FA&=67108863,g=Math.imul(p,K),I=(I=Math.imul(p,x))+Math.imul(M,K)|0,E=Math.imul(M,x),g=g+Math.imul(Y,q)|0,I=(I=I+Math.imul(Y,O)|0)+Math.imul(L,q)|0,E=E+Math.imul(L,O)|0,g=g+Math.imul(N,W)|0,I=(I=I+Math.imul(N,X)|0)+Math.imul(H,W)|0,E=E+Math.imul(H,X)|0,g=g+Math.imul(d,z)|0,I=(I=I+Math.imul(d,_)|0)+Math.imul(l,z)|0,E=E+Math.imul(l,_)|0,g=g+Math.imul(f,$)|0,I=(I=I+Math.imul(f,AA)|0)+Math.imul(w,$)|0,E=E+Math.imul(w,AA)|0,g=g+Math.imul(y,QA)|0,I=(I=I+Math.imul(y,gA)|0)+Math.imul(D,QA)|0,E=E+Math.imul(D,gA)|0,g=g+Math.imul(n,EA)|0,I=(I=I+Math.imul(n,iA)|0)+Math.imul(a,EA)|0,E=E+Math.imul(a,iA)|0;var dA=(e+(g=g+Math.imul(s,tA)|0)|0)+((8191&(I=(I=I+Math.imul(s,eA)|0)+Math.imul(r,tA)|0))<<13)|0;e=((E=E+Math.imul(r,eA)|0)+(I>>>13)|0)+(dA>>>26)|0,dA&=67108863,g=Math.imul(k,K),I=(I=Math.imul(k,x))+Math.imul(S,K)|0,E=Math.imul(S,x),g=g+Math.imul(p,q)|0,I=(I=I+Math.imul(p,O)|0)+Math.imul(M,q)|0,E=E+Math.imul(M,O)|0,g=g+Math.imul(Y,W)|0,I=(I=I+Math.imul(Y,X)|0)+Math.imul(L,W)|0,E=E+Math.imul(L,X)|0,g=g+Math.imul(N,z)|0,I=(I=I+Math.imul(N,_)|0)+Math.imul(H,z)|0,E=E+Math.imul(H,_)|0,g=g+Math.imul(d,$)|0,I=(I=I+Math.imul(d,AA)|0)+Math.imul(l,$)|0,E=E+Math.imul(l,AA)|0,g=g+Math.imul(f,QA)|0,I=(I=I+Math.imul(f,gA)|0)+Math.imul(w,QA)|0,E=E+Math.imul(w,gA)|0,g=g+Math.imul(y,EA)|0,I=(I=I+Math.imul(y,iA)|0)+Math.imul(D,EA)|0,E=E+Math.imul(D,iA)|0,g=g+Math.imul(n,tA)|0,I=(I=I+Math.imul(n,eA)|0)+Math.imul(a,tA)|0,E=E+Math.imul(a,eA)|0;var lA=(e+(g=g+Math.imul(s,sA)|0)|0)+((8191&(I=(I=I+Math.imul(s,rA)|0)+Math.imul(r,sA)|0))<<13)|0;e=((E=E+Math.imul(r,rA)|0)+(I>>>13)|0)+(lA>>>26)|0,lA&=67108863,g=Math.imul(v,K),I=(I=Math.imul(v,x))+Math.imul(J,K)|0,E=Math.imul(J,x),g=g+Math.imul(k,q)|0,I=(I=I+Math.imul(k,O)|0)+Math.imul(S,q)|0,E=E+Math.imul(S,O)|0,g=g+Math.imul(p,W)|0,I=(I=I+Math.imul(p,X)|0)+Math.imul(M,W)|0,E=E+Math.imul(M,X)|0,g=g+Math.imul(Y,z)|0,I=(I=I+Math.imul(Y,_)|0)+Math.imul(L,z)|0,E=E+Math.imul(L,_)|0,g=g+Math.imul(N,$)|0,I=(I=I+Math.imul(N,AA)|0)+Math.imul(H,$)|0,E=E+Math.imul(H,AA)|0,g=g+Math.imul(d,QA)|0,I=(I=I+Math.imul(d,gA)|0)+Math.imul(l,QA)|0,E=E+Math.imul(l,gA)|0,g=g+Math.imul(f,EA)|0,I=(I=I+Math.imul(f,iA)|0)+Math.imul(w,EA)|0,E=E+Math.imul(w,iA)|0,g=g+Math.imul(y,tA)|0,I=(I=I+Math.imul(y,eA)|0)+Math.imul(D,tA)|0,E=E+Math.imul(D,eA)|0,g=g+Math.imul(n,sA)|0,I=(I=I+Math.imul(n,rA)|0)+Math.imul(a,sA)|0,E=E+Math.imul(a,rA)|0;var UA=(e+(g=g+Math.imul(s,nA)|0)|0)+((8191&(I=(I=I+Math.imul(s,aA)|0)+Math.imul(r,nA)|0))<<13)|0;e=((E=E+Math.imul(r,aA)|0)+(I>>>13)|0)+(UA>>>26)|0,UA&=67108863,g=Math.imul(v,q),I=(I=Math.imul(v,O))+Math.imul(J,q)|0,E=Math.imul(J,O),g=g+Math.imul(k,W)|0,I=(I=I+Math.imul(k,X)|0)+Math.imul(S,W)|0,E=E+Math.imul(S,X)|0,g=g+Math.imul(p,z)|0,I=(I=I+Math.imul(p,_)|0)+Math.imul(M,z)|0,E=E+Math.imul(M,_)|0,g=g+Math.imul(Y,$)|0,I=(I=I+Math.imul(Y,AA)|0)+Math.imul(L,$)|0,E=E+Math.imul(L,AA)|0,g=g+Math.imul(N,QA)|0,I=(I=I+Math.imul(N,gA)|0)+Math.imul(H,QA)|0,E=E+Math.imul(H,gA)|0,g=g+Math.imul(d,EA)|0,I=(I=I+Math.imul(d,iA)|0)+Math.imul(l,EA)|0,E=E+Math.imul(l,iA)|0,g=g+Math.imul(f,tA)|0,I=(I=I+Math.imul(f,eA)|0)+Math.imul(w,tA)|0,E=E+Math.imul(w,eA)|0,g=g+Math.imul(y,sA)|0,I=(I=I+Math.imul(y,rA)|0)+Math.imul(D,sA)|0,E=E+Math.imul(D,rA)|0;var NA=(e+(g=g+Math.imul(n,nA)|0)|0)+((8191&(I=(I=I+Math.imul(n,aA)|0)+Math.imul(a,nA)|0))<<13)|0;e=((E=E+Math.imul(a,aA)|0)+(I>>>13)|0)+(NA>>>26)|0,NA&=67108863,g=Math.imul(v,W),I=(I=Math.imul(v,X))+Math.imul(J,W)|0,E=Math.imul(J,X),g=g+Math.imul(k,z)|0,I=(I=I+Math.imul(k,_)|0)+Math.imul(S,z)|0,E=E+Math.imul(S,_)|0,g=g+Math.imul(p,$)|0,I=(I=I+Math.imul(p,AA)|0)+Math.imul(M,$)|0,E=E+Math.imul(M,AA)|0,g=g+Math.imul(Y,QA)|0,I=(I=I+Math.imul(Y,gA)|0)+Math.imul(L,QA)|0,E=E+Math.imul(L,gA)|0,g=g+Math.imul(N,EA)|0,I=(I=I+Math.imul(N,iA)|0)+Math.imul(H,EA)|0,E=E+Math.imul(H,iA)|0,g=g+Math.imul(d,tA)|0,I=(I=I+Math.imul(d,eA)|0)+Math.imul(l,tA)|0,E=E+Math.imul(l,eA)|0,g=g+Math.imul(f,sA)|0,I=(I=I+Math.imul(f,rA)|0)+Math.imul(w,sA)|0,E=E+Math.imul(w,rA)|0;var HA=(e+(g=g+Math.imul(y,nA)|0)|0)+((8191&(I=(I=I+Math.imul(y,aA)|0)+Math.imul(D,nA)|0))<<13)|0;e=((E=E+Math.imul(D,aA)|0)+(I>>>13)|0)+(HA>>>26)|0,HA&=67108863,g=Math.imul(v,z),I=(I=Math.imul(v,_))+Math.imul(J,z)|0,E=Math.imul(J,_),g=g+Math.imul(k,$)|0,I=(I=I+Math.imul(k,AA)|0)+Math.imul(S,$)|0,E=E+Math.imul(S,AA)|0,g=g+Math.imul(p,QA)|0,I=(I=I+Math.imul(p,gA)|0)+Math.imul(M,QA)|0,E=E+Math.imul(M,gA)|0,g=g+Math.imul(Y,EA)|0,I=(I=I+Math.imul(Y,iA)|0)+Math.imul(L,EA)|0,E=E+Math.imul(L,iA)|0,g=g+Math.imul(N,tA)|0,I=(I=I+Math.imul(N,eA)|0)+Math.imul(H,tA)|0,E=E+Math.imul(H,eA)|0,g=g+Math.imul(d,sA)|0,I=(I=I+Math.imul(d,rA)|0)+Math.imul(l,sA)|0,E=E+Math.imul(l,rA)|0;var GA=(e+(g=g+Math.imul(f,nA)|0)|0)+((8191&(I=(I=I+Math.imul(f,aA)|0)+Math.imul(w,nA)|0))<<13)|0;e=((E=E+Math.imul(w,aA)|0)+(I>>>13)|0)+(GA>>>26)|0,GA&=67108863,g=Math.imul(v,$),I=(I=Math.imul(v,AA))+Math.imul(J,$)|0,E=Math.imul(J,AA),g=g+Math.imul(k,QA)|0,I=(I=I+Math.imul(k,gA)|0)+Math.imul(S,QA)|0,E=E+Math.imul(S,gA)|0,g=g+Math.imul(p,EA)|0,I=(I=I+Math.imul(p,iA)|0)+Math.imul(M,EA)|0,E=E+Math.imul(M,iA)|0,g=g+Math.imul(Y,tA)|0,I=(I=I+Math.imul(Y,eA)|0)+Math.imul(L,tA)|0,E=E+Math.imul(L,eA)|0,g=g+Math.imul(N,sA)|0,I=(I=I+Math.imul(N,rA)|0)+Math.imul(H,sA)|0,E=E+Math.imul(H,rA)|0;var YA=(e+(g=g+Math.imul(d,nA)|0)|0)+((8191&(I=(I=I+Math.imul(d,aA)|0)+Math.imul(l,nA)|0))<<13)|0;e=((E=E+Math.imul(l,aA)|0)+(I>>>13)|0)+(YA>>>26)|0,YA&=67108863,g=Math.imul(v,QA),I=(I=Math.imul(v,gA))+Math.imul(J,QA)|0,E=Math.imul(J,gA),g=g+Math.imul(k,EA)|0,I=(I=I+Math.imul(k,iA)|0)+Math.imul(S,EA)|0,E=E+Math.imul(S,iA)|0,g=g+Math.imul(p,tA)|0,I=(I=I+Math.imul(p,eA)|0)+Math.imul(M,tA)|0,E=E+Math.imul(M,eA)|0,g=g+Math.imul(Y,sA)|0,I=(I=I+Math.imul(Y,rA)|0)+Math.imul(L,sA)|0,E=E+Math.imul(L,rA)|0;var LA=(e+(g=g+Math.imul(N,nA)|0)|0)+((8191&(I=(I=I+Math.imul(N,aA)|0)+Math.imul(H,nA)|0))<<13)|0;e=((E=E+Math.imul(H,aA)|0)+(I>>>13)|0)+(LA>>>26)|0,LA&=67108863,g=Math.imul(v,EA),I=(I=Math.imul(v,iA))+Math.imul(J,EA)|0,E=Math.imul(J,iA),g=g+Math.imul(k,tA)|0,I=(I=I+Math.imul(k,eA)|0)+Math.imul(S,tA)|0,E=E+Math.imul(S,eA)|0,g=g+Math.imul(p,sA)|0,I=(I=I+Math.imul(p,rA)|0)+Math.imul(M,sA)|0,E=E+Math.imul(M,rA)|0;var RA=(e+(g=g+Math.imul(Y,nA)|0)|0)+((8191&(I=(I=I+Math.imul(Y,aA)|0)+Math.imul(L,nA)|0))<<13)|0;e=((E=E+Math.imul(L,aA)|0)+(I>>>13)|0)+(RA>>>26)|0,RA&=67108863,g=Math.imul(v,tA),I=(I=Math.imul(v,eA))+Math.imul(J,tA)|0,E=Math.imul(J,eA),g=g+Math.imul(k,sA)|0,I=(I=I+Math.imul(k,rA)|0)+Math.imul(S,sA)|0,E=E+Math.imul(S,rA)|0;var pA=(e+(g=g+Math.imul(p,nA)|0)|0)+((8191&(I=(I=I+Math.imul(p,aA)|0)+Math.imul(M,nA)|0))<<13)|0;e=((E=E+Math.imul(M,aA)|0)+(I>>>13)|0)+(pA>>>26)|0,pA&=67108863,g=Math.imul(v,sA),I=(I=Math.imul(v,rA))+Math.imul(J,sA)|0,E=Math.imul(J,rA);var MA=(e+(g=g+Math.imul(k,nA)|0)|0)+((8191&(I=(I=I+Math.imul(k,aA)|0)+Math.imul(S,nA)|0))<<13)|0;e=((E=E+Math.imul(S,aA)|0)+(I>>>13)|0)+(MA>>>26)|0,MA&=67108863;var mA=(e+(g=Math.imul(v,nA))|0)+((8191&(I=(I=Math.imul(v,aA))+Math.imul(J,nA)|0))<<13)|0;return e=((E=Math.imul(J,aA))+(I>>>13)|0)+(mA>>>26)|0,mA&=67108863,t[0]=cA,t[1]=yA,t[2]=DA,t[3]=uA,t[4]=fA,t[5]=wA,t[6]=FA,t[7]=dA,t[8]=lA,t[9]=UA,t[10]=NA,t[11]=HA,t[12]=GA,t[13]=YA,t[14]=LA,t[15]=RA,t[16]=pA,t[17]=MA,t[18]=mA,0!==e&&(t[19]=e,Q.length++),Q};function n(A,B,Q){return(new a).mulp(A,B,Q)}function a(A,B){this.x=A,this.y=B}Math.imul||(h=r),E.prototype.mulTo=function(A,B){var Q=this.length+A.length;return 10===this.length&&10===A.length?h(this,A,B):Q<63?r(this,A,B):Q<1024?function(A,B,Q){Q.negative=B.negative^A.negative,Q.length=A.length+B.length;for(var g=0,I=0,E=0;E<Q.length-1;E++){var i=I;I=0;for(var C=67108863&g,t=Math.min(E,B.length-1),e=Math.max(0,E-A.length+1);e<=t;e++){var o=E-e,s=(0|A.words[o])*(0|B.words[e]),r=67108863&s;C=67108863&(r=r+C|0),I+=(i=(i=i+(s/67108864|0)|0)+(r>>>26)|0)>>>26,i&=67108863}Q.words[E]=C,g=i,i=I}return 0!==g?Q.words[E]=g:Q.length--,Q.strip()}(this,A,B):n(this,A,B)},a.prototype.makeRBT=function(A){for(var B=new Array(A),Q=E.prototype._countBits(A)-1,g=0;g<A;g++)B[g]=this.revBin(g,Q,A);return B},a.prototype.revBin=function(A,B,Q){if(0===A||A===Q-1)return A;for(var g=0,I=0;I<B;I++)g|=(1&A)<<B-I-1,A>>=1;return g},a.prototype.permute=function(A,B,Q,g,I,E){for(var i=0;i<E;i++)g[i]=B[A[i]],I[i]=Q[A[i]]},a.prototype.transform=function(A,B,Q,g,I,E){this.permute(E,A,B,Q,g,I);for(var i=1;i<I;i<<=1)for(var C=i<<1,t=Math.cos(2*Math.PI/C),e=Math.sin(2*Math.PI/C),o=0;o<I;o+=C)for(var s=t,r=e,h=0;h<i;h++){var n=Q[o+h],a=g[o+h],c=Q[o+h+i],y=g[o+h+i],D=s*c-r*y;y=s*y+r*c,c=D,Q[o+h]=n+c,g[o+h]=a+y,Q[o+h+i]=n-c,g[o+h+i]=a-y,h!==C&&(D=t*s-e*r,r=t*r+e*s,s=D)}},a.prototype.guessLen13b=function(A,B){var Q=1|Math.max(B,A),g=1&Q,I=0;for(Q=Q/2|0;Q;Q>>>=1)I++;return 1<<I+1+g},a.prototype.conjugate=function(A,B,Q){if(!(Q<=1))for(var g=0;g<Q/2;g++){var I=A[g];A[g]=A[Q-g-1],A[Q-g-1]=I,I=B[g],B[g]=-B[Q-g-1],B[Q-g-1]=-I}},a.prototype.normalize13b=function(A,B){for(var Q=0,g=0;g<B/2;g++){var I=8192*Math.round(A[2*g+1]/B)+Math.round(A[2*g]/B)+Q;A[g]=67108863&I,Q=I<67108864?0:I/67108864|0}return A},a.prototype.convert13b=function(A,B,Q,I){for(var E=0,i=0;i<B;i++)E+=0|A[i],Q[2*i]=8191&E,E>>>=13,Q[2*i+1]=8191&E,E>>>=13;for(i=2*B;i<I;++i)Q[i]=0;g(0===E),g(0==(-8192&E))},a.prototype.stub=function(A){for(var B=new Array(A),Q=0;Q<A;Q++)B[Q]=0;return B},a.prototype.mulp=function(A,B,Q){var g=2*this.guessLen13b(A.length,B.length),I=this.makeRBT(g),E=this.stub(g),i=new Array(g),C=new Array(g),t=new Array(g),e=new Array(g),o=new Array(g),s=new Array(g),r=Q.words;r.length=g,this.convert13b(A.words,A.length,i,g),this.convert13b(B.words,B.length,e,g),this.transform(i,E,C,t,g,I),this.transform(e,E,o,s,g,I);for(var h=0;h<g;h++){var n=C[h]*o[h]-t[h]*s[h];t[h]=C[h]*s[h]+t[h]*o[h],C[h]=n}return this.conjugate(C,t,g),this.transform(C,t,r,E,g,I),this.conjugate(r,E,g),this.normalize13b(r,g),Q.negative=A.negative^B.negative,Q.length=A.length+B.length,Q.strip()},E.prototype.mul=function(A){var B=new E(null);return B.words=new Array(this.length+A.length),this.mulTo(A,B)},E.prototype.mulf=function(A){var B=new E(null);return B.words=new Array(this.length+A.length),n(this,A,B)},E.prototype.imul=function(A){return this.clone().mulTo(A,this)},E.prototype.imuln=function(A){g("number"==typeof A),g(A<67108864);for(var B=0,Q=0;Q<this.length;Q++){var I=(0|this.words[Q])*A,E=(67108863&I)+(67108863&B);B>>=26,B+=I/67108864|0,B+=E>>>26,this.words[Q]=67108863&E}return 0!==B&&(this.words[Q]=B,this.length++),this},E.prototype.muln=function(A){return this.clone().imuln(A)},E.prototype.sqr=function(){return this.mul(this)},E.prototype.isqr=function(){return this.imul(this.clone())},E.prototype.pow=function(A){var B=function(A){for(var B=new Array(A.bitLength()),Q=0;Q<B.length;Q++){var g=Q/26|0,I=Q%26;B[Q]=(A.words[g]&1<<I)>>>I}return B}(A);if(0===B.length)return new E(1);for(var Q=this,g=0;g<B.length&&0===B[g];g++,Q=Q.sqr());if(++g<B.length)for(var I=Q.sqr();g<B.length;g++,I=I.sqr())0!==B[g]&&(Q=Q.mul(I));return Q},E.prototype.iushln=function(A){g("number"==typeof A&&A>=0);var B,Q=A%26,I=(A-Q)/26,E=67108863>>>26-Q<<26-Q;if(0!==Q){var i=0;for(B=0;B<this.length;B++){var C=this.words[B]&E,t=(0|this.words[B])-C<<Q;this.words[B]=t|i,i=C>>>26-Q}i&&(this.words[B]=i,this.length++)}if(0!==I){for(B=this.length-1;B>=0;B--)this.words[B+I]=this.words[B];for(B=0;B<I;B++)this.words[B]=0;this.length+=I}return this.strip()},E.prototype.ishln=function(A){return g(0===this.negative),this.iushln(A)},E.prototype.iushrn=function(A,B,Q){var I;g("number"==typeof A&&A>=0),I=B?(B-B%26)/26:0;var E=A%26,i=Math.min((A-E)/26,this.length),C=67108863^67108863>>>E<<E,t=Q;if(I-=i,I=Math.max(0,I),t){for(var e=0;e<i;e++)t.words[e]=this.words[e];t.length=i}if(0===i);else if(this.length>i)for(this.length-=i,e=0;e<this.length;e++)this.words[e]=this.words[e+i];else this.words[0]=0,this.length=1;var o=0;for(e=this.length-1;e>=0&&(0!==o||e>=I);e--){var s=0|this.words[e];this.words[e]=o<<26-E|s>>>E,o=s&C}return t&&0!==o&&(t.words[t.length++]=o),0===this.length&&(this.words[0]=0,this.length=1),this.strip()},E.prototype.ishrn=function(A,B,Q){return g(0===this.negative),this.iushrn(A,B,Q)},E.prototype.shln=function(A){return this.clone().ishln(A)},E.prototype.ushln=function(A){return this.clone().iushln(A)},E.prototype.shrn=function(A){return this.clone().ishrn(A)},E.prototype.ushrn=function(A){return this.clone().iushrn(A)},E.prototype.testn=function(A){g("number"==typeof A&&A>=0);var B=A%26,Q=(A-B)/26,I=1<<B;return!(this.length<=Q)&&!!(this.words[Q]&I)},E.prototype.imaskn=function(A){g("number"==typeof A&&A>=0);var B=A%26,Q=(A-B)/26;if(g(0===this.negative,"imaskn works only with positive numbers"),this.length<=Q)return this;if(0!==B&&Q++,this.length=Math.min(Q,this.length),0!==B){var I=67108863^67108863>>>B<<B;this.words[this.length-1]&=I}return this.strip()},E.prototype.maskn=function(A){return this.clone().imaskn(A)},E.prototype.iaddn=function(A){return g("number"==typeof A),g(A<67108864),A<0?this.isubn(-A):0!==this.negative?1===this.length&&(0|this.words[0])<A?(this.words[0]=A-(0|this.words[0]),this.negative=0,this):(this.negative=0,this.isubn(A),this.negative=1,this):this._iaddn(A)},E.prototype._iaddn=function(A){this.words[0]+=A;for(var B=0;B<this.length&&this.words[B]>=67108864;B++)this.words[B]-=67108864,B===this.length-1?this.words[B+1]=1:this.words[B+1]++;return this.length=Math.max(this.length,B+1),this},E.prototype.isubn=function(A){if(g("number"==typeof A),g(A<67108864),A<0)return this.iaddn(-A);if(0!==this.negative)return this.negative=0,this.iaddn(A),this.negative=1,this;if(this.words[0]-=A,1===this.length&&this.words[0]<0)this.words[0]=-this.words[0],this.negative=1;else for(var B=0;B<this.length&&this.words[B]<0;B++)this.words[B]+=67108864,this.words[B+1]-=1;return this.strip()},E.prototype.addn=function(A){return this.clone().iaddn(A)},E.prototype.subn=function(A){return this.clone().isubn(A)},E.prototype.iabs=function(){return this.negative=0,this},E.prototype.abs=function(){return this.clone().iabs()},E.prototype._ishlnsubmul=function(A,B,Q){var I,E,i=A.length+Q;this._expand(i);var C=0;for(I=0;I<A.length;I++){E=(0|this.words[I+Q])+C;var t=(0|A.words[I])*B;C=((E-=67108863&t)>>26)-(t/67108864|0),this.words[I+Q]=67108863&E}for(;I<this.length-Q;I++)C=(E=(0|this.words[I+Q])+C)>>26,this.words[I+Q]=67108863&E;if(0===C)return this.strip();for(g(-1===C),C=0,I=0;I<this.length;I++)C=(E=-(0|this.words[I])+C)>>26,this.words[I]=67108863&E;return this.negative=1,this.strip()},E.prototype._wordDiv=function(A,B){var Q=(this.length,A.length),g=this.clone(),I=A,i=0|I.words[I.length-1];0!==(Q=26-this._countBits(i))&&(I=I.ushln(Q),g.iushln(Q),i=0|I.words[I.length-1]);var C,t=g.length-I.length;if("mod"!==B){(C=new E(null)).length=t+1,C.words=new Array(C.length);for(var e=0;e<C.length;e++)C.words[e]=0}var o=g.clone()._ishlnsubmul(I,1,t);0===o.negative&&(g=o,C&&(C.words[t]=1));for(var s=t-1;s>=0;s--){var r=67108864*(0|g.words[I.length+s])+(0|g.words[I.length+s-1]);for(r=Math.min(r/i|0,67108863),g._ishlnsubmul(I,r,s);0!==g.negative;)r--,g.negative=0,g._ishlnsubmul(I,1,s),g.isZero()||(g.negative^=1);C&&(C.words[s]=r)}return C&&C.strip(),g.strip(),"div"!==B&&0!==Q&&g.iushrn(Q),{div:C||null,mod:g}},E.prototype.divmod=function(A,B,Q){return g(!A.isZero()),this.isZero()?{div:new E(0),mod:new E(0)}:0!==this.negative&&0===A.negative?(C=this.neg().divmod(A,B),"mod"!==B&&(I=C.div.neg()),"div"!==B&&(i=C.mod.neg(),Q&&0!==i.negative&&i.iadd(A)),{div:I,mod:i}):0===this.negative&&0!==A.negative?(C=this.divmod(A.neg(),B),"mod"!==B&&(I=C.div.neg()),{div:I,mod:C.mod}):0!=(this.negative&A.negative)?(C=this.neg().divmod(A.neg(),B),"div"!==B&&(i=C.mod.neg(),Q&&0!==i.negative&&i.isub(A)),{div:C.div,mod:i}):A.length>this.length||this.cmp(A)<0?{div:new E(0),mod:this}:1===A.length?"div"===B?{div:this.divn(A.words[0]),mod:null}:"mod"===B?{div:null,mod:new E(this.modn(A.words[0]))}:{div:this.divn(A.words[0]),mod:new E(this.modn(A.words[0]))}:this._wordDiv(A,B);var I,i,C},E.prototype.div=function(A){return this.divmod(A,"div",!1).div},E.prototype.mod=function(A){return this.divmod(A,"mod",!1).mod},E.prototype.umod=function(A){return this.divmod(A,"mod",!0).mod},E.prototype.divRound=function(A){var B=this.divmod(A);if(B.mod.isZero())return B.div;var Q=0!==B.div.negative?B.mod.isub(A):B.mod,g=A.ushrn(1),I=A.andln(1),E=Q.cmp(g);return E<0||1===I&&0===E?B.div:0!==B.div.negative?B.div.isubn(1):B.div.iaddn(1)},E.prototype.modn=function(A){g(A<=67108863);for(var B=(1<<26)%A,Q=0,I=this.length-1;I>=0;I--)Q=(B*Q+(0|this.words[I]))%A;return Q},E.prototype.idivn=function(A){g(A<=67108863);for(var B=0,Q=this.length-1;Q>=0;Q--){var I=(0|this.words[Q])+67108864*B;this.words[Q]=I/A|0,B=I%A}return this.strip()},E.prototype.divn=function(A){return this.clone().idivn(A)},E.prototype.egcd=function(A){g(0===A.negative),g(!A.isZero());var B=this,Q=A.clone();B=0!==B.negative?B.umod(A):B.clone();for(var I=new E(1),i=new E(0),C=new E(0),t=new E(1),e=0;B.isEven()&&Q.isEven();)B.iushrn(1),Q.iushrn(1),++e;for(var o=Q.clone(),s=B.clone();!B.isZero();){for(var r=0,h=1;0==(B.words[0]&h)&&r<26;++r,h<<=1);if(r>0)for(B.iushrn(r);r-- >0;)(I.isOdd()||i.isOdd())&&(I.iadd(o),i.isub(s)),I.iushrn(1),i.iushrn(1);for(var n=0,a=1;0==(Q.words[0]&a)&&n<26;++n,a<<=1);if(n>0)for(Q.iushrn(n);n-- >0;)(C.isOdd()||t.isOdd())&&(C.iadd(o),t.isub(s)),C.iushrn(1),t.iushrn(1);B.cmp(Q)>=0?(B.isub(Q),I.isub(C),i.isub(t)):(Q.isub(B),C.isub(I),t.isub(i))}return{a:C,b:t,gcd:Q.iushln(e)}},E.prototype._invmp=function(A){g(0===A.negative),g(!A.isZero());var B=this,Q=A.clone();B=0!==B.negative?B.umod(A):B.clone();for(var I,i=new E(1),C=new E(0),t=Q.clone();B.cmpn(1)>0&&Q.cmpn(1)>0;){for(var e=0,o=1;0==(B.words[0]&o)&&e<26;++e,o<<=1);if(e>0)for(B.iushrn(e);e-- >0;)i.isOdd()&&i.iadd(t),i.iushrn(1);for(var s=0,r=1;0==(Q.words[0]&r)&&s<26;++s,r<<=1);if(s>0)for(Q.iushrn(s);s-- >0;)C.isOdd()&&C.iadd(t),C.iushrn(1);B.cmp(Q)>=0?(B.isub(Q),i.isub(C)):(Q.isub(B),C.isub(i))}return(I=0===B.cmpn(1)?i:C).cmpn(0)<0&&I.iadd(A),I},E.prototype.gcd=function(A){if(this.isZero())return A.abs();if(A.isZero())return this.abs();var B=this.clone(),Q=A.clone();B.negative=0,Q.negative=0;for(var g=0;B.isEven()&&Q.isEven();g++)B.iushrn(1),Q.iushrn(1);for(;;){for(;B.isEven();)B.iushrn(1);for(;Q.isEven();)Q.iushrn(1);var I=B.cmp(Q);if(I<0){var E=B;B=Q,Q=E}else if(0===I||0===Q.cmpn(1))break;B.isub(Q)}return Q.iushln(g)},E.prototype.invm=function(A){return this.egcd(A).a.umod(A)},E.prototype.isEven=function(){return 0==(1&this.words[0])},E.prototype.isOdd=function(){return 1==(1&this.words[0])},E.prototype.andln=function(A){return this.words[0]&A},E.prototype.bincn=function(A){g("number"==typeof A);var B=A%26,Q=(A-B)/26,I=1<<B;if(this.length<=Q)return this._expand(Q+1),this.words[Q]|=I,this;for(var E=I,i=Q;0!==E&&i<this.length;i++){var C=0|this.words[i];E=(C+=E)>>>26,C&=67108863,this.words[i]=C}return 0!==E&&(this.words[i]=E,this.length++),this},E.prototype.isZero=function(){return 1===this.length&&0===this.words[0]},E.prototype.cmpn=function(A){var B,Q=A<0;if(0!==this.negative&&!Q)return-1;if(0===this.negative&&Q)return 1;if(this.strip(),this.length>1)B=1;else{Q&&(A=-A),g(A<=67108863,"Number is too big");var I=0|this.words[0];B=I===A?0:I<A?-1:1}return 0!==this.negative?0|-B:B},E.prototype.cmp=function(A){if(0!==this.negative&&0===A.negative)return-1;if(0===this.negative&&0!==A.negative)return 1;var B=this.ucmp(A);return 0!==this.negative?0|-B:B},E.prototype.ucmp=function(A){if(this.length>A.length)return 1;if(this.length<A.length)return-1;for(var B=0,Q=this.length-1;Q>=0;Q--){var g=0|this.words[Q],I=0|A.words[Q];if(g!==I){g<I?B=-1:g>I&&(B=1);break}}return B},E.prototype.gtn=function(A){return 1===this.cmpn(A)},E.prototype.gt=function(A){return 1===this.cmp(A)},E.prototype.gten=function(A){return this.cmpn(A)>=0},E.prototype.gte=function(A){return this.cmp(A)>=0},E.prototype.ltn=function(A){return-1===this.cmpn(A)},E.prototype.lt=function(A){return-1===this.cmp(A)},E.prototype.lten=function(A){return this.cmpn(A)<=0},E.prototype.lte=function(A){return this.cmp(A)<=0},E.prototype.eqn=function(A){return 0===this.cmpn(A)},E.prototype.eq=function(A){return 0===this.cmp(A)},E.red=function(A){return new F(A)},E.prototype.toRed=function(A){return g(!this.red,"Already a number in reduction context"),g(0===this.negative,"red works only with positives"),A.convertTo(this)._forceRed(A)},E.prototype.fromRed=function(){return g(this.red,"fromRed works only with numbers in reduction context"),this.red.convertFrom(this)},E.prototype._forceRed=function(A){return this.red=A,this},E.prototype.forceRed=function(A){return g(!this.red,"Already a number in reduction context"),this._forceRed(A)},E.prototype.redAdd=function(A){return g(this.red,"redAdd works only with red numbers"),this.red.add(this,A)},E.prototype.redIAdd=function(A){return g(this.red,"redIAdd works only with red numbers"),this.red.iadd(this,A)},E.prototype.redSub=function(A){return g(this.red,"redSub works only with red numbers"),this.red.sub(this,A)},E.prototype.redISub=function(A){return g(this.red,"redISub works only with red numbers"),this.red.isub(this,A)},E.prototype.redShl=function(A){return g(this.red,"redShl works only with red numbers"),this.red.shl(this,A)},E.prototype.redMul=function(A){return g(this.red,"redMul works only with red numbers"),this.red._verify2(this,A),this.red.mul(this,A)},E.prototype.redIMul=function(A){return g(this.red,"redMul works only with red numbers"),this.red._verify2(this,A),this.red.imul(this,A)},E.prototype.redSqr=function(){return g(this.red,"redSqr works only with red numbers"),this.red._verify1(this),this.red.sqr(this)},E.prototype.redISqr=function(){return g(this.red,"redISqr works only with red numbers"),this.red._verify1(this),this.red.isqr(this)},E.prototype.redSqrt=function(){return g(this.red,"redSqrt works only with red numbers"),this.red._verify1(this),this.red.sqrt(this)},E.prototype.redInvm=function(){return g(this.red,"redInvm works only with red numbers"),this.red._verify1(this),this.red.invm(this)},E.prototype.redNeg=function(){return g(this.red,"redNeg works only with red numbers"),this.red._verify1(this),this.red.neg(this)},E.prototype.redPow=function(A){return g(this.red&&!A.red,"redPow(normalNum)"),this.red._verify1(this),this.red.pow(this,A)};var c={k256:null,p224:null,p192:null,p25519:null};function y(A,B){this.name=A,this.p=new E(B,16),this.n=this.p.bitLength(),this.k=new E(1).iushln(this.n).isub(this.p),this.tmp=this._tmp()}function D(){y.call(this,"k256","ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f")}function u(){y.call(this,"p224","ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001")}function f(){y.call(this,"p192","ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff")}function w(){y.call(this,"25519","7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed")}function F(A){if("string"==typeof A){var B=E._prime(A);this.m=B.p,this.prime=B}else g(A.gtn(1),"modulus must be greater than 1"),this.m=A,this.prime=null}function d(A){F.call(this,A),this.shift=this.m.bitLength(),this.shift%26!=0&&(this.shift+=26-this.shift%26),this.r=new E(1).iushln(this.shift),this.r2=this.imod(this.r.sqr()),this.rinv=this.r._invmp(this.m),this.minv=this.rinv.mul(this.r).isubn(1).div(this.m),this.minv=this.minv.umod(this.r),this.minv=this.r.sub(this.minv)}y.prototype._tmp=function(){var A=new E(null);return A.words=new Array(Math.ceil(this.n/13)),A},y.prototype.ireduce=function(A){var B,Q=A;do{this.split(Q,this.tmp),B=(Q=(Q=this.imulK(Q)).iadd(this.tmp)).bitLength()}while(B>this.n);var g=B<this.n?-1:Q.ucmp(this.p);return 0===g?(Q.words[0]=0,Q.length=1):g>0?Q.isub(this.p):Q.strip(),Q},y.prototype.split=function(A,B){A.iushrn(this.n,0,B)},y.prototype.imulK=function(A){return A.imul(this.k)},I(D,y),D.prototype.split=function(A,B){for(var Q=Math.min(A.length,9),g=0;g<Q;g++)B.words[g]=A.words[g];if(B.length=Q,A.length<=9)return A.words[0]=0,void(A.length=1);var I=A.words[9];for(B.words[B.length++]=4194303&I,g=10;g<A.length;g++){var E=0|A.words[g];A.words[g-10]=(4194303&E)<<4|I>>>22,I=E}I>>>=22,A.words[g-10]=I,0===I&&A.length>10?A.length-=10:A.length-=9},D.prototype.imulK=function(A){A.words[A.length]=0,A.words[A.length+1]=0,A.length+=2;for(var B=0,Q=0;Q<A.length;Q++){var g=0|A.words[Q];B+=977*g,A.words[Q]=67108863&B,B=64*g+(B/67108864|0)}return 0===A.words[A.length-1]&&(A.length--,0===A.words[A.length-1]&&A.length--),A},I(u,y),I(f,y),I(w,y),w.prototype.imulK=function(A){for(var B=0,Q=0;Q<A.length;Q++){var g=19*(0|A.words[Q])+B,I=67108863&g;g>>>=26,A.words[Q]=I,B=g}return 0!==B&&(A.words[A.length++]=B),A},E._prime=function(A){if(c[A])return c[A];var B;if("k256"===A)B=new D;else if("p224"===A)B=new u;else if("p192"===A)B=new f;else{if("p25519"!==A)throw new Error("Unknown prime "+A);B=new w}return c[A]=B,B},F.prototype._verify1=function(A){g(0===A.negative,"red works only with positives"),g(A.red,"red works only with red numbers")},F.prototype._verify2=function(A,B){g(0==(A.negative|B.negative),"red works only with positives"),g(A.red&&A.red===B.red,"red works only with red numbers")},F.prototype.imod=function(A){return this.prime?this.prime.ireduce(A)._forceRed(this):A.umod(this.m)._forceRed(this)},F.prototype.neg=function(A){return A.isZero()?A.clone():this.m.sub(A)._forceRed(this)},F.prototype.add=function(A,B){this._verify2(A,B);var Q=A.add(B);return Q.cmp(this.m)>=0&&Q.isub(this.m),Q._forceRed(this)},F.prototype.iadd=function(A,B){this._verify2(A,B);var Q=A.iadd(B);return Q.cmp(this.m)>=0&&Q.isub(this.m),Q},F.prototype.sub=function(A,B){this._verify2(A,B);var Q=A.sub(B);return Q.cmpn(0)<0&&Q.iadd(this.m),Q._forceRed(this)},F.prototype.isub=function(A,B){this._verify2(A,B);var Q=A.isub(B);return Q.cmpn(0)<0&&Q.iadd(this.m),Q},F.prototype.shl=function(A,B){return this._verify1(A),this.imod(A.ushln(B))},F.prototype.imul=function(A,B){return this._verify2(A,B),this.imod(A.imul(B))},F.prototype.mul=function(A,B){return this._verify2(A,B),this.imod(A.mul(B))},F.prototype.isqr=function(A){return this.imul(A,A.clone())},F.prototype.sqr=function(A){return this.mul(A,A)},F.prototype.sqrt=function(A){if(A.isZero())return A.clone();var B=this.m.andln(3);if(g(B%2==1),3===B){var Q=this.m.add(new E(1)).iushrn(2);return this.pow(A,Q)}for(var I=this.m.subn(1),i=0;!I.isZero()&&0===I.andln(1);)i++,I.iushrn(1);g(!I.isZero());var C=new E(1).toRed(this),t=C.redNeg(),e=this.m.subn(1).iushrn(1),o=this.m.bitLength();for(o=new E(2*o*o).toRed(this);0!==this.pow(o,e).cmp(t);)o.redIAdd(t);for(var s=this.pow(o,I),r=this.pow(A,I.addn(1).iushrn(1)),h=this.pow(A,I),n=i;0!==h.cmp(C);){for(var a=h,c=0;0!==a.cmp(C);c++)a=a.redSqr();g(c<n);var y=this.pow(s,new E(1).iushln(n-c-1));r=r.redMul(y),s=y.redSqr(),h=h.redMul(s),n=c}return r},F.prototype.invm=function(A){var B=A._invmp(this.m);return 0!==B.negative?(B.negative=0,this.imod(B).redNeg()):this.imod(B)},F.prototype.pow=function(A,B){if(B.isZero())return new E(1).toRed(this);if(0===B.cmpn(1))return A.clone();var Q=new Array(16);Q[0]=new E(1).toRed(this),Q[1]=A;for(var g=2;g<Q.length;g++)Q[g]=this.mul(Q[g-1],A);var I=Q[0],i=0,C=0,t=B.bitLength()%26;for(0===t&&(t=26),g=B.length-1;g>=0;g--){for(var e=B.words[g],o=t-1;o>=0;o--){var s=e>>o&1;I!==Q[0]&&(I=this.sqr(I)),0!==s||0!==i?(i<<=1,i|=s,(4===++C||0===g&&0===o)&&(I=this.mul(I,Q[i]),C=0,i=0)):C=0}t=26}return I},F.prototype.convertTo=function(A){var B=A.umod(this.m);return B===A?B.clone():B},F.prototype.convertFrom=function(A){var B=A.clone();return B.red=null,B},E.mont=function(A){return new d(A)},I(d,F),d.prototype.convertTo=function(A){return this.imod(A.ushln(this.shift))},d.prototype.convertFrom=function(A){var B=this.imod(A.mul(this.rinv));return B.red=null,B},d.prototype.imul=function(A,B){if(A.isZero()||B.isZero())return A.words[0]=0,A.length=1,A;var Q=A.imul(B),g=Q.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m),I=Q.isub(g).iushrn(this.shift),E=I;return I.cmp(this.m)>=0?E=I.isub(this.m):I.cmpn(0)<0&&(E=I.iadd(this.m)),E._forceRed(this)},d.prototype.mul=function(A,B){if(A.isZero()||B.isZero())return new E(0)._forceRed(this);var Q=A.mul(B),g=Q.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m),I=Q.isub(g).iushrn(this.shift),i=I;return I.cmp(this.m)>=0?i=I.isub(this.m):I.cmpn(0)<0&&(i=I.iadd(this.m)),i._forceRed(this)},d.prototype.invm=function(A){return this.imod(A._invmp(this.m).mul(this.r2))._forceRed(this)}}(A,this)}).call(this,Q(10)(A))},function(A,B){},function(A,B,Q){B.publicEncrypt=Q(207),B.privateDecrypt=Q(209),B.privateEncrypt=function(A,Q){return B.publicEncrypt(A,Q,!0)},B.publicDecrypt=function(A,Q){return B.privateDecrypt(A,Q,!0)}},function(A,B,Q){var g=Q(30),I=Q(14),E=Q(20),i=Q(97),C=Q(98),t=Q(47),e=Q(99),o=Q(43),s=Q(1).Buffer;A.exports=function(A,B,Q){var r;r=A.padding?A.padding:Q?1:4;var h,n=g(A);if(4===r)h=function(A,B){var Q=A.modulus.byteLength(),g=B.length,e=E("sha1").update(s.alloc(0)).digest(),o=e.length,r=2*o;if(g>Q-r-2)throw new Error("message too long");var h=s.alloc(Q-g-r-2),n=Q-o-1,a=I(o),c=C(s.concat([e,h,s.alloc(1,1),B],n),i(a,n)),y=C(a,i(c,o));return new t(s.concat([s.alloc(1),y,c],Q))}(n,B);else if(1===r)h=function(A,B,Q){var g,E=B.length,i=A.modulus.byteLength();if(E>i-11)throw new Error("message too long");g=Q?s.alloc(i-E-3,255):function(A){var B,Q=s.allocUnsafe(A),g=0,E=I(2*A),i=0;for(;g<A;)i===E.length&&(E=I(2*A),i=0),(B=E[i++])&&(Q[g++]=B);return Q}(i-E-3);return new t(s.concat([s.from([0,Q?1:2]),g,s.alloc(1),B],i))}(n,B,Q);else{if(3!==r)throw new Error("unknown padding");if((h=new t(B)).cmp(n.modulus)>=0)throw new Error("data too long for modulus")}return Q?o(h,n):e(h,n)}},function(A,B){},function(A,B,Q){var g=Q(30),I=Q(97),E=Q(98),i=Q(47),C=Q(43),t=Q(20),e=Q(99),o=Q(1).Buffer;A.exports=function(A,B,Q){var s;s=A.padding?A.padding:Q?1:4;var r,h=g(A),n=h.modulus.byteLength();if(B.length>n||new i(B).cmp(h.modulus)>=0)throw new Error("decryption error");r=Q?e(new i(B),h):C(B,h);var a=o.alloc(n-r.length);if(r=o.concat([a,r],n),4===s)return function(A,B){var Q=A.modulus.byteLength(),g=t("sha1").update(o.alloc(0)).digest(),i=g.length;if(0!==B[0])throw new Error("decryption error");var C=B.slice(1,i+1),e=B.slice(i+1),s=E(C,I(e,i)),r=E(e,I(s,Q-i-1));if(function(A,B){A=o.from(A),B=o.from(B);var Q=0,g=A.length;A.length!==B.length&&(Q++,g=Math.min(A.length,B.length));var I=-1;for(;++I<g;)Q+=A[I]^B[I];return Q}(g,r.slice(0,i)))throw new Error("decryption error");var h=i;for(;0===r[h];)h++;if(1!==r[h++])throw new Error("decryption error");return r.slice(h)}(h,r);if(1===s)return function(A,B,Q){var g=B.slice(0,2),I=2,E=0;for(;0!==B[I++];)if(I>=B.length){E++;break}var i=B.slice(2,I-1);("0002"!==g.toString("hex")&&!Q||"0001"!==g.toString("hex")&&Q)&&E++;i.length<8&&E++;if(E)throw new Error("decryption error");return B.slice(I)}(0,r,Q);if(3===s)return r;throw new Error("unknown padding")}},function(A,B,Q){"use strict";(function(A,g){function I(){throw new Error("secure random number generation not supported by this browser\nuse chrome, FireFox or Internet Explorer 11")}var E=Q(1),i=Q(14),C=E.Buffer,t=E.kMaxLength,e=A.crypto||A.msCrypto,o=Math.pow(2,32)-1;function s(A,B){if("number"!=typeof A||A!=A)throw new TypeError("offset must be a number");if(A>o||A<0)throw new TypeError("offset must be a uint32");if(A>t||A>B)throw new RangeError("offset out of range")}function r(A,B,Q){if("number"!=typeof A||A!=A)throw new TypeError("size must be a number");if(A>o||A<0)throw new TypeError("size must be a uint32");if(A+B>Q||A>t)throw new RangeError("buffer too small")}function h(A,B,Q,I){if(g.browser){var E=A.buffer,C=new Uint8Array(E,B,Q);return e.getRandomValues(C),I?void g.nextTick((function(){I(null,A)})):A}if(!I)return i(Q).copy(A,B),A;i(Q,(function(Q,g){if(Q)return I(Q);g.copy(A,B),I(null,A)}))}e&&e.getRandomValues||!g.browser?(B.randomFill=function(B,Q,g,I){if(!(C.isBuffer(B)||B instanceof A.Uint8Array))throw new TypeError('"buf" argument must be a Buffer or Uint8Array');if("function"==typeof Q)I=Q,Q=0,g=B.length;else if("function"==typeof g)I=g,g=B.length-Q;else if("function"!=typeof I)throw new TypeError('"cb" argument must be a function');return s(Q,B.length),r(g,Q,B.length),h(B,Q,g,I)},B.randomFillSync=function(B,Q,g){void 0===Q&&(Q=0);if(!(C.isBuffer(B)||B instanceof A.Uint8Array))throw new TypeError('"buf" argument must be a Buffer or Uint8Array');s(Q,B.length),void 0===g&&(g=B.length-Q);return r(g,Q,B.length),h(B,Q,g)}):(B.randomFill=I,B.randomFillSync=I)}).call(this,Q(4),Q(3))}]);
//# sourceMappingURL=h264-mp4-encoder.web.js.map

// ---------- END build/h264-mp4-encoder.web.js ------

// ---------- jszip/jszip.min.js ----------
/*!

JSZip v3.5.0 - A JavaScript class for generating and reading zip files
<http://stuartk.com/jszip>

(c) 2009-2016 Stuart Knightley <stuart [at] stuartk.com>
Dual licenced under the MIT license or GPLv3. See https://raw.github.com/Stuk/jszip/master/LICENSE.markdown.

JSZip uses the library pako released under the MIT license :
https://github.com/nodeca/pako/blob/master/LICENSE
*/

!function(t){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{("undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this).JSZip=t()}}(function(){return function s(a,o,h){function u(r,t){if(!o[r]){if(!a[r]){var e="function"==typeof require&&require;if(!t&&e)return e(r,!0);if(l)return l(r,!0);var i=new Error("Cannot find module '"+r+"'");throw i.code="MODULE_NOT_FOUND",i}var n=o[r]={exports:{}};a[r][0].call(n.exports,function(t){var e=a[r][1][t];return u(e||t)},n,n.exports,s,a,o,h)}return o[r].exports}for(var l="function"==typeof require&&require,t=0;t<h.length;t++)u(h[t]);return u}({1:[function(t,e,r){"use strict";var c=t("./utils"),d=t("./support"),p="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";r.encode=function(t){for(var e,r,i,n,s,a,o,h=[],u=0,l=t.length,f=l,d="string"!==c.getTypeOf(t);u<t.length;)f=l-u,i=d?(e=t[u++],r=u<l?t[u++]:0,u<l?t[u++]:0):(e=t.charCodeAt(u++),r=u<l?t.charCodeAt(u++):0,u<l?t.charCodeAt(u++):0),n=e>>2,s=(3&e)<<4|r>>4,a=1<f?(15&r)<<2|i>>6:64,o=2<f?63&i:64,h.push(p.charAt(n)+p.charAt(s)+p.charAt(a)+p.charAt(o));return h.join("")},r.decode=function(t){var e,r,i,n,s,a,o=0,h=0,u="data:";if(t.substr(0,u.length)===u)throw new Error("Invalid base64 input, it looks like a data url.");var l,f=3*(t=t.replace(/[^A-Za-z0-9\+\/\=]/g,"")).length/4;if(t.charAt(t.length-1)===p.charAt(64)&&f--,t.charAt(t.length-2)===p.charAt(64)&&f--,f%1!=0)throw new Error("Invalid base64 input, bad content length.");for(l=d.uint8array?new Uint8Array(0|f):new Array(0|f);o<t.length;)e=p.indexOf(t.charAt(o++))<<2|(n=p.indexOf(t.charAt(o++)))>>4,r=(15&n)<<4|(s=p.indexOf(t.charAt(o++)))>>2,i=(3&s)<<6|(a=p.indexOf(t.charAt(o++))),l[h++]=e,64!==s&&(l[h++]=r),64!==a&&(l[h++]=i);return l}},{"./support":30,"./utils":32}],2:[function(t,e,r){"use strict";var i=t("./external"),n=t("./stream/DataWorker"),s=t("./stream/DataLengthProbe"),a=t("./stream/Crc32Probe");s=t("./stream/DataLengthProbe");function o(t,e,r,i,n){this.compressedSize=t,this.uncompressedSize=e,this.crc32=r,this.compression=i,this.compressedContent=n}o.prototype={getContentWorker:function(){var t=new n(i.Promise.resolve(this.compressedContent)).pipe(this.compression.uncompressWorker()).pipe(new s("data_length")),e=this;return t.on("end",function(){if(this.streamInfo.data_length!==e.uncompressedSize)throw new Error("Bug : uncompressed data size mismatch")}),t},getCompressedWorker:function(){return new n(i.Promise.resolve(this.compressedContent)).withStreamInfo("compressedSize",this.compressedSize).withStreamInfo("uncompressedSize",this.uncompressedSize).withStreamInfo("crc32",this.crc32).withStreamInfo("compression",this.compression)}},o.createWorkerFrom=function(t,e,r){return t.pipe(new a).pipe(new s("uncompressedSize")).pipe(e.compressWorker(r)).pipe(new s("compressedSize")).withStreamInfo("compression",e)},e.exports=o},{"./external":6,"./stream/Crc32Probe":25,"./stream/DataLengthProbe":26,"./stream/DataWorker":27}],3:[function(t,e,r){"use strict";var i=t("./stream/GenericWorker");r.STORE={magic:"\0\0",compressWorker:function(t){return new i("STORE compression")},uncompressWorker:function(){return new i("STORE decompression")}},r.DEFLATE=t("./flate")},{"./flate":7,"./stream/GenericWorker":28}],4:[function(t,e,r){"use strict";var i=t("./utils");var o=function(){for(var t,e=[],r=0;r<256;r++){t=r;for(var i=0;i<8;i++)t=1&t?3988292384^t>>>1:t>>>1;e[r]=t}return e}();e.exports=function(t,e){return void 0!==t&&t.length?"string"!==i.getTypeOf(t)?function(t,e,r,i){var n=o,s=i+r;t^=-1;for(var a=i;a<s;a++)t=t>>>8^n[255&(t^e[a])];return-1^t}(0|e,t,t.length,0):function(t,e,r,i){var n=o,s=i+r;t^=-1;for(var a=i;a<s;a++)t=t>>>8^n[255&(t^e.charCodeAt(a))];return-1^t}(0|e,t,t.length,0):0}},{"./utils":32}],5:[function(t,e,r){"use strict";r.base64=!1,r.binary=!1,r.dir=!1,r.createFolders=!0,r.date=null,r.compression=null,r.compressionOptions=null,r.comment=null,r.unixPermissions=null,r.dosPermissions=null},{}],6:[function(t,e,r){"use strict";var i=null;i="undefined"!=typeof Promise?Promise:t("lie"),e.exports={Promise:i}},{lie:37}],7:[function(t,e,r){"use strict";var i="undefined"!=typeof Uint8Array&&"undefined"!=typeof Uint16Array&&"undefined"!=typeof Uint32Array,n=t("pako"),s=t("./utils"),a=t("./stream/GenericWorker"),o=i?"uint8array":"array";function h(t,e){a.call(this,"FlateWorker/"+t),this._pako=null,this._pakoAction=t,this._pakoOptions=e,this.meta={}}r.magic="\b\0",s.inherits(h,a),h.prototype.processChunk=function(t){this.meta=t.meta,null===this._pako&&this._createPako(),this._pako.push(s.transformTo(o,t.data),!1)},h.prototype.flush=function(){a.prototype.flush.call(this),null===this._pako&&this._createPako(),this._pako.push([],!0)},h.prototype.cleanUp=function(){a.prototype.cleanUp.call(this),this._pako=null},h.prototype._createPako=function(){this._pako=new n[this._pakoAction]({raw:!0,level:this._pakoOptions.level||-1});var e=this;this._pako.onData=function(t){e.push({data:t,meta:e.meta})}},r.compressWorker=function(t){return new h("Deflate",t)},r.uncompressWorker=function(){return new h("Inflate",{})}},{"./stream/GenericWorker":28,"./utils":32,pako:38}],8:[function(t,e,r){"use strict";function A(t,e){var r,i="";for(r=0;r<e;r++)i+=String.fromCharCode(255&t),t>>>=8;return i}function i(t,e,r,i,n,s){var a,o,h=t.file,u=t.compression,l=s!==O.utf8encode,f=I.transformTo("string",s(h.name)),d=I.transformTo("string",O.utf8encode(h.name)),c=h.comment,p=I.transformTo("string",s(c)),m=I.transformTo("string",O.utf8encode(c)),_=d.length!==h.name.length,g=m.length!==c.length,b="",v="",y="",w=h.dir,k=h.date,x={crc32:0,compressedSize:0,uncompressedSize:0};e&&!r||(x.crc32=t.crc32,x.compressedSize=t.compressedSize,x.uncompressedSize=t.uncompressedSize);var S=0;e&&(S|=8),l||!_&&!g||(S|=2048);var z=0,C=0;w&&(z|=16),"UNIX"===n?(C=798,z|=function(t,e){var r=t;return t||(r=e?16893:33204),(65535&r)<<16}(h.unixPermissions,w)):(C=20,z|=function(t){return 63&(t||0)}(h.dosPermissions)),a=k.getUTCHours(),a<<=6,a|=k.getUTCMinutes(),a<<=5,a|=k.getUTCSeconds()/2,o=k.getUTCFullYear()-1980,o<<=4,o|=k.getUTCMonth()+1,o<<=5,o|=k.getUTCDate(),_&&(v=A(1,1)+A(B(f),4)+d,b+="up"+A(v.length,2)+v),g&&(y=A(1,1)+A(B(p),4)+m,b+="uc"+A(y.length,2)+y);var E="";return E+="\n\0",E+=A(S,2),E+=u.magic,E+=A(a,2),E+=A(o,2),E+=A(x.crc32,4),E+=A(x.compressedSize,4),E+=A(x.uncompressedSize,4),E+=A(f.length,2),E+=A(b.length,2),{fileRecord:R.LOCAL_FILE_HEADER+E+f+b,dirRecord:R.CENTRAL_FILE_HEADER+A(C,2)+E+A(p.length,2)+"\0\0\0\0"+A(z,4)+A(i,4)+f+b+p}}var I=t("../utils"),n=t("../stream/GenericWorker"),O=t("../utf8"),B=t("../crc32"),R=t("../signature");function s(t,e,r,i){n.call(this,"ZipFileWorker"),this.bytesWritten=0,this.zipComment=e,this.zipPlatform=r,this.encodeFileName=i,this.streamFiles=t,this.accumulate=!1,this.contentBuffer=[],this.dirRecords=[],this.currentSourceOffset=0,this.entriesCount=0,this.currentFile=null,this._sources=[]}I.inherits(s,n),s.prototype.push=function(t){var e=t.meta.percent||0,r=this.entriesCount,i=this._sources.length;this.accumulate?this.contentBuffer.push(t):(this.bytesWritten+=t.data.length,n.prototype.push.call(this,{data:t.data,meta:{currentFile:this.currentFile,percent:r?(e+100*(r-i-1))/r:100}}))},s.prototype.openedSource=function(t){this.currentSourceOffset=this.bytesWritten,this.currentFile=t.file.name;var e=this.streamFiles&&!t.file.dir;if(e){var r=i(t,e,!1,this.currentSourceOffset,this.zipPlatform,this.encodeFileName);this.push({data:r.fileRecord,meta:{percent:0}})}else this.accumulate=!0},s.prototype.closedSource=function(t){this.accumulate=!1;var e=this.streamFiles&&!t.file.dir,r=i(t,e,!0,this.currentSourceOffset,this.zipPlatform,this.encodeFileName);if(this.dirRecords.push(r.dirRecord),e)this.push({data:function(t){return R.DATA_DESCRIPTOR+A(t.crc32,4)+A(t.compressedSize,4)+A(t.uncompressedSize,4)}(t),meta:{percent:100}});else for(this.push({data:r.fileRecord,meta:{percent:0}});this.contentBuffer.length;)this.push(this.contentBuffer.shift());this.currentFile=null},s.prototype.flush=function(){for(var t=this.bytesWritten,e=0;e<this.dirRecords.length;e++)this.push({data:this.dirRecords[e],meta:{percent:100}});var r=this.bytesWritten-t,i=function(t,e,r,i,n){var s=I.transformTo("string",n(i));return R.CENTRAL_DIRECTORY_END+"\0\0\0\0"+A(t,2)+A(t,2)+A(e,4)+A(r,4)+A(s.length,2)+s}(this.dirRecords.length,r,t,this.zipComment,this.encodeFileName);this.push({data:i,meta:{percent:100}})},s.prototype.prepareNextSource=function(){this.previous=this._sources.shift(),this.openedSource(this.previous.streamInfo),this.isPaused?this.previous.pause():this.previous.resume()},s.prototype.registerPrevious=function(t){this._sources.push(t);var e=this;return t.on("data",function(t){e.processChunk(t)}),t.on("end",function(){e.closedSource(e.previous.streamInfo),e._sources.length?e.prepareNextSource():e.end()}),t.on("error",function(t){e.error(t)}),this},s.prototype.resume=function(){return!!n.prototype.resume.call(this)&&(!this.previous&&this._sources.length?(this.prepareNextSource(),!0):this.previous||this._sources.length||this.generatedError?void 0:(this.end(),!0))},s.prototype.error=function(t){var e=this._sources;if(!n.prototype.error.call(this,t))return!1;for(var r=0;r<e.length;r++)try{e[r].error(t)}catch(t){}return!0},s.prototype.lock=function(){n.prototype.lock.call(this);for(var t=this._sources,e=0;e<t.length;e++)t[e].lock()},e.exports=s},{"../crc32":4,"../signature":23,"../stream/GenericWorker":28,"../utf8":31,"../utils":32}],9:[function(t,e,r){"use strict";var u=t("../compressions"),i=t("./ZipFileWorker");r.generateWorker=function(t,a,e){var o=new i(a.streamFiles,e,a.platform,a.encodeFileName),h=0;try{t.forEach(function(t,e){h++;var r=function(t,e){var r=t||e,i=u[r];if(!i)throw new Error(r+" is not a valid compression method !");return i}(e.options.compression,a.compression),i=e.options.compressionOptions||a.compressionOptions||{},n=e.dir,s=e.date;e._compressWorker(r,i).withStreamInfo("file",{name:t,dir:n,date:s,comment:e.comment||"",unixPermissions:e.unixPermissions,dosPermissions:e.dosPermissions}).pipe(o)}),o.entriesCount=h}catch(t){o.error(t)}return o}},{"../compressions":3,"./ZipFileWorker":8}],10:[function(t,e,r){"use strict";function i(){if(!(this instanceof i))return new i;if(arguments.length)throw new Error("The constructor with parameters has been removed in JSZip 3.0, please check the upgrade guide.");this.files={},this.comment=null,this.root="",this.clone=function(){var t=new i;for(var e in this)"function"!=typeof this[e]&&(t[e]=this[e]);return t}}(i.prototype=t("./object")).loadAsync=t("./load"),i.support=t("./support"),i.defaults=t("./defaults"),i.version="3.5.0",i.loadAsync=function(t,e){return(new i).loadAsync(t,e)},i.external=t("./external"),e.exports=i},{"./defaults":5,"./external":6,"./load":11,"./object":15,"./support":30}],11:[function(t,e,r){"use strict";var i=t("./utils"),n=t("./external"),o=t("./utf8"),h=(i=t("./utils"),t("./zipEntries")),s=t("./stream/Crc32Probe"),u=t("./nodejsUtils");function l(i){return new n.Promise(function(t,e){var r=i.decompressed.getContentWorker().pipe(new s);r.on("error",function(t){e(t)}).on("end",function(){r.streamInfo.crc32!==i.decompressed.crc32?e(new Error("Corrupted zip : CRC32 mismatch")):t()}).resume()})}e.exports=function(t,s){var a=this;return s=i.extend(s||{},{base64:!1,checkCRC32:!1,optimizedBinaryString:!1,createFolders:!1,decodeFileName:o.utf8decode}),u.isNode&&u.isStream(t)?n.Promise.reject(new Error("JSZip can't accept a stream when loading a zip file.")):i.prepareContent("the loaded zip file",t,!0,s.optimizedBinaryString,s.base64).then(function(t){var e=new h(s);return e.load(t),e}).then(function(t){var e=[n.Promise.resolve(t)],r=t.files;if(s.checkCRC32)for(var i=0;i<r.length;i++)e.push(l(r[i]));return n.Promise.all(e)}).then(function(t){for(var e=t.shift(),r=e.files,i=0;i<r.length;i++){var n=r[i];a.file(n.fileNameStr,n.decompressed,{binary:!0,optimizedBinaryString:!0,date:n.date,dir:n.dir,comment:n.fileCommentStr.length?n.fileCommentStr:null,unixPermissions:n.unixPermissions,dosPermissions:n.dosPermissions,createFolders:s.createFolders})}return e.zipComment.length&&(a.comment=e.zipComment),a})}},{"./external":6,"./nodejsUtils":14,"./stream/Crc32Probe":25,"./utf8":31,"./utils":32,"./zipEntries":33}],12:[function(t,e,r){"use strict";var i=t("../utils"),n=t("../stream/GenericWorker");function s(t,e){n.call(this,"Nodejs stream input adapter for "+t),this._upstreamEnded=!1,this._bindStream(e)}i.inherits(s,n),s.prototype._bindStream=function(t){var e=this;(this._stream=t).pause(),t.on("data",function(t){e.push({data:t,meta:{percent:0}})}).on("error",function(t){e.isPaused?this.generatedError=t:e.error(t)}).on("end",function(){e.isPaused?e._upstreamEnded=!0:e.end()})},s.prototype.pause=function(){return!!n.prototype.pause.call(this)&&(this._stream.pause(),!0)},s.prototype.resume=function(){return!!n.prototype.resume.call(this)&&(this._upstreamEnded?this.end():this._stream.resume(),!0)},e.exports=s},{"../stream/GenericWorker":28,"../utils":32}],13:[function(t,e,r){"use strict";var n=t("readable-stream").Readable;function i(t,e,r){n.call(this,e),this._helper=t;var i=this;t.on("data",function(t,e){i.push(t)||i._helper.pause(),r&&r(e)}).on("error",function(t){i.emit("error",t)}).on("end",function(){i.push(null)})}t("../utils").inherits(i,n),i.prototype._read=function(){this._helper.resume()},e.exports=i},{"../utils":32,"readable-stream":16}],14:[function(t,e,r){"use strict";e.exports={isNode:"undefined"!=typeof Buffer,newBufferFrom:function(t,e){if(Buffer.from&&Buffer.from!==Uint8Array.from)return Buffer.from(t,e);if("number"==typeof t)throw new Error('The "data" argument must not be a number');return new Buffer(t,e)},allocBuffer:function(t){if(Buffer.alloc)return Buffer.alloc(t);var e=new Buffer(t);return e.fill(0),e},isBuffer:function(t){return Buffer.isBuffer(t)},isStream:function(t){return t&&"function"==typeof t.on&&"function"==typeof t.pause&&"function"==typeof t.resume}}},{}],15:[function(t,e,r){"use strict";function s(t,e,r){var i,n=u.getTypeOf(e),s=u.extend(r||{},f);s.date=s.date||new Date,null!==s.compression&&(s.compression=s.compression.toUpperCase()),"string"==typeof s.unixPermissions&&(s.unixPermissions=parseInt(s.unixPermissions,8)),s.unixPermissions&&16384&s.unixPermissions&&(s.dir=!0),s.dosPermissions&&16&s.dosPermissions&&(s.dir=!0),s.dir&&(t=g(t)),s.createFolders&&(i=_(t))&&b.call(this,i,!0);var a="string"===n&&!1===s.binary&&!1===s.base64;r&&void 0!==r.binary||(s.binary=!a),(e instanceof d&&0===e.uncompressedSize||s.dir||!e||0===e.length)&&(s.base64=!1,s.binary=!0,e="",s.compression="STORE",n="string");var o=null;o=e instanceof d||e instanceof l?e:p.isNode&&p.isStream(e)?new m(t,e):u.prepareContent(t,e,s.binary,s.optimizedBinaryString,s.base64);var h=new c(t,o,s);this.files[t]=h}var n=t("./utf8"),u=t("./utils"),l=t("./stream/GenericWorker"),a=t("./stream/StreamHelper"),f=t("./defaults"),d=t("./compressedObject"),c=t("./zipObject"),o=t("./generate"),p=t("./nodejsUtils"),m=t("./nodejs/NodejsStreamInputAdapter"),_=function(t){"/"===t.slice(-1)&&(t=t.substring(0,t.length-1));var e=t.lastIndexOf("/");return 0<e?t.substring(0,e):""},g=function(t){return"/"!==t.slice(-1)&&(t+="/"),t},b=function(t,e){return e=void 0!==e?e:f.createFolders,t=g(t),this.files[t]||s.call(this,t,null,{dir:!0,createFolders:e}),this.files[t]};function h(t){return"[object RegExp]"===Object.prototype.toString.call(t)}var i={load:function(){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},forEach:function(t){var e,r,i;for(e in this.files)this.files.hasOwnProperty(e)&&(i=this.files[e],(r=e.slice(this.root.length,e.length))&&e.slice(0,this.root.length)===this.root&&t(r,i))},filter:function(r){var i=[];return this.forEach(function(t,e){r(t,e)&&i.push(e)}),i},file:function(t,e,r){if(1!==arguments.length)return t=this.root+t,s.call(this,t,e,r),this;if(h(t)){var i=t;return this.filter(function(t,e){return!e.dir&&i.test(t)})}var n=this.files[this.root+t];return n&&!n.dir?n:null},folder:function(r){if(!r)return this;if(h(r))return this.filter(function(t,e){return e.dir&&r.test(t)});var t=this.root+r,e=b.call(this,t),i=this.clone();return i.root=e.name,i},remove:function(r){r=this.root+r;var t=this.files[r];if(t||("/"!==r.slice(-1)&&(r+="/"),t=this.files[r]),t&&!t.dir)delete this.files[r];else for(var e=this.filter(function(t,e){return e.name.slice(0,r.length)===r}),i=0;i<e.length;i++)delete this.files[e[i].name];return this},generate:function(t){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},generateInternalStream:function(t){var e,r={};try{if((r=u.extend(t||{},{streamFiles:!1,compression:"STORE",compressionOptions:null,type:"",platform:"DOS",comment:null,mimeType:"application/zip",encodeFileName:n.utf8encode})).type=r.type.toLowerCase(),r.compression=r.compression.toUpperCase(),"binarystring"===r.type&&(r.type="string"),!r.type)throw new Error("No output type specified.");u.checkSupport(r.type),"darwin"!==r.platform&&"freebsd"!==r.platform&&"linux"!==r.platform&&"sunos"!==r.platform||(r.platform="UNIX"),"win32"===r.platform&&(r.platform="DOS");var i=r.comment||this.comment||"";e=o.generateWorker(this,r,i)}catch(t){(e=new l("error")).error(t)}return new a(e,r.type||"string",r.mimeType)},generateAsync:function(t,e){return this.generateInternalStream(t).accumulate(e)},generateNodeStream:function(t,e){return(t=t||{}).type||(t.type="nodebuffer"),this.generateInternalStream(t).toNodejsStream(e)}};e.exports=i},{"./compressedObject":2,"./defaults":5,"./generate":9,"./nodejs/NodejsStreamInputAdapter":12,"./nodejsUtils":14,"./stream/GenericWorker":28,"./stream/StreamHelper":29,"./utf8":31,"./utils":32,"./zipObject":35}],16:[function(t,e,r){e.exports=t("stream")},{stream:void 0}],17:[function(t,e,r){"use strict";var i=t("./DataReader");function n(t){i.call(this,t);for(var e=0;e<this.data.length;e++)t[e]=255&t[e]}t("../utils").inherits(n,i),n.prototype.byteAt=function(t){return this.data[this.zero+t]},n.prototype.lastIndexOfSignature=function(t){for(var e=t.charCodeAt(0),r=t.charCodeAt(1),i=t.charCodeAt(2),n=t.charCodeAt(3),s=this.length-4;0<=s;--s)if(this.data[s]===e&&this.data[s+1]===r&&this.data[s+2]===i&&this.data[s+3]===n)return s-this.zero;return-1},n.prototype.readAndCheckSignature=function(t){var e=t.charCodeAt(0),r=t.charCodeAt(1),i=t.charCodeAt(2),n=t.charCodeAt(3),s=this.readData(4);return e===s[0]&&r===s[1]&&i===s[2]&&n===s[3]},n.prototype.readData=function(t){if(this.checkOffset(t),0===t)return[];var e=this.data.slice(this.zero+this.index,this.zero+this.index+t);return this.index+=t,e},e.exports=n},{"../utils":32,"./DataReader":18}],18:[function(t,e,r){"use strict";var i=t("../utils");function n(t){this.data=t,this.length=t.length,this.index=0,this.zero=0}n.prototype={checkOffset:function(t){this.checkIndex(this.index+t)},checkIndex:function(t){if(this.length<this.zero+t||t<0)throw new Error("End of data reached (data length = "+this.length+", asked index = "+t+"). Corrupted zip ?")},setIndex:function(t){this.checkIndex(t),this.index=t},skip:function(t){this.setIndex(this.index+t)},byteAt:function(t){},readInt:function(t){var e,r=0;for(this.checkOffset(t),e=this.index+t-1;e>=this.index;e--)r=(r<<8)+this.byteAt(e);return this.index+=t,r},readString:function(t){return i.transformTo("string",this.readData(t))},readData:function(t){},lastIndexOfSignature:function(t){},readAndCheckSignature:function(t){},readDate:function(){var t=this.readInt(4);return new Date(Date.UTC(1980+(t>>25&127),(t>>21&15)-1,t>>16&31,t>>11&31,t>>5&63,(31&t)<<1))}},e.exports=n},{"../utils":32}],19:[function(t,e,r){"use strict";var i=t("./Uint8ArrayReader");function n(t){i.call(this,t)}t("../utils").inherits(n,i),n.prototype.readData=function(t){this.checkOffset(t);var e=this.data.slice(this.zero+this.index,this.zero+this.index+t);return this.index+=t,e},e.exports=n},{"../utils":32,"./Uint8ArrayReader":21}],20:[function(t,e,r){"use strict";var i=t("./DataReader");function n(t){i.call(this,t)}t("../utils").inherits(n,i),n.prototype.byteAt=function(t){return this.data.charCodeAt(this.zero+t)},n.prototype.lastIndexOfSignature=function(t){return this.data.lastIndexOf(t)-this.zero},n.prototype.readAndCheckSignature=function(t){return t===this.readData(4)},n.prototype.readData=function(t){this.checkOffset(t);var e=this.data.slice(this.zero+this.index,this.zero+this.index+t);return this.index+=t,e},e.exports=n},{"../utils":32,"./DataReader":18}],21:[function(t,e,r){"use strict";var i=t("./ArrayReader");function n(t){i.call(this,t)}t("../utils").inherits(n,i),n.prototype.readData=function(t){if(this.checkOffset(t),0===t)return new Uint8Array(0);var e=this.data.subarray(this.zero+this.index,this.zero+this.index+t);return this.index+=t,e},e.exports=n},{"../utils":32,"./ArrayReader":17}],22:[function(t,e,r){"use strict";var i=t("../utils"),n=t("../support"),s=t("./ArrayReader"),a=t("./StringReader"),o=t("./NodeBufferReader"),h=t("./Uint8ArrayReader");e.exports=function(t){var e=i.getTypeOf(t);return i.checkSupport(e),"string"!==e||n.uint8array?"nodebuffer"===e?new o(t):n.uint8array?new h(i.transformTo("uint8array",t)):new s(i.transformTo("array",t)):new a(t)}},{"../support":30,"../utils":32,"./ArrayReader":17,"./NodeBufferReader":19,"./StringReader":20,"./Uint8ArrayReader":21}],23:[function(t,e,r){"use strict";r.LOCAL_FILE_HEADER="PK",r.CENTRAL_FILE_HEADER="PK",r.CENTRAL_DIRECTORY_END="PK",r.ZIP64_CENTRAL_DIRECTORY_LOCATOR="PK",r.ZIP64_CENTRAL_DIRECTORY_END="PK",r.DATA_DESCRIPTOR="PK\b"},{}],24:[function(t,e,r){"use strict";var i=t("./GenericWorker"),n=t("../utils");function s(t){i.call(this,"ConvertWorker to "+t),this.destType=t}n.inherits(s,i),s.prototype.processChunk=function(t){this.push({data:n.transformTo(this.destType,t.data),meta:t.meta})},e.exports=s},{"../utils":32,"./GenericWorker":28}],25:[function(t,e,r){"use strict";var i=t("./GenericWorker"),n=t("../crc32");function s(){i.call(this,"Crc32Probe"),this.withStreamInfo("crc32",0)}t("../utils").inherits(s,i),s.prototype.processChunk=function(t){this.streamInfo.crc32=n(t.data,this.streamInfo.crc32||0),this.push(t)},e.exports=s},{"../crc32":4,"../utils":32,"./GenericWorker":28}],26:[function(t,e,r){"use strict";var i=t("../utils"),n=t("./GenericWorker");function s(t){n.call(this,"DataLengthProbe for "+t),this.propName=t,this.withStreamInfo(t,0)}i.inherits(s,n),s.prototype.processChunk=function(t){if(t){var e=this.streamInfo[this.propName]||0;this.streamInfo[this.propName]=e+t.data.length}n.prototype.processChunk.call(this,t)},e.exports=s},{"../utils":32,"./GenericWorker":28}],27:[function(t,e,r){"use strict";var i=t("../utils"),n=t("./GenericWorker");function s(t){n.call(this,"DataWorker");var e=this;this.dataIsReady=!1,this.index=0,this.max=0,this.data=null,this.type="",this._tickScheduled=!1,t.then(function(t){e.dataIsReady=!0,e.data=t,e.max=t&&t.length||0,e.type=i.getTypeOf(t),e.isPaused||e._tickAndRepeat()},function(t){e.error(t)})}i.inherits(s,n),s.prototype.cleanUp=function(){n.prototype.cleanUp.call(this),this.data=null},s.prototype.resume=function(){return!!n.prototype.resume.call(this)&&(!this._tickScheduled&&this.dataIsReady&&(this._tickScheduled=!0,i.delay(this._tickAndRepeat,[],this)),!0)},s.prototype._tickAndRepeat=function(){this._tickScheduled=!1,this.isPaused||this.isFinished||(this._tick(),this.isFinished||(i.delay(this._tickAndRepeat,[],this),this._tickScheduled=!0))},s.prototype._tick=function(){if(this.isPaused||this.isFinished)return!1;var t=null,e=Math.min(this.max,this.index+16384);if(this.index>=this.max)return this.end();switch(this.type){case"string":t=this.data.substring(this.index,e);break;case"uint8array":t=this.data.subarray(this.index,e);break;case"array":case"nodebuffer":t=this.data.slice(this.index,e)}return this.index=e,this.push({data:t,meta:{percent:this.max?this.index/this.max*100:0}})},e.exports=s},{"../utils":32,"./GenericWorker":28}],28:[function(t,e,r){"use strict";function i(t){this.name=t||"default",this.streamInfo={},this.generatedError=null,this.extraStreamInfo={},this.isPaused=!0,this.isFinished=!1,this.isLocked=!1,this._listeners={data:[],end:[],error:[]},this.previous=null}i.prototype={push:function(t){this.emit("data",t)},end:function(){if(this.isFinished)return!1;this.flush();try{this.emit("end"),this.cleanUp(),this.isFinished=!0}catch(t){this.emit("error",t)}return!0},error:function(t){return!this.isFinished&&(this.isPaused?this.generatedError=t:(this.isFinished=!0,this.emit("error",t),this.previous&&this.previous.error(t),this.cleanUp()),!0)},on:function(t,e){return this._listeners[t].push(e),this},cleanUp:function(){this.streamInfo=this.generatedError=this.extraStreamInfo=null,this._listeners=[]},emit:function(t,e){if(this._listeners[t])for(var r=0;r<this._listeners[t].length;r++)this._listeners[t][r].call(this,e)},pipe:function(t){return t.registerPrevious(this)},registerPrevious:function(t){if(this.isLocked)throw new Error("The stream '"+this+"' has already been used.");this.streamInfo=t.streamInfo,this.mergeStreamInfo(),this.previous=t;var e=this;return t.on("data",function(t){e.processChunk(t)}),t.on("end",function(){e.end()}),t.on("error",function(t){e.error(t)}),this},pause:function(){return!this.isPaused&&!this.isFinished&&(this.isPaused=!0,this.previous&&this.previous.pause(),!0)},resume:function(){if(!this.isPaused||this.isFinished)return!1;var t=this.isPaused=!1;return this.generatedError&&(this.error(this.generatedError),t=!0),this.previous&&this.previous.resume(),!t},flush:function(){},processChunk:function(t){this.push(t)},withStreamInfo:function(t,e){return this.extraStreamInfo[t]=e,this.mergeStreamInfo(),this},mergeStreamInfo:function(){for(var t in this.extraStreamInfo)this.extraStreamInfo.hasOwnProperty(t)&&(this.streamInfo[t]=this.extraStreamInfo[t])},lock:function(){if(this.isLocked)throw new Error("The stream '"+this+"' has already been used.");this.isLocked=!0,this.previous&&this.previous.lock()},toString:function(){var t="Worker "+this.name;return this.previous?this.previous+" -> "+t:t}},e.exports=i},{}],29:[function(t,e,r){"use strict";var h=t("../utils"),n=t("./ConvertWorker"),s=t("./GenericWorker"),u=t("../base64"),i=t("../support"),a=t("../external"),o=null;if(i.nodestream)try{o=t("../nodejs/NodejsStreamOutputAdapter")}catch(t){}function l(t,o){return new a.Promise(function(e,r){var i=[],n=t._internalType,s=t._outputType,a=t._mimeType;t.on("data",function(t,e){i.push(t),o&&o(e)}).on("error",function(t){i=[],r(t)}).on("end",function(){try{var t=function(t,e,r){switch(t){case"blob":return h.newBlob(h.transformTo("arraybuffer",e),r);case"base64":return u.encode(e);default:return h.transformTo(t,e)}}(s,function(t,e){var r,i=0,n=null,s=0;for(r=0;r<e.length;r++)s+=e[r].length;switch(t){case"string":return e.join("");case"array":return Array.prototype.concat.apply([],e);case"uint8array":for(n=new Uint8Array(s),r=0;r<e.length;r++)n.set(e[r],i),i+=e[r].length;return n;case"nodebuffer":return Buffer.concat(e);default:throw new Error("concat : unsupported type '"+t+"'")}}(n,i),a);e(t)}catch(t){r(t)}i=[]}).resume()})}function f(t,e,r){var i=e;switch(e){case"blob":case"arraybuffer":i="uint8array";break;case"base64":i="string"}try{this._internalType=i,this._outputType=e,this._mimeType=r,h.checkSupport(i),this._worker=t.pipe(new n(i)),t.lock()}catch(t){this._worker=new s("error"),this._worker.error(t)}}f.prototype={accumulate:function(t){return l(this,t)},on:function(t,e){var r=this;return"data"===t?this._worker.on(t,function(t){e.call(r,t.data,t.meta)}):this._worker.on(t,function(){h.delay(e,arguments,r)}),this},resume:function(){return h.delay(this._worker.resume,[],this._worker),this},pause:function(){return this._worker.pause(),this},toNodejsStream:function(t){if(h.checkSupport("nodestream"),"nodebuffer"!==this._outputType)throw new Error(this._outputType+" is not supported by this method");return new o(this,{objectMode:"nodebuffer"!==this._outputType},t)}},e.exports=f},{"../base64":1,"../external":6,"../nodejs/NodejsStreamOutputAdapter":13,"../support":30,"../utils":32,"./ConvertWorker":24,"./GenericWorker":28}],30:[function(t,e,r){"use strict";if(r.base64=!0,r.array=!0,r.string=!0,r.arraybuffer="undefined"!=typeof ArrayBuffer&&"undefined"!=typeof Uint8Array,r.nodebuffer="undefined"!=typeof Buffer,r.uint8array="undefined"!=typeof Uint8Array,"undefined"==typeof ArrayBuffer)r.blob=!1;else{var i=new ArrayBuffer(0);try{r.blob=0===new Blob([i],{type:"application/zip"}).size}catch(t){try{var n=new(self.BlobBuilder||self.WebKitBlobBuilder||self.MozBlobBuilder||self.MSBlobBuilder);n.append(i),r.blob=0===n.getBlob("application/zip").size}catch(t){r.blob=!1}}}try{r.nodestream=!!t("readable-stream").Readable}catch(t){r.nodestream=!1}},{"readable-stream":16}],31:[function(t,e,s){"use strict";for(var o=t("./utils"),h=t("./support"),r=t("./nodejsUtils"),i=t("./stream/GenericWorker"),u=new Array(256),n=0;n<256;n++)u[n]=252<=n?6:248<=n?5:240<=n?4:224<=n?3:192<=n?2:1;u[254]=u[254]=1;function a(){i.call(this,"utf-8 decode"),this.leftOver=null}function l(){i.call(this,"utf-8 encode")}s.utf8encode=function(t){return h.nodebuffer?r.newBufferFrom(t,"utf-8"):function(t){var e,r,i,n,s,a=t.length,o=0;for(n=0;n<a;n++)55296==(64512&(r=t.charCodeAt(n)))&&n+1<a&&56320==(64512&(i=t.charCodeAt(n+1)))&&(r=65536+(r-55296<<10)+(i-56320),n++),o+=r<128?1:r<2048?2:r<65536?3:4;for(e=h.uint8array?new Uint8Array(o):new Array(o),n=s=0;s<o;n++)55296==(64512&(r=t.charCodeAt(n)))&&n+1<a&&56320==(64512&(i=t.charCodeAt(n+1)))&&(r=65536+(r-55296<<10)+(i-56320),n++),r<128?e[s++]=r:(r<2048?e[s++]=192|r>>>6:(r<65536?e[s++]=224|r>>>12:(e[s++]=240|r>>>18,e[s++]=128|r>>>12&63),e[s++]=128|r>>>6&63),e[s++]=128|63&r);return e}(t)},s.utf8decode=function(t){return h.nodebuffer?o.transformTo("nodebuffer",t).toString("utf-8"):function(t){var e,r,i,n,s=t.length,a=new Array(2*s);for(e=r=0;e<s;)if((i=t[e++])<128)a[r++]=i;else if(4<(n=u[i]))a[r++]=65533,e+=n-1;else{for(i&=2===n?31:3===n?15:7;1<n&&e<s;)i=i<<6|63&t[e++],n--;1<n?a[r++]=65533:i<65536?a[r++]=i:(i-=65536,a[r++]=55296|i>>10&1023,a[r++]=56320|1023&i)}return a.length!==r&&(a.subarray?a=a.subarray(0,r):a.length=r),o.applyFromCharCode(a)}(t=o.transformTo(h.uint8array?"uint8array":"array",t))},o.inherits(a,i),a.prototype.processChunk=function(t){var e=o.transformTo(h.uint8array?"uint8array":"array",t.data);if(this.leftOver&&this.leftOver.length){if(h.uint8array){var r=e;(e=new Uint8Array(r.length+this.leftOver.length)).set(this.leftOver,0),e.set(r,this.leftOver.length)}else e=this.leftOver.concat(e);this.leftOver=null}var i=function(t,e){var r;for((e=e||t.length)>t.length&&(e=t.length),r=e-1;0<=r&&128==(192&t[r]);)r--;return r<0?e:0===r?e:r+u[t[r]]>e?r:e}(e),n=e;i!==e.length&&(h.uint8array?(n=e.subarray(0,i),this.leftOver=e.subarray(i,e.length)):(n=e.slice(0,i),this.leftOver=e.slice(i,e.length))),this.push({data:s.utf8decode(n),meta:t.meta})},a.prototype.flush=function(){this.leftOver&&this.leftOver.length&&(this.push({data:s.utf8decode(this.leftOver),meta:{}}),this.leftOver=null)},s.Utf8DecodeWorker=a,o.inherits(l,i),l.prototype.processChunk=function(t){this.push({data:s.utf8encode(t.data),meta:t.meta})},s.Utf8EncodeWorker=l},{"./nodejsUtils":14,"./stream/GenericWorker":28,"./support":30,"./utils":32}],32:[function(t,e,a){"use strict";var o=t("./support"),h=t("./base64"),r=t("./nodejsUtils"),i=t("set-immediate-shim"),u=t("./external");function n(t){return t}function l(t,e){for(var r=0;r<t.length;++r)e[r]=255&t.charCodeAt(r);return e}a.newBlob=function(e,r){a.checkSupport("blob");try{return new Blob([e],{type:r})}catch(t){try{var i=new(self.BlobBuilder||self.WebKitBlobBuilder||self.MozBlobBuilder||self.MSBlobBuilder);return i.append(e),i.getBlob(r)}catch(t){throw new Error("Bug : can't construct the Blob.")}}};var s={stringifyByChunk:function(t,e,r){var i=[],n=0,s=t.length;if(s<=r)return String.fromCharCode.apply(null,t);for(;n<s;)"array"===e||"nodebuffer"===e?i.push(String.fromCharCode.apply(null,t.slice(n,Math.min(n+r,s)))):i.push(String.fromCharCode.apply(null,t.subarray(n,Math.min(n+r,s)))),n+=r;return i.join("")},stringifyByChar:function(t){for(var e="",r=0;r<t.length;r++)e+=String.fromCharCode(t[r]);return e},applyCanBeUsed:{uint8array:function(){try{return o.uint8array&&1===String.fromCharCode.apply(null,new Uint8Array(1)).length}catch(t){return!1}}(),nodebuffer:function(){try{return o.nodebuffer&&1===String.fromCharCode.apply(null,r.allocBuffer(1)).length}catch(t){return!1}}()}};function f(t){var e=65536,r=a.getTypeOf(t),i=!0;if("uint8array"===r?i=s.applyCanBeUsed.uint8array:"nodebuffer"===r&&(i=s.applyCanBeUsed.nodebuffer),i)for(;1<e;)try{return s.stringifyByChunk(t,r,e)}catch(t){e=Math.floor(e/2)}return s.stringifyByChar(t)}function d(t,e){for(var r=0;r<t.length;r++)e[r]=t[r];return e}a.applyFromCharCode=f;var c={};c.string={string:n,array:function(t){return l(t,new Array(t.length))},arraybuffer:function(t){return c.string.uint8array(t).buffer},uint8array:function(t){return l(t,new Uint8Array(t.length))},nodebuffer:function(t){return l(t,r.allocBuffer(t.length))}},c.array={string:f,array:n,arraybuffer:function(t){return new Uint8Array(t).buffer},uint8array:function(t){return new Uint8Array(t)},nodebuffer:function(t){return r.newBufferFrom(t)}},c.arraybuffer={string:function(t){return f(new Uint8Array(t))},array:function(t){return d(new Uint8Array(t),new Array(t.byteLength))},arraybuffer:n,uint8array:function(t){return new Uint8Array(t)},nodebuffer:function(t){return r.newBufferFrom(new Uint8Array(t))}},c.uint8array={string:f,array:function(t){return d(t,new Array(t.length))},arraybuffer:function(t){return t.buffer},uint8array:n,nodebuffer:function(t){return r.newBufferFrom(t)}},c.nodebuffer={string:f,array:function(t){return d(t,new Array(t.length))},arraybuffer:function(t){return c.nodebuffer.uint8array(t).buffer},uint8array:function(t){return d(t,new Uint8Array(t.length))},nodebuffer:n},a.transformTo=function(t,e){if(e=e||"",!t)return e;a.checkSupport(t);var r=a.getTypeOf(e);return c[r][t](e)},a.getTypeOf=function(t){return"string"==typeof t?"string":"[object Array]"===Object.prototype.toString.call(t)?"array":o.nodebuffer&&r.isBuffer(t)?"nodebuffer":o.uint8array&&t instanceof Uint8Array?"uint8array":o.arraybuffer&&t instanceof ArrayBuffer?"arraybuffer":void 0},a.checkSupport=function(t){if(!o[t.toLowerCase()])throw new Error(t+" is not supported by this platform")},a.MAX_VALUE_16BITS=65535,a.MAX_VALUE_32BITS=-1,a.pretty=function(t){var e,r,i="";for(r=0;r<(t||"").length;r++)i+="\\x"+((e=t.charCodeAt(r))<16?"0":"")+e.toString(16).toUpperCase();return i},a.delay=function(t,e,r){i(function(){t.apply(r||null,e||[])})},a.inherits=function(t,e){function r(){}r.prototype=e.prototype,t.prototype=new r},a.extend=function(){var t,e,r={};for(t=0;t<arguments.length;t++)for(e in arguments[t])arguments[t].hasOwnProperty(e)&&void 0===r[e]&&(r[e]=arguments[t][e]);return r},a.prepareContent=function(r,t,i,n,s){return u.Promise.resolve(t).then(function(i){return o.blob&&(i instanceof Blob||-1!==["[object File]","[object Blob]"].indexOf(Object.prototype.toString.call(i)))&&"undefined"!=typeof FileReader?new u.Promise(function(e,r){var t=new FileReader;t.onload=function(t){e(t.target.result)},t.onerror=function(t){r(t.target.error)},t.readAsArrayBuffer(i)}):i}).then(function(t){var e=a.getTypeOf(t);return e?("arraybuffer"===e?t=a.transformTo("uint8array",t):"string"===e&&(s?t=h.decode(t):i&&!0!==n&&(t=function(t){return l(t,o.uint8array?new Uint8Array(t.length):new Array(t.length))}(t))),t):u.Promise.reject(new Error("Can't read the data of '"+r+"'. Is it in a supported JavaScript type (String, Blob, ArrayBuffer, etc) ?"))})}},{"./base64":1,"./external":6,"./nodejsUtils":14,"./support":30,"set-immediate-shim":54}],33:[function(t,e,r){"use strict";var i=t("./reader/readerFor"),n=t("./utils"),s=t("./signature"),a=t("./zipEntry"),o=(t("./utf8"),t("./support"));function h(t){this.files=[],this.loadOptions=t}h.prototype={checkSignature:function(t){if(!this.reader.readAndCheckSignature(t)){this.reader.index-=4;var e=this.reader.readString(4);throw new Error("Corrupted zip or bug: unexpected signature ("+n.pretty(e)+", expected "+n.pretty(t)+")")}},isSignature:function(t,e){var r=this.reader.index;this.reader.setIndex(t);var i=this.reader.readString(4)===e;return this.reader.setIndex(r),i},readBlockEndOfCentral:function(){this.diskNumber=this.reader.readInt(2),this.diskWithCentralDirStart=this.reader.readInt(2),this.centralDirRecordsOnThisDisk=this.reader.readInt(2),this.centralDirRecords=this.reader.readInt(2),this.centralDirSize=this.reader.readInt(4),this.centralDirOffset=this.reader.readInt(4),this.zipCommentLength=this.reader.readInt(2);var t=this.reader.readData(this.zipCommentLength),e=o.uint8array?"uint8array":"array",r=n.transformTo(e,t);this.zipComment=this.loadOptions.decodeFileName(r)},readBlockZip64EndOfCentral:function(){this.zip64EndOfCentralSize=this.reader.readInt(8),this.reader.skip(4),this.diskNumber=this.reader.readInt(4),this.diskWithCentralDirStart=this.reader.readInt(4),this.centralDirRecordsOnThisDisk=this.reader.readInt(8),this.centralDirRecords=this.reader.readInt(8),this.centralDirSize=this.reader.readInt(8),this.centralDirOffset=this.reader.readInt(8),this.zip64ExtensibleData={};for(var t,e,r,i=this.zip64EndOfCentralSize-44;0<i;)t=this.reader.readInt(2),e=this.reader.readInt(4),r=this.reader.readData(e),this.zip64ExtensibleData[t]={id:t,length:e,value:r}},readBlockZip64EndOfCentralLocator:function(){if(this.diskWithZip64CentralDirStart=this.reader.readInt(4),this.relativeOffsetEndOfZip64CentralDir=this.reader.readInt(8),this.disksCount=this.reader.readInt(4),1<this.disksCount)throw new Error("Multi-volumes zip are not supported")},readLocalFiles:function(){var t,e;for(t=0;t<this.files.length;t++)e=this.files[t],this.reader.setIndex(e.localHeaderOffset),this.checkSignature(s.LOCAL_FILE_HEADER),e.readLocalPart(this.reader),e.handleUTF8(),e.processAttributes()},readCentralDir:function(){var t;for(this.reader.setIndex(this.centralDirOffset);this.reader.readAndCheckSignature(s.CENTRAL_FILE_HEADER);)(t=new a({zip64:this.zip64},this.loadOptions)).readCentralPart(this.reader),this.files.push(t);if(this.centralDirRecords!==this.files.length&&0!==this.centralDirRecords&&0===this.files.length)throw new Error("Corrupted zip or bug: expected "+this.centralDirRecords+" records in central dir, got "+this.files.length)},readEndOfCentral:function(){var t=this.reader.lastIndexOfSignature(s.CENTRAL_DIRECTORY_END);if(t<0)throw!this.isSignature(0,s.LOCAL_FILE_HEADER)?new Error("Can't find end of central directory : is this a zip file ? If it is, see https://stuk.github.io/jszip/documentation/howto/read_zip.html"):new Error("Corrupted zip: can't find end of central directory");this.reader.setIndex(t);var e=t;if(this.checkSignature(s.CENTRAL_DIRECTORY_END),this.readBlockEndOfCentral(),this.diskNumber===n.MAX_VALUE_16BITS||this.diskWithCentralDirStart===n.MAX_VALUE_16BITS||this.centralDirRecordsOnThisDisk===n.MAX_VALUE_16BITS||this.centralDirRecords===n.MAX_VALUE_16BITS||this.centralDirSize===n.MAX_VALUE_32BITS||this.centralDirOffset===n.MAX_VALUE_32BITS){if(this.zip64=!0,(t=this.reader.lastIndexOfSignature(s.ZIP64_CENTRAL_DIRECTORY_LOCATOR))<0)throw new Error("Corrupted zip: can't find the ZIP64 end of central directory locator");if(this.reader.setIndex(t),this.checkSignature(s.ZIP64_CENTRAL_DIRECTORY_LOCATOR),this.readBlockZip64EndOfCentralLocator(),!this.isSignature(this.relativeOffsetEndOfZip64CentralDir,s.ZIP64_CENTRAL_DIRECTORY_END)&&(this.relativeOffsetEndOfZip64CentralDir=this.reader.lastIndexOfSignature(s.ZIP64_CENTRAL_DIRECTORY_END),this.relativeOffsetEndOfZip64CentralDir<0))throw new Error("Corrupted zip: can't find the ZIP64 end of central directory");this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir),this.checkSignature(s.ZIP64_CENTRAL_DIRECTORY_END),this.readBlockZip64EndOfCentral()}var r=this.centralDirOffset+this.centralDirSize;this.zip64&&(r+=20,r+=12+this.zip64EndOfCentralSize);var i=e-r;if(0<i)this.isSignature(e,s.CENTRAL_FILE_HEADER)||(this.reader.zero=i);else if(i<0)throw new Error("Corrupted zip: missing "+Math.abs(i)+" bytes.")},prepareReader:function(t){this.reader=i(t)},load:function(t){this.prepareReader(t),this.readEndOfCentral(),this.readCentralDir(),this.readLocalFiles()}},e.exports=h},{"./reader/readerFor":22,"./signature":23,"./support":30,"./utf8":31,"./utils":32,"./zipEntry":34}],34:[function(t,e,r){"use strict";var i=t("./reader/readerFor"),s=t("./utils"),n=t("./compressedObject"),a=t("./crc32"),o=t("./utf8"),h=t("./compressions"),u=t("./support");function l(t,e){this.options=t,this.loadOptions=e}l.prototype={isEncrypted:function(){return 1==(1&this.bitFlag)},useUTF8:function(){return 2048==(2048&this.bitFlag)},readLocalPart:function(t){var e,r;if(t.skip(22),this.fileNameLength=t.readInt(2),r=t.readInt(2),this.fileName=t.readData(this.fileNameLength),t.skip(r),-1===this.compressedSize||-1===this.uncompressedSize)throw new Error("Bug or corrupted zip : didn't get enough information from the central directory (compressedSize === -1 || uncompressedSize === -1)");if(null===(e=function(t){for(var e in h)if(h.hasOwnProperty(e)&&h[e].magic===t)return h[e];return null}(this.compressionMethod)))throw new Error("Corrupted zip : compression "+s.pretty(this.compressionMethod)+" unknown (inner file : "+s.transformTo("string",this.fileName)+")");this.decompressed=new n(this.compressedSize,this.uncompressedSize,this.crc32,e,t.readData(this.compressedSize))},readCentralPart:function(t){this.versionMadeBy=t.readInt(2),t.skip(2),this.bitFlag=t.readInt(2),this.compressionMethod=t.readString(2),this.date=t.readDate(),this.crc32=t.readInt(4),this.compressedSize=t.readInt(4),this.uncompressedSize=t.readInt(4);var e=t.readInt(2);if(this.extraFieldsLength=t.readInt(2),this.fileCommentLength=t.readInt(2),this.diskNumberStart=t.readInt(2),this.internalFileAttributes=t.readInt(2),this.externalFileAttributes=t.readInt(4),this.localHeaderOffset=t.readInt(4),this.isEncrypted())throw new Error("Encrypted zip are not supported");t.skip(e),this.readExtraFields(t),this.parseZIP64ExtraField(t),this.fileComment=t.readData(this.fileCommentLength)},processAttributes:function(){this.unixPermissions=null,this.dosPermissions=null;var t=this.versionMadeBy>>8;this.dir=!!(16&this.externalFileAttributes),0==t&&(this.dosPermissions=63&this.externalFileAttributes),3==t&&(this.unixPermissions=this.externalFileAttributes>>16&65535),this.dir||"/"!==this.fileNameStr.slice(-1)||(this.dir=!0)},parseZIP64ExtraField:function(t){if(this.extraFields[1]){var e=i(this.extraFields[1].value);this.uncompressedSize===s.MAX_VALUE_32BITS&&(this.uncompressedSize=e.readInt(8)),this.compressedSize===s.MAX_VALUE_32BITS&&(this.compressedSize=e.readInt(8)),this.localHeaderOffset===s.MAX_VALUE_32BITS&&(this.localHeaderOffset=e.readInt(8)),this.diskNumberStart===s.MAX_VALUE_32BITS&&(this.diskNumberStart=e.readInt(4))}},readExtraFields:function(t){var e,r,i,n=t.index+this.extraFieldsLength;for(this.extraFields||(this.extraFields={});t.index+4<n;)e=t.readInt(2),r=t.readInt(2),i=t.readData(r),this.extraFields[e]={id:e,length:r,value:i};t.setIndex(n)},handleUTF8:function(){var t=u.uint8array?"uint8array":"array";if(this.useUTF8())this.fileNameStr=o.utf8decode(this.fileName),this.fileCommentStr=o.utf8decode(this.fileComment);else{var e=this.findExtraFieldUnicodePath();if(null!==e)this.fileNameStr=e;else{var r=s.transformTo(t,this.fileName);this.fileNameStr=this.loadOptions.decodeFileName(r)}var i=this.findExtraFieldUnicodeComment();if(null!==i)this.fileCommentStr=i;else{var n=s.transformTo(t,this.fileComment);this.fileCommentStr=this.loadOptions.decodeFileName(n)}}},findExtraFieldUnicodePath:function(){var t=this.extraFields[28789];if(t){var e=i(t.value);return 1!==e.readInt(1)?null:a(this.fileName)!==e.readInt(4)?null:o.utf8decode(e.readData(t.length-5))}return null},findExtraFieldUnicodeComment:function(){var t=this.extraFields[25461];if(t){var e=i(t.value);return 1!==e.readInt(1)?null:a(this.fileComment)!==e.readInt(4)?null:o.utf8decode(e.readData(t.length-5))}return null}},e.exports=l},{"./compressedObject":2,"./compressions":3,"./crc32":4,"./reader/readerFor":22,"./support":30,"./utf8":31,"./utils":32}],35:[function(t,e,r){"use strict";function i(t,e,r){this.name=t,this.dir=r.dir,this.date=r.date,this.comment=r.comment,this.unixPermissions=r.unixPermissions,this.dosPermissions=r.dosPermissions,this._data=e,this._dataBinary=r.binary,this.options={compression:r.compression,compressionOptions:r.compressionOptions}}var s=t("./stream/StreamHelper"),n=t("./stream/DataWorker"),a=t("./utf8"),o=t("./compressedObject"),h=t("./stream/GenericWorker");i.prototype={internalStream:function(t){var e=null,r="string";try{if(!t)throw new Error("No output type specified.");var i="string"===(r=t.toLowerCase())||"text"===r;"binarystring"!==r&&"text"!==r||(r="string"),e=this._decompressWorker();var n=!this._dataBinary;n&&!i&&(e=e.pipe(new a.Utf8EncodeWorker)),!n&&i&&(e=e.pipe(new a.Utf8DecodeWorker))}catch(t){(e=new h("error")).error(t)}return new s(e,r,"")},async:function(t,e){return this.internalStream(t).accumulate(e)},nodeStream:function(t,e){return this.internalStream(t||"nodebuffer").toNodejsStream(e)},_compressWorker:function(t,e){if(this._data instanceof o&&this._data.compression.magic===t.magic)return this._data.getCompressedWorker();var r=this._decompressWorker();return this._dataBinary||(r=r.pipe(new a.Utf8EncodeWorker)),o.createWorkerFrom(r,t,e)},_decompressWorker:function(){return this._data instanceof o?this._data.getContentWorker():this._data instanceof h?this._data:new n(this._data)}};for(var u=["asText","asBinary","asNodeBuffer","asUint8Array","asArrayBuffer"],l=function(){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},f=0;f<u.length;f++)i.prototype[u[f]]=l;e.exports=i},{"./compressedObject":2,"./stream/DataWorker":27,"./stream/GenericWorker":28,"./stream/StreamHelper":29,"./utf8":31}],36:[function(t,l,e){(function(e){"use strict";var r,i,t=e.MutationObserver||e.WebKitMutationObserver;if(t){var n=0,s=new t(u),a=e.document.createTextNode("");s.observe(a,{characterData:!0}),r=function(){a.data=n=++n%2}}else if(e.setImmediate||void 0===e.MessageChannel)r="document"in e&&"onreadystatechange"in e.document.createElement("script")?function(){var t=e.document.createElement("script");t.onreadystatechange=function(){u(),t.onreadystatechange=null,t.parentNode.removeChild(t),t=null},e.document.documentElement.appendChild(t)}:function(){setTimeout(u,0)};else{var o=new e.MessageChannel;o.port1.onmessage=u,r=function(){o.port2.postMessage(0)}}var h=[];function u(){var t,e;i=!0;for(var r=h.length;r;){for(e=h,h=[],t=-1;++t<r;)e[t]();r=h.length}i=!1}l.exports=function(t){1!==h.push(t)||i||r()}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],37:[function(t,e,r){"use strict";var n=t("immediate");function u(){}var l={},s=["REJECTED"],a=["FULFILLED"],i=["PENDING"];function o(t){if("function"!=typeof t)throw new TypeError("resolver must be a function");this.state=i,this.queue=[],this.outcome=void 0,t!==u&&c(this,t)}function h(t,e,r){this.promise=t,"function"==typeof e&&(this.onFulfilled=e,this.callFulfilled=this.otherCallFulfilled),"function"==typeof r&&(this.onRejected=r,this.callRejected=this.otherCallRejected)}function f(e,r,i){n(function(){var t;try{t=r(i)}catch(t){return l.reject(e,t)}t===e?l.reject(e,new TypeError("Cannot resolve promise with itself")):l.resolve(e,t)})}function d(t){var e=t&&t.then;if(t&&("object"==typeof t||"function"==typeof t)&&"function"==typeof e)return function(){e.apply(t,arguments)}}function c(e,t){var r=!1;function i(t){r||(r=!0,l.reject(e,t))}function n(t){r||(r=!0,l.resolve(e,t))}var s=p(function(){t(n,i)});"error"===s.status&&i(s.value)}function p(t,e){var r={};try{r.value=t(e),r.status="success"}catch(t){r.status="error",r.value=t}return r}(e.exports=o).prototype.finally=function(e){if("function"!=typeof e)return this;var r=this.constructor;return this.then(function(t){return r.resolve(e()).then(function(){return t})},function(t){return r.resolve(e()).then(function(){throw t})})},o.prototype.catch=function(t){return this.then(null,t)},o.prototype.then=function(t,e){if("function"!=typeof t&&this.state===a||"function"!=typeof e&&this.state===s)return this;var r=new this.constructor(u);this.state!==i?f(r,this.state===a?t:e,this.outcome):this.queue.push(new h(r,t,e));return r},h.prototype.callFulfilled=function(t){l.resolve(this.promise,t)},h.prototype.otherCallFulfilled=function(t){f(this.promise,this.onFulfilled,t)},h.prototype.callRejected=function(t){l.reject(this.promise,t)},h.prototype.otherCallRejected=function(t){f(this.promise,this.onRejected,t)},l.resolve=function(t,e){var r=p(d,e);if("error"===r.status)return l.reject(t,r.value);var i=r.value;if(i)c(t,i);else{t.state=a,t.outcome=e;for(var n=-1,s=t.queue.length;++n<s;)t.queue[n].callFulfilled(e)}return t},l.reject=function(t,e){t.state=s,t.outcome=e;for(var r=-1,i=t.queue.length;++r<i;)t.queue[r].callRejected(e);return t},o.resolve=function(t){if(t instanceof this)return t;return l.resolve(new this(u),t)},o.reject=function(t){var e=new this(u);return l.reject(e,t)},o.all=function(t){var r=this;if("[object Array]"!==Object.prototype.toString.call(t))return this.reject(new TypeError("must be an array"));var i=t.length,n=!1;if(!i)return this.resolve([]);var s=new Array(i),a=0,e=-1,o=new this(u);for(;++e<i;)h(t[e],e);return o;function h(t,e){r.resolve(t).then(function(t){s[e]=t,++a!==i||n||(n=!0,l.resolve(o,s))},function(t){n||(n=!0,l.reject(o,t))})}},o.race=function(t){var e=this;if("[object Array]"!==Object.prototype.toString.call(t))return this.reject(new TypeError("must be an array"));var r=t.length,i=!1;if(!r)return this.resolve([]);var n=-1,s=new this(u);for(;++n<r;)a=t[n],e.resolve(a).then(function(t){i||(i=!0,l.resolve(s,t))},function(t){i||(i=!0,l.reject(s,t))});var a;return s}},{immediate:36}],38:[function(t,e,r){"use strict";var i={};(0,t("./lib/utils/common").assign)(i,t("./lib/deflate"),t("./lib/inflate"),t("./lib/zlib/constants")),e.exports=i},{"./lib/deflate":39,"./lib/inflate":40,"./lib/utils/common":41,"./lib/zlib/constants":44}],39:[function(t,e,r){"use strict";var a=t("./zlib/deflate"),o=t("./utils/common"),h=t("./utils/strings"),n=t("./zlib/messages"),s=t("./zlib/zstream"),u=Object.prototype.toString,l=0,f=-1,d=0,c=8;function p(t){if(!(this instanceof p))return new p(t);this.options=o.assign({level:f,method:c,chunkSize:16384,windowBits:15,memLevel:8,strategy:d,to:""},t||{});var e=this.options;e.raw&&0<e.windowBits?e.windowBits=-e.windowBits:e.gzip&&0<e.windowBits&&e.windowBits<16&&(e.windowBits+=16),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new s,this.strm.avail_out=0;var r=a.deflateInit2(this.strm,e.level,e.method,e.windowBits,e.memLevel,e.strategy);if(r!==l)throw new Error(n[r]);if(e.header&&a.deflateSetHeader(this.strm,e.header),e.dictionary){var i;if(i="string"==typeof e.dictionary?h.string2buf(e.dictionary):"[object ArrayBuffer]"===u.call(e.dictionary)?new Uint8Array(e.dictionary):e.dictionary,(r=a.deflateSetDictionary(this.strm,i))!==l)throw new Error(n[r]);this._dict_set=!0}}function i(t,e){var r=new p(e);if(r.push(t,!0),r.err)throw r.msg||n[r.err];return r.result}p.prototype.push=function(t,e){var r,i,n=this.strm,s=this.options.chunkSize;if(this.ended)return!1;i=e===~~e?e:!0===e?4:0,"string"==typeof t?n.input=h.string2buf(t):"[object ArrayBuffer]"===u.call(t)?n.input=new Uint8Array(t):n.input=t,n.next_in=0,n.avail_in=n.input.length;do{if(0===n.avail_out&&(n.output=new o.Buf8(s),n.next_out=0,n.avail_out=s),1!==(r=a.deflate(n,i))&&r!==l)return this.onEnd(r),!(this.ended=!0);0!==n.avail_out&&(0!==n.avail_in||4!==i&&2!==i)||("string"===this.options.to?this.onData(h.buf2binstring(o.shrinkBuf(n.output,n.next_out))):this.onData(o.shrinkBuf(n.output,n.next_out)))}while((0<n.avail_in||0===n.avail_out)&&1!==r);return 4===i?(r=a.deflateEnd(this.strm),this.onEnd(r),this.ended=!0,r===l):2!==i||(this.onEnd(l),!(n.avail_out=0))},p.prototype.onData=function(t){this.chunks.push(t)},p.prototype.onEnd=function(t){t===l&&("string"===this.options.to?this.result=this.chunks.join(""):this.result=o.flattenChunks(this.chunks)),this.chunks=[],this.err=t,this.msg=this.strm.msg},r.Deflate=p,r.deflate=i,r.deflateRaw=function(t,e){return(e=e||{}).raw=!0,i(t,e)},r.gzip=function(t,e){return(e=e||{}).gzip=!0,i(t,e)}},{"./utils/common":41,"./utils/strings":42,"./zlib/deflate":46,"./zlib/messages":51,"./zlib/zstream":53}],40:[function(t,e,r){"use strict";var d=t("./zlib/inflate"),c=t("./utils/common"),p=t("./utils/strings"),m=t("./zlib/constants"),i=t("./zlib/messages"),n=t("./zlib/zstream"),s=t("./zlib/gzheader"),_=Object.prototype.toString;function a(t){if(!(this instanceof a))return new a(t);this.options=c.assign({chunkSize:16384,windowBits:0,to:""},t||{});var e=this.options;e.raw&&0<=e.windowBits&&e.windowBits<16&&(e.windowBits=-e.windowBits,0===e.windowBits&&(e.windowBits=-15)),!(0<=e.windowBits&&e.windowBits<16)||t&&t.windowBits||(e.windowBits+=32),15<e.windowBits&&e.windowBits<48&&0==(15&e.windowBits)&&(e.windowBits|=15),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new n,this.strm.avail_out=0;var r=d.inflateInit2(this.strm,e.windowBits);if(r!==m.Z_OK)throw new Error(i[r]);this.header=new s,d.inflateGetHeader(this.strm,this.header)}function o(t,e){var r=new a(e);if(r.push(t,!0),r.err)throw r.msg||i[r.err];return r.result}a.prototype.push=function(t,e){var r,i,n,s,a,o,h=this.strm,u=this.options.chunkSize,l=this.options.dictionary,f=!1;if(this.ended)return!1;i=e===~~e?e:!0===e?m.Z_FINISH:m.Z_NO_FLUSH,"string"==typeof t?h.input=p.binstring2buf(t):"[object ArrayBuffer]"===_.call(t)?h.input=new Uint8Array(t):h.input=t,h.next_in=0,h.avail_in=h.input.length;do{if(0===h.avail_out&&(h.output=new c.Buf8(u),h.next_out=0,h.avail_out=u),(r=d.inflate(h,m.Z_NO_FLUSH))===m.Z_NEED_DICT&&l&&(o="string"==typeof l?p.string2buf(l):"[object ArrayBuffer]"===_.call(l)?new Uint8Array(l):l,r=d.inflateSetDictionary(this.strm,o)),r===m.Z_BUF_ERROR&&!0===f&&(r=m.Z_OK,f=!1),r!==m.Z_STREAM_END&&r!==m.Z_OK)return this.onEnd(r),!(this.ended=!0);h.next_out&&(0!==h.avail_out&&r!==m.Z_STREAM_END&&(0!==h.avail_in||i!==m.Z_FINISH&&i!==m.Z_SYNC_FLUSH)||("string"===this.options.to?(n=p.utf8border(h.output,h.next_out),s=h.next_out-n,a=p.buf2string(h.output,n),h.next_out=s,h.avail_out=u-s,s&&c.arraySet(h.output,h.output,n,s,0),this.onData(a)):this.onData(c.shrinkBuf(h.output,h.next_out)))),0===h.avail_in&&0===h.avail_out&&(f=!0)}while((0<h.avail_in||0===h.avail_out)&&r!==m.Z_STREAM_END);return r===m.Z_STREAM_END&&(i=m.Z_FINISH),i===m.Z_FINISH?(r=d.inflateEnd(this.strm),this.onEnd(r),this.ended=!0,r===m.Z_OK):i!==m.Z_SYNC_FLUSH||(this.onEnd(m.Z_OK),!(h.avail_out=0))},a.prototype.onData=function(t){this.chunks.push(t)},a.prototype.onEnd=function(t){t===m.Z_OK&&("string"===this.options.to?this.result=this.chunks.join(""):this.result=c.flattenChunks(this.chunks)),this.chunks=[],this.err=t,this.msg=this.strm.msg},r.Inflate=a,r.inflate=o,r.inflateRaw=function(t,e){return(e=e||{}).raw=!0,o(t,e)},r.ungzip=o},{"./utils/common":41,"./utils/strings":42,"./zlib/constants":44,"./zlib/gzheader":47,"./zlib/inflate":49,"./zlib/messages":51,"./zlib/zstream":53}],41:[function(t,e,r){"use strict";var i="undefined"!=typeof Uint8Array&&"undefined"!=typeof Uint16Array&&"undefined"!=typeof Int32Array;r.assign=function(t){for(var e=Array.prototype.slice.call(arguments,1);e.length;){var r=e.shift();if(r){if("object"!=typeof r)throw new TypeError(r+"must be non-object");for(var i in r)r.hasOwnProperty(i)&&(t[i]=r[i])}}return t},r.shrinkBuf=function(t,e){return t.length===e?t:t.subarray?t.subarray(0,e):(t.length=e,t)};var n={arraySet:function(t,e,r,i,n){if(e.subarray&&t.subarray)t.set(e.subarray(r,r+i),n);else for(var s=0;s<i;s++)t[n+s]=e[r+s]},flattenChunks:function(t){var e,r,i,n,s,a;for(e=i=0,r=t.length;e<r;e++)i+=t[e].length;for(a=new Uint8Array(i),e=n=0,r=t.length;e<r;e++)s=t[e],a.set(s,n),n+=s.length;return a}},s={arraySet:function(t,e,r,i,n){for(var s=0;s<i;s++)t[n+s]=e[r+s]},flattenChunks:function(t){return[].concat.apply([],t)}};r.setTyped=function(t){t?(r.Buf8=Uint8Array,r.Buf16=Uint16Array,r.Buf32=Int32Array,r.assign(r,n)):(r.Buf8=Array,r.Buf16=Array,r.Buf32=Array,r.assign(r,s))},r.setTyped(i)},{}],42:[function(t,e,r){"use strict";var h=t("./common"),n=!0,s=!0;try{String.fromCharCode.apply(null,[0])}catch(t){n=!1}try{String.fromCharCode.apply(null,new Uint8Array(1))}catch(t){s=!1}for(var u=new h.Buf8(256),i=0;i<256;i++)u[i]=252<=i?6:248<=i?5:240<=i?4:224<=i?3:192<=i?2:1;function l(t,e){if(e<65537&&(t.subarray&&s||!t.subarray&&n))return String.fromCharCode.apply(null,h.shrinkBuf(t,e));for(var r="",i=0;i<e;i++)r+=String.fromCharCode(t[i]);return r}u[254]=u[254]=1,r.string2buf=function(t){var e,r,i,n,s,a=t.length,o=0;for(n=0;n<a;n++)55296==(64512&(r=t.charCodeAt(n)))&&n+1<a&&56320==(64512&(i=t.charCodeAt(n+1)))&&(r=65536+(r-55296<<10)+(i-56320),n++),o+=r<128?1:r<2048?2:r<65536?3:4;for(e=new h.Buf8(o),n=s=0;s<o;n++)55296==(64512&(r=t.charCodeAt(n)))&&n+1<a&&56320==(64512&(i=t.charCodeAt(n+1)))&&(r=65536+(r-55296<<10)+(i-56320),n++),r<128?e[s++]=r:(r<2048?e[s++]=192|r>>>6:(r<65536?e[s++]=224|r>>>12:(e[s++]=240|r>>>18,e[s++]=128|r>>>12&63),e[s++]=128|r>>>6&63),e[s++]=128|63&r);return e},r.buf2binstring=function(t){return l(t,t.length)},r.binstring2buf=function(t){for(var e=new h.Buf8(t.length),r=0,i=e.length;r<i;r++)e[r]=t.charCodeAt(r);return e},r.buf2string=function(t,e){var r,i,n,s,a=e||t.length,o=new Array(2*a);for(r=i=0;r<a;)if((n=t[r++])<128)o[i++]=n;else if(4<(s=u[n]))o[i++]=65533,r+=s-1;else{for(n&=2===s?31:3===s?15:7;1<s&&r<a;)n=n<<6|63&t[r++],s--;1<s?o[i++]=65533:n<65536?o[i++]=n:(n-=65536,o[i++]=55296|n>>10&1023,o[i++]=56320|1023&n)}return l(o,i)},r.utf8border=function(t,e){var r;for((e=e||t.length)>t.length&&(e=t.length),r=e-1;0<=r&&128==(192&t[r]);)r--;return r<0?e:0===r?e:r+u[t[r]]>e?r:e}},{"./common":41}],43:[function(t,e,r){"use strict";e.exports=function(t,e,r,i){for(var n=65535&t|0,s=t>>>16&65535|0,a=0;0!==r;){for(r-=a=2e3<r?2e3:r;s=s+(n=n+e[i++]|0)|0,--a;);n%=65521,s%=65521}return n|s<<16|0}},{}],44:[function(t,e,r){"use strict";e.exports={Z_NO_FLUSH:0,Z_PARTIAL_FLUSH:1,Z_SYNC_FLUSH:2,Z_FULL_FLUSH:3,Z_FINISH:4,Z_BLOCK:5,Z_TREES:6,Z_OK:0,Z_STREAM_END:1,Z_NEED_DICT:2,Z_ERRNO:-1,Z_STREAM_ERROR:-2,Z_DATA_ERROR:-3,Z_BUF_ERROR:-5,Z_NO_COMPRESSION:0,Z_BEST_SPEED:1,Z_BEST_COMPRESSION:9,Z_DEFAULT_COMPRESSION:-1,Z_FILTERED:1,Z_HUFFMAN_ONLY:2,Z_RLE:3,Z_FIXED:4,Z_DEFAULT_STRATEGY:0,Z_BINARY:0,Z_TEXT:1,Z_UNKNOWN:2,Z_DEFLATED:8}},{}],45:[function(t,e,r){"use strict";var o=function(){for(var t,e=[],r=0;r<256;r++){t=r;for(var i=0;i<8;i++)t=1&t?3988292384^t>>>1:t>>>1;e[r]=t}return e}();e.exports=function(t,e,r,i){var n=o,s=i+r;t^=-1;for(var a=i;a<s;a++)t=t>>>8^n[255&(t^e[a])];return-1^t}},{}],46:[function(t,e,r){"use strict";var h,d=t("../utils/common"),u=t("./trees"),c=t("./adler32"),p=t("./crc32"),i=t("./messages"),l=0,f=4,m=0,_=-2,g=-1,b=4,n=2,v=8,y=9,s=286,a=30,o=19,w=2*s+1,k=15,x=3,S=258,z=S+x+1,C=42,E=113,A=1,I=2,O=3,B=4;function R(t,e){return t.msg=i[e],e}function T(t){return(t<<1)-(4<t?9:0)}function D(t){for(var e=t.length;0<=--e;)t[e]=0}function F(t){var e=t.state,r=e.pending;r>t.avail_out&&(r=t.avail_out),0!==r&&(d.arraySet(t.output,e.pending_buf,e.pending_out,r,t.next_out),t.next_out+=r,e.pending_out+=r,t.total_out+=r,t.avail_out-=r,e.pending-=r,0===e.pending&&(e.pending_out=0))}function N(t,e){u._tr_flush_block(t,0<=t.block_start?t.block_start:-1,t.strstart-t.block_start,e),t.block_start=t.strstart,F(t.strm)}function U(t,e){t.pending_buf[t.pending++]=e}function P(t,e){t.pending_buf[t.pending++]=e>>>8&255,t.pending_buf[t.pending++]=255&e}function L(t,e){var r,i,n=t.max_chain_length,s=t.strstart,a=t.prev_length,o=t.nice_match,h=t.strstart>t.w_size-z?t.strstart-(t.w_size-z):0,u=t.window,l=t.w_mask,f=t.prev,d=t.strstart+S,c=u[s+a-1],p=u[s+a];t.prev_length>=t.good_match&&(n>>=2),o>t.lookahead&&(o=t.lookahead);do{if(u[(r=e)+a]===p&&u[r+a-1]===c&&u[r]===u[s]&&u[++r]===u[s+1]){s+=2,r++;do{}while(u[++s]===u[++r]&&u[++s]===u[++r]&&u[++s]===u[++r]&&u[++s]===u[++r]&&u[++s]===u[++r]&&u[++s]===u[++r]&&u[++s]===u[++r]&&u[++s]===u[++r]&&s<d);if(i=S-(d-s),s=d-S,a<i){if(t.match_start=e,o<=(a=i))break;c=u[s+a-1],p=u[s+a]}}}while((e=f[e&l])>h&&0!=--n);return a<=t.lookahead?a:t.lookahead}function j(t){var e,r,i,n,s,a,o,h,u,l,f=t.w_size;do{if(n=t.window_size-t.lookahead-t.strstart,t.strstart>=f+(f-z)){for(d.arraySet(t.window,t.window,f,f,0),t.match_start-=f,t.strstart-=f,t.block_start-=f,e=r=t.hash_size;i=t.head[--e],t.head[e]=f<=i?i-f:0,--r;);for(e=r=f;i=t.prev[--e],t.prev[e]=f<=i?i-f:0,--r;);n+=f}if(0===t.strm.avail_in)break;if(a=t.strm,o=t.window,h=t.strstart+t.lookahead,u=n,l=void 0,l=a.avail_in,u<l&&(l=u),r=0===l?0:(a.avail_in-=l,d.arraySet(o,a.input,a.next_in,l,h),1===a.state.wrap?a.adler=c(a.adler,o,l,h):2===a.state.wrap&&(a.adler=p(a.adler,o,l,h)),a.next_in+=l,a.total_in+=l,l),t.lookahead+=r,t.lookahead+t.insert>=x)for(s=t.strstart-t.insert,t.ins_h=t.window[s],t.ins_h=(t.ins_h<<t.hash_shift^t.window[s+1])&t.hash_mask;t.insert&&(t.ins_h=(t.ins_h<<t.hash_shift^t.window[s+x-1])&t.hash_mask,t.prev[s&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=s,s++,t.insert--,!(t.lookahead+t.insert<x)););}while(t.lookahead<z&&0!==t.strm.avail_in)}function Z(t,e){for(var r,i;;){if(t.lookahead<z){if(j(t),t.lookahead<z&&e===l)return A;if(0===t.lookahead)break}if(r=0,t.lookahead>=x&&(t.ins_h=(t.ins_h<<t.hash_shift^t.window[t.strstart+x-1])&t.hash_mask,r=t.prev[t.strstart&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=t.strstart),0!==r&&t.strstart-r<=t.w_size-z&&(t.match_length=L(t,r)),t.match_length>=x)if(i=u._tr_tally(t,t.strstart-t.match_start,t.match_length-x),t.lookahead-=t.match_length,t.match_length<=t.max_lazy_match&&t.lookahead>=x){for(t.match_length--;t.strstart++,t.ins_h=(t.ins_h<<t.hash_shift^t.window[t.strstart+x-1])&t.hash_mask,r=t.prev[t.strstart&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=t.strstart,0!=--t.match_length;);t.strstart++}else t.strstart+=t.match_length,t.match_length=0,t.ins_h=t.window[t.strstart],t.ins_h=(t.ins_h<<t.hash_shift^t.window[t.strstart+1])&t.hash_mask;else i=u._tr_tally(t,0,t.window[t.strstart]),t.lookahead--,t.strstart++;if(i&&(N(t,!1),0===t.strm.avail_out))return A}return t.insert=t.strstart<x-1?t.strstart:x-1,e===f?(N(t,!0),0===t.strm.avail_out?O:B):t.last_lit&&(N(t,!1),0===t.strm.avail_out)?A:I}function W(t,e){for(var r,i,n;;){if(t.lookahead<z){if(j(t),t.lookahead<z&&e===l)return A;if(0===t.lookahead)break}if(r=0,t.lookahead>=x&&(t.ins_h=(t.ins_h<<t.hash_shift^t.window[t.strstart+x-1])&t.hash_mask,r=t.prev[t.strstart&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=t.strstart),t.prev_length=t.match_length,t.prev_match=t.match_start,t.match_length=x-1,0!==r&&t.prev_length<t.max_lazy_match&&t.strstart-r<=t.w_size-z&&(t.match_length=L(t,r),t.match_length<=5&&(1===t.strategy||t.match_length===x&&4096<t.strstart-t.match_start)&&(t.match_length=x-1)),t.prev_length>=x&&t.match_length<=t.prev_length){for(n=t.strstart+t.lookahead-x,i=u._tr_tally(t,t.strstart-1-t.prev_match,t.prev_length-x),t.lookahead-=t.prev_length-1,t.prev_length-=2;++t.strstart<=n&&(t.ins_h=(t.ins_h<<t.hash_shift^t.window[t.strstart+x-1])&t.hash_mask,r=t.prev[t.strstart&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=t.strstart),0!=--t.prev_length;);if(t.match_available=0,t.match_length=x-1,t.strstart++,i&&(N(t,!1),0===t.strm.avail_out))return A}else if(t.match_available){if((i=u._tr_tally(t,0,t.window[t.strstart-1]))&&N(t,!1),t.strstart++,t.lookahead--,0===t.strm.avail_out)return A}else t.match_available=1,t.strstart++,t.lookahead--}return t.match_available&&(i=u._tr_tally(t,0,t.window[t.strstart-1]),t.match_available=0),t.insert=t.strstart<x-1?t.strstart:x-1,e===f?(N(t,!0),0===t.strm.avail_out?O:B):t.last_lit&&(N(t,!1),0===t.strm.avail_out)?A:I}function M(t,e,r,i,n){this.good_length=t,this.max_lazy=e,this.nice_length=r,this.max_chain=i,this.func=n}function H(){this.strm=null,this.status=0,this.pending_buf=null,this.pending_buf_size=0,this.pending_out=0,this.pending=0,this.wrap=0,this.gzhead=null,this.gzindex=0,this.method=v,this.last_flush=-1,this.w_size=0,this.w_bits=0,this.w_mask=0,this.window=null,this.window_size=0,this.prev=null,this.head=null,this.ins_h=0,this.hash_size=0,this.hash_bits=0,this.hash_mask=0,this.hash_shift=0,this.block_start=0,this.match_length=0,this.prev_match=0,this.match_available=0,this.strstart=0,this.match_start=0,this.lookahead=0,this.prev_length=0,this.max_chain_length=0,this.max_lazy_match=0,this.level=0,this.strategy=0,this.good_match=0,this.nice_match=0,this.dyn_ltree=new d.Buf16(2*w),this.dyn_dtree=new d.Buf16(2*(2*a+1)),this.bl_tree=new d.Buf16(2*(2*o+1)),D(this.dyn_ltree),D(this.dyn_dtree),D(this.bl_tree),this.l_desc=null,this.d_desc=null,this.bl_desc=null,this.bl_count=new d.Buf16(k+1),this.heap=new d.Buf16(2*s+1),D(this.heap),this.heap_len=0,this.heap_max=0,this.depth=new d.Buf16(2*s+1),D(this.depth),this.l_buf=0,this.lit_bufsize=0,this.last_lit=0,this.d_buf=0,this.opt_len=0,this.static_len=0,this.matches=0,this.insert=0,this.bi_buf=0,this.bi_valid=0}function G(t){var e;return t&&t.state?(t.total_in=t.total_out=0,t.data_type=n,(e=t.state).pending=0,e.pending_out=0,e.wrap<0&&(e.wrap=-e.wrap),e.status=e.wrap?C:E,t.adler=2===e.wrap?0:1,e.last_flush=l,u._tr_init(e),m):R(t,_)}function K(t){var e=G(t);return e===m&&function(t){t.window_size=2*t.w_size,D(t.head),t.max_lazy_match=h[t.level].max_lazy,t.good_match=h[t.level].good_length,t.nice_match=h[t.level].nice_length,t.max_chain_length=h[t.level].max_chain,t.strstart=0,t.block_start=0,t.lookahead=0,t.insert=0,t.match_length=t.prev_length=x-1,t.match_available=0,t.ins_h=0}(t.state),e}function Y(t,e,r,i,n,s){if(!t)return _;var a=1;if(e===g&&(e=6),i<0?(a=0,i=-i):15<i&&(a=2,i-=16),n<1||y<n||r!==v||i<8||15<i||e<0||9<e||s<0||b<s)return R(t,_);8===i&&(i=9);var o=new H;return(t.state=o).strm=t,o.wrap=a,o.gzhead=null,o.w_bits=i,o.w_size=1<<o.w_bits,o.w_mask=o.w_size-1,o.hash_bits=n+7,o.hash_size=1<<o.hash_bits,o.hash_mask=o.hash_size-1,o.hash_shift=~~((o.hash_bits+x-1)/x),o.window=new d.Buf8(2*o.w_size),o.head=new d.Buf16(o.hash_size),o.prev=new d.Buf16(o.w_size),o.lit_bufsize=1<<n+6,o.pending_buf_size=4*o.lit_bufsize,o.pending_buf=new d.Buf8(o.pending_buf_size),o.d_buf=1*o.lit_bufsize,o.l_buf=3*o.lit_bufsize,o.level=e,o.strategy=s,o.method=r,K(t)}h=[new M(0,0,0,0,function(t,e){var r=65535;for(r>t.pending_buf_size-5&&(r=t.pending_buf_size-5);;){if(t.lookahead<=1){if(j(t),0===t.lookahead&&e===l)return A;if(0===t.lookahead)break}t.strstart+=t.lookahead,t.lookahead=0;var i=t.block_start+r;if((0===t.strstart||t.strstart>=i)&&(t.lookahead=t.strstart-i,t.strstart=i,N(t,!1),0===t.strm.avail_out))return A;if(t.strstart-t.block_start>=t.w_size-z&&(N(t,!1),0===t.strm.avail_out))return A}return t.insert=0,e===f?(N(t,!0),0===t.strm.avail_out?O:B):(t.strstart>t.block_start&&(N(t,!1),t.strm.avail_out),A)}),new M(4,4,8,4,Z),new M(4,5,16,8,Z),new M(4,6,32,32,Z),new M(4,4,16,16,W),new M(8,16,32,32,W),new M(8,16,128,128,W),new M(8,32,128,256,W),new M(32,128,258,1024,W),new M(32,258,258,4096,W)],r.deflateInit=function(t,e){return Y(t,e,v,15,8,0)},r.deflateInit2=Y,r.deflateReset=K,r.deflateResetKeep=G,r.deflateSetHeader=function(t,e){return t&&t.state?2!==t.state.wrap?_:(t.state.gzhead=e,m):_},r.deflate=function(t,e){var r,i,n,s;if(!t||!t.state||5<e||e<0)return t?R(t,_):_;if(i=t.state,!t.output||!t.input&&0!==t.avail_in||666===i.status&&e!==f)return R(t,0===t.avail_out?-5:_);if(i.strm=t,r=i.last_flush,i.last_flush=e,i.status===C)if(2===i.wrap)t.adler=0,U(i,31),U(i,139),U(i,8),i.gzhead?(U(i,(i.gzhead.text?1:0)+(i.gzhead.hcrc?2:0)+(i.gzhead.extra?4:0)+(i.gzhead.name?8:0)+(i.gzhead.comment?16:0)),U(i,255&i.gzhead.time),U(i,i.gzhead.time>>8&255),U(i,i.gzhead.time>>16&255),U(i,i.gzhead.time>>24&255),U(i,9===i.level?2:2<=i.strategy||i.level<2?4:0),U(i,255&i.gzhead.os),i.gzhead.extra&&i.gzhead.extra.length&&(U(i,255&i.gzhead.extra.length),U(i,i.gzhead.extra.length>>8&255)),i.gzhead.hcrc&&(t.adler=p(t.adler,i.pending_buf,i.pending,0)),i.gzindex=0,i.status=69):(U(i,0),U(i,0),U(i,0),U(i,0),U(i,0),U(i,9===i.level?2:2<=i.strategy||i.level<2?4:0),U(i,3),i.status=E);else{var a=v+(i.w_bits-8<<4)<<8;a|=(2<=i.strategy||i.level<2?0:i.level<6?1:6===i.level?2:3)<<6,0!==i.strstart&&(a|=32),a+=31-a%31,i.status=E,P(i,a),0!==i.strstart&&(P(i,t.adler>>>16),P(i,65535&t.adler)),t.adler=1}if(69===i.status)if(i.gzhead.extra){for(n=i.pending;i.gzindex<(65535&i.gzhead.extra.length)&&(i.pending!==i.pending_buf_size||(i.gzhead.hcrc&&i.pending>n&&(t.adler=p(t.adler,i.pending_buf,i.pending-n,n)),F(t),n=i.pending,i.pending!==i.pending_buf_size));)U(i,255&i.gzhead.extra[i.gzindex]),i.gzindex++;i.gzhead.hcrc&&i.pending>n&&(t.adler=p(t.adler,i.pending_buf,i.pending-n,n)),i.gzindex===i.gzhead.extra.length&&(i.gzindex=0,i.status=73)}else i.status=73;if(73===i.status)if(i.gzhead.name){n=i.pending;do{if(i.pending===i.pending_buf_size&&(i.gzhead.hcrc&&i.pending>n&&(t.adler=p(t.adler,i.pending_buf,i.pending-n,n)),F(t),n=i.pending,i.pending===i.pending_buf_size)){s=1;break}s=i.gzindex<i.gzhead.name.length?255&i.gzhead.name.charCodeAt(i.gzindex++):0,U(i,s)}while(0!==s);i.gzhead.hcrc&&i.pending>n&&(t.adler=p(t.adler,i.pending_buf,i.pending-n,n)),0===s&&(i.gzindex=0,i.status=91)}else i.status=91;if(91===i.status)if(i.gzhead.comment){n=i.pending;do{if(i.pending===i.pending_buf_size&&(i.gzhead.hcrc&&i.pending>n&&(t.adler=p(t.adler,i.pending_buf,i.pending-n,n)),F(t),n=i.pending,i.pending===i.pending_buf_size)){s=1;break}s=i.gzindex<i.gzhead.comment.length?255&i.gzhead.comment.charCodeAt(i.gzindex++):0,U(i,s)}while(0!==s);i.gzhead.hcrc&&i.pending>n&&(t.adler=p(t.adler,i.pending_buf,i.pending-n,n)),0===s&&(i.status=103)}else i.status=103;if(103===i.status&&(i.gzhead.hcrc?(i.pending+2>i.pending_buf_size&&F(t),i.pending+2<=i.pending_buf_size&&(U(i,255&t.adler),U(i,t.adler>>8&255),t.adler=0,i.status=E)):i.status=E),0!==i.pending){if(F(t),0===t.avail_out)return i.last_flush=-1,m}else if(0===t.avail_in&&T(e)<=T(r)&&e!==f)return R(t,-5);if(666===i.status&&0!==t.avail_in)return R(t,-5);if(0!==t.avail_in||0!==i.lookahead||e!==l&&666!==i.status){var o=2===i.strategy?function(t,e){for(var r;;){if(0===t.lookahead&&(j(t),0===t.lookahead)){if(e===l)return A;break}if(t.match_length=0,r=u._tr_tally(t,0,t.window[t.strstart]),t.lookahead--,t.strstart++,r&&(N(t,!1),0===t.strm.avail_out))return A}return t.insert=0,e===f?(N(t,!0),0===t.strm.avail_out?O:B):t.last_lit&&(N(t,!1),0===t.strm.avail_out)?A:I}(i,e):3===i.strategy?function(t,e){for(var r,i,n,s,a=t.window;;){if(t.lookahead<=S){if(j(t),t.lookahead<=S&&e===l)return A;if(0===t.lookahead)break}if(t.match_length=0,t.lookahead>=x&&0<t.strstart&&(i=a[n=t.strstart-1])===a[++n]&&i===a[++n]&&i===a[++n]){s=t.strstart+S;do{}while(i===a[++n]&&i===a[++n]&&i===a[++n]&&i===a[++n]&&i===a[++n]&&i===a[++n]&&i===a[++n]&&i===a[++n]&&n<s);t.match_length=S-(s-n),t.match_length>t.lookahead&&(t.match_length=t.lookahead)}if(t.match_length>=x?(r=u._tr_tally(t,1,t.match_length-x),t.lookahead-=t.match_length,t.strstart+=t.match_length,t.match_length=0):(r=u._tr_tally(t,0,t.window[t.strstart]),t.lookahead--,t.strstart++),r&&(N(t,!1),0===t.strm.avail_out))return A}return t.insert=0,e===f?(N(t,!0),0===t.strm.avail_out?O:B):t.last_lit&&(N(t,!1),0===t.strm.avail_out)?A:I}(i,e):h[i.level].func(i,e);if(o!==O&&o!==B||(i.status=666),o===A||o===O)return 0===t.avail_out&&(i.last_flush=-1),m;if(o===I&&(1===e?u._tr_align(i):5!==e&&(u._tr_stored_block(i,0,0,!1),3===e&&(D(i.head),0===i.lookahead&&(i.strstart=0,i.block_start=0,i.insert=0))),F(t),0===t.avail_out))return i.last_flush=-1,m}return e!==f?m:i.wrap<=0?1:(2===i.wrap?(U(i,255&t.adler),U(i,t.adler>>8&255),U(i,t.adler>>16&255),U(i,t.adler>>24&255),U(i,255&t.total_in),U(i,t.total_in>>8&255),U(i,t.total_in>>16&255),U(i,t.total_in>>24&255)):(P(i,t.adler>>>16),P(i,65535&t.adler)),F(t),0<i.wrap&&(i.wrap=-i.wrap),0!==i.pending?m:1)},r.deflateEnd=function(t){var e;return t&&t.state?(e=t.state.status)!==C&&69!==e&&73!==e&&91!==e&&103!==e&&e!==E&&666!==e?R(t,_):(t.state=null,e===E?R(t,-3):m):_},r.deflateSetDictionary=function(t,e){var r,i,n,s,a,o,h,u,l=e.length;if(!t||!t.state)return _;if(2===(s=(r=t.state).wrap)||1===s&&r.status!==C||r.lookahead)return _;for(1===s&&(t.adler=c(t.adler,e,l,0)),r.wrap=0,l>=r.w_size&&(0===s&&(D(r.head),r.strstart=0,r.block_start=0,r.insert=0),u=new d.Buf8(r.w_size),d.arraySet(u,e,l-r.w_size,r.w_size,0),e=u,l=r.w_size),a=t.avail_in,o=t.next_in,h=t.input,t.avail_in=l,t.next_in=0,t.input=e,j(r);r.lookahead>=x;){for(i=r.strstart,n=r.lookahead-(x-1);r.ins_h=(r.ins_h<<r.hash_shift^r.window[i+x-1])&r.hash_mask,r.prev[i&r.w_mask]=r.head[r.ins_h],r.head[r.ins_h]=i,i++,--n;);r.strstart=i,r.lookahead=x-1,j(r)}return r.strstart+=r.lookahead,r.block_start=r.strstart,r.insert=r.lookahead,r.lookahead=0,r.match_length=r.prev_length=x-1,r.match_available=0,t.next_in=o,t.input=h,t.avail_in=a,r.wrap=s,m},r.deflateInfo="pako deflate (from Nodeca project)"},{"../utils/common":41,"./adler32":43,"./crc32":45,"./messages":51,"./trees":52}],47:[function(t,e,r){"use strict";e.exports=function(){this.text=0,this.time=0,this.xflags=0,this.os=0,this.extra=null,this.extra_len=0,this.name="",this.comment="",this.hcrc=0,this.done=!1}},{}],48:[function(t,e,r){"use strict";e.exports=function(t,e){var r,i,n,s,a,o,h,u,l,f,d,c,p,m,_,g,b,v,y,w,k,x,S,z,C;r=t.state,i=t.next_in,z=t.input,n=i+(t.avail_in-5),s=t.next_out,C=t.output,a=s-(e-t.avail_out),o=s+(t.avail_out-257),h=r.dmax,u=r.wsize,l=r.whave,f=r.wnext,d=r.window,c=r.hold,p=r.bits,m=r.lencode,_=r.distcode,g=(1<<r.lenbits)-1,b=(1<<r.distbits)-1;t:do{p<15&&(c+=z[i++]<<p,p+=8,c+=z[i++]<<p,p+=8),v=m[c&g];e:for(;;){if(c>>>=y=v>>>24,p-=y,0===(y=v>>>16&255))C[s++]=65535&v;else{if(!(16&y)){if(0==(64&y)){v=m[(65535&v)+(c&(1<<y)-1)];continue e}if(32&y){r.mode=12;break t}t.msg="invalid literal/length code",r.mode=30;break t}w=65535&v,(y&=15)&&(p<y&&(c+=z[i++]<<p,p+=8),w+=c&(1<<y)-1,c>>>=y,p-=y),p<15&&(c+=z[i++]<<p,p+=8,c+=z[i++]<<p,p+=8),v=_[c&b];r:for(;;){if(c>>>=y=v>>>24,p-=y,!(16&(y=v>>>16&255))){if(0==(64&y)){v=_[(65535&v)+(c&(1<<y)-1)];continue r}t.msg="invalid distance code",r.mode=30;break t}if(k=65535&v,p<(y&=15)&&(c+=z[i++]<<p,(p+=8)<y&&(c+=z[i++]<<p,p+=8)),h<(k+=c&(1<<y)-1)){t.msg="invalid distance too far back",r.mode=30;break t}if(c>>>=y,p-=y,(y=s-a)<k){if(l<(y=k-y)&&r.sane){t.msg="invalid distance too far back",r.mode=30;break t}if(S=d,(x=0)===f){if(x+=u-y,y<w){for(w-=y;C[s++]=d[x++],--y;);x=s-k,S=C}}else if(f<y){if(x+=u+f-y,(y-=f)<w){for(w-=y;C[s++]=d[x++],--y;);if(x=0,f<w){for(w-=y=f;C[s++]=d[x++],--y;);x=s-k,S=C}}}else if(x+=f-y,y<w){for(w-=y;C[s++]=d[x++],--y;);x=s-k,S=C}for(;2<w;)C[s++]=S[x++],C[s++]=S[x++],C[s++]=S[x++],w-=3;w&&(C[s++]=S[x++],1<w&&(C[s++]=S[x++]))}else{for(x=s-k;C[s++]=C[x++],C[s++]=C[x++],C[s++]=C[x++],2<(w-=3););w&&(C[s++]=C[x++],1<w&&(C[s++]=C[x++]))}break}}break}}while(i<n&&s<o);i-=w=p>>3,c&=(1<<(p-=w<<3))-1,t.next_in=i,t.next_out=s,t.avail_in=i<n?n-i+5:5-(i-n),t.avail_out=s<o?o-s+257:257-(s-o),r.hold=c,r.bits=p}},{}],49:[function(t,e,r){"use strict";var I=t("../utils/common"),O=t("./adler32"),B=t("./crc32"),R=t("./inffast"),T=t("./inftrees"),D=1,F=2,N=0,U=-2,P=1,i=852,n=592;function L(t){return(t>>>24&255)+(t>>>8&65280)+((65280&t)<<8)+((255&t)<<24)}function s(){this.mode=0,this.last=!1,this.wrap=0,this.havedict=!1,this.flags=0,this.dmax=0,this.check=0,this.total=0,this.head=null,this.wbits=0,this.wsize=0,this.whave=0,this.wnext=0,this.window=null,this.hold=0,this.bits=0,this.length=0,this.offset=0,this.extra=0,this.lencode=null,this.distcode=null,this.lenbits=0,this.distbits=0,this.ncode=0,this.nlen=0,this.ndist=0,this.have=0,this.next=null,this.lens=new I.Buf16(320),this.work=new I.Buf16(288),this.lendyn=null,this.distdyn=null,this.sane=0,this.back=0,this.was=0}function a(t){var e;return t&&t.state?(e=t.state,t.total_in=t.total_out=e.total=0,t.msg="",e.wrap&&(t.adler=1&e.wrap),e.mode=P,e.last=0,e.havedict=0,e.dmax=32768,e.head=null,e.hold=0,e.bits=0,e.lencode=e.lendyn=new I.Buf32(i),e.distcode=e.distdyn=new I.Buf32(n),e.sane=1,e.back=-1,N):U}function o(t){var e;return t&&t.state?((e=t.state).wsize=0,e.whave=0,e.wnext=0,a(t)):U}function h(t,e){var r,i;return t&&t.state?(i=t.state,e<0?(r=0,e=-e):(r=1+(e>>4),e<48&&(e&=15)),e&&(e<8||15<e)?U:(null!==i.window&&i.wbits!==e&&(i.window=null),i.wrap=r,i.wbits=e,o(t))):U}function u(t,e){var r,i;return t?(i=new s,(t.state=i).window=null,(r=h(t,e))!==N&&(t.state=null),r):U}var l,f,d=!0;function j(t){if(d){var e;for(l=new I.Buf32(512),f=new I.Buf32(32),e=0;e<144;)t.lens[e++]=8;for(;e<256;)t.lens[e++]=9;for(;e<280;)t.lens[e++]=7;for(;e<288;)t.lens[e++]=8;for(T(D,t.lens,0,288,l,0,t.work,{bits:9}),e=0;e<32;)t.lens[e++]=5;T(F,t.lens,0,32,f,0,t.work,{bits:5}),d=!1}t.lencode=l,t.lenbits=9,t.distcode=f,t.distbits=5}function Z(t,e,r,i){var n,s=t.state;return null===s.window&&(s.wsize=1<<s.wbits,s.wnext=0,s.whave=0,s.window=new I.Buf8(s.wsize)),i>=s.wsize?(I.arraySet(s.window,e,r-s.wsize,s.wsize,0),s.wnext=0,s.whave=s.wsize):(i<(n=s.wsize-s.wnext)&&(n=i),I.arraySet(s.window,e,r-i,n,s.wnext),(i-=n)?(I.arraySet(s.window,e,r-i,i,0),s.wnext=i,s.whave=s.wsize):(s.wnext+=n,s.wnext===s.wsize&&(s.wnext=0),s.whave<s.wsize&&(s.whave+=n))),0}r.inflateReset=o,r.inflateReset2=h,r.inflateResetKeep=a,r.inflateInit=function(t){return u(t,15)},r.inflateInit2=u,r.inflate=function(t,e){var r,i,n,s,a,o,h,u,l,f,d,c,p,m,_,g,b,v,y,w,k,x,S,z,C=0,E=new I.Buf8(4),A=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15];if(!t||!t.state||!t.output||!t.input&&0!==t.avail_in)return U;12===(r=t.state).mode&&(r.mode=13),a=t.next_out,n=t.output,h=t.avail_out,s=t.next_in,i=t.input,o=t.avail_in,u=r.hold,l=r.bits,f=o,d=h,x=N;t:for(;;)switch(r.mode){case P:if(0===r.wrap){r.mode=13;break}for(;l<16;){if(0===o)break t;o--,u+=i[s++]<<l,l+=8}if(2&r.wrap&&35615===u){E[r.check=0]=255&u,E[1]=u>>>8&255,r.check=B(r.check,E,2,0),l=u=0,r.mode=2;break}if(r.flags=0,r.head&&(r.head.done=!1),!(1&r.wrap)||(((255&u)<<8)+(u>>8))%31){t.msg="incorrect header check",r.mode=30;break}if(8!=(15&u)){t.msg="unknown compression method",r.mode=30;break}if(l-=4,k=8+(15&(u>>>=4)),0===r.wbits)r.wbits=k;else if(k>r.wbits){t.msg="invalid window size",r.mode=30;break}r.dmax=1<<k,t.adler=r.check=1,r.mode=512&u?10:12,l=u=0;break;case 2:for(;l<16;){if(0===o)break t;o--,u+=i[s++]<<l,l+=8}if(r.flags=u,8!=(255&r.flags)){t.msg="unknown compression method",r.mode=30;break}if(57344&r.flags){t.msg="unknown header flags set",r.mode=30;break}r.head&&(r.head.text=u>>8&1),512&r.flags&&(E[0]=255&u,E[1]=u>>>8&255,r.check=B(r.check,E,2,0)),l=u=0,r.mode=3;case 3:for(;l<32;){if(0===o)break t;o--,u+=i[s++]<<l,l+=8}r.head&&(r.head.time=u),512&r.flags&&(E[0]=255&u,E[1]=u>>>8&255,E[2]=u>>>16&255,E[3]=u>>>24&255,r.check=B(r.check,E,4,0)),l=u=0,r.mode=4;case 4:for(;l<16;){if(0===o)break t;o--,u+=i[s++]<<l,l+=8}r.head&&(r.head.xflags=255&u,r.head.os=u>>8),512&r.flags&&(E[0]=255&u,E[1]=u>>>8&255,r.check=B(r.check,E,2,0)),l=u=0,r.mode=5;case 5:if(1024&r.flags){for(;l<16;){if(0===o)break t;o--,u+=i[s++]<<l,l+=8}r.length=u,r.head&&(r.head.extra_len=u),512&r.flags&&(E[0]=255&u,E[1]=u>>>8&255,r.check=B(r.check,E,2,0)),l=u=0}else r.head&&(r.head.extra=null);r.mode=6;case 6:if(1024&r.flags&&(o<(c=r.length)&&(c=o),c&&(r.head&&(k=r.head.extra_len-r.length,r.head.extra||(r.head.extra=new Array(r.head.extra_len)),I.arraySet(r.head.extra,i,s,c,k)),512&r.flags&&(r.check=B(r.check,i,c,s)),o-=c,s+=c,r.length-=c),r.length))break t;r.length=0,r.mode=7;case 7:if(2048&r.flags){if(0===o)break t;for(c=0;k=i[s+c++],r.head&&k&&r.length<65536&&(r.head.name+=String.fromCharCode(k)),k&&c<o;);if(512&r.flags&&(r.check=B(r.check,i,c,s)),o-=c,s+=c,k)break t}else r.head&&(r.head.name=null);r.length=0,r.mode=8;case 8:if(4096&r.flags){if(0===o)break t;for(c=0;k=i[s+c++],r.head&&k&&r.length<65536&&(r.head.comment+=String.fromCharCode(k)),k&&c<o;);if(512&r.flags&&(r.check=B(r.check,i,c,s)),o-=c,s+=c,k)break t}else r.head&&(r.head.comment=null);r.mode=9;case 9:if(512&r.flags){for(;l<16;){if(0===o)break t;o--,u+=i[s++]<<l,l+=8}if(u!==(65535&r.check)){t.msg="header crc mismatch",r.mode=30;break}l=u=0}r.head&&(r.head.hcrc=r.flags>>9&1,r.head.done=!0),t.adler=r.check=0,r.mode=12;break;case 10:for(;l<32;){if(0===o)break t;o--,u+=i[s++]<<l,l+=8}t.adler=r.check=L(u),l=u=0,r.mode=11;case 11:if(0===r.havedict)return t.next_out=a,t.avail_out=h,t.next_in=s,t.avail_in=o,r.hold=u,r.bits=l,2;t.adler=r.check=1,r.mode=12;case 12:if(5===e||6===e)break t;case 13:if(r.last){u>>>=7&l,l-=7&l,r.mode=27;break}for(;l<3;){if(0===o)break t;o--,u+=i[s++]<<l,l+=8}switch(r.last=1&u,l-=1,3&(u>>>=1)){case 0:r.mode=14;break;case 1:if(j(r),r.mode=20,6!==e)break;u>>>=2,l-=2;break t;case 2:r.mode=17;break;case 3:t.msg="invalid block type",r.mode=30}u>>>=2,l-=2;break;case 14:for(u>>>=7&l,l-=7&l;l<32;){if(0===o)break t;o--,u+=i[s++]<<l,l+=8}if((65535&u)!=(u>>>16^65535)){t.msg="invalid stored block lengths",r.mode=30;break}if(r.length=65535&u,l=u=0,r.mode=15,6===e)break t;case 15:r.mode=16;case 16:if(c=r.length){if(o<c&&(c=o),h<c&&(c=h),0===c)break t;I.arraySet(n,i,s,c,a),o-=c,s+=c,h-=c,a+=c,r.length-=c;break}r.mode=12;break;case 17:for(;l<14;){if(0===o)break t;o--,u+=i[s++]<<l,l+=8}if(r.nlen=257+(31&u),u>>>=5,l-=5,r.ndist=1+(31&u),u>>>=5,l-=5,r.ncode=4+(15&u),u>>>=4,l-=4,286<r.nlen||30<r.ndist){t.msg="too many length or distance symbols",r.mode=30;break}r.have=0,r.mode=18;case 18:for(;r.have<r.ncode;){for(;l<3;){if(0===o)break t;o--,u+=i[s++]<<l,l+=8}r.lens[A[r.have++]]=7&u,u>>>=3,l-=3}for(;r.have<19;)r.lens[A[r.have++]]=0;if(r.lencode=r.lendyn,r.lenbits=7,S={bits:r.lenbits},x=T(0,r.lens,0,19,r.lencode,0,r.work,S),r.lenbits=S.bits,x){t.msg="invalid code lengths set",r.mode=30;break}r.have=0,r.mode=19;case 19:for(;r.have<r.nlen+r.ndist;){for(;g=(C=r.lencode[u&(1<<r.lenbits)-1])>>>16&255,b=65535&C,!((_=C>>>24)<=l);){if(0===o)break t;o--,u+=i[s++]<<l,l+=8}if(b<16)u>>>=_,l-=_,r.lens[r.have++]=b;else{if(16===b){for(z=_+2;l<z;){if(0===o)break t;o--,u+=i[s++]<<l,l+=8}if(u>>>=_,l-=_,0===r.have){t.msg="invalid bit length repeat",r.mode=30;break}k=r.lens[r.have-1],c=3+(3&u),u>>>=2,l-=2}else if(17===b){for(z=_+3;l<z;){if(0===o)break t;o--,u+=i[s++]<<l,l+=8}l-=_,k=0,c=3+(7&(u>>>=_)),u>>>=3,l-=3}else{for(z=_+7;l<z;){if(0===o)break t;o--,u+=i[s++]<<l,l+=8}l-=_,k=0,c=11+(127&(u>>>=_)),u>>>=7,l-=7}if(r.have+c>r.nlen+r.ndist){t.msg="invalid bit length repeat",r.mode=30;break}for(;c--;)r.lens[r.have++]=k}}if(30===r.mode)break;if(0===r.lens[256]){t.msg="invalid code -- missing end-of-block",r.mode=30;break}if(r.lenbits=9,S={bits:r.lenbits},x=T(D,r.lens,0,r.nlen,r.lencode,0,r.work,S),r.lenbits=S.bits,x){t.msg="invalid literal/lengths set",r.mode=30;break}if(r.distbits=6,r.distcode=r.distdyn,S={bits:r.distbits},x=T(F,r.lens,r.nlen,r.ndist,r.distcode,0,r.work,S),r.distbits=S.bits,x){t.msg="invalid distances set",r.mode=30;break}if(r.mode=20,6===e)break t;case 20:r.mode=21;case 21:if(6<=o&&258<=h){t.next_out=a,t.avail_out=h,t.next_in=s,t.avail_in=o,r.hold=u,r.bits=l,R(t,d),a=t.next_out,n=t.output,h=t.avail_out,s=t.next_in,i=t.input,o=t.avail_in,u=r.hold,l=r.bits,12===r.mode&&(r.back=-1);break}for(r.back=0;g=(C=r.lencode[u&(1<<r.lenbits)-1])>>>16&255,b=65535&C,!((_=C>>>24)<=l);){if(0===o)break t;o--,u+=i[s++]<<l,l+=8}if(g&&0==(240&g)){for(v=_,y=g,w=b;g=(C=r.lencode[w+((u&(1<<v+y)-1)>>v)])>>>16&255,b=65535&C,!(v+(_=C>>>24)<=l);){if(0===o)break t;o--,u+=i[s++]<<l,l+=8}u>>>=v,l-=v,r.back+=v}if(u>>>=_,l-=_,r.back+=_,r.length=b,0===g){r.mode=26;break}if(32&g){r.back=-1,r.mode=12;break}if(64&g){t.msg="invalid literal/length code",r.mode=30;break}r.extra=15&g,r.mode=22;case 22:if(r.extra){for(z=r.extra;l<z;){if(0===o)break t;o--,u+=i[s++]<<l,l+=8}r.length+=u&(1<<r.extra)-1,u>>>=r.extra,l-=r.extra,r.back+=r.extra}r.was=r.length,r.mode=23;case 23:for(;g=(C=r.distcode[u&(1<<r.distbits)-1])>>>16&255,b=65535&C,!((_=C>>>24)<=l);){if(0===o)break t;o--,u+=i[s++]<<l,l+=8}if(0==(240&g)){for(v=_,y=g,w=b;g=(C=r.distcode[w+((u&(1<<v+y)-1)>>v)])>>>16&255,b=65535&C,!(v+(_=C>>>24)<=l);){if(0===o)break t;o--,u+=i[s++]<<l,l+=8}u>>>=v,l-=v,r.back+=v}if(u>>>=_,l-=_,r.back+=_,64&g){t.msg="invalid distance code",r.mode=30;break}r.offset=b,r.extra=15&g,r.mode=24;case 24:if(r.extra){for(z=r.extra;l<z;){if(0===o)break t;o--,u+=i[s++]<<l,l+=8}r.offset+=u&(1<<r.extra)-1,u>>>=r.extra,l-=r.extra,r.back+=r.extra}if(r.offset>r.dmax){t.msg="invalid distance too far back",r.mode=30;break}r.mode=25;case 25:if(0===h)break t;if(c=d-h,r.offset>c){if((c=r.offset-c)>r.whave&&r.sane){t.msg="invalid distance too far back",r.mode=30;break}p=c>r.wnext?(c-=r.wnext,r.wsize-c):r.wnext-c,c>r.length&&(c=r.length),m=r.window}else m=n,p=a-r.offset,c=r.length;for(h<c&&(c=h),h-=c,r.length-=c;n[a++]=m[p++],--c;);0===r.length&&(r.mode=21);break;case 26:if(0===h)break t;n[a++]=r.length,h--,r.mode=21;break;case 27:if(r.wrap){for(;l<32;){if(0===o)break t;o--,u|=i[s++]<<l,l+=8}if(d-=h,t.total_out+=d,r.total+=d,d&&(t.adler=r.check=r.flags?B(r.check,n,d,a-d):O(r.check,n,d,a-d)),d=h,(r.flags?u:L(u))!==r.check){t.msg="incorrect data check",r.mode=30;break}l=u=0}r.mode=28;case 28:if(r.wrap&&r.flags){for(;l<32;){if(0===o)break t;o--,u+=i[s++]<<l,l+=8}if(u!==(4294967295&r.total)){t.msg="incorrect length check",r.mode=30;break}l=u=0}r.mode=29;case 29:x=1;break t;case 30:x=-3;break t;case 31:return-4;case 32:default:return U}return t.next_out=a,t.avail_out=h,t.next_in=s,t.avail_in=o,r.hold=u,r.bits=l,(r.wsize||d!==t.avail_out&&r.mode<30&&(r.mode<27||4!==e))&&Z(t,t.output,t.next_out,d-t.avail_out)?(r.mode=31,-4):(f-=t.avail_in,d-=t.avail_out,t.total_in+=f,t.total_out+=d,r.total+=d,r.wrap&&d&&(t.adler=r.check=r.flags?B(r.check,n,d,t.next_out-d):O(r.check,n,d,t.next_out-d)),t.data_type=r.bits+(r.last?64:0)+(12===r.mode?128:0)+(20===r.mode||15===r.mode?256:0),(0==f&&0===d||4===e)&&x===N&&(x=-5),x)},r.inflateEnd=function(t){if(!t||!t.state)return U;var e=t.state;return e.window&&(e.window=null),t.state=null,N},r.inflateGetHeader=function(t,e){var r;return t&&t.state?0==(2&(r=t.state).wrap)?U:((r.head=e).done=!1,N):U},r.inflateSetDictionary=function(t,e){var r,i=e.length;return t&&t.state?0!==(r=t.state).wrap&&11!==r.mode?U:11===r.mode&&O(1,e,i,0)!==r.check?-3:Z(t,e,i,i)?(r.mode=31,-4):(r.havedict=1,N):U},r.inflateInfo="pako inflate (from Nodeca project)"},{"../utils/common":41,"./adler32":43,"./crc32":45,"./inffast":48,"./inftrees":50}],50:[function(t,e,r){"use strict";var D=t("../utils/common"),F=[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,0,0],N=[16,16,16,16,16,16,16,16,17,17,17,17,18,18,18,18,19,19,19,19,20,20,20,20,21,21,21,21,16,72,78],U=[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577,0,0],P=[16,16,16,16,17,17,18,18,19,19,20,20,21,21,22,22,23,23,24,24,25,25,26,26,27,27,28,28,29,29,64,64];e.exports=function(t,e,r,i,n,s,a,o){var h,u,l,f,d,c,p,m,_,g=o.bits,b=0,v=0,y=0,w=0,k=0,x=0,S=0,z=0,C=0,E=0,A=null,I=0,O=new D.Buf16(16),B=new D.Buf16(16),R=null,T=0;for(b=0;b<=15;b++)O[b]=0;for(v=0;v<i;v++)O[e[r+v]]++;for(k=g,w=15;1<=w&&0===O[w];w--);if(w<k&&(k=w),0===w)return n[s++]=20971520,n[s++]=20971520,o.bits=1,0;for(y=1;y<w&&0===O[y];y++);for(k<y&&(k=y),b=z=1;b<=15;b++)if(z<<=1,(z-=O[b])<0)return-1;if(0<z&&(0===t||1!==w))return-1;for(B[1]=0,b=1;b<15;b++)B[b+1]=B[b]+O[b];for(v=0;v<i;v++)0!==e[r+v]&&(a[B[e[r+v]]++]=v);if(c=0===t?(A=R=a,19):1===t?(A=F,I-=257,R=N,T-=257,256):(A=U,R=P,-1),b=y,d=s,S=v=E=0,l=-1,f=(C=1<<(x=k))-1,1===t&&852<C||2===t&&592<C)return 1;for(;;){for(p=b-S,_=a[v]<c?(m=0,a[v]):a[v]>c?(m=R[T+a[v]],A[I+a[v]]):(m=96,0),h=1<<b-S,y=u=1<<x;n[d+(E>>S)+(u-=h)]=p<<24|m<<16|_|0,0!==u;);for(h=1<<b-1;E&h;)h>>=1;if(0!==h?(E&=h-1,E+=h):E=0,v++,0==--O[b]){if(b===w)break;b=e[r+a[v]]}if(k<b&&(E&f)!==l){for(0===S&&(S=k),d+=y,z=1<<(x=b-S);x+S<w&&!((z-=O[x+S])<=0);)x++,z<<=1;if(C+=1<<x,1===t&&852<C||2===t&&592<C)return 1;n[l=E&f]=k<<24|x<<16|d-s|0}}return 0!==E&&(n[d+E]=b-S<<24|64<<16|0),o.bits=k,0}},{"../utils/common":41}],51:[function(t,e,r){"use strict";e.exports={2:"need dictionary",1:"stream end",0:"","-1":"file error","-2":"stream error","-3":"data error","-4":"insufficient memory","-5":"buffer error","-6":"incompatible version"}},{}],52:[function(t,e,r){"use strict";var n=t("../utils/common"),o=0,h=1;function i(t){for(var e=t.length;0<=--e;)t[e]=0}var s=0,a=29,u=256,l=u+1+a,f=30,d=19,_=2*l+1,g=15,c=16,p=7,m=256,b=16,v=17,y=18,w=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0],k=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13],x=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7],S=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],z=new Array(2*(l+2));i(z);var C=new Array(2*f);i(C);var E=new Array(512);i(E);var A=new Array(256);i(A);var I=new Array(a);i(I);var O,B,R,T=new Array(f);function D(t,e,r,i,n){this.static_tree=t,this.extra_bits=e,this.extra_base=r,this.elems=i,this.max_length=n,this.has_stree=t&&t.length}function F(t,e){this.dyn_tree=t,this.max_code=0,this.stat_desc=e}function N(t){return t<256?E[t]:E[256+(t>>>7)]}function U(t,e){t.pending_buf[t.pending++]=255&e,t.pending_buf[t.pending++]=e>>>8&255}function P(t,e,r){t.bi_valid>c-r?(t.bi_buf|=e<<t.bi_valid&65535,U(t,t.bi_buf),t.bi_buf=e>>c-t.bi_valid,t.bi_valid+=r-c):(t.bi_buf|=e<<t.bi_valid&65535,t.bi_valid+=r)}function L(t,e,r){P(t,r[2*e],r[2*e+1])}function j(t,e){for(var r=0;r|=1&t,t>>>=1,r<<=1,0<--e;);return r>>>1}function Z(t,e,r){var i,n,s=new Array(g+1),a=0;for(i=1;i<=g;i++)s[i]=a=a+r[i-1]<<1;for(n=0;n<=e;n++){var o=t[2*n+1];0!==o&&(t[2*n]=j(s[o]++,o))}}function W(t){var e;for(e=0;e<l;e++)t.dyn_ltree[2*e]=0;for(e=0;e<f;e++)t.dyn_dtree[2*e]=0;for(e=0;e<d;e++)t.bl_tree[2*e]=0;t.dyn_ltree[2*m]=1,t.opt_len=t.static_len=0,t.last_lit=t.matches=0}function M(t){8<t.bi_valid?U(t,t.bi_buf):0<t.bi_valid&&(t.pending_buf[t.pending++]=t.bi_buf),t.bi_buf=0,t.bi_valid=0}function H(t,e,r,i){var n=2*e,s=2*r;return t[n]<t[s]||t[n]===t[s]&&i[e]<=i[r]}function G(t,e,r){for(var i=t.heap[r],n=r<<1;n<=t.heap_len&&(n<t.heap_len&&H(e,t.heap[n+1],t.heap[n],t.depth)&&n++,!H(e,i,t.heap[n],t.depth));)t.heap[r]=t.heap[n],r=n,n<<=1;t.heap[r]=i}function K(t,e,r){var i,n,s,a,o=0;if(0!==t.last_lit)for(;i=t.pending_buf[t.d_buf+2*o]<<8|t.pending_buf[t.d_buf+2*o+1],n=t.pending_buf[t.l_buf+o],o++,0===i?L(t,n,e):(L(t,(s=A[n])+u+1,e),0!==(a=w[s])&&P(t,n-=I[s],a),L(t,s=N(--i),r),0!==(a=k[s])&&P(t,i-=T[s],a)),o<t.last_lit;);L(t,m,e)}function Y(t,e){var r,i,n,s=e.dyn_tree,a=e.stat_desc.static_tree,o=e.stat_desc.has_stree,h=e.stat_desc.elems,u=-1;for(t.heap_len=0,t.heap_max=_,r=0;r<h;r++)0!==s[2*r]?(t.heap[++t.heap_len]=u=r,t.depth[r]=0):s[2*r+1]=0;for(;t.heap_len<2;)s[2*(n=t.heap[++t.heap_len]=u<2?++u:0)]=1,t.depth[n]=0,t.opt_len--,o&&(t.static_len-=a[2*n+1]);for(e.max_code=u,r=t.heap_len>>1;1<=r;r--)G(t,s,r);for(n=h;r=t.heap[1],t.heap[1]=t.heap[t.heap_len--],G(t,s,1),i=t.heap[1],t.heap[--t.heap_max]=r,t.heap[--t.heap_max]=i,s[2*n]=s[2*r]+s[2*i],t.depth[n]=(t.depth[r]>=t.depth[i]?t.depth[r]:t.depth[i])+1,s[2*r+1]=s[2*i+1]=n,t.heap[1]=n++,G(t,s,1),2<=t.heap_len;);t.heap[--t.heap_max]=t.heap[1],function(t,e){var r,i,n,s,a,o,h=e.dyn_tree,u=e.max_code,l=e.stat_desc.static_tree,f=e.stat_desc.has_stree,d=e.stat_desc.extra_bits,c=e.stat_desc.extra_base,p=e.stat_desc.max_length,m=0;for(s=0;s<=g;s++)t.bl_count[s]=0;for(h[2*t.heap[t.heap_max]+1]=0,r=t.heap_max+1;r<_;r++)p<(s=h[2*h[2*(i=t.heap[r])+1]+1]+1)&&(s=p,m++),h[2*i+1]=s,u<i||(t.bl_count[s]++,a=0,c<=i&&(a=d[i-c]),o=h[2*i],t.opt_len+=o*(s+a),f&&(t.static_len+=o*(l[2*i+1]+a)));if(0!==m){do{for(s=p-1;0===t.bl_count[s];)s--;t.bl_count[s]--,t.bl_count[s+1]+=2,t.bl_count[p]--,m-=2}while(0<m);for(s=p;0!==s;s--)for(i=t.bl_count[s];0!==i;)u<(n=t.heap[--r])||(h[2*n+1]!==s&&(t.opt_len+=(s-h[2*n+1])*h[2*n],h[2*n+1]=s),i--)}}(t,e),Z(s,u,t.bl_count)}function X(t,e,r){var i,n,s=-1,a=e[1],o=0,h=7,u=4;for(0===a&&(h=138,u=3),e[2*(r+1)+1]=65535,i=0;i<=r;i++)n=a,a=e[2*(i+1)+1],++o<h&&n===a||(o<u?t.bl_tree[2*n]+=o:0!==n?(n!==s&&t.bl_tree[2*n]++,t.bl_tree[2*b]++):o<=10?t.bl_tree[2*v]++:t.bl_tree[2*y]++,s=n,u=(o=0)===a?(h=138,3):n===a?(h=6,3):(h=7,4))}function V(t,e,r){var i,n,s=-1,a=e[1],o=0,h=7,u=4;for(0===a&&(h=138,u=3),i=0;i<=r;i++)if(n=a,a=e[2*(i+1)+1],!(++o<h&&n===a)){if(o<u)for(;L(t,n,t.bl_tree),0!=--o;);else 0!==n?(n!==s&&(L(t,n,t.bl_tree),o--),L(t,b,t.bl_tree),P(t,o-3,2)):o<=10?(L(t,v,t.bl_tree),P(t,o-3,3)):(L(t,y,t.bl_tree),P(t,o-11,7));s=n,u=(o=0)===a?(h=138,3):n===a?(h=6,3):(h=7,4)}}i(T);var q=!1;function J(t,e,r,i){P(t,(s<<1)+(i?1:0),3),function(t,e,r,i){M(t),i&&(U(t,r),U(t,~r)),n.arraySet(t.pending_buf,t.window,e,r,t.pending),t.pending+=r}(t,e,r,!0)}r._tr_init=function(t){q||(function(){var t,e,r,i,n,s=new Array(g+1);for(i=r=0;i<a-1;i++)for(I[i]=r,t=0;t<1<<w[i];t++)A[r++]=i;for(A[r-1]=i,i=n=0;i<16;i++)for(T[i]=n,t=0;t<1<<k[i];t++)E[n++]=i;for(n>>=7;i<f;i++)for(T[i]=n<<7,t=0;t<1<<k[i]-7;t++)E[256+n++]=i;for(e=0;e<=g;e++)s[e]=0;for(t=0;t<=143;)z[2*t+1]=8,t++,s[8]++;for(;t<=255;)z[2*t+1]=9,t++,s[9]++;for(;t<=279;)z[2*t+1]=7,t++,s[7]++;for(;t<=287;)z[2*t+1]=8,t++,s[8]++;for(Z(z,l+1,s),t=0;t<f;t++)C[2*t+1]=5,C[2*t]=j(t,5);O=new D(z,w,u+1,l,g),B=new D(C,k,0,f,g),R=new D(new Array(0),x,0,d,p)}(),q=!0),t.l_desc=new F(t.dyn_ltree,O),t.d_desc=new F(t.dyn_dtree,B),t.bl_desc=new F(t.bl_tree,R),t.bi_buf=0,t.bi_valid=0,W(t)},r._tr_stored_block=J,r._tr_flush_block=function(t,e,r,i){var n,s,a=0;0<t.level?(2===t.strm.data_type&&(t.strm.data_type=function(t){var e,r=4093624447;for(e=0;e<=31;e++,r>>>=1)if(1&r&&0!==t.dyn_ltree[2*e])return o;if(0!==t.dyn_ltree[18]||0!==t.dyn_ltree[20]||0!==t.dyn_ltree[26])return h;for(e=32;e<u;e++)if(0!==t.dyn_ltree[2*e])return h;return o}(t)),Y(t,t.l_desc),Y(t,t.d_desc),a=function(t){var e;for(X(t,t.dyn_ltree,t.l_desc.max_code),X(t,t.dyn_dtree,t.d_desc.max_code),Y(t,t.bl_desc),e=d-1;3<=e&&0===t.bl_tree[2*S[e]+1];e--);return t.opt_len+=3*(e+1)+5+5+4,e}(t),n=t.opt_len+3+7>>>3,(s=t.static_len+3+7>>>3)<=n&&(n=s)):n=s=r+5,r+4<=n&&-1!==e?J(t,e,r,i):4===t.strategy||s===n?(P(t,2+(i?1:0),3),K(t,z,C)):(P(t,4+(i?1:0),3),function(t,e,r,i){var n;for(P(t,e-257,5),P(t,r-1,5),P(t,i-4,4),n=0;n<i;n++)P(t,t.bl_tree[2*S[n]+1],3);V(t,t.dyn_ltree,e-1),V(t,t.dyn_dtree,r-1)}(t,t.l_desc.max_code+1,t.d_desc.max_code+1,a+1),K(t,t.dyn_ltree,t.dyn_dtree)),W(t),i&&M(t)},r._tr_tally=function(t,e,r){return t.pending_buf[t.d_buf+2*t.last_lit]=e>>>8&255,t.pending_buf[t.d_buf+2*t.last_lit+1]=255&e,t.pending_buf[t.l_buf+t.last_lit]=255&r,t.last_lit++,0===e?t.dyn_ltree[2*r]++:(t.matches++,e--,t.dyn_ltree[2*(A[r]+u+1)]++,t.dyn_dtree[2*N(e)]++),t.last_lit===t.lit_bufsize-1},r._tr_align=function(t){P(t,2,3),L(t,m,z),function(t){16===t.bi_valid?(U(t,t.bi_buf),t.bi_buf=0,t.bi_valid=0):8<=t.bi_valid&&(t.pending_buf[t.pending++]=255&t.bi_buf,t.bi_buf>>=8,t.bi_valid-=8)}(t)}},{"../utils/common":41}],53:[function(t,e,r){"use strict";e.exports=function(){this.input=null,this.next_in=0,this.avail_in=0,this.total_in=0,this.output=null,this.next_out=0,this.avail_out=0,this.total_out=0,this.msg="",this.state=null,this.data_type=2,this.adler=0}},{}],54:[function(t,e,r){"use strict";e.exports="function"==typeof setImmediate?setImmediate:function(){var t=[].slice.apply(arguments);t.splice(1,0,0),setTimeout.apply(null,t)}},{}]},{},[10])(10)});// ---------- END jszip/jszip.min.js ------

// ---------- webgl-common/common.js ----------
async function loadTwgl() {
    const p = new Promise((resolve) => {
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.src = "https://twgljs.org/dist/4.x/twgl-full.min.js";
        script.onreadystatechange = resolve;
        script.onload = resolve;
        document.head.appendChild(script);
    });
    return p;
}

_fileCache = {}
async function getFile(url) {
    if (url in _fileCache)
        return _fileCache[url];

    const resp = await fetch(url);
    if (resp.status !== 200)
        throw("Could not find shader " + url);

    let fileContents = "";
    const reader = resp.body.getReader();
    let done = false;
    while (!done) {
        let fileBody = await reader.read();
        if (!fileBody.value) {
            done = true;
        } else {
            for (let v of fileBody.value)
                fileContents += String.fromCharCode(v);
        }
    }
    _fileCache[url] = fileContents;
    return fileContents;
}

/**
 * @param gl webgl2 instance
 * @param dimensions [width, height] tuple for texture dimensions
 * @param data - can be null, if not will be used as the source for the texture
 */
function createTexture(gl, dimensions, data) {
    const tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texImage2D(
        gl.TEXTURE_2D,
        0, // level
        gl.RGBA32F, // internal format
        dimensions[0], // width
        dimensions[1], // height
        0, // border
        gl.RGBA, // format
        gl.FLOAT, // type
        data, /* source */);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    return tex;
}

function updateTexture(gl, dimensions, texture, data) {
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(
        gl.TEXTURE_2D,
        0, // level
        gl.RGBA32F, // internal format
        dimensions[0], // width
        dimensions[1], // height
        0, // border
        gl.RGBA, // format
        gl.FLOAT, // type
        data, /* source */)
}

function render(gl) {
    // draw the quad (2 triangles)
    const offset = 0;
    const numVertices = 6;
    gl.drawArrays(gl.TRIANGLES, offset, numVertices);
}

function setupProgram(gl, programInfo, bufferInfo) {
    gl.useProgram(programInfo.program);

    twgl.setBuffersAndAttributes(gl, programInfo, bufferInfo);

}

function enableGlExts(gl) {
    gl.getExtension('OES_texture_float');        // just in case
    gl.getExtension('OES_texture_float_linear');
    ext = gl.getExtension('EXT_color_buffer_float');
    if (!ext) {
        alert("no ext color...");
        throw new Error("!");
    }
}

const vs = `
    #version 300 es
    in vec4 position;
    void main() {
      gl_Position = position;
    }`;

const bufferArrays = {
    position: {
        data: [
          -1, -1,
           1, -1,
          -1,  1,
          -1,  1,
           1, -1,
           1,  1,
        ],
        numComponents: 2,
    },
};

class FrameBufferManager {
    constructor(gl, dimensions) {
        this.computeDsts = [
            createTexture(gl, dimensions, null),
            createTexture(gl, dimensions, null)
        ];
        this.fb = gl.createFramebuffer();

        this.counter = 0;
        this.gl = gl;
    }

    src() {
        return this.computeDsts[this.counter];
    }

    dst() {
        return this.computeDsts[(this.counter + 1) % 2];
    }

    flipflop() {
        this.counter = this.counter + 1;
        this.counter %= 2;
    }

    bind_dst() {
        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.fb);
        this.gl.framebufferTexture2D(
            this.gl.FRAMEBUFFER,
            this.gl.COLOR_ATTACHMENT0,
            this.gl.TEXTURE_2D,
            this.dst(),
            0 /* level */
        );
    }
}
// ---------- END webgl-common/common.js ------

// ---------- build/synth.frag.js ----------
const SYNTHFRAGSHADER = `
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

#define FN_RENDER 0

uniform vec2 u_dimensions;
uniform vec2 u_tex_dimensions;
uniform sampler2D u_texture;
uniform float u_transform_scale;
uniform vec2 u_transform_center;
uniform float u_transform_rotation;
uniform int u_function;

uniform float u_feedback;
uniform bool u_constrain_to_transform;

uniform bool u_no_clamp;

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

float isGEq(float a, float b) { return sign(sign(a - b) + 1.0); }

vec2 get_hex_origin(vec2 coords, float hex_size) {
  float n = max(hex_size, 0.01);
  float halfn = n / 2.0;

  float sqrt3 = 1.732;

  float W = sqrt3 * n;
  float halfW = W / 2.0;

  float H = 3.0 * halfn;

  float xidx = floor(coords.x / W);
  float yidx = floor(coords.y / H);

  // Get top left corner of bounding square
  vec2 o = vec2(W * xidx, H * yidx);

  // transform coordinates to make square begin at origin
  vec2 t = coords - o;

  // Hexagon targets in transformed space
  vec2 vertA = vec2(0.0, 0.0);
  vec2 vertB = vec2(W, 0.0);
  vec2 vertC = vec2(halfW, H);

  vec2 vertInvalid = vec2(-1.0, 0.0);

  // pattern alternates every other row
  if (mod(yidx, 2.0) != 0.0) {
    t.y = H - t.y;
  }

  float xLeHalfW = isGEq(halfW, t.x);
  float yLehalfN = isGEq(halfn, t.y);
  float yGeN = isGEq(t.y, n);

  float yt = t.y - halfn;
  float xt = (t.x - halfW) / sqrt3;
  float xnt = (halfW - t.x) / sqrt3;

  float xntGeYt = isGEq(xnt, yt);
  float xtGeYt = isGEq(xt, yt);

  vec2 hex = yLehalfN * (xLeHalfW * vertA + (1.0 - xLeHalfW) * vertB) +
             yGeN * vertC +
             (1.0 - yLehalfN) * (1.0 - yGeN) *
                 (xLeHalfW * (xntGeYt * vertA + (1.0 - xntGeYt) * vertC) +
                  (1.0 - xLeHalfW) * (xtGeYt * vertB + (1.0 - xtGeYt) * vertC));

  if (mod(yidx, 2.0) != 0.0) {
    hex.y = H - hex.y;
  }

  hex += o;

  return hex;
}

vec2 t_coords;

/// modulefn: bitfield
/// moduletag: generator

uniform vec3 u_bf_fg_color; /// { "start": [0, 0, 0], "end": [1, 1, 1], "default": [1, 1, 1], "names": ["r", "g", "b"] }
uniform vec3 u_bf_bg_color; /// { "start": [0, 0, 0], "end": [1, 1, 1], "default": [0, 0, 0], "names": ["r", "g", "b"] }
uniform vec2 u_bf_offset; /// { "start": [-1, -1], "end": [1, 1], "default": [0, 0], "names": ["x", "y"] }
uniform float u_bf_operator_a; /// { "start": 0, "end": 100, "default": 9 }
uniform float u_bf_operator_b; /// { "start": 0, "end": 100, "default": 4 }
uniform bool u_bf_destructive; /// { "default": false }

void bitfield() {
    // vec2 coords = t_coords.xy;
    // vec2 c = coords / u_dimensions;
    // c = 2. * c - 1.;
    // c *= vec2(u_bf_x_scale, u_bf_y_scale);
    ivec2 ic = ivec2(t_coords.xy + u_bf_offset * u_dimensions);
    vec3 color = u_bf_bg_color;
    float factor = mod(float(ic.x ^ ic.y), u_bf_operator_a) / u_bf_operator_b;
    color = factor * u_bf_fg_color + (1. - factor) * u_bf_bg_color;

    if (u_bf_destructive) {
        color_out.rgb = color;
    } else {
        color_out.rgb += color;
    }
}


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


/// modulefn: checkerfill
/// moduletag: space

uniform int u_checkerfill_size; /// { "start": 1, "end": 100, "default": 5 }

void checkerfill() {
    vec2 coords = t_coords.xy / u_dimensions;
    ivec2 ic = ivec2(coords);

    int m = 0;
    if ((ic.x / u_checkerfill_size) % 2 == 0)
        m += 1;
    if ((ic.y / u_checkerfill_size) % 2 == 0)
        m += 1;
    m = m % 2;

    color_out = vec4(float(m) * vec3(1.), 1.);
}


/// modulefn: chromakey
/// moduletag: channels

uniform vec3 u_chromakey_key; /// { "start": [0, 0, 0], "end": [1, 1, 1], "default": [0, 1, 0], "names": ["r", "g", "b"] }
uniform float u_chromakey_strength; /// { "start": 0, "end": 2, "default": 0.25 }
uniform sampler2D u_chromakey_map; /// channel

void chromakey() {
    vec2 coords = u_tex_dimensions * t_coords.xy / u_dimensions;
    if (length(color_out.rgb - u_chromakey_key) <= u_chromakey_strength)
        color_out.xyz = texelFetch(u_chromakey_map, ivec2(coords), 0).rgb;
}


/// modulefn: circle_packing
/// moduletag: color

#define OPCODE_SELECT_CIRCLES 1
#define OPCODE_RENDER 2

uniform float u_cp_radius_factor; /// { "start": 1, "end": 10, "default": 5 }
// make sel thresh a fn of radius?
uniform float u_cp_selection_threshold; /// { "start": 0, "end": 1, "default": 0.25 }
uniform int u_cp_max_radius; /// { "start": 1, "end": 100, "default": 8 }

uniform sampler2D u_cp_data_texture; /// none
uniform int u_cp_opcode; /// none
uniform bool u_cp_randomize; /// { "default": true }

vec4 circle_packing_getImgPx(vec2 coords_) {
  // vec2 coords = vec2(coords_);
  // coords *= vec2(u_cp_in_dimensions) / vec2(u_dimensions);
  // coords.x = float(u_cp_in_dimensions.x) - coords.x;
  return texelFetch(u_texture, ivec2(coords_), 0);
}

float circle_packing_getRadius(vec2 coords_) {
  vec4 color = circle_packing_getImgPx(coords_);
  float gray_value = 0.3 * color.r + 0.59 * color.g + 0.11 * color.b;
  float radius = ceil(exp(gray_value * u_cp_radius_factor) /
                      exp(u_cp_radius_factor) * float(u_cp_max_radius));
  return radius + 1.0;
}

void circle_packing() {
  vec2 coords = gl_FragCoord.xy;
  switch (u_cp_opcode) {
  case OPCODE_SELECT_CIRCLES: {
    ivec2 icoords = ivec2(coords);

    vec4 random_state_local = texelFetch(u_cp_data_texture, icoords, 0);
    float radius_local = circle_packing_getRadius(coords);

    bool circle_is_active = random_state_local.a > u_cp_selection_threshold;
    if (circle_is_active) {
      // find if there are higher priority circles we belong to
      for (int ix = -1 * 2 * u_cp_max_radius; ix <= 2 * u_cp_max_radius; ix++) {
        for (int iy = -1 * 2 * u_cp_max_radius; iy <= 2 * u_cp_max_radius;
             iy++) {
          ivec2 pcoords = icoords + ivec2(ix, iy);
          vec4 random_state_remote =
              texelFetch(u_cp_data_texture, pcoords, 0);
          if (ix == 0 && iy == 0) {
            continue;
          }
          if (random_state_remote.a > u_cp_selection_threshold) {
            float radius = circle_packing_getRadius(vec2(pcoords));
            float dist = length(vec2(ix, iy));
            if (dist < (radius + radius_local)) {
              if (random_state_remote.a > random_state_local.a) {
                circle_is_active = false;
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
    ivec2 icoords = ivec2(coords.x, coords.y);//float(u_dimensions.y) - t_coords.y);

    bool found = false;
    for (int ix = -1 * u_cp_max_radius; ix <= u_cp_max_radius; ix++) {
      for (int iy = -1 * u_cp_max_radius; iy <= u_cp_max_radius; iy++) {
        ivec2 pcoords = icoords + ivec2(ix, iy);
        vec4 selection_state = texelFetch(u_cp_data_texture, pcoords, 0);
        float dist = length(vec2(ix, iy));
        float radius = circle_packing_getRadius(vec2(pcoords));
        if (selection_state.g > 0.0 && dist <= (selection_state.r + 0.5)) {
          if (abs(dist - selection_state.r) <= 1.5) {
            vec4 color = circle_packing_getImgPx(vec2(pcoords));
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


/// modulefn: composite
/// moduletag: channels

uniform sampler2D u_composite_map_1; /// channel
uniform sampler2D u_composite_map_2; /// channel

void composite() {
    vec2 coords = u_tex_dimensions * t_coords.xy / u_dimensions;
    color_out.xyz =
        color_out.rgb * texelFetch(u_composite_map_1, ivec2(coords), 0).rgb +
        (1. - color_out.rgb) * texelFetch(u_composite_map_2, ivec2(coords), 0).rgb;
}


/// modulefn: condzoom
/// moduletag: channels

uniform float u_condzoom_strength; /// { "start": -1, "end": 10, "default": 2 }
uniform sampler2D u_condzoom_map; /// channel

void condzoom() {
    vec2 coords = t_coords.xy / u_dimensions;
    vec2 c = 2. * coords - 1.;

    float r = length(c);
    float theta = atan(c.y, c.x);

    vec3 lumc = vec3(0.2126, 0.7152, 0.0722);
    float lum = dot(color_out.rgb, lumc);
    float z = u_condzoom_strength * lum;

    if (z > 0.)
        c /= z;

    c = (c + 1.) / 2.;
    c *= u_tex_dimensions;

    ivec2 ic = ivec2(c);

    color_out.xyz = texelFetch(u_condzoom_map, ic, 0).rgb;
}


/// modulefn: copy
/// moduletag: channels

uniform sampler2D u_copy_map; /// channel

void copy() {
    vec2 coords = u_tex_dimensions * t_coords.xy / u_dimensions;
    color_out.xyz += texelFetch(u_copy_map, ivec2(coords), 0).rgb;
}


/// modulefn: enhance
/// moduletag: color

uniform vec3 u_enhance; /// { "start": [0, 0, 0], "end": [10, 10, 10], "default": [1, 1, 1], "names": ["r", "g", "b"] }

void enhance() {
    color_out.rgb *= u_enhance;
}


/// modulefn: fourierdraw
/// moduletag: generator

// sin(dot(f, x) + c) * color
uniform vec3 u_fd_r; /// { "start": [-10, -10, -10], "end": [10, 10, 10], "default": [0, 0, 0], "names": ["1", "2", "3"] }
uniform vec3 u_fd_theta; /// { "start": [0, 0, 0], "end": ["2 * math.pi", "2 * math.pi", "2 * math.pi"], "default": [0, 0, 0], "names": ["1", "2", "3"] }
uniform float u_fd_draw_r; /// { "start": 0, "end": 2, "default": 0.25 }
uniform vec3 u_fd_color; /// { "start": [0, 0, 0], "end": [1, 1, 1], "default": [1, 0, 0], "names": ["r", "g", "b"] }
uniform float u_fd_thickness; /// { "start": 0, "end": 1, "default": 0.025 }
uniform bool u_fd_smooth_edges; /// { "default": true }
uniform bool u_fd_fill; /// { "default": false }
uniform bool u_fd_destructive; /// { "default": false }

void fourierdraw() {
    vec2 coords = t_coords.xy;
    vec2 c = coords / u_dimensions;
    c = 2. * c - 1.;

    float x = dot(u_fd_r * cos(u_fd_theta), vec3(1.));
    float y = dot(u_fd_r * sin(u_fd_theta), vec3(1.));

    vec2 pos = vec2(x, y);
    float r = length(pos - c);
    if ((u_fd_fill &&  r < u_fd_draw_r) ||
        (!u_fd_fill && abs(r - u_fd_draw_r) < u_fd_thickness )) {
        float factor = 1.;
        if (u_fd_smooth_edges && (!u_fd_fill || r >= u_fd_draw_r)) {
            factor = 1. - abs(r - u_fd_draw_r) / u_fd_thickness;
        }

        if (u_fd_destructive && factor > 0.)
            color_out.rgb = factor * u_fd_color;
        else
            color_out.rgb += factor * u_fd_color;

    }
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


/// modulefn: greyscale
/// moduletag: color

uniform vec3 u_greyscale_luminance; /// { "start": [0,0,0], "end": [1,1,1], "default": [0.2126, 0.7152, 0.0722], "names": ["r", "g", "b"] }

void greyscale() {
    vec2 coords = t_coords.xy;
    vec3 color = u_feedback * texelFetch(u_texture, ivec2(coords), 0).xyz;
    color_out.rgb = vec3(dot(color.rgb, u_greyscale_luminance));
}


/// modulefn: halftone
/// moduletag: space

uniform int u_halftone_factor; /// { "start": 0, "end": 500, "default": 10 }
uniform bool u_halftone_invert; /// { "default": false }
uniform float u_halftone_strength; /// { "start": 0, "end": 2, "default": 1 }

void halftone() {
    vec2 coords = t_coords.xy;
    float f = float(u_halftone_factor);
    vec2 f_coords = floor(coords / f) * f + f / 2.;
    vec3 color = texelFetch(u_texture, ivec2(f_coords), 0).xyz;
    vec3 lumc = vec3(0.2126, 0.7152, 0.0722);
    float lum = dot(color.rgb, lumc);
    float intensity = length(coords - f_coords) / (sqrt(2.) * f / 2.);
    if (intensity < u_halftone_strength * lum)
        intensity = 1.;
    else
        intensity = 0.;
    if (u_halftone_invert)
        intensity = 1. - intensity;
    color *= intensity;

    color_out = vec4(u_feedback * color, 1.);
}



/// modulefn: hexswirl
/// moduletag: space

uniform float u_hexswirl_factor; /// { "start": 0, "end": "2 * math.pi", "default": 0 }
uniform float u_hexswirl_size; /// { "start": 0, "end": "100", "default": 5 }

void hexswirl() {
    vec2 hex_coords = get_hex_origin(t_coords.xy, u_hexswirl_size);
    float hex_r = (u_hexswirl_size / 2.)/ cos(5. * PI / 12.);
    vec2 c = (t_coords.xy - hex_coords) / hex_r;
    c = 2. * c - 1.;

    float r = length(c);
    float theta = atan(c.y, c.x);
    theta += r * u_hexswirl_factor;
    c = r * vec2(cos(theta), sin(theta));

    c  = (c + 1.) / 2.;

    c *= hex_r;
    c += hex_coords;

    color_out = vec4(u_feedback * texelFetch(u_texture, ivec2(c), 0).xyz, 1.);
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


/// modulefn: invert_phase
/// moduletag: color

void invert_phase() {
    color_out.rgb = -1. * color_out.rgb;
}


/// modulefn: multiply
/// moduletag: channels

uniform sampler2D u_multiply_map; /// channel

void multiply() {
    vec2 coords = u_tex_dimensions * t_coords.xy / u_dimensions;
    color_out.xyz *= texelFetch(u_multiply_map, ivec2(coords), 0).rgb;
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


/// modulefn: polygon
/// moduletag: generator

uniform vec3 u_polygon_color; /// { "start": [0, 0, 0], "end": [1, 1, 1], "default": [1, 0, 0], "names": ["r", "g", "b"] }
uniform int u_polygon_n; /// { "start": 3, "end": 100, "default": 4 }
uniform float u_polygon_r; /// { "start": 0, "end": 1, "default": 0.49999 }
uniform float u_polygon_thickness; /// { "start": 0, "end": 1, "default": 0.025 }
uniform bool u_polygon_smooth_edges; /// { "default": true }
uniform bool u_polygon_fill; /// { "default": false }
uniform bool u_polygon_destructive; /// { "default": false }

void polygon() {
    vec2 coords = t_coords.xy;
    vec2 c = coords / u_dimensions;
    c = 2. * c - 1.;

    float r = length(c);
    float theta = atan(c.y, c.x);
    if (theta < 0.)
        theta += 2. * PI;

    float angle = 2. * PI / float(u_polygon_n);
    float lower = floor(theta / angle) * angle;
    float higher = ceil(theta / angle) * angle;

    vec2 lower_c = u_polygon_r * vec2(cos(lower), sin(lower));
    vec2 higher_c = u_polygon_r * vec2(cos(higher), sin(higher));
    // if (length(lower_c - c) < 0.1)
    //     color_out.rgb = vec3(1.);
    // if (length(higher_c - c) < 0.1)
    //     color_out.rgb = vec3(1.);

    // return;
    // a + (b - a) * t = r' * (cos x, sin x)
    // a.x + (b.x - a.x) * t = r' * cos x
    // a.y + (b.y - a.y) * t = r' * sin x
    //
    // t = (r' * cos x - a.x) / (b.x - a.x)
    // r' * sin x = (a.y + (r' * cos x - a.x) (b.y - a.y) / (b.x - a.x))
    // r' * sin x - (r' * cos x) (b.y - a.y) / (b.x - a.x) = a.y - a.x * (b.y - a.y) / (b.x - a.x)
    // r' * (sin x - (cos x - a.x) (b.y - a.y) / (b.x - a.x) = a.y - a.x * (b.y - a.y) / (b.x - a.x)
    // where a = lower_c, b = higher_c, x = theta, r' = radius along pg edge

    vec2 s = higher_c - lower_c;
    float lhs = 1. - (cos(theta) * s.y / (sin(theta) * s.x));
    float rhs = (lower_c.y * s.x - lower_c.x * s.y) / (sin(theta) * s.x);
    // float lhs = (
    //     sin(theta) - (cos(theta) - lower_c.x) * (
    //         (higher_c.y - lower_c.y) / (higher_c.x - lower_c.x)
    //     ));

    // float rhs = (
    //     lower_c.y - lower_c.x * (
    //         (higher_c.y - lower_c.y) / (higher_c.x - lower_c.x)
    //     ));
    float pg_r = rhs / lhs;

    // float base = length(higher_c - lower_c);
    // float h = sqrt(u_polygon_r * u_polygon_r - base * base);
    // float pg_r = 0.;
    // float avg = (lower + higher) / 2.;
    // if (theta < avg)
    //     pg_r = mix(u_polygon_r, h, (theta - lower) / (avg - lower));
    // else
    //     pg_r = mix(h, u_polygon_r, (theta - avg) / (avg - lower));


    if (abs(r - pg_r) < u_polygon_thickness || (u_polygon_fill && r < pg_r)) {
        float factor = 1.;
        if (u_polygon_smooth_edges && (!u_polygon_fill || r >= pg_r)) {
            factor = 1. - abs(r - pg_r) / u_polygon_thickness;
        }

        if (u_polygon_destructive && factor > 0.)
            color_out.rgb = factor * u_polygon_color;
        else
            color_out.rgb += factor * u_polygon_color;
    }
}


/// modulefn: radial
/// moduletag: color

uniform float u_radial_strength; /// { "start": 0, "end": 10, "default": -1 }
uniform vec2 u_radial_center;  /// { "start": [0, 0], "end": [1, 1], "default": [0.5, 0.5], "names": ["x", "y"] }

void radial() {
    vec2 coords = t_coords.xy / u_dimensions;

    float r = length(coords - u_radial_center);
    float f = 1. - pow(r, u_radial_strength);

    color_out.rgb *= f;
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


/// modulefn: ripple
/// moduletag: space

uniform float u_ripple_freq; /// { "start": 0, "end": 100, "default": 1 }
uniform float u_ripple_c; /// { "start": 0, "end": "2 * math.pi", "default": 0 }
uniform float u_ripple_strength; /// { "start": -1, "end": 10, "default": 2 }
uniform vec2 u_ripple_center;  /// { "start": [0, 0], "end": [1, 1], "default": [0.5, 0.5], "names": ["x", "y"] }

void ripple() {
    vec2 coords = t_coords.xy / u_dimensions;
    vec2 c = 2. * coords - 1.;

    float r = length(c);
    float theta = atan(c.y, c.x);

    float z = u_ripple_strength * abs(cos(r * u_ripple_freq + u_ripple_c)) + 1.;

    c = c - (u_ripple_center - 0.5);
    if (z > 0.)
        c /= z;
    c = c + (u_ripple_center - 0.5);

    c = (c + 1.) / 2.;
    c *= u_tex_dimensions;
    color_out = vec4(u_feedback * texelFetch(u_texture, ivec2(c), 0).xyz, 1.);
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
uniform bool u_sf_fill; /// { "default": false }
uniform bool u_sf_destructive; /// { "default": false }

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

    if (abs(r - super_r) < u_sf_thickness || (u_sf_fill && r < super_r)) {
        float factor = 1.;
        if (u_sf_smooth_edges && (!u_sf_fill || r >= super_r)) {
            factor = 1. - abs(r - super_r) / u_sf_thickness;
        }

        if (u_sf_destructive && factor > 0.)
            color_out.rgb = factor * u_sf_color;
        else
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


/// modulefn: voronoi
/// moduletag: color

uniform sampler2D u_voronoi_data; /// custom
uniform int u_voronoi_count; /// custom

void voronoi() {
    vec2 pt = t_coords / u_dimensions;
    vec2 cell_pt = vec2(0.);
    float dist = -1.;
    for (int i = 0; i < u_voronoi_count; i++) {
        vec4 candidate_ = texelFetch(u_voronoi_data, ivec2(i / 2, 0), 0);
        vec2 candidate = (i % 2 == 0) ? candidate_.rg : candidate_.ba;
        float curr_dist = length(candidate - pt);
        if (dist < 0. || curr_dist < dist) {
            dist = curr_dist;
            cell_pt = candidate;
        }
    }

    color_out.xyz = texelFetch(u_texture, ivec2(cell_pt * u_dimensions), 0).rgb;
}


/// modulefn: voronoiswirl
/// moduletag: space

uniform sampler2D u_voronoiswirl_data; /// custom
uniform int u_voronoiswirl_count; /// custom
uniform float u_voronoiswirl_factor; /// { "start": 0, "end": "2 * math.pi", "default": 0 }

void voronoiswirl() {
    vec2 pt = t_coords / u_dimensions;
    vec2 cell_pt = vec2(0.);
    float dist = -1.;
    for (int i = 0; i < u_voronoiswirl_count; i++) {
        vec4 candidate_ = texelFetch(u_voronoiswirl_data, ivec2(i / 2, 0), 0);
        vec2 candidate = (i % 2 == 0) ? candidate_.rg : candidate_.ba;
        float curr_dist = length(candidate - pt);
        if (dist < 0. || curr_dist < dist) {
            dist = curr_dist;
            cell_pt = candidate;
        }
    }

    pt = 2. * pt - 1.;
    vec2 c = pt - cell_pt;
    c = (c + 1.) / 2.;
    // c = 2. * c - 1.;

    // float r = length(c);
    // float theta = atan(c.y, c.x);
    // theta += r * u_voronoiswirl_factor;
    // c = r * vec2(cos(theta), sin(theta));

    // c  = (c + 1.) / 2.;

    // c += cell_pt;

    color_out = vec4(u_feedback * texelFetch(u_texture, ivec2(c *u_dimensions), 0).xyz, 1.);

}


/// modulefn: waveify
/// moduletag: color

uniform vec3 u_waveify_a; /// {"start": [0, 0, 0], "end": [10, 10, 10], "default": [1, 1, 1], "names": ["r", "g", "b"]}
uniform vec3 u_waveify_f; /// {"start": [0, 0, 0], "end": [1000, 1000, 1000], "default": [100, 100, 100], "names": ["r", "g", "b"]}
uniform vec3 u_waveify_c; /// {"start": [0, 0, 0], "end": ["2 * math.pi", "2 * math.pi", "2 * math.pi"], "default": [0, 0, 0], "names": ["r", "g", "b"]}

void waveify() {
    color_out.xyz *=
        u_waveify_a * sin(color_out.xyz * u_waveify_f + u_waveify_c);
}


/// modulefn: wavy
/// moduletag: space

uniform float u_wavy_freq_x; /// { "start": 0, "end": 100, "default": 1 }
uniform float u_wavy_c_x; /// { "start": 0, "end": "2 * math.pi", "default": 0 }
uniform float u_wavy_strength_x; /// { "start": 0, "end": 100, "default": 1 }

uniform float u_wavy_freq_y; /// { "start": 0, "end": 100, "default": 1 }
uniform float u_wavy_c_y; /// { "start": 0, "end": "2 * math.pi", "default": 0 }
uniform float u_wavy_strength_y; /// { "start": 0, "end": 100, "default": 1 }


void wavy() {
    vec2 coords = t_coords.xy / u_dimensions;
    vec2 c = 2. * coords - 1.;

    float x_mod =
        u_wavy_strength_x * sin(u_wavy_freq_x * c.y + u_wavy_c_x);
    float y_mod =
        u_wavy_strength_y * sin(u_wavy_freq_y * c.x + u_wavy_c_y);

    c = (c + 1.) / 2.;
    c *= u_tex_dimensions;

    c.x = mod(c.x + x_mod, u_tex_dimensions.x);
    c.y = mod(c.y + y_mod, u_tex_dimensions.y);

    color_out = vec4(u_feedback * texelFetch(u_texture, ivec2(c), 0).xyz, 1.);
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
  mat2 rot_mat = mat2(cos(u_transform_rotation), sin(u_transform_rotation),
                      -sin(u_transform_rotation), cos(u_transform_rotation));
  t_coords = rot_mat * t_coords;

  t_coords += vec2(0.5);
  t_coords *= u_dimensions;

  if (u_constrain_to_transform) {
    if (t_coords.x < 0. || t_coords.x > u_dimensions.x || t_coords.y < 0. ||
        t_coords.y > u_dimensions.y) {
      return;
    }
  }

  switch (u_function) {
  case FN_RENDER:
    break;
case 1:
    bitfield();
    break;
case 2:
    blur();
    break;
case 3:
    checkerfill();
    break;
case 4:
    chromakey();
    break;
case 5:
    circle_packing();
    break;
case 6:
    composite();
    break;
case 7:
    condzoom();
    break;
case 8:
    copy();
    break;
case 9:
    enhance();
    break;
case 10:
    fourierdraw();
    break;
case 11:
    gamma_correct();
    break;
case 12:
    greyscale();
    break;
case 13:
    halftone();
    break;
case 14:
    hexswirl();
    break;
case 15:
    hue_shift();
    break;
case 16:
    invert_color();
    break;
case 17:
    invert_phase();
    break;
case 18:
    multiply();
    break;
case 19:
    noise();
    break;
case 20:
    offset();
    break;
case 21:
    oscillator();
    break;
case 22:
    picture();
    break;
case 23:
    pixelate();
    break;
case 24:
    polygon();
    break;
case 25:
    radial();
    break;
case 26:
    recolor();
    break;
case 27:
    reduce_colors();
    break;
case 28:
    reflector();
    break;
case 29:
    ripple();
    break;
case 30:
    rotate();
    break;
case 31:
    superformula();
    break;
case 32:
    swirl();
    break;
case 33:
    threshold();
    break;
case 34:
    tile();
    break;
case 35:
    voronoi();
    break;
case 36:
    voronoiswirl();
    break;
case 37:
    waveify();
    break;
case 38:
    wavy();
    break;
case 39:
    webcam();
    break;
case 40:
    zoom();
    break;

  default:
    // shouldn't happen
    color_out = vec4(1., 0., 1., 1.);
    break;
  }

  if (!u_no_clamp) {
    color_out = clamp(color_out, -1., 1.);
  }
}
`;
// ---------- END build/synth.frag.js ------

// ---------- ui.js ----------
// defined for syntax highlighting purposes
const html = String.raw;
// https://medium.com/@trukrs/tagged-template-literal-for-html-templates-4820cf5538f9
function createElement(markup) {
    const temp = document.createElement('div')
    temp.innerHTML = markup
    const frag = document.createDocumentFragment()
    const children = Array.prototype.slice.apply(temp.childNodes)
    children.map(el => frag.appendChild(el))
    return frag
}

const __suffix = window.globalsuffix;

const getEl = (name) => name + (__suffix || "");

const defineEl = (name, class_) => {
    customElements.define(getEl(name), class_);
}

function createModal(resolver) {
    const modal = document.createElement('div');
    modal.addEventListener('click', (e) => {
        if (e.target != modal)
            return;
        resolver(undefined);
        modal.remove();
    });

    modal.style.background = "#2b2b2b50";
    modal.style.position = "absolute";
    modal.style.left = "0";
    modal.style.top = "0";
    modal.style.width = "100%";
    modal.style.height = "100%";

    document.body.appendChild(modal);
    return modal;
}

class Type extends HTMLElement {
    name = ""
    range = []
    defaultValue = 0
    shadow = null;
    value = 0

    constructor(range, defaultValue) {
        super();
        this.synth = null;
        this.range = range;
        if (this.range === null || this.range === undefined)
            this.range = eval(this.getAttribute("range"));
        this.defaultValue = defaultValue;
        if (this.defaultValue === null || this.defaultValue === undefined)
            this.defaultValue =  eval(this.getAttribute("defaultValue"))
        this.shadow = this.attachShadow({mode: 'open'});
    }

    save() {
        return undefined;
    }

    load() {
    }

    step(time, synth) { }
}

class BoolEntry extends Type {
    constructor(defaultValue) {
        super([0, 0], defaultValue);

        this.shadow.appendChild(createElement(html`
            <input type="checkbox"></input>
        `));
        this.input = this.shadow.querySelector("input");
        this.input.checked = defaultValue;
        this.input.addEventListener('change', () => {
            this.value = this.input.checked;
            this.dispatchEvent(new Event('change'));
        });
    }

    save() {
        return this.value;
    }

    load(data) {
        this.value = data;
        this.input.checked = data;
        this.dispatchEvent(new Event('change'));
    }
}
defineEl('bool-entry', BoolEntry);

class Slider extends Type {
    constructor(range, defaultValue) {
        super(range, defaultValue);

        this.shadow.appendChild(createElement(html`
            <div style="padding-bottom: 0.5em;"> <!-- TODO use template + <style> ? -->
                <div id="bar" style="background: black; width: 10em; height: 1em;">
                    <div
                        id="slider"
                        style="background: white; width: 1%; height: 1em; position: relative; left: 0em">
                    </div>
                </div>
            </div>
        `));

        const bar = this.shadow.querySelector("#bar");
        this.slider = this.shadow.querySelector("#slider");

        const handler = (e) => {
            if (e.target != bar)
                return;
            const rect = e.target.getBoundingClientRect();
            const clientX = e.clientX || e.touches[0].clientX;
            const clientY = e.clientY || e.touches[0].clientY;

            const x = (clientX - rect.left) / rect.width;
            this.value = x * (this.range[1] - this.range[0]) + this.range[0];
            this.dispatchEvent(new Event('change'));
        };
        bar.addEventListener('mousemove', (e) => { if (e.buttons & 1) handler(e); });
        bar.addEventListener('touchmove', handler);
    }

    set_value(value) {
        const x = (value - this.range[0]) / (this.range[1] - this.range[0]);
        this.slider.style.left = `${x * 10}em`;
    }
}
defineEl('slider-elem', Slider);

class FloatBar extends Type {
    validate(entry) {
        return !isNaN(entry) && entry >= this.range[0] && entry <= this.range[1];
    }

    _set_value(value) {
        this.value = value;
        this.input.value = this.value;
        this.slider.set_value(value);
    }

    set_value(value) {
        this._set_value(value);
        this.dispatchEvent(new Event('change'));
    }

    constructor(range, defaultValue, supressFunctionGen) {
        super(range, defaultValue);

        if (supressFunctionGen === null || supressFunctionGen === undefined)
            supressFunctionGen =  eval(this.getAttribute("supressFunctionGen"))

        this.shadow.appendChild(createElement(html`
            <div>
                <${getEl("slider-elem")} range="[${this.range}]" defaultValue="${this.defaultValue}">
                </${getEl("slider-elem")}>
                <input
                    id="floatinp"
                    style="box-shadow: none;"
                    type="number"
                    min="${this.range[0]}"
                    max="${this.range[1]}"
                    step="${(this.range[1] - this.range[0]) / 1000}"></input>
                <div id="functiongen">
                    <label for="generate">function: </label>
                    <input id="generate" type="checkbox"></input>
                    <select></select>
                    <button>Edit function</button>
                </div>
            </div>
        `));

        this.slider = this.shadow.querySelector(getEl("slider-elem"));
        this.input = this.shadow.querySelector("#floatinp");

        this._set_value(this.defaultValue);

        this.input.addEventListener('change', () => {
            const value = parseFloat(this.input.value);
            if (!this.validate(value)) {
                this.input.style = "color: red";
            } else {
                this.input.style = "";
                this.set_value(value);
            }
        });
        this.slider.addEventListener('change', () => { this.set_value(this.slider.value); });

        const funcgen_container = this.shadow.querySelector("#functiongen");
        this.func_gen = funcgen_container.querySelector("#generate");
        const func_modal = funcgen_container.querySelector("button");
        this.func_select = funcgen_container.querySelector("select");
        Object.keys(generators).forEach(k => {
            const opt = document.createElement('option');
            opt.value = k;
            opt.innerText = k;
            this.func_select.appendChild(opt);
        });

        this.generate = false;
        const set_func = () => {
            this.func = generators[this.func_select.value].func;
            this.params = new generators[this.func_select.value].params();
        };
        set_func();

        this.func_select.addEventListener('change', set_func);
        this.func_gen.addEventListener('change', () => {
            this.generate = this.func_gen.checked;
        });

        func_modal.addEventListener('click', async () => {
            let resolver = undefined;
            const p = new Promise(r => { resolver = r; });
            const modal = createModal(resolver);
            let curr_params = undefined;
            if (this.generate)
                curr_params = this.params;
            const generator = new FunctionGenerator(
                modal, this.func_select.value, curr_params, resolver, this.synth);
            const params = await p;
            generator.remove();
            modal.remove();
            if (!params)
                return;

            this.params = params;
            this.generate = true;
            this.func_gen.checked = true;
        });

        if (supressFunctionGen)
            funcgen_container.style.display = "none";
    }

    step(time, synth) {
        this.synth = synth;
        if (this.generate)
            this.set_value(this.func(time, this.range, this.params, synth));
    }

    save() {
        const savedata = {
            value: this.value,
        }

        if (this.generate) {
            savedata.generate = this.generate;
            savedata.func = this.func_select.value;
            savedata.params = this.params.save();
        } else {
            savedata.generate = false;
        }
        return savedata;
    }

    load(data) {
        if (data === undefined)
            return;
        this.set_value(data.value);

        if (data.generate) {
            this.func_select.value = data.func;
            this.params = new generators[this.func_select.value].params();
            this.params.load(data.params);

            this.func = generators[this.func_select.value].func;
            this.func_gen.checked = true;

            this.generate = true;
        }
    }
}
defineEl('float-bar', FloatBar);

class IntEntry extends FloatBar {
    _set_value(value) {
        value = Math.round(value);
        super._set_value(value);
    }

    constructor(range, defaultValue, supressFunctionGen) {
        super(range, defaultValue, supressFunctionGen);
        this.input.step = 1;
    }
}
defineEl('int-entry', IntEntry);

class VecEntry extends Type {
    floats = []

    constructor(nelem, names, range, defaultValue) {
        super(range, defaultValue);
        this.nelem = nelem;
        this.names = names;

        const suffix = window.globalsuffix;

        for (let i = 0; i < this.nelem; i++) {
            this.shadow.appendChild(createElement(html`
                <label for="${names[i]}">${names[i]}: </label>
                <${getEl("float-bar")}
                    id="${names[i]}"
                    range="[${this.range[i]}]"
                    defaultValue="${this.defaultValue[i]}">
                </${getEl("float-bar")}>
            `));
        }

        this.value = this.defaultValue;

        this.floats = Array.from(this.shadow.querySelectorAll(getEl("float-bar")));
        for (let float of this.floats) {
            float.addEventListener('change', () => {
                for (let i = 0; i < this.nelem; i++) {
                    this.value[i] = this.floats[i].value;
                }
                this.dispatchEvent(new Event('change'));
            });
        }
    }

    save() {
        const values = {}
        for (let i = 0; i < this.nelem; i++) {
            values[this.names[i]] = this.floats[i].save();
        }
        return values;
    }

    load(data) {
        if (data === undefined)
            return;
        for (let name of Object.keys(data)) {
            const i = this.names.indexOf(name);
            this.floats[i].load(data[name]);
        }
    }

    step(time, synth) {
        this.synth = synth;
        for (let i = 0; i < this.nelem; i++)
            this.floats[i].step(time, synth);
    }
}
defineEl('vec-entry', VecEntry);

function add_new_channel_ui(ui_container, chanid) {
    const new_ui = document.createElement("div");
    new_ui.id = `ui-${chanid}`;
    ui_container.appendChild(new_ui);
}

class ChannelId {
    constructor(id) {
        this.id = id;
    }
}

class ChannelSelect extends Type {
    constructor(synth) {
        const value = new ChannelId(0);
        super(undefined, value);

        this.value = value;
        this.shadow.appendChild(createElement(html`
            <input type="number" min="0" step="1"></input>
        `));
        this.input = this.shadow.querySelector("input");
        this.input.value = 0;
        this.input.addEventListener('change', () => {
            const value = this.input.value;
            if (value >= synth.channels.length) {
                this.input.style = "color: red";
                return;
            }

            this.input.style = "";
            this.value.id = parseInt(this.input.value);
            console.log(parseInt(this.input.value), this.value);
            this.dispatchEvent(new Event('change'));
        });
    }

    save() {
        return this.value.id;
    }

    load(data) {
        this.value.id = data;
        this.input.value = data;
        this.dispatchEvent(new Event('change'));
    }
}
defineEl('channel-select', ChannelSelect);

// ---------- END ui.js ------

// ---------- customui.js ----------
class Picture_picture_texture extends Type {
    validate() {
        return true;
    }

    customonchange(element) {
        this.synth._get_stageModules(this.channelid)[element.name].fn_params.params['picture_texture'] = this.tex;
        this.synth._get_stageModules(this.channelid)[element.name].fn_params.params['picture_dimensions'] = this.dimensions;

        element.args.picture_dimensions.set_value(this.dimensions);
    }

    imgload() {
        this.dimensions = [this.img.width, this.img.height];
        this.tex = createTexture(this.synth.gl, this.dimensions, this.img)
        this.dispatchEvent(new Event('change'));
    }

    constructor(synth) {
        const img = new Image();
        const tex = createTexture(synth.gl, synth.dimensions);
        super(undefined, tex);

        this.tex = tex;
        this.synth = synth;
        this.channelid = synth.active_channel;

        this.dimensions = [...synth.dimensions];
        this.img = img;
        this.img.addEventListener('load', () => { this.imgload(); });

        this.el = document.createElement("div");

        this.fileSelect = document.createElement("input");
        this.fileSelect.type = "file";
        this.fileSelect.accept = "image/*";
        this.fileSelect.addEventListener("change", this.uploadImage.bind(this));
        this.el.appendChild(this.fileSelect);

        this.shadow.appendChild(this.el);
    }

    uploadImage() {
        let file = this.fileSelect.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(file)
        reader.onloadend = () => {
            this.img.src = reader.result;
        };
    }

    save() {
        return this.img.src;
    }

    load(data) {
        this.img.src = data;
    }
}
defineEl('picture-picture-texture', Picture_picture_texture);

class Picture_picture_dimensions extends Type {
    validate() {
        return true;
    }

    constructor(synth) {
        super(undefined, [0, 0]);
        this.data = document.createElement('code');
        this.data.style = 'border: solid 1px; padding: 2px';
        this.data.innerText = synth.dimensions;
        this.shadow.appendChild(this.data);
    }

    set_value(value) {
        this.data.innerText = value;
    }

    save() {
        return undefined;
    }
}
defineEl('picture-picture-dimensions', Picture_picture_dimensions);

class Webcam_webcam_texture extends Type {
    customonchange(element) {
        this.synth._get_stageModules(this.channelid)[element.name].fn_params.params['webcam_texture'] = this.tex;
        this.synth._get_stageModules(this.channelid)[element.name].fn_params.params['webcam_dimensions'] = this.dimensions;

        element.args.webcam_dimensions.set_value(this.dimensions);
    }

    constructor(synth) {
        const tex = createTexture(synth.gl, synth.dimensions);
        super(undefined, tex);

        this.tex = tex;
        this.synth = synth;
        this.channelid = synth.active_channel;
        this.dimensions = synth.dimensions;
        this.setup();
    }

    async setup() {
        this.video = document.createElement("video");

        let devices = undefined;
        try {
            devices = await navigator.mediaDevices.enumerateDevices();
        } catch (err) {
            alert("Error initializing webcam!");
            throw err;
        }

        devices = devices.filter(d => d.kind === "videoinput");

        this.container = document.createElement("div");

        this.container.innerHTML = `<label for="webcamSelector">Choose a webcam: </label>`
        const selector = document.createElement("select");
        selector.id = "webcamSelector";
        this.container.appendChild(selector);

        devices.forEach(device => {
            const entry = document.createElement("option");
            entry.value = device.deviceId;
            entry.innerHTML = device.label || device.deviceId.substr(0, 10);
            selector.appendChild(entry)
        });

        this.needsUpdate = false;
        const selectVideo = async () => {
            const deviceId = selector.value;

            const constraints = {
                video: { deviceId: deviceId }
            }

            try {
                if (this.video.srcObject) {
                    const stream = this.video.srcObject;
                    stream.getTracks().forEach(function(track) {
                        track.stop();
                    });
                    this.video.srcObject = null;
                }

                const stream = await navigator.mediaDevices.getUserMedia(constraints);
                this.video.srcObject = stream;
                this.video.play();
                this.needsUpdate = true;
            } catch (err) {
                alert("Error initializing webcam! " + err);
                console.log(err);
            }
        }
        selector.onchange = selectVideo;
        selectVideo();

        this.generate = true;
        let f = () => {
            if (!this.video.paused && !this.video.ended) {
                const dimensions = [this.video.videoWidth, this.video.videoHeight];
                if (dimensions[0] && dimensions[1]) {
                    if (this.needsUpdate) {
                        this.dimensions = [this.video.videoWidth, this.video.videoHeight];
                        console.log("UPDATE", this.dimensions, this.video);
                        this.tex = createTexture(this.synth.gl, this.dimensions);
                    }
                    updateTexture(this.synth.gl, this.dimensions, this.tex, this.video);
                    if (this.needsUpdate) {
                        this.needsUpdate = false;
                        this.dispatchEvent(new Event('change'));
                    }
                }
            }

            if (this.generate)
                requestAnimationFrame(f);
        };
        f();

        this.shadow.appendChild(this.container);
    }

    save() {
        return undefined;
    }
}
defineEl('webcam-webcam-texture', Webcam_webcam_texture);

class Webcam_webcam_dimensions extends Picture_picture_dimensions { }
defineEl('webcam-webcam-dimensions', Webcam_webcam_dimensions);

class ReduceColors_reduce_colors_data extends Type {
    customonchange(element) {
        try {
            this.synth._get_stageModules(this.channelid)[element.name].fn_params.params['reduce_colors_data'] = this.tex;
            this.synth._get_stageModules(this.channelid)[element.name].fn_params.params['reduce_colors_count'] = this.count;
        } catch (e) {
            // TODO custom elements break with meta modules
        }

        element.args.reduce_colors_count.set_value(this.dimensions);
    }

    constructor(synth) {
        const limit = 256;
        const img = new Image();
        const tex = createTexture(synth.gl, [256, 1]);
        super(undefined, tex);

        this.tex = tex;
        this.synth = synth;
        this.channelid = synth.active_channel;

        // we waste 1 float for the alpha channel - TODO
        this.data = new Float32Array(4 * 256);
        // this.count = 100;
        this.count = 100;
        this.generate_colors();

        updateTexture(synth.gl, [256, 1], this.tex, this.data);

        this.el = document.createElement("div");
        const btn = document.createElement("button");
        btn.addEventListener('click', () => {
            this.generate_colors();
            this.dispatchEvent(new Event('change'));
        });
        btn.innerText = "Re-pick colors";
        this.el.appendChild(btn);

        this.el.appendChild(document.createElement('br'));
        const label = document.createElement("label");
        label.innerText = "Number of colors: ";
        label.for = "num_colors";
        const input = new IntEntry([1, 256], 100);
        input.id = "num_colors";
        input.addEventListener('change', () => { this.set_count(input.value); });
        this.el.appendChild(label);
        this.el.appendChild(input);

        // TODO add a ui to edit colors individually

        this.shadow.appendChild(this.el);
    }

    set_count(value) {
        this.count = value;
        this.generate_colors();
        // console.log("New count", input.value);
        this.dispatchEvent(new Event('change'));

    }

    generate_colors() {
        // console.log("Regenerating", this.count);
        for (let i = 0; i < 4 * this.count; i++)
            this.data[i] = Math.random();
        updateTexture(this.synth.gl, [256, 1], this.tex, this.data);
    }

    save() {
        const data = [];
        for (let i = 0; i < 4 * this.count; i++)
            data.push(this.data[i])
        return [...data];
    }

    load(data) {
        for (let i = 0; i < data.length; i++)
            this.data[i] = data[i];
        this.count = data.length / 4;
        updateTexture(this.synth.gl, [256, 1], this.tex, this.data);
        this.dispatchEvent(new Event('change'));
    }
}
defineEl('reducecolors-reduce-colors-data', ReduceColors_reduce_colors_data);

class ReduceColors_reduce_colors_count extends Type {
    constructor(synth) {
        super(undefined, 100);
        this.data = document.createElement('code');
        this.data.style = 'border: solid 1px; padding: 2px';
        this.data.innerText = 100;
        this.shadow.appendChild(this.data);
    }

    set_value(value) {
        this.data.innerText = value;
    }

    save() {
        return undefined;
    }
}
defineEl('reducecolors-reduce-colors-count', ReduceColors_reduce_colors_count);

class Voronoi_voronoi_data extends Type {
    customonchange(element) {
        try {
            this.synth._get_stageModules(this.channelid)[element.name].fn_params.params['voronoi_data'] = this.tex;
            this.synth._get_stageModules(this.channelid)[element.name].fn_params.params['voronoi_count'] = this.count;
        } catch (e) {
            // TODO custom elements break with meta modules
        }

        element.args.voronoi_count.set_value(this.dimensions);
    }

    constructor(synth) {
        const limit = 1024;
        const img = new Image();
        const tex = createTexture(synth.gl, [limit / 2, 1]);
        super(undefined, tex);

        this.tex = tex;
        this.synth = synth;
        this.channelid = synth.active_channel;

        // we waste 1 float for the alpha channel - TODO
        this.data = new Float32Array(4 * limit / 2);
        // this.count = 100;
        this.count = 100;
        this.generate_colors();

        updateTexture(synth.gl, [limit / 2, 1], this.tex, this.data);

        this.el = document.createElement("div");
        const btn = document.createElement("button");
        btn.addEventListener('click', () => {
            this.generate_colors();
            this.dispatchEvent(new Event('change'));
        });
        btn.innerText = "Re-pick points";
        this.el.appendChild(btn);

        this.el.appendChild(document.createElement('br'));
        const label = document.createElement("label");
        label.innerText = "Number of points: ";
        label.for = "num_points";
        this.input = new IntEntry([1, limit], 100);
        this.input.id = "num_points";
        this.input.addEventListener('change', () => { this.set_count(this.input.value); });
        this.el.appendChild(label);
        this.el.appendChild(this.input);

        // TODO add a ui to edit colors individually

        this.shadow.appendChild(this.el);

        console.log(this);
    }

    step(time, synth) {
        for (let i = 0; i < 4 * this.count / 2; i++) {
            this.data[i] += 0.001 * (Math.random() - 0.5);
            if (this.data[i] < 0) {
                this.data[i] = 0;
            }
            if (this.data[i] > 1) {
                this.data[i] = 1;
            }
        }
        updateTexture(this.synth.gl, [256, 1], this.tex, this.data);

        this.input.step(time, synth);
    }

    set_count(value) {
        this.count = value;
        this.generate_colors();
        // console.log("New count", input.value);
        this.dispatchEvent(new Event('change'));

    }

    generate_colors() {
        // console.log("Regenerating", this.count);
        for (let i = 0; i < 4 * this.count / 2; i++)
            this.data[i] = Math.random();
        updateTexture(this.synth.gl, [256, 1], this.tex, this.data);
    }

    save() {
        const data = [];
        for (let i = 0; i < 4 * this.count / 2; i++)
            data.push(this.data[i])
        return [...data];
    }

    load(data) {
        for (let i = 0; i < data.length; i++)
            this.data[i] = data[i];
        this.count = 2 * data.length / 4;
        updateTexture(this.synth.gl, [256, 1], this.tex, this.data);
        this.dispatchEvent(new Event('change'));
    }
}
defineEl('voronoi-voronoi-data', Voronoi_voronoi_data);

class Voronoi_voronoi_count extends Type {
    constructor(synth) {
        super(undefined, 100);
        this.data = document.createElement('code');
        this.data.style = 'border: solid 1px; padding: 2px';
        this.data.innerText = 100;
        this.shadow.appendChild(this.data);
    }

    set_value(value) {
        this.data.innerText = value;
    }

    save() {
        return undefined;
    }
}
defineEl('voronoi-voronoi-count', Voronoi_voronoi_count);

class Voronoiswirl_voronoiswirl_data extends Type {
    customonchange(element) {
        try {
            this.synth._get_stageModules(this.channelid)[element.name].fn_params.params['voronoiswirl_data'] = this.tex;
            this.synth._get_stageModules(this.channelid)[element.name].fn_params.params['voronoiswirl_count'] = this.count;
        } catch (e) {
            // TODO custom elements break with meta modules
        }

        element.args.voronoiswirl_count.set_value(this.dimensions);
    }

    constructor(synth) {
        const limit = 1024;
        const img = new Image();
        const tex = createTexture(synth.gl, [limit / 2, 1]);
        super(undefined, tex);

        this.tex = tex;
        this.synth = synth;
        this.channelid = synth.active_channel;

        // we waste 1 float for the alpha channel - TODO
        this.data = new Float32Array(4 * limit / 2);
        // this.count = 100;
        this.count = 100;
        this.generate_colors();

        updateTexture(synth.gl, [limit / 2, 1], this.tex, this.data);

        this.el = document.createElement("div");
        const btn = document.createElement("button");
        btn.addEventListener('click', () => {
            this.generate_colors();
            this.dispatchEvent(new Event('change'));
        });
        btn.innerText = "Re-pick points";
        this.el.appendChild(btn);

        this.el.appendChild(document.createElement('br'));
        const label = document.createElement("label");
        label.innerText = "Number of points: ";
        label.for = "num_points";
        this.input = new IntEntry([1, limit], 100);
        this.input.id = "num_points";
        this.input.addEventListener('change', () => { this.set_count(this.input.value); });
        this.el.appendChild(label);
        this.el.appendChild(this.input);

        // TODO add a ui to edit colors individually

        this.shadow.appendChild(this.el);

        console.log(this);
    }

    step(time, synth) {
        this.input.step(time, synth);
    }

    set_count(value) {
        this.count = value;
        this.generate_colors();
        // console.log("New count", input.value);
        this.dispatchEvent(new Event('change'));

    }

    generate_colors() {
        // console.log("Regenerating", this.count);
        for (let i = 0; i < 4 * this.count / 2; i++)
            this.data[i] = Math.random();
        updateTexture(this.synth.gl, [256, 1], this.tex, this.data);
    }

    save() {
        const data = [];
        for (let i = 0; i < 4 * this.count / 2; i++)
            data.push(this.data[i])
        return [...data];
    }

    load(data) {
        for (let i = 0; i < data.length; i++)
            this.data[i] = data[i];
        this.count = 2 * data.length / 4;
        updateTexture(this.synth.gl, [256, 1], this.tex, this.data);
        this.dispatchEvent(new Event('change'));
    }
}
defineEl('voronoiswirl-voronoiswirl-data', Voronoiswirl_voronoiswirl_data);

class Voronoiswirl_voronoiswirl_count extends Type {
    constructor(synth) {
        super(undefined, 100);
        this.data = document.createElement('code');
        this.data.style = 'border: solid 1px; padding: 2px';
        this.data.innerText = 100;
        this.shadow.appendChild(this.data);
    }

    set_value(value) {
        this.data.innerText = value;
    }

    save() {
        return undefined;
    }
}
defineEl('voronoiswirl-voronoiswirl-count', Voronoiswirl_voronoiswirl_count);
// ---------- END customui.js ------

// ---------- function_generator.js ----------
class GenParams {
    params = {}
    get() {
        return this.params;
    }

    save() {
        return this.params;
    }

    load(params) {
        for (let key of Object.keys(params))
            this.params[key] = params[key];
    }
}

class DefaultParams extends GenParams {
    params = {freq: 1, c: 0, y: 0, a: 1};
}

const constrain = (range, value) => Math.min(Math.max(value, range[0]), range[1]);

const sin_generator = (t, range, genparams) => {
    const params = genparams.get();
    let value = Math.sin(params.freq * 2 * Math.PI * t / 1000 + params.c);
    value = params.a * value + params.y;
    value = (value + 1) / 2;
    value = value * (range[1] - range[0]) + range[0];
    value = constrain(range, value);
    return value;
};

const raw_step = (t, range, freq, c) => {
    return ((t / 1000 * freq + c) % (range[1] - range[0])) + range[0];
}

const step_generator = (t, range, genparams) => {
    const params = genparams.get();
    return constrain(range, params.a * raw_step(t, range, params.freq, params.c) + params.y);
};

const inv_step_generator = (t, range, genparams) => {
    const params = genparams.get();
    const step = raw_step(t, range, params.freq, params.c);
    return constrain(range, params.a * (range[1] - step + range[0]) + params.y);
};

const defaultFnUI = (function_ui, params) => {
    function_ui.appendChild(createElement(html`
        <div>
            <br>
            <label for="freq_input">Frequency: </label>
            <${getEl("float-bar")}
                id="freq_input"
                range="[0, 100]"
                defaultValue="1"
                supressFunctionGen="true">
            </${getEl("float-bar")}>
            <br>
            <label for="c_input">Phase shift: </label>
            <${getEl("float-bar")}
                id="c_input"
                range="[0, ${2 * Math.PI}]"
                defaultValue="0"
                supressFunctionGen="true">
            </${getEl("float-bar")}>
            <br>
            <label for="a_input">Amplitude: </label>
            <${getEl("float-bar")}
                id="a_input"
                range="[0, 10]"
                defaultValue="1"
                supressFunctionGen="true">
            </${getEl("float-bar")}>
            <br>
            <label for="y_input">Y offset: </label>
            <${getEl("float-bar")}
                id="y_input"
                range="[-1, 1]"
                defaultValue="0"
                supressFunctionGen="true">
            </${getEl("float-bar")}>
        </div>
    `));
    const freq_input = function_ui.querySelector("#freq_input");
    const c_input = function_ui.querySelector("#c_input");
    const a_input = function_ui.querySelector("#a_input");
    const y_input = function_ui.querySelector("#y_input");

    freq_input.set_value(params.params.freq);
    c_input.set_value(params.params.c);
    a_input.set_value(params.params.a);
    y_input.set_value(params.params.y);

    freq_input.addEventListener('change', () => {
        params.params.freq = parseFloat(freq_input.value);
    });
    c_input.addEventListener('change', () => {
        params.params.c = parseFloat(c_input.value);
    });
    a_input.addEventListener('change', () => {
        params.params.a = parseFloat(a_input.value);
    });
    y_input.addEventListener('change', () => {
        params.params.y = parseFloat(y_input.value);
    });
};

class AudioDefaultParams extends GenParams {
    params = {
        low: 20,
        high: 100,
        y: 0,
        a: 1,
        fr: 1,
        fs: true,
    };
}

const audio_generator = (t, range, genparams, synth) => {
    if (synth.volume.length == 0)
        return range[0];

    const params = genparams.get();

    let volume = 0;
    let start = params.fs ? 0 : Math.floor(params.fr * synth.volume.length);
    let end = params.fs ? Math.floor(params.fr * synth.volume.length) : synth.volume.length;
    for (let i = start; i < end; i++) {
      volume += (synth.volume[i]);
    }
    volume = volume / (end - start);

    let val = (volume - params.low) / params.high;
    val = params.a * val + params.y;
    return constrain(range, (range[1] - range[0]) * val + range[0]);
};

const audioUI = (function_ui, params) => {
    console.log(params);
    function_ui.appendChild(createElement(html`
        <div>
            <br>
            <h3>Frequency</h3>
            <br>
            <label for="freqrange">Frequency Width: </label>
            <${getEl("float-bar")}
                id="freqrange"
                range="[0, 1]"
                defaultValue="1"
                supressFunctionGen="true">
            </${getEl("float-bar")}>
            <br>
            <label for="freqselect">Low pass filter: </label>
            <input type="checkbox" checked id="freqselect"></input>
            <br>
            <h3>Intensity</h3>
            <label for="low">Low: </label>
            <${getEl("float-bar")}
                id="low"
                range="[0, 1000]"
                defaultValue="20"
                supressFunctionGen="true">
            </${getEl("float-bar")}>
            <br>
            <label for="high">High: </label>
            <${getEl("float-bar")}
                id="high"
                range="[0.01, 1000]"
                defaultValue="100"
                supressFunctionGen="true">
            </${getEl("float-bar")}>
            <br>
            <h3> Function </h3>
            <label for="a_input">Amplitude: </label>
            <${getEl("float-bar")}
                id="a_input"
                range="[0, 100]"
                defaultValue="1"
                supressFunctionGen="true">
            </${getEl("float-bar")}>
            <br>
            <label for="y_input">Y offset: </label>
            <${getEl("float-bar")}
                id="y_input"
                range="[-1, 1]"
                defaultValue="0"
                supressFunctionGen="true">
            </${getEl("float-bar")}>
        </div>
    `));
    const freqrange = function_ui.querySelector("#freqrange");
    const freqselect = function_ui.querySelector("#freqselect");
    const a_input = function_ui.querySelector("#a_input");
    const y_input = function_ui.querySelector("#y_input");
    const low_input = function_ui.querySelector("#low");
    const high_input = function_ui.querySelector("#high");

    freqselect.checked = params.params.fs;
    freqrange.set_value(params.params.fr);
    freqselect.addEventListener('change', () => {
        params.params.fs = freqselect.checked;
    });
    freqrange.addEventListener('change', () => {
        params.params.fr = parseFloat(freqrange.value);
    });

    a_input.set_value(params.params.a);
    y_input.set_value(params.params.y);
    a_input.addEventListener('change', () => {
        params.params.a = parseFloat(a_input.value);
    });
    y_input.addEventListener('change', () => {
        params.params.y = parseFloat(y_input.value);
    });

    low_input.set_value(params.params.low);
    high_input.set_value(params.params.high);
    high_input.addEventListener('change', () => {
        params.params.high = parseFloat(high.value);
    });
    low_input.addEventListener('change', () => {
        params.params.low = parseFloat(low.value);
    });
};

const generators = {
    sin: { func: sin_generator, params: DefaultParams, ui: defaultFnUI },
    step: { func: step_generator, params: DefaultParams, ui: defaultFnUI },
    inv_step: { func: inv_step_generator, params: DefaultParams, ui: defaultFnUI },
    audio: { func: audio_generator, params: AudioDefaultParams, ui: audioUI }
}

class FunctionGenerator{
    cancel = false;

    constructor (parentEl, current, current_params, resolver, synth) {
        const container = document.createElement('div');
        container.className = "functiongen";

        const header = document.createElement("h1");
        header.innerText = "Function Generator";
        container.appendChild(header);
        container.appendChild(document.createElement('hr'));

        this.graph = document.createElement('canvas');
        this.graph.className = "functioncanvas";
        this.graph.width = 1000;
        this.graph.height = 1000;
        container.appendChild(this.graph);

        this.ctx = this.graph.getContext("2d");

        this.freq = 1;
        this.c = 0;

        this.draw_axes();

        this.func = generators[current].func;
        this.params = current_params || new generators[current].params();
        console.log("Using params", this.params);

        const function_ui = document.createElement('div');
        function_ui.className = 'function-ui';

        generators[current].ui(function_ui, this.params);

        function_ui.appendChild(document.createElement('br'));
        function_ui.appendChild(document.createElement('br'));
        const done_button = document.createElement('button');
        done_button.innerText = 'done';
        function_ui.appendChild(done_button);
        done_button.addEventListener('click', () => {
            resolver(this.params);
        });

        container.appendChild(document.createElement('br'));
        container.appendChild(document.createElement('br'));
        container.appendChild(function_ui);
        parentEl.appendChild(container);

        this.synth = synth;
        const f = () => {
            this.draw_axes();
            this.draw_function();
            this.draw_labels();
            if (!this.cancel)
                requestAnimationFrame(f);
        };
        f();
    }

    draw_axes() {
        this.ctx.fillStyle = "black";
        this.ctx.beginPath();
        this.ctx.rect(0, 0, 1000, 1000);
        this.ctx.fill();

        this.ctx.fillStyle = "#ffffff50";
        const count = 20;
        for (let i = 1; i < count; i++) {
            const start = i * (this.graph.width / count);
            this.ctx.beginPath();
            this.ctx.rect(start, 0, 5, 1000);
            this.ctx.fill();

            this.ctx.beginPath();
            this.ctx.rect(0, start, 1000, 5);
            this.ctx.fill();
        }
    }

    draw_function() {
        this.ctx.strokeStyle = "red";
        this.ctx.lineWidth = 4;
        this.ctx.beginPath();
        const maxy = this.graph.height / 2;
        this.ctx.moveTo(0, maxy);
        for (let i = 0; i < this.graph.width; i++) {
            this.ctx.lineTo(i, maxy - maxy * this.func(i, [-1, 1], this.params, this.synth));
        }
        this.ctx.stroke();
    }

    draw_labels() {
        this.ctx.beginPath();
        this.ctx.rect(0, 0, 1000, 1000);
        this.ctx.fill();
    }

    remove() {
        this.cancel = true;
    }
}
// ---------- END function_generator.js ------

// ---------- synth_element_base.js ----------
class SynthFunction {
    id = 0;
    feedback = 0;
    params = {};
    enable = true;

    constructor(feedback) {
        this.feedback = feedback;
    }

    // By redefining this, elements can define an alternate render path
    custom_render(gl, programInfo, fbs) {
        return false;
    }
}

const globalCounters = {};

class SynthStageBase extends HTMLElement {
    get_title() {
        return "";
    }

    constructor(synth, pre_setup) {
        super();
        if (pre_setup)
            pre_setup(this);

        this.synth = synth;
        this.channelid = synth.active_channel;

        const shadow = this.attachShadow({mode: 'open'});
        this.shadow = shadow;

        const box = document.createElement('div');
        box.style = "border: solid 1px; padding: 0.5em; border-radius: 25px";
        const title = document.createElement('h2')
        title.innerText = this.get_title();
        box.appendChild(title);

        const enable_label = document.createElement('label');
        enable_label.for = "enable";
        enable_label.innerText = "Enable: ";
        this.enable_el = document.createElement('input');
        this.enable_el.id = "enable";
        this.enable_el.type = 'checkbox';
        this.enable_el.checked = true;

        box.appendChild(enable_label);
        box.appendChild(this.enable_el);

        const container = document.createElement('div');
        container.style.display = "none";
        this.container = container;
        box.appendChild(container);

        this.container_visible = false;
        title.onclick = () => {
            if (this.container_visible) {
                container.style.display = "none";
            } else {
                container.style.display = "";
            }

            this.container_visible = !this.container_visible;
        }

        const moveup = document.createElement('button');
        moveup.innerText = 'Move up';
        container.appendChild(moveup);

        const movedn = document.createElement('button');
        movedn.innerText = 'Move down';
        container.appendChild(movedn);

        this.remove_btn = document.createElement('button');
        this.remove_btn.innerText = 'Remove';
        container.appendChild(this.remove_btn);

        container.appendChild(document.createElement('br'));


        shadow.appendChild(box);

        moveup.addEventListener('click', () => {
            const idx = this.synth._get_stages(this.channelid).indexOf(this.name);
            if (idx != 0) {
                const other = this.synth._get_stages(this.channelid)[idx - 1];
                this.synth._get_stages(this.channelid)[idx] = other;
                this.synth._get_stages(this.channelid)[idx - 1] = this.name;
                const parentEl =this.parentElement;
                this.remove();
                parentEl.insertBefore(this, parentEl.childNodes[idx - 1]);
            }
        });

        movedn.addEventListener('click', () => {
            const idx = this.synth._get_stages(this.channelid).indexOf(this.name);
            if (idx != (this.synth._get_stages(this.channelid).length - 1)) {
                const other = this.synth._get_stages(this.channelid)[idx + 1];
                this.synth._get_stages(this.channelid)[idx] = other;
                this.synth._get_stages(this.channelid)[idx + 1] = this.name;

                const parentEl =this.parentElement;
                this.remove();
                parentEl.insertBefore(this, parentEl.childNodes[idx + 1]);
            }
        });

        this.remove_btn.addEventListener('click', () => {
            this.synth.remove_stage(this.channelid, this.name);
            this.remove();

            for (let arg of Object.keys(this.args))
                this.args[arg].generate = false;
            this.feedback_el.generate = false;
        });

        this.enable_el.addEventListener('change', () => {
            this.synth.toggle_stage(this.channelid, this.name, this.enable_el.checked);
        });
    }

    reparent_to_module(module) {
        this.remove_btn.style.display = "none";
        this.synth = module;
    }

    step(time) { }
}

class SynthElementBase extends SynthStageBase {
    get_args() {
        //returns a map of str -> Type
        return {};
    }

    get_fn() {
        return SynthFunction;
    }

    get_feedback() {
        return 0;
    }

    constructor(synth) {
        super(synth);
        const args = this.get_args();
        this.args = args;

        const params = [];
        const createElement = (arg, type) => {
            const label = document.createElement('label');
            this.container.appendChild(label);
            label.for = arg;
            label.innerText = `${arg}: `;

            const el = document.createElement('div');
            this.container.appendChild(el);
            el.id = arg;
            el.style = "padding-left: 2em;";

            el.appendChild(type);
            type.addEventListener('change', () => {
                if (type.customonchange) {
                    type.customonchange(this);
                } else {
                    this.onchange(arg, type.value);
                }
            });

            this.container.appendChild(document.createElement('br'));
        };

        this.constrain_el = new BoolEntry(false);
        createElement('constrain to transform', this.constrain_el);
        for (let arg of Object.keys(args)) {
            params.push(args[arg].defaultValue);
            createElement(arg, args[arg]);
        }
        this.feedback_el = new FloatBar([0, 10], 1);
        createElement('feedback', this.feedback_el);
        this.feedback_el.shadow.getElementById("functiongen").style.display = "none";

        const counter = globalCounters[this.get_title()] || 0;
        globalCounters[this.get_title()] = counter + 1;
        this.name = `${this.get_title()}-${counter}`;

        synth.add_stage(this.channelid, this.name, this.build_stage(params));
    }

    build_stage(params) {
        const constructor = this.get_fn();
        this.fn_params = new constructor(...params, 1);
        return new Stage(this.fn_params, (time, synth) => { this.step(time, synth); });
    }

    onchange(arg, val) {
        if (arg === "feedback")
            this.fn_params.feedback = val;
        else if (arg === "constrain to transform")
            this.fn_params.constrain = val;
        else
            this.fn_params.params[arg] = val;
    }

    save() {
        const saved_args = {};
        for (let arg of Object.keys(this.args)) {
            saved_args[arg] = this.args[arg].save();
        }
        saved_args.feedback = this.feedback_el.save();
        saved_args.constrain = this.constrain_el.save();

        return {
            title: this.get_title(),
            enabled: this.enable_el.checked,
            args: saved_args
        }
    }

    load(data) {
        this.enable_el.checked = data.enabled;
        for (let arg of Object.keys(this.args))
            this.args[arg].load(data.args[arg]);

        if (data.args.feedback)
            this.feedback_el.load(data.args.feedback);
        if (data.args.constrain)
            this.constrain_el.load(data.args.constrain);
    }

    // By redefining this elements with a custom render path can add addition
    // step logic
    custom_step(time, synth) { }

    step(time, synth) {
        for (let arg of Object.keys(this.args))
            this.args[arg].step(time, synth);
        this.custom_step(time, synth);
    }
}

class TransformElement extends SynthElementBase {
    enable = true;

    get_title() {
        return "Transform";
    }

    build_stage() {
        this.fn_params = this;
        return new Stage(this, (t, s) => { this.step(t, s); });
    }

    get_args() {
        // TODO clear transform should hide other inputs
        // This can be done if we override onchange here and store the results of
        // createElement in SynthElementBase
        return {
            scale: new FloatBar([0,10], 1),
            center: new VecEntry(2, ["x", "y"], [[-0.5,1.5], [-0.5,1.5]], [0.5, 0.5]),
            rotation: new FloatBar([0, 2 * Math.PI], 0),
        }
    }

    constructor(synth) {
        super(synth);
        this.feedback_el.style.display = "none";
        this.constrain_el.style.display = "none";
        this.params = {
            scale: 1,
            center: [0.5, 0.5],
            rotation: 0,
        };
    }
}
defineEl('transform-element', TransformElement);
// ---------- END synth_element_base.js ------

// ---------- build/module_lib.js ----------
        class Bitfield extends SynthFunction {
            id = 1
            params = {}

            constructor(bf_fg_color, bf_bg_color, bf_offset, bf_operator_a, bf_operator_b, bf_destructive, feedback) {
                super(feedback || 0);
                this.params.bf_fg_color = bf_fg_color;
this.params.bf_bg_color = bf_bg_color;
this.params.bf_offset = bf_offset;
this.params.bf_operator_a = bf_operator_a;
this.params.bf_operator_b = bf_operator_b;
this.params.bf_destructive = bf_destructive;

            }
        }

        class BitfieldElement extends SynthElementBase {
            get_title() {
                return "Bitfield";
            }

            get_fn() {
                return Bitfield;
            }

            get_args() {
                return {
                    bf_fg_color: new VecEntry(3, ["r","g","b"], [[0, 1],[0, 1],[0, 1],], [1,1,1]), bf_bg_color: new VecEntry(3, ["r","g","b"], [[0, 1],[0, 1],[0, 1],], [0,0,0]), bf_offset: new VecEntry(2, ["x","y"], [[-1, 1],[-1, 1],], [0,0]), bf_operator_a: new FloatBar([0,100], 9), bf_operator_b: new FloatBar([0,100], 4), bf_destructive: new BoolEntry(false)
                }
            }
        }
        defineEl('synth-bitfield', BitfieldElement);
        class Blur extends SynthFunction {
            id = 2
            params = {}

            constructor(blur_stride_x, blur_stride_y, feedback) {
                super(feedback || 0);
                this.params.blur_stride_x = blur_stride_x;
this.params.blur_stride_y = blur_stride_y;

            }
        }

        class BlurElement extends SynthElementBase {
            get_title() {
                return "Blur";
            }

            get_fn() {
                return Blur;
            }

            get_args() {
                return {
                    blur_stride_x: new IntEntry([1,100], 1), blur_stride_y: new IntEntry([1,100], 1)
                }
            }
        }
        defineEl('synth-blur', BlurElement);
class Checkerfill extends SynthFunction {
    id = 3
    params = {}

    constructor(checkerfill_size, feedback) {
        super(feedback || 0);
        this.params.checkerfill_size = checkerfill_size;

    }
}

class CheckerfillElement extends SynthElementBase {
    get_title() {
        return "Checkerfill";
    }

    get_fn() {
        return Checkerfill;
    }

    get_args() {
        return {
            checkerfill_size: new IntEntry([1,100], 5)
        }
    }
}
defineEl('synth-checkerfill', CheckerfillElement);
        class Chromakey extends SynthFunction {
            id = 4
            params = {}

            constructor(chromakey_key, chromakey_strength, chromakey_map, feedback) {
                super(feedback || 0);
                this.params.chromakey_key = chromakey_key;
this.params.chromakey_strength = chromakey_strength;
this.params.chromakey_map = chromakey_map;

            }
        }

        class ChromakeyElement extends SynthElementBase {
            get_title() {
                return "Chromakey";
            }

            get_fn() {
                return Chromakey;
            }

            get_args() {
                return {
                    chromakey_key: new VecEntry(3, ["r","g","b"], [[0, 1],[0, 1],[0, 1],], [0,1,0]), chromakey_strength: new FloatBar([0,2], 0.25), chromakey_map: new ChannelSelect(this.synth)
                }
            }
        }
        defineEl('synth-chromakey', ChromakeyElement);
        class CirclePacking extends SynthFunction {
            id = 5
            params = {}

            constructor(cp_radius_factor, cp_selection_threshold, cp_max_radius, cp_data_texture, cp_opcode, cp_randomize, feedback) {
                super(feedback || 0);
                this.params.cp_radius_factor = cp_radius_factor;
this.params.cp_selection_threshold = cp_selection_threshold;
this.params.cp_max_radius = cp_max_radius;
this.params.cp_data_texture = cp_data_texture;
this.params.cp_opcode = cp_opcode;
this.params.cp_randomize = cp_randomize;

            }
        }

        class CirclePackingElement extends SynthElementBase {
            get_title() {
                return "CirclePacking";
            }

            get_fn() {
                return CirclePacking;
            }

            get_args() {
                return {
                    cp_radius_factor: new FloatBar([1,10], 5), cp_selection_threshold: new FloatBar([0,1], 0.25), cp_max_radius: new IntEntry([1,100], 8), cp_randomize: new BoolEntry(true)
                }
            }
        }
        defineEl('synth-circlepacking', CirclePackingElement);
        class Composite extends SynthFunction {
            id = 6
            params = {}

            constructor(composite_map_1, composite_map_2, feedback) {
                super(feedback || 0);
                this.params.composite_map_1 = composite_map_1;
this.params.composite_map_2 = composite_map_2;

            }
        }

        class CompositeElement extends SynthElementBase {
            get_title() {
                return "Composite";
            }

            get_fn() {
                return Composite;
            }

            get_args() {
                return {
                    composite_map_1: new ChannelSelect(this.synth), composite_map_2: new ChannelSelect(this.synth)
                }
            }
        }
        defineEl('synth-composite', CompositeElement);
        class Condzoom extends SynthFunction {
            id = 7
            params = {}

            constructor(condzoom_strength, condzoom_map, feedback) {
                super(feedback || 0);
                this.params.condzoom_strength = condzoom_strength;
this.params.condzoom_map = condzoom_map;

            }
        }

        class CondzoomElement extends SynthElementBase {
            get_title() {
                return "Condzoom";
            }

            get_fn() {
                return Condzoom;
            }

            get_args() {
                return {
                    condzoom_strength: new FloatBar([-1,10], 2), condzoom_map: new ChannelSelect(this.synth)
                }
            }
        }
        defineEl('synth-condzoom', CondzoomElement);
class Copy extends SynthFunction {
    id = 8
    params = {}

    constructor(copy_map, feedback) {
        super(feedback || 0);
        this.params.copy_map = copy_map;

    }
}

class CopyElement extends SynthElementBase {
    get_title() {
        return "Copy";
    }

    get_fn() {
        return Copy;
    }

    get_args() {
        return {
            copy_map: new ChannelSelect(this.synth)
        }
    }
}
defineEl('synth-copy', CopyElement);
class Enhance extends SynthFunction {
    id = 9
    params = {}

    constructor(enhance, feedback) {
        super(feedback || 0);
        this.params.enhance = enhance;

    }
}

class EnhanceElement extends SynthElementBase {
    get_title() {
        return "Enhance";
    }

    get_fn() {
        return Enhance;
    }

    get_args() {
        return {
            enhance: new VecEntry(3, ["r","g","b"], [[0, 10],[0, 10],[0, 10],], [1,1,1])
        }
    }
}
defineEl('synth-enhance', EnhanceElement);
        class Fourierdraw extends SynthFunction {
            id = 10
            params = {}

            constructor(fd_r, fd_theta, fd_draw_r, fd_color, fd_thickness, fd_smooth_edges, fd_fill, fd_destructive, feedback) {
                super(feedback || 0);
                this.params.fd_r = fd_r;
this.params.fd_theta = fd_theta;
this.params.fd_draw_r = fd_draw_r;
this.params.fd_color = fd_color;
this.params.fd_thickness = fd_thickness;
this.params.fd_smooth_edges = fd_smooth_edges;
this.params.fd_fill = fd_fill;
this.params.fd_destructive = fd_destructive;

            }
        }

        class FourierdrawElement extends SynthElementBase {
            get_title() {
                return "Fourierdraw";
            }

            get_fn() {
                return Fourierdraw;
            }

            get_args() {
                return {
                    fd_r: new VecEntry(3, ["1","2","3"], [[-10, 10],[-10, 10],[-10, 10],], [0,0,0]), fd_theta: new VecEntry(3, ["1","2","3"], [[0, 6.283185307179586],[0, 6.283185307179586],[0, 6.283185307179586],], [0,0,0]), fd_draw_r: new FloatBar([0,2], 0.25), fd_color: new VecEntry(3, ["r","g","b"], [[0, 1],[0, 1],[0, 1],], [1,0,0]), fd_thickness: new FloatBar([0,1], 0.025), fd_smooth_edges: new BoolEntry(true), fd_fill: new BoolEntry(false), fd_destructive: new BoolEntry(false)
                }
            }
        }
        defineEl('synth-fourierdraw', FourierdrawElement);
class GammaCorrect extends SynthFunction {
    id = 11
    params = {}

    constructor(gamma_correction, feedback) {
        super(feedback || 0);
        this.params.gamma_correction = gamma_correction;

    }
}

class GammaCorrectElement extends SynthElementBase {
    get_title() {
        return "GammaCorrect";
    }

    get_fn() {
        return GammaCorrect;
    }

    get_args() {
        return {
            gamma_correction: new FloatBar([2,4], 2)
        }
    }
}
defineEl('synth-gammacorrect', GammaCorrectElement);
class Greyscale extends SynthFunction {
    id = 12
    params = {}

    constructor(greyscale_luminance, feedback) {
        super(feedback || 0);
        this.params.greyscale_luminance = greyscale_luminance;

    }
}

class GreyscaleElement extends SynthElementBase {
    get_title() {
        return "Greyscale";
    }

    get_fn() {
        return Greyscale;
    }

    get_args() {
        return {
            greyscale_luminance: new VecEntry(3, ["r","g","b"], [[0, 1],[0, 1],[0, 1],], [0.2126,0.7152,0.0722])
        }
    }
}
defineEl('synth-greyscale', GreyscaleElement);
        class Halftone extends SynthFunction {
            id = 13
            params = {}

            constructor(halftone_factor, halftone_invert, halftone_strength, feedback) {
                super(feedback || 0);
                this.params.halftone_factor = halftone_factor;
this.params.halftone_invert = halftone_invert;
this.params.halftone_strength = halftone_strength;

            }
        }

        class HalftoneElement extends SynthElementBase {
            get_title() {
                return "Halftone";
            }

            get_fn() {
                return Halftone;
            }

            get_args() {
                return {
                    halftone_factor: new IntEntry([0,500], 10), halftone_invert: new BoolEntry(false), halftone_strength: new FloatBar([0,2], 1)
                }
            }
        }
        defineEl('synth-halftone', HalftoneElement);
        class Hexswirl extends SynthFunction {
            id = 14
            params = {}

            constructor(hexswirl_factor, hexswirl_size, feedback) {
                super(feedback || 0);
                this.params.hexswirl_factor = hexswirl_factor;
this.params.hexswirl_size = hexswirl_size;

            }
        }

        class HexswirlElement extends SynthElementBase {
            get_title() {
                return "Hexswirl";
            }

            get_fn() {
                return Hexswirl;
            }

            get_args() {
                return {
                    hexswirl_factor: new FloatBar([0,6.283185307179586], 0), hexswirl_size: new FloatBar([0,100.0], 5)
                }
            }
        }
        defineEl('synth-hexswirl', HexswirlElement);
        class HueShift extends SynthFunction {
            id = 15
            params = {}

            constructor(hue_shift, saturate_shift, feedback) {
                super(feedback || 0);
                this.params.hue_shift = hue_shift;
this.params.saturate_shift = saturate_shift;

            }
        }

        class HueShiftElement extends SynthElementBase {
            get_title() {
                return "HueShift";
            }

            get_fn() {
                return HueShift;
            }

            get_args() {
                return {
                    hue_shift: new FloatBar([0,360], 180), saturate_shift: new FloatBar([0,1], 0)
                }
            }
        }
        defineEl('synth-hueshift', HueShiftElement);
class InvertColor extends SynthFunction {
    id = 16
    params = {}

    constructor(feedback) {
        super(feedback || 0);

    }
}

class InvertColorElement extends SynthElementBase {
    get_title() {
        return "InvertColor";
    }

    get_fn() {
        return InvertColor;
    }

    get_args() {
        return {

        }
    }
}
defineEl('synth-invertcolor', InvertColorElement);
class InvertPhase extends SynthFunction {
    id = 17
    params = {}

    constructor(feedback) {
        super(feedback || 0);

    }
}

class InvertPhaseElement extends SynthElementBase {
    get_title() {
        return "InvertPhase";
    }

    get_fn() {
        return InvertPhase;
    }

    get_args() {
        return {

        }
    }
}
defineEl('synth-invertphase', InvertPhaseElement);
class Multiply extends SynthFunction {
    id = 18
    params = {}

    constructor(multiply_map, feedback) {
        super(feedback || 0);
        this.params.multiply_map = multiply_map;

    }
}

class MultiplyElement extends SynthElementBase {
    get_title() {
        return "Multiply";
    }

    get_fn() {
        return Multiply;
    }

    get_args() {
        return {
            multiply_map: new ChannelSelect(this.synth)
        }
    }
}
defineEl('synth-multiply', MultiplyElement);
        class Noise extends SynthFunction {
            id = 19
            params = {}

            constructor(noise_r, noise_g, noise_b, feedback) {
                super(feedback || 0);
                this.params.noise_r = noise_r;
this.params.noise_g = noise_g;
this.params.noise_b = noise_b;

            }
        }

        class NoiseElement extends SynthElementBase {
            get_title() {
                return "Noise";
            }

            get_fn() {
                return Noise;
            }

            get_args() {
                return {
                    noise_r: new FloatBar([0,10000], 0), noise_g: new FloatBar([0,10000], 0), noise_b: new FloatBar([0,10000], 0)
                }
            }
        }
        defineEl('synth-noise', NoiseElement);
        class Offset extends SynthFunction {
            id = 20
            params = {}

            constructor(offsets_x, offsets_y, feedback) {
                super(feedback || 0);
                this.params.offsets_x = offsets_x;
this.params.offsets_y = offsets_y;

            }
        }

        class OffsetElement extends SynthElementBase {
            get_title() {
                return "Offset";
            }

            get_fn() {
                return Offset;
            }

            get_args() {
                return {
                    offsets_x: new VecEntry(3, ["r","g","b"], [[-1, 1],[-1, 1],[-1, 1],], [0,0,0]), offsets_y: new VecEntry(3, ["r","g","b"], [[-1, 1],[-1, 1],[-1, 1],], [0,0,0])
                }
            }
        }
        defineEl('synth-offset', OffsetElement);
        class Oscillator extends SynthFunction {
            id = 21
            params = {}

            constructor(osc_f, osc_c, osc_color, feedback) {
                super(feedback || 0);
                this.params.osc_f = osc_f;
this.params.osc_c = osc_c;
this.params.osc_color = osc_color;

            }
        }

        class OscillatorElement extends SynthElementBase {
            get_title() {
                return "Oscillator";
            }

            get_fn() {
                return Oscillator;
            }

            get_args() {
                return {
                    osc_f: new VecEntry(2, ["x","y"], [[0, 1],[0, 1],], [0.25,0]), osc_c: new FloatBar([0,6.283185307179586], 0), osc_color: new VecEntry(3, ["r","g","b"], [[0, 1],[0, 1],[0, 1],], [1,0,0])
                }
            }
        }
        defineEl('synth-oscillator', OscillatorElement);
        class Picture extends SynthFunction {
            id = 22
            params = {}

            constructor(picture_texture, picture_dimensions, feedback) {
                super(feedback || 0);
                this.params.picture_texture = picture_texture;
this.params.picture_dimensions = picture_dimensions;

            }
        }

        class PictureElement extends SynthElementBase {
            get_title() {
                return "Picture";
            }

            get_fn() {
                return Picture;
            }

            get_args() {
                return {
                    picture_texture: new Picture_picture_texture(this.synth), picture_dimensions: new Picture_picture_dimensions(this.synth)
                }
            }
        }
        defineEl('synth-picture', PictureElement);
class Pixelate extends SynthFunction {
    id = 23
    params = {}

    constructor(pixelate_factor, feedback) {
        super(feedback || 0);
        this.params.pixelate_factor = pixelate_factor;

    }
}

class PixelateElement extends SynthElementBase {
    get_title() {
        return "Pixelate";
    }

    get_fn() {
        return Pixelate;
    }

    get_args() {
        return {
            pixelate_factor: new IntEntry([0,500], 10)
        }
    }
}
defineEl('synth-pixelate', PixelateElement);
        class Polygon extends SynthFunction {
            id = 24
            params = {}

            constructor(polygon_color, polygon_n, polygon_r, polygon_thickness, polygon_smooth_edges, polygon_fill, polygon_destructive, feedback) {
                super(feedback || 0);
                this.params.polygon_color = polygon_color;
this.params.polygon_n = polygon_n;
this.params.polygon_r = polygon_r;
this.params.polygon_thickness = polygon_thickness;
this.params.polygon_smooth_edges = polygon_smooth_edges;
this.params.polygon_fill = polygon_fill;
this.params.polygon_destructive = polygon_destructive;

            }
        }

        class PolygonElement extends SynthElementBase {
            get_title() {
                return "Polygon";
            }

            get_fn() {
                return Polygon;
            }

            get_args() {
                return {
                    polygon_color: new VecEntry(3, ["r","g","b"], [[0, 1],[0, 1],[0, 1],], [1,0,0]), polygon_n: new IntEntry([3,100], 4), polygon_r: new FloatBar([0,1], 0.49999), polygon_thickness: new FloatBar([0,1], 0.025), polygon_smooth_edges: new BoolEntry(true), polygon_fill: new BoolEntry(false), polygon_destructive: new BoolEntry(false)
                }
            }
        }
        defineEl('synth-polygon', PolygonElement);
        class Radial extends SynthFunction {
            id = 25
            params = {}

            constructor(radial_strength, radial_center, feedback) {
                super(feedback || 0);
                this.params.radial_strength = radial_strength;
this.params.radial_center = radial_center;

            }
        }

        class RadialElement extends SynthElementBase {
            get_title() {
                return "Radial";
            }

            get_fn() {
                return Radial;
            }

            get_args() {
                return {
                    radial_strength: new FloatBar([0,10], -1), radial_center: new VecEntry(2, ["x","y"], [[0, 1],[0, 1],], [0.5,0.5])
                }
            }
        }
        defineEl('synth-radial', RadialElement);
        class Recolor extends SynthFunction {
            id = 26
            params = {}

            constructor(recolor_new_r, recolor_new_g, recolor_new_b, feedback) {
                super(feedback || 0);
                this.params.recolor_new_r = recolor_new_r;
this.params.recolor_new_g = recolor_new_g;
this.params.recolor_new_b = recolor_new_b;

            }
        }

        class RecolorElement extends SynthElementBase {
            get_title() {
                return "Recolor";
            }

            get_fn() {
                return Recolor;
            }

            get_args() {
                return {
                    recolor_new_r: new VecEntry(3, ["r","g","b"], [[0, 1],[0, 1],[0, 1],], [1,0,0]), recolor_new_g: new VecEntry(3, ["r","g","b"], [[0, 1],[0, 1],[0, 1],], [0,1,0]), recolor_new_b: new VecEntry(3, ["r","g","b"], [[0, 1],[0, 1],[0, 1],], [0,0,1])
                }
            }
        }
        defineEl('synth-recolor', RecolorElement);
        class ReduceColors extends SynthFunction {
            id = 27
            params = {}

            constructor(reduce_colors_data, reduce_colors_count, feedback) {
                super(feedback || 0);
                this.params.reduce_colors_data = reduce_colors_data;
this.params.reduce_colors_count = reduce_colors_count;

            }
        }

        class ReduceColorsElement extends SynthElementBase {
            get_title() {
                return "ReduceColors";
            }

            get_fn() {
                return ReduceColors;
            }

            get_args() {
                return {
                    reduce_colors_data: new ReduceColors_reduce_colors_data(this.synth), reduce_colors_count: new ReduceColors_reduce_colors_count(this.synth)
                }
            }
        }
        defineEl('synth-reducecolors', ReduceColorsElement);
        class Reflector extends SynthFunction {
            id = 28
            params = {}

            constructor(reflect_theta, reflect_y, reflect_x, feedback) {
                super(feedback || 0);
                this.params.reflect_theta = reflect_theta;
this.params.reflect_y = reflect_y;
this.params.reflect_x = reflect_x;

            }
        }

        class ReflectorElement extends SynthElementBase {
            get_title() {
                return "Reflector";
            }

            get_fn() {
                return Reflector;
            }

            get_args() {
                return {
                    reflect_theta: new FloatBar([0,6.283185307179586], 1.5707963267948966), reflect_y: new FloatBar([-1,1], 0), reflect_x: new FloatBar([-1,1], 0)
                }
            }
        }
        defineEl('synth-reflector', ReflectorElement);
        class Ripple extends SynthFunction {
            id = 29
            params = {}

            constructor(ripple_freq, ripple_c, ripple_strength, ripple_center, feedback) {
                super(feedback || 0);
                this.params.ripple_freq = ripple_freq;
this.params.ripple_c = ripple_c;
this.params.ripple_strength = ripple_strength;
this.params.ripple_center = ripple_center;

            }
        }

        class RippleElement extends SynthElementBase {
            get_title() {
                return "Ripple";
            }

            get_fn() {
                return Ripple;
            }

            get_args() {
                return {
                    ripple_freq: new FloatBar([0,100], 1), ripple_c: new FloatBar([0,6.283185307179586], 0), ripple_strength: new FloatBar([-1,10], 2), ripple_center: new VecEntry(2, ["x","y"], [[0, 1],[0, 1],], [0.5,0.5])
                }
            }
        }
        defineEl('synth-ripple', RippleElement);
class Rotate extends SynthFunction {
    id = 30
    params = {}

    constructor(rotation, feedback) {
        super(feedback || 0);
        this.params.rotation = rotation;

    }
}

class RotateElement extends SynthElementBase {
    get_title() {
        return "Rotate";
    }

    get_fn() {
        return Rotate;
    }

    get_args() {
        return {
            rotation: new FloatBar([0,6.283185307179586], 0)
        }
    }
}
defineEl('synth-rotate', RotateElement);
        class Superformula extends SynthFunction {
            id = 31
            params = {}

            constructor(sf_color, sf_m, sf_n, sf_thickness, sf_smooth_edges, sf_fill, sf_destructive, feedback) {
                super(feedback || 0);
                this.params.sf_color = sf_color;
this.params.sf_m = sf_m;
this.params.sf_n = sf_n;
this.params.sf_thickness = sf_thickness;
this.params.sf_smooth_edges = sf_smooth_edges;
this.params.sf_fill = sf_fill;
this.params.sf_destructive = sf_destructive;

            }
        }

        class SuperformulaElement extends SynthElementBase {
            get_title() {
                return "Superformula";
            }

            get_fn() {
                return Superformula;
            }

            get_args() {
                return {
                    sf_color: new VecEntry(3, ["r","g","b"], [[0, 1],[0, 1],[0, 1],], [1,0,0]), sf_m: new FloatBar([1,10], 1), sf_n: new VecEntry(3, ["n1","n2","n3"], [[0, 20],[0, 20],[0, 20],], [20,20,20]), sf_thickness: new FloatBar([0,1], 0.5), sf_smooth_edges: new BoolEntry(true), sf_fill: new BoolEntry(false), sf_destructive: new BoolEntry(false)
                }
            }
        }
        defineEl('synth-superformula', SuperformulaElement);
class Swirl extends SynthFunction {
    id = 32
    params = {}

    constructor(factor, feedback) {
        super(feedback || 0);
        this.params.factor = factor;

    }
}

class SwirlElement extends SynthElementBase {
    get_title() {
        return "Swirl";
    }

    get_fn() {
        return Swirl;
    }

    get_args() {
        return {
            factor: new FloatBar([0,6.283185307179586], 0)
        }
    }
}
defineEl('synth-swirl', SwirlElement);
        class Threshold extends SynthFunction {
            id = 33
            params = {}

            constructor(threshold_high_r, threshold_high_g, threshold_high_b, thresholds, feedback) {
                super(feedback || 0);
                this.params.threshold_high_r = threshold_high_r;
this.params.threshold_high_g = threshold_high_g;
this.params.threshold_high_b = threshold_high_b;
this.params.thresholds = thresholds;

            }
        }

        class ThresholdElement extends SynthElementBase {
            get_title() {
                return "Threshold";
            }

            get_fn() {
                return Threshold;
            }

            get_args() {
                return {
                    threshold_high_r: new BoolEntry(true), threshold_high_g: new BoolEntry(true), threshold_high_b: new BoolEntry(true), thresholds: new VecEntry(3, ["r","g","b"], [[0, 1],[0, 1],[0, 1],], [0,0,0])
                }
            }
        }
        defineEl('synth-threshold', ThresholdElement);
        class Tile extends SynthFunction {
            id = 34
            params = {}

            constructor(tile_x, tile_y, feedback) {
                super(feedback || 0);
                this.params.tile_x = tile_x;
this.params.tile_y = tile_y;

            }
        }

        class TileElement extends SynthElementBase {
            get_title() {
                return "Tile";
            }

            get_fn() {
                return Tile;
            }

            get_args() {
                return {
                    tile_x: new IntEntry([1,100], 1), tile_y: new IntEntry([1,100], 1)
                }
            }
        }
        defineEl('synth-tile', TileElement);
        class Voronoi extends SynthFunction {
            id = 35
            params = {}

            constructor(voronoi_data, voronoi_count, feedback) {
                super(feedback || 0);
                this.params.voronoi_data = voronoi_data;
this.params.voronoi_count = voronoi_count;

            }
        }

        class VoronoiElement extends SynthElementBase {
            get_title() {
                return "Voronoi";
            }

            get_fn() {
                return Voronoi;
            }

            get_args() {
                return {
                    voronoi_data: new Voronoi_voronoi_data(this.synth), voronoi_count: new Voronoi_voronoi_count(this.synth)
                }
            }
        }
        defineEl('synth-voronoi', VoronoiElement);
        class Voronoiswirl extends SynthFunction {
            id = 36
            params = {}

            constructor(voronoiswirl_data, voronoiswirl_count, voronoiswirl_factor, feedback) {
                super(feedback || 0);
                this.params.voronoiswirl_data = voronoiswirl_data;
this.params.voronoiswirl_count = voronoiswirl_count;
this.params.voronoiswirl_factor = voronoiswirl_factor;

            }
        }

        class VoronoiswirlElement extends SynthElementBase {
            get_title() {
                return "Voronoiswirl";
            }

            get_fn() {
                return Voronoiswirl;
            }

            get_args() {
                return {
                    voronoiswirl_data: new Voronoiswirl_voronoiswirl_data(this.synth), voronoiswirl_count: new Voronoiswirl_voronoiswirl_count(this.synth), voronoiswirl_factor: new FloatBar([0,6.283185307179586], 0)
                }
            }
        }
        defineEl('synth-voronoiswirl', VoronoiswirlElement);
        class Waveify extends SynthFunction {
            id = 37
            params = {}

            constructor(waveify_a, waveify_f, waveify_c, feedback) {
                super(feedback || 0);
                this.params.waveify_a = waveify_a;
this.params.waveify_f = waveify_f;
this.params.waveify_c = waveify_c;

            }
        }

        class WaveifyElement extends SynthElementBase {
            get_title() {
                return "Waveify";
            }

            get_fn() {
                return Waveify;
            }

            get_args() {
                return {
                    waveify_a: new VecEntry(3, ["r","g","b"], [[0, 10],[0, 10],[0, 10],], [1,1,1]), waveify_f: new VecEntry(3, ["r","g","b"], [[0, 1000],[0, 1000],[0, 1000],], [100,100,100]), waveify_c: new VecEntry(3, ["r","g","b"], [[0, 6.283185307179586],[0, 6.283185307179586],[0, 6.283185307179586],], [0,0,0])
                }
            }
        }
        defineEl('synth-waveify', WaveifyElement);
        class Wavy extends SynthFunction {
            id = 38
            params = {}

            constructor(wavy_freq_x, wavy_c_x, wavy_strength_x, wavy_freq_y, wavy_c_y, wavy_strength_y, feedback) {
                super(feedback || 0);
                this.params.wavy_freq_x = wavy_freq_x;
this.params.wavy_c_x = wavy_c_x;
this.params.wavy_strength_x = wavy_strength_x;
this.params.wavy_freq_y = wavy_freq_y;
this.params.wavy_c_y = wavy_c_y;
this.params.wavy_strength_y = wavy_strength_y;

            }
        }

        class WavyElement extends SynthElementBase {
            get_title() {
                return "Wavy";
            }

            get_fn() {
                return Wavy;
            }

            get_args() {
                return {
                    wavy_freq_x: new FloatBar([0,100], 1), wavy_c_x: new FloatBar([0,6.283185307179586], 0), wavy_strength_x: new FloatBar([0,100], 1), wavy_freq_y: new FloatBar([0,100], 1), wavy_c_y: new FloatBar([0,6.283185307179586], 0), wavy_strength_y: new FloatBar([0,100], 1)
                }
            }
        }
        defineEl('synth-wavy', WavyElement);
        class Webcam extends SynthFunction {
            id = 39
            params = {}

            constructor(webcam_texture, webcam_dimensions, webcam_invert_x, webcam_invert_y, feedback) {
                super(feedback || 0);
                this.params.webcam_texture = webcam_texture;
this.params.webcam_dimensions = webcam_dimensions;
this.params.webcam_invert_x = webcam_invert_x;
this.params.webcam_invert_y = webcam_invert_y;

            }
        }

        class WebcamElement extends SynthElementBase {
            get_title() {
                return "Webcam";
            }

            get_fn() {
                return Webcam;
            }

            get_args() {
                return {
                    webcam_texture: new Webcam_webcam_texture(this.synth), webcam_dimensions: new Webcam_webcam_dimensions(this.synth), webcam_invert_x: new BoolEntry(true), webcam_invert_y: new BoolEntry(true)
                }
            }
        }
        defineEl('synth-webcam', WebcamElement);
        class Zoom extends SynthFunction {
            id = 40
            params = {}

            constructor(zoom, zoom_center, feedback) {
                super(feedback || 0);
                this.params.zoom = zoom;
this.params.zoom_center = zoom_center;

            }
        }

        class ZoomElement extends SynthElementBase {
            get_title() {
                return "Zoom";
            }

            get_fn() {
                return Zoom;
            }

            get_args() {
                return {
                    zoom: new FloatBar([0,10], 1), zoom_center: new VecEntry(2, ["x","y"], [[0, 1],[0, 1],], [0.5,0.5])
                }
            }
        }
        defineEl('synth-zoom', ZoomElement);
const MODULE_IDS = {"bitfield": {class: "BitfieldElement", tag: "generator"},"blur": {class: "BlurElement", tag: "space"},"checkerfill": {class: "CheckerfillElement", tag: "space"},"chromakey": {class: "ChromakeyElement", tag: "channels"},"circle packing": {class: "CirclePackingElement", tag: "color"},"composite": {class: "CompositeElement", tag: "channels"},"condzoom": {class: "CondzoomElement", tag: "channels"},"copy": {class: "CopyElement", tag: "channels"},"enhance": {class: "EnhanceElement", tag: "color"},"fourierdraw": {class: "FourierdrawElement", tag: "generator"},"gamma correct": {class: "GammaCorrectElement", tag: "color"},"greyscale": {class: "GreyscaleElement", tag: "color"},"halftone": {class: "HalftoneElement", tag: "space"},"hexswirl": {class: "HexswirlElement", tag: "space"},"hue shift": {class: "HueShiftElement", tag: "color"},"invert color": {class: "InvertColorElement", tag: "color"},"invert phase": {class: "InvertPhaseElement", tag: "color"},"multiply": {class: "MultiplyElement", tag: "channels"},"noise": {class: "NoiseElement", tag: "generator"},"offset": {class: "OffsetElement", tag: "color"},"oscillator": {class: "OscillatorElement", tag: "generator"},"picture": {class: "PictureElement", tag: "generator"},"pixelate": {class: "PixelateElement", tag: "space"},"polygon": {class: "PolygonElement", tag: "generator"},"radial": {class: "RadialElement", tag: "color"},"recolor": {class: "RecolorElement", tag: "color"},"reduce colors": {class: "ReduceColorsElement", tag: "color"},"reflector": {class: "ReflectorElement", tag: "space"},"ripple": {class: "RippleElement", tag: "space"},"rotate": {class: "RotateElement", tag: "space"},"superformula": {class: "SuperformulaElement", tag: "generator"},"swirl": {class: "SwirlElement", tag: "space"},"threshold": {class: "ThresholdElement", tag: "color"},"tile": {class: "TileElement", tag: "space"},"voronoi": {class: "VoronoiElement", tag: "color"},"voronoiswirl": {class: "VoronoiswirlElement", tag: "space"},"waveify": {class: "WaveifyElement", tag: "color"},"wavy": {class: "WavyElement", tag: "space"},"webcam": {class: "WebcamElement", tag: "generator"},"zoom": {class: "ZoomElement", tag: "space"},}
// ---------- END build/module_lib.js ------

// ---------- custommodule.js ----------
CirclePackingElement.prototype.custom_step = function(time, synth) {
  let init = false;
  if (!this.random_buffer ||
      this.fn_params.dimensions[0] != synth.dimensions[0] || this.fn_params.dimensions[1] != synth.dimensions[1]) {
    this.random_buffer = new Float32Array(4 * synth.dimensions[0] * synth.dimensions[1]);
    this.fn_params.random_buffer = new FrameBufferManager(synth.gl, synth.dimensions);

    this.fn_params.dimensions = synth.dimensions;
    init = true;
  }
  if (init || this.fn_params.params.cp_randomize) {
    for (let i = 0; i < this.random_buffer.length; i++) {
      this.random_buffer[i] = Math.random();
    }
    updateTexture(synth.gl, synth.dimensions, this.fn_params.random_buffer.src(), this.random_buffer);
  }
}

CirclePacking.prototype.custom_render = function(gl, programInfo, params, fbs) {
  twgl.setUniforms(programInfo, {
    u_cp_data_texture: this.random_buffer.src(),
    u_cp_opcode: 1,
    u_no_clamp: true,
  });
  this.random_buffer.bind_dst();
  render(gl);

  twgl.setUniforms(programInfo, {
    u_cp_data_texture: this.random_buffer.dst(),
    u_cp_opcode: 2,
    u_no_clamp: false,
  });
  fbs.bind_dst();
  render(gl);

  return true;
}
// ---------- END custommodule.js ------

// ---------- meta_module.js ----------
class ModuleElement extends SynthStageBase {
    stages = [];
    stageModules = {};

    enable = true;

    get_title() {
        return `Meta-${this.module.name}`;
    }

    setup_synth_state(synth, module) {
        const channelid = synth.active_channel;
        for (let idx of module.selection) {
            const name = synth._get_stages(channelid)[idx];
            this.stages.push(name);
            this.stageModules[name] = synth._get_stageModules(channelid)[name];
        }

        const counter = globalCounters[this.get_title()] || 0;
        globalCounters[this.get_title()] = counter + 1;
        this.name = `${this.get_title()}-${counter}`;

        let old_name = synth._get_stages(channelid)[module.selection[0]];
        synth._get_stages(channelid)[module.selection[0]] = this.name;
        delete synth._get_stageModules(channelid)[old_name];
        synth._get_stageModules(channelid)[this.name] = new Stage(this, (t, s) => { this.step(t, s); });

        console.log("removed stage", old_name, module.selection);

        for (let _i = 1; _i < module.selection.length; _i++) {
            console.log("removing stage", synth._get_stages(channelid)[module.selection[1]]);
            synth.remove_stage(channelid, synth._get_stages(channelid)[module.selection[1]]);
        }

        // TODO find similar patterns?
    }

    constructor(synth, module) {
        super(synth, (self_) => {
            self_.module = module;
        });
        this.setup_synth_state(synth, module);
        this.synth_container = document.createElement('div');
        this.container.appendChild(this.synth_container);
    }

    appendChild(child) {
        this.synth_container.appendChild(child);
    }

    toggle_stage(name, state) {
        this.stageModules[name].enable = state;
    }

    save() {
        const saved = [];
        for (let i = 0; i < this.synth_container.children.length; i++)
            saved.push(this.synth_container.children[i].save());
        return {
            title: this.get_title(),
            module: this.module,
            enabled: this.enable_el.checked,
            args: saved,
        }
    }

    step(time) {
        for (let stage of this.stages)
            this.stageModules[stage].step(time);
    }
}
defineEl('module-element', ModuleElement);

const meta_modules = { };

class ModuleCreator {
    selection = new Set();

    constructor(modal, synth, resolver) {
        this.container = document.createElement('div');
        this.container.className = "functiongen";
        this.container.style['text-align'] = "left";

        const header = document.createElement('h1');
        header.innerText = "Module Creator";
        const subheading = document.createElement('h3');
        subheading.innerText = "Select consecutive stages to create a meta module";
        this.container.appendChild(header);
        this.container.appendChild(subheading);
        this.container.appendChild(document.createElement('hr'));
        this.container.appendChild(document.createElement('br'));

        this.error = document.createElement('p');
        this.error.className = 'errors';

        const name_label = document.createElement("label");
        name_label.for = "module-name";
        name_label.innerText = "Name of module: ";
        const name = document.createElement("input");
        name.id = "module-name";
        this.container.appendChild(name_label);
        this.container.appendChild(name);
        this.container.appendChild(document.createElement("br"));

        const channelid = synth.active_channel;
        if (synth._get_stages(channelid).length == 0) {
            this.error.innerText = "No stages in synth! Please add some stages before creating a new module.";
        } else {
            const selection_container = document.createElement('div');
            selection_container.className = 'create-module-selection';
            for (let i = 0; i < synth._get_stages(channelid).length; i++) {
                const stage = synth._get_stages(channelid)[i];
                const label = document.createElement('label');
                label.for = stage;
                label.innerText = stage;
                const option = document.createElement('input');
                option.type = 'checkbox';
                option.id = stage;
                option.addEventListener('change', () => {
                    this.selected(stage, i, option.checked);
                });

                selection_container.appendChild(label);
                selection_container.appendChild(option);
                selection_container.appendChild(document.createElement('br'));
            }

            this.container.appendChild(selection_container);
        }

        this.save = document.createElement('button');
        this.save.innerText = "Save";
        this.save.style.display = "";
        this.save.addEventListener("click", () => {
            if (name.value === "") {
                this.error.innerText = "Please enter a valid name!";
            } else if (meta_modules[name.value] === "") {
                this.error.innerText = "That name is already taken!";
            } else {
                const selection = Array.from(this.selection);
                selection.sort((x, y) => x - y);
                resolver({
                    name: name.value,
                    selection: selection
                });
            }
        });

        const cancel = document.createElement('button');
        cancel.innerText = "Cancel";
        cancel.addEventListener("click", () => {
            resolver();
        });
        this.container.appendChild(document.createElement('br'));
        this.container.appendChild(this.error);
        this.container.appendChild(cancel);
        this.container.appendChild(this.save);
        modal.appendChild(this.container);
    }

    remove() {
        this.container.remove();
    }

    selected(name, id, state) {
        if (state)
            this.selection.add(id);
        else
            this.selection.delete(id);
        console.log(name, id, state);

        this.validate();
    }

    validate() {
        let seen_true = false;
        let expect_absent = false;
        let invalid = false;
        for (let i = 0; i < synth._get_stages(channelid).length; i++) {
            if (this.selection.has(i)) {
                if (expect_absent) {
                    invalid = true;
                    break;
                }
                seen_true = true;
            } else if (seen_true) {
                expect_absent = true;
            }
        }

        if (invalid) {
            this.save.style.display = "none";
            this.error.innerText = "Invalid selection! Must choose consecutive stages"
        } else if (this.selection.size) {
            this.save.style.display = "";
            this.error.innerText = ""
        } else {
            this.save.style.display = "none";
        }
    }
}

function append_meta_module(name, initializer, length, ui_container, synth) {
    const chan = synth.active_channel;
    loaddata([initializer], ui_container, synth, true);
    const meta_module = {
        name: name,
        selection: [...Array(length).keys()].map(x => synth._get_stages(chan).length - length + x)
    };
    add_meta_module(meta_module, ui_container.querySelector(`#ui-${chan}`), synth);
}

function register_module(name, meta_module_desc) {
    if (meta_modules[name])
        return;
    meta_modules[name] = meta_module_desc;
    document.getElementById('add-meta-module').style.display = "";
    const new_option = document.createElement('option');
    new_option.innerText = name;
    new_option.value = name;
    document.getElementById('add-meta-select').appendChild(new_option);

}

function add_meta_module(module, ui, synth) {
    console.log(...synth._get_stages(synth.active_channel));
    const synth_module = new ModuleElement(synth, module);
    for (let idx of module.selection)
        ui.children[idx].reparent_to_module(synth_module);

    ui.insertBefore(synth_module, ui.children[module.selection[0]]);
    for (let i = 0; i < module.selection.length; i++) {
        const child = ui.children[module.selection[0] + 1];
        child.remove();
        synth_module.appendChild(child);
    }
}

function setup_meta_module(ui_container, synth) {
    const createbtn = document.getElementById("create-module");
    createbtn.addEventListener('click', async () => {
        let resolver = null;
        const p = new Promise(r => { resolver = r; });
        const modal = createModal(resolver);
        const creator = new ModuleCreator(modal, synth, resolver);

        const meta_module_defn = await p;
        creator.remove();
        modal.remove();
        if (!meta_module_defn)
            return;

        const ui = ui_container.querySelector(`#ui-${synth.active_channel}`);
        const module_initializer = [];
        for (let idx of meta_module_defn.selection) {
            module_initializer.push(ui.children[idx].save());
        }

        register_module(
            meta_module_defn.name,
            {
                init: module_initializer,
                count: meta_module_defn.selection.length
            }
        );

        add_meta_module(meta_module_defn, ui, synth);
    });

    document.getElementById("add-meta").addEventListener("click", () => {
        console.log("onclick");
        const name = document.getElementById('add-meta-select').value;
        const data = meta_modules[name];
        append_meta_module(name, data.init, data.count, ui, synth);
    });

    // TODO "delete" module ui
}
// ---------- END meta_module.js ------

// ---------- recording.js ----------
function setup_recording(synth) {
    const start_btn = document.getElementById("startstop");
    let started = true;
    start_btn.addEventListener("click", () => {
        if (started) {
            synth.stop();
            start_btn.innerText = "Start";
            started = false;
        } else {
            synth.run();
            start_btn.innerText = "Stop";
            started = true;
        }
    });

    const screenshot = document.getElementById("screenshot").addEventListener("click", () => {
        synth.canvas.toDataURL()
        _download(synth.canvas.toDataURL(), 'synth_screenshot.png');
    });

    const frame_fps_inp = document.getElementById("render-fps");
    const frame_inp = document.getElementById("render-frame");
    const render_specific = document.getElementById("render-specific");
    const render_next = document.getElementById("render-next");
    render_specific.addEventListener("click", async () => {
        synth.stop();
        start_btn.innerText = "Start";
        started = false;
        await new Promise(r => setTimeout(r, 100));
        const mspf = 1000 / frame_fps_inp.value;
        const frame_time = frame_inp.value * mspf;
        synth.render(frame_time);
    });
    render_next.addEventListener("click", async () => {
        console.log(frame_inp);
        frame_inp.value = Number(frame_inp.value) + 1;
        render_specific.dispatchEvent(new Event("click"));
    });

    const record_start_inp = document.getElementById("record-start");
    const duration_inp = document.getElementById("record-duration");
    const fps_inp = document.getElementById("record-fps");
    const record_btn_zip = document.getElementById("record");
    const record_btn_mp4 = document.getElementById("record-mp4");

    const record_status = document.getElementById("recordstatus");
    const record_progress = document.getElementById("recordprogress");
    const record_info = document.getElementById("recordinfo");

    const do_record = async (ext, get_context, add_to_context, export_context) => {
        synth.stop();
        const recording = [];
        let record_frames = duration_inp.value;
        const fps = fps_inp.value;
        const mspf = 1000 / fps;
        let time = record_start_inp.value * mspf;
        record_progress.max = 2.5 * duration_inp.value;
        record_progress.value = 0;
        record_status.style.display = "";
        record_info.innerText = "Recording frames...";

        const context = await get_context();
        for (let i = 0; i < record_frames; i++) {
            synth.render(time);
            time += mspf;
            record_progress.value++;
            add_to_context(context, synth, i);
            record_progress.value++;
            await new Promise(r => setTimeout(r, 10));
        }

        record_info.innerText = "Exporting...";
        const exported = await export_context(context);
        record_info.innerText = "Done!";
        record_progress.value = record_progress.max;

        const name = synth.name || 'recording';
        _download(exported, `${name}.${ext}`);
        record_status.style.display = "none";

        // TODO re-download button

        if (started)
            synth.run();
    };

    record_btn_zip.addEventListener("click", async () => {
        await do_record(
            "zip",
            () => new JSZip(),
            (zip, synth, i) => {
                zip.file(`recording-${i}.png`, synth.get_url().substr("data:image/png;base64,".length), {base64: true});
            },
            async (zip) => URL.createObjectURL(await zip.generateAsync({type: "blob"})),
        );
    });

    record_btn_mp4.addEventListener("click", async () => {
        await do_record(
            "mp4",
            async () => {
                const encoder = await HME.createH264MP4Encoder()
                // TODO enforce even width/height
                encoder.width = synth.dimensions[0];
                encoder.height = synth.dimensions[1];
                encoder.initialize();
                return encoder;
            },
            (encoder, synth, _i) => {
                encoder.addFrameRgba(synth.get_img_data());
            },
            async (encoder) => {
                encoder.finalize();
                const data = encoder.FS.readFile(encoder.outputFilename);
                const blob = new Blob([data], { type: 'octet/stream' });
                return window.URL.createObjectURL(blob);
            },
        );
    });
}
// ---------- END recording.js ------

// ---------- channelui.js ----------
function setup_channels(ui_container, synth) {
    const chan_select = document.getElementById("channel-select");
    const render_select = document.getElementById("channel-render");

    chan_select.addEventListener("change", () => {
        const curr_ui = ui_container.querySelector(`#ui-${synth.active_channel}`);
        curr_ui.style.display = "none";

        synth.active_channel = parseInt(chan_select.value);

        const new_ui = ui_container.querySelector(`#ui-${synth.active_channel}`);
        new_ui.style.display = "";
    });
    chan_select.value = "0";

    render_select.addEventListener("change", () => {
        synth.render_channel = parseInt(render_select.value);
    });
    render_select.value = "0";

    const add_new_chan_option = () => {
        const new_chan = synth.channels.length - 1;
        add_new_channel_ui(ui_container, new_chan);
        const new_opt = document.createElement('option');
        new_opt.innerText = new_chan;
        new_opt.value = new_chan;

        chan_select.appendChild(new_opt);
        chan_select.value = new_chan;

        chan_select.dispatchEvent(new Event("change"));

        console.log("Appending to render_select", new_chan);
        const new_opt_1 = document.createElement('option');
        new_opt_1.innerText = new_chan;
        new_opt_1.value = new_chan;
        render_select.appendChild(new_opt_1);
        render_select.value = new_chan;

        render_select.dispatchEvent(new Event("change"));
    }

    const add_chan_btn = document.getElementById("channel-add");
    add_chan_btn.addEventListener("click", () => {
        synth.add_channel();
        add_new_chan_option();
    });

    ui_container.addEventListener("add_channel", add_new_chan_option);
}
// ---------- END channelui.js ------

// ---------- saveload.js ----------
const saveload_script = document.currentScript;
function loaddata(savedatas, ui_container, synth, into_current) {
    // TODO validation
    const chan_count = synth.channels.length;

    let start_chan = chan_count - 1;

    if (into_current) {
        start_chan = synth.active_channel;
    } else {
        // find last channel that's empty
        while (start_chan >= 0 && synth.channels[start_chan].stages.length == 0)
            start_chan--;
        start_chan += 1;
    }

    savedatas.forEach((savedata, chan_id) => {
        let curr_chan = start_chan + chan_id;
        if (curr_chan >= synth.channels.length) {
            synth.add_channel();
            ui_container.dispatchEvent(new Event("add_channel"));
        }

        synth.active_channel = curr_chan;
        for (let elem of savedata) {
            if (elem.module) {
                // if (!meta_modules[elem.module.name])
                //     throw new Error("Unexpected module"); // TODO ui for this error
                const count = elem.module.selection.length;
                console.group(`ADD ${elem.module.name}`);
                // TODO take in MetaModuleManager obj or smth
                append_meta_module(elem.module.name, elem.args, count, ui_container, synth);
                console.groupEnd(`ADD ${elem.module.name}`);
            } else {
                const moduleElem = eval(elem.title + 'Element');
                const new_elem = new moduleElem(synth);
                let container = ui_container.querySelector(`#ui-${curr_chan}`);
                if (!container && __suffix) // standalone mode
                    container = ui_container;
                container.appendChild(new_elem);
                new_elem.load(elem);
                console.log('ADD', new_elem.get_title());
            }
        }
    });
}

function load_meta_modules(moduledata_descs) {
    for (let module_name of Object.keys(moduledata_descs)) {
        if (meta_modules[module_name])
            throw new Error("Conflicting module name"); // TODO ui for this error
    }

    for (let module_name of Object.keys(moduledata_descs))
        register_module(module_name, moduledata_descs[module_name]);
}

const MAGIC = "SYN".split('').map(x => x.charCodeAt(0));
MAGIC.push(255);
const header_len = MAGIC.length + 4;

function decode_stego(stegodata, LZString) {
    console.log(stegodata);
    // const stegodata = new Uint8Array(reader.result);
    for (let i = 0; i < MAGIC.length; i++) {
        if (stegodata[i] != MAGIC[i]) {
            console.log(stegodata);
            throw new Error("File is not synth data");
        }
    }

    let length = 0;
    for (let i = 2; i >= 0; i--) {
        length *= 256;
        const newdata = stegodata[MAGIC.length + i];
        console.log(length, '*', 256, '+', newdata);
        length += newdata;
    }

    console.log("len", length);
    const data = new Uint8Array(length);
    for (let i = 0; i < length; i++) {
        const idx = 4 * i;
        if (i == 0) {
            console.log(stegodata[header_len + idx + 0]);
            console.log(stegodata[header_len + idx + 0] & 0x0f);
            console.log(stegodata[header_len + idx + 1]);
            console.log(stegodata[header_len + idx + 1] & 0x0f);
        }
        const entry = (stegodata[header_len + idx + 0] & 0x0f) * 16 +
                        (stegodata[header_len + idx + 1] & 0x0f);
        data[i] = entry;
    }

    console.log(data);

    const result = LZString.decompressFromUint8Array(data);
    console.log(result);

    return result;
}

function _download(data_blob, filename) {
    const downloader = document.createElement('a');
    downloader.setAttribute('href', URL.createObjectURL(data_blob));
    downloader.setAttribute('download', filename);
    downloader.style.display = "none";
    document.body.appendChild(downloader);

    downloader.click();

    document.body.removeChild(downloader);
}

function setup_save_load(ui_container, synth, settingsui) {
    // magic + 4 byte length + 1 byte per RGBA values
    // this is because we can't use the A channel because of premultiplied
    // stuff, TODO fix that
    const max_stego_size = Math.min(
        0xffffff,
        (4 * synth.dimensions[0] * synth.dimensions[1] - header_len) / 4);

  const getSaveData = () => {
      const channels = [];
      for (let i = 0; i < ui_container.children.length; i++) {
          const ui = ui_container.children[i];
          const channel = [];
          for (let j = 0; j < ui.children.length; j++)
              channel.push(ui.children[j].save());
          channels.push(channel);
      }

      const saveobj = {
          channels: channels,
          modules: meta_modules,
          settings: settingsui.save()
      };

      const savestr = JSON.stringify(saveobj);
      return savestr;
    };

    document.getElementById("save").addEventListener('click', () => {
        const compressed = LZString.compressToUint8Array(getSaveData())
        console.log(compressed.length);
        console.log(compressed);

        const stego_possible = compressed.length < max_stego_size;
        if (compressed.length <= 0xffffff) {
            const required_px = compressed.length + header_len / 4;
            console.log("req scale factor", required_px / (synth.dimensions[0] * synth.dimensions[1]));
        }
        console.log("sp", stego_possible);
        if (stego_possible) {
            const output_canvas = document.createElement("canvas");
            output_canvas.width = synth.dimensions[0];
            output_canvas.height = synth.dimensions[1];

            const output_ctx = output_canvas.getContext("2d");
            const img = output_ctx.createImageData(...synth.dimensions);
            synth.get_frame_data(img.data);

            for (let i = 0; i < (synth.dimensions[1] / 2); i++) {
                //swap rows i and (synth.dimensions[1] - 1 -i)
                // TODO why is this upside down in the first place?
                const curr_row = 4 * i * synth.dimensions[0];
                const other_row = 4 * (synth.dimensions[1] - 1 - i) * synth.dimensions[0];
                for (let j = 0; j < 4 * synth.dimensions[0]; j++) {
                    const curr_idx = curr_row + j
                    const other_idx = other_row + j
                    const temp = img.data[curr_idx];
                    img.data[curr_idx] = img.data[other_idx];
                    img.data[other_idx] = temp;
                }
            }

            console.log("encoding MAGIC");
            for (let i = 0; i < MAGIC.length; i++)
                img.data[i] = MAGIC[i];

            console.log("encoding len");
            let length = compressed.length;
            for (let i = 0; i < 3; i++) {
                img.data[MAGIC.length + i] = length % 256;
                length = Math.floor(length / 256);
            }


            console.log("encoding data");
            for (let i = 0; i < compressed.length; i++) {
                const idx = i * 4;
                img.data[header_len + idx + 0] &= 0xf0;
                img.data[header_len + idx + 0] += (0xf0 & compressed[i]) / 16;

                img.data[header_len + idx + 1] &= 0xf0;
                img.data[header_len + idx + 1] += 0x0f & compressed[i];
            }

            output_ctx.putImageData(img, 0, 0);
            output_canvas.toBlob((b) => {
              _download(b, `${synth.name}.savedata.png`);
            });
        } else {
            const blob = new Blob([savedata], {type: 'text/plan;charset=utf-8,'});
            _download(blob, `${synth.name}.savedata`);
        }
    });

    document.getElementById("savestandalone").addEventListener('click', async () => {
      const script_base = await getFile(saveload_script.src);
      let wrapper = "const load_synth = (canvas, cb) => {"
      wrapper += script_base;
      wrapper += "return loadStaticSynth(canvas, " + getSaveData() + ", cb); };"
      const blob = new Blob([wrapper], {type: 'text/plan;charset=utf-8,'});
      _download(blob, `${synth.name}.standalone.js`);
    });

    const do_load = (name, savedata) => {
        if (savedata.modules)
            load_meta_modules(savedata.modules);
        if (savedata.stages)
            loaddata([savedata.stages], ui_container, synth);
        if (savedata.channels)
            loaddata(savedata.channels, ui_container, synth);
        if (savedata.settings)
            settingsui.load(savedata.settings);
        if (synth.name === "") {
            synth.name = name;
            ui.dispatchEvent(new Event("namechange"));
        }
    };

    const loadUpload = document.getElementById("load");
    loadUpload.addEventListener("change", () => {
        let file = loadUpload.files[0];
        let reader = new FileReader();
        console.log(file, reader);
        const name = file.name.split(".")[0];
        if (file.name.endsWith(".png")) {
            reader.readAsDataURL(file)
            reader.onloadend = async () => {
                const img = new Image();
                img.src = reader.result;
                await new Promise(r => { img.onload = r; });

                const canvas = document.createElement("canvas");
                canvas.width = img.width;
                canvas.height = img.height;

                const ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0);

                const ctxdata = ctx.getImageData(0, 0, ...synth.dimensions);
                const stegodata = ctxdata.data;
                const result = decode_stego(stegodata, LZString);

                do_load(name, JSON.parse(result));
            }
        } else {
            reader.readAsText(file)
            reader.onloadend = () => {
                do_load(name, JSON.parse(reader.result));
            };
        }
    });
}

try {
    exports.decode_stego = decode_stego;
} catch (e) { }
// ---------- END saveload.js ------

// ---------- settings.js ----------
class SettingsUI {
    constructor(ui_container, synth) {
        this.name_inp = document.getElementById("name");
        this.clock_inp = document.getElementById("clock_speed");
        // const autosave_btn = document.getElementById("autosave_enable");
        // const autosave_opts = document.getElementById("autosave_opts");

        this.name_inp.addEventListener("change", () => {
            synth.name = this.name_inp.value;
            ui_container.dispatchEvent(new Event("namechange"));
        });
ui_container.addEventListener("namechange", () => {
            this.name_inp.value = synth.name;
        });

        this.clock_inp.addEventListener("change", () => {
            synth.clock_speed = this.clock_inp.value;
        });
        this.clock_inp.value = 1;

        // TODO default channel

        // this.auto_dims_btn = document.getElementById("auto_dims_enable");
        this.render_width_inp = document.getElementById("render_width");
        this.render_width_inp.value = 1000;
        this.render_height_inp = document.getElementById("render_height");
        this.render_height_inp.value = 1000;
        // this.render_dims = document.getElementById("render_dims");
        // this.target_fps_container = document.getElementById("target_fps_container");
        // this.target_fps = document.getElementById("target_fps");
        // this.target_fps.value = synth.target_fps;
        // this.auto_dims_btn.addEventListener("change", () => {
        //     if (this.auto_dims_btn.checked) {
        //         this.target_fps_container.style.display = "";
        //         this.render_dims.style.display = "none";
        //         synth.begin_auto_scale();
        //     } else {
        //         synth.stop_auto_scale();
        //         this.target_fps_container.style.display = "none";
        //         this.render_dims.style.display = "";
        //         this.render_width_inp.value = synth.dimensions[0];
        //         this.render_height_inp.value = synth.dimensions[1];
        //     }
        // });
        // TODO add to save/load
        // TODO allow picture/webcam to resize canvas with an option
        this.render_height_inp.addEventListener("change", () => {
            synth.resize([synth.dimensions[0], Math.floor(this.render_height_inp.value)]);
        });
        this.render_width_inp.addEventListener("change", () => {
            synth.resize([Math.floor(this.render_width_inp.value), synth.dimensions[1]]);
        });

        const startaudio = document.getElementById("startaudio");
        // TODO autosave to localstorage
        startaudio.addEventListener("click", async () => {
            try {
                // https://stackoverflow.com/a/52952907
                const stream = await navigator.mediaDevices.getUserMedia({audio: true});
                const audioContext = new AudioContext();
                const analyzer = audioContext.createAnalyser();
                const microphone = audioContext.createMediaStreamSource(stream);
                const javascriptNode = audioContext.createScriptProcessor(2048, 1, 1);

                analyzer.smoothingTimeConstant = 0.8;
                analyzer.fftSize = 1024;

                microphone.connect(analyzer);
                analyzer.connect(javascriptNode);
                javascriptNode.connect(audioContext.destination);
                javascriptNode.onaudioprocess = function() {
                    if (synth.volume.length < analyzer.frequencyBinCount)
                        synth.volume = new Uint8Array(analyzer.frequencyBinCount);
                    analyzer.getByteFrequencyData(synth.volume);
                }
            } catch(err) {
                console.log(err);
                alert("Error getting audio: ", err);
            }
        });

        this.synth = synth;
    }

    save() {
        // TODO save audio required?
        return {
            name: this.name_inp.value,
            clock: this.clock_inp.value,
            width: this.render_width_inp.value,
            height: this.render_height_inp.value,
        };
    }

    load(data) {
        this.name_inp.value = data.name || this.name_inp.value;
        this.name_inp.dispatchEvent(new Event("change"));
        this.clock_inp.value = data.clock || 1;
        this.clock_inp.dispatchEvent(new Event("change"));
        this.render_width_inp.value = data.width || this.render_width_inp.value;
        this.render_width_inp.dispatchEvent(new Event("change"));
        this.render_height_inp.value = data.height || this.render_height_inp.value;
        this.render_height_inp.dispatchEvent(new Event("change"));
    }
}
// ---------- END settings.js ------

// ---------- synth.js ----------
class Stage {
    constructor(fn_params, step) {
        this.fn_params = fn_params;
        this.step = step;
    }
}

class Channel {
    enable = true;
    stages = []; // List[str]
    stageModules = {}; // Map[str, Stage]
}

class Synth {
    name = "";
    clock_speed = 1;

    dimensions = [1000, 1000];

    active_channel = 0; // TODO Synth should not track active channel! That belongs to the non-existant UI object.
    render_channel = 0;
    channels = [new Channel()];

    // Volume is read by functions requiring audio
    volume = new Uint8Array(0);

    transform = {
        center: [ 0.5, 0.5 ],
        scale: 1,
        rotation: 0,
    }

    reset_transform() {
        this.transform = {
            center: [ 0.5, 0.5 ],
            scale: 1,
            rotation: 0,
        }
    }

    enable = true;

    constructor(canvas) {
        this.dimensions = [1000, 1000];

        canvas.width = this.dimensions[0];
        canvas.height = this.dimensions[1];
        this.gl = canvas.getContext("webgl2", {'preserveDrawingBuffer': true});
        if (!this.gl)
            throw new Error("Could not initialize webgl2 context! Does your browser support webgl2?");
        enableGlExts(this.gl);

        this.programInfo = twgl.createProgramInfo(this.gl, [vs, SYNTHFRAGSHADER]);
        const bufferInfo = twgl.createBufferInfoFromArrays(this.gl, bufferArrays);
        setupProgram(this.gl, this.programInfo, bufferInfo);

        this.fbs = [new FrameBufferManager(this.gl, this.dimensions)];
        this.canvas = canvas;
    }

    add_channel() {
        this.channels.push(new Channel());
        this.fbs.push(new FrameBufferManager(this.gl, this.dimensions));
    }

    _get_stages(channelid) {
        return this.channels[channelid].stages;
    }

    _get_stageModules(channelid) {
        return this.channels[channelid].stageModules;
    }

    resize(new_dims) {
        this.dimensions = [...new_dims];
        this.canvas.width = this.dimensions[0];
        this.canvas.height = this.dimensions[1];

        this.gl.viewport(0, 0, ...this.dimensions);

        for (let i = 0; i < this.channels.length; i++)
            this.fbs[i] = new FrameBufferManager(this.gl, this.dimensions);
    }

    last_render_time = 0;
    target_time_ms = 1000 / 60;
    auto_scaling = false;

    render(time_) {
        this.dispatchEvent
        let time = time_ * this.clock_speed;

        const process_stages = (fbs, stage, stageid) => {
            const fn_params = stage.fn_params;

            if (!fn_params.enable)
                return;
            stage.step(time, this);

            if (stageid == 0)
                this.reset_transform();

            if (fn_params instanceof Channel || fn_params instanceof ModuleElement) {
                fn_params.stages.forEach((name, stageid_) => {
                    const fn_params_ = fn_params.stageModules[name];

                    process_stages(fbs, fn_params_, stageid + 1 + stageid_);
                });
                return;
            } else if (fn_params instanceof TransformElement) {
                this.transform.scale = fn_params.params.scale;
                this.transform.center = [...fn_params.params.center];
                this.transform.rotation = fn_params.params.rotation;
                return;
            }

            const params = {
                u_dimensions: this.dimensions,
                u_tex_dimensions: this.dimensions,
                u_texture: fbs.src(),
                u_transform_center: this.transform.center,
                u_transform_scale: this.transform.scale,
                u_transform_rotation: this.transform.rotation,
                u_function: fn_params.id,
                u_feedback: fn_params.feedback,
                u_constrain_to_transform: fn_params.constrain,
                u_no_clamp: false,
            };
            for (let key of Object.keys(fn_params.params)) {
                let value = fn_params.params[key];
                if (value instanceof ChannelId)
                    value = this.fbs[value.id].src();
                params['u_' + key] = value;
            }

            twgl.setUniforms(this.programInfo, params);

            // If the function defines a custom rendering function, do that
            // instead
            if (!fn_params.custom_render(this.gl, this.programInfo, params, fbs)) {
              // default render path
              fbs.bind_dst();
              render(this.gl);
            }

            // clear channel textures
            for (let key of Object.keys(fn_params.params)) {
                let value = fn_params.params[key];
                if (value instanceof ChannelId) {
                    params['u_' + key] = 0;
                }
            }
            twgl.setUniforms(this.programInfo, params);

            fbs.flipflop();
        };

        for (let i = 0; i < this.channels.length; i++)
            process_stages(this.fbs[i], new Stage(this.channels[i], (t, s) => {}), -1);

        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);
        twgl.setUniforms(this.programInfo, {
            u_tex_dimensions: this.dimensions,
            u_texture: this.fbs[this.render_channel].src(),
            u_function: 0, // DRAW
            u_feedback: 1,
        });
        render(this.gl);
    }

    get_url() {
        return this.canvas.toDataURL();
    }

    get_img_data() {
        // TODO this is flipped, see the code in saveload.js
        const pixels = new Uint8Array(this.dimensions[0] * this.dimensions[1] * 4);
        this.gl.readPixels(0, 0, ...this.dimensions, this.gl.RGBA, this.gl.UNSIGNED_BYTE, pixels);
        return pixels;
    }

    get_frame_data(array) {
        this.gl.readPixels(0, 0, ...this.dimensions, this.gl.RGBA, this.gl.UNSIGNED_BYTE, array);
    }

    add_stage(chan, name, module) {
        if (this.channels[chan].stages.indexOf(name) != -1)
            throw new Error("name collision");
        this.channels[chan].stageModules[name] = module;
        this.channels[chan].stages.push(name);
    }

    remove_stage(chan, name) {
        const idx = this.channels[chan].stages.indexOf(name);
        if (idx == -1)
            throw new Error("no such stage");
        delete this.channels[chan].stageModules[name];
        this.channels[chan].stages.splice(idx, 1);
    }

    toggle_stage(chan, name, state) {
        this.channels[chan].stageModules[name].fn_params.enable = state;
    }

    running = null;
    cancel = false;
    run() {
        if (this.running)
            return;

        this.running = new Promise(r => {
            const runner = async (time) => {
                this.render(time);
                // TODO custom framerate?
                await new Promise(r => setTimeout(r, 10));
                if (!this.cancel)
                    requestAnimationFrame(runner);
                else
                    r();
            }
            requestAnimationFrame(runner);
        });
    }

    async stop() {
        if (!this.running)
            return;

        this.cancel = true;
        await this.running;
        this.running = null;
        this.cancel = false;
    }
}

function setup_controler() {
    let current_controls = 0;
    const num_controls = 5;
    document.getElementById("controls-next").addEventListener("click", () => {
        document.getElementById(`controls-${current_controls}`).style.display = "none";
        current_controls += 1;
        current_controls %= num_controls;
        document.getElementById(`controls-${current_controls}`).style.display = "";
    });
    document.getElementById("controls-prev").addEventListener("click", () => {
        document.getElementById(`controls-${current_controls}`).style.display = "none";
        current_controls -= 1;
        if (current_controls < 0)
            current_controls += num_controls;
        document.getElementById(`controls-${current_controls}`).style.display = "";
    });
}

const add_new_tags = ["generator", "space", "color", "channels"];
let current_add_new_tag = 0;
function setup_add_new_stage(ui_container, synth) {
    const update_add_new = (new_tag) => {
        new_tag = (new_tag + add_new_tags.length) % add_new_tags.length;

        const old_obj = document.getElementById(`add_new_${add_new_tags[current_add_new_tag]}_container`);
        old_obj.style.display = "none";
        const new_obj = document.getElementById(`add_new_${add_new_tags[new_tag]}_container`);
        new_obj.style.display = "";

        current_add_new_tag = new_tag;
    };

    document.getElementById("add_new-prev").addEventListener('click', () => {
        update_add_new(current_add_new_tag - 1);
    });
    document.getElementById("add_new-next").addEventListener('click', () => {
        update_add_new(current_add_new_tag + 1);
    });

    const buttons = {};
    const selectors = {};
    for (let tag of add_new_tags) {
        buttons[tag] = document.getElementById(`add_new_${tag}`);
        selectors[tag] = document.getElementById(`add_new_${tag}_select`);
        buttons[tag].addEventListener('click', () => {
            const stageElem = eval(selectors[tag].value);
            const ui = ui_container.querySelector(`#ui-${synth.active_channel}`);
            ui.appendChild(new stageElem(synth));
        });
    }

    for (let module of Object.keys(MODULE_IDS)) {
        const module_info = MODULE_IDS[module];

        const opt = document.createElement('option');
        opt.innerText = module;
        opt.value = module_info.class;

        selectors[module_info.tag].appendChild(opt);
    }

    const opt = document.createElement('option');
    opt.innerText = 'transform';
    opt.value = 'TransformElement';
    selectors['space'].appendChild(opt);
}

async function synth_main(canvas) {
    const synth = new Synth(canvas);
    window.synth = synth;
    synth.run();

    const sidebar = document.getElementById("sidebar");
    sidebar.style.display = "none";
    const burgerbtn = document.getElementById("burgerbtn");
    const title = document.getElementById("title");

    const showmenu = () => {
        sidebar.style.display = "";
        burgerbtn.style.display = "none";
    };
    const hidemenu = () => {
        sidebar.style.display = "none";
        burgerbtn.style.display = "";
    };

    burgerbtn.addEventListener('click', showmenu);
    title.addEventListener('click', hidemenu);
    document.getElementById("display-container").addEventListener("click", hidemenu);

    const rightsidebar = document.getElementById("rightsidebar");
    rightsidebar.style.display = "none";
    const gearbtn = document.getElementById("gearbtn");
    const settingstitle = document.getElementById("settingstitle");

    const showrightmenu = () => {
        rightsidebar.style.display = "";
        gearbtn.style.display = "none";
    };
    const hiderightmenu = () => {
        rightsidebar.style.display = "none";
        gearbtn.style.display = "";
    };
    gearbtn.addEventListener('click', showrightmenu);
    settingstitle.addEventListener('click', hiderightmenu);
    document.getElementById("display-container").addEventListener("click", hiderightmenu);


    const ui_container = document.getElementById("ui-container");
    ui_container.addEventListener("namechange", () => {
        title.innerText = synth.name;
    });

    const settings = new SettingsUI(ui_container, synth);
    setup_controler();
    setup_channels(ui_container, synth);

    setup_add_new_stage(ui_container, synth);
    setup_meta_module(ui_container, synth);
    // TODO channelize saveload
    setup_save_load(ui_container, synth, settings);
    setup_recording(synth);
}

function loadStaticSynth(canvas, data, cb) {
    const synth = new Synth(canvas)
    synth.run();

    const ui_container = document.createElement('div');
    const ui0 = document.createElement('div');
    ui0.id = "ui-0";
    ui_container.appendChild(ui0);
    // note that meta-modules don't need to be loaded
    loaddata(data.stages ? [data.stages] : data.channels, ui_container, synth);
    if (cb) {
        cb(ui_container);
    }

    return synth;
}
// ---------- END synth.js ------

return loadStaticSynth(canvas, {"channels":[[{"title":"Webcam","enabled":true,"args":{"webcam_invert_x":true,"webcam_invert_y":true,"feedback":{"value":0,"generate":false},"constrain":0}},{"title":"InvertColor","enabled":true,"args":{"feedback":{"value":1,"generate":false},"constrain":0}},{"title":"CirclePacking","enabled":true,"args":{"cp_radius_factor":{"value":5,"generate":false},"cp_selection_threshold":{"value":0.25,"generate":false},"cp_max_radius":{"value":8,"generate":false},"cp_randomize":true,"feedback":{"value":1,"generate":false},"constrain":0}},{"title":"InvertColor","enabled":true,"args":{"feedback":{"value":1,"generate":false},"constrain":0}},{"title":"ReduceColors","enabled":true,"args":{"reduce_colors_data":[0.6121268272399902,0.32977816462516785,0.6418824195861816,0.45559582114219666,0.5937443971633911,0.0027263122610747814,0.3603799045085907,0.338809996843338,0.8918926119804382,0.825812816619873,0.7762375473976135,0.9909664392471313,0.6348928809165955,0.39170682430267334,0.10466989874839783,0.6627237796783447,0.3599729537963867,0.27261435985565186,0.8588270545005798,0.6727181673049927,0.3177746534347534,0.24141740798950195,0.8515263199806213,0.6997007131576538,0.3394113779067993,0.2816005051136017,0.9050888419151306,0.5748923420906067,0.34635689854621887,0.9191242456436157,0.7227476239204407,0.4836767017841339,0.05538027361035347,0.43644979596138,0.7164493203163147,0.5778039693832397,0.2803749144077301,0.292706698179245,0.24296630918979645,0.12136229127645493,0.5019209980964661,0.6991430521011353,0.7657395005226135,0.06228286400437355,0.8694972395896912,0.529868483543396,0.14374883472919464,0.5655726790428162,0.9710148572921753,0.7086994051933289,0.26950278878211975,0.18546800315380096,0.7494746446609497,0.6745758056640625,0.8974480628967285,0.22109773755073547,0.29640501737594604,0.9312993884086609,0.48151835799217224,0.20364779233932495,0.5137075781822205,0.8142296075820923,0.4125923216342926,0.6369545459747314,0.4707476496696472,0.7069343328475952,0.7757250666618347,0.793923020362854,0.29083630442619324,0.5599548816680908,0.5513266921043396,0.0680994838476181,0.9448691606521606,0.2549523115158081,0.26366129517555237,0.007741017732769251,0.3644638955593109,0.735800564289093,0.49207696318626404,0.4947082996368408,0.13974127173423767,0.7116292119026184,0.3053278625011444,0.7455345988273621,0.15982656180858612,0.8407825231552124,0.8107597231864929,0.6397244930267334,0.20193885266780853,0.5410351753234863,0.24746237695217133,0.759633481502533,0.5924524068832397,0.1913556456565857,0.8878622055053711,0.21828894317150116,0.5370641946792603,0.921027421951294,0.3152509927749634,0.5260769724845886,0.10948095470666885,0.769381046295166,0.38708189129829407,0.6729093790054321,0.5326945781707764,0.08443933725357056,0.851615309715271,0.303920716047287,0.7509329915046692,0.2157307267189026,0.9823216795921326,0.14603319764137268,0.5190148949623108,0.6534399390220642,0.1571049988269806,0.2511993944644928,0.31516343355178833,0.3099363148212433,0.49651646614074707,0.028141429647803307,0.3837031424045563,0.7789331078529358,0.5551784634590149,0.9165868163108826,0.8165491223335266,0.7005488872528076,0.27393078804016113,0.5661832094192505,0.26052749156951904,0.8264120817184448,0.552007794380188,0.4954780638217926,0.10254551470279694,0.36370396614074707,0.522747278213501,0.15949441492557526,0.5037847757339478,0.170786514878273,0.37892279028892517,0.31918826699256897,0.6038064956665039,0.7428596019744873,0.5133064985275269,0.904212474822998,0.15597926080226898,0.4965229630470276,0.4348858594894409,0.5216861963272095,0.9607435464859009,0.5577268600463867,0.4039606750011444,0.6094983816146851,0.03994421660900116,0.2596415877342224,0.8464871644973755,0.10609584301710129,0.2201891541481018,0.6604730486869812,0.9232490658760071,0.7114734053611755,0.5511270761489868,0.31685367226600647,0.9312527775764465,0.7752476930618286,0.7248374819755554,0.4035453498363495,0.15477442741394043,0.9627143144607544,0.801530659198761,0.22133758664131165,0.1152489110827446,0.6687166094779968,0.8993790745735168,0.6835936307907104,0.520890474319458,0.610673725605011,0.18097028136253357,0.0026943678967654705,0.06885673105716705,0.05990171432495117,0.1469840407371521,0.0387563593685627,0.23372231423854828,0.2724814713001251,0.6575872898101807,0.672781229019165,0.09753870218992233,0.5501553416252136,0.6587660908699036,0.5173327922821045,0.26071101427078247,0.7351813316345215,0.11765995621681213,0.1635138988494873,0.798133134841919,0.6327278017997742,0.9769741892814636,0.9392176270484924,0.41810014843940735,0.2390880435705185,0.9773911833763123,0.9496532678604126,0.7384740114212036,0.9085783958435059,0.048773907124996185,0.4452952742576599,0.5810901522636414,0.7601344585418701,0.4288226068019867,0.7995241284370422,0.22138655185699463,0.04641338065266609,0.9054192900657654,0.4390086531639099,0.04914749786257744,0.007515876088291407,0.8822165131568909,0.6434972286224365,0.29005932807922363,0.04718325287103653,0.8577727675437927,0.36748671531677246,0.1379048079252243,0.43694862723350525,0.8769694566726685,0.5997834801673889,0.758116602897644,0.3613312542438507,0.2800123691558838,0.10623383522033691,0.7725920677185059,0.6612462997436523,0.6712265014648438,0.050187259912490845,0.6861425638198853,0.27683931589126587,0.01949859969317913,0.22795693576335907,0.06298382580280304,0.11592653393745422,0.6962215900421143,0.8101194500923157,0.7922091484069824,0.1262306421995163,0.35342198610305786,0.612657368183136,0.6674244403839111,0.5079520344734192,0.738823652267456,0.9580705165863037,0.2299703061580658,0.0592547245323658,0.16669324040412903,0.6505205631256104,0.26308712363243103,0.8056837320327759,0.6022936105728149,0.708324134349823,0.22600281238555908,0.3560935854911804,0.1799110323190689,0.7392680048942566,0.7345119714736938,0.8720329999923706,0.23879241943359375,0.8442428708076477,0.9195296168327332,0.7223026156425476,0.34143146872520447,0.483901709318161,0.4118874967098236,0.5056338310241699,0.31278109550476074,0.5758858919143677,0.3340526819229126,0.4841313660144806,0.22365857660770416,0.9687522053718567,0.634833037853241,0.9125456213951111,0.7555696368217468,0.7254105806350708,0.7152060866355896,0.86720871925354,0.8671091794967651,0.6534571647644043,0.750629723072052,0.023670706897974014,0.1163305938243866,0.8143720626831055,0.4379160702228546,0.7772460579872131,0.5565057396888733,0.5822914838790894,0.700732946395874,0.23801454901695251,0.24958495795726776,0.23581905663013458,0.697013795375824,0.4795592129230499,0.4071674942970276,0.7386183142662048,0.41745907068252563,0.15462906658649445,0.09281947463750839,0.5712546110153198,0.6288399696350098,0.11115621030330658,0.5948275327682495,0.30549389123916626,0.5563688278198242,0.8466139435768127,0.9795102477073669,0.3444942533969879,0.08864196389913559,0.5861665606498718,0.7126823663711548,0.7477136254310608,0.17533548176288605,0.9338502287864685,0.2623748481273651,0.9033315777778625,0.26033905148506165,0.7954376935958862,0.9185497760772705,0.17219136655330658,0.38480475544929504,0.2718752324581146,0.5578173398971558,0.9429159164428711,0.4269465506076813,0.5579017996788025,0.31084370613098145,0.27347296476364136,0.8178269863128662,0.9373210668563843,0.48772111535072327,0.5443230271339417,0.879025399684906,0.10478901118040085,0.13269954919815063,0.058296144008636475,0.4465975761413574,0.9842997789382935,0.5586506128311157,0.5783538818359375,0.1265234351158142,0.6329737305641174,0.9363548159599304,0.8982908725738525,0.7454536557197571,0.7245215773582458,0.4564444124698639,0.02569553814828396,0.22707626223564148,0.8635503053665161,0.8337329030036926,0.5773071050643921,0.20393802225589752,0.5910425186157227,0.05303550884127617,0.8165777325630188,0.9166348576545715,0.44005128741264343,0.9175721406936646,0.28481170535087585,0.7264965772628784,0.6510136127471924,0.7066017985343933,0.003154236590489745,0.6837859153747559,0.5298934578895569,0.872012197971344,0.5379242300987244,0.9740254282951355,0.001496134209446609,0.6492067575454712,0.15927709639072418,0.7214334607124329,0.432436466217041,0.9831863641738892,0.34950584173202515,0.3949694335460663,0.5280219912528992,0.4853884279727936,0.5899710059165955,0.8794344663619995,0.8551372289657593,0.7164516448974609,0.17081405222415924,0.5855615139007568,0.7313719391822815,0.4658927321434021,0.011747417971491814,0.10742157697677612,0.699939489364624,0.10105060786008835,0.42381733655929565,0.3152945935726166,0.42721444368362427],"feedback":{"value":1,"generate":false},"constrain":0}}]],"modules":{},"settings":{"name":"circlepacking","clock":"1","width":"500","height":"500"}}, cb); };