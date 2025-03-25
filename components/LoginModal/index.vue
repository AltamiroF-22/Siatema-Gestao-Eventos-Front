<template>
  <v-dialog v-model="loginModal.isModalOpen" max-width="500px">
    <v-card>
      <v-card-title>Login</v-card-title>
      <v-card-text>
        <v-form ref="formRef" v-model="isFormValid">
          <v-text-field
            v-model="loginModal.textInput.email"
            label="Email"
            :rules="[rules.required, rules.email]"
          />
          <v-text-field
            v-model="loginModal.textInput.password"
            label="Senha"
            type="password"
            :rules="[rules.required, rules.minLength]"
          />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn :disabled="!isFormValid" @click="validateAndSubmit">logar</v-btn>
        <v-btn @click="loginModal.closeModal">Fechar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useLoginModal } from "@/stores/LoginModal";

// Store
const loginModal = useLoginModal();

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
    loginModal.login();
  }
};
</script>
