export default defineNuxtRouteMiddleware((to, from) => {
    switch (to.name) {
        case 'index':
            useHead({
                title: 'Dev Salary Simulator',
                meta: [
                    { 
                        name: 'description', 
                        content: 'Now simulate the salary you deserve according to your computer skills!' 
                    }
                ],
                htmlAttrs: {
                    lang: 'en'
                }
            })
            break;
        case 'login':
            useHead({
                title: "Login",
                meta: [
                    { 
                        name: 'description', 
                        content: 'Log in or sign up to get all the functionnality of this amazing app!' 
                    }
                ],
                htmlAttrs: {
                    lang: 'en'
                }
            });
            break;
        case 'profile':
            useHead({
                title: "Profile",
                meta: [
                    { 
                        name: 'description', 
                        content: 'Set up your personal datas and your job here. You can visualize your old jobs too!' 
                    }
                ],
                htmlAttrs: {
                    lang: 'en'
                }
            });
            break;
        case 'simulations':
            useHead({
                title: "Simulations saved",
                meta: [
                    { 
                        name: 'description', 
                        content: 'Retrieve your saved simulations here with a sum of prices, stacks, experience, etc...' 
                    }
                ],
                htmlAttrs: {
                    lang: 'en'
                }
            });
            break;
        default:
            break;
    }
})