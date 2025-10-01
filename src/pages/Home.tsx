import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Star, CheckCircle, Users, Shield, HeadphonesIcon, Search, ArrowRight, Home as HomeIcon, Building, MapPin } from 'lucide-react';
import { mockRooms } from '../data/mockData';
import SearchFilters, { SearchFilters as SearchFiltersType } from '../components/common/SearchFilters';
import RoomCard from '../components/rooms/RoomCard';
import { getRoomsAPI } from './api/getRoomsAPI';

const Home:React.FC = () => {

  const [filteredRooms, setFilteredRooms] = useState(mockRooms);
  const moutRef = useRef(true);
  const [data, setData] = useState<any>({});

  
    useEffect(() => {
      if (moutRef.current) {
        (async () => {
          let data = await getRoomsAPI();
          console.log(data);
          setData(data);
        })();
      }
      return () => {
        moutRef.current = false
      }
    })
  
    // let roomsx = useMemo(()=>filterRooms(rooms,filters), [filters]);
  

  const handleSearch = (filters: SearchFiltersType) => {
    let filtered = mockRooms.filter(room => {
      return (
        (!filters.location || room.location.toLowerCase().includes(filters.location.toLowerCase())) &&
        room.price >= filters.minPrice &&
        room.price <= filters.maxPrice &&
        (!filters.roomType || room.type === filters.roomType) &&
        (!filters.bedrooms || room.bedrooms.toString() === filters.bedrooms) &&
        (!filters.bathrooms || room.bathrooms.toString() === filters.bathrooms) &&
        (filters.amenities?.length === 0 || filters.amenities.some(amenity => room.amenities.includes(amenity)))
      );
    });

    setFilteredRooms(filtered);
  };
  

  const roomCategories = [
    {
      name: 'Single Rooms',
      description: 'Perfect for focused studying',
      image: 'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg',
      link: '/rooms?type=single',
      count: mockRooms.filter(r => r.type === 'single').length
    },
    {
      name: 'Double Rooms',
      description: 'Great for shared living',
      image: 'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg',
      link: '/rooms?type=double',
      count: mockRooms.filter(r => r.type === 'double').length
    },
    {
      name: 'Triple Suites',
      description: 'Spacious group accommodation',
      image: 'https://images.pexels.com/photos/1743559/pexels-photo-1743559.jpeg',
      link: '/rooms?type=triple',
      count: mockRooms.filter(r => r.type === 'triple').length
    },
    {
      name: 'Dormitories',
      description: 'Budget-friendly options',
      image: 'https://images.pexels.com/photos/271816/pexels-photo-271816.jpeg',
      link: '/rooms?type=dormitory',
      count: mockRooms.filter(r => r.type === 'dormitory').length
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Computer Science Student',
      content: 'HostelHub made finding accommodation so easy. The platform is user-friendly and the rooms are exactly as described.',
      rating: 5,
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg'
    },
    {
      name: 'Michael Chen',
      role: 'Business Administration',
      content: 'Excellent service and great room options. The booking process was smooth and customer support was very helpful.',
      rating: 5,
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg'
    },
    {
      name: 'Aisha Okafor',
      role: 'Medical Student',
      content: 'I love my room! It\'s exactly what I needed for my studies. The location is perfect and the amenities are great.',
      rating: 5,
      avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg'
    }
  ];

  const faqs = [
    {
      question: 'How do I book a room?',
      answer: 'Simply browse our available rooms, select your preferred room, and follow the booking process. You can make secure payments online.'
    },
    {
      question: 'What is included in the room price?',
      answer: 'Room prices typically include utilities, WiFi, basic furnishing, and access to common areas. Specific amenities are listed for each room.'
    },
    {
      question: 'Can I visit the room before booking?',
      answer: 'Yes, we encourage prospective tenants to visit rooms before booking. Contact the room agent to schedule a viewing.'
    },
    {
      question: 'What if I need to cancel my booking?',
      answer: 'Cancellation policies vary by room and timing. Please refer to our terms of service or contact customer support for specific cases.'
    },
    {
      question: 'Is there customer support available?',
      answer: 'Yes, our customer support team is available 24/7 to assist with any questions or issues you may have.'
    }
  ];

  const howItWorks = [
    {
      step: 1,
      title: 'Search & Filter',
      description: 'Use our advanced search to find rooms that match your preferences and budget.',
      icon: Search
    },
    {
      step: 2,
      title: 'Compare Options',
      description: 'View detailed information, photos, and amenities for each room.',
      icon: Building
    },
    {
      step: 3,
      title: 'Visit & Choose',
      description: 'Schedule visits to your shortlisted rooms and make your final choice.',
      icon: MapPin
    },
    {
      step: 4,
      title: 'Book & Move In',
      description: 'Complete the booking process online and get ready to move into your new home.',
      icon: HomeIcon
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-20">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Find Your Perfect
              <span className="block text-blue-300">Student Home</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Discover comfortable, safe, and affordable accommodation options tailored for students across Nigeria.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/rooms"
                className="px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center"
              >
                Browse Rooms
                <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/auth"
                className="px-8 py-4 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors duration-200"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Find Your Ideal Room
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Use our advanced search filters to find accommodation that perfectly matches your needs and budget.
            </p>
          </div>
          <SearchFilters onSearch={handleSearch} />
        </div>
      </section>

      {/* Room Categories */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Room Categories
            </h2>
            <p className="text-lg text-gray-600">
              Choose from our diverse range of accommodation options
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {roomCategories.map((category) => (
              <Link
                key={category.name}
                to={category.link}
                className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-semibold mb-1">{category.name}</h3>
                    <p className="text-sm text-gray-200">{category.description}</p>
                  </div>
                  <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {category.count} rooms
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Marketing Message */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-6">
              Why Choose HostelHub?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <Shield className="h-12 w-12 text-blue-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Safe & Secure</h3>
                <p className="text-blue-100">
                  All our accommodations are thoroughly vetted for safety and security standards.
                </p>
              </div>
              <div className="text-center">
                <Users className="h-12 w-12 text-blue-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Student Community</h3>
                <p className="text-blue-100">
                  Join a vibrant community of students in environments designed for learning.
                </p>
              </div>
              <div className="text-center">
                <HeadphonesIcon className="h-12 w-12 text-blue-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">24/7 Support</h3>
                <p className="text-blue-100">
                  Our customer support team is always available to help with any concerns.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Rooms */}
      {data?.featuredRooms?.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-12">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Featured Rooms
                </h2>
                <p className="text-lg text-gray-600">
                  Handpicked premium accommodations
                </p>
              </div>
              <Link
                to="/rooms?featured=true"
                className="flex items-center text-blue-600 hover:text-blue-700 font-medium"
              >
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {data?.featuredRooms.slice(0, 3).map((room:any) => (
                <RoomCard key={room.id} room={room} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Popular Rooms */}
      {data?.popularRooms?.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-12">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Popular Choices
                </h2>
                <p className="text-lg text-gray-600">
                  Most loved by our students
                </p>
              </div>
              <Link
                to="/rooms?popular=true"
                className="flex items-center text-blue-600 hover:text-blue-700 font-medium"
              >
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {data.popularRooms.slice(0, 3).map((room:any) => (
                <RoomCard key={room.id} room={room} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* How It Works */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Find and book your perfect room in just four simple steps
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((step) => {
              const Icon = step.icon;
              return (
                <div key={step.step} className="text-center">
                  <div className="relative mb-6">
                    <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold">
                      {step.step}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What Students Say
            </h2>
            <p className="text-lg text-gray-600">
              Hear from our satisfied students
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Our University Partners
            </h2>
            <p className="text-lg text-blue-100 max-w-2xl mx-auto">
              We work closely with leading universities to provide the best accommodation options
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {['University of Lagos', 'Covenant University', 'Babcock University', 'Lagos State University'].map((university) => (
              <div key={university} className="text-center p-6 bg-white/10 rounded-lg">
                <Building className="h-12 w-12 mx-auto mb-4 text-blue-300" />
                <h3 className="font-semibold">{university}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600">
              Get answers to common questions about our services
            </p>
          </div>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  {faq.question}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;