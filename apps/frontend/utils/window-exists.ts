/* Convenience guard necessary to handle Next.js's window weirdness */

export const windowExists = (): boolean => typeof window !== "undefined";
