import type { ReactNode } from 'react';
import { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void; // Fixed type
  children: ReactNode;
  title?: string; // Fixed type
}

export function Modal({ isOpen, onClose, children, title }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null); // Fixed ref type

  // Close modal on Escape key press
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  // Close modal when clicking outside
  const handleOverlayClick = (e: React.MouseEvent) => {
    const target = e.target as Element;
    if (modalRef.current && target && !modalRef.current.contains(target)) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
      onClick={handleOverlayClick}
    >
      <div
        ref={modalRef}
        className="bg-white rounded-lg shadow-xl max-w-lg w-full p-6 relative transform transition-all duration-300 ease-out scale-100 opacity-100"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center pb-3 mb-4">
          <h2 className="text-xl font-orbitron text-gray-600">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl font-bold leading-none focus:outline-none hover:cursor-pointer"
            aria-label="Close modal"
          >
            &times;
          </button>
        </div>
        <div className="text-gray-700">
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
}
