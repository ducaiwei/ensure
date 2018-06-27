<template>
  <canvas :canvas-id="canvasId" class="fm-code" />
</template>

<script>
export default {
  name: 'FmCode',
  props: {
    canvasId: String,
    code: String,
    size: Number,
    height: Number,
    width: Number,
    mode: {
      type: String,
      default: 'qrcode',
      validator (value) {
        return [
          'qrcode',
          'barcode'
        ].indexOf(value) > -1
      }
    }
  },
  computed: {
    _height () {
      return this.height || this.size || '300'
    },
    _width () {
      return this.width || this.size || '300'
    }
  },
  methods: {
    setCode () {
      const mode = this.mode
      const canvasId = this.canvasId
      const code = this.code
      const height = this._height
      const width = this._width
      switch (mode) {
        case 'qrcode':
          this.$wxbarcode.qrcode(canvasId, code, width, height)
          break
        case 'barcode':
          this.$wxbarcode.barcode(canvasId, code, width, height)
          break
      }
    }
  },
  mounted () {
    this.setCode()
  }
}
</script>

<style lang="less">
.fm-code {
  position: relative;
  display: block;
  box-sizing: border-box;
}
</style>
