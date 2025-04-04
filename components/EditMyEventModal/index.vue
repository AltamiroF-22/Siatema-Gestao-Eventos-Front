<template>
  <v-dialog v-model="editEvent.isModalOpen" max-width="600px">
    <v-card>
      <v-card-title>Editar Evento</v-card-title>
      <v-card-text>
        <v-form ref="formRef" v-model="isFormValid">
          <!-- Título -->
          <v-text-field
            v-model="editEvent.form.title"
            label="Título"
            :rules="[rules.required]"
          />

          <!-- Descrição -->
          <v-textarea
            v-model="editEvent.form.description"
            label="Descrição"
            :rules="[rules.required]"
          />

          <!-- Data do Evento -->
          <v-menu v-model="datePicker" :close-on-content-click="false">
            <template v-slot:activator="{ props }">
              <v-text-field
                v-model="formattedDate"
                label="Data do Evento"
                readonly
                v-bind="props"
                :rules="[rules.required]"
              />
            </template>
            <v-date-picker
              v-model="editEvent.form.date"
              @update:modelValue="formatDate"
            />
          </v-menu>

          <!-- Local do Evento -->
          <v-text-field
            v-model="editEvent.form.location"
            label="Local do Evento"
            :rules="[rules.required]"
          />

          <!-- Campo de Imagem -->
          <v-file-input
            label="Imagem do Evento"
            accept="image/*"
            @change="handleImageUpload"
            :rules="[rules.required]"
          />

          <!-- Exibir a Imagem Atual (se existir) -->
          <v-img
            v-if="editEvent.imagePreview"
            :src="editEvent.imagePreview"
            height="300px"
            cover
            class="mt-4"
          />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn :disabled="!isFormValid" @click="validateAndSubmit"
          >Confirmar</v-btn
        >
        <v-btn @click="editEvent.closeModal">Fechar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useEditMyEvent } from "@/stores/EditMyEvents";
const nuxtApp = useNuxtApp();
const { $toast } = nuxtApp;

// Store
const editEvent = useEditMyEvent();

// Referência ao form do Vuetify
const formRef = ref();
const isFormValid = ref(false);
const datePicker = ref(false);

// Formatando a data para exibição
const formattedDate = computed(() =>
  editEvent.form.date
    ? new Date(editEvent.form.date).toLocaleDateString("pt-BR")
    : ""
);

const formatDate = () => {
  datePicker.value = false; // Fecha o date picker após a seleção
};

// Regras de validação
const rules = {
  required: (value: string) => !!value || "Campo obrigatório.",
};

// Função para processar a imagem corretamente
const handleImageUpload = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files[0]) {
    const file = input.files[0];

    // Verifica o tipo de arquivo
    const validTypes = [
      "image/jpeg",
      "image/png",
      "image/jpg",
      "image/gif",
      "image/svg+xml",
    ];
    if (!validTypes.includes(file.type)) {
      editEvent.form.main_image = null; // Reseta o campo
      $toast.error(
        "O arquivo enviado deve ser uma imagem dos tipos: jpeg, png, jpg, gif ou svg.",
        { position: "top-right" }
      );

      return;
    }

    // Caso o arquivo seja válido, armazena o arquivo diretamente para envio
    editEvent.form.main_image = file; // Armazena o arquivo no campo
  }
};
// Função para validar e enviar o formulário
const validateAndSubmit = async () => {
  const { valid } = await formRef.value.validate();
  if (valid) {
    editEvent.comfirmEdit();
  }
};
</script>
