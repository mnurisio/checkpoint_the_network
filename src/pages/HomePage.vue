<script setup>
import { AppState } from '@/AppState';
import PageNav from '@/components/PageNav.vue';
import PostForm from '@/components/PostForm.vue';
import PostsCard from '@/components/PostsCard.vue';
import { postsService } from '@/services/PostsService';
import Pop from '@/utils/Pop';
import { computed, onMounted, onUpdated, watch } from 'vue';

const posts = computed(() => AppState.posts)


onMounted(() => {
  postsService.clearPosts()
  getPosts()
})


async function getPosts() {
  try {
    await postsService.getPosts()
  }
  catch (error) {
    Pop.meow(error);
  }
}



</script>

<template>
  <div class="container-fluid">
    <PageNav />
    <PostForm />
    <section class="row justify-content-between">
      <div class="col-3 text-center">This will be sidebar profile</div>


      <div class="col-8 text-center">
        <div v-for="post in posts" :key="post.id" class="card my-3">
          <PostsCard :postProp="post" />
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss"></style>
