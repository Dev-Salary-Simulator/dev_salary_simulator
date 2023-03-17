<script setup lang="ts">
const {login, userLogged} = useAuth();
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
    <main class="container">
        <h1 class="title-l">Hello login</h1>
        <Label forInput="email">E-mail</Label>
        <Input v-model="email" id="email"/>
        <Button :click="(ev: MouseEvent) => loginForm()">Login</Button>
    </main>
</template>

<style lang="scss">

</style>