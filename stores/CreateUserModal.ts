import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";

export const useCreateUser = defineStore("create-user-modal", () => {
  const isModalOpen = ref(false);
  const textInput = ref({
    name: "",
    email: "",
    password: "",
  });

  // Ação para abrir o modal
  const openModal = () => {
    isModalOpen.value = true;
  };

  // Ação para fechar o modal
  const closeModal = () => {
    isModalOpen.value = false;
    // textInput.value = { name: "", email: "", password: "" }; // Limpar os campos
  };

  // Ação para criar o usuário via API
  const createUser = async () => {
    const nuxtApp = useNuxtApp(); // Usando useNuxtApp corretamente
    const { $toast } = nuxtApp; // Pegando o $toast

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/create-user",
        {
          name: textInput.value.name,
          email: textInput.value.email,
          password: textInput.value.password,
        }
      );

      console.log("Usuário criado:", response.data);
      closeModal(); // Fechar o modal após sucesso
      $toast.success(response.data.message, { position: "top-right" });
    } catch (error: any) {
      console.error("Erro ao criar usuário:", error);

      // Verifica se a resposta da API contém mensagens de erro
      if (error.response && error.response.data) {
        const apiErrors = error.response.data.errors;

        // Exibe cada mensagem de erro no toast
        if (apiErrors) {
          Object.keys(apiErrors).forEach((field) => {
            apiErrors[field].forEach((message: string) => {
              $toast.error(message, { position: "top-right" });
            });
          });
        } else {
          // Caso haja um erro geral sem `errors`
          $toast.error(error.response.data.message, { position: "top-right" });
        }
      } else {
        // Erro inesperado (ex: erro de rede)
        $toast.error("Erro ao conectar com o servidor.", {
          position: "top-right",
        });
      }
    }
  };

  return {
    isModalOpen,
    textInput,
    openModal,
    closeModal,
    createUser,
  };
});
