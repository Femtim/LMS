import React from 'react';
import Navbar from '../../components/ui/Navbar';
import HeroSection from './subComponents/HeroSection';
import TrustBar from './subComponents/TrustBar';
import FeaturedCourses from './subComponents/FeaturedCourses';
import WhyChoose from './subComponents/WhyChoose';
import Testimonials from './subComponents/Testimonials';
import CTABanner from './subComponents/CTABanner';
import Footer from '../../components/ui/Footer';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
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