<template>
  <view class="fm-copyright" :class="className" :style="elementStyle">
    <view>温馨提示</view>
    <view>如有任何疑问，请拨打客服电话</view>
    <view @tap="takePhone">
      400-810-0088
    </view>
  </view>
</template>

<script>
export default {
  name: 'FmCopyright',
  props: {
    className: String,
    elementStyle: String
  },
  methods: {
    takePhone () {
      wx.makePhoneCall({
        phoneNumber: '4008100088' //仅为示例，并非真实的电话号码
      })
    }
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
