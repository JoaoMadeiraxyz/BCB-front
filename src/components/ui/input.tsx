import { InputHTMLAttributes } from "react";

export default function Input({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={`w-full rounded-lg border border-slate-300 bg-transparent px-5 py-3 placeholder-slate-300 transition-colors duration-300 focus-within:border-indigo-600 focus-within:outline-none ${className}`}
      {...props}
    />
  );
}
