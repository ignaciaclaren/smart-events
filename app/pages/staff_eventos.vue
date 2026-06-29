<script setup lang="ts">
import type { Evento } from '~/types/evento'
import type { TableColumn } from '@nuxt/ui'

definePageMeta({ middleware: ['staff'] })

const { data: eventos, refresh } = await useFetch<Evento[]>('/api/eventos')
const mostrarModal = ref(false)

// Estado para el archivo seleccionado en UFileUpload
const files = ref<File[]>([])

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
  Object.entries(form.value).forEach(([key, val]) => {
    if (val !== null) formData.append(key, String(val))
  })
  
  // Acceso directo al primer elemento
  // Muchos componentes de carga no vacían el array, solo cambian el contenido
  const fileToUpload = Array.isArray(files.value) ? files.value[0] : files.value

  if (fileToUpload instanceof File) {
    formData.append('file', fileToUpload)
    console.log("Archivo añadido correctamente:", fileToUpload.name)
  } else {
    console.warn("No se detectó un objeto File válido. Se enviará sin imagen.")
  }

  await $fetch('/api/eventos', {
    method: 'POST',
    body: formData
  })

  mostrarModal.value = false
  files.value = [] // Limpiar para el próximo uso
  refresh()
}

const columns: TableColumn<Evento>[] = [
    { id: 'titulo', accessorKey: 'titulo', header: 'Título' },
    { id: 'fecha', accessorKey: 'fecha', header: 'Fecha' },
    { id: 'lugar', accessorKey: 'lugar', header: 'Lugar' },
    { id: 'valor', accessorKey: 'valor', header: 'Valor' },
    { 
        id: 'imagen', 
        header: 'Imagen',
        cell: ({ row }) => {
            const rutaImagen = row.original.imagen 
            return h('img', { 
                src: rutaImagen, 
                alt: row.original.titulo,
                class: 'w-16 h-16 object-cover rounded' 
            })
        }
    }
]

const tableMeta = createTableMeta<Evento>()
</script>

<template>
    <button @click="mostrarModal = true">Agregar evento</button>

    <div class="p-6">
        <h1 class="text-2xl font-bold mb-4">Gestión de Eventos</h1>
        
        <UTable 
            :data="eventos || []" 
            :columns="columns" 
            :meta="tableMeta"
            class="border rounded-lg" 
        />

        <div v-if="mostrarModal" class="modal">
            <h3>Ingrese los datos</h3>
            <input v-model="form.titulo" type="text" placeholder="titulo">
            <input v-model="form.fecha" type="date" placeholder="fecha">
            <input v-model="form.lugar" type="text" placeholder="lugar">
            <input v-model="form.valor" type="number" placeholder="valor">
            
            <UFileUpload 
              v-model="files" 
              label="Seleccionar imagen"
              accept="image/*"
              :multiple="false"
            />
            
            <button @click="guardarEvento">Guardar</button>
            <button @click="mostrarModal = false">Cancelar</button>
        </div>
    </div>
</template>