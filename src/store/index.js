import Vue from 'vue'
import Vuex from 'vuex'
import { api } from '@/api'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    userToken: '',
    hotels: [],
    hotelDetail: null,
    selectedItems: [],
    orderAmount: {},
    extraEnsures: [],
    selectedIds: []
  },
  mutations: {
    setUserToken (state, data) {
      state.userToken = data
    },
    setHotels (state, data) {
      state.hotels = data
    },
    setDetail (state, data) {
      state.hotelDetail = data
    },
    setSelectedItems (state, data) {
      state.selectedItems = data
    },
    setExtraInsures (state, data) {
      state.extraEnsures = data
    },
    setOrderAmount (state, data) {
      state.orderAmount = data
    },
    setSelectedIds (state, data) {
      state.selectedIds = data
    }
  },
  actions: {
    getUserTokenAction ({commit}, params) {
      return api.requests.getToken(params).then(res => {
        if (res.code === '100') {
          commit('setUserToken', res.result)
        }
        return res
      }, err => {
        console.error(err)
      })
    },
    getNearHotelsAction ({commit}, params) {
      return api.requests.getNearHotels(params).then(res => {
        if (res.code === '100') {
          commit('setHotels', res.result)
        }
        return res
      }, err => {
        console.error(err)
      })
    },
    getHotelDetailAction ({commit}, params) {
      return api.requests.getHotelDetail(params).then(res => {
        if (res.code === '100') {
          commit('setDetail', res.result)
        }
        return res
      }, err => {
        console.error(err)
      })
    },
    getHallsPriceAction ({commit}, params) {
      return api.requests.getHallsPrice(params).then(res => {
        return res
      }, err => {
        console.error(err)
      })
    },
    getContentAction ({commit}, params) {
      return api.requests.queryContent(params).then(res => {
        return res
      }, err => {
        console.error(err)
      })
    },
    setSelectedItemsAction ({commit}, params) {
      commit('setSelectedItems', params)
    },
    getExtraInsuresAction ({commit}, params) {
      return api.requests.queryExtraInsures(params).then(res => {
        if (res.code === '100') {
          commit('setExtraInsures', res.result)
        }
      }, err => {
        console.error(err)
      })
    },
    queryOrderAmountAction ({commit}, params) {
      return api.requests.queryOrderAmount(params).then(res => {
        if (res.code === '100') {
          commit('setOrderAmount', res.result)
        }
        return res
      }, err => {
        console.error(err)
      })
    },
    setSeletedIdsAction ({commit}, params) {
      commit('setSelectedIds', params)
    }
  }
})

Vue.prototype.$store = store

export default store
