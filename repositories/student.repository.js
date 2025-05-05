import supabase from '../supabaseClient.js';

export const insertStudent = async (studentData) => {
  try {
    const { data, error } = await supabase.rpc('insert_student', {
      student_regNo: studentData.regNo,
      student_name: studentData.Name,
      student_batch: studentData.batch,
      student_userName: studentData.userName,
      student_password: studentData.password,
    });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Repository Error:', error);
    throw error;
  }
};