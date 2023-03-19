<script setup lang="ts">
const {namesJobs} = useJobs();
</script>

<template>
    <main>
        <h1>Hello Index</h1>
        <ul>
            <li v-for="n in namesJobs">{{ n }}</li>
        </ul>
    </main>
</template>

<style lang="scss">

</style>