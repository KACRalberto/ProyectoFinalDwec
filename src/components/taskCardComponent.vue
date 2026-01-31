<template>
    <div v-if="cargando" class="h-[100vh]">
        <img src="https://upload.wikimedia.org/wikipedia/commons/c/c7/Loading_2.gif" alt="">
    </div>
    <div v-if="!cargando" class="flex flex-col items-center p-3">
        <select v-model="filtroSelect" class="outline-none focus:outline-none border-none">
            <option value="" selected disabled hidden>Haga click aquí para filtrar las tareas ↓</option>
            <option value="completada" class="text-green-700">COMPLETADAS</option>
            <option value="noCompletada" class="text-red-700">NO COMPLETADAS</option>
            <option value="asignadas" class="text-gray-500">ASIGNADAS</option>
            <option value="" class="text-blue-800">TODAS</option>
        </select>
        <div class="grid grid-cols-1 gap-10 lg:grid-cols-4 items-center justify-center p-10">
            <div v-for="(task,index) in tareasFiltradas" :key="index" class="rounded-xl shadow-2xl flex flex-col items-center p-3 lg:w-90 lg:h-60 bg-gray-200">
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
                <button class="cursor-pointer transition-all bg-blue-500 text-white px-6 py-2 rounded-lg border-blue-600 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px] disabled:cursor-not-allowed disabled:opacity-50 w-50 my-2" :disabled="task.asignada || task.completed" @click="anadirTarea(task)"> {{ task.asignada ? "TAREA YA ASIGNADA" : task.completed ? "TAREA COMPLETADA" : "Añadir tarea a la lista" }}</button>
            </div>
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
const cargando = ref(true)


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
        cargando.value = false
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
select
    border: none
    appearance: none
    outline: none
</style>