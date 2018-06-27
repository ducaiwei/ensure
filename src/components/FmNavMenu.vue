<template>
  <view class="fm-nav-menu" :class="className" :style="elementStyle">
    <view
      class="fm-nav-menu__item"
      :class="[
        { 'checked': item.value === _checked.value },
        itemClassName
      ]"
      :style="itemElementStyle"
      :hover-class="item.value === _checked.value ? '' : 'active'"
      v-for="(item, index) in options"
      :key="index"
      @click="handleChecked(item)"
    >
      {{ item.label }}
    </view>
  </view>
</template>

<script>
export default {
  name: 'FmNavMenu',
  model: {
    prop: 'checked',
    event: 'change'
  },
  props: {
    checked: Object,
    options: Array,
    className: String,
    elementStyle: String,
    itemClassName: String,
    itemElementStyle: String
  },
  computed: {
    _checked: {
      get () {
        const options = this.options
        const checked = this.checked || options[0]
        return checked
      },
      set (val) {
        this.$emit('change', val)
      }
    }
  },
  methods: {
    handleChecked (item) {
      this._checked = item
    }
  }
}
</script>

<style lang="less">
@import "../asset/style/_variable.less";
@--navbar-transition: all .2s cubic-bezier(.645,.045,.355,1);

.fm-nav-menu {
  flex: none;
  display: block;
  background-color: @--background-color-base;
  color: @--color-text-secondary;
  font-size: @--font-size-small;
  box-sizing: border-box;
  overflow: hidden;
}

.fm-nav-menu__item {
  position: relative;
  display: block;
  padding: 15px 10px;
  box-sizing: inherit;
  text-align: justify;
  transition: @--navbar-transition;

  &::before {
    .setActive();
    transition: @--navbar-transition;
  }

  &::after {
    position: absolute;
    content: "";
    top: 0;
    bottom: 0;
    left: 0;
    width: 3px;
    background-color: @--color-primary;
    opacity: 0;
  }

  &.active {
    &::before {
      opacity: .08;
    }
  }

  &.checked {
    background-color: @--fill-base;
    color: @--color-text-primary;
    font-weight: @--font-weight-blod;

    // &::before {
    //   position: absolute;
    //   top: -20px;
    //   right: 0;
    //   width: 20px;
    //   height: 20px;
    //   background-color: transparent;
    //   content: "";
    //   border-bottom-right-radius: 50%;
    //   box-shadow: 10px 10px 0 10px #ffffff;
    // }

    // &::after {
    //   position: absolute;
    //   right: 0;
    //   bottom: -20px;
    //   width: 20px;
    //   height: 20px;
    //   background-color: transparent;
    //   content: "";
    //   border-top-right-radius: 50%;
    //   box-shadow: 10px -10px 0 10px #ffffff;
    // }

    &::after {
      opacity: 1;
    }
  }
}
</style>
