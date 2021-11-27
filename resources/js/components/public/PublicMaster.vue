<template>
    <div id="app" class="bg-light h-screen">
        <Navigation></Navigation>
        <router-view></router-view>

    </div>
</template>

<script>
    import Navigation from "./inc/Navigation";
    export default {
        components: {
            Navigation
        }
    };
</script>

<style>
    .h-screen {
        height: 100vh;
    }
</style>