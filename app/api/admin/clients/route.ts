import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET() {
  try {
    const { data: clients, error } = await supabaseAdmin
      .from('profiles')
      .select('id, company_name')
      .eq('role', 'client')
      .order('company_name');
    if (error) throw error;
    return NextResponse.json({ clients: clients || [] });
  } catch (error) {
    return NextResponse.json({ clients: [], error: 'Failed to fetch clients' }, { status: 500 });
  }
}
