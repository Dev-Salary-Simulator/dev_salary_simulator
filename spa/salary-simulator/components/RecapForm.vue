<script setup lang="ts">
defineProps<{
    data: TSimulation
}>();
const emit = defineEmits<{
    (ev: 'update:data', value: null): void
}>();
const handleClick = (ev: MouseEvent) => {
    const target = ev.target as HTMLInputElement;
    emit('update:data', null);
}

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
    <div class="recap-form row">
        <div class="col-lg-8 col-12">
            <div class="row">
                <div class="col-12">
                    <span class="recap-form-name title-l me-3">{{ data.parameters.nameJob }}</span>
                    <span class="recap-form-exp text-m">{{ `${enumExp[data.parameters.experience]} experience` }}</span>
                </div>
                <div class="col-12">
                    <span class="recap-form-status title-l me-3">{{ data.parameters.status }}</span>
                    <span class="recap-form-region text-m">{{ data.parameters.nameRegion }}</span>
                </div>
                <div class="col-12">
                    <span v-for="elm in data.parameters.namesStack" class="stacks-element selected">{{ elm }}</span>
                </div>
            </div>
        </div>
        <div class="col-12 col-lg-4 d-flex align-items-end justify-content-end">
            <Button :click="(ev) => handleClick(ev)">Resimulate</Button>
        </div>
    </div>
</template>

<style lang="scss">
.recap-form{
    background: rgba(63, 102, 159, 0.1);
    backdrop-filter: blur(25px);
    border-radius: 10px;
    padding: 30px 50px;
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
}
</style>