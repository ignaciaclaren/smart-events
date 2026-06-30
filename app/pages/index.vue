<script setup lang="ts">
import type { Evento } from '~/types/evento'
    const { data: eventos,  error, refresh } = await useFetch<Evento[]>('/api/eventos')
    const eventoSeleccionado = ref<Evento | null>(null);
    const datos = ref({
        nombre: '',
        apellido: '',
        email: ''
    })

    function abrirModalInscripcion(evento: Evento) {
        eventoSeleccionado.value = evento
    }

    function cerrarModalInscripccion(){
        eventoSeleccionado.value = null
    }

    async function inscribir(){
        if(!datos.value.email || !datos.value.nombre || !datos.value.apellido){
            useToast().add({
                duration: 5000,
                title: 'Todos los datos son obligatorio',
                color: 'error'
            })
            return;
        }
        try {
            await $fetch('/api/inscrito', {
                method: 'POST',
                body: {
                    email: datos.value.email,
                    nombre: datos.value.nombre,
                    apellido: datos.value.apellido,
                    eventoId: eventoSeleccionado.value?.id, 
                }
            })
            useToast().add({
                duration: 5000,
                title: 'Inscrito con éxito!',
                color: 'primary'
            })
            cerrarModalInscripccion()
            await refresh()
        }catch (err: any) {
            useToast().add({
                duration: 5000,
                title: 'Error al inscribir',
                color: 'error'
            })
        }
    }
</script>
<template>
    <div class="min-h-screen bg-neon-bg text-gray-200">
        
        <header class="border-b border-neon-blue bg-neon-bg">
            <div class="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
                <NuxtLink to = "/" class="text-xl font-black text-neon-blue ">
                    Smart Events
                </NuxtLink>

                <nav>
                    <NuxtLink to="/mis_eventos" class="rounded-lg px-4 py-2 text-sm font-bold text-neon-blue transition-all duration-400 hover:bg-neon-blue hover:text-neon-bg">
                        Mis Eventos
                    </NuxtLink>
                    <NuxtLink to="/login" class="rounded-lg px-4 py-2 text-sm font-bold text-neon-green border border-neon-green hover:bg-neon-green hover:text-neon-bg transition-all">
                        Staff
                    </NuxtLink>
                </nav>
            </div>
        </header>

        <div class="min-h-screen bg-cover bg-center bg-fixed" 
            style="background-image: url('/uploads/fondoEvento.jpg');"> 
            
            <div class="min-h-screen bg-black/70 p-6">
                <h1 class="text-white text-center text-5xl font-black py-10">EVENTOS</h1>   
                <div v-if="error" class="grid grid-cols-1 md:grid-cols-3 gap-6 mx-auto max-w-6xl p-6">
                    Ocurrió un error al cargar los eventos, por favor inténtalo más tarde
                </div>
                <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-6 mx-auto max-w-6xl p-6">
                    
                    <div v-for="evento in eventos" 
                        class="border border-neon-blue/30 rounded-xl p-4 bg-neon-bg shadow-lg hover:border-neon-blue transition-all">
                        <div class="w-full h-40 bg-gray-800">
                            <img :src="evento.imagen" :alt="evento.titulo" 
                                class="w-full h-full object-cover">
                        </div>
                        <h2 class="text-2xl font-bold text-neon-blue mb-6 mt-4">
                        {{evento.titulo}}
                        </h2>
                        <div class="text-gray-400 space-y-1 mb-4">
                            <p>fecha: {{formatDate(evento.fecha.toString())}} </p>
                            <p>lugar: {{evento.lugar}} </p>
                            <p>inscritos: {{evento.inscritos.length}} </p>
                        </div>
                        <b class="font-bold text-white">valor:  {{evento.valor}} </b>
                        <button @click="abrirModalInscripcion(evento)" 
                            class="mt-3 w-full bg-neon-blue text-neon-bg font-bold px-4 py-2 rounded-lg hover:bg-neon-green transition-colors p-10 mb-6">
                            Inscribirse
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="eventoSeleccionado" class="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
                <div class="bg-neon-bg border border-neon-blue p-12 rounded-2xl w-full max-w-md">
                    <h3 class="text-2xl font-bold text-white text-center mb-2">ingresa tus datos : </h3>
                    <p class="text-neon-blue text-center mb-6 font-medium"> {{ eventoSeleccionado?.titulo }} </p>

                    <div class="flex flex-col space-y-4">
                        <input type='text' v-model="datos.nombre" placeholder="nombre" 
                            class="w-full bg-black border border-blue-500 rounded-lg p-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"> 
                        <input type='text' v-model="datos.apellido" placeholder="apellido" 
                            class="w-full bg-black border border-blue-500 rounded-lg p-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring:blue-500"> 
                        <input type='text' v-model="datos.email" placeholder="email" 
                            class="w-full bg-black border border-blue-500 rounded-lg p-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring:blue-500"> 
                        
                        <div class="mt-8 flex flex-col space-y-2">   
                            <button @click="inscribir" class="w-full bg-blue-500 hover:bg-blue-900 text-white font-bold py-3 rounded-lg transition duration-300">
                                Confirmar Inscripción</button>
                            <button @click="eventoSeleccionado = null" class="w-full bg-gray-900 hover:bg-black border border-blue-900 text-white font-bold py-3 rounded-lg transition duration-500">
                                Cancelar</button>                                                                        
                        </div> 
                    </div>
                </div>
        </div>
    </div>
</template>