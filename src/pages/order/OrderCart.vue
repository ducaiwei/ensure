<template>
  <view class="fm-order-cart">
    <view class="fm-order-cart__tips">
      <label>已减12元，再买 </label>
      <label class="hightlight">4.1元 </label>
      <label>可减</label>
      <label class="hightlight">16元</label>
    </view>
    <view class="fm-order-cart__nav">
      <view class="fm-order-cart__nav__badage">
        <fm-button mode="fab" type="primary" :disabled="_badage === 0" no-shadow class-name="fm-order-cart__nav__btn" icon="icon-cart"></fm-button>
        <label class="content" v-if="_badage > 0">{{ _badage }}</label>
      </view>
      <view class="fm-order-cart__nav__main">
        <fm-price v-model="cart.amount" font-size="24" color="#ffffff" currency></fm-price>
      </view>
      <fm-button @click="goCheckout" type="primary" text="去结算" size="l" noShadow inline class-name="fm-order-cart__nav__buy"></fm-button>
    </view>
  </view>
</template>

<script>
import FmButton from '@/components/FmButton'
import FmPrice from '@/components/FmPrice'
export default {
  name: 'OrderCart',
  components: {
    FmButton,
    FmPrice
  },
  data () {
    return {
      cart: {
        badage: 4,
        amount: 1800
      }
    }
  },
  computed: {
    _badage () {
      return this.cart.badage || 0
    },
    _amount () {
      return this.$money.f2y(this.cart.amount)
    }
  },
  methods: {
    goCheckout () {
      this.$wxp.navigateTo({
        url: '/pages/checkout/main'
      })
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
</style>
