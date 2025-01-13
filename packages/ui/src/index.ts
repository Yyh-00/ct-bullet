import { App } from 'vue';
import Button from './button';
import VirtualTransfer from './virtual-transfer';

const components = [Button, VirtualTransfer];

const install = (app: App): void => {
  components.map((component: any) => {
    if (!component.name) {
      component.install(app);
      return;
    }
    app.component(component.name, component);
  });
};

export { Button, VirtualTransfer };
export * from '@ct-bullet/shared';
export * from '@ct-bullet/hooks';
export default { install };
