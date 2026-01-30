<template>
    <section>
        <div v-if="registrarse">
            <form @submit.prevent="getUserRegistered">
                <div>
                    <label>Nombre</label>
                    <input type="text" placeholder="Su nombre" v-model="nombreUser">
                </div>
                <div>
                    <label>Email</label>
                    <input type="email" placeholder="ejemplo@ejemplo.com" v-model="emailUser">
                </div>
                <div>
                    <label>Contraseña</label>
                    <input type="password" placeholder="ejemplo123" v-model="passwordUser">
                </div>
                <div>
                    <label>Confirme su contraseña</label>
                    <input type="password" placeholder="ejemplo123" v-model="passwordConfirm">
                </div>
                <button type="submit">Registrarse</button>
            </form>
            <button @click="registrarse = !registrarse">¿Ya tienes cuenta? Inicia sesión</button>
        </div>
        <div v-if="!registrarse">
            <form @submit.prevent="getUserLoged">
                <div>
                    <label>Email</label>
                    <input type="email" placeholder="ejemplo@ejemplo.com" v-model="emailUser">
                </div>
                <div>
                    <label>Contraseña</label>
                    <input type="password" placeholder="ejemplo123" v-model="passwordUser">
                </div>
                <button type="submit">Iniciar sesión</button>           
            </form>
            <button @click="registrarse = !registrarse">¿Aún no tienes cuenta? Registrate </button>
        </div>
    </section>
    
</template>

<script setup>
import { useAuthStore } from '@/stores/authStore';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import { computed } from 'vue';
import { sendEmail } from '@/services/auth';
const registrarse = ref(true)
const toast = useToast()
const nombreUser = ref("")
const emailUser = ref("")
const passwordUser = ref("")
const passwordConfirm = ref("")
const router = useRouter()
const user = ref()

const theSamePass = computed(()=>{
    return passwordUser.value === passwordConfirm.value
})



const getUserRegistered = async()=>{

    
    const auth_ = useAuthStore()

    try {
        
        if(!theSamePass){
            toast.warning("Las contraseñas deben coincidir :/")
            return 
        }
        const response = await auth_.hacerRegistro(emailUser.value, passwordUser.value)
        user.value = response
    
        const res = await sendEmail()
        console.log(res.ok)
        // if(response_enviar){
        //     toast.info("Compruebe su correo para verificar su cuenta :) {COMPRUEBE MENSJAES DE SPAM}")
        // }
        
    } catch (error) {
        console.log(error)
    }
}

const getUserLoged = async()=>{

    const auth_ = useAuthStore()
    
    try {
        
        const response = auth_.hacerLogin(emailUser.value, passwordUser.value)
        user.value = response
        toast.success("Ha iniciado sesion")
        router.push("/workspace")

    } catch (error) {
        console.log(error)
    }
}

</script>

<style lang="sass" scoped>

</style>