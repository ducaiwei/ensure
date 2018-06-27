export function cny (yuan) {
  const value = parseFloat(yuan || 0).toLocaleString('zh', {
    style: 'currency',
    currency: 'CNY',
    minimumFractionDigits: 2
  })
  return value
}

export function y2f (yuan) {
  const fen = parseFloat(yuan || 0) * 100
  return fen
}

export function f2y (fen, digits) {
  const yuan = parseInt(fen || 0) / 100
  // const value = yuan.toLocaleString('zh', {
  //   style: 'currency',
  //   currency: 'CNY',
  //   minimumFractionDigits: 2
  // })
  const value = yuan.toFixed(digits || 2)
  return value
}
