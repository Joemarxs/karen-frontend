import React from 'react';
import { Leaf, Sun, Heart, Shield } from 'lucide-react';
export function FeaturesSection() {
  const features = [{
    id: 1,
    icon: <Leaf size={36} className="text-green-700" />,
    title: '100% Organic',
    description: 'Our chickens are raised on certified organic feed without any antibiotics or hormones.'
  }, {
    id: 2,
    icon: <Sun size={36} className="text-amber-500" />,
    title: 'Pasture Raised',
    description: 'Our birds enjoy daily access to fresh pasture, sunshine, and the freedom to forage naturally.'
  }, {
    id: 3,
    icon: <Heart size={36} className="text-red-500" />,
    title: 'Humane Treatment',
    description: 'We prioritize the welfare of our chickens with spacious coops and stress-free environments.'
  }, {
    id: 4,
    icon: <Shield size={36} className="text-blue-600" />,
    title: 'Quality Assured',
    description: 'Every product meets strict quality standards for freshness, safety, and nutritional value.'
  }];
  return <section id="about" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-green-800 text-center mb-4">
          Why Choose Karen Natural Organics
        </h2>
        <p className="text-lg text-brown-700 text-center max-w-2xl mx-auto mb-12">
          We're committed to sustainable farming practices that produce the
          healthiest, most flavorful chicken products.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map(feature => <div key={feature.id} className="p-6 border border-green-100 rounded-lg bg-cream-50 hover:shadow-md transition">
              <div className="mb-4 flex justify-center">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-green-800 mb-2 text-center">
                {feature.title}
              </h3>
              <p className="text-brown-600 text-center">
                {feature.description}
              </p>
            </div>)}
        </div>
        <div className="mt-16 bg-green-50 p-8 rounded-lg">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-6 md:mb-0 md:pr-8">
              <img src="https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" alt="Chickens roaming freely in green pastures" className="rounded-lg w-full h-64 object-cover" />
            </div>
            <div className="md:w-1/2">
              <h3 className="text-2xl font-bold text-green-800 mb-4">
                Our Commitment to Sustainability
              </h3>
              <p className="text-brown-700 mb-4">
                At Karen Natural Organics, we believe in farming practices that
                respect the land, animals, and environment. Our sustainable
                approach ensures that we can provide the highest quality
                products while preserving our resources for future generations.
              </p>
              <p className="text-brown-700">
                From our solar-powered coops to our water conservation systems,
                every aspect of our farm is designed with sustainability in
                mind.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>;
}