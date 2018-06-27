<template>
  <view class="fm-checkout-fetch-card">
    <view class="fm-checkout-fetch-card__hd">到店自取</view>
    <view class="fm-checkout-fetch-card__bd">
      <view class="fm-checkout-fetch-title">
        <fm-icon icon="icon-near-me" size="inherit"></fm-icon>
        <label class="label">自取地址</label>
      </view>
      <view class="fm-checkout-fetch-main">{{ _branchAddress }}</view>
      <view class="fm-checkout-fetch-desc">
        <label>门店距离当前位置 {{ _distance }}</label>
        <label @click="openLocation" class="link">查看地图</label>
      </view>
    </view>
  </view>
</template>

<script>
import FmIcon from '@/components/FmIcon'
export default {
  name: 'CheckoutFetchCard',
  components: {
    FmIcon
  },
  props: {
    branch: Object,
    branchName: String,
    branchAddress: String,
    location: Object,
    distance: {
      type: Number,
      required: true
    }
  },
  computed: {
    _branchName () {
      return this.branchName || this.branch.branchName
    },
    _branchAddress () {
      return this.branchAddress || this.branch.branchAddress
    },
    _location () {
      return this.location || this.branch.location
    },
    _distance () {
      const distance = this.distance
      if (distance < 0) {
        return '未知'
      } else if (distance < 1000) {
        return `${distance} m`
      } else {
        return `${distance / 1000} km`
      }
    }
  },
  methods: {
    openLocation () {
      const name = this._branchName
      const address = this._branchAddress
      const _location = this._location
      const latitude = _location.latitude
      const longitude = _location.longitude
      this.$wxp.openLocation({
        latitude: latitude,
        longitude: longitude,
        scale: 18,
        name: name,
        address: address
      })
    }
  }
}
</script>

<style lang="less">
@import "../../asset/style/_variable.less";

.fm-checkout-fetch-card {
  display: block;
  border: @--border-width-base @--border-style-base @--border-color-lighter;
  border-radius: @--border-radius-small;
  margin: 8px;
  background-color: @--fill-base;
  overflow: hidden;
  text-align: center;
}

.fm-checkout-fetch-card__hd {
  position: relative;
  background-color: shade(#ffffff, 2%);
  height: 48px;
  line-height: 48px;
  color: @--color-text-secondary;
  font-size: @--font-size-root;
  font-weight: @--font-weight-blod;

  &::after {
    .setBottomLine(@--border-color-extra-light);
  }
}

.fm-checkout-fetch-card__bd {
  padding: 16px;
  color: @--color-text-primary;
}

.fm-checkout-fetch-title {
  font-size: @--font-size-small;
  color: @--color-text-secondary;

  .label {
    margin-left: 4px;
  }
}

.fm-checkout-fetch-main {
  font-size: @--font-size-root;
  margin-top: 8px;
  margin-bottom: 8px;
}

.fm-checkout-fetch-desc {
  font-size: @--font-size-small;
  color: @--color-text-regular;

  .link {
    position: relative;
    color: @--link-color;
    margin-left: 8px;
    font-weight: @--font-weight-blod;

    &::before {
      content: "|";
      margin-right: 8px;
      color: @--border-color-lighter;
    }

    &.active,
    &:active {
      color: @--link-hover-color;
    }
  }
}
</style>
