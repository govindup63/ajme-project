"use client"

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Settings, Menu, X } from 'lucide-react';
import { ModeToggle } from '@/components/mode-toggle';

export function LandingHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 md:px-6',
        isScrolled
          ? 'bg-background/90 backdrop-blur-md shadow-sm py-2'
          : 'bg-transparent py-4'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Settings className="h-7 w-7 text-primary" />
          <span className="font-bold text-xl">MechE AI</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/" className="text-foreground/80 hover:text-primary transition-colors">
            Home
          </Link>
          <Link href="/chat" className="text-foreground/80 hover:text-primary transition-colors">
            Chat
          </Link>
          <div className="flex items-center space-x-2">
            <ModeToggle />
            <Button asChild>
              <Link href="/chat">Start Chatting</Link>
            </Button>
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center space-x-2 md:hidden">
          <ModeToggle />
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-md shadow-md py-4 px-4 flex flex-col space-y-4 border-t">
          <Link 
            href="/" 
            className="text-foreground/80 hover:text-primary transition-colors py-2"
            onClick={() => setMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link 
            href="/chat" 
            className="text-foreground/80 hover:text-primary transition-colors py-2"
            onClick={() => setMobileMenuOpen(false)}
          >
            Chat
          </Link>
          <Button asChild className="w-full">
            <Link href="/chat" onClick={() => setMobileMenuOpen(false)}>
              Start Chatting
            </Link>
          </Button>
        </div>
      )}
    </header>
  );
}