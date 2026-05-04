import * as THREE from "three";

export const textToTexture = (text = "Hello") => {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 1024;

  const ctx = canvas.getContext("2d");

  // background transparent (important for shirt)
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // simple Helvetica-like font
  ctx.font = "bold 100px Helvetica, Arial";
  ctx.fillStyle = "#000000";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  ctx.fillText(text, canvas.width / 2, canvas.height / 2);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;

  return texture;
};
