<template>
    <nav class="navbar navbar-expand navbar-dark bg-dark">
        <div class="container">
            <div class="navbar-header">
                <router-link class="navbar-brand" :to="{ name: 'Home' }">CodeClouds</router-link>
            </div>

             <ul class="nav navbar-nav" v-if="user && user.id">
                <router-link

                        class="nav-item nav-link"
                        :to="{ name: 'Dashboard' }"
                >
                    Dashboard
                </router-link>
                <a
                        class="nav-item nav-link"

                        @click.prevent="logout"
                        href="#"
                >Logout</a
                >
            </ul>
            <ul class="nav navbar-nav" v-else>
                <router-link

                        class="nav-item nav-link"
                        :to="{ name: 'Login' }"
                >
                    Login
                </router-link>
                <router-link

                        class="nav-item nav-link"
                        :to="{ name: 'Register' }"
                >
                    Register
                </router-link>
                   <router-link

                        class="nav-item nav-link"
                        :to="{ name: 'About' }"

                >
                    About
                </router-link>
            </ul>
        </div>
    </nav>
</template>

<script>

    export default {
        mounted() {
            this.$store.dispatch("getUser")
        },
        computed:{
            user(){
                return this.$store.getters.getUser
            }
        },
        methods: {
            logout() {
                this.$store.dispatch("userLogout");
                        localStorage.removeItem("token");
                        this.$router.push({ name: "Home" });
                        this.$message({
                            showClose: true,
                            message: 'Logout Successfully.',
                            type: 'success'
                        });

            }
        }
    };
</script>

<style>
    .router-link-exact-active {
        color: #ffffff !important;
        transition: all 0.25s;
    }
</style>
