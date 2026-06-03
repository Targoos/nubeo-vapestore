import { useState } from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { ProductsTable } from "../components/ProductsTable";
import { ProductFormModal } from "../components/ProductFormModal";
import { DeleteConfirmationModal } from "../components/DeleteConfirmationModal";
import { useProducts } from "../hooks/useProducts";
import { useCategories } from "../hooks/useCategories";
import { useCreateProduct } from "../hooks/useCreateProduct";
import { useUpdateProduct } from "../hooks/useUpdateProduct";
import { useDeleteProduct } from "../hooks/useDeleteProduct";
import type { Product } from "../types";
import type { CreateProductInput } from "../types";

export function AdminPage() {
  const {
    data: products,
    loading: productsLoading,
    error: productsError,
    refetch,
  } = useProducts({ onlyActive: false });
  const { data: categories } = useCategories();
  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();
  const deleteProduct = useDeleteProduct();

  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  const handleNewProduct = () => {
    setSelectedProduct(null);
    setIsFormModalOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setIsFormModalOpen(true);
  };

  const handleDeleteProduct = (product: Product) => {
    setProductToDelete(product);
    setIsDeleteModalOpen(true);
  };

  const handleSaveProduct = async (data: CreateProductInput) => {
    if (selectedProduct) {
      await updateProduct.updateProduct(selectedProduct.id, data);
    } else {
      await createProduct.createProduct(data);
    }
    refetch();
  };

  const handleConfirmDelete = async () => {
    if (productToDelete) {
      await deleteProduct.deleteProduct(productToDelete.id);
      refetch();
    }
  };

  return (
    <div className="min-h-screen bg-[#080808] flex flex-col">
      <Navbar />
      <main className="pt-16 px-6 lg:px-8 py-8 flex-1">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8 mt-8">
            <div>
              <h1 className="text-2xl font-semibold text-white uppercase tracking-tight">
                Panel Admin
              </h1>
              <p className="text-sm text-[#444444] mt-1">
                Gestión de productos
              </p>
            </div>
            <button
              onClick={handleNewProduct}
              className="bg-[#00D4FF] text-black font-semibold uppercase tracking-[0.1em] px-6 py-3 rounded-md hover:bg-[#00D4FF]/80 transition-colors"
            >
              Nuevo Producto
            </button>
          </div>

          {productsLoading ? (
            <div className="text-center py-12">
              <p className="text-white">Cargando productos...</p>
            </div>
          ) : productsError ? (
            <div className="text-center py-12">
              <p className="text-red-400">Error al cargar productos</p>
            </div>
          ) : (
            <ProductsTable
              products={products || []}
              onEdit={handleEditProduct}
              onDelete={handleDeleteProduct}
            />
          )}
        </div>
      </main>
      <Footer />

      <ProductFormModal
        product={selectedProduct}
        categories={categories || []}
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        onSave={handleSaveProduct}
      />

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        itemName={productToDelete?.name || ""}
      />
    </div>
  );
}
