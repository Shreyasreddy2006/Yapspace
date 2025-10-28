# Yapspace React Frontend

A modern React-based frontend for the Yapspace real-time chat application with JWT authentication, built with Vite, Tailwind CSS, and React Router.

## 🚀 Features

- **JWT Authentication**: Secure user registration and login
- **Real-time Chat**: WebSocket-based instant messaging
- **User Management**: Display names and persistent identity
- **Responsive Design**: Mobile and desktop optimized
- **Modern UI**: Built with Tailwind CSS and custom animations
- **State Management**: React Context + useReducer
- **Protected Routes**: Authentication-based routing
- **Component Architecture**: Functional components with hooks

## 🛠️ Technology Stack

- **React 19** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing with protected routes
- **WebSocket** - Real-time communication with authentication
- **Context API** - State management for auth and chat
- **JWT** - Secure authentication tokens

## 📁 Project Structure

```
src/
├── components/
│   ├── AuthPage.jsx         # Authentication page (login/register)
│   ├── Login.jsx            # Login component
│   ├── Register.jsx         # Registration component
│   └── ChatInterface.jsx    # Chat interface component
├── context/
│   └── AppContext.jsx       # React Context for state management
├── hooks/
│   ├── useWebSocket.jsx     # Custom WebSocket hook
│   └── useSwipeGestures.jsx # Mobile swipe gestures
├── App.jsx                  # Main app with routing
├── main.jsx                # App entry point
└── index.css               # Global styles with Tailwind
```

## 🚀 Getting Started

### Prerequisites

- Node.js (>= 18.0.0)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create environment file:
```bash
# Create .env file with:
VITE_API_URL=http://localhost:1021
VITE_WS_URL=ws://localhost:1021
```

3. Start development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

5. Preview production build:
```bash
npm run preview
```

## 🔧 Configuration

### Environment Variables

The application uses environment variables for API configuration:

```bash
# Development
VITE_API_URL=http://localhost:1021
VITE_WS_URL=ws://localhost:1021

# Production
VITE_API_URL=https://yapspace-9oex.onrender.com
VITE_WS_URL=wss://yapspace-9oex.onrender.com
```

### API Endpoints

- **Authentication**: `/auth/login`, `/auth/register`, `/auth/profile`
- **Messages**: `/Messages` (GET/POST)
- **WebSocket**: Real-time messaging with JWT authentication

## ✨ Features

### Authentication System
- **User Registration**: Username, email, password, display name
- **User Login**: Email and password authentication
- **JWT Tokens**: Secure authentication with expiration
- **Protected Routes**: Automatic redirects based on auth state
- **Persistent Sessions**: Login state maintained across browser sessions

### Chat Interface
- **Real-time Messaging**: WebSocket-based instant communication
- **User Recognition**: Messages show user's display name
- **Join/Leave Notifications**: System messages for user activity
- **Message History**: Load previous messages on login
- **Connection Status**: Visual indicators for WebSocket connection
- **Responsive Design**: Optimized for mobile and desktop

### User Experience
- **Display Names**: Users choose how they appear in chat
- **Persistent Identity**: Same display name every login
- **Swipe Gestures**: Mobile-friendly navigation
- **Error Handling**: User-friendly error messages
- **Loading States**: Visual feedback during operations

## 📱 Responsive Design

The application is fully responsive with:
- **Mobile-first approach**: Optimized for touch devices
- **Flexible layouts**: Tailwind CSS responsive utilities
- **Touch-friendly interactions**: Large buttons and inputs
- **Swipe gestures**: Mobile navigation support
- **Adaptive typography**: Scales across screen sizes

## 🚀 Deployment

### Vercel Deployment (Recommended)

1. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Set root directory to `client`

2. **Configure Environment Variables**:
   ```
   VITE_API_URL=https://yapspace-9oex.onrender.com
   VITE_WS_URL=wss://yapspace-9oex.onrender.com
   ```

3. **Deploy**:
   - Vercel will automatically build and deploy
   - Get production URL (e.g., `https://yapspace.vercel.app`)

### Other Platforms
- **Netlify**: Static site hosting
- **GitHub Pages**: Free hosting for public repos
- **Firebase Hosting**: Google's hosting platform

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run vercel-build` - Build for Vercel deployment

### Code Structure

- **Functional Components**: Modern React with hooks
- **Custom Hooks**: Reusable WebSocket and gesture logic
- **Context API**: Global state management for auth and chat
- **Tailwind CSS**: Utility-first styling with custom theme
- **React Router**: Client-side navigation with protected routes

### Authentication Flow

1. **Registration**: User creates account with display name
2. **Login**: User authenticates with email/password
3. **Token Storage**: JWT stored in localStorage
4. **Protected Access**: Routes require authentication
5. **Chat Access**: Authenticated users can send/receive messages

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt on backend
- **Input Validation**: Client and server-side validation
- **Protected Routes**: Authentication required for chat
- **Secure WebSocket**: Token-based WebSocket connections

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📊 Performance

- **Code Splitting**: Automatic chunk splitting
- **Lazy Loading**: Components loaded on demand
- **Optimized Builds**: Minified and compressed assets
- **Fast Refresh**: Hot module replacement in development

## 🐛 Troubleshooting

### Common Issues

1. **Build Failures**: Check Node.js version and dependencies
2. **WebSocket Issues**: Verify backend is running and accessible
3. **Authentication Errors**: Check JWT secret and token expiration
4. **Environment Variables**: Ensure all required variables are set

### Development Tips

- Use browser dev tools to debug WebSocket connections
- Check network tab for API request/response details
- Verify environment variables in build output
- Test authentication flow in incognito mode

## 📄 License

ISC

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For issues and questions:
1. Check the troubleshooting section
2. Review the deployment guide
3. Check browser console for errors
4. Verify backend connectivity