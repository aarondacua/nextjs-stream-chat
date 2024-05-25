"use client";
import { UserButton } from "@clerk/nextjs";
import { Wind } from "lucide-react";
import { StreamChat } from "stream-chat";
import {
  Channel,
  ChannelHeader,
  Chat,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from "stream-chat-react";

const userId = "user_2gxEnMrqqoBpNqi5pUWmRvalVxi";

const chatClient = StreamChat.getInstance(
  process.env.NEXT_PUBLIC_STREAM_API_KEY!
);

chatClient.connectUser(
  {
    id: userId,
    name: "Onin",
  },
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoidXNlcl8yZ3hFbk1ycXFvQnBOcWk1cFVXbVJ2YWxWeGkifQ.S14vH-dY1DCJeS75yg2OjhrNwWft14zzOHGGfNaBmm4"
);

const channel = chatClient.channel("messaging", "channel_1", {
  name: "Channel #1",
  members: [userId],
});

export default function ChatPage() {
  return (
    <div>
      <Chat client={chatClient}>
        <Channel channel={channel}>
          <Window>
            <ChannelHeader />
            <MessageList />
            <MessageInput />
          </Window>
          <Thread />
        </Channel>
      </Chat>
    </div>
  );
}
