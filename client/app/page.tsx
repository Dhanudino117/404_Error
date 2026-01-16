'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Home() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50">

      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center px-6 pt-20 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative max-w-6xl mx-auto text-center z-10">
          <div className="inline-block mb-6 px-6 py-2 bg-blue-100 rounded-full text-blue-700 font-semibold text-sm tracking-wide animate-fade-in">
            🚨 Disaster Response Made Simple
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-6 leading-tight">
            Coordinate Relief Efforts
            <span className="block bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-700 bg-clip-text text-transparent mt-2">
              Save Lives Faster
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
            ReliefSync connects government agencies and NGOs in real-time during disasters.
            One platform, unified response, lives saved.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="#get-started"
              className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold rounded-full shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105 flex items-center gap-2"
            >
              Get Started Now
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>

            <Link
              href="#features"
              className="px-8 py-4 bg-white border-2 border-blue-600 text-blue-600 font-bold rounded-full hover:bg-blue-50 transition-all duration-300"
            >
              Explore Features
            </Link>
          </div>

          <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600">10x</div>
              <div className="text-sm text-gray-600 mt-1">Faster Response</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-cyan-600">Real-time</div>
              <div className="text-sm text-gray-600 mt-1">Data Sharing</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600">100%</div>
              <div className="text-sm text-gray-600 mt-1">Coordinated</div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section id="problem" className="py-24 px-6 bg-white/60 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              The Crisis in Disaster Response
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Current systems are fragmented, slow, and inefficient—costing precious time and lives
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '🔌', title: 'Isolated Systems', desc: 'NGOs and agencies operate on disconnected platforms' },
              { icon: '📄', title: 'Manual Processes', desc: 'Data sharing is slow and error-prone' },
              { icon: '⚠️', title: 'Poor Allocation', desc: 'Resources are wasted due to lack of visibility' },
              { icon: '❌', title: 'Missed Areas', desc: 'Critical regions get overlooked in the chaos' },
            ].map((item, i) => (
              <div key={i} className="group p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-red-100">
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">{item.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section id="solution" className="py-24 px-6 bg-gradient-to-br from-blue-600 via-cyan-600 to-blue-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              One Platform, Unified Response
            </h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              ReliefSync breaks down silos and enables real-time coordination
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: '🌐',
                title: 'Centralized Hub',
                desc: 'Government agencies publish disaster alerts and affected locations in one place',
              },
              {
                icon: '📊',
                title: 'Live Dashboard',
                desc: 'All stakeholders monitor real-time information and resource availability',
              },
              {
                icon: '🤝',
                title: 'Seamless Collaboration',
                desc: 'NGOs update resources like food, medical aid, and rescue teams instantly',
              },
            ].map((item, i) => (
              <div key={i} className="p-8 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300">
                <div className="text-6xl mb-4">{item.icon}</div>
                <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                <p className="text-blue-100">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Powerful Features for Critical Missions
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Built with modern technology to handle the most demanding scenarios
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: '🔗',
                title: 'Open REST APIs',
                desc: 'Centralized data sharing through standardized, secure APIs',
                color: 'blue',
              },
              {
                icon: '📍',
                title: 'Map Visualization',
                desc: 'Real-time geospatial view of affected areas and active relief teams',
                color: 'cyan',
              },
              {
                icon: '🔐',
                title: 'Role-Based Access',
                desc: 'Secure authentication and permissions for government and NGO users',
                color: 'indigo',
              },
              {
                icon: '⚡',
                title: 'Live Updates',
                desc: 'Instant status updates for relief requests and task assignments',
                color: 'blue',
              },
              {
                icon: '📈',
                title: 'Analytics Dashboard',
                desc: 'Monitor disaster response metrics and resource utilization in real-time',
                color: 'cyan',
              },
              {
                icon: '🚀',
                title: 'High Performance',
                desc: 'Built with Next.js for lightning-fast load times during critical situations',
                color: 'indigo',
              },
            ].map((item, i) => (
              <div key={i} className="group p-8 bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl hover:shadow-2xl transition-all duration-300 border border-blue-100 hover:border-blue-300">
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">{item.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section id="impact" className="py-24 px-6 bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Real Impact, Measurable Results
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Transforming disaster response through technology
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: '⚡', stat: 'Faster', label: 'Response Times', color: 'blue' },
              { icon: '🎯', stat: 'Better', label: 'Coordination', color: 'cyan' },
              { icon: '♻️', stat: 'Less', label: 'Redundancy', color: 'indigo' },
              { icon: '📊', stat: 'Smarter', label: 'Resource Use', color: 'blue' },
            ].map((item, i) => (
              <div key={i} className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="text-6xl mb-4">{item.icon}</div>
                <div className={`text-4xl font-bold bg-gradient-to-r from-${item.color}-600 to-cyan-500 bg-clip-text text-transparent mb-2`}>
                  {item.stat}
                </div>
                <div className="text-gray-600 font-medium">{item.label}</div>
              </div>
            ))}
          </div>

          <div className="mt-16 p-10 bg-white rounded-3xl shadow-2xl border border-blue-100">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  Built with Modern Technology
                </h3>
                <p className="text-gray-600 mb-6">
                  ReliefSync leverages the power of Next.js, React, and MongoDB to deliver a scalable,
                  high-performance platform that works when it matters most.
                </p>
                <div className="flex flex-wrap gap-3">
                  {['Next.js', 'React', 'Tailwind CSS', 'MongoDB', 'Node.js', 'JWT Auth'].map((tech) => (
                    <span key={tech} className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div className="text-6xl text-center">
                💻🚀🌐
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="get-started" className="py-24 px-6 bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Transform Disaster Response?
          </h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Join government agencies and NGOs already using ReliefSync to save lives and coordinate relief efforts.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-10 py-4 bg-white text-blue-600 font-bold rounded-full shadow-2xl hover:shadow-white/50 transition-all duration-300 hover:scale-105">
              Request Demo
            </button>
            <button className="px-10 py-4 bg-transparent border-2 border-white text-white font-bold rounded-full hover:bg-white/10 transition-all duration-300">
              Contact Sales
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-4">
            ReliefSync
          </div>
          <p className="text-slate-400 mb-6">
            Disaster Response Coordination System
          </p>
          <div className="text-sm text-slate-500">
            © 2026 ReliefSync. Built with Next.js • Saving lives through technology
          </div>
        </div>
      </footer>
    </main>
  );
}
