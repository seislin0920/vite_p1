<script setup>
    import { getDepthScale, getMLScale, getPgaScale, getColorLegend } from "@/components/statics/functions.js";
    import L from 'leaflet';
    import 'leaflet/dist/leaflet.css';
    import $ from 'jquery';
    import { onMounted, ref } from 'vue';
    
    const mapContainer = ref(null);
    onMounted(() => {
      const map = L.map(mapContainer.value, {
        center: [23.742197, 120.879237],
        zoom: 7,
        });
      const osm = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 13,
        minZoom: 6,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',// 商用時必須要有版權出處
        zoomControl: true , // 是否秀出 - + 按鈕
      }).addTo(map);

      //地圖監聽事件
      const popup = L.popup();
      map.on("click", (e) => {
        popup
          .setLatLng(e.latlng)
          .setContent("You clicked the map at " + e.latlng.toString() + ".")
          //toString陣列中的每個元素用逗號串接起來成為一個字串，並回傳該字串
          .openOn(map);
      });

        //PGA
        let pgaScale = getPgaScale();
        let config = {
            color: pgaScale,
            title: "PGA",
            width: 250,
            tickValues: pgaScale.domain(),
            vertical: true
        };
        // console.debug(d3.schemeRdBu[9])
        let pgaLegend = document.querySelector(".pgaLegend.vertical");
        if (pgaLegend) pgaLegend.append(getColorLegend(config));

      //地質圖
      const tw_geology = L.tileLayer('src/assets/tw_geology/{z}/{x}/{y}.png', {
          maxZoom: 14,
          minZoom: 6,
          attribution: 'tw_geology',
          zoomControl: true , // 是否秀出 - + 按鈕
          opacity : 0.4,
      }).bringToFront(map);

      // let imageUrl = '/assets/geology.png';
      // const imageBounds = [
      //   [25.618598, 122.133550],
      //   [21.770104, 118.950001]];
      // let overlay = [
      //     L.imageOverlay(imageUrl, imageBounds, {
      //                     opacity : 0.4,
      //                     interactive: true, //mouse event 可觸發
      //                     }),
      //     L.rectangle(imageBounds, {
      //     weight: 1,
      //     color: "black",
      //     fillColor: "none",
      //     }),
      //     ]
      // const Geology = L.layerGroup(overlay);

      //cwb震度圖
      let cwb = 'src/assets/Int/CWB/2023020a.png';
      const cwb_st = [
          [26.029563, 123.127030],
          [20.867285, 118.726656]
          ];
      let cwb_over = [
          L.imageOverlay(cwb, cwb_st , {
                          opacity : 0.4,
                          interactive: true, //mouse event 可觸發
                          }),]
      const cwb_int = L.layerGroup(cwb_over);

      //P-Alert震度圖
      let pa = 'src/assets/Int/palert/20230321014519_contour.png';
      const pa_st = [
          [25.303000, 122.003000],
          [21.890895, 120.048000]
          ];
      let pa_over = [
          L.imageOverlay(pa, pa_st , {
                          opacity : 0.7,
                          interactive: true, //mouse event 可觸發
                          }),]
      const pa_int = L.layerGroup(pa_over);

      let tmpData = [];
      $.ajax({
          url: 'src/assets/BATS_stalist.txt',
          method: 'Get', //request method
          dataType: 'text', //不設定會自動判斷
          async: false, //async 同步請求
          success: result => {
              let tmp = result.split("\n");                  
                  tmp.forEach(row => {
                      if (row != '') {
                          let col = row.trim().split(/\s+/); 
                          tmpData.push(col);
                          }})},
          error: function (jqXHR, textStatus, errorThrown) {
              // console.error(jqXHR, textStatus, errorThrown);
              console.error(jqXHR, textStatus, errorThrown)},
      });
      let stations = [];
      for(var i = 1; i<tmpData.length;i++){
          stations.push(tmpData[i]);
      };
      //測站+樣式array
      let markers = [];
      stations.forEach(location =>{
          markers.push(L.circle([location[1],location[2]],{
              color: "blue",
              fillOpacity: 1,
              radius: 1200,
            }));
      });
      const Sta = L.layerGroup(markers);

      //地震事件
      const events = L.tileLayer('src/assets/events/{z}/{x}/{y}.png', {
          maxZoom: 13,
          minZoom: 6,
          attribution: '2022-01-03~2023-04-09',
          zoomControl: true , // 是否秀出 - + 按鈕
      }).bringToFront(map);
      



      //切換
      const changeLayer = {
          "OpenStreetMap" : osm,
      };
      const overlayMaps = { 
          "Geology" : tw_geology,
          "BATS_stalist" : Sta,
          "Event(2022-01-03~2023-04-09)" : events,
          "CWB_intensity" : cwb_int,
          "P-Alert" : pa_int,
          
      };
      L.control.layers(changeLayer, overlayMaps).addTo(map);
    });

    
</script>


<template>
  <div class="mapContainer" ref="mapContainer" style="height:600px; width:400px"></div>
</template>