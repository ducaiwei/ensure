<template>
  <view class="fm-order-card" hover-class="active" @click="goShop">
    <view class="fm-order-panel">
      <view class="fm-order-panel__hd">
        <fm-image :src="hotel.picture" size="80px" mode="aspectFill" border-radius="2px"></fm-image>
      </view>
      <view class="fm-order-panel__bd">
        <view class="fm-order-cell">
          <view class="fm-order-cell__bd">
            <view class="fm-order-cell__bd__title">{{ hotel.name }} 
              <text v-if="hotel.branchName">({{ hotel.branchName }})</text>
            </view>
          </view>
          <view class="fm-order-cell__ft">
            <view>
              <view>其他</view>
              <view>酒店</view>
            </view>
            <fm-icon icon="icon-chevron-right" color="inherit" size="16px"></fm-icon>
          </view>
        </view>
        <view class="fm-order-panel__bd__desc">酒店地址: {{ hotel.address }}</view>
      </view>
    </view>

  </view>
</template>

<script>
import FmImage from '@/components/FmImage'
import FmIcon from '@/components/FmIcon'
export default {
  name: 'HotelCard',
  props: {
    hotel: {
      type: Object,
      default: {}
    }
  },
  components: {
    FmImage,
    FmIcon
  },
  computed: {
  },
  data () {
    return {
    }
  },
  methods: {
    goShop() {
      this.$wxp.navigateTo({
        url: '/pages/shop/main'
      })
    }
  },
  created () {
  }
}
</script>

<style lang="less">
@import "../../asset/style/_variable.less";
.fm-order-card {
  position: relative;
  display: block;
  background-color: @--fill-base;
  padding-bottom: 8px;

  &::after {
    .setActive();
  }

  &.active {
    &::after {
      opacity: .08;
    }
  }
}

.fm-order-panel {
  display: flex;
  padding: 0 16px;
}

.fm-order-panel__hd {
  flex: none;
  margin-right: 16px;
}

.fm-order-panel__bd {
  flex: auto;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
}

.fm-order-panel__bd__desc {
  font-size: 11px;//@--font-size-small;
  color: @--color-text-secondary;
  .setEllip(2);
}

.fm-order-cell {
  // flex: auto;
  display: flex;
}

.fm-order-cell__bd {
  flex: auto;
}

.fm-order-cell__bd__title {
  font-size: @--font-size-large;
  font-weight: @--font-weight-blod;
  color: @--color-text-primary;
  .setEllip();
}

.fm-order-cell__bd__desc {
  font-size: @--font-size-small;
  color: @--color-text-secondary;
  .setEllip(2);
}

.fm-order-cell__ft {
  position: relative;
  padding-left: 8px;
  flex: none;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 11px;
  // font-size: @--font-size-small;
  color: @--color-text-secondary;

  &::before {
    .setActive();
  }

  &.active {
    &::before {
      opacity: .08;
    }
  }
}

</style>
