import type { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function Button({ children, className = "", ...props }: Props) {
  return (
    <button
      className={`
        rounded-lg
        bg-black
        px-4
        cursor-pointer
        py-2
        text-white
        transition
        hover:opacity-90
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}
