import { createApp } from 'vue'
import { setupRouter } from '@/router'
import { setupStore } from '@/store'
import App from './App.vue'

import '@/router/permission'

import '@/assets/styles/index.css'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import globalComponent from './components'

function bootStrap(elMark: string): void {
  const app = createApp(App)

  setupRouter(app)

  setupStore(app)

  app.use(ElementPlus)
  app.use(globalComponent)

  app.mount(elMark)
}

bootStrap('#app')
