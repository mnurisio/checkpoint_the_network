<script setup>
import { Post } from '@/models/Posts';


const props = defineProps({
    postProp: { type: Post, required: true }
})
</script>


<template>
    <div class="card-body row align-items-center">
        <div class="col-2">
            <router-link :to="{name: 'Profile', params: {profileId: postProp.creatorId}}">
                <img :src="postProp.creator.picture" class="creator-img" :alt="postProp.creator.name">
            </router-link>
        </div>
        
        <div class="col-4 ">
            <h5 class="card-title text-start">{{ postProp.creator.name }}</h5>
            <div class="row align-items-center">
                <h6 class="text-start col-4">{{ postProp.createdAt.toLocaleDateString() }}</h6>
                <h6 class="col-6 text-start ps-0 mb-1" v-if="postProp.creator.graduated"><i
                        class="mdi mdi-account-school graduated"></i></h6>
            </div>
        </div>
        <p class="card-text my-3 text-start px-4 fs-5 pt-3">{{ postProp.body }}</p>
    </div>
</template>


<style lang="scss" scoped>
.creator-img {
    height: 8rem;
    aspect-ratio: 1/1;
    border-radius: 50%;
    object-fit: cover;
}

.graduated{
    color: rgb(1, 158, 158);
}

.card-text{
border-top: 2px dashed blue;
}
</style>