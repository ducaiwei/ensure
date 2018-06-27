<template>
  <scroll-view
   class="fm-navbar"
   :class="'size--' + size"
   scroll-x
   scroll-with-animation
  >
    <view
      @click="handleTap(item)"
      v-for="(item, index) in options"
      :key="index"
      class="fm-navbar__item"
      :class="[
        { 'checked': item === _checked },
      ]"
      :hover-class="item === _checked ? '' : 'active'"
    >
      <view class="fm-navbar__item__title">{{ item }}</view>
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
  methods: {
    handleTap (item) {
      this._checked = item
    }
  },
  created () {}
}
</script>

<style lang="less">
@import "../asset/style/_variable.less";
@--navbar-transition: all .2s cubic-bezier(.645,.045,.355,1);

.fm-navbar {
  position: relative;
  display: flex;
  box-sizing: border-box;

  &::after {
    .setBottomLine();
  }
}

.fm-navbar__item {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding-right: 12px;
  padding-left: 12px;
  box-sizing: inherit;
  font-size: 15px;
  font-weight: @--font-weight-blod;
  color: @--color-text-secondary;

  &:first-child {
    margin-left: 12px;
  }

  &:last-child {
    margin-right: 12px;
  }

  &::after {
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    content: "";
    box-sizing: inherit;
    height: 3px;
    width: 24px;
    margin-right: auto;
    margin-left: auto;
    background-color: @--color-primary;
    opacity: 0;
    transition: @--navbar-transition;
  }

  &::before {
    .setActive();
  }

  &.checked {
    &::after {
      opacity: 1;
    }

    .fm-navbar__item__title {
      transition: @--color-transition-base;
      color: @--color-text-primary;
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
