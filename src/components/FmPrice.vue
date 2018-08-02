<template>
  <label
    class="fm-price"
    :class="className"
    :style="[
      { fontSize: fontSize + 'px' } +
      { color: color } +
      elementStyle
    ]"
  >
    <label class="fm-price__label" :class="labelClass" :style="labelStyle">{{ label }}</label>
    <label  :style="{ fontSize: (fontSize - 6) + 'px' }" class="fm-price__currency">￥</label>
    <label class="fm-price__num">{{ _price }}</label>
  </label>
</template>

<script>
export default {
  name: 'FmPrice',
  model: {
    prop: 'price',
    event: 'change'
  },
  props: {
    price: {
      type: Number,
      default: 0
    },
    mode: {
      type: String,
      default: 'fen',
      validator (value) {
        return ['fen', 'yuan'].indexOf(value) > -1
      }
    },
    multiple: Boolean,
    fontSize: Number,
    color: String,
    currency: Boolean,
    className: String,
    elementStyle: String,
    label: String,
    labelClass: String,
    labelStyle: String
  },
  computed: {
    _price: {
      get () {
        console.log((this.price / 100).toFixed(2))
        return (this.price / 100).toFixed(2)
      },
      set (val) {
      }
    }
  },
  created () {
  }
}
</script>

<style lang="less">
@import "../asset/style/_variable.less";

.fm-price {
  display: inline-flex;
  font-family: @--font-family-number;
  box-sizing: border-box;
  align-items: flex-end;
  font-size: @--font-size-large;
  color: @--color-danger;
  font-weight: @--font-weight-blod;
  letter-spacing: 0;
}

.fm-price__label {
  box-sizing: inherit;
  line-height: 1.6;
  font-size: 11px;
  font-weight: @--font-weight-base;
  margin-right: 4px;
}

.fm-price__currency {
  box-sizing: inherit;
  line-height: 1.6;
}

.fm-price__num {
  box-sizing: inherit;
  line-height: 1.15;
}

.fm-price__multiple {
  font-size: 10px;
  color: @--color-text-secondary;
  font-weight: @--font-weight-base;
  margin-left: 4px;
  box-sizing: inherit;
  line-height: 1.6;
}
</style>
