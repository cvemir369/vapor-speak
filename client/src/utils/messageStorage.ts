interface StoredMessage {
  id: string;
  user: string;
  content: string;
  timestamp: number;
  channel: string;
}

const MESSAGE_EXPIRY = 10 * 60 * 1000; // 10 minutes

export const messageStorage = {
  saveMessage(channel: string, message: Omit<StoredMessage, "timestamp">) {
    const storageKey = `messages_${channel}`;
    const storedMessage: StoredMessage = {
      ...message,
      timestamp: Date.now(),
    };

    const existingMessages = this.getMessages(channel);
    const updatedMessages = [...existingMessages, storedMessage];

    // Use sessionStorage instead of localStorage
    sessionStorage.setItem(storageKey, JSON.stringify(updatedMessages));
  },

  getMessages(channel: string): StoredMessage[] {
    const storageKey = `messages_${channel}`;
    const stored = sessionStorage.getItem(storageKey);

    if (!stored) return [];

    const messages: StoredMessage[] = JSON.parse(stored);
    const now = Date.now();

    // Filter out expired messages
    const validMessages = messages.filter(
      (msg) => now - msg.timestamp < MESSAGE_EXPIRY
    );

    // Update storage with only valid messages
    if (validMessages.length !== messages.length) {
      sessionStorage.setItem(storageKey, JSON.stringify(validMessages));
    }

    return validMessages;
  },

  clearExpiredMessages() {
    const keys = Object.keys(sessionStorage).filter((key) =>
      key.startsWith("messages_")
    );

    keys.forEach((key) => {
      const messages = JSON.parse(sessionStorage.getItem(key) || "[]");
      const now = Date.now();
      const validMessages = messages.filter(
        (msg: StoredMessage) => now - msg.timestamp < MESSAGE_EXPIRY
      );

      if (validMessages.length === 0) {
        sessionStorage.removeItem(key);
      } else if (validMessages.length !== messages.length) {
        sessionStorage.setItem(key, JSON.stringify(validMessages));
      }
    });
  },
};
