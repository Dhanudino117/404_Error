'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Building2, Handshake, Building, FileText, Search } from 'lucide-react';

// Mock solutions/resources data (same as before but updated styling will be applied in render)
const mockSolutions = [
  {
    id: 1,
    organizationName: 'Red Cross India',
    type: 'NGO',
    availableResources: ['Medical Teams', 'Ambulances', 'First Aid Kits', 'Blood Bank'],
    specialization: ['Medical Aid', 'Emergency Response'],
    capacity: 'Large',
    coverage: ['All India'],
    contactNumber: '+91-11-2371-6441',
    email: 'info@indianredcross.org',
    responseTime: '2-4 hours',
    activeIn: ['Flood', 'Earthquake', 'Cyclone'],
    currentDeployments: 3,
    status: 'Available',
  },
  {
    id: 2,
    organizationName: 'National Disaster Response Force (NDRF)',
    type: 'Government',
    availableResources: ['Rescue Teams', 'Rescue Boats', 'Helicopters', 'Heavy Equipment'],
    specialization: ['Search & Rescue', 'Evacuation'],
    capacity: 'Very Large',
    coverage: ['All India'],
    contactNumber: '011-24363260',
    email: 'ndrf@gov.in',
    responseTime: '1-2 hours',
    activeIn: ['Earthquake', 'Flood', 'Landslide', 'Fire'],
    currentDeployments: 5,
    status: 'Available',
  },
  {
    id: 3,
    organizationName: 'Oxfam India',
    type: 'NGO',
    availableResources: ['Food Supplies', 'Water Purification', 'Hygiene Kits', 'Shelters'],
    specialization: ['Food Security', 'Water & Sanitation'],
    capacity: 'Large',
    coverage: ['Bihar', 'Odisha', 'Maharashtra', 'Uttarakhand'],
    contactNumber: '+91-11-4653-8000',
    email: 'info@oxfamindia.org',
    responseTime: '4-6 hours',
    activeIn: ['Flood', 'Drought', 'Cyclone'],
    currentDeployments: 2,
    status: 'Available',
  },
  {
    id: 4,
    organizationName: 'Indian Army Disaster Relief',
    type: 'Government',
    availableResources: ['Medical Teams', 'Rescue Teams', 'Food Supplies', 'Communication Equipment'],
    specialization: ['Emergency Response', 'Infrastructure'],
    capacity: 'Very Large',
    coverage: ['All India'],
    contactNumber: '011-23010097',
    email: 'relief@indianarmy.gov.in',
    responseTime: '1-3 hours',
    activeIn: ['Earthquake', 'Landslide', 'Flood', 'Fire'],
    currentDeployments: 4,
    status: 'Partially Available',
  },
  {
    id: 5,
    organizationName: 'Save the Children India',
    type: 'NGO',
    availableResources: ['Child Care Kits', 'Education Supplies', 'Medical Aid', 'Counselors'],
    specialization: ['Child Protection', 'Education in Emergency'],
    capacity: 'Medium',
    coverage: ['Bihar', 'Odisha', 'Uttarakhand', 'Maharashtra'],
    contactNumber: '+91-11-4904-1100',
    email: 'info@savethechildren.in',
    responseTime: '6-8 hours',
    activeIn: ['Flood', 'Cyclone', 'Drought'],
    currentDeployments: 1,
    status: 'Available',
  },
  {
    id: 6,
    organizationName: 'Rapid Response Medical Team',
    type: 'Private',
    availableResources: ['Mobile Clinics', 'Doctors', 'Nurses', 'Emergency Medicine'],
    specialization: ['Emergency Medical Services'],
    capacity: 'Medium',
    coverage: ['Delhi NCR', 'Mumbai', 'Bangalore', 'Kolkata'],
    contactNumber: '+91-98765-43210',
    email: 'contact@rrmt.in',
    responseTime: '3-5 hours',
    activeIn: ['Earthquake', 'Fire', 'Flood'],
    currentDeployments: 2,
    status: 'Available',
  },
  {
    id: 7,
    organizationName: 'Water Aid India',
    type: 'NGO',
    availableResources: ['Water Tankers', 'Filtration Systems', 'Handpumps', 'Water Testing Kits'],
    specialization: ['Water Supply', 'Sanitation'],
    capacity: 'Large',
    coverage: ['Maharashtra', 'Rajasthan', 'Karnataka'],
    contactNumber: '+91-80-2686-0258',
    email: 'info@wateraidindia.in',
    responseTime: '5-7 hours',
    activeIn: ['Drought', 'Flood'],
    currentDeployments: 1,
    status: 'Available',
  },
  {
    id: 8,
    organizationName: 'Fire & Rescue Services',
    type: 'Government',
    availableResources: ['Fire Trucks', 'Firefighters', 'Fire Equipment', 'Rescue Equipment'],
    specialization: ['Fire Fighting', 'Technical Rescue'],
    capacity: 'Large',
    coverage: ['All India'],
    contactNumber: '101',
    email: 'fire@gov.in',
    responseTime: '30 min - 2 hours',
    activeIn: ['Fire', 'Earthquake'],
    currentDeployments: 3,
    status: 'Available',
  },
];

export default function SolutionsPage() {
  const [selectedType, setSelectedType] = useState('All');
  const [selectedSpecialization, setSelectedSpecialization] = useState('All');

  const organizationTypes = ['All', 'Government', 'NGO', 'Private'];
  const specializations = ['All', 'Medical Aid', 'Search & Rescue', 'Food Security', 'Water Supply', 'Child Protection', 'Emergency Response'];

  const filteredSolutions = mockSolutions.filter((solution) => {
    const typeMatch = selectedType === 'All' || solution.type === selectedType;
    const specializationMatch = selectedSpecialization === 'All' || solution.specialization.includes(selectedSpecialization);
    return typeMatch && specializationMatch;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Available':
        return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'Partially Available':
        return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'Busy':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-slate-100 text-slate-600 border-slate-200';
    }
  };

  const getCapacityBadge = (capacity) => {
    switch (capacity) {
      case 'Very Large':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'Large':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Medium':
        return 'bg-cyan-100 text-cyan-700 border-cyan-200';
      default:
        return 'bg-slate-100 text-slate-600 border-slate-200';
    }
  };

  const getTypeIcon = (type) => {
    const iconClass = "w-12 h-12 md:w-14 md:h-14";
    const iconColor = "text-brand-rust";
    
    switch (type) {
      case 'Government':
        return <Building2 className={`${iconClass} ${iconColor}`} />;
      case 'NGO':
        return <Handshake className={`${iconClass} ${iconColor}`} />;
      case 'Private':
        return <Building className={`${iconClass} ${iconColor}`} />;
      default:
        return <FileText className={`${iconClass} ${iconColor}`} />;
    }
  };

  return (
    <main className="relative min-h-screen bg-brand-beige overflow-hidden">
      {/* Header */}
      <section className="relative pt-32 pb-16 px-6 lg:px-12 bg-white/40 border-b border-brand-orange/10">
        <div className="max-w-[1400px] mx-auto">
          <Link href="/" className="group inline-flex items-center gap-2 mb-8 text-brand-foreground/60 hover:text-brand-rust transition-all duration-300">
            <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="font-medium">Back to Home</span>
          </Link>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <div className="flex-1 space-y-6">
              <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-brand-foreground">
                Relief
                <br />
                <span className="text-brand-rust">
                  Organizations
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-brand-foreground/70 max-w-2xl font-light leading-relaxed">
                Connect with verified organizations ready to deploy resources for disaster response.
              </p>
            </div>

            <Link
              href="/problems"
              className="group relative px-8 py-4 bg-brand-rust text-white rounded-2xl transition-all duration-300 hover:shadow-lg hover:shadow-brand-rust/20 hover:scale-[1.02]"
            >
              <div className="relative flex items-center gap-3">
                <span className="font-semibold">View Active Problems</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Overview */}
      <section className="relative px-6 lg:px-12 py-12">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {[
              { label: 'Total Organizations', value: mockSolutions.length, sublabel: 'Verified Partners' },
              { label: 'Available Now', value: mockSolutions.filter((s) => s.status === 'Available').length, sublabel: 'Ready for Deployment' },
              { label: 'Active Deployments', value: mockSolutions.reduce((sum, s) => sum + s.currentDeployments, 0), sublabel: 'Ongoing Missions' },
              { label: 'Resource Types', value: mockSolutions.reduce((sum, s) => sum + s.availableResources.length, 0), sublabel: 'Equipment & Teams' },
            ].map((stat, i) => (
              <div
                key={i}
                className="p-6 flex flex-col items-center text-center md:items-start md:text-left card"
              >
                <div className="text-4xl md:text-5xl font-bold text-brand-rust mb-2">
                  {stat.value}
                </div>
                <div className="text-brand-foreground font-semibold text-sm uppercase tracking-wide opacity-80">{stat.label}</div>
                <div className="text-brand-foreground/50 text-xs">{stat.sublabel}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="relative px-6 lg:px-12 pb-12">
        <div className="max-w-[1400px] mx-auto">
          <div className="p-8 bg-white/70 backdrop-blur-sm border border-brand-orange/20 rounded-2xl shadow-sm">
            <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
              <div>
                <label className="block text-sm font-bold text-brand-foreground/70 mb-4 tracking-wide uppercase">Organization Type</label>
                <div className="flex flex-wrap gap-3">
                  {organizationTypes.map((type) => (
                    <button
                      key={type}
                      onClick={() => setSelectedType(type)}
                      className={`px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-200 ${
                        selectedType === type
                          ? 'bg-brand-rust text-white shadow-md'
                          : 'bg-white border border-brand-orange/20 text-brand-foreground/70 hover:bg-brand-orange/10'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-brand-foreground/70 mb-4 tracking-wide uppercase">Specialization</label>
                <div className="flex flex-wrap gap-3">
                  {specializations.map((spec) => (
                    <button
                      key={spec}
                      onClick={() => setSelectedSpecialization(spec)}
                      className={`px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-200 ${
                        selectedSpecialization === spec
                          ? 'bg-brand-rust text-white shadow-md'
                          : 'bg-white border border-brand-orange/20 text-brand-foreground/70 hover:bg-brand-orange/10'
                      }`}
                    >
                      {spec}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions List */}
      <section className="relative px-6 lg:px-12 pb-24">
        <div className="max-w-[1400px] mx-auto">
          <div className="space-y-6">
            {filteredSolutions.map((solution) => (
              <div
                key={solution.id}
                className="group relative p-8 md:p-12 bg-white card hover:shadow-lg transition-all duration-300"
              >
                <div className="relative flex flex-col lg:flex-row lg:items-start gap-8">
                  {/* Left Section */}
                  <div className="flex-1 space-y-6">
                    <div className="flex items-start gap-6">
                      <div className="p-4 rounded-2xl bg-brand-beige border border-brand-orange/20">
                        {getTypeIcon(solution.type)}
                      </div>

                      <div className="flex-1 space-y-4">
                        <div className="flex flex-wrap items-center gap-3">
                          <h3 className="text-3xl md:text-4xl font-bold text-brand-foreground group-hover:text-brand-rust transition-colors duration-300">
                            {solution.organizationName}
                          </h3>

                          <span className={`relative px-4 py-2 ${getStatusColor(solution.status)} rounded-full border`}>
                            <span className="relative flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
                              <span className={`w-2 h-2 rounded-full animate-pulse ${
                                solution.status === 'Available' ? 'bg-emerald-500' : 
                                solution.status === 'Busy' ? 'bg-red-500' : 'bg-amber-500'
                              }`}></span>
                              {solution.status}
                            </span>
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-4 md:gap-6 text-brand-foreground/60">
                          <span className="flex items-center gap-2 text-sm">
                            <Building2 className="w-4 h-4" />
                            {solution.type}
                          </span>
                          <span className="flex items-center gap-2 text-sm">
                            <Search className="w-4 h-4" />
                            Response: {solution.responseTime}
                          </span>
                          <span className="flex items-center gap-2 text-sm">
                            <FileText className="w-4 h-4" />
                            {solution.currentDeployments} Active Deployments
                          </span>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                          <div className="space-y-3">
                            <div className="text-sm font-bold text-brand-foreground/50 tracking-wide uppercase">Resources Available</div>
                            <div className="flex flex-wrap gap-2">
                              {solution.availableResources.map((resource, idx) => (
                                <span
                                  key={idx}
                                  className="px-3 py-1.5 bg-brand-orange/10 border border-brand-orange/20 text-brand-brown rounded-md text-sm font-semibold"
                                >
                                  {resource}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="space-y-3">
                            <div className="text-sm font-bold text-brand-foreground/50 tracking-wide uppercase">Can Help With</div>
                            <div className="flex flex-wrap gap-2">
                              {solution.activeIn.map((item, idx) => (
                                <span
                                  key={idx}
                                  className="px-3 py-1.5 bg-brand-rust/10 border border-brand-rust/20 text-brand-rust rounded-md text-sm font-semibold"
                                >
                                  {item}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-6 pt-4 border-t border-brand-orange/10">
                          <div className="flex items-center gap-3 text-brand-foreground/70">
                            <div className="p-2 bg-brand-beige rounded-lg">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                              </svg>
                            </div>
                            <span className="font-mono text-sm">{solution.contactNumber}</span>
                          </div>
                          <div className="flex items-center gap-3 text-brand-foreground/70">
                            <div className="p-2 bg-brand-beige rounded-lg">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                              </svg>
                            </div>
                            <span className="font-mono text-sm">{solution.email}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Section */}
                  <div className="flex flex-col gap-4 lg:items-end min-w-[200px]">
                    <span className={`px-4 py-2 rounded-xl text-xs font-bold border text-center ${getCapacityBadge(solution.capacity)}`}>
                      {solution.capacity} Capacity
                    </span>
                    
                    <div className="flex flex-col gap-3 w-full lg:w-auto mt-4">
                      <Link 
                        href={`/report?orgName=${encodeURIComponent(solution.organizationName)}&orgEmail=${encodeURIComponent(solution.email)}&orgPhone=${encodeURIComponent(solution.contactNumber)}`}
                        className="btn-primary w-full text-center"
                      >
                        Request Support
                      </Link>
                      <button className="btn-secondary w-full">
                        View Profile
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredSolutions.length === 0 && (
            <div className="text-center py-24 bg-white/50 rounded-3xl border border-brand-orange/20 mt-8">
              <div className="inline-flex justify-center items-center w-24 h-24 rounded-full bg-brand-orange/10 text-brand-orange mb-6">
                <Search className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-brand-foreground mb-2">No Organizations Found</h3>
              <p className="text-brand-foreground/60">Try adjusting your filters to find what you're looking for</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
