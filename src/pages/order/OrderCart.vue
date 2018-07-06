<template>
  <view>
    <view class="fm-order-cart">
      <view class="fm-order-cart__nav">
        <view class="fm-order-cart__nav__badage">
          <fm-button @tap="cascadeToggle" mode="fab" type="primary" :disabled="cart.length === 0" no-shadow class-name="fm-order-cart__nav__btn" icon="icon-cart"></fm-button>
          <label class="content" v-if="cart.length > 0">{{ cart.length }}</label>
        </view>
        <view class="fm-order-cart__nav__main">
          <fm-price v-model="cart.amount" font-size="24" color="#ffffff" currency></fm-price>
        </view>
        <fm-button @tap="goCheckout" type="primary" text="去结算" size="l" noShadow inline class-name="fm-order-cart__nav__buy"></fm-button>
      </view>
    </view>
    <!--购物车弹层-->
    <view class="modal">
      <view :animation="animationMask" class="modal-mask " :class="maskVisual" @tap="cascadeDismiss"></view>
      <view :animation="animationData" class="modal-content" :class="maskVisual" :style="{height: cartHeight + 'px', bottom: showBottomHeight + 'px'}">
          <view class="modal-header">
              <text class="modal-title">购物车</text>
              <image :src="CloseImg" class="modal-close" @tap="cascadeDismiss" />
          </view>
          <scroll-view class="modal-body" scroll-y="true" :style="{height: scrollHeight + 'px'}">
            <view class="item" v-for="(item, index) in cart" :key="index">
              <view class="title">{{item.name}}</view>
              <view class="fee">{{item.price * item.count}}</view>
              <view class="stepper">
              <!-- 减号 -->
              <image src="/images/subtract.png" class="symbol" bindtap="subtract"/>
              <!-- 数量 -->
              <view class="value">1</view>
              <!-- 加号 -->
              <image src="/images/add.png" class="symbol" bindtap="add"/>
            </view>
            </view>
          </scroll-view>
      </view>
    </view>
  </view>
</template>

<script>
import FmButton from '@/components/FmButton'
import FmPrice from '@/components/FmPrice'
import CloseImg from '../../asset/images/close.png'
export default {
  name: 'OrderCart',
  components: {
    FmButton,
    FmPrice
  },
  data () {
    return {
      cart: [{
        name: 'cccccc',
        count: 1,
        price: 1000
      },
      {
        name: 'dddd',
        count: 2,
        price: 500
      }],
      animationMask: null,
      cartHeight: 0,
      maskVisual: 'hidden',
      max_row_height: 5, // 最大行数
      food_row_height: 49, // 
      cart_offset: 90, // 行高
      scrollHeight: 0,
      CloseImg: CloseImg,
      showBottomHeight: 0
    }
  },
  computed: {
  },
  methods: {
    goCheckout () {
      this.$wxp.navigateTo({
        url: '/pages/checkout/main'
      })
    },
    cascadeToggle () {
      //切换购物车开与关
      if (this.maskVisual == 'show') {
        this.cascadeDismiss()
      } else {
        this.cascadePopup()
      }
    },
    cascadePopup () {
      // 购物车打开动画
      var animation = wx.createAnimation({
        duration: 300,
        timingFunction: 'ease-in-out',
      });
      this.animation = animation
      // scrollHeight为商品列表本身的高度
      var scrollHeight = (this.cart.length <= this.max_row_height ? this.cart.length : this.max_row_height) * this.food_row_height
      // cartHeight为整个购物车的高度，也就是包含了标题栏与底部栏的高度
      // var cartHeight = 50
      var cartHeight = scrollHeight + this.cart_offset;
      this.showBottomHeight = 50
      animation.translateY(- cartHeight).step()
      this.animationData =  this.animation.export()
      this.maskVisual = 'show'
      this.scrollHeight = scrollHeight
      this.cartHeight = cartHeight
      // 遮罩渐变动画
      var animationMask = wx.createAnimation({
        duration: 150,
        timingFunction: 'linear',
      });
      this.animationMask = animationMask
      animationMask.opacity(0.8).step()
      // this.animationMask = this.animationMask.export()
    },
    cascadeDismiss () {
      // 购物车关闭动画
      this.animation.translateY(this.cartHeight).step()
      this.animationData = this.animation.export()
      // 遮罩渐变动画
      this.animationMask.opacity(0).step();
      // this.animationMaskData = this.animationMask.export()
      // 隐藏遮罩层
      this.maskVisual = 'hidden'
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
  z-index: 99;
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
	bottom: -100%;
	left: 0;
	width: 100%;
	background: #fff;
	z-index: 99;
}
/**弹层购物车**/
.hidden {
  display: none;
}
/*遮罩层*/
.modal-mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #000;
    opacity: 0;
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
	/*height: 145px;*/
	max-height: 295px;
}

.modal-body .item {
  height: 49px;
	align-items: center;
	border-bottom: 1px solid #eee;
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
