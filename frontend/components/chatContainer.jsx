"use client";
import { useEffect, useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "@/store/useAuthStore";
import ChatHeader from "./chatHeader";
import MessageSkeleton from "./messageSkeleton";
import MessageInput from "./messageInput";
import { formatMessageTime } from "@/lib/utils";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";

const ChatContainer = () => {
  const { messages, getMessages, isMessagesLoading, selectedUser, subscribeToMessages, unsubscribeFromMessages } =
    useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    getMessages(selectedUser._id);
    subscribeToMessages();

    return () => unsubscribeFromMessages();
  }, [selectedUser._id, getMessages, unsubscribeFromMessages, subscribeToMessages]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef?.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center bg-gray-100 h-screen">
      <Card className="w-full flex flex-col h-screen">
        <CardHeader className="mt-6">    
        <ChatHeader />

        </CardHeader>
        <CardContent className="flex-1 overflow-y-auto space-y-3">
          {messages.map((message, index) => (
            <div
              key={message._id}
              className={`flex items-start gap-2 ${
                message.senderId === authUser._id
                  ? "flex-row-reverse"
                  : "flex-row"
              }`}
              ref={index === messages.length - 1 ? messageEndRef : null}
            >
              {/* Avatar */}
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full border overflow-hidden">
                  <img
                    src={
                      message.senderId === authUser._id
                        ? authUser.profilePic || "https://github.com/shadcn.png"
                        : selectedUser.profilePic || "https://github.com/shadcn.png"
                    }
                    alt="profile pic"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div
                className={`flex flex-col max-w-[80%] ${
                  message.senderId === authUser._id
                    ? "items-end"
                    : "items-start"
                }`}
              >
                {/* Timestamp */}
                <div className="text-xs text-gray-500 mb-1 px-2">
                  {formatMessageTime(message.createdAt)}
                </div>

                {/* Message Bubble */}
                <div
                  className={`rounded-2xl px-4 py-2 ${
                    message.senderId === authUser._id
                      ? "bg-primary text-primary-foreground rounded-tr-none"
                      : "bg-muted rounded-tl-none"
                  }`}
                >
                  <div className="flex flex-col">
                    {message.image && (
                      <img
                        src={message.image || "/placeholder.svg"}
                        alt="Attachment"
                        className="sm:max-w-[200px] rounded-md mb-2"
                      />
                    )}
                    {message.text && (
                      <p className="break-words">{message.text}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
        <CardFooter>
          <MessageInput />
        </CardFooter>
      </Card>
    </div>
  );
};

export default ChatContainer;