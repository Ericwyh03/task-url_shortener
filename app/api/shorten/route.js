import { supabase } from '../../../lib/supabase';

function generateCode(length = 6) {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
}

export async function POST(req) {
  const { url } = await req.json();

  if (!url || !url.startsWith('http')) {
    return new Response(
      JSON.stringify({ error: 'Invalid URL' }),
      { status: 400 }
    );
  }

  const shortCode = generateCode().toLowerCase();

  const { error } = await supabase
    .from('urls')
    .insert([{ short_url: shortCode, original_url: url }]);


  if (error) {
    return new Response(
      JSON.stringify({ error: 'Database error' }),
      { status: 500 }
    );
  }

  const shortUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/${shortCode}`;

  return new Response(
    JSON.stringify({ shortUrl }),
    { status: 200 }
  );
}
