<template>
  <view class="fm-order-goods">
    <view class="fm-order-good" hover-class="active" v-for="(item, index) in goods" :key="index">
      <view class="fm-order-good__hd">
        <fm-image :src="item.hallPicture" size="20vw" border-radius="2px" mode="aspectFill"></fm-image>
      </view>
      <view class="fm-order-good__bd">
        <view class="fm-order-good__bd__title">{{ item.hallName }}</view>
        <view class="fm-order-good__bd__desc">{{ item.hallDesc }} ({{item.hallAreaDesc}})</view>
        <view class="fm-order-good__bd__action">
          <fm-price :price="item.price" :font-size="16" multiple currency></fm-price>
          <label class="quantity" @tap="addQuantity(item, 'plus')" v-if="!item.selected">
            <fm-icon icon="icon-plus-circle" color="#09bb07"></fm-icon>
          </label>
          <label class="quantity" @tap="addQuantity(item, 'minus')" v-else>
            <fm-icon icon="icon-minus-circle" color="#5a5e66"></fm-icon>
          </label>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import FmImage from '@/components/FmImage'
import FmIcon from '@/components/FmIcon'
export default {
  name: 'HotelGoods',
  components: {
    FmImage,
    FmIcon,
  },
  props: {
    goods: Object
  },
  methods: {
    addQuantity (item, type) {
      if (type === 'plus') {
        item.selected = true
      } else {
        item.selected = false
      }
      this.$emit('addQuantity', item, type)
    }
  }
}
</script>

<style lang="less">
@import "../../asset/style/_variable.less";

.fm-order-goods {
  position: relative;
  overflow: hidden;
  display: block;
  box-sizing: border-box;
}

.fm-order-good {
  position: relative;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  height: 100px;
  padding: 0px 16px;

  &::before {
    .setActive();
  }

  &.active {
    &::before {
      opacity: .08;
    }
  }

  &:last-child {
    // margin-bottom: 24px;
  }
}

.fm-order-good__hd {
  flex: none;
  display: block;
  box-sizing: inherit;
  margin-right: 16px;
}

.fm-order-good__bd {
  flex: auto;
  box-sizing: inherit;
}

.fm-order-good__bd__title {
  font-size: @--font-size-root;
  color: @--color-text-primary;
  font-weight: @--font-weight-blod;
  .setEllip();
}

.fm-order-good__bd__desc {
  // font-size: @--font-size-small;
  font-size: 11px;
  color: @--color-text-secondary;
  .setEllip(2);
  // height: unit(@--font-size-small * 1.5 * 2, px);
  height: unit(11px * 1.5 * 2, px);
}

.fm-order-good__bd__action {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .quantity {
    display: inline-flex;
    align-items: center;
  }
}

.fm-order-goods__nav {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  display: block;
  line-height: 32px;
  padding: 0 16px;
  box-sizing: inherit;
  background-color: @--fill-base;
  font-size: @--font-size-small;
  color: @--color-text-regular;
  font-weight: @--font-weight-blod;
}
</style>
