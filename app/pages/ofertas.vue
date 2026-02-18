<script setup lang="ts">
// SEO: Configuración de metadatos para la página de ofertas
useHead({
  title: 'Ofertas Especiales | Ukiyo Cazorla',
  meta: [
    { name: 'description', content: 'Descubre las mejores ofertas y promociones de Ukiyo en Cazorla. Packs de sushi, descuentos exclusivos y experiencias gastronómicas al mejor precio.' }
  ]
})
</script>

<template>
  <div class="pb-20">
    
    <!-- 1. CABECERA -->
    <div class="pt-16 pb-10 text-center px-4">
      <h1 class="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-2 uppercase tracking-widest">
        Ofertas <span class="text-ukiyo-gold">Especiales</span>
      </h1>
      <p class="text-gray-600 dark:text-gray-400 text-sm md:text-base max-w-2xl mx-auto uppercase tracking-tighter">
        Mantente atento a nuestras próximas promociones exclusivas.
      </p>
    </div>

    <!-- 2. CONTENIDO (ESTADO VACÍO) -->
    <div class="flex flex-col items-center justify-center py-20 text-center px-4">
      <!-- Icono animado -->
      <div class="w-24 h-24 bg-gray-200 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6 text-4xl animate-pulse shadow-inner border border-gray-300 dark:border-gray-700">
        🎁
      </div>
      
      <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-3 uppercase tracking-tight">No hay ofertas activas</h3>
      <p class="text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-8 leading-relaxed">
        Estamos preparando nuevas experiencias gastronómicas y packs especiales para ti. Vuelve pronto para descubrir nuestras sorpresas.
      </p>
      
      <!-- Enlace a la carta -->
      <NuxtLink 
        to="/delivery" 
        class="px-10 py-4 bg-ukiyo-gold text-black font-black uppercase tracking-widest rounded-full hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border-2 border-ukiyo-gold"
      >
        Ver Carta Habitual
      </NuxtLink>
    </div>

    <!-- 3. SECCIÓN INFORMATIVA ADICIONAL (Opcional para dar peso a la página) -->
    <div class="max-w-4xl mx-auto px-4 mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="p-6 bg-white dark:bg-ukiyo-nav rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
            <h4 class="text-ukiyo-gold font-bold mb-2 uppercase text-sm">¿Quieres ser el primero?</h4>
            <p class="text-sm text-gray-500 dark:text-gray-400">Síguenos en nuestras redes sociales para enterarte antes que nadie de los cupones descuento y platos de edición limitada.</p>
        </div>
        <div class="p-6 bg-white dark:bg-ukiyo-nav rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
            <h4 class="text-ukiyo-gold font-bold mb-2 uppercase text-sm">Packs para Grupos</h4>
            <p class="text-sm text-gray-500 dark:text-gray-400">Si estás planeando una cena con amigos, contacta con nosotros para diseñar un menú degustación a medida con precio cerrado.</p>
        </div>
    </div>

  </div>
</template>