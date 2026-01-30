import { defineStore } from 'pinia'
import axios from 'axios'

export const usePeticionStore = defineStore('peticion', async() => {
    const response = await axios.get("https://dummyjson.com/todos")
    return { response }
})
