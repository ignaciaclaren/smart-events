<script setup lang="ts">
    const email = ref("")
    const listadoEventos = ref<any>()

    async function buscarEventos() {
        const { data } = await useFetch('/api/inscrito?email='+email.value)
        console.log(data)
        listadoEventos.value = data.value
    }

</script>
<template>
     <header class="border-b border-neon-blue bg-neon-bg">
            <div class="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
                <NuxtLink to = "/" class="text-xl font-black text-neon-blue ">
                    Smart Events
                </NuxtLink>

                <nav>
                    <NuxtLink to="/mis_eventos" class="rounded-lg px-4 py-2 text-sm font-bold text-gray-500 transition-all duration-400 hover:bg-neon-blue hover:text-neon-bg">
                    Mis Eventos
                    </NuxtLink>

                </nav>
            </div>
        </header>
    <div class="min-h-screen bg-neon-bg text-gray-200 p-8">
        <input type="text" v-model="email" placeholder="email"
        class="bg-neon-bg border border-neon-blue rounded px-3 py-2 text-white">
        <h2 class="text-neon-blue font-bold text-xl mt-6 mb-4">
        Tus eventos:
        </h2>
        <div v-for = "evento in listadoEventos" class="p-4 border border-neon-blue/20 rounded-lg mb-2">
            
            <p>{{ evento?.evento?.titulo }}</p>
        </div>
        <button @click="buscarEventos"
        class="mt-4 bg-neon-blue text-neon-bg font-bold px-6 py-2 rounded hover:bg-neon-green transition-colors">
            buscar
        </button>
    </div>
</template>