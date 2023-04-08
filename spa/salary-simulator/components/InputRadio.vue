<script setup lang="ts">
const {modelValue} = defineProps<{
    modelValue: string,
    elements: {text: string, img?: string}[]
    id?: string,
}>();
const emit = defineEmits<{
    (ev: 'update:modelValue', value: string): void
}>();
const handleInput = (ev: Event) => {
    const target = ev.target as HTMLInputElement;
    emit('update:modelValue', target.value);
}
</script>

<template>
    <div :id="id" class="input-radio row justify-content-center">
        <div class="col-12 col-lg-6 text-center" v-for="elm, index in elements">
            <Label :forInput="`radio-${id}-${index}`" :classSup="`mx-auto ${modelValue !== elm.text || !modelValue ? ' no-check' : ''} ${elm.img ? 'mt-5' : 'no-img'}`">
                <img v-if="elm.img" :src="`/img/${elm.img}`" :alt="elm.text" class="mx-auto">
                <input type="radio" tabindex="-1" :value="elm.text" @click="handleInput" :name="`radio-${id}`" :id="`radio-${id}-${index}`" hidden>
                <span :class="`${elm.img ? 'mt-3' : 'text-s'}`">{{ elm.text }}</span>
            </Label>
        </div>
    </div>
</template>

<style lang="scss">
.input-radio{
    & label{
        max-width: 370px;
        width: 100%;
        height: 260px;
        background: linear-gradient(144.34deg, rgba(255, 255, 255, 0.325) -8.63%, rgba(255, 255, 255, 0.14) 40.16%, rgba(255, 255, 255, 0.07) 105.72%);
        box-shadow: -7.16347px 5.25321px 34.8622px rgba(40, 47, 78, 0.1);
        backdrop-filter: blur(4.29808px);
        border-radius: 20px;
        padding: 20px;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        cursor: pointer;
        &.no-check{
            filter: opacity(0.2);
        }
        &:hover{
            filter: opacity(1);
            & > img{
                transition: all ease-in-out 0.3s;
                animation: radioImage 2s ease-in-out infinite alternate;
            }
        }
        & > span{
            display: block;
        }
        &.no-img{
            height: unset;
            border-radius: 8px;
        }
    }
}
</style>


