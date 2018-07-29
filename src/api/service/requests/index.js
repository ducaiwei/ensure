import fly from '@/api/fly'

export function getMock (query) {
  return fly.post('/mock', query)
}
export function getToken (query) {
  return fly.post('/user/getToken', query)
}
export function getNearHotels (query) {
  return fly.post('/hotel/findNearHotels', query)
}
export function getHallsPrice (query) {
  return fly.post('/hotel/hall/queryHotelHallsPrice', query)
}
export function getHotelDetail (query) {
  return fly.post('/hotel/findHotelById', query)
}
export function queryContent (query) {
  return fly.post('/order/queryInsuranceContent', query)
}
export function queryExtraInsures (query) {
  return fly.post('/order/queryAllExtraInsurances', query)
}
export function queryOrderAmount (query) {
  return fly.post('/order/queryOrderPayAmount', query)
}
export function createOrder (query) {
  return fly.post('/order/createOrder', query)
}
export function deleteOrder (query) {
  return fly.post('/order/deleteOrder', query)
}
export function queryOrders (query) {
  return fly.post('/order/queryOrders', query)
}
export function queryOrderDetail (query) {
  return fly.post('/order/queryOrderById', query)
}
