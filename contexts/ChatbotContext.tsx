"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export type ChatbotType = "support" | "sales" | "general";

interface Chatbot {
  id: string;
  type: ChatbotType;
  name: string;
  description: string;
  avatar: string;
  online: boolean;
  initialMessage: string;
}

interface ChatbotContextType {
  chatbots: Chatbot[];
  activeChatbot: Chatbot | null;
  isOpen: boolean;
  openChatbot: (chatbotId: string) => void;
  closeChatbot: () => void;
  toggleChatbot: (chatbotId: string) => void;
}

const WHATSAPP_NUMBER = "9090702707";

const chatbotsData: Chatbot[] = [
  {
    id: "whatsapp",
    type: "general",
    name: "WhatsApp",
    description: "Chat with us on WhatsApp",
    avatar: "💬",
    online: true,
    initialMessage: `Hi! Welcome to Shah Works. You can reach us directly on WhatsApp at +91 ${WHATSAPP_NUMBER}. How can we help you today?`,
  },
  {
    id: "support",
    type: "support",
    name: "Support Team",
    description: "Get help with technical issues",
    avatar: "💬",
    online: true,
    initialMessage: "Hi! I'm here to help with any technical questions. How can I assist you today?",
  },
  {
    id: "sales",
    type: "sales",
    name: "Sales Team",
    description: "Discuss your project needs",
    avatar: "💼",
    online: true,
    initialMessage: "Hello! Interested in our services? Let's discuss how we can help your business grow!",
  },
  {
    id: "general",
    type: "general",
    name: "General Inquiry",
    description: "Ask us anything",
    avatar: "👋",
    online: true,
    initialMessage: "Hi there! Welcome to Shah Works. How can I help you today?",
  },
];

export { WHATSAPP_NUMBER };

const ChatbotContext = createContext<ChatbotContextType | undefined>(undefined);

export function ChatbotProvider({ children }: { children: ReactNode }) {
  const [chatbots] = useState<Chatbot[]>(chatbotsData);
  const [activeChatbot, setActiveChatbot] = useState<Chatbot | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const openChatbot = (chatbotId: string) => {
    const chatbot = chatbots.find((c) => c.id === chatbotId);
    if (chatbot) {
      setActiveChatbot(chatbot);
      setIsOpen(true);
    }
  };

  const closeChatbot = () => {
    setIsOpen(false);
    // Keep activeChatbot for reopening
  };

  const toggleChatbot = (chatbotId: string) => {
    if (isOpen && activeChatbot?.id === chatbotId) {
      closeChatbot();
    } else {
      openChatbot(chatbotId);
    }
  };

  return (
    <ChatbotContext.Provider
      value={{
        chatbots,
        activeChatbot,
        isOpen,
        openChatbot,
        closeChatbot,
        toggleChatbot,
      }}
    >
      {children}
    </ChatbotContext.Provider>
  );
}

export function useChatbot() {
  const context = useContext(ChatbotContext);
  if (context === undefined) {
    throw new Error("useChatbot must be used within a ChatbotProvider");
  }
  return context;
}

