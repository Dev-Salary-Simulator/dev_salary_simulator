<script setup lang="ts">
const {login, register} = useAuth();
const loginForm = async () => {
    await login({email: "test@test.com", password: "test1234"})
}
const registerForm = async () => {
    await register({email: "test@test.com", password: "test1234"})
}
const email = useState<string>('email', () => 'Hello');
</script>

<template>
    <main class="container">
        <h1 class="title-l">Hello login</h1>
        <Label forInput="email">E-mail</Label>
        <Input v-model="email" id="email"/>
        <Button :click="(ev: MouseEvent) => registerForm()">Register</Button>
        <Button :click="(ev: MouseEvent) => loginForm()">Login</Button>
    </main>
</template>

<style lang="scss">

</style>