<template>
    <aside class="main-sidebar sidebar-dark-primary elevation-4">
        <!-- Brand Logo -->
        <router-link :to="{name:'AdminDashboard'}" class="brand-link" >
            <img
                    :src="user.image"
                    alt="Admin Logo"
                    class="brand-image img-circle elevation-3"
                    style="opacity: .8"
            />
            <span class="brand-text font-weight-light">{{user.name}}</span>
        </router-link>

        <!-- Sidebar -->
        <div class="sidebar">
            <!-- Sidebar user (optional) -->


            <!-- Sidebar Menu -->
            <nav class="mt-2">
                <ul
                        class="nav nav-pills nav-sidebar flex-column"
                        data-widget="treeview"
                        role="menu"
                        data-accordion="false"
                >
                    <!-- Add icons to the links using the .nav-icon class
                    with font-awesome or any other icon font library-->

                    <li class="nav-item has-treeview" @click="itemActive($route.name);menuClose($route.name);">
                        <router-link :to="{name:'AdminDashboard'}" class="nav-link" :class="[(item == 'AdminDashboard') ? 'active':'']">
                            <i class="nav-icon fa fa-dashboard"></i>
                            <p>Dashboard</p>
                        </router-link>
                    </li>
                    <li class="nav-item has-treeview"  @click="itemActive($route.name)">
                        <a href="javascript:void(0)" class="nav-link " :class="[(item == 'UserList' || item == 'DriverList') ? 'active':'']">
                            <i class="nav-icon fa fa-users"></i>
                            <p>
                                Users
                                <i class="right fa fa-angle-left"></i>
                            </p>
                        </a>
                        <ul class="nav nav-treeview">
                            <li class="nav-item"  @click="menuDropClose()">
                                <router-link :to="{name:'UserList'}"  class="nav-link UserList" :class="[(item == 'UserList') ? 'active':'']">
                                    <i class="fa fa-circle-o nav-icon"></i>
                                    <p>Customers</p>
                                </router-link>
                            </li>
                        </ul>
                    </li>

                </ul>
            </nav>
            <!-- /.sidebar-menu -->
        </div>
        <!-- /.sidebar -->
    </aside>
</template>

<script>

    export default {
        name: "AdminSidebar",
        data() {
            return {
                item:this.$route.name, // for first load and in curent path
                isMenuOpen: false
            }
        },
        mounted(){
            this.$store.dispatch("getUser");
            // console.log("window.innerHeight----", window.innerHeight);
            // console.log("window.innerWidth---", window.innerWidth);
            if (window.innerWidth <=991) {
                document.body.classList.remove("sidebar-open");
                document.body.classList.add("sidebar-collapse");
            } else{
                document.body.classList.remove("sidebar-collapse");
                document.body.classList.add("sidebar-open");
            }
            $('[data-widget="treeview"]').Treeview('init');
            if(this.$route.name=='UserList' || this.$route.name=='DriverList' || this.$route.name=='VehicleTypeList' || this.$route.name=='VehicleList' || this.$route.name=='AssignVehicleList'){
                $("."+this.$route.name).parent().parent().parent().addClass("menu-open");
            }
        },
        computed:{
            user(){
                return this.$store.getters.getUser
            }
        },
        methods:{
            itemActive(e) {
                this.item = e;
                if (window.innerWidth <=991) {
                    document.body.classList.remove("sidebar-open");
                    document.body.classList.add("sidebar-collapse");
                } else{
                    document.body.classList.remove("sidebar-collapse");
                    document.body.classList.add("sidebar-open");
                }
            },
            menuClose(e){
                $("li").removeClass("menu-open");
                $(".nav-treeview").hide();
            },


            menuDropClose(){
                $("li").removeClass("menu-open");
                $(".nav-treeview").hide();
                let sel = $("."+this.$route.name);
                sel.parent().parent().parent().addClass("menu-open");
                sel.parent().parent().show();
            }
        },

    }
</script>

<style scoped>

</style>