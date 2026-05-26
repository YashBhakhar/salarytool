import type { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {}

export default function Input({ className = "", ...props }: Props) {
  return (
    <input
      {...props} // Spread the rest of the props FIRST
      className={`rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-black ${className}`.trim()}
    />
  );
}
