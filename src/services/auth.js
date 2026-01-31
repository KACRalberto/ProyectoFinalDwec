import { 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    sendEmailVerification,
    onAuthStateChanged
 } from "firebase/auth";
import { auth } from "@/firebase/config";
import { ref } from "vue";

const user = ref(null)

onAuthStateChanged(auth,(firebaseUser)=>{
    user.value = firebaseUser
})


//HOW TO USE:
//   Crear funcion registrar async
//          const res = await doRegister(email.value, password.value)
//          if(res.ok) >>>>>>> EL REGISTRO FUNCIONO!
//              y ya hacemos las pirulas necesarias
const doRegister = async(email, password)=>{
    try {
        const credenciales = await createUserWithEmailAndPassword(auth, email, password)
        return{
            ok:true,
            user : credenciales
        }
    } catch (error) {
        console.log("ERROR", error)
        return{
            ok:false
        }
    }

}

//HOW TO USE:
//   Crear funcion logear
//          const res = await doLogin(email.value, password.value)
//          if(res.ok) >>>>>>> EL REGISTRO FUNCIONO!
//              y ya hacemos las pirulas necesarias
const doLogin = async(email, password)=>{
    try {
        const credenciales = await signInWithEmailAndPassword(auth, email, password)
        return{
            ok:true,
            user:credenciales
        }
    } catch (error) {
        return{
            mesaje:error,
            ok:false
        } 
    }

}
// HOW TO USE: 
//     crear funcion salir async
//         await logout() y ya 
// if res.ok => ya hacemos cosas 
const logOut = async()=>{
    try {
        await signOut(auth)
        return{
            ok:true
        }
    } catch (error) {
        console.log(error)
    }
}


//HOW TO USE:
const sendEmail = async(user)=>{

    try {
        console.log(user, "LOG DEL USER")
        if(user.emailVerified){
            return{
                mensaje: "Usuario ya verificado"
            }
        }

        await sendEmailVerification(user)

        return{
            mensaje : "email enviado",
            ok: true
        }
        
    } catch (error) {
        console.log(error)
    }
}

const conseguirUser = ()=>{
    return user.value
}



export {doLogin, doRegister, logOut, sendEmail, user, conseguirUser }