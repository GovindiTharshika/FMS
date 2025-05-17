import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const app = express();
const PORT = 4000;
const JWT_SECRET = 'supersecretkey'; // In production, use env vars

app.use(cors());
app.use(express.json());

// In-memory user store: { email: { passwordHash } }
const users = {};

// Signup endpoint
app.post('/api/signup', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'Email and password required' });
  if (users[email]) return res.status(409).json({ message: 'User already exists' });
  const passwordHash = await bcrypt.hash(password, 10);
  users[email] = { passwordHash };
  return res.status(201).json({ message: 'User created' });
});

// Login endpoint
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  const user = users[email];
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });
  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) return res.status(401).json({ message: 'Invalid credentials' });
  const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '1h' });
  return res.json({ token, email });
});

// Middleware to check JWT
function authMiddleware(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ message: 'No token' });
  const token = auth.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ message: 'Invalid token' });
  }
}

// Profile endpoint
app.get('/api/profile', authMiddleware, (req, res) => {
  const { email } = req.user;
  if (!users[email]) return res.status(404).json({ message: 'User not found' });
  return res.json({ email });
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
}); 