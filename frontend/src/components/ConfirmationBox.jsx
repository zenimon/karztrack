import { motion } from "framer-motion";

function ConfirmationBox({ request, onConfirm, isConfirming }) {
  if (!request) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-6 rounded-xl border border-amber-400/30 bg-amber-950/40 p-4 shadow-lg shadow-amber-900/40"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-amber-300">
            Confirmation required
          </p>
          <p className="mt-1 text-xs text-[#f9e9c5]">{request.message}</p>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between text-[11px] text-[#f9e9c5]/80">
        <span>Type: {request.type === "loan" ? "New loan" : "Repayment"}</span>
        <button
          type="button"
          disabled={isConfirming}
          onClick={() => onConfirm(request.id)}
          className="inline-flex h-7 items-center justify-center rounded-full bg-emerald-500 px-3 text-[11px] font-medium text-black shadow-md shadow-emerald-900/50 transition-colors hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isConfirming ? "Confirming..." : "Confirm & record"}
        </button>
      </div>
    </motion.div>
  );
}

export default ConfirmationBox;

