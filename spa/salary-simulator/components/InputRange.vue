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

const inputWidth = ref<number>(0);
const blocInfoWidth = ref<number>(0);
const positionTooltip = ref<number>(0);
const percent = ref<number>(0);

function calculateLeftPosition(value: number){
    inputWidth.value = document.querySelector('.input-range')?.querySelector('input')?.clientWidth ?? 0;
    blocInfoWidth.value = document.querySelector('.input-range')?.querySelector('.bloc-info')?.clientWidth ?? 0;
    positionTooltip.value = (((+value - min) / (max - min)) * ((inputWidth.value - 14) - 14) + 14);
    percent.value = (+value) * 100 / max;
}

onMounted(() => {
    calculateLeftPosition((+modelValue));
});
</script>

<template>
    <div class="input-range">
        <input :id="id" type="range" :value="modelValue" @input="handleInput" :min="min" :max="max" :step="0.01">
        <div class="bloc-info text-center" :style="{left: (positionTooltip - blocInfoWidth / 2) + 'px'}">
            <span class="info-number text-xs mb-1">{{ (Math.round(modelValue) === 16 ? "15+" : Math.round(modelValue)) + " years" }}</span>
            <span class="info-text title-s">{{ enumRange[Math.round(modelValue)] }}</span>
        </div>
        <div class="thumb-bright" 
            :style="{
                left: (positionTooltip - 35) + 'px',
                background: `radial-gradient(circle at center, 
                    rgba(32, 93, 136, 0.6) ${percent/2}%, 
                    rgba(32, 93, 136, 0.4) ${percent/2}%, 
                    rgba(32, 93, 136, 0.4) ${percent/2}%, 
                    transparent, transparent) 
                    center no-repeat`
            }">
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
            cursor: pointer;
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
            min-width: 70px;
            color: $grey;
        }
        .info-text{
            display: block;
            color: $primary;
        }
    }
    .thumb-bright{
        z-index: -1;
        position: absolute;
        top: -9px;
        width: 70px;
        height: 70px;
        border-radius: 50%;   
        animation: thumbRangeShine 4s infinite ease-in-out;
    }
}
</style>


