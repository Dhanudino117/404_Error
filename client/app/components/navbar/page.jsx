'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, User, LogOut, ChevronDown, Activity, Map, HeartHandshake } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const [profileOpen, setProfileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setProfileOpen(false);
  };

  return (
    <header className="fixed top-0 z-50 w-full bg-brand-beige/80 backdrop-blur-md border-b border-brand-orange/20">
      <nav className="mx-auto flex max-w-[1400px] items-center justify-between px-6 lg:px-12 py-3">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-bold tracking-tight text-brand-foreground"
        >

          <span className=' transition-all hover:text-brand-rust duration-300  hover:scale-105 hover:cursor-pointer hover:duration-300'>RELIEF SYNC</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-8">
          <Link href="/problems" className="text-sm font-medium text-brand-foreground/70 hover:text-brand-rust transition-colors flex items-center gap-2">
            Disasters
          </Link>
          <Link href="/solutions" className="text-sm font-medium text-brand-foreground/70 hover:text-brand-rust transition-colors flex items-center gap-2">
            Organizations
          </Link>
          <Link href="/map" className="text-sm font-medium text-brand-foreground/70 hover:text-brand-rust transition-colors flex items-center gap-2">
            Live Map
          </Link>
        </div>

        {/* Desktop Auth */}
        <div className="hidden lg:flex items-center gap-4">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 pl-3 pr-2 py-1.5 rounded-full border border-brand-orange/20 hover:border-brand-orange/40 bg-white/50 shadow-sm transition-all"
              >
                <div className="w-6 h-6 rounded-full bg-brand-orange/30 text-brand-brown flex items-center justify-center text-xs font-bold">
                  {user.name.charAt(0)}
                </div>
                <span className="text-sm font-medium text-brand-foreground max-w-[100px] truncate">
                  {user.name}
                </span>
                <ChevronDown className="w-4 h-4 text-brand-foreground/50" />
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-xl border border-brand-orange/20 bg-white/90 backdrop-blur shadow-lg py-1 animate-in fade-in zoom-in-95 duration-200">
                  <div className="px-4 py-2 border-b border-brand-orange/10 mb-1">
                    <p className="text-xs text-brand-foreground/50">Signed in as</p>
                    <p className="text-sm font-semibold text-brand-foreground truncate">{user.email}</p>
                  </div>
                  <Link
                    href="/profile"
                    onClick={() => setProfileOpen(false)}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-brand-foreground hover:bg-brand-orange/10 transition-colors font-medium"
                  >
                    <User className="w-4 h-4 text-brand-rust" />
                    View Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors border-t border-brand-orange/10"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                href="/authentication"
                className="text-sm font-medium text-brand-foreground/70 hover:text-brand-rust transition-colors"
              >
                Log in
              </Link>
              <Link
                href="/authentication"
                className="btn-primary text-sm"
              >
                Sign up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden p-2 text-brand-foreground hover:bg-brand-orange/10 rounded-lg transition-colors"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {open && (
        <div className="lg:hidden border-t border-brand-orange/20 bg-brand-beige">
          <div className="flex flex-col p-4 space-y-4">
            <Link
              href="/problems"
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-brand-foreground/80 hover:bg-brand-orange/10 hover:text-brand-rust font-medium transition-colors"
              onClick={() => setOpen(false)}
            >
              <Activity className="w-5 h-5" />
              Disasters
            </Link>
            <Link
              href="/solutions"
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-brand-foreground/80 hover:bg-brand-sage/20 hover:text-brand-olive font-medium transition-colors"
              onClick={() => setOpen(false)}
            >
              <HeartHandshake className="w-5 h-5" />
              Organizations
            </Link>
            <Link
              href="/map"
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-brand-foreground/80 hover:bg-brand-sage/20 hover:text-brand-olive font-medium transition-colors"
              onClick={() => setOpen(false)}
            >
              <Map className="w-5 h-5" />
              Live Map
            </Link>

            <div className="border-t border-brand-sage/20 pt-4 mt-2">
              {user ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-3 px-4">
                    <div className="w-8 h-8 rounded-full bg-brand-lime/50 text-brand-olive flex items-center justify-center font-bold">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-brand-foreground">{user.name}</p>
                      <p className="text-sm text-brand-foreground/50">{user.email}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      handleLogout();
                      setOpen(false);
                    }}
                    className="w-full flex items-center gap-2 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 font-medium transition-colors"
                  >
                    <LogOut className="w-5 h-5" />
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  <Link
                    href="/authentication"
                    className="w-full btn-secondary text-center justify-center"
                    onClick={() => setOpen(false)}
                  >
                    Log in
                  </Link>
                  <Link
                    href="/authentication"
                    className="w-full btn-primary text-center justify-center"
                    onClick={() => setOpen(false)}
                  >
                    Sign up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
