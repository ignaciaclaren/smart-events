<script setup lang="ts">
import type { Usuario } from '~/types/usuario';
    definePageMeta({
        middleware: ['staff']
    })
    const { data: usuarios, refresh, error } = await useFetch<Usuario[]>('/api/usuarios')
    const usuarioSeleccionado = ref<Usuario | null> (null)

    function abrirModal(e: any, row: any) {
        usuarioSeleccionado.value = row.original
    }

    function solicitaConfirmacion(){
        const respuesta: boolean = confirm("¿Estás seguro de que deseas continuar?");
        if (respuesta){
            confirmarBorrar()
        }
    }

    async function confirmarBorrar() {
            try{
                await $fetch(`/api/usuarios/${usuarioSeleccionado.value?.email}`,{
                    method: 'DELETE'
                })
                await refresh()
            }catch(err){
                console.error(err)
            }
    }

</script>

<template>
    <h1 v-if="error"> Ocurrio un error al obtener los usuarios, intentelo más tarde</h1>
    <UTable v-else :data="usuarios" class="flex-1" @select="abrirModal">
    </UTable>
    <div v-if="usuarioSeleccionado">
            <p>Nombre: {{ usuarioSeleccionado.nombre }}</p>
            <button @click="solicitaConfirmacion"> Eliminar Usuario</button>
    </div>
</template>