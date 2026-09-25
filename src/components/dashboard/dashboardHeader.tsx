import { FaMosque } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";

interface Props {
  donor: {
    name: string;
    donor_id: number;
  };
  onSignOut: () => void;
}

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);

export default function DashboardHeader({
  donor,
  onSignOut,
}: Props) {
  const { isAuthenticated } = useAppSelector(
    (state) => state.auth
  );

  const { data } = useAppSelector(
    (state) => state.dashboard
  );

  const monthlyDue = Number(
    data?.current_month?.due_amount ?? 0
  );

  const hasDue =
    isAuthenticated && monthlyDue > 0;

  return (
    <header className="border-b border-[#2F5750] bg-[#163832] text-white">
      <div className="mx-auto max-w-6xl px-5 py-5">

        {/* Top Section */}
        <div className="flex items-center justify-between gap-4">

          {/* Madarsa Logo + Title */}
          <div className="flex items-center gap-4">

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#E8D7A8]">
              <FaMosque
                size={25}
                className="text-[#163832]"
              />
            </div>

            <div>
              <h1 className="text-lg font-semibold sm:text-xl">
                Madarsa Raza-e-Gaus
              </h1>

              <p className="text-sm text-[#C9D8D3]">
                Donor Dashboard
              </p>
            </div>

          </div>

          {/* Right Section */}
          <div className="flex items-center gap-3">

            {/* Donor ID */}
            <div className="hidden text-right sm:block">
              <p className="text-xs text-[#BFD0CA]">
                Donor ID
              </p>

              <p className="font-semibold">
                #{donor.donor_id}
              </p>
            </div>

            {/* Sign Out */}
            <button
              type="button"
              onClick={onSignOut}
              className="rounded-lg border border-[#52736B] px-3 py-2 text-xs font-semibold text-[#E7F0ED] transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#E8D7A8]"
            >
              Sign out
            </button>

          </div>
        </div>

        {/* Greeting */}
        <div className="mt-5">
          <p className="text-sm text-[#BFD0CA]">
            Assalamu Alaikum
          </p>

          <h2 className="mt-1 text-2xl font-semibold">
            {donor.name}
          </h2>
        </div>

        {/* Monthly Contribution */}
        <div className="mt-6 flex flex-col gap-4 rounded-xl border border-[#2F5750] bg-[#1C423B] p-4 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <p className="text-sm text-[#BFD0CA]">
              Monthly Contribution
            </p>

            <p className="mt-1 text-2xl font-bold text-[#E8D7A8]">
              {formatCurrency(monthlyDue)}
            </p>
          </div>

          {/* Donate Button */}
          {hasDue && (
            <Link
              to="/donate"
              className="inline-flex items-center justify-center rounded-lg bg-[#E8D7A8] px-5 py-2.5 text-sm font-semibold text-[#163832] shadow-md transition hover:bg-[#f0e2bb] hover:shadow-lg"
            >
              Pay Monthly Due
            </Link>
          )}

        </div>

      </div>
    </header>
  );
}