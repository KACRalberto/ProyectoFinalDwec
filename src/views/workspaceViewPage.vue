<template>
    <section class="w-full flex flex-col justify-center items-center p-5 h-[92vh]">
        <h1 class="text-4xl font-[600] mb-6">Mi zona de tareas</h1>
        <div v-if="cargando">
            <img src="https://upload.wikimedia.org/wikipedia/commons/c/c7/Loading_2.gif" alt="">
        </div>

        <div v-if="!cargando" class="flex flex-col items-center gap-5">
            <div v-if="listaUserTareas != 0" class="grid grid-cols-1 gap-10 lg:grid-cols-4 items-center justify-center p-10 pt-220 lg:pt-0">
                <div v-for="(task,index) in listaUserTareas" :key="index" class="rounded-xl shadow-lg flex flex-col items-center p-3 lg:w-90 lg:h-60 bg-gray-200 ">
                <div class="flex flex-col">
                    <div class="flex items-center gap-2">
                        <span class="font-[600]">TAREA Nº</span>
                        <div class="bg-gray-200 w-5 flex items-center justify-center h-5 rounded-[100%]">
                            <span class="text-blue-900 font-[500]">{{ task.idTarea }}</span>
                        </div>
                    </div>
                    
                    <div class="flex flex-col">
                        <span class="font-[500]">Estado de la tarea :</span>
                        <span :style="{ color: task.completed? 'green' : 'red' }" class="text-center font-[500]">{{ task.completed? "COMPLETADA" : "NO COMPLETADA" }}</span>
                    </div>
    
                    <div class="flex flex-col">
                        <span class="font-[500]">La tarea consiste en :
                        </span>
                        <span :style="{ color: task.completed? 'green' : 'red'}" class="text-center font-[600]">
                                {{ task.texto }}
                            </span>
                    </div>
                </div>
            </div>
        </div>
            <button @click="cerrarSesionUser" class="cursor-pointer transition-all bg-red-500 text-white px-6 py-2 rounded-lg border-red-600 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]">Cerrar sesión</button>
        </div>
    </section>
</template>

<script setup>
import { useAuthStore } from '@/stores/authStore';
import { useRouter } from 'vue-router';
import { conseguirTareas } from '@/services/userProfile';
import { onMounted } from 'vue';
import { conseguirUser } from '@/services/auth';
import { ref } from 'vue';
const cargando = ref(true)
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
    cargando.value = false
})
</script>

<style lang="sass" scoped>

</style>