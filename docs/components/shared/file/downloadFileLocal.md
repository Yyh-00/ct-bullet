# useRefreshTable

本地下载文件（前端实现）

::: details 查看源码

```js
export const downloadFileLocal = (data: any, type: string = 'text/csv', name: string = '模板') => {
  const csvContent = data.map((row: any) => row.join(',')).join('\n');
  const csvWithBOM = '\uFEFF' + csvContent; // 添加 BOM 标记
  const blob = new Blob([csvWithBOM], { type: `${type};charset=utf-8` }); // 创建 Blob 对象
  const url = window.URL.createObjectURL(blob); // 创建 URL 并触发下载
  const link = document.createElement('a');

  link.href = url;
  link.setAttribute('download', name); // 设置下载的文件名
  document.body.appendChild(link);
  link.click();

  // 清理 URL 对象
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};

```

:::

## 示例

```html
<template>
  <el-button type="primary" @click="onClick">download</el-button>
</template>

<script setup lang="ts">
  import { downloadFileLocal } from 'ct-bullet';

  const onClick = () => {
    const data = [
      ['Name', '中文', 'City'],
      ['Alice', '25', 'New York']
    ];

    downloadFileLocal(data);
  };
</script>
```

## 入参属性

| 属性名 |      说明      | 必填 |     类型     |   默认值   |
| ------ | :------------: | :--: | :----------: | :--------: |
| data   |    文档内容    |  是  | Array< any > |     —      |
| type   | 文档的MIME类型 |  否  |    string    | `text/csv` |
| name   |    文档名称    |  否  |    string    |    模板    |
