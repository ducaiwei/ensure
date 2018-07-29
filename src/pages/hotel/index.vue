<template>
  <view>
    <view v-if="hotelDetail">
      <view class="head-box">
        <hotel-card :hotel="hotelDetail"></hotel-card>
        <fm-navbar v-model="navbarChecked" :options="options" size="small"></fm-navbar>
      </view>
      <swiper @change="handleChange" :current-item-id="navbarChecked" skip-hidden-item-layout duration="300" class="fm-order-swiper">
        <swiper-item item-id="展厅">
          <hotel-mall :hotelHalls="hotelDetail.hotelHalls" v-if="hotelDetail.hotelHalls.length > 0"></hotel-mall>
          <view class="null-text" v-else>暂无数据</view>
        </swiper-item>
        <swiper-item item-id="我的订单">
         <order-trade></order-trade>
        </swiper-item>
      </swiper>
    </view>
    <view v-else>
    </view>
  </view>
</template>

<script>
import HotelCard from './HotelCard'
import OrderTrade from '../order/OrderTrade'
import FmNavbar from '@/components/FmNavbar'
import HotelMall from './Hotel'
import { mapState,mapActions } from 'vuex'
import { getDetailMixin } from "../../mixin/methods.js";
export default {
  components: {
    HotelCard,
    FmNavbar,
    OrderTrade,
    HotelMall
  },
  data () {
    return {
      options: ['展厅', '我的订单'],
      navbarChecked: '展厅'
    }
  },
  computed: {
    ...mapState(['userToken', 'hotelDetail'])
  },
  mixins: [getDetailMixin],
  methods: {
    ...mapActions(['getHotelDetailAction']),
    doRefresh () {
      setTimeout(() => {
        this.$wxp.stopPullDownRefresh()
      }, 500)
    },
    handleChange (e) {
      this.navbarChecked = e.mp.detail.currentItemId
    }
  },
  mounted () {
    if(this.$mp.query.hotelId) {
      this.getDetail(this.$mp.query.hotelId, 'detail')
    }
  }
}
</script>

<style lang="less">
@import "../../asset/style/_variable.less";

.fm-order-swiper {
  height: calc(~"100vh - 88px - 36px");
}
.head-box {
  display: block;
  height: 175.vh;
}
.null-text {
  font-size: 28rpx;
  color: #ccc;
  text-align: center;
}
</style>
