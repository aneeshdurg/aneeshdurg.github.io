function usingMathRandom(len) {
  const arr = new Float32Array(len);
  for (let i = 0; i < len; i++) {
    arr[i] = Math.random();
  }
  return arr;
}
