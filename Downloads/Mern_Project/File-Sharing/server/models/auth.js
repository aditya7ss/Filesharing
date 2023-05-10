const jwt = require('jsonwebtoken');

// Create a JWT token
function createToken(user) {
  const payload = {
    user: {
      id: user.id,
      name: user.name,
      email: user.email
    }
  };

  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
}

// Verify a JWT token
function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded.user;
  } catch (err) {
    return null;
  }
}

module.exports = { createToken, verifyToken };
