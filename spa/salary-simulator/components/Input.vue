<script setup lang="ts">
const {modelValue, type} = defineProps<{
    modelValue: string | number,
    type?: string,
    id?: string
}>();
const emit = defineEmits<{
    (ev: 'update:modelValue', value: string | number): void
}>();
const handleInput = (ev: Event) => {
    const target = ev.target as HTMLInputElement;
    emit('update:modelValue', target.value);
}
</script>

<template>
    <input :id="id" :type="type || 'text'" placeholder="test" :value="modelValue" @input="handleInput">
</template>

<style lang="scss">
input{
    height: 87px;
    font-size: 20px;
    color: $dark;
    background-color: rgba($light, 0.3);
    border: none;
    border-radius: 10px;
    padding: 30px;
}
input:placeholder-shown{
    font-size: 20px;
    color: $grey;
    text-transform: uppercase;
}
input:focus{
    outline: none
}
</style>