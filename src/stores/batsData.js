import $ from 'jquery'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useBATS = defineStore('batsevent', () => {
    //BATS_stalist
    const Cstations = ref([])
    $.ajax({
        url: 'src/components/statics/BATS_stalist.txt',
        method: 'Get', //request method
        dataType: 'text', //不設定會自動判斷
        async: false, //async 同步請求
        success: (result) => {
            let batsdata = result.split('\n')
            let tmp2 = batsdata.map((meta) => {
                return meta.trim().split(/\s+/)
            })
            tmp2.shift() //去除title
            Cstations.value = tmp2.map(([stationId, latitude, longitude, elevation]) => {
                return {
                    stationId,
                    latitude,
                    longitude,
                    elevation,
                }
            })
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error(jqXHR, textStatus, errorThrown)
        },
    })
    //axios預設為異步,所以得用async await,但在defineStore又會出問題

    //getWaveform
    // const userdata = ref({})
    let waveform = ref({})
    const getWaveformData = (station) => {
        let tmp = {}
        let channels = ['HHE', 'HHN', 'HHZ']
        let evtime = '.D.2023,080,01:44:59.xy'
        let local = 'http://140.109.82.44/assets/Data/2023/2023.080.01.45.19/data/'
        // let station = userdata.value.station
        channels.forEach((cha) => {
            $.ajax({
                url: `${local}TW.${station}..${cha + evtime}`,
                method: 'Get', //request method
                dataType: 'text', //不設定會自動判斷
                async: false, //async 同步請求
                success: (res) => {
                    let spiltxy = res
                        .trim()
                        .split('\n')
                        .map((lines) => {
                            return lines.trim().split(/\s+/)
                        })
                    tmp[cha] = {
                        //以陣列[]存ENZ三分量
                        x: spiltxy.map(([x, y]) => parseFloat(x)),
                        y: spiltxy.map(([x, y]) => parseFloat(y)),
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    // console.error(jqXHR, textStatus, errorThrown)
                    console.error('No Data')
                },
            })
        })

        waveform.value = { staCode: station, waveform: tmp, event: '2023-03-21 01:44:59', network: 'BATS' }
    }
    return { Cstations, waveform, getWaveformData }
})
