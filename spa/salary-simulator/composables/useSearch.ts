import { isProxy, toRaw } from 'vue';

export default () => {
    const runtimeConfig = useRuntimeConfig();
    const urlBase = process.dev ? runtimeConfig.public.mockBase : runtimeConfig.public.apiBase;
    
    const simulationResult = useState<TSimulation | null>('simulationResult', () => null);
    
    async function makeSimulation(payload: {nameJob: string, namesStack: string[], experience: number, status: string}){
        const {data, error} = await useFetch(`${urlBase}/jobs/search`, {
            body: payload,
            method: "POST"
        }).then(res => {
            return {...res, data: res.data as Ref<{simulation: TSimulation}> | null}
        });
        if (!error?.value && data?.value) {
            if (isProxy(data.value)){
                data.value = toRaw(data.value);
            }
            simulationResult.value = data.value.simulation;
        }
    }

    return {simulationResult, makeSimulation};
}