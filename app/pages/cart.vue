<script setup lang="ts">
import { useCartStore } from '~/stores/cart';

const cartStore = useCartStore();

// Funciones para interactuar con el store (Sincronizado con cart.ts)
const removeItem = (index: number) => {
cartStore.remove(index);
};

const clearCart = () => {
cartStore.clear();
};

// Formateo de moneda
const formatPrice = (price: number) => {
return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(price);
};
</script>

<template>
<div class="max-w-4xl mx-auto px-4 py-12">
<!-- Título de la sección -->
<div class="mb-10 text-center">
<h1 class="text-4xl font-black text-gray-900 dark:text-white uppercase tracking-widest">
Tu <span class="text-ukiyo-gold">Pedido</span>
</h1>
<p class="text-gray-500 dark:text-gray-400 mt-2">Revisa tus productos antes de finalizar la compra</p>
</div>

<!-- ESTADO: Carrito Vacío -->
<div v-if="cartStore.count === 0" class="text-center py-20 bg-white dark:bg-ukiyo-nav rounded-3xl border border-dashed border-gray-300 dark:border-gray-700 shadow-sm">
  <div class="text-6xl mb-6 text-gray-300">🍱</div>
  <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Tu cesta está vacía</h2>
  <p class="text-gray-500 mb-8">Parece que aún no has añadido ninguna delicia japonesa.</p>
  <NuxtLink 
    to="/delivery" 
    class="inline-block px-8 py-3 bg-ukiyo-gold text-black font-black uppercase tracking-widest rounded-full hover:scale-105 transition-all shadow-lg shadow-ukiyo-gold/20"
  >
    Explorar Menú
  </NuxtLink>
</div>

<!-- ESTADO: Carrito con Productos -->
<div v-else class="space-y-6">
  <!-- Lista de Productos -->
  <div class="bg-white dark:bg-ukiyo-nav rounded-3xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-800">
    <ul class="divide-y divide-gray-100 dark:divide-gray-800">
      <li 
        v-for="(item, index) in cartStore.items" 
        :key="index"
        class="p-6 flex items-center gap-4 hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"
      >
        <!-- Imagen -->
        <div class="h-20 w-20 flex-shrink-0 bg-gray-100 dark:bg-gray-700 rounded-xl overflow-hidden">
          <img v-if="item.image" :src="item.image" :alt="item.name" class="h-full w-full object-cover" />
          <div v-else class="h-full w-full flex items-center justify-center text-2xl text-gray-400">🥢</div>
        </div>

        <!-- Detalles -->
        <div class="flex-grow">
          <h3 class="font-bold text-gray-900 dark:text-white text-lg">{{ item.name }}</h3>
          <p class="text-ukiyo-gold font-bold">{{ formatPrice(item.price) }}</p>
        </div>

        <!-- Botón Eliminar -->
        <button 
          @click="removeItem(index)"
          class="p-2 text-gray-400 hover:text-red-500 transition-colors"
          title="Eliminar producto"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/>
          </svg>
        </button>
      </li>
    </ul>
  </div>

  <!-- Resumen y Acciones -->
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
    <!-- Botón Vaciar -->
    <button 
      @click="clearCart"
      class="text-sm font-bold text-gray-400 hover:text-red-500 transition-colors flex items-center gap-2 px-4"
    >
      <span>Vaciar todo el pedido</span>
    </button>

    <!-- Total y Checkout -->
    <div class="bg-white dark:bg-ukiyo-nav p-8 rounded-3xl shadow-2xl border-t-4 border-ukiyo-gold">
      <div class="flex justify-between items-center mb-6">
        <span class="text-gray-500 uppercase font-bold tracking-widest text-sm">Total Estimado</span>
        <span class="text-3xl font-black text-gray-900 dark:text-white">{{ formatPrice(cartStore.total) }}</span>
      </div>
      
      <button class="w-full py-4 bg-ukiyo-gold text-black font-black uppercase tracking-widest rounded-2xl shadow-lg hover:-translate-y-1 transition-all mb-4">
        Finalizar Pedido
      </button>
      
      <NuxtLink 
        to="/delivery" 
        class="block text-center text-sm font-bold text-gray-500 hover:text-ukiyo-gold transition-colors"
      >
        ← Continuar comprando
      </NuxtLink>
    </div>
  </div>
</div>
</div>
</template>