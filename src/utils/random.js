import store from '@/store'

export function number (min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function pick (type) {
  const n = Math.floor(Math.random() * type.length + 1) - 1
  return type[n]
}

export function string (len) {
  len = len || 32
  const $chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-'
  const maxPos = $chars.length
  let pwd = ''
  while (len > 0) {
    pwd += $chars.charAt(Math.floor(Math.random() * maxPos))
    len--
  }
  return pwd
}

export function image () {
  const image = store.state.image
  const n = Math.floor(Math.random() * image.length + 1) - 1
  return image[n]
}
