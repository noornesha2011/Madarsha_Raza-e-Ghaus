
import { useQuery } from "@tanstack/react-query";
import { getAnnouncements } from "../api/announcementApi";

const Announcements = () => {
  const {
    data,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["Announcements"],
    queryFn: getAnnouncements,
  });

  const announcements = Array.isArray(data) ? data : [];

  // Get announcement date
  const getAnnouncementDate = (announcement: any) => {
    // Change this to created_at if that is what your API returns
    return announcement.created_at ?? announcement.created_At;
  };

  // Check whether announcement is within the last 48 hours
  const isNewAnnouncement = (createdAt: string) => {
    if (!createdAt) return false;

    const createdTime = new Date(createdAt).getTime();

    if (Number.isNaN(createdTime)) return false;

    const currentTime = Date.now();
    const fortyEightHours = 48 * 60 * 60 * 1000;

    return (
      currentTime - createdTime <= fortyEightHours &&
      currentTime >= createdTime
    );
  };

  // Format date
  const formatDate = (createdAt: string) => {
    if (!createdAt) return "Date unavailable";

    const date = new Date(createdAt);

    if (Number.isNaN(date.getTime())) {
      return "Date unavailable";
    }

    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // Format time
  const formatTime = (createdAt: string) => {
    if (!createdAt) return "";

    const date = new Date(createdAt);

    if (Number.isNaN(date.getTime())) {
      return "";
    }

    return date.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isLoading) {
    return (
      <section className="min-h-[60vh] bg-[#f7faf8] px-4 py-12">
        <div className="mx-auto max-w-6xl">
          <div className="space-y-4">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="h-24 animate-pulse rounded-2xl bg-white shadow-sm"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="min-h-[60vh] bg-[#f7faf8] px-4 py-12">
        <div className="mx-auto max-w-xl rounded-3xl bg-white p-8 text-center shadow-lg">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-2xl">
            ⚠️
          </div>

          <h2 className="mt-5 text-xl font-bold text-gray-900">
            Unable to load announcements
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Please try again later.
          </p>
        </div>
      </section>
    );
  }

  if (announcements.length === 0) {
    return (
      <section className="min-h-[60vh] bg-[#f7faf8] px-4 py-12">
        <div className="mx-auto max-w-xl rounded-3xl bg-white p-10 text-center shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#163832] text-2xl text-white">
            📢
          </div>

          <h2 className="mt-5 text-xl font-bold text-[#163832]">
            No Announcements
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            There are no announcements available at the moment.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden bg-[#f7faf8] px-4 py-12 sm:px-6 lg:px-8">

      {/* Background decoration */}
      <div className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-[#dcebe6]/60 blur-3xl" />

      <div className="pointer-events-none absolute -right-32 top-80 h-72 w-72 rounded-full bg-[#e7dfc7]/40 blur-3xl" />

      <div className="relative mx-auto max-w-6xl">

        {/* Header */}
        <header className="mb-10 text-center">

          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#cbded7] bg-white px-4 py-2 text-xs font-semibold tracking-wide text-[#163832] shadow-sm">
            <span className="h-2 w-2 animate-pulse rounded-full bg-[#c69c45]" />
            LATEST UPDATES
          </div>

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#163832] text-2xl text-white shadow-xl">
            📢
          </div>

          <h1 className="mt-5 text-3xl font-bold tracking-tight text-[#163832] sm:text-4xl">
            Announcements
          </h1>

          <div className="mx-auto mt-3 h-1 w-14 rounded-full bg-[#c69c45]" />

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-gray-500 sm:text-base">
            Stay informed about the latest news, important notices,
            events and updates from Madarsa Raza-e-Gaus.
          </p>
        </header>

        {/* Count */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm text-gray-500">
            <span className="font-bold text-[#163832]">
              {announcements.length}
            </span>{" "}
            {announcements.length === 1
              ? "announcement"
              : "announcements"}
          </p>

          <div className="flex items-center gap-2 text-xs text-gray-400">
            <span className="h-2 w-2 rounded-full bg-[#c69c45]" />
            Latest updates
          </div>
        </div>

        {/* Announcement list */}
        <div className="space-y-4">

          {announcements.map((announcement: any, index: number) => {

            const createdAt = getAnnouncementDate(announcement);
            const isNew = isNewAnnouncement(createdAt);

            return (
              <article
                key={announcement.id}
                className="group relative overflow-hidden rounded-2xl border border-[#dfeae6] bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#bfd5cd] hover:shadow-lg"
              >

                {/* Left accent */}
                <div className="absolute left-0 top-0 h-full w-1 bg-[#163832]" />

                <div className="flex min-h-[90px] items-center gap-4 px-5 py-4 sm:px-6">

                  {/* Number */}
                  <div className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#163832]/10 text-sm font-bold text-[#163832] sm:flex">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  {/* Icon */}
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#163832] text-base text-white shadow-sm">
                    📌
                  </div>

                  {/* Content */}
                  <div className="min-w-0 flex-1">

                    <div className="flex flex-wrap items-center gap-2">

                      <h2 className="truncate text-base font-bold text-gray-900 transition-colors group-hover:text-[#163832] sm:text-lg">
                        {announcement.title}
                      </h2>

                      {isNew && (
                        <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-[#c69c45] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
                          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
                          NEW
                        </span>
                      )}

                    </div>

                    <p className="mt-1 line-clamp-1 text-sm text-gray-500">
                      {announcement.message}
                    </p>

                  </div>

                  {/* Desktop date */}
                  <div className="hidden shrink-0 text-right md:block">

                    <p className="text-xs font-semibold text-[#163832]">
                      {formatDate(createdAt)}
                    </p>

                    {formatTime(createdAt) && (
                      <p className="mt-1 text-[11px] text-gray-400">
                        {formatTime(createdAt)}
                      </p>
                    )}

                  </div>

                  {/* Arrow */}
                  <div className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-50 text-gray-400 transition-all duration-300 group-hover:bg-[#163832] group-hover:text-white sm:flex">
                    →
                  </div>

                </div>

                {/* Mobile date */}
                <div className="border-t border-gray-100 px-5 py-2.5 sm:px-6 md:hidden">
                  <p className="text-[11px] text-gray-400">
                    📅 {formatDate(createdAt)}

                    {formatTime(createdAt) && (
                      <> • {formatTime(createdAt)}</>
                    )}
                  </p>
                </div>

              </article>
            );
          })}

        </div>

        {/* Footer */}
        <div className="mt-10 text-center">
          <div className="mx-auto flex max-w-xl items-center gap-4">
            <div className="h-px flex-1 bg-[#dce6e2]" />

            <span className="text-[#c69c45]">✦</span>

            <div className="h-px flex-1 bg-[#dce6e2]" />
          </div>

          <p className="mt-4 text-[10px] font-medium tracking-[0.15em] text-gray-400 sm:text-xs">
            MADARSA RAZA-E-GAUS • BISHUNPURA, GOPALGANJ, BIHAR
          </p>
        </div>

      </div>
    </section>
  );
};

export default Announcements;

