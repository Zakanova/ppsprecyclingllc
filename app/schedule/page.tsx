'use client';

import { useState, Suspense, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Truck, Phone, Mail, MapPin, Recycle, Menu, X, ChevronRight, CheckCircle } from 'lucide-react';

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

  // Fixed input classes with explicit borders for mobile visibility
  const inputClass = "w-full px-4 py-3 border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white text-gray-900 placeholder-gray-400";
  const labelClass = "block text-sm font-medium text-gray-700 mb-2";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className={labelClass}>Full Name *</label>
          <input type="text" name="name" required value={formData.name} onChange={handleChange} className={inputClass} placeholder="John Smith" />
        </div>
        <div>
          <label className={labelClass}>Company *</label>
          <input type="text" name="company" required value={formData.company} onChange={handleChange} className={inputClass} placeholder="ABC Company" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className={labelClass}>Email *</label>
          <input type="email" name="email" required value={formData.email} onChange={handleChange} className={inputClass} placeholder="john@company.com" />
        </div>
        <div>
          <label className={labelClass}>Phone *</label>
          <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} className={inputClass} placeholder="916-000-0000" />
        </div>
      </div>

      <div>
        <label className={labelClass}>Pickup Address *</label>
        <input type="text" name="address" required value={formData.address} onChange={handleChange} className={inputClass} placeholder="123 Main St, Elk Grove, CA" />
      </div>

      <div>
        <label className={labelClass}>Service Type *</label>
        <select name="serviceType" value={formData.serviceType} onChange={handleChange} className={inputClass}>
          <option value="E-Waste Recycling">E-Waste Recycling</option>
          <option value="ITAD Services">ITAD Services</option>
          <option value="Data Destruction">Data Destruction</option>
          <option value="Business Cleanout">Business Cleanout</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className={labelClass}>Equipment Type</label>
          <input type="text" name="equipment" placeholder="e.g., Laptops, Servers" value={formData.equipment} onChange={handleChange} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Estimated Quantity</label>
          <input type="text" name="quantity" placeholder="e.g., 25 laptops" value={formData.quantity} onChange={handleChange} className={inputClass} />
        </div>
      </div>

      <div>
        <label className={labelClass}>Preferred Pickup Date</label>
        <input type="date" name="date" value={formData.date} onChange={handleChange} className={inputClass} />
      </div>

      <div>
        <label className={labelClass}>Additional Notes</label>
        <textarea name="notes" rows={4} placeholder="Any special requirements..." value={formData.notes} onChange={handleChange} className={inputClass} />
      </div>

      <button type="submit" disabled={isSubmitting} className="w-full bg-green-600 text-white py-4 px-6 rounded-md font-bold hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2 text-lg">
        {isSubmitting ? 'Sending...' : 'Submit Pickup Request'}
        {!isSubmitting && <ChevronRight className="w-5 h-5" />}
      </button>

      <p className="text-sm text-gray-500 text-center">
        Or call us directly at <a href="tel:916-381-8304" className="text-green-600 hover:underline font-medium">916-381-8304</a>
      </p>
    </form>
  );
}

function FormSkeleton() {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
      </div>
      <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
      <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
      <div className="h-32 bg-gray-200 rounded animate-pulse"></div>
      <div className="h-14 bg-gray-200 rounded animate-pulse"></div>
    </div>
  );
}

export default function SchedulePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center gap-2">
                <Recycle className="w-8 h-8 text-green-600" />
                <span className="text-xl font-bold text-gray-900">PPSP Recycling</span>
              </Link>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-gray-600 hover:text-green-600 font-medium">Home</Link>
              <Link href="/services" className="text-gray-600 hover:text-green-600 font-medium">Services</Link>
              <Link href="/schedule" className="text-green-600 font-medium">Schedule Pickup</Link>
              <Link href="mailto:info@ppsprecyclingllc.com" className="text-gray-600 hover:text-green-600 font-medium">Contact</Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-gray-600 hover:text-gray-900">
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link href="/" className="block px-3 py-2 text-gray-600 hover:text-green-600 font-medium">Home</Link>
              <Link href="/services" className="block px-3 py-2 text-gray-600 hover:text-green-600 font-medium">Services</Link>
              <Link href="/schedule" className="block px-3 py-2 text-green-600 font-medium">Schedule Pickup</Link>
              <Link href="mailto:info@ppsprecyclingllc.com" className="block px-3 py-2 text-gray-600 hover:text-green-600 font-medium">Contact</Link>
            </div>
          </div>
        )}
      </nav>

      {/* Green Header Section */}
      <div className="bg-gradient-to-r from-green-700 to-green-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-3 rounded-lg">
              <Truck className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Schedule a Pickup</h1>
              <p className="text-green-100 mt-1">Fill out the form and we will contact you within 2 hours</p>
            </div>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Form Header */}
          <div className="bg-gray-50 px-8 py-6 border-b">
            <div className="flex items-center gap-3">
              <div className="bg-green-100 p-2 rounded-full">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Request Information</h2>
                <p className="text-sm text-gray-500">All fields marked with * are required</p>
              </div>
            </div>
          </div>

          {/* Form Content */}
          <div className="p-8">
            <Suspense fallback={<FormSkeleton />}>
              <ScheduleForm />
            </Suspense>
          </div>
        </div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Call Us</h3>
            <p className="text-gray-600 text-sm mb-3">Speak directly with our team</p>
            <a href="tel:916-381-8304" className="text-green-600 font-medium hover:underline">916-381-8304</a>
          </div>

          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Email Us</h3>
            <p className="text-gray-600 text-sm mb-3">Send us an email anytime</p>
            <a href="mailto:info@ppsprecyclingllc.com" className="text-green-600 font-medium hover:underline">info@ppsprecyclingllc.com</a>
          </div>

          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Visit Us</h3>
            <p className="text-gray-600 text-sm mb-3">Elk Grove, CA</p>
            <span className="text-green-600 font-medium">9095 Elk Grove Blvd Suite B</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Recycle className="w-6 h-6 text-green-500" />
              <span className="font-semibold">PPSP Recycling LLC</span>
            </div>
            <p className="text-gray-400 text-sm">© 2026 PPSP Recycling LLC. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
