"use client";

import { use } from "react";
import { StreamChat } from "stream-chat";
import {
  Channel,
  ChannelHeader,
  ChannelList,
  Chat,
  LoadingIndicator,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from "stream-chat-react";
import useInitializeChatClient from "./useInitializeChatClient";
import { useUser } from "@clerk/nextjs";

const userId = "user_2gxEnMrqqoBpNqi5pUWmRvalVxi";

export default function ChatPage() {
  const chatClient = useInitializeChatClient();
  const { user } = useUser();

  if (!chatClient || !user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <LoadingIndicator size={40} />
      </div>
    );
  }

  return (
    <div className="h-screen">
      <Chat client={chatClient}>
        <div className="flex flex-row h-full">
          <div className="w-full max-w-[360px]">
            <ChannelList
              filters={{
                type: "messaging",
                members: { $in: [userId] },
              }}
              sort={{ last_message_at: -1 }}
              options={{ state: true, presence: true, limit: 10 }}
            />
          </div>
          <div className="h-full w-full">
            <Channel>
              <Window>
                <ChannelHeader />
                <MessageList />
                <MessageInput />
              </Window>
              <Thread />
            </Channel>
          </div>
        </div>
      </Chat>
    </div>
  );
}
