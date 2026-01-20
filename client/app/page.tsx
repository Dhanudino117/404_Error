import Link from "next/link";
import { ArrowRight, Activity, Users, Shield, Globe, HeartHandshake, Map } from "lucide-react";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 lg:px-12 bg-brand-beige relative overflow-hidden">
        {/* Background blobs for texture */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[600px] h-[600px] bg-brand-orange/10 rounded-full blur-3xl z-0"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[500px] h-[500px] bg-brand-rust/5 rounded-full blur-3xl z-0"></div>

        <div className="max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
          <div className="space-y-8">
            {/* <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-orange/10 border border-brand-orange/20 rounded-full text-brand-rust text-sm font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-rust opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-rust"></span>
              </span>
              Live Disaster Coordination Platform
            </div> */}

            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-brand-foreground leading-[1.1]">
              Rapid Response.<br />
              <span className="text-brand-rust">Unified Relief.</span>
            </h1>

            <p className="text-xl text-brand-foreground/70 leading-relaxed max-w-xl">
              Connecting affected communities with government agencies, NGOs, and volunteers for faster, more effective disaster response.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/problems"
                className="btn-primary flex items-center gap-2 px-6 py-3 text-lg"
              >
                View Active Disasters
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/solutions"
                className="btn-secondary px-6 py-3 text-lg"
              >
                Find Resources
              </Link>
            </div>

            <div className="pt-8 border-t border-brand-orange/10 flex gap-8">
              <div>
                <div className="text-3xl font-bold text-brand-foreground">500+</div>
                <div className="text-brand-foreground/60">Volunteers</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-brand-foreground">50+</div>
                <div className="text-brand-foreground/60">Organizations</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-brand-foreground">24/7</div>
                <div className="text-brand-foreground/60">Active Monitoring</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-square rounded-2xl bg-white/40 border border-brand-orange/20 p-8 flex items-center justify-center backdrop-blur-sm">
              {/* Abstract visualization or placeholder for real image */}
              <div className="grid grid-cols-2 gap-4 w-full h-full opacity-80">
                <div className="bg-brand-rust/20 rounded-xl w-full h-2/3 self-end animate-pulse"></div>
                <div className="bg-brand-orange/10 rounded-xl w-full h-full"></div>
                <div className="bg-brand-orange/20 rounded-xl w-full h-full"></div>
                <div className="bg-brand-rust/10 rounded-xl w-full h-3/4 animate-pulse delay-100"></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white/90 backdrop-blur border border-brand-orange/20 p-6 rounded-2xl shadow-xl max-w-xs text-center">
                  <div className="w-12 h-12 bg-brand-orange/20 text-brand-rust rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-xl font-bold">RS</span>
                  </div>
                  <h3 className="font-bold text-brand-foreground mb-1">Response Verified</h3>
                  <p className="text-sm text-brand-foreground/60">Resources successfully deployed to Kerala Flood Zone via ReliefSync.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-white/50 px-6 lg:px-12 border-y border-brand-orange/10">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-brand-foreground mb-4">Streamlining Disaster Management</h2>
            <p className="text-brand-foreground/70 text-lg">
              A centralized platform that brings order to chaos, ensuring help reaches where it's needed most efficiently.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/70 p-8 rounded-xl border border-brand-orange/10 shadow-sm hover:shadow-md transition-shadow">
              
              <h3 className="text-xl font-bold text-brand-foreground mb-3">Real-time Coordination</h3>
              <p className="text-brand-foreground/70 leading-relaxed">
                Live maps and data feeds provide a clear operational picture, allowing agencies to synchronize efforts instantly.
              </p>
            </div>
            <div className="bg-white/70 p-8 rounded-xl border border-brand-orange/10 shadow-sm hover:shadow-md transition-shadow">
            
              <h3 className="text-xl font-bold text-brand-foreground mb-3">Resource Matching</h3>
              <p className="text-brand-foreground/70 leading-relaxed">
                Smart algorithms match specific needs (food, medical, shelter) with available resources from verified NGOs.
              </p>
            </div>
            <div className="bg-white/70 p-8 rounded-xl border border-brand-orange/10 shadow-sm hover:shadow-md transition-shadow">
              
              <h3 className="text-xl font-bold text-brand-foreground mb-3">Rapid Deployment</h3>
              <p className="text-brand-foreground/70 leading-relaxed">
                Automated alerts and optimized routing help volunteer teams reach affected areas in record time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 px-6 lg:px-12 bg-brand-beige">
        <div className="max-w-4xl mx-auto bg-brand-rust rounded-2xl p-12 text-center shadow-2xl shadow-brand-rust/20 overflow-hidden relative">
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-beige mb-6">Ready to make a difference?</h2>
            <p className="text-brand-orange text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of volunteers and organizations already using ReliefSync to save lives.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/authentication" className="px-8 py-3 bg-brand-beige hover:bg-white text-brand-rust rounded-lg font-bold transition-colors shadow-lg">
                Sign Up Now
              </Link>
              <Link href="/problems" className="px-8 py-3 bg-transparent border border-brand-beige hover:bg-brand-beige/10 text-brand-beige rounded-lg font-bold transition-colors">
                View Live Map
              </Link>
            </div>
          </div>

          {/* Design circle */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full opacity-50"></div>
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-white/10 rounded-full opacity-50"></div>
        </div>
      </section>
    </main>
  );
}
