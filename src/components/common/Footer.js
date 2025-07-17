import React from 'react';
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { COMPANY_INFO } from '../../utils/constants';

const Footer = () => {
  return (
    <footer className="bg-black border-t border-gray-800 mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-orange-500 w-8 h-8 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">M</span>
              </div>
              <h3 className="text-xl font-bold text-white">M-Solar</h3>
            </div>
            <p className="text-gray-400">
              Leading provider of solar energy solutions in Kenya. 
              Powering homes and businesses with clean, renewable energy.
            </p>
            <div className="flex space-x-4">
              <button className="text-gray-400 hover:text-orange-500 transition-colors">
                <Facebook size={20} />
              </button>
              <button className="text-gray-400 hover:text-orange-500 transition-colors">
                <Twitter size={20} />
              </button>
              <button className="text-gray-400 hover:text-orange-500 transition-colors">
                <Instagram size={20} />
              </button>
              <button className="text-gray-400 hover:text-orange-500 transition-colors">
                <Linkedin size={20} />
              </button>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Services</h4>
            <ul className="space-y-2">
              {[
                'Solar Panel Installation',
                'Solar System Maintenance',
                'Energy Consultation',
                'Financing Options',
                'System Monitoring',
                'Warranty Support'
              ].map((service) => (
                <li key={service}>
                  <button className="text-gray-400 hover:text-orange-500 transition-colors">
                    {service}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Products</h4>
            <ul className="space-y-2">
              {[
                'Solar Panels',
                'Inverters',
                'Batteries',
                'Complete Solar Kits',
                'Solar Accessories',
                'Monitoring Systems'
              ].map((product) => (
                <li key={product}>
                  <button className="text-gray-400 hover:text-orange-500 transition-colors">
                    {product}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-400">
                <Phone size={16} />
                <span>{COMPANY_INFO.phone}</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400">
                <Mail size={16} />
                <span>{COMPANY_INFO.email}</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400">
                <MapPin size={16} />
                <span>{COMPANY_INFO.address}</span>
              </div>
            </div>
            
            <div className="mt-6">
              <h5 className="text-white font-medium mb-2">Business Hours</h5>
              <div className="text-sm text-gray-400 space-y-1">
                <p>Monday - Friday: 8:00 AM - 6:00 PM</p>
                <p>Saturday: 9:00 AM - 4:00 PM</p>
                <p>Sunday: Closed</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} M-Solar. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <button className="text-gray-400 hover:text-orange-500 text-sm transition-colors">
                Privacy Policy
              </button>
              <button className="text-gray-400 hover:text-orange-500 text-sm transition-colors">
                Terms of Service
              </button>
              <button className="text-gray-400 hover:text-orange-500 text-sm transition-colors">
                Cookie Policy
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;