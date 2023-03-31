export default defineNuxtRouteMiddleware((to, from) => {
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
})