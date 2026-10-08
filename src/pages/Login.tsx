import { useState, type FormEvent } from "react";
import { isAxiosError } from "axios";
import {
  FiEye,
  FiEyeOff,
  FiHeart,
  FiLock,
  FiLogIn,
  FiUser,
  FiShield,
  FiArrowRight,
} from "react-icons/fi";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { useAppDispatch } from "../app/hooks";
import { loginDonor } from "../api/authApi";
import {
  loginFailure,
  loginStart,
  loginSuccess,
} from "../features/authSlice";

import Button from "../components/ui/Button";
import UrduName from "../components/ui/UrduName";

export default function Login() {
  const [donorId, setDonorId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const registered = Boolean(
    (location.state as { registered?: boolean } | null)?.registered
  );

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const parsedDonorId = Number(donorId);

    if (
      !Number.isInteger(parsedDonorId) ||
      parsedDonorId <= 0
    ) {
      setError("Please enter a valid donor ID.");
      return;
    }

    if (!password) {
      setError("Please enter your password.");
      return;
    }

    try {
      setSubmitting(true);
      setError(null);

      dispatch(loginStart());

      const response = await loginDonor({
        donor_id: parsedDonorId,
        password,
      });

      const token =
        response.access_token || response.token;

      if (!token) {
        const message =
          "Login response did not include an access token.";

        setError(message);
        dispatch(loginFailure(message));
        return;
      }

      localStorage.setItem(
        "access_token",
        token
      );

      dispatch(
        loginSuccess({
          id:
            response.donor?.id ||
            parsedDonorId,
          name:
            response.donor?.name ||
            "Donor",
          email:
            response.donor?.email || "",
          monthly_amount:
            response.donor?.monthly_amount ||
            0,
        })
      );

      navigate("/dashboard", {
        replace: true,
      });
    } catch (requestError: unknown) {
      const message = isAxiosError<{
        detail?: string;
        message?: string;
      }>(requestError)
        ? requestError.response?.data?.detail ||
          requestError.response?.data?.message ||
          "Unable to log in with this donor ID."
        : "Unable to log in with this donor ID.";

      setError(message);
      dispatch(loginFailure(message));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main
      className="
        relative min-h-[calc(100vh-74px)]
        overflow-hidden
        bg-[#FFFCF5]
      "
    >
      {/* =====================================================
          BACKGROUND DECORATION
      ====================================================== */}

      <div
        className="
          pointer-events-none absolute
          -left-32 -top-32
          h-80 w-80
          rounded-full
          bg-emerald-200/30
          blur-3xl
          animate-[float_8s_ease-in-out_infinite]
        "
      />

      <div
        className="
          pointer-events-none absolute
          -bottom-40 -right-32
          h-96 w-96
          rounded-full
          bg-amber-200/20
          blur-3xl
          animate-[float_10s_ease-in-out_infinite_reverse]
        "
      />

      {/* subtle decorative circles */}

      <div
        className="
          pointer-events-none absolute
          right-[12%] top-[18%]
          hidden h-24 w-24
          rounded-full
          border border-amber-300/30
          lg:block
          animate-[spin_20s_linear_infinite]
        "
      />

      <div
        className="
          pointer-events-none absolute
          bottom-[15%] left-[12%]
          hidden h-16 w-16
          rounded-full
          border border-emerald-300/30
          lg:block
          animate-[pulse_4s_ease-in-out_infinite]
        "
      />

      {/* =====================================================
          MAIN CONTAINER
      ====================================================== */}

      <div
        className="
          relative z-10
          mx-auto flex
          min-h-[calc(100vh-74px)]
          max-w-7xl
          items-center
          justify-center
          px-4 py-10
          sm:px-6
          lg:px-8
        "
      >
        <div
          className="
            grid w-full
            max-w-5xl
            overflow-hidden
            rounded-[28px]
            border border-emerald-900/10
            bg-white
            shadow-[0_25px_80px_rgba(6,78,59,0.13)]
            animate-[loginCard_0.7s_ease-out]
            lg:grid-cols-[0.9fr_1.1fr]
          "
        >
          {/* =================================================
              LEFT BRAND PANEL
          ================================================== */}

          <aside
            className="
              relative hidden
              overflow-hidden
              bg-[#064E3B]
              px-10 py-12
              text-white
              lg:flex
              lg:flex-col
              lg:justify-between
            "
          >
            {/* Decorative glow */}

            <div
              className="
                absolute
                -right-24 -top-24
                h-64 w-64
                rounded-full
                bg-emerald-400/10
                blur-2xl
              "
            />

            <div
              className="
                absolute
                -bottom-32 -left-20
                h-72 w-72
                rounded-full
                bg-amber-400/10
                blur-3xl
              "
            />

            <div className="relative z-10">

              {/* Islamic icon */}

              <div
                className="
                  mb-8 flex
                  h-16 w-16
                  items-center justify-center
                  rounded-2xl
                  border border-amber-300/30
                  bg-emerald-900/60
                  shadow-lg
                  animate-[float_5s_ease-in-out_infinite]
                "
              >
                <FiHeart
                  className="
                    text-2xl
                    text-[#D4AF37]
                  "
                />
              </div>

              <p
                className="
                  mb-2
                  text-xs font-bold
                  uppercase
                  tracking-[0.25em]
                  text-amber-300
                "
              >
                Welcome to
              </p>

              <h1
                className="
                  text-3xl
                  font-bold
                  leading-tight
                  text-white
                "
              >
                <UrduName />
              </h1>

              <p
                className="
                  mt-3
                  text-lg font-semibold
                  text-emerald-200
                "
              >
                Madarsa Raza-e-Gaus
              </p>

              <div
                className="
                  mt-6 h-px w-16
                  bg-[#D4AF37]
                "
              />

              <p
                className="
                  mt-6
                  max-w-sm
                  text-sm
                  leading-7
                  text-emerald-100/75
                "
              >
                Securely access your donor account,
                track your contributions, and stay
                connected with the Madarsa community.
              </p>

              {/* Features */}

              <div className="mt-8 space-y-4">

                <div className="flex items-center gap-3">
                  <div
                    className="
                      flex h-9 w-9
                      items-center justify-center
                      rounded-lg
                      bg-white/10
                      text-amber-300
                    "
                  >
                    <FiShield />
                  </div>

                  <div>
                    <p className="text-sm font-semibold">
                      Secure access
                    </p>

                    <p className="text-xs text-emerald-100/60">
                      Protected donor account
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div
                    className="
                      flex h-9 w-9
                      items-center justify-center
                      rounded-lg
                      bg-white/10
                      text-amber-300
                    "
                  >
                    <FiHeart />
                  </div>

                  <div>
                    <p className="text-sm font-semibold">
                      Transparent giving
                    </p>

                    <p className="text-xs text-emerald-100/60">
                      Track your contributions
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Bottom quote */}

            <div
              className="
                relative z-10
                border-l-2
                border-amber-400/60
                pl-4
              "
            >
              <p
                className="
                  text-sm italic
                  leading-6
                  text-emerald-100/70
                "
              >
                “Every contribution helps build
                a better future for our community.”
              </p>
            </div>
          </aside>

          {/* =================================================
              LOGIN FORM
          ================================================== */}

          <section
            className="
              px-6 py-9
              sm:px-10 sm:py-12
              lg:px-14 lg:py-14
            "
          >
            {/* Mobile brand */}

            <div
              className="
                mb-8 flex
                items-center gap-3
                lg:hidden
              "
            >
              <div
                className="
                  flex h-11 w-11
                  items-center justify-center
                  rounded-xl
                  bg-emerald-50
                  text-emerald-700
                "
              >
                <FiHeart />
              </div>

              <div>
                <p
                  className="
                    text-sm font-bold
                    text-emerald-900
                  "
                >
                  Madarsa Raza-e-Gaus
                </p>

                <p className="text-xs text-slate-500">
                  Donor Portal
                </p>
              </div>
            </div>

            {/* Heading */}

            <div
              className="
                animate-[fadeUp_0.7s_ease-out_0.1s_both]
              "
            >
              <div
                className="
                  mb-3 flex
                  items-center gap-2
                "
              >
                <span
                  className="
                    h-1.5 w-1.5
                    rounded-full
                    bg-[#D4AF37]
                  "
                />

                <p
                  className="
                    text-xs font-bold
                    uppercase
                    tracking-[0.2em]
                    text-emerald-700
                  "
                >
                  Welcome back
                </p>
              </div>

              <h2
                className="
                  text-3xl
                  font-bold
                  tracking-tight
                  text-[#064E3B]
                  sm:text-4xl
                "
              >
                Donor Login
              </h2>

              <p
                className="
                  mt-3
                  max-w-md
                  text-sm
                  leading-6
                  text-slate-500
                "
              >
                Sign in using the donor ID assigned
                during registration.
              </p>
            </div>

            {/* Registered message */}

            {registered && (
              <div
                className="
                  mt-6
                  flex items-start gap-3
                  rounded-xl
                  border border-emerald-100
                  bg-emerald-50
                  px-4 py-3
                  text-sm
                  text-emerald-800
                  animate-[fadeUp_0.4s_ease-out]
                "
                role="status"
              >
                <FiShield className="mt-0.5 shrink-0" />

                <span>
                  Registration successful.
                  Use your donor ID to log in.
                </span>
              </div>
            )}

            {/* =================================================
                FORM
            ================================================== */}

            <form
              className="
                mt-8 space-y-5
                animate-[fadeUp_0.7s_ease-out_0.2s_both]
              "
              onSubmit={handleSubmit}
              noValidate
            >
              {/* Donor ID */}

              <div>
                <label
                  htmlFor="donor-id"
                  className="
                    mb-2 block
                    text-sm font-semibold
                    text-slate-700
                  "
                >
                  Donor ID
                </label>

                <div className="group relative">

                  <FiUser
                    className="
                      absolute left-4 top-1/2
                      -translate-y-1/2
                      text-slate-400
                      transition-colors
                      group-focus-within:text-emerald-700
                    "
                  />

                  <input
                    id="donor-id"
                    type="text"
                    inputMode="numeric"
                    value={donorId}
                    onChange={(event) =>
                      setDonorId(event.target.value)
                    }
                    placeholder="Enter your donor ID"
                    autoComplete="username"
                    className={`
                      w-full
                      rounded-xl
                      border
                      bg-slate-50/50
                      py-3.5
                      pl-11 pr-4
                      text-sm
                      text-slate-800
                      outline-none
                      transition-all duration-200

                      placeholder:text-slate-400

                      focus:bg-white
                      focus:ring-4

                      ${
                        error
                          ? `
                            border-red-300
                            focus:border-red-500
                            focus:ring-red-50
                          `
                          : `
                            border-slate-200
                            focus:border-emerald-600
                            focus:ring-emerald-50
                          `
                      }
                    `}
                  />
                </div>
              </div>

              {/* Password */}

              <div>
                <div className="mb-2 flex items-center justify-between">

                  <label
                    htmlFor="password"
                    className="
                      text-sm font-semibold
                      text-slate-700
                    "
                  >
                    Password
                  </label>

                </div>

                <div className="group relative">

                  <FiLock
                    className="
                      absolute left-4 top-1/2
                      -translate-y-1/2
                      text-slate-400
                      transition-colors
                      group-focus-within:text-emerald-700
                    "
                  />

                  <input
                    id="password"
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    value={password}
                    onChange={(event) =>
                      setPassword(event.target.value)
                    }
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    className={`
                      w-full
                      rounded-xl
                      border
                      bg-slate-50/50
                      py-3.5
                      pl-11 pr-12
                      text-sm
                      text-slate-800
                      outline-none
                      transition-all duration-200

                      placeholder:text-slate-400

                      focus:bg-white
                      focus:ring-4

                      ${
                        error
                          ? `
                            border-red-300
                            focus:border-red-500
                            focus:ring-red-50
                          `
                          : `
                            border-slate-200
                            focus:border-emerald-600
                            focus:ring-emerald-50
                          `
                      }
                    `}
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        (visible) => !visible
                      )
                    }
                    className="
                      absolute right-3 top-1/2
                      -translate-y-1/2
                      rounded-lg
                      p-2
                      text-slate-400
                      transition
                      hover:bg-emerald-50
                      hover:text-emerald-700
                    "
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showPassword ? (
                      <FiEyeOff />
                    ) : (
                      <FiEye />
                    )}
                  </button>
                </div>
              </div>

              {/* Error */}

              {error && (
                <div
                  className="
                    flex items-start gap-3
                    rounded-xl
                    border border-red-100
                    bg-red-50
                    px-4 py-3
                    text-sm
                    text-red-700
                    animate-[shake_0.35s_ease-in-out]
                  "
                  role="alert"
                >
                  <span
                    className="
                      mt-0.5
                      flex h-5 w-5
                      shrink-0
                      items-center justify-center
                      rounded-full
                      bg-red-100
                      text-xs font-bold
                    "
                  >
                    !
                  </span>

                  <span>{error}</span>
                </div>
              )}

              {/* Submit */}

              <Button
                type="submit"
                loading={submitting}
                className="
                  group
                  w-full
                  !rounded-xl
                  !bg-[#064E3B]
                  !py-3.5
                  font-semibold
                  shadow-[0_6px_18px_rgba(6,78,59,0.18)]
                  transition-all duration-300
                  hover:!bg-[#047857]
                  hover:-translate-y-0.5
                  hover:shadow-[0_10px_25px_rgba(6,78,59,0.22)]
                  active:translate-y-0
                "
              >
                <span className="flex items-center justify-center gap-2">
                  <FiLogIn
                    className="
                      transition-transform duration-300
                      group-hover:translate-x-0.5
                    "
                  />

                  Log in

                  <FiArrowRight
                    className="
                      transition-transform duration-300
                      group-hover:translate-x-1
                    "
                  />
                </span>
              </Button>
            </form>

            {/* Bottom */}

            <div
              className="
                mt-8
                border-t border-slate-100
                pt-6
                text-center
              "
            >
              <p className="text-sm text-slate-500">
                Don't have a donor ID?{" "}
                <Link
                  to="/register"
                  className="
                    font-semibold
                    text-emerald-700
                    transition-colors
                    hover:text-emerald-900
                  "
                >
                  Register now
                </Link>
              </p>
            </div>

            {/* Security note */}

            <div
              className="
                mt-5
                flex items-center
                justify-center gap-2
                text-xs
                text-slate-400
              "
            >
              <FiShield className="text-emerald-600" />
              Secure donor authentication
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
