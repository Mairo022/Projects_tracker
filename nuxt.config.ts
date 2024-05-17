export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', 'shadcn-nuxt', "nuxt-svgo"],
  shadcn: {
    prefix: '',
    componentDir: './components/ui'
  },
  plugins: [],
  nitro: {
    plugins: [],
  },
  ssr: true,
  telemetry: false
})