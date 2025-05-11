import React from 'react'
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
const HeroSection = () => {
return(
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 p-6">
      <div className="text-center max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to BlogVerse</h1>
        <p className="text-lg text-gray-600 mb-6">A platform to share stories, thoughts, and insights with the world.</p>
        <Link to="/register"> <Button size="lg" className="rounded-full">Get Started</Button></Link>
       
      </div>
    </section>
  );
}

  


export default HeroSection