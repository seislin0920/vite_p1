import $ from 'jquery'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usefaultPlot = defineStore('faults', () => {
    //link
    let faultpath = 'src/components/statics/fault2014.dat'
    //readFaultData & //Processes line
    let tempArray = ref([])
    let errorCount = 0
    $.ajax({
        url: faultpath,
        method: 'Get', //request method
        async: false, //async 同步請求
        success: (res) => {
            // let spiltX = res.split('X')
            res.trim()
                .split('X')
                .forEach((fault) => {
                    let tmpfault = []
                    fault
                        .trim()
                        .split('\n')
                        .forEach((lines) => {
                            let LnLg = lines.split(' ')
                            tmpfault.push([parseFloat(LnLg[0]), parseFloat(LnLg[1])])
                            // console.log(tmpfault)
                        })
                    tempArray.value.push(tmpfault)
                })
            if (errorCount === 0) {
                // console.log(JSON.stringify(tempArray))
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            // console.error(jqXHR, textStatus, errorThrown)
            console.error('No Data')
        },
    })
    // console.log(tempArray)

    //Geographical Lines Color Arrays
    let ODindex = [0, 1, 2, 14, 18, 23, 24, 25, 26, 27, 29, 30, 31, 33, 35, 40, 41]
    let OSindex = [14, 25, 35]
    let BDindex = ref([])
    let BSindex = [4, 5, 13, 16, 17, 20, 21, 28, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58] //TODO:BSindex
    let RDindex = [3, 6, 7, 8, 9, 10, 11, 12, 15, 19, , 22, 32, 34, 36, 37, 38, 39]
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
        [[29], ['潮州斷層']],
        [[30], ['潮州斷層']], // TODO:原本是'潮州斷層'沒被括號
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
    // console.log(tempArray.value.length)
    let test = ref([])
    leafLines(tempArray.value)

    function leafLines(latArray) {
        for (let i = 0; i < latArray.length; i++) {
            for (let j = 0; j < lineName.length; j++) {
                if (lineName[j][0] == i) {
                    let div = document.createElement('div')
                    div.insertAdjacentHTML('beforeend', ``)
                    let html = `
                    ${lineName[i][1]}
                    <div>
                    Comming soon ...
                    <br/>
                    <a>詳細資訊</a>
                    </div>`
                    // '<div class="iw">' +
                    // lineName[i][1] +
                    // '<br>' +
                    // '<a href="javascript:lineInfo(' +
                    // "'" +
                    // lineName[i][1] +
                    // "'" +
                    // ')">詳細資訊 </a>' +
                    // '</div>'

                    // console.log(lineName[i][1])
                    test.value.push({ name: lineName[i][1], latlong: latArray[i], html: html })
                }
            }
        }
    }
    console.log(test.value)
    return { tempArray, test }
})
