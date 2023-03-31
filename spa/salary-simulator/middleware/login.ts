export default defineNuxtRouteMiddleware((to, from) => {
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
    })
})