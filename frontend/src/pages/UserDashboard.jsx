import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import LoanCard from "../components/LoanCard";
import ConfirmationBox from "../components/ConfirmationBox";
import {
  fetchUserLoans,
  fetchConfirmationRequests,
  confirmRequest,
} from "../lib/userLoans.mock";
import { toast } from "../components/ui/sonner";

function UserDashboard() {
  const [loans, setLoans] = useState([]);
  const [confirmation, setConfirmation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [confirmingId, setConfirmingId] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const [loanData, confirmations] = await Promise.all([
          fetchUserLoans(),
          fetchConfirmationRequests(),
        ]);
        setLoans(loanData);
        setConfirmation(confirmations[0] || null);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error("Failed to load user dashboard", error);
        toast.error("Unable to load user loans. Using mock data only.");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const handleConfirm = async (id) => {
    try {
      setConfirmingId(id);
      await confirmRequest(id);
      toast.success("Request confirmed (mock). Hook to backend later.");
      setConfirmation(null);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Confirm request failed", error);
      toast.error("Unable to confirm request.");
    } finally {
      setConfirmingId(null);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 pb-10 pt-8 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-['Poppins'] text-2xl font-semibold text-white sm:text-3xl">
            Your loans
          </h1>
          <p className="mt-1 text-sm text-[#b3b3c6]">
            Track loans you&apos;ve taken and given, monitor payments, and
            confirm borrower SMS requests.
          </p>
        </div>
      </div>

      <ConfirmationBox
        request={confirmation}
        onConfirm={handleConfirm}
        isConfirming={!!confirmingId}
      />

      {loading ? (
        <p className="mt-8 text-sm text-[#b3b3c6]">Loading your loans…</p>
      ) : loans.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 rounded-xl border border-dashed border-white/15 bg-[#151520] px-6 py-10 text-center text-sm text-[#b3b3c6]"
        >
          No loans to display yet. Once your NGO verifies an SMS-based loan,
          details will appear here.
        </motion.div>
      ) : (
        <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {loans.map((loan) => (
            <LoanCard key={loan.id} loan={loan} />
          ))}
        </div>
      )}
    </div>
  );
}

export default UserDashboard;

