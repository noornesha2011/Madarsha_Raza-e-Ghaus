import MemberCard, { type Member } from "./MemberCard";

interface MemberListProps {
  members: Member[];
}

const MemberList = ({ members }: MemberListProps) => {
  return (
    <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
      {members.map((member) => (
        <MemberCard
          key={member.id}
          member={member}
        />
      ))}
    </div>
  );
};

export default MemberList;