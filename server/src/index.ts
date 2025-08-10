import express from "express";
import { WebSocketServer, WebSocket } from "ws";
import { createServer } from "http";

// Create Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Create HTTP server
const server = createServer(app);

// Handle WebSocket connections
app.get("/", (req, res) => {
  res.send("👋 Hello from Express with TypeScript and WebSockets!");
});

// Create WebSocket server
const wss = new WebSocketServer({ server });

// Handle WebSocket connections
wss.on("connection", (ws: WebSocket) => {
  console.log("Client connected");

  ws.on("message", (message: string) => {
    console.log(`Received message: ${message}`);
    ws.send(`You said: ${message}`);
  });

  ws.on("close", () => {
    console.log("Client disconnected");
  });
});

// Start the server
server.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
  console.log(`🚀 WebSocket server is running at ws://localhost:${PORT}`);
});
