// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    // Import SCSS
    css: [
        '@/assets/scss/bootstrap.scss',
        '@/assets/scss/main.scss'
    ],
    // Meta tag & SEO
    app: {
        head: {
            charset: 'utf-8', 
            viewport: 'width=device-width, initial-scale=1', 
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
        }
    }
});