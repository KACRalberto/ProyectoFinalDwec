import { db } from "@/firebase/config";
import {
    doc,
    setDoc,
    getDoc
} from "firebase/firestore"

//HOW TO USE:
//  const async guardar()
// res = await guardar ( user.value , {OBJETO CON DATOS})
// if(res.ok) ==> se guardó //
export const guardarTarea = async(user,datos)=>{
    try {
        const docRef = doc(db, "usuarios", user.uid)
        await setDoc(docRef,datos)
        return{
            ok:true
        }
    } catch (error) {
        console.log(error)
        return{
            ok:false
        }
    }
}
//HOW TO USE:
// const async conseguire()
// res = await conseguir(user.value) ==> si va todo bien pues ya tienes los datos en
// res.data 
export const conseguirTareas = async(user)=>{
    try {
        const docRef = doc(db,"usuarios",user.uid)
        const snoopDog = await getDoc(docRef)
        if(snoopDog.exists()){
            return{
                ok:true,
                data : {
                    id: snoopDog.id, 
                    ...snoopDog.data()
                }
            }
        }
    } catch (error) {
        console.log(error)
        return{
            ok:false
        }
    }   

}
