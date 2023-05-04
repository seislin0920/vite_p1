<script setup>
import { ref, computed } from 'vue'
import hellow from '@/components/HelloWorld.vue'
import ep3 from '@/components/EP3.vue'
import ep3emit from '@/components/EP3_emit.vue'
import tile from '@/components/tile.vue' //src目錄下
import ep4 from '@/components/EP4.vue'
import vuelogo from '@/assets/vue.svg'

const ischang = ref(0)
const components = computed(() => {
    switch (ischang.value) {
        case 0:
            return hellow
        case 1:
            return ep3
        case 2:
            return ep3emit
        case 3:
            return tile
        case 4:
            return ep4

        default:
            return tile
    }
})

//ep3emit
const changecomponents = (idx) => {
    ischang.value = idx
}
const show = ref()
const clallback = (res) => {
    show.value = res
    console.log('callback=>', res)
}
</script>

<template>
    <header>
        <button @click="changecomponents(0)">hellow</button>
        <button @click="changecomponents(1)">ep3</button>
        <button @click="changecomponents(2)">ep3emit</button>
        <button @click="changecomponents(3)">tile</button>
        <button @click="changecomponents(4)">ep4</button>

        <div>
            <component :is="components" />
        </div>

        <div>
            <!-- <ep3emit @add="clallback" /> -->
            <!-- {{ show }} -->
            <!-- <ep3 alt="v logo" class_name="logo" :src="vuelogo" width="250" height="250" title="Hello Jay" /> -->
        </div>
    </header>
</template>

<style></style>
