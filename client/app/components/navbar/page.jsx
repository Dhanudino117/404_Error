'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 z-50 w-full">
      <nav className="mx-auto flex max-w-full items-center justify-between px-6 py-4 backdrop-blur-xl bg-white/70 border-b border-gray-200/50 shadow-sm">
        
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent"
        >
          ReliefSync
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/problems"
            className="relative text-gray-700 font-medium transition-colors hover:text-blue-600 group cursor-pointer"
          >
            Problems
            <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
          </Link>

          <Link
            href="/solutions"
            className="relative text-gray-700 font-medium transition-colors hover:text-blue-600 group cursor-pointer"
          >
            Solutions
            <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
          </Link>
          
          {['Features', 'Impact'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(item.toLowerCase())?.scrollIntoView({ 
                  behavior: 'smooth',
                  block: 'start'
                });
              }}
              className="relative text-gray-700 font-medium transition-colors hover:text-blue-600 group cursor-pointer"
            >
              {item}
              <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}

          {/* CTA */}
          <a
            href="#get-started"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('get-started')?.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
              });
            }}
            className="rounded-full bg-blue-600 px-6 py-2 text-white font-semibold shadow-md transition-all duration-300 hover:bg-blue-700 hover:shadow-lg hover:-translate-y-0.5 cursor-pointer"
          >
            Get Started
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden flex flex-col gap-1"
          aria-label="Toggle Menu"
        >
          <span className={`h-[2px] w-6 bg-gray-800 transition ${open && 'rotate-45 translate-y-1.5'}`} />
          <span className={`h-[2px] w-6 bg-gray-800 transition ${open && 'opacity-0'}`} />
          <span className={`h-[2px] w-6 bg-gray-800 transition ${open && '-rotate-45 -translate-y-1.5'}`} />
        </button>
      </nav>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-b shadow-lg">
          <div className="flex flex-col gap-6 px-6 py-8">
            <Link
              href="/problems"
              onClick={() => setOpen(false)}
              className="text-lg font-medium text-gray-800 hover:text-blue-600 transition cursor-pointer"
            >
              Problems
            </Link>

            <Link
              href="/solutions"
              onClick={() => setOpen(false)}
              className="text-lg font-medium text-gray-800 hover:text-blue-600 transition cursor-pointer"
            >
              Solutions
            </Link>
            
            {['Features', 'Impact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={(e) => {
                  e.preventDefault();
                  setOpen(false);
                  setTimeout(() => {
                    document.getElementById(item.toLowerCase())?.scrollIntoView({ 
                      behavior: 'smooth',
                      block: 'start'
                    });
                  }, 100);
                }}
                className="text-lg font-medium text-gray-800 hover:text-blue-600 transition cursor-pointer"
              >
                {item}
              </a>
            ))}
            <a
              href="#get-started"
              onClick={(e) => {
                e.preventDefault();
                setOpen(false);
                setTimeout(() => {
                  document.getElementById('get-started')?.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                  });
                }, 100);
              }}
              className="rounded-full bg-blue-600 px-6 py-3 text-center text-white font-semibold shadow-md hover:bg-blue-700 transition cursor-pointer"
            >
              Get Started
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
