# Yapspace React Frontend

A modern React-based frontend for the Yapspace real-time chat application, built with Vite, Tailwind CSS, and React Router.

## Features

- **Real-time Chat**: WebSocket-based instant messaging
- **Responsive Design**: Mobile and desktop optimized
- **Modern UI**: Built with Tailwind CSS and custom animations
- **State Management**: React Context + useReducer
- **Routing**: React Router for navigation
- **Component Architecture**: Functional components with hooks

## Technology Stack

- **React 19** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **WebSocket** - Real-time communication
- **Context API** - State management

## Project Structure

```
src/
├── components/
│   ├── LandingPage.jsx      # Landing page component
│   └── ChatInterface.jsx    # Chat interface component
├── context/
│   └── AppContext.js        # React Context for state management
├── hooks/
│   └── useWebSocket.js      # Custom WebSocket hook
├── App.jsx                  # Main app component
├── main.jsx                # App entry point
└── index.css               # Global styles with Tailwind
```

## Getting Started

### Prerequisites

- Node.js (>= 18.0.0)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

4. Preview production build:
```bash
npm run preview
```

## Configuration

The application connects to:
- **WebSocket**: `wss://yapspace-9oex.onrender.com`
- **REST API**: `https://yapspace-9oex.onrender.com/Messages`

## Features

### Landing Page
- User name input with validation
- Modern glassmorphism design
- Responsive layout for all devices
- Smooth animations and transitions

### Chat Interface
- Real-time message display
- Connection status indicator
- Message history loading
- Auto-scroll to latest messages
- Error handling and user feedback
- Responsive message bubbles
- Timestamp display

### State Management
- User authentication state
- Message history management
- Connection status tracking
- Error state handling

### WebSocket Integration
- Automatic reconnection
- Connection status monitoring
- Message broadcasting
- Database persistence

## Responsive Design

The application is fully responsive with:
- Mobile-first approach
- Flexible layouts using Tailwind CSS
- Touch-friendly interactions
- Optimized for various screen sizes

## Deployment

The React frontend can be deployed to:
- **Vercel** (recommended for React)
- **Netlify**
- **Render.com** (current deployment)
- **Any static hosting service**

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Code Structure

- **Functional Components**: Modern React with hooks
- **Custom Hooks**: Reusable WebSocket logic
- **Context API**: Global state management
- **Tailwind CSS**: Utility-first styling
- **React Router**: Client-side navigation

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

ISC