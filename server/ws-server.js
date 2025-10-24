const WebSocket = require('ws');
const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const cors = require('cors');
require('dotenv').config();

const app = express();
const schema = require('./msgschema');
const User = require('./userSchema');
const { generateToken, verifyToken, authenticateToken, optionalAuth } = require('./auth');

app.use(cors());
app.use(express.json());

const server = http.createServer(app);

const uri = process.env.MONGODB_URL

const wss = new WebSocket.Server({ server });

const authenticatedUsers = new Map();

wss.on('connection', async (ws, req) => {
  console.log('New WebSocket connection');
  

  const url = new URL(req.url, `http://${req.headers.host}`);
  const token = url.searchParams.get('token') || req.headers.authorization?.split(' ')[1];
  
  let user = null;
  
  if (token) {
    try {
      const decoded = verifyToken(token);
      if (decoded) {
        user = await User.findById(decoded.userId).select('-password');
        if (user) {
          ws.user = user;
          authenticatedUsers.set(ws, user);
          await user.updateLastSeen();
          
          console.log(`Authenticated user connected: ${user.displayName}`);

          wss.clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
              client.send(JSON.stringify({
                type: 'user_joined',
                user: user.displayName,
                message: `${user.displayName} joined the chat`
              }));
            }
          });
        }
      }
    } catch (error) {
      console.error('WebSocket authentication error:', error);
    }
  }

  ws.on('message', async (msg) => {
    try {
      const messageData = JSON.parse(msg);
      
    
      if (ws.user) {
        messageData.user = ws.user.displayName;
        messageData.userId = ws.user._id;
      }
   
      const broadcastMessage = {
        type: 'message',
        user: messageData.user || 'Anonymous',
        message: messageData.message,
        timestamp: new Date(),
        userId: messageData.userId
      };
      
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(broadcastMessage));
        }
      });

      if (ws.user && messageData.message) {
        try {
          const newmsg = new schema({
            user: ws.user.displayName,
            message: messageData.message,
            userId: ws.user._id
          });
          await newmsg.save();
        } catch (error) {
          console.error('Error saving message:', error);
        }
      }
      
    } catch (error) {
      console.error('Error processing message:', error);
    }
  });

  ws.on('close', async () => {
    console.log('WebSocket connection closed');
    

    if (ws.user) {
      try {
        await ws.user.setOffline();
        authenticatedUsers.delete(ws);
        
  
        wss.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({
              type: 'user_left',
              user: ws.user.displayName,
              message: `${ws.user.displayName} left the chat`
            }));
          }
        });
        
        console.log(`User disconnected: ${ws.user.displayName}`);
      } catch (error) {
        console.error('Error updating user offline status:', error);
      }
    }
  });
});

async function connect(){
    try{
        await mongoose.connect(uri);
        console.log("connected to mongodb");
    }catch(err){
        console.log(err);
    }
}


app.post('/auth/register', async (req, res) => {
  try {
    const { username, email, password, displayName } = req.body;

    if (!username || !email || !password || !displayName) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const existingUser = await User.findOne({
      $or: [{ email }, { username }]
    });

    if (existingUser) {
      return res.status(400).json({ 
        error: existingUser.email === email ? 'Email already registered' : 'Username already taken' 
      });
    }

    const user = new User({
      username,
      email,
      password,
      displayName
    });

    await user.save();

    const token = generateToken(user._id);

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        displayName: user.displayName,
        isOnline: user.isOnline
      }
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
});

app.post('/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }


    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    await user.updateLastSeen();

  
    const token = generateToken(user._id);

  
    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        displayName: user.displayName,
        isOnline: user.isOnline
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});


app.get('/auth/profile', authenticateToken, async (req, res) => {
  try {
    res.json({
      user: {
        id: req.user._id,
        username: req.user.username,
        email: req.user.email,
        displayName: req.user.displayName,
        isOnline: req.user.isOnline,
        lastSeen: req.user.lastSeen
      }
    });
  } catch (error) {
    console.error('Profile error:', error);
    res.status(500).json({ error: 'Failed to get profile' });
  }
});

app.post('/auth/logout', authenticateToken, async (req, res) => {
  try {
    await req.user.setOffline();
    res.json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ error: 'Logout failed' });
  }
});

app.post("/Messages", authenticateToken, async (req, res) => {
  try {
    const { message } = req.body;
    const newmsg = new schema({
      user: req.user.displayName, 
      message,
      userId: req.user._id =
    });
    const saved = await newmsg.save();
    res.status(201).json(saved);
  } catch (error) {
    console.error('Save message error:', error);
    res.status(500).json({ error: 'Failed to save message' });
  }
});

app.get("/Messages", optionalAuth, async (req, res) => {
  try {
    const msgs = await schema.find().sort({ time: 1 });
    res.json(msgs);
  } catch (error) {
    console.error('Fetch messages error:', error);
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});  

server.listen(process.env.PORT, () => {
    console.log(`server started on port ${process.env.PORT}`);
    connect();
})

module.exports = message;
