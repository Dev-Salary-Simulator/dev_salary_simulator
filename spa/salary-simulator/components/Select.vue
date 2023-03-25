<script setup lang="ts">
const {elements} = defineProps<{
    modelValue: string,
    elements: string[],
    id?: string,
    placeholder?: string,
}>();
const emit = defineEmits<{
    (ev: 'update:modelValue', value: string): void
}>();
const filter = useState<string>('filterSelect', () => '');
const filteredElements = computed(() => elements.filter(elm => elm.toLowerCase().includes(filter.value.toLowerCase())));
const displayList = ref<boolean>(false);
const disabled = ref(false);

const handleSelect = (ev: Event) => {
    const target = ev.target as HTMLElement;
    filter.value = target.innerText;
    disabled.value = true;
    displayList.value = false;
    emit('update:modelValue', target.innerText);
}
</script>

<template>
    <div class="input-select">
        <input :id="id" type='text' :placeholder="placeholder || 'Default placeholder'" v-model="filter" @focus="() => displayList = !displayList" :disabled="disabled">
        <ul v-if="displayList || (filter && !disabled)">
            <li v-if="!filteredElements.length" class="no-data">No elements found</li>
            <li v-else v-for="elm in filteredElements" @click="handleSelect">{{elm}}</li>
        </ul>
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
        li{
            font-size: 15px;
            font-weight: 500;
            &:not(:last-child){
                border-bottom: 1px solid rgba($light, 0.2);
                padding-bottom: 8px;
                margin-bottom: 8px;
            }
            &.no-data{
                color: $grey;
            }
            &:not(.no-data):hover{
                text-decoration: underline;
                cursor: pointer;
            }
        }
    }
}
</style>


