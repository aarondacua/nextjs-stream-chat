"use client";

import useInitializeChatClient from "./useInitializeChatClient";
import { useUser } from "@clerk/nextjs";
import ChatSidebar from "./ChatSidebar";
import { Chat, LoadingIndicator } from "stream-chat-react";
import ChatChannel from "./ChatChannel";
import { use, useCallback, useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import useWindowSize from "@/hooks/useWindowSize";
import { mdBreakpoint } from "@/utils/tailwind";

export default function ChatPage() {
  const chatClient = useInitializeChatClient();
  const { user } = useUser();

  const [chatSidebarOpen, setChatSidebarOpen] = useState(false);

  const windowSize = useWindowSize();
  const isLargeScreen = windowSize.width >= mdBreakpoint;

  useEffect(() => {
    if (windowSize.width >= mdBreakpoint) {
      setChatSidebarOpen(false);
    }
  }, [windowSize.width]);

  const handleSidebarOnClose = useCallback(() => {
    setChatSidebarOpen(false);
  }, []);

  if (!chatClient || !user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <LoadingIndicator size={40} />
      </div>
    );
  }

  return (
    <div className="h-screen bg-gray-100 xl:px-20 xl:py-8">
      <div className="max-w-[1600px] min-w-[350px] h-full shadow-sm m-auto flex flex-col">
        <Chat client={chatClient}>
          <div className="flex justify-center border-b border-b-[#DBDDE1] p-3 md:hidden">
            <button onClick={() => setChatSidebarOpen(!chatSidebarOpen)}>
              {!chatSidebarOpen ? (
                <span className="flex items-center gap-1">
                  <Menu /> Menu
                </span>
              ) : (
                <X />
              )}
            </button>
          </div>
          <div className="flex flex-row h-full overflow-y-auto">
            <ChatSidebar
              user={user}
              show={isLargeScreen || chatSidebarOpen}
              onClose={handleSidebarOnClose}
            />
            <ChatChannel
              show={isLargeScreen || !chatSidebarOpen}
              hideChannelOnThread={!isLargeScreen}
            />
          </div>
        </Chat>
      </div>
    </div>
  );
}
