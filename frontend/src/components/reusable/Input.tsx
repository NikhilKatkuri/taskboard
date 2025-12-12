import React from "react";

interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  placeholder: string;
  label: string;
  Type?: "text" | "text-area";
  children?: React.ReactNode | null;
}

const Input = ({
  placeholder,
  label,
  Type = "text",
  children = null,
  ...props
}: InputProps) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium">{label}</label>
      {Type === "text" && (
        <input
          type="text"
          className="w-full text-sm py-2.5 rounded-lg border outline-0 px-3 border-gray-400 focus:border-gray-700 transition-colors"
          placeholder={placeholder}
          required
          {...props}
        />
      )}
      {Type === "text-area" && (
        <textarea
          rows={4}
          className="w-full text-sm py-2.5 rounded-lg border outline-0 px-3 border-gray-400 focus:border-gray-700 transition-colors resize-none"
          placeholder={placeholder}
          required
          {...props}
        />
      )}
      {children}
    </div>
  );
};

export default Input;
