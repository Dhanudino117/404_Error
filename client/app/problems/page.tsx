'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Waves, Home, Wind, Mountain, Sun, Flame, AlertTriangle, Search, Filter, ArrowRight } from 'lucide-react';

// Helper function to format date consistently
const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
};

// Helper function to format numbers consistently (fixes hydration errors)
const formatNumber = (num: number): string => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
                    console.log("Earthquake data fetched successfully");
                } catch (err) {
                    console.error('Error fetching USGS data:', err);
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

    const allProblems = [...earthquakeData, ...mockNonEarthquakeProblems];
    const categories = ['All', 'Flood', 'Earthquake', 'Cyclone', 'Landslide', 'Drought', 'Fire'];
    const severityLevels = ['All', 'Critical', 'High', 'Medium'];

    const filteredProblems = allProblems.filter((problem) => {
        const categoryMatch = selectedCategory === 'All' || problem.category === selectedCategory;
        const severityMatch = selectedSeverity === 'All' || problem.severity === selectedSeverity;
        return categoryMatch && severityMatch;
    });

    const getSeverityStyles = (severity: string) => {
        switch (severity) {
            case 'Critical':
                return {
                    badge: 'bg-red-100 text-red-700 border-red-200',
                    dot: 'bg-red-500'
                };
            case 'High':
                return {
                    badge: 'bg-orange-100 text-orange-700 border-orange-200',
                    dot: 'bg-orange-500'
                };
            case 'Medium':
                return {
                    badge: 'bg-yellow-100 text-yellow-700 border-yellow-200',
                    dot: 'bg-yellow-500'
                };
            default:
                return {
                    badge: 'bg-slate-100 text-slate-700 border-slate-200',
                    dot: 'bg-slate-500'
                };
        }
    };

    const getStatusStyles = (status: string) => {
        switch (status) {
            case 'Active':
                return 'bg-brand-rust/10 text-brand-rust border-brand-rust/30';
            case 'Monitoring':
                return 'bg-brand-beige border-brand-orange/40 text-brand-foreground';
            case 'Resolving':
                return 'bg-brand-orange/10 text-brand-foreground border-brand-orange/30';
            default:
                return 'bg-slate-100 text-slate-600 border-slate-200';
        }
    };

    const getCategoryIcon = (category: string) => {
        const iconClass = "w-5 h-5 md:w-7 md:h-7";
        const iconColor = "text-brand-rust";

        switch (category) {
            case 'Flood': return <Waves className={`${iconClass} ${iconColor}`} />;
            case 'Earthquake': return <Home className={`${iconClass} ${iconColor}`} />;
            case 'Cyclone': return <Wind className={`${iconClass} ${iconColor}`} />;
            case 'Landslide': return <Mountain className={`${iconClass} ${iconColor}`} />;
            case 'Drought': return <Sun className={`${iconClass} ${iconColor}`} />;
            case 'Fire': return <Flame className={`${iconClass} ${iconColor}`} />;
            default: return <AlertTriangle className={`${iconClass} ${iconColor}`} />;
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
                        <span className="font-medium">Back</span>
                    </Link>

                    <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
                        <div className="flex-1 space-y-6">
                            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-brand-foreground">
                                Active Disaster Reports
                            </h1>

                            <p className="text-xl text-brand-foreground/70 max-w-2xl font-normal leading-relaxed">
                                Real-time monitoring of disaster situations across regions
                                {loading && <span className="ml-2 text-brand-rust animate-pulse">● Loading live data...</span>}
                            </p>
                        </div>

                        <Link
                            href="/solutions"
                            className="btn-primary group relative px-8 py-4 flex items-center gap-3 text-lg"
                        >
                            <span className="font-semibold">View Available Resources</span>
                            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Stats Overview */}
            <section className="relative px-6 lg:px-12 py-12">
                <div className="max-w-[1400px] mx-auto">
                    {error && (
                        <div className="mb-8 p-4 bg-red-50 text-red-700 border border-red-200 rounded-lg flex items-center gap-2">
                            <AlertTriangle className="w-5 h-5" />
                            <span>{error}</span>
                        </div>
                    )}

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                        {[
                            { label: 'Total Reports', value: loading ? '...' : allProblems.length, sublabel: loading ? 'Loading...' : 'Active cases' },
                            { label: 'Critical', value: loading ? '...' : allProblems.filter((p) => p.severity === 'Critical').length, sublabel: 'High priority' },
                            { label: 'Active Cases', value: loading ? '...' : allProblems.filter((p) => p.status === 'Active').length, sublabel: 'Ongoing' },
                            { label: 'People Affected', value: loading ? '...' : `${(allProblems.reduce((sum, p) => sum + p.affectedPeople, 0) / 1000).toFixed(0)}K`, sublabel: 'Estimated' },
                        ].map((stat, i) => (
                            <div key={i} className="card p-6 flex flex-col items-center text-center md:items-start md:text-left">
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
                        <div className="flex flex-col md:flex-row gap-8">
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-4 text-brand-foreground/70 font-bold uppercase text-xs tracking-wider">
                                    Category
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {categories.map((category) => (
                                        <button
                                            key={category}
                                            onClick={() => setSelectedCategory(category)}
                                            className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${selectedCategory === category
                                                ? 'bg-brand-rust text-white shadow-md'
                                                : 'bg-white border border-brand-orange/20 text-brand-foreground/70 hover:bg-brand-orange/10'
                                                }`}
                                        >
                                            {category}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-4 text-brand-foreground/70 font-bold uppercase text-xs tracking-wider">
                                    Severity
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {severityLevels.map((severity) => (
                                        <button
                                            key={severity}
                                            onClick={() => setSelectedSeverity(severity)}
                                            className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${selectedSeverity === severity
                                                ? 'bg-brand-rust text-white shadow-md'
                                                : 'bg-white border border-brand-orange/20 text-brand-foreground/70 hover:bg-brand-orange/10'
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
                    <div className="space-y-6 bg-brand-beige ">
                        {filteredProblems.map((problem) => {
                            const severityStyle = getSeverityStyles(problem.severity);

                            return (
                                <div
                                    key={problem.id}
                                    className="card p-8 group transition-all bg-white/70 rounded duration-300 hover:shadow-lg border-brand-orange/20    "
                                >
                                    <div className="relative flex flex-col lg:flex-row lg:items-start gap-8">
                                        {/* Left Section */}
                                        <div className="flex-1 space-y-6">
                                            <div className="flex items-start gap-6">
                                                <div className=" rounded  border border-brand-orange/20">
                                                    {getCategoryIcon(problem.category)}
                                                </div>

                                                <div className="flex-1 space-y-3">
                                                    <div className="flex flex-wrap items-center gap-3">
                                                        <h3 className="text-2xl font-bold text-brand-foreground group-hover:text-brand-rust transition-colors">
                                                            {problem.title}
                                                        </h3>

                                                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase border ${getStatusStyles(problem.status)}`}>
                                                            {problem.status}
                                                        </span>
                                                    </div>

                                                    <div className="flex flex-wrap items-center gap-4 text-brand-foreground/60 text-sm font-medium">
                                                        <span className="flex items-center gap-1.5">
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                            </svg>
                                                            {problem.location}
                                                        </span>
                                                        <span className="flex items-center gap-1.5">
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                            </svg>
                                                            {formatDate(problem.dateReported)}
                                                        </span>
                                                        <span className="flex items-center gap-1.5">
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                                            </svg>
                                                            <span className="font-semibold text-brand-foreground">{formatNumber(problem.affectedPeople)}</span> affected
                                                        </span>
                                                    </div>

                                                    <p className="text-brand-foreground/80 leading-relaxed text-lg">
                                                        {problem.description}
                                                    </p>

                                                    <div className="space-y-2 pt-2">
                                                        <div className="text-xs font-bold text-brand-foreground/50 uppercase tracking-wide">Resources Needed</div>
                                                        <div className="flex flex-wrap gap-2">
                                                            {problem.resourcesNeeded.map((resource: string, idx: number) => (
                                                                <span
                                                                    key={idx}
                                                                    className="px-3 py-1.5 bg-brand-orange/10 border border-brand-orange/20 text-brand-brown rounded-md text-sm font-semibold"
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
                                        <div className="flex flex-col gap-4 lg:items-end min-w-[200px]">
                                            <div className={`px-4 py-2 rounded-lg border text-sm font-bold uppercase tracking-wider flex items-center gap-2 ${severityStyle.badge}`}>
                                                <span className={`w-2 h-2 rounded-full ${severityStyle.dot} animate-pulse`}></span>
                                                {problem.severity} Severity
                                            </div>

                                            <div className="flex flex-col gap-3 w-full sm:w-auto">
                                                <Link
                                                    href={`/map?lat=${problem.coordinates.lat}&lng=${problem.coordinates.lng}&title=${encodeURIComponent(problem.title)}&category=${problem.category}&severity=${problem.severity}&location=${encodeURIComponent(problem.location)}`}
                                                    className="btn-secondary w-full flex items-center justify-center gap-2 py-3"
                                                >
                                                    <svg className="w-5 h-5 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    </svg>
                                                    <span>View Location</span>
                                                </Link>

                                                <Link
                                                    href={`/report?location=${encodeURIComponent(problem.location)}&type=${problem.category}&severity=${problem.severity}`}
                                                    className="btn-primary w-full flex items-center justify-center gap-2 py-3 shadow-lg shadow-brand-rust/20"
                                                >
                                                    <span>Respond Now</span>
                                                    <ArrowRight className="w-5 h-5" />
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                    {filteredProblems.length === 0 && (
                        <div className="text-center py-24 bg-white/50 rounded-3xl border border-brand-orange/20 mt-8">
                            <div className="inline-flex justify-center items-center w-24 h-24 rounded-full bg-brand-orange/10 text-brand-orange mb-6">
                                <Search className="w-10 h-10" />
                            </div>
                            <h3 className="text-2xl font-bold text-brand-foreground mb-2">No Problems Found</h3>
                            <p className="text-brand-foreground/60">Try adjusting your filters to see more results</p>
                        </div>
                    )}
                </div>
            </section>
        </main >
    );
}
