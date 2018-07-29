let getDetailMixin = {
    methods: {
        getDetail (id, page) {
            this.getHotelDetailAction({
               hotelId: id,
               token: this.userToken
            }).then(res => {
                if(page !== 'detail') {
                    this.$wxp.redirectTo({
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