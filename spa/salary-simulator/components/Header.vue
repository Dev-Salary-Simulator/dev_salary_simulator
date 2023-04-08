<script setup lang="ts">
const {userLogged, disconnect} = useAuth();
const menuOpen = ref<boolean>(false);
</script>

<template>
    <header>
        <nav class="navbar navbar-expand-lg">
            <div class="container-fluid">
                <div class="header-login-btn-container fade-in" v-if="!userLogged">
                    <NuxtLink to="/login" class="header-login-btn text-l">Login</NuxtLink>
                </div>
                <div class="identity-card d-flex align-items-center fade-in" v-else>
                    <img src="/favicon.ico" alt="icon" class="me-3" :onClick="() => menuOpen = !menuOpen">
                    <div>
                        <span class="d-block title-l">Welcome <span class="text-primary">{{ userLogged.firstname ?? "Anonymous" }}</span> !</span>
                        <span class="d-block text-m text-grey">{{ userLogged.currentJob?.nameJob ?? 'No job yet' }}</span>
                    </div>
                </div>
                <div class="header-index-btn-container">
                    <NuxtLink to="/" class="header-index-btn text-l d-md-block d-none">Dev salary simulator</NuxtLink>
                    <NuxtLink to="/" class="header-index-btn text-l d-block d-md-none">DSS</NuxtLink>
                </div>
                <ul class="menu" v-if="menuOpen && userLogged">
                    <li class="mb-3">
                        <NuxtLink to="/profile" class="text-m text-light d-flex align-items-center" style="text-transform: uppercase;" :onClick="() => menuOpen = false">
                            <img class="me-3" src="/img/profile.png" alt="profile"> Profile
                        </NuxtLink>
                    </li>
                    <li class="my-3">
                        <NuxtLink to="/simulations" class="text-m text-light d-flex align-items-center" style="text-transform: uppercase;" :onClick="() => menuOpen = false">
                            <img class="me-3" src="/img/simulations.png" alt="simulations"> My simulations
                        </NuxtLink>
                    </li>
                    <li class="d-flex justify-content-end">
                        <button class="btn text-danger text-s d-flex align-items-center" style="font-weight: 600;" :onClick="() => {disconnect(); menuOpen = false;}">
                            <img class="me-2"  src="/img/disconnect.png" alt="disconnect"> Log Out
                        </button>
                    </li>
                </ul>
            </div>
        </nav>
    </header>
</template>

<style lang="scss">
.navbar{
    padding: 42px;
    position: relative;
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
        & .header-login-btn{
            display: block;
            color: $light;
            padding: 9px 30px;
            background: $dark2;
            border-radius: 32px;
        }
    }
    .identity-card{
        img{
            width: 72px;
            height: 72px;
            border-radius: 50%;
            overflow: hidden;
            object-fit: cover;
            border: 1px solid $primary;
            cursor: pointer;
        }
    }
    .header-index-btn-container{
        transition: all ease-in-out 0.5s;
        display: inline-block;
        background-repeat: no-repeat;
        background-position: center;
        background-image: linear-gradient(269.99deg, #000000 -13.89%, #0D3652 111.32%);
        background-size: 400% 400%;
        padding-bottom: 10px;
        &:hover{
            animation: buttonBorder 3s linear infinite;
        }
        & .header-index-btn{
            font-weight: 700;
            color: $grey;
            background: $dark2;
            padding: 4px 0;
        }
    }
    & .menu{
        position: absolute;
        top: calc(100% - 32px);
        list-style-type: none;
        padding: 16px 24px;
        min-width: 300px;
        background: linear-gradient(179.35deg, $dark2 40.47%, $dark 99.44%);
        box-shadow: 1px 1px 10px 0px $dark;
        opacity: 0.95;
        border-radius: 6px;
        z-index: 1;
        button{
            padding: 4px;
        }
        & a, button{
            &:hover{
                text-decoration: underline;
            }
        }
        & a{
            img{
                width: 24px;
                height: 24px;
            }
        }
    }
}
</style>