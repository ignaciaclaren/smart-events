<script setup lang="ts">
import type { Evento } from '~/types/evento'
import type { TableColumn } from '@nuxt/ui'

definePageMeta({ middleware: ['staff'] })

const { data: eventos, refresh, error } = await useFetch<Evento[]>('/api/eventos')
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

function limpiarForm(){
  form.value.titulo = ''
  form.value.fecha = ''
  form.value.lugar = ''
  form.value.valor = null
}

const eventoSeleccionado = ref<Evento | null>(null)

async function guardarEvento() {

  if (!form.value.fecha || !form.value.titulo || !form.value.lugar || !form.value.valor){
    useToast().add({
         duration: 5000,
         title: 'Deebe llenar todos los datos',
         color: 'error'
      })
      return;
  }
  
  const formData = new FormData()
  
  // Agregar campos de texto
  Object.entries(form.value).forEach(([key, val]) => {
    if (val !== null) formData.append(key, String(val))
  })
  const fileToUpload = Array.isArray(files.value) ? files.value[0] : files.value

  if (fileToUpload instanceof File) {
    formData.append('file', fileToUpload)
  } else {
    console.warn("No se detectó un objeto File válido. Se enviará sin imagen.")
  }

  try {
    await $fetch('/api/eventos', {
      method: 'POST',
      body: formData
    })
    useToast().add({
      duration: 5000,
      title: 'Evento creado con éxito',
      color: 'primary'
    })
    limpiarForm()
  }catch{
     useToast().add({
         duration: 5000,
         title: 'Error al guardar el evento',
         color: 'error'
      })
  }
  

  mostrarModal.value = false
  files.value = [] 
  refresh()
}

const columns: TableColumn<Evento>[] = [
    { id: 'titulo', accessorKey: 'titulo', header: 'Título' },
    { 
        id: 'fecha', 
        accessorKey: 'fecha', 
        header: 'Fecha',
        cell: ({ row }) => {
            const fechaOriginal = row.original.fecha;
            return formatDate(fechaOriginal.toString());
        }
    },
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

function abrirModalEvento(e: any, row: any){
   eventoSeleccionado.value = row.original
}

async function desinscribir(id: number) {
  try{
      await $fetch("/api/inscrito/" + id, {
        method: 'DELETE'
      })
      await refresh()
      eventoSeleccionado.value = null
  }catch(err){
    useToast().add({
         duration: 5000,
         title: 'Error al desinscribir',
         color: 'error'
      })
  }
}

async function eliminarEvento(id: number) {
  try{
    await $fetch("/api/eventos/" + id,{
      method: 'DELETE'
    })
    await refresh()
    eventoSeleccionado.value = null
  }catch(err){
    useToast().add({
         duration: 5000,
         title: 'Error al eliminar el evento',
         color: 'error'
      })
  }
  
}
const imagenEvento = computed(() => {
  return eventoSeleccionado.value?.imagen || '/uploads/defecto.jpeg'
})

const tableMeta = createTableMeta<Evento>()

</script>

<template>
  <header class="border-b border-neon-blue bg-neon-bg">
    <div class="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
      <NuxtLink to = "/" class="text-xl font-black text-neon-blue ">
        Smart Events
      </NuxtLink>
     <nav>
      <NuxtLink to="/staff" class="rounded-lg px-4 py-2 text-sm font-bold text-neon-green border border-neon-green hover:bg-neon-green hover:text-neon-bg transition-all">
        Staff
       </NuxtLink>
     </nav> 
    </div>
  </header>

  <div class="flex justify-end max-w-6xl mx-auto px-6 mt-4 mb-4">
  <button @click="mostrarModal = true" class="bg-neon-blue text-black font-bold px-6 py-2 rounded-lg border border-neon-blue hover:bg-transparent hover:text-neon-blue transition-all duration-300">
    Agregar evento</button>
  </div>
    <div>
      <div class="p-6">
          <h1 class="text-2xl font-bold mb-4">Gestión de Eventos</h1>
          <h1 v-if="error">Ocurrio un error al cargar los eventos</h1>
          <UTable v-else
              :data="eventos || []" 
              :columns="columns" 
              :meta="tableMeta"
              class="border rounded-lg" 
              @select="abrirModalEvento"/>

          <div v-if="mostrarModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"s>
            <div class="bg-neon-bg border border-neon-blue p-8 rounded-2xl w-full max-w-lg shadow-2xl text-white">
              <h3 class="text-2xl font-bold text-neon-blue mb-6"> Agregar un nuevo evento </h3>
              <div class="flex flex-col gap-4 mt-6">
                <input v-model="form.titulo" type="text" placeholder="titulo"
                  class="bg-black border border-gray-600 p-3.5 rounded-xl focus:border-neon-blue outline-none transition-all">
                <input v-model="form.fecha" type="date" placeholder="fecha" :min="fechaHoy()"
                  class="font-gray-200 border border-gray-600 p-3.5 rounded-xl focus:border-neon-blue outline-none transition-all">
                <input v-model="form.lugar" type="text" placeholder="lugar"
                  class="bg-black border border-gray-600 p-3.5 rounded-xl focus:border-neon-blue outline-none transition-all">
                <input v-model="form.valor" type="number" placeholder="valor"
                  class="bg-black border border-gray-600 p-3.5 rounded-xl focus:border-neon-blue outline-none transition-all">
              </div>
              <div class="mt-6">
              <UFileUpload 
                  v-model="files" 
                  label="Seleccionar imagen"
                  accept="image/*"
                  :multiple="false"
                />
              </div>
              
              <div class="flex gap-4 mt-8">
                <button @click="guardarEvento" class="flex-1 bg-neon-blue text-black font-bold py-3 rounded-lg hover:bg-neon-green transition-colors">
                  Guardar</button>
                <button @click="()=>{mostrarModal = false; limpiarForm()}" class="flex-1 bg-gray-800 hover:bg-gray-700 text-white font-bold py-3 rounded-lg transition-colors">
                  Cancelar</button>
              </div>
            </div>
          </div>
          
        </div>
    </div>

    <div v-if="eventoSeleccionado" class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
      <div class="bg-neon-bg border border-neon-blue p-8 rounded-2xl w-full max-w-lg shadow-2xl text-white">
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-2xl font-bold text-neon-blue">{{ eventoSeleccionado.titulo }}</h3>
          <button @click="eventoSeleccionado = null" class="text-gray-400 hover:text-white">✕</button>
        </div>
        <div class="flex gap-6 mb-6">
          <img 
              width="150" s
              :src="imagenEvento" 
              alt="Imagen del evento"
              class="rounded-lg border border-gray-700"
          >
          <div>
            <p class="font font-bold text-white">Evento: {{eventoSeleccionado.titulo}}</p>
            <p class="font font-bold text-white">Fecha: {{ formatDate(eventoSeleccionado.fecha.toString()) }}</p>
            <p class="font font-bold text-white">Lugar: {{eventoSeleccionado.lugar}}</p>
            <p class="font font-bold text-white mt-2">Valor: {{eventoSeleccionado.valor}} creditos</p>
          </div>
        </div>

        <div v-for="inscrito in eventoSeleccionado.inscritos" :key="inscrito.id" 
          class="flex w-full justify-between items-center bg-gray-900 p-3 rounded-lg mb-2 border border-gray-800">
     
          <span class="text-white font-medium truncate ml-2">
            {{ inscrito.nombre }}
          </span>

          <button @click="desinscribir(inscrito.id)" class="bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-3 py-1.5 rounded transition-colors duration-200 shadow-md shrink-0 mr-2">
            Desinscribir
          </button>
        </div>
        <button @click="eliminarEvento(eventoSeleccionado.id)" class="bg-gray-800 hover:bg-gray-900 text-white text-xs font-bold px-3 py-3 rounded transition-colors duration-200 shadow-md shrink-0">
          Eliminar evento</button>
      </div>
    </div>
</template>