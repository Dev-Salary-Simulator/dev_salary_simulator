<script setup lang="ts">
const {data} = defineProps<{
    data: TSimulation | TJob | TSavedSimulation,
    type: 'simulation' | 'job' | 'savedSimulation',
    editSimu?: (id: string, name: string) => void,
    deleteSimu?: ({id}: {id: string}) => void
}>();
const emit = defineEmits<{
    (ev: 'reload', value: null): void
}>();

const enumExp: {[key: number]: string} = {
    0: "Junior",
    1: "Junior",
    2: "Junior",
    3: "Junior",
    4: "Middle",
    5: "Middle",
    6: "Middle",
    7: "Middle",
    8: "Middle",
    9: "Senior",
    10: "Senior",
    11: "Senior",
    12: "Senior",
    13: "Senior",
    14: "Senior",
    15: "Staff",
    16: "Staff"
}
</script>

<template>
    <div class="recap-form row" v-if="type === 'simulation'">
        <div class="col-lg-8 col-12">
            <div class="row">
                <div class="col-12">
                    <span class="recap-form-name title-l me-3">{{ (data as TSimulation).parameters.nameJob }}</span>
                    <span class="recap-form-exp text-m">{{ `${enumExp[(data as TSimulation).parameters.experience]} experience` }}</span>
                </div>
                <div class="col-12 d-flex">
                    <span class="recap-form-status title-l me-3">{{ (data as TSimulation).parameters.status }}</span>
                    <span class="recap-form-region text-m d-flex align-items-end">
                        <img src="/img/marker-map.png" alt="marker">
                        {{ (data as TSimulation).parameters.nameRegion }}
                    </span>
                </div>
                <div class="col-12">
                    <span v-for="elm in (data as TSimulation).parameters.namesStack" class="stacks-element selected">{{ elm }}</span>
                </div>
            </div>
        </div>
        <div class="col-12 col-lg-4 d-flex align-items-end justify-content-end">
            <Button :click="() => emit('reload', null)">Resimulate</Button>
        </div>
    </div>
    <div class="recap-form row" v-if="type === 'job'">
        <div class="col-12 my-2">
            <div class="row">
                <div class="col-12">
                    <span class="recap-form-name title-l me-3">{{ (data as TJob).nameJob }}</span>
                    <span class="recap-form-exp text-m">{{ `${enumExp[(data as TJob).experience]} experience` }}</span>
                </div>
                <div class="col-12 d-flex">
                    <span class="recap-form-status title-l me-3">{{ (data as TJob).status }}</span>
                    <span class="recap-form-region text-m d-flex align-items-center">
                        <img src="/img/marker-map.png" alt="marker">
                        {{ (data as TJob).nameRegion }}
                    </span>
                </div>
                <div class="col-12">
                    <span v-for="elm in (data as TJob).namesStack" class="stacks-element selected">{{ elm }}</span>
                </div>
            </div>
        </div>
        <span class="job-salary title-l">{{ (data as TJob).salary }}</span>
    </div>
    <div class="recap-form row mx-1" v-if="type === 'savedSimulation'">
        <div class="col-12 my-2">
            <div class="row">
                <div class="col-12">
                    <span class="recap-form-name title-l me-3">{{ (data as TSavedSimulation).saveName }}</span>
                    <span class="recap-form-exp text-m">{{ `${enumExp[(data as TSavedSimulation).simulation.parameters.experience]} experience` }}</span>
                </div>
                <div class="col-12 d-flex">
                    <span class="recap-form-status title-l me-3">{{ (data as TSavedSimulation).simulation.parameters.status }}</span>
                    <span class="recap-form-region text-m d-flex align-items-center">
                        <img src="/img/marker-map.png" alt="marker">
                        {{ (data as TSavedSimulation).simulation.parameters.nameRegion }}
                    </span>
                </div>
            </div>
        </div>
        <div class="col-4 recap-form-date d-flex align-items-center">
            <span>{{ (data as TSavedSimulation).saveDate.split('T')[0] }}</span>
        </div>
        <div class="col-8 btn-actions d-flex align-items-center justify-content-end">
            <button class="btn btn-primary me-2" data-bs-toggle="modal" data-bs-target="#edit-simulation" :onClick="() => editSimu!((data as TSavedSimulation).id, (data as TSavedSimulation).saveName)">
                <img src="/img/edit.png" alt="edit" class="me-1"/> Edit
            </button>
            <button class="btn btn-danger" :onClick="() => deleteSimu!({id: (data as TSavedSimulation).id})">
                <img src="/img/close.png" alt="remove" class="me-1"/> Remove
            </button>
        </div>
        <span class="job-salary title-l">{{ (data as TSavedSimulation).simulation.averageSalary }}</span>
    </div>
    
</template>

<style lang="scss">
.recap-form{
    background: rgba(63, 102, 159, 0.1);
    backdrop-filter: blur(25px);
    border-radius: 10px;
    padding: 30px 50px;
    position: relative;
    .recap-form-name{
        font-weight: 600;
        text-transform: uppercase;
    }
    .recap-form-exp{
        color: $grey;
    }
    .recap-form-status{
        color: $primary;
    }
    .recap-form-region{
        color: $grey;
    }
    .job-salary{
        position: absolute;
        width: auto;
        top: 16px;
        right: 16px;
    }
    .recap-form-date{
        span{
            color: $grey;
        }
    }
    .btn-actions{
        button{
            padding: 8px 16px;
            font-size: 12px;
            display: flex;
            align-items: center;
            img{
                width: 20px;
                height: 20px;
            }
        }
        button:nth-child(2){
            img{
                width: 16px;
                height: 16px;
            }
        }
    }
}
</style>