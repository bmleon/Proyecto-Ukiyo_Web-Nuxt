import { defineStore } from 'pinia';

interface User {
  id: number;
  nombre: string;
  email: string;
  rol: string;
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null);
  const token = ref<string | null>(null);

  const isAuthenticated = computed(() => !!token.value);

  // Inicializar el store desde localStorage (para que no se borre al refrescar)
  // Usamos import.meta.client para evitar errores de TypeScript con 'process'
  const initAuth = () => {
    if (import.meta.client) {
      const savedToken = localStorage.getItem('auth_token');
      const savedUser = localStorage.getItem('auth_user');
      if (savedToken && savedUser) {
        token.value = savedToken;
        user.value = JSON.parse(savedUser);
      }
    }
  };

  // Guardar sesión tras login exitoso
  const saveSession = (newUser: User, newToken: string) => {
    user.value = newUser;
    token.value = newToken;
    if (import.meta.client) {
      localStorage.setItem('auth_token', newToken);
      localStorage.setItem('auth_user', JSON.stringify(newUser));
    }
  };

  // Cerrar sesión
  const logout = () => {
    user.value = null;
    token.value = null;
    if (import.meta.client) {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('auth_user');
    }
    // Redirigir al inicio o login
    navigateTo('/login');
  };

  return {
    user,
    token,
    isAuthenticated,
    initAuth,
    saveSession,
    logout
  };
});