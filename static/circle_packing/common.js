async function getImage(url) {
  const img = new Image();
  img.crossOrigin = 'anonymous';
  img.src = url;
  img.style.display = 'none';
  img.style.width = '100%';
  document.body.appendChild(img);
  await (new Promise(r => img.onload = r));

  const canvas = document.createElement('canvas');
  canvas.width = 1000;
  canvas.height = 1000;
  canvas.style.width = "100%";
  const ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height);
  return ctx;
}
