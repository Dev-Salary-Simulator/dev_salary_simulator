<script setup lang="ts">
definePageMeta({middleware: ['seo', 'auth']});
const {login, register} = useAuth();

const email = useState<string>('emailLogin', () => '');
const password = ref<string>('');
const confirmPassword = ref<string>('');
const changeForm = useState<'login' | 'loginToRegister' | 'registerToLogin' | 'register'>("changeFormLogin", () => 'login');

const emailVerif = computed<boolean>(() => !!email.value.match(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/));
const passVerif = computed<boolean>(() => !!password.value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/));
const passConfirmVerif = computed<boolean>(() => !!confirmPassword.value && confirmPassword.value === password.value);

const loginForm = async () => {
    await login({email: email.value, password: password.value});
}

const registerForm = async () => {
    await register({email: email.value, password: password.value});
}

const switchForm = () => {
    if (changeForm.value === "login" || changeForm.value === "loginToRegister") {
        changeForm.value = "loginToRegister";
        password.value = "";
        setTimeout(() => {
            changeForm.value = "register";
        }, 1000)
    }
    else if(changeForm.value === "register" || changeForm.value === "registerToLogin"){
        changeForm.value = "registerToLogin";
        password.value = "";
        confirmPassword.value = "";
        setTimeout(() => {
            changeForm.value = "login";
        }, 1000)
    }
}
</script>

<template>
    <main class="container d-flex flex-column justify-content-center" id="login-page">
        <div class="row justify-content-center">
            <div class="col-12 col-lg-6 bg-blur text-center">
                <form  :class="`form-login ${changeForm === 'login' ? 'fade-in' : changeForm === 'loginToRegister' && ('fade-out')}`" 
                @submit.prevent="() => loginForm()" v-if="changeForm === 'login' || changeForm === 'loginToRegister'">
                    <h2 class="title-l mb-5">Login</h2>
                    <div class="row">
                        <div class="col-12 my-3">
                            <Input v-model="email" :valueV="email" placeholder="example@example.com" id="emailLogin" :validation="emailVerif"/>
                        </div>
                        <div class="col-12 my-3">
                            <Input v-model="password" :valueV="password" type="password" placeholder="********" id="passwordLogin" :validation="passVerif"/>
                            <span class="d-block text-start text-grey text-s mt-1">* 8 caracters, 1 digit, 1 uppercase, 1 lowercase</span>
                        </div>
                        <div class="col-12 mt-3 mb-5">
                            <Button submit :disabled="!emailVerif || !passVerif">Login</Button>
                        </div>
                        <div class="col-12 text-start mt-3">
                            <span class="me-3 switch-form" :onclick="() => switchForm()" :key="changeForm">No account yet ?</span>
                        </div>
                    </div>
                </form>
                <form :class="`form-login ${changeForm === 'register' ? 'fade-in' : changeForm === 'registerToLogin' && ('fade-out')}`" 
                @submit.prevent="() => registerForm()" v-if="changeForm === 'register' || changeForm === 'registerToLogin'">
                    <h2 class="title-l mb-5">Register</h2>
                    <div class="row">
                        <div class="col-12 my-3">
                            <Input v-model="email" :valueV="email" placeholder="example@example.com" id="emailRegister" :validation="emailVerif"/>
                        </div>
                        <div class="col-12 my-3">
                            <Input v-model="password" :valueV="password" type="password" placeholder="********" id="passwordRegister" :validation="passVerif"/>
                            <span class="d-block text-start text-grey text-s mt-1">* 8 caracters, 1 digit, 1 uppercase, 1 lowercase</span>
                        </div>
                        <div class="col-12 my-3">
                            <Input v-model="confirmPassword" :valueV="confirmPassword" type="password" placeholder="********" id="confirmPassword" :validation="passConfirmVerif"/>
                        </div>
                        <div class="col-12 mt-3 mb-5">
                            <Button submit :disabled="!emailVerif || !passVerif || !passConfirmVerif">Register</Button>
                        </div>
                        <div class="col-12 text-start mt-3">
                            <span class="me-3 switch-form" :onClick="switchForm" :key="changeForm">Already registered ?</span>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </main>
</template>

<style lang="scss">
#login-page{
    .form-login{
        padding: 40px 40px 20px 40px;
        .switch-form{
            transition: all ease-in-out 0.15s;
            text-decoration: underline;
            cursor: pointer;
            &:hover{
                transition: all ease-in-out 0.15s;
                color: $primary;
            }
        }
    }
    input{
        width: 100%;
    }
}
</style>