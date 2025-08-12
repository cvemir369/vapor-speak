import { useEffect, useRef, useState, useCallback } from "react";
import { messageStorage } from "@/utils/messageStorage";

interface ChatMessage {
  type: "chat_message" | "user_joined" | "user_left" | "user_renamed";
  userId: string;
  message: string;
  timestamp?: number;
  oldUserId?: string; // For rename messages
}

export const useWebSocket = (channel: string, userId: string) => {
  const ws = useRef<WebSocket | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const previousUserIdRef = useRef<string>(userId);
  const currentUserIdRef = useRef<string>(userId);

  // Update the current userId ref whenever it changes
  useEffect(() => {
    currentUserIdRef.current = userId;
  }, [userId]);

  useEffect(() => {
    // Load persisted messages on channel change first
    const persistedMessages = messageStorage.getMessages(channel);
    // Convert stored messages to ChatMessage format
    const chatMessages: ChatMessage[] = persistedMessages.map((msg) => ({
      type: "chat_message" as const,
      userId: msg.user, // Map 'user' to 'userId'
      message: msg.content, // Map 'content' to 'message'
      timestamp: msg.timestamp,
    }));
    setMessages(chatMessages);

    // Clean up expired messages periodically
    const cleanupInterval = setInterval(() => {
      messageStorage.clearExpiredMessages();
      const currentMessages = messageStorage.getMessages(channel);
      const updatedChatMessages: ChatMessage[] = currentMessages.map((msg) => ({
        type: "chat_message" as const,
        userId: msg.user,
        message: msg.content,
        timestamp: msg.timestamp,
      }));
      setMessages(updatedChatMessages);
    }, 60000); // Check every minute

    return () => clearInterval(cleanupInterval);
  }, [channel]);

  useEffect(() => {
    // Check if userId changed (user renamed)
    if (
      previousUserIdRef.current !== userId &&
      isConnected &&
      previousUserIdRef.current !== ""
    ) {
      // Send rename notification to WebSocket (server will broadcast to everyone)
      if (ws.current && ws.current.readyState === WebSocket.OPEN) {
        const renameMessage = {
          type: "user_renamed",
          channel,
          oldUserId: previousUserIdRef.current,
          newUserId: userId,
        };

        ws.current.send(JSON.stringify(renameMessage));
      }
    }

    previousUserIdRef.current = userId;
  }, [userId, channel, isConnected]);

  useEffect(() => {
    // Connect to WebSocket
    ws.current = new WebSocket("ws://localhost:5000");

    ws.current.onopen = () => {
      setIsConnected(true);
      // Join the channel
      ws.current?.send(
        JSON.stringify({
          type: "join_channel",
          channel,
          userId: currentUserIdRef.current,
        })
      );
    };

    ws.current.onmessage = (event) => {
      const message: ChatMessage = JSON.parse(event.data);

      setMessages((prev) => [...prev, message]);

      messageStorage.saveMessage(channel, {
        id: Date.now().toString(),
        user: message.userId,
        content: message.message,
        channel,
      });
    };

    ws.current.onclose = () => {
      setIsConnected(false);
    };

    return () => {
      ws.current?.close();
    };
  }, [channel]);

  const sendMessage = useCallback(
    (message: string) => {
      if (ws.current && isConnected) {
        const chatMessage: ChatMessage = {
          type: "chat_message",
          userId,
          message,
          timestamp: Date.now(),
        };

        ws.current.send(JSON.stringify(chatMessage));
      }
    },
    [isConnected, userId]
  );

  return { messages, sendMessage, isConnected };
};
