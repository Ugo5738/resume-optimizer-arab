
import React, { useEffect } from 'react';
import type { ToastMessage } from '../../types';

interface ToastProps {
  toast: ToastMessage;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ toast, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [onClose]);

  const bgColor = toast.type === 'success' ? 'bg-green-500' : 'bg-red-500';

  return (
    <div className={`fixed top-5 right-5 z-50 p-4 rounded-md text-white ${bgColor} shadow-lg transition-transform transform animate-fade-in-down`}>
      <div className="flex items-center justify-between">
        <span>{toast.message}</span>
        <button onClick={onClose} className="ml-4 font-bold">X</button>
      </div>
    </div>
  );
};

export default Toast;
