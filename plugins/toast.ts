import Vue3Toastify, {
  toast,
  type Content,
  type ToastContainerOptions,
} from "vue3-toastify";
import "vue3-toastify/dist/index.css";

export default defineNuxtPlugin(({ vueApp }) => {
  vueApp.use(Vue3Toastify, {
    autoClose: 2000,
  } as ToastContainerOptions);

  // Criando uma função personalizada para erro
  const showErrorToast = (message: Content) => {
    toast(message, {
      type: "error",
      position: "bottom-right",
      theme: "light",
    });
  };

  return {
    provide: {
      toast,
      showErrorToast, // Adicionando função personalizada
    },
  };
});
