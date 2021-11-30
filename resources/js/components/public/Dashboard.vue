<template>
    <div class="home col-8 mx-auto py-5 mt-5">
        <h1>Dashboard</h1>
        <div class="card">
            <div class="card-body">
                <h3>Hello, {{user.name}}</h3>
                <span>{{user.email}}</span>
            </div>
            <table border="1">
                <tr>
                    <th>Sl No</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Action</th>
                </tr>
                <tr v-for="(user,index) in users.data">
                    <td>{{index+1}}</td>
                    <td>{{user.name}}</td>
                    <td>{{user.email}}</td>
                    <td></td>

                </tr>
            </table>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Dashboard",
        mounted(){
            this.$store.dispatch("getUser")
            this.$store.dispatch('getAllUsers');

        },
        computed:{
            user(){
                return this.$store.getters.getUser
            },
            users(){
               return this.$store.getters.getAllUsers
            }

        },
    }
</script>

<style scoped>

</style>
