<template>
  <label
    @click="handleClick"
    @longpress="handleLongPress"
    class="iconfont fm-icon"
    :class="[
      icon,
      className,
      mode ? 'fm-icon--' + mode : '',
      active ? 'active' : ''
    ]"
    :style="[
      { 'font-size': size } +
      { 'color': color } +
      { 'width': iconWidth } +
      { 'height': iconHeight } +
      { 'background-color': backgroundColor } +
      { 'border-radius': borderRadius } +
      elementStyle
    ]"
  >
  </label>
</template>

<script>
/**
 * @author huangzhuo
 *
 * @module fm-icon
 * @desc iconfont字体图标组件
 *
 * @param { string } icon = iconClass类
 * @param { string } mode = dark, 模式，可选值dark/light, 无默认值
 * @param { string } size = 16px, 字体图标字号
 * @param { string } lenght = 16px，边长，宽度和高度的便捷属性
 * @param { string } width = 24px, 宽度
 * @param { string } height = 24px, 高度
 * @param { string } color = #000000, 字体图标颜色。
 * @param { string } background-color = #FFFFFF, 字体图标背景颜色
 * @param { boolean } active, 选中样式
 * @param { string } border-radius, 边角弧度
 *
 * @example <fm-icon icon="icon-xiaochengxu" mode="light" :class-name="className" size="80px"></fm-icon>
 */

export default {
  name: 'FmIcon',
  props: {
    icon: String,
    mode: {
      type: String,
      validator (value) {
        return [
          'dark',
          'light'
        ].indexOf(value) > -1
      }
    },
    size: String,
    width: String,
    height: String,
    color: String,
    backgroundColor: String,
    active: Boolean,
    borderRadius: String,
    className: String,
    elementStyle: String
  },
  computed: {
    iconWidth () {
      const width = this.width || this.size
      return width
    },
    iconHeight () {
      const height = this.height || this.size
      return height
    }
  },
  methods: {
    handleClick (evt) {
      this.$emit('click', evt)
    },
    handleLongPress (evt) {
      this.$emit('longpress', evt)
    }
  }
}
</script>

<style lang="less">
@import "../asset/style/_variable.less";
@import "./FmIcon.less";

@fm-icon--dark: .26;
@fm-icon--dark-active: .54;

@fm-icon--light: .3;
@fm-icon--light-active: 1;

.fm-icon {
  position: relative;
  flex: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  width: 1em;
  line-height: 1;
  letter-spacing: normal;
  color: inherit;
  font-weight: @--font-weight-base;
}

.fm-icon--dark {
  opacity: @fm-icon--dark;

  &.active {
    opacity: @fm-icon--dark-active;
  }
}

.fm-icon--light {
  opacity: @fm-icon--light;

  &.active {
    opacity: @fm-icon--light-active;
  }
}
</style>
