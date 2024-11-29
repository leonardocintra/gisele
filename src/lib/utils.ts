import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const SANDRA_BASE_URL =
  process.env.NEXT_PUBLIC_SANDRA_URL || "http://localhost:3005";
export const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export const RESTAURANTE_TEMPEIRO_E_AMOR_ID =
  Number(process.env.NEXT_PUBLIC_RESTAURANTE_TEMPEIRO_E_AMOR_ID) || 30;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function logErrorOnEmail(descricao: string, userId: string) {
  const errorMessage = {
    descricao,
    userId
  };

  fetch(`${BASE_URL}/api/n8n/error`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(errorMessage),
  })
}
