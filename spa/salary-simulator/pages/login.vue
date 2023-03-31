<script setup lang="ts">
definePageMeta({middleware: 'login'});
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
        <div class="row bg-blur">
            
        </div>
        <h1 class="title-l">Hello login</h1>
        <Label forInput="email">E-mail</Label>
        <Input v-model="email" id="email"/>
        <Button :click="(ev: MouseEvent) => registerForm()">Register</Button>
        <Button :click="(ev: MouseEvent) => loginForm()">Login</Button>
        <div class="title-l fade-out">Hello world</div>
    </main>
</template>

<style lang="scss">
.container{

}
</style>