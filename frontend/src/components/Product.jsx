import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { TrendingUp, Shield, Activity, CheckCircle2 } from 'lucide-react';

const Product = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  const capabilities = [
    {
      icon: TrendingUp,
      title: 'Intelligent Analytics',
      description: 'Real-time data processing with machine learning algorithms that adapt to your financial patterns.',
      color: '#7c3aed',
    },
    {
      icon: Shield,
      title: 'Fraud Prevention',
      description: 'Multi-layered security protocols that identify and flag suspicious transactions instantly.',
      color: '#2dd4bf',
    },
    {
      icon: Activity,
      title: 'Performance Monitoring',
      description: 'Track portfolio health with customizable KPIs and automated performance reports.',
      color: '#f59e0b',
    },
  ];

  const benefits = [
    'Reduce loan defaults by up to 40%',
    'Process thousands of transactions per second',
    'Generate compliance reports automatically',
    '24/7 automated risk monitoring',
    'Seamless API integration',
    'Enterprise-grade encryption',
  ];

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
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <section id="product" className="relative py-24 md:py-32 overflow-hidden" ref={containerRef}>
      {/* Background effects */}
      <div className="absolute inset-0 grid-bg opacity-20" />
      
      {/* Parallax glow */}
      <motion.div 
        style={{ y }}
        className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-[#7c3aed]/15 blur-[150px] pointer-events-none"
      />
      
      <motion.div 
        style={{ y: useTransform(scrollYProgress, [0, 1], [-50, 50]) }}
        className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[#2dd4bf]/10 blur-[120px] pointer-events-none"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12" ref={ref}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16 md:mb-20"
        >
          <span className="inline-block text-sm font-mono tracking-wider text-[#2dd4bf] uppercase mb-4" id="about">
            Product
          </span>
          <h2 className="text-4xl md:text-5xl font-bold font-['Poppins'] tracking-tight mb-6" data-testid="product-title">
            Built for Modern <span className="gradient-text">Financial Systems</span>
          </h2>
          <p className="text-lg text-[#a1a1aa] max-w-2xl mx-auto leading-relaxed">
            KarzTrack combines intelligent data processing with intuitive design to provide 
            real-time financial insights that drive smarter decisions.
          </p>
        </motion.div>

        {/* Capabilities grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="grid md:grid-cols-3 gap-8 mb-20"
        >
          {capabilities.map((capability, index) => {
            const Icon = capability.icon;
            return (
              <motion.div
                key={capability.title}
                variants={itemVariants}
                className="group relative"
                data-testid={`capability-card-${index}`}
              >
                {/* Connecting line */}
                {index < capabilities.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-px bg-gradient-to-r from-white/20 to-transparent" />
                )}
                
                <div className="relative p-8 rounded-3xl bg-white/[0.02] border border-white/[0.05] hover:border-white/[0.1] transition-all duration-500 h-full">
                  {/* Icon with colored glow */}
                  <div 
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110"
                    style={{ 
                      background: `rgba(${capability.color === '#7c3aed' ? '124, 58, 237' : capability.color === '#2dd4bf' ? '45, 212, 191' : '245, 158, 11'}, 0.15)`,
                      border: `1px solid rgba(${capability.color === '#7c3aed' ? '124, 58, 237' : capability.color === '#2dd4bf' ? '45, 212, 191' : '245, 158, 11'}, 0.3)`
                    }}
                  >
                    <Icon className="w-8 h-8" style={{ color: capability.color }} />
                  </div>

                  <h3 className="text-xl font-semibold font-['Poppins'] text-white mb-3">
                    {capability.title}
                  </h3>
                  <p className="text-[#a1a1aa] leading-relaxed">
                    {capability.description}
                  </p>

                  {/* Hover glow */}
                  <div 
                    className="absolute -bottom-10 -right-10 w-32 h-32 rounded-full blur-[50px] opacity-0 group-hover:opacity-30 transition-opacity duration-500"
                    style={{ background: capability.color }}
                  />
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Benefits section */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Visual */}
            <div className="relative">
              <div className="aspect-square max-w-md mx-auto lg:mx-0 relative">
                {/* Orbiting elements */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-48 h-48 rounded-full border border-[#7c3aed]/30 animate-[spin_20s_linear_infinite]">
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#7c3aed]" />
                  </div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-72 h-72 rounded-full border border-[#2dd4bf]/20 animate-[spin_30s_linear_infinite_reverse]">
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#2dd4bf]" />
                  </div>
                </div>
                
                {/* Center logo */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#7c3aed] to-[#a78bfa] flex items-center justify-center shadow-[0_0_60px_rgba(124,58,237,0.4)]">
                    <span className="text-4xl font-bold font-['Poppins'] text-white">K</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right - Benefits list */}
            <div>
              <h3 className="text-2xl md:text-3xl font-semibold font-['Poppins'] text-white mb-8">
                Why Organizations Choose KarzTrack
              </h3>
              
              <div className="grid sm:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={benefit}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                    className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-[#7c3aed]/30 transition-colors duration-300"
                    data-testid={`benefit-${index}`}
                  >
                    <CheckCircle2 className="w-5 h-5 text-[#2dd4bf] flex-shrink-0" />
                    <span className="text-sm text-[#e4e4e7]">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Section divider */}
      <div className="absolute bottom-0 left-0 right-0 section-beam" />
    </section>
  );
};

export default Product;
