import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import RiskCard from "../components/RiskCard";
import { loanApi } from "../lib/api";
import { toast } from "../components/ui/sonner";

const defaultLoans = [
  {
    name: "Rahul Sharma",
    amount: "₹2,50,000",
    interest: "12%",
    tenure: "24 months",
    risk: 78,
  },
  {
    name: "Amit Verma",
    amount: "₹1,20,000",
    interest: "10%",
    tenure: "18 months",
    risk: 65,
  },
  {
    name: "Priya Singh",
    amount: "₹3,10,000",
    interest: "14%",
    tenure: "36 months",
    risk: 84,
  },
  {
    name: "Sanjay Gupta",
    amount: "₹90,000",
    interest: "9.5%",
    tenure: "12 months",
    risk: 48,
  },
  {
    name: "Neha Patil",
    amount: "₹1,80,000",
    interest: "11%",
    tenure: "20 months",
    risk: 72,
  },
  {
    name: "Vikram Rao",
    amount: "₹4,50,000",
    interest: "13.5%",
    tenure: "48 months",
    risk: 89,
  },
];

function RiskPanel() {
  const [loans, setLoans] = useState(defaultLoans);

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const response = await loanApi.getNgoLoans();
        const data = Array.isArray(response.data) ? response.data : [];
        if (data.length === 0) return;

        const mapped = data.map((loan) => ({
          name: loan.borrowerName,
          amount:
            typeof loan.amount === "number"
              ? `₹${loan.amount.toLocaleString("en-IN")}`
              : loan.amount,
          interest:
            typeof loan.interest === "number"
              ? `${loan.interest}%`
              : loan.interest,
          tenure:
            typeof loan.durationMonths === "number"
              ? `${loan.durationMonths} months`
              : loan.tenure,
          risk: loan.riskScore ?? 0,
        }));

        setLoans(mapped);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error("Failed to load risk loans", error);
        toast.error("Unable to load live risk data. Showing sample data.");
      }
    };

    fetchLoans();
  }, []);
  return (
    <div className="mx-auto max-w-7xl px-4 pb-10 pt-8 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-['Poppins'] text-2xl font-semibold text-white sm:text-3xl">
            Loan Risk Panel
          </h1>
          <p className="mt-1 text-sm text-[#b3b3c6]">
            Monitor borrower exposure, interest terms, and risk scores across your
            portfolio in a single, focused view.
          </p>
        </div>
          <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-[#151520] px-4 py-2 text-xs text-[#b3b3c6]">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-red-500/15">
            <span className="h-2 w-2 rounded-full bg-red-500 shadow-[0_0_12px_rgba(248,113,113,0.8)]" />
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-red-300">Risk alerts live</span>
            <span className="text-[11px] text-[#b3b3c6]/80">
              {loans.filter((loan) => loan.risk >= 70).length} high-risk loans
              require attention
            </span>
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3"
      >
        {loans.map((loan) => (
          <RiskCard key={loan.name} {...loan} />
        ))}
      </motion.div>
    </div>
  );
}

export default RiskPanel;

