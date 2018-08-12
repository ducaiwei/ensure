<template>
  <view class="fm-trade-detail">
    <view v-if="trade">
      <view class="fm-trade-detail-card">
        <view class="fm-trade-detail-card__hd">保单详情</view>
        <view class="fm-trade-detail-card__bd"></view>
          <trade-detail-cell label="订单编号" :value="trade.oid"></trade-detail-cell>
          <trade-detail-cell label="保单号" :value="trade.insuranceCode" v-if="trade.insuranceCode"></trade-detail-cell>
          <trade-detail-cell label="保单号" :value="'保单号生成中...'" v-else></trade-detail-cell>
          <trade-detail-cell label="订单状态" :value="trade.orderStatusDesc" mode="number"></trade-detail-cell>
      </view>
       <view class="fm-trade-detail-card">
        <view class="fm-trade-detail-card__hd">投保信息</view>
        <view class="fm-trade-detail-card__bd"></view>
          <trade-detail-cell label="投保酒店" :value="trade.hotelName"></trade-detail-cell>
           <view class="check-list-item" v-for="(item ,index) in trade.hotelHallBean.hotelHalls" :key="index">
            <image :src="item.hallPicture" class="hall-img"/>
            <view class="hall-name">
              <text>
                {{item.hallName}}
              </text>
              <text>
                ({{item.hallAreaDesc}})
              </text>
            </view>
            <text class="block-text price">{{item.insurancePrice / 100}}￥</text>
          </view>
        <view class="fm-trade-detail-card__hd" style="height: 20rpx"></view>
          <trade-detail-cell label="保险开始时间" :value="trade.hotelHallBean.startDateStr"></trade-detail-cell>
          <trade-detail-cell label="保险结束时间" :value="trade.hotelHallBean.endDateStr"></trade-detail-cell>
          <trade-detail-cell label="投保公司" :value="trade.companyName"></trade-detail-cell>
          <trade-detail-cell label="统一社会信用码" :value="trade.uniformSocialCreditCode"></trade-detail-cell>
          <trade-detail-cell label="联系人" :value="trade.contactsName"></trade-detail-cell>
          <trade-detail-cell label="联系电话" :value="trade.contactsMobile"></trade-detail-cell>
          <trade-detail-cell label="购买份数" :value="trade.hotelHallBean.buyCount" mode="number"></trade-detail-cell>
          <trade-detail-cell label="会议名称" :value="trade.meetingName"></trade-detail-cell>
      </view>
      <view class="fm-trade-detail-card item-card">
        <view class="fm-trade-detail-card__hd">保障内容
        </view>
        <view class="protection-view">
            <fm-navbar @change="handleChange" v-model="navbarChecked" ref="navBar" :options="result" size="small"></fm-navbar>
            <swiper @change="handleChange" :current-item-id="navbarChecked" skip-hidden-item-layout duration="300" class="protect-content-swiper">
                <swiper-item :item-id="index"  v-for="(con ,index) in result" :key="index">
                   <scroll-view scroll-with-animation="true" scroll-y :scroll-top="leftToTop" style="height: 400rpx">
                    <view class="content-swipe-item">
                      <view class="swipe-table-content">
                        <view class="tbale-body">
                          <view class="table-tr"  v-for="(d, index2) in con.details" :key="index2">
                            <text>{{d.content}}</text>
                            <text>{{d.detailContent}}</text>
                          </view>
                        </view>
                      </view>
                    </view>
                  </scroll-view>
                </swiper-item>
            </swiper>
          </view>
      </view>
      <view class="fm-trade-detail-card">
        <view class="fm-trade-detail-card__hd">附加险详情</view>
        <view class="fm-trade-detail-card__bd"  v-if="trade.extraInsuranceBean.extraInsurances.length > 0">
          <view v-for="(extra,index) in trade.extraInsuranceBean.extraInsurances" :key="index">
            <trade-detail-cell :label="extra.name" :value="'￥' + (extra.price / 100)" mode="number"></trade-detail-cell>
            <view class="fm-trade-detail-card__hd" style="height: 0" v-if="index < trade.extraInsuranceBean.extraInsurances.length - 1"></view>
          </view>
          <trade-detail-cell label="购买份数" mode="number" :value="trade.extraInsuranceBean.buyCount"></trade-detail-cell>
        </view>
        <view v-else class="fm-trade-detail-card__bd null-text"> 
          <trade-detail-cell label="暂无附加险" mode="number"></trade-detail-cell>
        </view>
      </view>
      <fm-copyright></fm-copyright>
    </view>
    <view class="loading-box" v-else>数据拉取中...</view>
  </view>
</template>

<script>
import FmImage from '@/components/FmImage'
import FmCopyright from '@/components/FmCopyright'
import TradeDetailCell from './TradeDetailCell'
import FmNavbar from '@/components/FmOrderNavbar'
import { mapState, mapActions } from 'vuex'

export default {
  components: {
    FmImage,
    FmCopyright,
    TradeDetailCell,
    FmNavbar
  },
  data () {
    return {
      tradeId: '',
      trade: null,
      totalInterval: null,
      result: null,
      navbarChecked: 0
    }
  },
  computed: {
    ...mapState(['userToken'])
  },
  methods: {
    ...mapActions(['queryOrderDetailAction', 'getContentAction']),
    handleChange (e) {
      if (typeof e === 'number') {
        this.navbarChecked = e
      } else {
        this.navbarChecked = e.mp.detail.currentItemId
      }
    },
    getQuery () {
      const query = this.$root.$mp.query
      this.tradeId = query.tradeId
      this.queryOrderDetailAction({oid: this.tradeId, token: this.userToken}).then(res => {
        if (res.code === '100') {
          this.trade = res.result
          console.log(this.trade)
        }
      })
    },
    getContent () {
      this.getContentAction({token: this.userToken}).then(res => {
        if (res.code === '100') {
          this.result = res.result
        }
      })
    }
  },
  mounted () {
    this.getQuery()
    this.getContent()
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

<style lang="less" scoped>
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
.item-card {
  padding-bottom: 20rpx;
}
.item-card-title {
  padding-left: 20rpx;
  padding-top: 20rpx;
}
.check-list-item {
  display: flex;
  padding: 10rpx 20rpx;
  margin-top: 10rpx;
  background-color: #f7f7f7;
  .hall-img {
    display: block;
    width: 100rpx;
    height: 100rpx;
  }
  .block-text {
    display: block;
    text-align: center;
    line-height: 100rpx;
    .item-text-font-size();
  }
  .text-label {
    padding-left: 30rpx;
  }
  .hall-name {
    width: 55%;
    text {
      display: block;
      padding-top: 10rpx;
      text-align: center;
      .item-text-font-size();
    }
  }
  .price {
    color: red;
  }
}
.protect-content-box {
  display: block;
}
.protect-content-item {
  .item-flex();
  text {
    display: block;
    flex: 1;
    text-align: center;
    .item-text-font-size();
  }
  .content-name {
    text-align: left;
  }
}
.protect-content-swiper {
  width: 100%;
  height: 400rpx;
}
.content-swipe-item {
  width: 100%;
}
.swipe-item-title {
  display: blcok;
  padding: 20rpx;
  text {
    display: block;
    font-size: 24rpx;
  }
}
.swipe-table-content {
  display: block;
  width: 95%;
  margin: auto;
  border-radius: 2px;
}
.table-head {
  display: flex;
  align-items: center;
  text {
    display: block;
    flex: 1;
    font-size: 28rpx;
    text-align: center;
  }
}
.protection-view {
  width: 100%;
  margin: auto;
  margin-top: 20rpx;
  border: 1px solid rgba(204,204,204, .3);
}
.table-tr {
  display: flex;
  padding: 20rpx 0;
  width: 100%;
  align-items: center;
  border-bottom: 1px dashed rgba(204,204,204, .3);
  text {
    flex: 1;
    text-align: left;
    display: inline-block;
    font-size: 24rpx;
    vertical-align: middle;
  }
  text:last-child {
    flex: 1;
    margin-left: 20rpx;
  }
}
.null-text {
  text-align: center;
}
</style>
