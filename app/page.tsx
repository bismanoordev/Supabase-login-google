"use client";
import { useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();

  // ✅ Check if already logged in
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) router.push("/home");
    });

    // ✅ Listen for login events
    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "SIGNED_IN" && session) {
          router.push("/home");
        }
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      // ⚠️ Do NOT set redirectTo
    });

    if (error) {
      toast.error("Login failed ❌");
    } else {
      toast.success("Login initiated. Complete Google login...");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4">
      <div className="w-full max-w-md bg-slate-800/60 backdrop-blur-lg border border-slate-700 rounded-2xl shadow-2xl p-8 text-center">
        <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
        <p className="text-slate-400 mb-6">Sign in to continue to your dashboard</p>
        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-100 text-gray-700 font-medium py-3 rounded-lg transition duration-300 shadow-md"
        >
          <FcGoogle size={22} />
          Continue with Google
        </button>
        <p className="text-xs text-slate-500 mt-6">Secure login powered by Supabase</p>
      </div>
    </div>
  );
}