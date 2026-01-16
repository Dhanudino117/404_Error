'use client';

import { useState } from 'react';
import Link from 'next/link';

// Helper function to format date consistently
const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
};

// Mock disaster data
const mockProblems = [
    {
        id: 1,
        title: 'Severe Flooding in Eastern Region',
        location: 'Bihar, India',
        severity: 'Critical',
        category: 'Flood',
        affectedPeople: 50000,
        dateReported: '2026-01-15',
        status: 'Active',
        description: 'Heavy monsoon rainfall has caused severe flooding affecting multiple districts. Immediate evacuation and relief supplies needed.',
        resourcesNeeded: ['Food Supplies', 'Medical Aid', 'Rescue Boats', 'Shelters'],
        coordinates: { lat: 25.5941, lng: 85.1376 },
    },
    {
        id: 2,
        title: 'Earthquake - 7.2 Magnitude',
        location: 'Uttarakhand, India',
        severity: 'Critical',
        category: 'Earthquake',
        affectedPeople: 35000,
        dateReported: '2026-01-14',
        status: 'Active',
        description: 'Major earthquake has damaged infrastructure and buildings. Search and rescue operations ongoing.',
        resourcesNeeded: ['Rescue Teams', 'Medical Equipment', 'Blankets', 'Water'],
        coordinates: { lat: 30.0668, lng: 79.0193 },
    },
    {
        id: 3,
        title: 'Cyclone Alert - Coastal Areas',
        location: 'Odisha, India',
        severity: 'High',
        category: 'Cyclone',
        affectedPeople: 80000,
        dateReported: '2026-01-13',
        status: 'Monitoring',
        description: 'Cyclone approaching coastal regions. Preventive evacuation measures in progress.',
        resourcesNeeded: ['Evacuation Support', 'Emergency Shelters', 'Food Supplies'],
        coordinates: { lat: 20.9517, lng: 85.0985 },
    },
    {
        id: 4,
        title: 'Landslide - Mountainous Region',
        location: 'Himachal Pradesh, India',
        severity: 'High',
        category: 'Landslide',
        affectedPeople: 5000,
        dateReported: '2026-01-12',
        status: 'Active',
        description: 'Heavy rains triggered landslides blocking major roads. Villages isolated, need immediate assistance.',
        resourcesNeeded: ['Rescue Equipment', 'Food Supplies', 'Medical Teams'],
        coordinates: { lat: 31.1048, lng: 77.1734 },
    },
    {
        id: 5,
        title: 'Drought - Agricultural Crisis',
        location: 'Maharashtra, India',
        severity: 'Medium',
        category: 'Drought',
        affectedPeople: 120000,
        dateReported: '2026-01-10',
        status: 'Monitoring',
        description: 'Prolonged drought affecting agricultural regions. Water scarcity impacting farming communities.',
        resourcesNeeded: ['Water Tankers', 'Food Aid', 'Financial Support'],
        coordinates: { lat: 19.7515, lng: 75.7139 },
    },
    {
        id: 6,
        title: 'Fire Outbreak - Forest Area',
        location: 'Sikkim, India',
        severity: 'High',
        category: 'Fire',
        affectedPeople: 2000,
        dateReported: '2026-01-11',
        status: 'Resolving',
        description: 'Forest fire spreading rapidly. Firefighting teams deployed, nearby villages being evacuated.',
        resourcesNeeded: ['Fire Equipment', 'Evacuation Support', 'Medical Aid'],
        coordinates: { lat: 27.5330, lng: 88.5122 },
    },
];

export default function ProblemsPage() {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedSeverity, setSelectedSeverity] = useState('All');

    const categories = ['All', 'Flood', 'Earthquake', 'Cyclone', 'Landslide', 'Drought', 'Fire'];
    const severityLevels = ['All', 'Critical', 'High', 'Medium'];

    const filteredProblems = mockProblems.filter((problem) => {
        const categoryMatch = selectedCategory === 'All' || problem.category === selectedCategory;
        const severityMatch = selectedSeverity === 'All' || problem.severity === selectedSeverity;
        return categoryMatch && severityMatch;
    });

    const getSeverityColor = (severity: string) => {
        switch (severity) {
            case 'Critical':
                return 'bg-red-100 text-red-700 border-red-300';
            case 'High':
                return 'bg-orange-100 text-orange-700 border-orange-300';
            case 'Medium':
                return 'bg-yellow-100 text-yellow-700 border-yellow-300';
            default:
                return 'bg-gray-100 text-gray-700 border-gray-300';
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Active':
                return 'bg-red-500';
            case 'Monitoring':
                return 'bg-yellow-500';
            case 'Resolving':
                return 'bg-blue-500';
            default:
                return 'bg-gray-500';
        }
    };

    const getCategoryIcon = (category: string) => {
        switch (category) {
            case 'Flood':
                return '🌊';
            case 'Earthquake':
                return '🏚️';
            case 'Cyclone':
                return '🌀';
            case 'Landslide':
                return '⛰️';
            case 'Drought':
                return '☀️';
            case 'Fire':
                return '🔥';
            default:
                return '⚠️';
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
                            Active Disaster Reports
                        </h1>
                    </div>
                    <p className="text-xl text-gray-600 mb-4">
                        Real-time monitoring of disaster situations across regions
                    </p>
                    <Link
                        href="/solutions"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white font-semibold rounded-full hover:bg-green-700 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        View Available Resources
                    </Link>
                </div>
            </section>

            {/* Stats Overview */}
            <section className="px-6 mb-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-white rounded-xl p-6 shadow-lg border border-blue-100">
                            <div className="text-3xl font-bold text-blue-600">{mockProblems.length}</div>
                            <div className="text-sm text-gray-600 mt-1">Total Reports</div>
                        </div>
                        <div className="bg-white rounded-xl p-6 shadow-lg border border-red-100">
                            <div className="text-3xl font-bold text-red-600">
                                {mockProblems.filter((p) => p.severity === 'Critical').length}
                            </div>
                            <div className="text-sm text-gray-600 mt-1">Critical</div>
                        </div>
                        <div className="bg-white rounded-xl p-6 shadow-lg border border-orange-100">
                            <div className="text-3xl font-bold text-orange-600">
                                {mockProblems.filter((p) => p.status === 'Active').length}
                            </div>
                            <div className="text-sm text-gray-600 mt-1">Active Cases</div>
                        </div>
                        <div className="bg-white rounded-xl p-6 shadow-lg border border-cyan-100">
                            <div className="text-3xl font-bold text-cyan-600">
                                {(mockProblems.reduce((sum, p) => sum + p.affectedPeople, 0) / 1000).toFixed(0)}K
                            </div>
                            <div className="text-sm text-gray-600 mt-1">People Affected</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Filters */}
            <section className="px-6 mb-8">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-white rounded-xl p-6 shadow-lg border border-blue-100">
                        <div className="grid md:grid-cols-2 gap-6">
                            {/* Category Filter */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-3">Category</label>
                                <div className="flex flex-wrap gap-2">
                                    {categories.map((category) => (
                                        <button
                                            key={category}
                                            onClick={() => setSelectedCategory(category)}
                                            className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${selectedCategory === category
                                                ? 'bg-blue-600 text-white shadow-lg scale-105'
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                }`}
                                        >
                                            {category}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Severity Filter */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-3">Severity</label>
                                <div className="flex flex-wrap gap-2">
                                    {severityLevels.map((severity) => (
                                        <button
                                            key={severity}
                                            onClick={() => setSelectedSeverity(severity)}
                                            className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${selectedSeverity === severity
                                                ? 'bg-blue-600 text-white shadow-lg scale-105'
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                }`}
                                        >
                                            {severity}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Problems List */}
            <section className="px-6 pb-16">
                <div className="max-w-7xl mx-auto">
                    <div className="grid gap-6">
                        {filteredProblems.map((problem) => (
                            <div
                                key={problem.id}
                                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 hover:border-blue-300 group"
                            >
                                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                                    {/* Left Section */}
                                    <div className="flex-1">
                                        <div className="flex items-start gap-4">
                                            <div className="text-5xl">{getCategoryIcon(problem.category)}</div>
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <h3 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                                                        {problem.title}
                                                    </h3>
                                                    <span className={`flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full ${getStatusColor(problem.status)} text-white`}>
                                                        <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                                                        {problem.status}
                                                    </span>
                                                </div>

                                                <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                                                    <span className="flex items-center gap-1">
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        </svg>
                                                        {problem.location}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                        </svg>
                                                        {formatDate(problem.dateReported)}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                                        </svg>
                                                        {problem.affectedPeople.toLocaleString()} affected
                                                    </span>
                                                </div>

                                                <p className="text-gray-700 mb-4">{problem.description}</p>

                                                <div>
                                                    <div className="text-sm font-semibold text-gray-700 mb-2">Resources Needed:</div>
                                                    <div className="flex flex-wrap gap-2">
                                                        {problem.resourcesNeeded.map((resource, idx) => (
                                                            <span
                                                                key={idx}
                                                                className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium border border-blue-200"
                                                            >
                                                                {resource}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right Section */}
                                    <div className="flex flex-col gap-3">
                                        <span className={`px-4 py-2 rounded-full text-sm font-bold border-2 text-center ${getSeverityColor(problem.severity)}`}>
                                            {problem.severity}
                                        </span>
                                        <button className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
                                            Respond
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {filteredProblems.length === 0 && (
                        <div className="text-center py-16">
                            <div className="text-6xl mb-4">🔍</div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">No Problems Found</h3>
                            <p className="text-gray-600">Try adjusting your filters to see more results</p>
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}
