<template>
    <div>
        <h2>workspace</h2>
        <div v-for="(tarea,index) in listaUserTareas" :key="index">
            {{ tarea }}

        </div>
    </div>
    <button @click="cerrarSesionUser">Cerrar sesión</button>
</template>

<script setup>
import { useAuthStore } from '@/stores/authStore';
import { useRouter } from 'vue-router';
import { conseguirTareas } from '@/services/userProfile';
import { onMounted } from 'vue';
import { conseguirUser } from '@/services/auth';
import { ref } from 'vue';

const auth_ = useAuthStore()
const router = useRouter()
const listaUserTareas = ref([])
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
onMounted(async()=>{
    const user = conseguirUser()
    const response = await conseguirTareas(user)
    listaUserTareas.value = response
})
</script>

<style lang="sass" scoped>

</style>