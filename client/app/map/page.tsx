'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { MapPin, ArrowLeft, AlertTriangle, Waves, Wind, Flame, Zap, MousePointer2 } from 'lucide-react';
import 'leaflet/dist/leaflet.css';

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
const Circle = dynamic(
    () => import('react-leaflet').then((mod) => mod.Circle),
    { ssr: false }
);

// Component to handle map center updates
const RecenterMap = ({ lat, lng }: { lat: number; lng: number }) => {
    const [map, setMap] = useState<any>(null);

    useEffect(() => {
        if (map) {
            map.flyTo([lat, lng], 10, {
                duration: 2
            });
        }
    }, [lat, lng, map]);

    return (
        <div style={{ display: 'none' }} ref={(ref) => {
            // @ts-ignore
            if (ref && !map) setMap(ref.parentNode?._leaflet_map);
        }} />
    );
};

export default function MapPage() {
    const searchParams = useSearchParams();
    const [mapReady, setMapReady] = useState(false);
    const [L, setL] = useState<any>(null);
    const [dbReports, setDbReports] = useState<any[]>([]);
    const [loadingReports, setLoadingReports] = useState(true);

    const latParam = parseFloat(searchParams.get('lat') || '20.5937');
    const lngParam = parseFloat(searchParams.get('lng') || '78.9629');
    const title = searchParams.get('title') || 'Disaster Location';
    const category = searchParams.get('category') || 'Flood';
    const severity = searchParams.get('severity') || 'High';
    const location = searchParams.get('location') || 'Active Relief Zone';

    useEffect(() => {
        // Import Leaflet on client side
        import('leaflet').then((leaflet) => {
            setL(leaflet.default);
            setMapReady(true);
        });

        // Fetch reports from MongoDB Atlas via GET /api/reports
        const fetchReports = async () => {
            try {
                const res = await fetch('/api/reports');
                const data = await res.json();
                if (res.ok && data.success && Array.isArray(data.data)) {
                    setDbReports(data.data);
                }
            } catch (err) {
                console.error('Failed to fetch reports for map:', err);
            } finally {
                setLoadingReports(false);
            }
        };

        fetchReports();
    }, []);

    const getSeverityColor = (severity: string) => {
        switch (severity) {
            case 'Critical': return 'from-red-500 to-rose-600';
            case 'High': return 'from-orange-500 to-amber-600';
            case 'Medium': return 'from-yellow-500 to-amber-500';
            default: return 'from-blue-500 to-cyan-500';
        }
    };

    const getSeverityHexColor = (severity: string) => {
        switch (severity) {
            case 'Critical': return '#ef4444'; // red-500
            case 'High': return '#f97316'; // orange-500
            case 'Medium': return '#eab308'; // yellow-500
            default: return '#3b82f6'; // blue-500
        }
    };

    const getRadius = (severity: string) => {
        switch (severity) {
            case 'Critical': return 15000;
            case 'High': return 10000;
            case 'Medium': return 5000;
            default: return 2000;
        }
    };

    const getCategoryIconHtml = (cat: string, sev: string = 'High') => {
        const icons: Record<string, string> = {
            Flood: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/></svg>',
            Fire: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.1.2-2.2.5-3.3a9 9 0 0 0 3 3.3z"/></svg>',
            Storm: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2"/><path d="M9.6 4.6A2 2 0 1 1 11 8H2"/><path d="M12.6 19.4A2 2 0 1 0 14 16H2"/></svg>',
            Earthquake: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m2 10 4 3 3-5 5 7 4-4 4 3"/></svg>',
            Default: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>'
        };

        const svg = icons[cat] || icons.Default;
        const color = getSeverityHexColor(sev);

        return `
            <div class="relative flex items-center justify-center w-10 h-10 transform -translate-x-1/2 -translate-y-1/2">
                <div class="absolute inset-0 bg-${sev === 'Critical' ? 'red' : sev === 'High' ? 'orange' : 'yellow'}-500/30 rounded-full animate-ping"></div>
                <div class="absolute inset-0 bg-white rounded-full shadow-lg flex items-center justify-center" style="border: 2px solid ${color}">
                    <div style="color: ${color}">
                        ${svg}
                    </div>
                </div>
            </div>
        `;
    };

    const createCustomIcon = (cat: string = category, sev: string = severity) => {
        if (!L) return null;
        return L.divIcon({
            className: 'custom-map-icon',
            html: getCategoryIconHtml(cat, sev),
            iconSize: [40, 40],
            iconAnchor: [20, 20],
            popupAnchor: [0, -20]
        });
    };

    // Center map on search param coordinates or first database report
    const mapCenterLat = dbReports.length > 0 && searchParams.get('lat') === null ? dbReports[0].latitude : latParam;
    const mapCenterLng = dbReports.length > 0 && searchParams.get('lng') === null ? dbReports[0].longitude : lngParam;

    return (
        <main className="relative min-h-screen bg-brand-beige overflow-hidden">
            {/* Header */}
            <section className="relative pt-24 pb-6 px-6 lg:px-12 z-10 pointer-events-none">
                <div className="max-w-[1400px] mx-auto pointer-events-auto">
                    <Link
                        href="/problems"
                        className="group inline-flex items-center gap-2 mb-6 px-4 py-2 bg-white/40 hover:bg-white backdrop-blur-md rounded-full text-brand-foreground/70 hover:text-brand-rust transition-all duration-300 border border-brand-orange/10 hover:border-brand-orange/30 shadow-sm"
                    >
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
                        <span className="font-medium">Back to Problems</span>
                    </Link>

                    <div className="grid md:grid-cols-2 gap-6 items-end">
                        <div>
                            <div className="flex items-center gap-4 mb-4">
                                <div className={`p-4 rounded-2xl bg-gradient-to-br ${getSeverityColor(severity)} shadow-lg`}>
                                    <AlertTriangle className="w-8 h-8 text-white" />
                                </div>
                                <div>
                                    <div className="flex items-center gap-3 mb-1">
                                        <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-brand-foreground">
                                            Disaster Live Map
                                        </h1>
                                        <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border shadow-sm bg-green-100 text-green-700 border-green-200">
                                            {dbReports.length} Active Records
                                        </span>
                                    </div>
                                    <p className="text-xl text-brand-foreground/70">Real-time incident reports & response tracking from MongoDB Atlas</p>
                                </div>
                            </div>
                        </div>

                        <div className="md:text-right">
                            <div className="inline-block p-4 bg-white/60 backdrop-blur-xl border border-brand-orange/20 rounded-2xl shadow-sm">
                                <p className="text-sm text-brand-foreground/50 uppercase tracking-widest font-bold mb-1">Center Coordinates</p>
                                <p className="text-xl font-mono text-brand-foreground/90">
                                    {mapCenterLat.toFixed(4)}°N, {mapCenterLng.toFixed(4)}°E
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Map Section */}
            <section className="relative flex-1 h-[calc(100vh-300px)] min-h-[500px] w-full px-6 lg:px-12">
                <div className="max-w-[1400px] mx-auto h-full">
                    <div className="relative w-full h-full rounded-3xl overflow-hidden border border-brand-orange/20 shadow-2xl bg-brand-beige/50">
                        {mapReady && L ? (
                            <MapContainer
                                center={[mapCenterLat, mapCenterLng]}
                                zoom={6}
                                scrollWheelZoom={true}
                                style={{ height: '100%', width: '100%' }}
                                className="z-0"
                            >
                                <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />

                                {/* Render dynamic markers from MongoDB Atlas */}
                                {dbReports.map((report) => (
                                    <div key={report._id}>
                                        <Circle
                                            center={[report.latitude, report.longitude]}
                                            pathOptions={{
                                                color: getSeverityHexColor(severity),
                                                fillColor: getSeverityHexColor(severity),
                                                fillOpacity: 0.2,
                                                weight: 1
                                            }}
                                            radius={getRadius(severity)}
                                        />
                                        <Marker
                                            position={[report.latitude, report.longitude]}
                                            icon={createCustomIcon(report.type, severity)}
                                        >
                                            <Popup className="custom-popup">
                                                <div className="p-2 max-w-xs">
                                                    <h3 className="font-bold text-lg mb-1 text-gray-900">{report.title}</h3>
                                                    <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-gray-500 mb-2">
                                                        <span className="px-2 py-0.5 bg-brand-orange/10 text-brand-rust rounded">{report.type}</span>
                                                        <span>•</span>
                                                        <span className="text-emerald-600 font-bold">{report.status}</span>
                                                    </div>
                                                    <p className="text-xs text-gray-700 leading-relaxed whitespace-pre-line">
                                                        {report.description}
                                                    </p>
                                                    <p className="text-[10px] text-gray-400 mt-2">
                                                        Reported: {new Date(report.createdAt).toLocaleString()}
                                                    </p>
                                                </div>
                                            </Popup>
                                        </Marker>
                                    </div>
                                ))}

                                {/* Fallback default marker if URL param coordinates provided and no DB reports yet */}
                                {dbReports.length === 0 && (
                                    <Marker position={[latParam, lngParam]} icon={createCustomIcon(category, severity)}>
                                        <Popup className="custom-popup">
                                            <div className="p-1">
                                                <h3 className="font-bold text-lg mb-1 text-gray-900">{title}</h3>
                                                <div className="flex gap-2 text-xs font-medium uppercase tracking-wide text-gray-500 mb-2">
                                                    <span>{category}</span>
                                                    <span>•</span>
                                                    <span style={{ color: getSeverityHexColor(severity) }}>{severity} Severity</span>
                                                </div>
                                                <p className="text-sm text-gray-700 leading-relaxed mb-2">
                                                    Active alert in {location}.
                                                </p>
                                            </div>
                                        </Popup>
                                    </Marker>
                                )}

                                <RecenterMap lat={mapCenterLat} lng={mapCenterLng} />
                            </MapContainer>
                        ) : (
                            <div className="flex items-center justify-center h-full bg-white/40 backdrop-blur-xl">
                                <div className="text-center">
                                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-rust mx-auto mb-4"></div>
                                    <p className="text-brand-foreground/60">Initializing satellite data...</p>
                                </div>
                            </div>
                        )}

                        {/* Overlay Controls */}
                        <div className="absolute top-4 right-4 z-[1000] flex flex-col gap-2">
                            <div className="px-4 py-2 bg-white/90 backdrop-blur text-brand-foreground/70 text-xs rounded-lg border border-brand-orange/10 shadow-lg font-medium">
                                Live Feeds Active
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Request Support Section */}
            <section className="relative px-6 lg:px-12 pb-16 pt-8">
                <div className="max-w-[1400px] mx-auto">
                    <div className="card p-8 bg-white/70">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                            <div className="flex-1">
                                <h2 className="text-3xl font-bold text-brand-foreground mb-3">
                                    Need Support for This Area?
                                </h2>
                                <p className="text-brand-foreground/70 text-lg leading-relaxed">
                                    Submit a support request or report assistance already provided to this disaster-affected region.
                                    Help coordinate relief efforts more effectively.
                                </p>
                            </div>
                            <div className="flex flex-col gap-3 w-full md:w-auto">
                                <Link
                                    href={`/report?location=${encodeURIComponent(location)}&type=${category}&severity=${severity}&lat=${mapCenterLat}&lng=${mapCenterLng}`}
                                    className="btn-primary flex items-center justify-center gap-3 px-8 py-4 text-lg shadow-lg shadow-brand-rust/20 whitespace-nowrap"
                                >
                                    <AlertTriangle className="w-6 h-6" />
                                    <span className="font-semibold">Request Support</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
