import React from "react";

interface BaseInputProps {
  label: string;
  children?: React.ReactNode;
}

interface TextInputProps
  extends BaseInputProps,
    Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  Type?: "text";
}

interface TextAreaProps
  extends BaseInputProps,
    React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  Type: "text-area";
}

type InputProps = TextInputProps | TextAreaProps;

const Input = ({
  placeholder,
  label,
  Type = "text",
  children,
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
          {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
        />
      )}
      {Type === "text-area" && (
        <textarea
          rows={4}
          className="w-full text-sm py-2.5 rounded-lg border outline-0 px-3 border-gray-400 focus:border-gray-700 transition-colors resize-none"
          placeholder={placeholder}
          required
          {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      )}
      {children}
    </div>
  );
};

export default Input;
