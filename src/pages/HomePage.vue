<script setup>
import { AppState } from '@/AppState';
import AdsDisplay from '@/components/AdsDisplay.vue';
import PostsCard from '@/components/PostsCard.vue';
import { Post } from '@/models/Posts';
import { adsService } from '@/services/AdsService';
import { postsService } from '@/services/PostsService';
import Pop from '@/utils/Pop';
import { computed, onMounted } from 'vue';

const posts = computed(() => AppState.posts)
const ads = computed(() => AppState.ads)

onMounted(() => {
  getPosts()
  getAds()
})

async function getPosts() {
  try {
    await postsService.getPosts()
  }
  catch (error) {
    Pop.meow(error);
  }
}

async function getAds() {
  try {
    await adsService.getAds()
  }
  catch (error) {
    Pop.meow(error);
  }
}
</script>

<template>
  <div class="container-fluid">
    <section class="row justify-content-between">
      <div class="col-3 text-center">This will be sidebar profile</div>


      <div class="col-6 text-center">
        <div v-for="post in posts" :key="post.id" class="card my-3">
          <PostsCard :postProp="post" />
        </div>
      </div>
      <div class="col-3">
        <div v-for="ad in ads" :key="ad.id" >
          <AdsDisplay :adProp="ad" /> 
        </div>
    </div>
      
    </section>
  </div>
</template>

<style scoped lang="scss">

</style>

