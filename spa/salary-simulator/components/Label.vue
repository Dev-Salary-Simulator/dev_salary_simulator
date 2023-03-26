<script setup lang="ts">
defineProps<{
    forInput?: string,
    blueLabel?: boolean
}>();
</script>

<template>
    <label :for="forInput" :class="`text-l ${blueLabel ? 'blue-label' : ''}`">
        <slot></slot>
    </label>
</template>

<style lang="scss">
label{
    margin-bottom: 20px;
    &.blue-label{
        color: $primary;
        text-transform: none;
        font-weight: 700;
        text-align: center;
    }
}
</style>