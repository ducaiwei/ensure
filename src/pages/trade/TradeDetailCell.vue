<template>
  <view class="fm-trade-detail-cell">
    <view class="fm-trade-detail-cell__bd">{{ label }}</view>
    <view class="fm-trade-detail-cell__ft">
      <fm-number v-if="mode === 'number'" :value="value"></fm-number>
      <fm-number v-else-if="mode === 'timestamp'" :value="value" mode="timestamp"></fm-number>
      <block v-else>{{ value }}</block>
    </view>
  </view>
</template>

<script>
import FmNumber from '@/components/FmNumber'
export default {
  name: 'TradeDetailCell',
  components: {
    FmNumber
  },
  props: {
    mode: {
      type: String,
      validator (value) {
        return [
          'timestamp',
          'number',
          'default'
        ].indexOf(value) > -1
      },
      default: 'default'
    },
    label: String,
    value: [String, Number]
  }
}
</script>

<style lang="less">
@import "../../asset/style/_variable.less";

.fm-trade-detail-cell {
  position: relative;
  display: flex;
  padding-top: 12px;
  padding-bottom: 12px;
  font-size: @--font-size-base;
  color: @--color-text-primary;

  &:not(:first-child) {
    &::before {
      .setTopLine(@--border-color-extra-light);
    }
  }
}

.fm-trade-detail-cell__bd {
  flex: none;
}

.fm-trade-detail-cell__ft {
  flex: auto;
  margin-left: 16px;
  text-align: right;
  color: @--color-text-regular;
}
</style>
