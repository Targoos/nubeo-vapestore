import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { Hero } from "./features/catalog/Hero";
import { Categories } from "./features/catalog/Categories";
import { FeaturedProducts } from "./features/catalog/FeaturedProducts";
import { CatalogPage } from "./pages/CatalogPage";

function HomePage() {
  return (
    <div className="min-h-screen bg-[#080808]">
      <Navbar />
      <main>
        <Hero />
        <Categories />
        <FeaturedProducts />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/catalogo" element={<CatalogPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
