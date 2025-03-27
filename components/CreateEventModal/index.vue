<template>
    <v-dialog v-model="createEventModal.isModalOpen" max-width="500px">
      <v-card>
        <v-card-title>Criar Evento</v-card-title>
        <v-card-text>
          <v-form ref="formRef" v-model="isFormValid">
            <!-- Título -->
            <v-text-field
              v-model="createEventModal.form.title"
              label="Título"
              :rules="[rules.required]"
            />
  
            <!-- Descrição -->
            <v-textarea
              v-model="createEventModal.form.description"
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
                v-model="createEventModal.form.date"
                @update:modelValue="formatDate"
              />
            </v-menu>
  
            <!-- Local do Evento -->
            <v-text-field
              v-model="createEventModal.form.location"
              label="Local do Evento"
              :rules="[rules.required]"
            />
  
            <!-- Upload de Imagem -->
            <v-file-input
              label="Imagem do Evento"
              accept="image/*"
              @change="handleImageUpload"
              :rules="[rules.required]"
            />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn :disabled="!isFormValid" @click="validateAndSubmit">Criar</v-btn>
          <v-btn @click="createEventModal.closeModal">Fechar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>
  
  <script setup lang="ts">
  import { ref, computed } from "vue";
  import { useCreateEventModal } from "@/stores/CreateEventModal";
  
  // Store
  const createEventModal = useCreateEventModal();
  
  // Referência ao form do Vuetify
  const formRef = ref();
  const isFormValid = ref(false);
  const datePicker = ref(false);
  
  // Formatando a data para exibição
  const formattedDate = computed(() =>
    createEventModal.form.date
      ? new Date(createEventModal.form.date).toLocaleDateString("pt-BR")
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
  const handleImageUpload = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      createEventModal.form.main_image = file;
    }
  };
  
  // Função para validar e enviar o formulário
  const validateAndSubmit = async () => {
    const { valid } = await formRef.value.validate();
    if (valid) {
      createEventModal.createEvent();
    }
  };
  </script>
  