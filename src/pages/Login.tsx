import { useState, type FormEvent } from "react";
import { isAxiosError } from "axios";
import { FaMoon } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import { loginDonor } from "../api/authApi";
import { loginFailure, loginStart, loginSuccess } from "../features/authSlice";
import Button from "../components/ui/Button";
import UrduName from "../components/ui/UrduName";

export default function Login() {
  const [donorId, setDonorId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const registered = Boolean((location.state as { registered?: boolean } | null)?.registered);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const parsedDonorId = Number(donorId);
    if (!Number.isInteger(parsedDonorId) || parsedDonorId <= 0) {
      setError("Enter a valid donor ID.");
      return;
    }
    if (!password) {
      setError("Enter your password.");
      return;
    }

    try {
      setSubmitting(true);
      setError(null);
      dispatch(loginStart());
      const response = await loginDonor({ donor_id: parsedDonorId, password });
      const token = response.access_token || response.token;
      if (!token) {
        const message = "Login response did not include an access token.";
        setError(message);
        dispatch(loginFailure(message));
        return;
      }
      localStorage.setItem("access_token", token);

      dispatch(loginSuccess({
        id: response.donor?.id || parsedDonorId,
        name: response.donor?.name || "Donor",
        email: response.donor?.email || "",
        monthly_amount: response.donor?.monthly_amount || 0,
      }));
      navigate("/dashboard", { replace: true });
    } catch (requestError: unknown) {
      const message = isAxiosError<{ detail?: string; message?: string }>(requestError)
        ? requestError.response?.data?.detail || requestError.response?.data?.message || "Unable to log in with this donor ID."
        : "Unable to log in with this donor ID.";
      setError(message);
      dispatch(loginFailure(message));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-[calc(100vh-160px)] bg-emerald-50/50">
      <div className="mx-auto flex max-w-7xl items-center justify-center px-6 py-16">
        <div className="grid w-full max-w-5xl overflow-hidden rounded-2xl bg-white shadow-xl md:grid-cols-2">
          <aside className="hidden bg-emerald-950 p-10 text-white md:flex md:flex-col md:justify-center">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-800 text-3xl"><FaMoon className="text-amber-300" /></div>
            <h1 className="text-3xl font-bold"><UrduName /></h1>
            <p className="mt-2 text-lg font-semibold text-emerald-200">Madarsa Raza-e-Gaus</p>
            <p className="mt-6 leading-7 text-emerald-100/70">Use your donor ID to securely view your contribution history and dashboard.</p>
          </aside>

          <section className="p-8 sm:p-10">
            <p className="text-sm font-semibold uppercase tracking-widest text-amber-600">Welcome back</p>
            <h2 className="mt-2 text-3xl font-bold text-emerald-950">Donor login</h2>
            <p className="mt-2 text-sm text-gray-500">Enter the donor ID assigned during registration.</p>
            {registered && <p className="mt-4 rounded-lg bg-emerald-50 p-3 text-sm text-emerald-800" role="status">Registration successful. Use your donor ID to log in.</p>}

            <form className="mt-8 space-y-5" onSubmit={handleSubmit} noValidate>
              <div>
                <label htmlFor="donor-id" className="mb-2 block text-sm font-medium text-gray-700">Donor ID</label>
                <input id="donor-id" type="text" inputMode="numeric" value={donorId} onChange={(event) => setDonorId(event.target.value)} placeholder="Enter your donor ID" autoComplete="username" className={`w-full rounded-lg border px-4 py-3 outline-none transition focus:ring-2 ${error ? "border-red-500 focus:ring-red-100" : "border-gray-200 focus:border-emerald-600 focus:ring-emerald-100"}`} />
              </div>
              <div>
                <label htmlFor="password" className="mb-2 block text-sm font-medium text-gray-700">Password</label>
                <input id="password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Enter your password" autoComplete="current-password" className={`w-full rounded-lg border px-4 py-3 outline-none transition focus:ring-2 ${error ? "border-red-500 focus:ring-red-100" : "border-gray-200 focus:border-emerald-600 focus:ring-emerald-100"}`} />
              </div>
              {error && <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700" role="alert">{error}</p>}
              <Button type="submit" className="w-full" loading={submitting}>Log in</Button>
            </form>

            <p className="mt-7 text-center text-sm text-gray-500">Don&apos;t have a donor ID? <Link to="/register" className="font-semibold text-emerald-700 hover:text-emerald-800">Register now</Link></p>
          </section>
        </div>
      </div>
    </main>
  );
}
