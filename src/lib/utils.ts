import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// allows us to write conditional classes
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
    // left-0 right-0 will be converted to inset-x-0
}
