// app/api/destruction/jobs/route.ts - FIXED VERSION
import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

// Create Supabase client with service role for API routes
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export async function GET(request: Request) {
  try {
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    // Get all jobs with item count
    const { data: jobs, error } = await supabase
      .from('data_destruction_jobs')
      .select(`
        *,
        destruction_items(count)
      `)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }

    return NextResponse.json({ jobs });
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch jobs', details: error }, 
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const body = await request.json();
    
    // Validate required fields
    const required = ['client_id', 'destruction_method', 'standard'];
    for (const field of required) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` }, 
          { status: 400 }
        );
      }
    }

    // Create job
    const { data: job, error } = await supabase
      .from('data_destruction_jobs')
      .insert({
        client_id: body.client_id,
        destruction_method: body.destruction_method,
        standard: body.standard,
        data_classification: body.data_classification || 'confidential',
        location: body.location || '9095 Elk Grove Blvd Suite B, Elk Grove, CA 95624',
        notes: body.notes,
        compliance_frameworks: body.compliance_frameworks || [],
        quality_control_check: body.quality_control_check || false,
        status: 'pending'
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ job }, { status: 201 });
  } catch (error) {
    console.error('Error creating job:', error);
    return NextResponse.json(
      { error: 'Failed to create job' }, 
      { status: 500 }
    );
  }
}