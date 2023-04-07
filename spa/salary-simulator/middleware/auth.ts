export default defineNuxtRouteMiddleware(async (to, from) => {
    const user = useState('userLogged');
    switch (to.name) {
        case 'login':
            if (user.value) {
                return navigateTo('/');
            }
            break;
        case 'profile':
            if (!user.value) {
                return navigateTo('/');
            }
            break;
        case 'simulations':
            if (!user.value) {
                return navigateTo('/');
            }
            break;
        default:
            break;
    }
})