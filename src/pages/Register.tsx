import { useState, type ChangeEvent, type FormEvent } from "react";
import { isAxiosError } from "axios";
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
  if (!form.name.trim()) errors.name = "Full name is required";
  if (!form.email.trim()) errors.email = "Email address is required";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = "Enter a valid email address";
  if (form.mobile.length < 10 || form.mobile.length > 15) errors.mobile = "Mobile number must be 10 to 15 digits";
  else if (!/^\d+$/.test(form.mobile)) errors.mobile = "Mobile number can contain digits only";
  if (!form.monthly_amount.trim() || Number(form.monthly_amount) <= 0) errors.monthly_amount = "Enter a valid monthly contribution";
  if (form.address.trim().length < 5 || form.address.trim().length > 80) errors.address = "Address must be 5 to 80 characters";
  if (form.password.length < 6 || form.password.length > 20) errors.password = "Password must be 6 to 20 characters";
  if (form.password !== form.confirmPassword) errors.confirmPassword = "Passwords do not match";
  return errors;
};

export default function Register() {
  const [form, setForm] = useState<RegisterForm>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [registrationResult, setRegistrationResult] = useState<{ message: string; donorId?: number } | null>(null);
  const navigate = useNavigate();

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    const field = name as FieldName;
    const nextForm = { ...form, [field]: value };
    setForm(nextForm);
    setErrors((current) => ({ ...current, [field]: validate(nextForm)[field] }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validate(form);
    setErrors(validationErrors);
    setSubmitError(null);
    if (Object.keys(validationErrors).length > 0) return;

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
        message: response.message || response.detail || "Registration completed successfully.",
        donorId: response.donor_id,
      });
    } catch (error: unknown) {
      if (isAxiosError<{ detail?: string; message?: string }>(error)) {
        setSubmitError(error.response?.data?.detail || error.response?.data?.message || "Registration failed. Please try again.");
      } else {
        setSubmitError("Registration failed. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass = (field: FieldName) => `w-full rounded-lg border px-4 py-3 outline-none transition focus:ring-2 ${errors[field] ? "border-red-500 focus:ring-red-100" : "border-gray-200 focus:border-emerald-600 focus:ring-emerald-100"}`;

  return (
    <main className="min-h-[calc(100vh-160px)] bg-emerald-50/50 px-6 py-12">
      <section className="mx-auto w-full max-w-3xl rounded-2xl bg-white p-8 shadow-xl sm:p-10">
        <header className="mb-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-amber-600">Join our community</p>
          <h1 className="mt-2 text-3xl font-bold text-emerald-950">Create donor account</h1>
          <p className="mt-2 text-sm text-gray-500">Register to manage monthly contributions and donation records.</p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          <div className="grid gap-5 md:grid-cols-2">
            <Field label="Full name" name="name" value={form.name} onChange={handleChange} error={errors.name} autoComplete="name" />
            <Field label="Email address" name="email" type="email" value={form.email} onChange={handleChange} error={errors.email} autoComplete="email" />
            <Field label="Mobile number" name="mobile" type="tel" value={form.mobile} onChange={handleChange} error={errors.mobile} maxLength={15} inputMode="numeric" autoComplete="tel" />
            <Field label="Monthly contribution (₹)" name="monthly_amount" type="number" value={form.monthly_amount} onChange={handleChange} error={errors.monthly_amount} min="1" inputMode="decimal" />
          </div>

          <div>
            <label htmlFor="address" className="mb-2 block text-sm font-medium text-gray-700">Address</label>
            <textarea id="address" name="address" rows={3} value={form.address} onChange={handleChange} maxLength={80} autoComplete="street-address" className={inputClass("address")} />
            <p className="mt-1 text-xs text-gray-500">{form.address.length}/80 characters</p>
            {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <Field label="Password" name="password" type="password" value={form.password} onChange={handleChange} error={errors.password} autoComplete="new-password" />
            <Field label="Confirm password" name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange} error={errors.confirmPassword} autoComplete="new-password" />
          </div>

          {submitError && <p className="rounded-lg bg-red-50 p-3 text-center text-sm text-red-700" role="alert">{submitError}</p>}
          <Button type="submit" className="w-full" loading={submitting}>Create donor account</Button>
        </form>

        <p className="mt-7 text-center text-sm text-gray-500">Already have an account? <Link to="/login" className="font-semibold text-emerald-700 hover:text-emerald-800">Log in</Link></p>
      </section>

      {registrationResult && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-5" role="dialog" aria-modal="true" aria-labelledby="registration-status-title">
          <div className="w-full max-w-md rounded-2xl bg-white p-7 text-center shadow-2xl">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-xl text-emerald-700" aria-hidden="true">✓</div>
            <h2 id="registration-status-title" className="mt-4 text-2xl font-bold text-emerald-950">Registration successful</h2>
            <p className="mt-2 text-sm text-gray-600">{registrationResult.message}</p>
            {registrationResult.donorId && (
              <div className="mt-5 rounded-xl bg-[#F1EAD9] p-4">
                <p className="text-xs font-medium uppercase tracking-wide text-[#806B4A]">Your donor ID</p>
                <p className="mt-1 text-3xl font-bold text-[#163832]">#{registrationResult.donorId}</p>
                <p className="mt-2 text-xs text-[#5B5646]">Please save this ID. You need it to log in.</p>
              </div>
            )}
            <Button className="mt-6 w-full" onClick={() => navigate("/login", { replace: true, state: { registered: true } })}>Continue to login</Button>
          </div>
        </div>
      )}
    </main>
  );
}

type FieldProps = {
  label: string;
  name: FieldName;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  error?: string;
  type?: "email" | "number" | "password" | "tel" | "text";
  maxLength?: number;
  min?: string;
  inputMode?: "decimal" | "numeric";
  autoComplete?: string;
};

function Field({ label, name, value, onChange, error, type = "text", ...props }: FieldProps) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-sm font-medium text-gray-700">{label}</label>
      <input id={name} name={name} type={type} value={value} onChange={onChange} className={`w-full rounded-lg border px-4 py-3 outline-none transition focus:ring-2 ${error ? "border-red-500 focus:ring-red-100" : "border-gray-200 focus:border-emerald-600 focus:ring-emerald-100"}`} {...props} />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}
