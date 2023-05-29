<script setup>
import { LCircleMarker, LControlLayers, LControlScale, LImageOverlay, LMap, LPopup, LTileLayer } from "@vue-leaflet/vue-leaflet";
import $ from 'jquery';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';

import dialogUI from '@/components/dialogUI.vue';
import { LegendScope, getColorLegend, getPgaScale } from '@/components/statics/functions.js';
import { useBATS } from '@/stores/batsData.js';
import { useDialog } from '@/stores/dialog.js';
import { usePAlert } from '@/stores/pStation.js';

const { dialogState } = storeToRefs(useDialog())
const { Pstations } = storeToRefs(usePAlert())
const { Cstations } = storeToRefs(useBATS())
const { getWaveformData } = useBATS()

//create map
const map = ref(null);
const maxZoom = 13
const minZoom = 6
let zoom = ref(7)
const center = [23.742197, 120.879237]
const zoomPosition = 'topleft'
const tileProviders = [
    {
        name: 'OpenStreetMap',
        visible: true,
        url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        attribution:
            '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    },
    {
        name: 'WorldImagery',
        visible: false,
        url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        attribution:
            'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
    },
]

//Opacity 
let opacity = ref(0.5)

//Tiles
let twV = ref(false)
let tw_geology = {
    url: 'http://140.109.82.44/assets/tw_geology/{z}/{x}/{y}.png',
    maxZoom: 14,
    minZoom: 6,
    attribution: 'tw_geology',
    zIndex: 2000,
};
let seisV = ref(false)
let seismicity = {
    url: 'http://140.109.82.44/assets/seismicity_1990_M4/{z}/{x}/{y}.png',
    maxZoom: 13,
    minZoom: 6,
    attribution: 'seismicity_1990_M4',
    zIndex: 2000,
};

//Intensity_Img
let cIv = ref(false)
let cIntensity = {
    id: 'cIntensity',
    url: 'http://140.109.82.44/assets/Data/2023/2023.080.01.45.19/Int/CWB/2023020a.png',
    bounds: [[26.029563, 123.12703], [20.867285, 118.726656]],
    // interactive: true, //mouse event 可觸發
    visible: false,
};

let pIv = ref(false)
let pIntensity = {
    url: 'http://140.109.82.44/assets/Data/2023/2023.080.01.45.19/Int/palert/20230321014519_contour.png',
    bounds: [[25.303, 122.003], [21.890895, 120.048]],
    interactive: true, //mouse event 可觸發
};

//Stationlist
//BATS測站
let batsV = ref(false)

//P-Alert測站
const pgaco = getPgaScale(LegendScope.pgaDomain, LegendScope.pgaRange) //取得參數
let palertV = ref(false)

onMounted(() => {
    //PGA_scale
    let pgaScale = getPgaScale()
    let config = {
        color: pgaScale,
        title: 'PGA(gal)',
        width: 250,
        tickValues: pgaScale.domain(),
        vertical: true,
    }
    let pgaLegend = $('div.legend>.pgaLegend')
    if (pgaLegend) pgaLegend.append(getColorLegend(config))

    let legendNodes = document.querySelectorAll('.legend>div')
    legendNodes.forEach((legend, i) => {    //可移動
        new L.Draggable(legend).enable()
    })
})

</script>

<template>
    <div style="position: absolute;top: 5%;">
        Zoom: level
        <input v-model.number="zoom" type="number">
    </div>

    <LMap ref="map" v-model:zoom="zoom" :center="center" :max-zoom="maxZoom" :min-zoom="minZoom"
        style="width: 70%; position: absolute; top: 10%; bottom: 0; left: 0; right: 20%;">

        <LTileLayer v-for="tileProvider in tileProviders" :key="tileProvider.name" :name="tileProvider.name"
            :visible="tileProvider.visible" :url="tileProvider.url" :attribution="tileProvider.attribution"
            layer-type="base" />
        <LControlLayers position="topright"></LControlLayers>
        <LControlScale position="topright" :imperial="true" :metric="true"></LControlScale>


        <!-- ImageOverlay -->
        <LImageOverlay :url="cIntensity.url" :bounds="cIntensity.bounds" v-model:opacity="opacity" v-model:visible="cIv" />
        <LImageOverlay :url="pIntensity.url" :bounds="pIntensity.bounds" v-model:opacity="opacity" v-model:visible="pIv" />
        <LTileLayer :key="tw_geology.name" :name="tw_geology.name" :url="tw_geology.url"
            :attribution="tw_geology.attribution" v-model:opacity="opacity" :visible="twV" />
        <LTileLayer :key="seismicity.name" :name="seismicity.name" :url="seismicity.url"
            :attribution="seismicity.attribution" v-model:opacity="opacity" :visible="seisV" />

        <!-- Stationlist -->
        <LCircleMarker v-for="marker in Cstations" :key="marker.stationId" :visible="batsV"
            :lat-lng="[marker.lat, marker.long]" :radius="6" :color="'#3388ff'" :fillOpacity="0">
            <LPopup>
                <b>{{ marker.stationId }}</b>
                <hr />
                network: BATS
                <br />
                Latitude:{{ marker.lat }}
                <br />
                Longitude:{{ marker.long }}
                <br />
                <button @click="() => {
                    dialogState = true;
                    getWaveformData(marker.stationId)
                }">波形</button>
            </LPopup>
        </LCircleMarker>
        <LCircleMarker v-for="marker in Pstations" :key="marker[0]" :visible="palertV" :lat-lng="[marker[1], marker[2]]"
            :radius="6" :color="pgaco(marker[5])" :fillOpacity="0">
            <LPopup>
                <b>{{ marker[0] }}</b>
                <hr />
                network: P-Alert
                <br />
                Latitude:{{ marker[1] }}
                <br />
                Longitude:{{ marker[2] }}
                <br />
            </LPopup>
        </LCircleMarker>

    </LMap>
    <div class="checkbox">
        <label class="container"><input type="checkbox" v-model="cIv" /><span class="checkmark"></span>CWB_Intensity</label>
        <label class="container"><input type="checkbox" v-model="pIv" /><span
                class="checkmark"></span>P-Alert_Intensity</label>
        <label class="container"><input type="checkbox" v-model="twV" /><span
                class="checkmark"></span>Taiwan_Geology</label>
        <label class="container"><input type="checkbox" v-model="seisV" /><span class="checkmark"></span>Seismicity</label>

        <label class="container"><input type="checkbox" v-model="batsV" /><span
                class="checkmark"></span>BATS_stationlist</label>
        <label class="container"><input type="checkbox" v-model="palertV" /><span
                class="checkmark"></span>P-Alert_stationlist</label>

        <input class="opacityrange" type="range" v-model.number=opacity min="0" max="1" step="0.1" />
        <br />
        <label>Opacity:{{ opacity }}</label>
    </div>

    <div class="legend">
        <div class="pgaLegend"></div>
    </div>
    <div class="dialog">
        <dialogUI></dialogUI>
    </div>
</template >
<style lang="css" scoped src="@/components/statics/tile.css"></style>