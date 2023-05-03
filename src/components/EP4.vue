<script>
export default {
    data() {
        return {
            isChecked: false,
            message: '選擇我',
        }
    },
    methods: {
        onChange() {
            console.log('checkbox狀態已改變')
            // 在這裡添加你想要執行的程式碼
        },
    },
}
</script>

<template>
    <div>Checked names: {{ checkedNames }}</div>

    <input type="checkbox" id="checkbox" v-model="isChecked" v-on:change="onChange" />
    <label for="checkbox">{{ message }}</label>
</template>

<style></style>
