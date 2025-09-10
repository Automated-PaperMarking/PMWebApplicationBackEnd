import { userRepository } from '../repositories/user.repository.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable is not set. Please set it to a secure value.');
}

const userService = {
  createUser: async (userData) => {
    return await userRepository.insert_user(userData);
  },

  getAllUsers: async () => {
    return await userRepository.exportUser();
  },

  loginUser: async (identifier, password) => {
    const user = await userRepository.getUserByUsernameOrEmail(identifier);
    if (user && (await bcrypt.compare(password, user.password))) {
      // Prepare payload: avoid sensitive info
      const payload = {
        userid: user.userid,
        username: user.username,
        email: user.email,
        role: user.role
      };
      // Generate token (expires in 1h)
      const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
      return { user: payload, token };
    }
    throw new Error('Invalid credentials');
  }
};

export { userService };
