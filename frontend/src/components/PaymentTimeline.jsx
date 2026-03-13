import { cn } from "../lib/utils";

function PaymentTimeline({ payments }) {
  if (!payments || payments.length === 0) {
    return (
      <div className="rounded-lg border border-white/10 bg-[#151520] px-4 py-3 text-xs text-[#b3b3c6]">
        No payment records yet.
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-white/10 bg-[#151520]">
      <div className="grid grid-cols-4 border-b border-white/5 px-4 py-2 text-[11px] font-medium uppercase tracking-wide text-[#b3b3c6]/70">
        <span>Month</span>
        <span>Due date</span>
        <span>Amount</span>
        <span>Status</span>
      </div>
      <div className="divide-y divide-white/5">
        {payments.map((p) => (
          <div
            key={p.month}
            className="grid grid-cols-4 items-center px-4 py-2 text-xs text-[#b3b3c6]"
          >
            <span className="font-mono text-[11px] text-[#a78bfa]">
              M{p.month}
            </span>
            <span>{p.dueDate}</span>
            <span>₹{p.amount.toLocaleString("en-IN")}</span>
            <span
              className={cn(
                "inline-flex items-center justify-start gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium",
                p.status === "paid"
                  ? "bg-emerald-500/15 text-emerald-300"
                  : "bg-amber-500/15 text-amber-300",
              )}
            >
              <span
                className={cn(
                  "h-1.5 w-1.5 rounded-full",
                  p.status === "paid" ? "bg-emerald-400" : "bg-amber-400",
                )}
              />
              {p.status === "paid" ? "Paid" : "Pending"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PaymentTimeline;

