'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { MapPin, ArrowLeft } from 'lucide-react';

// Dynamically import map components to avoid SSR issues
const MapContainer = dynamic(
    () => import('react-leaflet').then((mod) => mod.MapContainer),
    { ssr: false }
);
const TileLayer = dynamic(
    () => import('react-leaflet').then((mod) => mod.TileLayer),
    { ssr: false }
);
const Marker = dynamic(
    () => import('react-leaflet').then((mod) => mod.Marker),
    { ssr: false }
);
const Popup = dynamic(
    () => import('react-leaflet').then((mod) => mod.Popup),
    { ssr: false }
);

export default function MapPage() {
    const searchParams = useSearchParams();
    const [mapReady, setMapReady] = useState(false);

    const lat = parseFloat(searchParams.get('lat') || '0');
    const lng = parseFloat(searchParams.get('lng') || '0');
    const title = searchParams.get('title') || 'Disaster Location';
    const category = searchParams.get('category') || 'Unknown';
    const severity = searchParams.get('severity') || 'Medium';
    const location = searchParams.get('location') || 'Unknown Location';

    useEffect(() => {
        setMapReady(true);
    }, []);

    const getSeverityColor = (severity: string) => {
        switch (severity) {
            case 'Critical':
                return 'from-red-500 to-rose-500';
            case 'High':
                return 'from-orange-500 to-amber-500';
            case 'Medium':
                return 'from-yellow-500 to-yellow-600';
            default:
                return 'from-gray-500 to-gray-600';
        }
    };

    return (
        <main className="relative min-h-screen bg-black overflow-hidden">
            {/* Gradient Orbs Background */}
            <div className="fixed inset-0 -z-10 overflow-hidden">
                <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-gradient-to-br from-indigo-500/30 via-violet-500/20 to-transparent rounded-full blur-3xl animate-pulse" />
                <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-gradient-to-br from-cyan-500/20 via-teal-500/10 to-transparent rounded-full blur-3xl animate-pulse delay-1000" />
            </div>

            {/* Header */}
            <section className="relative pt-24 pb-6 px-6 lg:px-12">
                <div className="max-w-[1400px] mx-auto">
                    <Link
                        href="/problems"
                        className="group inline-flex items-center gap-2 mb-6 text-white/60 hover:text-white transition-all duration-300"
                    >
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
                        <span className="font-medium">Back to Problems</span>
                    </Link>

                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl">
                            <MapPin className="w-8 h-8 text-violet-400" />
                        </div>
                        <div>
                            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
                                Disaster Location
                            </h1>
                            <p className="text-lg text-white/60 mt-1">{location}</p>
                        </div>
                    </div>

                    {/* Disaster Info Card */}
                    <div className="p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl mb-6">
                        <div className="flex flex-wrap items-center gap-4">
                            <h2 className="text-2xl font-bold text-white">{title}</h2>
                            <span className={`px-4 py-2 bg-gradient-to-r ${getSeverityColor(severity)} rounded-xl text-white font-bold text-sm`}>
                                {severity}
                            </span>
                            <span className="px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white/80 font-medium text-sm">
                                {category}
                            </span>
                        </div>
                        <div className="mt-4 text-white/60">
                            <p className="flex items-center gap-2">
                                <MapPin className="w-4 h-4" />
                                Coordinates: {lat.toFixed(4)}°N, {lng.toFixed(4)}°E
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Map Section */}
            <section className="relative px-6 lg:px-12 pb-12">
                <div className="max-w-[1400px] mx-auto">
                    <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl" style={{ height: '600px' }}>
                        {mapReady && typeof window !== 'undefined' ? (
                            <MapContainer
                                center={[lat, lng]}
                                zoom={10}
                                style={{ height: '100%', width: '100%' }}
                                className="z-0"
                            >
                                <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                <Marker position={[lat, lng]}>
                                    <Popup>
                                        <div className="p-2">
                                            <h3 className="font-bold text-lg mb-1">{title}</h3>
                                            <p className="text-sm text-gray-600 mb-1">{location}</p>
                                            <p className="text-xs">
                                                <strong>Category:</strong> {category}
                                            </p>
                                            <p className="text-xs">
                                                <strong>Severity:</strong> {severity}
                                            </p>
                                        </div>
                                    </Popup>
                                </Marker>
                            </MapContainer>
                        ) : (
                            <div className="flex items-center justify-center h-full bg-white/5 backdrop-blur-xl">
                                <div className="text-center">
                                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-500 mx-auto mb-4"></div>
                                    <p className="text-white/60">Loading map...</p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Map Controls Info */}
                    <div className="mt-6 p-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl">
                        <p className="text-sm text-white/60 text-center">
                            <strong className="text-white">Tip:</strong> Use mouse wheel to zoom, click and drag to move the map
                        </p>
                    </div>
                </div>
            </section>
        </main>
    );
}
