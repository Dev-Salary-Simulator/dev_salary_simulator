<script setup lang="ts">
definePageMeta({middleware: 'index'});
const {makeSimulation} = useSimulation();
const userLogged = useState<TUser | null>('userLogged');
const namesJobs = useState<string[]>('namesJobs');
const namesStacks = useState<string[]>('namesStacks');

const nameJobForm = useState<string>('nameJobForm',() => '');
const experienceForm = useState<number>('experienceForm', () => 0);
const stacksForm = useState<string[]>('stacksForm', () => []);
const statusForm = useState<string>('statusForm', () => '');
const validForm = computed<boolean>(() => !!nameJobForm.value && !!statusForm.value && !!stacksForm.value.length);
const simulationResult = useState<TSimulation | null>('simulationResult', () => null);
const animationForm = ref<'static' | 'pending' | 'sending' | 'fetching'>('static');

function sendForm(){
    animationForm.value = "sending";
    window.scrollTo(0, 0);
    setTimeout(() => {
        // TODO : Animated spinner + revoir animation
        animationForm.value = "pending";
        makeSimulation({
            nameJob: nameJobForm.value, 
            experience: Math.round(experienceForm.value),
            namesStack: stacksForm.value,
            status: statusForm.value,
        });
        setTimeout(() => {
            animationForm.value = "fetching";
            setTimeout(() => {
                animationForm.value = "static";
            }, 2500);
        }, 3000);
    }, 800);
}
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
        <form :class="`row simulation-form ${animationForm === 'sending' ? 'fade-out' : ''}`" 
        @submit.prevent="() => sendForm()" v-if="!simulationResult && (animationForm === 'sending' || animationForm === 'static')">
            <div class="col-12 d-flex flex-column mb-5">
                <Label forInput='nameJobForm'>Name of your dream job</Label>
                <Select :elements="namesJobs" :key="'namesJobs' + namesJobs.length" v-model="nameJobForm" id="nameJobForm" placeholder="Developer, ux designer..." />
            </div>
            <div class="col-12 d-flex flex-column mb-3">
                <Label forInput='experienceForm'>Years of experience</Label>
                <InputRange v-model="experienceForm" id="experienceForm" :min="0" :max="16"/>
            </div>
            <div class="col-12 d-flex flex-column mb-5">
                <Label forInput='stacksForm' blueLabel>Tell us about your stacks</Label>
                <InputStacks v-model="stacksForm" id="stacksForm" placeholder="Javascript, Rust, C#..." :elements="namesStacks" :key="'namesStacks' + namesStacks.length"/>
            </div>
            <div class="col-12 d-flex flex-column">
                <Label forInput='statusForm'>Define your status</Label>
                <InputRadio :elements="[{text: 'self-employed', img: 'self-employed.png'}, {text: 'full time employee', img: 'full-time-employee.png'}]" v-model="statusForm" id="statusForm"/>
            </div>
            <div class="col-12 text-center mt-5">
                <Button submit :disabled="!validForm">Simulate your value</Button>
            </div>
        </form>
        <div :class="`row simulation-form-spinner justify-content-center text-center py-5 ${animationForm === 'pending' ? 'fade-in' : ''}`" v-if="animationForm === 'pending'">
            <div id="spinner"></div>
            <p class="text-m mt-3 mb-0">In search of your dream job...</p>
        </div>
        <div :class="`row ${animationForm === 'fetching' ? 'fade-in' : ''}`" v-if="simulationResult && (animationForm === 'fetching' || animationForm === 'static')">
            <RecapForm :data="simulationResult" @reload="(value) => simulationResult = value"/>
        </div>
        <div :class="`row simulation-form-result ${animationForm === 'fetching' ? 'fade-in' : ''}`" v-if="simulationResult && (animationForm === 'fetching' || animationForm === 'static')">
            <div class="col-12 text-center">
                <h2>Your average salary</h2>
            </div>
            <div class="col-12 d-flex align-items-center justify-content-center mt-3">
                <div class="other-salary text-center">
                    <span>{{ simulationResult.lowestSalary }}</span>
                    <span class="text-s">LOWEST</span>
                </div>
                <div class="average-salary text-center mx-5">
                    <div>{{ simulationResult.averageSalary }}</div>
                    <span class="title-s">{{ (simulationResult.averageSalary / 12).toFixed(0) + " by month"}}</span>
                </div>
                <div class="other-salary text-center">
                    <span>{{ simulationResult.highestSalary }}</span>
                    <span class="text-s">HIGHEST</span>
                </div>
            </div>
            <Button v-if="!userLogged" :classSup="'save-simulation'">Register</Button>
            <Button v-if="userLogged" :classSup="'save-simulation'">Save simulation</Button>
        </div>
    </main>
</template>

<style lang="scss">
#index-page{
    & >.row{
        padding: 51px 84px;
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
    & .simulation-form, .simulation-form-result, .simulation-form-spinner{
        background: rgba(63, 102, 159, 0.1);
        backdrop-filter: blur(25px);
        border-radius: 10px;
    }
    & .simulation-form-result{
        position: relative;
        .average-salary{
            font-size: 80px;
            font-weight: 600;
            color: #3A9EE4;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            & span:nth-child(2){
                text-transform: uppercase;
                color: $light;
                padding: 8px 16px;
                background: rgba(25, 45, 60, 0.46);
                border-radius: 7px;
            }
        }
        .other-salary{
            font-size: 42px;
            font-weight: 600;
            color: #C0C0C0;
            padding-top: 10px;
            & span:nth-child(2){
                display: block;
                color: $grey;
            }
        }
        .save-simulation{
            position: absolute;
            width: auto;
            padding: 0;
            left: 38px;
            top: 32px;
        }
    }
}
</style>