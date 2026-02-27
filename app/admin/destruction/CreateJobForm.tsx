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
  const [clientId, setClientId] = useState('');

  useEffect(() => {
    if (showForm) {
      fetch('/api/admin/clients')
        .then(res => res.json())
        .then(data => {
          setClients(data.clients);
          if (data.clients[0]) setClientId(data.clients[0].id);
        });
    }
  }, [showForm]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/admin/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ client_id: clientId })
      });
      if (res.ok) {
        setShowForm(false);
        router.refresh();
      } else {
        alert('Error creating job');
      }
    } catch (err) {
      alert('Error creating job');
    } finally {
      setLoading(false);
    }
  };

  if (!showForm) {
    return (
      <button 
        onClick={() => setShowForm(true)}
        style={{ background: '#2563eb', color: 'white', padding: '10px 20px', borderRadius: '6px', border: 'none', cursor: 'pointer', marginBottom: '20px' }}
      >
        + New Job
      </button>
    );
  }

  return (
    <div style={{ background: 'white', padding: '20px', borderRadius: '8px', marginBottom: '20px', border: '1px solid #e5e7eb' }}>
      <h2 style={{ marginTop: 0 }}>Create New Job</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 600 }}>Client</label>
          <select 
            value={clientId} 
            onChange={(e) => setClientId(e.target.value)}
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #d1d5db' }}
          >
            {clients.map(c => (
              <option key={c.id} value={c.id}>{c.company_name}</option>
            ))}
          </select>
        </div>
        <button 
          type="submit" 
          disabled={loading || !clientId}
          style={{ background: loading ? '#9ca3af' : '#059669', color: 'white', padding: '10px 20px', borderRadius: '6px', border: 'none', cursor: loading ? 'not-allowed' : 'pointer' }}
        >
          {loading ? 'Creating...' : 'Create Job'}
        </button>
        <button 
          type="button" 
          onClick={() => setShowForm(false)}
          style={{ background: '#6b7280', color: 'white', padding: '10px 20px', borderRadius: '6px', border: 'none', cursor: 'pointer', marginLeft: '10px' }}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}