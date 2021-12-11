import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)


import AdminLogin from '../../components/admin/auth/AdminLogin.vue'
import AdminHome from '../../components/admin/AdminHome.vue'
import AdminDashboard from '../../components/admin/dashboard/Dashboard.vue'
import UserProfile from '../../components/admin/auth/Profile.vue'
import UserSetting from '../../components/admin/auth/Setting.vue'





const router = new VueRouter({
    mode:'history',
    routes:[
        {
            path:'/admin',
            name: "AdminHome",
            component: AdminHome,
            children: [
                { path:'/admin/profile',
                    component:UserProfile,
                    name:'UserProfile',
                    meta: {title: 'Profile' }
                },
                { path:'/admin/setting',
                    component:UserSetting,
                    name:'UserSetting',
                    meta: {title: 'Setting' }
                },
                {
                    path: "/admin/dashboard",
                    name: "AdminDashboard",
                    component: AdminDashboard,
                    meta: {title: 'Dashboard' }
                },
            ]
        },
        {
            path: "/admin/admin-login",
            name: "AdminLogin",
            component: AdminLogin,
            meta: {title: 'Login' }
        },

        {
            path: '*',
            name: "Home",
            component: AdminHome,
            meta: {title: 'Home' }
        }
    ],


})

function isLoggedIn() {
    return localStorage.getItem("api_token");
}

router.beforeEach((to, from, next) => {
    const isAuthenticated= localStorage.getItem('api_token') ? true : false;
    if (to.name !== 'AdminLogin' && !isAuthenticated) next({ name: 'AdminLogin' })
    else if (to.name === 'AdminLogin' && isAuthenticated) next({ name: 'AdminDashboard' })
    else next()
})
router.afterEach((to, from) => {
    if (to.meta && to.meta.title) {
        document.title = 'Admin | '+to.meta.title;
    }
});



export default router;

