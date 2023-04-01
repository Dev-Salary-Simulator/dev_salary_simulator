<script setup lang="ts">
definePageMeta({middleware: 'seo'});
const {login, register} = useAuth();
const loginForm = async () => {
    await login({email: "test@test.com", password: "test1234"})
}
const registerForm = async () => {
    await register({email: "test@test.com", password: "test1234"})
}
const email = useState<string>('emailLogin', () => '');
const password = ref<string>('');
const confirmPassword = ref<string>('');
</script>

<template>
    <main class="container d-flex flex-column" style="flex-grow: 1;">
        <div class="row bg-blur">
            <h1 class="title-l">Login</h1>
            <form class="col-lg-12 col-6" @submit.prevent="() => loginForm()">
                <div class="row">
                    <div class="col-12">
                        <Input v-model="email" id="emailLogin"/>
                    </div>
                    <div class="col-12">
                        <Input v-model="password" id="passwordLogin"/>
                    </div>
                    <div class="col-12">
                        <Button submit>Login</Button>
                    </div>
                </div>
            </form>
            <h1 class="title-l">Register</h1>
            <form class="col-lg-12 col-6" @submit.prevent="() => registerForm()">
                <div class="row">
                    <div class="col-12">
                        <Input v-model="email" id="emailRegister"/>
                    </div>
                    <div class="col-12">
                        <Input v-model="password" id="passwordRegister"/>
                    </div>
                    <div class="col-12">
                        <Input v-model="confirmPassword" id="confirmPassword"/>
                    </div>
                    <div class="col-12">
                        <Button submit>Register</Button>
                    </div>
                </div>
            </form>
        </div>
    </main>
</template>

<style lang="scss">

</style>