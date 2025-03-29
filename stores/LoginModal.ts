import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";

import type { AuthResponse } from "@/interfaces/UserAuth";

export const useLoginModal = defineStore(
  "auth",
  () => {
    const isModalOpen = ref(false);
    const textInput = ref({
      email: "",
      password: "",
    });

    const token = ref<string | null>(null);
    const userId = ref<string | number | null>(null);

    const openModal = () => {
      isModalOpen.value = true;
    };

    const closeModal = () => {
      isModalOpen.value = false;
    };

    const login = async (): Promise<AuthResponse | null> => {
      const nuxtApp = useNuxtApp(); // Usando useNuxtApp corretamente
      const { $toast } = nuxtApp; // Pegando o $toast

      try {
        const response = await axios.post<AuthResponse>(
          "http://127.0.0.1:8000/api/login",
          {
            email: textInput.value.email,
            password: textInput.value.password,
          }
        );

        token.value = response.data.token;
        userId.value = response.data.user.id;

        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${token.value}`;

        closeModal();
        $toast.success(response.data.message, { position: "top-right" });
        return response.data;
      } catch (error: any) {
        console.error("Erro ao logar usuário:", error);
        if (error.response && error.response.data) {
          $toast.error(error.response.data.message, { position: "top-right" });
        }
        return null;
      }
    };

    const logout = async () => {
      const nuxtApp = useNuxtApp(); // Usando useNuxtApp corretamente
      const { $toast } = nuxtApp; // Pegando o $toast

      try {
        const response = await axios.post(
          `http://127.0.0.1:8000/api/logout/${userId.value}`,
          {},
          {
            headers: { Authorization: `Bearer ${token.value}` },
          }
        );
        delete axios.defaults.headers.common["Authorization"];
        token.value = null;
        userId.value = null;
        $toast.success(response.data.message, { position: "top-right" });
      } catch (error) {
        console.error("Erro ao deslogar usuário:", error);
      }
    };

    return {
      isModalOpen,
      textInput,
      openModal,
      closeModal,
      login,
      logout,
      token,
      userId,
    };
  },
  {
    persist: true,
  }
);
