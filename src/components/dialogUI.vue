<script setup lang="ts">
import { sacPlots } from '@/components/statics/sacPlot/newSacPlot.js';
import type { dialogUIType } from "@/components/statics/types";

import { waveXdist } from '@/components/statics/WD_online/waveXdist.js';
import { useAuthStore } from "@/stores/authStore";
import { useDataFileStore } from "@/stores/getDataFile";
import { usePGAListStore } from "@/stores/getPGAList";
import { GDialog } from 'gitart-vue-dialog';
import 'gitart-vue-dialog/dist/style.css';
import { storeToRefs } from 'pinia';
import { onMounted, reactive, watch, type PropType } from "vue";
import { useReCaptcha } from 'vue-recaptcha-v3';

const dataFileStore = useDataFileStore();
const { waveforms, fileData } = storeToRefs(dataFileStore);
const PGAListStore = usePGAListStore();
const { PGAList } = storeToRefs(PGAListStore);
const reCaptcha = useReCaptcha();
const { executeRecaptcha, recaptchaLoaded } = reCaptcha;

const props = defineProps({
  dialogControls: {
    type: Object as PropType<dialogUIType>,
    default: null,
    required: false,
  },
});
const dialogControls = props.dialogControls;

const userLog = reactive({
  email: '',
  affiliation: '',
});
const downloadSubmit = async () => {
  // (optional) Wait until recaptcha has been loaded.
  await recaptchaLoaded();
  let recaptchaToken = await executeRecaptcha("download");
  let success = await useAuthStore().checkToken({
    recaptcha: recaptchaToken,
  });
  // console.debug(success);
  if (success) {
    dataFileStore.getDataFile(userLog);
    Object.assign(dialogControls, {
      openState: false,
    });
  };
};

onMounted(() => {
  //==根據要呈現內容取得資料
  watch(dialogControls.content, (content) => {
    // console.debug(content);
    dataFileStore.resetFileState();

    let type = content.type,
      data = content.data;

    let maxWidth = 1200;
    switch (type) {
      case 'downloadForm':
        maxWidth = 800;
        // console.debug(reCaptcha.instance)
        // reCaptcha.instance.value.showBadge();
        break;
      case 'sacPlot':
        dataFileStore.getWaveform(data.event, data.station);
        break;
      case 'travelTimeCurve':
        import('@/components/statics/WD_online/bootstrap-slider.min.css');
        dataFileStore.getWaveform(data.event);
        break;
      default:
        let typeIdx = {
          'polarPlot': 2,
          'scatterPlot1': 3,
          'gif1': 4,
          'gif2': 5,
          'gif3': 6,
          'scatterPlot2': 7,
          'pgaPlot': 8,
        }[type];
        dataFileStore.getEventFiles(data.event, typeIdx);
        maxWidth = 800;
        break;
    };

    Object.assign(dialogControls, {
      openState: true,
      maxWidth,
    });

  }, { deep: true });

  // watch(() => dialogControls.openState, (open) => {
  //   // let gdialogContent = document.querySelector('.g-dialog-content');
  //   // console.debug(gdialogContent)
  //   // gdialogContent.addEventListener('keydown', (e) => {
  //   //   console.debug(e)
  //   // })
  //   console.debug('open = ' + open);
  // }, { deep: true });

  //==圖表資料要餵給畫圖程式
  watch(waveforms, (data) => {
    // console.debug(data);
    let chart;
    switch (dialogControls.content.type) {
      case 'sacPlot':
        data[0].network = 'P-Alert';
        chart = sacPlots().data(data[0]);
        break;
      case 'travelTimeCurve':
        let az_dist = PGAList.value.reduce((acc: { [key: string]: any }, obj) => {
          const key = obj['staCode'];
          const curGroup = acc[key] ?? [];
          return { ...acc, [key]: { ...curGroup, ...obj } };
        }, {});
        // console.debug(az_dist)

        const PAlert = { E: [], N: [], Z: [] };
        data.forEach(d => {
          let staCode = d.staCode;
          let staData = d.waveform;
          let AD = az_dist[staCode];

          Object.keys(staData).forEach(cha => {
            // console.debug(cha.slice(-1))
            let tmp = {
              az: AD.az,
              dist: AD.dist,
              network: 'PAlert',
              station: staCode,
              channel: cha,
              data: staData[cha].y,
              column: ['amplitude'],
            };
            PAlert[cha.slice(-1)].push(tmp);
          });

        });

        let newData = {
          dataNet: { PAlert, column: ['PAlert'] },
          timeArr: data[0].waveform['HLE'].x,
        };
        let referenceTime = data[0]?.event;
        chart = waveXdist()
          .data(newData)
          .string({ referenceTime });
        // console.debug(newData);
        break;
    };
    document.querySelectorAll(".graphics>div>*").forEach(child => child.remove());
    chart.selector(".graphics>div");
    chart();
  });
});
</script>

<template>
  <GDialog v-model="dialogControls.openState" :max-width="dialogControls.maxWidth">
    <div class="wrapper">
      <div class="content">
        <!-- x icon-->
        <button type="button" class="close">
          <span aria-hidden="true" @click="dialogControls.openState = false">&times;</span>
        </button>
        <div class="title">{{ $t(dialogControls.content.type) }}</div>
        <div class="graphics container d-flex align-items-center justify-content-center">
          <img v-if="fileData.length" :src="fileData[0].data" />
          <div v-show="waveforms.length" :id="dialogControls.content.type"></div>
        </div>
        <!-- download form-->
        <form v-if="dialogControls.content.type === 'downloadForm'">
          <div class="mb-3">
            <label for="formEmail" class="form-label">{{ $t('downloadForm_email') }}</label>
            <input v-model="userLog.email" type="email" class="form-control" id="formEmail"
              placeholder="name@example.com">
          </div>
          <div class="mb-3">
            <label for="formAffiliation" class="form-label">{{ $t('downloadForm_affiliation') }}</label>
            <input v-model="userLog.affiliation" type="text" class="form-control" id="formAffiliation">
          </div>
          <button type="submit" class="btn btn-secondary me-2" @click="downloadSubmit()"
            :disabled="(!userLog.email || !userLog.affiliation)">
            {{ $t("downloadSubmit") }}
          </button>
        </form>

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
    position: absolute;
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

/* DistxWave css*/
:deep(.graphics>#travelTimeCurve) {
  --w: 150px;
  --list-length: 4;
  --sidePadding: 2px;

  #NSRange {
    width: var(--w);
  }

  #NSList {
    display: block;
    margin-top: -10px;

    option {
      display: inline-block;
      width: calc((var(--w) - var(--sidePadding)) / ((var(--list-length) - 1)));
      text-align: center;
      text-anchor: middle;

      /* alignment-baseline: text-before-edge; */
      // font-weight: bold;

      /* font-size: 100; */
      &:first-child {
        width: calc((var(--w) - var(--sidePadding)) / ((var(--list-length) - 1) * 2));
        text-align: left;
        padding-left: 3px;
      }

      &:last-child {
        width: calc((var(--w) - var(--sidePadding)) / ((var(--list-length) - 1) * 2));
        text-align: right;
        padding-left: 12px;
      }
    }
  }

  #xAxisName_radioGroup {
    input[name="xAxisRange"] {
      max-width: 40%;
    }

    .dropdown-menu {
      left: auto;
      right: 0;
      top: 100%;
    }
  }

  .slider-handle {
    --slider-handle-width: 16px;
    width: var(--slider-handle-width);
    height: var(--slider-handle-width);
    margin-top: calc(10px - var(--slider-handle-width) * 0.5);
  }

  .slider-selection {
    background: #0480be;
  }

  .slider-track {
    border-color: #afafafb9;
    border-style: solid;
    border-width: 1px;
  }

  #displayMenu {
    max-width: 220px;
  }

  #channelMenu {
    max-width: 180px;
  }

  #chartMain {
    position: relative;
  }

  #loading {
    --loading-width: 150px;
    --loading-height: 60px;

    position: absolute;
    width: var(--loading-width);
    height: var(--loading-height);
    left: calc(50% - var(--loading-width) * 0.5);
    top: calc(50% - var(--loading-height));
    z-index: 50;
    padding: 10px 10px;
    background: #3c3c3c;
    color: #fff;
    text-align: center;
    box-shadow: 2px 2px 10px;
    border-radius: 5px;
  }
}

/* sacPlot css*/
:deep(.graphics>#sacPlot) {
  .yAxis .domain {
    stroke: none;
  }

  .chart {
    position: relative;
    padding: 10px 15px;
  }
}
</style>





