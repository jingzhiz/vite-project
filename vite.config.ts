import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { viteMockServe } from 'vite-plugin-mock'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    viteMockServe({
      mockPath: './mock'
    }),
    createSvgIconsPlugin({
      iconDirs: [resolve(process.cwd(), 'src/assets/icons')],
      symbolId: 'icon-[dir]-[name]'
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      images: resolve(__dirname, './src/assets/images'),
      style: resolve(__dirname, './src/assets/styles'),
      components: resolve(__dirname, './src/components'),
      store: resolve(__dirname, './src/store'),
      router: resolve(__dirname, './src/router')
    }
  },
  server: {
    proxy: {
      '/mock': {
        target: 'http://127.0.0.1:5173/',
        rewrite: (path) => path.replace(/^\/mock/, '')
      },
      '/api': {
        target: 'http://127.0.0.1:3000/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "./src/assets/styles/scss/variable.scss";'
      }
    }
  }
})
