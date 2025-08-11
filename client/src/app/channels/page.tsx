"use client";

import { useState } from "react";
import { useWebSocket } from "@/hooks/useWebSocket";

export default function Channels() {
  const [selectedChannel, setSelectedChannel] = useState("general");
  const [userId, setUserId] = useState(
    `user_${Math.random().toString(36).substr(2, 9)}`
  );
  const [messageInput, setMessageInput] = useState("");

  const { messages, sendMessage, isConnected } = useWebSocket(
    selectedChannel,
    userId
  );

  const channels = ["general", "random", "tech", "music"];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (messageInput.trim()) {
      sendMessage(messageInput);
      setMessageInput("");
    }
  };

  return (
    <div className="flex h-screen">
      {/* Channel Sidebar */}
      <div className="w-64 bg-gray-800 text-white p-4">
        <h2 className="text-xl font-bold mb-4">Channels</h2>
        <div className="space-y-2">
          {channels.map((channel) => (
            <button
              key={channel}
              onClick={() => setSelectedChannel(channel)}
              className={`block w-full text-left p-2 rounded ${
                selectedChannel === channel
                  ? "bg-blue-600"
                  : "bg-gray-700 hover:bg-gray-600"
              }`}
            >
              # {channel}
            </button>
          ))}
        </div>

        <div className="mt-8">
          <label className="block text-sm font-medium mb-2">
            Your Username:
          </label>
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 text-white"
          />
        </div>

        <div className="mt-4">
          <span
            className={`inline-block w-3 h-3 rounded-full ${
              isConnected ? "bg-green-500" : "bg-red-500"
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
        <div className="bg-white border-b p-4">
          <h1 className="font-bold text-2xl">#{selectedChannel}</h1>
          <p className="text-gray-600">
            Welcome to the {selectedChannel} channel
          </p>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((msg, index) => (
            <div key={index} className="flex flex-col">
              {msg.type === "chat_message" ? (
                <div className="flex items-start space-x-3">
                  <div className="bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
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
                    <p className="text-gray-800">{msg.message}</p>
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
              className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={!isConnected}
            />
            <button
              type="submit"
              disabled={!isConnected || !messageInput.trim()}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:bg-gray-300"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
