<script setup lang="ts">
defineProps<{
    forInput?: string,
}>();
</script>

<template>
    <label :for="forInput" class="text-l">
        <slot></slot>
    </label>
</template>

<style lang="scss">
label{
    margin-bottom: 20px;
}
</style>