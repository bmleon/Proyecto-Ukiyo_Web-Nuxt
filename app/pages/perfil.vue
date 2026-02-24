<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useAuthStore } from '~/stores/auth';

const authStore = useAuthStore();
const API_URL = 'http://ukiyocazorla.es/api';

// Campos del formulario
const username = ref('');
const email = ref(''); // El email suele ser de solo lectura

// Estados de la interfaz
const isLoading = ref(false);
const successMessage = ref('');
const errorMessage = ref('');

// 🛡️ Proteger la ruta: Comprobamos si hay sesión al entrar
onMounted(() => {
  // Inicializamos la sesión por si el usuario recarga la página de golpe
  authStore.initAuth();

  if (!authStore.isAuthenticated) {
    // Si no está logeado, lo mandamos a la página de login
    navigateTo('/login');
  } else {
    // Si está logeado, rellenamos los campos con sus datos actuales
    username.value = authStore.user?.profile?.username || '';
    email.value = authStore.user?.email || '';
  }
});

const updateProfile = async () => {
  isLoading.value = true;
  successMessage.value = '';
  errorMessage.value = '';

  try {
    // Petición al backend de Fabricio para actualizar el perfil (Ruta pluralizada)
    await $fetch(`${API_URL}/perfiles`, {
      method: 'PATCH',
      headers: {
        // ¡LA LLAVE MAESTRA! Enviamos el token para demostrar quiénes somos
        'Authorization': `Bearer ${authStore.token}`
      },
      body: {
        username: username.value
      }
    });

    // Si el servidor dice OK, actualizamos nuestro Store local (para que cambie en el Navbar)
    if (authStore.user && authStore.user.profile) {
      authStore.user.profile.username = username.value;
      // Guardamos en el navegador (protegido para evitar errores en recargas rápidas)
      if (typeof window !== 'undefined') {
        localStorage.setItem('auth_user', JSON.stringify(authStore.user));
      }
    }

    successMessage.value = '¡Perfil actualizado con éxito!';
    
    // Limpiamos el mensaje de éxito después de 3 segundos para que quede limpio
    setTimeout(() => { successMessage.value = ''; }, 3000);

  } catch (error: any) {
    console.error('Error al actualizar perfil:', error);
    errorMessage.value = error.data?.message || 'Error al guardar los cambios. Revisa la conexión.';
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="min-h-screen pt-12 pb-12 px-4 bg-gray-50 dark:bg-ukiyo-dark">
    <div class="max-w-2xl mx-auto">
      
      <div class="bg-white dark:bg-ukiyo-nav p-8 md:p-10 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-800">
        
        <div class="flex items-center gap-6 mb-10 border-b border-gray-100 dark:border-gray-800 pb-8">
          <div class="w-20 h-20 bg-ukiyo-gold rounded-full flex items-center justify-center text-3xl font-black text-black shadow-lg">
            {{ (username || 'U').charAt(0).toUpperCase() }}
          </div>
          <div>
            <h1 class="text-3xl font-black text-gray-900 dark:text-white uppercase tracking-tighter">Mi Perfil</h1>
            <p class="text-gray-500 dark:text-gray-400 text-sm mt-1">Gestiona tu identidad en Ukiyo</p>
          </div>
        </div>

        <form @submit.prevent="updateProfile" class="space-y-6">
          
          <div>
            <label class="block text-xs font-bold uppercase text-gray-400 mb-2">Correo Electrónico</label>
            <input 
              v-model="email" 
              type="email" 
              disabled 
              class="w-full px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-900 border-transparent text-gray-400 cursor-not-allowed transition-all" 
            />
            <p class="text-[10px] text-gray-400 mt-2 italic">* El correo electrónico está vinculado a tu cuenta y no puede modificarse aquí.</p>
          </div>

          <div>
            <label class="block text-xs font-bold uppercase text-gray-400 mb-2">Nombre de Usuario</label>
            <input 
              v-model="username" 
              type="text" 
              required 
              class="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border-transparent focus:ring-2 focus:ring-ukiyo-gold outline-none text-gray-900 dark:text-white transition-all" 
            />
          </div>

          <div v-if="errorMessage" class="text-red-500 text-xs font-bold text-center bg-red-50 dark:bg-red-900/20 p-3 rounded-lg border border-red-100 dark:border-red-800">
            {{ errorMessage }}
          </div>
          
          <div v-if="successMessage" class="text-green-500 text-xs font-bold text-center bg-green-50 dark:bg-green-900/20 p-3 rounded-lg border border-green-100 dark:border-green-800">
            {{ successMessage }}
          </div>

          <div class="pt-6">
            <button 
              type="submit" 
              :disabled="isLoading" 
              class="w-full md:w-auto px-10 py-4 bg-ukiyo-gold text-black font-black uppercase tracking-widest rounded-xl hover:scale-[1.02] transition-all disabled:opacity-50 flex justify-center items-center gap-2"
            >
              <svg v-if="isLoading" class="animate-spin h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>{{ isLoading ? 'Guardando...' : 'Guardar Cambios' }}</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  </div>
</template>