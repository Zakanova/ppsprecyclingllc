import Link from 'next/link';
import { 
  Recycle, 
  Truck, 
  Shield, 
  Cpu, 
  HardDrive, 
  Cable, 
  Server, 
  CheckCircle,
  ArrowRight,
  Phone,
  Mail,
  MapPin
} from 'lucide-react';

export default function Home() {
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
              <Link href="/" className="text-green-600 font-medium">Home</Link>
              <Link href="/services" className="text-gray-600 hover:text-green-600 font-medium">Services</Link>
              <Link href="/schedule" className="text-gray-600 hover:text-green-600 font-medium">Schedule Pickup</Link>
              <Link href="/contact" className="text-gray-600 hover:text-green-600 font-medium">Contact</Link>
            </div>
            <Link href="/schedule" className="bg-green-600 text-white px-4 py-2 rounded-md font-medium hover:bg-green-700 transition-colors">
              Get Quote
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-green-800 via-green-700 to-green-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                <Shield className="w-5 h-5" />
                <span className="text-sm font-medium">Certified & Compliant</span>
              </div>
              <h1 className="text-5xl font-bold mb-6 leading-tight">
                Professional E-Waste Recycling & ITAD Services
              </h1>
              <p className="text-xl text-green-100 mb-8">
                Secure data destruction, electronics buyback, and sustainable recycling solutions for businesses in Elk Grove and Sacramento area.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/schedule" className="inline-flex items-center justify-center gap-2 bg-white text-green-700 px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition-colors">
                  Schedule Free Pickup
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <a href="tel:916-381-8304" className="inline-flex items-center justify-center gap-2 border-2 border-white text-white px-8 py-4 rounded-lg font-bold hover:bg-white/10 transition-colors">
                  <Phone className="w-5 h-5" />
                  916-381-8304
                </a>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="relative">
                <div className="absolute -inset-4 bg-white/20 rounded-2xl blur-2xl"></div>
                <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/10 rounded-lg p-4 text-center">
                      <div className="text-3xl font-bold">500+</div>
                      <div className="text-sm text-green-100">Business Clients</div>
                    </div>
                    <div className="bg-white/10 rounded-lg p-4 text-center">
                      <div className="text-3xl font-bold">100%</div>
                      <div className="text-sm text-green-100">Data Secure</div>
                    </div>
                    <div className="bg-white/10 rounded-lg p-4 text-center">
                      <div className="text-3xl font-bold">2Hr</div>
                      <div className="text-sm text-green-100">Response Time</div>
                    </div>
                    <div className="bg-white/10 rounded-lg p-4 text-center">
                      <div className="text-3xl font-bold">R2</div>
                      <div className="text-sm text-green-100">Certified</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Process Gallery Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Recycling Process</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Professional e-waste handling from collection to final recycling. 
              Secure, compliant, and environmentally responsible.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Image 1: Hard Drive Destruction */}
            <div className="group relative overflow-hidden rounded-xl shadow-lg bg-white">
              <div className="h-64 overflow-hidden">
                <img 
                  src="/images/hard-drive-crusher.jpg" 
                  alt="Hard drive destruction for data security"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-red-100 p-2 rounded-lg">
                    <HardDrive className="w-6 h-6 text-red-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">Secure Data Destruction</h3>
                </div>
                <p className="text-gray-600 text-sm">
                  Certified hard drive crushing and shredding with destruction certificates for compliance.
                </p>
              </div>
            </div>

            {/* Image 2: E-Waste Sorting */}
            <div className="group relative overflow-hidden rounded-xl shadow-lg bg-white">
              <div className="h-64 overflow-hidden">
                <img 
                  src="/images/ewaste-sorting.jpg" 
                  alt="Professional e-waste sorting facility"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <Recycle className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">Professional Sorting</h3>
                </div>
                <p className="text-gray-600 text-sm">
                  Expert team sorting electronics by material type for maximum recovery and recycling efficiency.
                </p>
              </div>
            </div>

            {/* Image 3: Cable Recycling */}
            <div className="group relative overflow-hidden rounded-xl shadow-lg bg-white">
              <div className="h-64 overflow-hidden">
                <img 
                  src="/images/cable-recycling.jpg" 
                  alt="Cable and wire recycling"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-yellow-100 p-2 rounded-lg">
                    <Cable className="w-6 h-6 text-yellow-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">Cable Recovery</h3>
                </div>
                <p className="text-gray-600 text-sm">
                  Copper and aluminum recovery from cables and wires. Separating valuable metals for reuse.
                </p>
              </div>
            </div>

            {/* Image 4: Motherboard Recycling */}
            <div className="group relative overflow-hidden rounded-xl shadow-lg bg-white">
              <div className="h-64 overflow-hidden">
                <img 
                  src="/images/motherboard-recycling.jpg" 
                  alt="Circuit board and motherboard recycling"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-purple-100 p-2 rounded-lg">
                    <Cpu className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">Precious Metal Recovery</h3>
                </div>
                <p className="text-gray-600 text-sm">
                  Extracting gold, silver, and copper from circuit boards and motherboards using advanced processes.
                </p>
              </div>
            </div>

            {/* Image 5: Data Center Decommissioning */}
            <div className="group relative overflow-hidden rounded-xl shadow-lg bg-white">
              <div className="h-64 overflow-hidden">
                <img 
                  src="/images/data-center-decom.jpg" 
                  alt="Data center decommissioning services"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-indigo-100 p-2 rounded-lg">
                    <Server className="w-6 h-6 text-indigo-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">ITAD & Decommissioning</h3>
                </div>
                <p className="text-gray-600 text-sm">
                  Enterprise server rack removal, data center cleanouts, and IT asset disposition services.
                </p>
              </div>
            </div>

            {/* Image 6: Warehouse & Logistics */}
            <div className="group relative overflow-hidden rounded-xl shadow-lg bg-white">
              <div className="h-64 overflow-hidden">
                <img 
                  src="/images/warehouse-pallets.jpg" 
                  alt="Electronics warehouse and palletized recycling"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <Truck className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">Logistics & Pickup</h3>
                </div>
                <p className="text-gray-600 text-sm">
                  Professional pickup and transportation. Palletizing and secure transport to our facility.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-lg text-gray-600">Comprehensive e-waste solutions for businesses of all sizes</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Truck className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Free Pickup</h3>
              <p className="text-gray-600 text-sm">We come to your location and handle all logistics</p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Data Destruction</h3>
              <p className="text-gray-600 text-sm">Certified destruction with compliance certificates</p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <CheckCircle className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">ITAD Services</h3>
              <p className="text-gray-600 text-sm">Asset recovery and disposition management</p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <Recycle className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Buyback Program</h3>
              <p className="text-gray-600 text-sm">Get paid for your used electronics and equipment</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-700 to-green-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Recycle Your Electronics?</h2>
          <p className="text-xl text-green-100 mb-8">
            Get a free quote within 2 hours. We handle everything from pickup to certified recycling.
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
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Recycle className="w-8 h-8 text-green-500" />
                <span className="text-xl font-bold">PPSP Recycling</span>
              </div>
              <p className="text-gray-400 text-sm">
                Professional e-waste recycling and ITAD services in Elk Grove, CA.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><Link href="/services" className="hover:text-white">E-Waste Recycling</Link></li>
                <li><Link href="/services" className="hover:text-white">Data Destruction</Link></li>
                <li><Link href="/services" className="hover:text-white">ITAD Services</Link></li>
                <li><Link href="/services" className="hover:text-white">Buyback Program</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><Link href="/about" className="hover:text-white">About Us</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
                <li><Link href="/schedule" className="hover:text-white">Schedule Pickup</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  9095 Elk Grove Blvd Suite B
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  916-381-8304
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  info@ppsprecyclingllc.com
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
            © 2026 PPSP Recycling LLC. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
