'use client';
import { createContext, useContext, useState, ReactNode } from 'react';

type ToastContextType = { showToast: (a: { message: string; duration?: number }) => void };

const ToastContext = createContext<ToastContextType | null>(null);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [message, setMessage] = useState('');
  const [visible, setVisible] = useState(false);

  const showToast: ToastContextType['showToast'] = ({ message, duration = 3000 }) => {
    setMessage(message);
    setVisible(true);
    setTimeout(() => setVisible(false), duration);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {visible && (
        <div className="animate-slide-in fixed right-6 bottom-6 z-50 rounded-md bg-green-600 px-4 py-3 text-white shadow-md">
          {message}
        </div>
      )}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within ToastProvider');
  return context;
};
