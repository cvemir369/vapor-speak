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
      console.log(
        `User renamed from ${previousUserIdRef.current} to ${userId}`
      );

      // Send rename notification to WebSocket (server will broadcast to everyone)
      if (ws.current && ws.current.readyState === WebSocket.OPEN) {
        const renameMessage = {
          type: "user_renamed",
          channel,
          oldUserId: previousUserIdRef.current,
          newUserId: userId,
        };

        console.log("Sending rename message:", renameMessage);
        ws.current.send(JSON.stringify(renameMessage));
      }
    }

    previousUserIdRef.current = userId;
  }, [userId, channel, isConnected]);

  useEffect(() => {
    // Connect to WebSocket
    ws.current = new WebSocket("ws://localhost:5000");

    ws.current.onopen = () => {
      console.log("WebSocket connected");
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
      console.log("Received WebSocket message:", message);

      setMessages((prev) => [...prev, message]);

      // Also save received messages to storage
      messageStorage.saveMessage(channel, {
        id: Date.now().toString(),
        user: message.userId,
        content: message.message,
        channel,
      });
    };

    ws.current.onclose = () => {
      console.log("WebSocket disconnected");
      setIsConnected(false);
    };

    ws.current.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    return () => {
      ws.current?.close();
    };
  }, [channel]); // Only depend on channel, not userId

  const sendMessage = useCallback(
    (message: string) => {
      if (ws.current && isConnected) {
        const chatMessage: ChatMessage = {
          type: "chat_message",
          userId,
          message,
          timestamp: Date.now(),
        };

        // Save to storage with correct format
        messageStorage.saveMessage(channel, {
          id: Date.now().toString(),
          user: userId,
          content: message,
          channel,
        });

        // DON'T update state here - let the WebSocket response handle it
        // setMessages((prev) => [...prev, chatMessage]);

        // Send via WebSocket
        ws.current.send(JSON.stringify(chatMessage));
      }
    },
    [isConnected, channel, userId]
  );

  return { messages, sendMessage, isConnected };
};
