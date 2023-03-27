<script setup lang="ts">
//const {namesJobs} = useJobs();
const nameJobForm = useState<string>('nameJobForm',() => '');
const experienceForm = useState<number>('experienceForm', () => 0);
const stacksForm = useState<string[]>('stacksForm', () => []);
const statusForm = useState<string>('statusForm', () => '');
const validForm = computed<boolean>(() => !!nameJobForm.value && !!statusForm.value && !!stacksForm.value.length);
function sendForm(){
    // TODO : Sending form simulation
    console.log('Send form:', {
        nameJob: nameJobForm.value, 
        experience: Math.round(experienceForm.value),
        stacks: toRaw(stacksForm.value),
        status: statusForm.value,
        valid: validForm.value
    });
}
const namesJobs = ['Ux designer', 'Architect', 'Developer front', 'developer backend', 'data Scientist', 'UI designer']; // Mock data
const stacks = ['Java', 'Typescript', 'Rust', 'C++', 'Php', 'HTML', 'CSS', 'Angular', 
    'React', 'Javascript', 'Symfony', 'Python', 'numpy', 'pandas', 'C', 'C#']; // Mock Data - TODO : Create endpoint for getting nameStacks
</script>

<template>
    <main class="container mb-5" id="index-page">
        <section class="header-simulation-form row align-items-center justify-content-between">
            <div class="col-12 col-lg-5">
                <h1 class="title-l">Find your <span class="text-primary">perfect</span> salary</h1>
                <p class="text-grey">Lorem ipsum dolor sit amet consectetur. Id mauris morbi ornare sapien curabitur pretium. Tellus faucibus sit lobortis eleifend.</p>
            </div>
            <div class="header-img d-none d-lg-block col-lg-7 text-center">
                <img :src="'/img/rocket.png'" alt="rocket">
                <img :src="'/img/cloud.png'" alt="cloud">
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
                <Label forInput='stacksForm' blueLabel>Tell us about your stacks</Label>
                <InputStacks v-model="stacksForm" id="stacksForm" placeholder="Javascript, Rust, C#..." :elements="stacks"/>
            </div>
            <div class="col-12 d-flex flex-column">
                <Label forInput='statusForm'>Define your status</Label>
                <InputRadio :elements="[{text: 'self-employed', img: 'self-employed.png'}, {text: 'full time employee', img: 'full-time-employee.png'}]" v-model="statusForm" id="statusForm"/>
            </div>
            <div class="col-12 text-center mt-5">
                <Button submit :disabled="!validForm">Simulate your value</Button>
            </div>
        </form>
    </main>
</template>

<style lang="scss">
#index-page{
    & >.row{
        padding: 51px 84px;
    }
    & .simulation-form{
        background: rgba(63, 102, 159, 0.1);
        backdrop-filter: blur(25px);
        border-radius: 10px;
    }
    & .header-simulation-form{
        & .header-img{
            position: relative;
            height: 100%;
            & img{
                position: absolute;
                z-index: 5;
                &:nth-child(1){
                    width: 50%;
                    left: 0;
                    right: 0;
                    transform: translateY(-50%) translateX(50%);
                    animation: rocketEffect 3s ease-in-out infinite;
                }
                &:nth-child(2){
                    width: 30%;
                    right: 0;
                    top: 0;
                    animation: cloudEffect 4s linear infinite;
                }
            }
        }
    }
}
</style>