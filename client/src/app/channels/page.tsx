"use client";

import { useState, useEffect } from "react";
import { useWebSocket } from "@/hooks/useWebSocket";

export default function Channels() {
  const [mounted, setMounted] = useState(false);
  const [selectedChannel, setSelectedChannel] = useState("general");
  const [userId, setUserId] = useState(
    `user_${crypto.randomUUID().slice(0, 8)}`
  );
  const [tempUserId, setTempUserId] = useState(userId);
  const [messageInput, setMessageInput] = useState("");

  const { messages, sendMessage, isConnected } = useWebSocket(
    selectedChannel,
    userId
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  const channels = [
    "general",
    "random",
    "tech",
    "music",
    "sports",
    "gaming",
    "movies",
    "news",
    "live event",
  ];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (messageInput.trim()) {
      sendMessage(messageInput);
      setMessageInput("");
    }
  };

  const handleUsernameChange = () => {
    if (tempUserId.trim()) {
      setUserId(tempUserId.trim());
    }
  };

  return (
    <div
      className={`flex w-screen p-6 transition-opacity duration-300 ${
        mounted ? "opacity-100" : "opacity-0"
      }`}
      style={{ minHeight: "100vh" }}
    >
      {/* Channel Sidebar */}
      <div className="text-white p-4">
        <h2 className="text-2xl font-bold mb-4">Channels</h2>
        <div className="flex flex-col gap-2">
          {channels.map((channel) => (
            <button
              key={channel}
              onClick={() => setSelectedChannel(channel)}
              className={`block w-full text-left p-2 rounded-full transition-colors ${
                selectedChannel === channel
                  ? "bg-neutral-300 text-neutral-900 font-bold"
                  : "bg-neutral-800 hover:bg-neutral-600"
              }`}
            >
              # {channel}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-2 mt-8">
          <label className="">Your Username:</label>
          <input
            type="text"
            value={tempUserId}
            onChange={(e) => setTempUserId(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleUsernameChange()}
            className="w-full p-2 rounded bg-neutral-300 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-500 transition-all"
            placeholder="Enter username"
          />
          <button
            onClick={handleUsernameChange}
            disabled={!tempUserId.trim() || tempUserId.trim() === userId}
            className="bg-neutral-800 text-white px-4 py-2 rounded-full hover:bg-neutral-600 disabled:bg-neutral-900 disabled:text-neutral-500 disabled:cursor-not-allowed transition-colors"
          >
            Set Username
          </button>
          <p className="text-xs text-neutral-400">Current: {userId}</p>
        </div>

        <div className="mt-4">
          <span
            className={`inline-block w-3 h-3 rounded-full transition-colors ${
              isConnected ? "bg-green-600" : "bg-red-600"
            }`}
          ></span>
          <span className="ml-2 text-sm">
            {isConnected ? "Connected" : "Disconnected"}
          </span>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="bg-neutral-300 rounded-2xl p-3">
          <h1 className="font-bold text-2xl text-neutral-900">
            #{selectedChannel}
          </h1>
          <p className="text-gray-600">
            Welcome to the {selectedChannel} channel
          </p>
        </div>

        {/* Messages */}
        <div className="flex-1 max-h-9/12 overflow-y-auto p-4 space-y-3">
          {messages.map((msg, index) => (
            <div key={index} className="flex flex-col">
              {msg.type === "chat_message" ? (
                <div className="flex items-start space-x-3">
                  <div className="bg-neutral-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                    {msg.userId.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold">{msg.userId}</span>
                      {msg.timestamp && (
                        <span className="text-xs text-gray-500">
                          {new Date(msg.timestamp).toLocaleTimeString()}
                        </span>
                      )}
                    </div>
                    <p className="text-neutral-100">{msg.message}</p>
                  </div>
                </div>
              ) : (
                <div className="text-center text-gray-500 text-sm italic">
                  {msg.message}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Message Input */}
        <form onSubmit={handleSendMessage} className="border-t p-4">
          <div className="flex space-x-2">
            <input
              type="text"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              placeholder={`Message #${selectedChannel}`}
              className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-500 transition-all"
              disabled={!isConnected}
            />
            <button
              type="submit"
              disabled={!isConnected || !messageInput.trim()}
              className="bg-neutral-800 text-white px-4 py-2 rounded-lg hover:bg-neutral-600 disabled:bg-neutral-900 disabled:text-neutral-500 disabled:cursor-not-allowed transition-colors"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
