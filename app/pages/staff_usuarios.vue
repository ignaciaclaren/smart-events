<script setup lang="ts">
import type { Usuario } from '~/types/usuario';
    definePageMeta({
        middleware: ['staff']
    })
    const { data: usuarios, refresh, error } = await useFetch<Usuario[]>('/api/usuarios')
    const modalAbierto = ref(false)
    const usuarioBorrar = ref<string | null>(null)
    const borrandoUsuario = ref(false)

    function abrirModal(email: string){
        usuarioBorrar.value = email 
        modalAbierto.value = true

    }

    async function consfirmarBorrar() {
        borrandoUsuario.value = true 
        try{
            await $fetch(`/api/usuarios/${usuarioBorrar.value}`,{
            method: 'DELETE'
        })
        modalAbierto.value= false
        await refresh()
        }catch(err){
            console.error(err)
        }finally {
        borrandoUsuario.value = false
        usuarioBorrar.value = null 
    }
    }

</script>

<template>
    <h1 v-if="error"> Ocurrio un error al obtener los usuarios, intentelo más tarde</h1>
    <UTable v-else :rows="usuarios" class="flex-1" >
        <template #actions-data="{ row }">
            <button @click="abrirModal((row as any).email)">
                Borrar
            </button>
        </template>
    </UTable>
</template>