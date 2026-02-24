import { defineStore } from 'pinia';

// 1. Definimos las nuevas interfaces según el modelo de Fabricio
export interface UserProfile {
  id: number;
  username: string;
  avatarUrl?: string;
}

export interface User {
  id: number;
  email: string;
  profile?: UserProfile;
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
    token: null as string | null,
    isAuthenticated: false,
  }),
  actions: {
    saveSession(userData: User, token: string) {
      this.user = userData;
      this.token = token;
      this.isAuthenticated = true;
      
      // Guardamos en el navegador para no perder la sesión al recargar
      localStorage.setItem('auth_token', token);
      localStorage.setItem('auth_user', JSON.stringify(userData));
    },
    initAuth() {
      const token = localStorage.getItem('auth_token');
      const user = localStorage.getItem('auth_user');
      if (token && user) {
        this.token = token;
        this.user = JSON.parse(user);
        this.isAuthenticated = true;
      }
    },
    logout() {
      this.user = null;
      this.token = null;
      this.isAuthenticated = false;
      localStorage.removeItem('auth_token');
      localStorage.removeItem('auth_user');
    }
  }
});