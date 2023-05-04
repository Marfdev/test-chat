<script setup lang="ts">
import GoogleIcon from '../components/icons/GoogleIcon.vue'
import MyIcon from '../components/icons/MyIcon.vue'
import { useAuth } from '../firebase'
const {signIn} = useAuth()
</script>

<template>
  <div class="inline-flex mx-auto px-4 w-screen">
    <div class="container mx-auto px-4 flex flex-col mt-80 items-center max-w-fit">
      <h1 class="text-7xl text-white font-nunito font-bold text-start">Welcome to <br> UniChat!</h1>
      <button class="text-slate-100 rounded mt-5 bg-teal-700 max-w-fit p-3 inline-flex ml-2 self-start" @click="signIn"> <GoogleIcon class="mr-2"/> Login with Google</button>
    </div>
    <MyIcon class="mt-28" />
  </div>
</template>
