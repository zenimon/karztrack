import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, TrendingUp, Shield, Activity, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';

// Animated counter component
const AnimatedCounter = ({ end, duration = 2, suffix = '', prefix = '' }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let startTime;
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = (currentTime - startTime) / (duration * 1000);

      if (progress < 1) {
        setCount(Math.floor(end * progress));
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(animate);
  }, [end, duration, isInView]);

  return (
    <span ref={ref} className="font-mono">
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
};

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const stats = [
    { icon: TrendingUp, label: 'Total Loans', value: 12847, suffix: '+' },
    { icon: Shield, label: 'Risk Score', value: 94, suffix: '%' },
    { icon: Users, label: 'Active Users', value: 2341, suffix: '' },
    { icon: Activity, label: 'Alerts', value: 127, suffix: '' },
  ];

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 grid-bg opacity-50" />
      
      {/* Glowing orbs */}
      <div className="hero-orb top-1/4 left-1/4 animate-pulse-slow" />
      <div className="hero-orb bottom-1/4 right-1/4 animate-pulse-slow" style={{ animationDelay: '2s' }} />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0f0f14]/50 to-[#0f0f14]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="text-left"
          >
            {/* Badge */}
            <motion.div variants={itemVariants} className="mb-8">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#7c3aed]/10 border border-[#7c3aed]/30 text-[#a78bfa] text-sm font-medium">
                <span className="w-2 h-2 rounded-full bg-[#2dd4bf] animate-pulse" />
                AI-Powered Financial Intelligence
              </span>
            </motion.div>

            {/* Main heading */}
            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-7xl font-bold font-['Poppins'] tracking-tight leading-none mb-8"
              data-testid="hero-title"
            >
              Track Loans.{' '}
              <br className="hidden sm:block" />
              Detect Risk.{' '}
              <br className="hidden sm:block" />
              <span className="gradient-text">Empower Finance.</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-[#a1a1aa] leading-relaxed max-w-xl mb-10"
              data-testid="hero-subtitle"
            >
              KarzTrack is a next-generation financial software platform designed to help 
              organizations monitor lending activity and detect risk patterns in real-time.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
              <Button
                size="lg"
                className="bg-[#7c3aed] hover:bg-[#7c3aed]/90 text-white rounded-full px-8 py-6 text-lg font-medium shadow-[0_0_30px_rgba(124,58,237,0.4)] hover:shadow-[0_0_40px_rgba(124,58,237,0.6)] hover:scale-105 transition-all duration-300 group"
                data-testid="hero-cta-btn"
                asChild
              >
                <Link to="/signup">
                  Let's Track the Ledger
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-white/20 rounded-full px-8 py-6 text-lg font-medium backdrop-blur-md transition-all duration-300"
                data-testid="hero-demo-btn"
              >
                Watch Demo
              </Button>
            </motion.div>
          </motion.div>

          {/* Right content - Dashboard mockup */}
          <motion.div
            initial={{ opacity: 0, x: 60, rotateY: -10 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative perspective-1000 hidden lg:block"
          >
            <div className="dashboard-tilt">
              {/* Main dashboard card */}
              <div className="dashboard-card p-6 space-y-6">
                {/* Dashboard header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <span className="text-xs text-[#a1a1aa] font-mono">KarzTrack Dashboard</span>
                </div>

                {/* Stats grid */}
                <div className="grid grid-cols-2 gap-4">
                  {stats.map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                      className="stat-card"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="icon-container">
                          <stat.icon className="w-5 h-5 text-[#7c3aed]" />
                        </div>
                        <span className="text-xs text-[#a1a1aa] uppercase tracking-wider">
                          {stat.label}
                        </span>
                      </div>
                      <div className="text-3xl font-bold font-mono text-white">
                        <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Mini chart placeholder */}
                <div className="bg-[#18181b] rounded-xl p-4 border border-[#27272a]">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-[#a1a1aa]">Risk Trend</span>
                    <span className="text-xs text-[#2dd4bf] font-mono">+12.5%</span>
                  </div>
                  <div className="flex items-end gap-1 h-16">
                    {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88].map((height, i) => (
                      <motion.div
                        key={i}
                        initial={{ height: 0 }}
                        animate={{
                          height: [
                            `${Math.max(8, Math.round(height * 0.55))}%`,
                            `${height}%`,
                            `${Math.max(10, Math.round(height * 0.75))}%`,
                            `${Math.max(8, Math.round(height * 0.6))}%`,
                          ],
                        }}
                        transition={{
                          delay: 0.8 + i * 0.05,
                          duration: 1.8 + (i % 4) * 0.25,
                          repeat: Infinity,
                          repeatType: "mirror",
                          ease: "easeInOut",
                        }}
                        className="flex-1 rounded-t bg-gradient-to-t from-[#7c3aed] to-[#a78bfa]"
                      />
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </motion.div>
        </div>
      </div>

      {/* Section divider */}
      <div className="absolute bottom-0 left-0 right-0 section-beam" />
    </section>
  );
};

export default Hero;
