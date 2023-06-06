<script setup>
import {
    LCircleMarker, LControlLayers, LControlScale,
    LIcon,
    LImageOverlay, LMap,
    LMarker,
    LPolyline, LPopup, LTileLayer
} from "@vue-leaflet/vue-leaflet";
import $ from 'jquery';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';

import dialogUI from '@/components/dialogUI.vue';
import { LegendScope, getColorLegend, getPgaScale } from '@/components/statics/functions.js';
import { useBATS } from '@/stores/batsData.js';
import { useDialog } from '@/stores/dialog.js';
import { usefaultPlot } from '@/stores/faultPlot.js';
import { usePAlert } from '@/stores/pStation.js';

const { dialogState } = storeToRefs(useDialog())
const { Pstations } = storeToRefs(usePAlert())
const { Cstations } = storeToRefs(useBATS())
const { getWaveformData } = useBATS()
const { faults } = storeToRefs(usefaultPlot())
let faultV = ref(false)
// console.log(tmp.value);

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

//Focal Mechanism
let pathFocal = 'http://140.109.82.44/assets/Data/2023/2023.080.01.45.19/FM'
let eTime = '2023.080.01.45'
let fAutoBATS = `${pathFocal}/AutoBATS/${eTime}_beachball.png`
let vAutoBATS = ref(false)
let fRMT = `${pathFocal}/RMT/${eTime}.meca.png`
let vRMT = ref(false)
let fWP = `${pathFocal}/WP/CMT.png`
let vWP = ref(false)
let focal = [23.65, 121.31]
let iconSize = [40, 40] // size of the icon
let iconAnchor = [18, 18] // point of the icon which will correspond to marker's location




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
            :attribution="tw_geology.attribution" :z-index="500" v-model:opacity="opacity" :visible="twV" />
        <LTileLayer :key="seismicity.name" :name="seismicity.name" :url="seismicity.url"
            :attribution="seismicity.attribution" :z-index="500" v-model:opacity="opacity" :visible="seisV" />

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

        <!-- Faults -->
        <div v-for="fault in faults" :key="fault.name">
            <LPolyline v-if="fault.class == 1" :color="'black'" :weight="2.5" :lat-lngs="fault.latlong" :visible="faultV">
                <LPopup>
                    <b>{{ fault.name.join("") }}</b> <!--join鎮裂變字串  每個元素分隔("")-->
                    <p>Comming soon ...</p>
                    <br />
                    <a>詳細資訊</a>
                </LPopup>
            </LPolyline>
            <LPolyline v-if="fault.class == 2" :color="'black'" :weight="2.5" :dashArray="'5,5'" :dashOffset="'2'"
                :lat-lngs="fault.latlong" :visible="faultV">
                <LPopup>
                    <b>{{ fault.name.join("") }}</b> <!--join鎮裂變字串  每個元素分隔("")-->
                    <p>Comming soon ...</p>
                    <br />
                    <a>詳細資訊</a>
                </LPopup>
            </LPolyline>
            <LPolyline v-if="fault.class == 3" :color="'#FFA52F'" :weight="2.5" :dashArray="'5,5'" :dashOffset="'2'"
                :lat-lngs="fault.latlong" :visible="faultV">
                <LPopup>
                    <b>{{ fault.name.join("") }}</b> <!--join鎮裂變字串  每個元素分隔("")-->
                    <p>Comming soon ...</p>
                    <br />
                    <a>詳細資訊</a>
                </LPopup>
            </LPolyline>
            <LPolyline v-if="fault.class == 4" :color="'#FFA52F'" :weight="2.5" :lat-lngs="fault.latlong" :visible="faultV">
                <LPopup>
                    <b>{{ fault.name.join("") }}</b> <!--join鎮裂變字串  每個元素分隔("")-->
                    <p>Comming soon ...</p>
                    <br />
                    <a>詳細資訊</a>
                </LPopup>
            </LPolyline>
            <LPolyline v-if="fault.class == 5" :color="'red'" :weight="2.5" :dashArray="'5,5'" :dashOffset="'2'"
                :lat-lngs="fault.latlong" :visible="faultV">
                <LPopup>
                    <b>{{ fault.name.join("") }}</b> <!--join鎮裂變字串  每個元素分隔("")-->
                    <p>Comming soon ...</p>
                    <br />
                    <a>詳細資訊</a>
                </LPopup>
            </LPolyline>
        </div>

        <!-- Focal Mechanism -->
        <LMarker :visible="vAutoBATS" :lat-lng="focal">
            <LIcon :icon-url="fAutoBATS" :icon-size="iconSize" :icon-anchor="iconAnchor"></LIcon>
        </LMarker>
        <LMarker :visible="vRMT" :lat-lng="focal">
            <LIcon :icon-url="fRMT" :icon-size="iconSize" :icon-anchor="iconAnchor"></LIcon>
        </LMarker>
        <LMarker :visible="vWP" :lat-lng="focal">
            <LIcon :icon-url="fWP" :icon-size="iconSize" :icon-anchor="iconAnchor"></LIcon>
        </LMarker>

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
        <label class="container"><input type="checkbox" v-model="faultV" /><span class="checkmark"></span>Faults</label>

        <input class="opacityrange" type="range" v-model.number=opacity min="0" max="1" step="0.1" />
        <br />
        <label>Opacity:{{ opacity }}</label>

        <div style="position: relative; margin-top: 20%">
            <h2 style="font-size: 2ch;">Focal Mechanism</h2>
            <label class="container"><input type="checkbox" v-model="vAutoBATS" /><span
                    class="checkmark"></span>AutoBATS</label>
            <label class="container"><input type="checkbox" v-model="vRMT" /><span class="checkmark"></span>RMT</label>
            <label class="container"><input type="checkbox" v-model="vWP" /><span class="checkmark"></span>WP</label>
        </div>

    </div>

    <div class="legend">
        <div class="pgaLegend"></div>
    </div>
    <div class="dialog">
        <dialogUI></dialogUI>
    </div>
</template >
<style lang="css" scoped src="@/components/statics/tile.css"></style>