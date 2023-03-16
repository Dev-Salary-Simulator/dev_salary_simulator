// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    runtimeConfig: {
        apiSecret: '123', // File .env => NUXT_API_SECRET
        public: {
            apiBase: '/api' // File .env => NUXT_PUBLIC_API_BASE
        }
    },
    // Import SCSS
    css: [
        '@/assets/scss/main.scss'
    ],
    // Add colors for vue files
    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: '@use "@/assets/scss/colors.scss" as *;'
                }
            }
        }
    },
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