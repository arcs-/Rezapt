/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable global-require */

import vue from '@vitejs/plugin-vue';
import svgLoader from 'vite-svg-loader';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

const path = require('path');

export default defineConfig({

  envPrefix: 'PUBLIC_',

  plugins: [

    vue(),

    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.png', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        name: 'Was sölli choche?',
        short_name: 'Ässe',
        description: 'Ässens Ideee für Schwizer',
        theme_color: '#fffbf6',
        background_color: '#fffbf6',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
    }),

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
