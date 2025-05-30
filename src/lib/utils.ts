import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string): string {
  try {
    return format(new Date(dateString), "dd/MM/yyyy");
  } catch {
    return dateString;
  }
}

export function formatFullName(firstname: string, lastname: string): string {
  return `${firstname} ${lastname}`;
}

export function formatAddress(address?: {
  street: string;
  city: string;
  province: string;
  postalCode: string;
}): string {
  if (!address) return "-";
  return `${address.street}, ${address.city}, ${address.province} ${address.postalCode}`;
}
