import React from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import TrustBar from '../components/TrustBar';
import FeaturedCourses from '../components/FeaturedCourses';
import WhyChoose from '../components/WhyChoose';
import Testimonials from '../components/Testimonials';
import CTABanner from '../components/CTABanner';
import Footer from '../components/ui/Footer';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <HeroSection />
        <TrustBar />
        <FeaturedCourses />
        <WhyChoose />
        <Testimonials />
        <CTABanner />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;