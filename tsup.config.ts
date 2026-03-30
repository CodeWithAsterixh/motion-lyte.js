import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    index: 'animations/index.js',
    react: 'animations/react/index.js',
  },
  format: ['cjs', 'esm'],
  dts: true,
  clean: true,
  minify: true,
  sourcemap: true,
  external: ['react'],
  outDir: 'dist',
});
