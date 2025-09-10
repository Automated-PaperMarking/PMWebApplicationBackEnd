import supabase from '../supabaseClient.js';
import bcrypt from 'bcryptjs';

const userRepository = {
  insert_user : async (userData) => {
    try {
      // Password Hashing
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      //  salt round of 10, which is secure and commonly used

      const { data, error } = await supabase.rpc('insert_user', {
        custom_id: userData.regNo,
        user_name: userData.name,
        user_role: userData.role,
        user_username: userData.username,
        user_password: hashedPassword,
        user_email: userData.email,
        student_batch: userData.batch
      });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Repository Error:', error);
      throw error;
    }
  },
  exportUser : async ()=> {
    try{
      const { data, error } = await supabase
        .from('Users')
        .select('UserID, Name, Role, UserName, Email, Batch');
      if (error) throw error;
      return data;
    }catch(error){
      console.error('Repository Error:', error);
      throw error;
    }
  },

  getUserByUsernameOrEmail: async (identifier) => {
    try {
      const { data, error } = await supabase
        .from('Users')
        .select('*')
        .or(`username.eq.${identifier},email.eq.${identifier}`)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Repository Error:', error);
      throw error;
    }
  },
};

export {userRepository};
