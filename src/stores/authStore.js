import { defineStore } from 'pinia'
import { doRegister, doLogin, logOut, sendEmail } from '@/services/auth'

export const useAuthStore = defineStore('autenticacion', () => {

    const hacerRegistro = async(email, password) =>{

        try {
            
            const response = await doRegister(email, password)
            if(response.ok){
                return response.user
            }

        } catch (error) {
            console.log(error, "hacerRegistro authStoreLog")
        }

    }

    const hacerLogin = async(email, password) =>{

        try {
            
            const response = await doLogin(email, password)
            if(response.ok){
                return response.user
            }

        } catch (error) {
            console.log(error, "hacerRegistro authStoreLog")
        }
        
    }

    const cerrarSesion = async() =>{

        try {
            const res = await logOut()
            return res
        } catch (error) {
            console.log(error)
        }


    }

    return { hacerRegistro,hacerLogin,cerrarSesion }
})
