import api from './api';
export default {
    state:{
        user:[],
        allUsers:[],
        allCharts:[],

    },
    getters:{
        getUser(state){
            return state.user
        },
        getAllUsers(state){
            return state.allUsers
        },

        getAllCharts(state){
            return state.allCharts
        },

    },
    actions:{
        getUser(context){
            api().get('/api/v1/admin/get-auth-user')
                .then((response)=>{
                    context.commit('getAuthUser',response.data.data)
                })
        },
        userLogout(context){
            api().post('/api/v1/admin/logout')
                .then((response)=>{
                    context.commit('getAuthUser',response.data)
                })
        },
        getAllUsers(context,payload){
            api().get('/api/v1/admin/get-all-users?page='+payload['page']+'&keyword='+payload['keyword'])
                .then((response)=>{
                    context.commit('getAllUsers',response.data.users)
                })
        },

        getAllDrivers(context,payload){
            api().get('/api/v1/admin/get-all-drivers?page='+payload['page']+'&keyword='+payload['keyword'])
                .then((response)=>{
                    context.commit('getAllUsers',response.data.users)
                })
        },

        getDrivers(context,payload){
            api().get('/api/v1/admin/get-drivers')
                .then((response)=>{
                    context.commit('getAllUsers',response.data.users)
                })
        },

        getAllCharts(context,payload){
            api().get('/api/v1/admin/get-all-charts')
                .then((response)=>{
                    context.commit('getAllCharts',response.data.charts)
                })
        },


    },
    mutations:{
        getAuthUser(state,data){
            return state.user = data
        },

        getAllUsers(state,data){
            return state.allUsers = data
        },

        getAllCharts(state,data){
            return state.allCharts = data
        },


    }
}
