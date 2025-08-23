import React from 'react';
import { Users, Target, Award, Heart, Building, MapPin, Phone, Mail } from 'lucide-react';

const About: React.FC = () => {
  const stats = [
    { number: '10,000+', label: 'Happy Students' },
    { number: '500+', label: 'Partner Universities' },
    { number: '25+', label: 'Cities Covered' },
    { number: '98%', label: 'Satisfaction Rate' }
  ];

  const values = [
    {
      icon: Target,
      title: 'Student-Centered',
      description: 'Everything we do is designed with students in mind, from our user-friendly platform to our responsive customer service.'
    },
    {
      icon: Heart,
      title: 'Community Building',
      description: 'We believe in creating more than just housing - we foster communities where students can thrive and build lasting friendships.'
    },
    {
      icon: Award,
      title: 'Quality Assurance',
      description: 'We maintain high standards for all our accommodations, ensuring every room meets our strict quality and safety criteria.'
    },
    {
      icon: Building,
      title: 'Innovation',
      description: 'We continuously improve our services through technology and feedback, making the housing experience better for everyone.'
    }
  ];

  const team = [
    {
      name: 'Sarah Johnson',
      role: 'CEO & Founder',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
      description: 'Former university housing director with 15 years of experience in student accommodation.'
    },
    {
      name: 'Michael Chen',
      role: 'Chief Technology Officer',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
      description: 'Tech entrepreneur passionate about using technology to solve real-world student problems.'
    },
    {
      name: 'Aisha Okafor',
      role: 'Head of Student Relations',
      image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg',
      description: 'Student affairs specialist dedicated to creating supportive living environments for students.'
    },
    {
      name: 'David Williams',
      role: 'Operations Director',
      image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg',
      description: 'Operations expert ensuring smooth day-to-day management of all our housing properties.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About HostelHub
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Transforming student housing experiences through innovative technology, quality accommodations, and exceptional service since 2020.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                To revolutionize student housing by providing a seamless, technology-driven platform that connects students with safe, affordable, and comfortable accommodations while fostering vibrant communities that support academic success and personal growth.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <Target className="h-6 w-6 text-blue-600 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Accessibility</h3>
                    <p className="text-gray-600">Making quality student housing accessible to all students regardless of background.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Heart className="h-6 w-6 text-blue-600 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Community</h3>
                    <p className="text-gray-600">Building supportive communities where students can thrive academically and socially.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Award className="h-6 w-6 text-blue-600 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Excellence</h3>
                    <p className="text-gray-600">Maintaining the highest standards in service delivery and accommodation quality.</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <img
                src="https://images.pexels.com/photos/1595391/pexels-photo-1595391.jpeg"
                alt="Students studying together"
                className="w-full h-96 object-cover rounded-xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Our Impact in Numbers
            </h2>
            <p className="text-lg text-blue-100">
              See how we're making a difference in student housing across Nigeria
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2">
                  {stat.number}
                </div>
                <div className="text-blue-100">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg"
                alt="Our story"
                className="w-full h-96 object-cover rounded-xl shadow-lg"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  HostelHub was born out of a simple observation: finding quality student accommodation in Nigeria was unnecessarily difficult and time-consuming. As former students ourselves, we experienced firsthand the challenges of searching for safe, affordable, and convenient housing.
                </p>
                <p>
                  Founded in 2020 by a team of education and technology enthusiasts, we set out to create a platform that would simplify this process. We started with just 50 rooms in Lagos and have since expanded to over 10,000 rooms across 25 cities in Nigeria.
                </p>
                <p>
                  Today, HostelHub is more than just a booking platform. We're a community of students, property owners, and education partners working together to create better living experiences that support academic success and personal growth.
                </p>
                <p>
                  Our journey continues as we expand our reach and innovate new ways to serve the student community across Africa and beyond.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-lg text-gray-600">
              The principles that guide everything we do
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="text-center p-6 bg-gray-50 rounded-xl hover:shadow-lg transition-shadow duration-300">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                    <Icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-lg text-gray-600">
              The passionate individuals behind HostelHub
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {member.name}
                  </h3>
                  <p className="text-blue-600 font-medium mb-3">
                    {member.role}
                  </p>
                  <p className="text-gray-600 text-sm">
                    {member.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Users className="h-16 w-16 mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-4">
            Join Our Community
          </h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            Whether you're a student looking for accommodation, a property owner wanting to list your rooms, or a university seeking housing partnerships, we'd love to hear from you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <a
              href="/contact"
              className="px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
            >
              Get in Touch
            </a>
            <a
              href="/auth"
              className="px-8 py-4 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors duration-200"
            >
              Join as Student
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="flex items-center justify-center space-x-2">
              <MapPin className="h-5 w-5" />
              <span>123 University Road, Lagos</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <Phone className="h-5 w-5" />
              <span>+234 803 123 4567</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <Mail className="h-5 w-5" />
              <span>info@hostelhub.com</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;