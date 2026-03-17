import PaymentTimeline from "./PaymentTimeline";

function LoanDetailsExpand({ payments }) {
  return (
    <div className="mt-4 space-y-3 rounded-xl border border-white/10 bg-[#101018] p-4">
      <h4 className="text-xs font-semibold uppercase tracking-wide text-[#b3b3c6]/80">
        Payment timeline
      </h4>
      <PaymentTimeline payments={payments} />
    </div>
  );
}

export default LoanDetailsExpand;

