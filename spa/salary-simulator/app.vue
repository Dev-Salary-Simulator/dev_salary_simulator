<script setup>
const {getNamesOfJobs} = useJobs();
const {getNamesOfStacks} = useStacks();
const {autoLogin} = useAuth();
onMounted(async () => {
    getNamesOfJobs();
    getNamesOfStacks();
    await autoLogin();
})
</script>

<template>
    <Header></Header>
    <NuxtPage/>
    <Footer></Footer>
</template>

<style>

</style>