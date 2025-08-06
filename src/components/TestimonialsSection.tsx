import React from 'react';
import { Star } from 'lucide-react';

export function TestimonialsSection() {
  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      text: "The eggs from Karen Natural Organics have the most vibrant yolks I've ever seen. My family can taste the difference in everything I bake!",
      rating: 4,
    },
    {
      id: 2,
      name: 'Michael Thompson',
      text: "I've been buying their chicken for over a year now. The quality and flavor are unmatched, and I love knowing exactly where my food comes from.",
      rating: 2,
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      text: 'Visiting the farm was an amazing experience for my kids. The staff was so friendly and we loved seeing how well the chickens are treated.',
      rating: 5,
    },
    {
      id: 4,
      name: 'Garcia Rodriguez',
      text: 'Visiting the farm was an amazing experience for my kids. The staff was so friendly and we loved seeing how well the chickens are treated.',
      rating: 5,
    },
  ];

  return (
    <section className="py-16 bg-[#f5f9f4]">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-[#2e5d41] text-center mb-4">
          What Our Customers Say
        </h2>
        <p className="text-lg text-[#4f372e] text-center max-w-2xl mx-auto mb-12">
          Don't just take our word for it — hear from families who have made
          Karen Natural Organics a part of their healthy lifestyle.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white p-6 rounded-lg shadow-lg/10 border border-[#d4e3d2]"
            >
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={20} className="text-[#facc15] fill-[#facc15]" />
                ))}
              </div>
              <p className="text-[#4f372e] italic mb-4">"{testimonial.text}"</p>
              <p className="text-[#2e5d41] font-medium">{testimonial.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
