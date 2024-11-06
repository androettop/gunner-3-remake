import { ImageSource } from "excalibur";

export const greenToRed = async (image: string) => {
  const imageSource = new ImageSource(image);

  await imageSource.load();

  const soldierBaseColors = [
    { r: 0, g: 255, b: 0 }, // #00FF00
    { r: 21, g: 216, b: 0 }, // #15D800
    { r: 0, g: 180, b: 0 }, // #00B400
  ];

  const canvas = document.createElement("canvas");
  canvas.width = imageSource.width;
  canvas.height = imageSource.height;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("Canvas 2D context not supported");
  }
  ctx.drawImage(imageSource.image, 0, 0);

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    if (
      soldierBaseColors.some(
        (color) => color.r === r && color.g === g && color.b === b,
      )
    ) {
      // swap green with red
      data[i] = g;
      data[i + 1] = r;
      data[i + 2] = b;
    }
  }

  // Poner los datos modificados de vuelta en el canvas
  ctx.putImageData(imageData, 0, 0);

  // Crear una nueva fuente de imagen a partir del canvas
  return new ImageSource(canvas.toDataURL());
};
