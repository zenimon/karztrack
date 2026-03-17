import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Activity, AlertTriangle, BarChart3, CreditCard } from "lucide-react";
import { loanApi } from "../lib/api";
import { toast } from "../components/ui/sonner";

const defaultOverview = [
  {
    label: "Total Active Loans",
    key: "totalActiveLoans",
    value: "0",
    change: "",
    icon: CreditCard,
    tone: "from-[#7c3aed]/20 to-transparent",
  },
  {
    label: "Average Risk Score",
    key: "averageRiskScore",
    value: "0%",
    change: "",
    icon: BarChart3,
    tone: "from-[#a78bfa]/20 to-transparent",
  },
  {
    label: "Repayment Health",
    key: "repaymentHealth",
    value: "100%",
    change: "",
    icon: Activity,
    tone: "from-[#22c55e]/15 to-transparent",
  },
  {
    label: "High-Risk Flags",
    key: "highRiskFlags",
    value: "0",
    change: "",
    icon: AlertTriangle,
    tone: "from-[#ef4444]/20 to-transparent",
  },
];

function Dashboard() {
  const [overviewCards, setOverviewCards] = useState(defaultOverview);
  const [riskAlerts, setRiskAlerts] = useState([]);

  useEffect(() => {
    const fetchOverview = async () => {
      try {
        const response = await loanApi.getNgoLoans();
        const loans = Array.isArray(response.data) ? response.data : [];

        if (loans.length === 0) {
          setOverviewCards(defaultOverview);
          setRiskAlerts([]);
          return;
        }

        const totalLoans = loans.length;
        const totalRisk = loans.reduce(
          (sum, loan) => sum + (Number(loan.riskScore) || 0),
          0,
        );
        const averageRisk = totalRisk / totalLoans;
        const highRiskLoans = loans.filter(
          (loan) => (Number(loan.riskScore) || 0) >= 50,
        );
        const repaymentHealth =
          totalLoans === 0
            ? 100
            : Math.round(((totalLoans - highRiskLoans.length) / totalLoans) * 100);

        setOverviewCards(
          defaultOverview.map((card) => {
            if (card.key === "totalActiveLoans") {
              return {
                ...card,
                value: totalLoans.toString(),
                change: "",
              };
            }
            if (card.key === "averageRiskScore") {
              return {
                ...card,
                value: `${Math.round(averageRisk)}%`,
                change: "",
              };
            }
            if (card.key === "repaymentHealth") {
              return {
                ...card,
                value: `${repaymentHealth}%`,
                change: "",
              };
            }
            if (card.key === "highRiskFlags") {
              return {
                ...card,
                value: highRiskLoans.length.toString(),
                change: "",
              };
            }
            return card;
          }),
        );

        const topRisk = [...highRiskLoans].sort(
          (a, b) => (Number(b.riskScore) || 0) - (Number(a.riskScore) || 0),
        );

        setRiskAlerts(
          topRisk.slice(0, 3).map((loan) => {
            const score = Number(loan.riskScore) || 0;
            let label = "Medium risk borrower";
            if (score >= 80) label = "Critical risk borrower";
            else if (score >= 65) label = "High risk borrower";
            return {
              name: loan.borrowerName,
              id: loan._id,
              score,
              label,
            };
          }),
        );
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error("Failed to load dashboard overview", error);
        toast.error("Unable to load live dashboard data.");
      }
    };

    fetchOverview();
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 pb-10 pt-8 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-['Poppins'] text-2xl font-semibold text-white sm:text-3xl">
            Overview
          </h1>
          <p className="mt-1 text-sm text-[#b3b3c6]">
            High-level snapshot of your lending portfolio, repayment activity, and
            emerging risk signals.
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {overviewCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * index, duration: 0.4 }}
              className="relative overflow-hidden rounded-xl border border-white/10 bg-[#151520] p-5 shadow-lg shadow-black/40"
            >
              <div
                className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${card.tone} opacity-60`}
              />
              <div className="relative flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-[#b3b3c6]/70">
                    {card.label}
                  </p>
                  <p className="mt-2 text-2xl font-semibold text-white">
                    {card.value}
                  </p>
                  <p className="mt-1 text-xs text-[#b3b3c6]">{card.change} vs last 30d</p>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-black/30">
                  <Icon className="h-5 w-5 text-[#a78bfa]" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="rounded-xl border border-white/10 bg-[#151520] p-6 shadow-lg shadow-black/40"
        >
          <h2 className="font-['Poppins'] text-base font-semibold text-white">
            Repayment activity
          </h2>
          <p className="mt-1 text-xs text-[#b3b3c6]">
            Daily repayment inflows across all active loan cohorts.
          </p>
          <div className="mt-6 flex items-end gap-1.5">
            {Array.from({ length: 24 }).map((_, idx) => (
              <div
                // eslint-disable-next-line react/no-array-index-key
                key={idx}
                className="flex-1 rounded-t-full bg-gradient-to-t from-[#7c3aed] to-[#a78bfa]"
                style={{ height: `${30 + ((idx * 13) % 40)}px` }}
              />
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.4 }}
          className="rounded-xl border border-white/10 bg-[#151520] p-6 shadow-lg shadow-black/40"
        >
          <h2 className="font-['Poppins'] text-base font-semibold text-white">
            Risk alerts
          </h2>
          <p className="mt-1 text-xs text-[#b3b3c6]">
            Recently triggered high-risk loans that may need review.
          </p>
          <div className="mt-5 space-y-3">
            {riskAlerts.map((alert) => (
              <div
                key={alert.id}
                className="flex items-center justify-between rounded-lg border border-red-500/20 bg-red-950/30 px-3 py-2.5"
              >
                <div className="space-y-0.5">
                  <p className="text-sm font-medium text-white">{alert.name}</p>
                  <p className="text-xs text-[#b3b3c6]">{alert.label}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-mono text-[#a78bfa]">{alert.id}</p>
                  <p className="text-sm font-semibold text-red-400">
                    Risk {alert.score}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Dashboard;

