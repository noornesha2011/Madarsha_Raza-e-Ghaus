import { Link } from "react-router-dom";
import UrduName from "../ui/UrduName";

const Footer = () => {
  return (
    <footer className="bg-emerald-950 text-white">
      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-10 md:grid-cols-3">

          {/* Brand */}
          <div> 
           <h2 className="text-2xl font-bold text-white">
              <UrduName />
            </h2>

            <p className="mt-2 text-lg font-semibold text-emerald-200">
              Madarsa Raza-e-Gaus
            </p>

            <p className="mt-4 max-w-sm text-sm leading-6 text-emerald-100/70">
              Supporting Islamic education and the development of our
              community through transparent and meaningful contributions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">
              Quick Links
            </h3>

            <div className="flex flex-col gap-3 text-sm">
              <Link
                to="/"
                className="text-emerald-100/70 transition hover:text-white"
              >
                Home
              </Link>

              <Link
                to="/dashboard"
                className="text-emerald-100/70 transition hover:text-white"
              >
                Dashboard
              </Link>

              <Link
                to="/announcements"
                className="text-emerald-100/70 transition hover:text-white"
              >
                Announcements
              </Link>

              <Link
                to="/register"
                className="text-emerald-100/70 transition hover:text-white"
              >
                Register
              </Link>

              <Link
                to="/donate"
                className="text-emerald-100/70 transition hover:text-white"
              >
                Donate
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">
              Contact Us
            </h3>

            <div className="space-y-3 text-sm text-emerald-100/70">
              <p>
                📍 02, Darji Tola, Bishunpura, Gopalganj, Bihar
              </p>

              <p>
                📞 +91 1234567890
              </p>

              <p>
                ✉️ madarsarazaegaus@gmail.com
              </p>
            </div>

            {/* Donate Button */}
            <Link
              to="/donate"
              className="mt-6 inline-block rounded-lg bg-amber-500 px-5 py-2.5 font-semibold text-emerald-950 transition hover:bg-amber-400"
            >
              Support Our Cause
            </Link>
          </div>
        </div>
      </div>
      {/* Bottom Bar */}
      <div className="border-t border-emerald-800">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-5 text-sm text-emerald-100/60 md:flex-row">
          <p>
            © {new Date().getFullYear()} Madarsa Raza-e-Gaus. All rights reserved.
          </p>

          <p>
            Built with trust &amp; transparency.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
