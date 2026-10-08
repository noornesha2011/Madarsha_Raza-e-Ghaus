import { useState, type ChangeEvent, type FormEvent } from "react";
import { isAxiosError } from "axios";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiLock,
  FiEye,
  FiEyeOff,
  FiHeart,
  FiShield,
  FiCheckCircle,
  FiArrowRight,
  FiUserPlus,
} from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";

import Button from "../components/ui/Button";
import { registerDonor } from "../api/authApi";

type RegisterForm = {
  name: string;
  email: string;
  mobile: string;
  monthly_amount: string;
  address: string;
  password: string;
  confirmPassword: string;
};

type FieldName = keyof RegisterForm;
type FormErrors = Partial<Record<FieldName, string>>;

const initialForm: RegisterForm = {
  name: "",
  email: "",
  mobile: "",
  monthly_amount: "",
  address: "",
  password: "",
  confirmPassword: "",
};

const validate = (form: RegisterForm): FormErrors => {
  const errors: FormErrors = {};

  if (!form.name.trim()) {
    errors.name = "Full name is required";
  }

  if (!form.email.trim()) {
    errors.email = "Email address is required";
  } else if (
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
  ) {
    errors.email = "Enter a valid email address";
  }

  if (!form.mobile.trim()) {
    errors.mobile = "Mobile number is required";
  } else if (!/^\d+$/.test(form.mobile)) {
    errors.mobile = "Mobile number can contain digits only";
  } else if (
    form.mobile.length < 10 ||
    form.mobile.length > 15
  ) {
    errors.mobile = "Mobile number must be 10 to 15 digits";
  }

  if (
    !form.monthly_amount.trim() ||
    Number(form.monthly_amount) <= 0
  ) {
    errors.monthly_amount =
      "Enter a valid monthly contribution";
  }

  if (
    form.address.trim().length < 5 ||
    form.address.trim().length > 80
  ) {
    errors.address =
      "Address must be 5 to 80 characters";
  }

  if (
    form.password.length < 6 ||
    form.password.length > 20
  ) {
    errors.password =
      "Password must be 6 to 20 characters";
  }

  if (form.password !== form.confirmPassword) {
    errors.confirmPassword =
      "Passwords do not match";
  }

  return errors;
};

export default function Register() {
  const [form, setForm] =
    useState<RegisterForm>(initialForm);

  const [errors, setErrors] =
    useState<FormErrors>({});

  const [submitting, setSubmitting] =
    useState(false);

  const [submitError, setSubmitError] =
    useState<string | null>(null);

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [registrationResult, setRegistrationResult] =
    useState<{
      message: string;
      donorId?: number;
    } | null>(null);

  const navigate = useNavigate();

  const handleChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = event.target;
    const field = name as FieldName;

    const nextForm = {
      ...form,
      [field]: value,
    };

    setForm(nextForm);

    setErrors((current) => ({
      ...current,
      [field]: validate(nextForm)[field],
    }));

    if (submitError) {
      setSubmitError(null);
    }
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const validationErrors = validate(form);

    setErrors(validationErrors);
    setSubmitError(null);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    try {
      setSubmitting(true);

      const response = await registerDonor({
        name: form.name.trim(),
        email: form.email.trim(),
        mobile: form.mobile,
        monthly_amount: form.monthly_amount,
        password: form.password,
        address: form.address.trim(),
      });

      setRegistrationResult({
        message:
          response.message ||
          response.detail ||
          "Registration completed successfully.",
        donorId: response.donor_id,
      });
    } catch (error: unknown) {
      if (
        isAxiosError<{
          detail?: string;
          message?: string;
        }>(error)
      ) {
        setSubmitError(
          error.response?.data?.detail ||
            error.response?.data?.message ||
            "Registration failed. Please try again."
        );
      } else {
        setSubmitError(
          "Registration failed. Please try again."
        );
      }
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass = (field: FieldName) => `
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
      errors[field]
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
  `;

  return (
    <main
      className="
        relative
        min-h-[calc(100vh-74px)]
        overflow-hidden
        bg-[#FFFCF5]
        px-4 py-10
        sm:px-6
        lg:px-8
      "
    >
      {/* ===============================================
          BACKGROUND DECORATION
      ================================================ */}

      <div
        className="
          pointer-events-none
          absolute -left-32 -top-32
          h-80 w-80
          rounded-full
          bg-emerald-200/30
          blur-3xl
          animate-[float_8s_ease-in-out_infinite]
        "
      />

      <div
        className="
          pointer-events-none
          absolute -bottom-40 -right-32
          h-96 w-96
          rounded-full
          bg-amber-200/20
          blur-3xl
          animate-[float_10s_ease-in-out_infinite_reverse]
        "
      />

      {/* ===============================================
          MAIN CARD
      ================================================ */}

      <section
        className="
          relative z-10
          mx-auto
          w-full
          max-w-5xl
          overflow-hidden
          rounded-[28px]
          border border-emerald-900/10
          bg-white
          shadow-[0_25px_80px_rgba(6,78,59,0.12)]
          animate-[loginCard_0.7s_ease-out]
        "
      >
        <div className="grid lg:grid-cols-[0.8fr_1.2fr]">

          {/* =============================================
              LEFT INFORMATION PANEL
          ============================================== */}

          <aside
            className="
              relative
              hidden
              overflow-hidden
              bg-[#064E3B]
              px-10 py-12
              text-white
              lg:flex
              lg:flex-col
              lg:justify-between
            "
          >
            <div
              className="
                absolute
                -right-24 -top-24
                h-64 w-64
                rounded-full
                bg-emerald-400/10
                blur-3xl
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

              {/* Icon */}

              <div
                className="
                  flex h-16 w-16
                  items-center justify-center
                  rounded-2xl
                  border border-amber-300/30
                  bg-emerald-900/60
                  text-[#D4AF37]
                  shadow-lg
                  animate-[float_5s_ease-in-out_infinite]
                "
              >
                <FiUserPlus className="text-2xl" />
              </div>

              <p
                className="
                  mt-8
                  text-xs font-bold
                  uppercase
                  tracking-[0.25em]
                  text-amber-300
                "
              >
                Become a donor
              </p>

              <h1
                className="
                  mt-3
                  text-3xl
                  font-bold
                  leading-tight
                "
              >
                Join our
                <br />
                community
              </h1>

              <div
                className="
                  mt-5
                  h-px w-14
                  bg-[#D4AF37]
                "
              />

              <p
                className="
                  mt-6
                  text-sm
                  leading-7
                  text-emerald-100/75
                "
              >
                Create your donor account and
                keep your monthly contributions
                organized in one secure place.
              </p>

              {/* Benefits */}

              <div className="mt-9 space-y-5">

                <Benefit
                  icon={<FiHeart />}
                  title="Support the Madarsa"
                  description="Contribute regularly to our community."
                />

                <Benefit
                  icon={<FiShield />}
                  title="Secure account"
                  description="Your donor information stays protected."
                />

                <Benefit
                  icon={<FiCheckCircle />}
                  title="Track contributions"
                  description="View your donation history anytime."
                />

              </div>
            </div>

            {/* Bottom */}

            <div
              className="
                relative z-10
                mt-10
                rounded-xl
                border border-white/10
                bg-white/5
                p-4
              "
            >
              <p className="text-xs leading-5 text-emerald-100/60">
                Your donor ID will be generated
                after successful registration.
              </p>
            </div>
          </aside>

          {/* =============================================
              FORM PANEL
          ============================================== */}

          <div
            className="
              px-6 py-8
              sm:px-10 sm:py-10
              lg:px-12 lg:py-12
            "
          >

            {/* Mobile heading */}

            <div className="mb-8 lg:hidden">

              <div
                className="
                  mb-4 flex h-11 w-11
                  items-center justify-center
                  rounded-xl
                  bg-emerald-50
                  text-emerald-700
                "
              >
                <FiUserPlus />
              </div>

              <p
                className="
                  text-xs font-bold
                  uppercase
                  tracking-[0.2em]
                  text-emerald-700
                "
              >
                Join our community
              </p>
            </div>

            {/* Heading */}

            <header
              className="
                animate-[fadeUp_0.7s_ease-out_0.1s_both]
              "
            >
              <div
                className="
                  flex items-center gap-2
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
                  Donor registration
                </p>
              </div>

              <h2
                className="
                  mt-2
                  text-3xl
                  font-bold
                  tracking-tight
                  text-[#064E3B]
                  sm:text-4xl
                "
              >
                Create your account
              </h2>

              <p
                className="
                  mt-3
                  max-w-lg
                  text-sm
                  leading-6
                  text-slate-500
                "
              >
                Register once to manage your monthly
                contributions and donation records.
              </p>
            </header>

            {/* =========================================
                FORM
            ========================================== */}

            <form
              onSubmit={handleSubmit}
              className="
                mt-8 space-y-5
                animate-[fadeUp_0.7s_ease-out_0.2s_both]
              "
              noValidate
            >

              {/* Row 1 */}

              <div className="grid gap-5 md:grid-cols-2">

                <IconField
                  label="Full name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  error={errors.name}
                  icon={<FiUser />}
                  autoComplete="name"
                  inputClass={inputClass("name")}
                />

                <IconField
                  label="Email address"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  error={errors.email}
                  icon={<FiMail />}
                  autoComplete="email"
                  inputClass={inputClass("email")}
                />

              </div>

              {/* Row 2 */}

              <div className="grid gap-5 md:grid-cols-2">

                <IconField
                  label="Mobile number"
                  name="mobile"
                  type="tel"
                  value={form.mobile}
                  onChange={handleChange}
                  error={errors.mobile}
                  icon={<FiPhone />}
                  maxLength={15}
                  inputMode="numeric"
                  autoComplete="tel"
                  inputClass={inputClass("mobile")}
                />

                <IconField
                  label="Monthly contribution"
                  name="monthly_amount"
                  type="number"
                  value={form.monthly_amount}
                  onChange={handleChange}
                  error={errors.monthly_amount}
                  icon={<span className="font-semibold">₹</span>}
                  min="1"
                  inputMode="decimal"
                  inputClass={inputClass("monthly_amount")}
                />

              </div>

              {/* Contribution hint */}

              {form.monthly_amount &&
                Number(form.monthly_amount) > 0 && (
                  <div
                    className="
                      flex items-center gap-2
                      rounded-xl
                      border border-amber-100
                      bg-amber-50/60
                      px-4 py-3
                      text-xs
                      text-amber-800
                      animate-[fadeUp_0.3s_ease-out]
                    "
                  >
                    <FiHeart className="text-amber-600" />

                    <span>
                      Monthly contribution:
                      {" "}
                      <strong>
                        ₹{Number(form.monthly_amount).toLocaleString("en-IN")}
                      </strong>
                    </span>
                  </div>
                )}

              {/* Address */}

              <div>

                <label
                  htmlFor="address"
                  className="
                    mb-2 block
                    text-sm font-semibold
                    text-slate-700
                  "
                >
                  Address
                </label>

                <div className="group relative">

                  <FiMapPin
                    className="
                      absolute left-4 top-4
                      text-slate-400
                      transition-colors
                      group-focus-within:text-emerald-700
                    "
                  />

                  <textarea
                    id="address"
                    name="address"
                    rows={3}
                    value={form.address}
                    onChange={handleChange}
                    maxLength={80}
                    autoComplete="street-address"
                    className={`
                      ${inputClass("address")}
                      resize-none
                      pl-11
                    `}
                    placeholder="Enter your address"
                  />

                </div>

                <div className="mt-1 flex justify-between">

                  {errors.address ? (
                    <p className="text-sm text-red-600">
                      {errors.address}
                    </p>
                  ) : (
                    <span />
                  )}

                  <p
                    className="
                      text-xs
                      text-slate-400
                    "
                  >
                    {form.address.length}/80
                  </p>

                </div>
              </div>

              {/* Password */}

              <div className="grid gap-5 md:grid-cols-2">

                <PasswordField
                  label="Password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  error={errors.password}
                  visible={showPassword}
                  onToggle={() =>
                    setShowPassword(
                      (value) => !value
                    )
                  }
                  inputClass={inputClass("password")}
                />

                <PasswordField
                  label="Confirm password"
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  error={errors.confirmPassword}
                  visible={showConfirmPassword}
                  onToggle={() =>
                    setShowConfirmPassword(
                      (value) => !value
                    )
                  }
                  inputClass={inputClass(
                    "confirmPassword"
                  )}
                />

              </div>

              {/* Error */}

              {submitError && (
                <div
                  className="
                    flex items-start gap-3
                    rounded-xl
                    border border-red-100
                    bg-red-50
                    px-4 py-3
                    text-sm text-red-700
                    animate-[shake_0.35s_ease-in-out]
                  "
                  role="alert"
                >
                  <span
                    className="
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

                  {submitError}
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
                  <FiUserPlus />

                  Create donor account

                  <FiArrowRight
                    className="
                      transition-transform
                      duration-300
                      group-hover:translate-x-1
                    "
                  />
                </span>
              </Button>

            </form>

            {/* Footer */}

            <div
              className="
                mt-7
                border-t border-slate-100
                pt-6
                text-center
              "
            >
              <p className="text-sm text-slate-500">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="
                    font-semibold
                    text-emerald-700
                    transition-colors
                    hover:text-emerald-900
                  "
                >
                  Log in
                </Link>
              </p>

              <div
                className="
                  mt-4
                  flex items-center
                  justify-center gap-2
                  text-xs text-slate-400
                "
              >
                <FiShield className="text-emerald-600" />
                Your information is securely protected
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ===============================================
          SUCCESS MODAL
      ================================================ */}

      {registrationResult && (
        <div
          className="
            fixed inset-0 z-50
            flex items-center justify-center
            bg-slate-950/60
            p-5
            backdrop-blur-sm
            animate-[fadeUp_0.3s_ease-out]
          "
          role="dialog"
          aria-modal="true"
          aria-labelledby="registration-status-title"
        >
          <div
            className="
              w-full max-w-md
              overflow-hidden
              rounded-[26px]
              border border-emerald-100
              bg-white
              shadow-[0_25px_80px_rgba(0,0,0,0.2)]
              animate-[loginCard_0.45s_ease-out]
            "
          >
            {/* Modal top accent */}

            <div
              className="
                h-1.5
                bg-gradient-to-r
                from-emerald-800
                via-emerald-600
                to-[#D4AF37]
              "
            />

            <div className="p-7 text-center sm:p-9">

              {/* Success icon */}

              <div
                className="
                  mx-auto flex
                  h-16 w-16
                  items-center justify-center
                  rounded-full
                  bg-emerald-50
                  text-3xl
                  text-emerald-700
                  animate-[pulse_2s_ease-in-out_infinite]
                "
              >
                <FiCheckCircle />
              </div>

              <h2
                id="registration-status-title"
                className="
                  mt-5
                  text-2xl
                  font-bold
                  text-[#064E3B]
                "
              >
                Registration successful
              </h2>

              <p
                className="
                  mt-2
                  text-sm
                  leading-6
                  text-slate-500
                "
              >
                {registrationResult.message}
              </p>

              {/* Donor ID */}

              {registrationResult.donorId && (
                <div
                  className="
                    mt-6
                    rounded-2xl
                    border border-amber-200
                    bg-[#FFFCF5]
                    p-5
                  "
                >
                  <div
                    className="
                      flex items-center
                      justify-center gap-2
                    "
                  >
                    <FiUser className="text-amber-600" />

                    <p
                      className="
                        text-xs font-bold
                        uppercase
                        tracking-[0.15em]
                        text-amber-700
                      "
                    >
                      Your donor ID
                    </p>
                  </div>

                  <p
                    className="
                      mt-2
                      text-4xl
                      font-bold
                      tracking-wide
                      text-[#064E3B]
                    "
                  >
                    #{registrationResult.donorId}
                  </p>

                  <p
                    className="
                      mt-2
                      text-xs
                      leading-5
                      text-slate-500
                    "
                  >
                    Please save this ID.
                    You will need it to log in.
                  </p>
                </div>
              )}

              <Button
                className="
                  group
                  mt-6
                  w-full
                  !rounded-xl
                  !bg-[#064E3B]
                  !py-3.5
                  transition-all
                  hover:!bg-[#047857]
                "
                onClick={() =>
                  navigate("/login", {
                    replace: true,
                    state: {
                      registered: true,
                    },
                  })
                }
              >
                <span className="flex items-center justify-center gap-2">
                  Continue to login

                  <FiArrowRight
                    className="
                      transition-transform
                      group-hover:translate-x-1
                    "
                  />
                </span>
              </Button>

            </div>
          </div>
        </div>
      )}
    </main>
  );
}

/* =========================================================
   ICON FIELD
========================================================= */

type IconFieldProps = {
  label: string;
  name: FieldName;
  value: string;
  onChange: (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => void;
  error?: string;
  icon: React.ReactNode;
  inputClass: string;
  type?: "email" | "number" | "tel" | "text";
  maxLength?: number;
  min?: string;
  inputMode?: "decimal" | "numeric";
  autoComplete?: string;
};

function IconField({
  label,
  name,
  value,
  onChange,
  error,
  icon,
  inputClass,
  type = "text",
  ...props
}: IconFieldProps) {
  return (
    <div>
      <label
        htmlFor={name}
        className="
          mb-2 block
          text-sm font-semibold
          text-slate-700
        "
      >
        {label}
      </label>

      <div className="group relative">

        <span
          className="
            absolute left-4 top-1/2
            -translate-y-1/2
            text-slate-400
            transition-colors
            group-focus-within:text-emerald-700
          "
        >
          {icon}
        </span>

        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          className={inputClass}
          {...props}
        />

      </div>

      {error && (
        <p className="mt-1 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

/* =========================================================
   PASSWORD FIELD
========================================================= */

type PasswordFieldProps = {
  label: string;
  name: FieldName;
  value: string;
  onChange: (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => void;
  error?: string;
  visible: boolean;
  onToggle: () => void;
  inputClass: string;
};

function PasswordField({
  label,
  name,
  value,
  onChange,
  error,
  visible,
  onToggle,
  inputClass,
}: PasswordFieldProps) {
  return (
    <div>

      <label
        htmlFor={name}
        className="
          mb-2 block
          text-sm font-semibold
          text-slate-700
        "
      >
        {label}
      </label>

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
          id={name}
          name={name}
          type={visible ? "text" : "password"}
          value={value}
          onChange={onChange}
          autoComplete="new-password"
          className={`${inputClass} pr-12`}
          placeholder="••••••••"
        />

        <button
          type="button"
          onClick={onToggle}
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
            visible
              ? "Hide password"
              : "Show password"
          }
        >
          {visible ? (
            <FiEyeOff />
          ) : (
            <FiEye />
          )}
        </button>

      </div>

      {error && (
        <p className="mt-1 text-sm text-red-600">
          {error}
        </p>
      )}

    </div>
  );
}

/* =========================================================
   BENEFIT
========================================================= */

function Benefit({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-center gap-3">

      <div
        className="
          flex h-10 w-10
          shrink-0
          items-center justify-center
          rounded-xl
          bg-white/10
          text-amber-300
        "
      >
        {icon}
      </div>

      <div>
        <p className="text-sm font-semibold">
          {title}
        </p>

        <p className="mt-0.5 text-xs text-emerald-100/55">
          {description}
        </p>
      </div>

    </div>
  );
}