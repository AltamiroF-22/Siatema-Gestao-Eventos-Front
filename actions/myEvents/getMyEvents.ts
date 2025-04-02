import axios from "axios";
import type { Event } from "~/interfaces/Events";
import { useLoginModal } from "@/stores/LoginModal";

export const getMyEvents = async (page: number): Promise<{ events: Event[]; lastPage: number }> => {
    const loginModal = useLoginModal();
    try {
      const response = await axios.get<{
        events: {
          data: Event[];
          last_page: number;
        };
      }>(`http://127.0.0.1:8000/api/user/events?page=${page}`, {
        headers: { Authorization: `Bearer ${loginModal.token}` },
      });
  
      return {
        events: response.data.events.data, // Retorna os eventos corretamente
        lastPage: response.data.events.last_page, // Retorna a última página
      };
    } catch (error) {
      console.error("Erro ao buscar meus eventos:", error);
      return { events: [], lastPage: 1 }; // Retorna um fallback para evitar erros
    }
  };
  