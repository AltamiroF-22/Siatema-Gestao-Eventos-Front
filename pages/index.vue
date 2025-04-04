<template>
  <header
    :style="{ backgroundImage: `url(${eventsHeader})` }"
    class="w-full min-h-[70dvh] bg-cover bg-center"
  >
    <!-- Conteúdo do header -->
  </header>

  <v-container>
    <!-- Cards dos eventos -->
    <v-row
      class="my-6 pt-24 mb-40 gap-4 flex items-center justify-center"
      dense
    >
      <v-col
        v-for="event in eventsStore.Events"
        :key="event.id"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <v-card
          class="event-card rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 ease-in-out cursor-pointer"
        >
          <!-- Imagem principal do evento -->
          <v-img
            :src="event.main_image || ''"
            alt="Imagem do evento"
            height="300px"
            class="w-full"
            cover
          ></v-img>

          <!-- Título do evento -->
          <v-card-title class="text-xl font-semibold text-gray-900 p-4">
            {{ event.title }}
          </v-card-title>

          <!-- Data do evento -->
          <v-card-subtitle class="text-sm text-gray-600 p-0 pl-4">
            {{ event.date }}
          </v-card-subtitle>

          <!-- Descrição do evento -->
          <v-card-text class="text-gray-700 text-base p-4">
            {{ event.description }}
          </v-card-text>

          <!-- Ações -->
          <v-card-actions class="p-4">
            <v-btn
              @click="subscribeToEvent(event.id)"
              color="cyan"
              class="rounded-full text-white font-medium transition-transform transform hover:scale-105"
            >
              Inscrever-se
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <!-- Paginação -->
    <v-pagination
      :length="eventsStore.TotalPages"
      @update:model-value="handlePageChange"
      :model-value="eventsStore.EventPage"
    ></v-pagination>
  </v-container>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useEventsStore } from "@/stores/EventsStore";
import eventsHeader from "@/public/images/events-header.jpg";

const eventsStore = useEventsStore();

onMounted(() => {
  eventsStore.getEvents();
});

// Função para inscrever-se no evento (exemplo)
const subscribeToEvent = (eventId: any) => {
  console.log("Inscrevendo-se no evento", eventId);
};

// Função para alterar a página na paginação
const handlePageChange = (page: number) => {
  eventsStore.newEventPage(page);
};
</script>
