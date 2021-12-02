import api from './api';
export default {
    state:{
        allBanners:[],
        banners:[],

    },
    getters:{
        getAllBanners(state){
            return state.allBanners
        },
        banners(state){
            return state.banners
        },

    },
    actions:{
        getAllBanners(context,payload){
            api().get('/api/v1/admin/get-all-banners?page='+payload['page']+'&keyword='+payload['keyword'])
                .then((response)=>{
                    context.commit('getAllBanners',response.data.banners)
                })
        },
        getBanners(context,payload){
            api().get('/api/v1/admin/get-banners')
                .then((response)=>{
                    context.commit('getBanners',response.data.banners)
                })
        },

    },
    mutations:{
        getAllBanners(state,data){
            return state.allBanners = data
        },
        getBanners(state,data){
            return state.banners = data
        },
    }
}
