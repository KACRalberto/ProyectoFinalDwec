<template>
    <div>
        <div v-for="(task,index) in tareas" :key="index">
            {{ task }}
        </div>
    </div>
</template>

<script setup>
import { usePeticionStore } from '@/stores/peticion';
import { onMounted, ref } from 'vue';
const peticion = usePeticionStore()
const tareas = ref([])
onMounted(async()=>{
    try {
        const res = await peticion.getData()
        tareas.value = res.data.todos
    } catch (error) {
        console.log(error)
    }
}
)
</script>

<style lang="sass" scoped>

</style>