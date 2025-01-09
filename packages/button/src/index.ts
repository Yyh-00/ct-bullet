import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import Button from './button.vue';

const app = createApp(Button);
app.use(ElementPlus);
export { Button };
