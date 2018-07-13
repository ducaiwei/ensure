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
        { 'checked': index === _checked },
      ]"
      :hover-class="index === _checked ? '' : 'active'"
    > 
      <view class="fm-navbar__item__title">{{ item.type }}</view>
      <view class="fm-navbar__item__title">{{ item.price }}</view>
    </view>
  </view>
  </scroll-view>
  <!-- </view> -->
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
    }
  },
  model: {
    prop: 'checked',
    event: 'change'
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
  watch: {
    _checked (nv, ov) {
      console.log(nv)
    }
  },
  methods: {
    handleTap (item, index) {
      this._checked = index
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
  border: 1px solid #ccc;
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
  color: @--color-text-secondary;
  &:first-child {
    margin-left: 12px;
  }

  &:last-child {
    margin-right: 12px;
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
