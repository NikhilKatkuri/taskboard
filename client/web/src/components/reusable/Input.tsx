import React from "react";

interface BaseInputProps {
  label: string;
  children?: React.ReactNode;
}

interface TextInputProps
  extends
    BaseInputProps,
    Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  Type?: "text";
}

interface TextAreaProps
  extends BaseInputProps, React.TextareaHTMLAttributes<HTMLTextAreaElement> {
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
          className="w-full rounded-lg border border-gray-400 px-3 py-2.5 text-sm outline-0 transition-colors focus:border-gray-700"
          placeholder={placeholder}
          required
          {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
        />
      )}
      {Type === "text-area" && (
        <textarea
          rows={4}
          className="w-full resize-none rounded-lg border border-gray-400 px-3 py-2.5 text-sm outline-0 transition-colors focus:border-gray-700"
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
