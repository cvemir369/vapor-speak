"use client";

import { useState, useEffect, useRef } from "react";
import { useWebSocket } from "@/hooks/useWebSocket";
import MobileMenu from "@/components/MobileMenu";

// Helper function to generate a random ID that works across all browsers
const generateUserId = () => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `user_${result}`;
};

const MAX_MESSAGE_LENGTH = 500; // Set your desired character limit

export default function Channels() {
  const [selectedChannel, setSelectedChannel] = useState("general");
  const [userId, setUserId] = useState(() => {
    if (typeof window !== "undefined") {
      const storedUserId = localStorage.getItem("userId");
      return storedUserId ? JSON.parse(storedUserId) : generateUserId();
    }
    return generateUserId();
  });
  const [tempUserId, setTempUserId] = useState(userId);
  const [messageInput, setMessageInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const channels = [
    "general",
    "random",
    "tech",
    "music",
    "sports",
    "gaming",
    "movies",
    "politics",
  ];

  const { messages, sendMessage, isConnected } = useWebSocket(
    selectedChannel,
    userId
  );

  // Auto scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      messageInput.trim() &&
      messageInput.trim().length <= MAX_MESSAGE_LENGTH
    ) {
      sendMessage(messageInput.trim());
      setMessageInput("");
    }
  };

  const handleMessageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= MAX_MESSAGE_LENGTH) {
      setMessageInput(value);
    }
  };

  const handleUsernameChange = () => {
    if (tempUserId.trim()) {
      setUserId(tempUserId.trim());
      localStorage.setItem("userId", JSON.stringify(tempUserId.trim()));
    }
  };

  const handleChannelSelect = (channel: string, closeMenu?: () => void) => {
    setSelectedChannel(channel);
    closeMenu?.();
  };

  // Character count and remaining characters
  const remainingChars = MAX_MESSAGE_LENGTH - messageInput.length;
  const isNearLimit = remainingChars <= 50;

  return (
    <div className="flex w-screen p-6 transition-opacity duration-300 relative">
      {/* Mobile Menu */}
      <MobileMenu>
        {(closeMenu) => (
          /* Channels Section for Mobile Menu */
          <div>
            <h2 className="text-lg font-bold mb-4">Channels</h2>
            <div className="flex flex-col gap-2">
              {channels.map((channel) => (
                <button
                  key={channel}
                  onClick={() => handleChannelSelect(channel, closeMenu)}
                  className={`block w-full text-left p-2 rounded-full transition-colors cursor-pointer ${
                    selectedChannel === channel
                      ? "bg-neutral-300 text-neutral-900 font-bold"
                      : "bg-neutral-800 hover:bg-neutral-600"
                  }`}
                >
                  # {channel}
                </button>
              ))}
            </div>

            <div className="flex items-stretch mt-4">
              <input
                type="text"
                value={tempUserId}
                onChange={(e) => setTempUserId(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleUsernameChange()}
                className="flex-1 p-2 rounded-l-full bg-neutral-800 text-white focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-inset border-0"
                placeholder="Enter username"
              />
              <button
                onClick={handleUsernameChange}
                disabled={!tempUserId.trim() || tempUserId.trim() === userId}
                className="bg-neutral-600 text-white px-4 py-2 rounded-r-full hover:bg-neutral-500 disabled:bg-neutral-900 disabled:text-neutral-500 disabled:cursor-not-allowed transition-colors border-0"
              >
                👤
              </button>
            </div>

            <div className="mt-4">
              <span
                className={`inline-block w-3 h-3 rounded-full ${
                  isConnected ? "bg-green-600" : "bg-red-600"
                }`}
              ></span>
              <span className="ml-2 text-sm">
                {isConnected ? "Connected" : "Disconnected"}
              </span>
            </div>
          </div>
        )}
      </MobileMenu>

      {/* Desktop Sidebar */}
      <div className="hidden md:block text-white p-4 w-80 flex-shrink-0">
        <h2 className="text-2xl font-bold mb-4">Channels</h2>
        <div className="flex flex-col gap-2">
          {channels.map((channel) => (
            <button
              key={channel}
              onClick={() => handleChannelSelect(channel)}
              className={`block w-full text-left p-2 rounded-full transition-colors cursor-pointer ${
                selectedChannel === channel
                  ? "bg-neutral-300 text-neutral-900 font-bold"
                  : "bg-neutral-800 hover:bg-neutral-600"
              }`}
            >
              # {channel}
            </button>
          ))}
        </div>

        <div className="flex items-stretch mt-4">
          <input
            type="text"
            value={tempUserId}
            onChange={(e) => setTempUserId(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleUsernameChange()}
            className="flex-1 p-2 rounded-l-full bg-neutral-800 text-white focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-inset border-0"
            placeholder="Enter username"
          />
          <button
            onClick={handleUsernameChange}
            disabled={!tempUserId.trim() || tempUserId.trim() === userId}
            className="bg-neutral-600 text-white px-4 py-2 rounded-r-full hover:bg-neutral-500 disabled:bg-neutral-900 disabled:text-neutral-500 disabled:cursor-not-allowed transition-colors border-0"
          >
            👤
          </button>
        </div>

        <div className="mt-4">
          <span
            className={`inline-block w-3 h-3 rounded-full ${
              isConnected ? "bg-green-600" : "bg-red-600"
            }`}
          ></span>
          <span className="ml-2 text-sm">
            {isConnected ? "Connected" : "Disconnected"}
          </span>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col min-w-0 md:ml-0">
        {/* Chat Header */}
        <div className="bg-neutral-300 rounded-2xl p-3 mt-16 md:mt-0">
          <h1 className="font-bold text-2xl text-neutral-900">
            #{selectedChannel}
          </h1>
          <p className="text-gray-600">
            Welcome to the {selectedChannel} channel
          </p>
        </div>

        {/* Messages */}
        <div className="flex-1 max-h-96 overflow-y-auto p-4 space-y-3">
          {messages.map((msg, index) => (
            <div key={index} className="flex flex-col">
              {msg.type === "chat_message" ? (
                <div className="flex items-start space-x-3">
                  <div className="bg-neutral-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                    {msg.userId.charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold">{msg.userId}</span>
                      {msg.timestamp && (
                        <span className="text-xs text-gray-500">
                          {new Date(msg.timestamp).toLocaleTimeString()}
                        </span>
                      )}
                    </div>
                    <p className="text-neutral-100 break-words">
                      {msg.message}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center text-gray-500 text-sm italic">
                  {msg.message}
                </div>
              )}
            </div>
          ))}
          {/* Invisible element to scroll to */}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <form onSubmit={handleSendMessage} className="border-t p-4">
          <div className="flex space-x-2 items-end">
            <div className="flex-1 relative">
              <input
                type="text"
                value={messageInput}
                onChange={handleMessageInputChange}
                placeholder={`Message #${selectedChannel}`}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-inset"
                disabled={!isConnected}
                maxLength={MAX_MESSAGE_LENGTH}
              />
              {messageInput.length > 0 && (
                <div className="absolute -bottom-5 right-0 text-xs">
                  <span
                    className={isNearLimit ? "text-red-500" : "text-gray-500"}
                  >
                    {messageInput.length}/{MAX_MESSAGE_LENGTH}
                  </span>
                </div>
              )}
            </div>
            <button
              type="submit"
              disabled={
                !isConnected ||
                !messageInput.trim() ||
                messageInput.length > MAX_MESSAGE_LENGTH
              }
              className="bg-neutral-800 text-white px-4 py-2 rounded-lg hover:bg-neutral-600 disabled:bg-neutral-900 disabled:text-neutral-500 disabled:cursor-not-allowed transition-colors flex-shrink-0 cursor-pointer"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
