import api from './api';
export default {
    state:{
        user:[],
        allUsers:[],

    },
    getters:{
        getUser(state){
            return state.user
        },
        getAllUsers(state){
            return state.allUsers
        },

    },
    actions:{
        getUser(context){
            api().get('/api/v1/user/get-auth-user')
                .then((response)=>{
                    context.commit('getAuthUser',response.data.data)
                })
        },
        userLogout(context){
            api().post('/api/v1/user/logout')
                .then((response)=>{
                    context.commit('getAuthUser',response.data)
                })
        },
        getAllUsers(context,payload){
            api().get('/api/v1/user/get-all-users')
                .then((response)=>{
                    context.commit('getAllUsers',response.data.users)
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
    }
}