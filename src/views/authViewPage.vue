<template>
    <section>
        <div v-if="registrarse" class="w-[80vh] flex flex-col items-center">
            <form @submit.prevent="getUserRegistered" class="flex flex-col items-center gap-5 p-5 px-15 rounded-xl shadow-2xl bg-gray-200">
                <h1 class="text-2xl">Registre su usuario</h1>
                <div class="flex flex-col text-center">
                    <label class="text-start text-xl">Email</label>
                    <div class="rounded-xl hover:outline-double hover:outline-green-200 focus:outline-dashed focus-within:outline-dashed focus-within:outline-green-200 bg-gray-200">
                        <input type="email" class="p-2 outline-none" placeholder="ejemplo@ejemplo.com" v-model="emailUser">
                        <i class="fa-solid fa-at pr-2"></i>
                    </div>
                </div>
                <div class="flex flex-col text-center">
                    <label class="text-start text-xl">Contraseña</label>
                    <div class=" rounded-xl hover:outline-double hover:outline-green-200 focus:outline-dashed focus-within:outline-dashed focus-within:outline-green-200 bg-gray-200">
                        <input type="password" class="p-2 outline-none" placeholder="ejemplo123" v-model="passwordUser">
                        <i class="fa-solid fa-key pr-2"></i>
                    </div>
                </div>
                <div class="flex flex-col text-center">
                    <label class="text-start text-xl">Confirme su contraseña</label>
                    <div class="rounded-xl hover:outline-double hover:outline-green-200 focus:outline-dashed focus-within:outline-dashed focus-within:outline-green-200 bg-gray-200">
                        <input type="password" class="p-2 outline-none" placeholder="ejemplo123" v-model="passwordConfirm">
                        <i class="fa-solid fa-key pr-2"></i>
                    </div>
                </div>
                <button type="submit" class="cursor-pointer transition-all bg-blue-500 text-white px-6 py-2 rounded-lg border-blue-600 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]">Registrarse</button>
            </form>
            <button @click="registrarse = !registrarse" class="p-2 self-center font-[500] text-black">¿Ya tienes cuenta? <span class="text-green-500">
            Inicia sesión
            </span></button>
        </div>
        <div v-if="!registrarse" class="w-[80vh] flex flex-col items-center" >
            <form @submit.prevent="getUserLoged" class="flex flex-col items-center gap-5 p-5 px-15 rounded-xl shadow-2xl bg-gray-200">
                <h1 class="text-2xl">Iniciar sesión</h1>
                <div class="flex flex-col text-center">
                    <label class="text-start text-xl">Email</label>
                    <div class=" rounded-xl hover:outline-double hover:outline-green-200 focus:outline-dashed focus-within:outline-dashed focus-within:outline-green-200 bg-gray-200" >
                        <input type="email" class="p-2 outline-none" placeholder="ejemplo@ejemplo.com" v-model="emailUser">
                        <i class="fa-solid fa-at pr-2"></i>
                    </div>
                </div>
                <div class="flex flex-col text-center">
                    <label class="text-start text-xl">Contraseña</label>
                    <div class=" rounded-xl hover:outline-double hover:outline-green-200 focus:outline-dashed focus-within:outline-dashed focus-within:outline-green-200 bg-gray-200">
                        <input type="password" class="p-2 outline-none" placeholder="ejemplo123" v-model="passwordUser">
                        <i class="fa-solid fa-key pr-2"></i>
                    </div>
                </div>
                <button type="submit" class="cursor-pointer transition-all bg-blue-500 text-white px-6 py-2 rounded-lg border-blue-600 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]">Iniciar sesión</button>        
            </form>
            <button @click="registrarse = !registrarse" class="p-2 self-center font-[500] text-black">¿Aún no tienes cuenta? <span class="text-green-500">
            Regístrate
            </span></button>
            <div v-if="!registrarse && verificado">
                <button @click="reenviarCorreo" class="font-[300] text-red-400">Click aqui para reenviar correo de verificación</button>
            </div>
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
const registrarse = ref(false)
const toast = useToast()
const nombreUser = ref("")
const emailUser = ref("")
const passwordUser = ref("")
const passwordConfirm = ref("")
const router = useRouter()
const user = ref()
const verificado = ref(false)
const theSamePass = computed(()=>{
    return passwordUser.value === passwordConfirm.value
})



const getUserRegistered = async()=>{

    
    const auth_ = useAuthStore()

    try {
        
        if(!theSamePass.value){
            toast.warning("Las contraseñas deben coincidir :/")
            return 
        }
        const response = await auth_.hacerRegistro(emailUser.value, passwordUser.value)
        toast.info("Usuario registrado :)")
        user.value = response.user
        
        const res = await sendEmail(user.value)
        
        if(res.ok){
            toast.info("Compruebe su correo para verificar su cuenta :) {COMPRUEBE MENSJAES DE SPAM}")
        }
        
    } catch (error) {
        console.log(error)
    }
}


const reenviarCorreo = async()=>{
    const res = await sendEmail()

    if(res.ok){
        toast.info("Compruebe su correo para verificar su cuenta :) {COMPRUEBE MENSJAES DE SPAM}")
    }
        
}

const getUserLoged = async()=>{

    const auth_ = useAuthStore()
    
    try {
        
        const response = await auth_.hacerLogin(emailUser.value, passwordUser.value)
        console.log(response)
        if(response.user.emailVerified){
            toast.info("Bienvenido :)")
            router.push("/workspace")
        }else{
            auth_.cerrarSesion()
            toast.warning("DEBE VERIFICAR SU CUENTA {REVISE CORREO DE SPAM}")
            verificado.value = true
        }

    } catch (error) {
        console.log(error)
    }
}

</script>

<style lang="sass" scoped>
section
    height: 100dvh
    display: flex
    justify-content: center
    align-items: center
</style>