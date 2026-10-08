
import { Link } from "react-router-dom";
import {
  FaArrowRight,
  FaCheck,
  FaHeart,
  FaMosque,
  FaUsers,
} from "react-icons/fa6";
import {
  FiArrowUpRight,
  FiBookOpen,
  FiHeart,
  FiShield,
  FiTrendingUp,
} from "react-icons/fi";

import UrduName from "../components/ui/UrduName";

const Home = () => {
  return (
    <main className="min-h-screen overflow-hidden bg-[#FAF6EC] text-slate-900">

      {/* =========================================================
          HERO
      ========================================================== */}

      <section className="relative overflow-hidden bg-emerald-950">

        {/* Subtle pattern */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.035]">
          <div
            className="h-full w-full"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
              backgroundSize: "30px 30px",
            }}
          />
        </div>

        {/* Decorative glow */}
        <div className="pointer-events-none absolute -right-40 -top-40 h-96 w-96 rounded-full bg-emerald-700/30 blur-3xl" />

        <div className="pointer-events-none absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-amber-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 py-16 sm:py-20 lg:px-8 lg:py-24">

          <div className="grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr]">

            {/* LEFT */}
            <div className="animate-[fadeUp_.7s_ease-out]">

              {/* Badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/25 bg-amber-400/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.15em] text-amber-300 backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                Serving Our Community
              </div>

              {/* Heading */}
              <h1 className="mt-7 max-w-3xl text-4xl font-black leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
                Madarsa
                <span className="block text-emerald-200">
                  Raza-E-Gaus
                </span>
              </h1>

              {/* Gold line */}
              <div className="mt-6 flex items-center gap-3">
                <div className="h-1 w-16 rounded-full bg-amber-400" />
                <div className="h-px w-16 bg-amber-400/30" />
              </div>

              {/* Description */}
              <p className="mt-6 max-w-2xl text-base leading-7 text-emerald-100/75 sm:text-lg">
                Supporting Islamic education, community development
                and meaningful service through collective effort,
                trust and transparency.
              </p>

              {/* Urdu */}
              <div className="mt-7">
                <UrduName />
              </div>

              {/* CTA */}
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">

                <Link
                  to="/donate"
                  className="group inline-flex items-center justify-center gap-3 rounded-xl bg-amber-400 px-6 py-3.5 text-sm font-bold text-emerald-950 shadow-lg shadow-black/10 transition-all duration-300 hover:-translate-y-0.5 hover:bg-amber-300 hover:shadow-xl"
                >
                  <FiHeart size={17} />

                  Support Our Mission

                  <FaArrowRight
                    size={13}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>

                <Link
                  to="/register"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.06] px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/10"
                >
                  Become a Member
                  <FiArrowUpRight size={16} />
                </Link>

              </div>

            </div>

            {/* RIGHT VISUAL */}
            <div className="relative mx-auto w-full max-w-md lg:max-w-none">

              {/* Outer circle */}
              <div className="relative mx-auto aspect-square max-w-[390px]">

                <div className="absolute inset-5 rounded-full border border-amber-400/20" />

                <div className="absolute inset-10 rounded-full border border-amber-400/10" />

                {/* Main circle */}
                <div className="absolute inset-14 flex items-center justify-center rounded-full bg-emerald-900 shadow-2xl shadow-black/20">

                  <div className="text-center">

                    <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-[28px] bg-amber-400 text-emerald-950 shadow-xl">
                      <FaMosque size={48} />
                    </div>

                    <p className="mt-6 text-sm font-bold tracking-[0.2em] text-amber-300">
                      EDUCATION
                    </p>

                    <p className="mt-1 text-sm font-medium text-emerald-200/70">
                      FAITH • SERVICE • COMMUNITY
                    </p>

                  </div>

                </div>

                {/* Floating stat */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 shadow-xl backdrop-blur-md">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-400 text-emerald-950">
                      <FaUsers size={15} />
                    </div>

                    <div>
                      <p className="text-xs font-bold text-white">
                        Community
                      </p>
                      <p className="text-[10px] text-emerald-100/60">
                        Growing together
                      </p>
                    </div>
                  </div>
                </div>

                {/* Floating trust */}
                <div className="absolute bottom-8 right-0 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 shadow-xl backdrop-blur-md">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500 text-white">
                      <FiShield size={16} />
                    </div>

                    <div>
                      <p className="text-xs font-bold text-white">
                        Transparent
                      </p>
                      <p className="text-[10px] text-emerald-100/60">
                        Built on trust
                      </p>
                    </div>
                  </div>
                </div>

              </div>

            </div>

          </div>
        </div>

        {/* Bottom transition */}
        <div className="absolute bottom-0 left-0 right-0 h-8 rounded-t-[50%] bg-[#FAF6EC]" />
      </section>


      {/* =========================================================
          VALUES
      ========================================================== */}

      <section className="px-6 py-16 sm:py-20 lg:px-8">

        <div className="mx-auto max-w-7xl">

          {/* Heading */}
          <div className="mx-auto max-w-2xl text-center">

            <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-600">
              What We Stand For
            </p>

            <h2 className="mt-3 text-3xl font-black tracking-tight text-emerald-950 sm:text-4xl">
              Faith. Education. Community.
            </h2>

            <p className="mt-4 text-sm leading-6 text-slate-500 sm:text-base">
              Our work is guided by a simple commitment to
              education, service and responsible community building.
            </p>

          </div>

          {/* Cards */}
          <div className="mt-12 grid gap-5 md:grid-cols-3">

            {/* Education */}
            <article className="group rounded-[24px] border border-[#e8e1d2] bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-950/5">

              <div className="flex items-center justify-between">

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-800 transition-transform duration-300 group-hover:scale-105">
                  <FiBookOpen size={22} />
                </div>

                <FiArrowUpRight
                  className="text-slate-300 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-emerald-700"
                  size={20}
                />

              </div>

              <h3 className="mt-6 text-xl font-bold text-emerald-950">
                Islamic Education
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                Supporting meaningful religious education and
                learning opportunities for our community.
              </p>

              <div className="mt-6 h-px bg-[#eee8da]" />

              <p className="mt-4 text-xs font-bold uppercase tracking-wider text-amber-600">
                Knowledge & Growth
              </p>

            </article>

            {/* Community */}
            <article className="group rounded-[24px] border border-[#e8e1d2] bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-950/5">

              <div className="flex items-center justify-between">

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-700 transition-transform duration-300 group-hover:scale-105">
                  <FaUsers size={21} />
                </div>

                <FiArrowUpRight
                  className="text-slate-300 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-emerald-700"
                  size={20}
                />

              </div>

              <h3 className="mt-6 text-xl font-bold text-emerald-950">
                Community
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                Bringing people together through shared values,
                cooperation and collective responsibility.
              </p>

              <div className="mt-6 h-px bg-[#eee8da]" />

              <p className="mt-4 text-xs font-bold uppercase tracking-wider text-amber-600">
                Unity & Service
              </p>

            </article>

            {/* Trust */}
            <article className="group rounded-[24px] border border-[#e8e1d2] bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-950/5">

              <div className="flex items-center justify-between">

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-800 transition-transform duration-300 group-hover:scale-105">
                  <FiShield size={22} />
                </div>

                <FiArrowUpRight
                  className="text-slate-300 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-emerald-700"
                  size={20}
                />

              </div>

              <h3 className="mt-6 text-xl font-bold text-emerald-950">
                Transparency
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                Building trust through responsible management,
                accountability and clear financial information.
              </p>

              <div className="mt-6 h-px bg-[#eee8da]" />

              <p className="mt-4 text-xs font-bold uppercase tracking-wider text-amber-600">
                Trust & Accountability
              </p>

            </article>

          </div>
        </div>
      </section>


      {/* =========================================================
          ABOUT / PURPOSE
      ========================================================== */}

      <section className="border-y border-[#e7dfcf] bg-white px-6 py-16 sm:py-20 lg:px-8">

        <div className="mx-auto max-w-7xl">

          <div className="grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr]">

            {/* Visual */}
            <div className="relative">

              <div className="relative overflow-hidden rounded-[28px] bg-emerald-950 p-8 sm:p-10">

                <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-emerald-800/40 blur-2xl" />

                <div className="relative">

                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-400 text-emerald-950">
                    <FaMosque size={30} />
                  </div>

                  <p
                    dir="rtl"
                    className="mt-8 text-3xl font-semibold text-amber-300"
                  >
                    مدرسہ رضائے غوث
                  </p>

                  <p className="mt-4 text-sm leading-7 text-emerald-100/70">
                    A community built around education,
                    faith and service.
                  </p>

                  <div className="mt-8 grid grid-cols-2 gap-3">

                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <FiBookOpen
                        className="text-amber-300"
                        size={20}
                      />

                      <p className="mt-3 text-xs font-semibold text-white">
                        Education
                      </p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <FiHeart
                        className="text-amber-300"
                        size={20}
                      />

                      <p className="mt-3 text-xs font-semibold text-white">
                        Service
                      </p>
                    </div>

                  </div>

                </div>
              </div>

              {/* Gold accent */}
              <div className="absolute -bottom-3 -right-3 h-16 w-16 rounded-br-[24px] border-b-2 border-r-2 border-amber-500" />

            </div>

            {/* Content */}
            <div>

              <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-600">
                About Our Institution
              </p>

              <h2 className="mt-3 text-3xl font-black tracking-tight text-emerald-950 sm:text-4xl">
                Growing through faith,
                <span className="block text-emerald-700">
                  learning and service.
                </span>
              </h2>

              <p className="mt-5 text-sm leading-7 text-slate-500 sm:text-base">
                Madarsa Raza-E-Gaus is committed to supporting
                Islamic education and serving the needs of our
                local community.
              </p>

              <div className="mt-7 space-y-4">

                {[
                  "Supporting Islamic learning and education",
                  "Encouraging community participation",
                  "Maintaining responsible financial practices",
                  "Creating opportunities for collective service",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3"
                  >
                    <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                      <FaCheck size={10} />
                    </div>

                    <p className="text-sm text-slate-600">
                      {item}
                    </p>
                  </div>
                ))}

              </div>

              <div className="mt-8">
                <Link
                  to="/donate"
                  className="group inline-flex items-center gap-2 text-sm font-bold text-emerald-800"
                >
                  Support our work

                  <FaArrowRight
                    size={12}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>
              </div>

            </div>

          </div>
        </div>
      </section>


      {/* =========================================================
          TRANSPARENCY
      ========================================================== */}

      <section className="px-6 py-16 sm:py-20 lg:px-8">

        <div className="mx-auto max-w-7xl">

          <div className="overflow-hidden rounded-[28px] bg-emerald-950">

            <div className="grid lg:grid-cols-[1fr_0.8fr]">

              {/* Text */}
              <div className="p-8 sm:p-10 lg:p-14">

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-400 text-emerald-950">
                  <FiTrendingUp size={22} />
                </div>

                <p className="mt-7 text-xs font-bold uppercase tracking-[0.2em] text-amber-300">
                  Built on Trust
                </p>

                <h2 className="mt-3 text-3xl font-black text-white sm:text-4xl">
                  Transparency matters.
                </h2>

                <p className="mt-5 max-w-xl text-sm leading-7 text-emerald-100/70">
                  We believe community contributions should be
                  handled responsibly. Our platform is designed
                  to make donations, collections and financial
                  information easier to manage and understand.
                </p>

                <div className="mt-8 grid gap-3 sm:grid-cols-2">

                  <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
                    <FiShield className="text-amber-300" />

                    <span className="text-xs font-semibold text-white">
                      Responsible management
                    </span>
                  </div>

                  <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
                    <FiTrendingUp className="text-amber-300" />

                    <span className="text-xs font-semibold text-white">
                      Clear financial records
                    </span>
                  </div>

                </div>

              </div>

              {/* Right visual */}
              <div className="relative hidden min-h-[360px] overflow-hidden bg-emerald-900 lg:block">

                <div className="absolute inset-0 flex items-center justify-center">

                  <div className="relative flex h-64 w-64 items-center justify-center rounded-full border border-amber-400/20">

                    <div className="absolute inset-8 rounded-full border border-amber-400/10" />

                    <div className="text-center">

                      <FiShield
                        size={54}
                        className="mx-auto text-amber-300"
                      />

                      <p className="mt-5 text-lg font-bold text-white">
                        Trust
                      </p>

                      <p className="mt-1 text-xs text-emerald-100/50">
                        Transparency & accountability
                      </p>

                    </div>

                  </div>

                </div>

              </div>

            </div>
          </div>

        </div>
      </section>


      {/* =========================================================
          DONATION CTA
      ========================================================== */}

      <section className="bg-[#E9E0C9] px-6 py-16 sm:py-20 lg:px-8">

        <div className="mx-auto max-w-4xl text-center">

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-950 text-amber-300">
            <FaHeart size={23} />
          </div>

          <p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-amber-700">
            Make a Difference
          </p>

          <h2 className="mt-3 text-3xl font-black tracking-tight text-emerald-950 sm:text-4xl">
            Your contribution can help
            <span className="block text-emerald-700">
              build a better future.
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-600">
            Every contribution, big or small, can support education,
            community activities and the continued development of
            Madarsa Raza-E-Gaus.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">

            <Link
              to="/donate"
              className="group inline-flex items-center justify-center gap-3 rounded-xl bg-emerald-950 px-7 py-3.5 text-sm font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-emerald-900 hover:shadow-xl"
            >
              <FiHeart size={17} />

              Donate Now

              <FaArrowRight
                size={12}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>

            <Link
              to="/register"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-emerald-900/15 bg-white/50 px-7 py-3.5 text-sm font-bold text-emerald-950 transition-all duration-300 hover:bg-white"
            >
              Join Our Community
              <FiArrowUpRight size={16} />
            </Link>

          </div>

        </div>
      </section>


      {/* =========================================================
          FOOTER NOTE
      ========================================================== */}

      <section className="bg-emerald-950 px-6 py-8">

        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">

          <div>
            <p className="text-sm font-bold text-white">
              Madarsa Raza-E-Gaus
            </p>

            <p className="mt-1 text-xs text-emerald-100/50">
              Bishunpura, Gopalganj, Bihar
            </p>
          </div>

          <p
            dir="rtl"
            className="text-lg text-amber-300"
          >
            مدرسہ رضائے غوث
          </p>

        </div>

      </section>

    </main>
  );
};

export default Home;
