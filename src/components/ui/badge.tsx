import { HTMLAttributes } from "react";

export function Badge(props: HTMLAttributes<HTMLSpanElement>) {
  return <span {...props} className={`inline-flex rounded-full bg-slate-100 px-2 py-1 text-xs font-medium ${props.className ?? ""}`} />;
}
