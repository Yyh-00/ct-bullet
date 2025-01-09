import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'src/index.scss'),
        button: path.resolve(__dirname, 'src/button/button.scss')
      },
      output: {
        assetFileNames: (assetInfo) => {
          if (!assetInfo.names?.includes('main.css')) {
            return 'css/[name].css';
          }
          return '[name][extname]';
        }
      }
    }
  }
});
