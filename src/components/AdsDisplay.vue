<script setup>

import { Ad } from '@/models/Ads';



const props = defineProps({
    adProp: { type: Ad, required: true }
})
</script>


<template>
    <div >
        <img class="adImg mt-3 img-fluid" :src="adProp.banner" :alt="adProp.title">   
    </div>
</template>


<style lang="scss" scoped>
.adImg {
    height: 10em;
    object-fit: cover;
    width: 100%
}
</style>