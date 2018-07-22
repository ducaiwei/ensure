<template>
    <view>
        <button open-type="getUserInfo" @getuserinfo="getUserInfo" v-show="unAuthor" class="">授权登录</button>
        <view class="loading-box" v-show="!unAuthor">
            <text>数据请求中...</text>
        </view>
    </view>
</template>
<script>
import store from '@/store'
import { mapState,mapActions } from 'vuex'
import { getDetailMixin } from "../../mixin/methods.js";
export default {
    data () {
        return {
            unAuthor: false
        }
    },
    created () {
        this.userLogin()
    },
    computed: {
        ...mapState(['userToken', 'hotels'])
    },
    mixins: [getDetailMixin],
    methods: {
        ...mapActions(['getUserTokenAction','getNearHotelsAction','getHotelDetailAction']),
        getLocation () {
            this.$wxp.getLocation().then(res => {
                this.getNearHotelsAction({
                    token: this.userToken,
                    longitude: res.longitude,
                    latitude: res.latitude
                }).then(re => {
                    if (re.code === '100') {
                        this.getDetail(this.hotels[0].hotelId)
                    }
                })
            })
        },
        getUserAuth () {
            this.$wxp.getUserInfo().then(res => {
                if (res)  {
                    this.$wxp.setStorage({
                        key: 'userInfo',
                        data: res
                    })
                    this.$wxp.showNavigationBarLoading()
                } else {
                    this.unAuthor = true
                }
            }, err => {
                this.unAuthor = true
                console.error(err)
            })
        },
        userLogin () {
            this.$wxp.login().then(res => {
                console.log(res)
                if (res) {
                   this.getUserTokenAction({code: res.code, 
                   encryptMesage: '360bb48b-5316-458a-903e-9a44c7f339b1'}).then(res => {
                       if (res.code === '100') {
                           this.$wxp.setStorage({
                               key: 'token',
                               data: res.result
                           })
                           this.getLocation()
                       }
                   }, err => {

                   })
               }
            })
        }
    }
}
</script>
<style lang="less" scoped>
    button {
        display: block;
        width: 90%;
        height: 80rpx;
        margin: auto;
        line-height: 80rpx;
        margin-top: 300rpx;
    }
    .loading-box {
        margin-top: 300rpx;
        font-size: 24rpx;
        color: #ccc;
        text-align: center;
    }
</style>
