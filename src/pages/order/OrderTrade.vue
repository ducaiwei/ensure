<template>
  <scroll-view scroll-y scroll-with-animation enable-back-to-top class="fm-order-trade">

    <!-- 状态筛选picker，start -->
    <!-- <fm-picker @change="handlePickerChange(pickerSelected)" v-model="pickerSelected" :range="pickerOptions" range-key="label">
      <fm-button mode="fab" type="primary" size="m" icon="icon-filter-variant"></fm-button>
    </fm-picker> -->
    <!-- 状态筛选picker，end -->

    <!-- 订单列表，start -->
    <order-trade-group :list="orders" v-if="orders.length > 0"></order-trade-group>

    <fm-empty v-if="orders.length <= 0" text="暂无订单，快下一单试试吧"></fm-empty>

    <!-- <fm-copyright></fm-copyright> -->
    <!-- 订单列表，end -->
  </scroll-view>
</template>

<script>
import FmButton from '@/components/FmButton'
// import FmPicker from '@/components/FmPicker'
import FmEmpty from '@/components/FmEmpty'
import FmCopyright from '@/components/FmCopyright'
import OrderTradeGroup from './OrderTradeGroup'
import { mapState, mapActions } from 'vuex'
export default {
  name: 'OrderTrade',
  components: {
    FmButton,
    // FmPicker,
    FmEmpty,
    FmCopyright,
    OrderTradeGroup
  },
  data () {
    return {
      pickerSelected: 0,
      pickerOptions: [
        {
          value: 0,
          label: '全部'
        },
        {
          value: 1,
          label: '待取餐'
        },
        {
          value: 2,
          label: '退款'
        }
      ],
      trade: {
        list: [],
        pages: 0,
        total: 0
      },
      empty: false,
      loading: false,
      orders: [],
      loading: true
    }
  },
  computed: {
    ...mapState(['userToken'])
  },
  methods: {
    ...mapActions(['queryOrdersAction']),
    handlePickerChange (val) {
      console.log('根据已选订单类型获取订单，订单类型:', val)
    },
    queryOrders () {
      this.queryOrdersAction({token: this.userToken}).then(res => {
        this.loading = false
        if (res.code === '100'){
          this.orders = res.result.list
        }
      })
    },
    loadMore () {
    }
  },
  mounted () {
    this.queryOrders()
  }
}
</script>

<style lang="less">
@import "../../asset/style/_variable.less";

.fm-order-trade {
  display: flex;
  height: 100%;
  box-sizing: border-box;
  background-color: @--background-color-base;
}

</style>
