<script setup lang="ts">
    definePageMeta({
        middleware: ['staff']
    })
    const { user } = useUserSession();
   
    async function logOut() {
        try {
            await $fetch("/api/auth/logout", {
                method: 'POST'
            })
            await navigateTo('/login')
        } catch(err){
            console.error(err)
        }
    }
</script>

<template>
    <div class="min-h-screen bg-[color:var(--neon-bg)] text-white flex flex-col items-center justify-center p-6">
        
        <div class="w-full max-w-lg bg-[#111113] border border-gray-800 rounded-2xl p-8 shadow-2xl">
            
            <div class="flex justify-between items-center mb-8">
                <h1 class="text-xl font-bold">Panel Staff</h1>
                <button @click="logOut" class="text-sm text-red-400 hover:text-red-300 transition-colors">
                    Cerrar sesión
                </button>
            </div>
            
            <div class="text-center mb-10">
                <p class="text-gray-400 text-sm uppercase tracking-widest">Bienvenido</p>
                <h2 class="text-3xl font-extrabold mt-1 text-[color:var(--neon-blue)]">
                    {{ user?.nombre }} {{ user?.apellido }}
                </h2>
            </div>
           
            <div class="space-y-4">
                <button @click="navigateTo('/staff_usuarios')"
                    class="w-full py-4 bg-black border border-gray-700 rounded-xl font-medium hover:border-[color:var(--neon-blue)] hover:text-[color:var(--neon-blue)] transition-all flex justify-center items-center gap-2">
                    Gestionar Usuarios
                </button>
                
                <button @click="navigateTo('/staff_eventos')"
                    class="w-full py-4 bg-black border border-gray-700 rounded-xl font-medium hover:border-[color:var(--neon-blue)] hover:text-[color:var(--neon-blue)] transition-all flex justify-center items-center gap-2">
                    Gestionar Eventos
                </button>
            </div>
        </div>
        
    </div>
</template>