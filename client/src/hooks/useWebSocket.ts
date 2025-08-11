import { useEffect, useRef, useState } from "react";

interface ChatMessage {
  type: "chat_message" | "user_joined" | "user_left";
  userId: string;
  message: string;
  timestamp?: string;
}

export const useWebSocket = (channel: string, userId: string) => {
  const ws = useRef<WebSocket | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isConnected, setIsConnected] = useState(false);

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
          userId,
        })
      );
    };

    ws.current.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setMessages((prev) => [...prev, message]);
    };

    ws.current.onclose = () => {
      setIsConnected(false);
    };

    return () => {
      ws.current?.close();
    };
  }, [channel, userId]);

  const sendMessage = (message: string) => {
    if (ws.current && isConnected) {
      ws.current.send(
        JSON.stringify({
          type: "chat_message",
          message,
        })
      );
    }
  };

  return { messages, sendMessage, isConnected };
};
