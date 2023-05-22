import axios from 'axios'
import { defineStore, storeToRefs } from 'pinia'
import { ref, watch } from 'vue'

import { useBATS } from '@/stores/station.js'

export const useBatsevent = defineStore('batsevent', () => {
    //waveform
    let local = ref('http://140.109.82.44/assets/Data/2023/2023.080.01.45.19/data/') //http://140.109.82.44/assets/Data/2023/2023.080.01.45.19/data & src/components/statics/data/
    let evtime = ref('.D.2023,080,01:44:59.xy')
    let channels = ref(['HHE', 'HHN', 'HHZ'])
    let bevents = ref([])
    let paths = ref([])

    const { Cstations } = storeToRefs(useBATS())
    const getstationId = async (id) => {
        await id.map((row) => {
            paths.value = channels.value.map((cha) => {
                // bevents.value = { stationId: row.stationId }
                axios({
                    method: 'get',
                    url: local.value + 'TW.' + row.stationId + '..' + cha + evtime.value,
                })
                    // .get(local.value + 'TW.' + row.stationId + '..' + cha + evtime.value)
                    .then((res) => {
                        // console.log(res.data)
                        return (bevents.value = { stationId: row.stationId, channel: cha, data: res.data })
                    })
                    .catch((err) => {
                        // console.error(err)
                    })
            })
        })
    }
    watch(Cstations, async () => {
        await getstationId(Cstations.value)
    })
    return { paths, bevents }
})
