import { isProxy, toRaw } from 'vue';

export default () => {
    const runtimeConfig = useRuntimeConfig();
    const urlBase = process.dev ? runtimeConfig.public.mockBase : runtimeConfig.public.apiBase;
    
    const simulationResult = useState<TSimulation | null>('simulationResult', () => null);
    const savedSimulations = useState<TSavedSimulation[]>('savedSimulations');
    
    async function makeSimulation(payload: DTOSimulation){
        const {data, error} = await useFetch(`${urlBase}/jobs/search`, {
            body: payload,
            method: "POST"
        }).then(res => {
            return {...res, data: res.data as Ref<TSimulation> | null}
        });
        if (!error?.value && data?.value) {
            if (isProxy(data.value)){
                data.value = toRaw(data.value);
            }
            simulationResult.value = data.value;
        }
    }
    
    async function saveSimulation(payload: {saveName: string, simulation: DTOSimulation}){
        if (localStorage.getItem('tokenDSS')) {
            const {data, error} = await useFetch(`${urlBase}/jobs/search/save`, {
                headers: {Authorization: `Bearer ${localStorage.getItem('tokenDSS')}`},
                body: payload,
                method: "POST"
            }).then(res => {
                return {...res, data: res.data as Ref<TSavedSimulation[]> | null}
            });
            
            if (!error?.value && data?.value) {
                if (isProxy(data.value)){
                    data.value = toRaw(data.value);
                }
                data.value = data.value.map((savedSimu) => {
                    savedSimu.id = savedSimu._id;
                    savedSimu.saveName = savedSimu.name;
                    savedSimu.saveDate = savedSimu.date;
                    savedSimu.simulation.id = savedSimu.simulation._id;
                    savedSimu.simulation.parameters.nameRegion = savedSimu.simulation.parameters.region;
                    savedSimu.simulation.parameters.nameJob = savedSimu.simulation.parameters.title;
                    return savedSimu;
                });
                savedSimulations.value = data.value;
            }
        }
    }    

    return {simulationResult, makeSimulation, saveSimulation};
}