import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge@2.5.4";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}