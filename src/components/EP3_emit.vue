<script setup>
import { ref } from 'vue'

//定義emit回傳判斷式
const emit = defineEmits({
    add: (playload) => {
        if (playload === 'Jay') {
            return true
        } else {
            return false
        }
    },
})

const a = ref(1)
const b = ref(2)
const handleclick = () => {
    //觸發函式並emit
    const total = a.value + b.value
    emit('add', 'Jay') //回傳給`add`
}
</script>

<template>
    <div>
        <!-- <button v-on:click="handleclick">click</button> 語法堂如下-->
        <button @click="handleclick">click</button>
    </div>
</template>
