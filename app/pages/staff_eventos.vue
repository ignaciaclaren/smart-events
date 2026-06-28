<script setup lang="ts">
import type { Evento } from '~/types/evento'

definePageMeta({ middleware: ['staff'] })

const { data: eventos, refresh } = await useFetch<Evento[]>('/api/eventos')
const mostrarModal = ref(false)
const fileInput = ref<HTMLInputElement | null>(null)

// Objeto para el formulario
const form = ref({
  titulo: '',
  fecha: '',
  lugar: '',
  valor: null
})

async function guardarEvento() {
  const formData = new FormData()
  
  // Agregar campos de texto
  Object.entries(form.value).forEach(([key, val]) => formData.append(key, val))
  
  // Agregar archivo
  if (fileInput.value?.files?.[0]) {
    formData.append('file', fileInput.value.files[0])
  }

  await $fetch('/api/eventos', {
    method: 'POST',
    body: formData
  })

  mostrarModal.value = false
  refresh() // Actualiza la tabla automáticamente
}
</script>

<template>
  <button @click="mostrarModal = true">Agregar evento</button>

  <UTable :data="eventos || []" class="flex-1" />

  <div v-if="mostrarModal" class="modal">
    <h3>Ingrese los datos</h3>
    <input v-model="form.titulo" type="text" placeholder="titulo">
    <input v-model="form.fecha" type="date" placeholder="fecha">
    <input v-model="form.lugar" type="text" placeholder="lugar">
    <input v-model="form.valor" type="number" placeholder="valor">
    <input type="file" ref="fileInput">
    
    <button @click="guardarEvento">Guardar</button>
    <button @click="mostrarModal = false">Cancelar</button>
  </div>
</template>