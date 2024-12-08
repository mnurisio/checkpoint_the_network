<script setup>
import { AppState } from '@/AppState';
import { postsService } from '@/services/PostsService';
import Pop from '@/utils/Pop';
import { computed, ref } from 'vue';


const currentPage = computed(() => AppState.currentPage)
const totalPages = computed(() => AppState.totalPages)
const posts = computed(() => AppState.posts)


const editableSearchQuery = ref('')

async function changePage(pageNumber) {
  try {
    await postsService.changeHomePage(pageNumber)
  }
  catch (error) {
    Pop.error(error);
  }
}

async function searchPosts() {
  try {
    await postsService.searchPosts(editableSearchQuery.value)
  }
  catch (error) {
    Pop.error(error);
  }
}

</script>


<template>
  <div class="row justify-content-center align-items-center">
    <div class="col-7 text-end">
      <button @click="changePage(currentPage - 1)" class="btn btn-primary m-3">Previous</button>
      <span> Page {{ currentPage }} of {{ totalPages }}</span>
      <button @click="changePage(currentPage + 1)" class="btn btn-primary m-3">Next</button>
    </div>
    <div class="col-5">
      <form @submit.prevent="searchPosts()" class="form-floating">
        <input v-model="editableSearchQuery" type="text" class="form-control" id="floatingInputValue"
          placeholder="Search Posts">
        <label for="searchQuery">Search Posts...</label>
      </form>
    </div>
  </div>
</template>


<style lang="scss" scoped></style>
