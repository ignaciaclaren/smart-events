<script setup lang="ts">
import type { Evento } from '~/types/evento'
    const { data: eventos, pending, error, refresh } = await useFetch<Evento[]>('/api/eventos')
    const eventoSeleccionado = ref<Evento | null>(null);
    const modalAbierto= ref(false)
    const datos = ref({
        nombre: '',
        apellido: '',
        email: ''
    })
    const route = useRoute()
    const navLinks = [
        { label: 'Mis Eventos', to: '/mis_eventos' }
    ]

    function abrirModalInscripcion(evento: Evento) {
        eventoSeleccionado.value = evento
    }

    function cerrarModalInscripccion(){
        eventoSeleccionado.value = null
    }

    async function inscribir(){
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
            alert("inscrito con exito!")
            cerrarModalInscripccion()
            await refresh()
        }catch (err: any) {
            console.error(err)
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
        <div class="w-full bg-neon-blue/10 border-y border-neon-blue/30 py-40 mb-10">
            <div class="mx-auto max-w-6xl px-6">
                 <h1 class="text-center text-5xl font-black text-white uppercase tracking-widest">
                     EVENTOS
                </h1>
             </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mx-auto max-w-6xl p-6">
            
            <div v-for="evento in eventos" 
                class="border border-neon-blue/30 rounded-xl p-6 bg-neon-bg shadow-lg hover:border-neon-blue transition-all">
                
                <h2 class="text-2xl font-bold text-neon-blue mb-6">
                {{evento.titulo}}
                </h2>
                <div class="text-gray-400 space-y-1 mb-4">
                    <p>fecha: {{evento.fecha}} </p>
                    <p>lugar: {{evento.lugar}} </p>
                    <p>inscritos: {{evento.inscritos.length}} </p>
                </div>
                <b class="font-bold text-white">valor:  {{evento.valor}} </b>
                <button @click="abrirModalInscripcion(evento)" 
                    class="mt-8 w-full bg-neon-blue text-neon-bg font-bold px-4 py-2 rounded-lg hover:bg-neon-green transition-colors p-10 mb-6">
                    Inscrbirse
                </button>
            </div>

            <div v-if="eventoSeleccionado" class="modal-overlay">
                <div class="modal-content">
                    <h3>ingresa tus datos : {{ eventoSeleccionado?.titulo }}</h3>
                    <input type='text' v-model="datos.nombre" placeholder="nombre" > 
                    <input type='text' v-model="datos.apellido" placeholder="apellido" > 
                    <input type='text' v-model="datos.email" placeholder="email" > 
                    <button @click="inscribir">Confirmar Inscripción</button>
                    <button @click="eventoSeleccionado = null">Cancelar</button>

                </div>
            </div>
        </div>
    </div>
</template>