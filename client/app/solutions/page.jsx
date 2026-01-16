'use client';

import { useState } from 'react';
import Link from 'next/link';

// Mock solutions/resources data
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
        return 'bg-green-100 text-green-700 border-green-300';
      case 'Partially Available':
        return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'Busy':
        return 'bg-red-100 text-red-700 border-red-300';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'Government':
        return '🏛️';
      case 'NGO':
        return '🤝';
      case 'Private':
        return '🏢';
      default:
        return '📋';
    }
  };

  const getCapacityBadge = (capacity) => {
    switch (capacity) {
      case 'Very Large':
        return 'bg-purple-100 text-purple-700 border-purple-300';
      case 'Large':
        return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'Medium':
        return 'bg-cyan-100 text-cyan-700 border-cyan-300';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50">
      {/* Header */}
      <section className="pt-24 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <Link href="/" className="text-blue-600 hover:text-blue-700 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
              Available Resources & Organizations
            </h1>
          </div>
          <p className="text-xl text-gray-600 mb-4">
            Relief organizations ready to respond to disaster situations
          </p>
          <Link
            href="/problems"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            View Active Problems
          </Link>
        </div>
      </section>

      {/* Stats Overview */}
      <section className="px-6 mb-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl p-6 shadow-lg border border-green-100">
              <div className="text-3xl font-bold text-green-600">{mockSolutions.length}</div>
              <div className="text-sm text-gray-600 mt-1">Total Organizations</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg border border-blue-100">
              <div className="text-3xl font-bold text-blue-600">
                {mockSolutions.filter((s) => s.status === 'Available').length}
              </div>
              <div className="text-sm text-gray-600 mt-1">Available Now</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg border border-purple-100">
              <div className="text-3xl font-bold text-purple-600">
                {mockSolutions.reduce((sum, s) => sum + s.currentDeployments, 0)}
              </div>
              <div className="text-sm text-gray-600 mt-1">Active Deployments</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg border border-cyan-100">
              <div className="text-3xl font-bold text-cyan-600">
                {mockSolutions.reduce((sum, s) => sum + s.availableResources.length, 0)}
              </div>
              <div className="text-sm text-gray-600 mt-1">Resource Types</div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="px-6 mb-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-xl p-6 shadow-lg border border-blue-100">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Type Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Organization Type</label>
                <div className="flex flex-wrap gap-2">
                  {organizationTypes.map((type) => (
                    <button
                      key={type}
                      onClick={() => setSelectedType(type)}
                      className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                        selectedType === type
                          ? 'bg-blue-600 text-white shadow-lg scale-105'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Specialization Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Specialization</label>
                <div className="flex flex-wrap gap-2">
                  {specializations.map((spec) => (
                    <button
                      key={spec}
                      onClick={() => setSelectedSpecialization(spec)}
                      className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                        selectedSpecialization === spec
                          ? 'bg-blue-600 text-white shadow-lg scale-105'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
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
      <section className="px-6 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid gap-6">
            {filteredSolutions.map((solution) => (
              <div
                key={solution.id}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 hover:border-blue-300 group"
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                  {/* Left Section */}
                  <div className="flex-1">
                    <div className="flex items-start gap-4">
                      <div className="text-5xl">{getTypeIcon(solution.type)}</div>
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-3 mb-2">
                          <h3 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                            {solution.organizationName}
                          </h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-bold border-2 ${getStatusColor(solution.status)}`}>
                            {solution.status}
                          </span>
                          <span className={`px-3 py-1 rounded-full text-xs font-bold border-2 ${getCapacityBadge(solution.capacity)}`}>
                            {solution.capacity} Capacity
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
                          <span className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                            {solution.type}
                          </span>
                          <span className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Response: {solution.responseTime}
                          </span>
                          <span className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {solution.currentDeployments} Active Deployments
                          </span>
                        </div>

                        <div className="mb-4">
                          <div className="text-sm font-semibold text-gray-700 mb-2">Specialization:</div>
                          <div className="flex flex-wrap gap-2">
                            {solution.specialization.map((spec, idx) => (
                              <span
                                key={idx}
                                className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-sm font-medium border border-purple-200"
                              >
                                {spec}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="mb-4">
                          <div className="text-sm font-semibold text-gray-700 mb-2">Available Resources:</div>
                          <div className="flex flex-wrap gap-2">
                            {solution.availableResources.map((resource, idx) => (
                              <span
                                key={idx}
                                className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium border border-blue-200"
                              >
                                {resource}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="mb-4">
                          <div className="text-sm font-semibold text-gray-700 mb-2">Can Help With:</div>
                          <div className="flex flex-wrap gap-2">
                            {solution.activeIn.map((disaster, idx) => (
                              <span
                                key={idx}
                                className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm font-medium border border-green-200"
                              >
                                {disaster}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-3 text-sm">
                          <div className="flex items-center gap-2 text-gray-600">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            <span>{solution.contactNumber}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            <span>{solution.email}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Section */}
                  <div className="flex flex-col gap-3">
                    <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 whitespace-nowrap">
                      Request Support
                    </button>
                    <button className="px-6 py-3 bg-white border-2 border-blue-600 text-blue-600 font-semibold rounded-full hover:bg-blue-50 transition-all duration-300 whitespace-nowrap">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredSolutions.length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No Organizations Found</h3>
              <p className="text-gray-600">Try adjusting your filters to see more results</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
