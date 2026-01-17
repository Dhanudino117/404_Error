'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 z-50 w-full">
      <nav className="mx-auto flex max-w-full items-center justify-between px-6 lg:px-12 py-4 backdrop-blur-2xl bg-black/40 border-b border-white/10">
        
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl md:text-3xl font-bold tracking-tighter bg-gradient-to-r from-violet-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300"
        >
          ReliefSync
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/problems"
            className="relative text-white/70 font-medium transition-all duration-300 hover:text-white group"
          >
            Problems
            <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-gradient-to-r from-violet-500 to-indigo-500 transition-all duration-300 group-hover:w-full"></span>
          </Link>

          <Link
            href="/solutions"
            className="relative text-white/70 font-medium transition-all duration-300 hover:text-white group"
          >
            Solutions
            <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-gradient-to-r from-violet-500 to-indigo-500 transition-all duration-300 group-hover:w-full"></span>
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
              className="relative text-white/70 font-medium transition-all duration-300 hover:text-white group cursor-pointer"
            >
              {item}
              <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-gradient-to-r from-violet-500 to-indigo-500 transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}

          {/* Auth Buttons */}
          <div className="flex items-center gap-3">
            <Link
              href="/authentication"
              className="px-5 py-2 text-white/80 hover:text-white font-medium transition-all duration-300 hover:bg-white/5 rounded-xl"
            >
              Login
            </Link>
            <Link
              href="/authentication"
              className="group/btn relative px-6 py-2.5 bg-gradient-to-r from-violet-500 to-indigo-600 hover:from-violet-600 hover:to-indigo-700 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-violet-500/50 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-200%] group-hover/btn:translate-x-[200%] transition-transform duration-1000" />
              <span className="relative">Sign Up</span>
            </Link>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Toggle Menu"
        >
          <span className={`h-[2px] w-6 bg-white transition-all duration-300 ${open && 'rotate-45 translate-y-2'}`} />
          <span className={`h-[2px] w-6 bg-white transition-all duration-300 ${open && 'opacity-0'}`} />
          <span className={`h-[2px] w-6 bg-white transition-all duration-300 ${open && '-rotate-45 -translate-y-2'}`} />
        </button>
      </nav>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-black/95 backdrop-blur-2xl border-b border-white/10 shadow-2xl">
          <div className="flex flex-col gap-6 px-6 py-8">
            <Link
              href="/problems"
              onClick={() => setOpen(false)}
              className="text-lg font-semibold text-white/70 hover:text-white transition-all duration-300 hover:translate-x-1"
            >
              Problems
            </Link>

            <Link
              href="/solutions"
              onClick={() => setOpen(false)}
              className="text-lg font-semibold text-white/70 hover:text-white transition-all duration-300 hover:translate-x-1"
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
                className="text-lg font-semibold text-white/70 hover:text-white transition-all duration-300 hover:translate-x-1 cursor-pointer"
              >
                {item}
              </a>
            ))}

            {/* Mobile Auth Buttons */}
            <div className="flex flex-col gap-3 pt-4 border-t border-white/10">
              <Link
                href="/authentication"
                onClick={() => setOpen(false)}
                className="px-6 py-3 text-center text-white/80 hover:text-white font-semibold border border-white/20 rounded-xl hover:bg-white/5 transition-all duration-300"
              >
                Login
              </Link>
              <Link
                href="/authentication"
                onClick={() => setOpen(false)}
                className="px-6 py-3 text-center bg-gradient-to-r from-violet-500 to-indigo-600 rounded-xl font-semibold text-white shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50 transition-all duration-300"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
