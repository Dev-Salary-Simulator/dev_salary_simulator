export default () => {
    const runtimeConfig = useRuntimeConfig();
    const urlBase = process.dev ? runtimeConfig.public.mockBase : runtimeConfig.public.apiBase;
    
    const savedSimulations = useState<TSavedSimulation[]>('savedSimulations', () => []);

    async function getSimulations(){
        const {data, error} = await useFetch(`${urlBase}/jobs/simulations`, {
            headers: {Authorization: `Bearer ${localStorage.getItem('tokenDSS')}`}
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
    
    async function editSimulation(payload: {id: string, saveName: string}){
        const {data, error} = await useFetch(`${urlBase}/jobs/simulations`, {
            headers: {Authorization: `Bearer ${localStorage.getItem('tokenDSS')}`},
            body: payload,
            method: "PATCH"
        }).then(res => {
            return {...res, data: res.data as Ref<TSavedSimulation> | null}
        });
        if (!error?.value && data?.value) {
            if (isProxy(data.value)){
                data.value = toRaw(data.value);
            }
            savedSimulations.value = savedSimulations.value.map(e => {
                if (e.id === data.value._id) {
                    e.saveName = data.value.name;
                }
                return e;
            })
        }
    }

    async function deleteSimulation(payload: {id: string}){
        const {data, error} = await useFetch(`${urlBase}/jobs/simulations`, {
            headers: {Authorization: `Bearer ${localStorage.getItem('tokenDSS')}`},
            body: payload,
            method: "DELETE"
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

    return {savedSimulations, getSimulations, editSimulation, deleteSimulation};
}