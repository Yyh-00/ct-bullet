import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import App from './App.vue';
import BulUi from 'ct-bullet-ui';

const app = createApp(App);

app.use(ElementPlus).use(BulUi).mount('#app');
