<template>
  <view class="fm-trade-detail">
    <view v-if="trade">
      <view class="fm-trade-detail-card">
        <view class="fm-trade-detail-card__hd">订单信息</view>
        <view class="fm-trade-detail-card__bd">
          <trade-detail-cell label="订单编号" :value="trade.oid"></trade-detail-cell>
          <trade-detail-cell label="保单号" :value="trade.insuranceCode" v-if="trade.insuranceCode"></trade-detail-cell>
          <trade-detail-cell label="保单号" :value="'保单号生成中...'" v-else></trade-detail-cell>
          <trade-detail-cell label="订单状态" :value="trade.orderStatusDesc" mode="number"></trade-detail-cell>
          <!-- <trade-detail-cell label="创建时间" :value="trade.payTimeStr" mode="timestamp"></trade-detail-cell> -->
          <!-- <trade-detail-cell label="生成时间" :value="trade.pay.payId"></trade-detail-cell> -->
          <trade-detail-cell label="总计费用" :value="'￥' + (trade.totalAmount / 100)"></trade-detail-cell>
          <trade-detail-cell label="优惠金额" :value="'￥' + (trade.promotionAmount / 100)"></trade-detail-cell>
          <trade-detail-cell label="实际支付金额" :value="'￥'+ (trade.payAmount / 100)"></trade-detail-cell>
        </view>
      </view>
      <view class="fm-trade-detail-card">
        <view class="fm-trade-detail-card__hd">保单详情</view>
        <view class="fm-trade-detail-card__bd">
          <trade-detail-cell label="保单号" :value="trade.insuranceCode" v-if="trade.insuranceCode"></trade-detail-cell>
          <trade-detail-cell label="保单号" :value="'保单号生成中...'" v-else></trade-detail-cell>
          <trade-detail-cell label="保单时间" :value="trade.hotelHallBean.endDateStr"></trade-detail-cell>
          <view v-for="(hall,index) in trade.hotelHallBean.hotelHalls" :key="index">
            <trade-detail-cell label="展厅名称" :value="hall.hallName"></trade-detail-cell>
            <trade-detail-cell label="面积" :value="hall.hallAreaDesc"></trade-detail-cell>
            <trade-detail-cell label="保单单价" :value="'￥' + (hall.insurancePrice / 100)"></trade-detail-cell>
          </view>
        </view>
      </view>
      <view class="fm-trade-detail-card" v-if="trade.extraInsuranceBean.extraInsurances.length > 0">
        <view class="fm-trade-detail-card__hd">附加险详情</view>
        <view class="fm-trade-detail-card__bd" v-for="(extra,index) in trade.extraInsuranceBean.extraInsurances" :key="index">
          <trade-detail-cell label="附加险" :value="extra.name" mode="number"></trade-detail-cell>
          <trade-detail-cell label="保单单价" :value="'￥' + (extra.price / 100)"></trade-detail-cell>
        </view>
      </view>
      <fm-copyright></fm-copyright>
    </view>
    <view class="loading-box" v-else>数据拉取中...</view>
  </view>
</template>

<script>
import FmImage from '@/components/FmImage'
import FmPrice from '@/components/FmPrice'
import FmCopyright from '@/components/FmCopyright'
import TradeFetchCard from './TradeFetchCard'
import TradeDetailOrderGroup from './TradeDetailOrderGroup'
import TradeDetailCell from './TradeDetailCell'
import { mapState, mapActions } from 'vuex'

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
      trade: null,
      totalInterval: null
    }
  },
  computed: {
    ...mapState(['userToken'])
  },
  methods: {
    ...mapActions(['queryOrderDetailAction']),
    getQuery () {
      const query = this.$root.$mp.query
      this.tradeId = query.tradeId
      this.queryOrderDetailAction({oid: this.tradeId, token: this.userToken}).then(res => {
        if (res.code === '100') {
          this.trade = res.result
        }
      })
    }
  },
  mounted () {
    this.getQuery()
    this.totalInterval = setInterval(() => {
      if (!this.trade.insuranceCode) {
        this.getQuery()
      } else {
        clearInterval(this.totalInterval)
      }
    }, 3000)
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
.loading-box {
  margin-top: 300rpx;
  font-size: 24rpx;
  color: #ccc;
  text-align: center;
}
</style>
