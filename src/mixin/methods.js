let getDetailMixin = {
    methods: {
        getDetail (id, page) {
            this.getHotelDetailAction({
               hotelId: id,
               token: this.userToken
            }).then(res => {
                if(page !== 'detail') {
                    this.$wxp.navigateTo({
                        url: '/pages/hotel/main'
                    })
                }
            })
        }
    }
}
export {
    getDetailMixin
}