export default () => {
    const runtimeConfig = useRuntimeConfig();
    const urlBase = process.dev ? runtimeConfig.public.mockBase : runtimeConfig.public.apiBase;
    
    const savedSimulations = useState<TSavedSimulation[]>('savedSimulations', () => []);


    return {savedSimulations};
}