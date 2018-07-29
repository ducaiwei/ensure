<template>
  <view class="fm-checkout">
    <view class="form-box">
      <form bindsubmit="formSubmit" bindreset="formReset">
        <view class="item-card">
          <view class="item-card-title">
            <text>{{hotelDetail.name}}
              <text v-if="hotelDetail.branchName">({{hotelDetail.branchName}})</text>
            </text>
          </view>
          <view class="check-list-item" v-for="(item ,index) in selectedItems" :key="index">
            <image :src="item.hallPicture" class="hall-img"/>
            <view class="hall-name">
              <text>
                {{item.hallName}}
              </text>
              <text>
                ({{item.hallAreaDesc}})
              </text>
            </view>
            <text class="block-text price">{{item.insurancePrice}}￥</text>
          </view>
        </view>
        <view class="item-card protect-content-box">
          <view class="item-card-title">
            <text>保障内容</text>
          </view>
          <view class="protection-view">
            <fm-navbar @changeCallBack="handleChange" v-model="navbarChecked" :options="result" size="small"></fm-navbar>
            <swiper @change="handleChange" :current-item-id="navbarChecked" skip-hidden-item-layout duration="300" class="protect-content-swiper">
                <swiper-item :item-id="index"  v-for="(con ,index) in result" :key="index">
                   <scroll-view scroll-with-animation="true" scroll-y :scroll-top="leftToTop" style="height: 300rpx">
                    <view class="content-swipe-item">
                      <view class="swipe-table-content">
                        <view class="tbale-body">
                          <view class="table-tr"  v-for="(d, index2) in con.details" :key="index2">
                            <text>{{d.content}}</text>
                            <text>{{d.detailContent}}</text>
                          </view>
                        </view>
                      </view>
                    </view>
                  </scroll-view>
                </swiper-item>
            </swiper>
          </view>
        </view>
        <view class="item-card form-card">
          <view class="item-card-title">
            <text>投保信息</text>
          </view>
          <view class="form-item">
            <picker mode="date"  class="form-date" :value="startDate" :start="'2015-09-01'" @change="bindDateChange">
             <view class="form-date">
                 保险开始时间: 
                 <text>{{ startDate }}</text>
              </view>
            </picker>
          </view>
           <view class="form-item">
            <picker mode="date" :value="endDate" :start="'2015-09-01'" @change="bindDateChange"  class="form-date">
             <view>
                 保险结束时间: 
                 <text>{{ endDate }}</text>
              </view>
            </picker>
          </view>
          <view class="form-item" v-for="(inputItem,index) in  formInputs" :key="index">
            {{inputItem.name}}:
            <input type="text" class="form-input" v-model="inputs[inputItem.model]" />
          </view>
            <view class="form-item">
            购买分数:
            <input v-model="quantity" type="number" class="quantity-input"/>
            <label class="quantity" @tap="addQuantity">
              <fm-icon icon="icon-plus-circle" color="#09bb07"></fm-icon>
            </label>
          </view>
        </view>
        <view class="item-card" :class="isChecked ? 'append-card' : ''">
          <view class="item-card-title">
            <checkbox-group @change="changeCheckAppend">
              <label class="checkbox">
                <checkbox class="check-box"/>是否购买附加险
              </label>
            </checkbox-group>
          </view>
          <checkbox-group @change="itemCheckChange" v-show="isChecked">
            <view class="append-item"  v-for="(item, index1) in extraEnsures" :key="index1">
              <checkbox class="check-box" :value="item.id"/>
              <text class="name-text">{{item.name}}</text>
              <text class="compens-text">{{item.desc}}</text>
            </view>
            <view class="form-item">
              <label for="input">
                购买份数：
              </label>
              <input type="text" v-model="appendNum" class="quantity-input">
              <label class="quantity" @tap="addAppendNum">
                <fm-icon icon="icon-plus-circle" color="#09bb07"></fm-icon>
              </label>
            </view>
          </checkbox-group>
        </view>
      </form>
    </view>
    <view class="fm-checkout-navbar-fixed">
      <text class="total-price">&nbsp;&nbsp;&nbsp;&nbsp;{{orderAmount.payAmount / 100}}￥</text>
      <fm-button @tap="handlePay" size="xl" type="primary" text="微信支付">
      </fm-button>
    </view>
  </view>
</template>

<script>
import FmButton from '@/components/FmButton'
import FmIcon from '@/components/FmIcon'
import FmNavbar from '@/components/FmOrderNavbar'
import { mapState, mapActions } from 'vuex'

export default {
  components: {
    FmButton,
    FmIcon,
    FmNavbar
  },
  data () {
    return {
      distance: undefined,
      startDate: new Date().Format('yyyy-MM-dd'),
      endDate: new Date(new Date().getTime() + 3 * 24 * 60 * 60 * 1000).Format('yyyy-MM-dd'),
      formInputs: [
          {
            name: '投保公司',
            model: 'company'
          },{
            name: '统一社会信用代码',
            model: 'creditCode'
          },{
            name: '联系人姓名',
            model: 'userName'
          },{
            name: '手机号',
            model: 'mobile'
          },{
            name: '展厅会议名称',
            model: 'meetingName'
          }],
      isChecked: false,
      quantity: 1,
      navbarChecked: 0,
      cellTitles: ['保险责任', '保险明细'],
      result: [],
      inputs: {
        company: '',
        creditCode: '',
        userName: '',
        mobile: '',
        meetingName: ''
      },
      appendNum: 1,
      appendIds: []
    }
  },
  computed: {
    ...mapState(['userToken', 'selectedItems', 'hotelDetail', 
    'extraEnsures', 'selectedIds', 'orderAmount'])
  },
  watch: {
    appendIds (nv, ov) {
      this.queryOrderAmount()
    }
  },
  methods: {
    ...mapActions(['getContentAction', 'getExtraInsuresAction', 
    'queryOrderAmountAction', 'createOrderAction', 'deleteOrderAction']),
    bindDateChange (e) {
      this.startDate = e.mp.detail.value
    },
    handleChange (e) {
      if (typeof e === 'number') {
        this.navbarChecked = e
      } else {
        this.navbarChecked = e.mp.detail.currentItemId
      }
    },
    checkForm () {
      let flag = false
      if (!this.inputs.company) {
        this.$wxp.showToast({
          title: '请填写投保公司',
          icon: 'none'
        })
        return flag
      }
      if (!this.inputs.creditCode) {
        this.$wxp.showToast({
          title: '请填写统一社会信用代码',
          icon: 'none'
        })
        return flag
      }
      if (!this.inputs.userName) {
        this.$wxp.showToast({
          title: '请填写联系人姓名',
          icon: 'none'
        })
        return flag
      }
      if (!this.inputs.mobile) {
        this.$wxp.showToast({
          title: '请填写联系电话',
          icon: 'none'
        })
        return flag
      }
      if (!this.inputs.meetingName) {
        this.$wxp.showToast({
          title: '请填写展厅会议名称',
          icon: 'none'
        })
        return flag
      }
      return true
    }, 
    handlePay () {
      if (this.checkForm()) {
        const params = {}
        params.token = this.userToken
        params.hotelId = this.hotelDetail.hotelId
        params.hotelHallIds = this.selectedIds.join(',')
        params.startDate = this.startDate
        params.endDate = this.endDate
        params.hallBuyCount = this.quantity
        params.extraInsuranceIds = ''
        params.extraInsuranceBuyCount = 0
        params.companyName = this.inputs.company
        params.uniformSocialCreditCode = this.inputs.creditCode
        params.contactsName = this.inputs.userName
        params.contactsMobile = this.inputs.mobile
        params.meetingName = this.inputs.meetingName
        this.createOrderAction(params).then(res => {
          if (res.code === '100') {
            const payParams = {}
            this.$wxp.requestPayment({
              timeStamp: res.result.timestamp,
              nonceStr: res.result.nonceStr,
              package: res.result.packageX,
              signType: res.result.signType,
              paySign: res.result.paySign,
              success: (r) => {
                console.log(r)
              },
              fail: (f) => {
                this.deleteOrderAction({
                  token: this.userToken,
                  oid: res.oid
                }).then(r => {
                  consoe.log(r)
                })
              },
              complete: (result) => {
                console.log(result)
              }
            })
          }
        })
      }
    },
    goTrade () {
      this.$wxp.redirectTo({
        url: `/pages/trade/main?tradeId=td01`
      })
    },
    changeCheckAppend (e) {
      this.isChecked = e.mp.detail.value.length === 0 ? false : true
    },
    itemCheckChange (e) {
      this.appendIds = e.mp.detail.value
    },
    addQuantity () {
      this.quantity = parseInt(this.quantity) + 1
      this.queryOrderAmount()
    },
    addAppendNum () {
      this.appendNum = parseInt(this.appendNum) + 1
    },
    queryInsuranceContent () {
      this.getContentAction({token: this.userToken}).then(res => {
        if (res.code === '100') {
          this.result = res.result
        }
      })
    },
    queryOrderAmount () {
        const params = {}
        params.token = this.userToken
        params.hotelId = this.hotelDetail.hotelId
        params.startDate = this.startDate
        params.hallIds = this.selectedIds.join(',')
        params.endDate = this.endDate
        params.hallBuyCount = this.quantity
        params.extraInsuranceIds = this.appendIds.join(',')
        params.extraInsuranceBuyCount = this.isChecked && this.appendIds.length > 0 ? this.appendNum : 0
        this.queryOrderAmountAction(params)
    }
  },
  mounted () {
    this.queryOrderAmount()
    this.queryInsuranceContent()
    this.getExtraInsuresAction({token: this.userToken})
  }
}
</script>

<style lang="less">
@import "../../asset/style/_variable.less";
.form-box {
  margin-bottom: 80rpx;
}
.fm-checkout {
  min-height: 100%;
  padding-bottom: 56px;
  background-color: @--background-color-base;
  overflow: hidden;
}
.item-card {
  display: block;
  width: 95%;
  margin: auto;
  margin-top: 20rpx;
  padding: 0 4rpx;
  padding-bottom: 20rpx;
  background-color: @--fill-base;
  border-radius: @--border-radius-small;
  border: @--border-width-base @--border-style-base @--border-color-extra-light;
  &.form-card {
    padding-bottom: 0rpx;
  }
}
.item-card-title {
  padding-left: 20rpx;
  padding-top: 20rpx;
}
.check-list-item {
  display: flex;
  padding: 10rpx 20rpx;
  margin-top: 20rpx;
  background-color: #f7f7f7;
  .hall-img {
    display: block;
    width: 100rpx;
    height: 100rpx;
  }
  .block-text {
    display: block;
    text-align: center;
    line-height: 100rpx;
    .item-text-font-size();
  }
  .text-label {
    padding-left: 30rpx;
  }
  .hall-name {
    width: 55%;
    text {
      display: block;
      padding-top: 10rpx;
      text-align: center;
      .item-text-font-size();
    }
  }
  .price {
    color: red;
  }
}
.item-step {
  display: flex;
  width: 160rpx;
  text-align: right;
  input {
    display: block;
    width: 80rpx;
    margin: auto;
    height: 100rpx;
    text-align: center;
  }
  .oper-num {
    font-size: 60rpx;
  }
}
.protect-content-box {
  display: block;
}
.protect-content-item {
  .item-flex();
  text {
    display: block;
    flex: 1;
    text-align: center;
    .item-text-font-size();
  }
  .content-name {
    text-align: left;
  }
}
.form-item {
  position: relative;
  .item-flex();
  .item-text-font-size();
  &:after {
    .setBottomLine(@--border-color-extra-light)
  }
}
.append-item {
  position: relative;
  display:flex;
  align-items: center;
  padding:20rpx;
  text {
    display: block;
    .item-text-font-size();
  }
  .name-text {
    width: 25%;
    text-align: left;
    padding-left: 20rpx;
  }
  .compens-text {
    flex: 1;
    text-align: left;
  }
}
.append-item:after {
  .setBottomLine(@--border-color-extra-light)
}
.form-input {
  display: block;
  flex: 1;
  padding-left: 20rpx;
  height: 80rpx;
}
.quantity-input {
  display: block;
  padding-left: 20rpx;
  width: 80rpx;
  height: 80rpx;
}
.form-date {
  position: relative;
  display: block;
  width: 100%;
  .item-text-font-size();
}
.fm-checkout-navbar-fixed {
  position: fixed;
  width: 100%;
  height: 56px;
  display: flex;
  left: 0;
  bottom: 0;
  z-index: 99;
  .total-price {
    position: absolute;
    display: block;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    line-height: 56px;
    font-size: 18px;
    background-color: @--color-text-regular;
    color: @--color-white;
    z-index: 2;
  }
  button {
    position: absolute;
    right: 0;
    top: 0;
    line-height: 56px;
    display: block;
    width: auto;
    min-width: 64px;
    z-index: 3;
  }
}
.quantity {
  margin-left: 30rpx;
  padding-top: 9rpx;
}
.protect-content-swiper {
  width: 100%;
  height: 300rpx;
}
.content-swipe-item {
  width: 100%;
}
.swipe-item-title {
  display: blcok;
  padding: 20rpx;
  text {
    display: block;
    font-size: 24rpx;
  }
}
.swipe-table-content {
  display: block;
  width: 95%;
  margin: auto;
  border-radius: 2px;
}
.table-head {
  display: flex;
  align-items: center;
  text {
    display: block;
    flex: 1;
    font-size: 28rpx;
    text-align: center;
  }
}
.protection-view {
  width: 95%;
  margin: auto;
  margin-top: 20rpx;
  border: 1px solid rgba(204,204,204, .3);
}
.table-tr {
  display: flex;
  padding: 20rpx 0;
  width: 100%;
  align-items: center;
  border-bottom: 1px dashed rgba(204,204,204, .3);
  text {
    flex: 1;
    text-align: left;
    display: inline-block;
    font-size: 24rpx;
    vertical-align: middle;
  }
  text:last-child {
    flex: 1;
    margin-left: 20rpx;
  }
}
.amount-box {
  position: relative;
  display: flex;
  width: 100%;
  &:after {
    .setBottomLine(@--border-color-extra-light)
  }
  label, input {
    display: block;
  }
  label {
    width: 150rpx;
    height: 80rpx;
    padding-left: 20rpx;
    line-height: 80rpx;
    font-size: 26rpx;
  }
  input {
    flex: 1;
    font-size: 26rpx;
    height: 80rpx;
  }
}
.item-card.append-card {
  padding-bottom: 0rpx;
}
</style>
