import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Get the first available client from profiles (for testing)
    // In production, you should select the specific client
    const { data: client, error: clientError } = await supabaseAdmin
      .from('profiles')
      .select('id')
      .eq('role', 'client')
      .limit(1)
      .single();
    
    if (clientError || !client) {
      return NextResponse.json(
        { success: false, error: 'No client found. Please create a client first.' },
        { status: 400 }
      );
    }

    // Create the destruction job
    const { data, error } = await supabaseAdmin
      .from('data_destruction_jobs')
      .insert([{
        client_id: client.id,
        destruction_method: 'shred',
        standard: 'NIST_800_88',
        data_classification: 'confidential',
        status: body.status || 'pending',
        notes: `${body.client_name} - ${body.notes || ''}`,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }])
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ success: true, job: data });
  } catch (error) {
    console.error('Error creating job:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create job' },
      { status: 500 }
    );
  }
}
