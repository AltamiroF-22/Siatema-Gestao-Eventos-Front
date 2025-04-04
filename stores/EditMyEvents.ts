import { defineStore } from "pinia";
import { ref } from "vue";
import type { Event } from "~/interfaces/Events";
import { editMyEvent } from "@/actions/myEvents/editMyEvents";

export const useEditMyEvent = defineStore("EditMyEvent", () => {
  const isModalOpen = ref<boolean>(false);
  const form = ref<Event>({
    id: undefined, // Adicionando id para referência
    title: "",
    description: "",
    date: new Date(),
    location: "",
    main_image: null,
  });

  const imagePreview = ref<string | null>(null); // Para exibir a imagem no formulário

  const openModal = (event: Event) => {
    Object.assign(form.value, {
      ...event,
      date: event.date ? new Date(event.date) : new Date(),
    });

    imagePreview.value = event.main_image || null; // Define a imagem existente como preview

    isModalOpen.value = true;
  };
  const closeModal = () => {
    isModalOpen.value = false;
  };

  const comfirmEdit = () => {
    if (!form.value.id) return;
    editMyEvent(form.value.id, form.value);
  };

  return {
    openModal,
    closeModal,
    isModalOpen,
    form,
    comfirmEdit,
    imagePreview
  };
});
