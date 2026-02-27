import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

// GET /api/destruction/jobs/[id]/items - Get items for a job
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

    const { data: items, error } = await supabase
      .from('destruction_items')
      .select('*')
      .eq('job_id', params.id)
      .order('created_at', { ascending: true });

    if (error) throw error;

    return NextResponse.json({ items });
  } catch (error) {
    console.error('Error fetching items:', error);
    return NextResponse.json(
      { error: 'Failed to fetch items' }, 
      { status: 500 }
    );
  }
}

// POST /api/destruction/jobs/[id]/items - Add item to job
export async function POST(
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
    
    // Validate required fields
    if (!body.serial_number || !body.device_type) {
      return NextResponse.json(
        { error: 'Serial number and device type required' }, 
        { status: 400 }
      );
    }

    const { data: item, error } = await supabase
      .from('destruction_items')
      .insert({
        job_id: params.id,
        serial_number: body.serial_number,
        asset_tag: body.asset_tag,
        device_type: body.device_type,
        manufacturer: body.manufacturer,
        model: body.model,
        capacity: body.capacity,
        media_condition: body.media_condition || 'unknown',
        data_classification: body.data_classification || 'confidential',
        contains_pii: body.contains_pii || false,
        contains_phi: body.contains_phi || false,
        contains_cardholder_data: body.contains_cardholder_data || false,
        pci_dss_scope: body.pci_dss_scope || false
      })
      .select()
      .single();

    if (error) throw error;

    // Log audit
    await supabase
      .from('destruction_audit_logs')
      .insert({
        job_id: params.id,
        item_id: item.id,
        action: 'ITEM_ADDED',
        performed_by: session.user.id,
        details: { serial_number: body.serial_number, device_type: body.device_type }
      });

    return NextResponse.json({ item }, { status: 201 });
  } catch (error) {
    console.error('Error adding item:', error);
    return NextResponse.json(
      { error: 'Failed to add item' }, 
      { status: 500 }
    );
  }
}