<script setup lang="ts">
    const datos = ref({
        email: '',
        password: ''
    })

    async function login() {
        try{
        const respuesta = await $fetch("/api/auth/login", {
            method: 'POST',
            body:{
                email: datos.value.email,
                password: datos.value.password
            }
        })
        console.log(respuesta)
        }catch(err:any){
            console.error(err)
        }
    }

</script>

<template>
    <div class="min-h-screen bg-neon-bg text-gray-200">
        <h1 >
            Panel Staff
        </h1>
        
        <div class="space-y-4">
            <input type="email" placeholder="email" v-model="datos.email">
            <input type="password" placeholder="contraseña" v-model="datos.password">
            <button @click="login">
                Entrar
            </button>
        </div>
    </div>

</template>