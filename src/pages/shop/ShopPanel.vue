<template>
  <view class="fm-shop-panel" hover-class="active">
    <view class="fm-shop-panel__bd" @tap="goOrder(branch.hotelId)" >
      <view class="fm-shop-panel-title">{{ branch.name }}</view>
      <view class="fm-shop-panel-desc">{{ branch.address }}</view>
    </view>
    <view class="fm-shop-panel__ft" @tap="openLocation(branch)">
      <fm-icon icon="icon-map-marker-radius" color="#3ac939" size="24px"></fm-icon>
      <view>{{ _distance }}</view>
    </view>
  </view>
</template>

<script>
import FmIcon from '@/components/FmIcon'
export default {
  name: 'ShopPanel',
  components: {
    FmIcon
  },
  props: {
    branch: Object
  },
  computed: {
    _distance () {
      const distance = this.branch.distance
      return `${distance.toFixed(2)} km`
    }
  },
  methods: {
    goOrder (branchId) {
      this.$wxp.reLaunch({
        url: `/pages/hotel/main?hotelId=${branchId}`
      })
    },
    openLocation (branch) {
      this.$wxp.openLocation({
        latitude: parseFloat(branch.lat),
        longitude: parseFloat(branch.lng),
        name: branch.name,
        address: branch.address
      })
    }
  }
}
</script>

<style lang="less">
@import "../../asset/style/_variable.less";

.fm-shop-panel {
  position: relative;
  display: flex;
  align-items: center;
  background-color: @--fill-base;
  padding: 16px 0 16px 16px;

  &:not(:last-child) {
    &::after {
      .setBottomLine(@--border-color-lighter);
    }
  }

  &::before {
    .setActive();
  }

  &.active {
    &::before {
      opacity: .08;
    }
  }
}

.fm-shop-panel__bd {
  flex: auto;
  display: block;
}

.fm-shop-panel__ft {
  position: relative;
  flex: none;
  color: @--color-info;
  // color: @--color-primary-light-2;
  text-align: center;
  font-size: 11px;
  padding-right: 16px;
  padding-left: 16px;
  margin-left: 16px;
  width: 25vw;

  &::before {
    .setLeftLine(@--border-color-extra-light);
  }
}

.fm-shop-panel-title {
  font-size: @--font-size-root;
  font-weight: @--font-weight-blod;
  color: @--color-text-regular;
}

.fm-shop-panel-desc {
  font-size: @--font-size-small;
  color: @--color-text-secondary;
}
</style>
