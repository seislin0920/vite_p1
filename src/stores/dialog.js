import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useDialog = defineStore('dialog', () => {
    const dialogState = ref(false)

    return { dialogState }
})
