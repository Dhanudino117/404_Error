import { Unplug, FileText, AlertTriangle, X, Globe, BarChart3, Handshake, Zap, Target, RotateCcw } from 'lucide-react';

export default function Home() {
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

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-6 lg:px-12">
        <div className="max-w-[1400px] mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full mb-8">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
            <span className="text-sm font-semibold text-white/80">Real-time Disaster Response Platform</span>
          </div>

          <h1 className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tighter text-balance">
            <span className="bg-gradient-to-br from-white via-white to-white/60 bg-clip-text text-transparent">
              Coordinate Relief Efforts,
            </span>
            <br />
            <span className="bg-gradient-to-r from-violet-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              Save Lives Faster
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-white/60 max-w-3xl mx-auto leading-relaxed">
            A unified platform connecting government agencies, NGOs, and relief organizations to coordinate disaster response in real-time.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-8">
            <a
              href="#get-started"
              className="group/btn relative px-8 py-4 bg-gradient-to-r from-violet-500 to-indigo-600 hover:from-violet-600 hover:to-indigo-700 rounded-2xl font-bold text-white transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-violet-500/50 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-200%] group-hover/btn:translate-x-[200%] transition-transform duration-1000" />
              <span className="relative">Get Started Now</span>
            </a>
            <a
              href="#features"
              className="px-8 py-4 bg-white/5 hover:bg-white/10 backdrop-blur-xl border border-white/20 hover:border-white/30 rounded-2xl font-bold text-white transition-all duration-300"
            >
              Explore Features
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 pt-16 max-w-3xl mx-auto">
            {[
              { value: '10x', label: 'Faster Response' },
              { value: 'Real-time', label: 'Data Updates' },
              { value: '100%', label: 'Coordinated' },
            ].map((stat, i) => (
              <div key={i} className="space-y-2">
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-sm text-white/60 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section id="problem" className="relative py-24 px-6 lg:px-12">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-5xl md:text-6xl font-bold tracking-tight">
              <span className="bg-gradient-to-br from-white via-white to-white/60 bg-clip-text text-transparent">
                The Crisis in Disaster Response
              </span>
            </h2>
            <p className="text-xl text-white/60 max-w-2xl mx-auto">
              Current systems are fragmented, slow, and inefficient—costing precious time and lives
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <Unplug className="w-12 h-12" />, title: 'Isolated Systems', desc: 'NGOs and agencies operate on disconnected platforms' },
              { icon: <FileText className="w-12 h-12" />, title: 'Manual Processes', desc: 'Data sharing is slow and error-prone' },
              { icon: <AlertTriangle className="w-12 h-12" />, title: 'Poor Allocation', desc: 'Resources are wasted due to lack of visibility' },
              { icon: <X className="w-12 h-12" />, title: 'Missed Areas', desc: 'Critical regions get overlooked in the chaos' },
            ].map((item, i) => (
              <div key={i} className="group p-8 bg-white/5 backdrop-blur-xl border border-red-500/20 rounded-3xl hover:bg-white/10 hover:border-red-500/40 transition-all duration-500 hover:scale-105">
                <div className="mb-6 text-red-400 group-hover:scale-110 transition-transform duration-500">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-white/60 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section id="solution" className="relative py-24 px-6 lg:px-12">
        <div className="max-w-[1400px] mx-auto">
          <div className="p-12 md:p-16 bg-gradient-to-br from-violet-500/10 via-indigo-500/10 to-cyan-500/10 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-5xl md:text-6xl font-bold tracking-tight text-white">
                ReliefSync Solves This
              </h2>
              <p className="text-xl text-white/70 max-w-2xl mx-auto">
                ReliefSync breaks down silos and enables real-time coordination
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Globe className="w-14 h-14" />,
                  title: 'Centralized Hub',
                  desc: 'Government agencies publish disaster alerts and affected locations in one place',
                },
                {
                  icon: <BarChart3 className="w-14 h-14" />,
                  title: 'Live Dashboard',
                  desc: 'All stakeholders monitor real-time information and resource availability',
                },
                {
                  icon: <Handshake className="w-14 h-14" />,
                  title: 'Seamless Collaboration',
                  desc: 'NGOs update resources like food, medical aid, and rescue teams instantly',
                },
              ].map((item, i) => (
                <div key={i} className="p-8 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-500 hover:scale-105">
                  <div className="mb-6 text-violet-400 group-hover:scale-110 transition-transform duration-500">
                    {item.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-white/70 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative py-24 px-6 lg:px-12">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-5xl md:text-6xl font-bold tracking-tight">
              <span className="bg-gradient-to-br from-white via-white to-white/60 bg-clip-text text-transparent">
                Powerful Features
              </span>
            </h2>
            <p className="text-xl text-white/60 max-w-2xl mx-auto">
              Everything you need for effective disaster response coordination
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Open REST APIs', desc: 'Easy integration with existing systems and tools' },
              { title: 'Map Visualization', desc: 'See disaster zones and resource deployment on interactive maps' },
              { title: 'Role-Based Access', desc: 'Secure permissions for government, NGOs, and agencies' },
              { title: 'Live Updates', desc: 'Real-time notifications on disaster status and resource changes' },
              { title: 'Analytics Dashboard', desc: 'Track response efficiency and resource usage metrics' },
              { title: 'High Performance', desc: 'Built on Next.js and MongoDB for speed and reliability' },
            ].map((feature, i) => (
              <div key={i} className="group p-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl hover:bg-white/10 hover:border-violet-500/30 transition-all duration-500">
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-violet-400 group-hover:to-cyan-400 group-hover:bg-clip-text transition-all duration-500">{feature.title}</h3>
                <p className="text-white/60 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section id="impact" className="relative py-24 px-6 lg:px-12">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-5xl md:text-6xl font-bold tracking-tight">
              <span className="bg-gradient-to-br from-white via-white to-white/60 bg-clip-text text-transparent">
                Expected Impact
              </span>
            </h2>
            <p className="text-xl text-white/60 max-w-2xl mx-auto">
              Transforming disaster response through technology
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {[
              { icon: <Zap className="w-14 h-14" />, stat: 'Faster', label: 'Response Times', color: 'from-blue-500 to-cyan-500' },
              { icon: <Target className="w-14 h-14" />, stat: 'Better', label: 'Coordination', color: 'from-violet-500 to-indigo-500' },
              { icon: <RotateCcw className="w-14 h-14" />, stat: 'Less', label: 'Redundancy', color: 'from-indigo-500 to-purple-500' },
              { icon: <BarChart3 className="w-14 h-14" />, stat: 'Smarter', label: 'Resource Use', color: 'from-cyan-500 to-teal-500' },
            ].map((item, i) => (
              <div key={i} className="group text-center p-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl hover:bg-white/10 hover:border-white/20 transition-all duration-500 hover:scale-105">
                <div className="flex justify-center mb-6 text-white/80 group-hover:scale-110 transition-transform duration-500">
                  {item.icon}
                </div>
                <div className={`text-5xl font-bold bg-gradient-to-r ${item.color} bg-clip-text text-transparent mb-2`}>
                  {item.stat}
                </div>
                <div className="text-white/60 font-medium">{item.label}</div>
              </div>
            ))}
          </div>

          {/* Tech Stack */}
          <div className="p-12 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl">
            <h3 className="text-3xl font-bold text-center text-white mb-8">Built With Modern Technology</h3>
            <div className="flex flex-wrap justify-center items-center gap-8">
              {['Next.js', 'React', 'Tailwind CSS', 'MongoDB', 'Node.js', 'JWT Auth'].map((tech, i) => (
                <div key={i} className="px-6 py-3 bg-white/5 border border-white/10 rounded-2xl text-white/80 font-semibold hover:bg-white/10 hover:border-violet-500/30 transition-all duration-300">
                  {tech}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="get-started" className="relative py-24 px-6 lg:px-12">
        <div className="max-w-4xl mx-auto">
          <div className="p-16 bg-gradient-to-br from-violet-500/20 via-indigo-500/20 to-cyan-500/20 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-2xl text-center space-y-8">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white">
              Ready to Transform Disaster Response?
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Join us in building a more coordinated, efficient, and life-saving disaster response system.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <a
                href="/authentication"
                className="group/btn relative px-10 py-5 bg-gradient-to-r from-violet-500 to-indigo-600 hover:from-violet-600 hover:to-indigo-700 rounded-2xl font-bold text-lg text-white transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-violet-500/50 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-200%] group-hover/btn:translate-x-[200%] transition-transform duration-1000" />
                <span className="relative">Request Demo</span>
              </a>
              <a
                href="/problems"
                className="px-10 py-5 bg-white/5 hover:bg-white/10 backdrop-blur-xl border border-white/20 hover:border-white/30 rounded-2xl font-bold text-lg text-white transition-all duration-300"
              >
                View Problems
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-12 px-6 lg:px-12 border-t border-white/10">
        <div className="max-w-[1400px] mx-auto text-center">
          <div className="text-3xl font-bold bg-gradient-to-r from-violet-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent mb-4">
            ReliefSync
          </div>
          <p className="text-white/40 text-sm">
            © {new Date().getFullYear()} ReliefSync. Building better disaster response systems.
          </p>
        </div>
      </footer>
    </main>
  );
}
