import { isProxy, toRaw } from 'vue';

export default () => {
    const runtimeConfig = useRuntimeConfig();
    const urlBase = process.dev ? runtimeConfig.public.mockBase : runtimeConfig.public.authBase;

    const userLogged = useState<TUser | null>('userLogged');

    async function updateProfile(payload: {firstname: string, lastname: string, birthday: Date, password?: string}){
        const {data, error}= await useFetch(`${urlBase}/user/`, {
            headers: {Authorization: `Bearer ${localStorage.getItem('tokenDSS')}`},
            body: payload,
            method: "PATCH",
        }).then(res => {
            return {...res, data: res.data as Ref<TUser | null>}
        });
        if (!error?.value && data?.value) {
            if (isProxy(data.value[0])){
                data.value = toRaw(data.value[0]);
            }
            data.value.firstName && (data.value.firstname = data.value.firstName);
            data.value.lastName && (data.value.lastname = data.value.lastName);
            data.value.oldJobs = data.value.oldJobs.map(job => {
                job.nameJob = job.title;
                job.namesStack = job.stack;
                return job;
            });
            userLogged.value = data.value;
        }
    }
    async function updateCurrentJob(payload: {nameJob: string, nameStack: string[], nameRegion: string, salary: number, experience: number, status: string}){
        const {data, error}= await useFetch(`${urlBase}/user/job`, {
            headers: {Authorization: `Bearer ${localStorage.getItem('tokenDSS')}`},
            body: payload,
            method: "POST",
        }).then(res => {
            return {...res, data: res.data as Ref<{currentJob: TJob}> | null}
        });
        if (!error?.value && data?.value) {
            if (isProxy(data.value)){
                data.value = toRaw(data.value);
            }
            if (userLogged.value) {
                data.value.currentJob.nameJob = data.value.currentJob.title;
                data.value.currentJob.namesStack = data.value.currentJob.stack;
                userLogged.value.currentJob = data.value.currentJob;
            }
        }
    }
    async function addOldJob(){
        const {data, error}= await useFetch(`${urlBase}/user/job`, {
            headers: {Authorization: `Bearer ${localStorage.getItem('tokenDSS')}`},
            method: "PATCH",
        }).then(res => {
            return {...res, data: res.data as Ref<{user: TUser}> | null}
        });
        if (!error?.value && data?.value) {
            if (isProxy(data.value)){
                data.value = toRaw(data.value);
            }
            data.value.user.oldJobs = data.value.user.oldJobs.map(job => {
                job.nameJob = job.title;
                job.namesStack = job.stack;
                return job;
            });
            userLogged.value.currentJob = null;
            userLogged.value.oldJobs = data.value.user.oldJobs;
        }
    }

    return {updateProfile, updateCurrentJob, addOldJob};
}