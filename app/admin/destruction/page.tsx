import { createClient } from '@supabase/supabase-js';
import CreateJobForm from './CreateJobForm';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

async function getJobs() {
  const supabase = createClient(supabaseUrl, supabaseServiceKey);
  
  const { data: jobs, error } = await supabase
    .from('data_destruction_jobs')
    .select(`
      *,
      destruction_items(count)
    `)
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error:', error);
    return [];
  }
  
  return jobs || [];
}

export default async function DestructionAdmin() {
  const jobs = await getJobs();

  return (
    <div style={{ padding: 20, backgroundColor: '#f9fafb', minHeight: '100vh' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <h1 style={{ fontSize: 30, fontWeight: 'bold', margin: 0 }}>
            Data Destruction Jobs
          </h1>
        </div>

        <CreateJobForm />
        
        <p style={{ marginBottom: 20 }}>Total jobs: {jobs.length}</p>
        
        {jobs.map((job: any) => (
          <div 
            key={job.id} 
            style={{ 
              border: '1px solid #ddd', 
              margin: '10px 0', 
              padding: 20,
              borderRadius: 8,
              backgroundColor: 'white'
            }}
          >
            <div style={{ fontWeight: 'bold', color: '#2563eb', fontSize: 18 }}>
              {job.job_number}
            </div>
            <div style={{ marginTop: 8 }}>
              <span style={{ 
                padding: '4px 12px', 
                borderRadius: 12,
                backgroundColor: job.status === 'pending' ? '#fef3c7' : '#e5e7eb',
                color: job.status === 'pending' ? '#92400e' : '#374151',
                fontSize: 12,
                fontWeight: 600
              }}>
                {job.status}
              </span>
            </div>
            <div style={{ marginTop: 8, color: '#4b5563' }}>
              Method: {job.destruction_method} | Standard: {job.standard}
            </div>
            <div style={{ marginTop: 4, color: '#6b7280' }}>
              Items: {job.destruction_items?.[0]?.count || 0}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}