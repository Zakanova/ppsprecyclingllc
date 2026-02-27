'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateJobForm() {
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    client_id: '',
    destruction_method: 'shred',
    standard: 'NIST_800_88',
    data_classification: 'confidential',
    notes: '',
    compliance_frameworks: ['NIST_800_88']
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/destruction/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setShowForm(false);
        setFormData({
          client_id: '',
          destruction_method: 'shred',
          standard: 'NIST_800_88',
          data_classification: 'confidential',
          notes: '',
          compliance_frameworks: ['NIST_800_88']
        });
        router.refresh();
      } else {
        alert('Error creating job');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error creating job');
    } finally {
      setLoading(false);
    }
  };

  if (!showForm) {
    return (
      <button
        onClick={() => setShowForm(true)}
        style={{
          backgroundColor: '#2563eb',
          color: 'white',
          padding: '10px 20px',
          borderRadius: '6px',
          border: 'none',
          cursor: 'pointer',
          fontSize: '16px',
          marginBottom: '20px'
        }}
      >
        + New Job
      </button>
    );
  }

  return (
    <div style={{
      backgroundColor: 'white',
      padding: '20px',
      borderRadius: '8px',
      marginBottom: '20px',
      border: '1px solid #e5e7eb'
    }}>
      <h2 style={{ marginTop: 0, marginBottom: '20px' }}>Create New Destruction Job</h2>
      
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 600 }}>
            Client ID *
          </label>
          <input
            type="text"
            required
            value={formData.client_id}
            onChange={(e) => setFormData({...formData, client_id: e.target.value})}
            style={{
              width: '100%',
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #d1d5db'
            }}
            placeholder="Enter client UUID"
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 600 }}>
            Destruction Method *
          </label>
          <select
            value={formData.destruction_method}
            onChange={(e) => setFormData({...formData, destruction_method: e.target.value})}
            style={{
              width: '100%',
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #d1d5db'
            }}
          >
            <option value="shred">Shred</option>
            <option value="degauss">Degauss</option>
            <option value="clear">Clear</option>
            <option value="purge">Purge</option>
            <option value="destroy">Destroy</option>
            <option value="crypto_erase">Crypto Erase</option>
          </select>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 600 }}>
            Standard *
          </label>
          <select
            value={formData.standard}
            onChange={(e) => setFormData({...formData, standard: e.target.value})}
            style={{
              width: '100%',
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #d1d5db'
            }}
          >
            <option value="NIST_800_88">NIST 800-88</option>
            <option value="DoD_5220.22_M">DoD 5220.22-M</option>
            <option value="PCI_DSS">PCI DSS</option>
            <option value="GDPR">GDPR</option>
          </select>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 600 }}>
            Data Classification
          </label>
          <select
            value={formData.data_classification}
            onChange={(e) => setFormData({...formData, data_classification: e.target.value})}
            style={{
              width: '100%',
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #d1d5db'
            }}
          >
            <option value="public">Public</option>
            <option value="internal">Internal</option>
            <option value="confidential">Confidential</option>
            <option value="restricted">Restricted</option>
            <option value="classified">Classified</option>
          </select>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 600 }}>
            Notes
          </label>
          <textarea
            value={formData.notes}
            onChange={(e) => setFormData({...formData, notes: e.target.value})}
            style={{
              width: '100%',
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #d1d5db',
              minHeight: '80px'
            }}
            placeholder="Job description, special requirements, etc."
          />
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            type="submit"
            disabled={loading}
            style={{
              backgroundColor: loading ? '#9ca3af' : '#059669',
              color: 'white',
              padding: '10px 20px',
              borderRadius: '6px',
              border: 'none',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontSize: '16px'
            }}
          >
            {loading ? 'Creating...' : 'Create Job'}
          </button>
          
          <button
            type="button"
            onClick={() => setShowForm(false)}
            style={{
              backgroundColor: '#6b7280',
              color: 'white',
              padding: '10px 20px',
              borderRadius: '6px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}