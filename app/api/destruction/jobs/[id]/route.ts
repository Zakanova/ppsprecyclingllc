import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

// GET /api/destruction/jobs/[id] - Get single job
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

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

    // Check access (admin can see all, clients only their own)
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', session.user.id)
      .single();

    if (profile?.role === 'client' && job.client_id !== session.user.id) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 });
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

// PATCH /api/destruction/jobs/[id] - Update job
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

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

    // Log audit
    await supabase
      .from('destruction_audit_logs')
      .insert({
        job_id: params.id,
        action: 'JOB_MODIFIED',
        performed_by: session.user.id,
        details: body
      });

    return NextResponse.json({ job });
  } catch (error) {
    console.error('Error updating job:', error);
    return NextResponse.json(
      { error: 'Failed to update job' }, 
      { status: 500 }
    );
  }
}