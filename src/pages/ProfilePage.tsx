import { useNavigate } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { useAuth } from "../features/auth/AuthContext";

export function ProfilePage() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-[#080808]">
      <Navbar />
      <main className="pt-16 flex items-center justify-center min-h-screen px-4">
        <div className="w-full max-w-[440px] bg-[#0d0d0d] border border-[#1a1a1a] rounded-lg p-8">
          <div className="text-center mb-8">
            <span className="text-2xl font-semibold tracking-[0.3em] text-[#00D4FF] uppercase">
              NUBEO
            </span>
          </div>

          <h1 className="text-xl font-semibold text-white uppercase tracking-tight text-center mb-8">
            Mi Cuenta
          </h1>

          <div className="space-y-4">
            <div>
              <p className="text-xs text-[#444444] uppercase tracking-[0.15em] mb-1">Email</p>
              <p className="text-white">{user?.email}</p>
            </div>

            {user?.user_metadata?.full_name && (
              <div>
                <p className="text-xs text-[#444444] uppercase tracking-[0.15em] mb-1">Nombre</p>
                <p className="text-white">{user.user_metadata.full_name}</p>
              </div>
            )}
          </div>

          <button
            onClick={handleSignOut}
            className="w-full mt-10 border border-red-500/40 text-red-400 font-semibold uppercase tracking-[0.1em] py-3 rounded-md hover:bg-red-500/10 transition-colors"
          >
            Cerrar Sesión
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
