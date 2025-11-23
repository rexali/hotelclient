import React from 'react';
import { Shield, Users, HeadphonesIcon, Home, Wrench, CreditCard, MapPin, Star } from 'lucide-react';

const Services: React.FC = () => {
  const services = [
    {
      icon: Shield,
      title: 'Safety & Security',
      description: 'All our accommodations are equipped with modern security systems including CCTV surveillance, secure access controls, and 24/7 security personnel to ensure your safety.',
      image: 'https://images.pexels.com/photos/207574/pexels-photo-207574.jpeg'
    },
    {
      icon: Users,
      title: 'Community Building',
      description: 'We foster a vibrant community through organized events, study groups, and social activities that help you make lifelong friendships and connections.',
      image: 'https://images.pexels.com/photos/1595391/pexels-photo-1595391.jpeg'
    },
    {
      icon: HeadphonesIcon,
      title: '24/7 Customer Support',
      description: 'Our dedicated support team is available round the clock to assist you with any queries, maintenance requests, or emergencies that may arise.',
      image: 'https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg'
    },
    {
      icon: Home,
      title: 'Room Matching',
      description: 'Our intelligent room matching system helps you find accommodation that perfectly fits your preferences, budget, and lifestyle requirements.',
      image: 'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg'
    },
    {
      icon: Wrench,
      title: 'Maintenance Services',
      description: 'Professional maintenance services ensure all facilities are in perfect condition. Report issues through our app and get them resolved quickly.',
      image: 'https://images.pexels.com/photos/1249611/pexels-photo-1249611.jpeg'
    },
    {
      icon: CreditCard,
      title: 'Flexible Payment Options',
      description: 'Multiple payment options including installment plans, online payments, bank transfers, and mobile money to make payments convenient for you.',
      image: 'https://images.pexels.com/photos/4386431/pexels-photo-4386431.jpeg'
    }
  ];

  const additionalServices = [
    {
      title: 'Roommate Matching',
      description: 'Find compatible roommates based on lifestyle preferences, study habits, and personal interests.'
    },
    {
      title: 'Virtual Tours',
      description: 'Take 360° virtual tours of rooms before visiting to save time and make informed decisions.'
    },
    {
      title: 'Document Assistance',
      description: 'Help with lease agreements, documentation, and legal requirements for you.'
    },
    {
      title: 'Transportation Services',
      description: 'Information about nearby transportation options and shuttle services to universities.'
    },
    {
      title: 'Meal Plans',
      description: 'Optional meal plans and information about nearby dining options and food delivery services.'
    },
    {
      title: 'Study Facilities',
      description: 'Access to quiet study areas, group study rooms, and high-speed internet throughout the property.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Our Services
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Comprehensive housing solutions designed to support your academic journey and enhance your living experience.
            </p>
          </div>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What We Offer
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From finding your perfect room to ongoing support throughout your stay, we provide comprehensive services to make your housing experience exceptional.
            </p>
          </div>

          <div className="space-y-16">
            {services.map((service, index) => {
              const Icon = service.icon;
              const isEven = index % 2 === 0;
              
              return (
                <div key={index} className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12`}>
                  <div className="flex-1">
                    <div className="mb-6">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                        <Icon className="h-8 w-8 text-blue-600" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">
                        {service.title}
                      </h3>
                      <p className="text-lg text-gray-600 leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex-1">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-64 lg:h-80 object-cover rounded-xl shadow-lg"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Additional Services
            </h2>
            <p className="text-lg text-gray-600">
              Extra features and services to enhance your living experience
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {additionalServices.map((service, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center mb-4">
                  <Star className="h-6 w-6 text-blue-600 mr-3" />
                  <h3 className="text-lg font-semibold text-gray-900">
                    {service.title}
                  </h3>
                </div>
                <p className="text-gray-600">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Our Service Process
            </h2>
            <p className="text-lg text-blue-100 max-w-2xl mx-auto">
              A streamlined process designed to get you settled quickly and comfortably
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: '01',
                title: 'Initial Consultation',
                description: 'We understand your needs, budget, and preferences through a detailed consultation.'
              },
              {
                step: '02',
                title: 'Room Selection',
                description: 'Based on your requirements, we present the best matching room options available.'
              },
              {
                step: '03',
                title: 'Documentation',
                description: 'We handle all the paperwork and legal documentation to ensure a smooth process.'
              },
              {
                step: '04',
                title: 'Move-in Support',
                description: 'Complete support during move-in and ongoing assistance throughout your stay.'
              }
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold">{step.step}</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-blue-100">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <MapPin className="h-16 w-16 text-blue-600 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Our team is ready to help you find the perfect accommodation. Contact us today to begin your housing journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
              >
                Contact Us
              </a>
              <a
                href="/rooms"
                className="px-8 py-4 border-2 border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-200"
              >
                Browse Rooms
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;