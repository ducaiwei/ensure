<template>
  <textarea
    @focus="handleFocus"
    @blur="handleBlur"
    @linechange="handleLineChange"
    @input="handleInput"
    @confirm="handleConfirm"
    :value="_value"
    :placeholder="placeholder"
    :placeholder-style="placeholderStyle"
    :placeholder-class="placeholderClass"
    :disabled="disabled"
    :maxlength="maxlength"
    :autoFocus="autoFocus"
    :focus="focus"
    :autoHeight="autoHeight"
    :fixed="fixed"
    :cursorSpacing="cursorSpacing"
    :cursor="cursor"
    :showConfirmBar="showConfirmBar"
    :selectionStart="selectionStart"
    :selectionEnd="selectionEnd"
    :adjustPosition="adjustPosition"
    :class="className"
    :style="elementStyle"
    class="fm-textarea"
  />
</template>

<script>
export default {
  name: 'FmTextarea',
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: String,
    placeholder: String,
    placeholderStyle: String,
    placeholderClass: {
      type: String,
      default: 'fm-textarea-placeholder'
    },
    disabled: Boolean,
    maxlength: {
      type: Number,
      default: 140
    },
    autoFocus: Boolean,
    focus: Boolean,
    autoHeight: Boolean,
    fixed: Boolean,
    cursorSpacing: {
      type: Number,
      default: 0
    },
    cursor: Number,
    showConfirmBar: Boolean,
    selectionStart: {
      type: Number,
      default: -1
    },
    selectionEnd: {
      type: Number,
      default: -1
    },
    adjustPosition: Boolean,
    className: String,
    elementStyle: String
  },
  computed: {
    _value: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('change', val)
      }
    }
  },
  methods: {
    handleFocus (val) {
      this.$emit('focus', val.mp)
    },
    handleBlur (val) {
      this._value = val.mp.detail.value
      this.$emit('blur', val.mp)
    },
    handleLinechange (val) {
      this.$emit('linechange', val.mp)
    },
    handleInput (val) {
      this.$emit('input', val.mp)
    },
    handleConfirm (val) {
      this._value = val.mp.detail.value
      this.$emit('confirm', val.mp)
    }
  }
}
</script>

<style lang="less">
@import "../asset/style/_variable.less";
.fm-textarea {
  position: relative;
  display: block;
  padding: 16px;
  height: 96px;
  width: 100%;
  color: @--color-text-primary;
  background-color: @--fill-base;
  font-size: inherit;
  letter-spacing: 0;
  box-sizing: border-box;
}

.fm-textarea-placeholder {
  color: @--color-text-placeholder;
  font-size: inherit;
}
</style>
