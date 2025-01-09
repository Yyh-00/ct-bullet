import { defineConfig } from 'vite';
import { generateConfig } from '../build/build.config';

export default defineConfig(({ mode }: any) => generateConfig({ mode, pluginVue: true }) as any);
