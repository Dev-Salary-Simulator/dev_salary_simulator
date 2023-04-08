<script setup lang="ts">
definePageMeta({middleware: ['seo', 'auth']});
const {userLogged} = useAuth();

const password = ref<string>('');
const firstname = ref<string>(`${userLogged.value?.firstname}` ?? '');
const lastname = ref<string>(`${userLogged.value?.lastname}` ?? '');
const birthday = ref(`${userLogged.value?.birthday.toString().substring(0, 10)}` ?? '');
const isEditingProfile = computed(() => (
    (firstname.value !== userLogged.value?.firstname
    || lastname.value !== userLogged.value?.lastname
    || birthday.value !== userLogged.value?.birthday.toString().substring(0, 10)
    || !!password.value)
    && (!password.value || !!password.value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/))
))

const updateProfile = () => {
    console.log("TODO : Update profile")
}
const cancelEditProfile = () => {
    if (!!userLogged.value) {
        password.value = '';
        firstname.value = `${userLogged.value.firstname}`;
        lastname.value = `${userLogged.value.lastname}`;
        birthday.value = `${userLogged.value.birthday.toString().substring(0, 10)}`;
    }
}
</script>

<template>
    <main class="container mb-5" id="profile-page">
        <form class="profile-form row justify-content-center bg-blur" @submit.prevent="() => updateProfile()">
            <div class="row justify-content-center mt-4">
                <div class="col-12 d-flex justify-content-end">
                    <button :class="`btn btn-danger ${isEditingProfile ? 'd-flex align-items-center' : 'd-none'}`" type="button" :onClick="cancelEditProfile">
                        <img src="/img/edit.png" alt="edit" class="me-1"/> Cancel
                    </button>
                    <button class="btn btn-primary d-flex align-items-center ms-3" type="submit" :disabled="!isEditingProfile">
                        <img src="/img/edit.png" alt="edit" class="me-1"/> Edit
                    </button>
                </div>
            </div>
            <div class="row justify-content-between mb-5" style="padding: 0px 90px;">
                <div class="col-12 mb-4">
                    <Label class-sup="d-block">Email</Label>
                    <p class="text-m text-grey mb-0">{{ userLogged?.email }}</p>
                </div>
                <div class="col-lg-5 col-12 mb-4">
                    <Label forInput='firstnameForm' :classSup="'d-block'">Firstname</Label>
                    <Input v-model="firstname" :value="firstname" placeholder="Jean" id="firstnameForm"/>
                </div>
                <div class="col-lg-5 col-12 mb-4">
                    <Label forInput='lastnameForm' :classSup="'d-block'">Lastname</Label>
                    <Input v-model="lastname" :value="lastname"  placeholder="Dupont" id="lastnameForm"/>
                </div>
                <div class="col-lg-5 col-12 mb-4">
                    <Label forInput='birthdayForm' :classSup="'d-block'">Birthday</Label>
                    <Input v-model="birthday" :value="birthday"  placeholder="12/02/2001" type="date" id="birthdayForm"/>
                </div>
                <div class="col-lg-5 col-12 mb-4">
                    <Label forInput='passwordForm' class-sup="d-block">Password</Label>
                    <Input v-model="password" :value="password"  type="password" placeholder="******" id="passwordForm"/>
                    <span class="d-block text-start text-grey text-s mt-1">* 8 caracters, 1 digit, 1 uppercase, 1 lowercase</span>
                </div>
            </div>
        </form>
    </main>
</template>

<style lang="scss">
#profile-page{
    .profile-form{
        input{
            width: 100%;
        }
        button{
            padding: 8px 12px;
        }
    }
}
</style>