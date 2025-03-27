import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";
import type { Event } from "~/interfaces/Events";
import { useLoginModal } from "@/stores/LoginModal";

export const useCreateEventModal = defineStore("CreateEvents", () => {
  const loginModal = useLoginModal();
  const isModalOpen = ref<boolean>(false);
  const form = ref<Event>({
    title: "",
    description: "",
    date: new Date(),
    location: "",
    main_image: null,
  });

  const openModal = () => {
    isModalOpen.value = true;
  };

  const closeModal = () => {
    isModalOpen.value = false;
  };

  const createEvent = async () => {
    const nuxtApp = useNuxtApp();
    const { $toast } = nuxtApp;

    try {
      // Criando FormData para enviar o arquivo
      const formattedDate = form.value.date
        .toISOString()
        .slice(0, 19)
        .replace("T", " ");
      const formData = new FormData();
      formData.append("title", form.value.title);
      formData.append("description", form.value.description);
      formData.append("date", formattedDate);
      formData.append("location", form.value.location);

      if (form.value.main_image) {
        formData.append("main_image", form.value.main_image);
      }

      const response = await axios.post(
        "http://127.0.0.1:8000/api/create-event",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${loginModal.token}`,
          },
        }
      );
      closeModal();
      $toast.success(response.data.message, { position: "top-right" });
    } catch (error: any) {
      console.error("Erro ao criar evento:", error);

      if (error.response && error.response.data) {
        const apiErrors = error.response.data.errors;

        if (apiErrors) {
          Object.keys(apiErrors).forEach((field) => {
            apiErrors[field].forEach((message: string) => {
              $toast.error(message, { position: "top-right" });
            });
          });
        } else {
          $toast.error(error.response.data.message, { position: "top-right" });
        }
      } else {
        $toast.error("Erro ao conectar com o servidor.", {
          position: "top-right",
        });
      }
    }
  };

  return {
    createEvent,
    openModal,
    closeModal,
    isModalOpen,
    form,
  };
});
