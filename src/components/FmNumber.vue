<template>
  <label class="fm-number" :class="className" :style="elementStyle">{{ _value }}</label>
</template>

<script>
export default {
  name: 'FmNumber',
  props: {
    mode: {
      type: String,
      default: 'number',
      validator (value) {
        return [
          'number',
          'timestamp'
        ].indexOf(value) > -1
      }
    },
    value: [Number, String],
    className: String,
    elementStyle: String
  },
  computed: {
    _value () {
      const mode = this.mode
      const value = this.value
      let val
      switch (mode) {
        case 'number':
          val = value
          break
        case 'timestamp':
          val = this.$moment.unix(value).format('YYYY-MM-DD HH:mm:ss')
          break
      }
      return val
    }
  }
}
</script>

<style lang="less">
@import "../asset/style/_variable.less";

.fm-number {
  font-family: @--font-family-number;
  letter-spacing: 0;
}
</style>
