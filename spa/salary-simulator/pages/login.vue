<script setup lang="ts">
const {login, autoLogin, userLogged} = useAuth();
const loginForm = async () => {
    const {data, error} = await login()
    console.log(data);
    console.log(error);
    console.log(userLogged());
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