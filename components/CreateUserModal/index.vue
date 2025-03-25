<template>
  <v-dialog v-model="createUserStore.isModalOpen" max-width="500px">
    <v-card>
      <v-card-title>Criar Usuário</v-card-title>
      <v-card-text>
        <v-form ref="formRef" v-model="isFormValid">
          <v-text-field
            v-model="createUserStore.textInput.name"
            label="Nome"
            :rules="[rules.required]"
          />
          <v-text-field
            v-model="createUserStore.textInput.email"
            label="Email"
            :rules="[rules.required, rules.email]"
          />
          <v-text-field
            v-model="createUserStore.textInput.password"
            label="Senha"
            type="password"
            :rules="[rules.required, rules.minLength]"
          />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn :disabled="!isFormValid" @click="validateAndSubmit">Criar</v-btn>
        <v-btn @click="createUserStore.closeModal">Fechar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useCreateUser } from "@/stores/CreateUserModal";

// Store
const createUserStore = useCreateUser();

// Referência ao form do Vuetify
const formRef = ref();
const isFormValid = ref(false);

// Regras de validação
const rules = {
  required: (value: string) => !!value || "Campo obrigatório.",
  email: (value: string) => /\S+@\S+\.\S+/.test(value) || "E-mail inválido.",
  minLength: (value: string) =>
    value.length >= 6 || "A senha deve ter pelo menos 6 caracteres.",
};

// Função para validar e enviar o formulário
const validateAndSubmit = async () => {
  const { valid } = await formRef.value.validate(); // Valida os campos do form
  if (valid) {
    createUserStore.createUser();
  }
};
</script>
