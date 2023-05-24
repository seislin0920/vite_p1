<script >
import { LControlScale, LTileLayer, LMap, LMarker, LPopup, LImageOverlay } from "@vue-leaflet/vue-leaflet";
import "leaflet/dist/leaflet.css";

export default {
    name: 'myMap',
    components: {
        LMap,
        LTileLayer,
        LControlScale,
        LMarker,
        LPopup,
        LImageOverlay,
    },
    data() {
        return {
            maxZoom: 13,
            minZoom: 6,
            zoom: 7.2,
            center: [23.742197, 120.879237],
            openmap: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',

            marker: [23.5, 121],
            text: "你好",
            //esri
            esri: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
            options: {
                position: 'topright',
                width: 200,
                height: 175,
            },
            //cwb震度圖
            cwbIntensity: 'http://140.109.82.44/assets/Data/2023/2023.080.01.45.19/Int/CWB/2023020a.png',
            cwb_bounds: [[26.029563, 123.12703], [20.867285, 118.726656]],
            //P-Alert震度圖
            paIntensity: 'http://140.109.82.44/assets/Data/2023/2023.080.01.45.19/Int/palert/20230321014519_contour.png',
            pa_bounds: [[25.303, 122.003], [21.890895, 120.048]],

        };
    },
};
</script>

<template>
    <div style="height:600px; width:700px">
        <l-map ref="map" v-model:zoom="zoom" :center="center" :maxZoom="maxZoom" :minZoom="minZoom">
            <l-tile-layer :url="url" :attribution="attribution" layer-type="base" name="OpenStreetMap"></l-tile-layer>
            <l-control-scale position="topright" :imperial="true" :metric="true"></l-control-scale>
            <!-- <l-image-overlay :url="paIntensity" :bounds="pa_bounds"></l-image-overlay> -->
            <l-marker :lat-lng="marker">
                <l-popup :content="text"></l-popup>
            </l-marker>
        </l-map>
    </div>
</template >
<style></style>