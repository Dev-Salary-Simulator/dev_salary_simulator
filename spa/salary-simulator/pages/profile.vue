<script setup lang="ts">
definePageMeta({middleware: ['seo', 'auth']});
const {userLogged} = useAuth();
const {namesJobs} = useJobs();
const {namesStacks} = useStacks();
const {addOldJob, updateCurrentJob, updateProfile} = useUser();

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
));

const nameJob = ref<string>(userLogged.value?.currentJob?.nameJob ?? '');
const experience = ref<number>(userLogged.value?.currentJob?.experience ?? 0);
const status = ref<string>(userLogged.value?.currentJob?.status ?? '');
const stacks = ref<string[]>(userLogged.value?.currentJob?.namesStack ?? []);
const salary = ref<number>(userLogged.value?.currentJob?.salary ?? 0);
const formJobIsValid = computed(() => (
    !!nameJob.value && !!status.value && !!stacks.value.length && !!salary.value
));


const cancelEditProfile = () => {
    if (!!userLogged.value) {
        password.value = '';
        firstname.value = `${userLogged.value.firstname}`;
        lastname.value = `${userLogged.value.lastname}`;
        birthday.value = `${userLogged.value.birthday.toString().substring(0, 10)}`;
    }
}
const handleUpdateProfile = () => {
    const payload: any = {firstname: firstname.value, lastname: lastname.value, birthday: new Date(birthday.value)}
    !!password.value && (payload.password = password);
    updateProfile(payload).then(() => {
        password.value = '';
    });
}
const handleUpdateJob = () => {
    updateCurrentJob({
        nameJob: nameJob.value,
        experience: experience.value,
        nameStack: stacks.value,
        salary: salary.value,
        status: status.value
    });
}
const archiveJob = () => {
    addOldJob().then(() => {
        nameJob.value = userLogged.value?.currentJob?.nameJob ?? '';
        experience.value = userLogged.value?.currentJob?.experience ?? 0;
        status.value = userLogged.value?.currentJob?.status ?? '';
        stacks.value = userLogged.value?.currentJob?.namesStack ?? [];
        salary.value = userLogged.value?.currentJob?.salary ?? 0;
    });
}
</script>

<template>
    <main class="container mb-5" id="profile-page">
        <form class="profile-form row justify-content-center bg-blur mb-5" @submit.prevent="() => handleUpdateProfile()">
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
        
        <form class="profile-form row justify-content-center bg-blur mb-5" @submit.prevent="() => handleUpdateJob()">
            <div class="row justify-content-center my-4">
                <div class="col-lg-6 col-12">
                    <span class="title-l">This is your actual job</span>
                </div>
                <div class="col-lg-6 col-12 d-flex justify-content-end">
                    <button class="btn btn-primary d-flex align-items-center ms-3" type="submit" :disabled="!formJobIsValid">
                        <img src="/img/edit.png" alt="edit" class="me-1"/> {{userLogged?.currentJob ? 'Edit' : 'Create'}}
                    </button>
                </div>
            </div>
            <div class="row justify-content-between mb-3" style="padding: 0px 90px;">
                <div class="col-lg-5 col-12 mb-4">
                    <Label forInput='nameJobForm' :classSup="'d-block'">Name job</Label>
                    <Select :elements="namesJobs" :key="nameJob" v-model="nameJob" id="nameJobForm" placeholder="Developer, ux designer..." />
                </div>
                <div class="col-lg-5 col-12 mb-4">
                    <Label forInput='experienceForm' :classSup="'d-block'">Years of experience</Label>
                    <Input v-model="experience" :value="experience" type="number" :min="0" :max="15"  placeholder="3" id="experienceForm"/>
                </div>
                <div class="col-lg-5 col-12 mb-4">
                    <Label forInput='statusForm' :classSup="'d-block'">Define your status</Label>
                    <InputRadio :elements="[{text: 'self-employed'}, {text: 'full time employee'}]" v-model="status" id="statusForm"/>
                    <Label forInput='salaryForm' :classSup="'d-block'">Salary</Label>
                    <Input v-model="salary" :value="salary" type="number" placeholder="45000" :min="0" id="salaryForm"/>
                </div>
                <div class="col-lg-5 col-12 mb-4">
                    <Label forInput='stacksForm' class-sup="d-block">Stacks <span class="text-s text-grey">1 - 8 max</span></Label>
                    <InputStacks v-model="stacks" id="stacksForm" placeholder="Javascript, Rust, C#..." :elements="namesStacks" :key="stacks.length" onlyvisible/>
                </div>
            </div>
            <div class="row" v-if="userLogged?.currentJob">
                <div class="col-12 text-end mb-4">
                    <button class="btn btn-danger" :onClick="() => archiveJob()" type="button">Archive job</button>
                </div>
            </div>
        </form>

        <div class="row justify-content-center old-jobs" v-if="userLogged">
            <div class="col-12 text-center">
                <h2 class="title-l">Previous work</h2>
            </div>
            <RecapForm v-for="job in userLogged.oldJobs" :data="job" type="job"/>
        </div>
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
    .old-jobs{
        .row{
            margin: 10px 0;
        }
    }
}
</style>