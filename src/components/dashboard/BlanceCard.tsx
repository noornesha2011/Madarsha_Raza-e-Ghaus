import { FaWallet } from "react-icons/fa";

interface Props {
  balance: number;
}

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);

export default function BalanceCard({ balance }: Props) {
  const amount = Number(balance)
  return (
    <section className="bg-[#163832] rounded-2xl p-6 text-white">

      <div className="flex items-center gap-4">

        <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
          <FaWallet className="text-[#D9C79A]" size={20} />
        </div>

        <div>

          <p className="text-sm text-[#BFD0CA]">
            Madarsa Available Balance
          </p>

          <p className="text-3xl font-bold mt-1">
            {formatCurrency(amount)}
          </p>

        </div>

      </div>

      <p className="text-xs text-[#AFC3BC] mt-4">
        Current balance after recorded collections and expenses.
      </p>

    </section>
  );
}