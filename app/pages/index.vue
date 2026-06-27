<script setup lang="ts">
import type { Evento } from '~/types/evento'
    const { data: eventos, pending, error, refresh } = await useFetch<Evento[]>('/api/eventos')
    const eventoSeleccionado = ref<Evento | null>(null);
    function abrirModalInscripcion(evento: Evento) {
        eventoSeleccionado.value = evento
    }
</script>
<template>
    <div class="space-y-8">
        <h1> eventos </h1>

        <div v-for="evento in eventos">
            <h2>
              {{evento.titulo}}
            </h2>
            <p>fecha: {{evento.fecha}} </p>
            <p>lugar: {{evento.lugar}} </p>
            <p>inscritos: {{evento.inscritos.length}} </p>
            <b>valor:  {{evento.valor}} </b>
            <button @click="abrirModalInscripcion">
                Inscrbirse
            </button>
        </div>

        <div v-if="eventoSeleccionado" class="modal-overlay">
            <div class="modal-content">
                <h3>Inscribirse a: {{ eventoSeleccionado?.titulo }}</h3>
                <p>¿Estás seguro que deseas inscribirte?</p>
                
                <button @click="eventoSeleccionado = null">Cancelar</button>
                <button>Confirmar Inscripción</button>
            </div>
        </div>
    </div>
</template>