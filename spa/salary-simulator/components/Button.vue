<script setup lang="ts">
const {click, submit} = defineProps<{
    submit?: boolean,
    click?: (ev: MouseEvent) => void
}>();
</script>

<template>
    <div class="btn-container">
        <button class="btn btn-secondary" @click="click" :type="submit ? 'submit' : 'button'">
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
    font-size: 15px;
    outline: none;
    &:focus{
        transition: filter ease-in-out 0.5s;
        filter: brightness(1.5);
    }
}
.btn-container{
    transition: background-size ease-in-out 0.75s;
    display: inline-block;
    border-radius: 10px;
    border: 1px solid transparent;
    background-repeat: no-repeat;
    background-size: 0% 0%;
    background-position: center;
    background-image: linear-gradient(90deg, #023658 0%, rgba(246, 248, 250, 0.5) 100%, #023658 200%);
    
    &:hover{
        background-size: 400% 400%;
        animation: spinBorder 3s linear infinite;
    }
}
@keyframes spinBorder {
    0% {
        background-position: 0% 25%;
    }
    50% {
        background-position: 100% 50%;
    }
    100% {
        background-position: 0% 25%;
    }
}
</style>