import axios from "axios";
import { useLoginModal } from "@/stores/LoginModal";
import type { Event } from "~/interfaces/Events";

export const editMyEvent = async (
  id: number | string | undefined,
  eventData: Partial<Event>
) => {
  if (!id) return;

  const loginModal = useLoginModal();
  const nuxtApp = useNuxtApp();
  const { $toast } = nuxtApp;

  try {
    const response = await axios.put<{ message: string }>(
      `http://127.0.0.1:8000/api/events/${id}`,
      eventData,
      {
        headers: {
          Authorization: `Bearer ${loginModal.token}`,
          "Content-Type": "application/json",
        },
      }
    );

    $toast.success(response.data.message, { position: "top-right" });
  } catch (error) {
    console.error("Erro ao editar evento", error);
    $toast.error("Erro ao editar evento", { position: "top-right" });
  }
};
