import express from "express";
import { WebSocketServer, WebSocket } from "ws";
import { createServer } from "http";

// Create Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for your frontend
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Create HTTP server
const server = createServer(app);

// Store connected clients by channel
const channels = new Map<string, Set<WebSocket & { userId?: string }>>();

// Handle WebSocket connections
app.get("/", (req, res) => {
  res.send("👋 Hello from Express with TypeScript and WebSockets!");
});

// Create WebSocket server
const wss = new WebSocketServer({ server });

// Handle WebSocket connections
wss.on(
  "connection",
  (ws: WebSocket & { userId?: string; channel?: string }) => {
    console.log("Client connected");

    ws.on("message", (data: string) => {
      try {
        const message = JSON.parse(data);

        switch (message.type) {
          case "join_channel":
            // Remove from previous channel if exists
            if (ws.channel && channels.has(ws.channel)) {
              channels.get(ws.channel)?.delete(ws);
            }

            // Join new channel
            ws.channel = message.channel;
            ws.userId = message.userId || `user_${Date.now()}`;

            if (!channels.has(message.channel)) {
              channels.set(message.channel, new Set());
            }
            channels.get(message.channel)?.add(ws);

            // Notify channel about new user
            broadcastToChannel(message.channel, {
              type: "user_joined",
              userId: ws.userId,
              message: `${ws.userId} joined the channel`,
            });
            break;

          case "chat_message":
            if (ws.channel) {
              broadcastToChannel(ws.channel, {
                type: "chat_message",
                userId: ws.userId,
                message: message.message,
                timestamp: new Date().toISOString(),
              });
            }
            break;

          case "user_renamed":
            console.log("Received user_renamed message:", message);
            if (ws.channel) {
              // Update the user's userId
              const oldUserId = ws.userId;
              ws.userId = message.newUserId;

              console.log(
                `User renamed from ${message.oldUserId} to ${message.newUserId} in channel ${ws.channel}`
              );

              // Broadcast rename notification to all users in the channel
              const renameNotification = {
                type: "user_renamed",
                userId: "System",
                message: `${message.oldUserId} changed their name to ${message.newUserId}`,
                timestamp: new Date().toISOString(),
                oldUserId: message.oldUserId,
                newUserId: message.newUserId,
              };

              console.log(
                "Broadcasting rename notification:",
                renameNotification
              );
              broadcastToChannel(ws.channel, renameNotification);
            }
            break;
        }
      } catch (error) {
        console.error("Error parsing message:", error);
      }
    });

    ws.on("close", () => {
      console.log("Client disconnected");

      // Remove from channel
      if (ws.channel && channels.has(ws.channel)) {
        channels.get(ws.channel)?.delete(ws);

        // Notify channel about user leaving
        broadcastToChannel(ws.channel, {
          type: "user_left",
          userId: ws.userId,
          message: `${ws.userId} left the channel`,
        });
      }
    });
  }
);

// Broadcast message to all clients in a channel
function broadcastToChannel(channel: string, message: any) {
  const clients = channels.get(channel);
  if (clients) {
    clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(message));
      }
    });
  }
}

// Start the server
server.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
  console.log(`🚀 WebSocket server is running at ws://localhost:${PORT}`);
});
