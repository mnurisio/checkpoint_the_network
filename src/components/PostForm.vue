<script setup>
import { AppState } from '@/AppState';
import { postsService } from '@/services/PostsService';
import Pop from '@/utils/Pop';
import { computed, ref } from 'vue';


const account = computed(() => AppState.account)

const editablePostData = ref({
    body: '',
    imgUrl: ''
})

async function createPost() {
    try {
        await postsService.createPost(editablePostData.value)
        editablePostData.value = {
            body: '',
            imgUrl: ''
        }
    }
    catch (error) {
        Pop.error(error);
    }
}

</script>


<template>
    <div v-if="account != null">
        <div class="row justify-content-end">
            <div class="col-8">
                <div class="card bg-secondary">
                    <form @submit.prevent="createPost()" class="p-3">
                        <div class="form-floating mb-3">
                            <input v-model="editablePostData.body" type="text" class="form-control" id="body"
                                placeholder="Share Your Thoughts..." required maxlength="5000">
                            <label for="body">Share Your Thoughts...</label>
                        </div>
                        <div class="form-floating">
                            <input v-model="editablePostData.imgUrl" type="url" class="form-control" id="imgUrl"
                                placeholder="image/gif">
                            <label for="imgUrl">Add an Image</label>
                        </div>
                        <div class="d-flex justify-content-end pt-3">
                            <button class="btn btn-primary">Post</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>


<style lang="scss" scoped></style>