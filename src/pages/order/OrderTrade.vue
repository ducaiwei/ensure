<template>
  <scroll-view @scrolltolower="loadMore" scroll-y scroll-with-animation enable-back-to-top class="fm-order-trade">

    <!-- 状态筛选picker，start -->
    <fm-picker @change="handlePickerChange(pickerSelected)" v-model="pickerSelected" :range="pickerOptions" range-key="label">
      <fm-button mode="fab" type="primary" size="m" icon="icon-filter-variant"></fm-button>
    </fm-picker>
    <!-- 状态筛选picker，end -->

    <!-- 订单列表，start -->
    <order-trade-group :list="trade.list" v-if="!empty"></order-trade-group>

    <fm-empty v-else text="暂无订单，快下一单试试吧"></fm-empty>

    <fm-copyright></fm-copyright>
    <!-- 订单列表，end -->
  </scroll-view>
</template>

<script>
import FmButton from '@/components/FmButton'
import FmPicker from '@/components/FmPicker'
import FmEmpty from '@/components/FmEmpty'
import FmCopyright from '@/components/FmCopyright'
import OrderTradeGroup from './OrderTradeGroup'
export default {
  name: 'OrderTrade',
  components: {
    FmButton,
    FmPicker,
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
      loading: false
    }
  },
  methods: {
    handlePickerChange (val) {
      console.log('根据已选订单类型获取订单，订单类型:', val)
    },
    mockTrade () {
      let list = []
      let i = 10
      let order = []
      let oi = 3
      while (oi > 0) {
        order.push({
          orderId: 'orderId' + oi,
          goodName: '商品名称' + oi,
          skuLabel: '大杯, 去冰',
          goodNumber: oi
        })
        oi--
      }
      while (i > 0) {
        list.push({
          info: {
            branchName: '门店名称' + i,
            tradeId: 'td' + i,
            tradeStatus: this.$random.number(0, 4),
            tradeAmount: this.$random.number(1000, 5000),
            tradeNumber: this.$random.number(1, 9),
            code: 'code' + i
          },
          order: order
        })
        i--
      }
      this.trade = {
        list: list,
        pages: 10,
        total: 100
      }
    },
    loadMore () {
      this.$wxp.showModal({
        title: 'log',
        content: '下拉触底，加载更多商品'
      })
    }
  },
  mounted () {
    this.mockTrade()
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
