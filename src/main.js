import Vue from 'vue'
import App from './App'
import store from './store'
import utils from './utils'
import api from './api'

Vue.use(store)
Vue.use(utils)
Vue.use(api)

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()

export default {
  // 这个字段走 app.json
  config: {
    // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
    pages: ['^pages/hotel/main'],
    window: {
      backgroundTextStyle: 'dark',
      navigationBarBackgroundColor: '#ffffff',
      navigationBarTitleText: '联众保险',
      navigationBarTextStyle: 'black',
      navigationStyle: 'default',
      backgroundColor: '#ffffff',
      enablePullDownRefresh: false
    },
    debug: true
  }
}
