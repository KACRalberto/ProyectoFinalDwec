import { defineStore } from 'pinia'
import axios from 'axios'

export const usePeticionStore = defineStore('peticion', () => {
    const getData = async()=>{
        const response = await axios.get("https://dummyjson.com/todos")
        return response
    }

    return { getData }
})
