<script>
export default {
  created () {
    console.log('app-created')
  },
  mounted () {
    console.log('app-mounted')
  },
  onLaunch () {
    console.log('app-onLaunch')
  },
  onShow () {
    console.log('app-onShow')
  },
  methods: {
    getLocation () {
      this.$wxp.getLocation().then(res => {
        console.log(res)
      })
    },
    getAppOptions () {
      const options = this.$root.$mp.appOptions
    }
  }
}
</script>

<style lang="less">
@import "./asset/style/index.less";
</style>
