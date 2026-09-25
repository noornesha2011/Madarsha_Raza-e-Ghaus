import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import type { CurrentMonthDonation } from "../../types/dashboard";
import {
  formatCurrency,
  monthNames,
} from "../../uttils/formatter";

interface Props {
  data: CurrentMonthDonation;
}

export default function DonationChart({
  data,
}: Props) {
  const chartData = [
    {
      name: "Paid",
      value: data.paid_amount,
    },
    {
      name: "Due",
      value: data.due_amount,
    },
  ];

  const percentage =
    data.monthly_amount > 0
      ? Math.round(
          (data.paid_amount / data.monthly_amount) * 100
        )
      : 0;

  return (
    <div className="bg-white border border-[#E1D6BE] rounded-2xl p-6">

      <div>
        <h3 className="text-lg font-semibold text-[#163832]">
          Contribution Status
        </h3>

        <p className="text-sm text-[#718079]">
          {monthNames[data.month - 1]} {data.year}
        </p>
      </div>

      <div className="relative h-[280px]">

        <ResponsiveContainer width="100%" height="100%">

          <PieChart>

            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              innerRadius={75}
              outerRadius={105}
              paddingAngle={4}
            >
              <Cell fill="#2F6B5F" />
              <Cell fill="#D9C79A" />
            </Pie>

            <Tooltip
              formatter={(value) =>
                formatCurrency(Number(value))
              }
            />

          </PieChart>

        </ResponsiveContainer>

        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">

          <p className="text-3xl font-bold text-[#163832]">
            {percentage}%
          </p>

          <p className="text-xs text-gray-500">
            Paid
          </p>

        </div>

      </div>

      <div className="grid grid-cols-2 gap-4">

        <LegendItem
          color="bg-[#2F6B5F]"
          label="Paid"
          amount={data.paid_amount}
        />

        <LegendItem
          color="bg-[#D9C79A]"
          label="Due"
          amount={data.due_amount}
        />

      </div>

    </div>
  );
}

function LegendItem({
  color,
  label,
  amount,
}: {
  color: string;
  label: string;
  amount: number;
}) {
  return (
    <div className="flex items-center gap-3">

      <span className={`w-3 h-3 rounded-full ${color}`} />

      <div>
        <p className="text-xs text-gray-500">
          {label}
        </p>

        <p className="font-semibold text-[#163832]">
          {formatCurrency(amount)}
        </p>
      </div>

    </div>
  );
}