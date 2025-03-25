// nuxt.config.ts
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  css: [
    "~/assets/css/tailwind.css", // Arquivo Tailwind específico
    "vuetify/styles", // Importa os estilos do Vuetify
    '@mdi/font/css/materialdesignicons.css', // Importa os ícones do Material Design
  ],
  modules: [
    "@pinia/nuxt",
    "pinia-plugin-persistedstate/nuxt",
    "@nuxtjs/tailwindcss",
  ],
  pinia: {
    storesDirs: ["./stores/**"], // Diretório das stores do Pinia
  },
  // Plugins do Vuetify
  plugins: ["~/plugins/vuetify.ts"],
  build: {
    transpile: ["vuetify"],
  },

  // Metadata para SEO e redes sociais
  app: {
    head: {
      title: "Sistema de Gestão de Eventos", // Título da página
      meta: [
        {
          name: "description",
          content:
            "Sistema de gestão de eventos para gerenciar atividades, participantes e mais.",
        }, // Descrição para SEO
        { name: "author", content: "Altamiro" }, // Autor da aplicação
        { name: "viewport", content: "width=device-width, initial-scale=1" }, // Configuração de viewport para dispositivos móveis
        {
          name: "keywords",
          content:
            "gestão de eventos, sistema, eventos corporativos, eventos acadêmicos, participantes",
        }, // Palavras-chave para SEO
        { name: "robots", content: "index, follow" }, // Permitir que motores de busca indexem a página
      ],
      link: [
        { rel: "icon", href: "/favicon.ico" }, // Ícone do site
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap",
        }, // Fonte externa
      ],
    },
  },
});
