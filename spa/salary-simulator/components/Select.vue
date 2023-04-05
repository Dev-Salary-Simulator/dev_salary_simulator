<script setup lang="ts">
const {elements, id, modelValue} = defineProps<{
    modelValue: string,
    elements: string[],
    id?: string,
    placeholder?: string,
}>();
const emit = defineEmits<{
    (ev: 'update:modelValue', value: string): void
}>();
const filter = ref<string>(modelValue);
const filteredElements = computed<string[]>(() => elements.filter(elm => elm.toLowerCase().includes(filter.value.toLowerCase())));
const displayList = ref<boolean>(false);
const disabled = ref<boolean>(!!modelValue);

const handleSelect = (ev: KeyboardEvent | MouseEvent, elementSelected: string) => {
    const target = ev.target as HTMLElement;
    // @ts-ignore
    if (ev.type === "keyup" && ev.key === "Enter") {
        filter.value = elementSelected;
        disabled.value = true;
        displayList.value = false;
        emit('update:modelValue', elementSelected);
    }
    else if(ev.type === "click"){
        filter.value = elementSelected;
        disabled.value = true;
        displayList.value = false;
        emit('update:modelValue', elementSelected);
    }
}

const handleFocus = (ev: FocusEvent) => {
    const relatedTarget = ev.relatedTarget as HTMLElement | null;
    if (relatedTarget?.classList.contains('input-select-element') || relatedTarget?.getAttribute('id') === id) {
        displayList.value = true;
        return;
    }
    displayList.value = false;
}

const handleReset = () => {
    disabled.value = false;
    filter.value = '';
    emit('update:modelValue', '');
}
</script>

<template>
    <div class="input-select">
        <input :id="id" type='text' :placeholder="placeholder || 'Default placeholder'" v-model="filter" :disabled="disabled" 
            @focusin="() => displayList = true" @focusout="handleFocus">
        <ul v-if="displayList" tabindex="-1">
            <li v-if="!filteredElements.length" class="no-data text-s">No elements found</li>
            <li v-else v-for="elm in filteredElements" @click="(ev) => handleSelect(ev, elm)" @keyup="(ev) => handleSelect(ev, elm)" tabindex="0" class="input-select-element text-s" @focusout="handleFocus">{{elm}}</li>
        </ul>
        <button v-if="disabled" class="btn input-select-reset" @click="handleReset">Remove</button>
    </div>
</template>

<style lang="scss">
.input-select{
    position: relative;
    input{
        width: 100%;
    }
    ul{
        position: absolute;
        list-style-type: none;
        padding: 27px 20px;
        margin: 0 30px;
        background: linear-gradient(179.35deg, rgba($dark2, 0.5) 40.47%, rgba($dark, 0.5) 99.44%);
        backdrop-filter: blur(25px);
        border-radius: 0px 0px 10px 10px;
        width: calc(100% - 60px);
        z-index: 5;
        max-height: 200px;
        overflow-y: auto;
        li{
            outline: none;
            &:not(:last-child){
                border-bottom: 1px solid rgba($light, 0.2);
                padding-bottom: 8px;
                margin-bottom: 8px;
            }
            &.no-data{
                color: $grey;
            }
            &:not(.no-data){
                cursor: pointer;
                &:hover, &:focus{
                    text-decoration: underline;
                }
            }
        }
    }
    button.input-select-reset{
        position: absolute;
        right: 0;
        top: 5px;
        padding: 8px;
        box-shadow: unset;
        color: $light;
        font-weight: 500;
        &:hover{
            text-decoration: underline;
        }
    }
}
</style>


