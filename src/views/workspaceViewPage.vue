<template>
    <div>
        <h2>workspace</h2>
    </div>
    <button @click="cerrarSesionUser">Cerrar sesión</button>
</template>

<script setup>
import { useAuthStore } from '@/stores/authStore';
import { useRouter } from 'vue-router';
const auth_ = useAuthStore()
const router = useRouter()
const cerrarSesionUser = async()=>{
    try {
        
        const response = await auth_.cerrarSesion()
        if(response.ok){
            router.push("/auth")
        }
    } catch (error) {
        console.log(error)
    }
}

</script>

<style lang="sass" scoped>

</style>