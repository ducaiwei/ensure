<template>
  <view class="fm-trade-detail">
    <view class="fm-trade-detail-card">
      <view class="fm-trade-detail-card__hd">订单信息</view>
      <view class="fm-trade-detail-card__bd">
        <trade-detail-cell label="订单编号" :value="trade.info.tradeType"></trade-detail-cell>
        <trade-detail-cell label="保单号" :value="trade.info.tradeType"></trade-detail-cell>
        <trade-detail-cell label="订单状态" :value="trade.info.tradeId" mode="number"></trade-detail-cell>
        <trade-detail-cell label="提交时间" :value="trade.info.createdTimestamp" mode="timestamp"></trade-detail-cell>
      </view>
    </view>

    <view class="fm-trade-detail-card">
      <view class="fm-trade-detail-card__hd">保单详情</view>
      <view class="fm-trade-detail-card__bd">
        <trade-detail-cell label="保单编号" :value="trade.pay.payType === 'wechatpay' ? '微信支付' : '其他'"></trade-detail-cell>
        <trade-detail-cell label="展厅名称" :value="trade.pay.payId" mode="number"></trade-detail-cell>
        <trade-detail-cell label="面积" :value="trade.pay.payId" mode="number"></trade-detail-cell>
        <trade-detail-cell label="保单时间" :value="trade.pay.payId" mode="number"></trade-detail-cell>
        <trade-detail-cell label="保单单价" :value="trade.pay.payId" mode="number"></trade-detail-cell>
        <trade-detail-cell label="附加险" :value="trade.pay.payId" mode="number"></trade-detail-cell>
        <trade-detail-cell label="保单分数" :value="trade.pay.payId" mode="number"></trade-detail-cell>
        <trade-detail-cell label="保单总价" :value="trade.pay.payId" mode="number"></trade-detail-cell>
        <trade-detail-cell label="生成时间" :value="trade.pay.payId" mode="number"></trade-detail-cell>
        <trade-detail-cell label="总计费用" :value="trade.pay.payId" mode="number"></trade-detail-cell>
        <trade-detail-cell label="优惠金额" :value="trade.pay.payId" mode="number"></trade-detail-cell>
        <trade-detail-cell label="实际支付金额" :value="trade.pay.payId" mode="number"></trade-detail-cell>
      </view>
    </view>

    <!-- <view class="fm-trade-detail-card">
      <view class="fm-trade-detail-card__hd">取餐信息</view>
      <view class="fm-trade-detail-card__bd">
        <trade-detail-cell label="取餐门店" :value="trade.fetch.fetchBranchName"></trade-detail-cell>
        <trade-detail-cell label="取餐状态" :value="trade.fetch.fetchStatus"></trade-detail-cell>
        <trade-detail-cell label="取餐时间" :value="trade.fetch.fetchTimestamp" mode="timestamp"></trade-detail-cell>
      </view>
    </view> -->
    <fm-copyright></fm-copyright>
  </view>
</template>

<script>
import FmImage from '@/components/FmImage'
import FmPrice from '@/components/FmPrice'
import FmCopyright from '@/components/FmCopyright'
import TradeFetchCard from './TradeFetchCard'
import TradeDetailOrderGroup from './TradeDetailOrderGroup'
import TradeDetailCell from './TradeDetailCell'
export default {
  components: {
    FmImage,
    FmPrice,
    FmCopyright,
    TradeFetchCard,
    TradeDetailOrderGroup,
    TradeDetailCell
  },
  data () {
    return {
      tradeId: '',
      trade: {
        fetch: {
          fetchCode: 'A123',
          fetchCodeImage: 'http://p9w82by1e.bkt.clouddn.com/1528274617.png',
          before: 6,
          fetchBranchName: '门店名称1',
          tradeId: 'td10',
          fetchStatus: '已取餐',
          fetchTimestamp: 1528370499
        },
        info: {
          branchName: '门店名称1',
          tradeId: 'td10',
          tradeStatus: 0,
          tradeAmount: 4000,
          tradeNumber: 3,
          createdTimestamp: 1528360512,
          tradeType: '门店自提'
        },
        pay: {
          payType: 'wechatpay',
          payId: 'payId',
          payTimestamp: 1528360512
        },
        order: [
          {
            orderId: 'orderId01',
            goodName: '商品名称1商品名称1商品名称1商品名称1',
            goodImage: '',
            skuLabel: '大杯, 去冰',
            goodNumber: 1,
            goodAmount: 2000
          },
          {
            orderId: 'orderId02',
            goodName: '商品名称2',
            goodImage: '',
            skuLabel: '大杯, 去冰',
            goodNumber: 1,
            goodAmount: 1500
          }
        ]
      }
    }
  },
  methods: {
    getQuery () {
      const query = this.$root.$mp.query
      this.tradeId = query.tradeId
    }
  },
  mounted () {
    // this.setNavigationBarTitle()
    this.getQuery()
  }
}
</script>

<style lang="less">
@import "../../asset/style/_variable.less";

.fm-trade-detail {
  background-color: @--background-color-base;
  min-height: 100%;
  overflow: hidden;
}

.fm-trade-detail-card {
  position: relative;
  display: block;
  width: 95%;
  margin: auto;
  margin-top: 20rpx;
  padding: 0 16px;
  background-color: @--fill-base;
  border-radius: @--border-radius-small;
  border: @--border-width-base @--border-style-base @--border-color-extra-light;
  overflow: hidden;
}

.fm-trade-detail-card__hd {
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

.fm-trade-detail-card__bd {
  position: relative;
  display: block;
}

.fm-trade-detail-card-ft {
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
</style>
