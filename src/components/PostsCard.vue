<script setup>

import { AppState } from '@/AppState';
import { Post } from '@/models/Posts';
import { postsService } from '@/services/PostsService';
import Pop from '@/utils/Pop';
import { computed, onMounted } from 'vue';

const account = computed(() => AppState.account)

const props = defineProps({
    postProp: { type: Post, required: true }
})


async function likePostByProfileId() {
    try {
        const postId = props.postProp.id
        await postsService.likePostByProfileId(postId)
        this.getPosts()
    }
    catch (error) {
        Pop.meow(error);
    }
}

async function getPosts() {
  try {
    await postsService.getPosts()
  }
  catch (error) {
    Pop.meow(error);
  }
}

async function deletePost() {
    try {
        const deleteMessage = 'You sure you want to delete this post?'
        const confirm = await Pop.confirm(deleteMessage)
        if (!confirm) { return }
        const postId = props.postProp.id
        await postsService.deletePost(postId)
    }
    catch (error) {
        Pop.error(error);
    }
}
</script>


<template>
    <div class="card-body">
        <div class="row justify-content-end me-3">
            <button v-if="postProp.creatorId == account?.id" @click="deletePost()" class="col-1 btn btn-danger">
                <i class="mdi mdi-delete"></i>
            </button>
        </div>
        <div class="row align-items-center">
            <div class="col-3">
                <router-link :to="{ name: 'Profile', params: { profileId: postProp.creatorId } }">
                    <img :src="postProp.creator.picture" class="creator-img" :alt="postProp.creator.name">
                </router-link>
            </div>
            <div class="col-8">
                <h5 class="card-title text-start">{{ postProp.creator.name }}</h5>
                <div class="row align-items-center">
                    <h6 class="text-start col-5">{{ postProp.createdAt.toLocaleDateString() }}</h6>
                    <h6 class="col-6 text-start ps-0 mb-1" v-if="postProp.creator.graduated"><i
                            class="mdi mdi-account-school graduated"></i></h6>
                </div>
            </div>
        </div>
        <p class="card-text my-3 text-start px-4 fs-5 py-3">{{ postProp.body }}</p>
        <img class="mb-3" v-if="postProp.imgUrl" :src="postProp.imgUrl" :alt="postProp.creator">
        <div class="row justify-content-end align-items-center p-0 mb-3">
            <button @click="likePostByProfileId()" class="btn btn-outline-primary col-1 text-center"><i
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
    border-bottom: 2px dashed blue;
}
</style>

<!-- <div v-if="postProp.creatorId == account.id" class="col-4 text-start ms-3 mb-2">
    <button @click="deletePost()" class="btn btn-danger">
        <i class="mdi mdi-trash-can"></i>
    </button>
</div> -->