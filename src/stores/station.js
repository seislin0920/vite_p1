import axios from 'axios'
import $ from 'jquery'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usePAlert = defineStore('paler', () => {
    //Stations(P-Alert)讀取與篩選
    let tmpData = ref([])
    $.ajax({
        url: 'src/components/statics/20230321014519_PGA.txt',
        method: 'Get', //request method
        dataType: 'text', //不設定會自動判斷
        async: false, //async 同步請求
        success: (result) => {
            let tmp = result.split('\n') // \n 換行
            tmp.forEach((row) => {
                if (row != '') {
                    let col = row.trim().split(/\s+/)
                    tmpData.value.push(col)
                }
            })

            // tmp.map(row=>)
        },
        error: function (jqXHR, textStatus, errorThrown) {
            // console.error(jqXHR, textStatus, errorThrown);
            console.error(jqXHR, textStatus, errorThrown)
        },
    })
    let Pstations = ref([])

    for (let i = 1; i < tmpData.value.length; i++) {
        Pstations.value.push(tmpData.value[i])
    }

    return { tmpData, Pstations }
})

export const useBATS = defineStore('BATS', () => {
    const batsdata = ref([])
    const tmp2 = ref([])
    const Cstations = ref([])

    axios
        .get('src/components/statics/BATS_stalist.txt')
        .then((res) => {
            batsdata.value = res.data.split('\n')
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
        })
        .catch((err) => {
            console.error(err)
        })

    //等待axios.get()返回的Promise才能給batsdata,否則回傳const batsdata = ref([])

    return { batsdata, tmp2, Cstations }
})
