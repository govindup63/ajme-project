"use client"

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Settings } from 'lucide-react';

export function HeroSection() {
  const gearRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const gear = gearRef.current;
    if (!gear) return;
    
    let rotation = 0;
    let animationId: number;
    
    const rotateGear = () => {
      rotation += 0.1;
      if (gear) {
        gear.style.transform = `rotate(${rotation}deg)`;
      }
      animationId = requestAnimationFrame(rotateGear);
    };
    
    rotateGear();
    
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <section className="relative pt-24 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      {/* Blueprint Grid Background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5 dark:opacity-10 z-0"></div>
      
      {/* Animated Gear */}
      <div 
        ref={gearRef}
        className="absolute top-40 right-[-50px] md:right-[-20px] lg:right-32 opacity-10 dark:opacity-20 w-60 h-60 md:w-80 md:h-80"
      >
        <Settings className="w-full h-full text-primary" />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600 dark:from-blue-400 dark:to-primary">
          Your AI Assistant for Mechanical Engineering
        </h1>
        
        <p className="text-lg md:text-xl text-foreground/80 max-w-3xl mb-8 leading-relaxed">
          Get instant, specialized answers to your toughest mechanical engineering questions. 
          Built on cutting-edge AI, designed for engineers like you.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
          <Button asChild size="lg" className="w-full sm:w-auto text-md font-medium">
            <Link href="/chat">
              Start Chatting <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="w-full sm:w-auto text-md font-medium">
            <Link href="#features">
              Learn More
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}