export function faultPlot() {
    //Initialize Leaflet Layers
    let FaultLineGroup = new L.LayerGroup() //TODO:FaultLineGroup

    //Initialize Arrays
    let seismicArray = [] //TODO:seismicArray

    //Google Maps Variables
    let map //TODO:map

    //Geographical Lines Color Arrays
    let ODindex = [0, 1, 2, 14, 18, 23, 24, 25, 26, 27, 29, 30, 31, 33, 35, 40, 41] //TODO:ODindex
    let OSindex = [14, 25, 35] //TODO:OSindex
    let BDindex = [] //TODO:BDindex
    let BSindex = [4, 5, 13, 16, 17, 20, 21, 28, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58] //TODO:BSindex
    let RDindex = [3, 6, 7, 8, 9, 10, 11, 12, 15, 19, , 22, 32, 34, 36, 37, 38, 39] //TODO:RDindex
    let lineName = [
        [[0], ['山腳斷層']],
        [[1], ['湖口斷層']],
        [[2], ['新竹斷層']],
        [[3], ['新城斷層']],
        [[4], ['新城斷層']],
        [[5], ['獅潭斷層']],
        [[6], ['三義斷層']],
        [[7], ['大甲(清水)斷層']],
        [[8], ['大甲(清水)斷層']],
        [[9], ['鐵砧山斷層']],
        [[10], ['鐵砧山斷層']],
        [[11], ['屯子腳斷層']],
        [[12], ['彰化斷層']],
        [[13], ['大茅埔斷層']],
        [[14], ['九芎坑斷層']],
        [[15], ['梅山斷層']],
        [[16], ['大尖山斷層']],
        [[17], ['大尖山斷層']],
        [[18], ['木屐寮斷層']],
        [[19], ['六甲斷層']],
        [[20], ['觸口斷層']],
        [[21], ['觸口斷層']],
        [[22], ['新化斷層']],
        [[23], ['後甲里斷層']],
        [[24], ['左鎮斷層']],
        [[25], ['左鎮斷層']],
        [[26], ['左鎮斷層']],
        [[27], ['小崗山斷層']],
        [[28], ['旗山斷層']],
        [[29], '潮州斷層'],
        [[30], '潮州斷層'],
        [[31], ['恆春斷層']],
        [[32], ['米崙斷層']],
        [[33], ['嶺頂斷層']],
        [[34], ['瑞穗斷層']],
        [[35], ['奇美斷層']],
        [[36], ['玉里斷層']],
        [[37], ['玉里斷層']],
        [[38], ['池上斷層']],
        [[39], ['鹿野斷層']],
        [[40], ['利吉斷層']],
        [[41], ['利吉斷層']],
        [[42], ['車籠埔斷層及其支斷層']],
        [[43], ['車籠埔斷層及其支斷層']],
        [[44], ['車籠埔斷層及其支斷層']],
        [[45], ['車籠埔斷層及其支斷層']],
        [[46], ['車籠埔斷層及其支斷層']],
        [[47], ['車籠埔斷層及其支斷層']],
        [[48], ['車籠埔斷層及其支斷層']],
        [[49], ['車籠埔斷層及其支斷層']],
        [[50], ['車籠埔斷層及其支斷層']],
        [[51], ['車籠埔斷層及其支斷層']],
        [[52], ['車籠埔斷層及其支斷層']],
        [[53], ['車籠埔斷層及其支斷層']],
        [[54], ['車籠埔斷層及其支斷層']],
        [[55], ['車籠埔斷層及其支斷層']],
        [[56], ['車籠埔斷層及其支斷層']],
        [[57], ['車籠埔斷層及其支斷層']],
        [[58], ['車籠埔支斷層(隘寮斷層)']],
    ] //TODO:lineName

    let faultpath = '../fault2014.dat' //TODO:faultpath
    // let faultslink = '../common/php/viewfaults.php' //TODO:faultslink
    let processVectorLink = 'processVector.js' //TODO:processVectorLink

    //Loads Vectors data including seismic, interseismic, and vector data
    function loadData(file, filetype) {
        console.log(file)
        if (seismicArray) {
            for (i in seismicArray) {
                seismicArray[i].setMap(null)
            }

            seismicArray = []
            //toggleZoom();
        }

        //infoBubble.close();
        $('.leaflet-popup-close-button').click()

        $.getJSON(processVectorLink, { name: file, type: filetype }, function (data) {
            //console.log(data,filetype);
            if (filetype == 'lines') {
                processLines(data)
            }
        }).error(function (jqXHR, textStatus, errorThrown) {
            console.log('load vector error')
            //console.log( jqXHR ,  textStatus, errorThrown );
        })
    } //TODO:loadData

    //Processes line data and adds it to Google Maps
    function processLines(data) {
        let latArray = []

        for (i in data) {
            let tempArray = []

            for (j in data[i]) {
                if (data[i][j].length > 1) {
                    let temp = data[i][j].split(' ')

                    tempArray.push([temp[0], temp[1]])
                    //let line=new google.maps.LatLng(temp[0],temp[1]);
                    //tempArray.push(line);
                }
            }

            latArray.push(tempArray)
        }

        leafLines(latArray)
        //setLines(latArray);
    } //TODO: processLines
    //Changes style and color of fault lines

    function leafLines(latArray) {
        //console.log('2=',FaultLineGroup.getLayers().length);
        for (let i = 0; i < latArray.length; i++) {
            for (let j = 0; j < lineName.length; j++) {
                if (lineName[j][0] == i) {
                    let html =
                        '<div class="iw">' +
                        lineName[i][1] +
                        '<br>' +
                        // '<a href="javascript:lineInfo(' +
                        "'" +
                        lineName[i][1] +
                        "'" +
                        ')">詳細資訊 </a>' +
                        '</div>'
                }
            }
            //BLack solid lines
            for (let j = 0; j < BSindex.length; j++) {
                let temp = BSindex[j]

                if (i == temp) {
                    //let polyline = L.polyline([...]).addTo(map);
                    let Faultpolyline = new L.Polyline(latArray[i], {
                        color: 'red',
                        weight: 3,
                        smoothFactor: 1,
                    }).bindPopup(html)

                    FaultLineGroup.addLayer(Faultpolyline)
                }
            }

            //BLack dotted lines
            for (let j = 0; j < BDindex.length; j++) {
                let temp = BDindex[j]

                if (i == temp) {
                    let Line = L.polyline(latArray[i], {})
                    let pathPattern = L.polylineDecorator(Line, {
                        patterns: [
                            {
                                offset: 2,
                                repeat: 5,
                                symbol: L.Symbol.dash({ pixelSize: 2, pathOptions: { color: 'red', weight: 3 } }),
                            },
                        ],
                    }).bindPopup(html)
                    FaultLineGroup.addLayer(pathPattern)
                }
            }

            //Orange Dotted Lines
            for (let j = 0; j < ODindex.length; j++) {
                let temp = ODindex[j]

                if (i == temp) {
                    let Line = L.polyline(latArray[i], {})
                    let pathPattern = L.polylineDecorator(Line, {
                        patterns: [
                            {
                                offset: 2,
                                repeat: 7,
                                symbol: L.Symbol.dash({ pixelSize: 1.5, pathOptions: { color: 'orange', weight: 3 } }),
                            },
                        ],
                    }).bindPopup(html)
                    FaultLineGroup.addLayer(pathPattern)
                }
            }

            //Orange Solid Lines
            for (let k = 0; k < OSindex.length; k++) {
                let temp = OSindex[k]

                if (i == temp) {
                    let Faultpolyline = new L.Polyline(latArray[i], {
                        color: 'orange',
                        weight: 3,
                        smoothFactor: 1,
                    }).bindPopup(html)
                    FaultLineGroup.addLayer(Faultpolyline)
                }
            }

            //Red Dotted Lines
            for (let k = 0; k < RDindex.length; k++) {
                let temp = RDindex[k]
                if (i == temp) {
                    let Line = L.polyline(latArray[i], {})
                    let pathPattern = L.polylineDecorator(Line, {
                        patterns: [
                            {
                                offset: 2,
                                repeat: 7,
                                symbol: L.Symbol.dash({ pixelSize: 1.5, pathOptions: { color: 'red', weight: 3 } }),
                            },
                        ],
                    }).bindPopup(html)
                    FaultLineGroup.addLayer(pathPattern)
                }
            }

            FaultLineGroup.addTo(map)

            //lineArray.push(firstpolyline);
        }
        //console.log('1=',FaultLineGroup.getLayers().length);
    } //TODO:leafLines

    //Find fault line information each time a line is clicked
    function lineInfo(name) {
        $.getJSON(faultslink, { linename: name }, function (linedata) {
            if (linedata[2].length > 0) {
                let image1div = '<img src=common/img/active_fault/tn_' + linedata[2] + '.jpg>'
            } else if (linedata[2].length == 0) {
                let image1div = ''
            }

            if (linedata[3].length > 0) {
                let image2div = '<img src=common/img/active_fault/tn_' + linedata[3] + '.jpg>'
            } else if (linedata[3].length == 0) {
                let image2div = ''
            }

            if (linedata[4].length > 0) {
                let image3div = '<img src=common/img/active_fault/tn_' + linedata[4] + '.jpg>'
            } else if (linedata[4].length == 0) {
                let image3div = ''
            }

            if (linedata[5].length > 0) {
                let text1div = linedata[5]
            } else if (linedata[5].length == 0) {
                let text1div = ''
            }

            if (linedata[6].length > 0) {
                let text2div = linedata[6]
            } else if (linedata[6].length == 0) {
                let text2div = ''
            }

            if (linedata[7].length > 0) {
                let text3div = linedata[7]
            } else if (linedata[7].length == 0) {
                let text3div = ''
            }

            let combineddiv1 = image1div + '<br> ' + text1div + '<br>'
            let combineddiv2 = image2div + '<br> ' + text2div
            ;+'<br>'

            if (text3div == '' && image3div == '') {
                let combineddiv3 = ''
            } else {
                let combineddiv3 = image3div + '<br>' + text3div
            }

            $('#FaultModal').modal('show')

            $('.modal-body').html(
                "<p> Source: &nbsp;  <img src='common/img/active_fault/PoweredBy_CGS.png'> </p><p>" +
                    name +
                    '</p>  <p>' +
                    linedata[0] +
                    '</p> <p>' +
                    linedata[1] +
                    '</p> <p>' +
                    combineddiv1 +
                    '</p> <p>' +
                    combineddiv2 +
                    combineddiv3 +
                    ' </p>' +
                    "<p> Source: &nbsp;  <img src='common/img/active_fault/PoweredBy_CGS.png'></p>"
            )
        }).error(function (jqxhr, textStatus, error) {
            console.log('lineinfo error')
            //console.log(jqxhr, textStatus, error);
        })
    } //TODO: lineInfo

    //Closes fault line div
    // function closelineBox() {
    //     $('#linebox').hide()
    // }

    //Toggles fault lines
    function toggleLines() {
        if (document.getElementById('lines').checked == true) {
            if (FaultLineGroup.getLayers().length == 0) {
                loadData(faultpath, 'lines')
            }
            if (FaultLineGroup.getLayers().length != 0) {
                FaultLineGroup.addTo(map)
            }
        } else if (document.getElementById('lines').checked == false) {
            if (FaultLineGroup.getLayers().length != 0) {
                map.removeLayer(FaultLineGroup)
                //lineArray[i].setMap(null);
            }
        }
    } //TODO:toggleLines

    return leafLines
}
