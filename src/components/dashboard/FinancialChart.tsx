import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import type { MadarshaSummary } from "../../types/dashboard";
import { formatCurrency } from "../../uttils/formatter";

interface Props {
  data: MadarshaSummary;
}

export default function FinancialChart({
  data,
}: Props) {
  const chartData = [
    {
      period: "This Month",
      collection: data.monthly_collection,
      expenses: data.monthly_expensess,
    },
    {
      period: "This Year",
      collection: data.yearly_collection,
      expenses: data.yearly_expensess,
    },
  ];

  return (
    <div className="bg-white border border-[#E1D6BE] rounded-2xl p-6">

      <div className="mb-5">

        <h3 className="text-lg font-semibold text-[#163832]">
          Madarsa Financial Overview
        </h3>

        <p className="text-sm text-[#718079] mt-1">
          Collection compared with expenses
        </p>

      </div>

      <div className="h-[330px]">

        <ResponsiveContainer width="100%" height="100%">

          <BarChart data={chartData}>

            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#E8E0CD"
            />

            <XAxis
              dataKey="period"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12 }}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11 }}
              tickFormatter={(value) =>
                value >= 100000
                  ? `₹${value / 100000}L`
                  : `₹${value / 1000}K`
              }
            />

            <Tooltip
              formatter={(value) =>
                formatCurrency(Number(value))
              }
            />

            <Legend />

            <Bar
              dataKey="collection"
              name="Collection"
              fill="#2F6B5F"
              radius={[6, 6, 0, 0]}
            />

            <Bar
              dataKey="expenses"
              name="Expenses"
              fill="#D9C79A"
              radius={[6, 6, 0, 0]}
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

      {/* Balance */}

      <div className="mt-5 bg-[#163832] rounded-xl p-5 text-white flex items-center justify-between">

        <div className="flex items-center gap-3">

          <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
            <FaWalletIcon />
          </div>

          <div>
            <p className="text-xs text-[#BFD0CA]">
              Available Balance
            </p>

            <p className="text-xl font-bold">
              {formatCurrency(data.balance)}
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}

function FaWalletIcon() {
  return <span className="text-[#D9C79A]">₹</span>;
}
