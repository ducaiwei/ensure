<template>
<view class="container">
  <view class="index" style="height:72.5vh;position: absolute; top: 0;width: 100%;overflow:scroll">
    <view class="index-left" style="">
      <scroll-view scroll-with-animation="true" scroll-y  @scroll="leftScroll" :scroll-top="leftToTop" style="height: 100vh">
        <view v-for="(item, index) in hotelHalls" :key="index" @tap="jumpToSick" :data-id="item.hallFloorType" 
        :style="{'background-color':(item.hallFloorType === currentLeftSelect ? '#fff' : '')}" class="index-left-text">
          <view class="store-text" :id="item.hallFloorType">
          {{item.hallFloorType}}
          </view>
        </view>
      </scroll-view>
    </view>
    <view class="index-right">
      <scroll-view scroll-with-animation="true" scroll-y style="height: 100vh;" @scroll="rightScroll" :scroll-into-view="toView" bindscrolltolower="lower">
          <view v-for="(item, index1) in hotelHalls" :key="index1" :id="item.hallFloorType">
            <view class="index-right-text-top">{{item.hallFloorType}}</view>
            <hotel-goods v-if="!emptyGoods" :goods="item.details" @addQuantity="addQuantity"></hotel-goods>
          </view>
      </scroll-view>
    </view>
  </view>
  <order-cart :cart="carts" :prices="prices" @addQuantity="addQuantity"></order-cart>
</view>
</template>

<script>
import FmNavMenu from '@/components/FmNavMenu'
import FmEmpty from '@/components/FmEmpty'
import HotelGoods from './HotelGoods'
import OrderCart from '../order/OrderCart'
import FmIcon from '@/components/FmIcon'
import { mapState, mapActions } from 'vuex'
export default {
  name: 'HotelMall',
  props: {
    hotelHalls: {
      type: Array,
      default: []
    }
  },
  components: {
    FmNavMenu,
    FmEmpty,
    HotelGoods,
    OrderCart,
    FmIcon
  },
  data () {
    return {
      halls: this.hotelHalls,
      toView: null,                 // 左 => 右联动 右scroll-into-view 所需的id
      currentLeftSelect: this.hotelHalls[0].hallFloorType,      // 当前左侧选择的
      eachRightItemToTop: [],       // 右侧每类数据到顶部的距离（用来与 右 => 左 联动时监听右侧滚动到顶部的距离比较）
      leftToTop: 0,
      carts: [],
      prices: {},
      selectedHallIds: []
    }
  },
  computed: {
    ...mapState(['userToken', 'hotels'])
  },
  methods: {
    ...mapActions(['getHallsPriceAction', 'setSelectedItemsAction', 'setSeletedIdsAction']),
    getEachRightItemToTop () {
      var obj = {};
      var totop = 0;
      const RIGHT_BAR_HEIGHT = 30;      // 右侧每一类的 bar 的高度（固定）
      const RIGHT_ITEM_HEIGHT = 100;     // 右侧每个子类的高度（固定）
      obj[this.hotelHalls[0].hallFloorType] = totop      // 右侧第一类肯定是到顶部的距离为 0
      for (let i = 1; i < (this.hotelHalls.length + 1); i++) {  // 循环来计算每个子类到顶部的高度
        totop += (RIGHT_BAR_HEIGHT + this.hotelHalls[i-1].details.length * RIGHT_ITEM_HEIGHT)
        obj[this.hotelHalls[i] ? this.hotelHalls[i].hallFloorType : 'last'] = totop    // 这个的目的是 例如有两类，最后需要 0-1 1-2 2-3 的数据，所以需要一个不存在的 'last' 项，此项即为第一类加上第二类的高度。
      }
      this.eachRightItemToTop = obj
      return obj
    },
    rightScroll (e) {   // 监听右侧的滚动事件与 eachRightItemToTop 的循环作对比 从而判断当前可视区域为第几类，从而渲染左侧的对应类。
      const LEFT_ITEM_HEIGHT = 30
      for (let i = 0; i < this.hotelHalls.length; i++) {
        let left = this.eachRightItemToTop[this.hotelHalls[i].hallFloorType]
        let right = this.eachRightItemToTop[this.hotelHalls[i + 1] ? this.hotelHalls[i+1].hallFloorType : 'last']
        if (e.mp.detail.scrollTop < right && e.mp.detail.scrollTop >= left) {
          this.currentLeftSelect = this.hotelHalls[i].hallFloorType,
          this.leftToTop = LEFT_ITEM_HEIGHT * i
        }
      }
    },
    jumpToSick (e) {    // 左侧类的点击事件
      this.toView = e.target.id || e.target.dataset.id,
      this.currentLeftSelect = e.target.id || e.target.dataset.id
    },
    lower: function (e) {
    },
    addQuantity (item, type) {
      if (type === 'plus') {
        this.selectedHallIds.push(item.id)
        this.carts.push(item)
      } else {
        if (this.carts.length === 1) {
          this.carts = []
          this.selectedHallIds = []
        } else {
          let index = 0
          for (let i = 0; i < this.carts.length; i++) {
            const it = this.carts[i]
            if (it.id === item.id) {
              index = i
              break
            }
          }
          this.carts = this.carts.splice(index, 1)
          let idx = this.selectedHallIds.indexOf(item.id)
          this.selectedHallIds = this.selectedHallIds.splice(idx, 1)
        }
      }
      this.setSelectedItemsAction(this.carts)
      this.setSeletedIdsAction(this.selectedHallIds)
      this.getHallsPriceAction({token: this.userToken, hallIds: this.selectedHallIds.join(',')})
        .then(res => {
          if (res.code === '100') {
            this.prices = res.result
          }
      })
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.getEachRightItemToTop()
    })
  }
}
</script>

<style lang="less">
@import "../../asset/style/_variable.less";
.container {
  position: relative;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}

::-webkit-scrollbar {
  width: 0;
  height: 0;
  color: transparent;
}

.index {
  display: flex;
}

.index-top {
  height: 200px;
}

.index-left {
  height: 100vh;
  flex: 1;
  background: #f5f7f9;
}

.index-right {
  flex: 3;
}

.index-left-text {
  padding: 0rpx 10rpx;
  height: 50px;
  line-height: 50px;
}

.index-right-text {
  box-sizing: border-box;
  padding: 40rpx 10rpx;
  height: 60px;
}

.index-right-text-top {
  padding-left: 16px;
  height: 30px;
  line-height: 30px;
  background: #f5f7f9;
}

.mark {
  position: absolute;
  top: 200px;
  height: 100vh;
  width: 100%;
  z-index: 10;
}
.store-text {
  padding-left: 24px;
}
</style>
