"use client";

import { motion } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import { useChatbot } from "@/contexts/ChatbotContext";

interface ChatbotButtonProps {
  chatbotId: string;
  name: string;
  avatar: string;
  online: boolean;
}

export default function ChatbotButton({
  chatbotId,
  name,
  avatar,
  online,
}: ChatbotButtonProps) {
  const { toggleChatbot, isOpen, activeChatbot } = useChatbot();
  const isActive = isOpen && activeChatbot?.id === chatbotId;

  return (
    <motion.button
      onClick={() => toggleChatbot(chatbotId)}
      className={`relative flex items-center justify-center w-14 h-14 rounded-full shadow-lg transition-all duration-300 ${
        isActive
          ? "bg-primary-600 dark:bg-primary-500"
          : "bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
      }`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label={`Open ${name} chat`}
    >
      {isActive ? (
        <X className="w-6 h-6 text-white" />
      ) : (
        <>
          <span className="text-2xl">{avatar}</span>
          {online && (
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800" />
          )}
        </>
      )}
    </motion.button>
  );
}

