"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useChatbot } from "@/contexts/ChatbotContext";
import ChatbotButton from "./ChatbotButton";
import ChatbotWindow from "./ChatbotWindow";
import WhatsAppButton from "./WhatsAppButton";
import { MessageCircle } from "lucide-react";
import { useState } from "react";

export default function ChatbotFloatingButtons() {
  const { chatbots } = useChatbot();
  const [isExpanded, setIsExpanded] = useState(false);

  const primaryChatbot = chatbots[0];
  const otherChatbots = chatbots.slice(1);

  return (
    <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-40 flex flex-col items-end gap-4">
      {/* Chatbot Windows */}
      <ChatbotWindow />

      {/* Floating Buttons */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="flex flex-col-reverse gap-3"
          >
            {otherChatbots.map((chatbot, index) => (
              <motion.div
                key={chatbot.id}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 20 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-2"
              >
                <div className="bg-white dark:bg-gray-800 px-3 py-1.5 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 text-xs text-gray-700 dark:text-gray-300 whitespace-nowrap">
                  {chatbot.name}
                </div>
                {chatbot.id === "whatsapp" ? (
                  <WhatsAppButton />
                ) : (
                  <ChatbotButton
                    chatbotId={chatbot.id}
                    name={chatbot.name}
                    avatar={chatbot.avatar}
                    online={chatbot.online}
                  />
                )}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Primary Chatbot Button */}
      {!isExpanded && primaryChatbot && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center gap-2"
        >
          <div className="bg-white dark:bg-gray-800 px-3 py-1.5 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 text-xs text-gray-700 dark:text-gray-300 whitespace-nowrap">
            {primaryChatbot.name}
          </div>
          {primaryChatbot.id === "whatsapp" ? (
            <WhatsAppButton />
          ) : (
            <ChatbotButton
              chatbotId={primaryChatbot.id}
              name={primaryChatbot.name}
              avatar={primaryChatbot.avatar}
              online={primaryChatbot.online}
            />
          )}
        </motion.div>
      )}

      {/* Main Toggle Button */}
      <motion.button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`flex items-center justify-center w-14 h-14 rounded-full shadow-lg transition-all duration-300 ${
          isExpanded
            ? "bg-gray-100 dark:bg-gray-700"
            : chatbots.length > 1
            ? "bg-gray-100 dark:bg-gray-700"
            : "bg-primary-600 dark:bg-primary-500 hover:bg-primary-700 dark:hover:bg-primary-600"
        }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label={isExpanded ? "Collapse chatbots" : "Expand chatbots"}
      >
        <MessageCircle
          className={`w-6 h-6 ${
            isExpanded
              ? "text-gray-600 dark:text-gray-300"
              : chatbots.length > 1
              ? "text-gray-600 dark:text-gray-300"
              : "text-white"
          }`}
        />
      </motion.button>
    </div>
  );
}

