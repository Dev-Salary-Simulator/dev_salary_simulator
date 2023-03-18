<script setup lang="ts">
const {login} = useAuth();
const loginForm = async () => {
    await login({email: "test", password: "test"})
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