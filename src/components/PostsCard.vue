<script setup>

import { AppState } from '@/AppState';
import { Post } from '@/models/Posts';
import { postsService } from '@/services/PostsService';
import Pop from '@/utils/Pop';
import { computed, onMounted, watch } from 'vue';



const props = defineProps({
    postProp: { type: Post, required: true }
})


async function likePostByProfileId() {
    try {
        const postId = props.postProp.id
        await postsService.likePostByProfileId(postId)
    }
    catch (error) {
        Pop.meow(error);
    }
}
</script>


<template>
    <div class="card-body row align-items-center">
        <div class="col-2">
            <router-link :to="{ name: 'Profile', params: { profileId: postProp.creatorId } }">
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
        <div class="row justify-content-end align-items-center p-0">
            <button @click="likePostByProfileId()" class="btn btn-outline-danger col-1 text-center"><i
                    class="mdi mdi-heart"></i></button>
            <h5 class="pe-5 col-1 m-0 text-center">{{ postProp.likes.length }}</h5>
        </div>
    </div>
</template>


<style lang="scss" scoped>
.creator-img {
    height: 8rem;
    aspect-ratio: 1/1;
    border-radius: 50%;
    object-fit: cover;
}

.graduated {
    color: #0D6EFD;
}

.card-text {
    border-top: 2px dashed blue;
}
</style>