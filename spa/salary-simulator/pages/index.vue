<script setup lang="ts">
// const {namesJobs} = useJobs();
const nameJobForm = useState<string>('nameJobForm',() => '');
const experienceForm = useState<number>('experienceForm', () => 0);
const stacksForm = useState<string>('stacksForm', () => '');
const statusForm = useState<string>('statusForm', () => '');

function sendForm(){
    // TODO : Sending form simulation
    console.log('Send form');
}

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
            <div class="col-12 d-flex flex-column">
                <Label forInput='nameJobForm'>Name of your dream job</Label>
                <Input v-model="nameJobForm" id="nameJobForm"/>
            </div>
            <div class="col-12 d-flex flex-column">
                <Label forInput='experienceForm'>Years of experience</Label>
                <Input v-model="experienceForm" id="experienceForm" type="number"/>
            </div>
            <div class="col-12 d-flex flex-column">
                <Label forInput='stacksForm'>Tell us about your stacks</Label>
                <Input v-model="stacksForm" id="stacksForm"/>
            </div>
            <div class="col-12 d-flex flex-column">
                <Label forInput='statusForm'>Define your status</Label>
                <Input v-model="statusForm" id="statusForm"/>
            </div>
            <div class="col-12 text-center mt-5">
                <Button submit>Simulate your value</Button>
            </div>
        </form>




        <!-- <ul>
            <li v-for="n in namesJobs">{{ n }}</li>
        </ul> -->
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