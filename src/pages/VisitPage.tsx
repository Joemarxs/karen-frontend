import React from 'react';
import { MapPin, Phone, Calendar, Mail, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
export function VisitPage() {
  return <div className="bg-cream-50">
      <div className="relative h-[400px] bg-[url('https://plus.unsplash.com/premium_photo-1661834559466-63eea5f1d858?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDV8fHxlbnwwfHx8fHw%3D')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center">
            Visit Our Farm
          </h1>
        </div>
      </div>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-8 mb-12">
            <h2 className="text-2xl font-bold text-green-800 mb-6">
              Plan Your Visit
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <div className="flex items-start mb-6">
                  <Clock size={24} className="text-green-600 mr-3 mt-1" />
                  <div>
                    <h3 className="font-semibold text-brown-800 mb-2">Hours</h3>
                    <p className="text-brown-600">
                      Farm Tours: Friday - Sunday, 9:00 AM - 4:00 PM
                    </p>
                    <p className="text-brown-600">
                      Farm Store: Daily, 8:00 AM - 6:00 PM
                    </p>
                  </div>
                </div>
                <div className="flex items-start mb-6">
                  <MapPin size={24} className="text-green-600 mr-3 mt-1" />
                  <div>
                    <h3 className="font-semibold text-brown-800 mb-2">
                      Location
                    </h3>
                    <p className="text-brown-600">123 Countryside Road</p>
                    <p className="text-brown-600">Farmington, CA 95230</p>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex items-start mb-6">
                  <Phone size={24} className="text-green-600 mr-3 mt-1" />
                  <div>
                    <h3 className="font-semibold text-brown-800 mb-2">Phone</h3>
                    <p className="text-brown-600">(555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Mail size={24} className="text-green-600 mr-3 mt-1" />
                  <div>
                    <h3 className="font-semibold text-brown-800 mb-2">Email</h3>
                    <p className="text-brown-600">
                      info@karennaturalorganics.com
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-blue-50 rounded-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-green-800 mb-6">
              Tour Information
            </h2>
            <div className="space-y-4 text-brown-700">
              <p>
                Experience the beauty and sustainability of our farm firsthand
                with a guided tour. You'll see:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Free-range chicken pastures</li>
                <li>Organic feed production facility</li>
                <li>Egg collection and processing areas</li>
                <li>Sustainable farming practices in action</li>
              </ul>
              <p className="mt-6">
                Tours are approximately 90 minutes long and include a visit to
                our farm store where you can purchase fresh products directly
                from the farm.
              </p>
            </div>
          </div>
          <div className="text-center">
            <Link to="/booking" className="bg-green-700 text-white px-6 py-3 rounded-md hover:bg-green-800 transition inline-block text-lg font-medium">
              Book a Tour
            </Link>
          </div>
        </div>
      </div>
    </div>;
}