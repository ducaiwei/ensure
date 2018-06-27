<template>
  <view class="fm-order-mall">
    <block v-if="!emptySorts">
      <scroll-view scroll-y scroll-with-animation class="fm-order-mall__aside">
        <fm-nav-menu v-if="!emptySorts" @change="handleNavChange(checked)" :options="sorts" v-model="checked" class-name="fm-order-mall__aside__nav"></fm-nav-menu>
      </scroll-view>
      <scroll-view @scrolltolower="loadMore" scroll-y scroll-with-animation enable-back-to-top class="fm-order-mall__main">
        <order-goods v-if="!emptyGoods" :goods="goods"></order-goods>
        <fm-empty v-else text="该分类下暂无商品"></fm-empty>
      </scroll-view>
    </block>

    <fm-empty v-else text="该门店暂无商品可售，换其他门店试试"></fm-empty>

    <order-cart></order-cart>
  </view>
</template>

<script>
import FmNavMenu from '@/components/FmNavMenu'
import FmEmpty from '@/components/FmEmpty'
import OrderGoods from './OrderGoods'
import OrderCart from './OrderCart'
export default {
  name: 'OrderMall',
  components: {
    FmNavMenu,
    FmEmpty,
    OrderGoods,
    OrderCart
  },
  data () {
    return {
      sorts: [],
      emptySorts: false,
      checked: undefined,
      goods: [],
      emptyGoods: false,
      loading: false
    }
  },
  methods: {
    mockSorts () {
      const sorts = []
      let i = 0
      while (i < 20) {
        sorts.push({
          value: i.toString(),
          label: `分组名称${i}`
        })
        i++
      }
      this.sorts = sorts
    },
    mockGoods () {
      const list = []
      let i = 0
      while (i < 10) {
        list.push({
          avatar: this.$random.image(),
          title: `商品名称${i}`,
          desc: `商品副标题${i}商品副标题${i}商品副标题${i}`,
          price: 2400
        })
        i++
      }
      this.goods = list
    },
    handleNavChange (checked) {
      console.log('根据已选中分类，获取商品列表。checked:', checked)
      this.mockGoods()
    },
    loadMore () {
      this.$wxp.showModal({
        title: 'log',
        content: '下拉触底，加载更多商品'
      })
    }
  },
  mounted () {
    this.mockSorts()
    this.mockGoods()
  }
}
</script>

<style lang="less">
@import "../../asset/style/_variable.less";
.fm-order-mall {
  display: flex;
  height: calc(100% - 48px);
  box-sizing: border-box;
  background-color: @--background-color-base;
}

.fm-order-mall__aside {
  flex: none;
  height: 100%;
  width: 96px;
  box-sizing: inherit;
  overflow: hidden;
}

.fm-order-mall__aside__nav {
  margin-bottom: 24px;
}

.fm-order-mall__main {
  position: relative;
  flex: auto;
  height: 100%;
  overflow: hidden;
  box-sizing: inherit;
  background-color: @--fill-base;
}

.fm-order-mall__main__nav {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  height: 32px;
  line-height: 32px;
  font-size: @--font-size-base;
  font-weight: @--font-weight-blod;
  box-sizing: inherit;
}
</style>
