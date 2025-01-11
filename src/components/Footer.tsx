import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">SecureVision</h3>
            <p className="text-gray-400">
              Leading provider of intelligent surveillance solutions for homes and businesses.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Products</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white">Home Cameras</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Doorbells</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Security Systems</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Accessories</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Solutions</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white">Enterprise Security</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Access Control</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Video Analytics</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Cloud Storage</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-2">
              <li className="text-gray-400">1234 Security Ave</li>
              <li className="text-gray-400">Suite 567</li>
              <li className="text-gray-400">New York, NY 10001</li>
              <li className="text-gray-400">contact@securevision.com</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 SecureVision. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Facebook className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
              <Twitter className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
              <Instagram className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
              <Linkedin className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;