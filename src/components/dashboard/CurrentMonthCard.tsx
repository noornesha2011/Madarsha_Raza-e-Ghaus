import { FaClock, FaCheckCircle } from "react-icons/fa";
import type { CurrentMonthDonation } from "../../types/dashboard";
import {
  formatCurrency,
  monthNames,
} from "../../uttils/formatter";

interface Props {
  data: CurrentMonthDonation;
}

export default function CurrentMonthCard({
  data,
}: Props) {
  const monthName = monthNames[data.month - 1];

  const percentage =
    data.monthly_amount > 0
      ? Math.min(
          (data.paid_amount / data.monthly_amount) * 100,
          100
        )
      : 0;

  const isPaid = data.status.toLowerCase() === "paid";

  return (
    <section className="bg-[#F1EAD9] border border-[#D9C79A] rounded-2xl overflow-hidden">

      <div className="h-1 bg-[#A9793B]" />

      <div className="p-6">

        <div className="flex justify-between items-start">

          <div>
            <p className="text-sm text-[#806B4A]">
              Current Month Contribution
            </p>

            <h3 className="text-2xl font-semibold mt-1">
              {monthName} {data.year}
            </h3>
          </div>

          <span
            className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
              isPaid
                ? "bg-[#E4F2E9] text-[#28704A]"
                : "bg-[#FFF1D6] text-[#94620B]"
            }`}
          >
            {data.status}
          </span>

        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">

          <Amount
            label="Monthly Contribution"
            amount={data.monthly_amount}
          />

          <Amount
            label="Paid"
            amount={data.paid_amount}
            green
          />

          <Amount
            label="Due"
            amount={data.due_amount}
            red
          />

        </div>

        {/* Progress */}

        <div className="mt-6">

          <div className="flex justify-between text-xs mb-2">

            <span className="text-gray-600">
              Payment progress
            </span>

            <span className="font-semibold">
              {Math.round(percentage)}%
            </span>

          </div>

          <div className="h-2 bg-white rounded-full overflow-hidden">

            <div
              className="h-full bg-[#2F6B5F] rounded-full"
              style={{
                width: `${percentage}%`,
              }}
            />

          </div>

        </div>

        {data.due_amount > 0 && !isPaid && (
          <div className="flex items-center gap-2 mt-5 text-sm text-[#8C5426]">
            <FaClock />

            <span>
              {formatCurrency(data.due_amount)} is still due.
            </span>
          </div>
        )}

        {isPaid && (
          <div className="flex items-center gap-2 mt-5 text-sm text-[#28704A]">
            <FaCheckCircle />

            <span>
              Your contribution is fully paid.
            </span>
          </div>
        )}

      </div>

    </section>
  );
}

function Amount({
  label,
  amount,
  green,
  red,
}: {
  label: string;
  amount: number;
  green?: boolean;
  red?: boolean;
}) {
  return (
    <div className="bg-white/70 rounded-xl p-4">

      <p className="text-xs text-gray-500">
        {label}
      </p>

      <p
        className={`text-xl font-bold mt-1 ${
          green
            ? "text-[#28704A]"
            : red
            ? "text-[#A54A2A]"
            : "text-[#163832]"
        }`}
      >
        {formatCurrency(amount)}
      </p>

    </div>
  );
}