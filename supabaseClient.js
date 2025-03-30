import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import config from './config.js';

const supabaseUrl = config.supabaseUrl;
const supabaseKey = config.supabaseKey;

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
