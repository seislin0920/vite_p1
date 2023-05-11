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
    let stations = ref([])

    for (var i = 1; i < tmpData.value.length; i++) {
        stations.value.push(tmpData.value[i])
    }

    return { tmpData, stations }
})

export const useBATS = defineStore('BATS', () => {
    const list = ref([])

    try {
        const res = axios.get('src/components/statics/BATS_stalist.txt')
        let tmp2 = res.data.split('\n')
        tmp2.map
    } catch (error) {
        //error
    }

    return {}
})
