import { UserButton } from "@clerk/nextjs";

export default function ChatPage() {
  return (
    <div>
      <h1>Chat</h1>
      <UserButton afterSignOutUrl="/" />
    </div>
  );
}
