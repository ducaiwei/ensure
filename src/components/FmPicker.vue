<template>
  <picker
    @change="handlePickerChange"
    @columnchange="handleColumnchange"
    @cancel="handleCancel"
    :value="_value"
    :range="range"
    :range-key="rangeKey"
    :disabled="disabled"
    :class="className"
    :style="elementStyle"
  >
    <slot></slot>
  </picker>
</template>

<script>
export default {
  name: 'FmPicker',
  model: {
    value: 'value',
    event: 'change'
  },
  props: {
    mode: {
      type: String,
      validator (value) {
        return [
          'selector',
          'multiSelector',
          'time',
          'date',
          'region'
        ].indexOf(value) > -1
      },
      default: 'selector'
    },
    range: Array,
    rangeKey: String,
    value: [ String, Object ],
    disabled: Boolean,
    className: String,
    elementStyle: String
  },
  computed: {
    _value: {
      get () {
        const range = this.range
        const value = this.value
        const currentIndex = range.map((element, index) => {
          if (element === value) {
            return index || 0
          }
        })
        return currentIndex
      },
      set (val) {
        const range = this.range
        this.$emit('change', range[val])
      }
    }
  },
  methods: {
    handlePickerChange (evt) {
      const val = evt.mp.detail.value
      this._value = val
    },
    handleColumnchange (evt) {
      this.$emit('columnchange', evt.mp.detail)
    },
    handleCancel (evt) {
      this.$emit('cancel')
    }
  },
  created () {}
}
</script>

<style lang="less">
</style>
