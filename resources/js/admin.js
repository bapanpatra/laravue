
require('./bootstrap');
import "bootstrap/dist/css/bootstrap.min.css";
window.Vue = require('vue');

// import Vuex from 'vuex'
// Vue.use(Vuex)
// import storeData from "./public/store/index"
// const store = new Vuex.Store(
//     storeData
// )
import store from "./admin/store/index"
//support moment js
import {filter} from './common/filter'
// router
import router from './admin/route/router';
// Vue.component('example-component', require('./components/ExampleComponent.vue').default);





// V-form
import { Form, HasError, AlertError } from 'vform'

Vue.component(HasError.name, HasError)
Vue.component(AlertError.name, AlertError)
window.Form = Form;

//Element UI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import locale from 'element-ui/lib/locale/lang/en'

Vue.use(ElementUI, { locale })






// add these before Vue is instantiated
axios.defaults.baseURL = 'https://laravel.gowebbidemo.com/122245/public/';

Vue.component('admin-main', require('./components/admin/AdminMaster').default);
const app = new Vue({
    el: '#app',
    router,
    store
});
