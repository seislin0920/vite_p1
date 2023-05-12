<script setup>
import $ from 'jquery'
import L from 'leaflet'
import 'leaflet-draw/dist/leaflet.draw'
import 'leaflet-draw/dist/leaflet.draw.css'
import 'leaflet/dist/leaflet.css'
import { onMounted, ref } from 'vue'

import { LegendScope, getColorLegend, getPgaScale } from '@/components/statics/functions.js'
import { useDialog } from '@/stores/dialog.js'
import { useBATS, usePAlert } from '@/stores/station.js'
import { storeToRefs } from 'pinia'
import { computed, watch } from 'vue'

const { dialogState } = storeToRefs(useDialog())
const { Pstations } = usePAlert() //function?
const BATS = useBATS()
const Cst = computed(() => BATS.Cstations)

const mapContainer = ref(null)
const customOptions = {
    minWidth: '150',
}

let CG = () => ({})
let CCI = () => ({})
let CPAI = () => ({})
let CPAS = () => ({})
let Cevent = () => ({})

//Leaflet
onMounted(() => {
    const map = L.map(mapContainer.value, {
        center: [23.742197, 120.879237],
        zoom: 7.5,
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
        title: 'PGA(gal)',
        width: 250,
        tickValues: pgaScale.domain(),
        vertical: true,
    }
    // console.debug(d3.schemeRdBu[9]);
    let pgaLegend = $('div.legend>.pgaLegend')
    if (pgaLegend) pgaLegend.append(getColorLegend(config))
    //可移動
    let legendNodes = document.querySelectorAll('.legend>div')
    // console.debug(legendNodes);
    legendNodes.forEach((legend, i) => {
        new L.Draggable(legend).enable()
    })

    //地質圖
    const tw_geology = L.tileLayer('http://140.109.82.44/assets/tw_geology/{z}/{x}/{y}.png', {
        maxZoom: 14,
        minZoom: 6,
        attribution: 'tw_geology',
        zoomControl: true, // 是否秀出 - + 按鈕
        opacity: 0.8,
        zIndex: 2000,
    })

    //CWB震度圖
    let cwb = 'http://140.109.82.44/assets/Data/2023/2023.080.01.45.19/Int/CWB/2023020a.png'
    const cwb_st = [
        [26.029563, 123.12703],
        [20.867285, 118.726656],
    ]
    let cwb_over = [
        L.imageOverlay(cwb, cwb_st, {
            opacity: 0.8,
            interactive: true, //mouse event 可觸發
        }),
    ]
    const cwb_int = L.layerGroup(cwb_over)

    //P-Alert震度圖
    let pa = 'http://140.109.82.44/assets/Data/2023/2023.080.01.45.19/Int/palert/20230321014519_contour.png'
    const pa_st = [
        [25.303, 122.003],
        [21.890895, 120.048],
    ]
    let pa_over = [
        L.imageOverlay(pa, pa_st, {
            opacity: 0.9,
            interactive: true, //mouse event 可觸發
        }),
    ]
    const pa_int = L.layerGroup(pa_over)

    // //P-Alert測站樣式
    let markers = []
    const pgaco = getPgaScale(LegendScope.pgaDomain, LegendScope.pgaRange) //取得參數
    const pgastation = (staionpp) => {
        staionpp.map((location) => {
            let pgargb = pgaco(location[5])
            return markers = L.circle([location[1], location[2]], {
                color: pgargb,
                fillOpacity: 0,
                radius: 1500,
            }).bindPopup(
                `<b>${location[0]}</b>` +
                '<hr />' +
                'network: P-Alert' +
                '<br />' +
                'Latitude: ' +
                location[1] +
                '<br />' +
                'Longitude: ' +
                location[2]
            )

        })
    }
    watch(Pstations, (inc) => { pgastation(Pstations) })

    const Sta = L.layerGroup(markers)

    //BATS測站樣式
    let bmarkers = []

    const popstation = (staionpp) => {
        bmarkers = staionpp.map((row) => {
            return L.circle([row.latitude, row.longitude], {
                color: '#3388ff',
                fillOpacity: 0,
                radius: 1500,
            }).bindPopup(
                `<b>${row.stationId}</b>` +
                '<hr />' +
                'network: BATS' +
                '<br />' +
                'Latitude: ' +
                row.latitude +
                '<br />' +
                'Longitude: ' +
                row.longitude
            )
        })

    }
    watch(Cst, (inc) => { popstation(Cst.value); L.layerGroup(bmarkers).addTo(map) })
    console.log(bmarkers)



    //地震事件
    const events = L.tileLayer('http://140.109.82.44/assets/seismicity_1990_M4/{z}/{x}/{y}.png', {
        maxZoom: 13,
        minZoom: 6,
        attribution: 'seismicity_1990_M4',
        zoomControl: true, // 是否秀出 - + 按鈕
        zIndex: 2000,
    })

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
    ).bringToBack()

    //切換
    const changeLayer = {
        OpenStreetMap: osm,
        WorldImagery: esri,
    }
    const overlayMaps = {
        Geology: tw_geology,
        'Event(2022-01-03~2023-04-09)': events,
        CWB_intensity: cwb_int,
        'P-Alert': pa_int,
    }
    L.control.layers(changeLayer).addTo(map)

    CG = (e) => {
        e.target.checked ? tw_geology.addTo(map) : tw_geology.remove(map)
    }
    CCI = (e) => {
        e.target.checked ? cwb_int.addTo(map) : cwb_int.remove(map)
    }
    CPAI = (e) => {
        e.target.checked ? pa_int.addTo(map) : pa_int.remove(map)
    }
    CPAS = (e) => {
        e.target.checked ? Sta.addTo(map) : Sta.remove(map)
    }
    Cevent = (e) => {
        e.target.checked ? events.addTo(map) : events.remove(map)
    }
})
</script>

<template>
    <div class="mapContainer" ref="mapContainer"></div>
    <div class="legend">
        <div class="pgaLegend"></div>
    </div>
    <div class="checkbox">
        <label class="container"> <input type="checkbox" @click="CG" /><span class="checkmark"></span>Geology</label>

        <label class="container"><input type="checkbox" @click="CCI" /><span class="checkmark"></span>CWB_Intensity</label>

        <label class="container"><input type="checkbox" @click="CPAI" /><span
                class="checkmark"></span>P-Alert_Intensity</label>

        <label class="container"><input type="checkbox" @click="CPAS" /><span
                class="checkmark"></span>P-Alert_stalist</label>

        <label class="container"><input type="checkbox" @click="Cevent" /><span
                class="checkmark"></span>seismicity_1990_M4</label>
    </div>
    <div class="dialog">
        <GDialog v-model="dialogState">
            <span class="text-black"> Coming soon ~ </span>
        </GDialog>
        <button class="btn btn--primary" @click="dialogState = true">Open Dialog</button>
    </div>
</template>

<style lang="css" scoped src="@/components/statics/tile.css"></style>
