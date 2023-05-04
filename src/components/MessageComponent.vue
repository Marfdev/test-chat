<script lang="ts">
export default {
    props: {
        msg: {
            type: String,
            required: false,
            default: 'Message1'
        },
        photoUrl: {
            type: String,
            required: false,
            default: 'https://i.imgur.com/9YQ9Z9r.png'
        },
        displayName: {
            type: String,
            required: false,
            default: 'User1'
        },
        isSender: {
            type: Boolean,
            required: false,
            default: true
        },
        createdAt: {
            type: String,
            required: true,
        }

    },
    
    setup(props) { 

        return {
            
        }
    },
}
</script>
<template>
    <div :class="`flex mb-4 flex-row${isSender ? '-reverse' : '' }`">
        <img :src="photoUrl" class="bg-gray-300 rounded-full w-10 h-10 object-cover mx-4">
        <div>
            <div :class="`${isSender ? 'text-end' : 'text-start' } text-xs w-full `">{{ displayName }}</div>
            <div :class="`${isSender ? 'bg-blue-600 text-white' : 'text-black bg-gray-200' } max-w-sm p-2 h-fit rounded`">
                <p class="max-w-full break-words">{{msg}}</p>
                <sub :class="`flex flex-row${isSender ? '' : '-reverse text-gray-400' } text-xs`">{{ createdAt }}</sub>
            </div>
        </div>
    </div>
</template>



