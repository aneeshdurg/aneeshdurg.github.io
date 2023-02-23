function benchmark(f, x) {
  const start = performance.now();
  f(x);
  const end = performance.now();
  return end - start;
}
