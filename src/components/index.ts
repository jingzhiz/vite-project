import type { App, Component } from 'vue'
import SvgIcon from './SvgIcon'
import Keyboard from './Keyboard'

const components: { [name: string]: Component } = {
  SvgIcon,
  Keyboard
}

export default {
  install(app: App) {
    Object.keys(components).forEach((key: string) => {
      app.component(key, components[key])
    })
  }
}
