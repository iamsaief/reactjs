// src/components/Modal.jsx
import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import ReactDOM from "react-dom";

export const Modal = ({ children, isOpen, onClose, title, showCloseButton = true, className = "" }) => {
  const modalRoot = document.getElementById("modal-root");
  const el = useRef(document.createElement("div"));

  // Ensure the modal-root element exists
  useEffect(() => {
    if (!modalRoot) {
      console.error("Modal root element not found. Please add <div id='modal-root'></div> to your index.html");
      return;
    }
  }, [modalRoot]);

  useEffect(() => {
    if (!modalRoot) return; // Prevent errors if modalRoot doesn't exist

    const currentEl = el.current;
    if (isOpen) {
      modalRoot.appendChild(currentEl);
      // Add a class to body to prevent scrolling
      document.body.style.overflow = "hidden";
    } else {
      // Clean up when modal closes (or component unmounts)
      if (modalRoot.contains(currentEl)) {
        modalRoot.removeChild(currentEl);
      }
      document.body.style.overflow = "unset"; // Restore body scroll
    }

    return () => {
      // Cleanup on component unmount
      if (modalRoot.contains(currentEl)) {
        modalRoot.removeChild(currentEl);
      }
      document.body.style.overflow = "unset"; // Ensure scroll is restored
    };
  }, [isOpen, modalRoot]); // Dependency on isOpen and modalRoot

  if (!isOpen) {
    return null;
  }

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 transition-opacity duration-300 ease-in-out animate-fadeIn border"
      onClick={onClose} // Close modal on backdrop click
      role="dialog"
      aria-modal="true"
    >
      <div
        className={`border border-(--border) bg-(--background) p-6 rounded-lg w-full max-w-lg transform transition-all duration-300 ease-out animate-scaleUp ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={`flex justify-between items-center ${title ? "mb-6" : ""}`}>
          {title && <h2 className="text-2xl font-semibold text-sky-300">{title}</h2>}
          {showCloseButton && (
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-200 p-1 rounded-full transition-colors duration-150"
              aria-label="Close modal"
            >
              <X size={24} />
            </button>
          )}
        </div>
        {children}
      </div>
    </div>,
    el.current // Render into the div element created in useRef
  );
};
