# Vapor Speak 💬

A modern, anonymous chat platform built with Next.js, Express.js and WebSockets that provides a safe space for open communication and expression.

## 🌟 Features

- **Anonymous Messaging**: Chat without revealing your identity
- **Real-time Communication**: Instant messaging powered by WebSockets
- **Channel-based Chat**: Join different channels for various topics
- **User Customization**: Change your display name anytime
- **Responsive Design**: Works seamlessly on desktop and mobile
- **Message Persistence**: Messages are temporarily stored locally
- **Auto-cleanup**: Messages automatically expire for privacy

## 🚀 Tech Stack

### Frontend

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **WebSocket API** - Real-time communication

### Backend

- **Node.js** - Server runtime
- **Express.js** - Web framework
- **WebSocket Server (ws)** - Real-time messaging
- **TypeScript** - Type-safe server development

## 📦 Installation

### Prerequisites

- Node.js 18+
- npm or yarn

### Clone the repository

```bash
git clone https://github.com/yourusername/vapor-speak.git
cd vapor-speak
```

### Install dependencies

#### Client

```bash
cd client
npm install
```

#### Server

```bash
cd server
npm install
```

## 🛠️ Development

### Start the server

```bash
cd server
npm run dev
```

Server will run on `http://localhost:5000`

### Start the client

```bash
cd client
npm run dev
```

Client will run on `http://localhost:3000`

## 📁 Project Structure

```
vapor-speak/
├── client/                 # Next.js frontend
│   ├── src/
│   │   ├── app/           # App Router pages
│   │   ├── components/    # React components
│   │   ├── hooks/         # Custom hooks (WebSocket)
│   │   └── utils/         # Utility functions
│   └── package.json
├── server/                # Express.js backend
│   ├── src/
│   │   └── index.ts       # Server entry point
│   └── package.json
└── README.md
```

## 🔧 Configuration

### Environment Variables

#### Client (.env.local)

```env
NEXT_PUBLIC_WS_URL=ws://localhost:5000
```

#### Server (.env)

```env
PORT=5000
CORS_ORIGIN=http://localhost:3000
```

## 🌐 Deployment

### Building for Production

#### Client

```bash
cd client
npm run build
npm start
```

#### Server

```bash
cd server
npm run build
npm start
```

### Docker (Optional)

```bash
# Build and run with Docker Compose
docker-compose up --build
```

## 🎯 Usage

1. **Visit the application** at `http://localhost:3000`
2. **Enter a username** or use the randomly generated one
3. **Join a channel** or create a new one
4. **Start chatting** anonymously with other users
5. **Change your name** anytime during the conversation

## 🔒 Privacy & Security

- **No account registration** required
- **Messages are not permanently stored** on the server
- **Local storage** is used for temporary message persistence
- **Anonymous by default** - no personal information collected
- **Auto-expiring messages** for enhanced privacy

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🐛 Known Issues

- WebSocket connection may fail on first load (refresh to reconnect)
- Messages are lost when server restarts (by design for privacy)

## 🔮 Future Features

- [ ] Emoji support
- [ ] File sharing
- [ ] Voice messages
- [ ] Channel moderation
- [ ] Message reactions
- [ ] Dark/Light theme toggle

## 📞 Support

If you encounter any issues or have questions, please open an issue on GitHub.

---

**Built with ❤️ for anonymous communication**
