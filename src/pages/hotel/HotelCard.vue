<template>
  <view class="fm-order-card" hover-class="active" @click="goShop">
    <view class="fm-order-panel">
      <view class="fm-order-panel__hd">
        <fm-image :src="shop.avatar" size="80px" mode="aspectFill" border-radius="2px"></fm-image>
      </view>
      <view class="fm-order-panel__bd">
        <view class="fm-order-cell">
          <view class="fm-order-cell__bd">
            <view class="fm-order-cell__bd__title">{{ _title }}</view>
            <view class="fm-order-cell__bd__desc">营业时间: {{ shop.hour }}</view>
          </view>
          <view class="fm-order-cell__ft">
            <view>
              <view>其他</view>
              <view>门店</view>
            </view>
            <fm-icon icon="icon-chevron-right" color="inherit" size="16px"></fm-icon>
          </view>
        </view>
        <view class="fm-order-panel__bd__desc">门店地址: {{ shop.address }}</view>
      </view>
    </view>

  </view>
</template>

<script>
import FmImage from '@/components/FmImage'
import FmIcon from '@/components/FmIcon'
export default {
  name: 'HotelCard',
  components: {
    FmImage,
    FmIcon
  },
  computed: {
    _title () {
      const shop = this.shop
      return '${shop.businessName}(${shop.branchName})'
    }
  },
  data () {
    return {
      shop: {
        businessId: '',
        businessName: '',
        branchId: '',
        branchName: '',
        address: '',
        avatar: '',
        hour: ''
      }
    }
  },
  methods: {
    getShop () {
      const shop = {
        businessId: 'brandId',
        businessName: '上海浦东酒店',
        branchId: 'shopId',
        branchName: '',
        address: '上海市浦东区',
        avatar: '',
        hour: '10:00 - 22:00'
      }
      this.shop = shop
    },
    goShop () {
      this.$wxp.navigateTo({
        url: '/pages/shop/main'
      })
    }
  },
  mounted () {
    this.getShop()
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
