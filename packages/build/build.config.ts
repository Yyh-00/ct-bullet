import { UserConfig } from 'vite';
import {
  generateConfig as baseGenerateConfig,
  type GenerateConfigOptions,
} from './src';
import { absCwd } from './src/utils';

export function generateConfig(
  customOptions?: GenerateConfigOptions,
  viteConfig?: UserConfig,
) {
  return baseGenerateConfig({
    dts: absCwd('../../tsconfig.src.json'),
    ...customOptions,
  }, viteConfig);
}
