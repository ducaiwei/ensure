<template>
  <view class="fm-refund">
    <form @submit="submitRefund" report-submit>
      <view class="fm-refund-subtitle">退款原因</view>
      <view class="fm-refund-panel">
        <view @click="handleActionSheet" class="fm-refund-cell" hover-class="active">
          <view class="fm-refund-cell__bd">{{ refundForm.reason || '请选择退款原因(必选)' }}</view>
          <view class="fm-refund-cell__ft">
            <fm-icon icon="icon-chevron-down"></fm-icon>
          </view>
        </view>
        <fm-textarea v-model="refundForm.desc" placeholder="退款备注说明，最多140个字(选填)"></fm-textarea>
      </view>

      <view class="fm-refumd-submit">
        <fm-button text="申请退款" form-type="submit" :disabled="_disabled" type="warn" size="l"></fm-button>
      </view>
    </form>

    <fm-copyright element-style="margin-top: 16px;"></fm-copyright>
  </view>
</template>

<script>
import FmButton from '@/components/FmButton'
import FmIcon from '@/components/FmIcon'
import FmTextarea from '@/components/FmTextarea'
import FmCopyright from '@/components/FmCopyright'
export default {
  components: {
    FmButton,
    FmIcon,
    FmTextarea,
    FmCopyright
  },
  data () {
    return {
      options: [
        '买错了，买多了，买少了',
        '门店选错了',
        '计划有变，不想要了',
        '门店通知我卖完了',
        '其他原因'
      ],
      refundForm: {
        tradeId: undefined,
        reason: undefined,
        desc: undefined
      }
    }
  },
  computed: {
    _disabled () {
      const reason = this.refundForm.reason
      const hasReason = !!(reason && reason !== '')
      return !hasReason
    }
  },
  methods: {
    async loadingPage () {
      await this.resetForm()
      await this.getQuery()
    },
    resetForm () {
      this.refundForm = {
        tradeId: undefined,
        reason: undefined,
        desc: undefined
      }
    },
    getQuery () {
      const query = this.$root.$mp.query
      this.refundForm.tradeId = query.tradeId
    },
    handleActionSheet () {
      this.$wxp.showActionSheet({
        itemList: this.options
      }).then(res => {
        this.refundForm.reason = this.options[res.tapIndex]
      }).catch(err => {
        console.log(err)
      })
    },
    submitRefund (e) {
      const refundForm = this.refundForm
      this.$wxp.showModal({
        title: '退款申请成功',
        content: '客服人员会尽快处理您的退款申请。点击“确定”，查看订单详情',
        confirmText: '确定'
      }).then(res => {
        this.$wxp.redirectTo({
          url: '/pages/trade/main?tradeId=${refundForm.tradeId}'
        })
      })
    }
  },
  mounted () {
    this.loadingPage()
  }
}
</script>

<style lang="less">
@import "../../asset/style/_variable.less";

.fm-refund {
  background-color: @--background-color-base;
  min-height: 100%;
  overflow: hidden;
}

.fm-refund-subtitle {
  padding-right: 16px;
  padding-left: 16px;
  line-height: 36px;
  font-size: @--font-size-base;
  font-weight: @--font-weight-blod;
  color: @--color-text-regular;
}

.fm-refund-panel {
  position: relative;
  background: @--fill-base;
  font-size: @--font-size-base;
}

.fm-refund-cell {
  position: relative;
  height: 48px;
  padding-right: 16px;
  padding-left: 16px;
  display: flex;
  align-items: center;

  &::before {
    .setActive();
  }

  &.active {
    &::before {
      opacity: .08;
    }
  }

  &::after {
    .setBottomLine();
    right: 16px;
    left: 16px;
    width: calc(~"200% - 64px");
  }
}

.fm-refund-cell__bd {
  flex: auto;
}

.fm-refund-cell__ft {
  flex: none;
  color: @--color-text-placeholder;
}

.fm-refund-textarea {
  padding: 16px;
}

.fm-refumd-submit {
  padding-right: 16px;
  padding-left: 16px;
  margin-top: 32px;
}
</style>
