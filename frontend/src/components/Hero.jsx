import { useAuth } from "../context/AuthContext.jsx";
import { Link } from "react-router-dom";

export default function Hero() {
    const { user } = useAuth(); //  check if user is logged in, but don't redirect

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#e6e9f0] via-[#eef1f5] to-[#f9fafb]">
            {/* Background glow */}
            <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-purple-400/30 rounded-full blur-[120px]" />
            <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-blue-400/30 rounded-full blur-[120px]" />

            {/* Glass Card */}
            <div className="relative z-10 max-w-2xl w-full mx-4 p-10 rounded-[32px] bg-white/40 backdrop-blur-xl border border-white/30 shadow-[0_20px_60px_rgba(0,0,0,0.15)] text-center">
                <span className="inline-block mb-6 px-4 py-1 rounded-full text-sm font-medium text-purple-700 bg-purple-200/40 backdrop-blur-md">
                    Minimal • Calm • Focused
                </span>

                <h1 className="text-4xl sm:text-5xl font-semibold text-gray-900 leading-tight mb-4">
                    Capture Thoughts. <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
                        Stay Present.
                    </span>
                </h1>

                <p className="text-gray-700 text-lg mb-8">
                    A distraction-free notes app designed for clarity, reflection, and flow.
                </p>

                {/* Actions */}
                <div className="flex justify-center gap-4">
                    <Link
                        to={user ? "/notes" : "/login"}
                        className="px-6 py-3 rounded-2xl bg-black/80 text-white font-medium shadow-lg hover:bg-black transition"
                    >
                        {user ? "Go to Notes" : "Get Started"}
                    </Link>

                    <button className="px-6 py-3 rounded-2xl bg-white/60 text-gray-900 font-medium backdrop-blur-md border border-white/40 hover:bg-white/80 transition">
                        Learn More
                    </button>
                </div>
            </div>
        </section>
    );
}
