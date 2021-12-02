import api from './api';
export default {
    state:{
        allVehicleTypes:[],
        vehicleTypes:[],

    },
    getters:{
        getAllVehicleTypes(state){
            return state.allVehicleTypes
        },
        vehicleTypes(state){
            return state.vehicleTypes
        },

    },
    actions:{
        getAllVehicleTypes(context,payload){
            api().get('/api/v1/admin/get-all-vehicle-types?page='+payload['page']+'&keyword='+payload['keyword'])
                .then((response)=>{
                    context.commit('getAllVehicleTypes',response.data.vehicle_types)
                })
        },
        getVehicleTypes(context,payload){
            api().get('/api/v1/admin/get-vehicle-types')
                .then((response)=>{
                    context.commit('getVehicleTypes',response.data.vehicle_types)
                })
        },

    },
    mutations:{
        getAllVehicleTypes(state,data){
            return state.allVehicleTypes = data
        },
        getVehicleTypes(state,data){
            return state.vehicleTypes = data
        },
    }
}
