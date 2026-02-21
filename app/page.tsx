"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Recycle, Shield, ShoppingCart, User, Truck, HardDrive, 
  CheckCircle, Clock, MapPin, Phone, Mail, Menu, X, Package,
  ArrowRight, LogOut
} from 'lucide-react'

export default function Home() {
  const [currentView, setCurrentView] = useState<'welcome' | 'buy' | 'itad' | 'portal'>('welcome')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div 
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => setCurrentView('welcome')}
            >
              <Recycle className="h-8 w-8 text-green-600" />
              <span className="text-2xl font-bold text-gray-900">
                PPSP<span className="text-green-600">Recycling</span>LLC
              </span>
            </div>
            
            <div className="hidden md:flex items-center space-x-4">
              <button 
                onClick={() => setCurrentView('buy')} 
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${currentView === 'buy' ? 'bg-green-100 text-green-700' : 'text-gray-600 hover:text-green-600'}`}
              >
                <ShoppingCart className="h-5 w-5" />
                <span>Buy/Sell</span>
              </button>
              <button 
                onClick={() => setCurrentView('itad')} 
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${currentView === 'itad' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-blue-600'}`}
              >
                <Shield className="h-5 w-5" />
                <span>ITAD Services</span>
              </button>
              <button 
                onClick={() => setCurrentView('portal')} 
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${currentView === 'portal' ? 'bg-orange-100 text-orange-700' : 'text-gray-600 hover:text-orange-600'}`}
              >
                <User className="h-5 w-5" />
                <span>Track Order</span>
              </button>
            </div>

            <button 
              className="md:hidden p-2" 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-4 py-4 space-y-2">
              <button 
                onClick={() => { setCurrentView('welcome'); setIsMobileMenuOpen(false); }} 
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-100"
              >
                <Recycle className="h-5 w-5 text-green-600" />
                <span>Home</span>
              </button>
              <button 
                onClick={() => { setCurrentView('buy'); setIsMobileMenuOpen(false); }} 
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-100"
              >
                <ShoppingCart className="h-5 w-5 text-green-600" />
                <span>Buy/Sell Electronics</span>
              </button>
              <button 
                onClick={() => { setCurrentView('itad'); setIsMobileMenuOpen(false); }} 
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-100"
              >
                <Shield className="h-5 w-5 text-blue-600" />
                <span>ITAD Services</span>
              </button>
              <button 
                onClick={() => { setCurrentView('portal'); setIsMobileMenuOpen(false); }} 
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-100"
              >
                <User className="h-5 w-5 text-orange-600" />
                <span>Track Order</span>
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="pt-20">
        {currentView === 'welcome' && <WelcomeSection setView={setCurrentView} />}
        {currentView === 'buy' && <BuySellSection />}
        {currentView === 'itad' && <ITADSection />}
        {currentView === 'portal' && <ClientPortalSection />}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}

// WELCOME/LANDING SECTION
function WelcomeSection({ setView }: { setView: (view: 'welcome' | 'buy' | 'itad' | 'portal') => void }) {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-green-600 via-green-700 to-green-800 text-white py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Secure IT Asset Disposition & E-Waste Recycling
            </h1>
            <p className="text-xl md:text-2xl mb-4 max-w-3xl mx-auto">
              Serving Elk Grove & Sacramento Businesses
            </p>
            <p className="text-lg mb-8 text-green-100">
              Free pickup. Certified data destruction. Revenue sharing on your old equipment.
            </p>
            
            {/* Three Main CTA Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
              <button 
                onClick={() => setView('itad')}
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-8 rounded-lg flex items-center justify-center space-x-2 transition-all"
              >
                <Shield className="h-5 w-5" />
                <span>ITAD & Data Destruction</span>
              </button>
              <button 
                onClick={() => setView('buy')}
                className="bg-white text-green-700 hover:bg-gray-100 font-bold py-4 px-8 rounded-lg flex items-center justify-center space-x-2 transition-all"
              >
                <ShoppingCart className="h-5 w-5" />
                <span>Buy/Sell Equipment</span>
              </button>
            </div>

            {/* Schedule Pickup Buttons - SEPARATE as requested */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 max-w-2xl mx-auto">
              <p className="text-sm text-green-100 mb-4">Ready to schedule a pickup?</p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a 
                  href="/schedule?type=ewaste"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center space-x-2 transition-all"
                >
                  <Truck className="h-5 w-5" />
                  <span>Schedule E-Waste Pickup</span>
                </a>
                <a 
                  href="/schedule?type=itad"
                  className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center space-x-2 transition-all"
                >
                  <HardDrive className="h-5 w-5" />
                  <span>Schedule ITAD Pickup</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-xl p-8 text-center hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setView('itad')}>
              <Shield className="h-16 w-16 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-4">Data Destruction</h3>
              <p className="text-gray-600 mb-4">NIST 800-88 certified wiping and physical destruction with certificates</p>
              <span className="text-blue-600 font-medium flex items-center justify-center">
                Learn more <ArrowRight className="h-4 w-4 ml-1" />
              </span>
            </div>
            <div className="bg-gray-50 rounded-xl p-8 text-center hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setView('buy')}>
              <Recycle className="h-16 w-16 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-4">Buyback & Resale</h3>
              <p className="text-gray-600 mb-4">Get paid for your old IT equipment. We handle resale and revenue sharing.</p>
              <span className="text-green-600 font-medium flex items-center justify-center">
                Learn more <ArrowRight className="h-4 w-4 ml-1" />
              </span>
            </div>
            <div className="bg-gray-50 rounded-xl p-8 text-center hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setView('portal')}>
              <User className="h-16 w-16 text-orange-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-4">Client Portal</h3>
              <p className="text-gray-600 mb-4">Track your orders in real-time and download certificates</p>
              <span className="text-orange-600 font-medium flex items-center justify-center">
                Track Order <ArrowRight className="h-4 w-4 ml-1" />
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-12 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex flex-wrap justify-center gap-8 text-gray-600">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-6 w-6 text-green-600" />
              <span>NIST 800-88 Certified</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-6 w-6 text-green-600" />
              <span>500+ Sacramento Businesses Served</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-6 w-6 text-green-600" />
              <span>Certificate of Destruction Provided</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

// BUY/SELL SECTION
function BuySellSection() {
  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-br from-green-600 to-green-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Buy & Sell Quality Electronics</h1>
          <p className="text-xl mb-8">Certified refurbished equipment. Trade-in for cash or upgrade affordably.</p>
          <div className="flex justify-center gap-4">
            <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-8 rounded-lg">
              Browse Inventory
            </button>
            <button className="bg-white text-green-700 hover:bg-gray-100 font-bold py-4 px-8 rounded-lg">
              Sell Equipment
            </button>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { name: 'Dell Latitude 5520', price: 450, specs: 'i5, 16GB RAM, 256GB SSD' },
              { name: 'HP EliteDesk 800 G6', price: 380, specs: 'i7, 32GB RAM, 512GB SSD' },
              { name: 'iPhone 12 Pro', price: 520, specs: '256GB, Pacific Blue' },
              { name: 'Dell PowerEdge R740', price: 2200, specs: '2x Xeon Gold, 128GB RAM' }
            ].map((product, i) => (
              <div key={i} className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow">
                <div className="bg-gray-200 h-48 rounded-lg mb-4 flex items-center justify-center">
                  <Package className="h-16 w-16 text-gray-400" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{product.specs}</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-green-600">${product.price}</span>
                  <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

// ITAD SECTION
function ITADSection() {
  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-br from-blue-900 to-gray-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="inline-flex items-center space-x-2 bg-blue-800 px-4 py-2 rounded-full mb-6">
            <Shield className="h-5 w-5" />
            <span>NIST 800-88 Certified</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Secure IT Asset Disposition</h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Enterprise-grade data destruction and ITAD services for Sacramento businesses.
          </p>
          
          {/* Separate Schedule Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a 
              href="/schedule?type=ewaste"
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-8 rounded-lg inline-flex items-center justify-center space-x-2"
            >
              <Truck className="h-5 w-5" />
              <span>Schedule E-Waste Pickup</span>
            </a>
            <a 
              href="/schedule?type=itad"
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-lg inline-flex items-center justify-center space-x-2"
            >
              <HardDrive className="h-5 w-5" />
              <span>Schedule ITAD Pickup</span>
            </a>
            <a 
              href="mailto:info@ppsprecycling.com?subject=Certificate Download Request"
              className="bg-white text-blue-900 hover:bg-gray-100 font-bold py-4 px-8 rounded-lg inline-flex items-center justify-center space-x-2"
            >
              <CheckCircle className="h-5 w-5" />
              <span>Download Certifications</span>
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our ITAD Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Data Destruction', icon: Shield, desc: 'NIST 800-88 compliant wiping and physical destruction' },
              { title: 'Chain of Custody', icon: Truck, desc: 'Secure transport with full documentation' },
              { title: 'Compliance Reporting', icon: CheckCircle, desc: 'Audit trails for HIPAA, SOX, PCI-DSS' }
            ].map((service, i) => (
              <div key={i} className="bg-gray-50 rounded-xl p-8 text-center hover:shadow-lg transition-shadow">
                <service.icon className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-4">{service.title}</h3>
                <p className="text-gray-600">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

// CLIENT PORTAL SECTION
function ClientPortalSection() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold">Track Order</h2>
            <p className="text-gray-600">Sign in to track your orders</p>
          </div>
          <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setIsLoggedIn(true); }}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input type="email" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500" placeholder="you@company.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input type="password" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500" placeholder="••••••••" />
            </div>
            <button type="submit" className="w-full bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700">
              Sign In
            </button>
          </form>
          <div className="mt-6 flex justify-center space-x-4 text-gray-400">
            <Shield className="h-6 w-6" />
            <CheckCircle className="h-6 w-6" />
            <Clock className="h-6 w-6" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <span className="text-xl font-bold">PPS<span className="text-green-600">Portal</span></span>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Demo User - Acme Corp</span>
              <button onClick={() => setIsLoggedIn(false)} className="text-gray-500 hover:text-gray-700">
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl font-bold mb-6">Your Orders</h2>
        <div className="space-y-4">
          {[
            { id: 'ORD-2024-001', type: 'Data Destruction', status: 'completed', items: 45, value: 2800 },
            { id: 'ORD-2024-002', type: 'ITAD & Resale', status: 'in_progress', items: 120, value: 15000 }
          ].map((order) => (
            <div key={order.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-lg ${order.status === 'completed' ? 'bg-green-100' : 'bg-blue-100'}`}>
                    <Package className={`h-6 w-6 ${order.status === 'completed' ? 'text-green-600' : 'text-blue-600'}`} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{order.id}</h3>
                    <p className="text-gray-600">{order.type}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-6">
                  <div className="text-right">
                    <p className="text-gray-600">{order.items} items</p>
                    <p className="text-lg font-bold text-green-600">${order.value.toLocaleString()}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${order.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                    {order.status === 'completed' ? 'Completed' : 'In Progress'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

// FOOTER
function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Recycle className="h-8 w-8 text-green-400" />
              <span className="text-2xl font-bold">PPS<span className="text-green-400">Recycling</span>LLC</span>
            </div>
            <p className="text-gray-400">Sacramento&apos;s premier electronics recycling and IT asset disposition company.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Electronics Buyback</li>
              <li>Data Destruction</li>
              <li>ITAD Services</li>
              <li>E-Waste Recycling</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-center space-x-2"><MapPin className="h-4 w-4" /><span>9095 Elk Grove Blvd Suite B, Elk Grove, CA 95624</span></li>
              <li className="flex items-center space-x-2"><Phone className="h-4 w-4" /><span>916-381-8304</span></li>
              <li className="flex items-center space-x-2"><Mail className="h-4 w-4" /><span>info@ppsprecycling.com</span></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Hours</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Mon - Sat: 9AM - 5PM</li>
              <li>Sunday: Closed</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 PPS Recycling LLC. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
