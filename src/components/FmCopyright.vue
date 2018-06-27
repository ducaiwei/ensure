<template>
  <view class="fm-copyright" :class="className" :style="elementStyle">搭搭宝应用提供技术支持</view>
</template>

<script>
export default {
  name: 'FmCopyright',
  props: {
    className: String,
    elementStyle: String
  }
}
</script>

<style lang="less">
@import "../asset/style/_variable.less";

.fm-copyright {
  display: block;
  text-align: center;
  font-size: 11px;
  font-weight: @--font-weight-light;
  letter-spacing: 1px;
  color: @--color-text-placeholder;
  padding-top: 16px;
  padding-bottom: 16px;
}
</style>
