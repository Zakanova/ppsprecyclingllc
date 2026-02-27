import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// GET /api/destruction/jobs/[id]
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    const { data: job, error } = await supabase
      .from('data_destruction_jobs')
      .select(`
        *,
        destruction_items(*),
        destruction_certificates(*),
        chain_of_custody_events(*)
      `)
      .eq('id', params.id)
      .single();

    if (error) throw error;
    if (!job) {
      return NextResponse.json({ error: 'Job not found' }, { status: 404 });
    }

    return NextResponse.json({ job });
  } catch (error) {
    console.error('Error fetching job:', error);
    return NextResponse.json(
      { error: 'Failed to fetch job' }, 
      { status: 500 }
    );
  }
}

// PATCH /api/destruction/jobs/[id]
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const body = await request.json();
    
    const { data: job, error } = await supabase
      .from('data_destruction_jobs')
      .update({
        status: body.status,
        destruction_method: body.destruction_method,
        notes: body.notes,
        started_at: body.started_at,
        completed_at: body.completed_at,
        verified_at: body.verified_at,
        quality_control_check: body.quality_control_check,
        updated_at: new Date().toISOString()
      })
      .eq('id', params.id)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ job });
  } catch (error) {
    console.error('Error updating job:', error);
    return NextResponse.json(
      { error: 'Failed to update job' }, 
      { status: 500 }
    );
  }
}