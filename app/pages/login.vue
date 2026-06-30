<script setup lang="ts">
import { ref } from 'vue';
    const datos = ref({
        email: '',
        password: ''
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
    <header class="border-b border-neon-blue bg-neon-bg">
            <div class="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
                <NuxtLink to = "/" class="text-xl font-black text-neon-blue ">
                    Smart Events
                </NuxtLink>

                <nav>
                    <NuxtLink to="/login" class="rounded-lg px-4 py-2 text-sm font-bold text-neon-green border border-neon-green hover:bg-neon-green hover:text-neon-bg transition-all">
                        Staff
                     </NuxtLink>
                </nav>
            </div>
        </header>
    <div class="min-h-screen bg-[color:var(--neon-bg)] text-white flex flex-col items-center justify-center p-6">
        
        <div class="w-full max-w-sm bg-[#111113] border border-gray-800 rounded-2xl p-8 shadow-2xl">
            
            <div class="mb-8 text-center">
                <h1 class="text-2xl font-bold text-[color:var(--neon-blue)]">Panel Staff</h1>
                <p class="text-gray-400 text-sm mt-2">Inicia sesión para continuar</p>
            </div>
            
            <div class="flex flex-col space-y-4">
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
                
                <button @click="login" 
                    type="submit"
                    class="bg-neon-bg border border-neon-blue text-neon-blue px-6 py-2 rounded-lg transition-all duration-300 hover:bg-neon-blue hover:text-black hover:border-neon-blue">
                    Entrar
                </button>
            </div>
            
        </div>
    </div>
</template>