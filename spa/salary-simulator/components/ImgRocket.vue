<script setup lang="ts">
defineProps<{
    classSup?: string
}>()
</script>
<template>
    <div :class="`img-rocket ${classSup ?? ''}`">
        <img :src="'/img/rocket.png'" alt="rocket">
        <img :src="'/img/cloud.png'" alt="cloud">
    </div>
</template>
<style lang="scss">
.img-rocket{
    position: relative;
    height: 100%;
    & img{
        position: absolute;
        z-index: 5;
        &:nth-child(1){
            width: 50%;
            left: 0;
            right: 0;
            transform: translateY(-50%) translateX(50%);
            animation: rocketEffect 3s ease-in-out infinite;
        }
        &:nth-child(2){
            width: 30%;
            right: 0;
            top: 0;
            animation: cloudEffect 4s linear infinite;
        }
    }
}
</style>