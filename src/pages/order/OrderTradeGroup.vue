<template>
  <view class="fm-order-trade-group">
    <view @click="handleTrade(trade.oid)" v-for="(trade, tradeIndex) in list" :key="tradeIndex" class="fm-order-trade-panel" hover-class="active">
      <view class="fm-order-trade-cell">
        <view class="fm-order-trade-cell__bd">
          {{ trade.hotelName }}
        </view>
        <view class="fm-order-trade-cell__ft">
          <label class="info">{{trade.orderStatusDesc}}</label>
          <fm-icon icon="icon-chevron-right" size="24px" color="#d8dce5"></fm-icon>
        </view>
      </view>
      <view class="fm-order-trade-order-group">
        <view class="fm-order-trade-order">
          <view class="name">
            <label>订单号</label>
            <label class="sku-label">[{{ trade.oid }}]</label>
          </view>
        </view>
        <view class="fm-order-trade-order">
          <view class="name">
            <label>保单号</label>
            <label class="sku-label">[{{ trade.insuranceCode }}]</label>
          </view>
        </view>
      </view>
      <view class="fm-order-trade-ft">
        <view></view>
        <fm-price :price="trade.payAmount" label="实付: " label-class="label" currency color="inherit" font-size="16"></fm-price>
      </view>
    </view>
  </view>
</template>

<script>
import FmIcon from '@/components/FmIcon'
import FmImage from '@/components/FmImage'
import FmPrice from '@/components/FmPrice'
export default {
  name: 'OrderTradeGroup',
  components: {
    FmIcon,
    FmImage,
    FmPrice
  },
  props: {
    list: Object
  },
  methods: {
    handleTrade (tradeId) {
      this.$wxp.navigateTo({
        url: `/pages/trade/main?tradeId=${tradeId}`
      })
    }
  },
  created () {
    console.log(this.list)
  }
}
</script>

<style lang="less">
@import "../../asset/style/_variable.less";

.fm-order-trade-group {
  position: relative;
  display: block;
  box-sizing: border-box;
  overflow: hidden;
  color: @--color-text-primary;
}

.fm-order-trade-panel {
  position: relative;
  display: block;
  padding: 0 16px;
  box-sizing: inherit;
  margin-top: 8px;
  background-color: @--fill-base;

  &:last-child {
    margin-bottom: 8px;
  }

  &::before {
    .setActive()
  }

  &.active {
    &::before {
      opacity: .08;
    }
  }
}

.fm-order-trade-panel {
  .fm-order-trade-cell {
    position: relative;
    display: flex;
    height: 48px;
    font-size: @--font-size-base;
    font-weight: @--font-weight-blod;
    box-sizing: inherit;

    &::after {
      .setBottomLine(@--border-color-extra-light);
    }
  }

  .fm-order-trade-cell__bd {
    flex: auto;
    display: inline-flex;
    align-items: center;
    box-sizing: inherit;
  }

  .fm-order-trade-cell__ft {
    flex: none;
    display: inline-flex;
    align-items: center;
    margin-left: 16px;
    box-sizing: inherit;

    .success {
      color: @--color-success;
    }

    .danger {
      color: @--color-danger;
    }

    .warning {
      color: @--color-warning;
    }

    .info {
      color: @--color-info;
    }
  }
}

.fm-order-trade-panel {
  .fm-order-trade-order-group {
    display: block;
    font-size: @--font-size-small;
    color: @--color-text-regular;
    padding-top: 4px;
    padding-bottom: 4px;
    box-sizing: inherit;
  }

  .fm-order-trade-order {
    display: flex;
    align-items: center;
    line-height: 28px;
    box-sizing: inherit;

    .name {
      flex: auto;
      box-sizing: inherit;
      .setEllip(1);

      .sku-label {
        color: @--color-text-secondary;
        margin-left: 8px;
        box-sizing: inherit;
      }
    }

    .number {
      flex: none;
      margin-left: 16px;
    }
  }
}

.fm-order-trade-panel {
  .fm-order-trade-ft {
    position: relative;
    display: flex;
    height: 48px;
    align-items: center;
    justify-content: space-between;
    font-size: @--font-size-base;
    box-sizing: inherit;

    &::before {
      .setTopLine(@--border-color-extra-light)
    }

    .label {
      font-size: 11px;
      margin-right: 4px;
    }
  }
}
</style>
