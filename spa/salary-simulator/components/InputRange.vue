<script setup lang="ts">
const {modelValue, min, max} = defineProps<{
    modelValue: number,
    id?: string,
    min: number,
    max: number
}>();
const emit = defineEmits<{
    (ev: 'update:modelValue', value: number): void
}>();
const handleInput = (ev: Event) => {
    const target = ev.target as HTMLInputElement;
    calculateLeftPosition((+target.value));
    emit('update:modelValue', (+target.value));
}

const enumRange: {[key: number]: string} = {
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

const inputWidth = ref(0);
const blocInfoWidth = ref(0);
const positionTooltip = ref(0);
function calculateLeftPosition(value: number){
    inputWidth.value = document.querySelector('.input-range')?.querySelector('input')?.clientWidth ?? 0;
    blocInfoWidth.value = document.querySelector('.input-range')?.querySelector('.bloc-info')?.clientWidth ?? 0;
    positionTooltip.value = (((+value - min) / (max - min)) * ((inputWidth.value - 12) - 12) + 12 - (blocInfoWidth.value / 2) );
}

onMounted(() => {
    calculateLeftPosition((+modelValue));
});
</script>

<template>
    <div class="input-range">
        <input :id="id" type="range" :value="modelValue" @input="handleInput" :min="min" :max="max" :step="0.01">
        <div class="bloc-info text-center" :style="{ left: positionTooltip + 'px' }">
            <span class="info-number">{{ Math.round(modelValue) + " years" }}</span>
            <span class="info-text title-s">{{ enumRange[Math.round(modelValue)] }}</span>
        </div>
    </div>
</template>

<style lang="scss">
.input-range{
    position: relative;
    margin-bottom: 60px;
    input{
        padding: 0;
        width: 100%;
        &[type=range]{
            background: unset;
            &::-webkit-slider-runnable-track, &::-moz-range-track{
                background-color: $primary;
            }
            &::-webkit-slider-thumb, &::-moz-range-thumb{
                background-color: $light;
                width: 20px;
                height: 20px;
                border: 4px solid $primary;
                border-radius: 15px;
            }
        }
    }
    .bloc-info{
        position: absolute;
        .info-number{
            display: block;
            font-size: 13px;
            color: $grey;
            font-weight: 500;
        }
        .info-text{
            display: block;
            color: $primary;
        }
    }
}
</style>


