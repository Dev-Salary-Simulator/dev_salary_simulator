import { isProxy, toRaw } from 'vue';

export default () => {
    const runtimeConfig = useRuntimeConfig();
    const urlBase = process.dev ? runtimeConfig.public.mockBase : runtimeConfig.public.authBase;

    const userLogged = useState<TUser | null>('userLogged');

    async function updateProfile(payload: {firstname: string, lastname: string, birthday: Date, password?: string}){
        const {data, error}= await useFetch(`${urlBase}/user`, {
            headers: {Authorization: `Bearer ${localStorage.getItem('tokenDSS')}`},
            body: payload,
            method: "PATCH",
        }).then(res => {
            return {...res, data: res.data as Ref<{user: TUser}> | null}
        });
        if (!error?.value && data?.value) {
            if (isProxy(data.value)){
                data.value = toRaw(data.value);
            }
            userLogged.value = data.value.user;
        }
    }
    async function updateCurrentJob(payload: {nameJob: string, nameStack: string[], salary: number, experience: number, status: string}){
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
            userLogged.value = data.value.user;
        }
    }

    return {updateProfile, updateCurrentJob, addOldJob};
}