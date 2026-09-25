import {
  FaCoins,
  FaCheckCircle,
  FaClock,
} from "react-icons/fa";

import type { DonorSummary } from "../../types/dashboard";
import { formatCurrency } from "../../uttils/formatter";

interface Props {
  data: DonorSummary;
}

export default function DonationSummary({
  data,
}: Props) {
  return (
    <section>

      <div className="mb-4">
        <h3 className="text-xl font-semibold text-[#163832]">
          My Donation Summary
        </h3>

        <p className="text-sm text-[#718079] mt-1">
          Your contribution history
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

        <SummaryCard
          icon={<FaCoins />}
          label="Total Donated"
          value={formatCurrency(data.total_donated)}
        />

        <SummaryCard
          icon={<FaCheckCircle />}
          label="Paid Months"
          value={String(data.total_paid_month)}
          description="Monthly contributions completed"
        />

        <SummaryCard
          icon={<FaClock />}
          label="Pending Months"
          value={String(data.pending_month)}
          description="Contributions awaiting payment"
        />

      </div>

    </section>
  );
}

function SummaryCard({
  icon,
  label,
  value,
  description,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  description?: string;
}) {
  return (
    <div className="bg-white border border-[#E1D6BE] rounded-2xl p-5">

      <div className="w-10 h-10 rounded-xl bg-[#E7F0ED] flex items-center justify-center text-[#2F6B5F]">
        {icon}
      </div>

      <p className="text-sm text-gray-500 mt-5">
        {label}
      </p>

      <p className="text-2xl font-bold text-[#163832] mt-1">
        {value}
      </p>

      {description && (
        <p className="text-xs text-gray-500 mt-1">
          {description}
        </p>
      )}

    </div>
  );
}