<script setup>
import { ref, watch } from 'vue'

// const name = ref('Jay')
// const setname = () => {
//     name.value = 'Mike'
// }
const num = ref(5)

watch(num, (newnum) => {
    console.log(newnum)
})
</script>

<template>
    <div>
        <input type="text" v-model.trim="num" />
        <!-- .trim 自動修剪用戶輸入的空白 -->
        {{ num }}
        <!-- <button @click="setname">Change_name</button> -->
    </div>
</template>

<style></style>
