import { defineStore } from 'pinia'
import { useStorage, useMessages } from '../firebase'

export const useFileStore = defineStore('file', () => {
  const processAttachment = async (file: File)=>{
    const {addFile} = useStorage()
    const {addAssignmentMessage} = useMessages()
    const fileData = await addFile(file)
    addAssignmentMessage({
      name: fileData?.metadata?.name as string,
      size: fileData?.metadata?.size as number,
      type: fileData?.metadata?.contentType as string,
      url: fileData?.url as string
    })

  }

  return { processAttachment }
})
