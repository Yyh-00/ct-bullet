import { defineConfig } from 'vite';
import { generateConfig } from '../build/build.config';

export default defineConfig(
  ({ mode }: any) =>
    generateConfig(
      { mode, pluginVue: true },
      {
        build: {
          rollupOptions: {
            // @ts-ignore
            output: {
              assetFileNames: (assetInfo) => {
                if (assetInfo.name === 'ct-bullet.css') {
                  return 'index.css';
                }
                return assetInfo.name;
              }
            }
          }
        }
      }
    ) as any
);
