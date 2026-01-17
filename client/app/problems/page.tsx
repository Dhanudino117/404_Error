'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Waves, Home, Wind, Mountain, Sun, Flame, AlertTriangle } from 'lucide-react';

// Helper function to format date consistently
const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
};

// Transform USGS earthquake data to our problem format
const transformEarthquakeData = (feature: any, index: number) => {
    const { properties, geometry } = feature;
    const magnitude = properties.mag || 0;
    const location = properties.place || 'Unknown Location';

    let severity = 'Medium';
    if (magnitude >= 7.0) severity = 'Critical';
    else if (magnitude >= 5.5) severity = 'High';

    const affectedPeople = Math.floor(magnitude * 10000);

    return {
        id: `eq-${index}`,
        title: `Earthquake - ${magnitude.toFixed(1)} Magnitude`,
        location: location,
        severity: severity,
        category: 'Earthquake',
        affectedPeople: affectedPeople,
        dateReported: new Date(properties.time).toISOString().split('T')[0],
        status: magnitude >= 6.0 ? 'Active' : 'Monitoring',
        description: `Earthquake detected ${properties.place}. Magnitude ${magnitude.toFixed(1)} at depth of ${(geometry.coordinates[2] || 0).toFixed(1)}km. ${properties.tsunami === 1 ? 'Tsunami warning issued.' : 'No tsunami threat.'}`,
        resourcesNeeded: magnitude >= 7.0
            ? ['Rescue Teams', 'Medical Equipment', 'Emergency Shelters', 'Food Supplies']
            : magnitude >= 5.5
                ? ['Medical Aid', 'Structural Assessment', 'Rescue Equipment']
                : ['Medical Aid', 'Damage Assessment'],
        coordinates: {
            lat: geometry.coordinates[1],
            lng: geometry.coordinates[0]
        },
        depth: geometry.coordinates[2] || 0,
        tsunami: properties.tsunami === 1,
    };
};

// Mock disaster data
const mockNonEarthquakeProblems = [
    {
        id: 'mock-1',
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
        id: 'mock-2',
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
        id: 'mock-3',
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
        id: 'mock-4',
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
        id: 'mock-5',
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
    const [earthquakeData, setEarthquakeData] = useState<any[]>([]);
    const [ambeeData, setAmbeeData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedSeverity, setSelectedSeverity] = useState('All');

    useEffect(() => {
        const fetchDisasters = async () => {
            try {
                setLoading(true);

                try {
                    const usgsResponse = await fetch('https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&limit=50');
                    if (usgsResponse.ok) {
                        const usgsData = await usgsResponse.json();
                        const transformedEarthquakes = usgsData.features
                            .filter((feature: any) => feature.properties.mag >= 4.0)
                            .slice(0, 10)
                            .map(transformEarthquakeData);
                        setEarthquakeData(transformedEarthquakes);
                    }
                } catch (err) {
                    console.error('Error fetching USGS data:', err);
                }

                try {
                    const ambeeResponse = await fetch('/api/disasters?lat=20.5937&lon=78.9629');
                    if (ambeeResponse.ok) {
                        const ambeeDataRaw = await ambeeResponse.json();
                        if (ambeeDataRaw.data && Array.isArray(ambeeDataRaw.data)) {
                            const transformedAmbee = ambeeDataRaw.data.slice(0, 5).map((disaster: any, index: number) => ({
                                id: `ambee-${index}`,
                                title: disaster.title || disaster.event || 'Natural Disaster',
                                location: disaster.location || disaster.place || 'India',
                                severity: disaster.severity || 'Medium',
                                category: disaster.type || disaster.category || 'Other',
                                affectedPeople: disaster.affectedPeople || 1000,
                                dateReported: disaster.date || new Date().toISOString().split('T')[0],
                                status: disaster.status || 'Monitoring',
                                description: disaster.description || 'Disaster detected from Ambee data source.',
                                resourcesNeeded: disaster.resourcesNeeded || ['Medical Aid', 'Emergency Response'],
                                coordinates: disaster.coordinates || { lat: 20.5937, lng: 78.9629 },
                            }));
                            setAmbeeData(transformedAmbee);
                        }
                    }
                } catch (err) {
                    console.error('Error fetching Ambee data:', err);
                }

                setError(null);
            } catch (err) {
                console.error('Error fetching disaster data:', err);
                setError('Some data sources unavailable. Showing available disasters.');
            } finally {
                setLoading(false);
            }
        };

        fetchDisasters();
    }, []);

    const allProblems = [...earthquakeData, ...ambeeData, ...mockNonEarthquakeProblems];
    const categories = ['All', 'Flood', 'Earthquake', 'Cyclone', 'Landslide', 'Drought', 'Fire'];
    const severityLevels = ['All', 'Critical', 'High', 'Medium'];

    const filteredProblems = allProblems.filter((problem) => {
        const categoryMatch = selectedCategory === 'All' || problem.category === selectedCategory;
        const severityMatch = selectedSeverity === 'All' || problem.severity === selectedSeverity;
        return categoryMatch && severityMatch;
    });

    const getSeverityColor = (severity: string) => {
        switch (severity) {
            case 'Critical':
                return 'from-red-500/20 via-rose-500/10 to-transparent border-red-500/30 text-red-300';
            case 'High':
                return 'from-orange-500/20 via-amber-500/10 to-transparent border-orange-500/30 text-orange-300';
            case 'Medium':
                return 'from-yellow-500/20 via-yellow-500/10 to-transparent border-yellow-500/30 text-yellow-300';
            default:
                return 'from-gray-500/20 via-gray-500/10 to-transparent border-gray-500/30 text-gray-300';
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Active':
                return 'bg-gradient-to-r from-red-500 via-rose-500 to-red-600';
            case 'Monitoring':
                return 'bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-600';
            case 'Resolving':
                return 'bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-600';
            default:
                return 'bg-gradient-to-r from-gray-500 to-gray-600';
        }
    };

    const getCategoryIcon = (category: string) => {
        const iconClass = "w-12 h-12 md:w-14 md:h-14";
        const iconColor = "text-white";

        switch (category) {
            case 'Flood':
                return <Waves className={`${iconClass} ${iconColor}`} />;
            case 'Earthquake':
                return <Home className={`${iconClass} ${iconColor}`} />;
            case 'Cyclone':
                return <Wind className={`${iconClass} ${iconColor}`} />;
            case 'Landslide':
                return <Mountain className={`${iconClass} ${iconColor}`} />;
            case 'Drought':
                return <Sun className={`${iconClass} ${iconColor}`} />;
            case 'Fire':
                return <Flame className={`${iconClass} ${iconColor}`} />;
            default:
                return <AlertTriangle className={`${iconClass} ${iconColor}`} />;
        }
    };

    return (
        <main className="relative min-h-screen bg-black overflow-hidden">
            {/* Gradient Orbs Background */}
            <div className="fixed inset-0 -z-10 overflow-hidden">
                <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-gradient-to-br from-indigo-500/30 via-violet-500/20 to-transparent rounded-full blur-3xl animate-pulse" />
                <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-gradient-to-br from-cyan-500/20 via-teal-500/10 to-transparent rounded-full blur-3xl animate-pulse delay-1000" />
                <div className="absolute bottom-0 left-1/3 w-[700px] h-[700px] bg-gradient-to-br from-rose-500/20 via-pink-500/10 to-transparent rounded-full blur-3xl animate-pulse delay-2000" />
            </div>

            {/* Noise Texture Overlay */}
            <div className="fixed inset-0 -z-10 opacity-[0.015] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsdGVyPSJ1cmwoI2EpIi8+PC9zdmc+')] pointer-events-none" />

            {/* Header */}
            <section className="relative pt-32 pb-16 px-6 lg:px-12">
                <div className="max-w-[1400px] mx-auto">
                    <Link href="/" className="group inline-flex items-center gap-2 mb-8 text-white/60 hover:text-white transition-all duration-300">
                        <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        <span className="font-medium">Back</span>
                    </Link>

                    <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
                        <div className="flex-1 space-y-6">
                            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-balance">
                                <span className="bg-gradient-to-br from-white via-white to-white/60 bg-clip-text text-transparent">
                                    Active Disaster
                                </span>
                                <br />
                                <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
                                    Reports
                                </span>
                            </h1>

                            <p className="text-xl md:text-2xl text-white/60 max-w-2xl font-light leading-relaxed">
                                Real-time monitoring of disaster situations across regions
                                {loading && <span className="ml-2 text-cyan-400 animate-pulse">● Loading live data...</span>}
                            </p>
                        </div>

                        <Link
                            href="/solutions"
                            className="group relative px-8 py-4 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 hover:from-emerald-500/20 hover:to-teal-500/20 backdrop-blur-xl border border-emerald-500/20 rounded-2xl transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-emerald-500/20"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/10 to-emerald-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
                            <div className="relative flex items-center gap-3">
                                <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                                <span className="font-semibold text-white">View Available Resources</span>
                                <svg className="w-4 h-4 text-white/60 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </div>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Stats Overview */}
            <section className="relative px-6 lg:px-12 pb-16">
                <div className="max-w-[1400px] mx-auto">
                    {error && (
                        <div className="mb-8 p-6 bg-yellow-500/10 backdrop-blur-xl border border-yellow-500/20 rounded-2xl">
                            <div className="flex items-center gap-3 text-yellow-300">
                                <svg className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                                <span className="font-medium">{error}</span>
                            </div>
                        </div>
                    )}

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                        {[
                            { label: 'Total Reports', value: loading ? '...' : allProblems.length, gradient: 'from-indigo-500 to-violet-500', sublabel: loading ? 'Loading...' : 'Active cases' },
                            { label: 'Critical', value: loading ? '...' : allProblems.filter((p) => p.severity === 'Critical').length, gradient: 'from-red-500 to-rose-500', sublabel: 'High priority' },
                            { label: 'Active Cases', value: loading ? '...' : allProblems.filter((p) => p.status === 'Active').length, gradient: 'from-orange-500 to-amber-500', sublabel: 'Ongoing' },
                            { label: 'People Affected', value: loading ? '...' : `${(allProblems.reduce((sum, p) => sum + p.affectedPeople, 0) / 1000).toFixed(0)}K`, gradient: 'from-cyan-500 to-teal-500', sublabel: 'Estimated' },
                        ].map((stat, i) => (
                            <div
                                key={i}
                                className="group relative p-6 md:p-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl hover:bg-white/10 hover:border-white/20 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl overflow-hidden"
                            >
                                <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                                <div className="relative space-y-2">
                                    <div className={`text-5xl md:text-6xl font-bold bg-gradient-to-br ${stat.gradient} bg-clip-text text-transparent`}>
                                        {stat.value}
                                    </div>
                                    <div className="text-white/60 font-medium text-sm tracking-wide uppercase">{stat.label}</div>
                                    <div className="text-white/40 text-xs">{stat.sublabel}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Filters */}
            <section className="relative px-6 lg:px-12 pb-16">
                <div className="max-w-[1400px] mx-auto">
                    <div className="p-8 md:p-12 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl">
                        <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
                            <div>
                                <label className="block text-sm font-bold text-white/80 mb-4 tracking-wide uppercase">Category</label>
                                <div className="flex flex-wrap gap-3">
                                    {categories.map((category) => (
                                        <button
                                            key={category}
                                            onClick={() => setSelectedCategory(category)}
                                            className={`px-6 py-3 rounded-2xl font-semibold text-sm transition-all duration-300 hover:scale-105 ${selectedCategory === category
                                                ? 'bg-gradient-to-r from-indigo-500 to-violet-500 text-white shadow-lg shadow-indigo-500/50'
                                                : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/10'
                                                }`}
                                        >
                                            {category}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-white/80 mb-4 tracking-wide uppercase">Severity</label>
                                <div className="flex flex-wrap gap-3">
                                    {severityLevels.map((severity) => (
                                        <button
                                            key={severity}
                                            onClick={() => setSelectedSeverity(severity)}
                                            className={`px-6 py-3 rounded-2xl font-semibold text-sm transition-all duration-300 hover:scale-105 ${selectedSeverity === severity
                                                ? 'bg-gradient-to-r from-rose-500 to-red-500 text-white shadow-lg shadow-rose-500/50'
                                                : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/10'
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
            <section className="relative px-6 lg:px-12 pb-24">
                <div className="max-w-[1400px] mx-auto">
                    <div className="space-y-6">
                        {filteredProblems.map((problem) => (
                            <div
                                key={problem.id}
                                className="group relative p-8 md:p-12 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl hover:bg-white/10 hover:border-white/20 transition-all duration-500 hover:scale-[1.01] hover:shadow-2xl overflow-hidden"
                            >
                                {/* Background gradient on hover */}
                                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 via-violet-500/0 to-cyan-500/0 group-hover:from-indigo-500/5 group-hover:via-violet-500/5 group-hover:to-cyan-500/5 transition-all duration-500 rounded-3xl" />

                                <div className="relative flex flex-col lg:flex-row lg:items-start gap-8">
                                    {/* Left Section */}
                                    <div className="flex-1 space-y-6">
                                        <div className="flex items-start gap-6">
                                            <div className="text-7xl group-hover:scale-110 transition-transform duration-500">
                                                {getCategoryIcon(problem.category)}
                                            </div>

                                            <div className="flex-1 space-y-4">
                                                <div className="flex flex-wrap items-center gap-3">
                                                    <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tight group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/60 group-hover:bg-clip-text transition-all duration-500">
                                                        {problem.title}
                                                    </h3>

                                                    <span className={`relative px-4 py-2 ${getStatusColor(problem.status)} rounded-full`}>
                                                        <span className="relative flex items-center gap-2 text-xs font-bold text-white">
                                                            <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                                                            {problem.status}
                                                        </span>
                                                    </span>
                                                </div>

                                                <div className="flex flex-wrap items-center gap-4 md:gap-6 text-white/60">
                                                    <span className="flex items-center gap-2 text-sm">
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                        </svg>
                                                        {problem.location}
                                                    </span>
                                                    <span className="flex items-center gap-2 text-sm">
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                        </svg>
                                                        {formatDate(problem.dateReported)}
                                                    </span>
                                                    <span className="flex items-center gap-2 text-sm">
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                                        </svg>
                                                        <span className="font-semibold text-white">{problem.affectedPeople.toLocaleString()}</span> affected
                                                    </span>
                                                </div>

                                                <p className="text-lg text-white/70 leading-relaxed">
                                                    {problem.description}
                                                </p>

                                                <div className="space-y-3">
                                                    <div className="text-sm font-bold text-white/80 tracking-wide uppercase">Resources Needed</div>
                                                    <div className="flex flex-wrap gap-2">
                                                        {problem.resourcesNeeded.map((resource: string, idx: number) => (
                                                            <span
                                                                key={idx}
                                                                className="px-4 py-2 bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 rounded-xl text-sm font-medium backdrop-blur-xl hover:bg-indigo-500/20 transition-all duration-300"
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
                                    <div className="flex flex-col gap-4 lg:items-end">
                                        <div className={`px-6 py-3 bg-gradient-to-br ${getSeverityColor(problem.severity)} backdrop-blur-xl border rounded-2xl font-bold text-center min-w-[140px]`}>
                                            {problem.severity}
                                        </div>
                                        <button className="group/btn relative px-8 py-4 bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 rounded-2xl font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-indigo-500/50 overflow-hidden">
                                            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-200%] group-hover/btn:translate-x-[200%] transition-transform duration-1000" />
                                            <span className="relative">Respond Now</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {filteredProblems.length === 0 && (
                        <div className="text-center py-24">
                            <div className="text-8xl mb-6 opacity-50">🔍</div>
                            <h3 className="text-4xl font-bold text-white mb-4">No Problems Found</h3>
                            <p className="text-xl text-white/60">Try adjusting your filters to see more results</p>
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}
