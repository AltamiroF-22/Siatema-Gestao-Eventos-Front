import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";

export const useLoginModal = defineStore(
  "auth",
  () => {
    const isModalOpen = ref(false);
    const textInput = ref({
      email: "",
      password: "",
    });

    const token = ref<string | null>(null);

    const openModal = () => {
      isModalOpen.value = true;
    };

    const closeModal = () => {
      isModalOpen.value = false;
    };

    const login = async () => {
      try {
        const response = await axios.post("http://127.0.0.1:8000/api/login", {
          email: textInput.value.email,
          password: textInput.value.password,
        });

        token.value = response.data.token;

        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${token.value}`;
      } catch (error) {
        console.error("Erro ao logar usuário:", error);
      }
    };

    const logout = () => {
      token.value = null;
      delete axios.defaults.headers.common["Authorization"];
    };

    return {
      isModalOpen,
      textInput,
      openModal,
      closeModal,
      login,
      logout,
      token,
    };
  },
  {
    persist: true,
  }
);
