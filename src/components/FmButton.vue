<template>
  <button
    :size="size"
    :type="type"
    :plain="plain"
    :disabled="disabled"
    :loading="loading"
    :form-type="formType"
    :open-type="openType"
    :app-parameter="appParameter"
    :hover-class="hoverClass"
    :hover-stop-propagation="hoverStopPropagation"
    :hover-start-time="hoverStartTime"
    :hover-stay-time="hoverStayTime"
    :lang="lang"
    @getuserinfo="getuserinfo"
    :session-from="sessionFrom"
    :send-message-title="sendMessageTitle"
    :send-message-path="sendMessagePath"
    :send-message-img="sendMessageImg"
    :show-message-card="showMessageCard"
    @contact="contact"
    @getphonenumber="getphonenumber"
    @error="error"
    @click="handleClick"
    @tap="handleTap"
    @longpress="handleLongPress"
    class="fm-btn"
    :class="[
      'fm-btn--' + mode,
      'fm-btn--' + size,
      'fm-btn--' + type,
      { 'fm-btn--inline': inline },
      { 'fm-btn--noshadow': noShadow },
      { 'fm-btn--disabled': disabled },
      { 'fm-btn--loading': loading },
      className
    ]"
    :style="[
      elementStyle
    ]"
  >
    <fm-icon v-if="iconLeft" :icon="icon" :mode="iconMode" :size="iconSize" :color="iconColor" :active="iconActive" :class-name="iconClassName" :element-style="iconElementStyle"></fm-icon>
    <span
      v-if="text"
      class="fm-btn__text"
      :class="[
        { 'fm-btn__text--left': iconLeft },
        { 'fm-btn__text--right': iconRight }
      ]"
    >
      {{ text }}
      <slot></slot>
    </span>
    <fm-icon v-if="iconRight" :icon="icon" :mode="iconMode" :size="iconSize" :color="iconColor" :active="iconActive" :class-name="iconClassName" :element-style="iconElementStyle"></fm-icon>
  </button>
</template>

<script>
/**
 * z-button
 * @module zui/z-button
 * @desc 小程序button组件
 *
 * @param { string } formType - 同小程序文档form-type
 * @param { string } openType - 同小程序文档open-type
 * @param { string } appParameter - 同小程序文档app-parameter
 * @param { string } hoverClass - 同小程序文档hover-class
 * @param { number } hoverStopPropagation - 同小程序文档hover-stop-propagation
 * @param { number } hoverStartTime - 同小程序文档hover-start-time
 * @param { number } hoverStayTime - 同小程序文档hover-stay-time
 * @param { string } lang - 同小程序文档lang
 * @param { string } sessionFrom - 同小程序文档session-form
 * @param { string } sendMessageTitle - 同小程序文档send-message-title
 * @param { string } sendMessagePath - 同小程序文档send-message-path
 * @param { string } sendMessageImg - 同小程序文档send-message-img
 * @param { boolean } showMessageCard - 同小程序文档show-message-card
 * @param { string } mode - 模式，可选值raised / flat / plain /fab，默认值raised
 * @param { string } size - button的大小，可选值s/m/l/xl，默认值m
 * @param { string } type - button的样式，可选值很多，default/primary/warn/error等等
 * @param { boolean } disabled - 是否禁用
 * @param { boolean } loading - 名称前是否带 loading 图标
 * @param { string } text - button的文案
 * @param { string } className - button的自定义class
 * @param { string } elementStyle - button的自定义style
 * @param { string } icon - button的iconClass
 * @param { string } iconFloat - icon的位置，可选值left/right，默认left
 * @param { string } iconMode - icon的mode属性
 * @param { string } iconSize - icon的size属性
 * @param { string } iconColor - icon的color属性
 * @param { boolean } iconActive - icon的active属性
 * @param { string } iconClassName - icon的class-Name属性
 * @param { string } iconElementStyle - icon的element-style属性
 */

import FmIcon from '@/components/FmIcon'
export default {
  name: 'FmButton',
  components: { FmIcon },
  props: {
    // 以下都是小程序button的原生高级属性
    formType: String,
    openType: String,
    appParameter: String,
    hoverClass: String,
    hoverStopPropagation: Number,
    hoverStartTime: Number,
    hoverStayTime: Number,
    lang: String,
    sessionFrom: String,
    sendMessageTitle: String,
    sendMessagePath: String,
    sendMessageImg: String,
    showMessageCard: Boolean,
    // 以下为样式属性
    mode: {
      type: String,
      default: 'raised',
      validator (value) {
        return ['raised', 'flat', 'plain', 'fab'].indexOf(value) > -1
      }
    },
    size: {
      type: String,
      default: 'm',
      validator (value) {
        return ['s', 'm', 'l', 'xl'].indexOf(value) > -1
      }
    },
    type: {
      type: String,
      default: 'default'
    },
    disabled: Boolean,
    loading: Boolean,
    inline: Boolean,
    noShadow: Boolean,
    elementStyle: String,
    className: String,
    // 以下是zui自定义的button属性
    text: String,
    icon: String,
    iconFloat: {
      type: String,
      default: 'left'
    },
    iconMode: String,
    iconSize: String,
    iconColor: String,
    iconActive: Boolean,
    iconClassName: String,
    iconElementStyle: String
  },
  computed: {
    iconLeft () {
      return this.icon && this.iconFloat === 'left'
    },
    iconRight () {
      return this.icon && this.iconFloat === 'right'
    }
  },
  methods: {
    getuserinfo (res) {
      this.$emit('getuserinfo', res)
    },
    contact (res) {
      this.$emit('contact', res)
    },
    getphonenumber (res) {
      this.$emit('getphonenumber', res)
    },
    error (res) {
      this.$emit('error', res)
    },
    handleClick (evt) {
      this.$emit('click', evt)
    },
    handleLongPress (evt) {
      this.$emit('longpress', evt)
    },
    handleTap (evt) {
      this.$emit('tap', evt)
    },
  }
}
</script>

<style lang="less">
@import "../asset/style/_variable.less";
//样式声明
//height声明
@fm-btn-height--xl: 56px;
@fm-btn-height--l: 48px;
@fm-btn-height--m: 36px;
@fm-btn-height--s: 32px;

//button最小宽度
@fm-btn-min-width: 64px;

//padding声明
@fm-btn-padding: 0 16px;
@fm-btn-padding--s: 0 12px;
@fm-btn-padding--xs: 0 8px;

//font声明
@fm-btn-font-size--xl: 18px;
@fm-btn-font-size--l: 15px;
@fm-btn-font-size--m: 13px;
@fm-btn-font-size--s: 11px;

@fm-btn-letter-spacing: .5px;
@fm-btn-letter-spacing--s: 0;

@fm-btn-font-weight: @--font-weight-primary;
@fm-btn-font-weight--regular: @--font-weight-light;

//shadow声明
@fm-btn-shadow: @--box-shadow-base;
@fm-btn-shadow--active: @--box-shadow-dark;
@fm-btn-shadow--fab: @--box-shadow-base;
@fm-btn-shadow--fab--active: @--box-shadow-dark;

//颜色声明
@fm-btn-default: @--fill-base;
@fm-btn-primary: @--color-primary;
@fm-btn-warn: @--color-warning;
@fm-btn-error: @--color-danger;
@fm-btn-dark: @--color-text-regular;
// @fm-btn-weixin: @global-color-weixin;
// @fm-btn-taobao: @global-color-taobao;
// @fm-btn-taobao-light: @global-color-taobao-light;
// @fm-btn-meituan: @global-color-meituan;
// @fm-btn-dianping: @global-color-dianping;
// @fm-btn-eleme: @global-color-eleme;
// @fm-btn-link: @global-color-link;

@fm-btn-text--dark: @--color-text-primary;
@fm-btn-text--light: @--fill-base;

//禁用声明
@fm-btn-disabled-bg: @--color-text-secondary;
@fm-btn-disabled-text: @--font-color-disabled-base;//@--color-text-regular;

//基础button样式
.fm-btn {
  -webkit-appearance: none;
  position: relative;
  display: flex;
  width: 100%;
  height: 36px;
  line-height: 1.15;
  margin-right: auto;
  margin-left: auto;
  align-items: center;
  justify-content: center;
  padding: 0 16px;
  text-align: center;
  outline: none;
  font-size: @fm-btn-font-size--m;
  letter-spacing: 0.5px;
  font-weight: @fm-btn-font-weight;
  text-transform: uppercase;
  text-decoration: none;
  color: @fm-btn-text--dark;
  background-color: @fm-btn-default;
  outline: 0;
  box-sizing: border-box;
  border: 0;
  border-radius: 2px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-wrap: normal;

  &::before {
    //position: absolute;
    //pointer-events: none;
    //content: "";
    //top: 0;
    //right: 0;
    //bottom: 0;
    //left: 0;
    //background: #bdbdbd;
    //opacity: 0;
    margin-right: 8px;
  }

  &::after {
    position: absolute;
    pointer-events: none;
    content: ' ';
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: unset;
    transform: unset;
    transform-origin: unset;
    box-sizing: border-box;
    border-radius: unset;
    background: #bdbdbd;
    opacity: 0;
  }

  &.button-hover,
  &:not(.fm-btn--disabled):active,
  &.fm-btn--loading {
    &::after {
      opacity: 0.3;
    }
  }

  &.fm-btn--disabled {
    background: @fm-btn-disabled-bg !important;
    color: @fm-btn-disabled-text !important;
    box-shadow: none !important;
    border: none !important;
  }
}

//颜色
.fm-btn {
  &.fm-btn--primary {
    color: @fm-btn-text--light;
    background-color: @fm-btn-primary;
    // background: linear-gradient(
    //   to right,
    //   tint(@fm-btn-primary, 24%),
    //   @fm-btn-primary
    // );
  }

  &.fm-btn--default {
    color: @fm-btn-text--dark;
    background: linear-gradient(to right, @fm-btn-default, #fafafa);
  }

  &.fm-btn--warn {
    color: @fm-btn-text--light;
    background: linear-gradient(
      to right,
      tint(@fm-btn-warn, 24%),
      @fm-btn-warn
    );
  }

  &.fm-btn--error {
    color: @fm-btn-text--light;
    background: linear-gradient(
      to right,
      tint(@fm-btn-error, 24%),
      @fm-btn-error
    );
  }

  &.fm-btn--dark {
    color: @fm-btn-text--light;
    background-color: @fm-btn-dark;
  }

  // &.fm-btn--weixin {
  //   color: @fm-btn-text--light;
  //   background: linear-gradient(
  //     to right,
  //     tint(@fm-btn-weixin, 24%),
  //     @fm-btn-weixin
  //   );
  // }

  // &.fm-btn--weixin-light {
  //   color: @fm-btn-text--light;
  //   background: linear-gradient(
  //     to right,
  //     tint(@fm-btn-weixin, 48%),
  //     tint(@fm-btn-weixin, 24%)
  //   );
  // }

  // &.fm-btn--weixin-dark {
  //   color: @fm-btn-text--light;
  //   background: linear-gradient(
  //     to right,
  //     tint(@fm-btn-weixin, 10%),
  //     shade(@fm-btn-weixin, 14%)
  //   );
  // }

  // &.fm-btn--taobao {
  //   color: @fm-btn-text--light;
  //   background: linear-gradient(
  //     to right,
  //     @fm-btn-taobao-light,
  //     @fm-btn-taobao
  //   );
  // }

  // &.fm-btn--taobao-light {
  //   color: @fm-btn-text--light;
  //   background: linear-gradient(
  //     to right,
  //     tint(@fm-btn-taobao-light, 24%),
  //     @fm-btn-taobao-light
  //   );
  // }

  // &.fm-btn--taobao-dark {
  //   color: @fm-btn-text--light;
  //   background: linear-gradient(
  //     to right,
  //     tint(@fm-btn-taobao, 24%),
  //     @fm-btn-taobao
  //   );
  // }

  // &.fm-btn--meituan {
  //   color: @fm-btn-text--light;
  //   background: linear-gradient(
  //     to right,
  //     tint(@fm-btn-meituan, 24%),
  //     @fm-btn-meituan
  //   );
  // }

  // &.fm-btn--meituan-light {
  //   color: @fm-btn-text--light;
  //   background: linear-gradient(
  //     to right,
  //     tint(@fm-btn-meituan, 48%),
  //     tint(@fm-btn-meituan, 24%)
  //   );
  // }

  // &.fm-btn--meituan-dark {
  //   color: @fm-btn-text--light;
  //   background: linear-gradient(
  //     to right,
  //     tint(@fm-btn-meituan, 10%),
  //     shade(@fm-btn-meituan, 14%)
  //   );
  // }

  // &.fm-btn--dianping {
  //   color: @fm-btn-text--light;
  //   background: linear-gradient(
  //     to right,
  //     tint(@fm-btn-dianping, 24%),
  //     @fm-btn-dianping
  //   );
  // }

  // &.fm-btn--dianping-light {
  //   color: @fm-btn-text--light;
  //   background: linear-gradient(
  //     to right,
  //     tint(@fm-btn-dianping, 48%),
  //     tint(@fm-btn-dianping, 24%)
  //   );
  // }

  // &.fm-btn--dianping-dark {
  //   color: @fm-btn-text--light;
  //   background: linear-gradient(
  //     to right,
  //     tint(@fm-btn-dianping, 10%),
  //     shade(@fm-btn-dianping, 14%)
  //   );
  // }

  // &.fm-btn--eleme {
  //   color: @fm-btn-text--light;
  //   background: linear-gradient(
  //     to right,
  //     tint(@fm-btn-eleme, 24%),
  //     @fm-btn-eleme
  //   );
  // }

  // &.fm-btn--eleme-light {
  //   color: @fm-btn-text--light;
  //   background: linear-gradient(
  //     to right,
  //     tint(@fm-btn-eleme, 48%),
  //     tint(@fm-btn-eleme, 24%)
  //   );
  // }

  // &.fm-btn--eleme-dark {
  //   color: @fm-btn-text--light;
  //   background: linear-gradient(
  //     to right,
  //     tint(@fm-btn-eleme, 10%),
  //     shade(@fm-btn-eleme, 14%)
  //   );
  // }
}

.fm-btn {
  &.fm-btn--raised {
    will-change: box-shadow;
    box-shadow: @fm-btn-shadow;

    &.button-hover,
    &:not(.fm-btn--disabled):active,
    &.fm-btn--loading {
      box-shadow: @fm-btn-shadow--active;
    }
  }

  &.fm-btn--noshadow {
    box-shadow: none !important;
  }
}

.fm-btn {
  &.fm-btn--flat,
  &.fm-btn--plain {
    background: transparent;

    &.fm-btn--primary {
      color: @fm-btn-primary;
    }

    &.fm-btn--default {
      color: @fm-btn-text--dark;
    }

    &.fm-btn--warn {
      color: @fm-btn-warn;
    }

    &.fm-btn--error {
      color: @fm-btn-error;
    }

    // &.fm-btn--weixin {
    //   color: @fm-btn-weixin;
    // }

    // &.fm-btn--weixin-light {
    //   color: tint(@fm-btn-weixin, 24%);
    // }

    // &.fm-btn--weixin-dark {
    //   color: shade(@fm-btn-weixin, 14%);
    // }

    // &.fm-btn--taobao {
    //   color: @fm-btn-taobao;
    // }

    // &.fm-btn--taobao-light {
    //   color: @fm-btn-taobao-light;
    // }

    // &.fm-btn--taobao-dark {
    //   color: shade(@fm-btn-taobao, 14%);
    // }

    // &.fm-btn--meituan {
    //   color: @fm-btn-meituan;
    // }

    // &.fm-btn--meituan-light {
    //   color: tint(@fm-btn-meituan, 24%);
    // }

    // &.fm-btn--meituan-dark {
    //   color: shade(@fm-btn-meituan, 14%);
    // }

    // &.fm-btn--dianping {
    //   color: @fm-btn-dianping;
    // }

    // &.fm-btn--dianping-light {
    //   color: tint(@fm-btn-dianping, 24%);
    // }

    // &.fm-btn--dianping-dark {
    //   color: shade(@fm-btn-dianping, 14%);
    // }

    // &.fm-btn--eleme {
    //   color: @fm-btn-eleme;
    // }

    // &.fm-btn--eleme-light {
    //   color: tint(@fm-btn-eleme, 24%);
    // }

    // &.fm-btn--eleme-dark {
    //   color: shade(@fm-btn-eleme, 14%);
    // }
  }

  .fm-btn--plain {
    background: @--fill-base;
    border: 1px solid currentColor;
  }
}

.fm-btn {
  &.fm-btn--inline {
    display: inline-flex;
    width: auto;
    min-width: @fm-btn-min-width;
  }
}

.fm-btn {
  &.fm-btn--xl {
    height: @fm-btn-height--xl;
    font-size: @fm-btn-font-size--xl;
    border-radius: 0;
  }

  &.fm-btn--l {
    height: @fm-btn-height--l;
    font-size: @fm-btn-font-size--l;
  }

  &.fm-btn--m {
    height: @fm-btn-height--m;
  }

  &.fm-btn--s,
  &.fm-btn--xs {
    width: auto;
    height: @fm-btn-height--s;
    min-width: @fm-btn-min-width;
    font-size: @fm-btn-font-size--s;
    letter-spacing: @fm-btn-letter-spacing--s;
    font-weight: @fm-btn-font-weight--regular;
  }

  &.fm-btn--xs {
    padding: @fm-btn-padding--xs;
  }
}

.fm-btn--pill {
  border-radius: 28px;
}

.fm-btn--fab {
  position: fixed;
  right: 16px;
  bottom: 16px;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  padding: 0;
  font-size: 24px;
  letter-spacing: normal;
  font-weight: @--font-weight-light;
  box-shadow: @fm-btn-shadow--fab;
  will-change: box-shadow;
  z-index: @zindex-tooltip;

  &.fm-btn--m {
    width: 56px;
    height: 56px;
  }

  &.fm-btn--s {
    width: 40px;
    height: 40px;
  }

  &.button-hover,
  &:not(.fm-btn--disabled):active,
  &.fm-btn--loading {
    box-shadow: @fm-btn-shadow--fab--active;
  }
}

.fm-btn__text {
  .setEllip();

  &.fm-btn__text--left,
  &.fm-btn__text--right {
    width: auto;
  }
}

.fm-btn__text--left {
  margin-left: 4px;
}

.fm-btn__text--right {
  margin-right: 4px;
}
</style>
