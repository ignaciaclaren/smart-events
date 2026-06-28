<script setup lang="ts">
    definePageMeta({
        middleware: ['staff']
    })
    async function logOut() {
        try {
            await $fetch("/api/auth/logout", {
                method: 'POST'
            })
        await navigateTo('/login')
        }catch(err){
            console.error(err)
        }
    }
</script>
s
<template>
    <button @click="logOut">
        cerrar sesion
    </button>
</template>