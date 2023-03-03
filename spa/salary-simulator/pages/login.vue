<script setup lang="ts">
import useAuthService from '~~/services/authService';

const {login, autoLogin} = await useAuthService();
const loginForm = async () => {
    const {data, error} = await login()
    console.log(data);
    console.log(error);
}
</script>

<template>
    <main>
        <h1>Hello login</h1>
        <button class="btn btn-success mx-2" @click="(ev: MouseEvent) => loginForm()">Call without token"</button>
        <button class="btn btn-success mx-2" @click="(ev: MouseEvent) => autoLogin()">Call with token"</button>
    </main>
</template>

<style lang="scss">

</style>