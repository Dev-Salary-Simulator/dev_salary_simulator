<script setup lang="ts">
definePageMeta({middleware: ['seo', 'auth']});
const {savedSimulations, getSimulations, editSimulation, deleteSimulation} = useSimulation();
const totalPerYears = computed<number>(() => savedSimulations.value.map(simu => simu.simulation.averageSalary).reduce((partialSum, current) => partialSum + current, 0));
const totalPerMonth = computed<number>(() => Math.round(totalPerYears.value / 12));
const averageSeniority = computed<number>(() => Math.round(savedSimulations.value.map(simu => simu.simulation.parameters.experience).reduce((partialSum, current) => partialSum + current, 0) / savedSimulations.value.length))
const stackTeam = computed<string[]>(() => [...new Set(savedSimulations.value.map(simu => simu.simulation.parameters.namesStack).flat())]);

onMounted(async () => {
    await getSimulations();
})
</script>

<template>
    <main class="container mb-5" id="simulations-page">
        <div class="resume-saved row justify-content-center mb-4" v-if="savedSimulations.length">
            <div class="col-12">
                <h3 class="title-l">
                    Resume of your team
                    <span class="d-md-inline-block d-none text-s text-grey">based on your saved simulations</span>
                </h3>
            </div>
            <div class="col-12 bg-blur py-3 px-4">
                <div class="row">
                    <div class="col-lg-4 col-12 text-center d-flex flex-column">
                        <p class="text-m text-grey">Total per years</p>
                        <div class="d-flex flex-grow flex-column align-items-center justify-content-center">
                            <p class="text-l">{{ totalPerYears }}</p>
                            <p class="text-s average-by-month d-inline-block">{{ totalPerMonth }} by month</p>
                        </div>
                    </div>
                    <div class="col-lg-4 col-12 text-center d-flex flex-column">
                        <p class="text-m text-grey">Average seniority</p>
                        <div class="d-flex flex-grow flex-column align-items-center justify-content-center">
                            <p class="text-l">~{{ averageSeniority }} years</p>
                        </div>
                    </div>
                    <div class="col-lg-4 col-12 text-center d-flex flex-column">
                        <p class="text-m text-grey">Stacks of your team</p>
                        <div class="d-flex flex-grow align-items-center justify-content-center flex-wrap">
                            <span v-for="stack in stackTeam" class="stacks-element selected d-inline-block">{{ stack }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row justify-content-center saved-list">
            <div class="col-12">
                <h3 class="title-l">My saved simulations</h3>
            </div>
            <div class="col-lg-6 col-12" v-for="simu in savedSimulations">
                <RecapForm :data="simu" type="savedSimulation"/>
            </div>
        </div>
    </main>
</template>

<style lang="scss">
#simulations-page{
    .resume-saved{
        & .average-by-month{
            text-transform: uppercase;
            color: $light;
            padding: 8px 16px;
            background: rgba(25, 45, 60, 0.46);
            border-radius: 7px;
        }
        .stacks-element{
            margin: 4px;
            padding: 4px 8px;
            font-size: 12px;
            border-radius: 4px;
        }
    }
    .saved-list{
        & > .col-12 > .row{
            margin-bottom: 20px;
        }
    }
}
</style>