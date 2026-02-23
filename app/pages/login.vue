<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '~/stores/auth';

// 1. Definimos la interfaz para que TypeScript sepa qué devuelve el backend
interface AuthResponse {
  token: string;
  user: {
    id: number;
    nombre: string;
    email: string;
    rol: string;
  };
}

const config = useRuntimeConfig();
const authStore = useAuthStore();

const isLogin = ref(true);
const email = ref('');
const password = ref('');
const name = ref('');

// Estados para la interfaz
const isLoading = ref(false);
const errorMessage = ref('');
const successMessage = ref('');

const toggleAuth = () => {
  isLogin.value = !isLogin.value;
  errorMessage.value = '';
  successMessage.value = '';
};

const handleSubmit = async () => {
  isLoading.value = true;
  errorMessage.value = '';
  successMessage.value = '';

  try {
    if (isLogin.value) {
      // --- LÓGICA DE INICIO DE SESIÓN ---
      const response = await $fetch<AuthResponse>(`${config.public.apiBase}/api/login`, {
        method: 'POST',
        body: {
          email: email.value,
          password: password.value
        }
      });

      // Guardamos la sesión en Pinia y LocalStorage
      authStore.saveSession(response.user, response.token);
      
      // Redirección al inicio tras éxito
      await navigateTo('/');

    } else {
      // --- LÓGICA DE REGISTRO ---
      const response = await $fetch<AuthResponse>(`${config.public.apiBase}/api/register`, {
        method: 'POST',
        body: {
          nombre: name.value,
          email: email.value,
          password: password.value
        }
      });

      // Si el backend loguea automáticamente tras registrar:
      if (response.token && response.user) {
        authStore.saveSession(response.user, response.token);
        await navigateTo('/');
      } else {
        successMessage.value = 'Cuenta creada con éxito. Ya puedes iniciar sesión.';
        toggleAuth();
      }
    }
  } catch (error: any) {
    console.error('Error de autenticación:', error);
    // Captura el mensaje de error del backend o muestra uno por defecto
    errorMessage.value = error.data?.message || 'Hubo un error de conexión con el servidor.';
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="min-h-[80vh] flex items-center justify-center px-4 py-12">
    <div class="w-full max-w-md">
      <div class="bg-white dark:bg-ukiyo-nav rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden transition-all duration-500">
        
        <div class="p-8 pb-4 text-center">
          <div class="inline-block mb-4">
            <span class="text-3xl font-black tracking-widest text-gray-900 dark:text-white uppercase">
              UKIYO<span class="text-ukiyo-gold">.</span>
            </span>
          </div>
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white uppercase tracking-tighter">
            {{ isLogin ? 'Bienvenido de nuevo' : 'Crea tu cuenta' }}
          </h2>
          <p class="text-gray-500 dark:text-gray-400 text-sm mt-2 italic">
            {{ isLogin ? 'Introduce tus credenciales para acceder.' : 'Únete al mundo flotante de Ukiyo.' }}
          </p>
        </div>

        <form @submit.prevent="handleSubmit" class="p-8 pt-4 space-y-5">
          
          <Transition
            enter-active-class="transition duration-300 ease-out"
            enter-from-class="transform -translate-y-4 opacity-0"
            enter-to-class="transform translate-y-0 opacity-100"
          >
            <div v-if="!isLogin">
              <label class="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2 ml-1">Nombre Completo</label>
              <input 
                v-model="name"
                type="text" 
                required
                placeholder="Tu nombre"
                class="w-full px-5 py-4 rounded-xl bg-gray-50 dark:bg-gray-800 border border-transparent focus:border-ukiyo-gold focus:bg-white dark:focus:bg-gray-900 text-gray-900 dark:text-white transition-all outline-none"
              />
            </div>
          </Transition>

          <div>
            <label class="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2 ml-1">Email</label>
            <input 
              v-model="email"
              type="email" 
              required
              placeholder="ejemplo@correo.com"
              class="w-full px-5 py-4 rounded-xl bg-gray-50 dark:bg-gray-800 border border-transparent focus:border-ukiyo-gold focus:bg-white dark:focus:bg-gray-900 text-gray-900 dark:text-white transition-all outline-none"
            />
          </div>

          <div>
            <label class="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2 ml-1">Contraseña</label>
            <input 
              v-model="password"
              type="password" 
              required
              placeholder="••••••••"
              class="w-full px-5 py-4 rounded-xl bg-gray-50 dark:bg-gray-800 border border-transparent focus:border-ukiyo-gold focus:bg-white dark:focus:bg-gray-900 text-gray-900 dark:text-white transition-all outline-none"
            />
            <div v-if="isLogin" class="text-right mt-2">
              <a href="#" class="text-[10px] font-bold uppercase tracking-widest text-ukiyo-gold hover:underline">¿Olvidaste tu contraseña?</a>
            </div>
          </div>

          <div v-if="errorMessage" class="p-3 bg-red-50 dark:bg-red-900/20 text-red-500 dark:text-red-400 text-sm rounded-xl font-bold border border-red-100 dark:border-red-800/50 text-center">
            {{ errorMessage }}
          </div>
          
          <div v-if="successMessage" class="p-3 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 text-sm rounded-xl font-bold border border-green-100 dark:border-green-800/50 text-center">
            {{ successMessage }}
          </div>

          <button 
            type="submit"
            :disabled="isLoading"
            :class="isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:scale-[1.02] active:scale-95 shadow-lg shadow-ukiyo-gold/20'"
            class="w-full py-4 bg-ukiyo-gold text-black rounded-xl font-black uppercase tracking-widest text-sm transition-all duration-300 flex items-center justify-center gap-2"
          >
            <span>{{ isLoading ? 'Procesando...' : (isLogin ? 'Iniciar Sesión' : 'Registrarme') }}</span>
            <svg v-if="!isLoading" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
              <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
            </svg>
          </button>

          <div class="relative py-4">
            <div class="absolute inset-0 flex items-center"><div class="w-full border-t border-gray-100 dark:border-gray-800"></div></div>
            <div class="relative flex justify-center text-xs uppercase"><span class="bg-white dark:bg-ukiyo-nav px-4 text-gray-400 font-bold tracking-widest">O</span></div>
          </div>

          <button 
            type="button"
            @click="toggleAuth"
            class="w-full py-4 rounded-xl font-bold uppercase tracking-widest text-xs transition-all duration-300 border border-transparent
                  bg-gray-900 text-white hover:bg-black 
                  dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
          >
            {{ isLogin ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Entra' }}
          </button>
        </form>
      </div>

      <p class="text-center mt-8 text-gray-500 text-[10px] uppercase tracking-widest font-bold">
        Al continuar, aceptas nuestros <a href="#" class="text-ukiyo-gold hover:underline">términos de servicio</a>.
      </p>
    </div>
  </div>
</template>

<style scoped>
/* Transiciones suaves */
.transition-all {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>