// 微信小程序所有API promise化，支持await、支持请求列队 https://github.com/bigmeow/minapp-api-promise
import wxp from 'minapp-api-promise'
// moment.js https://github.com/moment/moment
import moment from 'moment'
// qrcode生成 https://github.com/alsey/wxbarcode
import wxbarcode from 'wxbarcode'
// 工具函数
import * as money from './money'
import * as random from './random'
import * as conSole from './console'
import * as Date from './date'

console.log(Date.dateFormat)

Date.dateFormat()

const plugin = []
const install = Vue => {
  if (install.installed) return
  plugin.map(element => {
    Vue.use(element)
  })
  Object.defineProperty(Vue.prototype, '$wxp', {
    value: wxp
  })
  Object.defineProperty(Vue.prototype, '$moment', {
    value: moment
  })
  Object.defineProperty(Vue.prototype, '$wxbarcode', {
    value: wxbarcode
  })
  Object.defineProperty(Vue.prototype, '$money', {
    value: money
  })
  Object.defineProperty(Vue.prototype, '$random', {
    value: random
  })
  Object.defineProperty(Vue.prototype, '$console', {
    value: conSole
  })
}

export default {
  install
}
