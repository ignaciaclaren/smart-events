<script setup lang="ts">
    const email = ref("")
    const listadoEventos = ref<any>()

    async function buscarEventos() {
        const { data, error } = await useFetch('/api/inscrito?email='+email.value)
        if (error){
             useToast().add({
                duration: 5000,
                title: 'Ocurrió un error al consultar los eventos',
                color: 'error'
            })
        }else{
            listadoEventos.value = data.value
        }
        
    }
</script>
<template>
     <header class="border-b border-neon-blue bg-neon-bg">
            <div class="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
                <NuxtLink to = "/" class="text-xl font-black text-neon-blue ">
                    Smart Events
                </NuxtLink>
            </div>
        </header>

    <div class="min-h-screen bg-neon-bg flex flex-col items-center justify-center p-4"> 
    <div class="bg-gray-900/50 border border-neon-blue/30 p-8 rounded-3xl shadow-2xl w-full max-w-lg text-center relative">
        
        <button v-if="listadoEventos" @click="listadoEventos = null" 
                class="absolute -top-3 -right-3 text-gray-400 hover:text-white bg-gray-800 border border-neon-blue/30 rounded-full w-8 h-8 flex items-center justify-center transition-all hover:bg-neon-blue hover:text-black">
            ✕
        </button>
        
        <div class="space-y-4">
            <h3 class="text-white text-lg"> Ingrese su email: </h3>
            <input type="text" v-model="email" placeholder="email" 
            class="w-full bg-neon-bg border border-neon-blue rounded px-3 py-2 text-white">
            
            <div v-if="listadoEventos" class="w-full mt-8">
                <h2 class="text-neon-blue font-bold text-xl mb-4">Tus eventos:</h2>

                <div v-for="evento in listadoEventos" :key="evento.id"
                     class="flex items-start gap-4 bg-gray-800 p-4 border border-neon-blue/20 rounded-xl mb-4 text-white">

                     <img :src="evento.evento?.imagen" alt="Evento" class="w-32 h-24 object-cover rounded-lg">
                     <div class="flex flex-col items-start text-left">
                        <h3 class="text-lg font-bold text-white">{{ evento.evento?.titulo }}</h3>
                        <p class="font-bold"> Fecha:    {{ formatDate(evento.evento?.fecha)}}</p>
                        <p class="font-bold"> Lugar:    {{ evento?.evento?.lugar }}</p>
                        <p class="font-bold mt-2"> Valor:    {{ evento?.evento?.valor }}</p>
                    </div>
                </div>                              
            </div>
            
            <button @click="buscarEventos"
                class="w-full bg-neon-blue text-black font-bold py-3 rounded-xl hover:opacity-80 transition-all hover:scale-[1.02]">
                buscar
            </button>
        </div>
    </div>
</div>
</template>