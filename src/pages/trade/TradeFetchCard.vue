<template>
  <view class="fm-fetch-card">
    <view class="fm-fetch-card__hd">取餐号</view>
    <view class="fm-fetch-card__bd">
      <fm-image size="38vw" :src="_fetchCodeImage" inline></fm-image>
      <view class="fm-fetch-code">{{ _fetchCode }}</view>
      <view class="fm-fetch-desc">您前面有 {{ _before }} 人等待，取餐号当日有效</view>
      <view class="fm-fetch-desc">叫号时，我们会以服务消息通知您</view>
    </view>
    <view @click="goRefund" class="fm-fetch-card__ft" hover-class="active">申请退单</view>
  </view>
</template>

<script>
import FmImage from '@/components/FmImage'
export default {
  name: 'TradeFetchCard',
  components: {
    FmImage
  },
  model: {
    prop: 'fetch',
    event: 'change'
  },
  props: {
    fetch: Object,
    fetchCode: String,
    fetchCodeImage: String,
    before: [Number, String],
    fetchBranchName: String,
    tradeId: String
  },
  computed: {
    _fetchCode () {
      return this.fetchCode || this.fetch.fetchCode
    },
    _fetchCodeImage () {
      return this.fetchCodeImage || this.fetch.fetchCodeImage
    },
    _before () {
      return this.before || this.fetch.before
    },
    _fetchBranchName () {
      return this.fetchBranchName || this.fetch.fetchBranchName
    },
    _tradeId () {
      return this.tradeId || this.fetch.tradeId
    }
  },
  methods: {
    goRefund () {
      const tradeId = this._tradeId
      this.$wxp.navigateTo({
        url: '/pages/refund/main?tradeId=${tradeId}'
      })
    }
  }
}
</script>

<style lang="less">
@import "../../asset/style/_variable.less";

.fm-fetch-card {
  position: relative;
  margin: 8px;
  background-color: @--fill-base;
  border-radius: @--border-radius-small;
  text-align: center;
  padding: 0;
  border: @--border-width-base @--border-style-base @--border-color-extra-light;
  overflow: hidden;
}

.fm-fetch-card__hd {
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

.fm-fetch-card__bd {
  padding: 16px;
}

.fm-fetch-card__ft {
  position: relative;
  height: 48px;
  color: @--link-color;
  font-size: @--font-size-base;
  line-height: 48px;
  letter-spacing: .5px;
  font-weight: @--font-weight-blod;

  &::before {
    .setTopLine(@--border-color-extra-light);
  }

  &::after {
    .setActive();
  }

  &.active {
    &::after {
      opacity: .08;
    }
  }
}

.fm-fetch-code {
  font-family: Tahoma;
  font-size: 24px;
  font-weight: @--font-weight-blod;
  color: @--color-danger;
  height: 36px;
  line-height: 36px;
  text-align: center;
}

.fm-fetch-desc {
  font-size: @--font-size-small;
  color: @--color-text-placeholder;
  text-align: center;
  line-height: @--font-line-height-primary;
}
</style>
