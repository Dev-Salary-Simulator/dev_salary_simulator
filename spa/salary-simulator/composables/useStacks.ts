import { isProxy, toRaw } from 'vue';

export default () => {
    const runtimeConfig = useRuntimeConfig();
    const urlBase = process.dev ? runtimeConfig.public.mockBase : runtimeConfig.public.apiBase;
    
    const namesStacks = useState<string[]>('namesStacks', () => []);

    async function getNamesOfStacks(){
        await nextTick();
        const {data, error} = await useLazyFetch(`${urlBase}/stacks/titles`)
        .then(res => {
            return {...res, data: res.data as Ref<string[]> | null}
        });
        if (!error?.value && data?.value) {
            if (isProxy(data.value)){
                data.value = toRaw(data.value);
            }
            namesStacks.value = data.value ?? namesStacks.value;
        }
    }

    return {namesStacks, getNamesOfStacks};
}