<template>
  <view class="fm-shop-page">
    <view class="fm-shop-navbar">
      <view class="fm-shop-navbar__bd">
        <view class="title">附近酒店</view>
      </view>
      <view @click="chooseLocation" class="fm-shop-navbar__ft" hover-class="active">
        <fm-icon icon="icon-ic_search"></fm-icon>
      </view>
    </view>
    <view class="fm-shop-group" v-if="!empty">
      <shop-panel v-for="item in hotels" :key="item.hotelId" :branch="item"></shop-panel>
    </view>
    <fm-empty v-else text="附近暂无门店，可以换个地方试试"></fm-empty>
    <fm-copyright></fm-copyright>
  </view>
</template>

<script>
import FmCopyright from '@/components/FmCopyright'
import FmIcon from '@/components/FmIcon'
import FmEmpty from '@/components/FmEmpty'
import ShopPanel from './ShopPanel'
import { mapState, mapActions } from 'vuex'

export default {
  components: {
    FmCopyright,
    FmIcon,
    FmEmpty,
    ShopPanel
  },
  data () {
    return {
      location: {
        name: undefined,
        address: undefined,
        latitude: undefined,
        longitude: undefined
      },
      branch: [],
      empty: false,
      loading: false
    }
  },
  computed: {
    ...mapState(['userToken', 'hotels'])
  },
  methods: {
    ...mapActions(['getNearHotelsAction']),
    chooseLocation () {
      this.$wxp.chooseLocation().then(res => {
        console.log(res)
        const param = {
          token: this.userToken,
          latitude: res.latitude,
          longitude: res.longitude
        }
        this.getNearHotelsAction(param)
        // this.location = {
        //   name: res.name,
        //   address: res.address,
        //   latitude: res.latitude,
        //   longitude: res.longitude
        // }
      })
    }
  },
  created () {
  },
  onReachBottom () {
  }
}
</script>

<style lang="less">
@import "../../asset/style/_variable.less";

.fm-shop-page {
  background-color: @--background-color-base;
  padding-top: 48px;
  min-height: 100%;
  overflow: hidden;
}

.fm-shop-navbar {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  padding-right: 16px;
  padding-left: 16px;
  height: 48px;
  background-color: @--fill-base;
  z-index: @zindex-navbar-fixed;

  &::after {
    .setBottomLine();
  }
}

.fm-shop-navbar__bd {
  flex: auto;
  overflow: hidden;

  .title {
    font-weight: @--font-weight-blod;
    .setEllip();
  }
}

.fm-shop-navbar__ft {
  position: relative;
  flex: none;
  margin-left: 16px;

  &::before {
    .setActive();
  }

  &.active {
    &::before {
      opacity: .08;
    }
  }
}

.fm-shop-group {
  position: relative;
  margin-top: 8px;
  margin-bottom: 8px;

  &::before {
    .setTopLine(@--border-color-lighter);
  }
}
</style>
