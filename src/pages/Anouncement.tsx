import { FaBullhorn, FaCalendarAlt, FaMosque, FaThumbtack } from "react-icons/fa";

interface Announcement {
  id: number;
  title: string;
  description: string;
  date: string; // "12 Sep 2026"
  category: "General" | "Event" | "Donation" | "Important";
}

const announcements: Announcement[] = [
  {
    id: 1,
    title: "Monthly Donation Collection",
    description:
      "Monthly donations for Madarsa Raza-e-Gaus can now be submitted securely through our online donation portal.",
    date: "12 Sep 2026",
    category: "Donation",
  },
  {
    id: 2,
    title: "Milad-un-Nabi ﷺ Program",
    description:
      "A special Milad-un-Nabi ﷺ program will be organized at the Madarsa. All community members are warmly invited.",
    date: "20 Sep 2026",
    category: "Event",
  },
  {
    id: 3,
    title: "Madarsa Development Fund",
    description:
      "The Madarsa development fund is open for contributions to improve educational facilities and infrastructure.",
    date: "10 Sep 2026",
    category: "Donation",
  },
  {
    id: 4,
    title: "Important Notice for Donors",
    description:
      "Donors are requested to keep their registered mobile number and email address updated on their profile.",
    date: "05 Sep 2026",
    category: "Important",
  },
];

const categoryStyles: Record<Announcement["category"], string> = {
  General: "bg-[#EFE6D3] text-[#6B5A3A]",
  Event: "bg-[#E3EEEA] text-[#1F4A41]",
  Donation: "bg-[#F4E9D6] text-[#8A5A15]",
  Important: "bg-[#F3E3DA] text-[#8C3B23]",
};

function DateStub({ date }: { date: string }) {
  const [day, month, year] = date.split(" ");
  return (
    <div className="flex shrink-0 flex-col items-center justify-center px-1">
      <span className="font-serif text-2xl font-semibold leading-none text-[#163832]">
        {day}
      </span>
      <span className="mt-1 text-[11px] text-[#8C8571]">
        {month} {year}
      </span>
    </div>
  );
}

export default function Announcements() {
  const [featured, ...rest] = announcements;

  return (
    <div className="min-h-screen bg-[#f6efdc]">
      {/* ================= HEADER ================= */}
      <header className="relative overflow-hidden bg-[#163832]">
        {/* Geometric lattice motif, in place of a generic dot grid */}
        <svg
          className="absolute inset-0 h-full w-full opacity-[0.08]"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <pattern
              id="lattice"
              width="42"
              height="42"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M21 0 L42 21 L21 42 L0 21 Z"
                fill="none"
                stroke="#D9C79A"
                strokeWidth="1"
              />
              <circle cx="21" cy="21" r="3" fill="none" stroke="#D9C79A" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#lattice)" />
        </svg>

        <div className="relative mx-auto max-w-6xl px-5 py-12 sm:px-6 lg:px-8">
          <div className="flex items-start justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-xs text-[#B9CFC7]">
                <span>Madarsa Raza-e-Gaus</span>
                <span className="text-[#4F746A]">/</span>
                <span className="text-[#E7DDC3]">Announcements</span>
              </div>

              <h1 className="mt-3 font-serif text-4xl font-semibold text-[#FAF6EC] sm:text-5xl">
                Announcements
              </h1>

              <p className="mt-3 max-w-lg text-sm leading-6 text-[#C7D9D2] sm:text-base">
                Notices, programs, and donation updates for the Madarsa
                community, kept in one place.
              </p>
            </div>

            <div className="hidden shrink-0 border border-[#B08A45]/50 p-3 sm:block">
              <FaMosque size={22} className="text-[#D9B876]" />
            </div>
          </div>
        </div>
      </header>

      {/* ================= MAIN ================= */}
      <main className="mx-auto max-w-4xl px-5 py-14 sm:px-6 lg:px-8">
        <div className="mb-10 flex items-end justify-between border-b border-[#E1D6BE] pb-4">
          <h2 className="font-serif text-2xl font-semibold text-[#26251F]">
            What&apos;s happening
          </h2>
          <span className="text-sm text-[#8C8571]">
            {announcements.length} announcements
          </span>
        </div>

        {/* ================= PINNED NOTICE ================= */}
        <section className="relative mb-12 border border-[#D9C79A] bg-[#F1EAD9] px-6 py-7 sm:px-8">
          <div className="absolute inset-x-0 top-0 h-[3px] bg-[#A9793B]" />

          <div className="flex items-center gap-2 text-xs font-medium text-[#8A5A15]">
            <FaThumbtack size={11} />
            Pinned notice
          </div>

          <h3 className="mt-3 font-serif text-2xl font-semibold text-[#26251F] sm:text-[1.7rem]">
            {featured.title}
          </h3>

          <p className="mt-3 max-w-2xl text-[15px] leading-7 text-[#4B4636]">
            {featured.description}
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-4">
            <span
              className={`px-2.5 py-1 text-xs font-medium ${categoryStyles[featured.category]}`}
            >
              {featured.category}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-[#8C8571]">
              <FaCalendarAlt size={11} />
              {featured.date}
            </span>
            <a
              href="#"
              className="ml-auto text-sm font-medium text-[#163832] underline decoration-[#A9793B]/60 underline-offset-4 hover:decoration-[#A9793B]"
            >
              View details
            </a>
          </div>
        </section>

        {/* ================= NOTICE LIST ================= */}
        <div className="divide-y divide-[#E1D6BE] border-t border-[#E1D6BE]">
          {rest.map((announcement) => (
            <article
              key={announcement.id}
              className="flex gap-5 py-6 sm:gap-7"
            >
              <DateStub date={announcement.date} />
              <div className="w-px shrink-0 bg-[#E1D6BE]" />

              <div className="min-w-0 flex-1">
                <span
                  className={`inline-block px-2.5 py-1 text-[11px] font-medium ${categoryStyles[announcement.category]}`}
                >
                  {announcement.category}
                </span>

                <h3 className="mt-2 font-serif text-lg font-semibold text-[#26251F]">
                  {announcement.title}
                </h3>

                <p className="mt-1.5 max-w-2xl text-sm leading-6 text-[#5B5646]">
                  {announcement.description}
                </p>

                <a
                  href="#"
                  className="mt-3 inline-block text-sm font-medium text-[#163832] underline decoration-[#A9793B]/50 underline-offset-4 hover:decoration-[#A9793B]"
                >
                  Read more
                </a>
              </div>
            </article>
          ))}
        </div>
      </main>

      {/* ================= FOOTER PANEL ================= */}
      <section className="border-t border-[#2F5750] bg-[#163832] py-12">
        <div className="mx-auto flex max-w-2xl flex-col items-center px-5 text-center">
          <div className="border border-[#B08A45]/50 p-3">
            <FaBullhorn size={18} className="text-[#D9B876]" />
          </div>
          <h3 className="mt-4 font-serif text-xl font-semibold text-[#FAF6EC]">
            Stay connected with the Madarsa
          </h3>
          <p className="mt-2 max-w-md text-sm leading-6 text-[#C7D9D2]">
            Check this page for notices, programs, donation updates, and
            community activities as they are posted.
          </p>
        </div>
      </section>
    </div>
  );
}