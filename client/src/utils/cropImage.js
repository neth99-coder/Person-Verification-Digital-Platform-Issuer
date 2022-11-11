const getCroppedImg = (sourceImage, crop) => {
  const canvas = document.createElement("canvas");
  canvas.width = crop.width;
  canvas.height = crop.height;
  const ctx = canvas.getContext("2d");
  const image = new Image();
  image.src = sourceImage;
  ctx.drawImage(
    image,
    crop.x,
    crop.y,
    crop.width,
    crop.height,
    0,
    0,
    crop.width,
    crop.height
  );

  return new Promise((resolve, reject) => {
    canvas.toBlob((file) => {
      resolve([file, URL.createObjectURL(file)]);
    }, "image/png");
  });
};

export default getCroppedImg;
