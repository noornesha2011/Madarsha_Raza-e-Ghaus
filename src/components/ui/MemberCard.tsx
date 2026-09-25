import {
  FaPhone,
  FaLocationDot,
  FaUserTie,
} from "react-icons/fa6";

export interface Member {
  id: number;
  name: string;
  role: string;
  village: string;
  phone?: string;
  image?: string;
}

interface MemberCardProps {
  member: Member;
}

const MemberCard = ({ member }: MemberCardProps) => {
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

      {/* Top decorative area */}
      <div className="h-24 from-emerald-950 via-emerald-900 to-emerald-800" />

      {/* Profile Image */}
      <div className="absolute left-1/2 top-12 -translate-x-1/2">
        <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-4 border-white bg-emerald-50 shadow-lg">

          {member.image ? (
            <img
              src={member.image}
              alt={member.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <FaUserTie
              size={38}
              className="text-emerald-700"
            />
          )}

        </div>
      </div>

      {/* Content */}
      <div className="px-6 pb-6 pt-16 text-center">

        <h3 className="text-xl font-bold text-gray-900">
          {member.name}
        </h3>

        {/* Role */}
        <span className="mt-2 inline-flex rounded-full bg-amber-50 px-4 py-1 text-sm font-semibold text-amber-700">
          {member.role}
        </span>

        {/* Details */}
        <div className="mt-5 space-y-2 border-t border-gray-100 pt-4 text-sm text-gray-500">

          <div className="flex items-center justify-center gap-2">
            <FaLocationDot className="text-emerald-700" />
            <span>{member.village}</span>
          </div>

          {member.phone && (
            <div className="flex items-center justify-center gap-2">
              <FaPhone className="text-emerald-700" />
              <span>{member.phone}</span>
            </div>
          )}

        </div>

      </div>

      {/* Bottom accent */}
      <div className="h-1 w-full from-emerald-800 via-amber-500 to-emerald-800" />

    </article>
  );
};

export default MemberCard;