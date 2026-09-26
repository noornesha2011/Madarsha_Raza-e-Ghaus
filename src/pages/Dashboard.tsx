import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import DashboardHeader from "../components/dashboard/dashboardHeader";
import CurrentMonthCard from "../components/dashboard/CurrentMonthCard";
import DonationSummary from "../components/dashboard/DonationSummary";
import DonationChart from "../components/dashboard/DonationChart";
import FinancialChart from "../components/dashboard/FinancialChart";
import BalanceCard from "../components/dashboard/BlanceCard";
// import DonorProfile from "../components/dashboard/DonorProfile";
import Button from "../components/ui/Button";
import Loading from "../components/ui/Loading";

import {
  clearDashboard,
  fetchDashboard,
} from "../features/dashboardSlice";
import { logout } from "../features/authSlice";
import {
  useAppDispatch,
  useAppSelector,
} from "../app/hooks";

export default function Dashboard() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const hasRequestedDashboard = useRef(false);

  const {
    data,
    loading,
    error,
  } = useAppSelector((state) => state.dashboard);

  useEffect(() => {
    if (hasRequestedDashboard.current) return;
    hasRequestedDashboard.current = true;
    dispatch(fetchDashboard());
  }, [dispatch]);

  const handleSignOut = () => {
    localStorage.removeItem("access_token");
    dispatch(clearDashboard());
    dispatch(logout());
    navigate("/login", { replace: true });
  };

  if (loading && !data) {
    return (
      <Loading fullScreen label="Loading your dashboard…" />
    );
  }

  if (error && !data) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FAF6EC]">
        <div className="rounded-xl bg-white p-6 text-center shadow-sm">
          <h2 className="text-lg font-semibold text-red-700">
            Unable to load dashboard
          </h2>

          <p className="mt-2 text-sm text-gray-600">
            {error}
          </p>

          <Button className="mt-4" onClick={() => dispatch(fetchDashboard())}>
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  if (!data) {
    return null;
  }
 console.log(typeof(data.madarsha_history.balance))
  return (
    <div className="min-h-screen bg-[#FAF6EC]">

      <DashboardHeader donor={data.donor} onSignOut={handleSignOut} />

      <main className="mx-auto max-w-5xl space-y-6 p-4 md:p-6">

        <CurrentMonthCard
          data={data.current_month}
        />

        <DonationSummary
          data={data.summary}
        />

        <div className="grid gap-6 lg:grid-cols-2">

          <DonationChart
            data={data.current_month}
          />

          <FinancialChart
            data={data.madarsha_history}
          />

        </div>
       
        <BalanceCard balance={data.madarsha_history.balance} />

      </main>
    </div>
  );
}
