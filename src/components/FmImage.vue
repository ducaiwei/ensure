<template>
  <img
    @click="handleClick"
    @longpress="handleLongPress"
    @error="handleError"
    @load="handleLoad"
    class="fm-image"
    :mode="mode"
    :lazy-load="lazyLoad"
    :style="[
      { 'width': imgWidth } +
      { 'height': imgHeight } +
      { 'border-radius': borderRadius } +
      elementStyle
    ]"
    :src="src"
    :class="[
      border ? 'fm-image--border-' + border : '',
      { 'fm-image--inline': inline },
      className
    ]"
  >
</template>

<script>
/**
 * @author huangzhuo
 *
 * @module fm-image
 * @desc 图片组件
 *
 * @param { string } mode = 同小程序image组件的mode，默认值为widthFix
 * @param { string } src = 素材
 * @param { boolean } lazyLoad = 图片懒加载。只针对page与scroll-view下的image有效
 * @param { boolean } inline = 行内样式
 * @param { string } size = 宽度和高度
 * @param { string } width = 宽度，单独设置比size优先级高
 * @param { string } height = 高度，单独设置比size优先级高
 * @param { string } borderRadius = 边框角度
 * @param { string } border = 边框类型，可选值dark,light
 */
export default {
  name: 'FmImage',
  props: {
    mode: {
      type: String,
      default: 'aspectFill'
    },
    src: String,
    lazyLoad: Boolean,
    inline: Boolean,
    size: String,
    width: String,
    height: String,
    borderRadius: String,
    border: {
      type: String,
      validator (value) {
        return [
          'light',
          'dark'
        ].indexOf(value) > -1
      }
    },
    className: String,
    elementStyle: String
  },
  computed: {
    imgWidth () {
      const width = this.width || this.size
      return width
    },
    imgHeight () {
      const height = this.height || this.size
      return height
    }
  },
  methods: {
    handleClick (evt) {
      this.$emit('click', evt)
    },
    handleError (evt) {
      this.$emit('error', evt)
    },
    handleLoad (evt) {
      this.$emit('load', evt)
    },
    handleLongPress (evt) {
      this.$emit('longpress', evt)
    }
  }
}
</script>

<style lang="less">
@import "../asset/style/_variable.less";

.fm-image {
  position: relative;
  display: flex;
  flex: none;
  width: 100%;
  height: auto;
  vertical-align: middle;
  background-color: @--background-color-base;
}

.fm-image--inline {
  display: inline-flex;
}

.fm-image--border-dark {
  border: 1px solid @--border-color-base;
  // &::before {
  //   .setBorderLine(@--border-color-base);
  //   border-radius: inherit;
  // }
}

.fm-image--border-light {
  border: 1px solid @--color-white;
  // &::before {
  //   .setBorderLine(@--color-white);
  //   border-radius: inherit;
  // }
}
</style>
