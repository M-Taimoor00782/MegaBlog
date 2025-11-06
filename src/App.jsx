/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import authservice from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { Header, Footer } from "./components";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await authservice.getCurrentUser();

        if (userData) {
          dispatch(login(userData));
        } else {
          dispatch(logout());
          // ❌ removed navigate("/login")
          // Let Home or other routes load
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        dispatch(logout());
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-zinc-950 via-slate-900 to-cyan-950 text-white">
        <div className="text-center">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin mx-auto"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-8 h-8 border-4 border-cyan-500/50 border-b-cyan-500 rounded-full animate-spin"></div>
            </div>
          </div>
          <p className="mt-6 text-lg font-medium text-cyan-100 animate-pulse">
            Loading your experience...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-slate-900 to-cyan-950 text-white flex flex-col">
      <Header />

      <main className="flex-1 flex justify-center items-start py-4 px-2 sm:px-6 lg:px-8">
        <div className="w-full max-w-screen overflow-hidden">
          <div className="p-2 sm:p-4">
            <Outlet />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
