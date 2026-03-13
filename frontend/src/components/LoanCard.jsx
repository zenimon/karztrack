import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, ChevronDown, CheckCircle2 } from "lucide-react";
import LoanDetailsExpand from "./LoanDetailsExpand";
import { downloadLoanPdf } from "../lib/userLoans.mock";
import { toast } from "./ui/sonner";

function LoanCard({ loan }) {
  const [expanded, setExpanded] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const relationshipLabel =
    loan.relationship === "borrower" ? "Taken from" : "Given to";

  const start = new Date(loan.startDate);
  const end = new Date(start);
  end.setMonth(end.getMonth() + loan.durationMonths);
  const remainingMonths = Math.max(
    0,
    Math.round(
      (end.getTime() - Date.now()) / (1000 * 60 * 60 * 24 * 30.4),
    ),
  );

  const handleDownload = async () => {
    try {
      setDownloading(true);
      await downloadLoanPdf(loan.id);
      toast.success("PDF generated (mock) – hook this to backend later.");
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("PDF download failed", error);
      toast.error("Unable to generate PDF.");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative flex flex-col rounded-xl border border-white/10 bg-[#151520] p-5 shadow-lg shadow-black/40"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[11px] uppercase tracking-wide text-[#b3b3c6]/70">
            {relationshipLabel}
          </p>
          <p className="mt-1 font-['Poppins'] text-lg font-semibold text-white">
            {loan.counterparty}
          </p>
          <p className="mt-0.5 text-xs text-[#b3b3c6]">
            You: {loan.userName}
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs font-mono text-[#a78bfa]">{loan.id}</p>
          <p className="mt-1 text-xl font-semibold text-white">
            ₹{loan.amount.toLocaleString("en-IN")}
          </p>
          <p className="mt-0.5 text-xs text-[#b3b3c6]">
            {loan.interestRate}% • {loan.durationMonths} months
          </p>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-3 text-xs text-[#b3b3c6]">
        <div>
          <p className="text-[11px] uppercase tracking-wide text-[#b3b3c6]/70">
            Start date
          </p>
          <p className="mt-0.5 text-white">
            {start.toLocaleDateString("en-IN")}
          </p>
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-wide text-[#b3b3c6]/70">
            Remaining
          </p>
          <p className="mt-0.5 text-white">
            {remainingMonths} months left
          </p>
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-wide text-[#b3b3c6]/70">
            Status
          </p>
          <p className="mt-0.5 inline-flex items-center gap-1 rounded-full bg-white/5 px-2 py-0.5 text-[11px] font-medium text-emerald-300">
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                loan.status === "active"
                  ? "bg-emerald-400"
                  : loan.status === "pending"
                    ? "bg-amber-400"
                    : "bg-slate-400"
              }`}
            />
            {loan.status.charAt(0).toUpperCase() + loan.status.slice(1)}
          </p>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleDownload}
            disabled={downloading}
            className="inline-flex items-center gap-1.5 rounded-full bg-[#1f1f2b] px-3 py-1 text-[11px] font-medium text-[#e5e5ff] shadow-sm shadow-black/40 transition hover:bg-[#2a2a3a] disabled:cursor-not-allowed disabled:opacity-70"
          >
            <FileText className="h-3.5 w-3.5" />
            {downloading ? "Generating..." : "Download PDF"}
          </button>
          {loan.requiresConfirmation && (
            <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/15 px-2 py-0.5 text-[10px] font-medium text-amber-200">
              <CheckCircle2 className="h-3 w-3" />
              Awaiting confirmation
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={() => setExpanded((prev) => !prev)}
          className="inline-flex items-center gap-1 text-[11px] font-medium text-[#a78bfa] hover:text-white"
        >
          <span>{expanded ? "Hide details" : "More details"}</span>
          <ChevronDown
            className={`h-3.5 w-3.5 transition-transform ${
              expanded ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <LoanDetailsExpand payments={loan.payments} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default LoanCard;

