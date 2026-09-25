import { useEffect, useState } from "react";
import { FaUsers, FaMosque } from "react-icons/fa6";

import MemberList from "../components/ui/MemberList";
import type { Member } from "../types/members";
import { getMembers } from "../api/memberApi";

const Members = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const data = await getMembers();
        setMembers(data);
      } catch (error) {
        console.error("Failed to fetch members:", error);
        setError("Unable to load members.");
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <section className="bg-emerald-950 px-6 py-16 text-white">
        <div className="mx-auto max-w-7xl text-center">

          <div className="mb-5 flex justify-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-amber-500 text-emerald-950">
              <FaUsers size={38} />
            </div>
          </div>

          <h1 className="text-4xl font-bold">
            Our Members
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-emerald-100/80">
            Meet the dedicated members who support
            Madarsa Raza-e-Gaus and our community.
          </p>

          <p
            dir="rtl"
            className="mt-5 text-2xl font-semibold text-amber-400"
          >
            مدرسہ رضائے غوث
          </p>

        </div>
      </section>

      {/* Members */}
      <section className="px-6 py-14">
        <div className="mx-auto max-w-7xl">

          <div className="mb-10 text-center">
            <FaMosque
              size={40}
              className="mx-auto text-emerald-700"
            />

            <h2 className="mt-4 text-3xl font-bold text-gray-900">
              Management Committee
            </h2>

            <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-amber-500" />
          </div>

          {/* Loading */}
          {loading && (
            <div className="py-12 text-center text-gray-500">
              Loading members...
            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center text-red-600">
              {error}
            </div>
          )}

          {/* Empty */}
          {!loading && !error && members.length === 0 && (
            <div className="py-12 text-center text-gray-500">
              No members found.
            </div>
          )}

          {/* Members */}
          {!loading && !error && members.length > 0 && (
            <MemberList members={members} />
          )}

        </div>
      </section>

    </div>
  );
};

export default Members;