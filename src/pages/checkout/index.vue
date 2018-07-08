<template>
  <view class="fm-checkout">
    <!-- <view class="check-img-box">
      <image src=""/>
    </view> -->
    <view class="form-box">
      <form bindsubmit="formSubmit" bindreset="formReset">
        <view class="item-card">
          <view class="item-card-title">
            <text>上海市浦东酒店</text>
          </view>
          <view class="check-list-item">
            <image src="http://wx1.sinaimg.cn/mw600/46401622gy1fqnq7rsaa9j20ri0rital.jpg" class="hall-img"/>
            <view class="hall-name">
              <text>
                宴会厅一楼一厅
              </text>
              <text>
                (282平)
              </text>
            </view>
            <text class="block-text price">322￥</text>
          </view>
          <view class="check-list-item">
            <image src="http://wx1.sinaimg.cn/mw600/46401622gy1fqnq7rsaa9j20ri0rital.jpg" class="hall-img"/>
            <view class="hall-name">
              <text>
                宴会厅一楼一厅
              </text>
              <text>
                (282平)
              </text>
            </view>
            <text class="block-text price">322￥</text>
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
        <view class="item-card form-card">
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
          <view class="form-item" v-for="(inputItems,index) in  formInputs" :key="index">
            {{inputItems.name}}:
            <input type="text" class="form-input"/>
          </view>
            <view class="form-item">
            购买分数:
            <input v-model="quantity" class="quantity-input"/>
            <label class="quantity" @tap="addQuantity">
              <fm-icon icon="icon-plus-circle" color="#09bb07"></fm-icon>
            </label>
          </view>
        </view>
        <view class="item-card">
          <view class="item-card-title">
            <checkbox-group @change="changeCheckAppend">
              <label class="checkbox">
                <checkbox class="check-box"/>是否购买附加险
              </label>
            </checkbox-group>
          </view>
          <checkbox-group @change="itemCheckChange" v-show="isChecked">
            <view class="append-item" v-for="(item, index1) in appendEnsures" :key="index1">
              <checkbox class="check-box" value="item.name"/>
              <text class="name-text">{{item.name}}</text>
              <text class="compens-text">最高赔偿 {{item.mostCompens}}￥</text>
              <text class="compens-text">免赔偿额 {{item.avoidCompens}}￥</text>
            </view>
          </checkbox-group>
        </view>
      </form>
    </view>
    <view class="fm-checkout-navbar-fixed">
      <text class="total-price">&nbsp;&nbsp;&nbsp;&nbsp;2500￥</text>
      <fm-button @click="handlePay" size="xl" type="primary" text="微信支付">
      </fm-button>
    </view>
  </view>
</template>

<script>
import FmButton from '@/components/FmButton'
import FmIcon from '@/components/FmIcon'
export default {
  components: {
    FmButton,
    FmIcon
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
      endDate: new Date(new Date().getTime() + 3 * 24 * 60 * 60 * 1000).Format('yyyy-MM-dd'),
      formInputs: [
          {
            name: '投保公司'
          },{
            name: '统一社会信用代码'
          },{
            name: '联系人姓名'
          },{
            name: '手机号'
          },{
            name: '展厅会议名称'
          }],
      isChecked: false,
      appendEnsures:[{
        name: '门',
        price: 150,
        mostCompens: 2000,
        avoidCompens: 200
      },
      {
        name: '玻璃',
        price: 150,
        mostCompens: 2000,
        avoidCompens: 200
      }],
      quantity: 1
    }
  },
  methods: {
    bindDateChange (e) {
      this.startDate = e.mp.detail.value
    },
    handlePay () {
      this.$wxp.showModal({
        title: '操作演示',
        content: '拉起支付咯😝'
      }).then(res => {
        if (res.confirm) {
          this.goTrade()
        }
      })
    },
    goTrade () {
      this.$wxp.redirectTo({
        url: `/pages/trade/main?tradeId=td01`
      })
    },
    changeCheckAppend (e) {
      this.isChecked = e.mp.detail.value.length === 0 ? false : true
    },
    itemCheckChange (e) {
      console.log(e)
    },
    addQuantity () {
      this.quantity = this.quantity + 1
    }
  },
  mounted () {
  }
}
</script>

<style lang="less">
@import "../../asset/style/_variable.less";
.form-box {
  margin-bottom: 80rpx;
}
.fm-checkout {
  min-height: 100%;
  padding-bottom: 56px;
  background-color: @--background-color-base;
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
  background-color: @--fill-base;
  border-radius: @--border-radius-small;
  border: @--border-width-base @--border-style-base @--border-color-extra-light;
  &.form-card {
    padding-bottom: 0rpx;
  }
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
    .item-text-font-size();
  }
  .text-label {
    padding-left: 30rpx;
  }
  .hall-name {
    width: 55%;
    text {
      display: block;
      padding-top: 10rpx;
      text-align: center;
      .item-text-font-size();
    }
  }
  .price {
    color: red;
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
  .item-flex();
  text {
    display: block;
    flex: 1;
    text-align: center;
    .item-text-font-size();
  }
  .content-name {
    text-align: left;
  }
}
.form-item {
  position: relative;
  .item-flex();
  .item-text-font-size();
  &:after {
    .setBottomLine(@--border-color-extra-light)
  }
}
.append-item {
  position: relative;
  .item-flex();
  text {
    display: block;
    .item-text-font-size();
  }
  .name-text {
    width: 20%;
    text-align: center;
  }
  .compens-text {
    width: 38%;
    text-align: right;
  }
}
.append-item:after {
  .setBottomLine(@--border-color-extra-light)
}
.form-input {
  display: block;
  flex: 1;
  padding-left: 20rpx;
  height: 80rpx;
}
.quantity-input {
  display: block;
  padding-left: 20rpx;
  width: 80rpx;
  height: 80rpx;
}
.form-date {
  position: relative;
  display: block;
  width: 100%;
  .item-text-font-size();
}
.fm-checkout-navbar-fixed {
  position: fixed;
  width: 100%;
  height: 56px;
  display: flex;
  left: 0;
  bottom: 0;
  z-index: 99;
  .total-price {
    position: absolute;
    display: block;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    line-height: 56px;
    font-size: 18px;
    background-color: @--color-text-regular;
    color: @--color-white;
    z-index: 2;
  }
  button {
    position: absolute;
    right: 0;
    top: 0;
    line-height: 56px;
    display: block;
    width: auto;
    min-width: 64px;
    z-index: 3;
  }
}
.quantity {
  margin-left: 30rpx;
  padding-top: 9rpx;
}
</style>
