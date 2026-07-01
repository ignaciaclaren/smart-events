<script setup lang="ts">
import type { Usuario } from '~/types/usuario';
    definePageMeta({
        middleware: ['staff']
    })
    const modalAbierto = ref(false)
    const { data: usuarios, refresh, error } = await useFetch<Usuario[]>('/api/usuarios')
    
    const usuarioSeleccionado = ref<Usuario | null> (null)

    function abrirModal(e: any, row: any) {
        usuarioSeleccionado.value = row.original
    }

    function solicitaConfirmacion(){
        const respuesta: boolean = confirm("¿Estás seguro de que deseas continuar?");
        if (respuesta){
            confirmarBorrar()
            usuarioSeleccionado.value = null;
        }
    }

    async function confirmarBorrar() {
            try{
                await $fetch(`/api/usuarios/${usuarioSeleccionado.value?.email}`,{
                    method: 'DELETE'
                })
                await refresh()
                usuarioSeleccionado.value = null
                 useToast().add({
                    duration: 5000,            
                    title: 'Usuario eliminado con éxito',
                    color: 'primary',
                })
            }catch(err){
                useToast().add({
                    duration: 5000,            
                    title: 'Ocurrió un error al borrar el usuario',
                    color: 'error',
                })
            }
    }

    const form = ref({
        email: '',
        password: '',
        nombre: '',
        apellido: '',
        rol: 'staff'
    })

    function abrirModalAgregar() {
         modalAbierto.value = true
}

    async function agregarUsuario() {
        if(!form.value.email || !form.value.password || !form.value.nombre || !form.value.apellido){
            useToast().add({
                duration: 5000,            
                title: 'Debe ingresar todos los datos',
                color: 'error',
            })
            return;
        }
        try{
            await $fetch("/api/usuarios",{
                method: 'POST',
                body: form.value
            })
            await refresh()
            modalAbierto.value = false
            useToast().add({
                duration: 5000,            
                title: 'Usuario creado con éxito',
                color: 'primary',
            })

        }catch(err){
            useToast().add({
                duration: 5000,
                title: 'Error al agregar el usuario',
                color: 'error'
            })
        }
    }

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
        
    <h1 v-if="error"> Ocurrio un error al obtener los usuarios, intentelo más tarde</h1>
    <UTable v-else :data="usuarios" class="flex-1" @select="abrirModal">
    </UTable>

    
    <div v-if="usuarioSeleccionado" class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
        <div class="bg-neon-bg border border-neon-blue p-8 rounded-2xl w-full max-w-sm shadow-2xl">
            <div class="flex justify-between items-center mb-6">
                <h3 class="text-2xl font-bold text-neon-blue">{{ usuarioSeleccionado.nombre }} {{ usuarioSeleccionado.apellido }}</h3>
                    <button @click="usuarioSeleccionado = null" class="text-gray-400 hover:text-white">✕</button>
            </div>
            <div class="space-y-2 mb-6">
                <p class="font-bold">Email: {{ usuarioSeleccionado.email }}</p>
            </div>
            <div class="flex flex-col space-y-3">
                <button 
                    @click="solicitaConfirmacion" 
                    class="bg-[#1f2937] hover:bg-red-900 text-white font-bold px-4 py-2 rounded transition-colors duration-200 shadow-md self-start">
                    Eliminar
                </button>
            </div>
        </div>
    </div>



    <div class="flex justify-center my-8">
        <button @click="abrirModalAgregar" class="bg-neon-bg border-2 border-neon-blue text-neon-blue font-bold px-8 py-3 rounded-xl transition-all duration-300 ease-in-out hover:bg-neon-blue hover:text-black ">
            Agregar Usuario
        </button>
    </div>
    <div v-if="modalAbierto" class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
        <div class="bg-neon-bg border border-neon-blue p-8 rounded-2xl w-full max-w-md shadow-2xl">
            <h3 class="text-white text-xl font-bold mb-6 text-center">
                Nuevo usuario
            </h3>
            <div class="mt-8 flex flex-col space-y-3">
                <input v-model="form.email" placeholder="email" 
                    class="bg-black border border-gray-700 p-3 rounded text-white focus:border-neon-blue outline-none transition">
                <input type="password" v-model="form.password" placeholder="password"
                    class="bg-black border border-gray-700 p-3 rounded text-white focus:border-neon-blue outline-none transition">
                <input v-model="form.nombre" placeholder="nombre"
                    class="bg-black border border-gray-700 p-3 rounded text-white focus:border-neon-blue outline-none transition">
                <input v-model="form.apellido" placeholder="apellidos"
                    class="bg-black border border-gray-700 p-3 rounded text-white focus:border-neon-blue outline-none transition">
                <select value="staff" class="bg-black border border-gray-700 p-3 rounded text-white focus:border-neon-blue outline-none transition">
                    <option value="staff">Staff</option>
                    <option value="admin">Admin</option>
                </select>
            </div>
            <div class="mt-8 flex flex-col space-y-3">
                <button @click="agregarUsuario" class="w-full bg-neon-blue text-black font-bold py-3 rounded hover:opacity-80 transition">
                    Guardar
                </button>
                <button @click="modalAbierto = false" class="w-full bg-gray-900 text-gray-400 hover:text-white rrounded hover:opacity-80 transition py-2">
                    Cancelar
                </button>
            </div>
        </div>
    </div>
</template>