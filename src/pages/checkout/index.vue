<template>
  <view class="fm-checkout">
    <view class="check-img-box">
      <image src=""/>
    </view>
    <view class="form-box">
      <form bindsubmit="formSubmit" bindreset="formReset">
        <view class="item-card">
          <!-- <view class="check-list-item">
            <text class="text-label">地址：</text>
            <text>上海浦东区宴会厅一楼一厅</text>
          </view>
          <view class="check-list-item">
            <text  class="text-label">面积：</text>
            <text>142平</text>
          </view> -->
          <view class="item-card-title">
            <text>上海市浦东酒店</text>
          </view>
          <view class="check-list-item">
            <image src="http://wx1.sinaimg.cn/mw600/46401622gy1fqnq7rsaa9j20ri0rital.jpg" class="hall-img"/>
            <text class="block-text hall-name">宴会厅一楼一厅</text>
            <text class="block-text price">282</text>
            <view class="item-step">
              <text class="oper-num">-</text>
              <input type="text" value="1">
              <text class="oper-num">+</text>
            </view>
          </view>
          <view class="check-list-item">
            <image src="http://wx1.sinaimg.cn/mw600/46401622gy1fqnq7rsaa9j20ri0rital.jpg" class="hall-img"/>
            <text class="block-text hall-name">宴会厅一楼二厅</text>
            <text class="block-text price">282</text>
            <view class="item-step">
              <text class="oper-num">-</text>
              <input type="text" value="1">
              <text class="oper-num">+</text>
            </view>
          </view>
        </view>
        <view class="item-card protect-content-box">
          <view class="item-card-title">
            <text>保障内容</text>
          </view>
          <view class="protect-content-item">
            <text class="block-text content-name">意外险</text>
            <text class="block-text">最高赔付30万</text>
          </view>
          <view class="protect-content-item">
            <text class="block-text content-name">搭建险</text>
            <text class="block-text">最高赔付60万</text>
          </view>
        </view>
        <view class="item-card">
          <view class="for-item">
          </view>
        </view>
        
      </form>
    </view>
    <view class="fm-checkout-navbar-fixed">
      <fm-button @click="handlePay" size="xl" type="primary" text="微信支付"></fm-button>
    </view>
  </view>
</template>

<script>
import FmPrice from '@/components/FmPrice'
import FmCopyright from '@/components/FmCopyright'
import FmButton from '@/components/FmButton'
import FmImage from '@/components/FmImage'
export default {
  components: {
    FmPrice,
    FmCopyright,
    FmButton,
    FmImage
  },
  data () {
    return {
      distance: undefined,
      trade: {
        info: {
          tradeNumber: 5,
          tradeAmount: 5200
        },
        good: [],
        fetch: {}
      }
    }
  },
  methods: {
  },
  mounted () {
    // this.getMock()
  }
}
</script>

<style lang="less">
@import "../../asset/style/_variable.less";

.fm-checkout {
  min-height: 100%;
  padding-bottom: 56px;
  background-color: #f4f4f4;
  overflow: hidden;
}
.check-img-box {
  display: block;
  width: 100%;
  height: 300rpx;
  background: blue;
}
.item-card {
  display: block;
  width: 95%;
  margin: auto;
  margin-top: 20rpx;
  padding: 0 4rpx;
  padding-bottom: 20rpx;
  background-color: #fff;
}
.item-card-title {
  padding-left: 20rpx;
  padding-top: 20rpx;
}
.check-list-item {
  display: flex;
  padding: 10rpx 20rpx;
  margin-top: 20rpx;
  background-color: #f7f7f7;
  .hall-img {
    display: block;
    width: 100rpx;
    height: 100rpx;
  }
  .block-text {
    display: block;
    text-align: center;
    line-height: 100rpx;
    font-size: 24rpx;
  }
  .text-label {
    padding-left: 30rpx;
  }
  .hall-name {
    width: 50%;
  }
  .price {
    width: 20%;
  }
}
.item-step {
  display: flex;
  width: 160rpx;
  text-align: right;
  input {
    display: block;
    width: 80rpx;
    margin: auto;
    height: 100rpx;
    text-align: center;
  }
  .oper-num {
    font-size: 60rpx;
  }
}
.protect-content-box {
  display: block;
}
.protect-content-item {
  display: flex;
  height: 60rpx;
  line-height: 60rpx;
  padding: 0rpx 20rpx;
  text {
    display: block;
    flex: 1;
    text-align: center;
    font-size: 24rpx;
  }
  .content-name {
    text-align: left;
  }
}
.fm-checkout-navbar-fixed {
  position: fixed;
  width: 100%;
  left: 0;
  bottom: 0;
}
</style>
