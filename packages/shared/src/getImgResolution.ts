export const getImgResolution = (file: File) => {
  return new Promise((resolve) => {
    const _URL = window.URL || window.webkitURL;
    const image = new Image();
    const obj = {
      width: 0,
      height: 0
    };

    image.src = _URL.createObjectURL(file);
    image.onload = function () {
      obj.width = image.width;
      obj.height = image.height;
      resolve(obj);
    };
  });
};
