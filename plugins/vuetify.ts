// plugins/vuetify.ts
import "vuetify/styles"; // Certifique-se de importar os estilos do Vuetify
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    components,
    directives,
    ssr: true,
    theme: {
      defaultTheme: "light", // Define o tema padrão como 'light'
      themes: {
        light: {
          // Personalize o tema light, se necessário
          dark: false,
          colors: {
            primary: "#1976D2", // Exemplo de cor personalizada
            secondary: "#424242",
          },
        },
        dark: {
          // Personalize o tema dark, se necessário
          dark: true,
          colors: {
            primary: "#1E1E1E",
            secondary: "#757575",
          },
        },
      },
    },
  });
  nuxtApp.vueApp.use(vuetify);
});
