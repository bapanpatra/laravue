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
                <tr>
                    <td>1</td>
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
        },
        computed:{
            user(){
                return this.$store.getters.getUser
            },


        },
    }
</script>

<style scoped>

</style>
