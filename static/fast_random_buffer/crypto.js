function usingCryptoRandom(x) {
  const arr  = new Float32Array(x);
  for (let i = 0; i < x * 4; i += 65536) {
    const arr_u = new Uint32Array(arr.buffer.slice(i, i + 65536));
    crypto.getRandomValues(arr_u);
  }
  return arr;
}
