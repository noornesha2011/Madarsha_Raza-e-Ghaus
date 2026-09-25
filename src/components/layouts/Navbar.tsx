import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import Logo from "../ui/Logo";
import { useAppSelector } from "../../app/hooks";

const links = [
  { to: "/", label: "Home" },
  { to: "/announcements",label: "Announcements" },
  { to: "/payment/receipt-status", label: "Receipt Status" },
  { to: "/commite/members", label: "Our Members" },
  
];


export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const { isAuthenticated } = useAppSelector(
    (state) => state.auth
  );


  const visibleLinks = isAuthenticated
    ? [
      { to: "/", label: "Home" },
      { to: "/dashboard", label: "Dashboard" },
      { to: "/announcements", label: "Announcements" },
    ]
    : links;

  const linkClass = ({
    isActive,
  }: {
    isActive: boolean;
  }) =>
    `font-medium transition hover:text-emerald-700 ${isActive ? "text-emerald-800" : "text-gray-700"
    }`;

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav
      className="sticky top-0 z-50 border-b border-emerald-100 bg-white/95 shadow-sm backdrop-blur"
      aria-label="Main navigation"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        <Logo />

        {/* Desktop */}
        <div className="hidden items-center gap-8 md:flex">
          {visibleLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={linkClass}
            >
              {link.label}
            </NavLink>
          ))}

          {!isAuthenticated && (
            <>
              <NavLink
                to="/login"
                className={linkClass}
              >
                Log in
              </NavLink>

              <Link
                to="/register"
                className="rounded-lg border border-emerald-700 px-4 py-2.5 font-semibold text-emerald-800 transition hover:bg-emerald-50"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile button */}
        <button
          type="button"
          className="rounded-lg border border-emerald-200 p-2 text-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-200 md:hidden"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? (
            <FaTimes aria-hidden="true" />
          ) : (
            <FaBars aria-hidden="true" />
          )}
        </button>
      </div>

      {/* Mobile */}
      {menuOpen && (
        <div className="border-t border-emerald-100 bg-white px-6 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            {visibleLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={linkClass}
                onClick={closeMenu}
              >
                {link.label}
              </NavLink>
            ))}

            {!isAuthenticated && (
              <>
                <NavLink
                  to="/login"
                  className={linkClass}
                  onClick={closeMenu}
                >
                  Log in
                </NavLink>

                <Link
                  to="/register"
                  onClick={closeMenu}
                  className="rounded-lg border border-emerald-700 px-4 py-3 text-center font-semibold text-emerald-800"
                >
                  Register
                </Link>
              </>
            )}

            <Link
              to="/donate"
              onClick={closeMenu}
              className="rounded-lg bg-emerald-700 px-4 py-3 text-center font-semibold text-white"
            >
              Donate now
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

