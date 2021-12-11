<template>

    <footer class="main-footer" v-if="$route.name!='AdminLogin'">
        <div class="float-right d-none d-sm-block">
            <b>Version</b> 1.0
        </div>
        <strong>Copyright &copy; 2020-2021 <a href="#">Sendit</a>.</strong> All rights
        reserved.
        reserved.
    </footer>


</template>

<script>
    export default {
        name: "AdminFooter"
    }
</script>

<style scoped>

</style>