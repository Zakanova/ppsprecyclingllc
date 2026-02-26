import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    
    const { data, error } = await supabase
      .from('profiles')
      .select('count', { count: 'exact', head: true });
    
    if (error) {
      return NextResponse.json({ status: 'error', error: error.message }, { status: 500 });
    }
    
    return NextResponse.json({
      status: 'alive',
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    return NextResponse.json({ status: 'error' }, { status: 500 });
  }
}