import { supabase } from '../../lib/supabase';
import { redirect } from 'next/navigation';

export default async function RedirectPage({ params }) {
  const { code } = await params;

  if (!code) {
    return <h1>404 - Link not found</h1>;
  }

  const { data, error } = await supabase
    .from('urls')
    .select('original_url')
    .eq('short_url', code.toLowerCase())
    .single();

  if (error || !data) {
    return <h1>404 - Link not found</h1>;
  }

  redirect(data.original_url);
}
