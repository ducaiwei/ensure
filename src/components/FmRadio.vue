<template>
  <label
    class="fm-radio"
    @click="toggleChange"
  >
    <radio
      :value="value"
      :checked="_checked"
      :disabled="disabled"
    />
    <view
      class="fm-radio__cell"
      :class="[{'disabled': disabled}]"
      :hover-class="disabled ? '' : 'active'"
    >
      <div class="bd">{{ label || value }}</div>
      <div class="ft">
        <fm-icon
          v-if="_checked"
          icon="icon-check"
          :color="disabled ? disabledColor : color"
        >
        </fm-icon>
      </div>
    </view>
  </label>
</template>

<script>
/**
 * @author huangzhuo
 *
 * @module fm-radio
 * @desc radio组件
 *
 * @param { string, number, boolean } value = radio的值，必传
 * @param { string, number, boolean } label = radio的显示文字，如果不传，则会显示value
 * @param { boolean } disabled = 禁用标识
 * @param { boolean } checked = 是否选中，用v-model绑定
 * @param { string } color = 选中icon的颜色，默认是蓝色
 *
 * @example <fm-radio v-model="checked" :value="value" :label="label"></fm-radio>
 */
import FmIcon from '@/components/FmIcon'
export default {
  name: 'FmRadio',
  components: {
    FmIcon
  },
  model: {
    prop: 'checked',
    event: 'change'
  },
  props: {
    value: {
      type: [String, Number, Boolean],
      required: true
    },
    label: [String, Number, Boolean],
    disabled: Boolean,
    checked: Boolean,
    color: {
      type: 'string',
      default: '#09bb07'
    }
  },
  data () {
    return {
      disabledColor: 'rgba(0, 0, 0, .26)'
    }
  },
  computed: {
    _checked: {
      get () {
        return this.checked
      },
      set (val) {
        this.$emit('change', val)
      }
    }
  },
  methods: {
    toggleChange () {
      const disabled = this.disabled
      const _checked = this._checked
      if (!disabled) {
        this._checked = !_checked
      }
    }
  }
}
</script>

<style lang="less">
@import "../asset/style/_variable.less";

.fm-radio {
  position: relative;
  display: block;
  .setTapColor();

  &:not(:last-child) {
    &::after {
      .setBottomLine(@--border-color-lighter);
      right: 16px;
      left: 16px;
      width: calc(~"200% - 64px")
    }
  }

  radio {
    position: absolute;
    opacity: 0;
    top: -9999;
    right: -9999;
    display: none;
  }

  &.disabled,
  .disabled {
    color: @--color-text-regular;
  }
}

.fm-radio__cell {
  position: relative;
  display: flex;
  padding-right: 16px;
  padding-left: 16px;
  height: 48px;
  align-items: center;

  &::before {
    .setActive()
  }

  &.active {
    &::before {
      opacity: .3;
    }
  }

  .bd {
    flex: auto;
    display: block;
    .setEllip();
  }

  .ft {
    flex: none;
    display: block;
    margin-left: 16px;
  }
}
</style>
