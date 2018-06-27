<template>
  <view class="fm-empty">
    <fm-icon icon="icon-food" size="30vw" color="inherit;"></fm-icon>
    <view class="fm-empty__text">{{ text }}</view>
  </view>
</template>

<script>
import FmIcon from '@/components/FmIcon'
export default {
  name: 'FmEmpty',
  components: {
    FmIcon
  },
  props: {
    text: {
      type: String,
      default: '暂无数据'
    }
  }
}
</script>

<style lang="less">
@import "../asset/style/_variable.less";

.fm-empty {
  flex: none;
  display: block;
  margin: 0 auto;
  padding:  48px 24px;
  text-align: center;
  color: @--color-info-light;
  box-sizing: border-box;
}

.fm-empty__text {
  font-size: @--font-size-small;
  margin-top: 8px;
}
</style>
