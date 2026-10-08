import { useEffect, useState } from "react";
import {
  FaUsers,
  FaMosque,
} from "react-icons/fa6";
import { FiCheckCircle } from "react-icons/fi";
import firoz from '../assets/firoz.png'
import MemberList from "../components/ui/MemberList";
import type { Member } from "../types/members";
import { getMembers } from "../api/memberApi";

// Temporary UI mock data
const MOCK_MEMBERS: Member[] = [
  {
     id: 1,
     name: "Firoz Alam",
     designation:"Secretary",
     mobile: "123456789",
     address: "Bishunpura, Gopalganj, Bihar",
     image: firoz,
  },
];  

const Members = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const data = await getMembers();

        setMembers(data.length > 0 ? data : MOCK_MEMBERS);
      } catch (err) {
        console.error("Failed to fetch members:", err);

        // Temporary fallback for UI development
        setMembers(MOCK_MEMBERS);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  return (
    <main className="min-h-screen bg-[#fafcfb]">

      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="relative overflow-hidden bg-[#063b2f]">

        {/* Islamic-style background pattern */}
        <div className="absolute inset-0 opacity-[0.035]">
          <div
            className="h-full w-full"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
              backgroundSize: "28px 28px",
            }}
          />
        </div>

        {/* Glow */}
        <div className="absolute -left-40 -top-40 rounded-full bg-emerald-400/10 blur-3xl" />

        <div className="absolute -bottom-52 -right-32 rounded-full bg-[#d4af37]/10 blur-3xl" />

        

        {/* Bottom curve */}
        <div className="absolute bottom-0 left-0 right-0 h-8 rounded-t-[50%] bg-[#fafcfb]" />
      </section>

      {/* =====================================================
          MEMBERS SECTION
      ====================================================== */}

      <section className="relative px-5 py-14 sm:px-6 sm:py-20 lg:px-8">

        <div className="mx-auto max-w-7xl">

          {/* Section heading */}
          <div className="mx-auto mb-12 max-w-2xl text-center">

            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e9f5f1] text-[#064e3b]">
              <FaMosque size={22} />
            </div>

            <p className="mt-5 text-[11px] font-bold uppercase tracking-[0.2em] text-[#b28b28]">
              Madarsa Raza-e-Gaus
            </p>

            <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
              Management Committee
            </h2>

            <p className="mt-4 text-sm leading-6 text-slate-500 sm:text-base">
              The dedicated people working together for the
              administration and development of our institution.
            </p>

            <div className="mx-auto mt-6 flex items-center justify-center gap-2">
              <span className="h-px w-8 bg-[#d4af37]/40" />
              <span className="h-1 w-10 rounded-full bg-[#d4af37]" />
              <span className="h-px w-8 bg-[#d4af37]/40" />
            </div>
          </div>

          {/* Loading */}
          {loading && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

              {Array.from({ length: 8 }).map((_, index) => (
                <div
                  key={index}
                  className="overflow-hidden border border-slate-100 bg-white p-6 shadow-sm"
                >
                  <div className="mx-auto h-28 w-28 animate-pulse rounded-full bg-slate-200" />

                  <div className="mx-auto mt-5 h-5 w-32 animate-pulse rounded bg-slate-200" />

                  <div className="mx-auto mt-3 h-3 w-24 animate-pulse rounded bg-slate-100" />

                  <div className="mx-auto mt-5 h-3 w-40 animate-pulse rounded bg-slate-100" />
                </div>
              ))}
            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <div className="mx-auto max-w-lg border border-red-100 bg-white p-10 text-center shadow-sm">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-500">
                !
              </div>

              <h3 className="mt-5 text-lg font-bold text-slate-900">
                Unable to load members
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                {error}
              </p>
            </div>
          )}

          {/* Members */}
          {!loading && !error && members.length > 0 && (
            <MemberList members={members} />
          )}

          {/* Empty */}
          {!loading && !error && members.length === 0 && (
            <div className="mx-auto max-w-lg border border-slate-100 bg-white p-10 text-center shadow-sm">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#e9f5f1] text-[#064e3b]">
                <FaUsers size={26} />
              </div>

              <h3 className="mt-5 text-lg font-bold text-slate-900">
                No members found
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                Member information will appear here once available.
              </p>
            </div>
          )}

          {/* Bottom information */}
          {!loading && members.length > 0 && (
            <div className="mt-14 flex justify-center">

              <div className="inline-flex items-center gap-2 rounded-full border border-[#dce9e4] bg-white px-5 py-2.5 text-xs font-semibold text-[#064e3b] shadow-sm">
                <FiCheckCircle className="text-[#b28b28]" size={14} />

                {members.length} registered{" "}
                {members.length === 1 ? "member" : "members"}
              </div>

            </div>
          )}

        </div>
      </section>

      {/* Bottom decoration */}
      <div className="pb-10 text-center">
        <div className="mx-auto flex max-w-md items-center gap-4 px-6">
          <div className="h-px flex-1 bg-slate-200" />

          <span className="text-[#d4af37]">✦</span>

          <div className="h-px flex-1 bg-slate-200" />
        </div>

        <p className="mt-4 text-[10px] font-semibold tracking-[0.2em] text-slate-400">
          BISHUNPURA • GOPALGANJ • BIHAR
        </p>
      </div>
    </main>
  );
};

export default Members;
