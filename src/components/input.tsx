// src/components/Input.tsx

import React from 'react';

interface InputProps {
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  placeholder?: string;
  className?: string;
}

export default function Input({ type, value, onChange, label, placeholder = '', className = '' }: InputProps) {
  return (
    <div className={`mb-4 ${className}`}>
      <label className="block mb-2 font-semibold">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="border p-2 rounded w-full"
        placeholder={placeholder}
      />
    </div>
  );
}
