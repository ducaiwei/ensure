<template>
  <view class="fm-checkout">
    <checkout-fetch-card :branch="trade.fetch" :distance="distance"></checkout-fetch-card>

    <view class="fm-checkout-card">
      <view class="fm-checkout-card__hd">{{ trade.fetch.branchName }}</view>
      <view class="fm-checkout-card__bd">
        <checkout-good-group :good="trade.good"></checkout-good-group>
      </view>
      <view class="fm-checkout-card-ft">
        <view>共 {{ trade.info.tradeNumber }} 件商品</view>
        <fm-price :price="trade.info.tradeAmount" label="小计:" label-class="label" currency color="inherit" font-size="16"></fm-price>
      </view>
    </view>

    <fm-copyright></fm-copyright>

    <view class="fm-checkout-navbar-fixed">
      <fm-button @click="handlePay" size="xl" type="primary" text="微信支付"></fm-button>
    </view>
  </view>
</template>

<script>
import FmPrice from '@/components/FmPrice'
import FmCopyright from '@/components/FmCopyright'
import FmButton from '@/components/FmButton'
import CheckoutFetchCard from './CheckoutFetchCard'
import CheckoutGoodGroup from './CheckoutGoodGroup'
export default {
  components: {
    FmPrice,
    FmCopyright,
    FmButton,
    CheckoutFetchCard,
    CheckoutGoodGroup
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
    getMock () {
      this.getFetch()
      this.getInfo()
      this.getGood(5)
    },
    getFetch () {
      const fetch = {
        branchName: '门店名称',
        branchAddress: '门店地址门店地址门店地址门店地址门店地址门店地址',
        location: {
          latitude: 31.267110,
          longitude: 121.377300
        }
      }
      const distance = 725
      this.trade.fetch = fetch
      this.distance = distance
    },
    getGood (i) {
      let tmp = []
      while (i > 0) {
        tmp.push({
          skuId: 'skuId${i}',
          goodName: '商品名称${i}',
          goodImage: this.$random.image(),
          skuLabel: '大杯, 去冰',
          goodNumber: this.$random.number(1, 5),
          goodAmount: this.$random.number(800, 4000)
        })
        i--
      }
      this.trade.good = tmp
    },
    getInfo () {
      const info = {
        tradeNumber: 5,
        tradeAmount: 5200
      }
      this.trade.info = info
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
        url: '/pages/trade/main?tradeId=td01'
      })
    }
  },
  mounted () {
    this.getMock()
  }
}
</script>

<style lang="less">
@import "../../asset/style/_variable.less";

.fm-checkout {
  min-height: 100%;
  overflow: hidden;
  background-color: @--background-color-base;
  padding-bottom: 56px;
}

.fm-checkout-card {
  position: relative;
  display: block;
  margin: 8px;
  padding: 0 16px;
  background-color: @--fill-base;
  border-radius: @--border-radius-small;
  border: @--border-width-base @--border-style-base @--border-color-extra-light;
  overflow: hidden;
}

.fm-checkout-card__hd {
  position: relative;
  display: block;
  line-height: 48px;
  height: 48px;
  font-weight: @--font-weight-blod;
  font-size: @--font-size-base;

  &::after {
    .setBottomLine(@--border-color-extra-light);
  }
}

.fm-checkout-card__bd {
  position: relative;
  display: block;
}

.fm-checkout-card-ft {
  position: relative;
  display: flex;
  height: 48px;
  align-items: center;
  justify-content: space-between;
  font-size: @--font-size-base;

  &::before {
    .setTopLine(@--border-color-extra-light)
  }
}

.fm-checkout-navbar-fixed {
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  display: block;
  z-index: @zindex-navbar-fixed;
  box-shadow: @--box-shadow-base;
}
</style>
