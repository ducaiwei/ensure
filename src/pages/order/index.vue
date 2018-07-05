<template>
  <view>
    <order-card></order-card>
    <fm-navbar v-model="navbarChecked" :options="options" size="small"></fm-navbar>
    <swiper @change="handleChange" :current-item-id="navbarChecked" skip-hidden-item-layout duration="300" class="fm-order-swiper">
      <swiper-item item-id="展厅">
        <!-- <order-mall></order-mall> -->
      </swiper-item>
      <swiper-item item-id="我的订单">
+        <order-trade></order-trade>
+      </swiper-item>
    </swiper>
  </view>
</template>

<script>
import OrderCard from './OrderCard'
// import OrderMall from './OrderMall'
import OrderTrade from './OrderTrade'
import FmNavbar from '@/components/FmNavbar'
export default {
  components: {
    OrderCard,
    // OrderMall,
    OrderTrade,
    FmNavbar
  },
  data () {
    return {
      options: ['展厅'],
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
    }
  },
  created () {
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
</style>
