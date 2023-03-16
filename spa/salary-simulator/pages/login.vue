<script setup lang="ts">
const {login, autoLogin, userLogged} = useAuth();
const loginForm = async () => {
    const {data, error} = await login()
    console.log(data);
    console.log(error);
    console.log(userLogged());
    console.log(email.value)
}
const email = useState<string>('email', () => 'Hello');
</script>

<template>
    <main>
        <h1 class="title-l">Hello login</h1>
        <Label forInput="email">E-mail</Label>
        <Input v-model="email" id="email"/>
        <button class="btn btn-primary mx-2" @click="(ev: MouseEvent) => loginForm()">Call without token"</button>
        <button class="btn btn-primary mx-2" @click="(ev: MouseEvent) => autoLogin()">Call with token"</button>
    </main>
</template>

<style lang="scss">

</style>