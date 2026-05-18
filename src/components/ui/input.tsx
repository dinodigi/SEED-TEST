import { InputHTMLAttributes } from "react";

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`w-full rounded-md border border-slate-300 px-3 py-2 ${props.className ?? ""}`} />;
}
