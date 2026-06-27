<script setup lang="ts">
import type { Evento } from '~/types/evento'
    const { data: eventos, pending, error, refresh } = await useFetch<Evento[]>('/api/eventos')

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
            <b>valor:  {{evento.valor}} </b>
        </div>
    </div>
</template>