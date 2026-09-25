import { Link } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import useRazorpay from "../app/hooks/useRazorpay";

export default function Donate() {
  const { data } = useAppSelector(
    (state) => state.dashboard
  );

  const { openPayment, loading } = useRazorpay();

  // Amount comes automatically from dashboard
  const amount = data?.current_month?.due_amount ?? 0;

  // Currently fixed because this page is for monthly dues
  const donationType = "Monthly";

  const handleDonate = async () => {
    if (!amount || amount <= 0) {
      return;
    }

    try {
      await openPayment(amount, donationType);
    } catch (error) {
      console.error("Payment failed:", error);
    }
  };

  return (
    <main className="min-h-[calc(100vh-160px)] bg-[#FAF6EC] px-5 py-16">
      <section className="mx-auto max-w-2xl rounded-2xl border border-[#E1D6BE] bg-white p-8 shadow-sm sm:p-12">

        {/* Header */}
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#A9793B]">
            Support the Madarsa
          </p>

          <h1 className="mt-3 text-3xl font-bold text-[#163832]">
            Make a Contribution
          </h1>

          <p className="mx-auto mt-4 max-w-lg leading-7 text-[#5B645F]">
            Review your contribution before continuing
            with the payment.
          </p>
        </div>

        {/* Donation Details */}
        <div className="mt-8 rounded-2xl border border-[#E1D6BE] bg-[#FAF6EC] p-6">
          <h2 className="text-lg font-bold text-[#163832]">
            Donation Details
          </h2>

          <div className="mt-5 space-y-4">

            {/* Amount */}
            <div className="flex items-center justify-between border-b border-[#E1D6BE] pb-4">
              <span className="text-sm text-gray-500">
                Donation Amount
              </span>

              <span className="text-xl font-bold text-[#163832]">
                ₹{amount.toLocaleString("en-IN")}
              </span>
            </div>

            {/* Type */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">
                Donation Type
              </span>

              <span className="font-semibold text-emerald-700">
                {donationType}
              </span>
            </div>

          </div>
        </div>

        {/* Payment Information */}
        <div className="mt-6 rounded-xl bg-[#F1EAD9] p-5">
          <p className="font-semibold text-[#163832]">
            Payment Information
          </p>

          <ul className="mt-3 list-inside list-disc space-y-2 text-sm text-[#4B4636]">
            <li>
              The donation amount is taken automatically
              from your dashboard.
            </li>

            <li>
              No manual amount entry is required.
            </li>

            <li>
              Payment is processed securely through Razorpay.
            </li>

            <li>
              A receipt will be generated after successful
              payment verification.
            </li>
          </ul>
        </div>

        {/* Donate Button */}
        <button
          type="button"
          onClick={handleDonate}
          disabled={loading || amount <= 0}
          className="mt-8 w-full rounded-lg bg-emerald-700 px-5 py-3 font-semibold text-white transition hover:bg-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading
            ? "Processing..."
            : amount > 0
              ? `Donate ₹${amount.toLocaleString("en-IN")}`
              : "No Amount Due"}
        </button>

        {/* Back */}
        <div className="mt-6 text-center">
          <Link
            to="/dashboard"
            className="text-sm font-semibold text-emerald-700 hover:text-emerald-800"
          >
            Back to Dashboard
          </Link>
        </div>

      </section>
    </main>
  );
}