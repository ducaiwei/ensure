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
    pages: ['^pages/order/main'],
    window: {
      backgroundTextStyle: 'dark',
      navigationBarBackgroundColor: '#ffffff',
      navigationBarTitleText: '联众保险',
      navigationBarTextStyle: 'black',
      navigationStyle: 'default',
      backgroundColor: '#ffffff',
      enablePullDownRefresh: false
    },
    // tabBar: {
    //   color: '#878d99',
    //   selectedColor: '#409EFF',
    //   // backgroundColor: '#f5f7fa',
    //   position: 'bottom',
    //   borderStyle: 'black',
    //   list: [
    //     {
    //       pagePath: 'pages/order/main',
    //       text: '点单',
    //       selectedIconPath: 'static/image/shop-selected.png',
    //       iconPath: 'static/image/shop.png'
    //     },
    //     // {
    //     //   pagePath: 'pages/cart/main',
    //     //   text: '发现',
    //     //   selectedIconPath: 'static/image/compass-selected.png',
    //     //   iconPath: 'static/image/compass.png'
    //     // },
    //     {
    //       pagePath: 'pages/trade/main',
    //       text: '订单',
    //       selectedIconPath: 'static/image/trade-selected.png',
    //       iconPath: 'static/image/trade.png'
    //     },
    //     {
    //       pagePath: 'pages/cart/main',
    //       text: '购物车',
    //       selectedIconPath: 'static/image/cart-selected.png',
    //       iconPath: 'static/image/cart.png'
    //     },
    //     {
    //       pagePath: 'pages/account/main',
    //       text: '我的',
    //       selectedIconPath: 'static/image/account-selected.png',
    //       iconPath: 'static/image/account.png'
    //     }
    //   ]
    // },
    debug: true
  }
}
