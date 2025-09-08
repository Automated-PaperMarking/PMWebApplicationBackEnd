// usermanagement.controller.js

import { userService } from '../services/usermanagement.service.js';

const userController = {
  createUser: async (req, res) => {
    try {
      const userData = req.body; // expects { name, role, username, password, email, batch }
      const result = await userService.createUser(userData);
      res.status(201).json({ user: result });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getAllUsers: async (req, res) => {
    try {
      const users = await userService.getAllUsers();
      res.status(200).json({ users });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

export { userController };
