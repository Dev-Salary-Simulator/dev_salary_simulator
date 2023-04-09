<script setup lang="ts">
definePageMeta({middleware: ['seo', 'auth']});
const {savedSimulations, getSimulations, editSimulation, deleteSimulation} = useSimulation();

onMounted(async () => {
    await getSimulations();
    console.log(savedSimulations.value);
})
</script>

<template>
    <main class="container mb-5" id="simulations-page">
        <div class="row justify-content-center mb-4">
            <div class="col-12">
                <h3 class="title-l">Resume</h3>
            </div>
            <div class="col-12 bg-blur py-3 px-4">
                TODO : Resume
            </div>
        </div>
        <div class="row justify-content-center saved-list">
            <div class="col-12">
                <h3 class="title-l">My saved simulations</h3>
            </div>
            <RecapForm v-for="simu in savedSimulations" class="mb-3" :data="simu" type="savedSimulation"/>
        </div>
    </main>
</template>

<style lang="scss">
#simulations-page{
    .saved-list{
        & > .row{
            margin-bottom: 20px;
        }
    }
}
</style>