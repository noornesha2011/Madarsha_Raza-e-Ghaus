
import { useQuery } from "@tanstack/react-query";
import {
  FiAlertCircle,
  FiBell,
  FiCalendar,
  FiChevronRight,
  FiClock,
  FiFileText,
  FiInfo,
} from "react-icons/fi";
import { getAnnouncements } from "../api/announcementApi";

interface Announcement {
  id: number | string;
  title: string;
  message: string;
  created_at?: string;
  created_At?: string;
}

const Announcements = () => {
  const {
    data,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["Announcements"],
    queryFn: getAnnouncements,
  });

  const announcements: Announcement[] = Array.isArray(data) ? data : [];

  // --------------------------------------------------
  // Date helpers
  // --------------------------------------------------

  const getAnnouncementDate = (announcement: Announcement) => {
    return announcement.created_at ?? announcement.created_At ?? "";
  };

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

  // --------------------------------------------------
  // Loading
  // --------------------------------------------------

  if (isLoading) {
    return (
      <section className="min-h-[70vh] bg-[#f8faf9] px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">

          {/* Header skeleton */}
          <div className="mb-10 flex flex-col items-center">
            <div className="h-7 w-32 animate-pulse rounded-full bg-gray-200" />
            <div className="mt-5 h-16 w-16 animate-pulse rounded-2xl bg-gray-200" />
            <div className="mt-5 h-8 w-56 animate-pulse rounded-lg bg-gray-200" />
            <div className="mt-4 h-4 w-80 max-w-full animate-pulse rounded bg-gray-200" />
          </div>

          {/* Announcement skeletons */}
          <div className="space-y-4">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="h-24 animate-pulse rounded-2xl border border-gray-100 bg-white shadow-sm"
              >
                <div className="flex h-full items-center gap-4 px-6">
                  <div className="h-10 w-10 rounded-xl bg-gray-200" />
                  <div className="flex-1">
                    <div className="h-4 w-2/3 rounded bg-gray-200" />
                    <div className="mt-3 h-3 w-4/5 rounded bg-gray-100" />
                  </div>
                  <div className="hidden h-8 w-24 rounded bg-gray-100 sm:block" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // --------------------------------------------------
  // Error
  // --------------------------------------------------

  if (isError) {
    return (
      <section className="relative min-h-[70vh] overflow-hidden bg-[#f8faf9] px-4 py-16 sm:px-6">

        <div className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-emerald-100/60 blur-3xl" />
        <div className="pointer-events-none absolute -right-32 bottom-10 h-72 w-72 rounded-full bg-amber-100/40 blur-3xl" />

        <div className="relative mx-auto max-w-xl">
          <div className="rounded-[28px] border border-red-100 bg-white p-8 text-center shadow-xl shadow-red-900/5 sm:p-10">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-red-500">
              <FiAlertCircle size={30} />
            </div>

            <h2 className="mt-6 text-xl font-bold text-slate-900">
              Unable to load announcements
            </h2>

            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
              We couldn't retrieve the latest announcements right now.
              Please try again later.
            </p>
          </div>
        </div>
      </section>
    );
  }

  // --------------------------------------------------
  // Empty state
  // --------------------------------------------------

  if (announcements.length === 0) {
    return (
      <section className="relative min-h-[70vh] overflow-hidden bg-[#f8faf9] px-4 py-16 sm:px-6">

        <div className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-emerald-100/60 blur-3xl" />
        <div className="pointer-events-none absolute -right-32 bottom-10 h-72 w-72 rounded-full bg-amber-100/40 blur-3xl" />

        <div className="relative mx-auto max-w-xl">
          <div className="rounded-[28px] border border-[#e2ebe7] bg-white p-10 text-center shadow-xl shadow-emerald-900/5">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#064e3b] text-white shadow-lg shadow-emerald-900/20">
              <FiBell size={28} />
            </div>

            <h2 className="mt-6 text-xl font-bold text-[#064e3b]">
              No Announcements
            </h2>

            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
              There are no announcements available at the moment.
              Please check back later for new updates.
            </p>

            <div className="mx-auto mt-6 h-px w-20 bg-[#d4af37]" />
          </div>
        </div>
      </section>
    );
  }

  // --------------------------------------------------
  // Main UI
  // --------------------------------------------------

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#f8faf9] px-4 py-12 sm:px-6 lg:px-8">

      {/* Background decoration */}
      <div className="pointer-events-none absolute -left-40 top-10 h-96 w-96 rounded-full bg-emerald-100/50 blur-3xl" />

      <div className="pointer-events-none absolute -right-40 top-[35%] h-96 w-96 rounded-full bg-amber-100/40 blur-3xl" />

      <div className="relative mx-auto max-w-5xl">

        {/* =====================================================
            HEADER
        ====================================================== */}

        <header className="mb-10 text-center">

          {/* Status badge */}
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#cfe1da] bg-white px-4 py-2 text-xs font-bold tracking-[0.12em] text-[#064e3b] shadow-sm">

            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#d4af37] opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#d4af37]" />
            </span>

            LATEST UPDATES
          </div>

          {/* Main icon */}
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-[20px] bg-[#064e3b] text-white shadow-xl shadow-emerald-900/20">

            <FiBell size={28} strokeWidth={1.8} />
          </div>

          {/* Heading */}
          <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-[#064e3b] sm:text-4xl">
            Announcements
          </h1>

          {/* Gold divider */}
          <div className="mx-auto mt-4 flex items-center justify-center gap-2">
            <div className="h-px w-8 bg-[#d4af37]/50" />
            <div className="h-1 w-10 rounded-full bg-[#d4af37]" />
            <div className="h-px w-8 bg-[#d4af37]/50" />
          </div>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
            Stay informed about the latest news, important notices,
            events and updates from Madarsa Raza-e-Gaus.
          </p>
        </header>

        {/* =====================================================
            LIST HEADER
        ====================================================== */}

        <div className="mb-5 flex items-center justify-between">

          <div className="flex items-center gap-2">

            <FiFileText
              className="text-[#064e3b]"
              size={16}
            />

            <p className="text-sm text-slate-500">
              <span className="font-bold text-[#064e3b]">
                {announcements.length}
              </span>{" "}
              {announcements.length === 1
                ? "announcement"
                : "announcements"}
            </p>
          </div>

          <div className="hidden items-center gap-2 text-xs font-medium text-slate-400 sm:flex">

            <span className="h-1.5 w-1.5 rounded-full bg-[#d4af37]" />

            Latest updates
          </div>
        </div>

        {/* =====================================================
            ANNOUNCEMENT LIST
        ====================================================== */}

        <div className="space-y-4">

          {announcements.map((announcement, index) => {

            const createdAt = getAnnouncementDate(announcement);
            const isNew = isNewAnnouncement(createdAt);

            return (
              <article
                key={announcement.id}
                className="group relative overflow-hidden rounded-2xl border border-[#dfe9e5] bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#bdd5cc] hover:shadow-xl hover:shadow-emerald-900/5"
              >

                {/* Left accent */}
                <div className="absolute left-0 top-0 h-full w-1 bg-[#064e3b] transition-all duration-300 group-hover:w-1.5" />

                <div className="flex min-h-[94px] items-center gap-4 px-5 py-4 sm:px-6">

                  {/* Number */}
                  <div className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#ecfdf5] text-xs font-extrabold text-[#064e3b] sm:flex">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  {/* Announcement icon */}
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#064e3b] text-white shadow-md shadow-emerald-900/15 transition-transform duration-300 group-hover:scale-105">

                    <FiInfo
                      size={19}
                      strokeWidth={2}
                    />
                  </div>

                  {/* Content */}
                  <div className="min-w-0 flex-1">

                    <div className="flex flex-wrap items-center gap-2">

                      <h2 className="truncate text-base font-bold text-slate-900 transition-colors duration-200 group-hover:text-[#064e3b] sm:text-lg">
                        {announcement.title}
                      </h2>

                      {isNew && (
                        <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[#d4af37] px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-[0.1em] text-white shadow-sm">

                          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />

                          NEW
                        </span>
                      )}
                    </div>

                    <p className="mt-1.5 line-clamp-1 text-sm leading-5 text-slate-500">
                      {announcement.message}
                    </p>
                  </div>

                  {/* Date */}
                  <div className="hidden shrink-0 text-right md:block">

                    <div className="flex items-center justify-end gap-1.5 text-xs font-semibold text-[#064e3b]">
                      <FiCalendar size={12} />
                      {formatDate(createdAt)}
                    </div>

                    {formatTime(createdAt) && (
                      <div className="mt-1 flex items-center justify-end gap-1 text-[11px] text-slate-400">
                        <FiClock size={11} />
                        {formatTime(createdAt)}
                      </div>
                    )}
                  </div>

                  {/* Arrow */}
                  <div className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-50 text-slate-400 transition-all duration-300 group-hover:bg-[#064e3b] group-hover:text-white sm:flex">
                    <FiChevronRight size={17} />
                  </div>
                </div>

                {/* Mobile metadata */}
                <div className="flex items-center gap-3 border-t border-slate-100 px-5 py-2.5 sm:px-6 md:hidden">

                  <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                    <FiCalendar size={11} />
                    {formatDate(createdAt)}
                  </div>

                  {formatTime(createdAt) && (
                    <>
                      <span className="h-1 w-1 rounded-full bg-slate-300" />

                      <div className="flex items-center gap-1 text-[11px] text-slate-400">
                        <FiClock size={11} />
                        {formatTime(createdAt)}
                      </div>
                    </>
                  )}
                </div>

              </article>
            );
          })}
        </div>

        {/* =====================================================
            FOOTER
        ====================================================== */}

        <div className="mt-12 text-center">

          <div className="mx-auto flex max-w-xl items-center gap-4">

            <div className="h-px flex-1 bg-[#dce6e2]" />

            <div className="flex h-7 w-7 items-center justify-center rounded-full border border-[#d4af37]/30 bg-white text-[#d4af37]">
              <span className="text-xs">✦</span>
            </div>

            <div className="h-px flex-1 bg-[#dce6e2]" />
          </div>

          <p className="mt-5 text-[10px] font-semibold tracking-[0.18em] text-slate-400 sm:text-xs">
            MADARSA RAZA-E-GAUS
          </p>

          <p className="mt-1 text-[9px] tracking-[0.12em] text-slate-400 sm:text-[10px]">
            BISHUNPURA • GOPALGANJ • BIHAR
          </p>
        </div>

      </div>
    </section>
  );
};

export default Announcements;
