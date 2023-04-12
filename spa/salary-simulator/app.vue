<script setup>
const {getNamesOfJobs} = useJobs();
const {getNamesOfStacks} = useStacks();
const {getNamesOfRegions} = useRegions();
const {autoLogin} = useAuth();
onMounted(async () => {
    getNamesOfJobs();
    getNamesOfStacks();
    getNamesOfRegions();
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