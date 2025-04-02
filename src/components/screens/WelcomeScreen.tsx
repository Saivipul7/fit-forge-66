
import React from 'react';
import { useFitForge } from '@/context/FitForgeContext';
import Logo from '@/components/Logo';
import ActionButton from '@/components/ActionButton';

const WelcomeScreen = () => {
  const { navigateTo } = useFitForge();

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
          alt="Fitness Motivation" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 hero-overlay"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center flex-grow text-white text-center px-4">
        <div className="mb-6 animate-pulse-soft">
          <Logo size="lg" className="text-white" />
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Transform Your Fitness Journey
        </h1>
        
        <p className="text-xl md:text-2xl mb-10 max-w-2xl">
          Personalized AI-powered workouts tailored to your goals and fitness level
        </p>
        
        <ActionButton 
          variant="secondary" 
          size="lg" 
          onClick={() => navigateTo('userInput')}
          className="shadow-lg transform transition hover:scale-105"
        >
          Get Started
        </ActionButton>
        
        <div className="mt-16 py-4 px-6 bg-white/10 backdrop-blur-sm rounded-lg">
          <p className="italic text-lg">
            "The only bad workout is the one that didn't happen."
          </p>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
