import { isProxy, toRaw } from 'vue';

export default () => {
    const runtimeConfig = useRuntimeConfig();
    const userLogged = useState<TUser | null>('userLogged', () => null);

    async function login(payload: {email: string, password: string}){
        const {data, error}= await useFetch(`${runtimeConfig.public.authBase}/auth/login`, {
            body: payload,
            method: "POST",
        }).then(res => {
            return {...res, data: res.data as Ref<{user: TUser, jwt: string}> | null}
        });
        if (!error?.value && data?.value) {
            if (isProxy(data.value)){
                data.value = toRaw(data.value);
            }
            userLogged.value = data.value.user;
            localStorage.setItem('tokenDSS', data.value.jwt)
        }
    }
    
    async function register(payload: {email: string, password: string}){
        const {data, error} = await useFetch(`${runtimeConfig.public.authBase}/auth/register`, {
            body: payload,
            method: "POST"
        }).then(res => {
            return {...res, data: res.data as Ref<{user: TUser, jwt: string}> | null}
        });
        if (!error?.value && data?.value) {
            if (isProxy(data.value)){
                data.value = toRaw(data.value);
            }
            userLogged.value = data.value.user;
            localStorage.setItem('tokenDSS', data.value.jwt)
        }
    }
    
    async function autoLogin(){
        if (localStorage.getItem('tokenDSS')) {
            await nextTick();
            const {data, error} = await useFetch(`${runtimeConfig.public.authBase}/auth/auto`, {
                headers: {Authorization: `Bearer ${localStorage.getItem('tokenDSS')}`}
            }).then(res => {
                return {...res, data: res.data as Ref<{user: TUser, jwt: string}> | null}
            });
            if (!error?.value && data?.value) {
                if (isProxy(data.value)){
                    data.value = toRaw(data.value);
                }
                userLogged.value = data.value.user;
                localStorage.setItem('tokenDSS', data.value.jwt)
            }
        }
    }

    return {userLogged, login, register, autoLogin};
}