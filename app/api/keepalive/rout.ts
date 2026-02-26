import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    
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
}lik