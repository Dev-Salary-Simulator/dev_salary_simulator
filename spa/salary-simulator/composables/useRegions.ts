import { isProxy, toRaw } from 'vue';

export default () => {
    const runtimeConfig = useRuntimeConfig();
    const urlBase = process.dev ? runtimeConfig.public.mockBase : runtimeConfig.public.apiBase;
    
    const namesRegions = useState<string[]>('namesRegions', () => []);

    async function getNamesOfRegions(){
        await nextTick();
        const {data, error} = await useLazyFetch(`${urlBase}/jobs/regions`)
        .then(res => {
            return {...res, data: res.data as Ref<string[]> | null}
        });
        if (!error?.value && data?.value) {
            if (isProxy(data.value)){
                data.value = toRaw(data.value);
            }
            namesRegions.value = data.value ?? namesRegions.value;
        }
    }

    return {namesRegions, getNamesOfRegions};
}