<template>
<view class="container">
  <view class="index" style="position: absolute; top: 0;width: 100%;overflow:scroll">
    <view class="left-scroll-box">
      <scroll-view class="left-scroll" scroll-with-animation="false" scroll-y  @scroll="leftScroll" :scroll-top="leftToTop">
        <view v-for="(item, index) in hotelHalls" :key="index" @tap="jumpToSick" :data-id="'f' + item.hallFloorType" 
        :style="{'background-color':('f' + item.hallFloorType === currentLeftSelect ? '#fff' : '')}" class="index-left-text">
          <view class="store-text" :id="'f' + item.hallFloorType">
          {{item.hallFloorType}}楼
          </view>
        </view>
      </scroll-view>
    </view>
    <view class="right-scroll-box">
      <scroll-view class="right-scroll" scroll-with-animation="false" scroll-y  @scroll="rightScroll" :scroll-into-view="toView" @scrolltolower="lower">
          <view v-for="(item, index1) in hotelHalls" :key="index1" :id="'f' + item.hallFloorType">
            <view class="index-right-text-top">{{item.hallFloorType}}楼</view>
            <hotel-goods v-if="!emptyGoods" :goods="item.details" @addQuantity="addQuantity"></hotel-goods>
          </view>
      </scroll-view>
    </view>
  </view>
  <order-cart :cart="selectedItems" :prices="prices" @addQuantity="addQuantity"></order-cart>
</view>
</template>

<script>
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
    FmEmpty,
    HotelGoods,
    OrderCart,
    FmIcon
  },
  data () {
    return {
      halls: this.hotelHalls,
      toView: null,                 // 左 => 右联动 右scroll-into-view 所需的id
      currentLeftSelect: 'f' + this.hotelHalls[0].hallFloorType,      // 当前左侧选择的
      eachRightItemToTop: [],       // 右侧每类数据到顶部的距离（用来与 右 => 左 联动时监听右侧滚动到顶部的距离比较）
      leftToTop: 0,
      carts: [],
      prices: {},
      selectedHallIds: [],
      canScroll: true
    }
  },
  computed: {
    ...mapState(['userToken', 'hotels' , 'selectedItems'])
  },
  methods: {
    ...mapActions(['getHallsPriceAction', 'setSelectedItemsAction', 'setSeletedIdsAction']),
    getEachRightItemToTop () {
      var obj = {};
      var totop = 0;
      const RIGHT_BAR_HEIGHT = 30;      // 右侧每一类的 bar 的高度（固定）
      const RIGHT_ITEM_HEIGHT = 100;     // 右侧每个子类的高度（固定）
      obj['f' + this.hotelHalls[0].hallFloorType] = totop      // 右侧第一类肯定是到顶部的距离为 0
      for (let i = 1; i < (this.hotelHalls.length + 1); i++) {  // 循环来计算每个子类到顶部的高度
        totop += (RIGHT_BAR_HEIGHT + this.hotelHalls[i-1].details.length * RIGHT_ITEM_HEIGHT)
        obj[this.hotelHalls[i] ? 'f' + this.hotelHalls[i].hallFloorType : 'last'] = totop    // 这个的目的是 例如有两类，最后需要 0-1 1-2 2-3 的数据，所以需要一个不存在的 'last' 项，此项即为第一类加上第二类的高度。
      }
      this.eachRightItemToTop = obj
    },
    rightScroll (e) {   // 监听右侧的滚动事件与 eachRightItemToTop 的循环作对比 从而判断当前可视区域为第几类，从而渲染左侧的对应类。
      if (!this.canScroll) {
        return
      }
      this.canScroll = false
      this.toView = null
      const LEFT_ITEM_HEIGHT = 50
      for (let i = 0; i < this.hotelHalls.length; i++) {
        let left = this.eachRightItemToTop['f' + this.hotelHalls[i].hallFloorType]
        let right = this.eachRightItemToTop[this.hotelHalls[i + 1] ? 'f' + this.hotelHalls[i+1].hallFloorType : 'last']
          if (e.mp.detail.scrollTop < right && e.mp.detail.scrollTop >= left) {
            this.currentLeftSelect = 'f' + this.hotelHalls[i].hallFloorType
            this.leftToTop = LEFT_ITEM_HEIGHT * i
            this.canScroll = true
          }
      }
    },
    jumpToSick (e) {    // 左侧类的点击事件
      this.toView = e.target.id || e.target.dataset.id
      this.currentLeftSelect = e.target.id || e.target.dataset.id
    },
    lower: function (e) {
      setTimeout(() => {
        const LEFT_ITEM_HEIGHT = 50
        const l =  this.hotelHalls.length
        this.currentLeftSelect = 'f' + this.hotelHalls[l - 1].hallFloorType
        this.leftToTop = LEFT_ITEM_HEIGHT * (l - 1)
      }, 200)
    },
    addQuantity (item, type) {
      if (type === 'plus') {
        this.selectedHallIds.push(item.id)
        this.carts.push(item)
      } else {
        if (this.carts.length === 1) {
          this.carts.splice(0, 1)
          this.selectedHallIds.splice(0, 1)
        } else {
          let index = 0
          for (let i = 0; i < this.carts.length; i++) {
            const it = this.carts[i]
            if (it.id === item.id) {
              index = i
              break
            }
          }
          this.carts.splice(index, 1)
          let idx = this.selectedHallIds.indexOf(item.id)
          this.selectedHallIds.splice(idx, 1)
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
.left-scroll-box, .right-scroll-box {
  height: calc(~"100vh - 124px - 48px");
  overflow: hidden;
}
.left-scroll, .right-scroll {
  height: 100%;
}
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

.left-scroll-box {
  flex: 1;
  background: #f5f7f9;
}

.right-scroll-box {
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
