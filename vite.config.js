/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable global-require */

import vue from '@vitejs/plugin-vue';
import svgLoader from 'vite-svg-loader';
import { defineConfig } from 'vite';

const path = require('path');

export default defineConfig({

  envPrefix: 'PUBLIC_',

  plugins: [
    vue(),
    svgLoader({
      svgoConfig: {
        multipass: true,
        plugins: [
          'cleanupAttrs',
          'inlineStyles',
          'removeComments',
          'removeUselessDefs',
          'convertPathData',
          'convertTransform',
          'prefixIds',
          'cleanupIDs',
          'removeUselessStrokeAndFill',
          'cleanupNumericValues',
          'collapseGroups',
          'removeDimensions',
          'removeScriptElement',
          'reusePaths',
        ],
      },
    }),
  ],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@utils': path.resolve(__dirname, './src/components/utils'),
      '@forms': path.resolve(__dirname, './src/components/forms'),
      '@images': path.resolve(__dirname, './src/assets/images'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
    },
  },

  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
        @use "sass:math";
        @import "@/assets/styles/_mixin.scss";
        `,
      },
    },
    postcss: {
      plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
      ],
    },
  },

});
