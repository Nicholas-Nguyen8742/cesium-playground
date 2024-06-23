import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import checker from 'vite-plugin-checker';
import * as path from 'path';
import cesium from 'vite-plugin-cesium';

// const staticCopyPlugin = async () => {
//   const { viteStaticCopy } = await import('vite-plugin-static-copy');
//   return viteStaticCopy({
//     targets: [
//       {
//         src: 'node_modules/cesium/Build/Cesium/Assets',
//         dest: 'cesium'
//       },
//       {
//         src: 'node_modules/cesium/Build/Cesium/Widgets',
//         dest: 'cesium'
//       },
//       {
//         src: 'node_modules/cesium/Build/Cesium/ThirdParty',
//         dest: 'cesium'
//       },
//       {
//         src: 'node_modules/cesium/Build/Cesium/Workers',
//         dest: 'cesium/Workers'
//       }
//     ]
//   });
// };

export default defineConfig({
  plugins: [
    react(),
    checker({
      typescript: true,
    }),
    cesium()
  ],
  esbuild: {
    jsxInject: 'import React from \'react\'',
  },
  build: {
    target: 'ESNext',
    emptyOutDir: true,
    minify: 'esbuild',
    rollupOptions: {
      output: {
        chunkFileNames: 'js/[name].[hash].js',
        entryFileNames: 'js/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash].[ext]',
        manualChunks: {
          reactVendor: ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      cesium: path.resolve(__dirname, 'node_modules/cesium/Build/Cesium')
    },
  },
  server: {
    port: 3030,
  },
});
