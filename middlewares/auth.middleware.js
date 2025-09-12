import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable is not set. Please set it to a secure value.');
}

export const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' });
  }
  const token = authHeader.split(' ')[1];
  try {
    console.log(token)
    console.log(jwt.decode(token, { complete: true }));
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Payload should include userid
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};
