// api
import * as api from './service'

const plugin = []

const install = Vue => {
  if (install.installed) return
  plugin.map(element => {
    Vue.use(element)
  })
  Object.defineProperty(Vue.prototype, '$api', {
    value: api
  })
}

export default {
  install
}
