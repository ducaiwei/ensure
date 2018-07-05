<template>
<view class="container">
  <view class="index" style="height:72.5vh;position: absolute; top: 0;width: 100%;overflow:scroll">
    <view class="index-left" style="">
      <scroll-view scroll-with-animation="true" scroll-y  @scroll="leftScroll" :scroll-top="leftToTop" style="height: 100vh">
        <view v-for="(item, index) in constants" :key="index" @tap="jumpToSick" :data-id="item.id" :style="{'background':(item.id === currentLeftSelect ? 'red' : '')}" class="index-left-text">
          <view :id="item.id">
          {{item.name}}
          </view>
        </view>
      </scroll-view>
    </view>
    <view class="index-right">
      <scroll-view scroll-with-animation="true" scroll-y style="height: 100vh;" @scroll="rightScroll" :scroll-into-view="toView" bindscrolltolower="lower">
          <view v-for="(item, index1) in constants" :key="index1" :id="item.id">
            <view class="index-right-text-top">{{item.name}}</view>
            <hotel-goods v-if="!emptyGoods" :goods="item.category"></hotel-goods>
          </view>
      </scroll-view>
    </view>
  </view>
  <order-cart></order-cart>
</view>
</template>

<script>
import FmNavMenu from '@/components/FmNavMenu'
import FmEmpty from '@/components/FmEmpty'
import HotelGoods from './HotelGoods'
import Hotels from '@/constants/hotel.js'
import OrderCart from '../order/OrderCart'
export default {
  name: 'HotelMall',
  components: {
    FmNavMenu,
    FmEmpty,
    HotelGoods,
    OrderCart
  },
  data () {
    return {
      constants: Hotels,
      toView: null,                 // 左 => 右联动 右scroll-into-view 所需的id
      currentLeftSelect: Hotels[0].id,      // 当前左侧选择的
      eachRightItemToTop: [],       // 右侧每类数据到顶部的距离（用来与 右 => 左 联动时监听右侧滚动到顶部的距离比较）
      leftToTop: 0
    }
  },
  methods: {
    getEachRightItemToTop () {
    var obj = {};
    var totop = 0;
    const RIGHT_BAR_HEIGHT = 20;      // 右侧每一类的 bar 的高度（固定）
    const RIGHT_ITEM_HEIGHT = 60;     // 右侧每个子类的高度（固定）
    obj[this.constants[0].id] = totop      // 右侧第一类肯定是到顶部的距离为 0
    for (let i = 1; i < (this.constants.length + 1); i++) {  // 循环来计算每个子类到顶部的高度
      totop += (RIGHT_BAR_HEIGHT + this.constants[i-1].category.length * RIGHT_ITEM_HEIGHT)
      obj[this.constants[i] ? this.constants[i].id : 'last'] = totop    // 这个的目的是 例如有两类，最后需要 0-1 1-2 2-3 的数据，所以需要一个不存在的 'last' 项，此项即为第一类加上第二类的高度。
    }
    this.eachRightItemToTop = obj
    return obj
  },
  rightScroll (e) {   // 监听右侧的滚动事件与 eachRightItemToTop 的循环作对比 从而判断当前可视区域为第几类，从而渲染左侧的对应类。
    const LEFT_ITEM_HEIGHT = 30
    for (let i = 0; i < this.constants.length; i++) {
      let left = this.eachRightItemToTop[this.constants[i].id]
      let right = this.eachRightItemToTop[this.constants[i + 1] ? this.constants[i+1].id : 'last']
      if (e.target.scrollTop < right && e.target.scrollTop >= left) {
        this.currentLeftSelect = this.constants[i].id,
        this.leftToTop = LEFT_ITEM_HEIGHT * i
      }
    }
  },
  jumpToSick (e) {    // 左侧类的点击事件
      this.toView = e.target.id || e.target.dataset.id,
      this.currentLeftSelect = e.target.id || e.target.dataset.id
  },
  lower: function (e) {
  }
  },
  mounted () {
    this.getEachRightItemToTop()
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
  padding: 20rpx 10rpx;
  height: 30px;
  line-height: 30px;
}

.index-right-text {
  box-sizing: border-box;
  padding: 40rpx 10rpx;
  height: 60px;
}

.index-right-text-top {
  height: 40rpx;
  background: #f5f7f9;
}

.mark {
  position: absolute;
  top: 200px;
  height: 100vh;
  width: 100%;
  z-index: 10;
}

.index-right-text-top {
  height: 20px;
}
</style>
