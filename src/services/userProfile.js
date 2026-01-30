import { db } from "@/firebase/config";
import {
    doc,
    setDoc,
    getDoc,
    addDoc,
    getDocs,
    collection
} from "firebase/firestore"

//HOW TO USE:
//  const async guardar()
// res = await guardar ( user.value , {OBJETO CON DATOS})
// if(res.ok) ==> se guardó //
export const guardarTarea = async(user,datos)=>{
    try {
        const docRef = doc(db, "usuarios", user.uid)
        await setDoc(docRef,{"tareas":datos})
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
        const tareas = []
        if(snoopDog.exists()){
            return snoopDog.data().tareas || []
        }else{
            return []
        }
    } catch (error) {
        console.log(error)
        return{
            ok:false
        }
    }   

}


export const listaTareas = async(tarea) => {
  try {
    const tareasRef = doc(db, "tareas", JSON.stringify(tarea.id))
    await setDoc(tareasRef, {
      texto: tarea.todo,
      completed: tarea.completed,
      idTarea: tarea.id
    })
    return { 
        ok: true
     }
  } catch (error) {
    console.error(error)
    return { 
        ok: false
     }
  }
}

export const recuperarTareas = async()=>{
  try {
    const tareasRef = collection(db, "tareas")
    const snoopDog = await getDocs(tareasRef)
    const tareas = []
    snoopDog.forEach(dog => {
        tareas.push(dog.data())
    });
    return tareas
  } catch (error) {
    console.error(error)
    return []
  }
}

