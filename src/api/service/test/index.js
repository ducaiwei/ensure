import fly from '@/api/fly'

export function getMock (query) {
  return fly.post('/mock', query)
}
