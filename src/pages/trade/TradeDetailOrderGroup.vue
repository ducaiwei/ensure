<template>
  <!-- order, start -->
  <view class="fm-trade-detail-order-group">
    <view v-for="item in order" :key="item.orderId" class="fm-trade-detail-order">
      <view class="fm-trade-detail-order__hd">
        <fm-image :src="item.goodImage" size="40px" border-radius="2px"></fm-image>
      </view>
      <view class="fm-trade-detail-order__bd">
        <label class="title">{{ item.goodName }}</label>
        <label class="sku-label" v-if="item.skuLabel">[{{ item.skuLabel }}]</label>
      </view>
      <view class="fm-trade-detail-order__ft">
        <label class="number">× {{ item.goodNumber }}</label>
      </view>
      <view class="fm-trade-detail-order__ft">
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
  name: 'TradeDetaiOrderGroup',
  components: {
    FmImage,
    FmPrice
  },
  props: {
    order: Array
  }
}
</script>

<style lang="less">
@import "../../asset/style/_variable.less";

.fm-trade-detail-order-group {
  display: block;
  margin-top: 8px;
  margin-bottom: 8px;
}

.fm-trade-detail-order {
  display: flex;
  align-items: center;
  padding-top: 8px;
  padding-bottom: 8px;
  font-size: @--font-size-small;
  color: @--color-text-primary;
}

.fm-trade-detail-order__hd {
  flex: none;
  margin-right: 16px;
}

.fm-trade-detail-order__bd {
  flex: auto;

  .sku-label {
    font-size: 11px;
    color: @--color-text-secondary;
    margin-left: 8px;
  }
}

.fm-trade-detail-order__ft {
  flex: none;
  margin-left: 16px;

  .number {
    display: inline-block;
    font-family: Tahoma;
    font-size: 11px;
    text-align: right;
    width: 3em;
  }

  .price {
    display: inline-block;
    text-align: right;
    width: 4em;
  }
}
</style>
