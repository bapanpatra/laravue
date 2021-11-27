import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)


import Home from '../../components/public/Home.vue'
import Login from '../../components/public/Login.vue'
import Register from '../../components/public/Register.vue'
import Dashboard from '../../components/public/Dashboard.vue'






const router = new VueRouter({
    mode:'history',
    routes:[
        {
            path: "/",
            name: "Home",
            component: Home
        },
        {
            path: "/login",
            name: "Login",
            component: Login,
            meta: { guestOnly: true }
        },
        {
            path: "/register",
            name: "Register",
            component: Register,
            meta: { guestOnly: true }
        },
        {
            path: "/dashboard",
            name: "Dashboard",
            component: Dashboard,
            meta: { authOnly: true }
        },
        {
            path: '*',
            name: "Home1",
            component: Home
        }

    ],


})

function isLoggedIn() {
    return localStorage.getItem("token");
}

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.authOnly)) {
        // this route requires auth, check if logged in
        // if not, redirect to login page.
        if (!isLoggedIn()) {
            next({
                path: "/login",
             //   query: { redirect: to.fullPath }
            });
        } else {
            next();
        }
    } else if (to.matched.some(record => record.meta.guestOnly)) {
        // this route requires auth, check if logged in
        // if not, redirect to login page.
        if (isLoggedIn()) {
            next({
                path: "/dashboard",
              //  query: { redirect: to.fullPath }
            });
        } else {
            next();
        }
    } else {
        next(); // make sure to always call next()!
    }
});


export default router;

