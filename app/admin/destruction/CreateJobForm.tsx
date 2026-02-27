'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Client {
  id: string;
  company_name: string;
}

export default function CreateJobForm() {
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [clients, setClients] = useState<Client[]>([]);
  const [formData, setFormData] = useState({
    client_id: '',
    destruction_method: 'shred',
    standard: 'NIST_800_88',
    data_classification: 'confidential',
    status: 'pending',
    notes: ''
  });

  useEffect(() => {
    if (showForm) {
      fetchClients();
    }
  }, [showForm]);

  const fetchClients = async () => {
    try {
      const response = await fetch('/api/admin/clients');
      if (response.ok) {
        const data = await response.json();
        setClients(data.clients);
        if (data.clients.length > 0 && !formData.client_id) {
          setFormData(prev => ({ ...prev, client_id: data.clients[0].id }));
        }
      }
    } catch (error) {
      console.error('Error fetching clients:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/admin/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setShowForm(false







# 3. Update jobs API
cat > app/api/admin/jobs/route.ts << 'ENDOFFILE'
import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    if (!body.client_id) {
      return NextResponse.json({ success: false, error: 'Please select a client' }, { status: 400 });
    }

    const { data, error } = await supabaseAdmin
      .from('data_destruction_jobs')
      .insert([{
        client_id: body.client_id,
        destruction_method: body.destruction_method || 'shred',
        standard: body.standard || 'NIST_800_88',
        data_classification: body.data_classification || 'confidential',
        status: body.status || 'pending',
        notes: body.notes,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }])
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json({ success: true, job: data });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to create job' }, { status: 500 });
  }
}
