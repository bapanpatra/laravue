import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import user from '../../common/modules/admin/user'
import good from '../../common/modules/admin/good'
import vehicleType from '../../common/modules/admin/vehicle_type'
import vehicle from '../../common/modules/admin/vehicle'
import promocodes from '../../common/modules/admin/promo_codes'
import setting from '../../common/modules/admin/setting'
import order from '../../common/modules/admin/order'
import state from '../../common/modules/admin/state'
import city from '../../common/modules/admin/city'
import banner from '../../common/modules/admin/banner'
const store = new Vuex.Store({
    modules: {
        user: user,
        good: good,
        vehicleType: vehicleType,
        vehicle: vehicle,
        promocodes: promocodes,
        setting: setting,
        order: order,
        state: state,
        city: city,
        banner: banner,
    }
})

export default store;