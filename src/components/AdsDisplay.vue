<script setup>

import { Ad } from '@/models/Ads';



const props = defineProps({
    adProp: { type: Ad, required: true }
})
</script>


<template>
    <img class="adImg mt-3" :src="adProp.banner" :alt="adProp.title">   
</template>


<style lang="scss" scoped>
.adImg {
    height: 100%;
    object-fit: cover;
    width: 100%
}
</style>