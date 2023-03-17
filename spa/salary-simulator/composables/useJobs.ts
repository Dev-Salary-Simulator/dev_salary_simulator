export default () => {
    const runtimeConfig = useRuntimeConfig();
    const namesJob = useState<string[]>('namesJob', () => []);

    async function getNamesOfJobs(){
        const {data, error} = await useLazyFetch<string[]>(`${runtimeConfig.public.apiBase}/jobs`)
        .then(res => {
            return {data: res.data.value, error: res.error.value?.data}
        });
        namesJob.value = data ?? namesJob.value;
        console.log(data);
        console.log(error);
        return data;
    }
    getNamesOfJobs();
    
    return {namesJob};
}