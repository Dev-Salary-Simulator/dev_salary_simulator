<script setup lang="ts">
defineProps<{
    submit?: boolean,
    click?: (ev: MouseEvent) => void,
    disabled?: boolean,
    classSup?: string
}>();
</script>

<template>
    <div :class="`btn-container${disabled ? ' disabled' : ''} ${classSup ?? ''}`">
        <button class="btn btn-secondary text-s" :disabled="!!disabled" @click="click" :type="submit ? 'submit' : 'button'" :key="`${!!disabled}`">
            <slot></slot>
        </button>
    </div>
</template>

<style lang="scss">
.btn{
    text-transform: uppercase;
    padding: 12px 30px;
    border-radius: 10px;
    box-shadow: $box-shadow;
    outline: none;
    &:focus{
        transition: filter ease-in-out 0.5s;
        filter: brightness(1.5);
    }
}
.btn-container{
    display: inline-block;
    border-radius: 10px;
    border: 1px solid transparent;
    &.disabled{
        opacity: 0.5;
    }
    &:not(.disabled){
        transition: background-size ease-in-out 0.75s;
        background-repeat: no-repeat;
        background-size: 0% 0%;
        background-position: center;
        background-image: linear-gradient(90deg, #023658 0%, rgba(246, 248, 250, 0.5) 100%, #023658 200%);
    }
    &:not(.disabled):hover{
        background-size: 400% 400%;
        animation: buttonBorder 3s linear infinite;
    }
}
</style>