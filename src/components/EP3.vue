<script setup>
const props = defineProps({
    //定義props
    alt: {
        type: String,
        default: 'None',
    },
    class_name: {
        type: String,
        default: 'icon',
    },
    src: {
        type: String,
        default: 'src/assets/vue.svg',
    },
    width: {
        type: String,
        default: '125',
    },
    height: {
        type: String,
        default: '125',
    },
    title: {
        type: String,
        default: 'Hello Vue',
    },
    obj: {
        type: Object,
        default: () => ({}),
        // default: () =>{return{}}
    },
    arr: {
        type: Array,
        default: () => [],
    },
})
</script>

<template>
    <div>
        <h1>{{ props.title }}</h1>
        <!-- `:`爲`v-bind:`之語法堂 -->
        <img
            :class="props.class_name"
            :alt="props.alt"
            v-bind:src="props.src"
            :width="props.width"
            :height="props.height"
        />
    </div>
</template>
