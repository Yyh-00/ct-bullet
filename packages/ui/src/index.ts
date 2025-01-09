import { App } from 'vue';
import Button from '@ct-bullet-ui/button';

const components = [Button];

const install = (app: App): void => {
  components.map((component: any) => {
    if (!component.name) {
      component.install(app);
      return;
    }
    app.component(component.name, component);
  });
};

export { Button };
export * from '@ct-bullet-ui/shared';
export default { install };
