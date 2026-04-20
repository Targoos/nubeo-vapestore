import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Hero } from "../features/catalog/Hero";
import { Categories } from "../features/catalog/Categories";
import { FeaturedProducts } from "../features/catalog/FeaturedProducts";

export function HomePage() {
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
