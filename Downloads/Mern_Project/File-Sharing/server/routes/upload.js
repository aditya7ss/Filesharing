const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const socketio = require('socket.io');

// Set up multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// Set up socket.io
const io = socketio();
router.io = io;

io.on('connection', (socket) => {
  console.log('New client connected');

  // Listen for new file uploads
  socket.on('new-file', () => {
    const files = fs.readdirSync('./uploads');
    io.emit('files-updated', files);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Handle file upload
router.post('/upload', upload.single('file'), (req, res) => {
  try {
    // Emit socket.io event to update file list
    io.emit('new-file');

    // Return success response
    res.status(200).json({ message: 'File uploaded successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
