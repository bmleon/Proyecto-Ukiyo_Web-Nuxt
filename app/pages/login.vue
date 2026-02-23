<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '~/stores/auth';

// Interfaz para la respuesta del servidor según el estándar de NestJS
interface AuthResponse {
  access_token: string;
  user: {
    id: number;
    nombre: string;
    email: string;
    rol: string;
  };
}

const authStore = useAuthStore();

const isLogin = ref(true);
const identificador = ref(''); 
const password = ref('');
const name = ref('');

const isLoading = ref(false);
const errorMessage = ref('');
const successMessage = ref('');

// URL base que te ha pasado tu compañero
const API_URL = 'http://ukiyocazorla.es/api';

const toggleAuth = () => {
  isLogin.value = !isLogin.value;
  errorMessage.value = '';
  successMessage.value = '';
};

const handleSubmit = async () => {
  isLoading.value = true;
  errorMessage.value = '';

  try {
    if (isLogin.value) {
      // --- INTENTO DE LOGIN ---
      const response = await $fetch<AuthResponse>(`${API_URL}/login`, {
        method: 'POST',
        body: {
          // Asegúrate con Fabricio si el campo es 'username' o 'email'
          username: identificador.value, 
          password: password.value
        }
      });

      // Si el servidor responde con el token, guardamos sesión
      if (response.access_token) {
        authStore.saveSession(response.user, response.access_token);
        await navigateTo('/');
      }

    } else {
      // --- INTENTO DE REGISTRO ---
      await $fetch(`${API_URL}/registro`, {
        method: 'POST',
        body: {
          nombre: name.value,
          email: identificador.value,
          password: password.value
        }
      });
      
      successMessage.value = '¡Cuenta creada! Ya puedes iniciar sesión.';
      isLogin.value = true;
    }
  } catch (error: any) {
    console.error('Error:', error);
    // Si el error es de CORS, aquí te seguirá saliendo "Failed to fetch"
    errorMessage.value = error.data?.message || 'Error de conexión. Revisa los CORS en el servidor.';
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="min-h-screen flex items-center justify-center px-4 bg-gray-50 dark:bg-ukiyo-dark">
    <div class="max-w-md w-full">
      <div class="bg-white dark:bg-ukiyo-nav p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-800">
        
        <div class="text-center mb-8">
          <h2 class="text-3xl font-black text-gray-900 dark:text-white uppercase tracking-tighter">
            {{ isLogin ? 'Identifícate' : 'Registro' }}
          </h2>
          <p class="text-gray-500 dark:text-gray-400 text-sm mt-2 italic">Ukiyo Cazorla</p>
        </div>

        <form @submit.prevent="handleSubmit" class="space-y-5">
          <div v-if="!isLogin">
            <label class="block text-xs font-bold uppercase text-gray-400 mb-2">Nombre</label>
            <input v-model="name" type="text" required class="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border-transparent focus:ring-2 focus:ring-ukiyo-gold outline-none text-gray-900 dark:text-white transition-all">
          </div>

          <div>
            <label class="block text-xs font-bold uppercase text-gray-400 mb-2">Usuario / Email</label>
            <input v-model="identificador" type="text" required class="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border-transparent focus:ring-2 focus:ring-ukiyo-gold outline-none text-gray-900 dark:text-white transition-all">
          </div>

          <div>
            <label class="block text-xs font-bold uppercase text-gray-400 mb-2">Contraseña</label>
            <input v-model="password" type="password" required class="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border-transparent focus:ring-2 focus:ring-ukiyo-gold outline-none text-gray-900 dark:text-white transition-all">
          </div>

          <div v-if="errorMessage" class="text-red-500 text-xs font-bold text-center bg-red-50 dark:bg-red-900/20 p-3 rounded-lg border border-red-100 dark:border-red-800">
            {{ errorMessage }}
          </div>

          <button type="submit" :disabled="isLoading" class="w-full py-4 bg-ukiyo-gold text-black font-black uppercase tracking-widest rounded-xl hover:scale-[1.02] transition-all disabled:opacity-50">
            {{ isLoading ? 'Cargando...' : (isLogin ? 'Entrar' : 'Crear Cuenta') }}
          </button>

          <button type="button" @click="toggleAuth" class="w-full text-xs font-bold text-gray-500 uppercase tracking-widest mt-4">
            {{ isLogin ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Inicia sesión' }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>