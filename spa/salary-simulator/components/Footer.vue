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
            <div class="col-lg-6 d-none d-lg-flex align-items-center">
                <span style="color: rgb(0 220 130)">Powered with Nuxt 
                    <img class="ms-1" src="/favicon.ico" alt="nuxt-icon">
                </span>
            </div>
            <div class="col-lg-6 col-12 text-end mt-4">
                <ul class="d-flex justify-content-end">
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