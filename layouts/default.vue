<template>
  <v-app>
    <!-- Barra de navegação -->
    <v-app-bar app class="navbar">
      <!-- Título do app (lado esquerdo) -->
      <v-toolbar-title class="cursor-pointer transition hover:opacity-80" @click="goToPage('/')">
        Eventizie
      </v-toolbar-title>

      <!-- Menu Hamburguer -->
      <v-spacer></v-spacer>
      <v-btn text v-if="!loginModal.token" @click="createUserStore.openModal">Criar Usuário</v-btn>
      <v-btn text v-if="!loginModal.token" @click="loginModal.openModal">Logar</v-btn>
      <v-btn icon @click="drawer = !drawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </v-app-bar>

    <!-- Drawer (Menu lateral) -->
    <v-navigation-drawer v-model="drawer" app temporary>
      <v-list>
        <v-list-item
          v-for="item in menuItems"
          :key="item.path"
          @click="goToPage(item.path)"
          :class="{ 'border-left-active': route.path === item.path }"
        >
          <v-list-item-content>
            <v-list-item-title>{{ item.label }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="createEventModal.openModal">
          <v-list-item-title>Criar Evento</v-list-item-title>
        </v-list-item>

        <v-divider></v-divider>

        <v-list-item v-if="loginModal.token" @click="loginModal.logout">
          <v-list-item-content>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- Conteúdo da página -->
    <v-main>
      <slot></slot>
    </v-main>

    <!-- Rodapé -->
    <v-footer>
      <v-spacer></v-spacer>
      <v-row>
        <v-col cols="12" sm="6" class="text-center">
          <span>&copy; 2025 Sistema de Gestão de Eventos - Todos os direitos reservados</span>
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useLoginModal } from "@/stores/LoginModal";
import { useCreateUser } from "@/stores/CreateUserModal";
import { useCreateEventModal } from "@/stores/CreateEventModal";

// Store
const createUserStore = useCreateUser();
const loginModal = useLoginModal();
const createEventModal = useCreateEventModal();

// Router
const router = useRouter();
const route = useRoute(); // Pega a URL atual

const goToPage = (page: string) => {
  router.push(page);
};

const drawer = ref(false);

// Itens do menu
const menuItems = [
  { label: "Home", path: "/" },
  { label: "Minhas inscrições", path: "/minhas-inscricoes" },
  { label: "Meus eventos", path: "/meus-eventos" },
];
</script>

<style scoped>
/* Estilo para destacar a rota ativa */
.border-left-active {
  border-left: 3px solid #1976d2; /* Azul padrão do Vuetify */
  background-color: rgba(25, 118, 210, 0.1); /* Azul claro para destaque */
}
.navbar{
  box-shadow: none !important;
  border-bottom: solid #ccc 1px;
}
</style>
