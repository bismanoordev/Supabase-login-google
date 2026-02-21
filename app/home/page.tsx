"use client";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function HomePage() {
  const router = useRouter();

  const handleLogout = async () => {
    if (!supabase) {
      toast.error("Supabase not configured. Cannot logout.");
      return;
    }

    await supabase.auth.signOut();
    router.push("/"); // Redirect back to login
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white p-4">
      <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-10 max-w-xl w-full text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome Home!</h1>
        <p className="mb-6 text-lg">You are successfully logged in.</p>
        <button
          onClick={handleLogout}
          className="bg-white text-indigo-600 font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-indigo-100 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
