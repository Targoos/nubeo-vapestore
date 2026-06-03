import { useState } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  itemName: string;
}

export function DeleteConfirmationModal({ isOpen, onClose, onConfirm, itemName }: Props) {
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    try {
      setLoading(true);
      await onConfirm();
      onClose();
    } catch (err) {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-[#0d0d0d] border border-[#1a1a1a] rounded-lg max-w-md w-full">
        {/* Modal Header */}
        <div className="p-6 border-b border-[#1a1a1a]">
          <h2 className="text-lg font-semibold text-white uppercase tracking-tight">
            Confirmar Eliminación
          </h2>
        </div>

        {/* Modal Content */}
        <div className="p-6">
          <p className="text-[#444444] mb-6">
            ¿Estás seguro de que deseas eliminar <span className="text-white font-semibold">"{itemName}"</span>? Esta acción no se puede deshacer.
          </p>

          {/* Actions */}
          <div className="flex gap-4">
            <button
              onClick={onClose}
              disabled={loading}
              className="flex-1 border border-[#1a1a1a] text-white font-semibold uppercase tracking-[0.1em] py-3 rounded-md hover:bg-[#1a1a1a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancelar
            </button>
            <button
              onClick={handleConfirm}
              disabled={loading}
              className="flex-1 bg-red-500 text-white font-semibold uppercase tracking-[0.1em] py-3 rounded-md hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Eliminando..." : "Eliminar"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
