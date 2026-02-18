<script setup lang="ts">
// SEO: Configuración de metadatos para la página de contacto
useHead({
  title: 'Contacto | Ukiyo Cazorla',
  meta: [
    { name: 'description', content: 'Contacta con Ukiyo en Cazorla. Encuentra nuestra ubicación, teléfono y envíanos tus dudas sobre nuestra cocina japonesa, alérgenos o pedidos especiales.' }
  ]
})

// Datos del formulario reactivos (ref se auto-importa en Nuxt)
const form = ref({
  name: '',
  email: '',
  message: ''
});

const isSubmitting = ref(false);
const showSuccess = ref(false);

// Función de envío simulada
const submitForm = () => {
  isSubmitting.value = true;
  // Simulación de proceso (Aquí podrías usar un server/api en el futuro)
  setTimeout(() => {
    isSubmitting.value = false;
    showSuccess.value = true;
    
    // Resetear formulario
    form.value = { name: '', email: '', message: '' };
    
    // Ocultar mensaje de éxito tras 5 segundos
    setTimeout(() => showSuccess.value = false, 5000);
  }, 1500);
};
</script>

<template>
  <div class="pb-20">
    
    <!-- 1. CABECERA HERO (SOBRE NOSOTROS / ESENCIA) -->
    <div class="relative bg-white dark:bg-ukiyo-nav py-20 border-b border-gray-200 dark:border-gray-800 overflow-hidden">
      <!-- Decoración de fondo (Logo sutil) -->
      <div class="absolute top-0 right-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none transform translate-x-1/3 -translate-y-1/4">
         <svg viewBox="0 0 24 24" fill="currentColor" class="w-[600px] h-[600px] text-ukiyo-gold">
            <path d="M12 2L2 22h20L12 2zm0 3l7.5 15h-15L12 5z"/>
         </svg>
      </div>

      <div class="max-w-4xl mx-auto px-4 text-center relative z-10">
        <h1 class="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6 uppercase tracking-widest">
          Nuestra <span class="text-ukiyo-gold">Esencia</span>
        </h1>
        
        <div class="bg-gray-50 dark:bg-gray-800/50 p-8 md:p-10 rounded-2xl border-l-4 border-ukiyo-gold shadow-sm">
          <p class="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed font-light italic">
            "Ukiyo nace con la intención de introducir la cocina japonesa en Cazorla, adaptada al formato de comida para llevar. Su propuesta se centra en ofrecer un producto fresco, saludable y estéticamente cuidado, que combine tradición y modernidad."
          </p>
        </div>
      </div>
    </div>

    <!-- 2. SECCIÓN DE CONTACTO (GRID) -->
    <div class="max-w-7xl mx-auto px-4 mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
      
      <!-- COLUMNA IZQUIERDA: INFORMACIÓN Y TARJETAS -->
      <div class="space-y-8">
        <div class="text-left">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4 uppercase tracking-tight">Hablemos</h2>
          <p class="text-gray-600 dark:text-gray-400">
            ¿Tienes alguna duda sobre alérgenos? ¿Quieres organizar un catering grande o un pedido personalizado? Estamos aquí para escucharte.
          </p>
        </div>

        <!-- Tarjetas de Info -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- Teléfono -->
          <a href="tel:+34643925344" class="group bg-white dark:bg-ukiyo-nav p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 hover:border-ukiyo-gold transition-all flex flex-col items-center text-center">
            <div class="w-12 h-12 bg-ukiyo-gold/10 text-ukiyo-gold rounded-full flex items-center justify-center text-2xl mb-3 group-hover:bg-ukiyo-gold group-hover:text-black transition-colors">📞</div>
            <h3 class="font-bold text-gray-900 dark:text-white mb-1">Llámanos</h3>
            <p class="text-sm text-gray-500 dark:text-gray-400 group-hover:text-ukiyo-gold transition-colors">643 925 344</p>
          </a>

          <!-- Email -->
          <a href="mailto:ukiyocazorla@gmail.com" class="group bg-white dark:bg-ukiyo-nav p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 hover:border-ukiyo-gold transition-all flex flex-col items-center text-center">
            <div class="w-12 h-12 bg-ukiyo-gold/10 text-ukiyo-gold rounded-full flex items-center justify-center text-2xl mb-3 group-hover:bg-ukiyo-gold group-hover:text-black transition-colors">✉️</div>
            <h3 class="font-bold text-gray-900 dark:text-white mb-1">Escríbenos</h3>
            <p class="text-sm text-gray-500 dark:text-gray-400 group-hover:text-ukiyo-gold transition-colors break-all">ukiyocazorla@gmail.com</p>
          </a>

          <!-- Dirección -->
          <a 
            href="https://maps.app.goo.gl/LTXhmi2PPp6LECdE8" 
            target="_blank"
            rel="noopener noreferrer"
            class="md:col-span-2 group bg-white dark:bg-ukiyo-nav p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 hover:border-ukiyo-gold transition-all flex flex-col items-center text-center"
          >
            <div class="w-12 h-12 bg-ukiyo-gold/10 text-ukiyo-gold rounded-full flex items-center justify-center text-2xl mb-3 group-hover:bg-ukiyo-gold group-hover:text-black transition-colors">📍</div>
            <h3 class="font-bold text-gray-900 dark:text-white mb-1 group-hover:text-ukiyo-gold transition-colors">Visítanos</h3>
            <p class="text-sm text-gray-500 dark:text-gray-400">Pl. Corredera, 15, 23470 Cazorla, Jaén</p>
            <span class="text-xs text-ukiyo-gold mt-2 opacity-0 group-hover:opacity-100 transition-opacity font-bold">Abrir en Google Maps →</span>
          </a>
        </div>
      </div>

      <!-- COLUMNA DERECHA: FORMULARIO -->
      <div class="bg-white dark:bg-ukiyo-nav p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800">
        <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 border-b-2 border-ukiyo-gold inline-block pb-1 uppercase tracking-tighter">Envíanos un mensaje</h3>
        
        <form @submit.prevent="submitForm" class="space-y-6">
          
          <!-- Nombre -->
          <div>
            <label class="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-tighter">Nombre completo</label>
            <input 
              v-model="form.name"
              type="text" 
              required
              class="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-ukiyo-gold focus:border-transparent transition-all outline-none"
              placeholder="Tu nombre"
            >
          </div>

          <!-- Email -->
          <div>
            <label class="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-tighter">Correo electrónico</label>
            <input 
              v-model="form.email"
              type="email" 
              required
              class="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-ukiyo-gold focus:border-transparent transition-all outline-none"
              placeholder="tu@email.com"
            >
          </div>

          <!-- Mensaje -->
          <div>
            <label class="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-tighter">Mensaje</label>
            <textarea 
              v-model="form.message"
              rows="4" 
              required
              class="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-ukiyo-gold focus:border-transparent transition-all outline-none resize-none"
              placeholder="¿En qué podemos ayudarte?"
            ></textarea>
          </div>

          <!-- Botón Enviar -->
          <button 
            type="submit" 
            :disabled="isSubmitting"
            class="w-full py-4 bg-ukiyo-gold text-black font-black uppercase tracking-widest rounded-lg hover:shadow-lg hover:-translate-y-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
          >
            <span v-if="isSubmitting">Enviando...</span>
            <span v-else>Enviar Mensaje</span>
            <svg v-if="!isSubmitting" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" /></svg>
          </button>

          <!-- Feedback de Éxito -->
          <div v-if="showSuccess" class="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 p-4 rounded-lg text-center text-sm font-bold animate-pulse">
            ¡Mensaje enviado correctamente! Te responderemos muy pronto.
          </div>

        </form>
      </div>

    </div>
  </div>
</template>