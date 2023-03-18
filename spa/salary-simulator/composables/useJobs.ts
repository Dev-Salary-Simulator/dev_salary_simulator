import { isProxy, toRaw } from 'vue';

export default () => {
    const runtimeConfig = useRuntimeConfig();
    const namesJob = useState<string[]>('namesJob', () => []);

    async function getNamesOfJobs(){
        await nextTick();
        const {data} = await useLazyFetch<string[]>(`${runtimeConfig.public.apiBase}/jobs/titles`);
        if (isProxy(data.value)){
            data.value = toRaw(data.value);
        }
        namesJob.value = data.value ?? namesJob.value;
    }

    return {namesJob, getNamesOfJobs};
}