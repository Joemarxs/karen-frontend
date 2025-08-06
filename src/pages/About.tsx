import React from 'react';
import { Leaf, Heart, Users } from 'lucide-react';
export function About() {
  return <div className="bg-cream-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-green-800 mb-6 text-center">
            Our Story
          </h1>
          <div className="bg-white rounded-lg shadow-md p-8 mb-12">
            <p className="text-brown-700 text-lg mb-6">
              Welcome to Karen Fork Organic Products, a proudly Kenyan-owned poultry farm nestled in the
               rich agricultural lands of Kiambu. We specialize in producing free-range Kienyeji chickens
                and organic eggs that are not only delicious 
              but also raised with the utmost care for animal welfare and environmental sustainability.
            </p>
            <p className="text-brown-700 text-lg">
              At Karen Fork, we believe food should be fresh, natural, and responsibly sourced. That’s 
              why all our chickens are raised the traditional way — roaming freely and feeding on organic 
              maize, vegetables, and greens grown right on our farm. We never use antibiotics, synthetic 
              hormones, or pesticides.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-green-50 p-6 rounded-lg text-center">
              <Leaf size={40} className="text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-green-800 mb-2">
                Sustainable Practices
              </h3>
              <p className="text-brown-600">
                Ethical animal husbandry and organic farming methods ensure our products are healthy for you and the planet.
              </p>
            </div>
            <div className="bg-green-50 p-6 rounded-lg text-center">
              <Heart size={40} className="text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-green-800 mb-2">
                Animal Welfare
              </h3>
              <p className="text-brown-600">
                Our chickens roam freely on organic pastures with plenty of
                space and natural light.
              </p>
            </div>
            <div className="bg-green-50 p-6 rounded-lg text-center">
              <Users size={40} className="text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-green-800 mb-2">
                Clean, hygienic processing methods
              </h3>
              <p className="text-brown-600">
                Clean, hygienic processing methods and local distribution
                support our community and local economy.
              </p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src="https://plus.unsplash.com/premium_photo-1661834559466-63eea5f1d858?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDV8fHxlbnwwfHx8fHw%3D" alt="Our farm at sunrise" className="w-full h-64 object-cover" />
            <div className="p-8">
              <h2 className="text-2xl font-bold text-green-800 mb-4">
                Our Commitment
              </h2>
              <p className="text-brown-700 mb-4">
                At Karen Natural Organics, we believe that healthy food comes
                from healthy animals raised in a healthy environment. That's why
                we:
              </p>
              <ul className="list-disc list-inside text-brown-700 space-y-2">
                <li>Use only organic, non-GMO feed</li>
                <li>Maintain strict quality control standards</li>
                <li>Practice sustainable farming methods</li>
                <li>Ensure humane treatment of all animals</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>;
}