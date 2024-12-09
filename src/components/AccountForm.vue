<script setup>
import { AppState } from '@/AppState';
import { accountService } from '@/services/AccountService';
import Pop from '@/utils/Pop';
import { computed, onMounted, ref } from 'vue';

const account = computed(()=> AppState.account)

onMounted(()=> editableAccountData.value = {...account.value})


const editableAccountData = ref({
    email: '',
    name: '',
    picture: '',
    bio: '',
    class: '',
    coverImg: '',
    github: '',
    graduated: '',
    linkedin: '',
    resume: '',
})


async function updateAccountInfo(){
    try {
      await accountService.updateAccountInfo(editableAccountData.value)
    }
    catch (error){
      Pop.error(error);
    }
}
</script>


<template>
    <form @submit.prevent="updateAccountInfo()" class="form-floating">
        <div class="form-floating mb-3">
            <input v-model="editableAccountData.name" type="text" class="form-control" id="name" placeholder="Name">
            <label for="name">Name</label>
        </div>
        <div class="form-floating mb-3">
            <input v-model="editableAccountData.email" type="text" class="form-control" id="email" placeholder="Email">
            <label for="email">Email</label>
        </div>
        <div class="form-floating mb-3">
            <input v-model="editableAccountData.bio" type="text" class="form-control" id="bio" placeholder="Bio">
            <label for="bio">Bio</label>
        </div>
        <div class="form-floating mb-3">
            <input v-model="editableAccountData.class" type="text" class="form-control" id="class" placeholder="Class">
            <label for="class">Class</label>
        </div>
        <div class="form-floating mb-3">
            <input v-model="editableAccountData.coverImg" type="url" class="form-control" id="coverImg" placeholder="Cover Img">
            <label for="coverImg">Cover Img URL</label>
        </div>
        <div class="form-floating mb-3">
            <input v-model="editableAccountData.picture" type="url" class="form-control" id="picture" placeholder="Profile Pic">
            <label for="picture">Profile Picture URL</label>
        </div>
        <div class="form-floating mb-3">
            <input v-model="editableAccountData.github" type="url" class="form-control" id="github" placeholder="Github">
            <label for="github">Github URL</label>
        </div>
        <div class="form-floating mb-3">
            <input v-model="editableAccountData.graduated" type="text" class="form-control" id="graduated" placeholder="Graduated">
            <label for="graduated">Graduated</label>
        </div>
        <div class="form-floating mb-3">
            <input v-model="editableAccountData.linkedin" type="url" class="form-control" id="linkedin" placeholder="LinkedIn">
            <label for="linkedin">LinkedIn URL</label>
        </div>
        <div class="form-floating mb-3">
            <input v-model="editableAccountData.resume" type="url" class="form-control" id="resume" placeholder="resume">
            <label for="resume">Resume URL</label>
        </div>
        <button class="mb-3" type="submit">Submit</button>
    </form>
</template>


<style lang="scss" scoped></style>