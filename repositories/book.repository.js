import supabase from '../supabaseClient.js';

export const insertBook = async (bookData) => {
  try {
    const { data, error } = await supabase.rpc('insert_book', {
      book_name: bookData.name,
      book_author: bookData.author,
      book_description: bookData.description,
      book_price: bookData.price
    });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Repository Error:', error);
    throw error;
  }
};