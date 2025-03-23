<template>
    <v-container>
      <v-text-field
        clearable
        :label="label"
        :type="inputType"
        :value="modelValue" 
        variant="outlined"
        @update:modelValue="onInputChange" 
      />
    </v-container>
  </template>
  
  <script setup lang="ts">
  const props = defineProps({
    inputType: { type: String, default: "text" },
    label: String,
    modelValue: String // Recebe o valor via v-model
  });
  
  const emit = defineEmits();
  
  // Função para emitir a atualização do valor
  const onInputChange = (newValue: string) => {
    emit('update:modelValue', newValue);
  };
  </script>
  