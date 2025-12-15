require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL || 'https://ypfmrmgckyyniqwzvjuo.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlwZm1ybWdja3l5bmlxd3p2anVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU3NTA4NjIsImV4cCI6MjA4MTMyNjg2Mn0.GEohcOCsrWs-L5J66hoFpxhG13v6AWFLdSckIBZUcqg';

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;

