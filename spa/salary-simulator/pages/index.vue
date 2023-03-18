<script setup lang="ts">
const {namesJob} = useJobs();

</script>

<template>
    <main>
        <h1>Hello Index</h1>
        <ul>
            <li v-for="j in namesJob">{{ j }}</li>
        </ul>
    </main>
</template>

<style lang="scss">

</style>