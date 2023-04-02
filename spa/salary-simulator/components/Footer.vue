<script setup lang="ts">

</script>

<template>
    <footer class="container-fluid">
        <div class="row">
            <NuxtLink class="col-12 text-center title-m text-light" to="/">Dev Salary Simulator</NuxtLink>
            <span class="col-12 text-center text-s">@Copyright 2023</span>
        </div>
        <div class="row">
            
        </div>
        <div class="row align-items-end">
            <div class="col-md-6 d-none d-md-block">
                <span class="d-flex align-items-center" style="color: rgb(0 220 130)">
                    <img class="me-1" src="/favicon.ico" alt="nuxt-icon">Powered with Nuxt
                </span>
            </div>
            <div class="col-md-6 col-12 text-end mt-4">
                <ul class="d-flex justify-content-md-end justify-content-center">
                    <li>
                        <NuxtLink class="text-s" target="_blank" to="https://github.com/LoickHommet">LoickHommet</NuxtLink>
                    </li>
                    <li>
                        <NuxtLink class="text-s" target="_blank" to="https://github.com/Faez-B">Faez-B</NuxtLink>
                    </li>
                    <li>
                        <NuxtLink class="text-s" target="_blank" to="https://github.com/wezerg">wezerg</NuxtLink>
                    </li>
                    <li>
                        <NuxtLink class="text-s" target="_blank" to="https://github.com/Nassimgc">Nassimgc</NuxtLink>
                    </li>
                </ul>
            </div>
        </div>
    </footer>
</template>

<style lang="scss">
footer{
    padding: 20px;
    & ul{
        list-style-type: none;
        padding: 0;
        margin: 0;
        & li{
            margin: 4px;
        }
    }
}
</style>