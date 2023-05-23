import $ from 'jquery'
import { defineStore, storeToRefs } from 'pinia'
import { ref } from 'vue'

import { useBATS } from '@/stores/batsStation.js'

export const useBatsevent = defineStore('batsevent', () => {
    const userdata = ref({})
    //waveform
    let waveform = ref({})
    const { Cstations } = storeToRefs(useBATS())
    const getWaveformData = () => {
        let tmp = {}
        let channels = ['HHE', 'HHN', 'HHZ']
        let evtime = '.D.2023,080,01:44:59.xy'
        let local = 'http://140.109.82.44/assets/Data/2023/2023.080.01.45.19/data/'
        let station = userdata.value.station
        channels.forEach((cha) => {
            $.ajax({
                url: `${local}TW.${station}..${cha + evtime}`,
                method: 'Get', //request method
                dataType: 'text', //不設定會自動判斷
                async: false, //async 同步請求
                success: (res) => {
                    let spiltxy = res.split('\n').map((lines) => {
                        return lines.trim().split(/\s+/)
                    })

                    tmp[cha] = {
                        x: spiltxy.map(([x, y]) => x),
                        y: spiltxy.map(([x, y]) => y),
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.error(jqXHR, textStatus, errorThrown)
                },
            })
        })

        waveform.value = { staCode: station, waveform: tmp, event: '12', network: 'BATS' }
    }
    // console.log(waveform.value)
    return { waveform, getWaveformData, userdata }
})
