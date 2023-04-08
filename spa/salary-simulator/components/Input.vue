<script setup lang="ts">
const {modelValue} = withDefaults(defineProps<{
    modelValue: string | number,
    type?: string,
    id?: string,
    placeholder?: string,
    min?: number,
    max?: number,
    validation?: boolean
}>(), {
    validation: undefined
});
const emit = defineEmits<{
    (ev: 'update:modelValue', value: string | number): void
}>();
const handleInput = (ev: Event) => {
    const target = ev.target as HTMLInputElement;
    emit('update:modelValue', typeof modelValue === "number" ? parseInt(target.value) : target.value);
}
</script>

<template>
    <input 
    :id="id" :type="type || 'text'" 
    :placeholder="placeholder || 'Default placeholder'" 
    :value="modelValue" @input="handleInput" 
    :min="min" :max="max"
    :class="`${!modelValue ? '' : validation === true ? 'validate' : validation === false && ('no-validate')}`">
</template>

<style lang="scss">

</style>


