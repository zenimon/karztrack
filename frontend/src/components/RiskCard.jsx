import { motion } from "framer-motion";

function RiskCard({ name, amount, interest, tenure, risk }) {
  const clampedRisk = Math.max(0, Math.min(100, Number(risk) || 0));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      whileHover={{ scale: 1.02, y: -4 }}
      className="relative flex flex-col gap-4 rounded-xl border border-white/10 bg-[#151520] p-6 shadow-lg shadow-red-500/20"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-wide text-[#b3b3c6]/70">
            Borrower
          </p>
          <p className="mt-1 font-['Poppins'] text-lg font-semibold text-white">
            {name}
          </p>
        </div>
        <div className="rounded-full bg-red-500/10 px-3 py-1 text-xs font-medium text-red-400">
          Risk {clampedRisk}%
        </div>
      </div>

      <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm text-[#b3b3c6]">
        <div>
          <p className="text-[11px] uppercase tracking-wide text-[#b3b3c6]/70">
            Loan Amount
          </p>
          <p className="mt-0.5 text-sm text-white">{amount}</p>
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-wide text-[#b3b3c6]/70">
            Interest Rate
          </p>
          <p className="mt-0.5 text-sm text-white">{interest}</p>
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-wide text-[#b3b3c6]/70">
            Tenure
          </p>
          <p className="mt-0.5 text-sm text-white">{tenure}</p>
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-wide text-[#b3b3c6]/70">
            Risk Band
          </p>
          <p className="mt-0.5 text-sm text-red-300">
            {clampedRisk >= 80
              ? "Critical"
              : clampedRisk >= 65
                ? "High"
                : clampedRisk >= 45
                  ? "Medium"
                  : "Low"}
          </p>
        </div>
      </div>

      <div className="mt-3 space-y-2">
        <div className="flex items-center justify-between text-xs text-[#b3b3c6]/80">
          <span>Risk exposure</span>
          <span>{clampedRisk}%</span>
        </div>
        <div className="h-2 w-full rounded-full bg-[#1f1f2b]">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#ff4d4d] to-[#ff0000]"
            style={{ width: `${clampedRisk}%` }}
          />
        </div>
      </div>
    </motion.div>
  );
}

export default RiskCard;

