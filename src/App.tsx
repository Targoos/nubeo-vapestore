import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { CatalogPage } from "./pages/CatalogPage";
import { ProductPage } from "./pages/ProductPage";
import { CartPage } from "./pages/CartPage";
import { CheckoutPage } from "./pages/CheckoutPage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { AdminPage } from "./pages/AdminPage";
import { ProfilePage } from "./pages/ProfilePage";
import { PrivateRoute } from "./features/auth/PrivateRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas públicas — accesibles sin login */}
        <Route path="/" element={<HomePage />} />
        <Route path="/catalogo" element={<CatalogPage />} />
        <Route path="/producto/:slug" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registro" element={<RegisterPage />} />
        <Route path="/perfil" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />

        {/* Rutas protegidas — PrivateRoute verifica el login antes de renderizar */}
        <Route
          path="/checkout"
          element={
            <PrivateRoute>
              <CheckoutPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <AdminPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
