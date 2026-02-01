<script setup>
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/config';
import { ref } from 'vue';
const user = ref(null)
onAuthStateChanged(auth,(firebaseUser)=>{
  user.value = firebaseUser
})

</script>

<template>
  <header>
    <nav>
      <div v-if="user" class="flex justify-between p-5"> 
        <router-link to="/" class="cursor-pointer transition-all bg-blue-500 text-white px-3 py-1 rounded-lg border-blue-600 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]">Mostrar tareas</router-link>
        <router-link to="/workspace" class="cursor-pointer transition-all bg-blue-500 text-white px-3 py-1 rounded-lg border-blue-600 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]">Mis tareas</router-link>
      </div>
    </nav>
  </header>
  <main>
    <router-view></router-view>
  </main>
</template>

<style lang="sass" scoped>
main
  background-color: white

header
  position: sticky
  top: 0
  z-index: 9999
  background-color: white
  
</style>
