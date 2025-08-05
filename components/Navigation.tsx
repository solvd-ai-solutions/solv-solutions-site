import { OutlineButton } from "./ui/outline-button";
import { Menu, X } from "lucide-react";
import { useState } from "react";


export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-black z-50 py-4 px-6 outline-white" style={{ outline: '2px solid var(--color-white)', outlineOffset: '0' }}>
      <div className="container mx-auto max-w-6xl">
        <div className="flex items-center justify-between w-full">
          {/* Logo */}
          <div className="flex items-center">
            <img 
              src="/Assets/white_on_black_logo.png" 
              alt="Solvd: AI Solutions" 
              style={{ width: '150px', height: 'auto' }}
            />
          </div>

          {/* Desktop Navigation */}
          <div className="flex items-center gap-8">
            <a 
              href="#about"
              className="text-white hover:text-lavender transition-colors font-medium text-lg cursor-pointer"
            >
              About
            </a>
            <a 
              href="#contact"
              className="text-white hover:text-coral transition-colors font-medium text-lg cursor-pointer"
            >
              Contact
            </a>
            <button 
              onClick={() => scrollToSection('contact')}
              className="bg-lavender text-white hover:bg-white hover:text-lavender transition-colors font-medium px-4 py-2 text-lg rounded"
            >
              Get Started
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="hidden p-2 outline-white rounded" 
            style={{ outline: '2px solid var(--color-white)', outlineOffset: '0' }}
          >
            {isMenuOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
          </button>
        </div>

        {/* Mobile Navigation - Hidden since we're showing desktop nav always */}
        {false && (
          <div className="hidden mt-4 py-4 bg-black outline-white rounded" style={{ outline: '2px solid var(--color-white)', outlineOffset: '0' }}>
            <div className="flex flex-col space-y-4 px-4">
              <button 
                onClick={() => scrollToSection('about')}
                className="text-white hover:text-lavender transition-colors font-medium py-2 text-left"
              >
                About
              </button>
              <button 
                onClick={() => scrollToSection('demos')}
                className="text-white hover:text-mint transition-colors font-medium py-2 text-left"
              >
                Demos
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="text-white hover:text-coral transition-colors font-medium py-2 text-left"
              >
                Contact
              </button>
              <OutlineButton 
                variant="lavender"
                onClick={() => scrollToSection('contact')}
                className="mt-2 w-full"
              >
                Get Started
              </OutlineButton>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}