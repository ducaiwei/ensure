<template>
  <radio-group @change="handleChange" :disabled="disabled" class="fm-radio-group">
    <fm-radio
      v-if="options"
      v-for="item in _options"
      :key="item.value"
      :value="item.value"
      :label="item.label || item.value"
      :disabled="disabled || item.disabled"
      :checked="item.checked"
      :color="color"
    >
    </fm-radio>
  </radio-group>
</template>

<script>
/**
 * @author huangzhuo
 *
 * @module fm-radio-group
 * @desc 单选组组件
 *
 *
 */
import FmRadio from '@/components/FmRadio'
export default {
  name: 'FmRadioGroup',
  components: { FmRadio },
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: [String, Number, Boolean],
    options: Array,
    disabled: Boolean
  },
  computed: {
    _value: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('change', val)
      }
    },
    _options () {
      const options = this.options
      const _value = this._value
      options.map(element => {
        if (element.value === _value) {
          element.checked = true
        } else {
          element.checked = false
        }
        return options
      })
      return options
    }
  },
  data () {
    return {}
  },
  methods: {
    handleChange (evt) {
      const value = evt.mp.detail.value
      const type = typeof (this.value)
      switch (type) {
        case 'number':
          this._value = parseInt(value)
          break
        case 'string':
          this._value = value
          break
        case 'default':
          this._value = value
          break
      }
    }
  },
  created () {}
}
</script>

<style lang="less">
@import "../asset/style/_variable.less";
.fm-radio-group {
  position: relative;

  // &::before {
  //   .setTopLine();
  // }

  // &::after {
  //   .setBottomLine();
  // }
}
</style>
