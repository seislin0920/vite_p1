import $ from 'jquery'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useBATS = defineStore('BATS', () => {
    const batsdata = ref([])
    const tmp2 = ref([])
    const Cstations = ref([])

    $.ajax({
        url: 'src/components/statics/BATS_stalist.txt',
        method: 'Get', //request method
        dataType: 'text', //不設定會自動判斷
        async: false, //async 同步請求
        success: (result) => {
            batsdata.value = result.split('\n')
            tmp2.value = batsdata.value.map((meta) => {
                return meta.trim().split(/\s+/)
            })
            tmp2.value.shift() //去除title
            Cstations.value = tmp2.value.map(([stationId, latitude, longitude, elevation]) => {
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

    //等待axios預設為異步,所以得用async await,但在defineStore又會出問題

    return { Cstations }
})
