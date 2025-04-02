<template>
  <v-container>
    <h1 class="text-h4 mb-24 mt-4 text-zinc-800">Meus Eventos</h1>

    <!-- Loading -->
    <v-row justify="center" v-if="loading">
      <v-progress-circular
        indeterminate
        color="primary"
        size="50"
      ></v-progress-circular>
    </v-row>

    <!-- Mensagem caso não haja eventos -->
    <v-alert v-else-if="!loading && myEvents.length === 0" type="info">
      Nenhum evento encontrado.
    </v-alert>

    <!-- Lista de eventos -->
    <v-row v-else>
      <v-col v-for="event in myEvents" :key="event.id" cols="12" md="6" lg="4">
        <v-card>
          <v-img :src="event.main_image" height="400px" cover></v-img>

          <v-card-title>{{ event.title }}</v-card-title>

          <v-card-subtitle>
            {{ new Date(event.date).toLocaleDateString() }} -
            {{ event.location }}
          </v-card-subtitle>

          <v-card-text>
            {{ event.description }}
          </v-card-text>

          <v-card-actions>
            <v-btn
              color="primary"
              :disabled="loading"
              @click="editEvent(event)"
            >
              <v-icon left>mdi-pencil</v-icon> Editar
            </v-btn>

            <v-btn
              color="red"
              :disabled="loading"
              @click="handleDeleEvente(event.id)"
            >
              <v-icon left>mdi-delete</v-icon> Apagar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <!-- Paginação -->
    <v-pagination
      class="mt-24"
      v-model="page"
      :length="totalPages"
      @update:model-value="handlePageChange"
      :disabled="loading"
    ></v-pagination>
  </v-container>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { getMyEvents } from "~/actions/myEvents/getMyEvents";
import { deleteMyEvent } from "~/actions/myEvents/deleteMyEvents";
import type { Event } from "~/interfaces/Events";

const myEvents = ref<Event[]>([]);
const page = ref<number>(1);
const totalPages = ref<number>(1);
const loading = ref<boolean>(false);

const handlePageChange = async () => {
  loading.value = true;
  const { events, lastPage } = await getMyEvents(page.value);
  myEvents.value = events;
  totalPages.value = lastPage;
  loading.value = false;
};

const handleDeleEvente = async (id: string | number | undefined) => {
  try {
    if (id === undefined) return;
    await deleteMyEvent(id);
    myEvents.value = myEvents.value.filter((event) => event.id !== id);
  } catch (e) {}
};

const editEvent = (event: Event) => {
  console.log("Editando evento:", event);
  // Aqui você pode redirecionar para uma página de edição ou abrir um modal
};

onMounted(() => {
  handlePageChange();
});
</script>
