import axios from 'axios'
import { defineStore, storeToRefs } from 'pinia'
import { ref } from 'vue'

import { useBATS } from '@/stores/station.js'
const { Cstations } = storeToRefs(useBATS())

export const usebatsevent = defineStore('batsevent', () => {
    //waveform
    let local = ref('http://140.109.82.44/assets/Data/2023/2023.080.01.45.19/data/')
    let evtime = ref('.D.2023,080,01:44:59.xy')

    events = ref([])
    events = Cstations.value.map((row) => {
        let channels = ['HHE', 'HHN', 'HHZ']
        let paths = channels.map((cha) => {
            return local.value + 'TW.' + row.stationId + '..' + cha + evtime.value
        })

        let batsevent = ref([])
        axios
            .get(paths)
            .then((res) => {
                console.log(res.data)
            })
            .catch((err) => {
                console.error(err)
            })
        return console.log(res.data)
    })

    //等待axios.get()返回的Promise才能給batsdata,否則回傳const batsdata = ref([])

    return { events }
})
