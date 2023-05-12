import React from "react";

interface ChatBubbleProps {
  text: string;
  isSentByCurrentUser: boolean;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({
  text,
  isSentByCurrentUser,
}) => {
  const bubbleColor = isSentByCurrentUser
    ? "bg-blue-500 text-white"
    : "bg-gray-200 text-gray-800";
  const bubbleAlignment = isSentByCurrentUser ? "justify-end" : "justify-start";

  return (
    <div className={`flex ${bubbleAlignment} mb-4`}>
      <div
        className={`max-w-xs break-words rounded-lg px-4 py-1 shadow-md ${bubbleColor}`}
      >
        {text}
      </div>
    </div>
  );
};

export default ChatBubble;
