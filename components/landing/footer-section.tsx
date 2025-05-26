import Link from 'next/link';
import { Settings } from 'lucide-react';

export function FooterSection() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="border-t border-border/50 py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-6 md:mb-0">
            <Settings className="h-6 w-6 text-primary mr-2" />
            <span className="font-bold text-lg">MechE AI</span>
          </div>
          
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
            <Link href="/" className="text-foreground/70 hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="/chat" className="text-foreground/70 hover:text-primary transition-colors">
              Chat
            </Link>
            <a href="#features" className="text-foreground/70 hover:text-primary transition-colors">
              Features
            </a>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-border/50 text-center text-sm text-muted-foreground">
          <p>© {currentYear} MechE AI. All rights reserved.</p>
          <p className="mt-2">An AI assistant for mechanical engineers.</p>
        </div>
      </div>
    </footer>
  );
}