'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  User, Mail, Phone, MapPin, Building, ShieldCheck, 
  Activity, ArrowLeft, HeartHandshake, Package, Calendar, Edit3, Check,
  Clock, Flame, AlertCircle
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function ProfilePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user } = useAuth();

  // URL query params for viewing organization profiles
  const orgName = searchParams.get('orgName');
  const orgEmail = searchParams.get('orgEmail');
  const orgPhone = searchParams.get('orgPhone');
  const category = searchParams.get('category');
  const location = searchParams.get('location');
  const capacity = searchParams.get('capacity');
  const resourcesParam = searchParams.get('resources');
  const canHelpWithParam = searchParams.get('canHelpWith');
  const responseTime = searchParams.get('responseTime') || '2-4 hours';
  const deployments = searchParams.get('deployments') || '3';
  const statusParam = searchParams.get('status') || 'Available';

  const isOrgProfile = Boolean(orgName);

  // Profile state
  const profileName = (isOrgProfile && orgName) ? orgName : (user?.name || 'Relief Coordinator');
  const profileEmail = (isOrgProfile && orgEmail) ? orgEmail : (user?.email || 'admin@reliefsync.com');
  const profilePhone = (isOrgProfile && orgPhone) ? orgPhone : '+91 98123 45678';
  const profileRole = (isOrgProfile && category) ? category : 'Government Relief Officer';
  const profileLocation = location || 'All India';

  const resourcesList = resourcesParam ? resourcesParam.split(',').filter(Boolean) : ['Medical Teams', 'Ambulances', 'First Aid Kits', 'Blood Bank'];
  const canHelpWithList = canHelpWithParam ? canHelpWithParam.split(',').filter(Boolean) : ['Flood', 'Earthquake', 'Cyclone'];

  // Interactive edit mode state (for personal profile)
  const [isEditing, setIsEditing] = useState(false);
  const [saved, setSaved] = useState(false);
  const [editForm, setEditForm] = useState({
    name: profileName,
    email: profileEmail,
    phone: profilePhone,
    location: profileLocation,
    organization: isOrgProfile ? (orgName || '') : 'Disaster Management Authority',
  });

  useEffect(() => {
    setEditForm({
      name: profileName,
      email: profileEmail,
      phone: profilePhone,
      location: profileLocation,
      organization: isOrgProfile ? (orgName || '') : 'Disaster Management Authority',
    });
  }, [profileName, profileEmail, profilePhone, profileLocation, isOrgProfile, orgName]);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 4000);
  };

  return (
    <main className="relative min-h-screen bg-brand-beige overflow-hidden pt-28 pb-16">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
        {/* Navigation Back Button */}
        <div className="mb-8 flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="group inline-flex items-center gap-2 px-4 py-2 bg-white/50 hover:bg-white backdrop-blur rounded-full text-brand-foreground/70 hover:text-brand-rust transition-all border border-brand-orange/10 shadow-sm"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Back to Organizations</span>
          </button>

          {!isOrgProfile && (
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-brand-rust text-white font-medium text-sm rounded-full shadow-md hover:bg-brand-rust/90 transition-all"
            >
              <Edit3 className="w-4 h-4" />
              <span>{isEditing ? 'Cancel Editing' : 'Edit Profile'}</span>
            </button>
          )}
        </div>

        {saved && (
          <div className="mb-6 p-4 bg-green-100 border border-green-200 text-green-800 rounded-2xl flex items-center gap-3 animate-in fade-in">
            <Check className="w-5 h-5 text-green-600" />
            <span className="font-semibold text-sm">Profile updated successfully!</span>
          </div>
        )}

        {/* Profile Card Header */}
        <div className="relative bg-white/70 backdrop-blur-xl border border-brand-orange/20 rounded-3xl p-8 md:p-12 shadow-xl mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-brand-rust to-brand-orange text-white flex items-center justify-center text-3xl font-extrabold shadow-lg shrink-0">
              {profileName.charAt(0).toUpperCase()}
            </div>

            <div className="flex-1 space-y-3">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-3xl md:text-4xl font-bold text-brand-foreground tracking-tight">
                  {editForm.name}
                </h1>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full border border-green-200 uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                  {statusParam}
                </span>
                {capacity && (
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full border border-blue-200">
                    {capacity} Capacity
                  </span>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-4 text-sm text-brand-foreground/70 font-medium">
                <span className="flex items-center gap-1.5 bg-brand-beige px-3 py-1 rounded-lg border border-brand-orange/10">
                  <Building className="w-4 h-4 text-brand-rust" />
                  {profileRole}
                </span>
                <span className="flex items-center gap-1.5 bg-brand-beige px-3 py-1 rounded-lg border border-brand-orange/10">
                  <Clock className="w-4 h-4 text-brand-rust" />
                  Response: {responseTime}
                </span>
                <span className="flex items-center gap-1.5 bg-brand-beige px-3 py-1 rounded-lg border border-brand-orange/10">
                  <Activity className="w-4 h-4 text-brand-rust" />
                  {deployments} Active Deployments
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-sm text-brand-foreground/60 pt-1">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-brand-rust" />
                  {editForm.location}
                </span>
                <span className="flex items-center gap-1.5">
                  <Mail className="w-4 h-4 text-brand-rust" />
                  {editForm.email}
                </span>
                <span className="flex items-center gap-1.5">
                  <Phone className="w-4 h-4 text-brand-rust" />
                  {editForm.phone}
                </span>
              </div>
            </div>

            {isOrgProfile && (
              <div className="w-full md:w-auto shrink-0 flex flex-col gap-2">
                <Link
                  href={`/report?orgName=${encodeURIComponent(profileName)}&orgEmail=${encodeURIComponent(profileEmail)}&orgPhone=${encodeURIComponent(profilePhone)}`}
                  className="btn-primary text-center px-8 py-4 text-lg shadow-lg shadow-brand-rust/20 font-bold"
                >
                  Request Support
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Profile Content / Editing Form */}
        {isEditing ? (
          <div className="bg-white/80 backdrop-blur-xl border border-brand-orange/20 rounded-3xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-brand-foreground mb-6 pb-2 border-b border-brand-orange/20">
              Edit Account Information
            </h2>
            <form onSubmit={handleSaveProfile} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-brand-foreground/70">Full Name</label>
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-brand-orange/20 bg-white focus:outline-none focus:border-brand-rust"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-brand-foreground/70">Email Address</label>
                  <input
                    type="email"
                    value={editForm.email}
                    onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-brand-orange/20 bg-white focus:outline-none focus:border-brand-rust"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-brand-foreground/70">Phone Number</label>
                  <input
                    type="tel"
                    value={editForm.phone}
                    onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-brand-orange/20 bg-white focus:outline-none focus:border-brand-rust"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-brand-foreground/70">Location</label>
                  <input
                    type="text"
                    value={editForm.location}
                    onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-brand-orange/20 bg-white focus:outline-none focus:border-brand-rust"
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="btn-primary px-8 py-3 font-semibold shadow-lg shadow-brand-rust/20"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-6 py-3 bg-white border border-brand-orange/20 rounded-xl font-medium text-brand-foreground/70 hover:bg-brand-orange/5"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* Resources Available */}
              <div className="p-8 bg-white/70 border border-brand-orange/20 rounded-3xl shadow-sm space-y-4">
                <h3 className="text-xs font-bold text-brand-foreground/60 uppercase tracking-widest flex items-center gap-2">
                  <Package className="w-4 h-4 text-brand-rust" />
                  RESOURCES AVAILABLE
                </h3>
                <div className="flex flex-wrap gap-2.5">
                  {resourcesList.map((item, idx) => (
                    <span
                      key={idx}
                      className="px-4 py-2 bg-brand-orange/10 border border-brand-orange/20 text-brand-rust rounded-xl font-semibold text-sm"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Can Help With */}
              <div className="p-8 bg-white/70 border border-brand-orange/20 rounded-3xl shadow-sm space-y-4">
                <h3 className="text-xs font-bold text-brand-foreground/60 uppercase tracking-widest flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-brand-rust" />
                  CAN HELP WITH DISASTERS
                </h3>
                <div className="flex flex-wrap gap-2.5">
                  {canHelpWithList.map((disaster, idx) => (
                    <span
                      key={idx}
                      className="px-4 py-2 bg-red-50 border border-red-200 text-red-700 rounded-xl font-semibold text-sm"
                    >
                      {disaster}
                    </span>
                  ))}
                </div>
              </div>

              {/* Recent Activity */}
              <div className="p-8 bg-white/70 border border-brand-orange/20 rounded-3xl shadow-sm space-y-6">
                <h3 className="text-xl font-bold text-brand-foreground pb-2 border-b border-brand-orange/20">
                  Active Deployments & Missions
                </h3>

                <div className="space-y-4">
                  <div className="p-4 bg-white/80 rounded-2xl border border-brand-orange/10 flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-brand-foreground text-sm">Flood Emergency Supply Chain</h4>
                      <p className="text-xs text-brand-foreground/60 mt-1">First-aid kits, water purification & medical teams deployed</p>
                    </div>
                    <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">Active</span>
                  </div>

                  <div className="p-4 bg-white/80 rounded-2xl border border-brand-orange/10 flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-brand-foreground text-sm">Ambulance & Rescue Fleet Dispatch</h4>
                      <p className="text-xs text-brand-foreground/60 mt-1">24/7 Rapid response unit operational</p>
                    </div>
                    <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">Active</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar Column */}
            <div className="space-y-8">
              <div className="p-6 bg-white/70 border border-brand-orange/20 rounded-3xl shadow-sm space-y-4">
                <h3 className="text-lg font-bold text-brand-foreground pb-2 border-b border-brand-orange/20">
                  Organization Details
                </h3>

                <div className="space-y-3 text-sm text-brand-foreground/80">
                  <div className="flex items-center justify-between">
                    <span className="text-brand-foreground/60">Category:</span>
                    <span className="font-bold text-brand-rust">{profileRole}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-brand-foreground/60">Coverage Area:</span>
                    <span className="font-semibold text-brand-foreground">{profileLocation}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-brand-foreground/60">Response Time:</span>
                    <span className="font-semibold text-green-600">{responseTime}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-brand-foreground/60">Verification:</span>
                    <span className="font-semibold text-green-600">Level 3 Verified</span>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-gradient-to-br from-brand-rust/10 to-brand-orange/10 border border-brand-rust/20 rounded-3xl space-y-3">
                <h4 className="font-bold text-brand-rust text-base">Direct Contact Support</h4>
                <p className="text-xs text-brand-foreground/70 leading-relaxed">
                  Need to dispatch or coordinate emergency resources with {profileName}?
                </p>
                <Link
                  href={`/report?orgName=${encodeURIComponent(profileName)}&orgEmail=${encodeURIComponent(profileEmail)}&orgPhone=${encodeURIComponent(profilePhone)}`}
                  className="inline-block mt-2 text-xs font-bold text-brand-rust hover:underline"
                >
                  Request Emergency Support &rarr;
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
