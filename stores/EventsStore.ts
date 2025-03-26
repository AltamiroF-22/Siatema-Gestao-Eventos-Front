import { defineStore } from "pinia";
import { ref, watch } from "vue";
import axios from "axios";
import type { Event } from "~/interfaces/Events";

export const useEventsStore = defineStore("events", () => {
  const Events = ref<Event[]>([]);
  const EventPage = ref<number>(1);
  const TotalPages = ref<number>(1); // Para o v-pagination

  const getEvents = async () => {
    try {
      const response = await axios.get<{
        events: {
          data: Event[];
          last_page: number;
        };
      }>(`http://127.0.0.1:8000/api/events?page=${EventPage.value}`);

      if (
        response.data.events &&
        Array.isArray(response.data.events.data) &&
        typeof response.data.events.last_page === "number"
      ) {
        Events.value = response.data.events.data;
        TotalPages.value = response.data.events.last_page;
      } else {
        console.error("Estrutura da resposta inválida");
      }
    } catch (error) {
      console.error("Erro ao buscar eventos:", error);
    }
  };

  const newEventPage = (page: number) => {
    if (page !== EventPage.value) {
      EventPage.value = page;
      getEvents(); // Chama getEvents após mudar a página
    }
  };

  // Watcher para buscar eventos sempre que a página for alterada
  watch(EventPage, async () => {
    await getEvents();
  });

  return {
    getEvents,
    newEventPage,
    Events,
    EventPage,
    TotalPages, // Para usar no v-pagination
  };
});
