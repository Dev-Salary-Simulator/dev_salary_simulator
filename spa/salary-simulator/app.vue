<script setup>
const {getNamesOfJobs} = useJobs();
const {autoLogin} = useAuth();
onMounted(async () => {
    getNamesOfJobs();
    await autoLogin();
})
</script>

<template>
    <Header></Header>
    <NuxtPage/>
</template>

<style>

</style>