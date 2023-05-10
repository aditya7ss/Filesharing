const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the file-sharing app!');
});


// Set up middleware and routes for user authentication, user interface, etc.

io.on('connection', (socket) => {
    console.log('Socket connected:', socket.id);
  
    // Handle file uploads
    socket.on('file upload', () => {
      handleFileUpload(socket);
    });
  
    socket.on('disconnect', () => {
      console.log('Socket disconnected:', socket.id);
    });
  });

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});