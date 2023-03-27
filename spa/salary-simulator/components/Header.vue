<script setup lang="ts">
const {userLogged} = useAuth();
</script>

<template>
    <header>
        <nav class="navbar navbar-expand-lg">
            <div class="container-fluid">
                <div class="header-login-btn-container">
                    <NuxtLink to="/login" class="header-login-btn" v-if="!userLogged">Login</NuxtLink>
                    <NuxtLink to="/simulations" class="header-login-btn" v-else>Simulations</NuxtLink>
                </div>
                <div class="header-index-btn-container">
                    <NuxtLink to="/" class="header-index-btn">Dev salary simulator</NuxtLink>
                </div>
            </div>
        </nav>
    </header>
</template>

<style lang="scss">
.navbar{
    padding: 42px;
    & a{
        transition: all ease-in-out 0.5s;
        text-decoration: none;
        &:hover{
            color: inherit;
        }
    }
    .header-login-btn-container{
        transition: all ease-in-out 0.5s;
        display: inline-block;
        height: 52px;
        border-radius: 10px;
        border: 1px solid transparent;
        background-repeat: no-repeat;
        background-position: center;
        background-image: linear-gradient(90deg, #023658 0%, rgba(246, 248, 250, 0.5) 100%, #023658 200%);
        border-radius: 32px;
        background-size: 400% 400%;
        animation: buttonBorder 3s linear infinite;
    }
    .header-login-btn{
        display: block;
        widows: 100%;
        font-size: 25px;
        color: $light;
        padding: 6px 30px;
        background: $dark;
        border-radius: 32px;
        text-transform: uppercase;
    }
    .header-index-btn-container{
        transition: all ease-in-out 0.5s;
        display: inline-block;
        background-repeat: no-repeat;
        background-position: center;
        background-image: linear-gradient(269.99deg, #000000 -13.89%, #0D3652 111.32%);
        background-size: 400% 400%;
        padding-bottom: 4px;
        &:hover{
            animation: buttonBorder 3s linear infinite;
        }
    }
    .header-index-btn{
        font-size: 27px;
        font-weight: 700;
        color: $grey;
        background: $dark;
        padding: 4px 0;
        text-transform: uppercase;
    }
}
</style>