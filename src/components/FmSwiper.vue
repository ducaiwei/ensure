<template>
  <swiper
    :indicator-dots="indicatorDots"
    :indicator-color="indicatorColor"
    :indicator-active-color="indicatorActiveColor"
    :autoplay="autoplay"
    :current="current"
    :current-item-id="currentItemId"
    :interval="interval"
    :duration="duration"
    :vertical="vertical"
    :previous-margin="previousMargin"
    :next-margin="nextMargin"
    :display-multiple-items="displayMultipleItems"
    :skip-hidden-item-layout="skipHiddenItemLayout"
    class="fm-siwper"
    :class="className"
    :style="[
      { 'height': height } +
      elementStyle
    ]"
  >
    <swiper-item
      v-for="(item, index) in items"
      :key="item.id || index"
      class="fm-swiper__item"
      :item-id="item.id || index"
    >
      <fm-image :src="item.src || item" mode="aspectFill" size="100%"></fm-image>
    </swiper-item>
  </swiper>
</template>

<script>
import FmImage from '@/components/FmImage'
export default {
  name: 'FmSwiper',
  components: { FmImage },
  props: {
    indicatorDots: Boolean,
    // indicatorColor: {
    //   type: String,
    //   default: 'rgba(0, 0, 0, .3)'
    // },
    indicatorColor: String,
    // indicatorActiveColor: String,
    indicatorActiveColor: {
      type: String,
      default: '#000000'
    },
    autoplay: Boolean,
    current: Number,
    currentItemId: String,
    interval: Number,
    duration: Number,
    vertical: Boolean,
    previousMargin: String,
    nextMargin: String,
    displayMultipleItems: Number,
    skipHiddenItemLayout: Boolean,
    className: String,
    elementStyle: String,
    height: String,
    items: Array
  },
  data () {
    return {}
  },
  methods: {},
  created () {}
}
</script>

<style lang="less">
.fm-swiper {

}

.fm-swiper__item {}
</style>
