<script setup lang="ts">
    const datos = ref({
        email: '',
        password: ''
    })
    definePageMeta({
        middleware: ['staff']
    })

    const { fetch: fetchSession } = useUserSession()

    async function login() {
        try{
            await $fetch("/api/auth/login", {
                method: 'POST',
                body:{
                    email: datos.value.email,
                    password: datos.value.password
                }
            })
            await fetchSession()
            await navigateTo('/staff')
        }catch(err:any){
            console.error(err)
        }
    }
</script>

<template>
    <div class="min-h-screen bg-[color:var(--neon-bg)] text-white flex flex-col items-center justify-center p-6">
        
        <div class="w-full max-w-sm bg-[#111113] border border-gray-800 rounded-2xl p-8 shadow-2xl">
            
            <div class="mb-8 text-center">
                <h1 class="text-2xl font-bold text-[color:var(--neon-blue)]">Panel Staff</h1>
                <p class="text-gray-400 text-sm mt-2">Inicia sesión para continuar</p>
            </div>
            
            <form >
                <input 
                    type="email" 
                    placeholder="Email" 
                    v-model="datos.email"
                    class="w-full p-4 bg-black border border-gray-700 rounded-xl focus:border-[color:var(--neon-blue)] focus:outline-none transition-all">
                <input 
                    type="password" 
                    placeholder="Contraseña" 
                    v-model="datos.password"
                    class="w-full p-4 bg-black border border-gray-700 rounded-xl focus:border-[color:var(--neon-blue)] focus:outline-none transition-all">
                
                <button @submit.prevent="login"
                    type="submit"
                    class="w-full py-4 mt-4 bg-[color:var(--neon-blue)] text-white font-bold rounded-xl hover:opacity-90 transition-all">
                    Entrar
                </button>
            </form>
            
        </div>
    </div>
</template>