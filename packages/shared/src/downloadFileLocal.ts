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
