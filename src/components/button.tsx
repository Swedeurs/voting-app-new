// src/components/Button.tsx

import React from 'react';

interface ButtonProps {
  onClick: () => void;
  label: string;
  className?: string;
  disabled?: boolean;
}

export default function Button({ onClick, label, className = '', disabled = false }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500 transition ${className}`}
      disabled={disabled}
    >
      {label}
    </button>
  );
}
