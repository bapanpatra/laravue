import api from './api';
export default {
    state:{
        allPromoCodes:[],

    },
    getters:{
        getAllPromoCodes(state){
            return state.allPromoCodes
        },


    },
    actions:{
        getAllPromoCodes(context,payload){
            api().get('/api/v1/admin/get-all-promo-codes?page='+payload['page']+'&keyword='+payload['keyword'])
                .then((response)=>{
                    context.commit('getAllPromoCodes',response.data.promo_codes)
                })
        },


    },
    mutations:{
        getAllPromoCodes(state,data){
            return state.allPromoCodes = data
        },

    }
}
