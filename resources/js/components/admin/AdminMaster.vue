<template>
    <div id="app" class="bg-light h-screen">
        <router-view></router-view>
    </div>

</template>

<script>
    import "../../../../node_modules/admin-lte/plugins/jquery/jquery.min.js";
    import "../../../../node_modules/admin-lte/dist/js/adminlte.js";
    export default {
        name: "AdminMaster",

    }
</script>

<style scoped>
    @import url("https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css");
    @import url("../../../../node_modules/bootstrap/dist/css/bootstrap.min.css");
    @import url("../../../../node_modules/admin-lte/dist/css/adminlte.min.css");
    @import url("https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700");
    @import "../../../sass/style.scss";

</style>