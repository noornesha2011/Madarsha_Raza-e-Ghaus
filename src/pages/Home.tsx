import { Link } from "react-router-dom";
import { FaMosque } from "react-icons/fa";
import UrduName from "../components/ui/UrduName";
const Home = () => {
    return (
        <div className="bg-[#FAF6EC]">

            {/* ================= HERO SECTION ================= */}
            <section className="relative overflow-hidden bg-emerald-950">
                {/* Decorative background */}
                <div className="absolute -right-32 -top-32 h-80 w-80 rounded-full bg-emerald-800/40 blur-3xl" />
                <div className="absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-amber-500/10 blur-3xl" />

                <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 md:grid-cols-2 md:py-28">

                    {/* Hero Content */}
                    <div>
                        <p className="mb-4 inline-block rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-2 text-sm font-medium text-amber-300">
                            Islamic Education & Community Development
                        </p>

                        <h1
                            dir="rtl"
                            className="hidden"
                        > مدرسہ رضائے غوث
                        </h1>

                        <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
                            <UrduName />
                        </h1>

                        <h2 className="mt-3 text-2xl font-semibold text-emerald-200 sm:text-3xl">
                            Madarsa Raza-E-Gaus
                        </h2>

                        <p className="mt-6 max-w-xl text-lg leading-8 text-emerald-100/80">
                            Help us support Islamic education, provide better facilities,
                            and build a stronger future for our students and community.
                        </p>

                        <div className="mt-8 flex flex-wrap gap-4">
                            <Link
                                to="/donate"
                                className="rounded-lg bg-amber-500 px-6 py-3 font-semibold text-emerald-950 shadow-lg transition hover:bg-amber-400"
                            >
                                Donate Now
                            </Link>

                            <Link
                                to="/register"
                                className="rounded-lg border border-emerald-400 px-6 py-3 font-semibold text-white transition hover:bg-emerald-800"
                            >
                                Become a Donor
                            </Link>
                        </div>
                    </div>

                    {/* Hero Visual */}
                    <div className="flex justify-center md:justify-end">
                        <div className="flex h-72 w-72 items-center justify-center rounded-full border border-amber-400/30 bg-emerald-900 shadow-2xl sm:h-80 sm:w-80">
                            <div className=" text-center">
                                <div className="flex justify-center">
                                    <FaMosque
                                        color="green"
                                        size={90}
                                    />
                                </div>
                                <p
                                    dir="rtl"
                                    className="mt-4 text-2xl font-bold text-amber-300"
                                >
                                    علم و خدمت
                                </p>

                                <p className="mt-1 text-sm text-emerald-200">
                                    Knowledge • Faith • Service
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </section>


            {/* ================= STATS ================= */}
            <section className="border-b border-emerald-100 bg-white">
                <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-emerald-100 md:grid-cols-4">

                    <div className="px-6 py-8 text-center">
                        <p className="text-3xl font-bold text-emerald-800">1000+</p>
                        <p className="mt-1 text-sm text-gray-500">Community Members</p>
                    </div>

                    <div className="px-6 py-8 text-center">
                        <p className="text-3xl font-bold text-emerald-800">20+</p>
                        <p className="mt-1 text-sm text-gray-500">Students</p>
                    </div>

                    <div className="px-6 py-8 text-center">
                        <p className="text-3xl font-bold text-emerald-800">6+</p>
                        <p className="mt-1 text-sm text-gray-500">Years of Service</p>
                    </div>

                    <div className="px-6 py-8 text-center">
                        <p className="text-3xl font-bold text-emerald-800">100%</p>
                        <p className="mt-1 text-sm text-gray-500">Transparent Donations</p>
                    </div>

                </div>
            </section>


            {/* ================= ABOUT ================= */}
            <section className="mx-auto max-w-7xl px-6 py-20">

                <div className="mx-auto max-w-3xl text-center">
                    <p className="text-sm font-semibold uppercase tracking-widest text-amber-600">
                        About Us
                    </p>

                    <h2 className="mt-3 text-3xl font-bold text-emerald-950 sm:text-4xl">
                        Serving Through Knowledge & Faith
                    </h2>

                    <p className="mt-5 leading-7 text-gray-600">
                        Madarsa Raza-e-Gaus is committed to providing Islamic education
                        and supporting the educational and spiritual development of our
                        community.
                    </p>
                </div>

                <div className="mt-12 grid gap-6 md:grid-cols-3">

                    {/* Card 1 */}
                    <div className="rounded-2xl border border-emerald-100 bg-emerald-50/50 p-7 transition hover:-translate-y-1 hover:shadow-lg">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-700 text-2xl text-white">
                            📖
                        </div>

                        <h3 className="mt-5 text-xl font-bold text-emerald-950">
                            Islamic Education
                        </h3>

                        <p className="mt-3 leading-6 text-gray-600">
                            Supporting quality Islamic education and creating a better
                            learning environment for students.
                        </p>
                    </div>

                    {/* Card 2 */}
                    <div className="rounded-2xl border border-emerald-100 bg-emerald-50/50 p-7 transition hover:-translate-y-1 hover:shadow-lg">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-700 text-2xl text-white">
                            🕌
                        </div>

                        <h3 className="mt-5 text-xl font-bold text-emerald-950">
                            Better Facilities
                        </h3>

                        <p className="mt-3 leading-6 text-gray-600">
                            Helping improve infrastructure, educational resources, and
                            facilities for our madrasa.
                        </p>
                    </div>

                    {/* Card 3 */}
                    <div className="rounded-2xl border border-emerald-100 bg-emerald-50/50 p-7 transition hover:-translate-y-1 hover:shadow-lg">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-700 text-2xl text-white">
                            🤝
                        </div>

                        <h3 className="mt-5 text-xl font-bold text-emerald-950">
                            Community Support
                        </h3>

                        <p className="mt-3 leading-6 text-gray-600">
                            Bringing donors and community members together to support a
                            meaningful cause.
                        </p>
                    </div>

                </div>
            </section>


            {/* ================= DONATION CTA ================= */}
            <section className="bg-emerald-900">
                <div className="mx-auto max-w-7xl px-6 py-16 text-center">

                    <p className="text-sm font-semibold uppercase tracking-widest text-amber-400">
                        Support Our Mission
                    </p>

                    <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
                        Every Contribution Makes a Difference
                    </h2>

                    <p className="mx-auto mt-4 max-w-2xl leading-7 text-emerald-100/75">
                        Your contribution can help provide education, facilities, and
                        essential support for the madrasa and its students.
                    </p>

                    <Link
                        to="/donate"
                        className="mt-8 inline-block rounded-lg bg-amber-500 px-7 py-3 font-bold text-emerald-950 shadow-lg transition hover:bg-amber-400"
                    >
                        Make a Donation
                    </Link>

                </div>
            </section>


            {/* ================= TRANSPARENCY ================= */}
            <section className="bg-emerald-50">
                <div className="mx-auto max-w-7xl px-6 py-16">

                    <div className="grid items-center gap-10 md:grid-cols-2">

                        <div>
                            <p className="text-sm font-semibold uppercase tracking-widest text-amber-600">
                                Transparency
                            </p>

                            <h2 className="mt-3 text-3xl font-bold text-emerald-950">
                                Your Trust Matters
                            </h2>

                            <p className="mt-5 leading-7 text-gray-600">
                                We believe every contribution should be handled responsibly.
                                Our fundraising system is designed to help donors track their
                                contributions and understand how funds are being used.
                            </p>
                        </div>

                        <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-emerald-100">

                            <div className="flex items-start gap-4">
                                <div className="text-2xl">✓</div>

                                <div>
                                    <h3 className="font-bold text-emerald-900">
                                        Donation Records
                                    </h3>

                                    <p className="mt-1 text-sm text-gray-500">
                                        Keep track of your donation history.
                                    </p>
                                </div>
                            </div>

                            <div className="my-6 border-t border-gray-100" />

                            <div className="flex items-start gap-4">
                                <div className="text-2xl">✓</div>

                                <div>
                                    <h3 className="font-bold text-emerald-900">
                                        Monthly Contributions
                                    </h3>

                                    <p className="mt-1 text-sm text-gray-500">
                                        Monitor monthly donor contributions and dues.
                                    </p>
                                </div>
                            </div>

                            <div className="my-6 border-t border-gray-100" />

                            <div className="flex items-start gap-4">
                                <div className="text-2xl">✓</div>

                                <div>
                                    <h3 className="font-bold text-emerald-900">
                                        Digital Receipts
                                    </h3>

                                    <p className="mt-1 text-sm text-gray-500">
                                        Receive records for successful donations.
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>


            {/* ================= FINAL CTA ================= */}
            <section className="bg-white">
                <div className="mx-auto max-w-4xl px-6 py-20 text-center">

                    <h2
                        dir="rtl"
                        className="text-3xl font-bold text-emerald-900"
                    >
                        جزاک اللہ خیراً
                    </h2>

                    <p className="mt-3 text-gray-600">
                        May Allah reward you for your support and generosity.
                    </p>

                    <Link
                        to="/donate"
                        className="mt-7 inline-block rounded-lg bg-emerald-700 px-7 py-3 font-semibold text-white shadow-md transition hover:bg-emerald-800"
                    >
                        Donate Now
                    </Link>

                </div>
            </section>

        </div>
    );
};

export default Home;
