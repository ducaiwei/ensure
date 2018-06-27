import wxp from 'minapp-api-promise'
import Fly from 'flyio/dist/npm/wx'

const fly = new Fly()

const timeout = 10 * 1000
const baseURL = 'https://www.easy-mock.com/mock/5975c598a1d30433d83bf345/fmwapp'
const parseJson = true
const headers = { 'Content-Type': 'application/json' }

fly.config = {
  timeout: timeout,
  baseURL: baseURL,
  parseJson: parseJson,
  headers: headers
}

fly.interceptors.request.use(request => {
  wxp.showNavigationBarLoading()
  console.log('request:', request)
  return request
})

fly.interceptors.response.use(
  (res, promise) => {
    let errorMsg = ''
    wxp.hideNavigationBarLoading()
    switch (res) {
      case 200:
        console.log('正常请求')
        break
      case 401:
        console.log('未登陆,拦截重定向登陆界面')
        break
      case 403:
        console.log('未授权接口,拦截')
        errorMsg =
          (res.data.error &&
            (res.data.error.details || res.data.error.message)) ||
          '无权请联系管理员'
        throw new Error(errorMsg)
      case 500:
      case 502:
        errorMsg =
          (res.data.error &&
            (res.data.error.details || res.data.error.message)) ||
          '服务器出错'
        throw new Error(errorMsg)
      case 503:
        errorMsg = '哦～服务器宕机了'
        throw new Error(errorMsg)
    }
    return promise.resolve(res.data)
  },
  (err, promise) => {
    wxp.hideNavigationBarLoading()
    let errorMsg = ''
    switch (err.status) {
      case 0:
        errorMsg = '网络错误'
        break
      case 1:
        errorMsg = '请求超时'
        break
    }
    wxp.showToast({
      title: errorMsg,
      icon: 'none',
      duration: 3000
    })
    return promise.resolve()
  }
)

export default fly
