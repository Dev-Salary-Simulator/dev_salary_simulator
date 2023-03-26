<script setup lang="ts">
//const {namesJobs} = useJobs();
const nameJobForm = useState<string>('nameJobForm',() => '');
const experienceForm = useState<number>('experienceForm', () => 0);
const stacksForm = useState<string[]>('stacksForm', () => []);
const statusForm = useState<string>('statusForm', () => '');
function sendForm(){
    // TODO : Sending form simulation
    console.log('Send form:', {
        nameJob: nameJobForm.value, 
        experience: Math.round(experienceForm.value),
        stacks: toRaw(stacksForm.value),
        status: statusForm.value
    });
}
const namesJobs = ['Ux designer', 'Architect', 'Developer front', 'developer backend', 'data Scientist', 'UI designer'];
const stacks = ['Java', 'Typescript', 'Rust', 'C++', 'Php', 'HTML', 'CSS', 'Angular', 'React', 'Javascript', 'Symfony', 'Python', 'numpy', 'pandas', 'C', 'C#'];
</script>

<template>
    <main class="container mb-5" id="index-page">
        <section class="row align-items-center justify-content-between">
            <div class="col-6">
                <h1 class="title-l">Find your <span class="text-primary">perfect</span> salary</h1>
                <p class="text-grey">Lorem ipsum dolor sit amet consectetur. Id mauris morbi ornare sapien curabitur pretium. Tellus faucibus sit lobortis eleifend.</p>
            </div>
            <div class="col-6 text-center">
                <img src="#" alt="rocket">
            </div>
        </section>
        <form class="row simulation-form" @submit.prevent="() => sendForm()">
            <div class="col-12 d-flex flex-column mb-5">
                <Label forInput='nameJobForm'>Name of your dream job</Label>
                <Select :elements="namesJobs" v-model="nameJobForm" id="nameJobForm" placeholder="Developer, ux designer..." />
            </div>
            <div class="col-12 d-flex flex-column mb-3">
                <Label forInput='experienceForm'>Years of experience</Label>
                <InputRange v-model="experienceForm" id="experienceForm" :min="0" :max="16"/>
            </div>
            <div class="col-12 d-flex flex-column mb-5">
                <Label forInput='stacksForm'>Tell us about your stacks</Label>
                <InputStacks v-model="stacksForm" id="stacksForm" placeholder="Javascript, Rust, C#..." :elements="stacks"/>
            </div>
            <div class="col-12 d-flex flex-column">
                <Label forInput='statusForm'>Define your status</Label>
                <Input v-model="statusForm" id="statusForm"/>
            </div>
            <div class="col-12 text-center mt-5">
                <Button submit>Simulate your value</Button>
            </div>
        </form>
    </main>
</template>

<style lang="scss">
#index-page{
    .row{
        padding: 51px 84px;
    }
}
.simulation-form{
    background: rgba(63, 102, 159, 0.1);
    backdrop-filter: blur(25px);
    border-radius: 10px;
}
</style>