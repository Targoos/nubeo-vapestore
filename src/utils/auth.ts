export function translateError(message: string): string {
  if (message.includes("Invalid login credentials")) return "Email o contraseña incorrectos.";
  if (message.includes("Email not confirmed")) return "Confirmá tu email antes de iniciar sesión.";
  if (message.includes("Too many requests")) return "Demasiados intentos. Esperá unos minutos.";
  if (message.includes("User already registered")) return "Ya existe una cuenta con ese email.";
  if (message.includes("Password should be at least")) return "La contraseña debe tener al menos 6 caracteres.";
  if (message.includes("Unable to validate email")) return "El email ingresado no es válido.";
  return "Ocurrió un error. Intentá de nuevo.";
}
