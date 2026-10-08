import { Link } from "react-router-dom";
import {
  FiArrowUpRight,
  FiHeart,
  FiHome,
  FiMail,
  FiMapPin,
  FiPhone,
} from "react-icons/fi";
import { FaMosque } from "react-icons/fa6";
import UrduName from "../ui/UrduName";

const Footer = () => {
  return (
    <footer className="bg-emerald-950 text-white">
      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-6 pb-10 pt-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_0.8fr_1fr]">
          
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-amber-400/30 bg-emerald-900 text-amber-400">
                <FaMosque size={22} />
              </div>

              <div>
                <div className="text-xl font-bold leading-none">
                  <UrduName />
                </div>

                <p className="mt-1 text-sm font-medium text-emerald-300">
                  Madarsa Raza-e-Gaus
                </p>
              </div>
            </div>

            <p className="mt-6 max-w-md text-sm leading-7 text-emerald-100/65">
              Supporting Islamic education and strengthening our community
              through sincere contributions, responsible management, and
              transparent use of funds.
            </p>

            {/* Trust Badge */}
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-emerald-700/70 bg-emerald-900/50 px-4 py-2 text-xs font-medium text-emerald-200">
              <FiHeart className="text-amber-400" />
              Serving the community with trust
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-5 text-sm font-bold uppercase tracking-[0.16em] text-amber-400">
              Quick Links
            </h3>

            <nav className="flex flex-col gap-3">
              <Link
                to="/"
                className="group flex items-center gap-2 text-sm text-emerald-100/65 transition hover:text-white"
              >
                <FiHome className="text-emerald-500 transition group-hover:text-amber-400" />
                Home
              </Link>

              <Link
                to="/dashboard"
                className="group flex items-center gap-2 text-sm text-emerald-100/65 transition hover:text-white"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-700 transition group-hover:bg-amber-400" />
                Dashboard
              </Link>

              <Link
                to="/announcements"
                className="group flex items-center gap-2 text-sm text-emerald-100/65 transition hover:text-white"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-700 transition group-hover:bg-amber-400" />
                Announcements
              </Link>

              <Link
                to="/register"
                className="group flex items-center gap-2 text-sm text-emerald-100/65 transition hover:text-white"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-700 transition group-hover:bg-amber-400" />
                Register
              </Link>

              <Link
                to="/donate"
                className="group flex items-center gap-2 text-sm text-emerald-100/65 transition hover:text-white"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-700 transition group-hover:bg-amber-400" />
                Donate
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-5 text-sm font-bold uppercase tracking-[0.16em] text-amber-400">
              Contact Us
            </h3>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-900 text-amber-400">
                  <FiMapPin size={17} />
                </div>

                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-emerald-300/70">
                    Location
                  </p>
                  <p className="mt-1 text-sm leading-6 text-emerald-100/70">
                    Bishunpura, Gopalganj,
                    <br />
                    Bihar, India
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-900 text-amber-400">
                  <FiPhone size={17} />
                </div>

                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-emerald-300/70">
                    Phone
                  </p>
                  <p className="mt-1 text-sm text-emerald-100/70">
                    +91 1234567890
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-900 text-amber-400">
                  <FiMail size={17} />
                </div>

                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-emerald-300/70">
                    Email
                  </p>
                  <p className="mt-1 break-all text-sm text-emerald-100/70">
                    madarsarazaegaus@gmail.com
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Strip */}
        <div className="mt-14 flex flex-col gap-5 rounded-2xl border border-emerald-800 bg-emerald-900/50 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-lg font-semibold text-white">
              Support Islamic education
            </p>

            <p className="mt-1 text-sm text-emerald-100/60">
              Every contribution helps us continue our work for the community.
            </p>
          </div>

          <Link
            to="/donate"
            className="group inline-flex w-fit items-center gap-2 rounded-lg bg-amber-500 px-5 py-3 text-sm font-bold text-emerald-950 transition hover:bg-amber-400"
          >
            Support Our Cause
            <FiArrowUpRight
              size={17}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-emerald-900">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-5 text-xs text-emerald-100/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Madarsa Raza-e-Gaus. All rights
            reserved.
          </p>

          <p className="flex items-center gap-1.5">
            Built with
            <FiHeart className="text-amber-500" size={12} />
            trust &amp; transparency
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;