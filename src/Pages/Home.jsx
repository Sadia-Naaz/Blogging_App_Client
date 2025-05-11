import React from 'react'
import { Button } from "@/components/ui/button";
import ButtonComponent from '@/components/ButtonComponent';
import { Link } from 'react-router-dom';
import HeroSection from '@/LandingPageComponents/HeroSection';
import FeaturesSection from '@/LandingPageComponents/Features';
import BlogPreviewSection from '@/LandingPageComponents/BlogPreviewSection';
import AboutSection from '@/LandingPageComponents/AboutSection';
import CTASection from '@/LandingPageComponents/CTASection';
import Footer from '@/LandingPageComponents/Footer';
const Home = () => {

  return (
  <div>
   <HeroSection/>
  <FeaturesSection/>
  <BlogPreviewSection/>
  <AboutSection/>
  <CTASection/>
  <Footer/>
  </div>
  
  )
}

export default Home;