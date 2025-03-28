import React from 'react';
import Header from '../../components/Header/Header';
import Hero from '../../components/Hero/Hero';
import About from '../../components/About/About';
import Partners from '../../components/Partners/Partners';
import Trends from '../../components/Trends/Trends';
import Contact from '../../components/Contact/Contact';
import Footer from '../../components/Footer/Footer';
import Services from '../../components/Services/Services';
import './HomePage.css';  
import FAQ from '../../components/FAQ/FAQ';
import AllTestimonials from '../../components/Testimonials/AllTestimonials';
const HomePage = () => {
  return (
    <div className="home-page">
      <Header />
      <Hero />
      
      <Partners />
      <About />
      <Services />
      <Trends />
      <AllTestimonials />
      <FAQ />
      <Footer />
    </div>
  );
};

export default HomePage;