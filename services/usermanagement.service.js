import { userRepository } from '../repositories/user.repository.js';

const userService = {
  createUser: async (userData) => {
    return await userRepository.insert_user(userData);
  },

  getAllUsers: async () => {
    return await userRepository.exportUser();
  }
};

export { userService };
