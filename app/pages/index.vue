<script setup lang="ts">
import type { Evento } from '~/types/evento'
    const { data: eventos, pending, error, refresh } = await useFetch<Evento[]>('/api/eventos')
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
    <div class="space-y-8">
        <h1> eventos </h1>
        {{ datos }}
        <div v-for="evento in eventos">
            <h2>
              {{evento.titulo}}
            </h2>
            <p>fecha: {{evento.fecha}} </p>
            <p>lugar: {{evento.lugar}} </p>
            <p>inscritos: {{evento.inscritos.length}} </p>
            <b>valor:  {{evento.valor}} </b>
            <button @click="abrirModalInscripcion(evento)">
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
</template>