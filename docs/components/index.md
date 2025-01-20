# 快速开始

本节将介绍如何在项目中使用 ct-bullet。
::: danger WARNING
由于当前组件都是基于Elenemt Plus封装，所以在使用本项目中必须提前安装好最新版 Elenemt Plus
:::

## 安装

```js
// 切换内部源
npm i ct-bullet;

// 如果只需用到其中的 hooks 或者 shared ，可只安装子包
npm i @ct-bullet/hooks;
npm i @ct-bullet/shared;
```

## 用法

### 完整引入

```js
// main.ts
import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import BulUI from 'ct-bullet';
import 'ct-bullet/dist/index.css';
import App from './App.vue';

const app = createApp(App);

app.use(ElementPlus).use(BulUI).mount('#app');
```

### 按需导入

#### 全局导入

```js
// main.ts
import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import { Button } from 'ct-bullet';
import 'ct-bullet/dist/index.css';
import App from './App.vue';

const app = createApp(App);

app.use(ElementPlus).use(Button).mount('#app');
```

#### 手动导入

```html
<template>
  <bul-button>我是 BulButton</bul-button>
</template>
<script>
  import { BulButton } from 'ct-bullet';
</script>
```
