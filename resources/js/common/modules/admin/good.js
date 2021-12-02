import api from './api';
export default {
    state:{
        allGoods:[],
        goods:[],

    },
    getters:{
        getAllGoods(state){
            return state.allGoods
        },
        goods(state){
            return state.goods
        },

    },
    actions:{
        getAllGoods(context,payload){
            api().get('/api/v1/admin/get-all-goods?page='+payload['page']+'&keyword='+payload['keyword'])
                .then((response)=>{
                    context.commit('getAllGoods',response.data.goods)
                })
        },
        getGoods(context,payload){
            api().get('/api/v1/admin/get-goods')
                .then((response)=>{
                    context.commit('getGoods',response.data.goods)
                })
        },

    },
    mutations:{
        getAllGoods(state,data){
            return state.allGoods = data
        },
        getGoods(state,data){
            return state.goods = data
        },
    }
}
