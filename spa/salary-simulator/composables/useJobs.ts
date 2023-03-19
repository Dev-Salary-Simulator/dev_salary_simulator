import { isProxy, toRaw } from 'vue';

export default () => {
    const runtimeConfig = useRuntimeConfig();
    const jobs = useState<TJob[]>('jobs', () => []);
    const namesJobs = useState<string[]>('namesJobs', () => []);

    async function getJobs(){
        const {data, error} = await useFetch(`${runtimeConfig.public.apiBase}/jobs`)
        .then(res => {
            return {...res, data: res.data as Ref<TJob[]> | null}
        });
        if (!error?.value && data?.value) {
            if (isProxy(data.value)){
                data.value = toRaw(data.value);
            }
            jobs.value = data.value ?? jobs.value;
        }
    }

    async function getNamesOfJobs(){
        await nextTick();
        const {data, error} = await useLazyFetch(`${runtimeConfig.public.apiBase}/jobs/titles`)
        .then(res => {
            return {...res, data: res.data as Ref<string[]> | null}
        });
        if (!error?.value && data?.value) {
            if (isProxy(data.value)){
                data.value = toRaw(data.value);
            }
            namesJobs.value = data.value ?? namesJobs.value;
        }
    }

    return {jobs, getJobs, namesJobs, getNamesOfJobs};
}