<script setup lang="ts">
import { GDialog } from 'gitart-vue-dialog';
import 'gitart-vue-dialog/dist/style.css';
import { storeToRefs } from 'pinia';
import { nextTick, onMounted, watch } from 'vue';
import { sacPlots } from '/home/linjay/vue_p/vite_p1/src/components/statics/sacPlot/newSacPlot.js';
import { useBATS } from '/home/linjay/vue_p/vite_p1/src/stores/batsData.js';
import { useDialog } from '/home/linjay/vue_p/vite_p1/src/stores/dialog.js';

const { dialogState } = storeToRefs(useDialog())
const { waveform } = storeToRefs(useBATS())

onMounted(() => {
    // watch(dialogState, (open) => {
    //     if (open) {
    //         getWaveformData()
    //     }
    // })

    watch(waveform, (data) => {
        console.log(data);

        let chart = sacPlots().data(data);
        document.querySelectorAll(".graphics>div>*").forEach(child => child.remove());
        // 使用 $nextTick 确保 .graphics 節點已经生成
        nextTick(() => {
            // console.log(document.querySelector('.graphics'));
            chart.selector(".graphics>div");
            chart();
        });
    });
})
</script>

<template>
    <GDialog v-model="dialogState" :max-width="'1000px'">
        <div class="wrapper">
            <div class="content">
                <!-- x icon-->
                <button type="button" class="close" @click="dialogState = false">
                    <span aria-hidden="true">&times;</span>
                </button>
                <div class="title">波形資料</div>
                <div class="graphics container d-flex align-items-center justify-content-center">
                    <div></div>
                </div>
            </div>
        </div>
    </GDialog>
</template>

<style>
.g-dialog-overlay {
    z-index: 2000 !important;
}

.g-dialog-frame {
    z-index: 3000 !important;
}
</style>

<style lang="scss" scoped>
.wrapper {
    color: #000;

    .content {
        padding: 20px;

        .title {
            font-size: 30px;
            font-weight: 700;
            margin-bottom: 20px;
            text-align: center;
        }

        button {
            &.close {
                padding: 0;
                background-color: transparent;
                border: 0;
                float: right;
                font-size: 1.5rem;
                font-weight: 700;
                line-height: 1;
                color: #000;
                text-shadow: 0 1px 0 #fff;
                opacity: 0.5;

                &:hover {
                    color: #06d85f;
                }
            }
        }
    }
}

.graphics {
    img {
        width: 80%;
    }

    div {
        width: 100%;
    }
}
</style>

<!-- 圖表相關css -->
<style lang="scss" scoped>
/* tooltop,nav-menu...通用css */
:deep(.graphics) {

    text,
    label,
    a,
    option {
        user-select: none;
    }

    .toggle-menu {
        position: relative;
        right: 0;

        ul {
            width: 200px;
            height: 200px;
            position: absolute;
            top: 100%;
            right: 0px;
            padding: 0px 0px 0px 0px;
            box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.15);
            border: rgb(197, 197, 197) 1px solid;
            border-radius: 3px;
            background-color: #fff;
        }

        li {
            float: none;
            display: block;

            a {
                text-decoration: none;
                color: #777;
                text-align: center;
                font-size: 16px;

                &:hover {
                    background: #1abc9c;
                    color: #fff;
                }
            }
        }

        .toggle-nav {
            padding: 5px 9px 5px 10px;
            display: inline-block;
            box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.15);
            border: rgb(197, 197, 197) 1px solid;
            border-radius: 3px;
            text-shadow: 0px 1px 0px rgba(0, 0, 0, 0.5);
            color: #777;
            font-size: 20px;
            text-decoration: none;
            position: relative;
            right: 10px;

            &:hover,
            &.show {
                color: rgba(0, 0, 0, 0.658);
            }
        }
    }

    .dropdown-menu {
        padding: 10px 20px;
    }

    .form-group {
        margin-bottom: 1rem;
    }

    .grid .tick {
        stroke: lightgrey;
        opacity: 0.7;
    }

    .tooltip {
        position: absolute;
        z-index: 999;
        background-color: #d3d3d3;
        padding: 20px 20px 20px 20px;
        opacity: 0.9;
        display: none;
        pointer-events: none;
        white-space: nowrap;
    }
}

/* sacPlot css*/
:deep(.graphics > #sacPlot) {
    .yAxis .domain {
        stroke: none;
    }

    .chart {
        position: relative;
        padding: 10px 15px;
    }
}
</style>
