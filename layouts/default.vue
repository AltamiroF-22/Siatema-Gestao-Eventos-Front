<template>
  <v-app>
    <!-- Barra de navegação -->
    <v-app-bar app class="navbar">
      <!-- Título do app (lado esquerdo) -->
      <v-toolbar-title>Eventizie</v-toolbar-title>

      <!-- Menu Hamburguer -->
      <v-spacer></v-spacer>
      <v-btn text v-if="!loginModal.token" @click="createUserStore.openModal"
        >Criar Usuário</v-btn
      >
      <v-btn text v-if="!loginModal.token" @click="loginModal.openModal"
        >Logar</v-btn
      >
      <v-btn icon @click="drawer = !drawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </v-app-bar>

    <!-- Drawer (Menu lateral) -->
    <v-navigation-drawer v-model="drawer" app temporary>
      <v-list>
        <v-list-item @click="goToPage('home')">
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="goToPage('profile')">
          <v-list-item-content>
            <v-list-item-title>Profile</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="goToPage('settings')">
          <v-list-item-content>
            <v-list-item-title>Settings</v-list-item-title>
          </v-list-item-content>
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
    <v-footer app>
      <v-spacer></v-spacer>
      <v-row>
        <v-col cols="12" sm="6" class="text-center">
          <span
            >&copy; 2025 Sistema de Gestão de Eventos - Todos os direitos
            reservados</span
          >
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

import { useLoginModal } from "@/stores/LoginModal";
import { useCreateUser } from "@/stores/CreateUserModal";

// Store
const createUserStore = useCreateUser();
const loginModal = useLoginModal();

// Função para navegar entre páginas
const router = useRouter();
const goToPage = (page: string) => {
  router.push(`/${page}`);
};

const drawer = ref(false);
</script>

<style scoped>
.v-app-bar {
  box-shadow: 1px 0px 2px #ccc !important;
}

/* Estilo customizado para o título da barra de navegação */
.v-toolbar-title {
  font-size: 24px;
  font-weight: bold;
}

/* Estilo para o conteúdo do app */
v-main {
  padding-top: 30px;
}

/* Estilo do footer */
.v-footer {
  background-color: #f5f5f5;
  padding: 10px 0;
}

/* Estilo do texto no footer */
.v-footer span {
  font-size: 14px;
  color: #555;
}
</style>
