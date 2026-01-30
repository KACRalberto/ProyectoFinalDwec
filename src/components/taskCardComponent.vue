<template>
    <div>
        <select v-model="filtroSelect">
            <option value="" selected disabled hidden>Seleccione una opción</option>
            <option value="completada">COMPLETADAS</option>
            <option value="noCompletada">NO COMPLETADAS</option>
            <option value="asignadas">ASIGNADAS</option>
            <option value="">TODAS</option>
        </select>
        <div v-for="(task,index) in tareasFiltradas" :key="index">
            <div class="flex flex-col">

                <span>{{ task.completed }}</span>
                <span>{{ task.idTarea }}</span>
                <span>{{ task.texto }}</span>
            </div>
            <button class="border p-1 disabled:cursor-not-allowed disabled:opacity-50" :disabled="task.asignada || task.completed" @click="anadirTarea(task)"> {{ task.asignada ? "TAREA YA ASIGNADA" : task.completed ? "TAREA COMPLETADA" : "Añadir tarea a la lista" }}</button>
        </div>
    </div>
</template>

<script setup>
import { usePeticionStore } from '@/stores/peticion';
import { onMounted, ref, watch } from 'vue';
import { actualizarTarea, conseguirTareas, guardarTarea } from '@/services/userProfile';
import { conseguirUser } from '@/services/auth';
import { listaTareas } from '@/services/userProfile';
import { recuperarTareas } from '@/services/userProfile';
const peticion = usePeticionStore()
let tareas = ref()
const tareasFiltradas = ref([])
const listaOriginal = ref([])
const filtroSelect = ref("")


const anadirTarea = async(tarea)=>{
    const user = conseguirUser()
    tarea.asignada = true
    listaTareas.value = await conseguirTareas(user)
    if(!listaTareas.value.find(ta => ta.idTarea === tarea.idTarea)){
        listaTareas.value.push(tarea)
    }
    
    const response = await guardarTarea(user, listaTareas.value)
    console.log(response)
    
    const actualizada = await actualizarTarea(tarea)
    console.log("actualizada",actualizada)
    
    tareas.value = await recuperarTareas(tarea)
    tareas.value = tareas.value.sort((a, b) => Number(a.idTarea) - Number(b.idTarea))
    tareasFiltradas.value = [...tareas.value]
    console.log("Lista de tareas actualizada:", tareas.value)
    
}
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
        tareasFiltradas.value = [...tareas.value]
        // ESTO LO HE HECHO PORQUE SINO NO TENGO NI IDEA DE COMO GESTIONAR EL TEMA DE QUE LAS TAREAS SEAN COMPARTIDAS. OSEA SI LAS TAREAS NO LAS TENGO EN FIREBASE
        // NO HAY MANERA, PORQUE COMO LAS TAREAS SE CONSIGUEN DE UNA PETICION DE AXIOS ES IMPOSIBLE QUE AL RENDERIZAR LAS PAGINAS LA PETICION NO ME LOS PISE UNA Y OTRA VEZ 
    } catch (error) {
        console.log(error)
    }
}
)

watch(filtroSelect, (newValueSelect)=>{
    console.log(newValueSelect)
    listaOriginal.value = [...tareas.value]
    
    if(newValueSelect == "completada"){
         tareasFiltradas.value = listaOriginal.value.filter(tarea => 
            tarea.completed == true
        )
    }
    if(newValueSelect == "noCompletada"){
         tareasFiltradas.value = listaOriginal.value.filter(tarea => 
            tarea.completed == false
        )
    }
    if(newValueSelect == "asignadas"){
         tareasFiltradas.value = listaOriginal.value.filter(tarea => 
            tarea.asignada == true
        )
    }

    if(!newValueSelect){
         tareasFiltradas.value = [...tareas.value]
    }
})
</script>

<style lang="sass" scoped>

</style>