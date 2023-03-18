import { isProxy, toRaw } from 'vue';

export default () => {
    const runtimeConfig = useRuntimeConfig();
    const userLogged = useState<TUser | null>('userLogged', () => null);
    async function login(payload: {email: string, password: string}){
        const {data, error}= await useFetch(`${runtimeConfig.public.apiBase}/login`, {
            body: payload,
            method: "POST",
        }).then(res => {
            return {data: res.data as Ref<{user: TUser, jwt: string}>, error: res.error}
        });
        if (isProxy(data.value)){
            data.value = toRaw(data.value);
        }
        if (!error.value && data?.value) {
            userLogged.value = data.value.user;
            localStorage.setItem('tokenDSS', data.value.jwt)
        }
    }
    
    async function register(payload: {email: string, password: string}){
        const {data, error} = await useFetch(`${runtimeConfig.public.apiBase}/register`, {
            body: payload,
            method: "POST"
        }).then(res => {
            return {data: res.data as Ref<{user: TUser, jwt: string}>, error: res.error}
        });
        if (isProxy(data.value)){
            data.value = toRaw(data.value);
        }
        if (!error.value && data?.value) {
            userLogged.value = data.value.user;
            localStorage.setItem('tokenDSS', data.value.jwt)
        }
    }
    
    async function autoLogin(){
        await nextTick();
        const {data, error} = await useFetch(`${runtimeConfig.public.apiBase}/auto`, {
            headers: {Authorization: localStorage.getItem('tokenDSS') ? `Bearer ${localStorage.getItem('tokenDSS')}` : ''}
        }).then(res => {
            return {data: res.data as Ref<{user: TUser, jwt: string}>, error: res.error}
        });
        if (isProxy(data.value)){
            data.value = toRaw(data.value);
        }
        if (!error.value && data?.value) {
            userLogged.value = data.value.user;
            localStorage.setItem('tokenDSS', data.value.jwt)
        }
    }

    return {userLogged, login, register, autoLogin};
}