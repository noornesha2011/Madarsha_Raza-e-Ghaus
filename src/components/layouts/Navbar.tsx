import { useState } from "react";
import {
  FiHome,
  FiBell,
  FiUsers,
  FiFileText,
  FiGrid,
  FiLogIn,
  FiUserPlus,
  FiHeart,
  FiMenu,
  FiX,
  FiChevronRight,
} from "react-icons/fi";

import { Link, NavLink } from "react-router-dom";
import Logo from "../ui/Logo";
import { useAppSelector } from "../../app/hooks";

const publicLinks = [
  {
    to: "/",
    label: "Home",
    icon: FiHome,
  },
  {
    to: "/a",
    label: "Announcements",
    icon: FiBell,
  },
  {
    to: "/payment/receipt-status",
    label: "Receipt Status",
    icon: FiFileText,
  },
  {
    to: "/commite/members",
    label: "Members",
    icon: FiUsers,
  },
];

const privateLinks = [
  {
    to: "/",
    label: "Home",
    icon: FiHome,
  },
  {
    to: "/dashboard",
    label: "Dashboard",
    icon: FiGrid,
  },
  {
    to: "/a",
    label: "Announcements",
    icon: FiBell,
  },
  {
    to: "/payment/receipt-status",
    label: "Receipt Status",
    icon: FiFileText,
  },
  {
    to: "/commite/members",
    label: "Members",
    icon: FiUsers,
  },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const { isAuthenticated } = useAppSelector(
    (state) => state.auth
  );

  const links = isAuthenticated
    ? privateLinks
    : publicLinks;

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav
      className="
        sticky top-0 z-50
        border-b border-emerald-900/10
        bg-white/90 backdrop-blur-xl
        shadow-[0_4px_25px_rgba(6,78,59,0.06)]
      "
    >
      <div
        className="
          mx-auto flex h-[74px]
          max-w-7xl items-center justify-between
          px-4 sm:px-6 lg:px-8
        "
      >
        {/* ================= LOGO ================= */}

        <Link
          to="/"
          onClick={closeMenu}
          className="
            group shrink-0
            transition-transform duration-300
            hover:scale-[1.02]
          "
        >
          <Logo />
        </Link>

        {/* ================= DESKTOP ================= */}

        <div className="hidden items-center md:flex">

          {/* Navigation */}

          <div className="flex items-center gap-1">

            {links.map((link) => {
              const Icon = link.icon;

              return (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className="group relative"
                >
                  {({ isActive }) => (
                    <div
                      className={`
                        relative flex items-center gap-2
                        rounded-xl px-3.5 py-2.5
                        text-[13px] font-semibold
                        transition-all duration-300

                        ${
                          isActive
                            ? `
                              bg-emerald-50
                              text-emerald-800
                            `
                            : `
                              text-slate-600
                              hover:bg-emerald-50/70
                              hover:text-emerald-700
                            `
                        }
                      `}
                    >
                      <Icon
                        className={`
                          text-[16px]
                          transition-transform duration-300
                          ${
                            isActive
                              ? "text-emerald-700"
                              : "group-hover:-translate-y-0.5"
                          }
                        `}
                      />

                      <span>{link.label}</span>

                      {/* Active indicator */}

                      {isActive && (
                        <span
                          className="
                            absolute
                            bottom-0 left-1/2
                            h-[3px] w-5
                            -translate-x-1/2
                            rounded-full
                            bg-[#C9A227]
                            animate-[fadeIn_0.3s_ease-out]
                          "
                        />
                      )}
                    </div>
                  )}
                </NavLink>
              );
            })}
          </div>

          {/* Divider */}

          <div className="mx-4 h-7 w-px bg-slate-200" />

          {/* Authentication */}

          {!isAuthenticated ? (
            <div className="flex items-center gap-2">

              <Link
                to="/login"
                className="
                  group flex items-center gap-2
                  rounded-xl
                  px-3.5 py-2.5
                  text-[13px] font-semibold
                  text-slate-600
                  transition-all duration-300
                  hover:bg-slate-50
                  hover:text-emerald-700
                "
              >
                <FiLogIn
                  className="
                    transition-transform duration-300
                    group-hover:translate-x-0.5
                  "
                />

                Log in
              </Link>

              <Link
                to="/register"
                className="
                  group flex items-center gap-2
                  rounded-xl
                  border border-emerald-700
                  px-4 py-2.5
                  text-[13px] font-semibold
                  text-emerald-800
                  transition-all duration-300

                  hover:bg-emerald-50
                  hover:shadow-[0_4px_15px_rgba(4,120,87,0.12)]

                  active:scale-95
                "
              >
                <FiUserPlus
                  className="
                    transition-transform duration-300
                    group-hover:-translate-y-0.5
                  "
                />

                Register
              </Link>

            </div>
          ) : null}

          {/* Donate */}

          <Link
            to="/donate"
            className="
              group ml-3
              flex items-center gap-2
              rounded-xl
              bg-emerald-800
              px-4 py-2.5
              text-[13px] font-semibold
              text-white

              shadow-[0_4px_14px_rgba(6,78,59,0.18)]

              transition-all duration-300

              hover:-translate-y-0.5
              hover:bg-emerald-700
              hover:shadow-[0_7px_20px_rgba(6,78,59,0.22)]

              active:translate-y-0
              active:scale-95
            "
          >
            <FiHeart
              className="
                transition-transform duration-300
                group-hover:scale-110
              "
            />

            Donate

            <FiChevronRight
              className="
                text-sm
                transition-transform duration-300
                group-hover:translate-x-1
              "
            />
          </Link>
        </div>

        {/* ================= MOBILE BUTTON ================= */}

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          className="
            flex h-10 w-10
            items-center justify-center
            rounded-xl
            border border-emerald-100
            bg-emerald-50
            text-emerald-800

            transition-all duration-300

            hover:bg-emerald-100
            hover:shadow-sm
            active:scale-90

            md:hidden
          "
          aria-label={
            menuOpen
              ? "Close menu"
              : "Open menu"
          }
        >
          {menuOpen ? (
            <FiX
              className="
                text-xl
                animate-[spin_0.2s_ease-out]
              "
            />
          ) : (
            <FiMenu
              className="text-xl"
            />
          )}
        </button>
      </div>

      {/* ================= MOBILE MENU ================= */}

      <div
        className={`
          overflow-hidden
          border-t border-emerald-100
          bg-white
          transition-all duration-300
          md:hidden

          ${
            menuOpen
              ? "max-h-[650px] opacity-100"
              : "max-h-0 opacity-0"
          }
        `}
      >
        <div className="px-4 py-5 sm:px-6">

          <div className="space-y-1">

            {links.map((link) => {
              const Icon = link.icon;

              return (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={closeMenu}
                >
                  {({ isActive }) => (
                    <div
                      className={`
                        flex items-center
                        justify-between
                        rounded-xl
                        px-4 py-3.5
                        text-sm font-semibold
                        transition-all duration-200

                        ${
                          isActive
                            ? "bg-emerald-50 text-emerald-800"
                            : "text-slate-600 hover:bg-slate-50"
                        }
                      `}
                    >
                      <div className="flex items-center gap-3">

                        <Icon
                          className={`
                            text-lg
                            ${
                              isActive
                                ? "text-emerald-700"
                                : "text-slate-400"
                            }
                          `}
                        />

                        {link.label}
                      </div>

                      <FiChevronRight
                        className="
                          text-slate-300
                        "
                      />
                    </div>
                  )}
                </NavLink>
              );
            })}
          </div>

          {/* Divider */}

          <div className="my-4 h-px bg-slate-100" />

          {/* Auth */}

          {!isAuthenticated && (
            <div className="grid grid-cols-2 gap-3">

              <Link
                to="/login"
                onClick={closeMenu}
                className="
                  flex items-center
                  justify-center gap-2
                  rounded-xl
                  border border-slate-200
                  px-4 py-3
                  text-sm font-semibold
                  text-slate-700

                  transition-all duration-200
                  hover:border-emerald-200
                  hover:bg-emerald-50
                "
              >
                <FiLogIn />
                Log in
              </Link>

              <Link
                to="/register"
                onClick={closeMenu}
                className="
                  flex items-center
                  justify-center gap-2
                  rounded-xl
                  bg-emerald-800
                  px-4 py-3
                  text-sm font-semibold
                  text-white

                  transition-all duration-200
                  hover:bg-emerald-700
                  active:scale-95
                "
              >
                <FiUserPlus />
                Register
              </Link>

            </div>
          )}

          {/* Mobile Donate */}

          <Link
            to="/donate"
            onClick={closeMenu}
            className="
              group mt-3
              flex items-center
              justify-center gap-2
              rounded-xl
              bg-emerald-800
              px-4 py-3.5
              text-sm font-bold
              text-white

              shadow-[0_5px_18px_rgba(6,78,59,0.18)]

              transition-all duration-300
              hover:bg-emerald-700
              active:scale-[0.98]
            "
          >
            <FiHeart
              className="
                transition-transform duration-300
                group-hover:scale-110
              "
            />

            Donate Now

            <FiChevronRight
              className="
                transition-transform duration-300
                group-hover:translate-x-1
              "
            />
          </Link>
        </div>
      </div>
    </nav>
  );
}
