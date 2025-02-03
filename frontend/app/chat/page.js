"use client"
import React, { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/store/useAuthStore"
import Loader from "@/components/loader"
import { useChatStore } from "@/store/useChatStore"
import NoChatSelected from "@/components/noChatSelected"
import ChatContainer from "@/components/chatContainer"
const Chat = () => {
  const { authUser, isCheckingAuth, checkAuth } = useAuthStore()
  const router = useRouter()
  const {selectedUser} = useChatStore()
  // useEffect(()=>{ 
  //     checkAuth()
  // },[checkAuth])
  useEffect(() => {
    if (!isCheckingAuth && !authUser) {
      router.push("/signin")
    }
    
  }, [authUser, isCheckingAuth, router])
  
  if (isCheckingAuth || !authUser) {
    return <Loader />
  }

  return (
    <div>
      {!selectedUser ? <NoChatSelected/> :  <ChatContainer/>}
    </div>
  )
}

export default Chat

