<script setup>
import L from 'leaflet'
import $ from 'jquery'
import { onMounted, ref } from 'vue'
import 'leaflet/dist/leaflet.css'
import 'leaflet-draw/dist/leaflet.draw'
import 'leaflet-draw/dist/leaflet.draw.css'

import { LegendScope, getPgaScale, getColorLegend } from '@/components/statics/functions.js'

const mapContainer = ref(null)
const customOptions = {
    minWidth: '150',
}

onMounted(() => {
    const map = L.map(mapContainer.value, {
        center: [23.742197, 120.879237],
        zoom: 7,
    })
    const osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 13,
        minZoom: 6,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>', // 商用時必須要有版權出處
        zoomControl: true, // 是否秀出 - + 按鈕
    }).addTo(map)
    //比例尺
    L.control
        .scale({
            maxWidth: 200,
            updateWhenIdle: false,
            position: 'topright',
        })
        .addTo(map)
    //建立繪圖資料加到 map
    const drawnItems = new L.FeatureGroup()
    map.addLayer(drawnItems)
    //建立繪圖的控制元件
    const drawControl = new L.Control.Draw({
        edit: {
            featureGroup: drawnItems,
        },
        draw: {
            polygon: true,
            rectangle: false,
            marker: false,
            circlemarker: false,
        },
    })
    map.addControl(drawControl)

    //地圖監聽事件
    const popup = L.popup()
    map.on('click', (e) => {
        popup
            .setLatLng(e.latlng)
            .setContent('You clicked the map at ' + e.latlng.toString() + '.')
            //toString陣列中的每個元素用逗號串接起來成為一個字串，並回傳該字串
            .openOn(map)
    })

    //PGA_scale
    let pgaScale = getPgaScale()

    let config = {
        color: pgaScale,
        title: 'PGA',
        width: 250,
        tickValues: pgaScale.domain(),
        vertical: true,
    }
    // console.debug(d3.schemeRdBu[9]);
    let pgaLegend = document.querySelector('div.legend>.pgaLegend')
    if (pgaLegend) pgaLegend.append(getColorLegend(config))
    //可移動
    let legendNodes = document.querySelectorAll('.legend>div')
    // console.debug(legendNodes);
    legendNodes.forEach((legend, i) => {
        new L.Draggable(legend).enable()
    })

    //地質圖
    const tw_geology = L.tileLayer('src/assets/tw_geology/{z}/{x}/{y}.png', {
        maxZoom: 14,
        minZoom: 6,
        attribution: 'tw_geology',
        zoomControl: true, // 是否秀出 - + 按鈕
        opacity: 0.6,
    }).bringToFront(map)

    //cwb震度圖
    let cwb = 'src/assets/Data/2023/2023.080.01.45.19/Int/CWB/2023020a.png'
    const cwb_st = [
        [26.029563, 123.12703],
        [20.867285, 118.726656],
    ]
    let cwb_over = [
        L.imageOverlay(cwb, cwb_st, {
            opacity: 0.4,
            interactive: true, //mouse event 可觸發
        }),
    ]
    const cwb_int = L.layerGroup(cwb_over)

    //P-Alert震度圖
    let pa = 'src/assets/Data/2023/2023.080.01.45.19/Int/palert/20230321014519_contour.png'
    const pa_st = [
        [25.303, 122.003],
        [21.890895, 120.048],
    ]
    let pa_over = [
        L.imageOverlay(pa, pa_st, {
            opacity: 0.7,
            interactive: true, //mouse event 可觸發
        }),
    ]
    const pa_int = L.layerGroup(pa_over)

    //Stations(P-Alert)
    let tmpData = []
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
    let stations = []
    for (var i = 1; i < tmpData.length; i++) {
        stations.push(tmpData[i])
    }
    //測站樣式
    let markers = []
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
                    location[2],
                customOptions
            )
        )
    })
    const Sta = L.layerGroup(markers)

    //地震事件
    const events = L.tileLayer('src/assets/events/{z}/{x}/{y}.png', {
        maxZoom: 13,
        minZoom: 6,
        attribution: '2022-01-03~2023-04-09',
        zoomControl: true, // 是否秀出 - + 按鈕
    }).bringToFront(map)

    //esri
    const esri = L.tileLayer(
        'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        {
            maxZoom: 13,
            minZoom: 6,
            attribution:
                'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
            zoomControl: true, // 是否秀出 - + 按鈕
        }
    )

    //切換
    const changeLayer = {
        OpenStreetMap: osm,
        WorldImagery: esri,
    }
    const overlayMaps = {
        Geology: tw_geology,
        'P-Alert_stalist': Sta,
        'Event(2022-01-03~2023-04-09)': events,
        CWB_intensity: cwb_int,
        'P-Alert': pa_int,
    }
    L.control.layers(changeLayer, overlayMaps).addTo(map)
})
</script>

<template>
    <!-- <head>
        <link rel="stylesheet" href="src/components/statics/pgascale.css" />
    </head> -->
    <div class="mapContainer" ref="mapContainer"></div>
    <div class="legend">
        <div class="pgaLegend"></div>
    </div>
</template>

<style lang="css" scoped src="@/components/statics/pgascale.css"></style>
