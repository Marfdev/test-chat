<script lang="ts">
export default {
    props: {
        displayName: {
            type: String,
            required: false,
            default: 'User1'
        },
        createdAt: {
            type: String,
            required: true,
        },
        assignment: {
            type: Object,
            required: true,
        },
        versionNumber: {
            type: Number,
            required: true,
        },

    },
    
    setup(props) { 
        const downloadFile = () => {
            window.open(props.assignment.url, props.assignment.name)
        }

        return {
            downloadFile
        }
    },
}
</script>
<template>
    <div :class="`flex flex-col mb-4 border-t-2 border-b-2 border-gray-300`">
        <div class="inline-flex w-full font-bold text-sm">
            VERSIÓN {{ versionNumber }} · <p class="font-thin text-gray-400 mx-2"> {{ displayName }} </p>
        </div>
        <a class="text-start text-sky-600 font-bold" @click="downloadFile" >{{ assignment.name }}</a>
        <sub class="pb-4 pt-1">{{ assignment.type }} | {{ assignment.size }} (bytes)  | {{ createdAt }}</sub>

    </div>
</template>