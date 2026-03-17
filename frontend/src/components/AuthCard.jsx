import { motion } from "framer-motion";

function AuthCard({ title, subtitle, children }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f0f14] px-4 sm:px-6 lg:px-8">
      {/* Background accents */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute -top-32 right-[-10%] h-80 w-80 rounded-full bg-purple-700/30 blur-3xl" />
        <div className="absolute -bottom-40 left-[-10%] h-96 w-96 rounded-full bg-purple-500/20 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        whileHover={{ y: -4 }}
        className="relative w-full max-w-md rounded-xl bg-[#151520]/95 px-6 py-8 sm:px-8 sm:py-10 shadow-lg shadow-purple-900/30 ring-1 ring-white/5 backdrop-blur-md glow-primary hover:glow-primary-hover"
      >
        {/* Soft purple glow border */}
        <div className="pointer-events-none absolute inset-0 rounded-xl border border-purple-500/30" />

        <div className="relative flex flex-col gap-2 mb-8">
          <h1 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="text-sm text-[#b3b3c6] leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>

        <div className="relative flex flex-col gap-6">{children}</div>
      </motion.div>
    </div>
  );
}

export default AuthCard;

