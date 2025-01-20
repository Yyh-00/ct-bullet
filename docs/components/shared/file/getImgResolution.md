# getImgResolution

获取图片分辨率

::: details 查看源码

```js
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

```

:::

## 入参属性

| 属性名 |   说明   | 必填 | 类型 | 默认值 |
| ------ | :------: | :--: | :--: | :----: |
| file   | 图片文件 |  是  | File |   —    |

## 返参属性

| 属性名 |   说明   | 必填 |  类型  | 默认值 |
| ------ | :------: | :--: | :----: | :----: |
| width  | 图片长度 |  —   | number |   0    |
| height | 图片高度 |  —   | number |   0    |
