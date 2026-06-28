<script setup lang="ts">
import type { Usuario } from '~/types/usuario';
    const { data: usuarios, error } = await useFetch<Usuario[]>('/api/usuarios')

</script>

<template>
    <h1 v-if="error"> Ocurrio un error al obtener los usuarios, intentelo más tarde</h1>
    <UTable v-else :data="usuarios" class="flex-1" />
</template>