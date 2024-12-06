<script setup>
import { AppState } from '@/AppState';
import { postsService } from '@/services/PostsService';
import Pop from '@/utils/Pop';
import { computed, onMounted } from 'vue';

const posts = computed(()=> AppState.posts)

onMounted(()=> {
  getPosts()
})

async function getPosts(){
  try {
    await postsService.getPosts()
  }
  catch (error){
    Pop.meow(error);
  }
}
</script>

<template>
 <p>{{posts}}</p>
</template>

<style scoped lang="scss">

</style>
