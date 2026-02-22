'use client';

import { useState, Suspense, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

declare global {
  interface Window {
    emailjs: any;
  }
}

function ScheduleForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const defaultType = searchParams.get('type') || 'ewaste';
  const [emailjsLoaded, setEmailjsLoaded] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    address: '',
    serviceType: defaultType === 'itad' ? 'ITAD Services' : 'E-Waste Recycling',
    equipment: '',
    quantity: '',
    date: '',
    notes: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && !window.emailjs) {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js';
      script.async = true;
      script.onload = () => {
        console.log('EmailJS loaded, initializing...');
        if (window.emailjs) {
          window.emailjs.init({ publicKey: 'bDtZRRUSav3APye6G' });
          console.log('EmailJS initialized');
          setEmailjsLoaded(true);
        }
      };
      script.onerror = () => {
        console.error('Failed to load EmailJS');
      };
      document.body.appendChild(script);
    } else if (typeof window !== 'undefined' && window.emailjs) {
      setEmailjsLoaded(true);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (typeof window === 'undefined' || !window.emailjs) {
        await new Promise<void>((resolve, reject) => {
          const script = document.createElement('script');
          script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js';
          script.async = true;
          script.onload = () => {
            if (window.emailjs) {
              window.emailjs.init({ publicKey: 'bDtZRRUSav3APye6G' });
            }
            resolve();
          };
          script.onerror = reject;
          document.body.appendChild(script);
        });
        await new Promise(resolve => setTimeout(resolve, 500));
      }

      if (!window.emailjs) {
        throw new Error('EmailJS failed to load');
      }

      console.log('Sending email...');
      
      const result = await window.emailjs.send(
        'service_2n2wp4f',
        'template_6pr2xtl',
        {
          to_email: 'ppsprecyclingllc@gmail.com',
          from_name: formData.name,
          from_email: formData.email,
          company: formData.company,
          phone: formData.phone,
          address: formData.address,
          service_type: formData.serviceType,
          equipment: formData.equipment,
          quantity: formData.quantity,
          preferred_date: formData.date,
          notes: formData.notes,
          reply_to: formData.email
        }
      );

      console.log('Email sent successfully:', result);
      router.push('/thank-you');
    } catch (error: any) {
      console.error('Email failed:', error);
      alert('Failed to send request: ' + (error?.text || error?.message || 'Unknown error') + '. Please call 916-381-8304 directly.');
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
          <input type="text" name="name" required value={formData.name} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Company *</label>
          <input type="text" name="company" required value={formData.company} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
          <input type="email" name="email" required value={formData.email} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
          <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Pickup Address *</label>
        <input type="text" name="address" required value={formData.address} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Service Type *</label>
        <select name="serviceType" value={formData.serviceType} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
          <option value="E-Waste Recycling">E-Waste Recycling</option>
          <option value="ITAD Services">ITAD Services</option>
          <option value="Data Destruction">Data Destruction</option>
          <option value="Business Cleanout">Business Cleanout</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Equipment Type</label>
          <input type="text" name="equipment" placeholder="e.g., Laptops, Servers" value={formData.equipment} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Estimated Quantity</label>
          <input type="text" name="quantity" placeholder="e.g., 25 laptops" value={formData.quantity} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Pickup Date</label>
        <input type="date" name="date" value={formData.date} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Additional Notes</label>
        <textarea name="notes" rows={4} placeholder="Any special requirements..." value={formData.notes} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
      </div>

      <button type="submit" disabled={isSubmitting} className="w-full bg-blue-600 text-white py-3 px-6 rounded-md font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors">
        {isSubmitting ? 'Sending...' : 'Schedule Pickup'}
      </button>

      <p className="text-sm text-gray-500 text-center">
        Or call us directly at <a href="tel:916-381-8304" className="text-blue-600 hover:underline">916-381-8304</a>
      </p>
    </form>
  );
}

function FormSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
      </div>
      <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
      <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
      <div className="h-32 bg-gray-200 rounded animate-pulse"></div>
      <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
    </div>
  );
}

export default function SchedulePage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center">Schedule a Pickup</h1>
          <p className="text-gray-600 text-center mb-8">Fill out the form below and we will contact you within 2 hours</p>
          
          <Suspense fallback={<FormSkeleton />}>
            <ScheduleForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
