<template>
    <div>
        <div v-for="(task,index) in tareas" :key="index">
            <div class="flex flex-col">
                <span>{{ task.completed }}</span>
                <span>{{ task.idTarea }}</span>
                <span>{{ task.texto }}</span>
            </div>
            <button :disabled="task.asignada" @click="anadirTarea(task)">Añadir tarea a la lista</button>
        </div>
    </div>
</template>

<script setup>
import { usePeticionStore } from '@/stores/peticion';
import { onMounted, ref } from 'vue';
import { conseguirTareas, guardarTarea } from '@/services/userProfile';
import { conseguirUser } from '@/services/auth';
import { listaTareas } from '@/services/userProfile';
import { recuperarTareas } from '@/services/userProfile';
const peticion = usePeticionStore()
const litaTareasUser = ref([])
const anadirTarea = async(tarea)=>{
    const user = conseguirUser()
    tarea.asignada = true
    listaTareas.value = await conseguirTareas(user)
    if(!listaTareas.value.find(ta => ta.idTarea === tarea.idTarea)){
        listaTareas.value.push(tarea)
    }

    const response = await guardarTarea(user, listaTareas.value)
    console.log(response)


}


let tareas = ref()


onMounted(async()=>{
    try {
        const res = await peticion.getData()

        tareas.value = await recuperarTareas()
        if(!tareas.value || tareas.value.length === 0){
            tareas.value = res.data.todos
        }
        tareas.value.forEach(element => {
            listaTareas(element)
        });
        tareas.value = tareas.value.sort((a, b) => Number(a.idTarea) - Number(b.idTarea))
        console.log(tareas.value, "ESTO ES TAREAS")

            // ESTO LO HE HECHO PORQUE SINO NO TENGO NI IDEA DE COMO GESTIONAR EL TEMA DE QUE LAS TAREAS SEAN COMPARTIDAS. OSEA SI LAS TAREAS NO LAS TENGO EN FIREBASE
            // NO HAY MANERA, PORQUE COMO LAS TAREAS SE CONSIGUEN DE UNA PETICION DE AXIOS ES IMPOSIBLE QUE AL RENDERIZAR LAS PAGINAS LA PETICION NO ME LOS PISE UNA Y OTRA VEZ 
    } catch (error) {
        console.log(error)
    }
}
)
</script>

<style lang="sass" scoped>

</style>