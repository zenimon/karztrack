import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Database, ShieldAlert, BarChart3, Zap, Lock, LineChart } from 'lucide-react';

const Features = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const features = [
    {
      icon: Database,
      title: 'Smart Loan Tracking',
      description: 'Monitor loan records and maintain structured financial data with intelligent categorization and real-time updates.',
      size: 'wide', // spans 2 columns
      gradient: 'from-[#7c3aed]/20 to-transparent',
    },
    {
      icon: ShieldAlert,
      title: 'Risk Detection System',
      description: 'Detect suspicious lending patterns early with AI-powered anomaly detection and automated alerts.',
      size: 'tall', // spans 2 rows
      gradient: 'from-[#2dd4bf]/20 to-transparent',
    },
    {
      icon: BarChart3,
      title: 'Data Insights & Analytics',
      description: 'Convert financial records into visual insights with comprehensive dashboards and reports.',
      size: 'normal',
      gradient: 'from-[#f59e0b]/20 to-transparent',
    },
    {
      icon: Zap,
      title: 'Real-time Processing',
      description: 'Instant data processing with sub-second latency for critical financial decisions.',
      size: 'normal',
      gradient: 'from-[#7c3aed]/20 to-transparent',
    },
    {
      icon: Lock,
      title: 'Bank-Grade Security',
      description: 'Enterprise-level encryption and compliance with financial regulations.',
      size: 'normal',
      gradient: 'from-[#10b981]/20 to-transparent',
    },
    {
      icon: LineChart,
      title: 'Predictive Modeling',
      description: 'Forecast trends and identify potential defaults before they happen.',
      size: 'normal',
      gradient: 'from-[#ef4444]/20 to-transparent',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <section id="features" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 grid-bg opacity-30" />
      
      {/* Gradient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[#7c3aed]/10 blur-[150px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12" ref={ref}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16 md:mb-20"
        >
          <span className="inline-block text-sm font-mono tracking-wider text-[#7c3aed] uppercase mb-4">
            Features
          </span>
          <h2 className="text-4xl md:text-5xl font-bold font-['Poppins'] tracking-tight mb-6" data-testid="features-title">
            What is <span className="gradient-text">KarzTrack</span>?
          </h2>
          <p className="text-lg text-[#a1a1aa] max-w-2xl mx-auto leading-relaxed">
            KarzTrack is a financial monitoring platform designed to simplify loan tracking, 
            risk detection, and financial transparency for modern organizations.
          </p>
        </motion.div>

        {/* Bento grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          data-testid="features-grid"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const isWide = feature.size === 'wide';
            const isTall = feature.size === 'tall';

            return (
              <motion.div
                key={feature.title}
                variants={cardVariants}
                className={`
                  feature-card group relative overflow-hidden rounded-3xl 
                  bg-white/[0.03] border border-white/[0.05] 
                  hover:border-[#7c3aed]/50 transition-all duration-500
                  ${isWide ? 'md:col-span-2' : ''}
                  ${isTall ? 'lg:row-span-2' : ''}
                `}
                data-testid={`feature-card-${index}`}
              >
                {/* Gradient background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                <div className={`relative z-10 p-8 ${isTall ? 'h-full flex flex-col' : ''}`}>
                  {/* Icon */}
                  <div className="icon-container mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-6 h-6 text-[#7c3aed]" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl md:text-2xl font-semibold font-['Poppins'] text-white mb-4">
                    {feature.title}
                  </h3>
                  <p className={`text-[#a1a1aa] leading-relaxed ${isTall ? 'flex-1' : ''}`}>
                    {feature.description}
                  </p>

                  {/* Hover indicator */}
                  <div className="mt-6 flex items-center gap-2 text-[#7c3aed] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-sm font-medium">Learn more</span>
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>

                {/* Corner glow effect */}
                <div className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full bg-[#7c3aed]/20 blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Section divider */}
      <div className="absolute bottom-0 left-0 right-0 section-beam" />
    </section>
  );
};

export default Features;
