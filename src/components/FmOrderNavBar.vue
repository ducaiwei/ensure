<template>
  <scroll-view
   class="fm-navbar"
   :class="'size--' + size"
   scroll-x
   scroll-with-animation
  >
  <view class="fm-navbar-container">
    <view
      @tap="handleTap(item, index)"
      v-for="(item, index) in options"
      :key="index"
      class="fm-navbar__item"
      :class="[
        { 'checked': index == checkedIndex },
      ]"
      :hover-class="index == checkedIndex ? '' : 'active'"
    > 
      <view class="fm-navbar__item__title">{{ item.type }}</view>
    </view>
  </view>
  </scroll-view>
</template>

<script>
export default {
  name: 'FmNavbar',
  props: {
    options: Array,
    checked: String,
    size: {
      type: String,
      default: 'medium',
      validator (value) {
        return [
          'medium',
          'small',
          'mini'
        ].indexOf(value) > -1
      }
    },
    changeCallBack: {
      type: Function,
      default: () => {}
    }
  },
  data () {
    return {
      checkedIndex: 0
    }
  },
  model: {
    prop: 'checked',
    event: 'change'
  },
  watch: {
    checked(nv, ov) {
      this.checkedIndex = nv
    }
  },
  methods: {
    handleTap (item, index) {
      this.checkedIndex = index
      this.$emit('change', index)
    }
  },
  created () {
  }
}
</script>

<style lang="less">
@import "../asset/style/_variable.less";
@--navbar-transition: all .2s cubic-bezier(.645,.045,.355,1);

.fm-navbar {
  position: relative;
  display: block;
  box-sizing: border-box;
  border-bottom:  1px solid rgba(204,204,204, .3);
}
.fm-navbar-container {
  position: relative;
  display: flex;
}
.fm-navbar__item {
  position: relative;
  display: block;
  text-align: center;
  padding-right: 12px;
  padding-left: 12px;
  box-sizing: inherit;
  font-size: 15px;
  line-height: 36px;
  border-right:  1px solid rgba(204,204,204, .3);
  flex: 1;
  color: @--color-text-secondary;

  &:last-child {
    border-right: none;
  }
  &::after {
    position: absolute;
    top: 0;
    left: 0;
    content: "";
    display: block;
    width: 100%;
    height: 100%;
    box-sizing: inherit;
    margin-right: auto;
    margin-left: auto;
    background-color: @--color-primary;
    opacity: 0;
    transition: @--navbar-transition;
    z-index: 1;
  }

  &::before {
    .setActive();
  }

  &.checked {
    &::after {
      opacity: 1;
    }
    &::before {
      content: "";
      display: block;
      width: 0;
      height: 0;
      bottom: -10px;
      left: 50%;
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
      border-top: 10px solid red;
    }
    .fm-navbar__item__title {
      position: relative;
      transition: @--color-transition-base;
      color: #fff;
      z-index: 2;
    }
    view {
      text-align: center;
    }
  }

  &.active {
    &::before {
      opacity: .08;
    }
  }
}

.fm-navbar__item__title {
  letter-spacing: 1px;
  font-size: 24rpx;
}

.fm-navbar {
  &.size--medium {
    .fm-navbar__item {
      height: 48px;
    }
  }

  &.size--small {
    .fm-navbar__item {
      height: 36px;
    }
  }

  &.size--mini {
    .fm-navbar__item {
      height: 32px;
    }
  }
}
</style>
