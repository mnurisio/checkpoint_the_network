<script setup>
import Navbar from './components/Navbar.vue';
import { AppState } from './AppState.js';
import AdsDisplay from './components/AdsDisplay.vue';
import { adsService } from './services/AdsService';
import Pop from './utils/Pop';
import { computed, onMounted } from 'vue';
import ProfilePage from './pages/ProfilePage.vue';


const ads = computed(() => AppState.ads)

onMounted(() => {
  getAds()
})

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
  <header>
    <Navbar />
  </header>
  <main>
    <div class="container-fluid">
      <div class="row">
        <div class="col-8">
          
          <router-view />
        </div>
        <div class="col-md-3">
          <div v-for="ad in ads" :key="ad.id">
            <AdsDisplay :adProp="ad" />
          </div>
        </div>
      </div>
    </div>


  </main>
  <footer class="bg-dark text-light">
    Sponsored by the International Man of Mystery, Inc.
  </footer>
</template>

<style lang="scss">
@import '@/assets/scss/main.scss';

:root {
  --main-height: calc(100vh - 32px - 64px);
}

footer {
  display: grid;
  place-content: center;
  height: 32px;
}
</style>
