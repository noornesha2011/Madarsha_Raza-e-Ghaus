
import {
  FaLocationDot,
  FaUserTie,
} from "react-icons/fa6";
import { FiArrowRight } from "react-icons/fi";

import type { Member } from "../../types/members";

interface MemberListProps {
  members: Member[];
}

const MemberList = ({ members }: MemberListProps) => {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {members.map((member) => (
        <article
          key={member.id}
          className="group relative overflow-hidden rounded-[26px] border border-slate-100 bg-white shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-[#cbded7] hover:shadow-2xl hover:shadow-emerald-900/10"
        >

          {/* Top green section */}
          <div className="relative h-24 overflow-hidden bg-[#064e3b]">

            {/* Pattern */}
            <div
              className="absolute inset-0 opacity-[0.07]"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
                backgroundSize: "18px 18px",
              }}
            />

            {/* Gold glow */}
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#d4af37]/20 blur-2xl" />

            {/* Role badge */}
            <div className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full border border-white/10 bg-white/10 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-white backdrop-blur-sm">
              <FaUserTie size={9} />
              Committee
            </div>
          </div>

          {/* Profile image */}
          <div className="relative -mt-14 flex justify-center">

            <div className="relative">

              {/* Gold outer ring */}
              <div className="rounded-full bg-[#d4af37] p-1 shadow-xl">

                <div className="rounded-full bg-white p-1">

                  <img
                    src={
                      member.image ||
                      "https://via.placeholder.com/300x300?text=Member"
                    }
                    alt={member.name}
                    className="h-24 w-24 rounded-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                </div>
              </div>

              {/* Active indicator */}
              <div className="absolute bottom-1 right-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-[#064e3b]">
                <span className="h-2 w-2 rounded-full bg-[#6ee7b7]" />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="px-5 pb-6 pt-4 text-center">

            {/* Name */}
            <h3 className="truncate text-lg font-extrabold text-slate-900 transition-colors group-hover:text-[#064e3b]">
              {member.name}
            </h3>

            {/* Role */}
            <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.14em] text-[#b28b28]">
              {member.designation}
            </p>

            {/* Divider */}
            <div className="mx-auto my-4 flex items-center justify-center gap-1.5">
              <span className="h-px w-8 bg-slate-100" />
              <span className="h-1 w-1 rounded-full bg-[#d4af37]" />
              <span className="h-px w-8 bg-slate-100" />
            </div>

            {/* Location */}
            <div className="flex items-center justify-center gap-2 text-xs text-slate-500">

              <FaLocationDot
                size={12}
                className="shrink-0 text-[#064e3b]"
              />

              <span className="truncate">
                {member.address || "Gopalganj, Bihar"}
              </span>
            </div>

            {/* Bottom action */}
            <div className="mt-5 flex items-center justify-center">

              <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#064e3b] transition-all duration-300 group-hover:gap-2.5">
                View Member

                <FiArrowRight size={13} />
              </div>

            </div>
          </div>

          {/* Bottom gold line */}
          <div className="absolute bottom-0 left-0 h-1 w-0 bg-[#d4af37] transition-all duration-500 group-hover:w-full" />
        </article>
      ))}
    </div>
  );
};

export default MemberList;
