<template>
  <view>
    <view class="fm-order-cart">
      <view class="fm-order-cart__tips" v-if="cart.length > 0">
        <label>{{promotionMessage}} </label>
      </view>
      <view class="fm-order-cart__nav">
        <view class="fm-order-cart__nav__badage">
          <fm-button @tap="cascadeToggle" mode="fab" type="primary" :disabled="cart.length === 0" no-shadow class-name="fm-order-cart__nav__btn" icon="icon-cart"></fm-button>
          <label class="content" v-if="cart.length > 0">{{ cart.length }}</label>
        </view>
        <view class="fm-order-cart__nav__main" v-if="cart.length > 0">
          <label class="fm-price" style="">
            <label  :style="{ fontSize: (fontSize - 6) + 'px' }" class="fm-price__currency">￥</label>
            <label class="fm-price__num">{{ totalPrice }}</label>
          </label>
        </view>
        <fm-button @tap="goCheckout" type="primary" text="去结算" size="l" noShadow inline class-name="fm-order-cart__nav__buy"></fm-button>
      </view>
    </view>
    <!--购物车弹层-->
    <view class="modal" v-show="showModal" v-if="cart.length > 0">
      <view :animation="animationMask" class="modal-mask" @tap="cascadeDismiss"></view>
      <view :animation="animationData" class="modal-content">
          <view class="modal-header">
              <text class="modal-title">购物车</text>
              <image :src="CloseImg" class="modal-close" @tap="cascadeDismiss" />
          </view>
          <scroll-view class="modal-body" scroll-y="true">
            <view class="item" v-for="(item, index) in cart" :key="index">
              <view class="title">{{item.hallName}}</view>
              <view class="fee">{{item.insurancePrice}}</view>
              <view class="stepper">
                <label class="quantity" @tap="addQuantity(item, 'minus')">
                  <fm-icon icon="icon-minus-circle" color="#5a5e66"></fm-icon>
                </label>
                <view class="value">1</view>
            </view>
            </view>
          </scroll-view>
      </view>
    </view>
  </view>
</template>

<script>
import FmButton from '@/components/FmButton'
import CloseImg from '../../asset/images/close.png'
import FmIcon from '@/components/FmIcon'
export default {
  name: 'OrderCart',
  components: {
    FmButton,
    FmIcon
  },
  props: {
    cart: {
      type: Array,
      default: []
    },
    prices: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      showModal: false
    }
  },
  computed: {
    totalPrice () {
      return this.prices.toalAmount
    },
    promotionMessage () {
      return this.prices.promotionMessage
    }
  },
  methods: {
    goCheckout () {
      this.$wxp.navigateTo({
        url: '/pages/checkout/main'
      })
    },
    cascadeToggle () {
      //切换购物车开与关
      if (this.showModal) {
        this.cascadeDismiss()
      } else {
        this.cascadePopup()
      }
    },
    cascadePopup () {
      this.showModal = true
    },
    cascadeDismiss () {
      this.showModal = false
    },
    compiteTotalPrice () {
      if (this.cart.length > 0) {
        this.totalPrice = 0
        this.cart.forEach((item, index) => {
          this.totalPrice = this.totalPrice + item.price
        })
      } else {
        this.totalPrice = 0
      }
    },
    addQuantity (item, type) {
      item.selected = false
      this.$emit('addQuantity', item, type)
    }
  }
}
</script>

<style lang="less">
@import "../../asset/style/_variable.less";

.fm-order-cart {
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  display: block;
  z-index: 100;
}

.fm-order-cart__tips {
  position: relative;
  display: flex;
  text-align: center;
  height: @--font-line-height-primary;
  line-height: @--font-line-height-primary;
  background-color: #fffad6;
  font-size: 11px;  //@--font-size-small;
  justify-content: center;
  opacity: .96;
  color: @--color-text-regular;
  z-index: @zindex-navbar;

  &::before {
    .setTopLine(#f9e8a3);
  }

  .hightlight {
    color: @--color-danger;
  }
}

.fm-order-cart__nav {
  position: relative;
  display: flex;
  height: 48px;
  padding: 8px;
  align-items: center;
  background-color: @--color-text-regular;
  z-index: @zindex-navbar-fixed;
}

.fm-order-cart__nav__badage {
  position: relative;
  bottom: 8px;
  display: inline-flex;
  flex: none;

  .content {
    position: absolute;
    right: -2px;
    top: 2px;
    min-width: 16px;
    height: 16px;
    line-height: 16px;
    border-radius: 9px;
    background-color: @--color-danger;
    font-family: Tahoma;
    font-size: 10px;
    text-align: center;
    vertical-align: middle;
    color: @--color-white;
    padding-right: 1px;
    padding-left: 1px;
  }
}

.fm-order-cart__nav__btn {
  position: relative;
  right: unset;
  bottom: unset;
  height: 48px !important;
  width: 48px !important;
  z-index: unset;
}

.fm-order-cart__nav__main {
  flex: auto;
  color: @--color-white;
  padding-right: 16px;
  padding-left: 16px;
}

.fm-order-cart__nav__buy {
  position: absolute;
  right: 0;
  bottom: 0;
  border-radius: 0;
  padding: 0 32px;
}
.modal-content {
	position: fixed;
	left: 0;
	width: 100%;
  bottom: 70px;
  background: #fff;
	z-index: 99;
}
/*遮罩层*/
.modal-mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #000;
    opacity: .5;
}

/*弹窗头部*/
.modal-header {
	font-size: 16px;
	color: #666;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	line-height: 30px;
	padding: 4px 10px;
	background: #eceff1;
}

/*购物车字样*/
.modal-title {
	text-align: center;
	flex: 1;
}

/*关闭按钮*/
.modal-close {
	width: 20px;
	height: 20px;
}

/*内容区域*/
.modal-body {
	font-size: 14px;
	max-height: 145px;
}

.modal-body .item {
  position: relative;
  display: flex;
  height: 49px;
  align-items: center;
  &:after {
    .setBottomLine(@--border-color-extra-light);
  }
  .title {
    padding-left: 40rpx;
  }
  .stepper {
    display: flex;
  }
  .title, .fee, .stepper {
    flex: 1;
  }
  .quantity {
    display: inline-flex;
    align-items: center;
  }
}

/*小计*/
.modal-body .fee {
	color: #ff6000;
	flex: 1;
	display: block;
}

.modal-body .fee:before {
	content: '￥';
}
</style>
