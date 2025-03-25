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
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/create-user", {
        name: textInput.value.name,
        email: textInput.value.email,
        password: textInput.value.password,
      });
      console.log("Usuário criado:", response.data);
      closeModal(); // Fechar o modal após sucesso
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
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
