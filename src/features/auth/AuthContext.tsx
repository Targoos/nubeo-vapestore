import { createContext, useCallback, useContext, useEffect, useState } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "../../lib/supabase";

// Definimos qué va a exponer este contexto al resto de la app.
// Cada función devuelve un objeto { error } para que el componente
// que la llame pueda mostrar el mensaje sin necesidad de try/catch.
interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signUp: (name: string, email: string, password: string) => Promise<{ error: string | null }>;
  signInWithGoogle: () => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
}

// Creamos el contexto con null como valor inicial.
// null significa "todavía no hay Provider montado".
// Si alguien usa useAuth() fuera del Provider, lo detectamos y lanzamos error.
const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  // isLoading comienza en true: mientras no sabemos si hay sesión guardada,
  // no queremos mostrar "no estás logueado" prematuramente.
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Al montar, preguntamos a Supabase si ya hay una sesión en localStorage.
    // Esto hace que la sesión persista entre recargas de página.
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    // onAuthStateChange es el equivalente a un "watcher" en Vue.
    // Se ejecuta cada vez que el estado de auth cambia:
    // - Al hacer signIn, signUp, signOut
    // - Cuando Supabase renueva el access token automáticamente
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    // Cleanup: cuando el Provider se desmonta, cancelamos el listener.
    return () => subscription.unsubscribe();
  }, []);

  // useCallback evita que estas funciones se recreen en cada render.
  // Es importante cuando se pasan funciones por contexto.
  const signIn = useCallback(async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return { error: error.message };
    return { error: null };
  }, []);

  const signUp = useCallback(async (name: string, email: string, password: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      // "options.data" se guarda en el campo "raw_user_meta_data" de Supabase.
      // Es metadata del usuario que podemos leer después desde user.user_metadata.full_name
      options: { data: { full_name: name } },
    });
    if (error) return { error: error.message };
    return { error: null };
  }, []);

  const signInWithGoogle = useCallback(async () => {
    // OAuth redirige al usuario a Google. Cuando vuelve, Supabase
    // procesa el callback y onAuthStateChange se dispara automáticamente.
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: window.location.origin },
    });
    if (error) return { error: error.message };
    return { error: null };
  }, []);

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
    // No hace falta setUser(null) manual: onAuthStateChange lo hace por nosotros.
  }, []);

  return (
    <AuthContext.Provider value={{ user, session, isLoading, signIn, signUp, signInWithGoogle, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook de acceso al contexto con error explícito si se usa mal.
// Igual al patrón de useCart() que ya viste en CartContext.
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth debe usarse dentro de <AuthProvider>");
  return context;
}
