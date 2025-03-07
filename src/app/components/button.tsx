import { ButtonHTMLAttributes } from "react";

export default function Button({
  className,
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`w-full cursor-pointer rounded-lg border bg-indigo-600 px-5 py-3 text-white transition-colors duration-300 hover:bg-indigo-500 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
