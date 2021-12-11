<template>
    <div class="wrapper">
        <AdminHeader></AdminHeader>
        <AdminSidebar></AdminSidebar>

        <div class="content-wrapper">
            <router-view></router-view>
        </div>

        <AdminFooter></AdminFooter>

        <aside class="control-sidebar control-sidebar-dark"></aside>
        <div id="sidebar-overlay" @click="toggleMenuSidebar()"></div>
    </div>
</template>

<script>
    import AdminHeader from "./inc/AdminHeader.vue"
    import AdminFooter from "./inc/AdminFooter.vue"
    import AdminSidebar from "./inc/AdminSidebar.vue"
    function resizeWindow() {
        // console.log("window.innerHeight", window.innerHeight);
        // console.log("window.innerWidth", window.innerWidth);
        if (window.innerWidth <=991) {
            document.body.classList.remove("sidebar-open");
            document.body.classList.add("sidebar-collapse");
        } else{
            document.body.classList.remove("sidebar-collapse");
            document.body.classList.add("sidebar-open");
        }
    }
    export default {
        name: "AdminHome",
        components: {
            AdminHeader,
            AdminFooter,
            AdminSidebar,
        },
        methods:{
            toggleMenuSidebar() {
                if (document.body.classList.contains("sidebar-open")) {
                    document.body.classList.remove("sidebar-open");
                    document.body.classList.add("sidebar-collapse");
                } else if (document.body.classList.contains("sidebar-collapse")) {
                    document.body.classList.remove("sidebar-collapse");
                    document.body.classList.add("sidebar-open");
                }
            }
        },
        created: function() {
            window.addEventListener("resize", resizeWindow);
        },
        destroyed: function() {
            window.removeEventListener("resize", resizeWindow, false);
        }
    };
</script>

<style scoped>
</style>