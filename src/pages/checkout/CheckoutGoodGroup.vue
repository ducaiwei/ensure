<template>
  <!-- order, start -->
  <view class="fm-checkout-good-group-group">
    <view v-for="item in good" :key="item.skuId" class="fm-checkout-good-group">
      <view class="fm-checkout-good-group__hd">
        <fm-image :src="item.goodImage" size="40px" border-radius="2px"></fm-image>
      </view>
      <view class="fm-checkout-good-group__bd">
        <label class="title">{{ item.goodName }}</label>
        <label class="sku-label" v-if="item.skuLabel">[{{ item.skuLabel }}]</label>
      </view>
      <view class="fm-checkout-good-group__ft">
        <label class="number">× {{ item.goodNumber }}</label>
      </view>
      <view class="fm-checkout-good-group__ft">
        <fm-price :price="item.goodAmount" class-name="price" currency color="inherit" font-size="14"></fm-price>
      </view>
    </view>
  </view>
  <!-- order, end -->
</template>

<script>
import FmImage from '@/components/FmImage'
import FmPrice from '@/components/FmPrice'
export default {
  name: 'CheckoutGoodGroup',
  components: {
    FmImage,
    FmPrice
  },
  props: {
    good: Array
  }
}
</script>

<style lang="less">
@import "../../asset/style/_variable.less";

.fm-checkout-good-group-group {
  display: block;
  margin-top: 8px;
  margin-bottom: 8px;
}

.fm-checkout-good-group {
  display: flex;
  align-items: center;
  padding-top: 8px;
  padding-bottom: 8px;
  font-size: @--font-size-small;
  color: @--color-text-primary;
}

.fm-checkout-good-group__hd {
  flex: none;
  margin-right: 16px;
}

.fm-checkout-good-group__bd {
  flex: auto;

  .sku-label {
    font-size: 11px;
    color: @--color-text-secondary;
    margin-left: 8px;
  }
}

.fm-checkout-good-group__ft {
  flex: none;
  margin-left: 16px;

  .number {
    display: inline-block;
    font-family: Tahoma;
    font-size: 11px;
    width: 3em;
    text-align: right;
  }

  .price {
    display: inline-block;
    width: 4em;
    text-align: right;
  }
}
</style>
