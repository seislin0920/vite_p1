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
        {{ num }}
        <!-- <button @click="setname">Change_name</button> -->
    </div>
</template>

<style></style>
