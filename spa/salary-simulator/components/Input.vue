<script setup lang="ts">
const {modelValue} = defineProps<{
    modelValue: string | number,
    type?: string,
    id?: string,
    placeholder?: string,
    min?: number,
    max?: number
}>();
const emit = defineEmits<{
    (ev: 'update:modelValue', value: string | number): void
}>();
const handleInput = (ev: Event) => {
    const target = ev.target as HTMLInputElement;
    emit('update:modelValue', typeof modelValue === "number" ? parseInt(target.value) : target.value);
}
</script>

<template>
    <input :id="id" :type="type || 'text'" :placeholder="placeholder || 'Default placeholder'" :value="modelValue" @input="handleInput" :min="min" :max="max">
</template>

<style lang="scss">
input{
    height: 52px;
    font-size: 20px;
    color: $light;
    background-color: rgba($light, 0.3);
    border: none;
    border-radius: 10px;
    padding: 12px 18px;
    &:placeholder-shown{
        font-size: 20px;
        color: $grey;
    }
    &:focus{
        outline: none
    }
}
</style>


