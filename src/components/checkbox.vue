<script setup>
import L from 'leaflet'
import $ from 'jquery'
import { onMounted, ref } from 'vue'
import 'leaflet/dist/leaflet.css'
import 'leaflet-draw/dist/leaflet.draw'
import 'leaflet-draw/dist/leaflet.draw.css'

import { LegendScope, getPgaScale, getColorLegend } from '@/components/statics/functions.js'

let tmpData = ref([])
$.ajax({
    url: 'src/assets/Data/2023/2023.080.01.45.19/Int/palert/20230321014519_PGA.txt',
    method: 'Get', //request method
    dataType: 'text', //不設定會自動判斷
    async: false, //async 同步請求
    success: (result) => {
        let tmp = result.split('\n') // \n 換行
        tmp.forEach((row) => {
            if (row != '') {
                let col = row.trim().split(/\s+/)
                tmpData.push(col)
            }
        })
    },
    error: function (jqXHR, textStatus, errorThrown) {
        // console.error(jqXHR, textStatus, errorThrown);
        console.error(jqXHR, textStatus, errorThrown)
    },
})
let stations = ref([])
for (var i = 1; i < tmpData.length; i++) {
    stations.push(tmpData[i])
}
// //測站樣式
let markers = ref([])
const pgaco = getPgaScale(LegendScope.pgaDomain, LegendScope.pgaRange) //取得參數
stations.forEach((location) => {
    let pgargb = pgaco(location[5])
    markers.push(
        L.circle([location[1], location[2]], {
            color: pgargb,
            fillOpacity: 0,
            radius: 1500,
        }).bindPopup(
            `<b>${location[0]}</b>` +
                '<hr />' +
                'network: P_Alert' +
                '<br />' +
                'Latitude: ' +
                location[1] +
                '<br />' +
                'Longitude: ' +
                location[2]
        )
    )
})
</script>

<template>
    <input type="checkbox" id="checkbox" v-model="psta" />
    <label for="checkbox">test</label>
</template>

<style></style>
