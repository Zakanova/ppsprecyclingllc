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
        setShowForm(false);
        router.refresh();
      } else {
        const error = await response.json();
        alert('Error: ' + (error.error || 'Unknown error'));
      }
    } catch (error) {
      alert('Error creating job');
    } finally {
      setLoading(false);
    }
  };

  if (!showForm) {
    return (
      <button onClick={() => setShowForm(true)} style={{ backgroundColor: '#2563eb', color: 'white', padding: '10px 20px', border




mkdir -p app/api/admin/clients

cat > app/api/admin/clients/route.ts << 'ENDOFFILE'
import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET() {
  try {
    const { data: clients, error } = await supabaseAdmin
      .from('profiles')
      .select('id, company_name')
      .eq('role', 'client')
      .order('company_name');
    if (error) throw error;
    return NextResponse.json({ clients: clients || [] });
  } catch (error) {
    return NextResponse.json({ clients: [], error: 'Failed to fetch clients' }, { status: 500 });
  }
}
