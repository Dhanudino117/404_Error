'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, FileText, Send, CheckCircle, AlertCircle, Package, Users, MapPin, Phone, Mail } from 'lucide-react';

type RequestType = 'request_support' | 'report_assistance';

// Common resource options
const RESOURCE_OPTIONS = [
    'Food Supplies',
    'Water & Beverages',
    'Medical Equipment',
    'Medicines',
    'Clothing',
    'Blankets & Bedding',
    'Tents & Shelters',
    'Rescue Equipment',
    'Communication Devices',
    'Power Generators',
    'First Aid Kits',
    'Sanitation Supplies',
];

export default function ReportPage() {
    const searchParams = useSearchParams();
    const [requestType, setRequestType] = useState<RequestType>('request_support');
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Checkbox selections for resources
    const [selectedResources, setSelectedResources] = useState<string[]>([]);
    const [otherResources, setOtherResources] = useState('');

    const [formData, setFormData] = useState({
        organizationName: '',
        contactPerson: '',
        email: '',
        phone: '',
        disasterLocation: '',
        disasterType: '',
        urgency: 'Medium',
        description: '',
        affectedPeople: '',
        latitude: '20.5937',
        longitude: '78.9629',
    });

    // Auto-fill form from URL parameters
    useEffect(() => {
        const orgName = searchParams.get('orgName');
        const orgEmail = searchParams.get('orgEmail');
        const orgPhone = searchParams.get('orgPhone');
        const location = searchParams.get('location');
        const type = searchParams.get('type');
        const severity = searchParams.get('severity');
        const latParam = searchParams.get('lat');
        const lngParam = searchParams.get('lng');

        setFormData(prev => ({
            ...prev,
            ...(orgName && { organizationName: orgName }),
            ...(orgEmail && { email: orgEmail }),
            ...(orgPhone && { phone: orgPhone }),
            ...(location && { disasterLocation: location }),
            ...(type && { disasterType: type }),
            ...(severity && { urgency: severity }),
            ...(latParam && { latitude: latParam }),
            ...(lngParam && { longitude: lngParam }),
        }));
    }, [searchParams]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleResourceToggle = (resource: string) => {
        setSelectedResources(prev =>
            prev.includes(resource)
                ? prev.filter(r => r !== resource)
                : [...prev, resource]
        );
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            // Combine selected resources with other resources
            const allResources = [...selectedResources];
            if (otherResources.trim()) {
                allResources.push(otherResources.trim());
            }
            const resourcesString = allResources.join(', ');

            // 1. Save Report to MongoDB Atlas via POST /api/reports
            const reportPayload = {
                title: `${formData.disasterType || 'Disaster'} Incident - ${formData.disasterLocation || 'Unknown Location'}`,
                description: `${formData.description}\n\nOrganization: ${formData.organizationName} (${formData.contactPerson})\nContact: ${formData.email} | ${formData.phone}\nUrgency: ${formData.urgency}\nResources: ${resourcesString}`,
                type: formData.disasterType || 'Other',
                status: 'Active',
                latitude: parseFloat(formData.latitude) || 20.5937,
                longitude: parseFloat(formData.longitude) || 78.9629,
            };

            const dbResponse = await fetch('/api/reports', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(reportPayload),
            });

            const dbData = await dbResponse.json();

            if (!dbResponse.ok || !dbData.success) {
                throw new Error(dbData.message || 'Failed to save incident report to MongoDB');
            }

            // 2. Optionally trigger email notification
            try {
                await fetch('/api/send-email', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        requestType,
                        ...formData,
                        resourcesNeeded: requestType === 'request_support' ? resourcesString : '',
                        resourcesProvided: requestType === 'report_assistance' ? resourcesString : '',
                    }),
                });
            } catch (emailErr) {
                console.warn('Email dispatch warning:', emailErr);
            }

            console.log('Report successfully saved to MongoDB Atlas:', dbData.data);
            setSubmitted(true);

            // Reset form after 5 seconds
            setTimeout(() => {
                setSubmitted(false);
                setSelectedResources([]);
                setOtherResources('');
                setFormData({
                    organizationName: '',
                    contactPerson: '',
                    email: '',
                    phone: '',
                    disasterLocation: '',
                    disasterType: '',
                    urgency: 'Medium',
                    description: '',
                    affectedPeople: '',
                    latitude: '20.5937',
                    longitude: '78.9629',
                });
            }, 5000);
        } catch (err: any) {
            console.error('Error submitting form:', err);
            setError(err.message || 'Failed to submit the request. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="relative min-h-screen bg-brand-beige overflow-hidden">
            {/* Header */}
            <section className="relative pt-32 pb-16 px-6 lg:px-12 bg-white/40 border-b border-brand-orange/10">
                <div className="max-w-[1000px] mx-auto">
                    <Link href="/problems" className="group inline-flex items-center gap-2 mb-8 text-brand-foreground/60 hover:text-brand-rust transition-all duration-300">
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
                        <span className="font-medium">Back to Problems</span>
                    </Link>

                    <div className="space-y-6">
                        <div className="flex items-center gap-4">

                            <div>
                                <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-brand-foreground">
                                    Support Request & Reporting
                                </h1>
                            </div>
                        </div>

                        <p className="text-xl text-brand-foreground/70 max-w-2xl font-normal leading-relaxed">
                            Submit disaster support requests or report assistance provided to affected areas.
                            Simply choose your request type, fill in the details, and select resources from the list.
                        </p>
                    </div>
                </div>
            </section>

            {/* Request Type Selection */}
            <section className="relative px-6 lg:px-12 py-12">
                <div className="max-w-[1000px] mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
                        <button
                            onClick={() => setRequestType('request_support')}
                            className={`p-6 rounded-2xl border-2 transition-all duration-300 ${requestType === 'request_support'
                                ? 'bg-brand-rust text-white border-brand-rust shadow-lg'
                                : 'bg-white/70 text-brand-foreground border-brand-orange/20 hover:border-brand-orange/50'
                                }`}
                        >
                            <AlertCircle className="w-8 h-8 mb-3" />
                            <h3 className="text-xl font-bold mb-2">Request Support</h3>
                            <p className={`text-sm ${requestType === 'request_support' ? 'text-white/80' : 'text-brand-foreground/60'}`}>
                                Request resources and support for disaster-affected areas
                            </p>
                        </button>

                        <button
                            onClick={() => setRequestType('report_assistance')}
                            className={`p-6 rounded-2xl border-2 transition-all duration-300 ${requestType === 'report_assistance'
                                ? 'bg-brand-rust text-white border-brand-rust shadow-lg'
                                : 'bg-white/70 text-brand-foreground border-brand-orange/20 hover:border-brand-orange/50'
                                }`}
                        >
                            <CheckCircle className="w-8 h-8 mb-3" />
                            <h3 className="text-xl font-bold mb-2">Report Assistance</h3>
                            <p className={`text-sm ${requestType === 'report_assistance' ? 'text-white/80' : 'text-brand-foreground/60'}`}>
                                Report support and resources already provided to affected areas
                            </p>
                        </button>
                    </div>

                    {/* Form */}
                    <div className="card p-8 md:p-12 bg-white/70">
                        {error && (
                            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3 text-red-700">
                                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                                <span>{error}</span>
                            </div>
                        )}

                        {submitted ? (
                            <div className="text-center py-16">
                                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 text-green-600 mb-6">
                                    <CheckCircle className="w-10 h-10" />
                                </div>
                                <h3 className="text-3xl font-bold text-brand-foreground mb-3">
                                    {requestType === 'request_support' ? 'Request Submitted!' : 'Report Submitted!'}
                                </h3>
                                <p className="text-brand-foreground/60 text-lg mb-2">
                                    Thank you for your submission. Email notifications have been sent.
                                </p>
                                <p className="text-brand-foreground/50 text-sm">
                                    Check your inbox for confirmation details.
                                </p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-8">
                                {/* Organization Details */}
                                <div className="space-y-6">
                                    <h2 className="text-2xl font-bold text-brand-foreground pb-2 border-b border-brand-orange/20">
                                        Organization Details
                                    </h2>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="flex items-center gap-2 text-brand-foreground/70 font-semibold text-sm">
                                                <Users className="w-4 h-4" />
                                                Organization Name *
                                            </label>
                                            <input
                                                type="text"
                                                name="organizationName"
                                                value={formData.organizationName}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full px-4 py-3 rounded-lg border border-brand-orange/20 bg-white/50 focus:bg-white focus:border-brand-rust focus:outline-none transition-all"
                                                placeholder="e.g., Red Cross India"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="flex items-center gap-2 text-brand-foreground/70 font-semibold text-sm">
                                                <Users className="w-4 h-4" />
                                                Contact Person *
                                            </label>
                                            <input
                                                type="text"
                                                name="contactPerson"
                                                value={formData.contactPerson}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full px-4 py-3 rounded-lg border border-brand-orange/20 bg-white/50 focus:bg-white focus:border-brand-rust focus:outline-none transition-all"
                                                placeholder="Full name"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="flex items-center gap-2 text-brand-foreground/70 font-semibold text-sm">
                                                <Mail className="w-4 h-4" />
                                                Email Address *
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full px-4 py-3 rounded-lg border border-brand-orange/20 bg-white/50 focus:bg-white focus:border-brand-rust focus:outline-none transition-all"
                                                placeholder="contact@organization.org"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="flex items-center gap-2 text-brand-foreground/70 font-semibold text-sm">
                                                <Phone className="w-4 h-4" />
                                                Phone Number *
                                            </label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full px-4 py-3 rounded-lg border border-brand-orange/20 bg-white/50 focus:bg-white focus:border-brand-rust focus:outline-none transition-all"
                                                placeholder="+91 XXXXX XXXXX"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Disaster Information */}
                                <div className="space-y-6">
                                    <h2 className="text-2xl font-bold text-brand-foreground pb-2 border-b border-brand-orange/20">
                                        Disaster Information
                                    </h2>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="flex items-center gap-2 text-brand-foreground/70 font-semibold text-sm">
                                                <MapPin className="w-4 h-4" />
                                                Disaster Location *
                                            </label>
                                            <input
                                                type="text"
                                                name="disasterLocation"
                                                value={formData.disasterLocation}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full px-4 py-3 rounded-lg border border-brand-orange/20 bg-white/50 focus:bg-white focus:border-brand-rust focus:outline-none transition-all"
                                                placeholder="City, State, Country"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="flex items-center gap-2 text-brand-foreground/70 font-semibold text-sm">
                                                <AlertCircle className="w-4 h-4" />
                                                Disaster Type *
                                            </label>
                                            <select
                                                name="disasterType"
                                                value={formData.disasterType}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full px-4 py-3 rounded-lg border border-brand-orange/20 bg-white/50 focus:bg-white focus:border-brand-rust focus:outline-none transition-all"
                                            >
                                                <option value="">Select type</option>
                                                <option value="Flood">Flood</option>
                                                <option value="Earthquake">Earthquake</option>
                                                <option value="Cyclone">Cyclone</option>
                                                <option value="Landslide">Landslide</option>
                                                <option value="Drought">Drought</option>
                                                <option value="Fire">Fire</option>
                                                <option value="Other">Other</option>
                                            </select>
                                        </div>

                                        {requestType === 'request_support' && (
                                            <div className="space-y-2">
                                                <label className="flex items-center gap-2 text-brand-foreground/70 font-semibold text-sm">
                                                    <AlertCircle className="w-4 h-4" />
                                                    Urgency Level *
                                                </label>
                                                <select
                                                    name="urgency"
                                                    value={formData.urgency}
                                                    onChange={handleInputChange}
                                                    required
                                                    className="w-full px-4 py-3 rounded-lg border border-brand-orange/20 bg-white/50 focus:bg-white focus:border-brand-rust focus:outline-none transition-all"
                                                >
                                                    <option value="Critical">Critical - Immediate Response</option>
                                                    <option value="High">High - Within 24 hours</option>
                                                    <option value="Medium">Medium - Within 72 hours</option>
                                                    <option value="Low">Low - Within a week</option>
                                                </select>
                                            </div>
                                        )}

                                        <div className="space-y-2">
                                            <label className="flex items-center gap-2 text-brand-foreground/70 font-semibold text-sm">
                                                <Users className="w-4 h-4" />
                                                Estimated People Affected
                                            </label>
                                            <input
                                                type="number"
                                                name="affectedPeople"
                                                value={formData.affectedPeople}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 rounded-lg border border-brand-orange/20 bg-white/50 focus:bg-white focus:border-brand-rust focus:outline-none transition-all"
                                                placeholder="Number of people"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Resources Section */}
                                <div className="space-y-6">
                                    <h2 className="text-2xl font-bold text-brand-foreground pb-2 border-b border-brand-orange/20">
                                        {requestType === 'request_support' ? 'Resources Needed' : 'Resources Provided'}
                                    </h2>

                                    <div className="space-y-4">
                                        <label className="flex items-center gap-2 text-brand-foreground/70 font-semibold text-sm">
                                            <Package className="w-4 h-4" />
                                            Select all that apply *
                                        </label>

                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                            {RESOURCE_OPTIONS.map((resource) => (
                                                <label
                                                    key={resource}
                                                    className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${selectedResources.includes(resource)
                                                        ? 'bg-brand-rust/10 border-brand-rust text-brand-rust'
                                                        : 'bg-white/50 border-brand-orange/20 text-brand-foreground/70 hover:bg-brand-orange/5'
                                                        }`}
                                                >
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedResources.includes(resource)}
                                                        onChange={() => handleResourceToggle(resource)}
                                                        className="w-5 h-5 rounded border-brand-orange/30 text-brand-rust focus:ring-brand-rust focus:ring-offset-0"
                                                    />
                                                    <span className="font-medium text-sm">{resource}</span>
                                                </label>
                                            ))}
                                        </div>

                                        <div className="space-y-2 pt-2">
                                            <label className="flex items-center gap-2 text-brand-foreground/70 font-semibold text-sm">
                                                <Package className="w-4 h-4" />
                                                Other Resources
                                            </label>
                                            <input
                                                type="text"
                                                value={otherResources}
                                                onChange={(e) => setOtherResources(e.target.value)}
                                                className="w-full px-4 py-3 rounded-lg border border-brand-orange/20 bg-white/50 focus:bg-white focus:border-brand-rust focus:outline-none transition-all"
                                                placeholder="Specify any other resources not listed above"
                                            />
                                        </div>

                                        {selectedResources.length === 0 && !otherResources && (
                                            <p className="text-sm text-brand-foreground/50 italic">
                                                * Please select at least one resource or specify in "Other Resources"
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Additional Details */}
                                <div className="space-y-6">
                                    <h2 className="text-2xl font-bold text-brand-foreground pb-2 border-b border-brand-orange/20">
                                        Additional Details
                                    </h2>

                                    <div className="space-y-2">
                                        <label className="flex items-center gap-2 text-brand-foreground/70 font-semibold text-sm">
                                            <FileText className="w-4 h-4" />
                                            Description *
                                        </label>
                                        <textarea
                                            name="description"
                                            value={formData.description}
                                            onChange={handleInputChange}
                                            required
                                            rows={6}
                                            className="w-full px-4 py-3 rounded-lg border border-brand-orange/20 bg-white/50 focus:bg-white focus:border-brand-rust focus:outline-none transition-all resize-none"
                                            placeholder={
                                                requestType === 'request_support'
                                                    ? 'Describe the current situation, specific needs, and any urgent requirements...'
                                                    : 'Describe the assistance provided, when it was delivered, and the impact...'
                                            }
                                        />
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <div className="flex gap-4 pt-4">
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className={`btn-primary flex-1 flex items-center justify-center gap-3 py-4 text-lg shadow-lg shadow-brand-rust/20 ${loading ? 'opacity-70 cursor-not-allowed' : ''
                                            }`}
                                    >
                                        {loading ? (
                                            <>
                                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                <span>Sending...</span>
                                            </>
                                        ) : (
                                            <>
                                                <Send className="w-5 h-5" />
                                                <span>
                                                    {requestType === 'request_support' ? 'Submit Support Request' : 'Submit Assistance Report'}
                                                </span>
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </section>
        </main>
    );
}
