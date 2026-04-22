import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { useAuth } from "../features/auth/AuthContext";

export function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const { signUp, signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: { preventDefault(): void }) => {
    e.preventDefault();
    setError(null);

    // Validación del lado del cliente: verificar que las contraseñas coincidan
    // antes de hacer cualquier llamada a Supabase. Ahorra un request innecesario.
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    setIsSubmitting(true);
    const { error } = await signUp(name, email, password);

    if (error) {
      setError(translateError(error));
      setIsSubmitting(false);
      return;
    }

    // Supabase por defecto requiere confirmación de email antes de permitir el login.
    // Por eso mostramos un mensaje en vez de redirigir directamente.
    // Si desactivás la confirmación en el dashboard de Supabase, podés cambiar
    // esto por: navigate("/")
    setSuccessMessage("¡Cuenta creada! Revisá tu email para confirmar tu cuenta.");
    setIsSubmitting(false);
  };

  const handleGoogleSignIn = async () => {
    setError(null);
    const { error } = await signInWithGoogle();
    if (error) setError(translateError(error));
  };

  // Pantalla de éxito tras el registro
  if (successMessage) {
    return (
      <div className="min-h-screen bg-[#080808]">
        <Navbar />
        <main className="pt-16 flex items-center justify-center min-h-screen px-4">
          <div className="w-full max-w-[440px] bg-[#0d0d0d] border border-[#1a1a1a] rounded-lg p-8 text-center">
            <div className="text-4xl mb-4">✉️</div>
            <h2 className="text-xl font-semibold text-white uppercase tracking-tight mb-3">
              ¡Revisá tu email!
            </h2>
            <p className="text-sm text-[#444444] mb-6">{successMessage}</p>
            <button
              onClick={() => navigate("/login")}
              className="w-full bg-[#00D4FF] text-black font-semibold uppercase tracking-[0.1em] py-3 rounded-md hover:bg-[#00D4FF]/90 transition-colors"
            >
              Ir al login
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080808]">
      <Navbar />
      <main className="pt-16 flex items-center justify-center min-h-screen px-4">
        <div className="w-full max-w-[440px] bg-[#0d0d0d] border border-[#1a1a1a] rounded-lg p-8 animate-fade-in-up">
          {/* Logo */}
          <div className="text-center mb-8">
            <span className="text-2xl font-semibold tracking-[0.3em] text-[#00D4FF] uppercase">
              NUBEO
            </span>
          </div>

          {/* Title */}
          <h1 className="text-xl font-semibold text-white uppercase tracking-tight text-center mb-2">
            Crear Cuenta
          </h1>
          <p className="text-sm text-[#444444] text-center mb-8">
            Comenzá a comprar hoy
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-xs text-[#444444] uppercase tracking-[0.15em] mb-2">
                Nombre Completo
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Tu nombre"
                required
                disabled={isSubmitting}
                className="w-full bg-[#0d0d0d] border border-[#1a1a1a] rounded-md px-4 py-3 text-white placeholder:text-[#444444] focus:border-[#00D4FF] focus:outline-none transition-colors disabled:opacity-50"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-xs text-[#444444] uppercase tracking-[0.15em] mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                required
                disabled={isSubmitting}
                className="w-full bg-[#0d0d0d] border border-[#1a1a1a] rounded-md px-4 py-3 text-white placeholder:text-[#444444] focus:border-[#00D4FF] focus:outline-none transition-colors disabled:opacity-50"
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-xs text-[#444444] uppercase tracking-[0.15em] mb-2">
                Contraseña
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Mínimo 6 caracteres"
                  required
                  disabled={isSubmitting}
                  className="w-full bg-[#0d0d0d] border border-[#1a1a1a] rounded-md px-4 py-3 pr-12 text-white placeholder:text-[#444444] focus:border-[#00D4FF] focus:outline-none transition-colors disabled:opacity-50"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#444444] hover:text-white transition-colors"
                  aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                >
                  {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-xs text-[#444444] uppercase tracking-[0.15em] mb-2">
                Confirmar Contraseña
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Repetí tu contraseña"
                  required
                  disabled={isSubmitting}
                  className="w-full bg-[#0d0d0d] border border-[#1a1a1a] rounded-md px-4 py-3 pr-12 text-white placeholder:text-[#444444] focus:border-[#00D4FF] focus:outline-none transition-colors disabled:opacity-50"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#444444] hover:text-white transition-colors"
                  aria-label={showConfirmPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                >
                  {showConfirmPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
            </div>

            {/* Error message */}
            {error && (
              <p className="text-red-400 text-sm text-center">{error}</p>
            )}

            {/* Submit button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#00D4FF] text-black font-semibold uppercase tracking-[0.1em] py-3 rounded-md hover:bg-[#00D4FF]/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Creando cuenta..." : "Crear Cuenta"}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-[#1a1a1a]" />
            <span className="text-xs text-[#444444]">o registrate con</span>
            <div className="flex-1 h-px bg-[#1a1a1a]" />
          </div>

          {/* Google OAuth */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-3 bg-transparent border border-[#1a1a1a] text-white font-medium py-3 rounded-md hover:bg-[#1a1a1a]/50 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <GoogleIcon />
            <span>Continuar con Google</span>
          </button>

          {/* Login link */}
          <p className="text-center text-sm text-[#444444] mt-8">
            ¿Ya tenés cuenta?{" "}
            <Link to="/login" className="text-[#00D4FF] hover:underline">
              Iniciá sesión
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function translateError(message: string): string {
  if (message.includes("User already registered")) return "Ya existe una cuenta con ese email.";
  if (message.includes("Password should be at least")) return "La contraseña debe tener al menos 6 caracteres.";
  if (message.includes("Unable to validate email")) return "El email ingresado no es válido.";
  return "Ocurrió un error. Intentá de nuevo.";
}

function EyeIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  );
}
