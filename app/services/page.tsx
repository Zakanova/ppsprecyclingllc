import Link from 'next/link';
import { 
  Recycle, 
  Truck, 
  Shield, 
  Server, 
  HardDrive, 
  Cable, 
  Cpu,
  ArrowRight,
  Phone,
  CheckCircle
} from 'lucide-react';

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2">
              <Recycle className="w-8 h-8 text-green-600" />
              <span className="text-xl font-bold text-gray-900">PPSP Recycling</span>
            </div>
            <div className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-600 hover:text-green-600 font-medium">Home</Link>
              <Link href="/services" className="text-green-600 font-medium">Services</Link>
              <Link href="/schedule" className="text-gray-600 hover:text-green-600 font-medium">Schedule Pickup</Link>
              <Link href="mailto:info@ppsprecyclingllc.com" className="text-gray-600 hover:text-green-600 font-medium">Contact</Link>
            </div>
            <Link href="/schedule" className="bg-green-600 text-white px-4 py-2 rounded-md font-medium hover:bg-green-700 transition-colors">
              Get Quote
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-green-800 via-green-700 to-green-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Services</h1>
          <p className="text-xl text-green-100 max-w-2xl mx-auto">
            Professional e-waste recycling and ITAD services for businesses of all sizes
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Service 1: E-Waste Recycling */}
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                <Recycle className="w-7 h-7 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">E-Waste Recycling</h3>
              <p className="text-gray-600 mb-4">
                Comprehensive electronics recycling for computers, laptops, servers, and all IT equipment.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" />Computers & Laptops</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" />Servers & Networking</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" />Printers & Peripherals</li>
              </ul>
            </div>

            {/* Service 2: Data Destruction */}
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <Shield className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Secure Data Destruction</h3>
              <p className="text-gray-600 mb-4">
                Certified hard drive destruction with certificates of destruction for compliance.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" />Hard Drive Shredding</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" />SSD Destruction</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" />Certificate Provided</li>
              </ul>
            </div>

            {/* Service 3: ITAD Services */}
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                <Server className="w-7 h-7 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">ITAD Services</h3>
              <p className="text-gray-600 mb-4">
                IT Asset Disposition for enterprise equipment decommissioning and recovery.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" />Server Decommissioning</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" />Data Center Cleanouts</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" />Asset Recovery</li>
              </ul>
            </div>

            {/* Service 4: Free Pickup */}
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-orange-100 rounded-lg flex items-center justify-center mb-6">
                <Truck className="w-7 h-7 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Free Business Pickup</h3>
              <p className="text-gray-600 mb-4">
                We come to your location. Free pickup for businesses with qualifying quantities.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" />Same-Day Available</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" />Professional Handling</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" />Elk Grove & Sacramento</li>
              </ul>
            </div>

            {/* Service 5: Buyback Program */}
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-yellow-100 rounded-lg flex items-center justify-center mb-6">
                <Cpu className="w-7 h-7 text-yellow-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Equipment Buyback</h3>
              <p className="text-gray-600 mb-4">
                Get paid for your used electronics. We purchase working equipment from businesses.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" />Fair Market Value</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" />Quick Evaluation</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" />Immediate Payment</li>
              </ul>
            </div>

            {/* Service 6: Cable Recycling */}
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-red-100 rounded-lg flex items-center justify-center mb-6">
                <Cable className="w-7 h-7 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Cable & Wire Recovery</h3>
              <p className="text-gray-600 mb-4">
                Specialized recycling for copper and aluminum cables and wires.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" />Copper Wire</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" />Ethernet Cables</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" />Power Cables</li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-700 to-green-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-green-100 mb-8">
            Schedule a free pickup or get a quote for your equipment
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/schedule" className="inline-flex items-center justify-center gap-2 bg-white text-green-700 px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition-colors">
              Schedule Free Pickup
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a href="tel:916-381-8304" className="inline-flex items-center justify-center gap-2 border-2 border-white text-white px-8 py-4 rounded-lg font-bold hover:bg-white/10 transition-colors">
              <Phone className="w-5 h-5" />
              Call 916-381-8304
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
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