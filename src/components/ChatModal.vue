<script lang="ts">
import { useMessages } from '../firebase'
import { ref } from 'vue'
import SendIcon from '../components/icons/SendIcon.vue'
import MessageComponent from './MessageComponent.vue'
import { useAuth } from '../firebase'
import AssignmentComponent from './AssignmentComponent.vue'
export default {
    components: {
        SendIcon,
        MessageComponent,
        AssignmentComponent
    },
    setup() {
        const { user, signOut } = useAuth()
        const { messages, addMessage } = useMessages()
        const text = ref('')
        const messageHandler = () => {
            addMessage(text.value)
            text.value = ''
        }
        return {
            messages,
            messageHandler,
            text,
            user,
            signOut
        }
    },
}
</script>
<template>
    <div class="max-w-xl mx-auto bg-white rounded-sm p-1">
        <header class="font-bold text-lg inline-flex items-center w-full px-4 ">
            <span class="text-center w-full">
                Comentarios
            </span>
            <button class="bg-transparent mb-1 border-transparent text-sky-500 font-medium text-3xl x-btn-signout" @click="signOut">
                &times; 
            </button>
        </header>
        <hr class="bg-black h-1 border-transparent">
        <div class="p-2 h-96 max-h-96 overflow-y-auto message-container">
            <div class="flex-row-reverse" v-for="message,i in messages" :key="i">
                <message-component v-if="message.type === 'text'"
                :msg="message.text"
                :displayName="message.displayName" 
                :photoUrl="message.photoURL"
                :isSender="message.uid === user?.uid"
                :createdAt="message.createdAt"/>

                <assignment-component v-else-if="message.type === 'assignment'"
                 :createdAt="message.createdAt"
                 :assignment="message.assignment"
                 :displayName="message.displayName"
                 :versionNumber="message.versionNumber"/>
            </div>
        </div>
        <hr>
        <footer>
            <form class="inline-flex w-full py-4" @submit.prevent="messageHandler">
                <input type="text" v-model="text" placeholder="Escribe un mensaje..." class="rounded-full border-2 mx-2 px-3 bg-gray-200 border-gray-300 w-full "> 
                <button type="submit" class="rounded-full bg-sky-500 p-2 mr-2 msg-btn"> <SendIcon /> </button>
            </form>
        </footer>
    </div>
</template>