import { isProxy, toRaw } from 'vue';

export default () => {
    const runtimeConfig = useRuntimeConfig();
    const namesJob = useState<string[]>('namesJob', () => []);

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
            namesJob.value = data.value ?? namesJob.value;
        }
    }

    return {namesJob, getNamesOfJobs};
}