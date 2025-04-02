import axios from "axios";
import { useLoginModal } from "@/stores/LoginModal";

interface DeleteEventResponse {
  message: string;
}

export const deleteMyEvent = async (id: number | string | undefined) => {
  const loginModal = useLoginModal();
  const nuxtApp = useNuxtApp();
  const { $toast } = nuxtApp;
  try {
    const response = await axios.delete<DeleteEventResponse>(
      `http://127.0.0.1:8000/api/events/${id}`,
      {
        headers: { Authorization: `Bearer ${loginModal.token}` },
      }
    );

    $toast.success(response.data.message, { position: "top-right" });
  } catch (error) {
    console.error("Erro ao deletar evento", error);
    $toast.error("Erro ao deletar evento", { position: "top-right" });
  }
};
