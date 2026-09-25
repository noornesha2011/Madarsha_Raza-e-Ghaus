import { Link } from "react-router-dom";

const NotFound = () => {
   return (
    <main className="flex min-h-[calc(100vh-160px)] items-center justify-center bg-[#FAF6EC] px-5 text-center">
      <div>
        <p className="text-sm font-semibold uppercase tracking-widest text-[#A9793B]">Error 404</p>
        <h1 className="mt-3 text-4xl font-bold text-[#163832]">Page not found</h1>
        <p className="mt-3 text-[#5B645F]">The page you requested does not exist or has moved.</p>
        <Link to="/" className="mt-7 inline-flex rounded-lg bg-emerald-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800">Return home</Link>
      </div>
    </main>
  );
}


export default NotFound
