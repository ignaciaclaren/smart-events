<script setup lang="ts">
    const { user } = useUserSession();
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
    <div>
        <h1>
            {{ user?.nombre }}
            {{ user?.apellido }}
        </h1>
    </div>
    <div>
        <button @click="navigateTo('/staff_usuarios')"> gestionar usuario</button>
        <button> gestionar evento</button>
    </div>
</template>