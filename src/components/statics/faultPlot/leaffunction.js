//Initialize Leaflet Layers
var FaultLineGroup = new L.LayerGroup()
var eqMarker = new L.LayerGroup()
var CMTMarker = new L.LayerGroup()
var InterSeismicMarker = new L.LayerGroup()
var CoSeismicMarker = new L.LayerGroup()
var StationMarker = new L.LayerGroup()

var gridLayer = new L.LayerGroup()
//var geoMapLayer = new L.imageOverlay();
var IntMapLayer = new L.imageOverlay()
var PalertMarker = new L.LayerGroup()
//var SeismicityLayer = L.tileLayer('https://tesis.earth.sinica.edu.tw/testimage/seisMapTiles35_20180315/{x}-{y}-{z}.png',{minZoom:7,maxZoom:13,bounds:L.latLngBounds(L.latLng(25.5, 119.5), L.latLng(21.5, 123))});
var SeismicityLayer = L.tileLayer(
    'https://tesis.earth.sinica.edu.tw/testimage/seisMapVer20211026/M4_1990_2021/{z}/{x}/{y}.png',
    { minZoom: 7, maxZoom: 13, zIndex: 999, bounds: L.latLngBounds(L.latLng(25.5, 119.5), L.latLng(21.5, 123)) }
)
var geoMapLayer = L.tileLayer('https://tesis.earth.sinica.edu.tw/testimage/GeoMap/tw_geology/{z}/{x}/{y}.png', {
    minZoom: 7,
    maxZoom: 13,
    zIndex: 998,
    bounds: L.latLngBounds(L.latLng(25.5, 119.5), L.latLng(21.5, 123)),
})

//Initialize Arrays
var seismicArray = []
var vectorsArray = []
var colorArray = []
var markersArray = []
var infoBubble = []
var lineArray = []
var imageArray = []
var stationList = []
var iconArray = []
var accumArray = []
var stationArray = []
var omsArray = []
var markerData = []
var indexArray = []
var pgamarkersarray = []
//var ballType="newbats";
var yeargif
//Palert Animation Variables
var gifspeed
var videospeed
var giflink1
var giflink2
var giflink3
var videoname
var videolinkmp41
var videolinkmp42
var videolinkmp43

//Initialize Variables
var counter = 0

var intmaplink

//Google Maps Variables
var map
var lat = 0
var lng = 0
var pathColor
//var grid;
var line
var latestEq
var cmtimg
var eqcoord
var currZoom
var iconMarker
var oms
var spideredMarkers
var opacity = 0
var pgvhtml = ''
var pgvmaplink
var eqlist = ''
var markerid = ''
var currOverlay
var zoomLevel
var currZoom = null
var stationDesc
var selectedOverlay = 'cwb'
var selectedStation = 'all'
var gpsFileCounter = 3
var marker1
var counter1 = 1
var backDate = new Date()
var init1 = true
var currStation
var eqMarker
var haswaveform = ''
var firstdate
var seconddate
var txtColor

//List Sorting Variables
var timeZone = 'TPE'
var sortOrder = 'DESC'
var sortType = 'time'
var timeBoolean = false
var mlBoolean = false
var zoneBoolean = false

//Taipei Coordinates
//var taipei=new google.maps.LatLng(23.5 , 120.92747);

//Geographical Lines Color Arrays
var ODindex = [0, 1, 2, 14, 18, 23, 24, 25, 26, 27, 29, 30, 31, 33, 35, 40, 41]
var OSindex = [14, 25, 35]
var BDindex = []
var BSindex = [4, 5, 13, 16, 17, 20, 21, 28, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58]
var RDindex = [3, 6, 7, 8, 9, 10, 11, 12, 15, 19, , 22, 32, 34, 36, 37, 38, 39]
var lineName = [
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
]

//Link Locations
var geoimg = 'common/img/TWgeomap_transmaponly.png'
var gpsFile = '../../tesis/vectors/coseis'
var vectorFile = '../../tesis/interseismic/2008_A.H'
//var vectorFileR="../../tesis/vectors/Coseismic/2016/201602051957/cosdips1.H"

var vectorFileR = '../../tesis/vectors/S01R_2007.S0.5.map'
var newestIcon = 'newesticon'
var interseismic = 'interseismic'
var intmaploc = '../all/'
var vectorPath = '../vectors/'
var blueicon = '../common/img/blue.png'
var redicon = '../common/img/red.png'
var csimg = '../common/img/coseis.jpg'
var getidurl = '../common/php/getid.php'
var starloc = '../common/img/star_gold_256.png'
var faultpath = '../../data/fault2014.dat'
var batsstationfile = '../../data/BATS_Stations2018.txt'
var accumfileurl = 'https://palert.earth.sinica.edu.tw/common/pga/staticpga/'
var faultslink = '../common/php/viewfaults.php'
var checkVideoLink = '../common/php/checkVideo.php'
var processVectorLink = '../common/php/processVector.php'
var processdataurl = '../common/php/processdatanew.php'
var getstationurl = '../common/php/getStations.php'
var sorturl = '../common/php/sort.php'
var InterSeismicFileName2 = '../../tesis/vectors/Interseismic/2018mid.txt'
var InterSeismicFileName = 'http://tgm.earth.sinica.edu.tw/data/Interseismic/_Velocity2018.txt'
backDate.setMonth(backDate.getMonth() - 1)

//Intensity Color table for Palert
var colorTable = [
    [1, 255, 255, 255],
    [1.5, 227, 255, 227],
    [2, 136, 255, 136],
    [2.5, 28, 255, 28],
    [3, 108, 255, 0],
    [3.5, 255, 255, 0],
    [4, 255, 170, 0],
    [4.5, 255, 90, 0],
    [5, 255, 36, 0],
    [5.5, 245, 0, 0],
    [6, 186, 0, 0],
    [6.5, 153, 12, 51],
    [7, 153, 44, 178],
    [7.5, 153, 41, 165],
    [8, 153, 51, 204],
]

//Initialize jQuery UI Functions

//No Data Found Popup

$('#nodatadialog').dialog({
    autoOpen: false,
})

// Popup for Palert Video and GIF
$('#videoplayerdialog').dialog({
    autoOpen: false,

    width: 620,
    height: 975,
})

$('#tabs').tabs({
    fx: {
        opacity: 'toggle',
        duration: 300,
    },
})

//Geographcial Map Slider
$('#slider1').slider({
    range: 'min',
    min: 0,
    max: 100,
    value: 35,
    change: function (event, ui) {
        //setOpacity(geoimg,ui.value/100);
        console.log('123=', ui.value / 100)
        setOpacityLeaf(geoMapLayer, ui.value / 100)
    },
})

//CWB, PGV Map Slider
$('#slider2').slider({
    range: 'min',
    min: 0,
    max: 100,
    value: 35,
    change: function (event, ui) {
        console.log('cwb=', ui.value / 100)
        setOpacity(currOverlay, ui.value / 100)
    },
})

//Vector Length Slider
$(function () {
    $('#slider3').slider({
        range: 'min',
        min: 1,
        max: 20,
        value: 1,
        change: function (event, ui) {
            console.log('leagth=', ui.value / 100)
            loadData(vectorPath + ui.value + 'km.H', 'vector')
            $('#amount').val(ui.value)
        },
    })
    //Changes Slider Text
    $('#amount').val($('#slider3').slider('value'))
})

//Overlay Slider
$(function () {
    $('#slider4').slider({
        range: 'min',
        min: 0,
        max: 100,
        value: 35,
        change: function (event, ui) {
            setOpacity(currOverlay, ui.value / 100)
        },
    })
})

//Filter Intensity Slider
$('#intensityslider').slider({
    range: true,
    min: 0,
    max: 7,
    step: 0.1,
    values: [0, 7],
    slide: function (event, ui) {
        $('#intensitylabel').val(ui.values[0] + ' - ' + ui.values[1])

        for (i in markersArray) {
            if (markersArray[i].markerdata.cwb.ML > ui.values[1] || markersArray[i].markerdata.cwb.ML < ui.values[0]) {
                markersArray[i].setMap(null)
            } else markersArray[i].setMap(map)
        }
    },
})

//Changes Text Values of Intensity Slider
$('#intensitylabel').val($('#intensityslider').slider('values', 0) + ' - ' + $('#intensityslider').slider('values', 1))

//Filter Depth Slider
$('#depthslider').slider({
    range: true,
    min: 0,
    max: 120,
    step: 10,
    values: [0, 1000],
    slide: function (event, ui) {
        $('#depthlabel').val(ui.values[0] + ' - ' + ui.values[1])

        for (i in markersArray) {
            if (
                markersArray[i].markerdata.cwb.Depth > ui.values[1] ||
                markersArray[i].markerdata.cwb.Depth < ui.values[0]
            ) {
                markersArray[i].setMap(null)
            } else markersArray[i].setMap(map)
        }
    },
})

//Changes Text Value of Depth Slider
$('#depthlabel').val($('#depthslider').slider('values', 0) + ' - ' + $('#depthslider').slider('values', 1))

//Fault Lines DIV draggabke
$(function () {
    $('#linebox').draggable()
    $('#scale').draggable()
})

//Datepicker Dialog triggered by right button on left side of header
$('#dialog2').dialog({
    autoOpen: false,
    height: 380,
    width: 600,
    modal: true,
})

//Shows Palert Map
$('#dialog3').dialog({
    autoOpen: false,
    height: 660,
    width: 480,
    modal: true,
})

//Filter Dialog
$('#dialog4').dialog({
    autoOpen: false,
    height: 300,
    width: 400,
    modal: true,
})

//Initialize Left Datepicker
$('#datepicker').datepicker({
    changeYear: true,
    monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
    dayNamesMin: ['一', '二', '三', '四', '五', '六', '七'],
})
$('#datepicker').datepicker($.datepicker.regional['zh-TW'])

$('#datepicker').datepicker('setDate', new Date(backDate))
$('#datepicker').datepicker('option', 'dateFormat', 'yy-mm-dd')
$('#datepicker').datepicker('option', 'maxDate', '+0d')
$('#datepicker').datepicker('option', 'minDate', '2010-04-25')

//Initialize Right Datepicker
$('#datepicker1').datepicker({
    changeYear: true,
    monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
    dayNamesMin: ['一', '二', '三', '四', '五', '六', '七'],
})
$('#datepicker1').datepicker('setDate', new Date())
$('#datepicker1').datepicker('option', 'dateFormat', 'yy-mm-dd')
$('#datepicker1').datepicker('option', 'maxDate', '+0d')
$('#datepicker1').datepicker('option', 'minDate', '2010-04-25')

$('#datepicker1').datepicker($.datepicker.regional['zh-TW'])

//Hide buttons on load
$('#cmtbuttons').hide()
$('#animationbutton').hide()

$('#dateradio').buttonset()

//Called every 10 minutes to update eartquake data
function autoUpdate() {
    setDate(currentTimeLength)
    console.log('Auto Update at ' + new Date())
}

//Change time zone
function setTimeZone() {
    zoneBoolean = !zoneBoolean

    if (zoneBoolean == true) {
        timeZone = 'UTC'
        sortList(sortType, true)
    } else if (zoneBoolean == false) {
        timeZone = 'TPE'
        sortList(sortType, true)
    }
}

//Sets earthquake list each time new data is called
function sortList(type, timezone, buttonskip) {
    if (buttonskip != 'skip') {
        sortType = type

        if (timezone == true) {
        } else {
            if ($('#' + type + 'button span').hasClass('glyphicon glyphicon-arrow-up') == true) {
                $('#' + type + 'button span').removeClass('glyphicon glyphicon-arrow-up')
                $('#' + type + 'button span').addClass('glyphicon glyphicon-arrow-down')
                sortOrder = 'DESC'
            } else if ($('#' + type + 'button span').hasClass('glyphicon glyphicon-arrow-up') == false) {
                $('#' + type + 'button span').removeClass('glyphicon glyphicon-arrow-down')
                $('#' + type + 'button span').addClass('glyphicon glyphicon-arrow-up')
                sortOrder = 'ASC'
            }
        }
    }

    $.getJSON(sorturl, { firstid: id1, secondid: id2, type: sortType, order: sortOrder, time: timeZone })
        .done(function (data) {
            $('#eqlist').html('')
            for (i in data) {
                setTextColor(data[i].ML)
                var str = data[i].Time.substring(0, 5) //只取字串前5bytes
                $('#eqlist').append(
                    "<div id='listrow'><font color=" +
                        txtColor +
                        '>' +
                        data[i].ML +
                        '</font> &nbsp;' +
                        '<a href="javascript:myclick(' +
                        "'" +
                        data[i].CWB_ID +
                        "'" +
                        ')">' +
                        "<span class='eqdate'>" +
                        data[i].Date +
                        '</span>' +
                        '&nbsp;' +
                        str +
                        '&nbsp; &nbsp; ' +
                        data[i].Depth +
                        '</a></div>'
                )
            }

            if (timeZone == 'UTC') {
                $('#currtimezone').html('標準時間(UTC)')
            }

            if (timeZone == 'TPE') {
                $('#currtimezone').html('台北時間(UTC+8)')
            }
        })
        .error(function () {
            console.log('sort error')
        })

    //$("#markerinfobox").html();
    //$("#markerinfobox").hide();
}

//Set Intensity Color on list
function setTextColor(ml) {
    if (ml < 3.5) {
        txtColor = 'grey'
    } else if (ml >= 3.5 && ml < 5.0) {
        txtColor = 'orange'
    } else if (ml >= 5.0) {
        txtColor = 'red'
    }
}

//Updates current time every minute
function currentTime() {
    var currentTime = new Date()
    var day = currentTime.getDate()
    var month = currentTime.getMonth() + 1
    var year = currentTime.getFullYear()
    var hours = currentTime.getHours()
    var minutes = currentTime.getMinutes()
    var formattedTime = year + '/' + month + '/' + day + ' ' + hours + ':' + minutes
    document.getElementById('time').innerHTML = formattedTime
    setTimeout('currentTime()', 1000)
}

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
        if (filetype == 'stations') {
            setStations(data)
        }

        if (filetype == 'lines') {
            processLines(data)
        }

        if (filetype == 'seismic' || filetype == 'vector') {
            processVector(data, filetype)
        }
    }).error(function (jqXHR, textStatus, errorThrown) {
        console.log('load vector error')
        //console.log( jqXHR ,  textStatus, errorThrown );
    })
}

//Process marker data
function showMarkers(data) {
    if (data.length == 0) {
        $('#nodatadialog').dialog('open')
    } else if (data.length > 0) {
        for (i in markersArray) {
            markersArray[i].setMap(null)
        }

        markersArray = []
        $.each(data, function (key, value) {
            var date = value.cwb.Date
            var time = value.cwb.Time
            $('#infotime').html('Information Time: ' + '<br><h5>' + date + time + '</h5>')
            setTextColor(value.cwb.ML)
            var html =
                '<div id="markerwindow"> <b><font color="' +
                txtColor +
                '">' +
                value.cwb.ML +
                '</font>&nbsp;' +
                date +
                '<b> &nbsp;' +
                '<img src=' +
                value.gcap.ballimg +
                " alt='CMT' height='15' width='15'>" +
                '<br>'
            //var html='<div class="iw"> <b><font color="' + txtColor + '">' + value.cwb.ML + "</font>&nbsp;" + date + '<b> &nbsp;' + "<img src=" + value.gcap.ballimg + " alt='CMT' height='15' width='15'>" + "<br>";

            if (key == data.length - 1) {
                var markertype = 'newest'
            } else {
                var markertype = 'marker'
            }

            addMarker(data[key], markertype, html)
        })

        markerid = markersArray[markersArray.length - 1]
        videoname = markerid.markerdata.cwb.timestring
        yeargif = videoname.substr(0, 4)
        showMarkerInfoBox(markerid)
        setOMS()
        if (markersArray.length > 5) {
            checkSingle()
        }

        //sortList(sortType,sortOrder,timeZone);
    }
}
function seteqMarkerLeaf(data) {
    //layer eqMarker
    $.each(data, function (key, value) {
        //console.log("setmarker",value);
        var date = value.cwb.Date
        var time = value.cwb.Time
        //console.log("setmarker",date,time);
        $('#infotime').html('Information Time: ' + '<br><h5>' + date + time + '</h5>')
        setTextColor(value.cwb.ML)
        var html =
            '<div id="markerwindow"> <b><font color="' +
            txtColor +
            '">' +
            value.cwb.ML +
            '</font>&nbsp;' +
            date +
            '<b> &nbsp;' +
            '<img src=' +
            value.gcap.ballimg +
            " alt='CMT' height='15' width='15'>" +
            '<br>'
        if (key == data.length - 1) {
            var markertype = 'newest'
        } else {
            var markertype = 'marker'
        }
        addMarkerLeaf(map, value, 'newest', html)
    })
}
//Initializes Spidered Array
function setOMS() {
    for (i in markersArray) {
        if (oms) {
            oms.addMarker(markersArray[i])
        }
    }
}

//Change Icon settinsg
function setIcon(icontype, index) {
    var iconOptions = [{ icon: icontype, offset: '100%', repeat: '5px' }]

    lineArray[index].setOptions({ icons: iconOptions })
}

//Removes line from map
function clearLine(index) {
    if (lineArray[index]) {
        lineArray[index].setMap(null)
        lineArray[index] = null
    }
}

//Adds line to Map
function addLine(index, path, opacity, icontype, color) {
    line = new google.maps.Polyline({
        type: 'line',
        id: index,
        path: path,
        strokeColor: color,
        strokeOpacity: opacity,

        icons: [
            {
                icon: icontype,
                offset: '100%',
                repeat: '5px',
            },
        ],
        map: map,
    })

    lineArray.push(line)
}
function addMarkerLeaf(map, data, objecttype, html, balltype) {
    //Adds Earthquake marker
    if (objecttype == 'marker' || objecttype == 'newest') {
        if (objecttype == 'marker') {
            color = 'black'
            weight = 2
            sopacity = 0.2
        } else if (objecttype == 'newest') {
            color = 'red'
            weight = 2
            sopacity = 1
        }

        var depth = data.cwb.Depth
        var markercolor = getDepthColor(depth)

        //	.addLayer(eqMarker);
        var CircleMarker = new L.circleMarker(new L.LatLng(data.cwb.Latitude, data.cwb.Longitude), {
            radius: data.cwb.ML * 2.5,
            color: color,
            fillColor: markercolor,
            fillOpacity: 0.7,
            weight: weight,
            opacity: sopacity,
            className: eqMarker,
        })

        eqMarker.addLayer(CircleMarker)
        eqMarker.addTo(map)
    } else if (objecttype == 'beachball') {
        var CMTimage
        if (balltype == 'gcap') {
            CMTimage = data.gcap.ballimg
        } else if (balltype == 'historic') {
            CMTimage = data.nearbats.cmt
        } else if (balltype == 'bats') {
            CMTimage = data.bats.ballimg
        } else if (balltype == 'newbats') {
            CMTimage = data.newbats.ballimg
        } else if (balltype == 'fmnear') {
            CMTimage = data.fmnear.cmt
        } else if (balltype == 'RMT') {
            CMTimage = data.rmt.rmtimg
        } else if (balltype == 'wphase') {
            CMTimage = data.wphase.wpimg
        }
        var Icon = L.icon({
            iconUrl: CMTimage,
            iconSize: [35, 35],
            iconAnchor: [17.5, 17.5],
        })

        var cmtIcon = L.marker(new L.LatLng(data.cwb.Latitude, data.cwb.Longitude), { icon: Icon })
        CMTMarker.addLayer(cmtIcon)
        CMTMarker.addTo(map)
    } else if (objecttype == 'station') {
        //console.log(data);
        if (data[10] == 'CWB') {
            var imageloc = blueicon
        }

        if (data[10] == 'BATS' || data[9] == 'BATS') {
            if (data[12] == 1) {
                var imageloc = redicon
            } else {
                var imageloc = blueicon
            }
        }

        var Icon = L.icon({
            iconUrl: imageloc,
            iconSize: [13, 13],
            iconAnchor: [6.5, 6.5],
        })
        var id = data[0]
        var name = data[1]
        var lat = data[2]
        var lon = data[3]
        var geology = data[5]
        var date = data[6]
        var type = data[10]

        var cmtIcon = L.marker(new L.LatLng(lat, lon), { icon: Icon })
        cmtIcon.bindPopup(html)
        StationMarker.addLayer(cmtIcon)
    }
}
//Adds all markers to map
function addMarker(data, objecttype, html, balltype) {
    //Adds Earthquake marker
    if (objecttype == 'marker' || objecttype == 'newest') {
        if (objecttype == 'marker') {
            color = 'black'
            weight = 2
            sopacity = 0.2
            animation = google.maps.Animation.DROP
        } else if (objecttype == 'newest') {
            color = 'red'
            weight = 2
            sopacity = 1
            animation = google.maps.Animation.BOUNCE
        }

        var depth = data.cwb.Depth

        if (depth <= 15) {
            var markercolor = 'red'
        } else if (depth >= 15 && depth < 30) {
            var markercolor = 'yellow'
        } else if (depth >= 30 && depth < 70) {
            var markercolor = 'green'
        } else if (depth >= 70 && depth < 150) {
            var markercolor = 'turquoise'
        } else if (depth >= 150 && depth < 300) {
            var markercolor = 'purple'
        } else if (depth >= 300) {
            var markercolor = 'magenta'
        }

        var image = {
            path: 0,
            strokeColor: color,
            rotation: 0,
            strokeWeight: weight,
            strokeOpacity: sopacity,
            fillColor: markercolor,
            fillOpacity: 0.7,
            scale: data.cwb.ML * 2.5,
        }

        marker = new google.maps.Marker({
            markerdata: data,
            type: objecttype,
            animation: animation,
            html: html,
            position: new google.maps.LatLng(data.cwb.Latitude, data.cwb.Longitude),
            icon: image,
            zIndex: 3,
            color: color,
            map: map,
        })

        markersArray.push(marker)
        bindInfoWindow(marker, map, infoBubble, html)
    }

    //Adds station marker
    if (objecttype == 'station') {
        if (data[10] == 'CWB') {
            var imageloc = blueicon
        }

        if (data[10] == 'BATS' || data[9] == 'BATS') {
            if (data[12] == 1) {
                var imageloc = redicon
            } else {
                var imageloc = blueicon
            }
        }

        var image = new google.maps.MarkerImage(
            imageloc,
            // This marker is 20 pixels wide by 32 pixels tall.
            null,
            // The origin for this image is 0,0.
            new google.maps.Point(0, 0),
            // The anchor for this image is the base of the flagpole at 0,32.
            null,
            new google.maps.Size(13, 13)
        )
        // new google.maps.Point(35,50)

        marker = new google.maps.Marker({
            id: data[0],
            name: data[1],
            date: data[7],
            type: data[10],
            geology: data[5],
            html: html,
            animation: google.maps.Animation.DROP,
            position: new google.maps.LatLng(data[2], data[3]),
            icon: image,
            zIndex: 3,
            map: map,
        })

        stationArray.push(marker)
        bindInfoWindow(marker, map, infoBubble, html)
    }

    //Adds beachball marker
    if (objecttype == 'beachball') {
        //Checks for type of beachball marker and uses respective image
        if (balltype == 'gcap') {
            var image = new google.maps.MarkerImage(
                data.markerdata.gcap.ballimg,
                // This marker is 20 pixels wide by 32 pixels tall.
                null,
                // The origin for this image is 0,0.
                new google.maps.Point(0, 0),
                // The anchor for this image is the base of the flagpole at 0,32.
                new google.maps.Point(17.5, 17.5),
                new google.maps.Size(35, 35)
            )
            // new google.maps.Point(35,50)
        } else if (balltype == 'historic') {
            var image = new google.maps.MarkerImage(
                data.markerdata.nearbats.cmt,
                // This marker is 20 pixels wide by 32 pixels tall.
                null,
                // The origin for this image is 0,0.
                new google.maps.Point(0, 0),
                // The anchor for this image is the base of the flagpole at 0,32.
                new google.maps.Point(17.5, 17.5),
                new google.maps.Size(35, 35)
            )
            // new google.maps.Point(35,50)
        } else if (balltype == 'bats') {
            var image = new google.maps.MarkerImage(
                data.markerdata.bats.ballimg,
                // This marker is 20 pixels wide by 32 pixels tall.
                null,
                // The origin for this image is 0,0.
                new google.maps.Point(0, 0),
                // The anchor for this image is the base of the flagpole at 0,32.
                new google.maps.Point(17.5, 17.5),
                new google.maps.Size(35, 35)
            )
            // new google.maps.Point(35,50)
        } else if (balltype == 'newbats') {
            var image = new google.maps.MarkerImage(
                data.markerdata.newbats.ballimg,
                // This marker is 20 pixels wide by 32 pixels tall.
                null,
                // The origin for this image is 0,0.
                new google.maps.Point(0, 0),
                // The anchor for this image is the base of the flagpole at 0,32.
                new google.maps.Point(17.5, 17.5),
                new google.maps.Size(35, 35)
            )
            // new google.maps.Point(35,50)
        } else if (balltype == 'fmnear') {
            var image = new google.maps.MarkerImage(
                data.markerdata.fmnear.cmt,
                // This marker is 20 pixels wide by 32 pixels tall.
                null,
                // The origin for this image is 0,0.
                new google.maps.Point(0, 0),
                // The anchor for this image is the base of the flagpole at 0,32.
                new google.maps.Point(17.5, 17.5),
                new google.maps.Size(35, 35)
            )
            // new google.maps.Point(35,50)
        } else if (balltype == 'RMT') {
            var image = new google.maps.MarkerImage(
                data.markerdata.rmt.rmtimg,
                // This marker is 20 pixels wide by 32 pixels tall.
                null,
                // The origin for this image is 0,0.
                new google.maps.Point(0, 0),
                // The anchor for this image is the base of the flagpole at 0,32.
                new google.maps.Point(17.5, 17.5),
                new google.maps.Size(35, 35)
            )
            // new google.maps.Point(35,50)
        } else if (balltype == 'wphase') {
            var image = new google.maps.MarkerImage(
                data.markerdata.wphase.wpimg,
                // This marker is 20 pixels wide by 32 pixels tall.
                null,
                // The origin for this image is 0,0.
                new google.maps.Point(0, 0),
                // The anchor for this image is the base of the flagpole at 0,32.
                new google.maps.Point(17.5, 17.5),
                new google.maps.Size(35, 35)
            )
            // new google.maps.Point(35,50)
        }

        marker = new google.maps.Marker({
            position: data.get('position'),
            icon: image,
            type: objecttype,
            animation: google.maps.Animation.DROP,
            optimized: false,
            zIndex: 5,
            html: html,
            url: data.get('url'),
            map: map,
        })

        bindInfoWindow(marker, map, infoBubble, html)

        iconArray.push(marker)
    }
}

//Adds image overlay to Map
function showOverlay(imageName, imgpos) {
    var options = {
        id: imageName,
        opacity: 0.4,
    }

    clearOverlays()

    var imageBounds = new google.maps.LatLngBounds(
        new google.maps.LatLng(parseFloat(imgpos[0][0]), parseFloat(imgpos[0][1])),
        new google.maps.LatLng(parseFloat(imgpos[1][0]), parseFloat(imgpos[1][1]))
    )
    var image_overlay = new google.maps.GroundOverlay(imageName, imageBounds, options)
    image_overlay.setMap(map)
    imageArray.push(image_overlay)
}

function bindInfoWindow(object, map, infoBubble, html) {
    google.maps.event.addListener(object, 'click', function (ev) {
        if (object.get('type') == 'marker' || object.get('type') == 'newest') {
            myclick(object.markerdata.cwb.CWB_ID)
        }

        if (object.get('type') == 'line' || object.get('type') == 'vector' || object.get('type') == 'seismic') {
            var loc = ev.latLng
            openInfoWindow(object, loc)
        }

        if (object.get('type') == 'CWB' || object.get('type') == 'BATS') {
            openInfoWindow(object)
        }

        if (object.get('type') == 'eq') {
            openInfoWindow(object)
        }

        if (object.get('type') == 'pga') {
            currStation = object
            //console.log(currStation);
            findStationName(currStation)
            openInfoWindow(object)
        }
    })
}

//Removes current overlay from map
function clearOverlay(image) {
    if (imageArray) {
        for (i in imageArray) {
            if (imageArray[i].get('id') == image) {
                imageArray[i].setMap(null)
            }
        }
    }
}

//Removes all overlays from map
function clearOverlays() {
    if (imageArray) {
        for (i in imageArray) {
            imageArray[i].setMap(null)
        }
    }
}

//Changes opacity of current overlay
function setOpacity(image, opacity) {
    for (i in imageArray) {
        if (imageArray[i].get('id') == image) {
            imageArray[i].setOpacity(parseFloat(opacity))
        }
    }
}
function setOpacityLeaf(layer, opacity) {
    console.log(layer, opacity)
    layer.setOpacity(opacity)
}

//Handles clicks from left side list
function myclick(id) {
    //When event list is clicked, animation is changed to clicked marker, and new marker saved in markerid variable. videoname variable saves the date and time of current earthquake to check and see if video is available
    if (markersArray.length > 0) {
        markerid.setAnimation(null)

        for (i in markersArray) {
            if (id == markersArray[i].markerdata.cwb.CWB_ID) {
                //console.log(markersArray[i])
                videoname = markersArray[i].markerdata.cwb.timestring
                yeargif = videoname.substr(0, 4)
                markerid = markersArray[i]
            }
        }

        showMarkerInfoBox(markerid)

        markerid.setAnimation(google.maps.Animation.BOUNCE)

        if (document.getElementById('stationbox').checked == true) {
            infoBubble.close()
            setstationhtml()
            infoBubble.open(map)
        }

        //If Stations checkbox is checked show earthquake image overlay
        console.log(document.getElementById('mapbox').checked)

        if (document.getElementById('mapbox').checked == true) {
            console.log(markerid.markerdata.cwb.intensitymap)
            console.log(markerid.markerdata.gcap.pgvlink)

            //Shows CWB Overlay
            if (selectedOverlay == 'cwb') {
                intmaplink = markerid.markerdata.cwb.intensitymap
                intmaplink = intmaplink
                showOverlay(intmaplink, [
                    [19.7, 118.28],
                    [26.45, 123.2],
                ])
                currOverlay = intmaplink
            }

            //Shows PGV Overlay
            else if (selectedOverlay == 'pgv') {
                pgvmaplink = markerid.markerdata.gcap.pgvlink
                showOverlay(pgvmaplink, [
                    [21.885, 120.03],
                    [25.315, 122.01],
                ])
                currOverlay = pgvmaplink
            }
        }
    }

    //Shows Palert Markers and checks if animation video is available
    if (document.getElementById('accumMap').checked == true) {
        console.log(markerid.markerdata.pga.pgafilename)
        getPgaFile(markerid.markerdata.pga.pgafilename) //,markerid.get("id"));
        checkVideo(videoname)
        openInfoWindow(eqMarker)
    }

    if (document.getElementById('vectorcheckbox').checked == true) {
        loadData(markerid.markerdata.cwb.Vectorfile, 'vector')
    }
}

//Shows current earthquake information on the bottom left of screen
function showMarkerInfoBox(object) {
    $('#markerinfobox').hide()
    $('#markerinfobox').show('highlight', 1000)
    $('#markerinfobox').html('')
    $('#markerinfobox').append(object.get('html'))
    $('#markerinfobox').append(
        "<a href='" +
            'https://tesis.earth.sinica.edu.tw/showDetail.php?date=' +
            '"' +
            object.markerdata.cwb.Date +
            '"' +
            '&time=' +
            '"' +
            object.markerdata.cwb.Time +
            '"' +
            "'>詳細資訊</a>"
    )
    $('#markerinfobox').append(
        '<br>' +
            object.markerdata.cwb.Date +
            '&nbsp;' +
            object.markerdata.cwb.Time +
            '<br>(' +
            object.getPosition().lat().toFixed(2) +
            ',' +
            object.getPosition().lng().toFixed(2) +
            ')<br>' +
            object.markerdata.cwb.Depth +
            ' KM' +
            '&nbsp;ML:' +
            object.markerdata.cwb.ML
    )
}

//Shows Palert markers if checked
function toggleAccum() {
    if (document.getElementById('accumMap').checked == true) {
        //Shows Palert Intensity Scale
        $('#pgascale').show()
        //Shows Download and Watch Video Button
        $('#animationbox').show()

        //Hides All earthquake Markers
        if (markersArray) {
            for (i in markersArray) {
                markersArray[i].setMap(null)
            }
        }

        //Trigers loading of Palert markers
        myclick(markerid)
    } else if (document.getElementById('accumMap').checked == false) {
        $('#animationbox').hide()

        infoBubble.close()

        addMapDiv('clear')

        //Clears Palert Markers
        if (pgamarkersarray) {
            for (i in pgamarkersarray) {
                pgamarkersarray[i].setMap(null)
            }
        }

        if (accumArray) {
            for (i in accumArray) {
                accumArray[i].setMap(null)
            }
        }

        //Shows earthquake markers
        if (markersArray) {
            for (i in markersArray) {
                markersArray[i].setMap(map)
            }
        }

        //Hides Palert Intensity Scale
        $('#pgascale').hide()

        //Hide Eqrthquake Marker
        if (eqMarker) {
            eqMarker.setMap(null)
        }
    }
}

//Turns coordinate grid on and off
function toggleGrid() {
    if (document.getElementById('grid').checked == true) {
        if (gridLayer.getLayers().length == 0) {
            var grid = L.latlngGraticule({
                showLabel: true,
                color: '#222',
                zoomInterval: [
                    { start: 2, end: 3, interval: 30 },
                    { start: 4, end: 4, interval: 10 },
                    { start: 5, end: 6, interval: 5 },
                    { start: 7, end: 8, interval: 2.5 },
                    { start: 9, end: 9, interval: 1 },
                    { start: 10, end: 11, interval: 0.5 },
                ],
            })
            gridLayer.addLayer(grid)
        }
        //grid.show();
        gridLayer.addTo(map)
    } else if (document.getElementById('grid').checked == false) {
        //grid.hide();
        map.removeLayer(gridLayer)
    }
}

//Toggles Image Overlays
function togglemapbox() {
    if (document.getElementById('mapbox').checked == true) {
        $('#mapboxdiv').show()

        if (markerid.length == 0) {
            markerid = markersArray[markersArray.length - 1]
        }

        myclick(markerid)
    } else if (document.getElementById('mapbox').checked == false) {
        clearOverlays()
        $('#mapboxdiv').hide()
    }
}
function toggleSeismicity() {
    if (document.getElementById('backgroundSeismicity').checked == true) {
        console.log('true')
        SeismicityLayer.addTo(map)
    } else if (document.getElementById('backgroundSeismicity').checked == false) {
        console.log('false')
        map.removeLayer(SeismicityLayer)
    }
}
function toggleAccumLeaf() {
    if (document.getElementById('accumMap').checked == true) {
        //Shows Download and Watch Video Button
        $('#animationbox').show()
        videoname = dataArray[0].cwb.timestring
        yeargif = videoname.substr(0, 4)
        console.log(videoname, yeargif)
        checkVideo(videoname)
        //console.log(PalertMarker);
        if (PalertMarker.getLayers().length == 0) {
            //console.log(dataArray[0].pga.pgafilename);
            getPgaFile(dataArray[0].pga.pgafilename)
        }
        PalertMarker.addTo(map)
    } else {
        $('#animationbox').hide()
        map.removeLayer(PalertMarker)
    }
}
function togglemapboxLeaf(type) {
    if (document.getElementById('mapbox').checked == true) {
        $('#mapboxdiv').show()

        if (type !== undefined) {
            setIntMap(type)
        } else if (IntMapLayer._url === undefined) {
            setIntMap()
        }
        if (IntMapLayer._url == dataArray[0].gcap.pgvlink) {
            $('#scale').show()
        }
        IntMapLayer.addTo(map)

        if (document.getElementById('accumMap').checked == true) {
            toggleAccumLeaf()
        }
    } else if (document.getElementById('mapbox').checked == false) {
        $('#mapboxdiv').hide()
        $('#scale').hide()
        map.removeLayer(IntMapLayer)
        map.removeLayer(PalertMarker)
    }
}
function setIntMap(type) {
    //console.log(markerid.markerdata.cwb.intensitymap);
    //console.log(markerid.markerdata.gcap.pgvlink);
    if (type !== undefined) {
        selectedOverlay = type
    }

    console.log(dataArray[0])
    console.log(selectedOverlay)
    //Shows CWB Overlay
    if (selectedOverlay == 'cwb') {
        $('#scale').hide()
        if (year < 2020) {
            imagelink = dataArray[0].cwb.intensitymap
            var corner1 = L.latLng(19.7, 118.28)
            var corner2 = L.latLng(26.45, 123.2)
        } else {
            imagelink = dataArray[0].cwb.intensitymapa
            var corner1 = L.latLng(20.87, 118.7535)
            var corner2 = L.latLng(26.03, 123.1035)
        }

        imageBounds = L.latLngBounds(corner1, corner2)
        //Shows PGV Overlay
    } else if (selectedOverlay == 'pgv') {
        $('#scale').show()
        imagelink = dataArray[0].gcap.pgvlink
        var corner1 = L.latLng(21.885, 120.03)
        var corner2 = L.latLng(25.315, 122.01)
        imageBounds = L.latLngBounds(corner1, corner2)
    }
    IntMapLayer.setUrl(imagelink).setBounds(imageBounds).setOpacity(0.3)
}
//Toggles Geographical Map

function geomapLeaf() {
    if (document.getElementById('geomap').checked == true) {
        $('#slider1div').show()

        //if (geoMapLayer._url === undefined){
        //	imageBounds = [[21.105,118.805],[26.02,122.60]];
        //	geoMapLayer =L.imageOverlay(geoimg, imageBounds).setOpacity(0.3);
        //	//geoMapLayer.addLayer(geomap);
        //}
        geoMapLayer.addTo(map)
        setOpacityLeaf(geoMapLayer, $('#slider1').val() / 100)
        window.open(
            'common/geo500k_lengend.html',
            'Map Legend',
            'location=1,status=1,scrollbars=1, width=480,height=640,top=0, left=600'
        )
    } else if (document.getElementById('geomap').checked == false) {
        $('#slider1div').hide()
        map.removeLayer(geoMapLayer)
    }
}

//Checks if the marker has neighboring markers nearby
function checkSingle() {
    google.maps.event.addListener(map, 'idle', function () {
        var singleMarkers = oms.markersThatWillAndWontSpiderfy()

        for (i in markersArray) {
            for (j in singleMarkers[1]) {
                if (markersArray[i].get('id') == singleMarkers[1][j].get('id')) {
                    markersArray[i].setOptions({ single: true })
                }
            }
        }
    })
}

//Toggles beachball images
function toggleCMTLeaf() {
    if (document.getElementById('cmt').checked == true) {
        $('#scale').hide()
        $('#cmtbuttons').show()

        //setCMT(ballType);
        if (CMTMarker.getLayers().length != 0) {
            CMTMarker.addTo(map)
        } else {
            setCMTLeaf(ballType)
        }
    } else if (document.getElementById('cmt').checked == false) {
        $('#cmtbuttons').hide()
        map.removeLayer(CMTMarker)
        eqMarker.addTo(map)
    }
}
//Adds beachball markers to map

function setCMTLeaf(type) {
    CMTMarker.clearLayers()
    map.removeLayer(eqMarker)
    var html
    addMarkerLeaf(map, dataArray[0], 'beachball', html, type)
}
//Toggle Google Maps Visibility

//Shows infowindow, linked to bindinfowindow
function openInfoWindow(object, loc) {
    if (object.get('type') == 'line' || object.get('type') == 'vector' || object.get('type') == 'seismic') {
        infoBubble.close()
        infoBubble.setContent(object.get('html'))
        infoBubble.setPosition(loc)
        infoBubble.open(map)
    }

    if (
        object.get('type') == 'marker' ||
        object.get('type') == 'newest' ||
        object.get('type') == 'cmt' ||
        object.get('type') == 'BATS' ||
        object.get('type') == 'CWB' ||
        object.get('type') == 'eq' ||
        object.get('type') == 'pga'
    ) {
        infoBubble.setContent(object.get('html'))
        infoBubble.setPosition(object.getPosition())
        infoBubble.open(map)
    }

    if (object.get('type') == 'eq') {
        //var html= '<div id="eqmarkerwindow">' + "時間: " + object.get("date") + "  " + object.get("time") + " UTC" + "<br>" + "( " + object.getPosition().lat().toFixed(2) + " N ," + object.getPosition().lng().toFixed(2) +" E)" +  " <br> ML:  "  + object.get("intensity") +  " <br> 深度:  "  + object.get("depth") + ' KM</div>';
        var html =
            '<div class="iw">' +
            '時間: ' +
            object.get('date') +
            '  ' +
            object.get('time') +
            ' UTC' +
            '<br>' +
            '( ' +
            object.getPosition().lat().toFixed(2) +
            ' N ,' +
            object.getPosition().lng().toFixed(2) +
            ' E)' +
            ' <br> ML:  ' +
            object.get('intensity') +
            ' <br> 深度:  ' +
            object.get('depth') +
            ' KM</div>'
        infoBubble.setPosition(object.getPosition())
        infoBubble.setContent(html)
        infoBubble.open(map)
    }

    if (object.get('type') == 'pga') {
        //var html=  '<div id="pgamarkerwindow">' + "時間: " + currStation.get("date") + "  " + currStation.get("time") + " UTC" + "<br>" + "測站名稱: " + currStation.get("name") + "<br>"  + stationDesc + "<br>" +"(" + currStation.getPosition().lat().toFixed(2) + " N ," + currStation.getPosition().lng().toFixed(2) +" E) <br>" + "PGA: " + parseFloat(currStation.get("pga")).toFixed(2) + " cm/s/s<br>" +  "震度: "  + parseFloat(currStation.get("intensity")).toFixed(0) + '</div>';
        var html =
            '<div class="iw">' +
            '時間: ' +
            currStation.get('date') +
            '  ' +
            currStation.get('time') +
            ' UTC' +
            '<br>' +
            '測站名稱: ' +
            currStation.get('name') +
            '<br>' +
            stationDesc +
            '<br>' +
            '(' +
            currStation.getPosition().lat().toFixed(2) +
            ' N ,' +
            currStation.getPosition().lng().toFixed(2) +
            ' E) <br>' +
            'PGA: ' +
            parseFloat(currStation.get('pga')).toFixed(2) +
            ' cm/s/s<br>' +
            '震度: ' +
            Math.floor(currStation.get('intensity')) +
            '級</div>'
        // parseFloat(currStation.get("intensity")).toFixed(1) + '</div>';

        infoBubble.setPosition(object.getPosition())
        infoBubble.setContent(html)
        infoBubble.open(map)
    }
}

//Processes line data and adds it to Google Maps
function processLines(data) {
    var latArray = []

    for (i in data) {
        var tempArray = []

        for (j in data[i]) {
            if (data[i][j].length > 1) {
                var temp = data[i][j].split(' ')

                tempArray.push([temp[0], temp[1]])
                //var line=new google.maps.LatLng(temp[0],temp[1]);
                //tempArray.push(line);
            }
        }

        latArray.push(tempArray)
    }

    leafLines(latArray)
    //setLines(latArray);
}
//Changes style and color of fault lines
function leafLines(latArray) {
    //console.log('2=',FaultLineGroup.getLayers().length);
    for (var i = 0; i < latArray.length; i++) {
        for (var j = 0; j < lineName.length; j++) {
            if (lineName[j][0] == i) {
                var html =
                    '<div class="iw">' +
                    lineName[i][1] +
                    '<br>' +
                    '<a href="javascript:lineInfo(' +
                    "'" +
                    lineName[i][1] +
                    "'" +
                    ')">詳細資訊 </a>' +
                    '</div>'
            }
        }
        //BLack solid lines
        for (var j = 0; j < BSindex.length; j++) {
            var temp = BSindex[j]

            if (i == temp) {
                //var polyline = L.polyline([...]).addTo(map);
                var Faultpolyline = new L.Polyline(latArray[i], {
                    color: 'red',
                    weight: 3,
                    smoothFactor: 1,
                }).bindPopup(html)

                FaultLineGroup.addLayer(Faultpolyline)
            }
        }

        //BLack dotted lines
        for (var j = 0; j < BDindex.length; j++) {
            var temp = BDindex[j]

            if (i == temp) {
                var Line = L.polyline(latArray[i], {})
                var pathPattern = L.polylineDecorator(Line, {
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
        for (var j = 0; j < ODindex.length; j++) {
            var temp = ODindex[j]

            if (i == temp) {
                var Line = L.polyline(latArray[i], {})
                var pathPattern = L.polylineDecorator(Line, {
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
        for (var k = 0; k < OSindex.length; k++) {
            var temp = OSindex[k]

            if (i == temp) {
                var Faultpolyline = new L.Polyline(latArray[i], {
                    color: 'orange',
                    weight: 3,
                    smoothFactor: 1,
                }).bindPopup(html)
                FaultLineGroup.addLayer(Faultpolyline)
            }
        }

        //Red Dotted Lines
        for (var k = 0; k < RDindex.length; k++) {
            var temp = RDindex[k]
            if (i == temp) {
                var Line = L.polyline(latArray[i], {})
                var pathPattern = L.polylineDecorator(Line, {
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
}

//Find fault line information each time a line is clicked
function lineInfo(name) {
    $.getJSON(faultslink, { linename: name }, function (linedata) {
        if (linedata[2].length > 0) {
            var image1div = '<img src=common/img/active_fault/tn_' + linedata[2] + '.jpg>'
        } else if (linedata[2].length == 0) {
            var image1div = ''
        }

        if (linedata[3].length > 0) {
            var image2div = '<img src=common/img/active_fault/tn_' + linedata[3] + '.jpg>'
        } else if (linedata[3].length == 0) {
            var image2div = ''
        }

        if (linedata[4].length > 0) {
            var image3div = '<img src=common/img/active_fault/tn_' + linedata[4] + '.jpg>'
        } else if (linedata[4].length == 0) {
            var image3div = ''
        }

        if (linedata[5].length > 0) {
            var text1div = linedata[5]
        } else if (linedata[5].length == 0) {
            var text1div = ''
        }

        if (linedata[6].length > 0) {
            var text2div = linedata[6]
        } else if (linedata[6].length == 0) {
            var text2div = ''
        }

        if (linedata[7].length > 0) {
            var text3div = linedata[7]
        } else if (linedata[7].length == 0) {
            var text3div = ''
        }

        var combineddiv1 = image1div + '<br> ' + text1div + '<br>'
        var combineddiv2 = image2div + '<br> ' + text2div
        ;+'<br>'

        if (text3div == '' && image3div == '') {
            var combineddiv3 = ''
        } else {
            var combineddiv3 = image3div + '<br>' + text3div
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
}

//Closes fault line div
function closelineBox() {
    $('#linebox').hide()
}

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
}

//Processes Vector Data and display is on Google Maps
function processVector(data, type) {
    if (type == 'vector') {
        for (i in data) {
            if (data[i]) {
                var temp = new google.maps.LatLng(data[i][1], data[i][0])
                var temp1 = new google.maps.LatLng(data[i][3], data[i][2])
                var temp2 = new google.maps.LatLng(data[i][5], data[i][4])
                var temp3 = new google.maps.LatLng(data[i][7], data[i][6])

                addVector([temp, temp1, temp2, temp1, temp3], '#FF0088', '', data[i][8], data[i][10], data[i][12], type)
            }
        }
    } else if (type == 'seismic') {
        for (i in data) {
            if (i < data.length - 1) {
                if (data[i][11] == null) {
                    //console.log(data);
                    var temp2 = new google.maps.LatLng(data[i][0], data[i][1])
                    var temp3 = new google.maps.LatLng(data[i][2], data[i][3])
                    addVector(
                        [temp2, temp3],
                        'orange',
                        data[i][4],
                        data[i][5],
                        data[i][6],
                        data[i][7],
                        type,
                        'arrow',
                        data[i][8],
                        data[i][9],
                        data[i][10]
                    )
                }

                if (data[i][11] != null) {
                    var temp = new google.maps.LatLng(data[i][1], data[i][0])
                    var temp1 = new google.maps.LatLng(data[i][3], data[i][2])
                    var temp2 = new google.maps.LatLng(data[i][5], data[i][4])
                    var temp3 = new google.maps.LatLng(data[i][7], data[i][6])
                    addVector(
                        [temp, temp1, temp2, temp1, temp3],
                        '#FF0088',
                        '',
                        data[i][8],
                        data[i][10],
                        data[i][12],
                        type
                    )
                }
            }
        }
    }
}

//Adds Vector from processVector function
function addVector(vector, pathColor, station, un, ue, uz, type, symbol, dn, de, dz) {
    var am = '±'
    if (uz > 0) {
        var pathColor = '#FF0088'
    } else if (uz < 0) {
        var pathColor = '#FF5511'
    }
    //console.log('dn=',dn);
    if (dn != '' && dn != null) {
        un = un + am + dn
    }
    if (de != '' && de != null) {
        ue = ue + am + de
    }
    if (dz != '' && dz != null) {
        uz = uz + am + dz
    }
    //var html= "<div id<'vectorwindow'> 測站名稱: " + station + "<br>" + "Un: " + un + " mm" + "<br>" + "Ue: " + ue + " mm" + "<br>" + "Uz: " + uz  + " mm </div>";
    var html =
        "<div class='iw'> 測站名稱: " +
        station +
        '<br>' +
        'Un: ' +
        un +
        ' mm' +
        '<br>' +
        'Ue: ' +
        ue +
        ' mm' +
        '<br>' +
        'Uz: ' +
        uz +
        ' mm </div>'

    if (symbol == 'arrow') {
        var arrow = {
            path: google.maps.SymbolPath.FORWARD_OPEN_ARROW,
        }
    }

    line = new google.maps.Polyline({
        type: type,
        path: vector,
        strokeColor: pathColor,
        id: station,
        un: un,
        ue: ue,
        uz: uz,
        html: html,
        icons: [
            {
                icon: arrow,
                //offset: '100%'
            },
        ],
        rotation: 0,
        strokeWeight: 2.5,
        strokeOpacity: 1,
        map: map,
    })

    if (type == 'vector') {
        vectorsArray.push(line)
    }

    if (type == 'seismic') {
        seismicArray.push(line)
    }

    bindInfoWindow(line, map, infoBubble, html)
}

//Toggles Vector lines
function toggleVector() {
    infoBubble.close()

    if (document.getElementById('vectorcheckbox').checked == true) {
        //loadData(markerid.markerdata.cwb.Vectorfile,"vector")
        loadData(markerid.markerdata.cwb.Vectorfile, 'seismic')
        //console.log(markerid.markerdata.cwb);
        //toggleZoom();
    } else if (document.getElementById('vectorcheckbox').checked == false) {
        /*if (vectorsArray)
			{
				for (i in vectorsArray)
				{
					vectorsArray[i].setMap(null);
				}
			
			vectorsArray=[];
			}*/
        if (seismicArray) {
            for (i in seismicArray) {
                seismicArray[i].setMap(null)
            }

            seismicArray = []
        }
    }
}

//Toggle intersiesmic vector lines
function toggleSeismic() {
    infoBubble.close()

    if (document.getElementById('seismic').checked == true) {
        $('#seismicRadio').toggle()
        loadData(vectorFileR, 'seismic')
        //interseismic + "/2000.IS.0.5.H"
        //toggleZoom();
    } else if (document.getElementById('seismic').checked == false) {
        $('#seismicRadio').toggle()

        if (seismicArray) {
            for (i in seismicArray) {
                seismicArray[i].setMap(null)
            }

            seismicArray = []
        }
    }
}
function changeVectorColor(color) {
    InterSeismicMarker.clearLayers()
    toggleInterVector(color)
}
function toggleInterVector(color) {
    if (color === undefined) {
        color = '#0000ff'
    }
    if (document.getElementById('seismic').checked == true) {
        //$('#seismicRadio').toggle();
        $('#Inter-vector-color-div').show()
        if (InterSeismicMarker.getLayers().length == 0) {
            console.log(InterSeismicFileName)
            pushArrow(InterSeismicFileName, '3', color, '1.2', 'Inter', map)
        }
        InterSeismicMarker.addTo(map)
    } else if (document.getElementById('seismic').checked == false) {
        $('#Inter-vector-color-div').hide()
        //$('#seismicRadio').toggle();
        map.removeLayer(InterSeismicMarker)
    }
}
function toggleCoVector() {
    if (document.getElementById('vectorcheckbox').checked == true) {
        //$('#seismicRadio').toggle();
        if (CoSeismicMarker.getLayers().length == 0) {
            var CoseismicFileName = dataArray[0].cwb.Vectorfile
            console.log(CoseismicFileName)
            pushArrow(CoseismicFileName, '1', '#000', '1.2', 'Co', map)
        }
        CoSeismicMarker.addTo(map)
    } else if (document.getElementById('vectorcheckbox').checked == false) {
        //$('#seismicRadio').toggle();
        map.removeLayer(CoSeismicMarker)
    }
}
//Changes line color from color selector
function setVectorColor() {
    var newColor = document.getElementById('color').value

    if (vectorsArray) {
        for (i in vectorsArray) {
            vectorsArray[i].setOptions({ strokeColor: newColor })
        }
    }
}
function tooggleBATSStaLeaf() {
    if (document.getElementById('stationbox').checked == true) {
        console.log('start', StationMarker)
        if (StationMarker.getLayers().length == 0) {
            loadData(batsstationfile, 'stations')
        }
        console.log('end', StationMarker)
        StationMarker.addTo(map)
    } else {
        map.removeLayer(StationMarker)
    }
}
//Toggles Broadband stations
function toggleStations() {
    //2018/03/02 show only BATS stations (edit batsstationfile)
    if (document.getElementById('stationbox').checked == true) {
        //$('#stationboxdiv').show();

        if (stationArray.length == 0) {
            loadData(batsstationfile, 'stations')
        }
        console.log(stationArray)
        //Shows All Stations
        if (selectedStation == 'all') {
            for (i in stationArray) {
                stationArray[i].setMap(map)
            }
        }

        //Shows CWB Stations Only
        if (selectedStation == 'cwb') {
            infoBubble.close()

            for (i in stationArray) {
                if (stationArray[i].get('type') == 'CWB') {
                    stationArray[i].setMap(map)
                }

                if (stationArray[i].get('type') == 'BATS') {
                    stationArray[i].setMap(null)
                }
            }
        }

        //Shows BATS Stations only
        if (selectedStation == 'bats') {
            infoBubble.close()

            for (j in stationArray) {
                if (stationArray[j].get('type') == 'BATS') {
                    stationArray[j].setMap(map)
                }

                if (stationArray[j].get('type') == 'CWB') {
                    stationArray[j].setMap(null)
                }
            }
        }
    } else if (document.getElementById('stationbox').checked == false) {
        infoBubble.close()

        //$('#stationboxdiv').hide();

        for (i in stationArray) {
            stationArray[i].setMap(null)
        }
    }
}

//Checks to see if there are waveforms for each BATS station
function setStations(data) {
    //console.log("station all  :"+data);
    for (i in data) {
        if (i > 0) {
            var batslink = 'https://bats.earth.sinica.edu.tw/Station/BATS_Stn_Summary.html#' + data[i][0]
            //console.log("station="+data[i][0]+" "+data[i][11]);
            if (data[i][11] == '1') {
                //data[i][11] 1:enable 0:disable
                //console.log("BATSstation="+ data[0][0] + ": " + data[i][0] + "  " + data[0][5] + ": "  + data[i][5] );
                var stationname = data[i][0]
                var wavelink =
                    'https://tesis.earth.sinica.edu.tw/waveChart.php?year=' +
                    year +
                    '&dir=' +
                    evtdir +
                    '&evtno=' +
                    evtno +
                    '&sta=' +
                    stationname
                //console.log('data11==',dataArray[0]);
                //var zlink="rbats/" + markerid.markerdata.cwb.timestring + "/TW."  + data[i][0] + ".HHZ.SAC";
                var zlink = 'rbats/' + dataArray[0].cwb.timestring + '/TW.' + data[i][0] + '.HHZ.SAC'
                var waveCheck = checkWaveformData(year, evtdir, stationname, evtno)
                //console.log("markerid="+markerid+" markerdata="+markerdata+" cwb= "+cwb+" timestring="+timestring);

                if (waveCheck) {
                    var html =
                        "<div class='iw'>" +
                        data[0][0] +
                        ': ' +
                        data[i][0] +
                        '<br>' +
                        data[0][5] +
                        ': ' +
                        data[i][5] +
                        '<br>' +
                        '<a href="' +
                        wavelink +
                        '" target="_blank">View Waveform </a> ' +
                        '<br>' +
                        '<a href="https://tecws1.earth.sinica.edu.tw/BATSWS/">Request Data </a> ' +
                        '</div>'
                    data[i][12] = 1 // is it having wave form data
                } else {
                    var html =
                        "<div class='iw'>" +
                        data[0][0] +
                        ': ' +
                        data[i][0] +
                        '<br>' +
                        data[0][5] +
                        ': ' +
                        data[i][5] +
                        '<br>' +
                        '</div>'
                    data[i][12] = 0
                }
            } else if (data[i][10] == 'CWB') {
                //var html="<div id='cwbwindow'>" + data[0][0] + ": " + data[i][0] + "<br>" + data[0][5] + ": "  + data[i][5] + "<br>" + '<a href="javascript:openStation(' + "'" +  batslink + "'" + ')">More Info </a></div>';
                var html =
                    "<div class='iw'>" +
                    data[0][0] +
                    ': ' +
                    data[i][0] +
                    '<br>' +
                    data[0][5] +
                    ': ' +
                    data[i][5] +
                    '<br>' +
                    '<a href="javascript:openStation(' +
                    "'" +
                    batslink +
                    "'" +
                    ')">More Info </a></div>'
            } else {
                //console.log("NN="+ data[0][0] + ": " + data[i][0] + "  " + data[0][5] + ": "  + data[i][5] );
            }

            if (data[i][11] == 1) {
                //addMarker(data[i],"station",html);
                addMarkerLeaf(map, data[i], 'station', html)
            }
        }
    }
}

//Sets html for infowindow for each station
function setstationhtml() {
    for (i in stationArray) {
        var stationtype = stationArray[i].get('type')
        var stationname = stationArray[i].get('id')
        var stationgeology = stationArray[i].get('geology')
        var batslink = 'https://bats.earth.sinica.edu.tw/Station/BATS_Stn_Summary.html#' + stationtype == 'BATS'

        if (stationtype == 'BATS') {
            if (stationname == 'ANPB' || stationname == 'TATO' || stationname == 'HWAB') {
                //var html="<div id='cwbwindow'>" + "Station" + ": " + stationname + "<br>" + "Geology" + ": "  + stationgeology + "<br>" + '<a href="javascript:openStation(' + "'" +  batslink + "'" + ')">More Info </a></div>';
                var html =
                    "<div class='iw'>" +
                    'Station' +
                    ': ' +
                    stationname +
                    '<br>' +
                    'Geology' +
                    ': ' +
                    stationgeology +
                    '<br>' +
                    '<a href="javascript:openStation(' +
                    "'" +
                    batslink +
                    "'" +
                    ')">More Info </a></div>'
            } else {
                var zlink = 'rbats/' + markerid.markerdata.cwb.timestring + '/TW.' + stationname + '.HHZ.SAC'
                $.ajax({
                    type: 'HEAD',
                    url: zlink,
                    async: false,
                    success: function (msg) {
                        haswaveform = true
                    },

                    error: function (jqXHR, textStatus, errorThrown) {
                        haswaveform = false
                    },
                })

                if (haswaveform == false) {
                    //var html="<div id='cwbwindow'>" + "Station" + ": " + stationname + "<br>" + "Geology" + ": "  + stationgeology + "<br>" + '<a href="javascript:openStation(' + "'" +  batslink + "'" + ')">More Info </a></div>';
                    var html =
                        "<div class='iw'>" +
                        'Station' +
                        ': ' +
                        stationname +
                        '<br>' +
                        'Geology' +
                        ': ' +
                        stationgeology +
                        '<br>' +
                        '<a href="javascript:openStation(' +
                        "'" +
                        batslink +
                        "'" +
                        ')">More Info </a></div>'
                } else if (haswaveform == true) {
                    //var html="<div id='batswindow'>" + "Station" + ": " + stationname + "<br>" + "Geology" + ": "  + stationgeology + "<br>" + '<a href="javascript:openSeisgram(' + "'" +  stationname + "'" + ')">View Station Waveform </a>' + "<br>" + '<a href="javascript:openStation(' + "'" +  batslink + "'" + ')">More Info </a></div>';
                    var html =
                        "<div class='iw'>" +
                        'Station' +
                        ': ' +
                        stationname +
                        '<br>' +
                        'Geology' +
                        ': ' +
                        stationgeology +
                        '<br>' +
                        '<a href="javascript:openSeisgram(' +
                        "'" +
                        stationname +
                        "'" +
                        ')">View Station Waveform </a>' +
                        '<br>' +
                        '<a href="javascript:openStation(' +
                        "'" +
                        batslink +
                        "'" +
                        ')">More Info </a></div>'
                }
            }

            stationArray[i].html = html
        }
    }
}

//Shows more information about a particular station
function openStation(link) {
    window.open(link, 'Station Info', 'location=1,status=1,scrollbars=1, width=800,height=600')
}

//Toggles the animation of the current marker
function toggleAnimation() {
    /*var animatedmarker;
  
   for (i in markersArray)
      {
        if(markersArray[i].get("type")==("newest"))
        {
            animatedmarker=markersArray[i];
        }
      }*/

    if (document.getElementById('animate').checked == true) {
        markerid.setAnimation(google.maps.Animation.BOUNCE)
    } else if (document.getElementById('animate').checked == false) {
        markerid.setAnimation(null)
    }
}

//Gets IDs of events from DB based on date. The buttons on the left side of the header trigger this function
function setDate(timelength) {
    currentTimeLength = timelength

    if (timelength == '1day') {
        var d = new Date()
        var d1 = new Date()
        d1.setDate(d.getDate() - 1)

        var fmt = $.datepicker.formatDate('yy-mm-dd', d)
        var fmt1 = $.datepicker.formatDate('yy-mm-dd', d1)
    } else if (timelength == '7day') {
        var d = new Date()
        var d1 = new Date()
        d1.setDate(d.getDate() - 7)

        var fmt = $.datepicker.formatDate('yy-mm-dd', d)
        var fmt1 = $.datepicker.formatDate('yy-mm-dd', d1)
    } else if (timelength == '30day') {
        var d = new Date()
        var d1 = new Date()
        d1.setMonth(d.getMonth() - 1)

        var fmt = $.datepicker.formatDate('yy-mm-dd', d)
        var fmt1 = $.datepicker.formatDate('yy-mm-dd', d1)
    } else if (timelength == 'user') {
        var currentDate = $('#datepicker').datepicker('getDate')
        var currentDate1 = $('#datepicker1').datepicker('getDate')
        var d = new Date(currentDate)
        var d1 = new Date(currentDate1)

        var fmt1 = $.datepicker.formatDate('yy-mm-dd', d)
        var fmt = $.datepicker.formatDate('yy-mm-dd', d1)
    }

    $.getJSON(getidurl, { start: fmt1, end: fmt }, function (data) {
        id1 = data[0]
        id2 = data[data.length - 1]
        setData(id1, id2)

        $('#dialog2').dialog('close')

        //Sort Earthquake List
        sortList(sortType, timeZone, 'skip')

        document.getElementById('accumMap').checked = false
    }).error(function () {
        console.log('set date error')
    })
}

//Gets the data after setDate() and the IDs are retrieved
//The markers are then refreshed
function setData(id1, id2, type) {
    $('#loading').show()
    $.getJSON(processdataurl, { firstid: id1, secondid: id2 })

        .done(function (data) {
            markerData = data.earthquakes
            showMarkers(data.earthquakes)

            $('#loading').hide()
        })
        .error(function () {
            console.log('processdata error')
        })
}

//Adds Palert Marker
function addAccumulatedMarkerLeaf(date, name, lat, lon, pga, intensity, time) {
    var stationcolor
    //console.log(date,name,lat,lon,pga,intensity,time);
    if (intensity == 0) {
        stationcolor = 'rgb(255,255,255)'
    }
    if (intensity > 0) {
        for (var i = 0; i < colorArray.length; i++) {
            if (colorArray[i][0] == intensity) {
                stationcolor =
                    'rgb(' +
                    parseFloat(colorArray[i][1]).toFixed(0) +
                    ',' +
                    parseFloat(colorArray[i][2]).toFixed(0) +
                    ',' +
                    parseFloat(colorArray[i][3]).toFixed(0) +
                    ')'
            }
        }
    }
    var newpga = 0
    if (pga > 0) {
        newpga = (Math.log(pga) / Math.LN10 + 2) * 3
    }
    var html =
        '<div class="iw">' +
        '時間: ' +
        date +
        '  ' +
        time +
        ' UTC' +
        '<br>' +
        '測站名稱: ' +
        name +
        '<br>' +
        '(' +
        parseFloat(lat).toFixed(2) +
        ' N ,' +
        parseFloat(lon).toFixed(2) +
        ' E) <br>' +
        'PGA: ' +
        parseFloat(pga).toFixed(2) +
        ' cm/s/s<br>' //+  "震度: "  + Math.floor(intensity) + '級</div>';
    var CircleMarker = new L.circleMarker(new L.LatLng(lat, lon), {
        radius: newpga,
        color: 'black',
        fillColor: stationcolor,
        fillOpacity: 0.7,
        weight: 2,
        opacity: 0.6,
        className: PalertMarker,
    }).bindPopup(html)
    PalertMarker.addLayer(CircleMarker)
}

//Gets Plaert station names
function getStationList() {
    $.getJSON(getstationurl, function (data) {
        stationList = data
        //console.log(stationList);
    }).error(function () {
        console.log('station list error')
    })
}

//Finds station name when palert station is clicked on
function findStationName(marker) {
    for (i in stationList) {
        if (marker.get('name') == stationList[i].Station_No) {
            stationDesc = stationList[i].Name + ',' + stationList[i].City
        }
    }
}

//Sets palert intensity coloro table
function setColorTable() {
    for (var i = 0; i < colorTable.length - 1; i++) {
        var tempArray = []
        tempArray.push((colorTable[i + 1][0] - colorTable[i][0]) / 50)
        tempArray.push((colorTable[i + 1][1] - colorTable[i][1]) / 50)
        tempArray.push((colorTable[i + 1][2] - colorTable[i][2]) / 50)
        tempArray.push((colorTable[i + 1][3] - colorTable[i][3]) / 50)

        indexArray.push(tempArray)
    }

    for (var i = 0; i < colorTable.length - 1; i++) {
        colorArray.push(colorTable[i])

        for (var j = 1; j < 50; j++) {
            var newValue = [
                (colorTable[i][0] + indexArray[i][0] * j).toFixed(2),
                colorTable[i][1] + indexArray[i][1] * j,
                colorTable[i][2] + indexArray[i][2] * j,
                colorTable[i][3] + indexArray[i][3] * j,
            ]
            colorArray.push(newValue)
        }
    }

    colorArray.push(colorTable[colorTable.length - 1])
}

//Toggles Palert Markers
function toggleMapAnimation() {
    if (document.getElementById('animateMap').checked == true) {
        infoBubble.close()

        for (i in markersArray) {
            markersArray[i].setMap(null)
        }

        for (i in accumArray) {
            accumArray[i].setMap(null)
        }
    } else if (document.getElementById('animateMap').checked == false) {
        for (i in markersArray) {
            markersArray[i].setMap(map)
        }

        console.log(accumArray)

        for (i in accumArray) {
            accumArray[i].setMap(null)
        }

        openInfoWindow(markerid)
    }
}

//Adds Earthquake center star icon to map
function addStarLeaf(data) {}
function addStar(data) {
    if (eqMarker) {
        eqMarker.setMap(null)
    }

    var starSize = 7 * data.markerdata.cwb.ML

    var image = new google.maps.MarkerImage(
        starloc,
        // This marker is 20 pixels wide by 32 pixels tall.
        null,
        // The origin for this image is 0,0.
        null,
        //new google.maps.Point(0,0),
        // The anchor for this image is the base of the flagpole at 0,32.
        new google.maps.Point(0, 0),

        //null,
        new google.maps.Size(starSize, starSize)
    )
    // new google.maps.Point(35,50)

    eqMarker = new google.maps.Marker({
        date: data.markerdata.cwb.Date,
        id: data.markerdata.cwb.CWB_ID,
        time: data.markerdata.cwb.Time,
        intensity: data.markerdata.cwb.ML,
        depth: data.markerdata.cwb.Depth,
        position: data.getPosition(),
        pga: 'N/A',
        station: 'N/A',
        type: 'eq',
        zIndex: 1000,
        icon: {
            url: starloc,
            anchor: new google.maps.Point(starSize / 2, starSize / 2),
            scaledSize: new google.maps.Size(starSize, starSize),
        },
        map: map,
    })

    bindInfoWindow(eqMarker, map, infoBubble)
}

//Gets palert station info
function getPgaFile(pgaLink) {
    $.ajax({
        url: pgaLink,
        complete: function (data) {
            newdata = data.responseText.split('\n')

            if (newdata.length > 5) {
                timedate = newdata[0].split(' ')
                pgadate = timedate[1] + '/' + timedate[2] + '/' + timedate[0]
                pgatime =
                    timedate[3][0] +
                    timedate[3][1] +
                    ':' +
                    timedate[3][2] +
                    timedate[3][3] +
                    ':' +
                    timedate[3][4] +
                    timedate[3][5]

                //addMapDiv(pgadate,pgatime);

                newdata.splice(0, 1)
                newdata.splice(newdata.length - 1, 1)

                $.each(newdata, function (key, val) {
                    var tempmarker = newdata[key].split(' ')
                    addAccumulatedMarkerLeaf(
                        pgadate,
                        tempmarker[0],
                        tempmarker[1],
                        tempmarker[2],
                        tempmarker[3],
                        tempmarker[4],
                        pgatime
                    )
                })
            }
        },
    })

    //addStar(markerid);
}

//Adds time and date to map when palert is selected
function addMapDiv(pdate, ptime) {
    pgastring = document.createElement('h1')
    pgastring.style.color = 'black'
    pgastring.style.fontSize = '18px'

    if (pdate == 'finished') {
        pgastring.innerHTML = 'Animation Complete !'
    } else if (pdate == 'clear') {
        pgastring.innerHTML = ''
    } else pgastring.innerHTML = pdate + ' ' + ptime + ' UTC'

    if (pgaDiv) {
        pgaDiv.removeChild(pgastring)
    }

    var pgaDiv = document.createElement('div')

    pgaDiv.appendChild(pgastring)

    map.controls[google.maps.ControlPosition.TOP_LEFT].clear()
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(pgaDiv)
}

$(document).ready(function () {
    $('#accumFile').click(function () {
        // hope the server sets Content-Disposition: attachment!
        //console.log(dataArray[0].pga)
        window.open(
            dataArray[0].pga.pgafilename,
            'Station Info',
            'location=0,status=1,scrollbars=1, width=800,height=600'
        )
    })
})

//Resets filter sliders
function resetSliders() {
    $('#intensityslider').slider('option', 'values', [0, 7])
    $('#depthslider').slider('option', 'values', [0, 1000])

    for (i in markersArray) {
        markersArray[i].setMap(map)
    }

    $('#intensitylabel').val(
        $('#intensityslider').slider('values', 0) + ' - ' + $('#intensityslider').slider('values', 1)
    )

    $('#depthlabel').val($('#depthslider').slider('values', 0) + ' - ' + $('#depthslider').slider('values', 1))
}

//When palert is selected, this functino is called to see if palert animation video is availble
function checkVideo() {
    $.getJSON(checkVideoLink, { id: videoname }, function (data) {
        console.log(videoname)

        console.log(data)
        if (data['gif'] == true) {
            $('#animateMap').show()
            //$('#tabs').tabs('enable', 'giftab');
            var elements = document.getElementsByName('gifradio')
            elements[0].checked = true

            giflink1 =
                'https://palert.earth.sinica.edu.tw/common/palert_media/gif/' + yeargif + '/' + videoname + '_1.gif'
            giflink2 =
                'https://palert.earth.sinica.edu.tw/common/palert_media/gif/' + yeargif + '/' + videoname + '_2.gif'
            giflink3 =
                'https://palert.earth.sinica.edu.tw/common/palert_media/gif/' + yeargif + '/' + videoname + '_3.gif'

            //$("#videourl").html("<a href=" + videolinkavi1 + ">" + "1 fps Video" + "</a>&nbsp;" + "<a href=" + videolinkavi2 + ">" + "2 fps Video" + "</a>&nbsp;" + "<a href=" + videolinkavi3 + ">" + "3 fps Video" + "</a>");
            //videoelement=document.getElementById("pgavideo");
            //videoelement.innerHTML='<source src=' + videolinkmp41 + ' type=video/mp4>';

            changegif()
        } else if (data['gif'] == false) {
            $('#tabs').tabs('disable', 'giftab')
            //currid=eqid;
            //addStar(currentMarker);
            $('#animateMap').hide()
        }
        if (data['avi'] == true) {
            $('#animateMap').show()
            //$('#tabs').tabs('enable', 'videotab');

            var elements = document.getElementsByName('speedradio')
            elements[0].checked = true
            console.log('yeargif=', yeargif)
            var videolinkavi1 =
                'common/palert_media/screenshot/' + yeargif + '/' + videoname + '/' + videoname + '.1.avi'
            console.log('videolinkavi1=', videolinkavi1)
            videolinkmp41 = 'common/palert_media/screenshot/' + yeargif + '/' + videoname + '/' + videoname + '.1.mp4'
            var videolinkavi2 =
                'common/palert_media/screenshot/' + yeargif + '/' + videoname + '/' + videoname + '.2.avi'
            videolinkmp42 = 'common/palert_media/screenshot/' + yeargif + '/' + videoname + '/' + videoname + '.2.mp4'
            var videolinkavi3 =
                'common/palert_media/screenshot/' + yeargif + '/' + videoname + '/' + videoname + '.3.avi'
            videolinkmp43 = 'common/palert_media/screenshot/' + yeargif + '/' + videoname + '/' + videoname + '.3.mp4'

            $('#videourl').html(
                '<a href=' +
                    videolinkavi1 +
                    '>' +
                    '1 fps Video' +
                    '</a>&nbsp;' +
                    '<a href=' +
                    videolinkavi2 +
                    '>' +
                    '2 fps Video' +
                    '</a>&nbsp;' +
                    '<a href=' +
                    videolinkavi3 +
                    '>' +
                    '3 fps Video' +
                    '</a>'
            )
            var videoelement = document.getElementById('pgavideo')
            videoelement.innerHTML = '<source src=' + videolinkmp41 + ' type=video/mp4>'
            videoelement.load()
        } else if (data['avi'] == false) {
            $('#tabs').tabs('disable', 'videotab')
            //startAnimation();
        }
    }).error(function () {
        console.log('check video error')
    })
}

//When video popup is open, this changes the video if radio button is clicked
function changeVideo() {
    var elements = document.getElementsByName('speedradio')
    for (var i = 0, l = elements.length; i < l; i++) {
        if (elements[i].checked) {
            videospeed = i + 1
        }
    }

    var videoelement = document.getElementById('pgavideo')

    if (videospeed == 1) {
        videoelement.innerHTML = '<source src=' + videolinkmp41 + ' type=video/mp4>'
    } else if (videospeed == 2) {
        videoelement.innerHTML = '<source src=' + videolinkmp42 + ' type=video/mp4>'
    } else if (videospeed == 3) {
        videoelement.innerHTML = '<source src=' + videolinkmp43 + ' type=video/mp4>'
    }

    videoelement.load()
}

function changegif() {
    $('#gifdiv').html()

    var elements = document.getElementsByName('gifradio')
    for (var i = 0, l = elements.length; i < l; i++) {
        if (elements[i].checked) {
            gifspeed = i + 1
        }
    }

    if (gifspeed == 1) {
        $('#gifdiv').html("<img src='" + giflink1 + "'" + 'alt="1s GIF Animation" >')
    } else if (gifspeed == 2) {
        $('#gifdiv').html("<img src='" + giflink2 + "'" + 'alt="2s GIF Animation" height="771" width="514">')
    } else if (gifspeed == 3) {
        $('#gifdiv').html("<img src='" + giflink3 + "'" + 'alt="3s GIF Animation" height="771" width="514">')
    }
}

function getDYFIlink(date, time) {
    var url = 'getdyfieqno.php'
    var eqno
    $.post(
        url,
        { date: date, time: time },
        function (data) {
            eqno = data
            var dyfilink =
                'https://tesis.earth.sinica.edu.tw/DYFI/eq_report.php?date=' +
                data.date +
                '&time=' +
                data.time +
                '&no=' +
                data.no
            var dyfisimple =
                'https://tesis.earth.sinica.edu.tw/DYFI/simple_eq_report.php?date=' +
                data.date +
                '&time=' +
                data.time +
                '&no=' +
                data.no
            var linkhtml =
                ' <div style="width:78%;display: inline-block;" title="report did you feel it of the earthquake."><a href="' +
                dyfilink +
                '" class="btn btn-danger btn-lg btn-block" lang="Earthquake Report">'
            linkhtml += '你震了嗎 ─ 回報地震</a></div>'
            linkhtml +=
                ' <div style="width:19%;display: inline-block;" title="simple version"><a style="font-size:50%;" href="' +
                dyfisimple +
                '" class="btn btn-lg btn-info btn-block" lang="Simple Ver.">'
            linkhtml += '簡易版</a></div>'
            //console.log(dyfilink);
            $('#dyfilink').html(linkhtml)
        },
        'json'
    )
}
function checkWaveformData(year, evtdir, sta, evtno) {
    var url = './new/php/checkWaveExist.php'
    var rtcode = 999
    $.ajax({
        url: url, // url位置
        type: 'post', // post/get
        async: false,
        data: { year: year, dir: evtdir, sta: sta, evtno: evtno }, // 輸入的資料
        error: function (xhr) {}, // 錯誤後執行的函數
        success: function (data) {
            rtcode = data
            //console.log("return=",data)
        },
    })
    if (rtcode == 1) {
        return true
    } else {
        return false
    }
}

function initMap_leaflet(map) {
    var map_source =
        'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiY2hpZmFuZyIsImEiOiJja2ZuYmNlMnQwc2cxMnpwMmJydXdvdGwwIn0.lFQ252Opp7N5mMrrNgWhMA' //map = L.map('map').setView([24.5, 121], 8);
    map = L.map('map', {
        center: [24.02, 121],
        //maxBounds:[[20.885,119.03],[26.315,123.01]],
        maxZoom: 15,
        minZoom: 7,
        zoom: 7,
        preferCanvas: true,
    }).locate()
    var basemap = L.tileLayer(map_source, {
        maxZoom: 15,

        attribution:
            'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        id: 'mapbox/streets-v11',
    }).addTo(map)
    var Esri_WorldImagery = L.tileLayer(
        'http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        {
            attribution:
                'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
            maxZoom: 15,
        }
    )
    var Stamen_TerrainBackground = L.tileLayer(
        'http://stamen-tiles-{s}.a.ssl.fastly.net/terrain-background/{z}/{x}/{y}.{ext}',
        {
            attribution:
                'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
            subdomains: 'abcd',
            minZoom: 0,
            maxZoom: 12,
            ext: 'png',
        }
    )
    console.log('intmap=', map)
    L.control
        .layers({
            Streets: basemap,
            Terrain: Stamen_TerrainBackground,
            'Esri WorldImagery': Esri_WorldImagery,
        })
        .addTo(map)
    return map
}
function getDepthColor(depth) {
    if (depth <= 15) {
        var markercolor = 'red'
    } else if (depth >= 15 && depth < 30) {
        var markercolor = 'yellow'
    } else if (depth >= 30 && depth < 70) {
        var markercolor = 'green'
    } else if (depth >= 70 && depth < 150) {
        var markercolor = 'turquoise'
    } else if (depth >= 150 && depth < 300) {
        var markercolor = 'purple'
    } else if (depth >= 300) {
        var markercolor = 'magenta'
    }
    return markercolor
}
function calAngle(ve, vn) {
    var ve = parseFloat(ve)
    var vn = parseFloat(vn)
    var hangle = Math.atan((vn * -1) / ve)

    var angle = (180 / Math.PI) * hangle
    if (angle < 0) {
        angle = angle + 360
    }

    if (ve < 0 && vn < 0) {
        angle = angle - 180
    }
    if (ve < 0 && vn > 0) {
        angle = angle + 180
    }
    if ((ve == 0) & (vn >= 0)) {
        angle = 90
    } else if ((ve == 0) & (vn < 0)) {
        angle = 270
    }
    if ((vn == 0) & (ve < 0)) {
        angle = 180
    }
    return angle
}
function setVector(lon, lat, ve, vn, site, map, color, am) {
    //ve east direction +, vn north direction +; am:放大倍率
    ve = parseFloat(ve)
    vn = parseFloat(vn)

    var total_length = Math.sqrt(ve * ve + vn * vn) * am
    var angle = calAngle(ve, vn)
    //console.log("site="+site+"  vn="+vn+"ve="+ve+"length="+total_length+" angle="+angle);
    if (total_length > 7) {
        var length = total_length - 7
        var arrowSvgString =
            "<svg xmlns='http://www.w3.org/2000/svg' width='" +
            total_length +
            "' height='6'>	<path d='M0 3 H" +
            length +
            ' M' +
            length +
            ' ,0 L' +
            length +
            ',6 L' +
            total_length +
            ",3 z' stroke='" +
            color +
            "' fill='" +
            color +
            "'></path></svg>"
    } else {
        var length = 0
        total_length = 7
        //var arrowWidth=3*total_length/7;
        //var totalArrowWidth=arrowWidth*2;
        var arrowWidth = 3
        var totalArrowWidth = 6
        var arrowSvgString =
            "<svg xmlns='http://www.w3.org/2000/svg' stroke-width='2' width='" +
            total_length +
            "' height='6'>	<path d='M" +
            length +
            ' ,0 L' +
            length +
            ',' +
            totalArrowWidth +
            ' L' +
            total_length +
            ',' +
            arrowWidth +
            " z' stroke='" +
            color +
            "' fill='" +
            color +
            "'></path></svg>"
    }
    //var arrowSvgString = "<svg xmlns='http://www.w3.org/2000/svg' width='"+total_length+"' height='6'>	<path d='M0 3 H"+length+" M"+length+" ,0 L"+length+",6 L"+total_length+",3 z' stroke='"+color+"' fill='"+color+"'></path></svg>";
    var myArrowIconUrl = encodeURI('data:image/svg+xml,' + arrowSvgString).replace(/#/gi, '%23')
    var arrowIcon = L.Icon.extend({
        options: {
            iconSize: [60, 6],
            iconAnchor: [0, 3],
            popupAnchor: [0, 3],
        },
    })
    var arrow = new arrowIcon({ iconUrl: myArrowIconUrl, iconSize: [length, 6] })
    var puptext = ''
    var html = '測站名稱:' + site + '</br> Un:' + vn + 'mm/yr </br>Ue:' + ve + 'mm/yr'
    var arrowMarker = L.marker([lat, lon], { icon: arrow, rotationAngle: angle }).bindPopup(html)

    return arrowMarker
}
function setGPSStation(lon, lat, html, map) {
    var circleMarler = L.circleMarker([lat, lon], {
        radius: 2.5,
        weight: 1,
        color: '#000',
        fillColor: '#ea0000',
    }).bindPopup(html)
    return circleMarler
}
function readGPSFile(filepath, type) {
    if (type === undefined) {
        type = 1
    }
    console.log('path=', filepath)
    var url = './common/php/readGPSfile.php'
    var Data = []
    $.ajax({
        url: url,
        method: 'GET',
        data: { name: filepath, type: type },
        dataType: 'json',
        async: false,
        success: function (data) {
            //console.log("data=",data);
            var InterSeismicData = []
            for (var i in data) {
                //lon, lat, dn, sn, de, se, du, su, site
                if (data[i] != null) {
                    if (data[i].length == 9) {
                        var lon = data[i][0]
                        var lat = data[i][1]
                        var dn = data[i][2]
                        var de = data[i][4]
                        var site = data[i][8]
                        Data.push({ lon: lon, lat: lat, dn: dn, de: de, site: site })
                        //console.log(data[i].length+"/"+lon+"/"+lat+"/"+dn+"/"+de+"/"+site);
                    }
                }
            }
        },
    })
    return Data
    //console.log('data=',Data);
}
function pushArrow(fileName, type, color, am, Layer, map) {
    var data = readGPSFile(fileName, type)
    console.log(data)
    for (var i in data) {
        //console.log(data[i].lon);
        Arrow = setVector(data[i].lon, data[i].lat, data[i].de, data[i].dn, data[i].site, map, color, am)

        var html = '測站名稱:' + data[i].site + '</br> Un:' + data[i].dn + 'mm/yr </br>Ue:' + data[i].de + 'mm/yr'
        Circle = setGPSStation(data[i].lon, data[i].lat, html, map)
        if (Layer == 'Inter') {
            InterSeismicMarker.addLayer(Arrow)
            InterSeismicMarker.addLayer(Circle)
        } else if (Layer == 'Co') {
            CoSeismicMarker.addLayer(Arrow)
            CoSeismicMarker.addLayer(Circle)
        }
    }
}
