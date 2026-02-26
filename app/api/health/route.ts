import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    );

    const startTime = Date.now();
    
    const { data, error } = await supabase
      .from('profiles')
      .select('id')
      .limit(1);
    
    const responseTime = Date.now() - startTime;

    if (error) {
      return NextResponse.json(
        {
          status: 'unhealthy',
          error: error.message,
          timestamp: new Date().toISOString()
        },
        { status: 503 }
      );
    }

    return NextResponse.json({
      status: 'healthy',
      responseTime: `${responseTime}ms`,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    return NextResponse.json(
      {
        status: 'error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}