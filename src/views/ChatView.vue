<template>
  <div class="flex-col">
    <chat-modal />
    <h1 class="text-2xl text-white font-bold">Subir Evaluacion</h1>
    <form @submit.prevent="handleSubmit">
      <input type="file" class="max-w-xl mx-auto bg-white rounded p1" @change="handleFiles">
      <button class="rounded bg-sky-500 p-1 mr-2 text-white font-bold file-submit" type="submit"> Publicar </button>
    </form>
    
  </div>

</template>
<script setup lang="ts">
import { useFileStore } from '../stores/fileStore';
import { ref } from 'vue'
import ChatModal from '../components/ChatModal.vue'
const files = ref()
const handleFiles = (e : Event) => {
  files.value = [...(e.target as HTMLInputElement).files as FileList]
  
}
const handleSubmit = () => {
  if(files.value.length === 0) return alert('No hay archivos')
  useFileStore().processAttachment(files.value[0])

}
</script>
