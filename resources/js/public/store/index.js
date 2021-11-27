import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import user from '../../common/modules/public/user'
const store = new Vuex.Store({
    modules: {
        user: user,
    }
})

export default store;