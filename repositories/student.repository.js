import supabase from '../supabaseClient.js';
import bcrypt from 'bcryptjs';

const studentRepository = {
  insertStudent : async (studentData) => {
    try {
      // Password Hashing
      const hashedPassword = await bcrypt.hash(studentData.password, 10);
      //  salt round of 10, which is secure and commonly used
  
      const { data, error } = await supabase.rpc('insert_student', {
        student_regno: studentData.regNo,
        student_name: studentData.name,
        student_batch: studentData.batch,
        student_username: studentData.userName,
        student_password: hashedPassword,
      });
  
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Repository Error:', error);
      throw error;
    }
  },
  exportStudent : async ()=> {
    try{
      const { data, error } = await supabase
        .from('student')
        .select('regno, name, batch, username');
      if (error) throw error;
      return data;
    }catch(error){
      console.error('Repository Error:', error);
      throw error;
    }
  }
};

export {studentRepository};
