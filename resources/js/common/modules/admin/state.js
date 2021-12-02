import api from './api';
export default {
    state:{
        allStates:[],
        states:[],

    },
    getters:{
        getAllStates(state){
            return state.allStates
        },
        states(state){
            return state.states
        },

    },
    actions:{
        getAllStates(context,payload){
            api().get('/api/v1/admin/get-all-states?page='+payload['page']+'&keyword='+payload['keyword'])
                .then((response)=>{
                    context.commit('getAllStates',response.data.states)
                })
        },
        getStates(context,payload){
            api().get('/api/v1/admin/get-states')
                .then((response)=>{
                    context.commit('getStates',response.data.states)
                })
        },

    },
    mutations:{
        getAllStates(state,data){
            return state.allStates = data
        },
        getStates(state,data){
            return state.states = data
        },
    }
}
