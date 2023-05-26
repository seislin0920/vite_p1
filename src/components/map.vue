<script setup>
import { LControlLayers, LControlScale, LImageOverlay, LLayerGroup, LMap, LTileLayer } from "@vue-leaflet/vue-leaflet";
import $ from 'jquery';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';

import { getColorLegend, getPgaScale } from '@/components/statics/functions.js';
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
let visible = ref(false)
//Tiles
let tw_geology = {
    url: 'http://140.109.82.44/assets/tw_geology/{z}/{x}/{y}.png',
    maxZoom: 14,
    minZoom: 6,
    attribution: 'tw_geology',
    opacity: opacity.value,
    zIndex: 2000,
};
let sesmicity = {
    url: 'http://140.109.82.44/assets/seismicity_1990_M4/{z}/{x}/{y}.png',
    maxZoom: 13,
    minZoom: 6,
    attribution: 'seismicity_1990_M4',
    opacity: 1,
    zIndex: 2000,
};

//Intensity_Img
let cIntensity = {
    id: 'cIntensity',
    url: 'http://140.109.82.44/assets/Data/2023/2023.080.01.45.19/Int/CWB/2023020a.png',
    bounds: [[26.029563, 123.12703], [20.867285, 118.726656]],
    // interactive: true, //mouse event 可觸發
    visible: false,
};

let pIntensity = {
    url: 'http://140.109.82.44/assets/Data/2023/2023.080.01.45.19/Int/palert/20230321014519_contour.png',
    bounds: [[25.303, 122.003], [21.890895, 120.048]],
    interactive: true, //mouse event 可觸發
};

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
        <LControlLayers position="topright"></LControlLayers>
        <LTileLayer v-for="tileProvider in tileProviders" :key="tileProvider.name" :name="tileProvider.name"
            :visible="tileProvider.visible" :url="tileProvider.url" :attribution="tileProvider.attribution"
            layer-type="base" />
        <LControlScale position="topright" :imperial="true" :metric="true"></LControlScale>


        <!-- <LLayerGroup layer-type="overlay" name="CWB_Intensity" v-model:visible="cIntensity.visible"> -->
        <LImageOverlay v-model:visible="visible" :url="cIntensity.url" :bounds="cIntensity.bounds"
            v-model:opacity="opacity">
        </LImageOverlay>
        <!-- </LLayerGroup> -->
    </LMap>
    <div class="checkbox">
        <label class="container"><input type="checkbox" v-model="visible" /><span
                class="checkmark"></span>P-Alert_Intensity</label>

        <input class="opacityrange" type="range" v-model.number=opacity min="0" max="1" step="0.1" />
        <br />
        <label>Opacity:{{ opacity }}</label>
    </div>

    <div class="legend">
        <div class="pgaLegend"></div>
    </div>
</template >
<style lang="css" scoped src="@/components/statics/tile.css"></style>