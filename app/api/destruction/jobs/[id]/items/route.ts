import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// GET /api/destruction/jobs/[id]/items
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
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

// POST /api/destruction/jobs/[id]/items
export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const body = await request.json();
    
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

    return NextResponse.json({ item }, { status: 201 });
  } catch (error) {
    console.error('Error adding item:', error);
    return NextResponse.json(
      { error: 'Failed to add item' }, 
      { status: 500 }
    );
  }
}