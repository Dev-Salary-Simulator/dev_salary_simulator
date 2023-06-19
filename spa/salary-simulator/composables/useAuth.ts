import { isProxy, toRaw } from 'vue';

export default () => {
    const runtimeConfig = useRuntimeConfig();
    const urlBase = process.dev ? runtimeConfig.public.mockBase : runtimeConfig.public.authBase;

    const userLogged = useState<TUser | null>('userLogged', () => null);

    async function login(payload: {email: string, password: string}){
        const {data, error}= await useFetch(`${urlBase}/auth/login`, {
            body: payload,
            method: "POST",
        }).then(res => {
            return {...res, data: res.data as Ref<{user: TUser, jwt: string}> | null}
        });
        if (!error?.value && data?.value) {
            if (isProxy(data.value)){
                data.value = toRaw(data.value);
            }
            data.value.user.firstName && (data.value.user.firstname = data.value.user.firstName);
            data.value.user.lastName && (data.value.user.lastname = data.value.user.lastName);
            data.value.user.oldJobs = data.value.user.oldJobs.map(job => {
                job.nameJob = job.title;
                job.namesStack = job.stack;
                return job;
            });
            if (data.value.user.currentJob) {
                data.value.user.currentJob.nameJob = data.value.user.currentJob.title;
                data.value.user.currentJob.namesStack = data.value.user.currentJob.stack;
            }
            userLogged.value = data.value.user;
            localStorage.setItem('tokenDSS', data.value.jwt);
            navigateTo('/');
        }
    }
    
    async function register(payload: {email: string, password: string}){
        const {data, error} = await useFetch(`${urlBase}/auth/register`, {
            body: payload,
            method: "POST"
        }).then(res => {
            return {...res, data: res.data as Ref<{user: TUser, jwt: string}> | null}
        });
        if (!error?.value && data?.value) {
            if (isProxy(data.value)){
                data.value = toRaw(data.value);
            }
            data.value.user.firstName && (data.value.user.firstname = data.value.user.firstName);
            data.value.user.lastName && (data.value.user.lastname = data.value.user.lastName);
            data.value.user.oldJobs = data.value.user.oldJobs.map(job => {
                job.nameJob = job.title;
                job.namesStack = job.stack;
                return job;
            });
            if (data.value.user.currentJob) {
                data.value.user.currentJob.nameJob = data.value.user.currentJob.title;
                data.value.user.currentJob.namesStack = data.value.user.currentJob.stack;
            }
            userLogged.value = data.value.user;
            localStorage.setItem('tokenDSS', data.value.jwt);
            navigateTo('/');
        }
    }
    
    async function autoLogin(){
        if (localStorage.getItem('tokenDSS')) {
            await nextTick();
            const {data, error} = await useFetch(`${urlBase}/auth/auto`, {
                headers: {Authorization: `Bearer ${localStorage.getItem('tokenDSS')}`}
            }).then(res => {
                return {...res, data: res.data as Ref<{user: TUser, jwt: string}> | null}
            });
            if (!error?.value && data?.value) {
                if (isProxy(data.value)){
                    data.value = toRaw(data.value);
                }
                data.value.user.firstName && (data.value.user.firstname = data.value.user.firstName);
                data.value.user.lastName && (data.value.user.lastname = data.value.user.lastName);
                data.value.user.oldJobs = data.value.user.oldJobs.map(job => {
                    job.nameJob = job.title;
                    job.namesStack = job.stack;
                    return job;
                });
                if (data.value.user.currentJob) {
                    data.value.user.currentJob.nameJob = data.value.user.currentJob.title;
                    data.value.user.currentJob.namesStack = data.value.user.currentJob.stack;
                }
                userLogged.value = data.value.user;
                localStorage.setItem('tokenDSS', data.value.jwt);
                const route = useRoute();
                if (route.name === "login") {
                    navigateTo('/');
                }
            }
        }
    }

    function disconnect(){
        userLogged.value = null;
        localStorage.removeItem('tokenDSS');
        navigateTo('/');
    }

    return {userLogged, login, register, autoLogin, disconnect};
}