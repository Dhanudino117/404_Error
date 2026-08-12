'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export default function AuthenticationPage() {
  const [isLogin, setIsLogin] = useState(true);
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: 'Demo User',
    email: 'admin@reliefsync.com',
    password: 'password123',
    confirmPassword: 'password123',
  });

  const handleQuickDemoLogin = () => {
    setFormData({
      name: 'Demo Admin',
      email: 'admin@reliefsync.com',
      password: 'password123',
      confirmPassword: 'password123',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      if (!isLogin && formData.password !== formData.confirmPassword) {
        throw new Error("Passwords do not match");
      }

      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/signup';
      const body = isLogin 
        ? { email: formData.email, password: formData.password }
        : { name: formData.name, email: formData.email, password: formData.password };

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      if (isLogin) {
        login(data.user, data.token);
      } else {
        // Switch to login tab after successful signup
        setIsLogin(true);
        setError('Account created successfully! Please log in.');
        setFormData({ ...formData, password: '', confirmPassword: '' });
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <main className="relative min-h-screen bg-brand-beige overflow-hidden flex items-center justify-center">
      <div className="w-full max-w-md px-6 py-12">
        {/* Back Button */}
        <Link href="/" className="group inline-flex items-center gap-2 mb-8 text-brand-foreground/60 hover:text-brand-rust transition-all duration-300">
          <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span className="font-medium">Back to Home</span>
        </Link>

        {/* Auth Card */}
        <div className="relative p-8 md:p-12 bg-white/60 backdrop-blur-xl border border-brand-orange/20 rounded-3xl shadow-xl">
          <div className="relative space-y-8">
            {/* Header */}
            <div className="text-center space-y-2">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-brand-foreground">
                {isLogin ? 'Welcome Back' : 'Create Account'}
              </h1>
              <p className="text-brand-foreground/70 text-lg">
                {isLogin ? 'Sign in to continue to ReliefSync' : 'Join ReliefSync to coordinate relief efforts'}
              </p>
            </div>

            {/* Toggle Tabs */}
            <div className="flex gap-2 p-1 bg-brand-beige rounded-2xl border border-brand-orange/10">
              <button
                type="button"
                onClick={() => setIsLogin(true)}
                className={`flex-1 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  isLogin
                    ? 'bg-white text-brand-rust shadow-md'
                    : 'text-brand-foreground/60 hover:text-brand-rust hover:bg-white/50'
                }`}
              >
                Login
              </button>
              <button
                type="button"
                onClick={() => setIsLogin(false)}
                className={`flex-1 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  !isLogin
                    ? 'bg-white text-brand-rust shadow-md'
                    : 'text-brand-foreground/60 hover:text-brand-rust hover:bg-white/50'
                }`}
              >
                Sign Up
              </button>
            </div>

            {/* Demo Notice */}
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800 flex items-center justify-between gap-2">
              <div>
                <span className="font-bold">🔑 Default Login Access:</span>
                <div className="text-amber-700">Email: <code className="bg-amber-100 px-1 rounded">admin@reliefsync.com</code> | Pass: <code className="bg-amber-100 px-1 rounded">password123</code></div>
              </div>
              <button
                type="button"
                onClick={handleQuickDemoLogin}
                className="px-2 py-1 bg-amber-600 text-white font-medium rounded-lg text-xs hover:bg-amber-700 transition-colors shrink-0 shadow-sm"
              >
                Auto-fill
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {!isLogin && (
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-brand-foreground/80 tracking-wide uppercase">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required={!isLogin}
                    className="w-full px-5 py-4 bg-white border border-brand-orange/20 rounded-2xl text-brand-foreground placeholder:text-brand-foreground/40 focus:outline-none focus:border-brand-rust focus:ring-1 focus:ring-brand-rust/20 transition-all duration-300"
                    placeholder="Enter your full name"
                  />
                </div>
              )}

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-brand-foreground/80 tracking-wide uppercase">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-4 bg-white border border-brand-orange/20 rounded-2xl text-brand-foreground placeholder:text-brand-foreground/40 focus:outline-none focus:border-brand-rust focus:ring-1 focus:ring-brand-rust/20 transition-all duration-300"
                  placeholder="Enter your email"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-brand-foreground/80 tracking-wide uppercase">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-4 bg-white border border-brand-orange/20 rounded-2xl text-brand-foreground placeholder:text-brand-foreground/40 focus:outline-none focus:border-brand-rust focus:ring-1 focus:ring-brand-rust/20 transition-all duration-300"
                  placeholder="Enter your password"
                />
              </div>

              {!isLogin && (
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-brand-foreground/80 tracking-wide uppercase">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required={!isLogin}
                    className="w-full px-5 py-4 bg-white border border-brand-orange/20 rounded-2xl text-brand-foreground placeholder:text-brand-foreground/40 focus:outline-none focus:border-brand-rust focus:ring-1 focus:ring-brand-rust/20 transition-all duration-300"
                    placeholder="Confirm your password"
                  />
                </div>
              )}

              {isLogin && (
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 text-brand-foreground/70 cursor-pointer hover:text-brand-rust transition-colors">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded border-brand-orange/30 bg-white text-brand-rust focus:ring-brand-rust/50"
                    />
                    <span>Remember me</span>
                  </label>
                  <a href="#" className="text-brand-rust hover:text-brand-orange font-medium transition-colors">
                    Forgot password?
                  </a>
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className={`p-4 rounded-xl text-sm font-medium ${error.includes('successfully') ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-red-100 text-red-700 border border-red-200'}`}>
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="btn-primary w-full text-lg shadow-xl shadow-brand-rust/20 hover:scale-[1.02]"
              >
                <span className="relative flex items-center justify-center gap-2">
                  {isLoading && (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  )}
                  {isLogin ? 'Sign In' : 'Create Account'}
                </span>
              </button>
            </form>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-brand-orange/20"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white/60 backdrop-blur rounded-full text-brand-foreground/60 font-medium">Or continue with</span>
              </div>
            </div>

            {/* Social Login */}
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                className="px-6 py-3 bg-white border border-brand-orange/20 hover:bg-brand-orange/5 rounded-2xl text-brand-foreground font-semibold transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Google
              </button>
              <button
                type="button"
                className="px-6 py-3 bg-white border border-brand-orange/20 hover:bg-brand-orange/5 rounded-2xl text-brand-foreground font-semibold transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                GitHub
              </button>
            </div>

            {/* Footer */}
            <p className="text-center text-sm text-brand-foreground/60">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-brand-rust hover:text-brand-orange font-semibold transition-colors"
              >
                {isLogin ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </div>
        </div>

        {/* Terms */}
        <p className="mt-6 text-center text-xs text-brand-foreground/40">
          By continuing, you agree to ReliefSync&apos;s{' '}
          <a href="#" className="text-brand-foreground/60 hover:text-brand-rust transition-colors">Terms of Service</a>
          {' '}and{' '}
          <a href="#" className="text-brand-foreground/60 hover:text-brand-rust transition-colors">Privacy Policy</a>
        </p>
      </div>
    </main>
  );
}
