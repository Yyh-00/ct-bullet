import DefaultTheme from 'vitepress/theme';
import type { EnhanceAppContext } from 'vitepress';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import BulUi from '@ct-bullet-ui/ui';
import { Demo } from '../components';
import '../style/index.scss';

export default {
  extends: DefaultTheme,
  enhanceApp({ app }: EnhanceAppContext) {
    app.component('Demo', Demo);
    app.use(ElementPlus).use(BulUi);
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component);
    }
  }
};
