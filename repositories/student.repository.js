import supabase from '../supabaseClient.js';
import bcrypt from 'bcryptjs';

export const insertStudent = async (studentData) => {
  try {

    // Password Hashing
    const hashedPassword = await bcrypt.hash(studentData.password, 10);
    //  salt round of 10, which is secure and commonly used

    const { data, error } = await supabase.rpc('insert_student', {
      student_regNo: studentData.regNo,
      student_name: studentData.Name,
      student_batch: studentData.batch,
      student_userName: studentData.userName,
      student_password: hashedPassword,
    });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Repository Error:', error);
    throw error;
  }
};