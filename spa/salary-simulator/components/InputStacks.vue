<script setup lang="ts">
import { mode } from 'process';

const {modelValue, elements} = defineProps<{
    modelValue: string[],
    elements: string[]
    id?: string,
    placeholder?: string,
}>();
const emit = defineEmits<{
    (ev: 'update:modelValue', value: string[]): void
}>();
const filter = ref('');
const filteredElements = computed<string[]>(() => elements.filter(elm => elm.toLowerCase().includes(filter.value.toLowerCase())));
const elementsSelected = ref<string[]>(modelValue);

const handleSelect = (ev: KeyboardEvent | MouseEvent, elementSelected: string) => {
    const target = ev.target as HTMLElement;
    // @ts-ignore
    if ((ev.type === "keyup" && ev.key === "Enter") || ev.type === "click") {
        if (target.classList.contains('selected')) {
            elementsSelected.value = elementsSelected.value.filter(e => e !== elementSelected);
            emit('update:modelValue', elementsSelected.value);
        }
        else{
            filter.value = "";
            elementsSelected.value.push(elementSelected);
            emit('update:modelValue', elementsSelected.value);
        }
    }
}
const isSelected = (elm: string) => {return !!elementsSelected.value.find(e => e === elm)}
const isDisabled = (elm: string) => {return (!elementsSelected.value.find(e => e === elm) && !filteredElements.value.find(e => e === elm))}
</script>

<template>
    <div class="input-stacks">
        <input :id="id" type="text" :placeholder="placeholder || 'Default placeholder'" v-model="filter">
        <ul class="d-flex flex-wrap justify-content-center" tabindex="-1">
            <li v-for="elm in elements" 
                @click="(ev) => handleSelect(ev, elm)" @keyup="(ev) => handleSelect(ev, elm)" 
                :tabindex="isSelected(elm) || isDisabled(elm) ? -1 : 0" 
                :class="`stacks-element d-flex text-m${isSelected(elm)  ? ' selected' : ''} 
                    ${isDisabled(elm) ? ' disabled' : ''}
                `" 
            >
                <span v-for="el, ind in elm" :class="!isDisabled(elm) && !isSelected(elm) && filter.toLowerCase().includes(el.toLowerCase()) ? 'typed' : ''">{{ el }}</span>
            </li>
        </ul>
    </div>
</template>

<style lang="scss">
.input-stacks{
    input{
        width: 100%;
    }
    ul{
        list-style-type: none;
        padding: 27px 20px;
        .stacks-element{
            transition: all 0.15s ease-in-out;
            &:hover{
                transition: all 0.15s ease-in-out;
                transform: translateY(-4px);
            }
            &:not(.disabled){
                cursor: pointer;
            }
        }
    }
}
.stacks-element{
    text-transform: uppercase;
    padding: 8px 16px;
    border: 1px solid #CCCCCC;
    border-radius: 7px;
    background: rgba(255, 255, 255, 0.11);
    margin: 10px;
    color: $grey;
    display: inline-block;
    &.disabled{
        filter: opacity(0.2);
        pointer-events: none;
    }
    &.selected{
        background: rgba($primary, 0.46);
        border: 1px solid #3A9EE4;
        font-weight: 700;
        color: #CCCCCC;
    }
    &:focus{
        border: 1px solid #3A9EE4;
        outline: none;
    }
    span{
        pointer-events: none;
        display: block;
        &.typed{
            color: #CCCCCC;
            animation: touchKeyBoard 0.15s linear;
        }
    }
}
</style>


