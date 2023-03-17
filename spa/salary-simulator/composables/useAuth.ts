export default () => {
    const runtimeConfig = useRuntimeConfig();
    const userLogged = useState<TUser | null>('userLogged', () => null);
    
    async function login(){
        const {data, error} = await useFetch(`${runtimeConfig.public.apiBase}/login`)
        .then(res => {
            return {data: res.data.value, error: res.error.value?.data}
        });
        return {data, error};
    }
    
    async function autoLogin(){
        const {data, error} = await useFetch(`${runtimeConfig.public.apiBase}/auto`, {headers: {Authorization: localStorage.getItem('tokenDSS') || ''}})
        .then(res => {
            return {data: res.data.value, error: res.error.value?.data}
        });
        return {data, error};
    }

    return {userLogged, login, autoLogin};
}