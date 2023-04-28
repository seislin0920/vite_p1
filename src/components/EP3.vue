<script setup>
    const props = defineProps({
    alt:{
        type:String,
        default:"None",
    },
    class_name:{
        type:String,
        default:"icon",
    }, 
    src:{
        type:String,
        default:"",
    }, 
    width:{
        type:String,
        default:"125",
    }, 
    height:{
        type:String,
        default:"125",
    },
    title:{
        type:String,
        default:"Hello Vue",
    }
    });
</script>

<template>
    <div>
        <h1>{{ props.title }}</h1>
        <img 
            :class="props.class_name"
            :alt="props.alt"
            :src="props.src"
            :width="props.width"
            :height="props.height"
        />
    </div>
</template>