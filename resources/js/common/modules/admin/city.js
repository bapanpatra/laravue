import api from './api';
export default {
    state:{
        allCities:[],

    },
    getters:{
        getAllCities(state){
            return state.allCities
        },
    },
    actions:{
        getAllCities(context,payload){
            api().get('/api/v1/admin/get-all-cities?page='+payload['page']+'&keyword='+payload['keyword'])
                .then((response)=>{
                    context.commit('getAllCities',response.data.cities)
                })
        },


    },
    mutations:{
        getAllCities(state,data){
            return state.allCities = data
        },

    }
}
