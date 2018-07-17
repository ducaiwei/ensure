<template>
  <view>
    <view class="head-box">
      <hotel-card></hotel-card>
      <fm-navbar v-model="navbarChecked" :options="options" size="small"></fm-navbar>
    </view>
    <swiper @change="handleChange" :current-item-id="navbarChecked" skip-hidden-item-layout duration="300" class="fm-order-swiper">
      <swiper-item item-id="展厅">
        <hotel-mall></hotel-mall>
      </swiper-item>
      <swiper-item item-id="我的订单">
+        <order-trade></order-trade>
+      </swiper-item>
    </swiper>
  </view>
</template>

<script>
import HotelCard from './HotelCard'
import OrderTrade from '../order/OrderTrade'
import FmNavbar from '@/components/FmNavbar'
import HotelMall from './Hotel'
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
  },
  methods: {
    doRefresh () {
      setTimeout(() => {
        this.$wxp.stopPullDownRefresh()
      }, 500)
    },
    handleChange (e) {
      this.navbarChecked = e.mp.detail.currentItemId
    },
    getLocation () {
      this.$wxp.getLocation({
        type: 'gcj02'
      }).then(res => {
        console.log(res)
        this.location = {
          latitude: res.latitude,
          longitude: res.longitude
        }
      })
    }
  },
  created () {
    this.getLocation()
  },
  onPullDownRefresh () {
    this.doRefresh()
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
</style>
