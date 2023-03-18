<script setup>
const {getNamesOfJobs} = useJobs();
onMounted(async () => {
    await getNamesOfJobs();
})
</script>

<template>
    <Header></Header>
    <NuxtPage/>
</template>

<style>

</style>