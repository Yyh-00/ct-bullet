import { App } from 'vue';
import BulButton from './button';
import BulVirtualTransfer from './virtual-transfer';

const components = [BulButton, BulVirtualTransfer];

const install = (app: App): void => {
  components.map((component: any) => {
    if (!component.name) {
      component.install(app);
      return;
    }
    app.component(component.name, component);
  });
};

export { BulButton, BulVirtualTransfer };
export * from '@ct-bullet/shared';
export * from '@ct-bullet/hooks';
export default { install };
