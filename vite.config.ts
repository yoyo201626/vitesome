import { defineConfig } from 'vite';
import UnoCSS from 'unocss/vite'
import { resolve } from 'pathe';
import vue from '@vitejs/plugin-vue';
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
import Unfonts from 'unplugin-fonts/vite'
import svgLoader from 'vite-svg-loader';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 4000,
  },
  resolve: {
    alias: {
      '/@': resolve(__dirname, './src'),
    },
  },
  plugins: [
    vue(),
    // https://github.com/jpkleemans/vite-svg-loader
    svgLoader(),
    // https://github.com/antfu/vite-plugin-components
    Components({
      extensions: ['vue'],
      dts: 'src/components.d.ts',
      resolvers: [
        AntDesignVueResolver({
          importStyle: false, // css in js
        }),
      ],
    }),
    // https://github.com/stafyniaksacha/vite-plugin-fonts#readme
    Unfonts({
      google: {
        families: ['Open Sans', 'Montserrat', 'Fira Sans'],
      },
    }),

    UnoCSS(),

    // https://github.com/intlify/vite-plugin-vue-i18n
    VueI18nPlugin({
      include: [resolve(__dirname, './locales/**')],
    }),
  ],

  optimizeDeps: {
    include: [
      'vue',
      'vue-router',
      '@vueuse/core',
    ],
    exclude: [
      'vue-demi',
    ],
  },
});
