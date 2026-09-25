import { FaCalendarAlt, FaEnvelope, FaPhone, FaUser } from "react-icons/fa";
import type { DonorProfileResponse } from "../../types/dashboard";
import { formatCurrency, formatDate } from "../../uttils/formatter";

export default function DonorProfile({ data }: { data: DonorProfileResponse }) {
  const contactDetails = [
    { icon: <FaEnvelope aria-hidden="true" />, label: "Email", value: data.email || "Not provided" },
    { icon: <FaPhone aria-hidden="true" />, label: "Phone", value: data.phone || "Not provided" },
    { icon: <FaCalendarAlt aria-hidden="true" />, label: "Member since", value: formatDate(data.created_at) },
  ];

  return (
    <section className="rounded-2xl border border-[#E1D6BE] bg-white p-6" aria-labelledby="profile-heading">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E7F0ED] text-[#2F6B5F]" aria-hidden="true"><FaUser /></span>
          <div>
            <h2 id="profile-heading" className="text-lg font-semibold text-[#163832]">Donor profile</h2>
            <p className="text-sm text-[#718079]">Your registered account details</p>
          </div>
        </div>
        <p className="rounded-lg bg-[#F1EAD9] px-3 py-2 text-sm font-semibold text-[#163832]">Monthly pledge: {formatCurrency(data.monthly_amount)}</p>
      </div>
      <dl className="mt-6 grid gap-4 sm:grid-cols-3">
        {contactDetails.map(({ icon, label, value }) => (
          <div key={label} className="rounded-xl bg-[#FAF6EC] p-4">
            <dt className="flex items-center gap-2 text-xs font-medium text-[#718079]">{icon}{label}</dt>
            <dd className="mt-2 break-words text-sm font-semibold text-[#163832]">{value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
