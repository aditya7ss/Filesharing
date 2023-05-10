const multer = require('multer');
const socketio = require('socket.io');
const path = require('path');
const fs = require('fs');

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      const dir = path.join(__dirname, 'uploads');
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
      }
      cb(null, dir);
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    }
  }),
  fileFilter: (req, file, cb) => {
    if (path.extname(file.originalname) !== '.exe') {
      cb(null, true);
    } else {
      cb(new Error('Only .exe files are not allowed'));
    }
  }
}).single('file');

function handleFileUpload(socket) {
  upload(socket.request, socket.request.res, (err) => {
    if (err) {
      socket.emit('file upload error', { message: err.message });
    } else {
      const fileUrl = '/uploads/' + socket.request.file.filename;
      socket.emit('file upload success', { fileUrl });
      socket.broadcast.emit('new file', { fileUrl });
    }
  });
}

module.exports = { handleFileUpload };
