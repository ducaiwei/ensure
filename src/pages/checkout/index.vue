<template>
  <view class="fm-checkout">
    <view class="check-img-box">
      <image src=""/>
    </view>
    <view class="form-box">
      <form bindsubmit="formSubmit" bindreset="formReset">
        <view class="item-card">
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
          <view class="item-card-title">
            <text>投保信息</text>
          </view>
          <view class="form-item">
            <picker mode="date"  class="form-date" :value="startDate" :start="'2015-09-01'" @change="bindDateChange">
             <view class="form-date">
                 保险开始时间: 
                 <text>{{ startDate }}</text>
              </view>
            </picker>
          </view>
           <view class="form-item">
            <picker mode="date" :value="endDate" :start="'2015-09-01'" @change="bindDateChange"  class="form-date">
             <view>
                 保险结束时间: 
                 <text>{{ endDate }}</text>
              </view>
            </picker>
          </view>
          <view class="form-item">
            投保人姓名: <input type="text"/>
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
      },
      startDate: new Date().Format('yyyy-MM-dd'),
      endDate: new Date(new Date().getTime() + 3 * 24 * 60 * 60 * 1000).Format('yyyy-MM-dd')
    }
  },
  methods: {
    bindDateChange (e) {
      this.startDate = e.mp.detail.value
      console.log(this.startDate)
    },
    getToday () {
    }
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
    font-size: 26rpx;
  }
  .text-label {
    padding-left: 30rpx;
  }
  .hall-name {
    width: 45%;
  }
  .price {
    width: 25%;
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
  height: 80rpx;
  line-height: 80rpx;
  padding: 0rpx 20rpx;
  text {
    display: block;
    flex: 1;
    text-align: center;
    font-size: 26rpx;
  }
  .content-name {
    text-align: left;
  }
}
.form-item {
  position: relative;
  display: flex;
  padding: 0rpx 20rpx;
  height: 80rpx;
  line-height: 80rpx;
  &:after {
    position: absolute;
    content: "";
    display: block;
    width: 100%;
    height: 0;
    left: 0;
    bottom: 0;
    border-bottom: 1px solid #cccccc;
    transform: scaleY(.3);
  }
}
.form-date {
  position: relative;
  display: block;
  width: 100%;
  font-size: 26rpx;
 
}
.fm-checkout-navbar-fixed {
  position: fixed;
  width: 100%;
  left: 0;
  bottom: 0;
}
</style>
