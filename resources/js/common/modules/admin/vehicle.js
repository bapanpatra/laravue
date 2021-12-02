import api from './api';
export default {
    state:{
        allVehicles:[],
        allDriverVehicle:[],

    },
    getters:{
        getAllVehicles(state){
            return state.allVehicles
        },
        getAllDriverVehicle(state){
            return state.allDriverVehicle
        },

    },
    actions:{
        getAllVehicles(context,payload){
            api().get('/api/v1/admin/get-all-vehicles?page='+payload['page']+'&keyword='+payload['keyword'])
                .then((response)=>{
                    context.commit('getAllVehicles',response.data.vehicles)
                })
        },
        getAllDriverVehicle(context,payload){
            api().get('/api/v1/admin/get-all-driver-vehicle?page='+payload['page']+'&keyword='+payload['keyword'])
                .then((response)=>{
                    context.commit('getAllDriverVehicle',response.data.vehicles)
                })
        },
        getVehicles(context,payload){
            api().get('/api/v1/admin/get-vehicles')
                .then((response)=>{
                    context.commit('getAllVehicles',response.data.vehicles)
                })
        },

    },
    mutations:{
        getAllVehicles(state,data){
            return state.allVehicles = data
        },
        getAllDriverVehicle(state,data){
            return state.allDriverVehicle = data
        },
    }
}
