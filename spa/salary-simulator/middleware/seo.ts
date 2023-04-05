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
        default:
            break;
    }
})