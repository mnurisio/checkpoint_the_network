<script setup>
import { AppState } from '@/AppState';
import AdsDisplay from '@/components/AdsDisplay.vue';
import PageNav from '@/components/PageNav.vue';
import PostsCard from '@/components/PostsCard.vue';
import { adsService } from '@/services/AdsService';
import { postsService } from '@/services/PostsService';
import { profileService } from '@/services/ProfileService';
import Pop from '@/utils/Pop';
import { computed, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';




const profile = computed(() => AppState.activeProfile)
const posts = computed(() => AppState.posts)


const route = useRoute()

watch(route, () => {
    getProfileById()
    getPostByProfileId()
}, { immediate: true })


async function getProfileById() {
    try {
        const profileId = route.params.profileId
        await profileService.getProfileById(profileId)
    }
    catch (error) {
        Pop.error(error);
    }
}

async function getPostByProfileId() {
    try {
        const profileId = route.params.profileId
        await postsService.getPostByProfileId(profileId)
    }
    catch (error) {
        Pop.meow(error);
    }
}

</script>


<template>
    <div v-if="profile" class="container-fluid">
        <section class="row heroImg align-items-center p-3" :style="{ backgroundImage: `url(${profile.coverImg})` }">
            <div class="col-5">
                <div class="d-flex justify-content-center align-items-center">
                    <img class="profilePicture" :src="profile.picture" :alt="profile.name">
                    <div class="text-center">
                        <h1 class="ms-3 text-light nameBio">{{ profile.name }} <i v-if="profile.graduated"
                                class="mdi mdi-account-school graduated fs-1"></i></h1>
                        <h3 class="ms-3 nameBio text-light">{{ profile.class }}</h3>
                        <a :href="profile.github" target="_blank" :title="`peep this github at ${profile.github}`"><i
                                class="mdi mdi-github fs-2 mx-2"></i></a>
                        <a :href="profile.linkedin" target="_blank"
                            :title="`peep this linkedin at ${profile.linkedin}`"><i
                                class="mdi mdi-linkedin fs-2 mx-2"></i></a>
                        <a :href="profile.resume" target="_blank" :title="`peep this resume at ${profile.resume}`"><i
                                class="mdi mdi-clipboard-account-outline fs-2 mx-2"></i></a>
                    </div>
                </div>
            </div>
            <div class="col-7 text-center fs-3 text-light nameBio">
                {{ profile.bio }}
            </div>
        </section>
        <PageNav />
        <section class="row justify-content-between">
            <div class="col-12">
                <div v-for="post in posts" :key="post.id" class=" m-3 card my-3">
                    <PostsCard :postProp="post" />
                </div>
            </div>
        </section>
    </div>

</template>


<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Bangers&family=Bebas+Neue&family=Marck+Script&display=swap');

.profilePicture {
    aspect-ratio: 1/1;
    border-radius: 50%;
    border: 3px solid var(--bs-light);
    height: 10em;
}

.heroImg {
    background-size: cover;
    height: 20em
}

.graduated {
    color: #0D6EFD;
}

.nameBio {
    text-shadow: 2px 2px 4px black;
    font-family: "Marck Script", cursive;
    font-weight: 600;
    font-style: normal;
}
</style>