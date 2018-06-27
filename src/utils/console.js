import wxp from 'minapp-api-promise'

export function log (val) {
  wxp.showModal({
    title: 'log',
    content: JSON.stringify(val)
  }).then(res => {
    console.log(res)
  })
}
