'use client';

import Link from 'next/link';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, ArrowRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-brand-orange/5 border-t border-brand-orange/10 pt-16 pb-8">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2 text-xl font-bold tracking-tight text-brand-foreground">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-rust text-white">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span>ReliefSync</span>
            </Link>
            <p className="text-brand-foreground/70 leading-relaxed">
              Coordinating disaster relief efforts in real-time. connecting resources with those who need them most.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2 bg-white/50 border border-brand-orange/20 rounded-lg text-brand-foreground/60 hover:text-brand-rust hover:border-brand-rust transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-white/50 border border-brand-orange/20 rounded-lg text-brand-foreground/60 hover:text-brand-rust hover:border-brand-rust transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-white/50 border border-brand-orange/20 rounded-lg text-brand-foreground/60 hover:text-brand-rust hover:border-brand-rust transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-white/50 border border-brand-orange/20 rounded-lg text-brand-foreground/60 hover:text-brand-rust hover:border-brand-rust transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-brand-foreground mb-6">Platform</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/problems" className="text-brand-foreground/60 hover:text-brand-rust transition-colors">
                  Active Disasters
                </Link>
              </li>
              <li>
                <Link href="/solutions" className="text-brand-foreground/60 hover:text-brand-rust transition-colors">
                  Relief Organizations
                </Link>
              </li>
              <li>
                <Link href="/map" className="text-brand-foreground/60 hover:text-brand-rust transition-colors">
                  Live Action Map
                </Link>
              </li>
              <li>
                <Link href="/authentication" className="text-brand-foreground/60 hover:text-brand-rust transition-colors">
                  Volunteer Sign Up
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-brand-foreground mb-6">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-brand-foreground/60">
                <MapPin className="w-5 h-5 text-brand-rust shrink-0 mt-0.5" />
                <span>123 Relief Center,<br />New Delhi, India 110001</span>
              </li>
              <li className="flex items-center gap-3 text-brand-foreground/60">
                <Phone className="w-5 h-5 text-brand-rust shrink-0" />
                <span>+91 1800-123-4567</span>
              </li>
              <li className="flex items-center gap-3 text-brand-foreground/60">
                <Mail className="w-5 h-5 text-brand-rust shrink-0" />
                <span>help@reliefsync.org</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-bold text-brand-foreground mb-6">Stay Updated</h3>
            <p className="text-brand-foreground/60 mb-4 text-sm">
              Get the latest updates on relief efforts and volunteer opportunities.
            </p>
            <form className="space-y-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 bg-white/50 border border-brand-orange/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-rust/20 focus:border-brand-rust transition-all text-brand-foreground"
              />
              <button
                type="submit"
                className="w-full btn-primary flex items-center justify-center gap-2"
              >
                Subscribe
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        <div className="pt-8 border-t border-brand-orange/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-brand-foreground/40 text-sm">
            © {new Date().getFullYear()} ReliefSync. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-brand-foreground/50">
            <a href="#" className="hover:text-brand-foreground transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-brand-foreground transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-brand-foreground transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}