import api from './api';
export default {
    state:{
        setting:[],

    },
    getters:{
        getSetting(state){
            return state.setting
        },


    },
    actions:{
        getSetting(context){
            api().get('/api/v1/admin/get-setting')
                .then((response)=>{
                    context.commit('getSetting',response.data.setting)
                })
        },

    },
    mutations:{
        getSetting(state,data){
            return state.setting = data
        },

    }
}
