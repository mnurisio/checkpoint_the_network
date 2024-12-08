<script setup>
import { computed } from 'vue';
import { AppState } from '../AppState.js';
import AccountForm from '@/components/AccountForm.vue';

const account = computed(() => AppState.account)


</script>

<template>
  <div class="about text-center text-light">
    <div v-if="account">
      <section class="heroImg align-items-center mt-2" :style="{ backgroundImage: `url(${account.coverImg})` }">
        <h1 class="textFont pt-2">Welcome {{ account.name }}</h1>
        <div class="row align-items-center my-2">
          <div class="col-6 text-end">
            <img class="rounded" :src="account.picture" alt="" />
          </div>
          <div class="col-6 text-start">
            <h3>
              <a :href="account.github" target="_blank" :title="`peep this github at ${account.github}`"><i
                  class="mdi mdi-github fs-2 mx-2"></i></a>
              <a :href="account.linkedin" target="_blank" :title="`peep this linkedin at ${account.linkedin}`"><i
                  class="mdi mdi-linkedin fs-2 mx-2"></i></a>
              <a :href="account.resume" target="_blank" :title="`peep this resume at ${account.resume}`"><i
                  class="mdi mdi-clipboard-account-outline fs-2 mx-2"></i></a>
            </h3>
          </div>
        </div>
        <p class="textFont fs-4">{{ account.email }}</p>
        <p class="textFont fs-4">{{ account.bio }}</p>
      </section>
      <div class="container mt-3">
        <div class="row justify-content-center">
          <div class="col-8">
            <AccountForm />
          </div>
        </div>

      </div>
    </div>

    <div v-else>
      <h1>Loading... <i class="mdi mdi-loading mdi-spin"></i></h1>
    </div>
  </div>
</template>

<style scoped lang="scss">
img {
  max-width: 100px;
}

.heroImg {
  background-size: cover;
  height: 40em;
}

.textFont{
  text-shadow: 2px 2px 4px black;
    font-family: "Marck Script", cursive;
    font-weight: 600;
    font-style: normal;
}
</style>


